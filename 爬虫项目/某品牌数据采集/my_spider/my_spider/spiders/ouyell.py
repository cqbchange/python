
import scrapy
from scrapy.http import HtmlResponse
from scrapy import cmdline
class OuyellSpider(scrapy.Spider):
    name = 'ouyell'
    # allowed_domains = ['example.com']
    # start_urls = ['http://example.com/']
    def start_requests(self):
        list = ['2025-06-01','2025-05-01','2025-04-01','2025-03-01','2025-02-01','2025-01-01']
        for i in list:
            data = {
                "startTime": i,
                "MethodName": "BoxOffice_GetMonthBox"
            }
            yield scrapy.FormRequest(url='https://www.endata.com.cn/API/GetData.ashx',formdata=data,dont_filter=False)
    def parse(self, response:HtmlResponse,**kwargs):
        for temp in response.json()['Data']['Table']:
            item = dict()
            item['movie_name'] = temp['MovieName']
            item['boxoffice'] = temp['boxoffice']
            item['box_pro'] = temp['box_pro']
            item['avgboxoffice'] = temp['avgboxoffice']
            item['avgshowcount'] = temp['avgshowcount'] if temp['avgshowcount'] else  '-'
            item['releaseTime'] = temp['releaseTime'] if temp['releaseTime'] else  '-'
            item['RapIndex'] =temp['RapIndex'] if temp['RapIndex'] else  '-'
            item['days'] = temp['days'] if temp['days'] else  '-'
            yield  item
        # pass

if __name__ == '__main__':
    cmdline.execute('scrapy crawl ouyell --nolog'.split())