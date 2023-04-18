from rest_framework.viewsets import ModelViewSet

from api.models.Phase import Phase
from api.serializers.Phase import PhaseSerializer


class PhaseViewSet(ModelViewSet):
    queryset = Phase.objects.all()
    serializer_class = PhaseSerializer
