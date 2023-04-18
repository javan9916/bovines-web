from django.utils import timezone

from django.db import models

from api.models.Supplement import Supplement


class PriceHistory(models.Model):
    price = models.FloatField()
    date = models.DateTimeField(null=True, default=timezone.now)
    supplement = models.ForeignKey(Supplement, on_delete=models.CASCADE, null=True)

    def __str__(self) -> str:
        return f"precio: { self.price }, fecha: { self.date }"
