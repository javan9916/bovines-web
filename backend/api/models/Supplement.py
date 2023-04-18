from django.db import models


class Supplement(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=255)
    kg_presentation = models.FloatField()

    def __str__(self) -> str:
        return (
            f"nombre: { self.name }, descripción: { self.description }, "
            f"kg de presentación: { self.kg_presentation }"
        )
