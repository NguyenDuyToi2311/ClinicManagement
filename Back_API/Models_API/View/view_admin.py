from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken # thư viện simpleJWT
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from Models_API.serializers import *
from Models_API.models import *
import uuid
import jwt # thư viện PyJWT
from django.conf import settings
from rest_framework import status
from django.contrib.auth import get_user_model

    
class AdminLogin(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        try:
            response = Response(status=status.HTTP_401_UNAUTHORIZED)
            user = self.authenticate_user(request.data)
            if user is None:
                return Response(status=status.HTTP_400_BAD_REQUEST)

            if user is not None:
                token = self.generate_jwt(user)
                response = Response(
                    {
                        'token': token,
                        'userDetails': user
                    },
                    status=status.HTTP_200_OK
                )
            return response
        except Exception as e:
            return JsonResponse("Error")

    def authenticate_user(self, login_credentials):
        user = None
        if 'UserName' in login_credentials:
            if login_credentials['UserName']:
                admin = admin_user.objects.filter(adminname = login_credentials['UserName'], password = login_credentials['Password']).first()
                if admin:
                    user = {
                        'UserName': admin.adminname,
                        'FullName': admin.fullname,
                        'UserType': admin.usertype
                    }
        return user
        

    def generate_jwt(self, user_info):
        payload = {
            'sub': user_info['UserName'],
            'fullName': user_info['FullName'],
            'role': user_info['UserType'],
            'jti': str(uuid.uuid4())
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return token
    
    # def generate_jwt(user_info):
    #     token = RefreshToken.for_user(user_info)
    #     token['fullName'] = user_info['FullName']
    #     token['role'] = user_info['UserType']
    #     token['jti'] = str(uuid.uuid4())
    #     access_token = str(token.access_token)
    #     return access_token

        # Cách 1
        
        # refresh = RefreshToken.for_user(user_info)  # Bước 1: Tạo RefreshToken từ thông tin người dùng (user_info)
        # access_token = str(refresh.access_token)  # Bước 2: Lấy AccessToken từ RefreshToken và chuyển nó thành string
        # return access_token

        # Cách 2
        # # Tạo JWT token sử dụng thư viện Django Rest Framework Simple JWT
        # # Bước 1: Sử dụng phương thức `AccessToken.for_user` để tạo AccessToken từ thông tin người dùng
        # access_token = AccessToken.for_user(user_info)
        # # Bước 2: AccessToken là một đối tượng token được tạo ra, chúng ta cần chuyển nó thành string
        # return str(access_token)
        