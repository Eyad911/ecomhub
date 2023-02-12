from rest_framework_nested import routers

from . import views

router = routers.DefaultRouter()
router.register('products', views.ProductViewSet, basename='products')
router.register('category', views.CategoryViewSet)
router.register('carts', views.CartViewSet)
router.register('customer', views.CustomerViewSet)
router.register('orders', views.OrderViewSet, basename='orders')
router.register('allreviews', views.ReviewViewSetAll)


products_router = routers.NestedDefaultRouter(router, 'products', lookup='product')
products_router.register('reviews', views.ReviewViewSet, basename='product-reviews')
products_router.register('images', views.ProductImageViewSet, basename='product-images')

carts_router = routers.NestedDefaultRouter(router, 'carts', lookup='cart')
carts_router.register('items', views.CartItemViewSet, basename='cart-items')



# URLConf
urlpatterns = router.urls + products_router.urls + carts_router.urls