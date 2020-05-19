from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
from django.template import loader


def index(request):
    context = {
        'latest_question_list': [1,2,3,4,5],
    }
    return render(request, 'book_test/index.html', context)

def detail(request, book_id):
    return HttpResponse('2333333333%s' % book_id)