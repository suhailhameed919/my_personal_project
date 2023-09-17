from django.urls import path
from predictions_app.views import PredictionsListView, PredictionDetailView, InflationView

urlpatterns = [
    path('viewpredictions/', PredictionsListView.as_view(), name='viewpredictions'),
    path('createprediction/', PredictionsListView.as_view(), name='createprediction'),
    path('getprediction/<int:prediction_id>/', PredictionDetailView.as_view(), name='getprediction'),
    path('updateprediction/<int:prediction_id>/', PredictionDetailView.as_view(), name='updateprediction'),
    path('deleteprediction/<int:prediction_id>/', PredictionDetailView.as_view(), name='deleteprediction'),
    path('homepagedata/', InflationView.as_view(), name='homepagedata'),

]