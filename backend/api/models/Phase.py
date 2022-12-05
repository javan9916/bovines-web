from api.models.Diet import Diet
from api.models.Weight import Weight
from django.db import models


class Phase(models.Model):
    weights = models.ManyToManyField(Weight)
    diet = models.ForeignKey(Diet, on_delete=models.CASCADE)
    total_days = models.IntegerField()

    def __str__(self) -> str:
        return (
            f"pesajes: { self.weights }, dieta: { self.diet }, "
            f"días totales: { self.total_days }"
        )
