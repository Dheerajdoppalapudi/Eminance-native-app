from rest_framework.response import Response
from .serializers import PostSerializer
from .models import Post
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from rest_framework.parsers import MultiPartParser, FormParser
from drf_yasg import openapi


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


@swagger_auto_schema(
    method="post",
    request_body=PostSerializer,
    responses={201: openapi.Response("Post Created", PostSerializer)},
)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def create_posts(request):
    print("request.FILES:", request.FILES) 
    serializer = PostSerializer(data=request.data, context={"request": request})

    if serializer.is_valid():
        post = serializer.save(creator=request.user)

        post_serializer = PostSerializer(post, context={"request": request})
        print("Saved Thumbnail:", post.thumbnail.url if post.thumbnail else "No thumbnail saved")

        return Response(
            {
                "message": "Post Created Successfully",
                "thumbnail_url": post_serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)