import time
import pymongo
import requests
import jsonpath
from multiprocessing import Pool,Process, JoinableQueue as Queue

url = "https://careers.tencent.com/tencentcareer/api/post/Query"

headers = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
}
mongo_client = pymongo.MongoClient('localhost', 27017)['py_spider']['tencent_job']

def get_tx_work(page_num, queue):
    params = {
        "timestamp": "1743576759679",
        "countryId": "",
        "cityId": "",
        "bgIds": "",
        "productId": "",
        "categoryId": "",
        "parentCategoryId": "",
        "attrId": "",
        "keyword": "python",
        "pageIndex": page_num,
        "pageSize": "10",
        "language": "zh-cn",
        "area": ""
    }

    response = requests.get(url=url, headers=headers, params=params).json()
    try:
        for info in response['Data']['Posts']:
            work_info_dict = dict()
            work_info_dict['recruit_post_name'] = jsonpath.jsonpath(info, '$..RecruitPostName')[0]
            work_info_dict['country_name'] = jsonpath.jsonpath(info, '$..CountryName')[0]
            work_info_dict['location_name'] = jsonpath.jsonpath(info, '$..LocationName')[0]
            work_info_dict['category_name'] = jsonpath.jsonpath(info, '$..CategoryName')[0]
            work_info_dict['responsibility'] = jsonpath.jsonpath(info, '$..Responsibility')[0]
            work_info_dict['last_update_time'] = jsonpath.jsonpath(info, '$..LastUpdateTime')[0]
            queue.put(work_info_dict)
    except Exception as e:
        print(e, '数据不存在')

def save_tx_work(queue):
    while True:
        work_info_dict = queue.get()
        mongo_client.insert_one(work_info_dict)
        print('数据插入成功', work_info_dict)
        queue.task_done()

if __name__ == '__main__':
    dict_info_queue = Queue()
    process_list = []

    # 创建一个进程池
    with Pool(processes=4) as pool:  # 这里设置进程池大小为4
        # 使用进程池处理获取数据的任务
        for i in range(1, 35):
            pool.apply_async(get_tx_work, args=(i, dict_info_queue))

        # 创建一个单独的进程用于保存数据
        p_save_work = Process(target=save_tx_work, args=(dict_info_queue,))
        p_save_work.daemon = True
        p_save_work.start()

        # 关闭进程池，不再接受新的任务
        pool.close()
        # 等待所有任务完成
        pool.join()

        # 等待队列中的所有任务完成
        dict_info_queue.join()
        print('任务完成')
