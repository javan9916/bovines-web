from rest_framework import serializers

from api.models.Weight import Weight


class WeightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weight
        fields = ("id", "animal", "weight", "date", "gpt", "gpd", "current_days")
