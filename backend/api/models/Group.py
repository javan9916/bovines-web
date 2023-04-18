from django.db import models

from api.models.Animal import Animal
from api.models.Sector import Sector


class Group(models.Model):
    name = models.CharField(max_length=100)
    sector = models.ForeignKey(Sector, on_delete=models.SET_NULL, null=True)
    animals = models.ManyToManyField(Animal)

    def __str__(self) -> str:
        return (
            f"nombre: { self.name }, sector: { self.sector }, animales: "
            f"{self.animals}"
        )
