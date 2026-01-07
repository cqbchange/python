import requests


headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
    "Auth-Plus;": "",
    "Cache-Control": "no-cache",
    "Client-Encrypt": "v1.1",
    "Connection": "keep-alive",
    "Origin": "https://www.hanghangcha.com",
    "Pragma": "no-cache",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
    "clientInfo": "web",
    "clientVersion": "1.0.6",
    "currentHref": "https://www.hanghangcha.com/hhcreport",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
cookies = {
    "Hm_lvt_1521e0fb49013136e79181f2888214a7": "1758871633,1760513080",
    "Hm_lpvt_1521e0fb49013136e79181f2888214a7": "1760513080",
    "HMACCOUNT": "840632E9D6409E85",
    "JSESSIONID": "6E7652D7A419ADB16CFD96CB02ACDAE0",
    "WX_OPEN": "VT5akOFPaqujlinfBmmSFyfwjklpo2UxRMgJ1/dzfHff2PMP0K8JmjMbrDRe8Xhy6VjWzI3gJidyrcwEciuMZvkV+CE1Kxo/p2lXtXzj9qf+KVgGj+oLQwuDvxNsJl28",
    "_ACCOUNT_": "MTRhYWFlODY4NWY0NDIxYTgxOWJhMGJjMTBiOGFkZWElNDAlNDBtb2JpbGU6MTc2MTcyMjgyMjIzNjozMmI4ZDE2Yjk3MmU0YzRlYzlhZDViOGQ1OGU1ZjdkNQ"
}
url = "https://api.hanghangcha.com/hhc/member/industry/getReportList"
params = {
    "filter": "{\"reportType\":null,\"limit\":10,\"skip\":30}"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)