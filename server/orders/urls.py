from django.urls import path
from . import views

urlpatterns = [
    path('', views.OrderListCreateView.as_view(), name='order-list-create'),
    path('<int:pk>/', views.OrderDetailView.as_view(), name='order-detail'),
    path('create/', views.create_order, name='create-order'),
    path('<int:order_id>/status-history/', views.order_status_history, name='order-status-history'),
]