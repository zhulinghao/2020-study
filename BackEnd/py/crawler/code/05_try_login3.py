# coding=utf-8
import requests

#实例化session
session = requests.session()

#使用session发送post请求,获取对方保存在本地的cookie
post_url = "http://www.renren.com/PLogin.do"
headers = {"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1",}
post_data = {"email":"mr_mao_hacker@163.com","password":"alarmchime"}
session.post(post_url,headers=headers,data=post_data)



# 在使用session 请求登录后的页面
url = "http://www.renren.com/327550029/profile"
response = session.get(url,headers=headers)

with open("renren3.html","w",encoding="utf-8") as f:
    f.write(response.content.decode())