import scrapy
from scrapy import cmdline
from scrapy.http import HtmlResponse

class Top250Spider(scrapy.Spider):
    name = 'top250'
    allowed_domains = ['movie.douban.com']
    start_urls = ['https://movie.douban.com/top250']

    def parse(self, response, **kwargs):
        li_list = response.xpath('//ol[@class="grid_view"]/li')
        for li in li_list:
            image_rul = li.xpath('.//img/@src').extract_first()
            title = li.xpath('.//span[@class="title"][1]/text()').extract_first()
            rating_num = li.xpath('.//span[@class="rating_num"]/text()').extract_first()
            people_num = li.xpath('.//span[4]/text()').extract_first()

            yield {
                'type_':'info',
                'image_rul':image_rul,
                'title':title,
                'rating_num':rating_num,
                'people_num':people_num
            }


if __name__ == '__main__':
    cmdline.execute('scrapy crawl top250 --nolog'.split())