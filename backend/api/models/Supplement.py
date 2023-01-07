from django.db import models

from api.models.PriceHistory import PriceHistory


class Supplement(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=255)
    price_history = models.ForeignKey(PriceHistory, on_delete=models.CASCADE)
    kg_presentation = models.FloatField()

    def __str__(self) -> str:
        return (
            f"nombre: { self.name }, descripción: { self.description }, "
            f"historial de precios: { self.price_history }, "
            f"kg de presentación: { self.kg_presentation }"
        )
