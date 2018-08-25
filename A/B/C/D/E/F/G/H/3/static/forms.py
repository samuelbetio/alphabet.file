import re

from django.forms.models import ModelForm
from django.forms import forms

from healingcirclemassage.static.models import Appointment, Email

class AppointmentForm(ModelForm):
    """ Provides the appointment request form
    """

    class Meta:
        model = Appointment

    def clean(self):
        message = self.cleaned_data['description']
        urls = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', message)
        if urls:
            raise forms.ValidationError("Please do not put any URLs in your appointment request comments")
        return self.cleaned_data

    def save(self, commit=True):
        appointment = super(AppointmentForm, self).save()
        return appointment

class EmailForm(ModelForm):
    """Provides the form for adding emails to the mailing list
    """
    class Meta:
        model = Email

    def save(self, commit=True):
        email = super(EmailForm, self).save()
        return email
