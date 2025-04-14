import hashlib
import redis
import pymongo
import requests

class AiQiYi:
    def __init__(self):
        self.client = pymongo.MongoClient("localhost", 27017)
        self.db = self.client["py_spider"]['aqy_movie_list']
        self.redis = redis.Redis()
        self.api_url = "https://pcw-api.iqiyi.com/search/recommend/list"
        self.headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        }


    def get_movie_info(self,params_attr):
        response = requests.get(self.api_url, headers=self.headers, params=params_attr).json()
        return response

    def parse_movie_info(self,response):
        movie_list = response['data']['list']
        for movie in movie_list:
            item=dict()
            item['title'] = movie['title']
            item['playUrl'] = movie['playUrl']
            item['description'] = movie['description']
            self.save_movie_info(item)

    def save_movie_info(self,item):
        md5_hash = self.get_md5(item)
        flag = self.redis.sadd('aqy:filter',md5_hash)
        if flag:
            try:
                self.db.insert_one(item)
                print('保存成功')
            except Exception as e:
                print(e,'保存失败')
        else:
            print('数据重复')

    def close(self):
        self.client.close()
        print('爬虫已关闭')

    @staticmethod
    def get_md5(response):
        return hashlib.md5(str(response).encode('utf-8')).hexdigest()

    def main(self):
        for page in range(1,11):
            params = {
                "channel_id": "2",
                "data_type": "1",
                "mode": "11",
                "page_id": page,
                "ret_num": "48",
                "session": "e61d98ce3fc503b62720034e06e767f5",
                "three_category_id": "15;must"
            }
            info = self.get_movie_info(params)
            self.parse_movie_info(info)
        self.close()


if __name__ == '__main__':
    aqy = AiQiYi()
    aqy.main()