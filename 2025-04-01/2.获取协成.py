import asyncio
import aiohttp

url = 'http://www.baidu.com'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
}

async def fetch(url, headers):
    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=headers) as response:
            return await response.text()

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    tasks = [fetch(url, headers) for _ in range(10)]
    done, pending = loop.run_until_complete(asyncio.wait(tasks))
    for result in done:
        print(result)