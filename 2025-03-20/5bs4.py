from bs4 import BeautifulSoup

html = """
    <div>123</div>
    <p class ='ss'>13<p>
    <p>
        <text>12</text>
        <p id='link2'>1</p>
    </p>
"""

soup = BeautifulSoup(html,'lxml')
# 格式化
print(soup.prettify())
# 获取p标签
res_1 = soup.find_all('p')
print(res_1)

# 获取第一个p标签
res_2 = soup.find('p')
print(res_2)
# 添加属性条件查询指定标签

res_3 = soup.find('p',{'id':'link2'})
print(res_3)
res_4 = soup.find('p',id='link2')
print(res_4)
res_5 = soup.find('p',class_='ss')
print(res_5)