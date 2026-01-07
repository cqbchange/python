import re

import requests
import json
import subprocess
from functools import partial
subprocess.Popen = partial(subprocess.Popen, encoding='utf-8')
import execjs
from fake_useragent import UserAgent


headers = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
    "app-guestid": "A4AF4F5D6AAC462144AE3DFDEADED33D",
    "app-version": "0",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://hangzhou.qccqcc.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://hangzhou.qccqcc.com/",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "user-agent": UserAgent().random
}
url = 'https://hangzhou.qccqcc.com/'
response = requests.get(url, headers=headers)
qccppm = re.findall('var qccppm = "(.*?)";', response.text)[0]
with open('青创网.js','r',encoding="utf-8") as f:
    encrypt_js = f.read()
ctx = execjs.compile(encrypt_js)
mts = ctx.call('encrypt_payload',qccppm)
url = "https://newopenapiweb.17qcc.com/api/services/app/SearchFactory/GetPageList"
data = mts
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, data=data)
result = response.json()['Result']
res = ctx.call("decrypt_response",qccppm,result)
print(res)
print(response)