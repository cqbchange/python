import json
import re

import requests
import subprocess
from functools import partial
import ddddocr

subprocess.Popen = partial(subprocess.Popen, encoding='utf-8')
import execjs


class WyCaptcha:
    def __init__(self):
        self.cookies  = {
            "_ga": "GA.1.208cfa049bf3b.258d1517e00c03ac02e3",
            "__root_domain_v": ".163.com",
            "_qddaz": "QD.373853949046241",
            "Hm_lvt_4671c5d502135636b837050ec6d716ce": "1765243864",
            "Hm_lpvt_4671c5d502135636b837050ec6d716ce": "1765243864",
            "HMACCOUNT": "840632E9D6409E85"
        }
        self.headers ={
            "Accept": "*/*",
            "Accept-Language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Pragma": "no-cache",
            "Referer": "https://dun.163.com/",
            "Sec-Fetch-Dest": "script",
            "Sec-Fetch-Mode": "no-cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
            "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }
        self.cb = execjs.compile(open('获取cb值.js','r',encoding='utf-8').read()).call('get_cb')
    # 获取验证码图片和token
    def get_captcha_images_and_token(self):
        print(self.cb)
        url = "https://c.dun.163.com/api/v3/get"
        params = {
            "referer": "https://dun.163.com/trial/jigsaw",
            "zoneId": "CN31",
            "dt": "1HFQ7KI7TGREFhUEREODkTLqhU1qiEm8",
            "irToken": "MU4QWcsgpFRFM0AAQUPTngBE5naQIm5g",
            "id": "07e2387ab53a4d6f930b8d9a9be71bdf",
            "fp": "JC/J\\kre/TSGxmMTGk51esqLuRy/85wEJf/GdLlZ5yUoClPA7aslZKx6WbDjoEUE7KlqGmzWqe6yNXkqhxWab5qdYCvigP7xat5ZrT/S\\MVggCkID7CVsAWn/8eaMwSQ1sgGCEyYR03uGM4MKPgZn97u5iN7ZwY5ODGpYo16ZLqbL1Xu:1765246445006",
            "https": "true",
            "type": "2",
            "version": "2.28.5",
            "dpr": "1",
            "dev": "1",
            "cb": self.cb,
            "ipv6": "false",
            "runEnv": "10",
            "group": "",
            "scene": "",
            "lang": "zh-CN",
            "sdkVersion": "",
            "loadVersion": "2.5.3",
            "iv": "4",
            "user": "",
            "width": "320",
            "audio": "false",
            "sizeType": "10",
            "smsVersion": "v3",
            "token": "3c21f6123c654459accdc8b9b7418aaa",
            "callback": "__JSONP_gqtlnv7_2"
        }
        result = requests.get(url,params=params,headers=self.headers,cookies=self.cookies)
        json_data = json.loads(re.findall(r'__JSONP_.*?_\d\((.*?)\)', result.text)[0])
        return {'bg': json_data['data']['bg'][0], 'front': json_data['data']['front'][0],
                'token': json_data['data']['token']}
    # 解析滑动距离
    @staticmethod
    def parse_slide(slider_bytes, background_bytes):
        ocr = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
        result = ocr.slide_match(target_bytes=slider_bytes, background_bytes=background_bytes, simple_target=True)
        print('滑动距离为:', result['target'][0])
        return int(result['target'][0])
    def main(self):
        result = self.get_captcha_images_and_token()
        bg_image_bytes = requests.get(result['bg']).content
        front_image_bytes = requests.get(result['front']).content
        # 获取滑动距离
        slide_distance = self.parse_slide(front_image_bytes, bg_image_bytes)
        # 获取轨迹数据
        # trace_data = BezierTrajectory().generate_trajectory(slide_distance + 5)

if __name__ == '__main__':
    wy_captcha = WyCaptcha()
    wy_captcha.main()