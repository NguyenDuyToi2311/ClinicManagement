from rest_framework import serializers
from .models import *


class adminSerializer(serializers.ModelSerializer):
    class Meta:
        model = admin_user
        fields = (
            "adminid",
            "adminname",
            "fullname",
            "password",
            "usertype",
        )


class departmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = department
        fields = (
            "department_id",
            "department_name",
        )


class specialtySerializer(serializers.ModelSerializer):
    class Meta:
        model = specialty
        fields = (
            "specialty_id",
            "specialty_name",
        )


class employeeSerializer(serializers.ModelSerializer):
    dateofjoining = serializers.SerializerMethodField()

    def get_dateofjoining(self, obj):
        return obj.date_joining_fm()

    class Meta:
        model = employee
        fields = (
            "employee_id",
            "employee_name",
            "department",
            "dateofjoining",
            "photofilename",
        )


class patientSerializer(serializers.ModelSerializer):
    class Meta:
        model = patient
        fields = (
            "patient_id",
            "patient_name",
            "gender",
            "date_ob",
            "phone_pt",
            "address",
            "password",
            "usertype",
            "image_pt",
        )


class doctorSerializer(serializers.ModelSerializer):
    specialty_name = serializers.CharField(source="specialty_id.specialty_name",read_only=True)
    class Meta:
        model = doctor
        fields = (
            "dt_id",
            "dt_name",
            "specialty_id",
            "specialty_name",
            "email",
            "phone_dt",
            "password",
            "usertype",
            "image_dt",
        )
    

    # def to_representation(self, instance):
    #     representation = super(doctorSerializer, self).to_representation(instance)
    #     # Xóa trường specialty_id và giữ lại specialty_name trong đầu ra
    #     representation.pop('specialty_id')
    #     return representation


class appointmentSerializer(serializers.ModelSerializer):
    specialty_name = serializers.CharField(source="dt_id.specialty_id.specialty_name",read_only=True)
    dt_name = serializers.CharField(source="dt_id.dt_name",read_only=True)
    phone_dt = serializers.CharField(source="dt_id.phone_dt",read_only=True)
    image_dt = serializers.CharField(source="dt_id.image_dt",read_only=True)
    
    patient_name= serializers.CharField(source = "patient_id.patient_name", read_only=True)
    date_ob= serializers.CharField(source = "patient_id.date_ob", read_only=True)
    phone_pt= serializers.CharField(source = "patient_id.phone_pt", read_only=True)
    
    class Meta:
        model = appointment
        fields = (
            "apm_id",
            "date_med_exam",
            "clinic",
            "patient_id",
            "dt_id",
            "status",
            "note",     
            
            "specialty_name",
            "dt_name",
            "phone_dt",
            "image_dt",
            
            "patient_name",
            "date_ob",
            "phone_pt",
        )


class invoiceSerializer(serializers.ModelSerializer):
    invoice_date = serializers.SerializerMethodField()
    def get_invoice_date(self, obj):
        return obj.invoice_date_fm()
    class Meta:
        model = invoice
        fields = (
            "invoice_id",
            "invoice_date",
            "total_money",
        )


class medicalrecordSerializer(serializers.ModelSerializer):
    dt_name =serializers.CharField(source="dt_id.dt_name", read_only=True)
    total_money =serializers.CharField(source="invoice_id.total_money", read_only=True)
    patient_name= serializers.CharField(source="patient_id.patient_name", read_only=True)
    invoice_date = serializers.CharField(source="invoice_id.invoice_date",read_only=True)
    class Meta:
        model = medicalrecord
        fields = (
            "medicalrecord_id",
            "date_med_exam",
            "symptom",
            "diagnostic",
            "patient_id",
            "patient_name",
            "dt_id",
            "dt_name",
            "invoice_id",
            "invoice_date",
            "total_money",
            
        )
