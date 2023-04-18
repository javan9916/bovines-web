from rest_framework.viewsets import ModelViewSet

from api.models.Category import Category
from api.serializers.Category import CategorySerializer


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
