from rest_framework.response import Response
from .serializers import PostSerializer
from .models import Post
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
def ideas_list(request):
    post_objects = Post.objects.all().order_by('-created_at')
    serializer = PostSerializer(post_objects, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_posts(request):
    user = request.user 
    posts = Post.objects.filter(creator=user)  
    serializer = PostSerializer(posts, many=True, context={'request': request}) 
    return Response(serializer.data, status=200)