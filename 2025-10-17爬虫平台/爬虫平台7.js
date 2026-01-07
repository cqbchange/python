CryptoJS = require("crypto-js")
window =global
function encryptMd5() {
    let ttt = new Date().getTime();
    let M = new Date().getTime()
    let token =CryptoJS.MD5("xialuo" + ttt).toString()
    return  hhh = {
        m: token,
        ts: ttt,
        x:window.encodeURIComponent(CryptoJS.SHA256(token+'xxoo'))
    }
}
function xxxxoooo(encryptedHex) {
    let kkkk = CryptoJS.enc.Utf8.parse("xxxxxxxxoooooooo");
    let iiii = CryptoJS.enc.Utf8.parse("0123456789ABCDEF");
    let enccc = CryptoJS.enc.Hex.parse(encryptedHex);
    let deccc = CryptoJS.AES["decr" + "ypt"]({ciphertext: enccc}, kkkk, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: iiii,
    });
    return deccc.toString(CryptoJS.enc.Utf8);
}
// CryptoJS.SHA256(encryptMd5().m+'xxoo')
// console.log(encryptMd5())