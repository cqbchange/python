import requests


headers = {
    "accept": "*/*",
    "accept-language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
    "cache-control": "no-cache",
    "hexin-v": "QTJ1enVYTDJpREdPaE5wdTdNc3Yybl9FLW9SWGdINnAtWlpEdk4zcFJJZ0JKSVg2WlZBUFVnbGswd0h1MTc2MjE0MDYyNzI4MA==",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.mashangpa.com/problem-detail/15/",
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
    "_nano_fp": "XpmjX0UYX5UoXpX8nC_G0HhLbXfxcNeGCS_OM3oG",
    "Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0": "1761546856,1761616332,1761881130,1762132239",
    "HMACCOUNT": "840632E9D6409E85",
    "Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0": "1762140533",
    "v": "QTJ1enVYTDJpREdPaE5wdTdNc3Yybl9FLW9SWGdINnAtWlpEdk4zcFJJZ0JKSVg2WlZBUFVnbGswd0h1MTc2MjE0MDYyNzI4MA=="
}
cookies = {
    "sessionid": "jw74x97a9txb6xc7vs1f5ds1x59ho0o9",
    "_nano_fp": "XpmjX0UYX5UoXpX8nC_G0HhLbXfxcNeGCS_OM3oG",
    "Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0": "1761546856,1761616332,1761881130,1762132239",
    "HMACCOUNT": "840632E9D6409E85",
    "Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0": "1762132258"
}
url = "https://www.mashangpa.com/api/problem-detail/15/data/"
params = {
    "page": "3"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)