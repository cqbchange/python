from DrissionPage import ChromiumPage

page = ChromiumPage()
page.get('https://www.baidu.com')

# element = page.ele('xpath://input[@id="kw"]')
# 规定时间内查找元素超时返回False
element = page.wait.eles_loaded('xpath://input[@id="kw"]',timeout=2)
print(element)