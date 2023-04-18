from rest_framework import serializers

from api.models.DietSupplement import DietSupplement
from api.serializers.Supplement import SupplementSerializer


class DietSupplementSerializer(serializers.ModelSerializer):
    supplement = SupplementSerializer(read_only=True)

    class Meta:
        model = DietSupplement
        fields = "__all__"
