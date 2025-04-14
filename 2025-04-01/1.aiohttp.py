import asyncio
import aiohttp

url = 'http://www.baidu.com'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
}

async def fetch(url, headers):
        # session = aiohttp.ClientSession()
        #
        # response = await session.get(url, headers=headers)
        #
        # result = await response.text()
        # print(result)
        # await session.close()

        # 上下文管理器
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                result = await response.text()
                print(result)

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    tasks = [fetch(url, headers) for _ in range(10)]
    loop.run_until_complete(asyncio.wait(tasks))
