from django.contrib import admin
from .models import ZeeUser, Profile, Address, Testimonial

class ProfileInline(admin.TabularInline):
    model = Profile

class AddressInline(admin.TabularInline):
    model = Address

# Register Admins with Inlines
@admin.register(ZeeUser)
class ZeeUserAdmin(admin.ModelAdmin):
    inlines = [ProfileInline, AddressInline]

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    pass