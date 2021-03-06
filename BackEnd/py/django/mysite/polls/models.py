from django.db import models


def was_published_recently(self):
    now = timezone.now()
    return now - datetime.timedelta(days=1) <= self.pub_date <= now


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField("date published")

    def __str__(self):
        return self.question_text


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text

class CartoonBook(models.Model):
    book_name = models.CharField(max_length=200)
    pub_date = models.DateTimeField("date published")

    def __str__(self):
        return self.book_name

class CartoonChapter(models.Model):
    book = models.ForeignKey(CartoonBook, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    content = models.CharField(max_length=20000)
    def __str__(self):
        return self.name
