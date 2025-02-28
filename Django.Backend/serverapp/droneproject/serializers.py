from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ['id', 'name', 'description','creator', 'thumbnail','created_at', 'updated_at']
        
    def get_thumbnail(self, obj):
        request = self.context.get('request')
        if obj.thumbnail:  # Assuming thumbnail is an ImageField
            return request.build_absolute_uri(obj.thumbnail.url).replace("localhost", "127.0.0.1")
        return None