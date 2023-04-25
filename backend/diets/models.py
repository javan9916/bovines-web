from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Diet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100)
    total_cost = models.IntegerField(default=0)
    total_weight = models.IntegerField(default=0)

    def __str__(self) -> str:
        return f"{ self.name }, costo total: { self.total_cost }, peso total: { self.total_weight }"


class Supplement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=255)
    kg_presentation = models.FloatField()

    def __str__(self) -> str:
        return f"{ self.name }, kg de presentación: { self.kg_presentation }"


class DietSupplement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    diet = models.ForeignKey(Diet, on_delete=models.CASCADE)
    supplement = models.ForeignKey(Supplement, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self) -> str:
        return f"suplemento: { self.supplement }, cantidad: { self.quantity }"


class PriceHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    price = models.FloatField()
    date = models.DateTimeField(null=True, default=timezone.now)
    supplement = models.ForeignKey(Supplement, on_delete=models.CASCADE, null=True)

    def __str__(self) -> str:
        return f"precio: { self.price }, fecha: { self.date }"
