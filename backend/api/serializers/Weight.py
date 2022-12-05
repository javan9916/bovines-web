from api.models.Weight import Weight
from rest_framework import serializers


class WeightSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Weight
        fields = ("animal", "weight", "date", "gpt", "gpd", "current_days")
