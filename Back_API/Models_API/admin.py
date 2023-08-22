from django.conf import settings
from django.contrib import admin
from .models import *
from rest_framework import serializers
from django.forms import DateField, DateInput

# Register your models here.


@admin.register(department)
class departmentAdmin(admin.ModelAdmin):
    list_display = [
        "department_id",
        "department_name",
    ]
    
@admin.register(specialty)
class specialtyAdmin(admin.ModelAdmin):
    
    list_display = [
        "specialty_id",
        "specialty_name",
    ]
    

@admin.register(doctor)
class doctorAdmin(admin.ModelAdmin):
    list_display = [
        "dt_id",
        "dt_name",
        "specialty_name",
        "email",
        "phone_dt",
        "password",
        "usertype",
        "image_dt",
    ]

    # làm cho specialty_id xố xuống dưới kiểu specialty_name nhưng vẫn nhập vào là id
    # def formfield_for_foreignkey(self, db_field, request, *args, **kwargs):
    #     if db_field.name == "specialty_id":
    #         kwargs["queryset"] = specialty.objects.all().values_list("specialty_name", flat=True)
    #     return super().formfield_for_foreignkey(db_field, request, **kwargs)

    # # hiện dữ liệu ngoài là specialty_name
    # def specialty_name(self, obj):
    #     return obj.specialty_id.specialty_name
    # # hiện tên trường 
    # specialty_name.short_description = "specialty_name"


@admin.register(employee)
class employeeAdmin(admin.ModelAdmin):
    list_display = [
        "employee_id",
        "employee_name",
        "department",
        "dateofjoining",
        "photofilename",
    ]


@admin.register(invoice)
class invoiceAdmin(admin.ModelAdmin):
    # invoice_date = serializers.DateField(format="%d/%m%Y")
    list_display = [
        "invoice_id",
        "invoice_date",
        "total_money",
    ]


@admin.register(patient)
class patientAdmin(admin.ModelAdmin):
    # date_ob = DateField(input_formats=settings.DATE_INPUT_FORMATS)
    list_display = [
        "patient_id",
        "patient_name",
        "gender",
        "date_ob",
        "phone_pt",
        "address",
        "password",
        "usertype",
        "image_pt",
    ]
    # formfield_overrides = {
    #    models.DateField: {"widget": DateInput(format="%d/%m/%Y")},
    # }

    # def formatted_date_ob(self, obj):
    #     return obj.date_ob.strftime("%d/%m/%Y")
    # formatted_date_ob.short_description = "Date of Birth"




@admin.register(medicalrecord)
class medicalrecordAdmin(admin.ModelAdmin):
    list_display = [
        "medicalrecord_id",
        "date_med_exam",
        "symptom",
        "diagnostic",
        "patient_id",
        "dt_id",
        "total_money",
    ]
    # raw_id_fields = ["patient_id", "dt_id", "invoice_id"]


@admin.register(appointment)
class appointmentAdmin(admin.ModelAdmin):
    list_display = [
        "apm_id",
        "date_med_exam",
        "clinic",
        "patient_name",
        "dt_name",
        "status",
        "note",
    ]
    raw_id_fields = ["patient_id", "dt_id"]

@admin.register(admin_user)
class user_adminAdmin(admin.ModelAdmin):
    list_display = [
        "adminid",
        "adminname",
        "fullname",
        "password",
        "usertype",
    ]
