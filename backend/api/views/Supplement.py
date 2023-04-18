import json

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status

from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import LimitOffsetPagination

from django_filters.rest_framework import DjangoFilterBackend

from api.models.Supplement import Supplement
from api.models.PriceHistory import PriceHistory

from api.serializers.Supplement import SupplementSerializer


class SupplementViewSet(ModelViewSet):
    queryset = Supplement.objects.all()
    serializer_class = SupplementSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    pagination_class = LimitOffsetPagination

    def create(self, request, *args, **kwargs):
        body_unicode = request.body.decode("utf-8")
        data = json.loads(body_unicode)
        price = data["price"]

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            supplement = serializer.save()
            self.create_price_history(supplement, price)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def create_price_history(self, supplement, price):
        try:
            price_history = PriceHistory.objects.create(
                price=price, supplement=supplement
            )
            price_history.save()
        except Exception as e:
            print(e)
