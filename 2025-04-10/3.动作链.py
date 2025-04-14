# 导入webdriver模块，用于控制浏览器
import time

from selenium import webdriver
# 导入By模块，用于定位元素
from selenium.webdriver.common.by import By
# 导入ActionChains模块，用于执行复杂链式操作
from selenium.webdriver.common.action_chains import ActionChains

# 初始化Chrome浏览器驱动
driver = webdriver.Chrome()
# 访问指定的URL
driver.get('http://www.runoob.com/try/try.php?filename=jqueryui-api-droppable')

# 查找iframe元素，这是进行拖拽操作的框架
iframe = driver.find_element(By.ID,'iframeResult')
# 切换到找到的iframe中，以便在其中查找元素
driver.switch_to.frame(iframe)
# 在iframe中查找拖拽源元素和目标元素
source = driver.find_element(By.ID,'draggable')
target = driver.find_element(By.ID,'droppable')

# 创建ActionChains对象，用于执行一系列动作
actions = ActionChains(driver)
# 执行拖拽操作，将源元素拖拽到目标元素上
actions.drag_and_drop(source,target).perform()


time.sleep(3)
driver.quit()