from django.db import models

from api.models import Animal


class Weight(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    weight = models.FloatField()
    date = models.DateField()

    def __str__(self) -> str:
        return (
            f"animal: { self.animal }, peso: { self.weight }, "
            f"fecha: { self.date }"
        )
