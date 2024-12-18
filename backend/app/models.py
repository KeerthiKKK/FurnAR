from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Product(models.Model):
    user= models.ForeignKey(User, on_delete=models.SET_NULL,null=True)
    name= models.CharField(max_length=200,null=True,blank=True)
    image= models.ImageField(null=True,blank=True,upload_to='images/')
    brand=models.CharField(max_length=200,null=True,blank=True)
    category=models.CharField(max_length=200,null=True,blank=True)
    description=models.TextField(null=True,blank=True)
    rating= models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    numReviews= models.IntegerField(null=True,blank=True,default=0)
    price=models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    modelFile = models.FileField(null=True, blank=True,upload_to='models/')
    countInStock=models.IntegerField(null=True,blank=True,default=0)
    createdAt= models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)


    def __str__(self):
        return self.name

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)
    
from django.db import models
from django.contrib.auth.models import User

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)  # Total cost of the order
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)  # This tracks when the order is placed
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"Order {self._id} by {self.user.username if self.user else 'Unknown'}"

    def calculate_total_price(self):
        """
        Calculate total price of the order based on related OrderItems.
        """
        total = sum(item.qty * item.price for item in self.items.all())  # Sum total price of all items in the order
        self.totalPrice = total
        self.save()

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, related_name='items')  # Related name for reverse lookup
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)  # Store price at time of purchase
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

def __str__(self):
    order_id = self.order._id if self.order else 'Unknown Order'
    product_name = self.product.name if self.product else 'Unknown Product'
    return f"{self.qty} x {product_name} in {order_id}"

def calculate_item_price(self):
    return self.qty * self.price  # Calculates the total price for this specific item


class ShippingAddress(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    phoneno = models.TextField(max_length=100,null=True,blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)