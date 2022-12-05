from api.models.PriceHistory import PriceHistory
from django.db import models


class Supplement(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=255)
    price_history = models.ForeignKey(PriceHistory, on_delete=models.CASCADE)
    kg_presentation = models.FloatField()
    units = models.IntegerField()

    def __str__(self) -> str:
        return (
            f"nombre: { self.name }, descripción: { self.description }, "
            f"historial de precios: { self.price_history }, "
            f"kg de presentación: { self.kg_presentation }, "
            f"unidades: { self.units }"
        )


class SupplementSet(models.Model):
    supplement = models.ForeignKey(Supplement, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()

    def __str__(self) -> str:
        return (
            f"suplemento: { self.supplement }, "
            f"cantidad: { self.quantity }"
        )
