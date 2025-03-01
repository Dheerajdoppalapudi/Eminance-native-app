from django.urls import path
from . import views

 
urlpatterns=[
  # path('', views.getRoutes),
  path('ideaslist/', views.ideas_list, name='ideas_list'),
  path('userposts/', views.user_posts, name='my_posts'),
  path('createposts/', views.create_posts, name='my_posts'),
]