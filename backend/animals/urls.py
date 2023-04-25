from django.urls import path, include
from rest_framework import routers
from animals import views


router = routers.DefaultRouter()
router.register(r"animals", views.AnimalViewSet, "animals")
router.register(r"phases", views.PhaseViewSet, "phases")
router.register(r"weights", views.WeightViewSet, "weights")
router.register(r"groups", views.GroupViewSet, "groups")
router.register(r"sectors", views.SectorViewSet, "sectors")

urlpatterns = [
    path("api/", include(router.urls))
]
