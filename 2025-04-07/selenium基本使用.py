import time

from selenium import webdriver
b = webdriver.Chrome()
b.get('https://www.baidu.com')
# 指定 ChromeDriver 的路径（根据您的实际路径进行修改）
# 初始化 WebDriverC:\ProgramData\Miniconda3
time.sleep(10)
# 完成后，关闭 WebDriver
b.quit()
