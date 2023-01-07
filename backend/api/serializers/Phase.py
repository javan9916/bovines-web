from rest_framework import serializers

from api.models.Phase import Phase


class PhaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase
        fields = ("id", "weights", "diet", "total_days")
