from api.models.Category import Category
from django.db import models


class Cost(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=1)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return (
            f"Nombre: { self.name }, tipo: { self.type }, "
            f"categoría: { self.category }"
        )
