# 模拟登陆~
# 成功~

from bs4 import BeautifulSoup
from lxml import html
import xml
import requests

postUrl = 'http://34.94.19.85:54321/api/userLogin'

postData = { "username": 'any', "password": 'any' }
postResponse = requests.post(postUrl, data=postData)

cookie_dict = postResponse.headers['Set-Cookie']

print(cookie_dict)


url = 'http://34.94.19.85:54321/'

headers = {
  "Cookie": cookie_dict
}

response = requests.get(url, headers=headers)

print(response.content.decode())


with open("test.html","w",encoding="utf-8") as f:
    f.write(response.content.decode())