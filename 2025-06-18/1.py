import requests
import json


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "form-token": "ea0b035b15bc442872aa9f6e9cb4f90f",
    "nsssjss":"",
    # "nsssjss": "QD5KRTuow+YV5kcfRIhQaFoM6OOklDAq3gyhT8XaBcfL2Zly3elTXac0dN9EwM6VtJWMcovuIqvOX3B6FBiIc+yVCzn7WzmnyYSnD61xM4UXv+KJAmIG/x6tD2hAru1pqId1YM2J2TEUyv4Zr2hAeisXavSOyJuloVDnMsl9TZI=",
    "origin": "https://shanxisheng-zfcgdzmcgov.cn",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://shanxisheng-zfcgdzmcgov.cn/gpmall-main-web/basic/sxNotice",
    "regioncode": "140001000",
    "regionguid": "140001",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sign": "7bdb2b99e0ad7a9f55afbe8cb26a72cc",
    "sitecode": "sxzfcg",
    "siteguid": "6883226032309207040",
    "time": "1751255069636",
    "timestamp": "1751254923182",
    "url": "/gateway/gpmall-bpoc/notice/v1/ignore/getNoticeList",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "webapp": "1"
}
cookies = {
    "webapp": "1",
    "siteCode": "sxzfcg",
    "siteGuid": "6883226032309207040",
    "regioncode": "140001000",
    "regionguid": "140001",
    "theme": "default",
    "regionpguid": "232",
    "rootregionguid": "232",
    "platform": "0",
    "isOpenArea": "true",
    "regionname": "%E7%9C%81%E6%9C%AC%E7%BA%A7"
}
url = "https://shanxisheng-zfcgdzmcgov.cn/gateway/gpmall-bpoc/notice/v1/ignore/getNoticeList"
data = {
    "regionGuid": "232",
    "regionCode": "140000000",
    "agreementTypeCode": "",
    "pageSize": 10,
    "pageNum": 1,
    "noticeType": "0"
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, cookies=cookies, data=data)

print(response.text)
print(response)