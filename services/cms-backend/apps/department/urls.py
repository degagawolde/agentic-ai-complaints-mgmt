from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r"departments", DepartmentViewSet, basename="departments")
router.register(r"complaints", ForwardedComplaintViewSet, basename="complaints")

urlpatterns = [
    path("forwarded/", include(router.urls)),
]
