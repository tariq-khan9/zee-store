from django.contrib import admin
from mptt.admin import MPTTModelAdmin

from .models import (
    Category,Collection, Product, ProductAttribute, ProductVariant, Stock, Media, ProductAttributeValues
)

admin.site.register(Category, MPTTModelAdmin)


# Inline for ProductAttributeValues in ProductVariant
class ProductAttributeValuesInline(admin.TabularInline):
    model = ProductAttributeValues

# Inline for ProductVariant in Product
class ProductVariantInline(admin.TabularInline):
    model = ProductVariant

# Inline for Stock in ProductVariant
class StockInline(admin.TabularInline):
    model = Stock

# Inline for Media in Product
class MediaInline(admin.TabularInline):
    model = Media


# Register Admins with Inlines
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductVariantInline, MediaInline]

@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    inlines = [StockInline, ProductAttributeValuesInline]

@admin.register(ProductAttribute)
class ProductAttributeAdmin(admin.ModelAdmin):
    pass

@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    pass