from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated

from django_filters.rest_framework import DjangoFilterBackend

from api.models.DietSupplement import DietSupplement
from api.serializers.DietSupplement import DietSupplementSerializer


class DietSupplementViewSet(ModelViewSet):
    queryset = DietSupplement.objects.all()
    serializer_class = DietSupplementSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["diet_id"]
    ordering = ["id"]
