import datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from Models_API.models import *
from Models_API.serializers import *
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.parsers import JSONParser
from django.db import IntegrityError
from rest_framework.permissions import *

class medicalViewset(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    def list(self, request):
        get_mrc = medicalrecord.objects.all()
        serializers = medicalrecordSerializer(get_mrc, many=True)
        return JsonResponse(serializers.data, safe=False)


    def retrieve(self, request, pk =None):
        get_mrc = medicalrecord.objects.get(pk=pk)
        serializers = medicalrecordSerializer(get_mrc)
        return JsonResponse(serializers.data, safe=False)

    
    def destroy(self, request, pk =None):
        try:
            get_mrc = medicalrecord.objects.get(pk=pk)
            get_mrc.delete()
            return JsonResponse("Delete Success", safe=False)
        except patient.DoesNotExist:
            return JsonResponse("Error", safe=False)

    def update(self, request, pk =None):
        try:
            if request.method == "PUT":
                medicalrecord_data = JSONParser().parse(request)
                try:
                    medicalrecord_get = medicalrecord.objects.get(medicalrecord_id=medicalrecord_data["medicalrecord_id"])
                    serializers = medicalrecordSerializer(medicalrecord_get, data=medicalrecord_data)
                    if serializers.is_valid():
                        serializers.save()
                        return JsonResponse("Update Status Appointment Success", safe=False)
                except IntegrityError:
                    return JsonResponse("Error", status=500, safe=False)
            return JsonResponse("Method not allowed", status=400, safe=False)
        except:
            return JsonResponse("Error", status=500, safe=False)


    # def create(self, request, *args, **kwargs):
    #     get_record = JSONParser().parse(request)
    #     serializer = medicalrecordSerializer(data = get_record)
    #     if serializer.is_valid():
    #         invoice_data = {
    #             "total_money": serializer.validated_data.get("total_money"),
    #             "invoice_date": datetime.now().date(),
    #         }
    #         invoice_serializer = invoiceSerializer(data=invoice_data)
            
    #         if invoice_serializer.is_valid():
    #             invoice = invoice_serializer.save()
    #             mrc_data = {
    #                 "date_med_exam": serializer.validated_data.get("date_med_exam"),
    #                 "symptom": serializer.validated_data.get("symptom"),
    #                 "diagnostic": serializer.validated_data.get("diagnostic"),
    #                 "patient_id": serializer.validated_data.get("patient_id"),
    #                 "dt_id": serializer.validated_data.get("dt_id"),
    #                 "invoice_id": invoice.invoice_id,
    #             }
    #             mrc_serializer = appointmentSerializer(data=mrc_data)
    #             if mrc_serializer.is_valid():
    #                 mrc_serializer.save()
    #                 return Response("Success", status=status.HTTP_201_CREATED)
    #             return Response(mrc_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #         return Response(invoice_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def create(self, request, *args, **kwargs):
        try:
            exam_data = JSONParser().parse(request)
            invoice_data = {
                'invoice_date': datetime.datetime.now().date(),
                'total_money': exam_data['total_money']
            }
            invoice_serializers = invoiceSerializer(data=invoice_data)
            if invoice_serializers.is_valid():
                invoices = invoice_serializers.save()
            else:
                return JsonResponse("Create Invoice Failed", safe=False)

            medic_data = {
                # 'invoice_id': exam_data['invoice_id'],
                'invoice_id': invoices.invoice_id,
                'date_med_exam': invoices.invoice_date,
                # 'date_med_exam': datetime.datetime.now().date(),
                'patient_id': exam_data['patient_id'],
                'dt_id': exam_data['dt_id'],
                'symptom': exam_data['symptom'],
                'diagnostic': exam_data['diagnostic']
            }
            medic_serializers = medicalrecordSerializer(data=medic_data)
            if medic_serializers.is_valid():
                medic_serializers.save()
                return JsonResponse("Examination Success", safe=False)
        except Exception as e:
            return JsonResponse({"Error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR, safe=False)