import csv

import requests

url = 'https://api.bilibili.com/x/web-interface/wbi/search/type?category_id=&search_type=video&ad_resource=5654&__refresh__=true&_extra=&context=&page=3&page_size=42&pubtime_begin_s=0&pubtime_end_s=0&from_source=&from_spmid=333.337&platform=pc&highlight=1&single_column=0&keyword=%E7%BE%8E%E5%A5%B3&qv_id=QehIgKdiTY2KgvqqnTjTfbYckXcjFoTV&source_tag=3&gaia_vtoken=&dynamic_offset=60&page_exp={}&web_location=1430654&w_rid=f91a38b413568f6bc4a4e0b8ff15e7db&wts=1742910656'
headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Cookie':'enable_web_push=DISABLE; home_feed_column=5; buvid4=2F2F1FC6-AE14-CF7F-7CF3-425515B18EF622305-024012513-KuAjrCymqmtDl%2B5%2FNQ6gnrcFKR4gha70N0aOFLMu%2FX1xgNZt3%2FtUAksbHl0rnEoy; buvid_fp_plain=undefined; DedeUserID=3546595865922130; DedeUserID__ckMd5=6b39161cf69a881e; header_theme_version=CLOSE; PVID=1; FEED_LIVE_VERSION=V_WATCHLATER_PIP_WINDOW; fingerprint=1c8330f447bd32d12195fb59de97021c; buvid_fp=1c8330f447bd32d12195fb59de97021c; is-2022-channel=1; buvid3=D4B0B514-CC6C-697C-220C-C0C7FB74733552900infoc; b_nut=1739930852; _uuid=6A41A449-2699-E58E-3102A-B58A95104CE6C88973infoc; b_lsid=1422D5CA_195CD8C67E8; bsource=search_baidu; enable_feed_channel=ENABLE; browser_resolution=1506-681; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDMxNjk0ODAsImlhdCI6MTc0MjkxMDIyMCwicGx0IjotMX0.N0TFxu8BctApLAcBj723Um_lOx_N1rIFyFwDM_1EEJc; bili_ticket_expires=1743169420; SESSDATA=4ac27671%2C1758462283%2Ce4a0b%2A31CjD0w3haAh1JelWEtSr1aMIyACvLurMXZwxpD6-0b8Ppy2yhB3LvNUTdVPmwFlMu4hwSVnBVMFRvV3ZwQl9WYmUxOTQtb3I3M2NWeVo5UnBFOXl1VENEZ0dqQWxKNWN0OFRJckJqNGFWM3hNNzdycEQxbko3Q2t2cGJBNGhzVmtNT3N0ZVZFQTZ3IIEC; bili_jct=d30e48c3836a6ff1c9c0413c3bfffe20; sid=86o7u6h6; rpdid=0zbfVGhzmq|JTzLstfW|XK0|3w1TX4AA; CURRENT_FNVAL=2000'
}

def save_csv_video_info(api_url):
    field_names =['title','author']

    with open('bliblibli_video_info.csv','w',newline='',encoding='utf-8') as f:
        f_csv = csv.DictWriter(f,field_names)
        f_csv.writeheader()

        for page in range(1,29):
            response = requests.get(api_url.format(page),headers=headers).json()
            for temp in response['data']['result']:
                item = dict()
                item['title']= temp['title']
                item['author']=temp['author']
                print(item)
                f_csv.writerow(item)

save_csv_video_info(url)