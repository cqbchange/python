from lxml import etree

import requests

url = 'https://movie.douban.com/subject/1292052/'
header={
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
}
response = requests.get(url,headers=header).text

tree = etree.HTML(response)

content = tree.xpath("//div[@class='review-list  ']//div[@class='short-content']/text()")
print(content)

