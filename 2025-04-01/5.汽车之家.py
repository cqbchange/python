import redis
import chardet  # 用于检测编码
import hashlib  # 用于生成MD5哈希值
import asyncio
import aiohttp  # 用于异步HTTP请求
import aiomysql  # 用于异步MySQL操作
from lxml import etree  # 用于解析HTML

class CarSpider:
    redis_client = redis.Redis()  # 初始化Redis客户端

    def __init__(self):
        # 设置请求头，模拟浏览器访问
        self.headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        }
        # 设置目标网站的URL模板
        self.url = 'https://www.che168.com/china/a0_0msdgscncgpi1ltocsp{}exf4x0/?pvareaid=102179#currengpostion'
        # 设置API URL模板，用于获取车辆详细信息
        self.api_url = 'https://cacheapigo.che168.com/CarProduct/GetParam.ashx?specid={}'

    # 异步获取车辆ID
    async def get_car_id(self, page, session, pool):
        # 发送HTTP GET请求获取页面内容
        async with session.get(self.url.format(page), headers=self.headers) as response:
            content = await response.read()
            # 检测页面编码
            encoding = chardet.detect(content)['encoding']
            print('编码', encoding)
            # 如果编码为GB2312或ISO-8859-1，则解码为GBK
            if encoding == 'GB2312' or encoding == 'ISO-8859-1':
                result = content.decode('gbk')
                tree = etree.HTML(result)
                # 使用XPath提取车辆ID列表
                id_list = tree.xpath('//ul[@class="viewlist_ul"]/li/@specid')
                if id_list:
                    # 创建任务列表，异步获取每个车辆的详细信息
                    tests = [loop.create_task(self.get_car_info(spec_id, session, pool)) for spec_id in id_list]
                    await asyncio.wait(tests)
                else:
                    print('id为空')
            else:
                print(self.url.format(page))

    # 异步获取车辆详细信息
    async def get_car_info(self, spec_id, session, pool):
        # 发送HTTP GET请求获取车辆详细信息
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
                # 保存车辆信息到数据库
                await self.save_car_info(item, pool)
            else:
                print('数据不存在')

    # 生成MD5哈希值，用于数据去重
    @staticmethod
    def get_md5(item):
        md5 = hashlib.md5()
        md5.update(str(item).encode('utf-8'))
        return md5.hexdigest()

    # 异步保存车辆信息到数据库
    async def save_car_info(self, item, pool):
        md5_hash = self.get_md5(item)
        # 使用Redis进行数据去重
        redis_result = self.redis_client.sadd('car:filter', md5_hash)
        print(item)
        if redis_result:
            async with pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    # 插入车辆信息到MySQL数据库
                    sql = 'insert into car_info(id,name,price,brand,altitude,breadth,length) values(%s,%s,%s,%s,%s,%s,%s)'
                    try:
                        await cursor.execute(sql, (0, item['name'], item['price'], item['brand'], item['altitude'], item['breadth'], item['length']))
                        await conn.commit()
                        print('数据插入成功')
                    except Exception as e:
                        await conn.rollback()
                        print('数据插入失败', e)
        else:
            print('数据已存在')

    # 主函数，启动爬虫
    async def main(self):
        # 创建MySQL连接池
        async with aiomysql.create_pool(user='root', password='el571987', db='py_spider') as pool:
            async with pool.acquire() as conn:
                async with conn.cursor() as cursor:
                    # 检查表是否存在，如果不存在则创建
                    sql = 'create table if not exists car_info(id int auto_increment primary key,name varchar(100),price varchar(100),brand varchar(100),altitude varchar(100),breadth varchar(100),length varchar(100))'
                    check_table_query = 'show tables like "car_info"'
                    result = await cursor.execute(check_table_query)
                    if result == 0:
                        await cursor.execute(sql)
                    else:
                        print('表已存在')

            # 创建HTTP会话，异步获取多页车辆ID
            async with aiohttp.ClientSession() as session:
                tasks = [loop.create_task(self.get_car_id(page, session, pool)) for page in range(1, 10)]
                await asyncio.wait(tasks)

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    spider = CarSpider()
    loop.run_until_complete(spider.main())
