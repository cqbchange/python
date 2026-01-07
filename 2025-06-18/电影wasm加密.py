import pywasm
import requests
import time


headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://spa14.scrape.center/page/4",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://spa14.scrape.center/api/movie/"
retTime = pywasm.load('Wasm.wasm')
sign = retTime.exec("encrypt", [10, int(time.time())])
params = {
    "limit": "10",
    "offset": "30",
    "sign": sign
}
# e = this.$wasm.asm.encrypt(n, parseInt(Math.round((new Date).getTime() / 1e3).toString()));
response = requests.get(url, headers=headers, params=params)

print(response.text)
print(response)