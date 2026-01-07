import execjs
import requests

with open('myToken.js', encoding='utf-8') as f:
    js_code = f.read()

js = execjs.compile(js_code)
code = js.call('get_params')
headers = {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "origin": "https://www.mytokencap.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.mytokencap.com/",
    "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Google Chrome\";v=\"133\", \"Chromium\";v=\"133\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
}
url = "https://api.mytokenapi.com/ticker/currencyranklist"
params = {
    "pages": "1,1",
    "sizes": "100,100",
    "subject": "market_cap",
    "language": "en_US",
    "legal_currency": "USD",
    "code": code['code'],
    "timestamp": code['time'],
    "platform": "web_pc",
    "v": "0.1.0",
    "mytoken": ""
}
response = requests.get(url, headers=headers, params=params)
print(response.json())