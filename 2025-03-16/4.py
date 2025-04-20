import requests

url = 'http://www.cninfo.com.cn/new/disclosure'

hearders={
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
}

form_data={
    'column':"szse_latest",
    'pageNum':1,
    'pageSize':30,
    'sortName':'',
    'sortType':'',
    'clusterFlag':'true'
}

response = requests.get(url,headers=hearders,data=form_data)

print(response.text)