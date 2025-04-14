import requests

url = 'https://webapi.qingting.fm/api/mobile/rank/hotSaleWeekly'

headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
}

response = requests.get(url, headers=headers).json()

for temp in response['rankinglist']:
    temp_dict=dict()
    temp_dict['title'] = temp['title']
    temp_dict['desc'] = temp['desc']
    temp_dict['imgUrl'] = temp['imgUrl']
    print(temp_dict)