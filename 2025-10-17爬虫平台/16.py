import requests
import json
import subprocess

"""
capture_output: 通过capture_output为True来捕获控制台输出内容，默认为False
text: 指定是否将输出结果以文本形式返回
"""
result = subprocess.run(['node', '16.js','3'], capture_output=True, text=True, encoding='utf-8')
result =json.loads(result.stdout)


headers = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "origin": "https://www.mashangpa.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.mashangpa.com/problem-detail/16/",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "x-requested-with": "XMLHttpRequest"
}
cookies = {
    "sessionid": "jw74x97a9txb6xc7vs1f5ds1x59ho0o9",
    "_nano_fp": "XpmjX0UYX5UoXpX8nC_G0HhLbXfxcNeGCS_OM3oG",
    "Hm_lvt_0d2227abf9548feda3b9cb6fddee26c0": "1761546856,1761616332,1761881130,1762132239",
    "HMACCOUNT": "840632E9D6409E85",
    "Hm_lpvt_0d2227abf9548feda3b9cb6fddee26c0": "1762132258"
}
url = "https://www.mashangpa.com/api/problem-detail/16/data/"
nums = 0
for i in range(1, 21):
    result = subprocess.run(['node', '16.js', str( i)], capture_output=True, text=True, encoding='utf-8')
    data = json.loads(result.stdout)
    # data = {
    #     "page": 2,
    #     "t": 1762135317726,
    #     "h5": "MjAyNTExMDMxMDA5MjQxMDU7cnd3cnA5OXdhc2RjM3gzMTtiNTIxNjt0azAzdzljZTgxYzJkMThuYnFjYTFMMGxUTWtEM1VYU3NkWUttT082RDRJdm5GdDZQTE1EOHNCMlppWXdqdHBHS29XV3JPZEMwWE53aTRmdThjQlRPeHpEYk5KXzs2MzBlNWNlZWYyNGE3ZDJjM2E1NWQxOTI0Y2ZhZjA5YWRkMjI2ZjUxOTQxZGIyZTc4ZDFkYjQxMWUyNTBhY2VkOzUuMDsxNzYyMTM1NzY0MTA1O1hSSjZQUkhObTVpTjJJajk0OENMZ1p5OWk4eTkzWjNMM1p5QTNaWFJQcDNOb1ozTDNoakIyUVhSNXhaTzNObU0yQXpNNElXQTNVMkFpQm1OaUJHTm9Kek5oVnpBbE5tTmhKV01tTkdNM1ozTDNaeUl0OHpCMDh5UjVaM1h0UkhCa05tTmo5Mk5uRlRNZzVHQmxKREJsUlROMVVXTTJZV05oMVdNbU5EQmxSWFJmUm45NEF5XzRNelI1WjNYdFIzTXJaMk9rQmlDMG9ELXpjRU14UVhSZlIzODNaWFJQcDNSNkEyN1ZzekZnNEUtejhUTTNaM0wzbGpfMWdEQm5RWFI1eFpPM1JtTnIwakUzWjNMM0JUOTNaWFJQcEg2NVozWGtaM0wzWkdOa1F6UjVaWFI1eFpPcFozTDM1RzgzUVhSNVpYUlBwWE41eDJSaUZ5QjNaWFI1WjNYdE5HTjV4MlJqRnlCM1pYUjVaM1h0WldSZlJITWtRelI1WlhSNXhaT3BaM0wzSkc4M1FYUjVaWFJQcEhMb1ozTDNORzgzUVhSNVpYUlBwWE41eDJSbkZ5QjNaWFI1WjNYdFJYTXJWMk9wUlhSZlJITmtRelI1WlhSNXhaT3BaM0wzdGo4M1pYUjVaM1h0UldSZlJuOXRRWFI1WlhSUHBYTjV4MlJ0UVhSNVpYUlBwWE41eDJSMTh5UjVaWFI1eHA3NXgyUjFnREFsNENBM1pYUlBwSDZlWTNMM1pTOTNaWFJQcDNSbEJXNzV0V01qaEQtQ1luTHBoWE5vWlhFTFluOWljVEFyMGpFM1ozTDNWRDhtUVhSNXhwNzsxOGU1MDUyNzhjZDNiOGMxODM2OTk1YWExMmY0MzdkYzQ3MjMwNTUwMWNiOWM2N2Y5OWVhNWIzYWRiY2UwZjU4MTc2MjEzNTMxNzcyNg=="
    # }
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, cookies=cookies, data=data)
    res = response.json()['current_array']
    nums += sum(res)
    print(nums)
