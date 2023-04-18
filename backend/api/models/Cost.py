from django.db import models

from api.models.Category import Category


class Cost(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=1)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    date = models.DateField(null=True)
    cost = models.FloatField(default=0)

    def __str__(self) -> str:
        return (
            f"Nombre: { self.name }, tipo: { self.type }, "
            f"categoría: { self.category }"
        )
