
var crypto = require('crypto-js')
const GF = "zxcvbnmlkjhgfdsaqwertyuiop0987654321QWERTYUIOPLKJHGFDSAZXCVBNM"
  , kre = GF + "-@#$%^&*+!";
function an(e=[]) {
    return e.map(t => kre[t]).join("")
}
function Ore(e) {
    return [...Array(e)].map( () => GF[xre(0, 61)]).join("")
}
function xre(e, t) {
    switch (arguments.length) {
    case 1:
        return parseInt(Math.random() * e + 1, 10);
    case 2:
        return parseInt(Math.random() * (t - e + 1) + e, 10);
    default:
        return 0
    }
}
function D1(e={}) {
    const {p: t, t: n, n: u, k: o} = e
      , r = qF(t);
    return sha256(u + o + decodeURIComponent(r) + n)
}


// 生成 SHA-256 哈希值
function sha256(message) {
    // 确保 message 是字符串
    if (typeof message !== "string") {
        message = JSON.stringify(message);
    }
    return crypto.SHA256(message).toString(crypto.enc.Hex);

}
function qF(e) {
    let t = "";
    return typeof e == "object" ? t = Object.keys(e).map(n => `${n}=${e[n]}`).sort().join("&") : typeof e == "string" && (t = e.split("&").sort().join("&")),
    t
}
function Qq(obj) {
  // 创建一个数组来存储键值对
  const parts = [];

  // 遍历对象的每个属性
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 对键和值进行URL编码，然后拼接成"key=value"形式
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(obj[key]);
      parts.push(`${encodedKey}=${encodedValue}`);
    }
  }

  // 将所有键值对用&连接起来
  return parts.join('&');
}
a = Date.now()
l = Ore(16)
c = an([8, 28, 20, 42, 21, 53, 65, 6])
data={
    "type": "trading-type",
    "openConvert": false,
    "keyword": "",
    "siteCode": "44",
    "secondType": "A",
    "tradingProcess": "",
    "thirdType": "[]",
    "projectType": "",
    "publishStartTime": "",
    "publishEndTime": "",
    "pageNo": 2,
    "pageSize": 10
}
const p = D1({
    p: Qq(data, {
        allowDots: !0
    }),
    t: a,
    n: l,
    k: c
})
d = {
   [an([56, 62, 52, 11, 23, 62, 39, 18, 16, 62, 54, 25, 25])]: an([11, 11, 0, 21, 62, 25, 24, 19, 20, 15, 7]),
   [an([56, 62, 52, 11, 23, 62, 39, 18, 16, 62, 60, 24, 5, 2, 18])]: l,
   [an([56, 62, 52, 11, 23, 62, 39, 18, 16, 62, 40, 23, 6, 18, 14, 20, 15, 6, 25])]: a,
   [an([56, 62, 52, 11, 23, 62, 39, 18, 16, 62, 53, 23, 11, 5, 15, 20, 22, 19, 18])]:p
};
XDgiReqSignature=''
c = an([8, 28, 20, 42, 21, 53, 65, 6])
console.log(d)