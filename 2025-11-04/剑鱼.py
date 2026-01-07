import os
import subprocess
import tempfile

import requests
import json


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://www.jianyu360.cn",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.jianyu360.cn/jylab/supsearch/index.html?searchGroup=1",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
}
cookies = {
    "SESSIONID": "9ea652d888b97e276df985152ae7989e083d1d8c",
    "JYGuestUID": "1985549728225427456",
    "Hm_lvt_52c42de35032567eb9d7a24a43c84bda": "1762226923",
    "Hm_lpvt_52c42de35032567eb9d7a24a43c84bda": "1762226923",
    "HMACCOUNT": "840632E9D6409E85",
    "limitSearchTextFlag": "HXYvz1762226923863735191",
    "fid": "6ce4878d119edd1fd148257232f4f1f7",
    "eid": "zUsGciai1PzQkwnX6KsqOhKfxFRfxwFELO0YGuT/5lOXkSAWXk0xO2OLF97K5Re2vLNYcSaYst/ETEH/FyGekLXiRBl9YUVPnks524Sb9us75kGOGefAc3jxZahm1J3P62+Wb1JWQQMTDTruIp4bYi6KTg7W/5Jo/E8LQ9GB6Kg=",
    "JYTrustedId": "QgwVWl1DClQABE0KFApUElYBBQ1GWkdcVkZUBFcEElhaRE9FCwgEAEBWR1xdRgAFBQdDW0VY"
}
url = "https://www.jianyu360.cn/jyapi/jybx/core/fType/searchList"
data = {
    "searchGroup": 1,
    "reqType": "lastNews",
    "pageNum": 2,
    "pageSize": 50,
    "keyWords": "",
    "searchMode": 0,
    "bidField": "",
    "publishTime": "1730690951-1762226951",
    "selectType": "title,content",
    "subtype": "",
    "exclusionWords": "",
    "buyer": "",
    "winner": "",
    "agency": "",
    "industry": "",
    "province": "",
    "city": "",
    "district": "",
    "buyerClass": "",
    "fileExists": "",
    "price": "",
    "buyerTel": "",
    "winnerTel": ""
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, cookies=cookies, data=data)
encrypt_data = response.json()['data']
secret_key = response.json()['secretKey']
with tempfile.NamedTemporaryFile(mode='w+', suffix='.json', delete=False) as f:
    json.dump({"encrypt_data": encrypt_data, "secret_key": secret_key}, f)
    temp_file_path = f.name
try:
    result = subprocess.run(['node', '剑鱼Promise.js', temp_file_path], capture_output=True, text=True, encoding='utf-8')
    stdout=result.stdout
    # json_object = json.loads(stdout)
    print(json.loads(result.stdout))
    # print(type(result.stdout), result.stdout)
finally:
    if os.path.exists(temp_file_path):
        os.unlink(temp_file_path)