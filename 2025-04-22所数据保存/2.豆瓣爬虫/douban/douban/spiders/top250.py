import scrapy
from scrapy.http import HtmlResponse
from scrapy import cmdline

class Top250Spider(scrapy.Spider):
    name = 'top250'
    # allowed_domains = ['www.baidu.com']
    # start_urls = ['https://movie.douban.com/top250']
    def start_requests(self):
        for i in range(10):
            url = f'https://movie.douban.com/top250?start={i*25}'
            yield scrapy.Request(url)
    def parse(self, response: HtmlResponse, **kwargs):
        li_list = response.xpath('//ol[@class="grid_view"]/li')
        for li in li_list:
            image_rul = li.xpath('.//img/@src').extract_first()
            title = li.xpath('.//span[@class="title"][1]/text()').extract_first()
            rating_num = li.xpath('.//span[@class="rating_num"]/text()').extract_first()
            people_num = li.xpath('.//span[4]/text()').extract_first()
            yield {
                'type_':'info',
                'image': image_rul,
                'title': title,
                'rating_num': rating_num,
                'people_num': people_num
            }
            yield scrapy.Request(
                url=image_rul,
                callback=self.parse_image,
                cb_kwargs={
                    'image_name':title
                }
            )
        # if response.xpath('//span[@class="next"]/a/@href'):
        #     next_url = response.urljoin(response.xpath('//span[@class="next"]/a/@href').extract_first())
        #     yield scrapy.Request(
        #         url=next_url,
        #         callback=self.parse
        #     )
        # else:
        #     print('全站爬取完毕')
    def parse_image(self,response:HtmlResponse,image_name):
        yield {
            'type_':'image',
            'image_name':image_name+'.jpg',
            'image_content':response.body
        }
if __name__ == '__main__':
    cmdline.execute('scrapy crawl top250 --nolog'.split())