from jsonpath import jsonpath

info ={
    "name":'23',
    list:[
        {
            'name':'fs'
        },
        {
            'name': 'fs'
        },
        {
            'name': 'fs'
        }
    ]
}
res_list = jsonpath(info,"$..name")
print(res_list)