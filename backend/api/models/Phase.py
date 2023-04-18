from django.db import models

from api.models.Diet import Diet


class Phase(models.Model):
    name = models.CharField(default="etapa", max_length=100, null=False)
    diet = models.ForeignKey(Diet, on_delete=models.SET_NULL, null=True)
    min_weight = models.IntegerField(default=0)
    max_weight = models.IntegerField(default=0)

    def __str__(self) -> str:
        return f"id: {self.pk}, Nombre: { self.name }, kilos minimos: { self.min_weight }, kilos maximos: { self.max_weight }"
