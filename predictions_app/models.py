from django.db import models
from user_app.models import User


# Create your models here.
class Predictions(models.Model):
    state = models.CharField(max_length=10)
    filing_status = models.CharField(max_length=10)
    annual_income = models.PositiveIntegerField(default = 0)
    avg_monthly_expenses = models.PositiveIntegerField(default=0)
    current_net_worth = models.PositiveBigIntegerField(default=0)
    percent_savings_increase = models.IntegerField(default=0)
    prediction_name = models.CharField(max_length=50)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="predictions") #correct the related name


    def __str__(self):
        return self.prediction_name
    
    #create brand new prediction after they submit info on first page
    #second page uses put request to override already created prediction

    