from django.urls import path
from ourapp.api.views import *

urlpatterns = [
    path('paragraph/<int:pk>/', ParagraphView.as_view()),
]