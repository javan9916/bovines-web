from api.models.Supplement import Supplement, SupplementSet
from rest_framework import serializers


class SupplementSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Supplement
        fields = ("name", "description", "price_history", "kg_presentation", "units")


class SupplementSetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SupplementSet
        fields = ("supplement", "quantity")
