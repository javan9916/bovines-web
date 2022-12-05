from api.models.Cost import Cost
from api.models.Supplement import SupplementSet
from django.db import models


class Diet(models.Model):
    name = models.CharField(max_length=100)
    total_cost = models.ForeignKey(Cost, on_delete=models.CASCADE)
    supplements = models.ManyToManyField(SupplementSet)

    def __str__(self) -> str:
        return (
            f"nombre: { self.name }, coste total: { self.total_cost }, "
            f"suplementos: { self.supplements }"
        )
