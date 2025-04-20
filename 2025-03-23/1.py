from bs4 import BeautifulSoup

html = """"""
soup = BeautifulSoup(html,'lxml')

# 标签选择器
print(soup.select('title'))
print(soup.select('a'))
print(soup.select_one('a'))
print(soup.select('b'))

# 类选择器
print(soup.select('.sister'))

# id选择器

print(soup.select('#id'))

# 层级选择器

print(soup.select('p #id'))

# 属性选择器

print(soup.select('a[class="sister"]'))

# 获取文本内容

print(soup.find('title').get_text())

print(soup.select('title')[0].get_text())
