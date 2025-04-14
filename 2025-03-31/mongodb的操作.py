import pymongo

mongo_client = pymongo.MongoClient('mongodb://localhost:27017')

collection = mongo_client['py_spider']['stu_info']

stu_1  = {'name':'安娜2','age':18,'gender':'女'}

res = collection.insert_one(stu_1)
mongo_client.close()
print(res)