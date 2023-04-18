from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return f"id: {self.id}, Nombre: { self.name }"
