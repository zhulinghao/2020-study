import json
import os
import time
from string import Template
from bs4 import BeautifulSoup
from selenium import webdriver


search_name = input('请输入要爬取的漫画名:')
browser = webdriver.Chrome(R"E:\software\anaconda\Scripts\chromedriver.exe")

# 获取一章并存放在文件夹
def getChapterData(data):
    print(data['link'])
    browser.get(data['link'])

    options = browser.find_elements_by_css_selector("#page_select option")
    # print(options)
    arr = []
    for item in options:
        url = item.get_attribute('value')
        print({
            "url": url,
            "name": url[-7:len(url)]
        })
        arr.append({
            "url": url,
            "name": url[-7:len(url)]
        })

    with open('./' + search_name + '/' + data['name'] + '.json', 'w') as file_object:
        json.dump(arr, file_object)

def init(_name):
    links = []
    # 打开搜索页
    browser.get('https://manhua.dmzj.com/tags/search.shtml?s=' + _name)
    # 等待ajax请求 2s
    time.sleep(2)
    print(Template("//a[@title='${name}']").substitute(name=_name))
    # 选择第一个
    currentATag = browser.find_element_by_xpath(Template("//a[@title='${name}']").substitute(name=_name))
    currentHerf = currentATag.get_attribute('href')
    print(currentHerf)
    # 获取当前所有章节的 url
    browser.get(currentHerf)
    file_path = './' + _name
    if not os.path.exists(file_path): # 判断文件夹是否已经存在    
        os.mkdir(file_path)
        print(file_path + ' 创建成功')
    else:
        print(file_path + ' 目录已存在')

    zjlist = browser.find_elements_by_css_selector('.cartoon_online_border ul li a')
    if(len(zjlist) == 0):
        zjlist = browser.find_elements_by_css_selector('.cartoon_online_border_other ul li a')
    for zjItem in zjlist:
        links.append({
            "link": zjItem.get_attribute('href'),
            "name": zjItem.text
        })

    for linkItem in links:
        print(linkItem)
        getChapterData(linkItem)

    # 关闭浏览器
    browser.close()



init(search_name)
