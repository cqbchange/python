import time
from random import randint
from pymongo import mongo_client
from  selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

class WpShop:
    def __init__(self):
        self.mongo_client = mongo_client.MongoClient()
        self.collection = self.mongo_client['py_spider']['wp_shop']
        self.options = webdriver.ChromeOptions()
        self.prefs = {"profile.managed_default_content_setting.images":2}
        self.options.add_experimental_option("prefs",self.prefs)
        self.browser = webdriver.Chrome(options=self.options)
        self.cookies = {
            "mars_cid": "1744273169032_c70b0b20c48573737f67273507d48373",
            "mars_pid": "0",
            "vip_address": "%257B%2522pid%2522%253A%2522105101%2522%252C%2522cid%2522%253A%2522105101101%2522%252C%2522pname%2522%253A%2522%255Cu56db%255Cu5ddd%255Cu7701%2522%252C%2522cname%2522%253A%2522%255Cu6210%255Cu90fd%255Cu5e02%2522%257D",
            "vip_province": "105101",
            "vip_province_name": "%E5%9B%9B%E5%B7%9D%E7%9C%81",
            "vip_city_name": "%E6%88%90%E9%83%BD%E5%B8%82",
            "vip_city_code": "105101101",
            "vip_wh": "VIP_CD",
            "vip_ipver": "31",
            "VipRUID": "625232545",
            "VipUID": "4dc5fe5b745317f00b4109c8dfe0e3d2",
            "VipRNAME": "ph_*****************************8b8",
            "VipDegree": "D1",
            "VipUINFO": "luc%3Ab%7Csuc%3Ab%7Cbct%3Ac_new%7Chct%3Ac_new%7Cbdts%3A0%7Cbcts%3A0%7Ckfts%3A0%7Cc10%3A0%7Crcabt%3A0%7Cp2%3A0%7Cp3%3A1%7Cp4%3A0%7Cp5%3A0%7Cul%3A3105",
            "pc_fdc_area_id": "105101101",
            "pc_fdc_source_ip": "1",
            "is_default_area": "1",
            "mars_sid": "3ef115cd7ce2a581f7d2c4fd0b5166af",
            "visit_id": "0FD8357AAD8FC86BE07A29DABEA4BCE8",
            "sfl_d": "0",
            "user_class": "b",
            "vip_access_times": "%7B%22list%22%3A2%7D",
            "vipshop_passport_src": "https%3A%2F%2Fcategory.vip.com%2Fsuggest.php%3Fkeyword%3D%25E7%2594%25B5%25E8%2584%2591%26ff%3D235%7C12%7C1%7C1%26tfs_url%3D%252F%252Fmapi-pc.vip.com%252Fvips-mobile%252Frest%252Fshopping%252Fpc%252Fsearch%252Fproduct%252Frank",
            "_jzqco": "%7C%7C%7C%7C%7C1.730985755.1744273169913.1744273169913.1744351125844.1744273169913.1744351125844.0.0.0.2.2",
            "tfs_fp_token": "BCWnpsfRuJmcVCpgPTKK6gqpn721n8SE3rrC1VmacDi+FHQzChCNZgsqezuGgzXmwd1csJ7eZ2CYPhEyxi0ijjA%3D%3D",
            "tfs_fp_timestamp": "1744351125854",
            "vip_tracker_source_from": "",
            "PASSPORT_ACCESS_TOKEN": "BD06B7A5E6A9861C54AEA0621AFA23A1A88F1D0B",
            "VipLID": "0%7C1744351136%7C770d7a",
            "fe_global_sync": "1",
            "pg_session_no": "2",
            "waitlist": "%7B%22pollingId%22%3A%22A5EB146E-43BB-45F0-8F90-E3488FB77ECD%22%2C%22pollingStamp%22%3A1744351162656%7D"
        }


    def connect_shop_page(self):
        self.browser.get('https://category.vip.com/suggest.php?keyword=%E7%94%B5%E8%84%91&ff=235|12|1|1')
        for key,value in self.cookies.items():
            self.browser.add_cookie({'name':key,'value':value})
        self.browser.refresh()
        time.sleep(randint(1,3))

    def drop_down(self):
        for i in range(1,11):
            js_code = f'window.scrollTo(0,{i*1000})'
            self.browser.execute_script(js_code)
            time.sleep(randint(1,3))

    def parse_data(self):
        self.drop_down()
        div_list = self.browser.find_elements(By.XPATH,'//section[@id="J_searchCatList"]/div[@class="c-goods-item  J-goods-item c-goods-item--auto-width"]')
        for div in div_list:
            price = div.find_element(By.XPATH,'.//div[@class="c-goods-item__sale-price J-goods-item__sale-price"]').text
            title = div.find_element(By.XPATH,'.//div[2]/div[2]').text
            item = {
                'title':title,
                'price':price
            }
            print(item)
            self.save_mongo(item)
        self.next_page()
    def save_mongo(self,item):
        self.collection.insert_one(item)

    def next_page(self):
        try:
            next_page = self.browser.find_element(By.XPATH,'//*[@id="J_nextPage_link"]')
            if next_page:
                next_page.click()
                time.sleep(randint(1,3))
                self.parse_data()
            else:
                self.browser.close()
        except NoSuchElementException:
            print('没有下一页了')
            self.browser.quit()
    def main(self):
        self.connect_shop_page()
        self.parse_data()

if __name__ == '__main__':
    wp_shop = WpShop()
    wp_shop.main()


