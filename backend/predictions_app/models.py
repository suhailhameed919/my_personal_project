from django.db import models
from user_app.models import User


# Create your models here.
class Predictions(models.Model):
    state = models.CharField(max_length=10)
    filing_status = models.CharField(max_length=255)
    annual_income = models.PositiveIntegerField(default = 0)
    avg_monthly_expenses = models.PositiveIntegerField(default=0)
    current_net_worth = models.PositiveBigIntegerField(default=0)
    prediction_name = models.CharField(max_length=50)
    future_net_worth = models.PositiveBigIntegerField(default=0)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="predictions") 


    def __str__(self):
        return self.prediction_name
    


    