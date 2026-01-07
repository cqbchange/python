import requests


headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
}
url = "https://ec.minmetals.com.cn/open/homepage/public"
response = requests.post(url, headers=headers)

print(response.text)
print(response)