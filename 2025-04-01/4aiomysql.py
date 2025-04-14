import asyncio
import aiomysql

async  def get_tx_work():
    db = await aiomysql.connect(host='localhost', port=3306, user='root', password='el571987', db='py_spider',
                               charset='utf8')
    cursor = await db.cursor()
    sql  = '''
    select * from tx_work
    '''
    await cursor.execute(sql)
    result = await cursor.fetchall()
    print(result)
    await cursor.close()
    db.close()



if  __name__ == '__main__':
        loop = asyncio.get_event_loop()
        loop.run_until_complete(get_tx_work())