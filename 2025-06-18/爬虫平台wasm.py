import requests
import pywasm
import time
wasmFunc = pywasm.load("Wasm.wasm")
headers = {
    "accept": "*/*",
    "accept-language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.mashangpa.com/problem-detail/11/",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
}
cookies = {
    "Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0": "1760602770",
    "HMACCOUNT": "840632E9D6409E85",
    "sessionid": "jw74x97a9txb6xc7vs1f5ds1x59ho0o9",
    "Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0": "1760603060"
}
url = "https://www.mashangpa.com/api/problem-detail/11/data/"
sums=0
for i in range(1,21):
    print(i)
    t = int(time.time())
    m = wasmFunc.exec("encrypt", [i, t])
    params = {
        "page": i,
        "m": m,
        "_ts": t
    }
    response = requests.get(url, headers=headers, cookies=cookies, params=params)
    print(response.text)
    arr =response.json()['current_array']
    sums += sum(arr)
    print(sums)