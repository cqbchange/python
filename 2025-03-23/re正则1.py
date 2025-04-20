
import re

content = """
苹果是绿色的
橙子是黑色的
香蕉是橙色的
乌鸦是黄色的
"""
print(re.findall(r'.色',content))

for temp in re.findall(r'.色',content):
    print(temp)
print('-'*40)
content = """
苹果，是绿色的
橙子，是黑色的
香蕉，是橙色的
乌鸦，是黄色的
"""
for temp in re.findall(r'，.*',content):
    print(temp)
print('-'*40)
content = """
苹果，是绿色的
橙子，是黑色的
香蕉，是橙色的
乌鸦，是黄色的
"""
for temp in re.findall(r'，.+',content):
    print(temp)
print('-'*40)
content = """
苹果，是绿色的
橙子，是黑色的
香蕉，是橙色的
乌鸦，是黄色的
"""
for temp in re.findall(r'，.?',content):
    print(temp)

print('-'*40)

content = '红彤彤，黑乎乎，绿油油油油'

for temp in re.findall(r'油{2}',content):
    print(temp)
print('-'*40)

# 贪婪与非贪婪
content = '<html><head><title>Title</title>'

for temp in re.findall(r'<.*?>',content):
    print('惰性',temp)
for temp in re.findall(r'<.*>',content):
    print('贪婪',temp)