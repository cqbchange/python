
import requests
from tqdm import tqdm


#显示下载进度条

def download_video(url,save_path):
    response = requests.get(url,stream=True)

    total_size = int(response.headers.get('content-length', 0))

    downloaded_size = 0
    with open(save_path,'wb') as f,tqdm(total=total_size,unit='B',unit_scale=True,unit_divisor=1024) as bar:
        """
            total :文件最大长度
            unit:定义下载单位
            unit_scale:'自动调整单位
            unit_divisor:单位换算
        """
        for chunk in response.iter_content(chunk_size=1024):
            if chunk:
                f.write(chunk)
                downloaded_size+=len(chunk)
                bar.update(len(chunk))
    print('下载完成')

video_url='https://v26-web-prime.douyinvod.com/video/tos/cn/tos-cn-vd-0026/og1AJttnAuvBjvaP7f8CBEKF7IAeiALkAPA8eG/media-video-hvc1/?a=6383&ch=0&cr=8&dr=0&er=1&lr=default&cd=0%7C0%7C0%7C3&cv=1&br=564&bt=564&cs=4&ds=3&mime_type=video_mp4&qs=15&rc=NjtnNWk6M2c0NWYzZDY3OkBpamVkcnU5cnZreTMzNGkzM0AvLTZjNC81NTYxXzY2LjVgYSNjL2ZxMmRzb3BgLS1kLWFzcw%3D%3D&btag=80000e00030000&cquery=101x_100o&dy_q=1744894659&expire=1744981514&l=20250417205739E7FD89EE51E7A01873AE&ply_type=4&policy=4&signature=6de11514d3985bb91cde9179ec128613&tk=web'
path='./douyin.mp4'
download_video(video_url,path)

