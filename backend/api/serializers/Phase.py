from rest_framework import serializers

from api.models.Phase import Phase

from api.serializers.Diet import DietSerializer


class PhaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase
        fields = "__all__"
