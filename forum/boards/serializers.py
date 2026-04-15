from rest_framework import serializers

from .models import Board, Post

class BoardSerializer(serializers.ModelSerializer):
    class Meta:  # дефолтный класс с настройками серализатора
        model = Board
        fields = ["id", "slug", "name", "description"]  # как будет выглядеть JSON


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "thread", "content", "img", "video"]