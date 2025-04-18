from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Testimonial
from .serializers import TestimonialSerializer


@api_view(["GET"])
def testimonial(request):
    testimonial = Testimonial.objects.all()
    serializer = TestimonialSerializer(testimonial, many=True)
    return Response(serializer.data)

