from rest_framework import serializers

from api.models.Animal import Animal
from api.models.Weight import Weight
from api.models.Group import Group

from api.serializers.Cost import CostSerializer
from api.serializers.Phase import PhaseSerializer
from api.serializers.Weight import WeightSerializer


class AnimalSerializer(serializers.ModelSerializer):
    cost = CostSerializer(read_only=True)
    phase = PhaseSerializer(read_only=True)
    weights = serializers.SerializerMethodField()
    group = serializers.SerializerMethodField()
    ANIMAL_CATEGORY_ID = 7

    class Meta:
        model = Animal
        fields = (
            "id",
            "sex",
            "breed",
            "origin",
            "cost",
            "phase",
            "badge_number",
            "cost_per_kg",
            "weights",
            "value",
            "group",
        )

    def get_weights(self, instance):
        weights = Weight.objects.filter(animal_id=instance.id)
        return WeightSerializer(weights, many=True).data

    def get_group(self, instance):
        groups = Group.objects.all()
        for group in groups:
            if group.animals.filter(id=instance.id).exists():
                return group.id
        return None
