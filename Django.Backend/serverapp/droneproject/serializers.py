from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    thumbnail = serializers.ImageField(required=False) 
    
    class Meta:
        model = Post
        fields = ['id', 'name', 'description', 'creator', 'thumbnail', 'created_at', 'updated_at']
        read_only_fields = ['creator', 'created_at']
        
    def get_thumbnail(self, obj):
        request = self.context.get('request')
        if obj.thumbnail and request is not None:
            return request.build_absolute_uri(obj.thumbnail.url).replace("localhost", "127.0.0.1")
        return None