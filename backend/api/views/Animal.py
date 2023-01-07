from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models.Animal import Animal
from api.serializers.Animal import AnimalSerializer


@api_view(["GET", "POST"])
def animals(request):
    if request.method == "GET":
        animals = Animal.objects.all().order_by("sex")
        serializer = AnimalSerializer(animals, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = AnimalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET", "PUT", "DELETE"])
def animal(request, id):
    try:
        animal = Animal.objects.get(pk=id)
    except Animal.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = AnimalSerializer(animal)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = AnimalSerializer(animal, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        animal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
