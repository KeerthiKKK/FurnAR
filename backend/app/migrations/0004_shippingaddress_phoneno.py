# Generated by Django 5.1.2 on 2024-11-25 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_alter_product_image_alter_product_modelfile'),
    ]

    operations = [
        migrations.AddField(
            model_name='shippingaddress',
            name='phoneno',
            field=models.TextField(blank=True, max_length=100, null=True),
        ),
    ]