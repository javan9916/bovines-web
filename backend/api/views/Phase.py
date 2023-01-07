from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models.Phase import Phase
from api.serializers.Phase import PhaseSerializer


@api_view(["GET", "POST"])
def phases(request):
    if request.method == "GET":
        phases = Phase.objects.all()
        serializer = PhaseSerializer(phases, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = PhaseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET", "PUT", "DELETE"])
def phase(request, id):
    try:
        phase = Phase.objects.get(pk=id)
    except Phase.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = PhaseSerializer(phase)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = PhaseSerializer(phase, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        phase.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
