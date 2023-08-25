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
import requests


#class is responsible for handling the endpoints related to listing and creating predictions
class PredictionsListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        predictions = Predictions.objects.filter(user_id=request.user)
        serializer = Predictions_serializer(predictions, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

    def post(self, request):
        print(request.data.get("annualIncome"))
        prediction = Predictions.objects.create(
            state=request.data.get('state'),
            filing_status=request.data.get('filing_status'),
            annual_income=request.data.get('annual_income'),
            avg_monthly_expenses=request.data.get('avg_monthly_expenses'),
            current_net_worth=request.data.get('current_net_worth'),
            # percent_savings_increase=request.data.get('percent_savings_increase'),
            prediction_name=request.data.get('prediction_name'),
            future_net_worth=request.data.get('future_net_worth'),
            user_id=request.user
        )
        return Response(Predictions_serializer(prediction).data, status=HTTP_201_CREATED)



class PredictionDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, prediction_id):
        prediction = get_object_or_404(Predictions, id=prediction_id, user_id=request.user)
        serializer = Predictions_serializer(prediction)
        return Response(serializer.data, status=HTTP_200_OK)

    # def put(self, request, prediction_id):
    #     prediction = get_object_or_404(Predictions, id=prediction_id, user_id=request.user)
    #     for field in ['state', 'filing_status', 'annual_income', 'avg_monthly_expenses',
    #                   'current_net_worth', 'percent_savings_increase', 'prediction_name']:
    #         setattr(prediction, field, request.data.get(field, getattr(prediction, field)))
    #     prediction.save()
    #     return Response(Predictions_serializer(prediction).data, status=HTTP_200_OK)

    def delete(self, request, prediction_id):
        prediction = get_object_or_404(Predictions, id=prediction_id, user_id=request.user)
        prediction.delete()
        return Response(status=HTTP_204_NO_CONTENT)




class InflationView(APIView):
    def get(self, request):
        try:
            url = "https://api.api-ninjas.com/v1/inflation?country=United%20States&type=CPI"

            headers = {
                "X-Api-Key": "Qtv2VZxtq8MQmjCyB/9G7A==tBJp7TsAEhwLjDPZ"
            }

            response = requests.get(url, headers=headers)
            response_data = response.json()

            monthly_rate_pct = response_data[0]["monthly_rate_pct"]
            yearly_rate_pct = response_data[0]["yearly_rate_pct"]

            return Response({"monthly_rate_pct": monthly_rate_pct, "yearly_rate_pct": yearly_rate_pct}, status=HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)