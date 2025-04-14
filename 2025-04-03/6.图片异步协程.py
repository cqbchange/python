import time
from lxml import etree
import os
import asyncio
import aiofile
import aiohttp

class BeautyImage:
    def __init__(self):
        self.url = 'https://www.lpbzj.vip/allimg/page/{}'
        self.headers = {
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        }
    async def get_detail_url(self,page_num,session):
        async with session.get(self.url.format(page_num)) as response:
            if response.status == 200:
                content = await response.read()
                tree = etree.HTML(content)
                detail_div = tree.xpath('//div[@id="posts"]')[0]
                detail_url_list = detail_div.xpath('.//div[@class="img"]/a/@href')
                for detail_url in detail_url_list:
                    await self.save_image(detail_url,session)
            else:
                print('下载失败')

    async def save_image(self,detail_url,session):
        async with session.get(detail_url) as response:
            if response.status == 200:
                content = await response.read()
                tree = etree.HTML(content)
                div_element = tree.xpath('//div[@class="article-content clearfix"]')[0]
                image_url_list = div_element.xpath('.//img/@src')
                for image_url in image_url_list:
                    await self.download_image(image_url,session)
    async def download_image(self,image_url,session):
        async with session.get(image_url) as response:
            if response.status == 200:
                content = await response.read()
                file_name = image_url.split('/')[-1]
                async with aiofile.async_open(f'./招聘图集/{file_name}', 'wb') as f:
                    await f.write(content)
                    print(f'{file_name}下载成功')
            else:
                print(image_url, '下载失败')

    async def main(self):
        async with aiohttp.ClientSession() as session:
            tasks = []
            for page_num in range(1, 17):
                tasks.append(asyncio.create_task(self.get_detail_url(page_num,session)))
            await asyncio.wait(tasks)

if __name__ == '__main__':
    if not os.path.exists('./招聘图集'):
        os.mkdir('./招聘图集')
    start_time = time.time()
    loop = asyncio.get_event_loop()
    beauty_image = BeautyImage()
    loop.run_until_complete(beauty_image.main())
    end_time = time.time()
    print('共耗时{}秒'.format(end_time-start_time))