from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=50)

    def __unicode__(self):
        return self.name
