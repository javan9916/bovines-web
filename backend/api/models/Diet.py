from django.db import models

from api.models.Cost import Cost


class Diet(models.Model):
    name = models.CharField(max_length=100)
    total_cost = models.IntegerField(default=0)
    total_weight = models.IntegerField(default=0)

    def __str__(self) -> str:
        return f"nombre: { self.name }, coste total: { self.total_cost }, peso total: { self.total_weight }"
