from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal


class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)


class Asset(models.Model):
    name = models.CharField(max_length=100)
    cur_value = models.DecimalField(max_digits=8, decimal_places=2, null=True, validators=[MinValueValidator(Decimal('0.01'))])
    last_updated = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)


class PriceFunnel(models.Model):
    periodicity = models.PositiveIntegerField()
    max_value = models.DecimalField(max_digits=8, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
    min_value = models.DecimalField(max_digits=8, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
    active = models.BooleanField(default=True)
    asset = models.ForeignKey("Asset", on_delete=models.CASCADE, null=True)
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    last_updated = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
