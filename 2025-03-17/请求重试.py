
import requests
from retrying import retry

headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
}

get_url = 'https://www.360buy.com'

num=1
@retry(stop_max_attempt_number=3)
def get_html(url):
    global num
    print(f'第{num}次请求。。。')
    num+=1
    response = requests.get(url, headers=headers,timeout=3)
    for res in response.history:
        # 断言
        assert res.status_code == 200
        # if res.status_code != 200:
        #     raise Exception('请求失败')
    print(response)

try:
    get_html(get_url)
except Exception as e:
    print('程序异常',e)