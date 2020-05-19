from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect

# from django.http import Http404
# from django.template import loader
from django.urls import reverse
from .models import Question, Choice, CartoonBook, CartoonChapter
from django.views import generic
from django.utils import timezone
import json

def crawlerCartoon(search_name):
    import os
    import time
    from string import Template
    from bs4 import BeautifulSoup
    from selenium import webdriver
    
    print(search_name)
    browser = webdriver.Chrome()
    _id = None
    # 获取一章并存放在文件夹
    def getChapterData(data):
        browser.get(data["link"])

        options = browser.find_elements_by_css_selector("#page_select option")
        # print(options)
        arr = []
        for item in options:
            url = item.get_attribute("value")
            print({"url": url, "name": url[-7 : len(url)]})
            arr.append({"url": url, "name": url[-7 : len(url)]})
        # data["name"] 章节名称   search_name  书名
        print(_id)
        b = CartoonBook.objects.get(pk=_id)
        b.cartoonchapter_set.create(book=search_name, name=data["name"], content=json.dumps(arr))

    def init(_name):
        links = []
        # 打开搜索页
        browser.get("https://manhua.dmzj.com/tags/search.shtml?s=" + _name)
        # 等待ajax请求 2s
        time.sleep(2)
        print(Template("//a[@title='${name}']").substitute(name=_name))
        # 选择第一个
        try:
            currentATag = browser.find_element_by_xpath(
                Template("//a[@title='${name}']").substitute(name=_name)
            )
        except Exception as e:  # 将报错存储在 e 中
            
            return '出错啦！他们没这个漫画~'

        currentHerf = currentATag.get_attribute("href")
        print(currentHerf)
        # 获取当前所有章节的 url
        browser.get(currentHerf)

        nonlocal _id
        b = CartoonBook(book_name=_name, pub_date=timezone.now())
        b.save()

        _id = b.id
        print(b.id)

        zjlist = browser.find_elements_by_css_selector(".cartoon_online_border ul li a")
        if len(zjlist) == 0:
            zjlist = browser.find_elements_by_css_selector(
                ".cartoon_online_border_other ul li a"
            )
        for zjItem in zjlist:
            links.append({"link": zjItem.get_attribute("href"), "name": zjItem.text})

        for linkItem in links:
            print(linkItem)
            getChapterData(linkItem)

        # 关闭浏览器
        browser.close()

        return '以爬取完成~'

    return init(search_name)


def getCartoon(request, name):
    HttpResponse('正在爬取漫画' + name + '，并把数据写入我们的数据库中...')
    message = crawlerCartoon(name)
    return HttpResponse(name + message)


# Create your views here.
class CartoonView(generic.ListView):
    template_name = "polls/cartoon.html"
    context_object_name = "cartoon_list"

    def get_queryset(self):
        """Return the last five published questions."""
        return CartoonBook.objects.all()

class CartoonDetailView(generic.DetailView):
    model = CartoonBook
    template_name = "polls/cartoon_detail.html"

class CartoonReadView(generic.DetailView):
    model = CartoonChapter
    template_name = "polls/cartoon_read.html"

    def get_object(self):
        obj = super(CartoonReadView, self).get_object()
        obj.content = json.loads(obj.content)
        return obj

# Create your views here.
class IndexView(generic.ListView):
    template_name = "polls/index.html"
    context_object_name = "latest_question_list"

    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.order_by("-pub_date")[:5]


class DetailView(generic.DetailView):
    model = Question
    template_name = "polls/detail.html"


class ResultsView(generic.DetailView):
    model = Question
    template_name = "polls/results.html"


def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    print(request.POST)
    try:
        selected_choice = question.choice_set.get(pk=request.POST["choice"])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(
            request,
            "polls/detail.html",
            {"question": question, "error_message": "You didn't select a choice."},
        )
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse("polls:results", args=(question.id,)))

