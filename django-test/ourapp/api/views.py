from django.shortcuts import get_object_or_404
from rest_framework import views, response
from ourapp.models import Paragraph
from ourapp.api.serializers import ParagraphSerializer

class ParagraphView(views.APIView):
    def get(self, request, pk):
        paragraph = get_object_or_404(Paragraph, pk=pk)
        serializer = ParagraphSerializer(paragraph)
        return response.Response(serializer.data)


# Create your views here.
