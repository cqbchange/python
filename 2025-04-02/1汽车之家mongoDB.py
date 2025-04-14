from fake_useragent import UserAgent
from motor.motor_asyncio import AsyncIOMotorClient
import redis
import aiohttp
import asyncio
import hashlib
import chardet
from lxml import etree
class CarSpider:
    redis_client = redis.Redis()
    mongo_client = AsyncIOMotorClient('localhost',27017)['py_spider']['car_info']
    def __init__(self):
        self.url = 'https://www.che168.com/china/a0_0msdgscncgpi1ltocsp{}exf4x0/?pvareaid=102179#currengpostion'
        self.api_url = 'https://cacheapigo.che168.com/CarProduct/GetParam.ashx?specid={}'
        self.user_agent = UserAgent()
    def __del__(self):
        self.redis_client.close()

    @staticmethod
    def get_md5(item):
        md5 = hashlib.md5()
        md5.update(str(item).encode('utf-8'))
        return md5.hexdigest()

    async def main(self):
        async with aiohttp.ClientSession() as session:
            tasks = [loop.create_task(self.get_car_id(i,session)) for i in range(1,11)]
            await asyncio.wait(tasks)

    #获取汽车id
    async def get_car_id(self,page,session):
        headers = {'User-Agent':self.user_agent.random}
        print(self.url.format(page),headers)
        async with session.get(self.url.format(page),headers=headers) as response:
            content = await response.read()
            encoding = chardet.detect(content)['encoding']
            print(encoding,'编码')
            if encoding == 'GB2312' or encoding == 'ISO-8859-1':
                results = content.decode('gbk')
            else:
                results = content.decode(encoding)
            html = etree.HTML(results)
            id_list = html.xpath('//ul[@class="viewlist_ul"]/li/@specid')
            if id_list:
                tasks = [loop.create_task(self.get_car_info(spec_id,session)) for spec_id in id_list]
                await asyncio.wait(tasks)
            else:
                print('id为空')
    async def get_car_info(self,spec_id,session):
        headers = {'User-Agent': self.user_agent.random}
        async with session.get(self.api_url.format(spec_id), headers=headers) as response:
            result = await response.json()
            if result['result'].get('paramtypeitems'):
                item = dict()
                # 提取车辆名称、价格、品牌、高度、宽度、长度等信息
                item['name'] = result['result']['paramtypeitems'][0]['paramitems'][0]['value']
                item['price'] = result['result']['paramtypeitems'][0]['paramitems'][1]['value']
                item['brand'] = result['result']['paramtypeitems'][0]['paramitems'][2]['value']
                item['altitude'] = result['result']['paramtypeitems'][1]['paramitems'][2]['value']
                item['breadth'] = result['result']['paramtypeitems'][1]['paramitems'][1]['value']
                item['length'] = result['result']['paramtypeitems'][1]['paramitems'][0]['value']
                await self.save_car_info(item)
            else:
                print('数据不存在')
    async def save_car_info(self, item):
        md5_hash = self.get_md5(item)
        redis_result = self.redis_client.sadd('mongo_car:filter', md5_hash)
        if redis_result:
            await self.mongo_client.insert_one(item)
        else:
            print('数据已存在')

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    spider = CarSpider()
    loop.run_until_complete(spider.main())
