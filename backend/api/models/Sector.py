from django.db import models


class Sector(models.Model):
    name = models.CharField(max_length=100)
    area = models.FloatField()

    def __str__(self) -> str:
        return f"nombre: { self.name }, área: { self.area }"
