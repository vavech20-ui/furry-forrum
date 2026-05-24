from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, AllowAny, IsAuthenticated
from .models import Board, Post, Thread
from .serializers import BoardSerializer, PostSerializer, ThreadSerializer

class BoardViewSet(viewsets.ModelViewSet): #автоматом создаёт GET, POST, PUT, DELETE
    queryset = Board.objects.all()  # queryset-это список объектов которые будем отдавать клиенту
    serializer_class = BoardSerializer  #превращаем доски  в JSON
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        else:
            return[IsAdminUser()]


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.select_related("thread").all()
    serializer_class = PostSerializer


class ThreadViewSet(viewsets.ModelViewSet):
    queryset = Thread.objects.select_related("board", "author").all()
    serializer_class = ThreadSerializer

    def get_permissions(self):
        if self.action in ("list", "retrieve"):
            return [AllowAny()]
        if self.action == "destroy":
            return [IsAdminUser()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)