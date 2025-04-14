import time

from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import  expected_conditions as EC
from selenium.webdriver.common.by import By

browser = webdriver.Chrome()
# 等待浏览器加载完成
wait_obj = WebDriverWait(browser,10)

browser.get('https://www.jd.com')
# EC.presence_of_element_located()
# EC.presence_of_all_elements_located()
search_input = wait_obj.until(EC.presence_of_element_located((By.ID,'key')))
# print(search_input)
search_input.send_keys('口红')
time.sleep(3)
search_button = wait_obj.until(EC.element_to_be_clickable((By.XPATH,'//*[@id="search"]/div/div[2]/button')))
search_button.click()
time.sleep(100)
browser.quit()

