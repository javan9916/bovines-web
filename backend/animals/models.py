from django.db import models
from django.contrib.auth.models import User

from costs.models import Cost
from diets.models import Diet


class Phase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(default="etapa", max_length=100, null=False)
    diet = models.ForeignKey(Diet, on_delete=models.SET_NULL, null=True)
    min_weight = models.IntegerField(default=0)
    max_weight = models.IntegerField(default=0)

    def __str__(self) -> str:
        return (
            f"{ self.name }, minimo: { self.min_weight }, maximo: { self.max_weight }"
        )


class Animal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    sex = models.CharField(max_length=1)
    breed = models.CharField(max_length=100, null=True)
    origin = models.CharField(max_length=1, null=True)
    cost = models.ForeignKey(Cost, on_delete=models.SET_NULL, null=True)
    phase = models.ForeignKey(Phase, on_delete=models.CASCADE, null=True)
    badge_number = models.IntegerField(default=0)
    cost_per_kg = models.IntegerField(default=0)
    value = models.IntegerField(default=0)

    def __str__(self) -> str:
        return f"Animal: ${self.badge_number}"


class Weight(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    weight = models.FloatField()
    date = models.DateField()

    def __str__(self) -> str:
        return f"{ self.animal }, peso: { self.weight }, " f"fecha: { self.date }"


class Sector(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100)
    area = models.FloatField(null=True)
    has_group = models.BooleanField(default=False, null=False)

    def __str__(self) -> str:
        return f"{ self.name }, área: { self.area }"


class Group(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100)
    sector = models.ForeignKey(Sector, on_delete=models.SET_NULL, null=True)
    animals = models.ManyToManyField(Animal)

    def __str__(self) -> str:
        return f"{ self.name }, {self.animals}"
