from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Drone API",
        default_version="v1",
        description="API documentation for Drone project",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="admin@drone.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)