import requests

url = 'https://img2.baidu.com/it/u=4273358008,1233231982&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067'

response = requests.get(url)

print(response.content)

with open('jk.jpg', 'wb') as f:
    f.write(response.content)