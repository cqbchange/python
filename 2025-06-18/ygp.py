import requests
import json


headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://ygp.gdzwfw.gov.cn",
    "Pragma": "no-cache",
    "Referer": "https://ygp.gdzwfw.gov.cn/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    # "X-Dgi-Req-App": "ggzy-portal",
    # "X-Dgi-Req-Nonce": "dYNJSx7cSCEu8wjd",
    # "X-Dgi-Req-Signature": "710d1843f68eb8f7754a5322396bb9bdc600e3d2a5489ea8f8c689dc6b8c3571",
    # "X-Dgi-Req-Timestamp": "1759123432027",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
cookies = {
    "_horizon_uid": "17309661-a722-4a60-bb56-e35b290ae172",
    "_horizon_sid": "c66b4553-ac72-4ce2-a6ab-54b6e96c1548"
}
url = "https://ygp.gdzwfw.gov.cn/ggzy-portal/search/v2/items"
data = {
    "type": "trading-type",
    "openConvert": False,
    "keyword": "",
    "siteCode": "44",
    "secondType": "A",
    "tradingProcess": "",
    "thirdType": "[]",
    "projectType": "",
    "publishStartTime": "",
    "publishEndTime": "",
    "pageNo": 1,
    "pageSize": 10
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, data=data)

print(response.text)
print(response)