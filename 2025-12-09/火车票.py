import requests

headers = {
    "Accept": "*/*",
    "Accept-Language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "If-Modified-Since": "0",
    "Pragma": "no-cache",
    "Referer": "https://kyfw.12306.cn/otn/leftTicket/init?linktypeid=dc&fs=%E5%8C%97%E4%BA%AC,BJP&ts=%E4%B8%8A%E6%B5%B7,SHH&date=2025-12-16&flag=N,N,Y",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
cookies = {
    "_uab_collina": "176585154356280232728316",
    "JSESSIONID": "9BC5290EF9C2EC2D5468857E7BE38526",
    "BIGipServerotn": "1540948234.64545.0000",
    "BIGipServerpassport": "937951498.50215.0000",
    "guidesStatus": "off",
    "highContrastMode": "defaltMode",
    "cursorStatus": "off",
    "route": "9036359bb8a8a461c164a04f8f50b252",
    "_jc_save_fromStation": "%u5317%u4EAC%2CBJP",
    "_jc_save_toStation": "%u4E0A%u6D77%2CSHH",
    "_jc_save_toDate": "2025-12-16",
    "_jc_save_wfdc_flag": "dc",
    "_jc_save_fromDate": "2025-12-18"
}
url = "https://kyfw.12306.cn/otn/leftTicket/queryG"
params = {
    "leftTicketDTO.train_date": "2025-12-18",
    "leftTicketDTO.from_station": "BJP",
    "leftTicketDTO.to_station": "SHH",
    "purpose_codes": "ADULT"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

# print(response.json()['data']['result'])
response = response.json()['data']['result']
db = []
de = {
    "SHH": "上海",
    "FTP": "北京丰台",
    "IMH": "上海松江",
    "VNP": "北京南",
    "BJP": "北京",
    "AOH": "上海虹桥",
    "SNH": "上海南"
}
for item in response:
    c9 = item.split("|")
    df = {}
    df['secretStr'] = c9[0]
    df['buttonTextInfo'] = c9[1]
    dd = {}
    dd['train_no'] = c9[2]
    dd['station_train_code'] = c9[3]
    dd['start_station_telecode'] = c9[4]
    dd['end_station_telecode'] = c9[5]
    dd['from_station_telecode'] = c9[6]
    dd['to_station_telecode'] = c9[7]
    dd['start_time'] = c9[8]
    dd['arrive_time'] = c9[9]
    dd['lishi'] = c9[10]
    dd['canWebBuy'] = c9[11]
    dd['yp_info'] = c9[12]
    dd['start_train_date'] = c9[13]
    dd['train_seat_feature'] = c9[14]
    dd['location_code'] = c9[15]
    dd['from_station_no'] = c9[16]
    dd['to_station_no'] = c9[17]
    dd['is_support_card'] = c9[18]
    dd['controlled_train_flag'] = c9[19]
    dd['gg_num'] = c9[20] if c9[20] else "--"
    dd['gr_num'] = c9[21] if c9[21] else "--"
    dd['qt_num'] = c9[22] if c9[22] else "--"
    dd['rw_num'] = c9[23] if c9[23] else "--"
    dd['rz_num'] = c9[24] if c9[24] else "--"
    dd['tz_num'] = c9[25] if c9[25] else "--"
    dd['wz_num'] = c9[26] if c9[26] else "--"
    dd['yb_num'] = c9[27] if c9[27] else "--"
    dd['yw_num'] = c9[28] if c9[28] else "--"
    dd['yz_num'] = c9[29] if c9[29] else "--"
    dd['ze_num'] = c9[30] if c9[30] else "--"
    dd['zy_num'] = c9[31] if c9[31] else "--"
    dd['swz_num'] = c9[32] if c9[32] else "--"
    dd['srrb_num'] = c9[33] if c9[33] else "--"
    dd['yp_ex'] = c9[34]
    dd['seat_types'] = c9[35]
    dd['exchange_train_flag'] = c9[36]
    dd['houbu_train_flag'] = c9[37]
    dd['houbu_seat_limit'] = c9[38]
    dd['yp_info_new'] = c9[39]
    dd['dw_flag'] = c9[46]
    dd['stopcheckTime'] = c9[48]
    dd['country_flag'] = c9[49]
    dd['local_arrive_time'] = c9[50]
    dd['local_start_time'] = c9[51]
    dd['bed_level_info'] = c9[53]
    dd['seat_discount_info'] = c9[54]
    dd['sale_time'] = c9[55]
    dd['from_station_name'] = de[c9[6]]
    dd['to_station_name'] = de[c9[7]]
    df['queryLeftNewDTO'] = dd
    db.append(df)
print(db[0])