# Generated by Django 4.2.4 on 2023-08-25 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('predictions_app', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='predictions',
            name='percent_savings_increase',
        ),
        migrations.AddField(
            model_name='predictions',
            name='future_net_worth',
            field=models.PositiveBigIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='predictions',
            name='filing_status',
            field=models.CharField(max_length=255),
        ),
    ]