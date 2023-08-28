from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from predictions_app.models import Predictions

class Predictions_serializer(ModelSerializer):
    class Meta:
        model = Predictions
        fields = ['id', 'state', 'filing_status', 'annual_income', 'avg_monthly_expenses', 'current_net_worth', 'percent_savings_increase', 'prediction_name']
        

