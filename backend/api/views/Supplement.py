from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models.Supplement import Supplement
from api.serializers.Supplement import SupplementSerializer


@api_view(["GET", "POST"])
def supplements(request):
    if request.method == "GET":
        supplements = Supplement.objects.all()
        serializer = SupplementSerializer(supplements, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = SupplementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET", "PUT", "DELETE"])
def supplement(request, id):
    try:
        supplement = Supplement.objects.get(pk=id)
    except Supplement.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = SupplementSerializer(supplement)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = SupplementSerializer(supplement, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        supplement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
