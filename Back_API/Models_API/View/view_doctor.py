from rest_framework.decorators import api_view

from rest_framework import status, viewsets
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView

# from models import *
from Models_API.models import *
from Models_API.serializers import *
from django.http import JsonResponse
from django.core.files.storage import default_storage
from rest_framework.parsers import JSONParser
from rest_framework.permissions import *
# Create your views here.


class doctorViewset(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    # @api_view(["GET"])  # đã kt
    def list(self, request):
        get_doctor = doctor.objects.all()
        serializer = doctorSerializer(get_doctor, many=True)
        return JsonResponse(serializer.data, safe=False)

    # @api_view(["GET"]) # đã kt
    def retrieve(self, request, pk=None):
        # try:
            # get_doctor = doctor.objects.select_related("specialty").get(pk=pk)
        get_doctor = doctor.objects.get(pk=pk)
        serializer = doctorSerializer(get_doctor)
        return JsonResponse(serializer.data, safe=False)
        # except get_doctor.DoesNotExist:
            # return JsonResponse(status=404, safe=False)

    # @api_view(["POST"])  # đã kt
    def create(self, request):
        if request.method == "POST":
            doctor_data = JSONParser().parse(request)
            serializer = doctorSerializer(data=doctor_data)
            if serializer.is_valid():
                email = serializer.validated_data.get("email")  # lấy dữ liệu
                phone_dt = serializer.validated_data.get("phone_dt")  # lấy dữ liệu
                if doctor.objects.filter(email=email).exists() and doctor.objects.filter(phone_dt=phone_dt).exists():  # lọc dữ liệu email có bị trùng hay kh
                    return JsonResponse("Email and Number phone already exists", safe=False)
                if doctor.objects.filter(email=email).exists():  # lọc dữ liệu phone có bị trùng hay kh
                    return JsonResponse("Email already exist", safe=False)
                elif doctor.objects.filter(phone_dt=phone_dt).exists():
                    return JsonResponse("Number phone already exist", safe=False)
                serializer.save()      
                return JsonResponse("Add Doctor Successfully", status=status.HTTP_201_CREATED, safe=False)  
            return JsonResponse("Add Doctor Failed !!!", safe=False)  
        else:
            return JsonResponse("Method Post not allowed.", status=status.HTTP_405_METHOD_NOT_ALLOWED)

    # @api_view(["PUT"])  # đã kt
    def update(self, request, pk):
        try:
            if request.method == "PUT":
                doctor_data = JSONParser().parse(request)
                doctor_get = doctor.objects.get(pk=pk)
                serializer = doctorSerializer(doctor_get, data=doctor_data)
                if serializer.is_valid():
                    email = serializer.validated_data.get("email")  # lấy dữ liệu
                    phone_dt = serializer.validated_data.get("phone_dt")  # lấy dữ liệu

                    if doctor.objects.exclude(dt_id=doctor_data["dt_id"]).filter(email=email).exists() and doctor.objects.exclude(dt_id=doctor_data["dt_id"]).filter(phone_dt=phone_dt).exists():  # lọc dữ liệu email có bị trùng hay kh
                        return JsonResponse("Email and Number phone already exists", safe=False)
                    if doctor.objects.exclude(dt_id=doctor_data["dt_id"]).filter(email=email).exists():  # lọc dữ liệu phone có bị trùng hay kh
                        return JsonResponse("Email already exist", safe=False)
                    elif doctor.objects.exclude(dt_id=doctor_data["dt_id"]).filter(phone_dt=phone_dt).exists():
                        return JsonResponse("Number phone already exist", safe=False)
                    
                    serializer.save()
                    return JsonResponse("Update Infor Doctor Success", status=status.HTTP_201_CREATED, safe=False)
                return JsonResponse("Update Infor Doctor Fail", safe=False)      
            else:
                return JsonResponse("Method Put not allowed.", status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except doctor.DoesNotExist:
                return JsonResponse("Doctor Not Found", safe=False)
        
    def partial_update(self, request, pk=None):
        if request.method == "PATCH":
            doctor_data = JSONParser().parse(request)
            doctor_get = doctor.objects.get(pk=pk)
            serializer = doctorSerializer(doctor_get, data=doctor_data)
            if serializer.is_valid():
                email = serializer.validated_data.get("email")  # lấy dữ liệu
                phone_dt = serializer.validated_data.get("phone_dt")  # lấy dữ liệu

                if doctor.objects.exclude(dt_id=doctor_data["dt_id"]).filter(email=email).exists() and doctor.objects.exclude(dt_id=doctor_data["dt_id"]).filter(phone_dt=phone_dt).exists():  # lọc dữ liệu email có bị trùng hay kh
                    return JsonResponse("Email and Number phone already exists", safe=False)
                if doctor.objects.exclude(dt_id=doctor_data["dt_id"]).filter(email=email).exists():  # lọc dữ liệu phone có bị trùng hay kh
                    return JsonResponse("Email already exist", safe=False)
                elif doctor.objects.exclude(dt_id=doctor_data["dt_id"]).filter(phone_dt=phone_dt).exists():
                    return JsonResponse("Number phone already exist", safe=False)
                serializer.save()
                return JsonResponse("Update Infor Doctor Success", status=status.HTTP_201_CREATED, safe=False)
            return JsonResponse("Update Infor Doctor Fail", safe=False)

        else:
            return JsonResponse("Method not allowed.", status=status.HTTP_405_METHOD_NOT_ALLOWED)
    # @api_view(["DELETE"])  # đã kt
    def destroy(self, request, pk=None):
        try:
            doctor_get = doctor.objects.get(pk=pk)
            doctor_get.delete()
            return JsonResponse("Delete Success", safe=False)
        except doctor.DoesNotExist:
            return JsonResponse("Error", safe=False)

    # @api_view(["POST"])
    # def save_file(request):
    #     try:
    #         posted_file = request.FILES["file"]
    #         filename = posted_file.name
    #         physical_path = "/path/to/your/directory/" + filename

    #         with open(physical_path, "wb+") as destination:
    #             for chunk in posted_file.chunks():
    #                 destination.write(chunk)

    #         return JsonResponse(filename, safe=False)
    #     except Exception:
    #         return JsonResponse("a1.jpg", safe=False)

    # lọc theo chuyên khoa

# lọc theo trạng thái chờ duyệt

def medical_pa(request, pk=None):
    if pk is None or not appointment.objects.filter(dt_id=pk).exists():
        get_appointment = appointment.objects.all()
    else:
        get_appointment = appointment.objects.filter(status="Pending", dt_id=pk)
    
    # get_appointment = appointment.objects.filter(status="Pending", dt_id=pk)# chờ duyệt
    serializer = appointmentSerializer(get_appointment, many=True)
    return JsonResponse(serializer.data, safe=False)

# # lọc theo trạng thái chờ khám
def medical_wfe(request, pk=None):
    if pk is None or not appointment.objects.filter(dt_id=pk).exists():
        get_appointment = appointment.objects.all()
    else:
        get_appointment = appointment.objects.filter(status="Waiting", dt_id=pk)# chờ khám
    serializer = appointmentSerializer(get_appointment, many=True)
    return JsonResponse(serializer.data, safe=False)

# # lọc theo trạng thái đã khám
def medical_ec(request, pk=None):
    if pk is None or not appointment.objects.filter(dt_id=pk).exists():
        get_appointment = appointment.objects.all()
    else:
        get_appointment = appointment.objects.filter(status="Finish", dt_id=pk)  # đã khám
    serializer = appointmentSerializer(get_appointment, many=True)
    return JsonResponse(serializer.data, safe=False)

