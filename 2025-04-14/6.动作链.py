import time

from DrissionPage import ChromiumPage
from DrissionPage.common import By

page = ChromiumPage()
url  = 'http://www.runoob.com/try/try.php?filename=jqueryui-api-droppable'

page.get(url)

source = page.ele((By.ID,'draggable'))
target = page.ele((By.ID,'droppable'))
page.actions.hold(source).release(target)
time.sleep(5)
page.quit()