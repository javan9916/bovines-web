from api.models.Animal import Animal
from api.models.Phase import Phase
from api.models.Sector import Sector
from api.models.Weight import Weight
from django.db import models


class Group(models.Model):
    name = models.CharField(max_length=100)
    phases = models.ManyToManyField(Phase)
    sector = models.ForeignKey(Sector, on_delete=models.CASCADE)
    total_days = models.IntegerField()
    animals = models.ManyToManyField(Animal)
    purchase_date = models.DateField()
    initial_weight = models.ForeignKey(Weight, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return (
            f"nombre: { self.name }, fases: { self.phases }, sector: "
            f"{ self.sector }, días totales: { self.total_days }, animales: "
            f"{self.animals} fecha de compra: { self.purchase_date }, "
            f"peso inicial: { self.initial_weight }"
        )
