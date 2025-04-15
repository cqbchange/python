
from DrissionPage.common import By
from DrissionPage import ChromiumPage

page  = ChromiumPage()
# 监听api数据接口（接口监听一定先监听之后才是请求）
page.listen.start('/mvc/getContentList.do')
page.get('http://www.ccgp-hunan.gov.cn/page/content/more.jsp?column_code=2')
# gen_obj = page.listen.steps()
# for i in gen_obj:
#     print(i.response.body)

for item in page.listen.steps(count=4):
    print('数据：',item.response.body)
    next_element_flag = page.ele((By.LINK_TEXT,'下一页'),timeout=3)
    if next_element_flag:
        next_element_flag.click()
    else:
        print('没有下一页了')
        page.quit()
        break