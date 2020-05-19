from django.db import models

# 模型类，可以和数据库交互
class BookInfo(models.Model):
    title=models.CharField(max_length=20)
    pub_data=models.DateField()

class HeroInfo(models.Model):
    name=models.CharField(max_length=20)
    content=models.CharField(max_length=20)
    gender=models.BooleanField(default=True)
    book=models.ForeignKey(BookInfo, on_delete=models.PROTECT)

