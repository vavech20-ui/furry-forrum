from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator


class Board(models.Model):
    slug = models.CharField(max_length=10, unique=True)  #'game', 'car'
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)   #не null, т.к. проще для БД

    def __str__(self):
        return f"/{self.slug}/" #для удобства работы в админке через теги
    
class Thread(models.Model):
    board = models.ForeignKey(
        Board,
        on_delete=models.PROTECT,
        related_name='threads'
    )
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=255)
    img = models.ImageField(blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True)
    is_pinned = models.BooleanField(default=False)
    author = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='threads'
    )
    
    def __str__(self):
        return f"[{self.board.slug}] {self.title}"

class Post(models.Model):
    thread = models.ForeignKey(
        Thread,
        on_delete=models.CASCADE,
        related_name='posts'
    )
    content = models.TextField(max_length=10000)
    img = models.ImageField(blank=True)
    video = models.FileField(
        upload_to="posts/videos/",
        blank=True,
        null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=["mp4", "webm", "mov"])
        ],
    )
