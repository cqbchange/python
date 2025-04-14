import os
import time
from lxml import etree
from concurrent.futures import ThreadPoolExecutor,as_completed
import requests

url = 'https://www.lpbzj.vip/allimg/page/{}'

headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
}

def get_detail_url(page_num):
    response = requests.get(url=url.format(page_num),headers=headers).text
    tree = etree.HTML(response)
    detail_div = tree.xpath('//div[@id="posts"]')[0]
    detail_url_list = detail_div.xpath('.//div[@class="img"]/a/@href')
    return detail_url_list



def download_image(image_url):
    response = requests.get(url=image_url,headers=headers).content
    file_name = image_url.split('/')[-1]
    with open('./招聘图集/'+file_name,'wb') as f:
        f.write(response)
        print(image_url,'下载成功')

def save_image(detail_url):
    response = requests.get(url=detail_url,headers=headers)
    if response.status_code == 200:
        tree = etree.HTML(response.text)
        div_element = tree.xpath('//div[@class="article-content clearfix"]')[0]
        image_url_list = div_element.xpath('.//img/@src')
        with ThreadPoolExecutor(max_workers=5) as inner_pool:
            inner_pool.map(download_image,image_url_list)
    else:
        print(detail_url, '下载失败')

if __name__ == '__main__':
    if not os.path.exists('./招聘图集'):
        os.mkdir('./招聘图集')

    start_time = time.time()
    with ThreadPoolExecutor() as pool:
        futures = [pool.submit(get_detail_url,i) for i in range(1,17)]
        for future in as_completed(futures):
            pool.map(save_image,future.result())

    end_time = time.time()
    print('共耗时{}秒'.format(end_time-start_time))