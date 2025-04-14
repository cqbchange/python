import hashlib
import redis
import pymysql
import requests

class TxWork:
    def __init__(self):
        self.api_url = 'https://careers.tencent.com/tencentcareer/api/post/Query?timestamp=1733406417087&countryId=&cityId=&bgIds=&productId=&categoryId=&parentCategoryId=&attrId=1&keyword=python&pageIndex={}&pageSize=10&language=zh-cn&area=cn'
        self.headers = {
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        }
        self.db = pymysql.connect(host='localhost',user='root',passwd='el571987',db='py_spider',charset='utf8')
        self.cursor = self.db.cursor()
        self.redis = redis.Redis()
    def get_work_info(self):
        for i in range(1,32):
            response = requests.get(self.api_url.format(i),headers=self.headers).json()
            work_list = response['Data']['Posts']
            yield work_list

    def create_table(self):
        sql = """
            CREATE TABLE IF NOT EXISTS tx_work(
                id int primary key auto_increment,
                work_name varchar(100) not null,
                country_name varchar(50),
                city_name varchar(50),
                work_desc text
            )
        """
        try:
            self.cursor.execute(sql)
            print('表创建成功')
        except Exception as e:
            print('表创建失败',e)

    def save_work_info(self,*args):
        """
        :param args: id,work_name,country_name,city_name,work_desc
        :return:
        """
        sql = """
            insert into tx_work values(%s,%s,%s,%s,%s)
        """
        try:
            self.cursor.execute(sql,args)
            self.db.commit()
            print('数据保存成功',args)
        except Exception as e:
            print(e,'数据保存失败',e)
            self.db.rollback()
    @staticmethod
    def get_md5(item):
        return hashlib.md5(str(item).encode('utf-8')).hexdigest()

    def main(self):
        self.create_table()
        tx_work_generator = self.get_work_info()
        work_id = 0
        for work_list in tx_work_generator:
            for work_info in work_list:
                work_name = work_info['RecruitPostName']
                country_name = work_info['CountryName']
                city_name = work_info['LocationName']
                work_desc = work_info['Responsibility']
                md5_hash = self.get_md5(work_info)
                flag = self.redis.sadd('tx_work', md5_hash)
                if flag:
                    self.save_work_info(work_id,work_name,country_name,city_name,work_desc)
                else:
                    print('数据重复')

        self.close_spider()
    def close_spider(self):
        self.db.close()
        self.cursor.close()
if __name__ == '__main__':
    tx_work = TxWork()
    tx_work.main()