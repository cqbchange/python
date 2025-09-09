import scrapy
from scrapy.http import HtmlResponse


class MohurdSpider(scrapy.Spider):
    name = 'mohurd'
    # allowed_domains = ['example.com']
    # start_urls = ['http://example.com/']
    def start_requests(self):
        for i in range(1,10):
            url = f'https://jzsc.mohurd.gov.cn/APi/webApi/dataservice/query/comp/list?pg={i}&pgsz=15&total=450'
            yield scrapy.Request(url=url,callback=self.parse)
    def parse(self, response:HtmlResponse,**kwargs):
        print(response.json()['data']['list'])
        for temp in response.json()['data']['list']:
            item = dict()
            item['QY_FR_NAME'] = temp['QY_FR_NAME']
            item['QY_REGION'] = temp['QY_REGION']
            item['QY_NAME'] = temp['QY_NAME']
            item['QY_REGION_NAME'] = temp['QY_REGION_NAME']
            item['QY_ORG_CODE'] = temp['QY_ORG_CODE']
            item['COLLECT_TIME'] = temp['COLLECT_TIME']
            item['RN'] = temp['RN']
            yield  item
        # pass

if __name__ == '__main__':
    from scrapy import cmdline
    cmdline.execute('scrapy crawl mohurd --nolog'.split())