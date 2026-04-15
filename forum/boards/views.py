from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, AllowAny
from .models import Board, Post
from .serializers import BoardSerializer, PostSerializer

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