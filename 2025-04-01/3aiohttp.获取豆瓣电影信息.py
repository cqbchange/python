
import aiohttp
import asyncio
import requests
from bs4 import BeautifulSoup

url = 'https://movie.douban.com/top250?start={}&filter='
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
}

def my_callback(task):
    print(task.result())

async def get_movie_info(page_num):
    async with aiohttp.ClientSession() as session:
        async with session.get(url.format(page_num), headers=headers) as response:
            soup =BeautifulSoup(await response.text(), 'lxml')
            div_list = soup.find_all('div', class_='hd')
            for title in div_list:
                return title.get_text()


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    tasks = [loop.create_task(get_movie_info(i*25)) for i in range(10)]
    for task in tasks:
        task.add_done_callback(my_callback)
    loop.run_until_complete(asyncio.wait(tasks))