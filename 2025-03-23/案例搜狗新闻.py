import requests

from bs4 import BeautifulSoup

url = 'https://weixin.sogou.com/weixin?_sug_type_=1&type=2&query=python'

headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
}

response = requests.get(url,headers=headers).text

soup = BeautifulSoup(response,'lxml')

# news_element_list = soup.select('ul[class="news-list"]')
news_element_list = soup.find("ul",class_='news-list').find_all('h3')

for item in news_element_list:
    print(item.get_text())
    print('https://weixin.sogou.com'+item.find('a').get('href'))