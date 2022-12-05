import datetime

from django.db import models


class PriceHistory(models.Model):
    price = models.FloatField()
    date = models.DateField(default=datetime.date.today)

    def __str__(self) -> str:
        return f"precio: { self.price }, fecha: { self.date }"
