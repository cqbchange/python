import  time
import requests
from multiprocessing import Process,JoinableQueue as Queue
from lxml import etree
import os

class BeautyImage:
    def __init__(self):
        self.url = 'https://www.lpbzj.vip/allimg/page/{}'
        self.headers = {
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        }
        self.params_queue = Queue()#参数
        self.json_queue = Queue()#详情路径
        self.img_queue = Queue()#图片

    def get_url(self):
        for page_num in range(1, 17):
            self.params_queue.put(page_num)

    def get_movie_info(self):
        while True:
            params_dict = self.params_queue.get()
            response = requests.get(url=self.url.format(params_dict), headers=self.headers)
            tree = etree.HTML(response.text)
            detail_div = tree.xpath('//div[@id="posts"]')[0]
            detail_url_list = detail_div.xpath('.//div[@class="img"]/a/@href')
            for detail_url in detail_url_list:
                self.json_queue.put(detail_url)
            self.params_queue.task_done()
    def get_detail_url(self):
        while True:
            detail_url = self.json_queue.get()
            response = requests.get(url=detail_url,headers=self.headers)
            tree = etree.HTML(response.text)
            div_element = tree.xpath('//div[@class="article-content clearfix"]')[0]
            image_url_list = div_element.xpath('.//img/@src')
            for image_url in image_url_list:
                self.img_queue.put(image_url)
            self.json_queue.task_done()

    def parse_movie_info(self):
        while True:
            url = self.img_queue.get()
            response = requests.get(url=url)
            file_name = url.split('/')[-1]
            with open('./招聘图集/'+file_name,'wb') as f:
                f.write(response.content)
                print(url,'下载成功')
            self.img_queue.task_done()

    def main(self):
        process_list = list()
        p_put_params = Process(target=self.get_url)
        p_put_params.start()
        p_put_params.join()

        for _ in range(10):
            p_get_info = Process(target=self.get_movie_info)
            process_list.append(p_get_info)
        for _ in range(10):
            p_parse_img = Process(target=self.get_detail_url)
            process_list.append(p_parse_img)

        for _ in range(10):
            p_parse_movie_info = Process(target=self.parse_movie_info)
            process_list.append(p_parse_movie_info)


        for process_obj in process_list:
            process_obj.daemon = True
            process_obj.start()

        for queue in [self.params_queue,self.json_queue,self.img_queue]:
            queue.join()
if __name__ == '__main__':
    if not os.path.exists('./招聘图集'):
        os.mkdir('./招聘图集')
    start_time = time.time()
    beauty_info = BeautyImage()
    beauty_info.main()
    end_time = time.time()
    print('共耗时{}秒'.format(end_time-start_time))