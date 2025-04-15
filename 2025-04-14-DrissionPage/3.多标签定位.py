from DrissionPage import ChromiumPage

page = ChromiumPage()
page.get('https://movie.douban.com/top250')

div_list = page.eles('xpath://ol[@class="grid_view"]/li/div[@class="item"]')
for item in div_list:
    movie_name = item.ele('xpath:.//div[@class="hd"]/a/span[@class="title"][1]').text
    movie_image = item.ele('xpath:.//div[@class="pic"]/a/img').attr('src')
    movie_images = item.ele('xpath:.//div[@class="pic"]/a/img').attrs
    print(movie_name,movie_image,movie_images)