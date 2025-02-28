from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to='thumbnails/', blank=True, null=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name