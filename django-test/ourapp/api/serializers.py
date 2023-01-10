from rest_framework import serializers
from ourapp.models import Paragraph

class ParagraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paragraph
        fields = ['id', 'text']
