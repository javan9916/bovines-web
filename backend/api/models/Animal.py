from django.db import models

from api.models.Cost import Cost
from api.models.Phase import Phase


class Animal(models.Model):
    sex = models.CharField(max_length=1)
    breed = models.CharField(max_length=100, null=True)
    origin = models.CharField(max_length=1, null=True)
    cost = models.ForeignKey(Cost, on_delete=models.SET_NULL, null=True)
    phase = models.ForeignKey(Phase, on_delete=models.CASCADE, null=True)
    badge_number = models.IntegerField(default=0)
    cost_per_kg = models.IntegerField(default=0)
    value = models.IntegerField(default=0)

    def __str__(self) -> str:
        return f"Sexo: { self.sex }, raza: { self.breed }"
