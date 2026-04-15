from django.urls import path, include
from rest_framework import routers
from .views import BoardViewSet, PostViewSet

router = routers.DefaultRouter() #для создания юрлов автоматом, а не вручную
router.register(r"", BoardViewSet, basename="boards") # r-без доп префикса, т.к. задан уже

post_list = PostViewSet.as_view({"get": "list", "post": "create"})
post_detail = PostViewSet.as_view(
    {"get": "retrieve", "put": "update", "patch": "partial_update", "delete": "destroy"}
)

urlpatterns = [
    path("posts/", post_list, name="post-list"),
    path("posts/<int:pk>/", post_detail, name="post-detail"),
    path('', include(router.urls)),
]

#router.urls-список всех созданых URLов
#include-подключает все эти URLы