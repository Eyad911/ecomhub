# Generated by Django 4.0.3 on 2022-04-07 09:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_alter_user_options_remove_user_email_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='order',
            options={'permissions': [('cancel_order', 'Can cancel order')]},
        ),
    ]
