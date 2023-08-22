from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import status, viewsets

# from models import *
from Models_API.models import *
from Models_API.serializers import *
from django.http import JsonResponse
from rest_framework.permissions import *
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


# @permission_classes([AllowAny])
class specialtyViewset(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    # @api_view(["GET"])  
    def list(self, request):# đã kt
        get_specialty = specialty.objects.all()
        serializer = specialtySerializer(get_specialty, many=True)
        return JsonResponse(serializer.data, safe=False)
    # @api_view(["GET"]) 
    def retrieve(self, request, pk=None):# đã kt
        try:
            # get_specialty = specialty.objects.select_related("specialty").get(pk=pk)
            get_specialty = specialty.objects.get(pk=pk)
            serializer = specialtySerializer(get_specialty)
            return JsonResponse(serializer.data, safe=False)
        except specialty.DoesNotExist:
            return JsonResponse("Specialty Does Not Found or Does Not Exist", safe=False)
    # @api_view(["POST"])  # đã kt
    def create(self, request):
        if request.method == "POST":
            specialty_data = JSONParser().parse(request)
            #specialty_data = request.data
            serializer = specialtySerializer(data=specialty_data)
            if serializer.is_valid():
                specialty_name = serializer.validated_data.get("specialty_name")
                if specialty.objects.filter(specialty_name=specialty_name).exists():
                    return JsonResponse("Specialty already exist", safe=False)
                serializer.save()
                return JsonResponse("Add Specialty Successfully", status=status.HTTP_201_CREATED, safe=False)
            return JsonResponse("Add Specialty Failed !!!", safe=False)
        else:
            return JsonResponse("Method post not allowed.", status=status.HTTP_405_METHOD_NOT_ALLOWED, safe=False)

    # @api_view(["PUT"])
    def update(self, request, pk=None): # đã kt, # update and partial_update
        try:
            if request.method == "PUT":
                specialty_data = JSONParser().parse(request)
                #specialty_data = request.data
                specialty_get = specialty.objects.get(pk=pk)
                serializer = specialtySerializer(specialty_get, data=specialty_data)
                if serializer.is_valid():
                    specialty_name = serializer.validated_data.get("specialty_name")
                    if specialty.objects.filter(specialty_name=specialty_name).exists():
                        return JsonResponse("Specialty already exist", safe=False)
                    serializer.save()
                    return JsonResponse("Update Infor Success", status=status.HTTP_201_CREATED, safe=False)
                return JsonResponse("Update Infor Fail", safe=False)
            else:
                return JsonResponse("Method put not allowed.", status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except specialty.DoesNotExist:
            return JsonResponse("Specialty Does Not Exist To Update", safe=False)

    # @api_view(["DELETE"])
    def destroy(self, request, pk=None): # đã kt
        try:
            specialty_get = specialty.objects.get(pk=pk)
            specialty_get.delete()
            return JsonResponse("Delete Specialty Success", safe=False)
        except specialty.DoesNotExist:
            return JsonResponse("Specialty Not Found To Delete", safe=False)

