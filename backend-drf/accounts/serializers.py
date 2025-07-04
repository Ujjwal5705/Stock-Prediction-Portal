from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        # create_user automatically hash the password
        user = User.objects.create_user(**validated_data)

        # Another way
        # user = User.objects.create_user(
        #     validated_data['username'],
        #     validated_data['email'],
        #     validated_data['password'],
        # )
        
        return user
