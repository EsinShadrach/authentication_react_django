from django.http import JsonResponse
import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from core.api import serializers

from core.api.serializers import NoteSerializer
from core.models import Note, User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def getRoutes(request) -> Response:
    data: list[str] = [
        "/api/token",
        "/api/token/refresh",
    ]
    return Response(data)

# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def getNotes(request):
#     notes = Note.objects.all()
#     serializer = NoteSerializer(notes, many=True)
#     return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(["GET", "POST"])
def note(request, username):
    user = User.objects.get(username=username)
    if request.method == "GET":
        note = Note.objects.filter(
            user=user
        )
        serializer = NoteSerializer(note, many=True)
        return Response(serializer.data)
    else:
        body = request.data["body"]
        notes = Note.objects.create(
            user=user,
            body=body
        )
        serializer = NoteSerializer(notes, many=False)
        return Response(serializer.data)


@api_view(["GET", "PUT", "DELETE"])
def singleNote(request, username, id):
    user = User.objects.get(username=username)
    userNotes = Note.objects.filter(
        user=user
    )
    note = userNotes.get(id=id)
    if request.method == "GET":
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data)
    
    if request.method == "PUT":
        note.body = request.data["body"]
        note.save()
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data)
    
    if request.method == "DELETE":
        note.delete()
        return Response(f"Deleted {note.body}...")