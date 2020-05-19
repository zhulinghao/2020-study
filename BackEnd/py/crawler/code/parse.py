import requests
from retrying import retry

'''
专门请求url地址的方法
'''

# headers = {
#     "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"}

headers = {
    "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1",
    "Referer": "https://m.douban.com/tv/american"}

@retry(stop_max_attempt_number=3)  #让被装饰的函数反复执行三次，三次全部报错才会报错，中间又一次正常，程序继续往后走
def _parse_url(url):
    print("*"*100)
    response = requests.get(url,headers=headers,timeout=5)
    return response.content.decode()

def parse_url(url):
    try:
        html_str = _parse_url(url)
    except:
        html_str = None
    return html_str

if __name__ == '__main__':
    url = "http://www.baidu.com"
    url1 = "www.baidu.com"
    print(parse_url(url1))