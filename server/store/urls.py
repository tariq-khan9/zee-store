from django.urls import path

from .views import product_list, product_detail, collections, brands, stocks

app_name = "store"

urlpatterns = [
    path("api/collection", collections, name="store_home"),
    path("api/brand", brands, name="store_home"),
     path("api/stock", stocks, name="store_home"),
    path("api/", product_list, name="store_home"),
    path("api/<slug:slug>/", product_detail, name="store_home"),
  
   
]
