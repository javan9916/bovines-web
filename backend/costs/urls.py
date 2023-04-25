from django.urls import path, include
from rest_framework import routers
from costs import views


router = routers.DefaultRouter()
router.register(r"costs", views.CostViewSet, "costs")
router.register(r"categories", views.CategoryViewSet, "categories")

urlpatterns = [
    path("api/", include(router.urls))
]
