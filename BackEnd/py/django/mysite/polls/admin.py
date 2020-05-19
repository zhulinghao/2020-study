from django.contrib import admin
from django.utils import timezone
from .models import Question, Choice


class ChoiceInline(admin.StackedInline):
    model = Choice
    extra = 1

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['question_text']}),
        ('Date information', {'fields': ['pub_date']}),
    ]
    inlines = [ChoiceInline]


admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
