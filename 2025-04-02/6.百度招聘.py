
import pymysql
import requests
from dbutils.pooled_db import PooledDB
from concurrent.futures import ThreadPoolExecutor,as_completed

class BaiduWorkSpider:
    def __init__(self):
        self.pool = PooledDB(
            creator=pymysql,
            maxconnections=6,
            mincached=2,
            maxcached=5,
            maxshared=3,
            blocking=True,
            maxusage=None,
            setsession=[],
            ping=0,
            host='localhost',
            port=3306,
            user='root',
            password='el571987',
            database='py_spider',
            charset='utf8'
        )

        self.api_url = 'https://talent.baidu.com/httservice/getPostListNew'
        self.headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
            "referer": "https://talent.baidu.com/jobs/social-list?search=python"
        }

    def get_work_info(self,page_num):
        post_form = {
            "recruitType":"SOCIAL",
            "pageSize": "10",
            "keyWord":"python",
            "curPage":page_num,
            "projectType":""
        }
        response = requests.post(url=self.api_url,headers=self.headers,data=post_form).json()
        return response
    def parse_work_info(self,response):
        work_list = response['data']['list']
        for work_info in work_list:
            education = work_info['education'] if work_info['education'] else '空'
            name = work_info['name']
            service_condition = work_info['serviceCondition']
            self.save_work_info(0,education,name,service_condition)

    def save_work_info(self,*args):
        """
        :param args:ideducation,name,service_condition
        :return:
        """
        with self.pool.connection() as conn:
            with conn.cursor() as cursor:
                sql = "insert into baidu_work_threed_pool values(%s,%s,%s,%s)"
                try:
                    cursor.execute(sql,args)
                    print(f'{args}保存成功')
                    conn.commit()
                except Exception as e:
                    print('保存失败',e)
                    conn.rollback()
    def create_table(self):
        with self.pool.connection() as conn:
            with conn.cursor() as cursor:
                sql = '''
                create table if not exists baidu_work_threed_pool(
                id int primary key auto_increment,
                education varchar(200),
                name varchar(100),
                service_condition text
                );
                '''
                try:
                    cursor.execute(sql)
                    print('表创建成功')
                except Exception as e:
                    print('创建表失败',e)
    def main(self):
        self.create_table()
        with ThreadPoolExecutor(max_workers=5) as pool:
            future_list = [pool.submit(self.get_work_info,i) for i in range(1,38)]
            for future in as_completed(future_list):
               pool.submit(self.parse_work_info,future.result())

if __name__ == '__main__':
    spider = BaiduWorkSpider()
    spider.main()