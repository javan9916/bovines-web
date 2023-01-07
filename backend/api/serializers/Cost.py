from rest_framework import serializers

from api.models.Cost import Cost


class CostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cost
        fields = ("id", "name", "type", "category")
