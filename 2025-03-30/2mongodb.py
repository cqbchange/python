import pymongo

mongo_client = pymongo.MongoClient()
collection = mongo_client['py_spider']['stu_info']

stu_1 = {'name':"安娜","age":"18","gender":"女"}

res = collection.insert_one(stu_1)