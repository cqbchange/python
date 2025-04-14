import pymysql

from dbutils.pooled_db import PooledDB

pool = PooledDB(
    creator=pymysql,
    maxconnections=6,
    mincached=2,
    maxcached=5,
    maxshared=3,
    blocking=True,
    host='127.0.0.1',
    port=3306,
    user='root',
    password='el571987',
    database='py_spider',
    charset='utf8',
)

# 从连接池获取可用的链接
conn = pool.connection()
# 使用链接对象获取游标
cursor = conn.cursor()
# 使用游标对象执行sql
sql = 'select * from tx_work'
cursor.execute(sql)
print(cursor.fetchall())

# 关闭资源

cursor.close()
conn.close()
pool.close()