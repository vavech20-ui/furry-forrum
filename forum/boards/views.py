from django.shortcuts import render
from rest_framework import viewsets
from .models import Board 
from .serializers import BoardSerializer

class BoardViewSet(viewsets.ModelViewSet): #автоматом создаёт GET, POST, PUT, DELETE
    queryset = Board.objects.all()  # queryset-это список объектов которые будем отдавать клиенту
    serializer_class = BoardSerializer  #превращаем доски  в JSON
    