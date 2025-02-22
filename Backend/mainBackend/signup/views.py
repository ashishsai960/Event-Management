from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import SignupSerializer
from .models import User

class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "User registered successfully",
                "user_id": user.id,
                "username": user.username,
                "email": user.email,
                "user_type": user.user_type,
                "category": user.category
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
