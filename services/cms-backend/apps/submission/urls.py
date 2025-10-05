from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ComplaintViewSet, ResolutionViewSet

router = DefaultRouter()
router.register(r"submissions", ComplaintViewSet, basename="complaint")
router.register(r"resolutions", ResolutionViewSet, basename="resolution")

urlpatterns = [
    path("complaint/", include(router.urls)),
]
