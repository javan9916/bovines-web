from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models.Sector import Sector
from api.serializers.Sector import SectorSerializer


@api_view(["GET", "POST"])
def sectors(request):
    if request.method == "GET":
        sectors = Sector.objects.all()
        serializer = SectorSerializer(sectors, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = SectorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET", "PUT", "DELETE"])
def sector(request, id):
    try:
        sector = Sector.objects.get(pk=id)
    except Sector.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = SectorSerializer(sector)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = SectorSerializer(sector, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        sector.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
