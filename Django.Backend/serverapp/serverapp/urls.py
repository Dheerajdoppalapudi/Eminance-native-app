from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .swagger import schema_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts.api.urls')),
    path('drone/', include('droneproject.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui')
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)