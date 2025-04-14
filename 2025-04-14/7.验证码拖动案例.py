import time
from DrissionPage import ChromiumPage
from DrissionPage.common import By

url = 'https://ynjzjgcx.com/dataPub/enterprise'
page = ChromiumPage()
page.get(url)
button = page.ele((By.CLASS_NAME,'slide-verify-slider-mask-item'))
page.actions.hold(button)
page.actions.right(300).release()
time.sleep(3)
page.quit()
