# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
import json

# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import pymongo
import redis
import hashlib

from scrapy.exceptions import DropItem
class TxWorkCheckPipeline:
    def open_spider(self,spider):
            if spider.name == 'tx_work_info':
                self.redis_client = redis.Redis()
    def process_item(self, item, spider):
        if spider.name == 'tx_work_info':
            item_srt = json.dumps(item)
            md5_hash = hashlib.md5()
            md5_hash.update(item_srt.encode('utf-8'))
            hash_value = md5_hash.hexdigest()
            if self.redis_client.get(f'tx_work_info:{hash_value}'):
                raise DropItem('数据重复')
            else:
                self.redis_client.set(f'tx_work_info:{hash_value}',item_srt)
        return item
    def close_spider(self,spider):
        self.redis_client.close()
class TxWorkFilePipeline:
    def open_spider(self,spider):
        if spider.name == 'tx_work_info':
            self.file_obj = open('tx_work_info.txt','a',encoding='utf-8')
    def process_item(self, item, spider):
        if spider.name == 'tx_work_info':
            self.file_obj.write(json.dumps(item,ensure_ascii=False,indent=4)+'\n')
            print('数据写入成功',item.get('title'))
        return item
    def close_spider(self,spider):
        if spider.name == 'tx_work_info':
            self.file_obj.close()

class TxWorkMongoPipeline:
    def open_spider(self,spider):
        if spider.name == 'tx_work_info':
            self.mongo_client = pymongo.MongoClient()
            self.collection = self.mongo_client['py_spider']['tx_work_info']

    def process_item(self, item, spider):
        if spider.name == 'tx_work_info':
            self.collection.insert_one(item)
            print('数据插入成功',item.get('title'))
        return item
    def close_spider(self,spider):
        if spider.name == 'tx_work_info':
            self.mongo_client.close()