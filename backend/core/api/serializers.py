from rest_framework.serializers import ModelSerializer, SerializerMethodField

from core.models import Note


class NoteSerializer(ModelSerializer):
    # user = SerializerMethodField()

    class Meta:
        model = Note
        fields = '__all__'

    # def get_user(self, obj):
    #     note_owner = obj.user.username
    #     return note_owner
