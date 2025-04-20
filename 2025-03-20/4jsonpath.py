from jsonpath import jsonpath


info={
    "store":{
        "book":[
            {
                "category": "reference",
                "author":"Nigel Rees",
                "title":"Sayings of the Century",
                "price":8.95
            },
            {
                "category":"fiction",
                "author":"Evelyn Waugh",
                "title":"Sword of Honour",
                "price":12.99
            },
            {
                "category": "fiction",
                "author":"Herman Melville",
                "title": "Moby Dick",
                "isbn": "0 553 21311-3",
                "price":8.99
            },
            {
                "category":"fiction",
                "author":"J.. R. Tolkien",
                "title":"The Lord of the Rings",
                "isbn":"0-395-19395-8",
                "price":22.99
            }
        ],
        "bicycle":{
            'title':'自行车',
            "color": "red",
            "price": 19.95
        }
    }
}


res = jsonpath(info,'$.store.book[0].title')
print(res)
res = jsonpath(info,"$['store']['book][0]['title]")
print(res)
res = jsonpath(info,'$.store.book[1,2,3].title')
print(res)
res = jsonpath(info, "$..book[1:].title")
print(res)
res = jsonpath(info,'$..book[1:4].title')
print(res)
res  = jsonpath(info,'$.store.book[0,2].title')
print(res)
res = jsonpath(info,'$..book[::2].title')
print(res)
res = jsonpath(info,'$..book[(@.length-1)].title')
print(res)
res = jsonpath(info,'$..book[-1:].title')

print(res)
res = jsonpath(info,'$..book[?(@.price<10)].title')
print(res)

res = jsonpath(info,'$..book[?(@.price<=20)].title')
print(res)
res = jsonpath(info,'$..*[?(@.price<=20)].title')
print(res)
res = jsonpath(info,'$..author')
print(res)
res = jsonpath(info,'$.store.book[::].author')
print(res)
res = jsonpath(info,'$.store.book[*].author')
print(res)
res = jsonpath(info,'$..book..author')
print(res)
res = jsonpath(info,'$.store')
print(res)
res = jsonpath(info,'$..price')
print(res)
res = jsonpath(info,'$.store..price')
print(res)

res = jsonpath(info,'$..book[?(@.isbn)].title')
print(res)

res = jsonpath(info,'$..book[?(!@.isbn)].title')
print(res)

res = jsonpath(info,'$..book[?(@.price>=5 && @.price<=10)].title')
print(res)

res = jsonpath(info,'$..book[?(@.price<5 || @.price>10)].title')
print(res)

res = jsonpath(info,'$..color')
print(res)

res = jsonpath(info,'$.*')
print(res)