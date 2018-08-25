from django.db import models


class Appointment(models.Model):
    """ Model for the appointment requests submitted on the appointments page
    """

    first_name = models.CharField(max_length = 100)
    last_name = models.CharField(max_length = 100)
    phone_number = models.CharField(max_length = 20)
    email = models.EmailField()
    description = models.TextField()

    def __unicode__(self):
        return self.last_name

class Email(models.Model):
    """ Model for the emails submitted to be added to the mailing list
    """
    email = models.EmailField()

    def __unicode__(self):
        return self.email

class Resume(models.Model):
    employment = models.TextField()
    training_and_education = models.TextField()
    professional = models.TextField()
    personal_interests = models.TextField()
    date = models.DateField()

    def __unicode__(self):
        return str(self.date)

    class Meta:
        ordering = ['-date']
        get_latest_by = "date"

class HomeText(models.Model):
    text = models.TextField()
    date = models.DateField()

    def __unicode__(self):
        return str(self.date)

    class Meta:
        ordering = ['-date']
        get_latest_by = "date"

class Service(models.Model):

    CATEGORY_CHOICES = (
        ("M","Massage Services"),
        ("O","Other Services"),
        )


    name = models.CharField(max_length = 255)
    description = models.TextField()
    price = models.TextField()
    category = models.CharField(max_length=1, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to="images", null=True, blank=True)

    def __unicode__(self):
        return self.name

class Faq(models.Model):
    question = models.TextField()
    answer = models.TextField()

    def __unicode__(self):
        return self.question

class NewsItem(models.Model):
    name = models.CharField(max_length = 255)
    link = models.CharField(max_length = 255, null=True, blank=True)
    thumbnail_image = models.ImageField(upload_to="images", null=True, blank=True)
    image_1 = models.ImageField(upload_to="images", null=True, blank=True)
    image_2 = models.ImageField(upload_to="images", null=True, blank=True)
    image_3 = models.ImageField(upload_to="images", null=True, blank=True)
    image_4 = models.ImageField(upload_to="images", null=True, blank=True)

    def __unicode__(self):
        return self.name

class Interview(models.Model):
    name = models.CharField(max_length = 255)
    link = models.CharField(max_length = 255, null=True, blank=True)

    def __unicode__(self):
        return self.name

class Event(models.Model):
    name = models.CharField(max_length = 255)
    image = models.ImageField(upload_to="images")

    def __unicode__(self):
        return self.name

class Writing(models.Model):
    name = models.CharField(max_length = 255)
    link = models.CharField(max_length = 255, null=True, blank=True)
    thumbnail_image = models.ImageField(upload_to="images", null=True, blank=True)
    image_1 = models.ImageField(upload_to="images", null=True, blank=True)
    image_2 = models.ImageField(upload_to="images", null=True, blank=True)
    image_3 = models.ImageField(upload_to="images", null=True, blank=True)
    image_4 = models.ImageField(upload_to="images", null=True, blank=True)

    def __unicode__(self):
        return self.name

class Testimonial(models.Model):
    description = models.TextField()
    source = models.CharField(max_length = 255)

    def __unicode__(self):
        return self.source

class WritingTestimonial(models.Model):
    description = models.TextField()
    source = models.CharField(max_length = 255)

    def __unicode__(self):
        return self.source

class DVDTestimonial(models.Model):
    description = models.TextField()
    source = models.CharField(max_length = 255)

    def __unicode__(self):
        return self.source

class SpeakingTestimonial(models.Model):
    description = models.TextField()
    source = models.CharField(max_length = 255)

    def __unicode__(self):
        return self.source

class ContributingWriter(models.Model):

    SOURCE_CHOICES = (
        ("B","Bizchicksrule.com"),
        ("M","MassageMagazine.com"),
        ("S","Southwest Blend Magazine"),
        ("G","Massage Schools Guide"),
        ("P","Pacific Coast Business Times"),
        ("C","Corporate Wellness Magazine"),
        ("SB","SBParent"),
        ("O","Other"),
        )

    name = models.CharField(max_length = 255)
    link = models.CharField(max_length = 255, null=True, blank=True)
    publication = models.CharField(max_length=1, choices=SOURCE_CHOICES)
    def __unicode__(self):
        return self.name
