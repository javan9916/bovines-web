from django.db import models

from api.models.Cost import Cost


class Animal(models.Model):
    sex = models.CharField(max_length=1)
    breed = models.CharField(max_length=100, null=True)
    origin = models.CharField(max_length=100, null=True)
    cost = models.ForeignKey(Cost, on_delete=models.CASCADE)
    badge_number = models.IntegerField(default=0)

    def __str__(self) -> str:
        return f"Sexo: { self.sex }, costo: { self.cost }"
