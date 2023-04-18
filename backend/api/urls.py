from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from api.views import (
    Animal,
    Category,
    Cost,
    Diet,
    DietSupplement,
    Group,
    Phase,
    PriceHistory,
    Sector,
    Supplement,
    Weight,
)


router = routers.DefaultRouter()
router.register("animal", Animal.AnimalViewSet, "animal")
router.register("category", Category.CategoryViewSet, "category")
router.register("cost", Cost.CostViewSet, "cost")
router.register("diet", Diet.DietViewSet, "diet")
router.register(
    "diet_supplement", DietSupplement.DietSupplementViewSet, "diet_supplement"
)
router.register("group", Group.GroupViewSet, "group")
router.register("phase", Phase.PhaseViewSet, "phase")
router.register("price_history", PriceHistory.PriceHistoryViewSet, "price_history")
router.register("sector", Sector.SectorViewSet, "sector")
router.register("supplement", Supplement.SupplementViewSet, "supplement")
router.register("weight", Weight.WeightViewSet, "weight")


urlpatterns = [
    path("api/token", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/", include(router.urls)),
]
