from rest_framework.decorators import api_view
from django.http import JsonResponse

from Models_API.models import *
from Models_API.serializers import *
from rest_framework import status, viewsets
from rest_framework.parsers import JSONParser
from rest_framework.permissions import *

class invoiceViewset(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    # @api_view(["GET"]) # đã kt
    def list(self,request):
        get_invoice = invoice.objects.all()
        serializers = invoiceSerializer(get_invoice, many=True)
        return JsonResponse(serializers.data, safe=False)


    def create(self, request):
        if request.method =="POST":
            invoice_data = JSONParser().parse(request)
            serializers = invoiceSerializer(data=invoice_data)
            if serializers.is_valid():
                serializers.save()
                return JsonResponse("Pay Success", safe=False)
            return JsonResponse("Pay Error", safe=False)
    
    # @api_view(["PUT"]) # đã kt
    def put(self, request, pk=None):
        if request.method == "PUT":
            invoice_data = JSONParser().parse(request)
            invoice_get = invoice.objects.get(pk=pk)
            serializers = invoiceSerializer(invoice_get, data=invoice_data)
            if serializers.is_valid():
                serializers.save()
                return JsonResponse("Update Success", safe=False)
            return JsonResponse("Failed", safe=False)


    # @api_view(["DELETE"]) # đã kt
    def destroy(self,request, pk=None):
        try:
            invoice_get = invoice.objects.get(pk=pk)
            invoice_get.delete()
            return JsonResponse("Delete Success", safe=False)
        except invoice.DoesNotExist:
            return JsonResponse("Error", safe=False)
