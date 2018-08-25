from django import template
from healingcirclemassage.static.forms import EmailForm
register = template.Library()

@register.filter

@register.inclusion_tag("email_form.html")
def display_email_form():
    return {"email_form": EmailForm()}
