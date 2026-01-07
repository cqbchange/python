
var crypto_js = require('crypto-js')

function get_md5(text) {
    return crypto_js.MD5(text).toString();
}

function get_params() {
    var t = Date.now().toString();
    var code = get_md5(t + "9527" + t.substr(0, 6))
    return {
        time: t,
        code: code
    }
}
