import redis
import requests
import pymongo
import hashlib

class MovieInfo:
    def __init__(self):
        # 设置HTTP请求头
        self.headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        }
        # 定义API请求URL
        self.api_url = 'https://pianku.api.mgtv.com/rider/list/pcweb/v3'
        # 创建MongoDB客户端实例
        self.mongo_client = pymongo.MongoClient()
        # 获取MongoDB集合
        self.collection = self.mongo_client['py_spider']['mg_movie_list']
        # 创建Redis客户端实例
        self.redis_client = redis.Redis()

    def get_movie_info(self, params_dict):
        # 发送GET请求获取电影信息，并返回JSON响应
        response = requests.get(self.api_url, params=params_dict, headers=self.headers).json()
        return response

    def parse_movie_info(self, response):
        # 解析响应中的电影列表
        movie_list = response['data']['hitDocs']
        for movie in movie_list:
            item = dict()
            item['title'] = movie['title']
            item['subtitle'] = movie['subtitle']
            item['story'] = movie['story']
            # 保存电影信息到MongoDB
            self.save_movie_info(item)

    def save_movie_info(self, item):
        # 计算电影信息的MD5哈希值
        md5_hash = self.get_md5(item)
        print(md5_hash)
        # 将MD5哈希值添加到Redis集合中，检查是否为新数据
        flag = self.redis_client.sadd('movie:filter', md5_hash)
        print(flag)
        if flag:
            try:
                # 如果是新数据，保存到MongoDB
                self.collection.insert_one(item)
                print('数据保存成功')
            except Exception as e:
                # 捕获并打印保存失败的异常信息
                print(e, '数据保存失败')
        else:
            # 如果数据已存在，打印重复信息
            print('数据重复。。。')

    def close_spider(self):
        # 关闭MongoDB和Redis连接
        self.mongo_client.close()
        self.redis_client.close()
        print('爬虫结束')

    def main(self):
        # 循环获取10页的电影信息
        for page in range(1, 11):
            params_dict = {
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
            # 获取电影信息
            response = self.get_movie_info(params_dict)
            # 解析并保存电影信息
            self.parse_movie_info(response)
        # 关闭爬虫
        self.close_spider()

    @staticmethod
    def get_md5(response):
        # 计算响应内容的MD5哈希值
        md5_hash = hashlib.md5(str(response).encode('utf-8')).hexdigest()
        return md5_hash

if __name__ == '__main__':
    # 创建MovieInfo实例并运行主方法
    mg = MovieInfo()
    mg.main()
