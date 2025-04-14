import pymongo
import requests
import threading
from queue import Queue

class AiQiYi:
    def __init__(self):
        self.headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        }
        self.url = "https://pcw-api.iqiyi.com/search/recommend/list?channel_id=2&data_type=1&mode=11&page_id={}&ret_num=48&session=47ad98dc01cc8a6f7d4e9b8063f1939d&three_category_id=15;must"
        self.mongo_client = pymongo.MongoClient('localhost', 27017)
        self.collection = self.mongo_client['py_spider']['aiqiyi_work']
        self.url_queue = Queue()
        self.json_queue = Queue()
        self.content_dict_queue = Queue()

    def get_url(self):
        for page_num in range(1, 6):
            self.url_queue.put(self.url.format(page_num))

    def get_api_json(self):
        while True:
            url = self.url_queue.get()
            response = requests.get(url,headers=self.headers).json()
            self.json_queue.put(response)
            #
            self.url_queue.task_done()
    def parse_movie_info(self):
        while True:
            json_info = self.json_queue.get()
            for movie in json_info['data']['list']:
                item = dict()
                item['title']= movie['title']
                item['playUrl']= movie['playUrl']
                item['description'] = movie['description']
                self.content_dict_queue.put(item)
            self.json_queue.task_done()

    def save_movie_info(self):
        while True:
            item = self.content_dict_queue.get()
            self.collection.insert_one(item)
            print('数据插入成功',item)
            self.content_dict_queue.task_done()
    def main(self):
        thread_list = list()
        self.get_url()
        for _ in range(3):
            t_get_json = threading.Thread(target=self.get_api_json)
            thread_list.append(t_get_json)
        for _ in range(3):
            t_parse_json = threading.Thread(target=self.parse_movie_info)
            thread_list.append(t_parse_json)
        t_save_info = threading.Thread(target=self.save_movie_info)
        thread_list.append(t_save_info)

        for tread_obj in thread_list:
            tread_obj.daemon = True
            tread_obj.start()
        for q in [self.url_queue,self.json_queue,self.content_dict_queue]:
            q.join()
        self.mongo_client.close()
        print('数据采集完成')

if __name__ == '__main__':
    aiqiyi = AiQiYi()
    aiqiyi.main()