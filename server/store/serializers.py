from rest_framework import serializers
from .models import Category,Stock, Collection,Brand, Product, Media, ProductVariant, Stock, ProductAttributeValues

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'

class ProductAttributeValuesSerializer(serializers.ModelSerializer):
    product_attribute = serializers.CharField(source="product_attribute.name", read_only=True)
    class Meta:
        model = ProductAttributeValues
        fields = ["product_attribute", "attribute_value"]

class ProductVariantSerializer(serializers.ModelSerializer):
    variant_stock = StockSerializer(read_only=True)
    attribute_values = ProductAttributeValuesSerializer(many=True, source="variant_attributes", read_only=True)
    
    class Meta:
        model = ProductVariant
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ["img_url", "alt_text"]

class ProductSerializer(serializers.ModelSerializer):
    product_media = ImageSerializer(many=True, read_only=True)
    product_variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'