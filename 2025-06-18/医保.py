import requests
import json


headers = {
    "Accept": "application/json",
    "Accept-Language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://fuwu.nhsa.gov.cn",
    "Pragma": "no-cache",
    "Referer": "https://fuwu.nhsa.gov.cn/nationalHallSt/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "X-Tingyun": "c=B|4Nl_NnGbjwY;x=4453bca282824726",
    "channel": "web",
    "contentType": "application/x-www-form-urlencoded",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "x-tif-nonce": "a8jXD6yu",
    "x-tif-paasid": "undefined",
    "x-tif-signature": "73805d85eacc68c9115bb1ccf8943a5a55446269cc5b7bf7bf05f12a9c0f2462",
    "x-tif-timestamp": "1760426071"
}
cookies = {
    "amap_local": "510100",
    "acw_tc": "276aedcc17604260461674417e6a56eb1720fbb643e96ab06fffbac77eb408"
}
url = "https://fuwu.nhsa.gov.cn/ebus/fuwu/api/nthl/api/CommQuery/queryFixedHospital"
data = {
    "data": {
        "data": {
            "encData": "3DFBCA4667B978F639BB23B95DCE4CC74CE34C33DC32F1068E9E23CA546C9EA8CCD20943B4DAE96380B41164D761DE9742C84A985FE3BABC31CB352556BB87C9C1495DB24A29AB6BC3A85AB7FCA00F33C56677481A67C67F739EE2C7D589054DC373615B5DDB33C24C5B31E61CB7643E00DDA865C3B75C85735F0744B0227B5CD0B4E7BB97C60BF8E5275CAFCAFD1E13E384C10195003FD638576645B5EF45EA"
        },
        "appCode": "T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ",
        "version": "1.0.0",
        "encType": "SM4",
        "signType": "SM2",
        "timestamp": 1760426071,
        "signData": "Gxf5wsBe32xo5qX1BqlLFZE6NuR9x89+6M637BJ/uZcnuNQ82W7OlpWrLfPk4+DaOtfRE6/CgJEP/TXoYygGIA=="
    }
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, cookies=cookies, data=data)

print(response.text)
print(response)