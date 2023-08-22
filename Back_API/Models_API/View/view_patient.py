from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from Models_API.models import *
from Models_API.serializers import *
from rest_framework import status, viewsets
from rest_framework.parsers import JSONParser
from rest_framework.decorators import action
from rest_framework.permissions import *
from django.core.exceptions import ObjectDoesNotExist

class patientViewset(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    # @api_view(["GET"]) # đã kt
    def list(self, request):
        get_patient = patient.objects.all()
        serializer = patientSerializer(get_patient, many=True)
        return JsonResponse(serializer.data, safe=False)


    # @api_view(["GET"]) # đã kt
    def retrieve(self, request, pk=None):
        try:
            # get_patient = patient.objects.select_related("specialty").get(pk=pk)
            get_patient = patient.objects.get(pk=pk)
            serializer = patientSerializer(get_patient)
            return JsonResponse(serializer.data, safe=False)
        except get_patient.DoesNotExist:
            return JsonResponse(status=404, safe=False)


    # @api_view(["POST"]) # đã kt
    def create(self, request):
        try:
            if request.method == "POST":
                patient_data = JSONParser().parse(request)
                #patient_data = request.data
                serializer = patientSerializer(data=patient_data)
                if serializer.is_valid():
                    phone_pt = serializer.validated_data.get("phone_pt")  # lấy dữ liệu
                    if patient.objects.filter(phone_pt=phone_pt).exists():  # lọc dữ liệu phone có bị trùng hay kh
                        return JsonResponse("Number phone already exist", safe=False)
                    serializer.save()
                    return JsonResponse("Create Account Successfully", status=status.HTTP_201_CREATED, safe=False)
                return JsonResponse("Create Failed !!!", safe=False)
        except:
            return JsonResponse("Create Error", safe=False)
        


    # @api_view(["PUT"]) # đã kt
    def update(self, request, pk=None):
        try:
            if request.method == "PUT":
                patient_data = JSONParser().parse(request)
                patient_get = patient.objects.get(pk=pk)
                serializer = patientSerializer(patient_get, data=patient_data)
                if serializer.is_valid():
                    phone_pt = serializer.validated_data.get("phone_pt")  # lấy dữ liệu
                    if patient.objects.exclude(patient_id=patient_data["patient_id"]).filter(phone_pt=phone_pt).exists():  
                        # lọc dữ liệu phone có bị trùng hay kh
                        return JsonResponse("Number phone already exist", safe=False)
                    serializer.save()
                    return JsonResponse("Update Infor Success", status=status.HTTP_201_CREATED, safe=False)
                return JsonResponse("Update Infor Fail", safe=False)
            else:
                return JsonResponse("Method Put not allowed.", status=status.HTTP_405_METHOD_NOT_ALLOWED, safe=False)
        except:
            return JsonResponse("It is ok", safe=False)

    def partial_update(self, request, pk=None):
        try:
            if request.method == "PATCH":
                # patient_data = request.data  # Sử dụng request.data thay vì JSONParser().parse(request)
                patient_data = JSONParser().parse(request)  
                patient_get = patient.objects.get(pk=pk)
                serializer = patientSerializer(patient_get, data=patient_data, partial=True)  # Sử dụng partial=True
                if serializer.is_valid():
                    phone_pt = serializer.validated_data.get("phone_pt")  # lấy dữ liệu
                    if patient.objects.exclude(pk=pk).filter(phone_pt=phone_pt).exists():  # lọc dữ liệu phone có bị trùng hay không
                        return JsonResponse("Number phone already exists", safe=False)
                    serializer.save()
                    return JsonResponse("Partial Patient Update Infor Success", status=status.HTTP_200_OK, safe=False)
                return JsonResponse("Partial Patient Update Infor Fail", safe=False)
            else:
                return JsonResponse("Method Put not allowed.", status=status.HTTP_405_METHOD_NOT_ALLOWED, safe=False)
        except patient.DoesNotExist:
            return JsonResponse("Patient not found.", status=status.HTTP_404_NOT_FOUND, safe=False)

    # @api_view(["DELETE"])  # đã kt
    def destroy(self, request, pk=None):
        try:
            patient_get = patient.objects.get(pk=pk)
            patient_get.delete()
            return JsonResponse("Delete Success", safe=False)
        except patient.DoesNotExist:
            return JsonResponse("Error", safe=False)

# SELECT *
# FROM LichKham AS lk
# INNER JOIN BacSi AS bs ON lk.MaBacSi = bs.MaBacSi
# INNER JOIN ChuyenKhoa AS ck ON bs.MaChuyenKhoa = ck.MaChuyenKhoa
# WHERE lk.TrangThai = 'Chờ Duyệt' AND lk.MaBN = id;

# @action(detail=False, methods=["GET"])
def list_patient_pending(self, pk=None):
    # try:
    #     if not appointment.objects.filter(patient_id = pk).exists():
    #         return JsonResponse("Field Not Found", safe=False)
    #     else:
    get_appointment = appointment.objects.filter(status ="Pending", patient_id = pk)
    serializers = appointmentSerializer(get_appointment, many=True)
    return JsonResponse(serializers.data, safe=False)
    # except:
    #         return JsonResponse("Error", status=404)

def list_patient_waiting(self, pk=None):
    # try:
    #     if not appointment.objects.filter(patient_id = pk).exists():
    #         return JsonResponse("Field Not Found", safe=False)
    #     else:
            get_appointment = appointment.objects.filter(status ="Waiting", patient_id = pk)
            serializers = appointmentSerializer(get_appointment, many=True)
            return JsonResponse(serializers.data, safe=False)
    # except:
    #         return JsonResponse("Error", status=404)

def list_patient_finish(self, pk=None):
    # try:
    #     if not appointment.objects.filter(patient_id = pk).exists():
    #         return JsonResponse("Field Not Found", safe=False)
    #     else:
            get_appointment = appointment.objects.filter(status ="Finish", patient_id = pk)
            serializers = appointmentSerializer(get_appointment, many=True)
            return JsonResponse(serializers.data, safe=False)
    # except:
    #         return JsonResponse("Error", status=404)
    
def list_medicalrecord(self, pk=None):
    try:
        # get_medicalrecord = medicalrecord.objects.filter(patient_id = pk)
        get_medicalrecord = medicalrecord.objects.filter(patient_id = pk)
        serializers = medicalrecordSerializer(get_medicalrecord, many=True)
        return JsonResponse(serializers.data, safe=False)
    except:
        return JsonResponse("Error", status=404)


def test(self, pk=None):
    try:
        if not appointment.objects.filter(patient_id = pk).exists():
            return JsonResponse("Field Not Found", safe=False)
        else:
            get_appointments = appointment.objects.filter(patient_id = pk)
            serializers = appointmentSerializer(get_appointments, many=True)
            return JsonResponse(serializers.data, safe=False)
    except:
        return JsonResponse("Error", status=404)


    
    



