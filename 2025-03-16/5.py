import json

dict_data={
    "name":"安娜"
}
str_data =json.dumps(dict_data,ensure_ascii=False)

print(type(str_data))
print(str_data)

print(type(json.loads(str_data)))
print(json.loads(str_data))
