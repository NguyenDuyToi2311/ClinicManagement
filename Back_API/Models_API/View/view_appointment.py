from django.http import JsonResponse
from Models_API.models import *
from Models_API.serializers import *
from rest_framework.decorators import api_view
from django.db import IntegrityError
from rest_framework import status,viewsets
from rest_framework.parsers import JSONParser
from rest_framework.permissions import *



class appointmentViewset(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    
    def create(self, request):
        try:
            if request.method == "POST":
                # appointment_data = request.data
                appointment_data = JSONParser().parse(request)
                serializers = appointmentSerializer(data=appointment_data)
                # Lấy các dữ liệu từ request và gán vào appointment
                if serializers.is_valid():
                    serializers.save()
                    return JsonResponse("Make Appointment Success", safe=False)
                return JsonResponse("Make Appointment Failed", safe=False)
        except:
            return JsonResponse("Error", status=500, safe=False)
        
    def update(self, request,pk=None):
        try:
            if request.method == "PUT":
                appointment_data = JSONParser().parse(request)
                try:
                    appointment_get = appointment.objects.get(apm_id=appointment_data["apm_id"])
                    serializers = appointmentSerializer(appointment_get, data=appointment_data)
                    if serializers.is_valid():
                        serializers.save()
                        return JsonResponse("Update Status Appointment Success", safe=False)
                except IntegrityError:
                    return JsonResponse("Error", status=500, safe=False)
            return JsonResponse("Method not allowed", status=400, safe=False)
        except:
            return JsonResponse("Error", status=500, safe=False)

    def partial_update(self, request, pk=None):
        try:
            if request.method == "PATCH":
                appointment_data = JSONParser().parse(request)
                try:
                    appointment_get = appointment.objects.get(apm_id=appointment_data["apm_id"])
                    serializers = appointmentSerializer(appointment_get, data=appointment_data)
                    if serializers.is_valid():
                        serializers.save()
                        return JsonResponse("Update Appointment Success", safe=False)
                except IntegrityError:
                    return JsonResponse("Error", status=500, safe=False)
            return JsonResponse("Method not allowed", status=400, safe=False)
        except:
            return JsonResponse("Error", status=500, safe=False)
        
        
    def destroy(self, request, pk=None):     
        try:
            appointment_get = appointment.objects.get(pk=pk)
            appointment_get.delete()
            return JsonResponse("Delete Success", safe=False)      
        except:
            return JsonResponse("Error", status=500, safe=False)


    def retrieve(self, request, pk=None):
        try:
            # appointment_get = appointment.objects.select_related("appointment").get(pk=appointment_id)
            appointment_get = appointment.objects.get(pk=pk)
            # Trả về thông tin appointment và các thông tin liên quan
            serializer = appointmentSerializer(appointment_get)
            return JsonResponse(serializer.data, safe=False)
        except appointment.DoesNotExist:
            return JsonResponse("Not found", status=404, safe=False)

    def list(self, request):
        try:
            # appointments_data = appointment.objects.select_related("patient", "doctor").all().values()
            appointments_data = appointment.objects.all()
            serializers = appointmentSerializer(appointments_data, many=True)
            return JsonResponse(serializers.data, safe=False)
        except IntegrityError:
            return JsonResponse("Error", safe=False)
