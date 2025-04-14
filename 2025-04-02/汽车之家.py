
import redis
import aiohttp
import asyncio
import aiomysql
import hashlib
import chardet
from lxml import etree
class CarSpider:
    redis_client = redis.Redis()
    def __init__(self):
        self.headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        }
        self.url = 'https://www.che168.com/china/a0_0msdgscncgpi1ltocsp{}exf4x0/?pvareaid=102179#currengpostion'
        self.api_url = 'https://cacheapigo.che168.com/CarProduct/GetParam.ashx?specid={}'

    @staticmethod
    def get_md5(item):
        md5 = hashlib.md5()
        md5.update(str(item).encode('utf-8'))
        return md5.hexdigest()

    async def main(self):
        async with aiomysql.create_pool(user='root', password='el571987', db='py_spider') as pool:
            async with pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    sql = 'create table if not exists car_info(id int auto_increment,name varchar(100),price varchar(100),brand varchar(100),altitude varchar(100),breadth varchar(100),length varchar(100))'
                    check_table_query = 'show tables like "car_info"'
                    result = await cursor.execute(check_table_query)
                    if result == 0:
                        await cursor.execute(sql)
                    else:
                        print('表已存在')
            async with aiohttp.ClientSession() as session:
                tasks = [loop.create_task(self.get_car_id(i,session,pool)) for i in range(1,11)]
                await asyncio.wait(tasks)

    #获取汽车id
    async def get_car_id(self,page,session,pool):
        async with session.get(self.url.format(page),headers=self.headers) as response:
            content = await response.read()
            encoding = chardet.detect(content)['encoding']
            print(encoding,'编码')
            if encoding == 'GB2312' or encoding == 'ISO-8859-1':
                results = content.decode('gbk')
                html = etree.HTML(results)
                id_list = html.xpath('//ul[@class="viewlist_ul"]/li/@specid')
                if id_list:
                    tasks = [loop.create_task(self.get_car_info(spec_id, session, pool)) for spec_id in id_list]
                    await asyncio.wait(tasks)
                else:
                    print('id为空')
            else:
                print(self.url.format(page))
    async def get_car_info(self,spec_id,session,pool):
        async with session.get(self.api_url.format(spec_id), headers=self.headers) as response:
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
                await self.save_car_info(item, pool)
            else:
                print('数据不存在')
    async def save_car_info(self, item, pool):
        md5_hash = self.get_md5(item)
        redis_result = self.redis_client.sadd('car:filter', md5_hash)
        if redis_result:
            async with pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    sql = 'insert into car_info(id,name,price,brand,altitude,breadth,length) values(%s,%s,%s,%s,%s,%s,%s)'
                    await cursor.execute(sql, (0, item['name'], item['price'], item['brand'], item['altitude'], item['breadth'], item['length']))
                    await conn.commit()
                    print('数据保存成功')
        else:
            print('数据重复')

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    spider = CarSpider()
    loop.run_until_complete(spider.main())
