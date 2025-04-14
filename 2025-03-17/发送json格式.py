import json

import requests

headers = {
    'Cookie':'userName=; accountType=',
    'Referer':'https://hr.163.com/job-list.html',
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
}
url = 'https://hr.163.com/api/hr163/position/queryPage'
json_data = {"currentPage":1,"pageSize":10}
# api中载荷信息提交的数据不是表单而是json requests.post使用json而不是data
response = requests.post(url, headers=headers,json=json_data)
print(response.json())