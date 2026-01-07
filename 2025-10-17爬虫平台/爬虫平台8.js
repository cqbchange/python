CryptoJS = require("crypto-js")
function get_token(){
    const btoa = (str) => Buffer.from(str).toString('base64');
    let f = new Date().getTime();
    let tt = btoa(f.toString())
    let n="9527"+f
    let m = CryptoJS['HmacSHA1'](n, "xxxooo")['toString']();
    return {tt,m}
}
// console.log(get_token())