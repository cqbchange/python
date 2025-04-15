import os
import time
import pymongo
import requests
import threading
from lxml import etree
from loguru import logger
from retrying import retry
from queue import Queue, Empty
from fake_useragent import UserAgent


class DangDangShop:
    mongo_client = pymongo.MongoClient()
    collection = mongo_client['py_spider']['dangdang_shop']

    def __init__(self):
        self.url = 'https://search.dangdang.com/?key=python&act=input'
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        }
        self.ip_url = 'https://tps.kdlapi.com/api/gettps/?secret_id=o35p5dqv5wbzzjc8hmko&signature=p372e43corlpfi8i8a4eflj6pxym8irm&num=1&pt=1&format=text&sep=1'

        self.ip_queue = Queue()  # IP队列
        self.url_queue = Queue()  # URL队列
        self.response_queue = Queue()  # 响应队列
        self.detail_queue = Queue()  # 商品信息队列

    def fetch_proxy(self, stop_event, min_count=5):
        while not stop_event.is_set():
            if self.ip_queue.qsize() < min_count:
                try:
                    proxy_ip = requests.get(self.ip_url).text.strip()
                    if proxy_ip:
                        self.ip_queue.put(proxy_ip)
                        logger.info(f"获取代理IP: {proxy_ip}")
                except Exception as e:
                    logger.error(f"获取代理IP失败: {e}")
            else:
                time.sleep(5)  # 每5秒检查一次

    def get_page_num(self):
        try:
            response = requests.get(self.url, headers=self.headers)
            tree = etree.HTML(response.text)
            max_page = tree.xpath("//ul[@name='Fy']/li[last()-2]/a/text()")
            if max_page:
                max_page = int(max_page[0])
                for page in range(1, max_page + 1):
                    url = f'https://search.dangdang.com/?key=python&act=input&page_index={page}'
                    self.url_queue.put(url)
                    logger.info(f"Added URL: {url}")
            else:
                self.url_queue.put(self.url)
                logger.info(f"Added URL: {self.url}")
        except Exception as e:
            logger.error(f"获取页面数量失败: {e}")

    @retry(stop_max_attempt_number=5)
    def get_goods_list(self, stop_event):
        logger.info(f"线程 {threading.current_thread().name} 开始运行")
        while not stop_event.is_set():
            try:
                proxy_ip = self.ip_queue.get(timeout=1)
                url = self.url_queue.get(timeout=1)
                username = "t14468364467312"
                password = "tu05hggh"
                proxies = {
                    "http": f"http://{username}:{password}@{proxy_ip}/",
                    "https": f"http://{username}:{password}@{proxy_ip}/"
                }
                self.headers['User-Agent'] = UserAgent().random
                try:
                    response = requests.get(url, headers=self.headers, proxies=proxies, timeout=5)
                    logger.info(f"请求URL: {url} 使用代理: {proxy_ip} 状态码: {response.status_code}")
                    if response.status_code == 200:
                        self.response_queue.put(response)
                        self.ip_queue.put(proxy_ip)  # 将可用的代理IP重新放回ip队列
                    else:
                        logger.warning(f'状态码异常: {response.status_code}')
                except Exception as e:
                    logger.exception("请求失败")
                finally:
                    self.url_queue.task_done()
                    self.ip_queue.task_done()
            except Empty:
                continue
        logger.info(f"线程 {threading.current_thread().name} 结束运行")

    def parse_info(self, stop_event):
        logger.info(f"线程 {threading.current_thread().name} 开始运行")
        while not stop_event.is_set():
            try:
                response = self.response_queue.get(timeout=10)
                logger.info(f"开始解析响应: {response.url}")
                tree = etree.HTML(response.text)
                li_list = tree.xpath("//ul[@class='bigimg']/li")
                for li in li_list:
                    item = {}
                    goods_name = li.xpath("./a/@title")
                    goods_price = li.xpath("p[@class='price']/span[1]/text()")
                    item['goods_name'] = goods_name[0] if goods_name else '空'
                    item['goods_price'] = goods_price[0] if goods_price else '空'
                    self.detail_queue.put(item)
                self.response_queue.task_done()
                logger.info(f"完成解析响应: {response.url}")
            except Empty:
                continue
            except Exception as e:
                logger.exception("解析商品信息失败")
        logger.info(f"线程 {threading.current_thread().name} 结束运行")

    def save_info(self, stop_event):
        logger.info(f"线程 {threading.current_thread().name} 开始运行")
        while not stop_event.is_set():
            try:
                detail = self.detail_queue.get(timeout=10)
                logger.info(f"开始保存数据: {detail}")
                self.collection.insert_one(detail)
                self.detail_queue.task_done()
                logger.info(f"完成保存数据: {detail}")
            except Empty:
                continue
            except Exception as e:
                logger.exception("存储数据失败")
        logger.info(f"线程 {threading.current_thread().name} 结束运行")

    def main(self):
        # Configure logger
        if not os.path.exists('logs'):
            os.makedirs('logs')
        logger.add(
            sink="logs/app.log",
            level="DEBUG",
            format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {thread.name} | {message}",
            rotation="10 MB",
            compression="zip"
        )
        logger.add(
            sink=lambda msg: print(msg, end=''),
            level="DEBUG",
            format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {thread.name} | {message}"
        )

        stop_event = threading.Event()
        self.get_page_num()

        # 启动代理IP获取线程
        proxy_thread = threading.Thread(target=self.fetch_proxy, args=(stop_event,))
        proxy_thread.start()

        thread_list = []
        for _ in range(5):
            thread_obj = threading.Thread(target=self.get_goods_list, args=(stop_event,))
            thread_list.append(thread_obj)

        for _ in range(5):
            thread_obj = threading.Thread(target=self.parse_info, args=(stop_event,))
            thread_list.append(thread_obj)

        save_thread = threading.Thread(target=self.save_info, args=(stop_event,))
        thread_list.append(save_thread)

        for item in thread_list:
            item.start()

        # 等待所有队列任务完成
        self.url_queue.join()
        self.response_queue.join()
        self.detail_queue.join()

        # 设置停止事件
        stop_event.set()

        # 等待所有线程完成
        for item in thread_list:
            item.join()

        # 结束代理IP获取线程
        proxy_thread.join()

        # 关闭MongoDB连接
        self.mongo_client.close()


if __name__ == '__main__':
    shop = DangDangShop()
    shop.main()