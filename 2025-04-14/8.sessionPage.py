from DrissionPage import SessionPage

url = 'http://www.ccgp-hunan.gov.cn/mvc/getContentList.do'
from_data = {
    'column_code': 2,
    'title': '',
    'pub_time1': '',
    'pub_time2': '',
    'own_org': 1,
    'page': 1,
    'pageSize': 18
}
page = SessionPage()
page.post(url, data=from_data)
print(page.user_agent)
print(page.response.json())