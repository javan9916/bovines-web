from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter

from django_filters.rest_framework import DjangoFilterBackend

from api.models.DietSupplement import DietSupplement
from api.serializers.DietSupplement import DietSupplementSerializer


class DietSupplementViewSet(ModelViewSet):
    queryset = DietSupplement.objects.all()
    serializer_class = DietSupplementSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["diet_id"]
    ordering = ["id"]
