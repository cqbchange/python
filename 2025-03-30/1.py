import pymysql

from  dbutils.pooled_db import PooledDB

pool = PooledDB(
    greator=pymysql,# 使用链接数据库的模块
    maxconnections=6,#连接池允许的最大连接数，0和None表示无限
    mincached=2,# 初始化时，链接池中至少创建的空闲的链接，0表示# 链接池中最多闲置的链接，0和None不限制
    maxcached=5,
    maxshared=3,# 链接池中最多共享的链接数量，0和None表示全部共
    blocking=True, #连接池中如果没有可用链接后，是否阻塞等待。
    Fhost='127.0.0.1',
    port=3306,
    user='root',
    password='123456',
    database='py_spider',
    charset='utf8',
)
# 第一步从连接池获取可用链接
conn = pool.connection()

# 使用链接对象获取游标
cursor = conn.cursor()

sql = 'select * from tx_work'
cursor.execute(sql)
print(cursor.fetchall())
cursor.close()
conn.close()
pool.close()
