import json
import time

import execjs
import requests

with open("爬虫平台.js", "r", encoding="utf-8") as f:
    encrypt_js = f.read()
ctx = execjs.compile(encrypt_js)

headers = {
    "accept": "*/*",
    "accept-language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.mashangpa.com/problem-detail/4/",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
}
cookies = {
    "sessionid": "jw74x97a9txb6xc7vs1f5ds1x59ho0o9",
    "Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0": "1760602770,1760663461",
    "HMACCOUNT": "840632E9D6409E85",
    "Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0": "1760663534"
}
# url = "https://www.mashangpa.com/api/problem-detail/19/data/"
# sums = 0
# for i in range(1, 21):
#     params = {
#         "page": i
#     }
#     response = requests.get(url, headers=headers, cookies=cookies, params=params)
#     res =ctx.call('decrypt', response.json()['r'], response.json()['k'])
#     res = json.loads( res)['current_array']
#     sums += sum(res)
#     print(sums)

# 第4题
# sums =0
# headers = {
#     "accept": "*/*",
#     "accept-language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
#     "cache-control": "no-cache",
#     "pragma": "no-cache",
#     "priority": "u=1, i",
#     "referer": "https://www.mashangpa.com/problem-detail/4/",
#     "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
#     "sec-ch-ua-mobile": "?0",
#     "sec-ch-ua-platform": "\"Windows\"",
#     "sec-fetch-dest": "empty",
#     "sec-fetch-mode": "cors",
#     "sec-fetch-site": "same-origin",
#     "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
# }
# cookies = {
#     "sessionid": "jw74x97a9txb6xc7vs1f5ds1x59ho0o9",
#     "Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0": "1760602770,1760663461",
#     "HMACCOUNT": "840632E9D6409E85",
#     "Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0": "1760666180"
# }
# # print(ctx.call('md5',1)['sign'],ctx.call('md5',1)['timestamp'])
# url = "https://www.mashangpa.com/api/problem-detail/4/data/"
# for i in range(1, 21):
#     md5 = ctx.call('md5',i)
#     params = {
#         "page":i,
#         "sign": md5['sign'],
#         "_ts": md5['timestamp']
#     }
#     print(params)
#     response = requests.get(url, headers=headers, cookies=cookies, params=params)
#     res = response.json()['current_array']
#     sums += sum(res)
#     print(sums)

# import requests
# import json
# sums=0
#
# headers = {
#     "accept": "*/*",
#     "accept-language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
#     "cache-control": "no-cache",
#     "content-type": "application/json",
#     "origin": "https://www.mashangpa.com",
#     "pragma": "no-cache",
#     "priority": "u=1, i",
#     "referer": "https://www.mashangpa.com/problem-detail/5/",
#     "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
#     "sec-ch-ua-mobile": "?0",
#     "sec-ch-ua-platform": "\"Windows\"",
#     "sec-fetch-dest": "empty",
#     "sec-fetch-mode": "cors",
#     "sec-fetch-site": "same-origin",
#     "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
# }
# cookies = {
#     "sessionid": "jw74x97a9txb6xc7vs1f5ds1x59ho0o9",
#     "Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0": "1760602770,1760663461",
#     "HMACCOUNT": "840632E9D6409E85",
#     "Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0": "1760668984"
# }
# url = "https://www.mashangpa.com/api/problem-detail/5/data/"
# for i in range(1, 21):
#     xl = ctx.call('encrypt5',i)
#     data = {
#         "xl": xl
#     }
#     data = json.dumps(data, separators=(',', ':'))
#     response = requests.post(url, headers=headers, cookies=cookies, data=data)
#     res = response.json()['current_array']
#     sums += sum(res)
#     print(sums)

import requests

ss = ctx.call('encryptMd5')
nums =0
cookies = {
    "sessionid": "jw74x97a9txb6xc7vs1f5ds1x59ho0o9",
    "Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0": "1760602770,1760663461",
    "HMACCOUNT": "840632E9D6409E85",
    "Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0": "1760671412"
}
url = "https://www.mashangpa.com/api/problem-detail/6/data/"
for i in range(1, 21):
    headers = {
        "accept": "*/*",
        "accept-language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "referer": "https://www.mashangpa.com/problem-detail/6/",
        "s": ss['s'],
        "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "tt": str(ss['tt']),
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
    }
    params = {
        "page": i
    }
    response = requests.get(url, headers=headers, cookies=cookies, params=params)
    res = ctx.call('xxxxoooo',response.json()['t'])
    res = json.loads(res)['current_array']
    nums += sum(res)
    print(nums)