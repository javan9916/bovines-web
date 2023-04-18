import json

from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated

from django_filters.rest_framework import DjangoFilterBackend

from api.models.Group import Group
from api.models.Sector import Sector
from api.serializers.Group import GroupSerializer


class GroupViewSet(ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["animals"]
    ordering = ["id"]

    def create(self, request, *args, **kwargs):
        body_unicode = request.body.decode("utf-8")
        data = json.loads(body_unicode)
        sector_pk = data["sector"]

        sector = Sector.objects.get(pk=sector_pk)
        sector.has_group = True
        sector.save()
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        body_unicode = request.body.decode("utf-8")
        data = json.loads(body_unicode)
        sector_pk = data["sector"]

        if sector_pk != instance.sector.pk:
            instance.sector.has_group = False
            instance.sector.save()
            sector = Sector.objects.get(pk=sector_pk)
            sector.has_group = True
            sector.save()
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.sector.has_group = False
        instance.sector.save()
        return super().destroy(request, *args, **kwargs)
