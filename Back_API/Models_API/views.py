from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.core.files.storage import default_storage
from .models import *
from .serializers import*

# Create your views here.

@csrf_exempt
def savefile(request):
    file = request.FILES["uploadedFile"]
    file_name = default_storage.save(file.name, file)
    return JsonResponse(file_name, safe=False)

