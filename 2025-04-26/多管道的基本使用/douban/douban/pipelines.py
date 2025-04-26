# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from scrapy.exceptions import DropItem

class DoubanPipeline:
    def process_item(self, item, spider):
        # if item.get('type_') == 'info':
        #     print(item.get('type_'))
        #     raise DropItem('数据异常')
        item['type_'] ="自定义"
        print("返回的数据1",item)
        return item

class NewDoubanPipeline:
    def process_item(self, item, spider):
        print("返回的数据2",item)
        return item