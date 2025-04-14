# 1. yarn 无法使用

#### 报错  yarn: 无法加载文件 E:\Program Files\nodejs\yarn.ps1, 因为在此系统上禁止运行脚本
解决方法： win+x 打开 windows PowerShell (管理员)
输入get-ExecutionPolicy  显示 Restricted
set-ExecutionPolicy RemoteSigned <!--设置为打开-->
然后输入y 或a
在输入 get-ExecutionPolicy 显示RemoteSigned 
就可以使用yarn 

# 2.文本超出两行隐藏显示省略号

```css
overflow:hidden;
text-overflow:ellipsis;
disply:-webkit-box;//将作为弹性伸缩盒子模型显示
-webkit-box-orient:vertucal;//从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
-webkit-line-clamo:2;//这个属性不是css的规范属性，需要组合上面2个属性，表示显示的行数。

  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
```

# 3.居中

```css
display:flex;
justify-items:center;//横轴
align-items:center; //align-items 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式
```

# 4.Git Gui的基本用法

1.克隆项目鼠标右键点击文件名选择Git gui here

2.选择branch(分支)选择create创建分支和切换分支  选择name 是创建分支选择match Tracking Branch name 是切换分支

3.marge 合并 点击local merge 选择Tracking Branch 下边就是选择要合并的分支 Abort merge是终止分支合并![](C:\Users\Administrator\Desktop\QQ截图20211217103952.png)

git push doctor :8.60 删除远程分支

# 5.传值

传值 uni.$emit('fn',true)

接受uni.$on('fn',(res)=>{

console.log(res)

})

# 6.uniapp css定义变量

:style="{'--signboxtop': (signBox.top+10)+'px','--signboxleft': signBox.left,'--winheight':WINHEIGHT}"

在css中使用 var(--signboxtop)

# 7.uniapp中获取设备信息

```
my.getSystemInfo({
				success: (res) => {
					console.log(res);
					this.WINHEIGHT = (res.windowHeight - 255) / 2 + 'px'
					this.platform = res.platform
					this.NAV_HEIGHT = res.titleBarHeight + 'px'
				}
			})
//screenHeight是手机屏幕的高度（状态栏+导航栏+webview+tabBar），windowHeight是可使用窗口高度webview（不包含状态栏、导航栏和tabBar）的高度；

tips:如果在pages.json中页面设置了"navigationStyle":"custom",那么windowHeight的值是状态栏+导航栏+webview的和（不包含tabBar的高度）
```

# 8.获取元素大小位置

uni.createSelectorQuery().select('.draw-sign').boundingClientRect().exec((ret) => {
					console.log(ret);
					if (typeof(ret[0]) != 'undefined') {
						this.signBox = ret[0];
					}
				})

# 9.uniapp css中定义变量

:style="{'--signboxtop': (signBox.top+10)+'px','--signboxleft': signBox.left,'--winheight':WINHEIGHT}"
在css中使用 var(--signboxtop)

# 10.多个class存在{}[]

 :class="{'low_earnings':index==0,'height_earnings':index==1,'select_earnings':earnings==(index+1)}"
:class="[earnings==(index+1)?'select_earnings':'',index==0?'low_earnings':'height_earnings']"

# 11.uniapp 规则后端返回span标签

```
<view v-for="(item,i) in content" :key="i" class="rule_public">
        <view class="">
	<rich-text :nodes="item" />
      </view>
</view>
res.data.data.text_rule.forEach((ii, kk) => {
       parse(ii, (err, htmlNodes) => {
	if (!err) {
	    this.content.push(htmlNodes)
	}
      })
})	
})
```

# 12.搭建react和vue

###### react项目的搭建

```
1.cnpm install -g create-react-app   全局安装创建react-app的module
2.create-react-app first-react-demo // 在workspct这个文件夹下创建fist-react-demo这个项目
```



###### vue项目的搭建

```bash
npm install -g @vue/cli-init//（2.X创建时需要）
npm install @vue/cli -g (3.X使用时需要)
vue create hello-world
```



# 13.微信小程序保存图片到本地

```
 save() {
    var _this = this
    //获取文件管理器对象
    const fs = wx.getFileSystemManager()
    //文件保存路径
    const Imgpath = wx.env.USER_DATA_PATH + '/qrcodeImg' + '.png'
    //_this.data.imgsrc   base64图片文件
    let imageSrc = _this.data.qrcode.replace(/^data:image\/\w+;base64,/, '')
    //写入本地文件
    fs.writeFile({
      filePath: Imgpath,
      data: imageSrc,
      encoding: 'base64',
      success(res) {
        //保存到手机相册
        wx.saveImageToPhotosAlbum({
          filePath: Imgpath,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            })
          },
          fail: function (err) {
            console.log(err)
          }
        })
      }
    })
  },
```

# 14.花生壳与向日葵

https://service.oray.com/

# 15.谷歌插件

   1.极简插件 [http://chrome.zzzmh.cn](https://link.zhihu.com/?target=http%3A//chrome.zzzmh.cn)

2. gugeapps [http://www.gugeapps.net](https://link.zhihu.com/?target=http%3A//www.gugeapps.net)

   3.扩展迷  [extfans.com](https://link.zhihu.com/?target=http%3A//extfans.com)

   4.我爱chrome插件网 [http://52crx.com](https://link.zhihu.com/?target=http%3A//52crx.com)

   5.Chrome插件网 [chromecj.com](https://link.zhihu.com/?target=http%3A//chromecj.com)

6. 插件网 [http://www.cnplugins.com](https://link.zhihu.com/?target=http%3A//www.cnplugins.com)

# 16.git生成公钥

```
$ git config --global user.name "name"
$ git config --global user.email "********@qq.com"
$ ssh-keygen -t rsa -b 4096 -C "********@qq.com"
cat ~/.ssh/id_rsa.pub
```

# 17.数组去重

```
const pre_imgs = arr.reduce((preVal, curVal)={   
      newobj[curVal.patientId]?'':newobj[curVal.patientId]=preVal.push(curVal)
      return preVal
}, [])

quconst arr1 = [{id:'1',name:'A'},{id:'2',name:'B'},{id:'3',name:'C'},{id:'4',name:'D'}];
const arr2 = [{id:'1',name:'A',state:'healthy'},{id:'3',name:'C',state:'healthy'}];
const filterByReference = (arr1, arr2) => {
   let res = [];
   res = arr1.filter(el => {
      return !arr2.find(element => {
         return element.id === el.id;
      });
   });
   return res;
}
console.log(filterByReference(arr1, arr2));
[ { id: '2', name: 'B' }, { id: '4', name: 'D' } ]
```

# 18.输入框只能输入小数点保留两位小数

```
 e.detail.value.match(/\d+(\.\d{0,2})?/) ?e.detail.value.match(/\d+(\.\d{0,2})?/)[0] : ''
```

# 19.英文数字换行

```
    word-wrap: break-word;
    white-space: normal;
    word-break: break-all;
```

# 20.数据归类

```
 0: {recoveryGuideId: 90, treatmentIds: "452,453", name: "z",…}
1: {recoveryGuideId: 92, treatmentIds: "459,460", name: "a", content: "1", type: "a"}
2: {recoveryGuideId: 93, treatmentIds: "459", name: "a", content: "2", type: "a"}
3: {recoveryGuideId: 94, treatmentIds: null, name: "a", content: "3", type: "a"}
4: {recoveryGuideId: 95, treatmentIds: "459,460", name: "x", content: "4", type: "x"}
5: {recoveryGuideId: 96, treatmentIds: "459,460", name: "w", content: "5", type: "w"}
 
 
 unique(data) {
    let map = {};
    let dest = [];
    for (var i = 0; i < data.length; i++) {
      var ai = data[i];
      if (!map[ai.type]) {
        dest.push({
          recoveryGuideId: ai.recoveryGuideId,
          type: ai.type,
          list: [ai]
        });
        map[ai.type] = ai;
      } else {
        for (var j = 0; j < dest.length; j++) {
          var dj = dest[j];
          if (dj.type == ai.type) {
            dj.list.push(ai);
            break;
          }
        }
      }
    }
    return dest
  },
  //[{recoveryGuideId: 90, type: "z", list: Array(1)},
  // {recoveryGuideId: 92, type: "a", list: Array(3)}]
  //
```

# 21.刷新带有参数的页面

  const pages = getCurrentPages()

  // 声明一个pages使用getCurrentPages方法

  const curPage = pages[pages.length - 1]

  // 声明一个当前页面

  curPage.onLoad(curPage.options) // 传入参数

# 22.微信小程序监听事件

```
/**

 \* 设置监听器 watch.js

 */

export function setWatcher(page) {

 let data = page.data;

 let watch = page.watch;

 Object.keys(watch).forEach(v => {

  let key = v.split('.'); // 将watch中的属性以'.'切分成数组

  let nowData = data; // 将data赋值给nowData

  for (let i = 0; i < key.length - 1; i++) { // 遍历key数组的元素，除了最后一个！

   nowData = nowData[key[i]]; // 将nowData指向它的key属性对象

  }

  let lastKey = key[key.length - 1];

  // 假设key==='my.name',此时nowData===data['my']===data.my,lastKey==='name'

  let watchFun = watch[v].handler || watch[v]; // 兼容带handler和不带handler的两种写法

  let deep = watch[v].deep; // 若未设置deep,则为undefine

  observe(nowData, lastKey, watchFun, deep, page); // 监听nowData对象的lastKey

 })

}

/**

 \* 监听属性 并执行监听函数

 */

function observe(obj, key, watchFun, deep, page) {

 var val = obj[key];

 // 判断deep是true 且 val不能为空 且 typeof val==='object'（数组内数值变化也需要深度监听）

 if (deep && val != null && typeof val === 'object') {

  Object.keys(val).forEach(childKey => { // 遍历val对象下的每一个key

   observe(val, childKey, watchFun, deep, page); // 递归调用监听函数

  })

 }

 let that = this;

 Object.defineProperty(obj, key, {

  configurable: true,

  enumerable: true,

  set: function (value) {

   watchFun.call(page, value, val); // value是新值，val是旧值

   val = value;

   if (deep) { // 若是深度监听,重新监听该对象，以便监听其属性。

​    observe(obj, key, watchFun, deep, page);

   }

  },

  get: function () {

   return val;

  }

 })

}

module.exports = {

 setWatcher: setWatcher

}



const watch = require("../../../utils/watch.js")


watch.setWatcher(this); // 设置监听器，建议在onLoad下调用

```

# 23.nvm 切换 node 不成功原因

1.在nvm文件夹下新建一个nodejs文件

2.删除原来的nodejs文件

3.环境变量 中 NVM_SYMLINK的值改为nvm中的nodejs文件

4.npm或yarn出现不是内部命令说明nvm下的node版本中没有npm或yarn

