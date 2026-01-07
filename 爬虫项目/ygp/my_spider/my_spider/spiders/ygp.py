import json
import os

import execjs
import scrapy
from scrapy import cmdline
from scrapy.http import HtmlResponse
from fake_useragent import UserAgent

class YgpSpider(scrapy.Spider):
    name = 'ygp'
    # allowed_domains = ['baidu.com']
    # start_urls = ['http://baidu.com/']

    def start_requests(self):
        js_path = os.path.join(os.getcwd(), 'utils', 'ygp.js')
        with open(js_path,'r',encoding='utf-8') as f:
            jsFun = f.read()
        ctx = execjs.compile(jsFun)
        for i in range(1,1001):
            data = {
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
                "pageNo":1,
                "pageSize": 10
            }
            signature = ctx.call('get_data', data)
            headers = {
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Content-Type": "application/json",
                "Origin": "https://ygp.gdzwfw.gov.cn",
                "Pragma": "no-cache",
                "Referer": "https://ygp.gdzwfw.gov.cn/",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin",
                "User-Agent": UserAgent().random,
                "X-Dgi-Req-App": "ggzy-portal",
                "X-Dgi-Req-Nonce": signature['X-Dgi-Req-Nonce'],
                "X-Dgi-Req-Signature": signature['X-Dgi-Req-Signature'],
                "X-Dgi-Req-Timestamp": signature['X-Dgi-Req-Timestamp'],
                "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\""
            }
            yield scrapy.Request(url="https://ygp.gdzwfw.gov.cn/ggzy-portal/search/v2/items",method='POST',headers=headers,body=json.dumps(data),callback=self.parse,dont_filter=True)
    def parse(self, response:HtmlResponse,**kwargs):
        for temp in response.json()['data']['pageData']:
            item = dict()
            item['noticeTitle'] = temp['noticeTitle']
            item['publishDate'] = temp['publishDate']
            item['pubServicePlat'] = temp['pubServicePlat']
            item['datasetName'] = temp['datasetName']
            yield  item
        # pass

if __name__ == '__main__':
    cmdline.execute('scrapy crawl ygp --nolog'.split())