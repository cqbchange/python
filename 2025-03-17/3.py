import requests

url = 'https://www.360buy.com'

headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
}

# response = requests.get(url, headers=headers,allow_redirects=False)
response = requests.get(url, headers=headers)
# allow_redirects=False 禁止重定向

print(response.history)

for response in response.history:
    print(response.url,response.status_code,response.request.headers)