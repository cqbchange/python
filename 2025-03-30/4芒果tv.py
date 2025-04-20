import redis
import pymongo
import hashlib
import requests

class MgTV:

    def __init__(self):
        self.headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
        }
        self.api_url ='https://pianku.api.mgtv.com/rider/list/pcweb/v3'
        self.mongo_client = pymongo.MongoClient()
        self.collection = self.mongo_client['py_spider']['mg_movie_list']
        self.redis_client = redis.Redis()

    def get_movie_info(self,params_dict):
        result_dict = requests.get(self.api_url,headers=self.headers,params=params_dict).json()
        return result_dict

    def parse_movie_info(self,response):
        movie_list = response['data']['hitDocs']
        for movie in movie_list:
            item = dict()
            item['title'] = movie['title']
            item['subtitle'] = movie['subtitle']
            item['story'] = movie['story']

    @staticmethod
    def get_md5(response):
        md5_hash = hashlib.md5(str(response).encode('utf-8')).hexdigest()
        return md5_hash

    def save_movie_info(self,item):
        md5_hash = self.get_md5(item)
        flag = self.redis_client.sadd('movie:filter',md5_hash)
        if flag:
            try:
                self.collection.insert_one(item)
                print('数据插入成功')
            except Exception as e:
                print('数据插入失败',e)
        else:
            print('数据重复')

    def close_spider(self):
        self.mongo_client.close()
        self.redis_client.close()
        print('爬虫结束')

    def main(self):
        for page in range(1,11):
            params = {
                "allowedRC": "1",
                "platform": "pcweb",
                "channelId": "2",
                "pn": page,
                "pc": "80",
                "hudong": "1",
                "_support": "10000000",
                "kind": "19",
                "area": "10",
                "year": "all",
                "chargeInfo": "a1",
                "sort": "c2",
                "feature": "all"
            }
            response = self.get_movie_info(params)
            self.parse_movie_info(response)
            self.close_spider()

if __name__ == "__main__":
    mg =MgTV()
    mg.main()
