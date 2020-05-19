# coding=utf-8
import requests
url = "http://fanyi.baidu.com/basetrans"

query_string = {"query":"你好，世界",
        "from":"zh",
        "to":"en"}

headers = {"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1",}

response = requests.post(url,data=query_string,headers=headers)
print(response)

print(response.content.decode())
print(type(response.content.decode()))
print(response.headers)