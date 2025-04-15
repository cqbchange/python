import pymongo
import requests
import threading
from queue import Queue, Empty
from lxml import etree
from fake_useragent import UserAgent
from retrying import retry

class DangDangShop:
    mongo_clint = pymongo.MongoClient()
    collection = mongo_clint['py_spider']['dangdang_shop']

    def __init__(self):
        self.url = 'https://search.dangdang.com/?key=python&act=input'
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        }
        self.ip_url = 'https://tps.kdlapi.com/api/gettps/?secret_id=o35p5dqv5wbzzjc8hmko&signature=p372e43corlpfi8i8a4eflj6pxym8irm&num=1&pt=1&format=text&sep=1'
        self.ip_queue = Queue()
        self.url_queue = Queue()
        self.response_queue = Queue()
        self.detail_queue = Queue()

    def get_ip(self):
        try:
            proxy_ip = requests.get(self.ip_url).text.strip()
            self.ip_queue.put(proxy_ip)
        except Exception as e:
            print(f"获取IP失败: {e}")

    def get_page_num(self):
        try:
            response = requests.get(url=self.url, headers=self.headers)
            tree = etree.HTML(response.text)
            max_page = tree.xpath("//ul[@name='Fy']/li[last()-2]/a/text()")
            if max_page:
                max_page = int(max_page[0])
                for page in range(1, max_page + 1):
                    url = f'https://search.dangdang.com/?key=python&act=input&page_index={page}'
                    self.url_queue.put(url)
            else:
                self.url_queue.put(self.url)
        except Exception as e:
            print(f"获取页面数量失败: {e}")

    @retry(stop_max_attempt_number=3)
    def get_goods_list(self):
        while True:
            try:
                proxy_ip = self.ip_queue.get()
                url = self.url_queue.get()
                username = "t14468364467312"
                password = "tu05hggh"
                proxies = {
                    "http": f"http://{username}:{password}@{proxy_ip}/",
                    "https": f"http://{username}:{password}@{proxy_ip}/"
                }
                self.headers['User-Agent'] = UserAgent().random
                response = requests.get(url=url, headers=self.headers, proxies=proxies, timeout=5)
                self.response_queue.put(response)
                if response.status_code == 200:
                    self.ip_queue.put(proxy_ip)
                    print(f'当前代理可用: {proxy_ip}')
                else:
                    print(f'当前代理不可用: {proxy_ip}')
            except Empty:
                continue
            except Exception as e:
                print(f"获取商品列表失败: {e}")
            finally:
                self.url_queue.task_done()

    def parse_info(self):
        while True:
            try:
                response = self.response_queue.get(timeout=10)
                tree = etree.HTML(response.text)
                li_list = tree.xpath('//ul[@class="bigimg"]/li')
                for li in li_list:
                    item = dict()
                    goods_name = li.xpath('./a/@title')
                    goods_price = li.xpath("p[@class='price']/span[1]/text()")
                    item['goods_name'] = goods_name[0] if goods_name else '空'
                    item['goods_price'] = goods_price[0] if goods_price else '空'
                    self.detail_queue.put(item)
            except Empty:
                continue
            except Exception as e:
                print(f"解析信息失败: {e}")
            finally:
                self.response_queue.task_done()

    def save_info(self):
        while True:
            try:
                item = self.detail_queue.get(timeout=10)
                self.collection.insert_one(item)
                print(f'数据插入成功: {item}')
            except Empty:
                continue
            except Exception as e:
                print(f"保存信息失败: {e}")
            finally:
                self.detail_queue.task_done()

    def main(self):
        self.get_page_num()
        thread_list = []
        # 启动代理IP获取线程
        proxy_thread = threading.Thread(target=self.get_ip)
        proxy_thread.start()
        for i in range(5):
            t1 = threading.Thread(target=self.get_goods_list)
            thread_list.append(t1)
        for i in range(5):
            t2 = threading.Thread(target=self.parse_info)
            thread_list.append(t2)
        t3 = threading.Thread(target=self.save_info)
        thread_list.append(t3)

        for item in thread_list:
            item.daemon = True
            item.start()

        for queue in [self.url_queue, self.response_queue, self.detail_queue]:
            queue.join()
        # 结束代理IP获取线程
        proxy_thread.join()

        # 关闭MongoDB连接
        self.mongo_clint.close()
if __name__ == '__main__':
    dangdang = DangDangShop()
    dangdang.main()