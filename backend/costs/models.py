from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return f"{ self.name }"


class Cost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=1)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    date = models.DateField(null=True)
    cost = models.FloatField(default=0)

    def __str__(self) -> str:
        return f"{ self.name }, tipo: { self.type }, categoría: { self.category }"
