import csv

heades = ['班级','姓名','性别','手机号','qq']

rows = [
    [
        '18级Python','小王','男','000001','123456'
    ],
[
        '18级Python','小王','男','000001','123456'
    ],
[
        '18级Python','小王','男','000001','123456'
    ],
[
        '18级Python','小王','男','000001','123456'
    ]
]

with open('stu_info_1.csv','w',encoding='utf-8') as f:
    f_csv = csv.writer(f)
    f_csv.writerow(heades)
    f_csv.writerows(rows)