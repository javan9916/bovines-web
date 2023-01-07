from django.urls import path

from api.views import Animal, Category, Cost, Group, Phase, Sector, Weight

urlpatterns = [
    path("api/animals/", Animal.animals),
    path("api/animals/<int:id>", Animal.animal),
    path("api/groups/", Group.groups),
    path("api/groups/<int:id>", Group.group),
    path("api/sectors/", Sector.sectors),
    path("api/sectors/<int:id>", Sector.sector),
    path("api/phases/", Phase.phases),
    path("api/phases/<int:id>", Phase.phase),
    path("api/weights/", Weight.weights),
    path("api/weights/<int:id>", Weight.weight),
    path("api/costs/", Cost.costs),
    path("api/costs/<int:id>", Cost.cost),
    path("api/categories/", Category.categories),
    path("api/categories/<int:id>", Category.category),
]
