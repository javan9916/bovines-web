from django.urls import path, include
from rest_framework import routers
from diets import views


router = routers.DefaultRouter()
router.register(r"diets", views.DietViewSet, "diets")
router.register(r"supplements", views.SupplementViewSet, "supplements")
router.register(r"diet_supplements", views.DietSupplementViewSet, "diet_supplements")
router.register(r"price_history", views.PriceHistoryViewSet, "price_history")

urlpatterns = [
    path("api/", include(router.urls))
]
