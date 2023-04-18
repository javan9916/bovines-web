from rest_framework import serializers

from api.models.Diet import Diet


class DietSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diet
        fields = ("id", "name", "total_cost", "total_weight")
