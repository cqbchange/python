import csv

rows = [
    {
        "class_name":"18级Python",
        "name":"小王",
        "gender":'男',
        "phone":'13146060xx1',
        "qq":'123456xx1',
    }
]
headers = list(rows[0].keys())
with open('stu_info_2.csv','w',newline='',encoding='utf-8') as f:
    f_csv = csv.DictWriter(f,headers)
    f_csv.writeheader()
    f_csv.writerows(rows)