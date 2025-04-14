import redis
from requests import delete

redis_client = redis.Redis()
keys = redis_client.keys()
print(keys)
# redis_client.delete("car:filter")