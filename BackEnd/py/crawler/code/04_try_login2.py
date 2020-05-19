# coding=utf-8
import requests

url = "http://www.renren.com/327550029/profile"
headers = {"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1",
           }

cookie="anonymid=jcysvok0-5ad7y0; depovince=GW; jebecookies=7c8f517c-cd19-43e2-a3aa-167372392e98|||||; _r01_=1; JSESSIONID=abcCwQQelI5Mxd1cx48ew; ick_login=d616d74d-6f98-420c-af4d-f9e855b11e0d; _de=BF09EE3A28DED52E6B65F6A4705D973F1383380866D39FF5; p=d0cd0b910f5be6e2328b8ce0fc7ab0569; first_login_flag=1; ln_uact=mr_mao_hacker@163.com; ln_hurl=http://hdn.xnimg.cn/photos/hdn421/20171230/1635/main_JQzq_ae7b0000a8791986.jpg; t=69282122a1706bf87220ce140d1d44579; societyguester=69282122a1706bf87220ce140d1d44579; id=327550029; xnsid=c31e4689; loginfrom=syshome; ch_id=10016"

cookie_dict = {i.split("=")[0]:i.split("=")[-1] for i in cookie.split("; ")}

print(cookie_dict)

response = requests.get(url,headers=headers,cookies=cookie_dict)

with open("renren2.html","w",encoding="utf-8") as f:
    f.write(response.content.decode())
