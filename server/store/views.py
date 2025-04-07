from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .models import Collection
from .serializers import CollectionSerializer
from .serializers import ProductSerializer

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