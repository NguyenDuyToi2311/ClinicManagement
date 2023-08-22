from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
import jwt
from django.conf import settings
from Models_API.models import *
from Models_API.serializers import *
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
import uuid
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q


# class LoginView(ObtainAuthToken):
class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_401_UNAUTHORIZED)
        user = self.authenticate_user(request.data)
        if user is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        if user is not None:
            token = self.generate_jwt(user)
            response = Response({
                'token': token,
                'userDetails': user
                # {
                #     'UserId': user['UserId'],
                #     'UserName': user['UserName'],
                #     'FullName': user['FullName'],
                #     'UserType': user['UserType']
                # }
            }, status=status.HTTP_200_OK)
        
        return response


    # hiện thông tin khi post đúng
    def authenticate_user(self, login_credentials):
        user = None
        if 'UserName' in login_credentials:
            if login_credentials['UserName'].isdigit():
                patients = patient.objects.filter(phone_pt=login_credentials['UserName'], password=login_credentials['Password']).first()
                if patients:
                    user = {
                        'UserId': patients.patient_id,
                        'UserName': patients.phone_pt,
                        'FullName': patients.patient_name,
                        'UserType': patients.usertype
                    }
            else:
                doctors = doctor.objects.filter(email=login_credentials['UserName'], password=login_credentials['Password']).first()
                if doctors:
                    user = {
                        'UserId': doctors.dt_id,
                        'UserName': doctors.email,
                        'FullName': doctors.dt_name,
                        'UserType': doctors.usertype
                    }
        return user


    # tạo mã jwt
    def generate_jwt(self, user_info):
        payload = {     
            'sub': user_info['UserName'],
            'fullName': user_info['FullName'],
            'role': user_info['UserType'],
            'userid': user_info['UserId'],
            'jti': str(uuid.uuid4())
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return token
        
