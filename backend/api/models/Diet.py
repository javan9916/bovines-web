from django.db import models

from api.models.Cost import Cost


class Diet(models.Model):
    name = models.CharField(max_length=100)
    total_cost = models.ForeignKey(Cost, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"nombre: { self.name }, coste total: { self.total_cost }, "
