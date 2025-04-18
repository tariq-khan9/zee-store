from rest_framework import serializers
from .models import Testimonial, Profile, ZeeUser

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['avatar']


class ZeeUserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = ZeeUser
        fields = ['username', 'profile']


class TestimonialSerializer(serializers.ModelSerializer):
    user = ZeeUserSerializer()

    class Meta:
        model = Testimonial
        fields = ['id', 'title', 'content', 'rating', 'created_at', 'user']

