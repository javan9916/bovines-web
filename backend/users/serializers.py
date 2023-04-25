from django.contrib.auth.models import User
from animals.models import Phase
from costs.models import Category

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()

        # Create Phase default data linked to every user
        Phase.objects.create(user=user, name='Desarrollo', diet=None, min_weight=175, max_weight=325)
        Phase.objects.create(user=user, name='Engorde', diet=None, min_weight=326, max_weight=425)
        Phase.objects.create(user=user, name='Finalización', diet=None, min_weight=426, max_weight=600)

        # Create Category for animal cost
        Category.objects.create(user=user, name='Compra animales')

        return user
    