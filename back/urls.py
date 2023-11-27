"""
URL configuration for mysite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from myapp.views import asset_views
from myapp.views import external_asset_views

urlpatterns = [
    path('admin/', admin.site.urls),
    # URLs do projeto
    path('api/assets/', asset_views.asset),
    path('api/assets/remove/', asset_views.remove_asset),
    path('api/assets/price/', asset_views.asset_price),
    # URLs externas
    path('api/external_assets/list/', external_asset_views.asset_list),
]
