from multiprocessing import Manager

import pymongo
import requests
import jsonpath
from concurrent.futures import ProcessPoolExecutor,wait

url = "https://careers.tencent.com/tencentcareer/api/post/Query"
headers = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
}

mongo_client = pymongo.MongoClient('localhost', 27017)
collection = mongo_client['py_spider']['process_pool_tx_work']

def get_work_info(page_num, q):
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
            q.put(work_info_dict)
    except Exception as e:
        print(e, '数据不纯在')


def save_work_info(q):
    while True:
        work_info_dict = q.get()
        if work_info_dict is None:
            break
        collection.insert_one(work_info_dict)
        print('数据插入成功', work_info_dict)

if __name__ == '__main__':
    with Manager() as manager:
        queue = manager.Queue()
        with ProcessPoolExecutor() as pool:
            futures = [pool.submit(get_work_info, i, queue) for i in range(1, 6)]
            pool.submit(save_work_info, queue)
            wait(futures)
            queue.put(None)
