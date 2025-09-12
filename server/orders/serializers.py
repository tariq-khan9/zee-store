from rest_framework import serializers
from .models import Order, OrderItem, OrderStatusHistory
from store.models import ProductVariant
from users.models import Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'phone', 'street', 'city', 'state', 'postal_code', 'country', 'is_default']

class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'sku', 'retail_price', 'store_price', 'is_active', 'is_default']

class OrderItemSerializer(serializers.ModelSerializer):
    product_variant = ProductVariantSerializer(read_only=True)
    product_variant_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product_variant', 'product_variant_id', 'quantity', 'unit_price', 'total_price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    shipping_address = AddressSerializer(read_only=True)
    billing_address = AddressSerializer(read_only=True)
    shipping_address_id = serializers.IntegerField(write_only=True)
    billing_address_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'user', 'order_status', 'payment_status',
            'subtotal', 'tax_amount', 'shipping_cost', 'total_amount',
            'shipping_address', 'billing_address', 'shipping_address_id', 'billing_address_id',
            'notes', 'created_at', 'updated_at', 'items'
        ]
        read_only_fields = ['order_number', 'user', 'created_at', 'updated_at']


class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            'shipping_address_id', 'billing_address_id', 'subtotal', 
            'tax_amount', 'shipping_cost', 'total_amount', 'notes', 'items'
        ]

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        
        return order


class OrderStatusHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatusHistory
        fields = ['id', 'status', 'notes', 'created_at', 'created_by']