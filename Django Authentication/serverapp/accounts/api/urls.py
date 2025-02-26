from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import MyTokenObtainPairView

 
urlpatterns=[
  # path('', views.getRoutes),
  path('signup/', views.register_user, name='signup'),
  path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('user/', views.user_profile, name='user_profile'),
  path('user/update/', views.update_user_profile, name='update_user_profile'),
]