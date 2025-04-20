import csv

with open('stu_info_1.csv',encoding="utf-8") as f:
    f_csv = csv.reader(f)
    for row in f_csv:
        print(row)

with open('stu_info_2.csv',encoding="utf-8") as f:
    f_csv = csv.DictReader(f)
    for row in f_csv:
        print(row)