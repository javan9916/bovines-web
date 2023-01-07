from rest_framework import serializers

from api.models.DietSupplement import DietSupplement


class DietSupplementSerializer(serializers.ModelSerializer):
    class Meta:
        model = DietSupplement
        fields = ("id", "supplement", "diet", "quantity")
