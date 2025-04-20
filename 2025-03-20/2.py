from lxml import etree

import requests

url ='https://movie.douban.com/top250'

header={
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
}
response = requests.get(url,headers=header).text

etree = etree.HTML(response)

# image_url_list = etree.xpath('//ol/li//div[@class="pic"]/a/img/@src')
# title_list = etree.xpath('//ol/li//div[@class="hd"]/a/span[1]/text()')
# print(title_list)
# for title,imag_rul in zip(title_list,image_url_list):
#     movie_info = dict()
#     movie_info['title']=title
#     movie_info['image_url']=imag_rul
#     print(movie_info)

title_list1 = etree.xpath('//ol/li[last()]//div[@class="hd"]/a/span[1]/text()')

title_list2 = etree.xpath('//ol/li[last()-1]//div[@class="hd"]/a/span[1]/text()')

title_list3 = etree.xpath('//ol/li[position()>1 and position()<6]//div[@class="hd"]/a/span[1]/text()')

title_list4 = etree.xpath('//ol/li//div[@class="hd"]/a/span[text()="霸王别姬"]')
print(title_list4)