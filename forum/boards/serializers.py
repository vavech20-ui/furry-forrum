from rest_framework import serializers  
from .models import Board  

class BoardSerializer(serializers.ModelSerializer):  
    
    class Meta:  # дефолтный класс с настройками серализатора
        model = Board  
        fields = ['id', 'slug', 'name', 'description'] #как будет выглядеть JSON
       