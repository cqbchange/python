import scrapy
from scrapy.http import HtmlResponse
from scrapy import cmdline

class Top250Spider(scrapy.Spider):
    name = 'top250'
    # allowed_domains = ['www.baidu.com']
    start_urls = ['https://movie.douban.com/top250']
    def start_requests(self):
        print('123')
    def parse(self, response: HtmlResponse, **kwargs):
        pass

if __name__ == '__main__':
    cmdline.execute('scrapy crawl top250 --nolog'.split())