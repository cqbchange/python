import time

from DrissionPage.common import By

from DrissionPage import ChromiumPage

page = ChromiumPage()
page.get('https://www.baidu.com')

page.set.window.max()

# 元素定位
# page.ele((By.XPATH, '//input[@id="kw"]')).input('python')
# page.ele((By.XPATH, '//input[@id="su"]')).click()

page.ele('xpath://input[@id="kw"]').input('汉服')
page.ele('xpath://input[@id="su"]').click()
time.sleep(5)
page.quit()