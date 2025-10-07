from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r"register", RegisterViewSet, basename="register")

urlpatterns = [
    path("", include(router.urls)),  # automatically handles /register/
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
