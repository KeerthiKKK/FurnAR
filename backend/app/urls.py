from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.registerUser, name="register"),
    path('admin/login/', views.adminLogin, name="admin-login"),
    path('user/login/', views.userLogin, name="user-login"),
    path('admin-only/', views.adminOnlyView, name="admin-only"),
    path('user-only/', views.userOnlyView, name="user-only"),
    
    path("products/", views.getProducts, name="products"),
    path("users/profile/", views.getUserProfile, name="usersprofile"),
    path("users/profile/update/", views.updateUserProfile, name="usersprofileupdate"),
    path("users/", views.getUsers, name="users"),
   path("products/<int:pk>/", views.getProduct, name="product"),
  
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
   

     path("models/<str:filename>/", views.getModel, name="get_model"),

     
    path('', views.getOrders, name='orders'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='myorders'),
    
    path('<str:pk>/deliver/', views.updateOrderToDelivered, name='order-delivered'),

    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
 path('report/monthly/', views.get_monthly_report, name='monthly-report'),

]

