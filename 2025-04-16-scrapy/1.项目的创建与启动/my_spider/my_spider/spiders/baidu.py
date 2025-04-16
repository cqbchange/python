import scrapy
from scrapy import cmdline

class BaiduSpider(scrapy.Spider):
    name = 'baidu'
    # allowed_domains = ['www.baidu.com']
    start_urls = ['http://www.baidu.com/']

    def parse(self, response):
        print(response.text)
if __name__ == '__main__':
    cmdline.execute('scrapy crawl baidu'.split())