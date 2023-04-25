from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import viewsets, permissions, pagination
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Cost, Category
from .serializers import CostSerializer, CategorySerializer


class CostViewSet(viewsets.ModelViewSet):
    queryset = Cost.objects.all()
    serializer_class = CostSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["category", "type"]
    pagination_class = pagination.LimitOffsetPagination

    def get_queryset(self):
        return super().get_queryset().filter(
            user=self.request.user
        )


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    pagination_class = pagination.LimitOffsetPagination

    def get_queryset(self):
        return super().get_queryset().filter(
            user=self.request.user
        )
