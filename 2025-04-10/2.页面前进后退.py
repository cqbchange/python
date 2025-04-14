import time
from selenium import webdriver

browser = webdriver.Chrome()
browser.get('https://www.jd.com')
time.sleep(2)
browser.get('https://www.taobao.com')
time.sleep(2)
browser.back()
time.sleep(3)
browser.forward()
time.sleep(3)
browser.quit()