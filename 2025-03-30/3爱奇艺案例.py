
import pymongo
import  requests

class AiQiYi:
    def __init__(self):
        self.client=pymongo.MongoClient(host='localhost', port=27017)
        self.db = self.client['py_spider']['aqy_movie_list']

        self.api_url ='https://pcw-api.iqiyi.com/search/recommend/list'
        self.headers= {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
        }
    def get_movie_info(self,params_attr):
        response = requests.get(self.api_url,headers=self.headers,params=params_attr).json()
        return response
    def parse_movie_info(self,response):
        movie_list = response['data']['list']
        for movie in movie_list:
            item =dict()
            item['title']=movie['title']
            item['playUrl']=movie['playUrl']
            item['description']=movie['description']
            self.save_movie_info(item)
    def save_movie_info(self,item):
        try:
            self.db.insert_one(item)
            print('数据保存成功',item)
        except Exception as e:
            print('保存失败',e)
    def close_spider(self):
        self.client.close()
        print('爬虫已关闭。。。')

    def main(self):
        for page_num in range(1,10):
            params_dict = {
                "channel_id": "2",
                "data_type": "1",
                "mode": "11",
                "page_id": page_num,
                "ret_num": "48",
                "session": "779d98c5f06e33188cbac50709053ab7",
                "three_category_id": "15;must"
            }
            info = self.get_movie_info(params_dict)
            self.save_movie_info(info)
        self.close_spider()
if __name__=='__main__':
    aqy = AiQiYi()