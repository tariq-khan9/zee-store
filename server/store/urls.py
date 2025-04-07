from django.urls import path

from .views import product_list, product_detail, collections

app_name = "store"

urlpatterns = [
    path("api/collection", collections, name="store_home"),
     path("api/", product_list, name="store_home"),
     path("api/<slug:slug>/", product_detail, name="store_home"),
  
   
]
