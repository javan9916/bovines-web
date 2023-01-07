from django.db import models

from api.models.Diet import Diet
from api.models.Supplement import Supplement


class DietSupplement(models.Model):
    diet = models.ForeignKey(Diet, on_delete=models.CASCADE)
    supplement = models.ForeignKey(Supplement, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self) -> str:
        return f"suplemento: { self.supplement }, " f"cantidad: { self.quantity }"
