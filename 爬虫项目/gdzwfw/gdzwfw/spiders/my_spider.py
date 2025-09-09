import scrapy
from scrapy.http import HtmlResponse
import json


class MySpiderSpider(scrapy.Spider):
    name = 'my_spider'
    # allowed_domains = ['bauid.com']
    # start_urls = ['http://bauid.com/']

    def start_requests(self):
        for i in range(1,1001):
            params = {
                "type": "trading-type",
                "openConvert": False,
                "keyword": "",
                "siteCode": "44",
                "secondType": "A",
                "tradingProcess": "",
                "thirdType": "[]",
                "projectType": "",
                "publishStartTime": "",
                "publishEndTime": "",
                "pageNo": i,
                "pageSize": 10
            }
            body_data = json.dumps(params)
            url = f'https://ygp.gdzwfw.gov.cn/ggzy-portal/search/v2/items'
            # yield scrapy.FormRequest(url=url,method='POST',formdata=body_data)
            yield scrapy.Request(url=url,method='POST',body=body_data)

    def parse(self, response:HtmlResponse , **kwargs):
        listData = response.json()['data']['pageData']
        for item in listData:
            publishDate= item['publishDate']
            formatted_date = f"{publishDate[:4]}-{publishDate[4:6]}-{publishDate[6:8]}"
            yield {
                'noticeTitle':item['noticeTitle'],
                'publishTime':formatted_date,
            }
        pass

if __name__ == '__main__':
    from scrapy import cmdline
    cmdline.execute('scrapy crawl my_spider --nolog'.split())