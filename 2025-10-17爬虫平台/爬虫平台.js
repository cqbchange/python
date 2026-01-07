CryptoJS = require("crypto-js")
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要加1
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}
function decrypt(b, c) {
    var iv = getTodayDate()
    if (c) {
        let res = CryptoJS.enc.Utf8.stringify(CryptoJS.TripleDES.decrypt(b, CryptoJS.enc.Utf8.parse(c), {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })).toString()
        return res
    }
    return ""
}
// b='c8R1dJM32/vaBZqfCWXpYNyyxXVyeXW2XcJMctGfXG/OhpEOkqe65Dkk6n0QRpO+03bYMSlBLDl810k/wlG0YXbyyp1pqu6fTA0IxEPaWANVtj82R5XPhmaHi+7iFFK+fZWJQ4YchVEPfti/btu1gBLao8EZGOOjSfhoOCNwvggRgVL9qUS5hdiGoNDicDAKMPCoMjyYsNBdTe6qVlxm2eMzTwChfDKdTo5bX1WiQNfVb34asZkc2BEzYUK64Yxg14kQMuRubTx0rrCu5HJoILHHOfEO8nmS2bKvdGC687nZBCnFUFrgr5Y8w+cKBP+UQBqSqyJt0o3GwSt7toKeriCkRZ6zhXyh6171xSHzxLJWCLvoc7LDvGbBP17sUUu3TyCx3dBQvnFfNe3hU3w1ysWN90Vl+lVb3ciTDH6GUoavdEKbdUAxumI2VI5/av7fiBBwo6KdjNndXbgK9X7SOL5JMkJ2GL8SaMsqpOeFAlWO602QGVZzqhcwAQucU9lr8FVPpr7TP3VQrlM1ElXW6r43ffWST/RlxHMrwYRpcICkfH/hLEHDzWA2CHPvfJGWCAXADAtEw8zpPUPnwFNFNxMY3zyAAFYN2JXJ1I9KnH2Ra7YVZ/x6hMrrnH+pwPHDK+5wKKG+ZAq6QlHABeGJ7kUgjGq66g1P+04nrfbLXQgwdTNhqkF/TrrpOr7gbd79JdbrrHiMk0GMg0HiGzm1mrtpT6JRHRE5JbMHr2X7c3fa59fm8QaxUMniB05rlTPI7QlNounXkl4='
// c='ECQHhkhmhNxN3kg0HhRLOKkH'
// console.log(decrypt(b,c))

function md5(pageNumber){
    const timestamp = new Date().getTime()
    // window.token = window.md5("tuling" + timestamp + pageNumber)
    let text = "tuling" + timestamp + pageNumber
    console.log(text)
    return {sign:CryptoJS.MD5(text).toString(),timestamp:timestamp}
}
// console.log(md5(7))


function encrypt5(pageNumber) {
    const timestamp = new Date().getTime();
    const params = {
        page: pageNumber,
        _ts: timestamp,
    };
    const jsonString = JSON.stringify(params);

    let key = CryptoJS.enc.Utf8.parse('jo8j9wGw%6HbxfFn')
    let _0x2703a2 = CryptoJS.enc.Utf8.parse(jsonString),
        _0x50fcf0 = CryptoJS.AES.encrypt(_0x2703a2, key, {
            'mode': CryptoJS.mode.CBC,
            'padding':  CryptoJS.pad.Pkcs7,
            'iv': CryptoJS.enc.Utf8.parse('0123456789ABCDEF')
        });
    return _0x50fcf0['ciphertext']['toString'](CryptoJS['enc']['Hex']);
}
// console.log(encrypt5(1))
function encryptMd5() {
    let ttt = new Date().getTime();
    let token =CryptoJS.MD5("sssssbbbbb" + ttt).toString()
    return  hhh = {
        s: token,
        tt: ttt,
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
// console.log(encryptMd5())