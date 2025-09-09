import os
import subprocess
from functools import partial
import scrapy
from scrapy import cmdline
from scrapy.http import HtmlResponse
subprocess.Popen = partial(subprocess.Popen,encoding='utf-8')

import execjs


class CcprecSpider(scrapy.Spider):
    name = 'ccprec'
    # allowed_domains = ['example.com']
    # start_urls = ['http://example.com/']
    js_path = os.path.join(os.getcwd(), 'utils', 'ccprec.js')
    if not os.path.exists(js_path):
        raise Exception('未找到js文件')
    with open(js_path, 'r', encoding='utf-8') as f:
        js_code = f.read()
    ctx = execjs.compile(js_code)
    def start_requests(self):
        for i in range(1, 2):
            url = 'https://www.ccprec.com/honsanCloudAct'
            yield scrapy.Request(url=url, method="POST",body= str(i))
    def parse(self, response:HtmlResponse , **kwargs):
        text = response.text
        # decrypted_data = self.ctx.call('get_decode', text)
        print(f'parse下打印的数据为:{text}')
        # pass

if __name__ == '__main__':
    cmdline.execute('scrapy crawl ccprec'.split())