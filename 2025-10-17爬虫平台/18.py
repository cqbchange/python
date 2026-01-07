import time

import execjs
import requests

with open("18.js", "r", encoding="utf-8") as f:
    encrypt_js = f.read()
ctx = execjs.compile(encrypt_js)
cookies = {
    "sessionid": "jw74x97a9txb6xc7vs1f5ds1x59ho0o9",
    "_nano_fp": "XpmjX0UYX5UoXpX8nC_G0HhLbXfxcNeGCS_OM3oG",
    "Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0": "1760923087,1761546856,1761616332,1761881130",
    "HMACCOUNT": "840632E9D6409E85",
    "Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0": "1761887422"
}
url = "https://www.mashangpa.com/api/problem-detail/18/data/"
nums = 0
# for i in range(6, 21):
#     params = {
#         "page": i
#     }
#     mts = ctx.call('getData')
#     headers = {
#         "accept": "application/json, text/javascript, */*; q=0.01",
#         "accept-language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
#         "cache-control": "no-cache",
#         "client-version": "1.0.0",
#         "m": mts['m'],
#         "pragma": "no-cache",
#         "priority": "u=1, i",
#         "referer": "https://www.mashangpa.com/problem-detail/18/",
#         "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
#         "sec-ch-ua-mobile": "?0",
#         "sec-ch-ua-platform": "\"Windows\"",
#         "sec-fetch-dest": "empty",
#         "sec-fetch-mode": "cors",
#         "sec-fetch-site": "same-origin",
#         "timestamp": str(mts['ts']),
#         "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
#         "x-requested-with": "XMLHttpRequest"
#     }
#     response = requests.get(url, headers=headers, cookies=cookies, params=params)
#     print(response.json(),params)
#     if response.json()['current_array']:
#         nums += sum(response.json()['current_array'])
#     print(nums,params,mts)

# 4788 5017  9499
# ss={
#     '1':'4788',
#     '2':'5017',
#     "3,4,5":'13349'，
#     "6-20":'76690'
# }
page = 1
while True:
    if page > 20:
        break
    params = {
        "page": page
    }
    mts = ctx.call('getData')
    headers = {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
        "cache-control": "no-cache",
        "client-version": "1.0.0",
        "m": mts['m'],
        "pragma": "no-cache",
        "priority": "u=1, i",
        "referer": "https://www.mashangpa.com/problem-detail/18/",
        "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "timestamp": str(mts['ts']),
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
        "x-requested-with": "XMLHttpRequest"
    }
    response = requests.get(url, headers=headers, cookies=cookies, params=params)
    try:
        if response.json()['current_array']:
            nums += sum(response.json()['current_array'])
            page += 1
    except:
        print(response.json())
    print(nums,params,response.json()['current_array'])
    time.sleep(5)
print(page)