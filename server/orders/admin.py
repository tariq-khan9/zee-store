from django.contrib import admin
from .models import Order, OrderItem, OrderStatusHistory

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('total_price',)
    fields = ('product_variant', 'quantity', 'unit_price', 'total_price')

class OrderStatusHistoryInline(admin.TabularInline):
    model = OrderStatusHistory
    extra = 0
    readonly_fields = ('created_at',)
    fields = ('status', 'notes', 'created_at', 'created_by')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'order_number', 'user', 'order_status', 'payment_status', 
        'total_amount', 'created_at', 'updated_at'
    ]
    list_filter = [
        'order_status', 'payment_status', 'created_at', 'updated_at'
    ]
    search_fields = [
        'order_number', 'user__username', 'user__email', 
        'shipping_address__street', 'billing_address__street'
    ]
    readonly_fields = [
        'order_number', 'created_at', 'updated_at', 'subtotal', 
        'tax_amount', 'shipping_cost', 'total_amount'
    ]
    inlines = [OrderItemInline, OrderStatusHistoryInline]
    
    fieldsets = (
        ('Order Information', {
            'fields': ('order_number', 'user', 'order_status', 'payment_status')
        }),
        ('Pricing', {
            'fields': ('subtotal', 'tax_amount', 'shipping_cost', 'total_amount')
        }),
        ('Addresses', {
            'fields': ('shipping_address', 'billing_address')
        }),
        ('Additional Information', {
            'fields': ('notes', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related(
            'user', 'shipping_address', 'billing_address'
        )

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = [
        'order', 'product_variant', 'quantity', 'unit_price', 'total_price'
    ]
    list_filter = ['order__order_status', 'order__created_at']
    search_fields = [
        'order__order_number', 'product_variant__sku', 
        'product_variant__product__name'
    ]
    readonly_fields = ('total_price',)
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related(
            'order', 'product_variant__product'
        )

@admin.register(OrderStatusHistory)
class OrderStatusHistoryAdmin(admin.ModelAdmin):
    list_display = [
        'order', 'status', 'created_at', 'created_by'
    ]
    list_filter = ['status', 'created_at']
    search_fields = [
        'order__order_number', 'notes'
    ]
    readonly_fields = ('created_at',)
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related(
            'order', 'created_by'
        )