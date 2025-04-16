import requests
url = 'https://stu.tulingpyton.cn/api/problem-detail/4/data/?page={}'
import execjs
headers = {
    "accept": "*/*",
    "accept-language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://stu.tulingpyton.cn/problem-detail/4/",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "cookie": "Hm_lvt_68a51533e634d0e8a2ec721a36d779fd=1739771807; Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183=1744772072; HMACCOUNT=9B301633E4596244; sessionid=tnm11u3ek7nft64vnzm2dfz7kp9wkct0; Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183=1744773216",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
}
num = 0
with open('script.js', 'r') as file:
    js_code = file.read()
# 读取JS文件内容
with open('script.js', 'r') as file:
    js_code = file.read()

# 执行JS代码
ctx = execjs.compile(js_code)
result = ctx.call('loadPage', 4)  # 调用JS函数
# for i in range(1,21):
#     response = requests.get(url.format(i), headers=headers).json()
#     print(i,response)
#     if response['current_array']:
#        s = sum(response['current_array'])
#        num = num+s
#        print(num)
