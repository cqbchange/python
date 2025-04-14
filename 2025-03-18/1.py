
from lxml import etree

text = '''<div>
    <div class='info'>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
</div>'''

element = etree.HTML(text)

text_info = element.xpath('//div[@class="info"]/text()')

print(element,text_info)
