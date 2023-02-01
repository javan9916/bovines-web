from django.db import models

from api.models.Diet import Diet
from api.models.Animal import Animal


class Phase(models.Model):
    diet = models.ForeignKey(Diet, on_delete=models.CASCADE)
    total_days = models.IntegerField()
    animals = models.ManyToManyField(Animal)

    def __str__(self) -> str:
        return (
            f"pesajes: { self.weights }, dieta: { self.diet }, "
            f"días totales: { self.total_days }"
        )
