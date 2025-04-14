import requests
from concurrent.futures import ThreadPoolExecutor,as_completed
from lxml import etree
from fake_useragent import UserAgent


url = 'https://movie.douban.com/top250?start={}&filter='

def get_movie_info(page_num):
    # headers = {'User-Agent': UserAgent().random}
    # responses = requests.get(url.format(page_num*25), headers=headers).text
    # print(responses)
    # tree = etree.HTML(responses)
    # result = tree.xpath('//div[@class="hd"]/a/span[1]/text()')
    # return result
    return page_num

if __name__ == '__main__':
    with ThreadPoolExecutor(max_workers=5) as pool:
        futures = [pool.submit(get_movie_info, i) for  i in range(10)]
        # for future in futures:
        #    print(future.result())堵塞线程池
        #
        for future in as_completed(futures):
            print(future.result())