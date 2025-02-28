from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from .serializers import RegisterSerializer, UserSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    
@api_view(['GET'])
def getRoutes(requests):
    routes= [
        '/api/token',
        '/api/token/refresh'
    ]
    return Response(routes)

@api_view(['POST'])
def register_user(request):
    print("Data: ", request.data)
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user  
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user  
    data = request.data
    print("data: ", data)

    user.first_name = data.get('username', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.email = data.get('email', user.email)

    if data.get('password'):
        user.password = make_password(data['password'])

    user.save()
    
    return Response({'message': 'Profile updated successfully'}, status=status.HTTP_200_OK)

