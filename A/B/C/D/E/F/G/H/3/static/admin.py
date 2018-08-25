from django.contrib import admin
from healingcirclemassage.static.models import Service, Faq, NewsItem, Event, Writing, Testimonial, Resume, HomeText, Appointment, Interview, WritingTestimonial, DVDTestimonial, ContributingWriter, Email, SpeakingTestimonial

class EmailAdmin(admin.ModelAdmin):
    pass
admin.site.register(Email, EmailAdmin)

class InterviewAdmin(admin.ModelAdmin):
    pass
admin.site.register(Interview, InterviewAdmin)

class ContributingWriterAdmin(admin.ModelAdmin):
    pass
admin.site.register(ContributingWriter, ContributingWriterAdmin)

class ResumeAdmin(admin.ModelAdmin):
    pass
admin.site.register(Resume, ResumeAdmin)

class AppointmentAdmin(admin.ModelAdmin):
    pass
admin.site.register(Appointment, AppointmentAdmin)

class HomeTextAdmin(admin.ModelAdmin):
    pass
admin.site.register(HomeText, HomeTextAdmin)

class ServiceAdmin(admin.ModelAdmin):
    pass
admin.site.register(Service, ServiceAdmin)

class FaqAdmin(admin.ModelAdmin):
    pass
admin.site.register(Faq, FaqAdmin)

class NewsItemAdmin(admin.ModelAdmin):
    pass
admin.site.register(NewsItem, NewsItemAdmin)

class EventAdmin(admin.ModelAdmin):
    pass
admin.site.register(Event, EventAdmin)

class WritingAdmin(admin.ModelAdmin):
    pass
admin.site.register(Writing, WritingAdmin)

class TestimonialAdmin(admin.ModelAdmin):
    pass
admin.site.register(Testimonial, TestimonialAdmin)

class WritingTestimonialAdmin(admin.ModelAdmin):
    pass
admin.site.register(WritingTestimonial, WritingTestimonialAdmin)

class DVDTestimonialAdmin(admin.ModelAdmin):
    pass
admin.site.register(DVDTestimonial, DVDTestimonialAdmin)

class SpeakingTestimonialAdmin(admin.ModelAdmin):
    pass
admin.site.register(SpeakingTestimonial, SpeakingTestimonialAdmin)
