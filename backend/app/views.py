from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .models import Product,User
from .serializers import ProductSerializer,UserSerializer,UserSerializerWithToken
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# Create your views here.\


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(["POST"])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username = data['email'],
            email = data ['email'],
            password = make_password(data['password'])

        )

        serializer = UserSerializerWithToken(user,many=False)

        return Response(serializer.data)
    except:
        message={"detail":"User with this email lready exists"}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)




@api_view(['GET'])
def getProducts(request):
    productslist = Product.objects.all()
    serializer = ProductSerializer(productslist,many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

# views.py
from django.http import FileResponse, Http404
from django.conf import settings
import os

@api_view(['GET'])
def getModel(request, filename):
    model_path = os.path.join(settings.MEDIA_ROOT, 'models', filename)
    if os.path.exists(model_path):
        return FileResponse(open(model_path, 'rb'), content_type='model/gltf-binary')
    else:
        raise Http404("Model not found")


#Order Views

from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from app.models import Product, Order, OrderItem, ShippingAddress
from app.serializers import ProductSerializer, OrderSerializer

from rest_framework import status
from datetime import datetime


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create order

        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        # (2) Create shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )

        # (3) Create order items adn set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )

            # (4) Update stock

            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
import logging

logger = logging.getLogger(__name__)
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Only authenticated users can access this view
def getMyOrders(request):
    try:
        user = request.user  # Get the currently logged-in user
        orders = user.order_set.all()  # Get all orders for that user

        if not orders:
            return Response({"message": "No orders found."}, status=status.HTTP_404_NOT_FOUND)

        # Serialize the order data and send it as a response
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    except Exception as e:
        # Handle any unexpected errors and log them
        logger.error(f"Error fetching orders: {str(e)}")
        return Response({"error": "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user

    try:
        order = Order.objects.get(_id=pk)  # Try to fetch the order by ID
    except Order.DoesNotExist:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if the user is the order owner or an admin
    if user.is_staff or order.user == user:
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
    else:
        return Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    # Retrieve the order
    order = Order.objects.filter(_id=pk).first()
    if not order:
        return Response({'detail': 'Order not found'}, status=404)

    # Update the order fields
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    
    # Log for debugging
    print("Order updated to paid:", order._id)
    
    # Return success response
    return Response('Order was paid')

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

from django.db.models import Count, Sum
from django.db.models.functions import TruncMonth, TruncDay, TruncYear
from django.http import JsonResponse
from .models import Order, OrderItem

def get_monthly_report(request):
    try:
        # Orders grouped by month with customer and status details
        orders_per_month = Order.objects.annotate(month=TruncMonth('paidAt')) \
            .values('month', 'user__first_name', 'user__last_name', 'isPaid', 'isDelivered') \
            .annotate(order_count=Count('_id'), total_revenue=Sum('totalPrice')) \
            .order_by('month')

        # Orders per day and year (same logic)
        orders_per_day = Order.objects.annotate(day=TruncDay('paidAt')) \
            .values('day', 'user__first_name', 'user__last_name', 'isPaid', 'isDelivered') \
            .annotate(order_count=Count('_id'), total_revenue=Sum('totalPrice')) \
            .order_by('day')

        orders_per_year = Order.objects.annotate(year=TruncYear('paidAt')) \
            .values('year', 'user__first_name', 'user__last_name', 'isPaid', 'isDelivered') \
            .annotate(order_count=Count('_id'), total_revenue=Sum('totalPrice')) \
            .order_by('year')

        # Get top-selling products with full details (e.g., name, price, and quantity sold)
        top_selling_products = OrderItem.objects.values(
            'product__name', 
            'product__price', 
            'product__description', 
            'product__image'
        ).annotate(total_qty_sold=Sum('qty')) \
        .order_by('-total_qty_sold')[:10]  # Fetch top 10 selling products

        # Pass the product names along with other data
        return JsonResponse({
            'orders_per_month': list(orders_per_month),
            'orders_per_day': list(orders_per_day),
            'orders_per_year': list(orders_per_year),
            'top_selling_products': list(top_selling_products),  # Include top-selling products
        })

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User, Group
from django.contrib.auth.hashers import make_password
from .serializers import UserSerializerWithToken


from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .serializers import UserSerializerWithToken

@api_view(["POST"])
def adminLogin(request):
    data = request.data
    user = authenticate(username=data['username'], password=data['password'])
    
    if user and user.groups.filter(name="Admin").exists():
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    else:
        return Response({"detail": "Invalid admin credentials"}, status=status.HTTP_401_UNAUTHORIZED)
@api_view(["POST"])
def userLogin(request):
    data = request.data
    user = authenticate(username=data['username'], password=data['password'])
    
    if user and user.groups.filter(name="User").exists():
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    else:
        return Response({"detail": "Invalid user credentials"}, status=status.HTTP_401_UNAUTHORIZED)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .permissions import IsAdmin, IsUser

@api_view(["GET"])
@permission_classes([IsAdmin])
def adminOnlyView(request):
    return Response({"message": "Hello Admin!"})

@api_view(["GET"])
@permission_classes([IsUser])
def userOnlyView(request):
    return Response({"message": "Hello User!"})
