import scrapy
from scrapy import cmdline
from scrapy.http import HtmlResponse


class QingtingSpider(scrapy.Spider):
    name = 'qingting'
    # allowed_domains = ['m.qingting.fm']
    start_urls = ['https://m.qingting.fm/rank/']

    def parse(self, response:HtmlResponse,**kwargs):
        rank_list = response.xpath('//div[@class="rank-list"]/a')
        for rank in rank_list:
            rank_number = rank.xpath('./div[@class="badge"]/text()').get()
            img_url = rank.xpath('./img/@src').extract_first()
            title = rank.xpath('./div[@class="content"]/div[@class="title"]/text()').extract_first()
            desc = rank.xpath('./div[@class="content"]/div[@class="desc"]/text()').extract_first()
            play_number = rank.xpath('./div[@class="info-item"][1]/span/text()').extract_first()
            # print(rank_number,img_url,title,desc,play_number)
            info_dict = {
                'type_':'text',
                'rank_number':rank_number,
                'img_url':img_url,
                'title':title,
                'desc':desc,
                'play_number':play_number
            }
            yield info_dict
            yield scrapy.Request(img_url,callback=self.parse_image,cb_kwargs={"image_name":title})
#     回调函数
    def parse_image(self,response:HtmlResponse,image_name):
        yield {
            'type_':'image',
            'image_name':image_name+'.png',
            'image_content':response.body
        }
if __name__ == '__main__':
   cmdline.execute("scrapy crawl qingting --nolog".split())

   #