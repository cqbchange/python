from http.client import responses

import requests

# requests.get普通请求之后得到响应后立马释放网站的连接资源

headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
}

session = requests.Session()

url1 = 'https://www.baidu.com'

response = session.get(url1, headers=headers)
print('第一次请求',response.request.headers)
print('第一次请求',response.headers)
print(response.cookies)

response.request.headers['Cookie']=requests.utils.dict_from_cookiejar(response.cookies)
print('这是设置后',response.request.headers)

url2 = 'https://www.baidu.com'

response = session.get(url2)

print(response.request.headers)