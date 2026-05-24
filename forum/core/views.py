from django.conf import settings
from django.shortcuts import redirect


def activation_redirect(request, uid, token):
    """Старые письма вели на :8000 — перенаправляем на фронт."""
    protocol = settings.DJOSER.get('EMAIL_FRONTEND_PROTOCOL', 'http')
    domain = settings.FRONTEND_DOMAIN
    return redirect(f'{protocol}://{domain}/activate/{uid}/{token}')
