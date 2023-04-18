from rest_framework import serializers

from api.models.Group import Group
from api.models.Sector import Sector

from api.serializers.Animal import AnimalSerializer
from api.serializers.Sector import SectorSerializer


class GroupSerializer(serializers.ModelSerializer):
    sector = SectorSerializer(read_only=True)
    animals = AnimalSerializer(read_only=True, many=True)

    class Meta:
        model = Group
        fields = ("id", "name", "sector", "animals")

    def create(self, validated_data):
        request = self.context["request"]

        sector_pk = request.data.get("sector")
        validated_data["sector_id"] = sector_pk

        animals = request.data.get("animals")
        animals_data = [animal["id"] for animal in animals]
        validated_data["animals"] = animals_data

        return super().create(validated_data)

    def update(self, instance, validated_data):
        request = self.context["request"]

        sector_pk = request.data.get("sector")
        validated_data["sector_id"] = sector_pk

        animals = request.data.get("animals")
        animals_data = [animal["id"] for animal in animals]
        validated_data["animals"] = animals_data
        return super().update(instance, validated_data)
