from pprint import pprint

import requests

import subprocess
from functools import partial
subprocess.Popen = partial(subprocess.Popen, encoding='utf-8')
import execjs
with open("邯郸公示.js", "r", encoding="utf-8") as f:
    encrypt_js = f.read()
ctx = execjs.compile(encrypt_js)
headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
    "C-GATEWAY-QUERY-ENCRYPT": "1",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://credit.hd.gov.cn/xyxxgs/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "x-gateway-body": "blob"
}
cookies = {
    "_gscu_2016493642": "605801467n3ftj12",
    "_gscbrs_2016493642": "1"
}
url = "https://credit.hd.gov.cn/zx_website/website/sgs/xzxkfr"
params = ctx.call("generateRequestPayload",1)
response = requests.get(url, headers=headers, cookies=cookies, params=params)

# content =  list(response.content)
# print(content)
# result = ctx.call('generateRequestPayload2', content)
# print(result)
pprint(response.content)