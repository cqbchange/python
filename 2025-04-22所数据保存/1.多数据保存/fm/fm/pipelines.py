# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import pymongo


class FmPipeline:
    # 必须在setting中注册
    mongo_client = pymongo.MongoClient()
    collection = mongo_client['py_spider']['fm_info']

    def __del__(self):
        self.mongo_client.close()

    def process_item(self, item, spider):
        print('管道接收到的数据信息',item)
        self.collection.insert_one(item)
        return item
