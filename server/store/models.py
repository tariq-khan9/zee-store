from django.db import models
from decimal import Decimal
import uuid
from django.core.validators import MinValueValidator
from django.utils.translation import gettext_lazy as _
from mptt.models import MPTTModel, TreeForeignKey

class Collection(models.Model):
    name = models.CharField(max_length=255, unique=True)
    desctiption = models.TextField(blank=True)
    img_url = models.ImageField()

    def __str__(self):
        return self.name
    
class Category(MPTTModel):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=150, unique=True)
    is_active = models.BooleanField(default=False)
    parent = TreeForeignKey("self", on_delete=models.PROTECT, related_name="children", null=True, blank=True)

    class MPTTMeta:
        order_insertion_by = ["name"]

    class Meta:
        ordering = ["name"]
        verbose_name_plural = _("categories")

    def __str__(self):
        return self.name


class Product(models.Model):
    id = models.BigAutoField(primary_key=True)
    web_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    slug = models.SlugField(max_length=255)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.ForeignKey(Category, related_name="product", on_delete=models.SET_NULL, null=True, blank=True)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Brand(models.Model):
    name = models.CharField(max_length=255, unique=True)
    img_url = models.ImageField()

    def __str__(self):
        return self.name


class ProductAttribute(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class ProductVariant(models.Model):
    sku = models.CharField(max_length=20, unique=True)
    upc = models.CharField(max_length=12, unique=True)
    product = models.ForeignKey(Product, related_name="product_variants", on_delete=models.PROTECT)
    brand = models.ForeignKey(Brand, related_name="brand", on_delete=models.SET_NULL, blank=True, null=True)
    is_active = models.BooleanField(default=False)
    is_default = models.BooleanField(default=False)
    retail_price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal("0.01"))])
    store_price = models.DecimalField(max_digits=5, decimal_places=2)
    is_digital = models.BooleanField(default=False)
    weight = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.sku


class ProductAttributeValues(models.Model):
    product_variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, related_name="variant_attributes")
    product_attribute = models.ForeignKey(ProductAttribute, related_name="attribute_values", on_delete=models.PROTECT)
    attribute_value = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.product_attribute.name}: {self.attribute_value}"


class Media(models.Model):
    product = models.ForeignKey(Product, on_delete=models.PROTECT, related_name="product_media")
    img_url = models.ImageField()
    alt_text = models.CharField(max_length=255)
    is_feature = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)


class Stock(models.Model):
    product_variant = models.OneToOneField(ProductVariant, related_name="variant_stock", on_delete=models.PROTECT)
    last_checked = models.DateTimeField(null=True, blank=True)
    units = models.IntegerField(default=0)
    units_sold = models.IntegerField(default=0)
