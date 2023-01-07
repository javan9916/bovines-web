from django.db import models

from api.models.Animal import Animal
from api.models.Phase import Phase
from api.models.Sector import Sector
from api.models.Weight import Weight


class Group(models.Model):
    name = models.CharField(max_length=100)
    phases = models.ManyToManyField(Phase)
    sector = models.ForeignKey(Sector, on_delete=models.CASCADE, null=True)
    total_days = models.IntegerField(null=True)
    animals = models.ManyToManyField(Animal)
    purchase_date = models.DateField(null=True)
    initial_weight = models.ForeignKey(Weight, on_delete=models.CASCADE, null=True)

    def __str__(self) -> str:
        return (
            f"nombre: { self.name }, fases: { self.phases }, sector: "
            f"{ self.sector }, días totales: { self.total_days }, animales: "
            f"{self.animals} fecha de compra: { self.purchase_date }, "
            f"peso inicial: { self.initial_weight }"
        )
