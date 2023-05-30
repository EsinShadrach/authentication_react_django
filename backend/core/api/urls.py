from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from . import views


urlpatterns = [
    path("", views.getRoutes, name="routes"),
    
    path("notes/", views.getNotes, name="notes"),
    path("notes/<str:username>", views.note, name="user-note"),
    path("notes/<str:username>/<str:id>", views.singleNote, name="single-note"),
    
    path("token/", views.MyTokenObtainPairView.as_view(), name="token-pair-view"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh")
]
