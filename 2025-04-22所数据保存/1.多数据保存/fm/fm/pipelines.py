# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import pymongo
import os


class FmPipeline:
    # 必须在setting中注册
    mongo_client = pymongo.MongoClient()
    collection = mongo_client['py_spider']['fm_info']

    def __del__(self):
        self.mongo_client.close()

    def process_item(self, item, spider):
        type_ = item.get('type_')
        if type_ == 'text':
            self.collection.insert_one(item)
            print('管道接收到的数据信息',item)
        elif type_ == 'image':
            download_path=os.getcwd()+'/download_images/'
            if not os.path.exists(download_path):
                os.mkdir(download_path)
            image_name = item.get('image_name')
            image_content = item.get('image_content')
            with open(download_path+image_name,'wb') as f:
                f.write(image_content)
                print(f'下载图片成功{image_name}')
        else:
            print('数据错误',item)
        return item
