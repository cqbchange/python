import os
import asyncio
import aiofile
import aiohttp

class HeroSkin:
    def __init__(self):
        self.json_url = 'https://pvp.qq.com/web201605/js/herolist.json'
        self.skin_url = 'https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/{}/{}-bigskin-{}.jpg'
        self.headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        }
    async def get_image_content(self,session,e_name,c_name):
        for skin_id in range(1,31):
            async with session.get(self.skin_url.format(e_name,e_name,skin_id)) as response:
                if response.status == 200:
                    content = await response.read()
                    async with aiofile.async_open(f'./images/{c_name}-{skin_id}.jpg', 'wb') as f:
                        await f.write(content)
                        print(f'{c_name}-{skin_id}下载成功')
                else:
                   break

    # 定义一个异步主函数
    async def main(self):
        # 初始化一个任务列表，用于存储所有的异步任务
        task_list=list()

        # 使用异步上下文管理器创建一个HTTP客户端会话
        async with aiohttp.ClientSession() as session:
            # 发起异步GET请求，获取JSON数据
            async with session.get(self.json_url,headers=self.headers) as response:
                # 等待响应并解析为JSON格式
                json_data = await response.json(content_type=None)

                # 遍历JSON数据中的每个英雄信息
                for hero in json_data:
                    # 获取英雄的英文名称
                    e_name = hero['ename']
                    # 获取英雄的中文名称
                    c_name = hero['cname']
                    # 调用get_image_content函数，下载英雄的图片内容
                    # 并将任务封装为异步任务对象，添加到任务列表中
                    task = self.get_image_content(session,e_name,c_name)
                    task_list.append(loop.create_task(task))

                # 等待所有任务完成
                await asyncio.wait(task_list)

if __name__ == '__main__':
    if not os.path.exists('./images'):
        os.mkdir('./images')
    loop = asyncio.get_event_loop()
    hero = HeroSkin()
    loop.run_until_complete(hero.main())