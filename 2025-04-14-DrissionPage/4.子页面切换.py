import time
from DrissionPage.common import By
from DrissionPage import ChromiumPage

page = ChromiumPage()
page.get('https://www.douban.com')
page.ele((By.CLASS_NAME, 'account-tab-account')).click()
page.ele((By.ID, 'username')).input('13273021913')
page.ele((By.ID, 'password')).input('123456')
page.ele((By.LINK_TEXT,'登录豆瓣')).click()
time.sleep(3)
page.quit()