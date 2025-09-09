# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import pymongo

class GdzwfwPipeline:
    def process_item(self, item, spider):
        mongodb_client = pymongo.MongoClient()
        client = mongodb_client['py_spider']['gdzwfw_info']
        client.insert_one(item)
        print('数据插入成功',item)
        return item

# import pymongo
#
# class MySpiderPipeline:
#     mongodb_client = pymongo.MongoClient()
#     client = mongodb_client['py_spider']['mohurd_info']
#     def process_item(self, item, spider):
#         self.client.insert_one(item)
#         print('数据插入成功',item)
#         return item