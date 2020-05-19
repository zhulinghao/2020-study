import requests

url = "http://www.baidu.com"

headers = {"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"}
response = requests.get(url,headers=headers)
# print(response)

#获取网页的html字符串
# response.encoding = "utf-8"
#
# print(response.text)


print(response.content.decode())