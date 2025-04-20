import requests

url = 'https://img2.baidu.com/it/u=4273358008,1233231982&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067'

response = requests.get(url,stream=True)

# stream+True懒加载模式

print(response.content)

with open('jk1.jpg', 'wb') as f:
    for chunk in response.iter_content(chunk_size=1024):
        f.write(chunk)