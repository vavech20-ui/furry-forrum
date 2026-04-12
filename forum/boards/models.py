from django.db import models

class Board(models.Model):
    slug = models.CharField(max_length=10, unique=True)  #'game', 'car'
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)   #не null, т.к. проще для БД
    id = models.IntegerField(unique=True, )
    def __str__(self):
        return f"/{self.slug}/" #для удобства работы в админке через теги
    
class Thread(models.Model):
    board = models.ForeignKey(Board, on_delete=models.SET_DEFAULT, default=1, related_name='threads')
    name = models.CharField(max_length=100)
    img = models.ImageField(blank=False)
    description = models.TextField(blank=True)
    
    
    def __str__(self):
        return f"/{self.name}/"
    