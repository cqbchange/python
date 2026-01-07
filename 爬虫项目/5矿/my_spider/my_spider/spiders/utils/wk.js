const CryptoJS = require('crypto-js')
const JSEncrypt = require("jsencrypt");
function m(A) {
    for (var e = 1; e < arguments.length; e++) {
        var t = null != arguments[e] ? arguments[e] : {};
        e % 2 ? v(Object(t), !0).forEach((function(e) {
            b(A, e, t[e])
        }
        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(t)) : v(Object(t)).forEach((function(e) {
            Object.defineProperty(A, e, Object.getOwnPropertyDescriptor(t, e))
        }
        ))
    }
    return A
}
function v(A, e) {
    var t = Object.keys(A);
    if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(A);
        e && (n = n.filter((function(e) {
            return Object.getOwnPropertyDescriptor(A, e).enumerable
        }
        ))),
        t.push.apply(t, n)
    }
    return t
}
function b(A, e, t) {
    return e in A ? Object.defineProperty(A, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : A[e] = t,
    A
}
function MD5(m) {
    return CryptoJS.MD5(m).toString()
}
function encryptLong(T,A) {
    var e = T.getKey()
      , t = (e.n.bitLength() + 7 >> 3) - 11;
    try {
        var n = ""
          , r = "";
        if (A.length > t)
            return n = A.match(/.{1,50}/g),
            n.forEach((function(A) {
                var t = e.encrypt(A);
                r += t
            }
            )),
            w(r);
        var a = e.encrypt(A)
          , s = w(a);
        return s
    } catch (i) {
        return i
    }
}
function w(A) {
            var e, t, n = "", r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = "=";
            for (e = 0; e + 3 <= A.length; e += 3)
                t = parseInt(A.substring(e, e + 3), 16),
                n += r.charAt(t >> 6) + r.charAt(63 & t);
            e + 1 == A.length ? (t = parseInt(A.substring(e, e + 1), 16),
            n += r.charAt(t << 2)) : e + 2 == A.length && (t = parseInt(A.substring(e, e + 2), 16),
            n += r.charAt(t >> 2) + r.charAt((3 & t) << 4));
            while ((3 & n.length) > 0)
                n += a;
            return n
        }
function encrypt_param(key, data){
    var t = new JSEncrypt()
     t.setPublicKey(key)
     var e={
       "bz": "01",
       "xxzy": "",
       "fbdw": "",
       "pageIndex": data
     }
    var a = m(m({}, e), {}, {
       sign: MD5(JSON.stringify(e)),
       timeStamp: +new Date
     })
     s = encryptLong(t,JSON.stringify(a))
    return s
}
// key='MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvA4yNbpL8GIDwowFmEja1W+9 p81KH/NPtmNgoV4xbBUEbFpxKNKGcrlZsMZT+oRyguDcwHUTUZnQOb7xFvDIL87g/vOmnGYJnsLGZQM59B6R8WwR6Y9w9spnxFHfxG5L0mrSCVHomtPwAjbb0tz+T1f04L8+wLOlhr8mM7yEL1QIDAQAB'
// console.log(encrypt_param(key, 1))