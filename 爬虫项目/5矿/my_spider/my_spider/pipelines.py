# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import pymongo

class MySpiderPipeline:
    mongo_client = pymongo.MongoClient()
    collection = mongo_client['py_spider']['wk_info']
    def process_item(self, item, spider):
        self.collection.insert_one(item)
        # print('数据插入成功', item)
        return item
