

import requests

# # ssl证书过期 verify=False
#
# url=''
# response = requests.get(url,verify=False)



# 请求超时
# url = 'https://www.google.com'
#
# try:
#     response = requests.get(url,timeout=5)
#     print(response.text)
# except requests.exceptions.Timeout as e:
#     print(e)
#



from retrying import retry

import time

num = 1
# 请求重试
@retry(stop_max_attempt_number=10)
def work():
    global num
    print(f'num={num}')
    num += 1
    time.sleep(1)

    for i in num:
        print(i)

try:
    work()
except Exception as e:
    print('代码异常',e)