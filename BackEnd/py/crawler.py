from bs4 import BeautifulSoup
from lxml import html
import xml
import requests

url = "https://blog.csdn.net/qq_32740675/article/details/79720367"

f = requests.get(url)
# print(f.content.decode())

soup = BeautifulSoup(f.content, 'lxml')

title = soup.find(class_='title-article').string

print(title)