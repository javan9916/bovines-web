from api.models.Cost import Cost
from django.db import models


class Animal(models.Model):
    sex = models.CharField(max_length=1)
    cost = models.ForeignKey(Cost, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"Sexo: { self.sex }, costo: { self.cost }"
