from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, Collection, Brand, Stock
from .serializers import CollectionSerializer, ProductSerializer, BrandSerializer, StockSerializer


@api_view(["GET"])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def product_detail(request, slug):
    try:
        product = Product.objects.get(slug=slug)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return JsonResponse({"error": "Product not found"}, status=404)


@api_view(["GET"])
def collections(request):
    collection = Collection.objects.all()
    serializer = CollectionSerializer(collection, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def brands(request):
    brand = Brand.objects.all()
    serializer = BrandSerializer(brand, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def stocks(request):
    stock = Stock.objects.all()
    serializer = StockSerializer(stock, many=True)
    return Response(serializer.data)