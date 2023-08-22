from django.urls import path, include

from .View.view_appointment import *
from .View.view_doctor import *
from .View.view_invoice import *
from .View.view_medicalrecord import *
from .View.view_patient import *
from .View.view_specialty import *
from .View.view_admin import *
from .View.view_login import *


from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.routers import DefaultRouter
from .jwt import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
    
)
from rest_framework.authtoken.views import ObtainAuthToken
from Models_API import views

#router = routers.SimpleRouter() # trong viewset phải có query vs serializer class
router = DefaultRouter() # cái này khỏi
router.register(r'specialty', specialtyViewset, basename="specialty")
router.register(r"patient", patientViewset, basename="patient")
router.register(r"doctor", doctorViewset, basename="doctor")
router.register(r"invoice", invoiceViewset, basename="invoice")
router.register(r"appointment", appointmentViewset, basename="appointment")
router.register(r"medicalrecord", medicalViewset, basename="medicalrecord")




urlpatterns = [
    path("", include(router.urls)),
    path("savefile/", views.savefile),
    #path("specialty/", views.get_specialty)
    
    # test JWT
    # path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('login/', LoginView.as_view(), name='Login_User'),
    path('admin/', AdminLogin.as_view(), name='Login_Admin'),
    
    path('list_patient_pending/<int:pk>/', list_patient_pending, name=""),
    path('list_patient_waiting/<int:pk>/', list_patient_waiting, name=""),
    path('list_patient_finish/<int:pk>/', list_patient_finish, name=""),
    path('list_medicalrecord/<int:pk>/', list_medicalrecord),
    
    path("list_doctor_pending/", medical_pa, name=""),
    path("list_doctor_pending/<int:pk>/", medical_pa, name=""),
    
    path("list_doctor_waiting/", medical_wfe, name=""),
    path("list_doctor_waiting/<int:pk>/", medical_wfe, name=""),
    
    path("list_doctor_finish/", medical_ec, name=""),
    path("list_doctor_finish/<int:pk>/", medical_ec, name=""),
    
    path('test/<int:pk>/', test),
    
    path('test_admin/', test)
] #+ router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)