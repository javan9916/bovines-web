from api.models.Animal import Animal
from rest_framework import serializers


class AnimalSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Animal
        fields = ("sex", "cost")
