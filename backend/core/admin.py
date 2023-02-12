from store.models import Product
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.contenttypes.admin import GenericTabularInline
from store.admin import ProductAdmin, ProductImageInline
from .models import User



@admin.register(User)
class userAdmin(BaseUserAdmin):
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "password1", "password2","email", "first_name","last_name"),
            },
        ),
    )

class CustomProductAdmin(ProductAdmin):
    inlines = [ProductImageInline]



admin.site.unregister(Product)
admin.site.register(Product, CustomProductAdmin)