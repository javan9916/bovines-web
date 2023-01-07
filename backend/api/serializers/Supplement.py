from rest_framework import serializers

from api.models.Supplement import Supplement, SupplementSet


class SupplementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplement
        fields = (
            "id",
            "name",
            "description",
            "price_history",
            "kg_presentation",
            "units",
        )


class SupplementSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupplementSet
        fields = ("id", "supplement", "quantity")
