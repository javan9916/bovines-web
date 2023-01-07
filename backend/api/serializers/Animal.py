from rest_framework import serializers

from api.models.Animal import Animal


class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = ("id", "badge_number", "sex", "cost")
