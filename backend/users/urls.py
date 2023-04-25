from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users import views


router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet, "users")

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/token", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
]
