from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class ZeeUser(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'  # Allow users to log in with email
    REQUIRED_FIELDS = ['username']  # If you want the username to remain required
    
    def __str__(self):
        return self.username


class Profile(models.Model):
    user = models.OneToOneField(ZeeUser, on_delete=models.CASCADE, related_name="profile")
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
    bio = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Profile of {self.user.username}"


class Address(models.Model):
    user = models.ForeignKey(ZeeUser, on_delete=models.CASCADE, related_name="addresses")
    phone = models.CharField(max_length=20, blank=True, null=True)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    is_default = models.BooleanField(default=False)  # If this is the default address
    
    def __str__(self):
        return f"{self.user.username} - {self.street}"


class Testimonial(models.Model):
    user = models.ForeignKey(ZeeUser, on_delete=models.CASCADE, related_name="testimonials")
    product = models.ForeignKey("store.Product", on_delete=models.CASCADE, related_name="testimonials")
    title = models.CharField(max_length=255)
    content = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)  # 1 to 5
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "product")  # one testimonial per product per user
        ordering = ["-created_at"]

class Newsletter(models.Model):
    email = models.EmailField(unique=True)
    user = models.ForeignKey(ZeeUser, null=True, blank=True, on_delete=models.SET_NULL)
    is_active = models.BooleanField(default=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email