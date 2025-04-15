'https://36kr.com/'
import time
from selenium import webdriver

browser = webdriver.Chrome()
browser.get('https://36kr.com/')
# js_code = 'window.scrollTo(0,200)'
# browser.execute_script(js_code)
for page in range(1,10):
    browser.execute_script(f'window.scrollTo(0,{page*1000})')
    time.sleep(1)
time.sleep(5)
browser.quit()