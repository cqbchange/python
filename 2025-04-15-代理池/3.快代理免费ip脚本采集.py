import re
import json
import requests

class FreeAgent:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        }
    def get_ip(self,page):
        url = f'https://www.kuaidaili.com/free/inha/{page}'
        response = requests.get(url=url,headers=self.headers).text
        data = re.findall(r'const fpsList = (.*?);',response)[0]
        ip_pattern = r'"ip": "(\d{1,3}(?:\.\d{1,3}){3})"'
        port_pattern = r'"port": "(\d{1,5})"'
        ips = re.findall(ip_pattern,data)
        ports = re.findall(port_pattern,data)
        for temp in zip(ips,ports):
            ip_dict = dict()
            ip_dict['ip'] = temp[0]
            ip_dict['port'] = temp[1]
            yield ip_dict
    def test_ip(self,max_page_num):
        for page in range(1,max_page_num+1):
            for temp in self.get_ip(page):
                proxy = {
                    'http': f'http://{temp["ip"]}:{temp["port"]}',
                    'https': f'https://{temp["ip"]}:{temp["port"]}'
                }
                try:
                    response = requests.get(url='http://httpbin.org/ip',headers=self.headers,proxies=proxy,timeout=3)
                    if response.status_code == 200:
                        print(response.text)
                        with open('success_ip.text','a',encoding='utf-8') as f:
                            f.write(json.dumps(temp,ensure_ascii=False,indent=4)+'\n')
                except Exception as e:
                    print('请求超时',e)
if __name__ == '__main__':
    free_agent = FreeAgent()
    free_agent.test_ip(10)