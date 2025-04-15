import time

import random

from DrissionPage import ChromiumPage

page = ChromiumPage()
page.listen.start('api/sns/web/v1/homefeed')
page.get('https://www.xiaohongshu.com/explore')
while True:
    js_code = f"document.documentElement.scrollTop = document.documentElement.scrollHeight * {1000}"
    page.run_js(js_code)

    is_api_list = page.listen.wait(count=5, timeout=1)
    if is_api_list:
        for item in is_api_list:
            print(item.response.body)
        break