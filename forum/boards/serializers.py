from rest_framework import serializers

from .models import Board, Post, Thread

class BoardSerializer(serializers.ModelSerializer):
    class Meta:  # дефолтный класс с настройками серализатора
        model = Board
        fields = ["id", "slug", "name", "description"]  # как будет выглядеть JSON


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "thread", "content", "img", "video"]


class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = [
            "id",
            "board",
            "name",
            "title",
            "img",
            "created_at",
            "description",
            "is_pinned",
            "author",
        ]
        read_only_fields = ["created_at", "author", "is_pinned"]