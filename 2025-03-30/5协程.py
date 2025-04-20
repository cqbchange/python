import asyncio
import requests
from functools import partial
from bs4 import BeautifulSoup

async  def work():
    for i in range(1,6):
        print('结果',i)
        await asyncio.sleep(1)

coro_obj_1 = work()

coro_obj_2 = work()
coro_list = [coro_obj_2,coro_obj_1]
loop = asyncio.get_event_loop()
loop.run_until_complete(asyncio.wait(coro_list))