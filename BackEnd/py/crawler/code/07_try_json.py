import json
import requests

url = "https://m.douban.com/rexxar/api/v2/subject_collection/filter_tv_american_hot/items?os=ios&for_mobile=1&start=0&count=18&loc_id=108288&_=1517148631877"
headers = {
    "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1",
    "Referer": "https://m.douban.com/tv/american"}

response = requests.get(url,headers=headers)
json_str = response.content.decode()

ret1 = json.loads(json_str)
print(ret1)

with open("douban.txt","w",encoding="utf-8") as f:
    f.write(json.dumps(ret1,ensure_ascii=False,indent=2))

