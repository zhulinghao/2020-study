from bs4 import BeautifulSoup
import os
import requests
# from selenium import webdriver

# browser = webdriver.Chrome()

# browser.get('https://manhua.dmzj.com/lkxlrjk/41.shtml')

# options = browser.find_elements_by_css_selector("#page_select option")
# # print(options)
# arr = []
# for item in options:
#     url = item.get_attribute('value')
#     name = url[-7:len(url)]
#     r = requests.get('http:' + url)
#     with open('./image/' + name + '.png', 'wb') as f:
#         f.write(r.content)

#     # arr.append(item.get_attribute('value'))
# browser.close()

# _str = "~".join(arr)
# fd = os.open("第一章.txt",os.O_RDWR|os.O_CREAT)
# os.write(fd, _str.encode())
# os.close(fd)



response = requests.get('https://manhua.dmzj.com/lkxlrjk/41.shtml')
# 解码
html = response.content.decode()
# 创建bs4对象
soup = BeautifulSoup(html,'lxml')

fd = os.open("f1.html",os.O_RDWR|os.O_CREAT)
os.write(fd, html.encode())
os.close(fd)
# # print(soup)

# #获取岗位标签
# #通过类名rt找到岗位数量标签
# jobNum = soup.select('#page_select')
# print(jobNum)
