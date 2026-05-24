from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static

from core.views import activation_redirect

urlpatterns = [
    path('admin/', admin.site.urls),
    path('activate/<uid>/<token>', activation_redirect, name='activation-redirect'),
    path('activate/<uid>/<token>/', activation_redirect),
    path('boards/', include('boards.urls')),
    path('users/', include('users.urls')),
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.jwt')),
    path('api-auth/', include('rest_framework.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

