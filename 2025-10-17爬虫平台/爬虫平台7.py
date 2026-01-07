import json

import execjs
import requests

with open("爬虫平台7.js", "r", encoding="utf-8") as f:
    encrypt_js = f.read()
ctx = execjs.compile(encrypt_js)
cookies = {
    "sessionid": "jw74x97a9txb6xc7vs1f5ds1x59ho0o9",
    "Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0": "1760602770,1760663461",
    "HMACCOUNT": "840632E9D6409E85",
    "Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0": "1760672519"
}
nums = 0
url = "https://www.mashangpa.com/api/problem-detail/7/data/"
for i in range(1, 21):
    js = ctx.call('encryptMd5')
    headers = {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
        "cache-control": "no-cache",
        "m": js['m'],
        "pragma": "no-cache",
        "priority": "u=1, i",
        "referer": "https://www.mashangpa.com/problem-detail/7/",
        "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "ts": str(js['ts']),
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
        "x-requested-with": "XMLHttpRequest"
    }
    params = {
        "page": i,
        "x": js['x']
    }
    response = requests.get(url, headers=headers, cookies=cookies, params=params)
    res = ctx.call('xxxxoooo', response.json()['r'])
    res = json.loads(res)['current_array']
    nums += sum(res)
    print(nums)