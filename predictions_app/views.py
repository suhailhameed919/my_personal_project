from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Predictions
from .serializers import Predictions_serializer

#class is responsible for handling the endpoints related to listing and creating predictions
class PredictionsListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        predictions = Predictions.objects.filter(user_id=request.user)
        serializer = Predictions_serializer(predictions, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

    def post(self, request):
        prediction = Predictions.objects.create(
            state=request.data.get('state'),
            filing_status=request.data.get('filing_status'),
            annual_income=request.data.get('annual_income'),
            avg_monthly_expenses=request.data.get('avg_monthly_expenses'),
            current_net_worth=request.data.get('current_net_worth'),
            percent_savings_increase=request.data.get('percent_savings_increase'),
            prediction_name=request.data.get('prediction_name'),
            user_id=request.user
        )
        return Response(Predictions_serializer(prediction).data, status=HTTP_201_CREATED)


#class is responsible for  individual predictions. It also subclasses APIView and defines methods to handle GET, PUT, and DELETE requests. It retrieves a specific prediction based on its ID and the logged-in user when a GET request is made. When a PUT request is made, it updates the fields of the specified prediction with the data sent in the request. When a DELETE request is made, it deletes the specified prediction.

class PredictionDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, prediction_id):
        prediction = get_object_or_404(Predictions, id=prediction_id, user_id=request.user)
        serializer = Predictions_serializer(prediction)
        return Response(serializer.data, status=HTTP_200_OK)

    def put(self, request, prediction_id):
        prediction = get_object_or_404(Predictions, id=prediction_id, user_id=request.user)
        for field in ['state', 'filing_status', 'annual_income', 'avg_monthly_expenses',
                      'current_net_worth', 'percent_savings_increase', 'prediction_name']:
            setattr(prediction, field, request.data.get(field, getattr(prediction, field)))
        prediction.save()
        return Response(Predictions_serializer(prediction).data, status=HTTP_200_OK)

    def delete(self, request, prediction_id):
        prediction = get_object_or_404(Predictions, id=prediction_id, user_id=request.user)
        prediction.delete()
        return Response(status=HTTP_204_NO_CONTENT)
