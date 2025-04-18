from django.urls import path

from .views import testimonial

app_name = "users"

urlpatterns = [
    path("testimonial/", testimonial, name="users_home"),
  
  
   
]
