import requests
import json


headers = {
    "Accept": "application/json, text/plain, */*",
    # "Accept-Language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
    # "Connection": "keep-alive",
    "Content-Type": "application/json",
    # "Origin": "https://ygp.gdzwfw.gov.cn",
    # "Referer": "https://ygp.gdzwfw.gov.cn/",
    # "Sec-Fetch-Dest": "empty",
    # "Sec-Fetch-Mode": "cors",
    # "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    # "X-Dgi-Req-App": "ggzy-portal",
    # "X-Dgi-Req-Nonce": "B44chknzfiArxzHM",
    # "X-Dgi-Req-Signature": "fe215b8a0230f3b2095f2675a8c285bb7c1a1dbf678dacb678e6debeba868d0f",
    # "X-Dgi-Req-Timestamp": "1753941467168",
    # "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    # "sec-ch-ua-mobile": "?0",
    # "sec-ch-ua-platform": "\"Windows\""
}
# cookies = {
#     "_horizon_uid": "17309661-a722-4a60-bb56-e35b290ae172",
#     "_horizon_sid": "4e0683ac-cb0c-41bb-be18-a9640df0b2fa"
# }
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
    "pageNo": 2,
    "pageSize": 10
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, data=data)

print(response.text)
print(response)