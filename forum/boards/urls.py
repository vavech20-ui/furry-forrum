from django.urls import path, include
from rest_framework import routers
from .views import BoardViewSet

router = routers.DefaultRouter() #для создания юрлов автоматом, а не вручную
router.register(r'', BoardViewSet) #r-без доп префикса, т.к. задан уже

urlpatterns = [
    path('', include(router.urls)),
]

#router.urls-список всех созданых URLов
#include-подключает все эти URLы