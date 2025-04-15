import os

from DrissionPage import SessionPage

url = 'https://www.lpbzj.vip/allimg'
page = SessionPage()
page.get(url)
element_div = page.s_eles("xpath://div[@id='posts']")[0]
print(element_div)
detail_url_list = element_div.s_eles("xpath:.//div[@class='img']/a")
save_path='./美女图片'
os.makedirs(save_path,exist_ok=True)
for detail_url in detail_url_list:
    page.get(detail_url.attr('href'))
    div_element = page.s_eles("xpath://div[@class='article-content clearfix']")[0]
    image_url_list = div_element.s_eles("xpath:.//img")
    for image_url in image_url_list:
        img_src = image_url.attr('src')
        page.download.add(img_src,save_path)
        print(f"Downloading image from: {img_src}")
