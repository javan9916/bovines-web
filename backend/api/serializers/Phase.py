from api.models.Phase import Phase
from rest_framework import serializers


class PhaseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Phase
        fields = ("weights", "diet", "total_days")
