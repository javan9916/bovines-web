from api.models.Cost import Cost
from rest_framework import serializers


class CostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Cost
        fields = ("name", "type", "category")
