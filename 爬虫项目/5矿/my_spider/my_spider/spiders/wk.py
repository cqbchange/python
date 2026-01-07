import json
import os.path
import execjs
import scrapy
from scrapy import cmdline
from scrapy.http import HtmlResponse


class WkSpider(scrapy.Spider):
    name = 'wk'
    # allowed_domains = ['baidu.com']
    # start_urls = ['http://baidu.com/']
    def  start_requests(self):
        for i in range(1,51):
            print( i)
            url = 'https://ec.minmetals.com.cn/open/homepage/public'
            yield scrapy.Request(url=url,callback=self.parse_public,cb_kwargs={'page':i},dont_filter=True)
    def parse_public(self, response:HtmlResponse,**kwargs):
        js_path = os.path.join(os.getcwd(), 'utils', 'wk.js')
        print(kwargs)
        with open(js_path,'r',encoding='utf-8') as f:
            jsFun = f.read()
        ctx = execjs.compile(jsFun)
        param = ctx.call('encrypt_param',response.text,kwargs['page'])
        data={
            "param":param
        }
        headers = {
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Type": "application/json",
            "Origin": "https://ec.minmetals.com.cn",
            "Pragma": "no-cache",
            "Referer": "https://ec.minmetals.com.cn/open/home/platform-info",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
            "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }
        cookies = {
            "__jsluid_s": "05025ea713eb501b6e7d1d56989cbbb9",
            "SUNWAY-ESCM-COOKIE": "ffd7e75d-f365-43db-8a63-3492a34953d7",
            "JSESSIONID": "410972EB6B9F75671E61EBFBFB9E5E71"
        }
        url ='https://ec.minmetals.com.cn/open/homepage/zbs/by-lx-page'
        yield scrapy.Request(url=  url,method='POST',headers=headers,cookies=cookies,body=json.dumps(data),callback=self.parse,dont_filter=True)
        pass
    def parse(self, response:HtmlResponse, **kwargs):
        print(response)
        res = response.json()['list']
        for temp in res:
            item = dict()
            item['mc'] = temp['mc']
            item['dwmc'] = temp['dwmc']
            item['condDes'] = temp['condDes']
            item['rq'] = temp['rq']
            yield item
        pass
if __name__ == '__main__':
    cmdline.execute('scrapy crawl wk --nolog'.split())