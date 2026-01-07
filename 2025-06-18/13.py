import requests
import json


headers = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "origin": "https://www.mashangpa.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "r": "3aaa07174ab7844df2486cf47b281b41",
    "referer": "https://www.mashangpa.com/problem-detail/13/",
    "s": "023556729020991fb3785aa05a1e3ae7",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "t": "1765329816000",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "x-requested-with": "XMLHttpRequest"
}
cookies = {
    "_nano_fp": "XpmjX0UYX5UoXpX8nC_G0HhLbXfxcNeGCS_OM3oG",
    "v": "QTEwRWFnTWw1bjlzSG96YmRma1JaTjN1YkRKVmVwRmZtNl8xcUI4am1xVGlxSE1zNThxaG5Ddi1CWFNzMTc2MjM5MjYxOTM3MQ==",
    "sessionid": "k84xsublm0xcjhhiqiw8qw2que2t8szn",
    "Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0": "1763458271,1763515648,1765261806,1765329710",
    "HMACCOUNT": "840632E9D6409E85",
    "Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0": "1765329719"
}
url = "https://www.mashangpa.com/api/problem-detail/13/data/"
data = {
    "page": "3"
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, cookies=cookies, data=data)

print(response.text)
print(response)