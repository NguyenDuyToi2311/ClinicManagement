# views.py

from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from Models_API.serializers import *
from Models_API.models import *
import uuid

class LoginView2(APIView):
    def post(self, request, format=None):
        
        user = self.authenticate_user(request.data)
        if user is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if user is not None:
            token = self.generate_jwt_token(user)
            return Response({
                'token': token,
                'userDetails': user
            }, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
        # return Response( status=status.HTTP_400_BAD_REQUEST)

    def authenticate_user(self, login_data):
        user = None
        if 'UserName' in login_data:
            if login_data['UserName'].isdigit():
                patients = patient.objects.filter(phone_pt=login_data['UserName'], password=login_data['Password']).first()
                if patients:
                    user = {
                        'UserId': patients.patient_id,
                        'UserName': patients.phone_pt,
                        'FullName': patients.patient_name,
                        'UserType': patients.usertype
                    }
            else:
                doctors = doctor.objects.filter(Email=login_data['UserName'], Password=login_data['Password']).first()
                if doctors:
                    user = {
                        'UserId': doctors.dt_id,
                        'UserName': doctors.email,
                        'FullName': doctors.dt_name,
                        'UserType': doctors.usertype
                    }
        return user

    def generate_jwt_token(self, user_info):
        # token = RefreshToken.for_user(user)
        # return str(token.access_token)
        token = RefreshToken()
        
        token['sub'] = user_info['UserName']
        token['fullName'] = user_info['FullName']
        token['role'] = user_info['UserType']
        token['userid'] = user_info['UserId']
        token['jti'] = str(uuid.uuid4())
        return str(token.access_token)
