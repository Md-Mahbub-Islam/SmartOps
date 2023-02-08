from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from ourapp.models import Paragraph
from rest_framework import views
import json
from django.http import JsonResponse

class ParagraphView(views.APIView):
    def get(self, request, pk):
        paragraph = get_object_or_404(Paragraph, pk=pk)
        text = paragraph.text

        #text = "quick brown fox"

        return JsonResponse({"paragraph": text})
