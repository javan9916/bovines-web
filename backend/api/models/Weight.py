from api.models import Animal
from django.db import models


class Weight(models.Model):
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    weight = models.FloatField()
    date = models.DateField()
    gpt = models.IntegerField()
    gpd = models.FloatField()
    current_days = models.IntegerField()

    def __str__(self) -> str:
        return (
            f"animal: { self.animal }, peso: { self.weight }, "
            f"fecha: { self.date }, gpt: { self.gpt }, gpd: { self.gpd }, "
            f"días actuales: { self.current_days }"
        )
