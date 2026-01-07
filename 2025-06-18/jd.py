import requests


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh,zh-CN;q=0.9,en;q=0.8,de;q=0.7",
    "origin": "https://union.jd.com",
    "priority": "u=1, i",
    "referer": "https://union.jd.com/",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "x-referer-page": "https://union.jd.com/proManager/index",
    "x-rp-client": "h5_1.0.0"
}
cookies = {
    "shshshfpa": "ef5cc7b9-d929-d4cc-eafe-801f99ec2421-1753233747",
    "shshshfpx": "ef5cc7b9-d929-d4cc-eafe-801f99ec2421-1753233747",
    "__jdu": "1753233746114290707361",
    "3AB9D23F7A4B3C9B": "ZYFVJZV3SAKGSOGFR6VPESSAPTKEVGTH6VC3FFUB4L7MSEW6LVP2RRVVHTRE4X2ICACY3JWYETTG2JMPGVLCAD73RI",
    "__jda": "209449046.1753233746114290707361.1753233746.1753236467.1757899993.3",
    "__jdc": "209449046",
    "__jdv": "209449046|direct|-|none|-|1757899993292",
    "shshshfpb": "BApXSyd8KSPxAqmmpK246eFg36WgiKpX7BhFiMGhp9xJ1Mu0CnY62",
    "__jdb": "209449046.4.1753233746114290707361|3.1757899993",
    "3AB9D23F7A4B3CSS": "jdd03ZYFVJZV3SAKGSOGFR6VPESSAPTKEVGTH6VC3FFUB4L7MSEW6LVP2RRVVHTRE4X2ICACY3JWYETTG2JMPGVLCAD73RIAAAAMZJMBFXPQAAAAADEVMAKVRM6YITAX",
    "sdtoken": "AAbEsBpEIOVjqTAKCQtvQu17kKQhCGfo1vTnxOFRxyk4nwSwBdWUMi_Uuxj8UbgTZR-6MsOpLLNE17UPmA-_skITHX5vyh54plpsRpyXEIVlI4WkxfNXONLmPKWN-zM"
}
url = "https://api.m.jd.com/api"
params = {
    "functionId": "unionSearchRecommend",
    "appid": "unionpc",
    "_": "1757900901441",
    "loginType": "3",
    "uuid": "1753233746114290707361",
    "x-api-eid-token": "jdd03ZYFVJZV3SAKGSOGFR6VPESSAPTKEVGTH6VC3FFUB4L7MSEW6LVP2RRVVHTRE4X2ICACY3JWYETTG2JMPGVLCAD73RIAAAAMYGU5NAVYAAAAADERQEX3UF7BC24X",
    "h5st": "20250915094823452;3mzw6iiighwqhq64;586ae;tk03wc4c01cad18nMtG1WZq2Kk5gHPvbJGsOLrXkOy-z_SatsMf_HRtzlM1pTmQSSSZ7EfZdaOetZGAt-CpgFplD-gB5;8f2c8de40a2ec864ca988256d88c32d2;5.2;1757900901452;gt6f-R_UwALFqArI48LHrF6D0U_ZB5_ZxI7ZBh-f1ZOVB5_ZzUrJ-hfZXx-ZuFuJ7IOJtR7JwJrUrVuUrdOV9YeTAIbUuVeTtRuVuN_ZB5_ZxIdG6YLIqYfZB5hW-dLUuV_UqZ_V8QOTpdbU9cbU-geIwRuJxheToRuV_cbU-h-T-VKJroLJ_YfZB5hW-h_ZB5_ZtN6J-hfZXx-Zxp-VzN_ECMbG4IrKsB7ZB5_ZrYfZB5hW-1tNuZuI3w9UuZfZnZPGyQ7GAY6ZBh-f1Z-VupLHKYfZnZ-IxYfZB5hWkgfZXZ-IbYfZnZvVwN6J-hfZBh-f1ZeZnZPVwN6J-hfZBh-f1ROVB5_ZxdOE-YfZBhfZXxfT0h-T-ZOVsY7ZBhfZB5hW-dLTHgqP9c6VVgMTwI6ZB5_Z0kbIzc7F-hfZBh-f1heZnZfTsY7ZBhfZB5hWxh-T-FOE-YfZBhfZXxPUwh-T-JOE-YfZBhfZXxfVB5_ZsN6J-hfZBh-f1heZnZfUsY7ZBhfZB5hWpdOVB5_ZuN6J-hfZBh-f1ZPUzd_WxZfZnZPVsY7ZBhfZB5hWxh-T-1rE-hfZBh-f1ZeZnZvF1YfZBhfZXxfVB5_Z1YfZBhfZXxfVB5_Z9E6ZBhfZB5xDB5_Z9oLItAKI-hfZXxPCmg-T-haF-hfZXx-ZtJeDB1eUrpLHKgvTxpfVwhfMTgvFqkbIz8rM-h-T-dLEuYfZB5xD;95b91627fda896d2e7058c140f66eca9;eVxh989Gy8bE_oLE7wPD9k7J1RLHxgKJ",
    "body": "{\"funName\":\"getSkuByMaterialId\",\"page\":{\"pageNo\":3,\"pageSize\":60},\"param\":{\"materialId\":13355,\"requestScene\":0,\"requestExtFields\":[\"shopInfo\",\"orientations\"]},\"clientPageId\":\"jingfen_pc\"}"
}

cookies = {
    "3AB9D23F7A4B3CSS": "jdd03ZYFVJZV3SAKGSOGFR6VPESSAPTKEVGTH6VC3FFUB4L7MSEW6LVP2RRVVHTRE4X2ICACY3JWYETTG2JMPGVLCAD73RIAAAAMZJMLNNDAAAAAACN4YMCE65T4XCQX",
    "shshshfpb": "BApXS700eSPxAqmmpK246eFg36WgiKpX7BhFiMGhp9xJ1Mu0CnY62",
    "sdtoken": "AAbEsBpEIOVjqTAKCQtvQu17ELsicNlYvOJZG6OvPHIu8ipBFDDZvxCdYqHKlrTZ_9H_04lhJMP8GpAK-1F_3WQ8_LSCv5L8j7YC8zX8H0pz3t64He_CrtjNGI372QnS3dqafBY"
}

params = {
    "_": "1757903054264",
    "x-api-eid-token": "jdd03ZYFVJZV3SAKGSOGFR6VPESSAPTKEVGTH6VC3FFUB4L7MSEW6LVP2RRVVHTRE4X2ICACY3JWYETTG2JMPGVLCAD73RIAAAAMZJMBFXPQAAAAADEVMAKVRM6YITAX",
    "h5st": "20250915102416273;3mzw6iiighwqhq64;586ae;tk03wc4c01cad18nMtG1WZq2Kk5gHPvbJGsOLrXkOy-z_SatsMf_HRtzlM1pTmQSSSZ7EfZdaOetZGAt-CpgFplD-gB5;a81c04f4995b8dc83c76d3bb6b1718cf;5.2;1757903054273;gt6f-R_UwALFqArI48LHrF6D0U_ZB5_ZxI7ZBh-f1ZOVB5_ZzUrJ-hfZXx-ZuFuJ7IOJtR7JwJrUrVuUrdOV9YeTAIbUuVeTtRuVuN_ZB5_ZxIdG6YLIqYfZB5hW-dLUuV_UqZ_V8QOTpdbU9cbU-geIwRuJxheToRuV_cbU-h-T-VKJroLJ_YfZB5hW-h_ZB5_ZtN6J-hfZXx-Zxp-VzN_ECMbG4IrKsB7ZB5_ZrYfZB5hW-prOqYOIpAcD_YfZnZPGyQ7GAY6ZBh-f1Z-VupLHKYfZnZ-IxYfZB5hWkgfZXZ-IbYfZnZvVwN6J-hfZBh-f1ZeZnZPVwN6J-hfZBh-f1ROVB5_ZxdOE-YfZBhfZXxfT0h-T-ZOVsY7ZBhfZB5hW-VrMxUbIJU8V-AKGvg_ZB5_Z0kbIzc7F-hfZBh-f1heZnZfTsY7ZBhfZB5hWxh-T-FOE-YfZBhfZXxfTwh-T-JOE-YfZBhfZXxfVB5_ZsN6J-hfZBh-f1heZnZfUsY7ZBhfZB5hWpdOVB5_ZuN6J-hfZBh-f1ZPUzd_WxZfZnZPVsY7ZBhfZB5hWxh-T-1rE-hfZBh-f1ZeZnZvF1YfZBhfZXxfVB5_Z1YfZBhfZXxfVB5_Z9E6ZBhfZB5xDB5_Z9oLItAKI-hfZXxPCmg-T-haF-hfZXx-ZtJeDB1eUrpLHKgvTxpfVwhfMTgvFqkbIz8rM-h-T-dLEuYfZB5xD;bc8695d3b08194acd75b749ab0ccaf16;eVxh989Gy8bE_oLE7wPD9k7J1RLHxgKJ",
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)