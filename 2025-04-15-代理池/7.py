import requests

url = 'https://stu.tulingpyton.cn/api/problem-detail/2/data/?page={}'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    "cookie":"Hm_lvt_68a51533e634d0e8a2ec721a36d779fd=1739771807; Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183=1744772072; HMACCOUNT=9B301633E4596244; sessionid=tnm11u3ek7nft64vnzm2dfz7kp9wkct0; Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183=1744772284"
}
num = 0
for i in range(1,21):
    response = requests.get(url=url.format(i),headers=headers).json()
    data = response['current_array']
    print(data)
    num += sum(data)
    print(num)
