CryptoJS = require("crypto-js")
navigator = {}
navigator.appName = "Netscape";
window = global


// 在导入jsencrypt之前需要先判断self是否为 undefined, 原因是 jsencrypt 是运行在浏览器中的
if (typeof self === 'undefined') {
    global.self = window;
}
JSEncrypt = require('jsencrypt')
!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.JSEncrypt = {})
}(this, function(t) {
    "use strict";
    var e = "0123456789abcdefghijklmnopqrstuvwxyz";
    function a(t) {
        return e.charAt(t)
    }
    function i(t, e) {
        return t & e
    }
    function u(t, e) {
        return t | e
    }
    function r(t, e) {
        return t ^ e
    }
    function n(t, e) {
        return t & ~e
    }
    function s(t) {
        if (0 == t)
            return -1;
        var e = 0;
        return 0 == (65535 & t) && (t >>= 16,
        e += 16),
        0 == (255 & t) && (t >>= 8,
        e += 8),
        0 == (15 & t) && (t >>= 4,
        e += 4),
        0 == (3 & t) && (t >>= 2,
        e += 2),
        0 == (1 & t) && ++e,
        e
    }
    function o(t) {
        for (var e = 0; 0 != t; )
            t &= t - 1,
            ++e;
        return e
    }
    var h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    function c(t) {
        var e, i, r = "";
        for (e = 0; e + 3 <= t.length; e += 3)
            i = parseInt(t.substring(e, e + 3), 16),
            r += h.charAt(i >> 6) + h.charAt(63 & i);
        for (e + 1 == t.length ? (i = parseInt(t.substring(e, e + 1), 16),
        r += h.charAt(i << 2)) : e + 2 == t.length && (i = parseInt(t.substring(e, e + 2), 16),
        r += h.charAt(i >> 2) + h.charAt((3 & i) << 4)); 0 < (3 & r.length); )
            r += "=";
        return r
    }
    function f(t) {
        var e, i = "", r = 0, n = 0;
        for (e = 0; e < t.length && "=" != t.charAt(e); ++e) {
            var s = h.indexOf(t.charAt(e));
            s < 0 || (0 == r ? (i += a(s >> 2),
            n = 3 & s,
            r = 1) : 1 == r ? (i += a(n << 2 | s >> 4),
            n = 15 & s,
            r = 2) : 2 == r ? (i += a(n),
            i += a(s >> 2),
            n = 3 & s,
            r = 3) : (i += a(n << 2 | s >> 4),
            i += a(15 & s),
            r = 0))
        }
        return 1 == r && (i += a(n << 2)),
        i
    }
    var l, p = function(t, e) {
        return (p = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var i in e)
                e.hasOwnProperty(i) && (t[i] = e[i])
        }
        )(t, e)
    };
    var g, d = function(t) {
        var e;
        if (void 0 === l) {
            var i = "0123456789ABCDEF"
              , r = " \f\n\r\t聽\u2028\u2029";
            for (l = {},
            e = 0; e < 16; ++e)
                l[i.charAt(e)] = e;
            for (i = i.toLowerCase(),
            e = 10; e < 16; ++e)
                l[i.charAt(e)] = e;
            for (e = 0; e < r.length; ++e)
                l[r.charAt(e)] = -1
        }
        var n = []
          , s = 0
          , o = 0;
        for (e = 0; e < t.length; ++e) {
            var h = t.charAt(e);
            if ("=" == h)
                break;
            if (-1 != (h = l[h])) {
                if (void 0 === h)
                    throw new Error("Illegal character at offset " + e);
                s |= h,
                2 <= ++o ? (n[n.length] = s,
                o = s = 0) : s <<= 4
            }
        }
        if (o)
            throw new Error("Hex encoding incomplete: 4 bits missing");
        return n
    }, v = {
        decode: function(t) {
            var e;
            if (void 0 === g) {
                var i = "= \f\n\r\t聽\u2028\u2029";
                for (g = Object.create(null),
                e = 0; e < 64; ++e)
                    g["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)] = e;
                for (e = 0; e < i.length; ++e)
                    g[i.charAt(e)] = -1
            }
            var r = []
              , n = 0
              , s = 0;
            for (e = 0; e < t.length; ++e) {
                var o = t.charAt(e);
                if ("=" == o)
                    break;
                if (-1 != (o = g[o])) {
                    if (void 0 === o)
                        throw new Error("Illegal character at offset " + e);
                    n |= o,
                    4 <= ++s ? (r[r.length] = n >> 16,
                    r[r.length] = n >> 8 & 255,
                    r[r.length] = 255 & n,
                    s = n = 0) : n <<= 6
                }
            }
            switch (s) {
            case 1:
                throw new Error("Base64 encoding incomplete: at least 2 bits missing");
            case 2:
                r[r.length] = n >> 10;
                break;
            case 3:
                r[r.length] = n >> 16,
                r[r.length] = n >> 8 & 255
            }
            return r
        },
        re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
        unarmor: function(t) {
            var e = v.re.exec(t);
            if (e)
                if (e[1])
                    t = e[1];
                else {
                    if (!e[2])
                        throw new Error("RegExp out of sync");
                    t = e[2]
                }
            return v.decode(t)
        }
    }, m = 1e13, y = function() {
        function t(t) {
            this.buf = [+t || 0]
        }
        return t.prototype.mulAdd = function(t, e) {
            var i, r, n = this.buf, s = n.length;
            for (i = 0; i < s; ++i)
                (r = n[i] * t + e) < m ? e = 0 : r -= (e = 0 | r / m) * m,
                n[i] = r;
            0 < e && (n[i] = e)
        }
        ,
        t.prototype.sub = function(t) {
            var e, i, r = this.buf, n = r.length;
            for (e = 0; e < n; ++e)
                (i = r[e] - t) < 0 ? (i += m,
                t = 1) : t = 0,
                r[e] = i;
            for (; 0 === r[r.length - 1]; )
                r.pop()
        }
        ,
        t.prototype.toString = function(t) {
            if (10 != (t || 10))
                throw new Error("only base 10 is supported");
            for (var e = this.buf, i = e[e.length - 1].toString(), r = e.length - 2; 0 <= r; --r)
                i += (m + e[r]).toString().substring(1);
            return i
        }
        ,
        t.prototype.valueOf = function() {
            for (var t = this.buf, e = 0, i = t.length - 1; 0 <= i; --i)
                e = e * m + t[i];
            return e
        }
        ,
        t.prototype.simplify = function() {
            var t = this.buf;
            return 1 == t.length ? t[0] : this
        }
        ,
        t
    }(), b = "鈥�", T = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, S = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
    function E(t, e) {
        return t.length > e && (t = t.substring(0, e) + b),
        t
    }
    var w, D = function() {
        function i(t, e) {
            this.hexDigits = "0123456789ABCDEF",
            t instanceof i ? (this.enc = t.enc,
            this.pos = t.pos) : (this.enc = t,
            this.pos = e)
        }
        return i.prototype.get = function(t) {
            if (void 0 === t && (t = this.pos++),
            t >= this.enc.length)
                throw new Error("Requesting byte offset " + t + " on a stream of length " + this.enc.length);
            return "string" == typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t]
        }
        ,
        i.prototype.hexByte = function(t) {
            return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
        }
        ,
        i.prototype.hexDump = function(t, e, i) {
            for (var r = "", n = t; n < e; ++n)
                if (r += this.hexByte(this.get(n)),
                !0 !== i)
                    switch (15 & n) {
                    case 7:
                        r += "  ";
                        break;
                    case 15:
                        r += "\n";
                        break;
                    default:
                        r += " "
                    }
            return r
        }
        ,
        i.prototype.isASCII = function(t, e) {
            for (var i = t; i < e; ++i) {
                var r = this.get(i);
                if (r < 32 || 176 < r)
                    return !1
            }
            return !0
        }
        ,
        i.prototype.parseStringISO = function(t, e) {
            for (var i = "", r = t; r < e; ++r)
                i += String.fromCharCode(this.get(r));
            return i
        }
        ,
        i.prototype.parseStringUTF = function(t, e) {
            for (var i = "", r = t; r < e; ) {
                var n = this.get(r++);
                i += n < 128 ? String.fromCharCode(n) : 191 < n && n < 224 ? String.fromCharCode((31 & n) << 6 | 63 & this.get(r++)) : String.fromCharCode((15 & n) << 12 | (63 & this.get(r++)) << 6 | 63 & this.get(r++))
            }
            return i
        }
        ,
        i.prototype.parseStringBMP = function(t, e) {
            for (var i, r, n = "", s = t; s < e; )
                i = this.get(s++),
                r = this.get(s++),
                n += String.fromCharCode(i << 8 | r);
            return n
        }
        ,
        i.prototype.parseTime = function(t, e, i) {
            var r = this.parseStringISO(t, e)
              , n = (i ? T : S).exec(r);
            return n ? (i && (n[1] = +n[1],
            n[1] += +n[1] < 70 ? 2e3 : 1900),
            r = n[1] + "-" + n[2] + "-" + n[3] + " " + n[4],
            n[5] && (r += ":" + n[5],
            n[6] && (r += ":" + n[6],
            n[7] && (r += "." + n[7]))),
            n[8] && (r += " UTC",
            "Z" != n[8] && (r += n[8],
            n[9] && (r += ":" + n[9]))),
            r) : "Unrecognized time: " + r
        }
        ,
        i.prototype.parseInteger = function(t, e) {
            for (var i, r = this.get(t), n = 127 < r, s = n ? 255 : 0, o = ""; r == s && ++t < e; )
                r = this.get(t);
            if (0 === (i = e - t))
                return n ? -1 : 0;
            if (4 < i) {
                for (o = r,
                i <<= 3; 0 == (128 & (+o ^ s)); )
                    o = +o << 1,
                    --i;
                o = "(" + i + " bit)\n"
            }
            n && (r -= 256);
            for (var h = new y(r), a = t + 1; a < e; ++a)
                h.mulAdd(256, this.get(a));
            return o + h.toString()
        }
        ,
        i.prototype.parseBitString = function(t, e, i) {
            for (var r = this.get(t), n = "(" + ((e - t - 1 << 3) - r) + " bit)\n", s = "", o = t + 1; o < e; ++o) {
                for (var h = this.get(o), a = o == e - 1 ? r : 0, u = 7; a <= u; --u)
                    s += h >> u & 1 ? "1" : "0";
                if (s.length > i)
                    return n + E(s, i)
            }
            return n + s
        }
        ,
        i.prototype.parseOctetString = function(t, e, i) {
            if (this.isASCII(t, e))
                return E(this.parseStringISO(t, e), i);
            var r = e - t
              , n = "(" + r + " byte)\n";
            (i /= 2) < r && (e = t + i);
            for (var s = t; s < e; ++s)
                n += this.hexByte(this.get(s));
            return i < r && (n += b),
            n
        }
        ,
        i.prototype.parseOID = function(t, e, i) {
            for (var r = "", n = new y, s = 0, o = t; o < e; ++o) {
                var h = this.get(o);
                if (n.mulAdd(128, 127 & h),
                s += 7,
                !(128 & h)) {
                    if ("" === r)
                        if ((n = n.simplify())instanceof y)
                            n.sub(80),
                            r = "2." + n.toString();
                        else {
                            var a = n < 80 ? n < 40 ? 0 : 1 : 2;
                            r = a + "." + (n - 40 * a)
                        }
                    else
                        r += "." + n.toString();
                    if (r.length > i)
                        return E(r, i);
                    n = new y,
                    s = 0
                }
            }
            return 0 < s && (r += ".incomplete"),
            r
        }
        ,
        i
    }(), x = function() {
        function c(t, e, i, r, n) {
            if (!(r instanceof R))
                throw new Error("Invalid tag value.");
            this.stream = t,
            this.header = e,
            this.length = i,
            this.tag = r,
            this.sub = n
        }
        return c.prototype.typeName = function() {
            switch (this.tag.tagClass) {
            case 0:
                switch (this.tag.tagNumber) {
                case 0:
                    return "EOC";
                case 1:
                    return "BOOLEAN";
                case 2:
                    return "INTEGER";
                case 3:
                    return "BIT_STRING";
                case 4:
                    return "OCTET_STRING";
                case 5:
                    return "NULL";
                case 6:
                    return "OBJECT_IDENTIFIER";
                case 7:
                    return "ObjectDescriptor";
                case 8:
                    return "EXTERNAL";
                case 9:
                    return "REAL";
                case 10:
                    return "ENUMERATED";
                case 11:
                    return "EMBEDDED_PDV";
                case 12:
                    return "UTF8String";
                case 16:
                    return "SEQUENCE";
                case 17:
                    return "SET";
                case 18:
                    return "NumericString";
                case 19:
                    return "PrintableString";
                case 20:
                    return "TeletexString";
                case 21:
                    return "VideotexString";
                case 22:
                    return "IA5String";
                case 23:
                    return "UTCTime";
                case 24:
                    return "GeneralizedTime";
                case 25:
                    return "GraphicString";
                case 26:
                    return "VisibleString";
                case 27:
                    return "GeneralString";
                case 28:
                    return "UniversalString";
                case 30:
                    return "BMPString"
                }
                return "Universal_" + this.tag.tagNumber.toString();
            case 1:
                return "Application_" + this.tag.tagNumber.toString();
            case 2:
                return "[" + this.tag.tagNumber.toString() + "]";
            case 3:
                return "Private_" + this.tag.tagNumber.toString()
            }
        }
        ,
        c.prototype.content = function(t) {
            if (void 0 === this.tag)
                return null;
            void 0 === t && (t = 1 / 0);
            var e = this.posContent()
              , i = Math.abs(this.length);
            if (!this.tag.isUniversal())
                return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + i, t);
            switch (this.tag.tagNumber) {
            case 1:
                return 0 === this.stream.get(e) ? "false" : "true";
            case 2:
                return this.stream.parseInteger(e, e + i);
            case 3:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e, e + i, t);
            case 4:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + i, t);
            case 6:
                return this.stream.parseOID(e, e + i, t);
            case 16:
            case 17:
                return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
            case 12:
                return E(this.stream.parseStringUTF(e, e + i), t);
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 26:
                return E(this.stream.parseStringISO(e, e + i), t);
            case 30:
                return E(this.stream.parseStringBMP(e, e + i), t);
            case 23:
            case 24:
                return this.stream.parseTime(e, e + i, 23 == this.tag.tagNumber)
            }
            return null
        }
        ,
        c.prototype.toString = function() {
            return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
        }
        ,
        c.prototype.toPrettyString = function(t) {
            void 0 === t && (t = "");
            var e = t + this.typeName() + " @" + this.stream.pos;
            if (0 <= this.length && (e += "+"),
            e += this.length,
            this.tag.tagConstructed ? e += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (e += " (encapsulates)"),
            e += "\n",
            null !== this.sub) {
                t += "  ";
                for (var i = 0, r = this.sub.length; i < r; ++i)
                    e += this.sub[i].toPrettyString(t)
            }
            return e
        }
        ,
        c.prototype.posStart = function() {
            return this.stream.pos
        }
        ,
        c.prototype.posContent = function() {
            return this.stream.pos + this.header
        }
        ,
        c.prototype.posEnd = function() {
            return this.stream.pos + this.header + Math.abs(this.length)
        }
        ,
        c.prototype.toHexString = function() {
            return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
        }
        ,
        c.decodeLength = function(t) {
            var e = t.get()
              , i = 127 & e;
            if (i == e)
                return i;
            if (6 < i)
                throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
            if (0 === i)
                return null;
            for (var r = e = 0; r < i; ++r)
                e = 256 * e + t.get();
            return e
        }
        ,
        c.prototype.getHexStringValue = function() {
            var t = this.toHexString()
              , e = 2 * this.header
              , i = 2 * this.length;
            return t.substr(e, i)
        }
        ,
        c.decode = function(t) {
            var r;
            r = t instanceof D ? t : new D(t,0);
            var e = new D(r)
              , i = new R(r)
              , n = c.decodeLength(r)
              , s = r.pos
              , o = s - e.pos
              , h = null
              , a = function() {
                var t = [];
                if (null !== n) {
                    for (var e = s + n; r.pos < e; )
                        t[t.length] = c.decode(r);
                    if (r.pos != e)
                        throw new Error("Content size is not correct for container starting at offset " + s)
                } else
                    try {
                        for (; ; ) {
                            var i = c.decode(r);
                            if (i.tag.isEOC())
                                break;
                            t[t.length] = i
                        }
                        n = s - r.pos
                    } catch (t) {
                        throw new Error("Exception while decoding undefined length content: " + t)
                    }
                return t
            };
            if (i.tagConstructed)
                h = a();
            else if (i.isUniversal() && (3 == i.tagNumber || 4 == i.tagNumber))
                try {
                    if (3 == i.tagNumber && 0 != r.get())
                        throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                    h = a();
                    for (var u = 0; u < h.length; ++u)
                        if (h[u].tag.isEOC())
                            throw new Error("EOC is not supposed to be actual content.")
                } catch (t) {
                    h = null
                }
            if (null === h) {
                if (null === n)
                    throw new Error("We can't skip over an invalid tag with undefined length at offset " + s);
                r.pos = s + Math.abs(n)
            }
            return new c(e,o,n,i,h)
        }
        ,
        c
    }(), R = function() {
        function t(t) {
            var e = t.get();
            if (this.tagClass = e >> 6,
            this.tagConstructed = 0 != (32 & e),
            this.tagNumber = 31 & e,
            31 == this.tagNumber) {
                for (var i = new y; e = t.get(),
                i.mulAdd(128, 127 & e),
                128 & e; )
                    ;
                this.tagNumber = i.simplify()
            }
        }
        return t.prototype.isUniversal = function() {
            return 0 === this.tagClass
        }
        ,
        t.prototype.isEOC = function() {
            return 0 === this.tagClass && 0 === this.tagNumber
        }
        ,
        t
    }(), B = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], A = (1 << 26) / B[B.length - 1], O = function() {
        function b(t, e, i) {
            null != t && ("number" == typeof t ? this.fromNumber(t, e, i) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
        }
        return b.prototype.toString = function(t) {
            if (this.s < 0)
                return "-" + this.negate().toString(t);
            var e;
            if (16 == t)
                e = 4;
            else if (8 == t)
                e = 3;
            else if (2 == t)
                e = 1;
            else if (32 == t)
                e = 5;
            else {
                if (4 != t)
                    return this.toRadix(t);
                e = 2
            }
            var i, r = (1 << e) - 1, n = !1, s = "", o = this.t, h = this.DB - o * this.DB % e;
            if (0 < o--)
                for (h < this.DB && 0 < (i = this[o] >> h) && (n = !0,
                s = a(i)); 0 <= o; )
                    h < e ? (i = (this[o] & (1 << h) - 1) << e - h,
                    i |= this[--o] >> (h += this.DB - e)) : (i = this[o] >> (h -= e) & r,
                    h <= 0 && (h += this.DB,
                    --o)),
                    0 < i && (n = !0),
                    n && (s += a(i));
            return n ? s : "0"
        }
        ,
        b.prototype.negate = function() {
            var t = M();
            return b.ZERO.subTo(this, t),
            t
        }
        ,
        b.prototype.abs = function() {
            return this.s < 0 ? this.negate() : this
        }
        ,
        b.prototype.compareTo = function(t) {
            var e = this.s - t.s;
            if (0 != e)
                return e;
            var i = this.t;
            if (0 != (e = i - t.t))
                return this.s < 0 ? -e : e;
            for (; 0 <= --i; )
                if (0 != (e = this[i] - t[i]))
                    return e;
            return 0
        }
        ,
        b.prototype.bitLength = function() {
            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + U(this[this.t - 1] ^ this.s & this.DM)
        }
        ,
        b.prototype.mod = function(t) {
            var e = M();
            return this.abs().divRemTo(t, null, e),
            this.s < 0 && 0 < e.compareTo(b.ZERO) && t.subTo(e, e),
            e
        }
        ,
        b.prototype.modPowInt = function(t, e) {
            var i;
            return i = t < 256 || e.isEven() ? new I(e) : new N(e),
            this.exp(t, i)
        }
        ,
        b.prototype.clone = function() {
            var t = M();
            return this.copyTo(t),
            t
        }
        ,
        b.prototype.intValue = function() {
            if (this.s < 0) {
                if (1 == this.t)
                    return this[0] - this.DV;
                if (0 == this.t)
                    return -1
            } else {
                if (1 == this.t)
                    return this[0];
                if (0 == this.t)
                    return 0
            }
            return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
        }
        ,
        b.prototype.byteValue = function() {
            return 0 == this.t ? this.s : this[0] << 24 >> 24
        }
        ,
        b.prototype.shortValue = function() {
            return 0 == this.t ? this.s : this[0] << 16 >> 16
        }
        ,
        b.prototype.signum = function() {
            return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
        }
        ,
        b.prototype.toByteArray = function() {
            var t = this.t
              , e = [];
            e[0] = this.s;
            var i, r = this.DB - t * this.DB % 8, n = 0;
            if (0 < t--)
                for (r < this.DB && (i = this[t] >> r) != (this.s & this.DM) >> r && (e[n++] = i | this.s << this.DB - r); 0 <= t; )
                    r < 8 ? (i = (this[t] & (1 << r) - 1) << 8 - r,
                    i |= this[--t] >> (r += this.DB - 8)) : (i = this[t] >> (r -= 8) & 255,
                    r <= 0 && (r += this.DB,
                    --t)),
                    0 != (128 & i) && (i |= -256),
                    0 == n && (128 & this.s) != (128 & i) && ++n,
                    (0 < n || i != this.s) && (e[n++] = i);
            return e
        }
        ,
        b.prototype.equals = function(t) {
            return 0 == this.compareTo(t)
        }
        ,
        b.prototype.min = function(t) {
            return this.compareTo(t) < 0 ? this : t
        }
        ,
        b.prototype.max = function(t) {
            return 0 < this.compareTo(t) ? this : t
        }
        ,
        b.prototype.and = function(t) {
            var e = M();
            return this.bitwiseTo(t, i, e),
            e
        }
        ,
        b.prototype.or = function(t) {
            var e = M();
            return this.bitwiseTo(t, u, e),
            e
        }
        ,
        b.prototype.xor = function(t) {
            var e = M();
            return this.bitwiseTo(t, r, e),
            e
        }
        ,
        b.prototype.andNot = function(t) {
            var e = M();
            return this.bitwiseTo(t, n, e),
            e
        }
        ,
        b.prototype.not = function() {
            for (var t = M(), e = 0; e < this.t; ++e)
                t[e] = this.DM & ~this[e];
            return t.t = this.t,
            t.s = ~this.s,
            t
        }
        ,
        b.prototype.shiftLeft = function(t) {
            var e = M();
            return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
            e
        }
        ,
        b.prototype.shiftRight = function(t) {
            var e = M();
            return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
            e
        }
        ,
        b.prototype.getLowestSetBit = function() {
            for (var t = 0; t < this.t; ++t)
                if (0 != this[t])
                    return t * this.DB + s(this[t]);
            return this.s < 0 ? this.t * this.DB : -1
        }
        ,
        b.prototype.bitCount = function() {
            for (var t = 0, e = this.s & this.DM, i = 0; i < this.t; ++i)
                t += o(this[i] ^ e);
            return t
        }
        ,
        b.prototype.testBit = function(t) {
            var e = Math.floor(t / this.DB);
            return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
        }
        ,
        b.prototype.setBit = function(t) {
            return this.changeBit(t, u)
        }
        ,
        b.prototype.clearBit = function(t) {
            return this.changeBit(t, n)
        }
        ,
        b.prototype.flipBit = function(t) {
            return this.changeBit(t, r)
        }
        ,
        b.prototype.add = function(t) {
            var e = M();
            return this.addTo(t, e),
            e
        }
        ,
        b.prototype.subtract = function(t) {
            var e = M();
            return this.subTo(t, e),
            e
        }
        ,
        b.prototype.multiply = function(t) {
            var e = M();
            return this.multiplyTo(t, e),
            e
        }
        ,
        b.prototype.divide = function(t) {
            var e = M();
            return this.divRemTo(t, e, null),
            e
        }
        ,
        b.prototype.remainder = function(t) {
            var e = M();
            return this.divRemTo(t, null, e),
            e
        }
        ,
        b.prototype.divideAndRemainder = function(t) {
            var e = M()
              , i = M();
            return this.divRemTo(t, e, i),
            [e, i]
        }
        ,
        b.prototype.modPow = function(t, e) {
            var i, r, n = t.bitLength(), s = F(1);
            if (n <= 0)
                return s;
            i = n < 18 ? 1 : n < 48 ? 3 : n < 144 ? 4 : n < 768 ? 5 : 6,
            r = n < 8 ? new I(e) : e.isEven() ? new P(e) : new N(e);
            var o = []
              , h = 3
              , a = i - 1
              , u = (1 << i) - 1;
            if (o[1] = r.convert(this),
            1 < i) {
                var c = M();
                for (r.sqrTo(o[1], c); h <= u; )
                    o[h] = M(),
                    r.mulTo(c, o[h - 2], o[h]),
                    h += 2
            }
            var f, l, p = t.t - 1, g = !0, d = M();
            for (n = U(t[p]) - 1; 0 <= p; ) {
                for (a <= n ? f = t[p] >> n - a & u : (f = (t[p] & (1 << n + 1) - 1) << a - n,
                0 < p && (f |= t[p - 1] >> this.DB + n - a)),
                h = i; 0 == (1 & f); )
                    f >>= 1,
                    --h;
                if ((n -= h) < 0 && (n += this.DB,
                --p),
                g)
                    o[f].copyTo(s),
                    g = !1;
                else {
                    for (; 1 < h; )
                        r.sqrTo(s, d),
                        r.sqrTo(d, s),
                        h -= 2;
                    0 < h ? r.sqrTo(s, d) : (l = s,
                    s = d,
                    d = l),
                    r.mulTo(d, o[f], s)
                }
                for (; 0 <= p && 0 == (t[p] & 1 << n); )
                    r.sqrTo(s, d),
                    l = s,
                    s = d,
                    d = l,
                    --n < 0 && (n = this.DB - 1,
                    --p)
            }
            return r.revert(s)
        }
        ,
        b.prototype.modInverse = function(t) {
            var e = t.isEven();
            if (this.isEven() && e || 0 == t.signum())
                return b.ZERO;
            for (var i = t.clone(), r = this.clone(), n = F(1), s = F(0), o = F(0), h = F(1); 0 != i.signum(); ) {
                for (; i.isEven(); )
                    i.rShiftTo(1, i),
                    e ? (n.isEven() && s.isEven() || (n.addTo(this, n),
                    s.subTo(t, s)),
                    n.rShiftTo(1, n)) : s.isEven() || s.subTo(t, s),
                    s.rShiftTo(1, s);
                for (; r.isEven(); )
                    r.rShiftTo(1, r),
                    e ? (o.isEven() && h.isEven() || (o.addTo(this, o),
                    h.subTo(t, h)),
                    o.rShiftTo(1, o)) : h.isEven() || h.subTo(t, h),
                    h.rShiftTo(1, h);
                0 <= i.compareTo(r) ? (i.subTo(r, i),
                e && n.subTo(o, n),
                s.subTo(h, s)) : (r.subTo(i, r),
                e && o.subTo(n, o),
                h.subTo(s, h))
            }
            return 0 != r.compareTo(b.ONE) ? b.ZERO : 0 <= h.compareTo(t) ? h.subtract(t) : h.signum() < 0 ? (h.addTo(t, h),
            h.signum() < 0 ? h.add(t) : h) : h
        }
        ,
        b.prototype.pow = function(t) {
            return this.exp(t, new V)
        }
        ,
        b.prototype.gcd = function(t) {
            var e = this.s < 0 ? this.negate() : this.clone()
              , i = t.s < 0 ? t.negate() : t.clone();
            if (e.compareTo(i) < 0) {
                var r = e;
                e = i,
                i = r
            }
            var n = e.getLowestSetBit()
              , s = i.getLowestSetBit();
            if (s < 0)
                return e;
            for (n < s && (s = n),
            0 < s && (e.rShiftTo(s, e),
            i.rShiftTo(s, i)); 0 < e.signum(); )
                0 < (n = e.getLowestSetBit()) && e.rShiftTo(n, e),
                0 < (n = i.getLowestSetBit()) && i.rShiftTo(n, i),
                0 <= e.compareTo(i) ? (e.subTo(i, e),
                e.rShiftTo(1, e)) : (i.subTo(e, i),
                i.rShiftTo(1, i));
            return 0 < s && i.lShiftTo(s, i),
            i
        }
        ,
        b.prototype.isProbablePrime = function(t) {
            var e, i = this.abs();
            if (1 == i.t && i[0] <= B[B.length - 1]) {
                for (e = 0; e < B.length; ++e)
                    if (i[0] == B[e])
                        return !0;
                return !1
            }
            if (i.isEven())
                return !1;
            for (e = 1; e < B.length; ) {
                for (var r = B[e], n = e + 1; n < B.length && r < A; )
                    r *= B[n++];
                for (r = i.modInt(r); e < n; )
                    if (r % B[e++] == 0)
                        return !1
            }
            return i.millerRabin(t)
        }
        ,
        b.prototype.copyTo = function(t) {
            for (var e = this.t - 1; 0 <= e; --e)
                t[e] = this[e];
            t.t = this.t,
            t.s = this.s
        }
        ,
        b.prototype.fromInt = function(t) {
            this.t = 1,
            this.s = t < 0 ? -1 : 0,
            0 < t ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
        }
        ,
        b.prototype.fromString = function(t, e) {
            var i;
            if (16 == e)
                i = 4;
            else if (8 == e)
                i = 3;
            else if (256 == e)
                i = 8;
            else if (2 == e)
                i = 1;
            else if (32 == e)
                i = 5;
            else {
                if (4 != e)
                    return void this.fromRadix(t, e);
                i = 2
            }
            this.t = 0,
            this.s = 0;
            for (var r = t.length, n = !1, s = 0; 0 <= --r; ) {
                var o = 8 == i ? 255 & +t[r] : C(t, r);
                o < 0 ? "-" == t.charAt(r) && (n = !0) : (n = !1,
                0 == s ? this[this.t++] = o : s + i > this.DB ? (this[this.t - 1] |= (o & (1 << this.DB - s) - 1) << s,
                this[this.t++] = o >> this.DB - s) : this[this.t - 1] |= o << s,
                (s += i) >= this.DB && (s -= this.DB))
            }
            8 == i && 0 != (128 & +t[0]) && (this.s = -1,
            0 < s && (this[this.t - 1] |= (1 << this.DB - s) - 1 << s)),
            this.clamp(),
            n && b.ZERO.subTo(this, this)
        }
        ,
        b.prototype.clamp = function() {
            for (var t = this.s & this.DM; 0 < this.t && this[this.t - 1] == t; )
                --this.t
        }
        ,
        b.prototype.dlShiftTo = function(t, e) {
            var i;
            for (i = this.t - 1; 0 <= i; --i)
                e[i + t] = this[i];
            for (i = t - 1; 0 <= i; --i)
                e[i] = 0;
            e.t = this.t + t,
            e.s = this.s
        }
        ,
        b.prototype.drShiftTo = function(t, e) {
            for (var i = t; i < this.t; ++i)
                e[i - t] = this[i];
            e.t = Math.max(this.t - t, 0),
            e.s = this.s
        }
        ,
        b.prototype.lShiftTo = function(t, e) {
            for (var i = t % this.DB, r = this.DB - i, n = (1 << r) - 1, s = Math.floor(t / this.DB), o = this.s << i & this.DM, h = this.t - 1; 0 <= h; --h)
                e[h + s + 1] = this[h] >> r | o,
                o = (this[h] & n) << i;
            for (h = s - 1; 0 <= h; --h)
                e[h] = 0;
            e[s] = o,
            e.t = this.t + s + 1,
            e.s = this.s,
            e.clamp()
        }
        ,
        b.prototype.rShiftTo = function(t, e) {
            e.s = this.s;
            var i = Math.floor(t / this.DB);
            if (i >= this.t)
                e.t = 0;
            else {
                var r = t % this.DB
                  , n = this.DB - r
                  , s = (1 << r) - 1;
                e[0] = this[i] >> r;
                for (var o = i + 1; o < this.t; ++o)
                    e[o - i - 1] |= (this[o] & s) << n,
                    e[o - i] = this[o] >> r;
                0 < r && (e[this.t - i - 1] |= (this.s & s) << n),
                e.t = this.t - i,
                e.clamp()
            }
        }
        ,
        b.prototype.subTo = function(t, e) {
            for (var i = 0, r = 0, n = Math.min(t.t, this.t); i < n; )
                r += this[i] - t[i],
                e[i++] = r & this.DM,
                r >>= this.DB;
            if (t.t < this.t) {
                for (r -= t.s; i < this.t; )
                    r += this[i],
                    e[i++] = r & this.DM,
                    r >>= this.DB;
                r += this.s
            } else {
                for (r += this.s; i < t.t; )
                    r -= t[i],
                    e[i++] = r & this.DM,
                    r >>= this.DB;
                r -= t.s
            }
            e.s = r < 0 ? -1 : 0,
            r < -1 ? e[i++] = this.DV + r : 0 < r && (e[i++] = r),
            e.t = i,
            e.clamp()
        }
        ,
        b.prototype.multiplyTo = function(t, e) {
            var i = this.abs()
              , r = t.abs()
              , n = i.t;
            for (e.t = n + r.t; 0 <= --n; )
                e[n] = 0;
            for (n = 0; n < r.t; ++n)
                e[n + i.t] = i.am(0, r[n], e, n, 0, i.t);
            e.s = 0,
            e.clamp(),
            this.s != t.s && b.ZERO.subTo(e, e)
        }
        ,
        b.prototype.squareTo = function(t) {
            for (var e = this.abs(), i = t.t = 2 * e.t; 0 <= --i; )
                t[i] = 0;
            for (i = 0; i < e.t - 1; ++i) {
                var r = e.am(i, e[i], t, 2 * i, 0, 1);
                (t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, r, e.t - i - 1)) >= e.DV && (t[i + e.t] -= e.DV,
                t[i + e.t + 1] = 1)
            }
            0 < t.t && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)),
            t.s = 0,
            t.clamp()
        }
        ,
        b.prototype.divRemTo = function(t, e, i) {
            var r = t.abs();
            if (!(r.t <= 0)) {
                var n = this.abs();
                if (n.t < r.t)
                    return null != e && e.fromInt(0),
                    void (null != i && this.copyTo(i));
                null == i && (i = M());
                var s = M()
                  , o = this.s
                  , h = t.s
                  , a = this.DB - U(r[r.t - 1]);
                0 < a ? (r.lShiftTo(a, s),
                n.lShiftTo(a, i)) : (r.copyTo(s),
                n.copyTo(i));
                var u = s.t
                  , c = s[u - 1];
                if (0 != c) {
                    var f = c * (1 << this.F1) + (1 < u ? s[u - 2] >> this.F2 : 0)
                      , l = this.FV / f
                      , p = (1 << this.F1) / f
                      , g = 1 << this.F2
                      , d = i.t
                      , v = d - u
                      , m = null == e ? M() : e;
                    for (s.dlShiftTo(v, m),
                    0 <= i.compareTo(m) && (i[i.t++] = 1,
                    i.subTo(m, i)),
                    b.ONE.dlShiftTo(u, m),
                    m.subTo(s, s); s.t < u; )
                        s[s.t++] = 0;
                    for (; 0 <= --v; ) {
                        var y = i[--d] == c ? this.DM : Math.floor(i[d] * l + (i[d - 1] + g) * p);
                        if ((i[d] += s.am(0, y, i, v, 0, u)) < y)
                            for (s.dlShiftTo(v, m),
                            i.subTo(m, i); i[d] < --y; )
                                i.subTo(m, i)
                    }
                    null != e && (i.drShiftTo(u, e),
                    o != h && b.ZERO.subTo(e, e)),
                    i.t = u,
                    i.clamp(),
                    0 < a && i.rShiftTo(a, i),
                    o < 0 && b.ZERO.subTo(i, i)
                }
            }
        }
        ,
        b.prototype.invDigit = function() {
            if (this.t < 1)
                return 0;
            var t = this[0];
            if (0 == (1 & t))
                return 0;
            var e = 3 & t;
            return 0 < (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) ? this.DV - e : -e
        }
        ,
        b.prototype.isEven = function() {
            return 0 == (0 < this.t ? 1 & this[0] : this.s)
        }
        ,
        b.prototype.exp = function(t, e) {
            if (4294967295 < t || t < 1)
                return b.ONE;
            var i = M()
              , r = M()
              , n = e.convert(this)
              , s = U(t) - 1;
            for (n.copyTo(i); 0 <= --s; )
                if (e.sqrTo(i, r),
                0 < (t & 1 << s))
                    e.mulTo(r, n, i);
                else {
                    var o = i;
                    i = r,
                    r = o
                }
            return e.revert(i)
        }
        ,
        b.prototype.chunkSize = function(t) {
            return Math.floor(Math.LN2 * this.DB / Math.log(t))
        }
        ,
        b.prototype.toRadix = function(t) {
            if (null == t && (t = 10),
            0 == this.signum() || t < 2 || 36 < t)
                return "0";
            var e = this.chunkSize(t)
              , i = Math.pow(t, e)
              , r = F(i)
              , n = M()
              , s = M()
              , o = "";
            for (this.divRemTo(r, n, s); 0 < n.signum(); )
                o = (i + s.intValue()).toString(t).substr(1) + o,
                n.divRemTo(r, n, s);
            return s.intValue().toString(t) + o
        }
        ,
        b.prototype.fromRadix = function(t, e) {
            this.fromInt(0),
            null == e && (e = 10);
            for (var i = this.chunkSize(e), r = Math.pow(e, i), n = !1, s = 0, o = 0, h = 0; h < t.length; ++h) {
                var a = C(t, h);
                a < 0 ? "-" == t.charAt(h) && 0 == this.signum() && (n = !0) : (o = e * o + a,
                ++s >= i && (this.dMultiply(r),
                this.dAddOffset(o, 0),
                o = s = 0))
            }
            0 < s && (this.dMultiply(Math.pow(e, s)),
            this.dAddOffset(o, 0)),
            n && b.ZERO.subTo(this, this)
        }
        ,
        b.prototype.fromNumber = function(t, e, i) {
            if ("number" == typeof e)
                if (t < 2)
                    this.fromInt(1);
                else
                    for (this.fromNumber(t, i),
                    this.testBit(t - 1) || this.bitwiseTo(b.ONE.shiftLeft(t - 1), u, this),
                    this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(e); )
                        this.dAddOffset(2, 0),
                        this.bitLength() > t && this.subTo(b.ONE.shiftLeft(t - 1), this);
            else {
                var r = []
                  , n = 7 & t;
                r.length = 1 + (t >> 3),
                e.nextBytes(r),
                0 < n ? r[0] &= (1 << n) - 1 : r[0] = 0,
                this.fromString(r, 256)
            }
        }
        ,
        b.prototype.bitwiseTo = function(t, e, i) {
            var r, n, s = Math.min(t.t, this.t);
            for (r = 0; r < s; ++r)
                i[r] = e(this[r], t[r]);
            if (t.t < this.t) {
                for (n = t.s & this.DM,
                r = s; r < this.t; ++r)
                    i[r] = e(this[r], n);
                i.t = this.t
            } else {
                for (n = this.s & this.DM,
                r = s; r < t.t; ++r)
                    i[r] = e(n, t[r]);
                i.t = t.t
            }
            i.s = e(this.s, t.s),
            i.clamp()
        }
        ,
        b.prototype.changeBit = function(t, e) {
            var i = b.ONE.shiftLeft(t);
            return this.bitwiseTo(i, e, i),
            i
        }
        ,
        b.prototype.addTo = function(t, e) {
            for (var i = 0, r = 0, n = Math.min(t.t, this.t); i < n; )
                r += this[i] + t[i],
                e[i++] = r & this.DM,
                r >>= this.DB;
            if (t.t < this.t) {
                for (r += t.s; i < this.t; )
                    r += this[i],
                    e[i++] = r & this.DM,
                    r >>= this.DB;
                r += this.s
            } else {
                for (r += this.s; i < t.t; )
                    r += t[i],
                    e[i++] = r & this.DM,
                    r >>= this.DB;
                r += t.s
            }
            e.s = r < 0 ? -1 : 0,
            0 < r ? e[i++] = r : r < -1 && (e[i++] = this.DV + r),
            e.t = i,
            e.clamp()
        }
        ,
        b.prototype.dMultiply = function(t) {
            this[this.t] = this.am(0, t - 1, this, 0, 0, this.t),
            ++this.t,
            this.clamp()
        }
        ,
        b.prototype.dAddOffset = function(t, e) {
            if (0 != t) {
                for (; this.t <= e; )
                    this[this.t++] = 0;
                for (this[e] += t; this[e] >= this.DV; )
                    this[e] -= this.DV,
                    ++e >= this.t && (this[this.t++] = 0),
                    ++this[e]
            }
        }
        ,
        b.prototype.multiplyLowerTo = function(t, e, i) {
            var r = Math.min(this.t + t.t, e);
            for (i.s = 0,
            i.t = r; 0 < r; )
                i[--r] = 0;
            for (var n = i.t - this.t; r < n; ++r)
                i[r + this.t] = this.am(0, t[r], i, r, 0, this.t);
            for (n = Math.min(t.t, e); r < n; ++r)
                this.am(0, t[r], i, r, 0, e - r);
            i.clamp()
        }
        ,
        b.prototype.multiplyUpperTo = function(t, e, i) {
            --e;
            var r = i.t = this.t + t.t - e;
            for (i.s = 0; 0 <= --r; )
                i[r] = 0;
            for (r = Math.max(e - this.t, 0); r < t.t; ++r)
                i[this.t + r - e] = this.am(e - r, t[r], i, 0, 0, this.t + r - e);
            i.clamp(),
            i.drShiftTo(1, i)
        }
        ,
        b.prototype.modInt = function(t) {
            if (t <= 0)
                return 0;
            var e = this.DV % t
              , i = this.s < 0 ? t - 1 : 0;
            if (0 < this.t)
                if (0 == e)
                    i = this[0] % t;
                else
                    for (var r = this.t - 1; 0 <= r; --r)
                        i = (e * i + this[r]) % t;
            return i
        }
        ,
        b.prototype.millerRabin = function(t) {
            var e = this.subtract(b.ONE)
              , i = e.getLowestSetBit();
            if (i <= 0)
                return !1;
            var r = e.shiftRight(i);
            B.length < (t = t + 1 >> 1) && (t = B.length);
            for (var n = M(), s = 0; s < t; ++s) {
                n.fromInt(B[Math.floor(Math.random() * B.length)]);
                var o = n.modPow(r, this);
                if (0 != o.compareTo(b.ONE) && 0 != o.compareTo(e)) {
                    for (var h = 1; h++ < i && 0 != o.compareTo(e); )
                        if (0 == (o = o.modPowInt(2, this)).compareTo(b.ONE))
                            return !1;
                    if (0 != o.compareTo(e))
                        return !1
                }
            }
            return !0
        }
        ,
        b.prototype.square = function() {
            var t = M();
            return this.squareTo(t),
            t
        }
        ,
        b.prototype.gcda = function(t, e) {
            var i = this.s < 0 ? this.negate() : this.clone()
              , r = t.s < 0 ? t.negate() : t.clone();
            if (i.compareTo(r) < 0) {
                var n = i;
                i = r,
                r = n
            }
            var s = i.getLowestSetBit()
              , o = r.getLowestSetBit();
            if (o < 0)
                e(i);
            else {
                s < o && (o = s),
                0 < o && (i.rShiftTo(o, i),
                r.rShiftTo(o, r));
                var h = function() {
                    0 < (s = i.getLowestSetBit()) && i.rShiftTo(s, i),
                    0 < (s = r.getLowestSetBit()) && r.rShiftTo(s, r),
                    0 <= i.compareTo(r) ? (i.subTo(r, i),
                    i.rShiftTo(1, i)) : (r.subTo(i, r),
                    r.rShiftTo(1, r)),
                    0 < i.signum() ? setTimeout(h, 0) : (0 < o && r.lShiftTo(o, r),
                    setTimeout(function() {
                        e(r)
                    }, 0))
                };
                setTimeout(h, 10)
            }
        }
        ,
        b.prototype.fromNumberAsync = function(t, e, i, r) {
            if ("number" == typeof e)
                if (t < 2)
                    this.fromInt(1);
                else {
                    this.fromNumber(t, i),
                    this.testBit(t - 1) || this.bitwiseTo(b.ONE.shiftLeft(t - 1), u, this),
                    this.isEven() && this.dAddOffset(1, 0);
                    var n = this
                      , s = function() {
                        n.dAddOffset(2, 0),
                        n.bitLength() > t && n.subTo(b.ONE.shiftLeft(t - 1), n),
                        n.isProbablePrime(e) ? setTimeout(function() {
                            r()
                        }, 0) : setTimeout(s, 0)
                    };
                    setTimeout(s, 0)
                }
            else {
                var o = []
                  , h = 7 & t;
                o.length = 1 + (t >> 3),
                e.nextBytes(o),
                0 < h ? o[0] &= (1 << h) - 1 : o[0] = 0,
                this.fromString(o, 256)
            }
        }
        ,
        b
    }(), V = function() {
        function t() {}
        return t.prototype.convert = function(t) {
            return t
        }
        ,
        t.prototype.revert = function(t) {
            return t
        }
        ,
        t.prototype.mulTo = function(t, e, i) {
            t.multiplyTo(e, i)
        }
        ,
        t.prototype.sqrTo = function(t, e) {
            t.squareTo(e)
        }
        ,
        t
    }(), I = function() {
        function t(t) {
            this.m = t
        }
        return t.prototype.convert = function(t) {
            return t.s < 0 || 0 <= t.compareTo(this.m) ? t.mod(this.m) : t
        }
        ,
        t.prototype.revert = function(t) {
            return t
        }
        ,
        t.prototype.reduce = function(t) {
            t.divRemTo(this.m, null, t)
        }
        ,
        t.prototype.mulTo = function(t, e, i) {
            t.multiplyTo(e, i),
            this.reduce(i)
        }
        ,
        t.prototype.sqrTo = function(t, e) {
            t.squareTo(e),
            this.reduce(e)
        }
        ,
        t
    }(), N = function() {
        function t(t) {
            this.m = t,
            this.mp = t.invDigit(),
            this.mpl = 32767 & this.mp,
            this.mph = this.mp >> 15,
            this.um = (1 << t.DB - 15) - 1,
            this.mt2 = 2 * t.t
        }
        return t.prototype.convert = function(t) {
            var e = M();
            return t.abs().dlShiftTo(this.m.t, e),
            e.divRemTo(this.m, null, e),
            t.s < 0 && 0 < e.compareTo(O.ZERO) && this.m.subTo(e, e),
            e
        }
        ,
        t.prototype.revert = function(t) {
            var e = M();
            return t.copyTo(e),
            this.reduce(e),
            e
        }
        ,
        t.prototype.reduce = function(t) {
            for (; t.t <= this.mt2; )
                t[t.t++] = 0;
            for (var e = 0; e < this.m.t; ++e) {
                var i = 32767 & t[e]
                  , r = i * this.mpl + ((i * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                for (t[i = e + this.m.t] += this.m.am(0, r, t, e, 0, this.m.t); t[i] >= t.DV; )
                    t[i] -= t.DV,
                    t[++i]++
            }
            t.clamp(),
            t.drShiftTo(this.m.t, t),
            0 <= t.compareTo(this.m) && t.subTo(this.m, t)
        }
        ,
        t.prototype.mulTo = function(t, e, i) {
            t.multiplyTo(e, i),
            this.reduce(i)
        }
        ,
        t.prototype.sqrTo = function(t, e) {
            t.squareTo(e),
            this.reduce(e)
        }
        ,
        t
    }(), P = function() {
        function t(t) {
            this.m = t,
            this.r2 = M(),
            this.q3 = M(),
            O.ONE.dlShiftTo(2 * t.t, this.r2),
            this.mu = this.r2.divide(t)
        }
        return t.prototype.convert = function(t) {
            if (t.s < 0 || t.t > 2 * this.m.t)
                return t.mod(this.m);
            if (t.compareTo(this.m) < 0)
                return t;
            var e = M();
            return t.copyTo(e),
            this.reduce(e),
            e
        }
        ,
        t.prototype.revert = function(t) {
            return t
        }
        ,
        t.prototype.reduce = function(t) {
            for (t.drShiftTo(this.m.t - 1, this.r2),
            t.t > this.m.t + 1 && (t.t = this.m.t + 1,
            t.clamp()),
            this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
            this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0; )
                t.dAddOffset(1, this.m.t + 1);
            for (t.subTo(this.r2, t); 0 <= t.compareTo(this.m); )
                t.subTo(this.m, t)
        }
        ,
        t.prototype.mulTo = function(t, e, i) {
            t.multiplyTo(e, i),
            this.reduce(i)
        }
        ,
        t.prototype.sqrTo = function(t, e) {
            t.squareTo(e),
            this.reduce(e)
        }
        ,
        t
    }();
    function M() {
        return new O(null)
    }
    function q(t, e) {
        return new O(t,e)
    }
    "Microsoft Internet Explorer" == navigator.appName ? (O.prototype.am = function(t, e, i, r, n, s) {
        for (var o = 32767 & e, h = e >> 15; 0 <= --s; ) {
            var a = 32767 & this[t]
              , u = this[t++] >> 15
              , c = h * a + u * o;
            n = ((a = o * a + ((32767 & c) << 15) + i[r] + (1073741823 & n)) >>> 30) + (c >>> 15) + h * u + (n >>> 30),
            i[r++] = 1073741823 & a
        }
        return n
    }
    ,
    w = 30) : "Netscape" != navigator.appName ? (O.prototype.am = function(t, e, i, r, n, s) {
        for (; 0 <= --s; ) {
            var o = e * this[t++] + i[r] + n;
            n = Math.floor(o / 67108864),
            i[r++] = 67108863 & o
        }
        return n
    }
    ,
    w = 26) : (O.prototype.am = function(t, e, i, r, n, s) {
        for (var o = 16383 & e, h = e >> 14; 0 <= --s; ) {
            var a = 16383 & this[t]
              , u = this[t++] >> 14
              , c = h * a + u * o;
            n = ((a = o * a + ((16383 & c) << 14) + i[r] + n) >> 28) + (c >> 14) + h * u,
            i[r++] = 268435455 & a
        }
        return n
    }
    ,
    w = 28),
    O.prototype.DB = w,
    O.prototype.DM = (1 << w) - 1,
    O.prototype.DV = 1 << w;
    O.prototype.FV = Math.pow(2, 52),
    O.prototype.F1 = 52 - w,
    O.prototype.F2 = 2 * w - 52;
    var j, L, H = [];
    for (j = "0".charCodeAt(0),
    L = 0; L <= 9; ++L)
        H[j++] = L;
    for (j = "a".charCodeAt(0),
    L = 10; L < 36; ++L)
        H[j++] = L;
    for (j = "A".charCodeAt(0),
    L = 10; L < 36; ++L)
        H[j++] = L;
    function C(t, e) {
        var i = H[t.charCodeAt(e)];
        return null == i ? -1 : i
    }
    function F(t) {
        var e = M();
        return e.fromInt(t),
        e
    }
    function U(t) {
        var e, i = 1;
        return 0 != (e = t >>> 16) && (t = e,
        i += 16),
        0 != (e = t >> 8) && (t = e,
        i += 8),
        0 != (e = t >> 4) && (t = e,
        i += 4),
        0 != (e = t >> 2) && (t = e,
        i += 2),
        0 != (e = t >> 1) && (t = e,
        i += 1),
        i
    }
    O.ZERO = F(0),
    O.ONE = F(1);
    var K = function() {
        function t() {
            this.i = 0,
            this.j = 0,
            this.S = []
        }
        return t.prototype.init = function(t) {
            var e, i, r;
            for (e = 0; e < 256; ++e)
                this.S[e] = e;
            for (e = i = 0; e < 256; ++e)
                i = i + this.S[e] + t[e % t.length] & 255,
                r = this.S[e],
                this.S[e] = this.S[i],
                this.S[i] = r;
            this.i = 0,
            this.j = 0
        }
        ,
        t.prototype.next = function() {
            var t;
            return this.i = this.i + 1 & 255,
            this.j = this.j + this.S[this.i] & 255,
            t = this.S[this.i],
            this.S[this.i] = this.S[this.j],
            this.S[this.j] = t,
            this.S[t + this.S[this.i] & 255]
        }
        ,
        t
    }();
    var k, _, z = 256, Z = null;
    if (null == Z) {
        Z = [];
        var G = void (_ = 0);
        if (window.crypto && window.crypto.getRandomValues) {
            var $ = new Uint32Array(256);
            for (window.crypto.getRandomValues($),
            G = 0; G < $.length; ++G)
                Z[_++] = 255 & $[G]
        }
        var Y = function(t) {
            if (this.count = this.count || 0,
            256 <= this.count || z <= _)
                window.removeEventListener ? window.removeEventListener("mousemove", Y, !1) : window.detachEvent && window.detachEvent("onmousemove", Y);
            else
                try {
                    var e = t.x + t.y;
                    Z[_++] = 255 & e,
                    this.count += 1
                } catch (t) {}
        };
        window.addEventListener ? window.addEventListener("mousemove", Y, !1) : window.attachEvent && window.attachEvent("onmousemove", Y)
    }
    function J() {
        if (null == k) {
            for (k = new K; _ < z; ) {
                var t = Math.floor(65536 * Math.random());
                Z[_++] = 255 & t
            }
            for (k.init(Z),
            _ = 0; _ < Z.length; ++_)
                Z[_] = 0;
            _ = 0
        }
        return k.next()
    }
    var X = function() {
        function t() {}
        return t.prototype.nextBytes = function(t) {
            for (var e = 0; e < t.length; ++e)
                t[e] = J()
        }
        ,
        t
    }();
    var Q = function() {
        function t() {
            this.n = null,
            this.e = 0,
            this.d = null,
            this.p = null,
            this.q = null,
            this.dmp1 = null,
            this.dmq1 = null,
            this.coeff = null
        }
        return t.prototype.doPublic = function(t) {
            return t.modPowInt(this.e, this.n)
        }
        ,
        t.prototype.doPrivate = function(t) {
            if (null == this.p || null == this.q)
                return t.modPow(this.d, this.n);
            for (var e = t.mod(this.p).modPow(this.dmp1, this.p), i = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(i) < 0; )
                e = e.add(this.p);
            return e.subtract(i).multiply(this.coeff).mod(this.p).multiply(this.q).add(i)
        }
        ,
        t.prototype.setPublic = function(t, e) {
            null != t && null != e && 0 < t.length && 0 < e.length ? (this.n = q(t, 16),
            this.e = parseInt(e, 16)) : console.error("Invalid RSA public key")
        }
        ,
        t.prototype.encrypt = function(t) {
            var e = function(t, e) {
                if (e < t.length + 11)
                    return console.error("Message too long for RSA"),
                    null;
                for (var i = [], r = t.length - 1; 0 <= r && 0 < e; ) {
                    var n = t.charCodeAt(r--);
                    n < 128 ? i[--e] = n : 127 < n && n < 2048 ? (i[--e] = 63 & n | 128,
                    i[--e] = n >> 6 | 192) : (i[--e] = 63 & n | 128,
                    i[--e] = n >> 6 & 63 | 128,
                    i[--e] = n >> 12 | 224)
                }
                i[--e] = 0;
                for (var s = new X, o = []; 2 < e; ) {
                    for (o[0] = 0; 0 == o[0]; )
                        s.nextBytes(o);
                    i[--e] = o[0]
                }
                return i[--e] = 2,
                i[--e] = 0,
                new O(i)
            }(t, this.n.bitLength() + 7 >> 3);
            if (null == e)
                return null;
            var i = this.doPublic(e);
            if (null == i)
                return null;
            var r = i.toString(16);
            return 0 == (1 & r.length) ? r : "0" + r
        }
        ,
        t.prototype.setPrivate = function(t, e, i) {
            null != t && null != e && 0 < t.length && 0 < e.length ? (this.n = q(t, 16),
            this.e = parseInt(e, 16),
            this.d = q(i, 16)) : console.error("Invalid RSA private key")
        }
        ,
        t.prototype.setPrivateEx = function(t, e, i, r, n, s, o, h) {
            null != t && null != e && 0 < t.length && 0 < e.length ? (this.n = q(t, 16),
            this.e = parseInt(e, 16),
            this.d = q(i, 16),
            this.p = q(r, 16),
            this.q = q(n, 16),
            this.dmp1 = q(s, 16),
            this.dmq1 = q(o, 16),
            this.coeff = q(h, 16)) : console.error("Invalid RSA private key")
        }
        ,
        t.prototype.generate = function(t, e) {
            var i = new X
              , r = t >> 1;
            this.e = parseInt(e, 16);
            for (var n = new O(e,16); ; ) {
                for (; this.p = new O(t - r,1,i),
                0 != this.p.subtract(O.ONE).gcd(n).compareTo(O.ONE) || !this.p.isProbablePrime(10); )
                    ;
                for (; this.q = new O(r,1,i),
                0 != this.q.subtract(O.ONE).gcd(n).compareTo(O.ONE) || !this.q.isProbablePrime(10); )
                    ;
                if (this.p.compareTo(this.q) <= 0) {
                    var s = this.p;
                    this.p = this.q,
                    this.q = s
                }
                var o = this.p.subtract(O.ONE)
                  , h = this.q.subtract(O.ONE)
                  , a = o.multiply(h);
                if (0 == a.gcd(n).compareTo(O.ONE)) {
                    this.n = this.p.multiply(this.q),
                    this.d = n.modInverse(a),
                    this.dmp1 = this.d.mod(o),
                    this.dmq1 = this.d.mod(h),
                    this.coeff = this.q.modInverse(this.p);
                    break
                }
            }
        }
        ,
        t.prototype.decrypt = function(t) {
            var e = q(t, 16)
              , i = this.doPrivate(e);
            return null == i ? null : function(t, e) {
                var i = t.toByteArray()
                  , r = 0;
                for (; r < i.length && 0 == i[r]; )
                    ++r;
                if (i.length - r != e - 1 || 2 != i[r])
                    return null;
                ++r;
                for (; 0 != i[r]; )
                    if (++r >= i.length)
                        return null;
                var n = "";
                for (; ++r < i.length; ) {
                    var s = 255 & i[r];
                    s < 128 ? n += String.fromCharCode(s) : 191 < s && s < 224 ? (n += String.fromCharCode((31 & s) << 6 | 63 & i[r + 1]),
                    ++r) : (n += String.fromCharCode((15 & s) << 12 | (63 & i[r + 1]) << 6 | 63 & i[r + 2]),
                    r += 2)
                }
                return n
            }(i, this.n.bitLength() + 7 >> 3)
        }
        ,
        t.prototype.generateAsync = function(t, e, n) {
            var s = new X
              , o = t >> 1;
            this.e = parseInt(e, 16);
            var h = new O(e,16)
              , a = this
              , u = function() {
                var e = function() {
                    if (a.p.compareTo(a.q) <= 0) {
                        var t = a.p;
                        a.p = a.q,
                        a.q = t
                    }
                    var e = a.p.subtract(O.ONE)
                      , i = a.q.subtract(O.ONE)
                      , r = e.multiply(i);
                    0 == r.gcd(h).compareTo(O.ONE) ? (a.n = a.p.multiply(a.q),
                    a.d = h.modInverse(r),
                    a.dmp1 = a.d.mod(e),
                    a.dmq1 = a.d.mod(i),
                    a.coeff = a.q.modInverse(a.p),
                    setTimeout(function() {
                        n()
                    }, 0)) : setTimeout(u, 0)
                }
                  , i = function() {
                    a.q = M(),
                    a.q.fromNumberAsync(o, 1, s, function() {
                        a.q.subtract(O.ONE).gcda(h, function(t) {
                            0 == t.compareTo(O.ONE) && a.q.isProbablePrime(10) ? setTimeout(e, 0) : setTimeout(i, 0)
                        })
                    })
                }
                  , r = function() {
                    a.p = M(),
                    a.p.fromNumberAsync(t - o, 1, s, function() {
                        a.p.subtract(O.ONE).gcda(h, function(t) {
                            0 == t.compareTo(O.ONE) && a.p.isProbablePrime(10) ? setTimeout(i, 0) : setTimeout(r, 0)
                        })
                    })
                };
                setTimeout(r, 0)
            };
            setTimeout(u, 0)
        }
        ,
        t.prototype.sign = function(t, e, i) {
            var r = function(t, e) {
                if (e < t.length + 22)
                    return console.error("Message too long for RSA"),
                    null;
                for (var i = e - t.length - 6, r = "", n = 0; n < i; n += 2)
                    r += "ff";
                return q("0001" + r + "00" + t, 16)
            }((W[i] || "") + e(t).toString(), this.n.bitLength() / 4);
            if (null == r)
                return null;
            var n = this.doPrivate(r);
            if (null == n)
                return null;
            var s = n.toString(16);
            return 0 == (1 & s.length) ? s : "0" + s
        }
        ,
        t.prototype.verify = function(t, e, i) {
            var r = q(e, 16)
              , n = this.doPublic(r);
            return null == n ? null : function(t) {
                for (var e in W)
                    if (W.hasOwnProperty(e)) {
                        var i = W[e]
                          , r = i.length;
                        if (t.substr(0, r) == i)
                            return t.substr(r)
                    }
                return t
            }(n.toString(16).replace(/^1f+00/, "")) == i(t).toString()
        }
        ,
        t
    }();
    var W = {
        md2: "3020300c06082a864886f70d020205000410",
        md5: "3020300c06082a864886f70d020505000410",
        sha1: "3021300906052b0e03021a05000414",
        sha224: "302d300d06096086480165030402040500041c",
        sha256: "3031300d060960864801650304020105000420",
        sha384: "3041300d060960864801650304020205000430",
        sha512: "3051300d060960864801650304020305000440",
        ripemd160: "3021300906052b2403020105000414"
    };
    var tt = {};
    tt.lang = {
        extend: function(t, e, i) {
            if (!e || !t)
                throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
            var r = function() {};
            if (r.prototype = e.prototype,
            t.prototype = new r,
            (t.prototype.constructor = t).superclass = e.prototype,
            e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e),
            i) {
                var n;
                for (n in i)
                    t.prototype[n] = i[n];
                var s = function() {}
                  , o = ["toString", "valueOf"];
                try {
                    /MSIE/.test(navigator.userAgent) && (s = function(t, e) {
                        for (n = 0; n < o.length; n += 1) {
                            var i = o[n]
                              , r = e[i];
                            "function" == typeof r && r != Object.prototype[i] && (t[i] = r)
                        }
                    }
                    )
                } catch (t) {}
                s(t.prototype, i)
            }
        }
    };
    var et = {};
    void 0 !== et.asn1 && et.asn1 || (et.asn1 = {}),
    et.asn1.ASN1Util = new function() {
        this.integerToByteHex = function(t) {
            var e = t.toString(16);
            return e.length % 2 == 1 && (e = "0" + e),
            e
        }
        ,
        this.bigIntToMinTwosComplementsHex = function(t) {
            var e = t.toString(16);
            if ("-" != e.substr(0, 1))
                e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
            else {
                var i = e.substr(1).length;
                i % 2 == 1 ? i += 1 : e.match(/^[0-7]/) || (i += 2);
                for (var r = "", n = 0; n < i; n++)
                    r += "f";
                e = new O(r,16).xor(t).add(O.ONE).toString(16).replace(/^-/, "")
            }
            return e
        }
        ,
        this.getPEMStringFromHex = function(t, e) {
            return hextopem(t, e)
        }
        ,
        this.newObject = function(t) {
            var e = et.asn1
              , i = e.DERBoolean
              , r = e.DERInteger
              , n = e.DERBitString
              , s = e.DEROctetString
              , o = e.DERNull
              , h = e.DERObjectIdentifier
              , a = e.DEREnumerated
              , u = e.DERUTF8String
              , c = e.DERNumericString
              , f = e.DERPrintableString
              , l = e.DERTeletexString
              , p = e.DERIA5String
              , g = e.DERUTCTime
              , d = e.DERGeneralizedTime
              , v = e.DERSequence
              , m = e.DERSet
              , y = e.DERTaggedObject
              , b = e.ASN1Util.newObject
              , T = Object.keys(t);
            if (1 != T.length)
                throw "key of param shall be only one.";
            var S = T[0];
            if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + S + ":"))
                throw "undefined key: " + S;
            if ("bool" == S)
                return new i(t[S]);
            if ("int" == S)
                return new r(t[S]);
            if ("bitstr" == S)
                return new n(t[S]);
            if ("octstr" == S)
                return new s(t[S]);
            if ("null" == S)
                return new o(t[S]);
            if ("oid" == S)
                return new h(t[S]);
            if ("enum" == S)
                return new a(t[S]);
            if ("utf8str" == S)
                return new u(t[S]);
            if ("numstr" == S)
                return new c(t[S]);
            if ("prnstr" == S)
                return new f(t[S]);
            if ("telstr" == S)
                return new l(t[S]);
            if ("ia5str" == S)
                return new p(t[S]);
            if ("utctime" == S)
                return new g(t[S]);
            if ("gentime" == S)
                return new d(t[S]);
            if ("seq" == S) {
                for (var E = t[S], w = [], D = 0; D < E.length; D++) {
                    var x = b(E[D]);
                    w.push(x)
                }
                return new v({
                    array: w
                })
            }
            if ("set" == S) {
                for (E = t[S],
                w = [],
                D = 0; D < E.length; D++) {
                    x = b(E[D]);
                    w.push(x)
                }
                return new m({
                    array: w
                })
            }
            if ("tag" == S) {
                var R = t[S];
                if ("[object Array]" === Object.prototype.toString.call(R) && 3 == R.length) {
                    var B = b(R[2]);
                    return new y({
                        tag: R[0],
                        explicit: R[1],
                        obj: B
                    })
                }
                var A = {};
                if (void 0 !== R.explicit && (A.explicit = R.explicit),
                void 0 !== R.tag && (A.tag = R.tag),
                void 0 === R.obj)
                    throw "obj shall be specified for 'tag'.";
                return A.obj = b(R.obj),
                new y(A)
            }
        }
        ,
        this.jsonToASN1HEX = function(t) {
            return this.newObject(t).getEncodedHex()
        }
    }
    ,
    et.asn1.ASN1Util.oidHexToInt = function(t) {
        for (var e = "", i = parseInt(t.substr(0, 2), 16), r = (e = Math.floor(i / 40) + "." + i % 40,
        ""), n = 2; n < t.length; n += 2) {
            var s = ("00000000" + parseInt(t.substr(n, 2), 16).toString(2)).slice(-8);
            if (r += s.substr(1, 7),
            "0" == s.substr(0, 1))
                e = e + "." + new O(r,2).toString(10),
                r = ""
        }
        return e
    }
    ,
    et.asn1.ASN1Util.oidIntToHex = function(t) {
        var h = function(t) {
            var e = t.toString(16);
            return 1 == e.length && (e = "0" + e),
            e
        }
          , e = function(t) {
            var e = ""
              , i = new O(t,10).toString(2)
              , r = 7 - i.length % 7;
            7 == r && (r = 0);
            for (var n = "", s = 0; s < r; s++)
                n += "0";
            i = n + i;
            for (s = 0; s < i.length - 1; s += 7) {
                var o = i.substr(s, 7);
                s != i.length - 7 && (o = "1" + o),
                e += h(parseInt(o, 2))
            }
            return e
        };
        if (!t.match(/^[0-9.]+$/))
            throw "malformed oid string: " + t;
        var i = ""
          , r = t.split(".")
          , n = 40 * parseInt(r[0]) + parseInt(r[1]);
        i += h(n),
        r.splice(0, 2);
        for (var s = 0; s < r.length; s++)
            i += e(r[s]);
        return i
    }
    ,
    et.asn1.ASN1Object = function() {
        this.getLengthHexFromValue = function() {
            if (void 0 === this.hV || null == this.hV)
                throw "this.hV is null or undefined.";
            if (this.hV.length % 2 == 1)
                throw "value hex must be even length: n=" + "".length + ",v=" + this.hV;
            var t = this.hV.length / 2
              , e = t.toString(16);
            if (e.length % 2 == 1 && (e = "0" + e),
            t < 128)
                return e;
            var i = e.length / 2;
            if (15 < i)
                throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
            return (128 + i).toString(16) + e
        }
        ,
        this.getEncodedHex = function() {
            return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
            this.hL = this.getLengthHexFromValue(),
            this.hTLV = this.hT + this.hL + this.hV,
            this.isModified = !1),
            this.hTLV
        }
        ,
        this.getValueHex = function() {
            return this.getEncodedHex(),
            this.hV
        }
        ,
        this.getFreshValueHex = function() {
            return ""
        }
    }
    ,
    et.asn1.DERAbstractString = function(t) {
        et.asn1.DERAbstractString.superclass.constructor.call(this),
        this.getString = function() {
            return this.s
        }
        ,
        this.setString = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = t,
            this.hV = stohex(this.s)
        }
        ,
        this.setStringHex = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = null,
            this.hV = t
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
        ,
        void 0 !== t && ("string" == typeof t ? this.setString(t) : void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex && this.setStringHex(t.hex))
    }
    ,
    tt.lang.extend(et.asn1.DERAbstractString, et.asn1.ASN1Object),
    et.asn1.DERAbstractTime = function(t) {
        et.asn1.DERAbstractTime.superclass.constructor.call(this),
        this.localDateToUTC = function(t) {
            return utc = t.getTime() + 6e4 * t.getTimezoneOffset(),
            new Date(utc)
        }
        ,
        this.formatDate = function(t, e, i) {
            var r = this.zeroPadding
              , n = this.localDateToUTC(t)
              , s = String(n.getFullYear());
            "utc" == e && (s = s.substr(2, 2));
            var o = s + r(String(n.getMonth() + 1), 2) + r(String(n.getDate()), 2) + r(String(n.getHours()), 2) + r(String(n.getMinutes()), 2) + r(String(n.getSeconds()), 2);
            if (!0 === i) {
                var h = n.getMilliseconds();
                if (0 != h) {
                    var a = r(String(h), 3);
                    o = o + "." + (a = a.replace(/[0]+$/, ""))
                }
            }
            return o + "Z"
        }
        ,
        this.zeroPadding = function(t, e) {
            return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
        }
        ,
        this.getString = function() {
            return this.s
        }
        ,
        this.setString = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = t,
            this.hV = stohex(t)
        }
        ,
        this.setByDateValue = function(t, e, i, r, n, s) {
            var o = new Date(Date.UTC(t, e - 1, i, r, n, s, 0));
            this.setByDate(o)
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
    }
    ,
    tt.lang.extend(et.asn1.DERAbstractTime, et.asn1.ASN1Object),
    et.asn1.DERAbstractStructured = function(t) {
        et.asn1.DERAbstractString.superclass.constructor.call(this),
        this.setByASN1ObjectArray = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.asn1Array = t
        }
        ,
        this.appendASN1Object = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.asn1Array.push(t)
        }
        ,
        this.asn1Array = new Array,
        void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array)
    }
    ,
    tt.lang.extend(et.asn1.DERAbstractStructured, et.asn1.ASN1Object),
    et.asn1.DERBoolean = function() {
        et.asn1.DERBoolean.superclass.constructor.call(this),
        this.hT = "01",
        this.hTLV = "0101ff"
    }
    ,
    tt.lang.extend(et.asn1.DERBoolean, et.asn1.ASN1Object),
    et.asn1.DERInteger = function(t) {
        et.asn1.DERInteger.superclass.constructor.call(this),
        this.hT = "02",
        this.setByBigInteger = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.hV = et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
        }
        ,
        this.setByInteger = function(t) {
            var e = new O(String(t),10);
            this.setByBigInteger(e)
        }
        ,
        this.setValueHex = function(t) {
            this.hV = t
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
        ,
        void 0 !== t && (void 0 !== t.bigint ? this.setByBigInteger(t.bigint) : void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
    }
    ,
    tt.lang.extend(et.asn1.DERInteger, et.asn1.ASN1Object),
    et.asn1.DERBitString = function(t) {
        if (void 0 !== t && void 0 !== t.obj) {
            var e = et.asn1.ASN1Util.newObject(t.obj);
            t.hex = "00" + e.getEncodedHex()
        }
        et.asn1.DERBitString.superclass.constructor.call(this),
        this.hT = "03",
        this.setHexValueIncludingUnusedBits = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.hV = t
        }
        ,
        this.setUnusedBitsAndHexValue = function(t, e) {
            if (t < 0 || 7 < t)
                throw "unused bits shall be from 0 to 7: u = " + t;
            var i = "0" + t;
            this.hTLV = null,
            this.isModified = !0,
            this.hV = i + e
        }
        ,
        this.setByBinaryString = function(t) {
            var e = 8 - (t = t.replace(/0+$/, "")).length % 8;
            8 == e && (e = 0);
            for (var i = 0; i <= e; i++)
                t += "0";
            var r = "";
            for (i = 0; i < t.length - 1; i += 8) {
                var n = t.substr(i, 8)
                  , s = parseInt(n, 2).toString(16);
                1 == s.length && (s = "0" + s),
                r += s
            }
            this.hTLV = null,
            this.isModified = !0,
            this.hV = "0" + e + r
        }
        ,
        this.setByBooleanArray = function(t) {
            for (var e = "", i = 0; i < t.length; i++)
                1 == t[i] ? e += "1" : e += "0";
            this.setByBinaryString(e)
        }
        ,
        this.newFalseArray = function(t) {
            for (var e = new Array(t), i = 0; i < t; i++)
                e[i] = !1;
            return e
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
        ,
        void 0 !== t && ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(t) : void 0 !== t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : void 0 !== t.bin ? this.setByBinaryString(t.bin) : void 0 !== t.array && this.setByBooleanArray(t.array))
    }
    ,
    tt.lang.extend(et.asn1.DERBitString, et.asn1.ASN1Object),
    et.asn1.DEROctetString = function(t) {
        if (void 0 !== t && void 0 !== t.obj) {
            var e = et.asn1.ASN1Util.newObject(t.obj);
            t.hex = e.getEncodedHex()
        }
        et.asn1.DEROctetString.superclass.constructor.call(this, t),
        this.hT = "04"
    }
    ,
    tt.lang.extend(et.asn1.DEROctetString, et.asn1.DERAbstractString),
    et.asn1.DERNull = function() {
        et.asn1.DERNull.superclass.constructor.call(this),
        this.hT = "05",
        this.hTLV = "0500"
    }
    ,
    tt.lang.extend(et.asn1.DERNull, et.asn1.ASN1Object),
    et.asn1.DERObjectIdentifier = function(t) {
        var h = function(t) {
            var e = t.toString(16);
            return 1 == e.length && (e = "0" + e),
            e
        }
          , s = function(t) {
            var e = ""
              , i = new O(t,10).toString(2)
              , r = 7 - i.length % 7;
            7 == r && (r = 0);
            for (var n = "", s = 0; s < r; s++)
                n += "0";
            i = n + i;
            for (s = 0; s < i.length - 1; s += 7) {
                var o = i.substr(s, 7);
                s != i.length - 7 && (o = "1" + o),
                e += h(parseInt(o, 2))
            }
            return e
        };
        et.asn1.DERObjectIdentifier.superclass.constructor.call(this),
        this.hT = "06",
        this.setValueHex = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = null,
            this.hV = t
        }
        ,
        this.setValueOidString = function(t) {
            if (!t.match(/^[0-9.]+$/))
                throw "malformed oid string: " + t;
            var e = ""
              , i = t.split(".")
              , r = 40 * parseInt(i[0]) + parseInt(i[1]);
            e += h(r),
            i.splice(0, 2);
            for (var n = 0; n < i.length; n++)
                e += s(i[n]);
            this.hTLV = null,
            this.isModified = !0,
            this.s = null,
            this.hV = e
        }
        ,
        this.setValueName = function(t) {
            var e = et.asn1.x509.OID.name2oid(t);
            if ("" === e)
                throw "DERObjectIdentifier oidName undefined: " + t;
            this.setValueOidString(e)
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
        ,
        void 0 !== t && ("string" == typeof t ? t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t) : void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name))
    }
    ,
    tt.lang.extend(et.asn1.DERObjectIdentifier, et.asn1.ASN1Object),
    et.asn1.DEREnumerated = function(t) {
        et.asn1.DEREnumerated.superclass.constructor.call(this),
        this.hT = "0a",
        this.setByBigInteger = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.hV = et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
        }
        ,
        this.setByInteger = function(t) {
            var e = new O(String(t),10);
            this.setByBigInteger(e)
        }
        ,
        this.setValueHex = function(t) {
            this.hV = t
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
        ,
        void 0 !== t && (void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
    }
    ,
    tt.lang.extend(et.asn1.DEREnumerated, et.asn1.ASN1Object),
    et.asn1.DERUTF8String = function(t) {
        et.asn1.DERUTF8String.superclass.constructor.call(this, t),
        this.hT = "0c"
    }
    ,
    tt.lang.extend(et.asn1.DERUTF8String, et.asn1.DERAbstractString),
    et.asn1.DERNumericString = function(t) {
        et.asn1.DERNumericString.superclass.constructor.call(this, t),
        this.hT = "12"
    }
    ,
    tt.lang.extend(et.asn1.DERNumericString, et.asn1.DERAbstractString),
    et.asn1.DERPrintableString = function(t) {
        et.asn1.DERPrintableString.superclass.constructor.call(this, t),
        this.hT = "13"
    }
    ,
    tt.lang.extend(et.asn1.DERPrintableString, et.asn1.DERAbstractString),
    et.asn1.DERTeletexString = function(t) {
        et.asn1.DERTeletexString.superclass.constructor.call(this, t),
        this.hT = "14"
    }
    ,
    tt.lang.extend(et.asn1.DERTeletexString, et.asn1.DERAbstractString),
    et.asn1.DERIA5String = function(t) {
        et.asn1.DERIA5String.superclass.constructor.call(this, t),
        this.hT = "16"
    }
    ,
    tt.lang.extend(et.asn1.DERIA5String, et.asn1.DERAbstractString),
    et.asn1.DERUTCTime = function(t) {
        et.asn1.DERUTCTime.superclass.constructor.call(this, t),
        this.hT = "17",
        this.setByDate = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.date = t,
            this.s = this.formatDate(this.date, "utc"),
            this.hV = stohex(this.s)
        }
        ,
        this.getFreshValueHex = function() {
            return void 0 === this.date && void 0 === this.s && (this.date = new Date,
            this.s = this.formatDate(this.date, "utc"),
            this.hV = stohex(this.s)),
            this.hV
        }
        ,
        void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{12}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
    }
    ,
    tt.lang.extend(et.asn1.DERUTCTime, et.asn1.DERAbstractTime),
    et.asn1.DERGeneralizedTime = function(t) {
        et.asn1.DERGeneralizedTime.superclass.constructor.call(this, t),
        this.hT = "18",
        this.withMillis = !1,
        this.setByDate = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.date = t,
            this.s = this.formatDate(this.date, "gen", this.withMillis),
            this.hV = stohex(this.s)
        }
        ,
        this.getFreshValueHex = function() {
            return void 0 === this.date && void 0 === this.s && (this.date = new Date,
            this.s = this.formatDate(this.date, "gen", this.withMillis),
            this.hV = stohex(this.s)),
            this.hV
        }
        ,
        void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{14}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date),
        !0 === t.millis && (this.withMillis = !0))
    }
    ,
    tt.lang.extend(et.asn1.DERGeneralizedTime, et.asn1.DERAbstractTime),
    et.asn1.DERSequence = function(t) {
        et.asn1.DERSequence.superclass.constructor.call(this, t),
        this.hT = "30",
        this.getFreshValueHex = function() {
            for (var t = "", e = 0; e < this.asn1Array.length; e++) {
                t += this.asn1Array[e].getEncodedHex()
            }
            return this.hV = t,
            this.hV
        }
    }
    ,
    tt.lang.extend(et.asn1.DERSequence, et.asn1.DERAbstractStructured),
    et.asn1.DERSet = function(t) {
        et.asn1.DERSet.superclass.constructor.call(this, t),
        this.hT = "31",
        this.sortFlag = !0,
        this.getFreshValueHex = function() {
            for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
                var i = this.asn1Array[e];
                t.push(i.getEncodedHex())
            }
            return 1 == this.sortFlag && t.sort(),
            this.hV = t.join(""),
            this.hV
        }
        ,
        void 0 !== t && void 0 !== t.sortflag && 0 == t.sortflag && (this.sortFlag = !1)
    }
    ,
    tt.lang.extend(et.asn1.DERSet, et.asn1.DERAbstractStructured),
    et.asn1.DERTaggedObject = function(t) {
        et.asn1.DERTaggedObject.superclass.constructor.call(this),
        this.hT = "a0",
        this.hV = "",
        this.isExplicit = !0,
        this.asn1Object = null,
        this.setASN1Object = function(t, e, i) {
            this.hT = e,
            this.isExplicit = t,
            this.asn1Object = i,
            this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
            this.hTLV = null,
            this.isModified = !0) : (this.hV = null,
            this.hTLV = i.getEncodedHex(),
            this.hTLV = this.hTLV.replace(/^../, e),
            this.isModified = !1)
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
        ,
        void 0 !== t && (void 0 !== t.tag && (this.hT = t.tag),
        void 0 !== t.explicit && (this.isExplicit = t.explicit),
        void 0 !== t.obj && (this.asn1Object = t.obj,
        this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
    }
    ,
    tt.lang.extend(et.asn1.DERTaggedObject, et.asn1.ASN1Object);
    var it = function(i) {
        function r(t) {
            var e = i.call(this) || this;
            return t && ("string" == typeof t ? e.parseKey(t) : (r.hasPrivateKeyProperty(t) || r.hasPublicKeyProperty(t)) && e.parsePropertiesFrom(t)),
            e
        }
        return function(t, e) {
            function i() {
                this.constructor = t
            }
            p(t, e),
            t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
            new i)
        }(r, i),
        r.prototype.parseKey = function(t) {
            try {
                var e = 0
                  , i = 0
                  , r = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? d(t) : v.unarmor(t)
                  , n = x.decode(r);
                if (3 === n.sub.length && (n = n.sub[2].sub[0]),
                9 === n.sub.length) {
                    e = n.sub[1].getHexStringValue(),
                    this.n = q(e, 16),
                    i = n.sub[2].getHexStringValue(),
                    this.e = parseInt(i, 16);
                    var s = n.sub[3].getHexStringValue();
                    this.d = q(s, 16);
                    var o = n.sub[4].getHexStringValue();
                    this.p = q(o, 16);
                    var h = n.sub[5].getHexStringValue();
                    this.q = q(h, 16);
                    var a = n.sub[6].getHexStringValue();
                    this.dmp1 = q(a, 16);
                    var u = n.sub[7].getHexStringValue();
                    this.dmq1 = q(u, 16);
                    var c = n.sub[8].getHexStringValue();
                    this.coeff = q(c, 16)
                } else {
                    if (2 !== n.sub.length)
                        return !1;
                    var f = n.sub[1].sub[0];
                    e = f.sub[0].getHexStringValue(),
                    this.n = q(e, 16),
                    i = f.sub[1].getHexStringValue(),
                    this.e = parseInt(i, 16)
                }
                return !0
            } catch (t) {
                return !1
            }
        }
        ,
        r.prototype.getPrivateBaseKey = function() {
            var t = {
                array: [new et.asn1.DERInteger({
                    int: 0
                }), new et.asn1.DERInteger({
                    bigint: this.n
                }), new et.asn1.DERInteger({
                    int: this.e
                }), new et.asn1.DERInteger({
                    bigint: this.d
                }), new et.asn1.DERInteger({
                    bigint: this.p
                }), new et.asn1.DERInteger({
                    bigint: this.q
                }), new et.asn1.DERInteger({
                    bigint: this.dmp1
                }), new et.asn1.DERInteger({
                    bigint: this.dmq1
                }), new et.asn1.DERInteger({
                    bigint: this.coeff
                })]
            };
            return new et.asn1.DERSequence(t).getEncodedHex()
        }
        ,
        r.prototype.getPrivateBaseKeyB64 = function() {
            return c(this.getPrivateBaseKey())
        }
        ,
        r.prototype.getPublicBaseKey = function() {
            var t = new et.asn1.DERSequence({
                array: [new et.asn1.DERObjectIdentifier({
                    oid: "1.2.840.113549.1.1.1"
                }), new et.asn1.DERNull]
            })
              , e = new et.asn1.DERSequence({
                array: [new et.asn1.DERInteger({
                    bigint: this.n
                }), new et.asn1.DERInteger({
                    int: this.e
                })]
            })
              , i = new et.asn1.DERBitString({
                hex: "00" + e.getEncodedHex()
            });
            return new et.asn1.DERSequence({
                array: [t, i]
            }).getEncodedHex()
        }
        ,
        r.prototype.getPublicBaseKeyB64 = function() {
            return c(this.getPublicBaseKey())
        }
        ,
        r.wordwrap = function(t, e) {
            if (!t)
                return t;
            var i = "(.{1," + (e = e || 64) + "})( +|$\n?)|(.{1," + e + "})";
            return t.match(RegExp(i, "g")).join("\n")
        }
        ,
        r.prototype.getPrivateKey = function() {
            var t = "-----BEGIN RSA PRIVATE KEY-----\n";
            return t += r.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
            t += "-----END RSA PRIVATE KEY-----"
        }
        ,
        r.prototype.getPublicKey = function() {
            var t = "-----BEGIN PUBLIC KEY-----\n";
            return t += r.wordwrap(this.getPublicBaseKeyB64()) + "\n",
            t += "-----END PUBLIC KEY-----"
        }
        ,
        r.hasPublicKeyProperty = function(t) {
            return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e")
        }
        ,
        r.hasPrivateKeyProperty = function(t) {
            return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
        }
        ,
        r.prototype.parsePropertiesFrom = function(t) {
            this.n = t.n,
            this.e = t.e,
            t.hasOwnProperty("d") && (this.d = t.d,
            this.p = t.p,
            this.q = t.q,
            this.dmp1 = t.dmp1,
            this.dmq1 = t.dmq1,
            this.coeff = t.coeff)
        }
        ,
        r
    }(Q)
      , rt = function() {
        function t(t) {
            t = t || {},
            this.default_key_size = parseInt(t.default_key_size, 10) || 1024,
            this.default_public_exponent = t.default_public_exponent || "010001",
            this.log = t.log || !1,
            this.key = null
        }
        return t.prototype.setKey = function(t) {
            this.log && this.key && console.warn("A key was already set, overriding existing."),
            this.key = new it(t)
        }
        ,
        t.prototype.setPrivateKey = function(t) {
            this.setKey(t)
        }
        ,
        t.prototype.setPublicKey = function(t) {
            this.setKey(t)
        }
        ,
        t.prototype.decrypt = function(t) {
            try {
                return this.getKey().decrypt(f(t))
            } catch (t) {
                return !1
            }
        }
        ,
        t.prototype.encrypt = function(t) {
            try {
                return c(this.getKey().encrypt(t))
            } catch (t) {
                return !1
            }
        }
        ,
        t.prototype.sign = function(t, e, i) {
            try {
                return c(this.getKey().sign(t, e, i))
            } catch (t) {
                return !1
            }
        }
        ,
        t.prototype.verify = function(t, e, i) {
            try {
                return this.getKey().verify(t, f(e), i)
            } catch (t) {
                return !1
            }
        }
        ,
        t.prototype.getKey = function(t) {
            if (!this.key) {
                if (this.key = new it,
                t && "[object Function]" === {}.toString.call(t))
                    return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
                this.key.generate(this.default_key_size, this.default_public_exponent)
            }
            return this.key
        }
        ,
        t.prototype.getPrivateKey = function() {
            return this.getKey().getPrivateKey()
        }
        ,
        t.prototype.getPrivateKeyB64 = function() {
            return this.getKey().getPrivateBaseKeyB64()
        }
        ,
        t.prototype.getPublicKey = function() {
            return this.getKey().getPublicKey()
        }
        ,
        t.prototype.getPublicKeyB64 = function() {
            return this.getKey().getPublicBaseKeyB64()
        }
        ,
        t.version = "3.0.0-rc.1",
        t
    }();
    window.JSEncrypt = rt,
    t.JSEncrypt = rt,
    t.default = rt,
    Object.defineProperty(t, "__esModule", {
        value: !0
    })
});

if (YAHOO === undefined) {
    var YAHOO = {}
}
YAHOO.lang = {
    extend: function(g, h, f) {
        if (!h || !g) {
            throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.")
        }
        var d = function() {};
        d.prototype = h.prototype;
        g.prototype = new d();
        g.prototype.constructor = g;
        g.superclass = h.prototype;
        if (h.prototype.constructor == Object.prototype.constructor) {
            h.prototype.constructor = h
        }
        if (f) {
            var b;
            for (b in f) {
                g.prototype[b] = f[b]
            }
            var e = function() {}
              , c = ["toString", "valueOf"];
            try {
                if (/MSIE/.test(navigator.userAgent)) {
                    e = function(j, i) {
                        for (b = 0; b < c.length; b = b + 1) {
                            var l = c[b]
                              , k = i[l];
                            if (typeof k === "function" && k != Object.prototype[l]) {
                                j[l] = k
                            }
                        }
                    }
                }
            } catch (a) {}
            e(g.prototype, f)
        }
    }
};

CryptoJS = CryptoJS || (function(e, g) {
    var a = {};
    var b = a.lib = {};
    var j = b.Base = (function() {
        function n() {}
        return {
            extend: function(p) {
                n.prototype = this;
                var o = new n();
                if (p) {
                    o.mixIn(p)
                }
                if (!o.hasOwnProperty("init")) {
                    o.init = function() {
                        o.$super.init.apply(this, arguments)
                    }
                }
                o.init.prototype = o;
                o.$super = this;
                return o
            },
            create: function() {
                var o = this.extend();
                o.init.apply(o, arguments);
                return o
            },
            init: function() {},
            mixIn: function(p) {
                for (var o in p) {
                    if (p.hasOwnProperty(o)) {
                        this[o] = p[o]
                    }
                }
                if (p.hasOwnProperty("toString")) {
                    this.toString = p.toString
                }
            },
            clone: function() {
                return this.init.prototype.extend(this)
            }
        }
    }());
    var l = b.WordArray = j.extend({
        init: function(o, n) {
            o = this.words = o || [];
            if (n != g) {
                this.sigBytes = n
            } else {
                this.sigBytes = o.length * 4
            }
        },
        toString: function(n) {
            return (n || h).stringify(this)
        },
        concat: function(t) {
            var q = this.words;
            var p = t.words;
            var n = this.sigBytes;
            var s = t.sigBytes;
            this.clamp();
            if (n % 4) {
                for (var r = 0; r < s; r++) {
                    var o = (p[r >>> 2] >>> (24 - (r % 4) * 8)) & 255;
                    q[(n + r) >>> 2] |= o << (24 - ((n + r) % 4) * 8)
                }
            } else {
                for (var r = 0; r < s; r += 4) {
                    q[(n + r) >>> 2] = p[r >>> 2]
                }
            }
            this.sigBytes += s;
            return this
        },
        clamp: function() {
            var o = this.words;
            var n = this.sigBytes;
            o[n >>> 2] &= 4294967295 << (32 - (n % 4) * 8);
            o.length = e.ceil(n / 4)
        },
        clone: function() {
            var n = j.clone.call(this);
            n.words = this.words.slice(0);
            return n
        },
        random: function(p) {
            var o = [];
            for (var n = 0; n < p; n += 4) {
                o.push((e.random() * 4294967296) | 0)
            }
            return new l.init(o,p)
        }
    });
    var m = a.enc = {};
    var h = m.Hex = {
        stringify: function(p) {
            var r = p.words;
            var o = p.sigBytes;
            var q = [];
            for (var n = 0; n < o; n++) {
                var s = (r[n >>> 2] >>> (24 - (n % 4) * 8)) & 255;
                q.push((s >>> 4).toString(16));
                q.push((s & 15).toString(16))
            }
            return q.join("")
        },
        parse: function(p) {
            var n = p.length;
            var q = [];
            for (var o = 0; o < n; o += 2) {
                q[o >>> 3] |= parseInt(p.substr(o, 2), 16) << (24 - (o % 8) * 4)
            }
            return new l.init(q,n / 2)
        }
    };
    var d = m.Latin1 = {
        stringify: function(q) {
            var r = q.words;
            var p = q.sigBytes;
            var n = [];
            for (var o = 0; o < p; o++) {
                var s = (r[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
                n.push(String.fromCharCode(s))
            }
            return n.join("")
        },
        parse: function(p) {
            var n = p.length;
            var q = [];
            for (var o = 0; o < n; o++) {
                q[o >>> 2] |= (p.charCodeAt(o) & 255) << (24 - (o % 4) * 8)
            }
            return new l.init(q,n)
        }
    };
    var c = m.Utf8 = {
        stringify: function(n) {
            try {
                return decodeURIComponent(escape(d.stringify(n)))
            } catch (o) {
                throw new Error("Malformed UTF-8 data")
            }
        },
        parse: function(n) {
            return d.parse(unescape(encodeURIComponent(n)))
        }
    };
    var i = b.BufferedBlockAlgorithm = j.extend({
        reset: function() {
            this._data = new l.init();
            this._nDataBytes = 0
        },
        _append: function(n) {
            if (typeof n == "string") {
                n = c.parse(n)
            }
            this._data.concat(n);
            this._nDataBytes += n.sigBytes
        },
        _process: function(w) {
            var q = this._data;
            var x = q.words;
            var n = q.sigBytes;
            var t = this.blockSize;
            var v = t * 4;
            var u = n / v;
            if (w) {
                u = e.ceil(u)
            } else {
                u = e.max((u | 0) - this._minBufferSize, 0)
            }
            var s = u * t;
            var r = e.min(s * 4, n);
            if (s) {
                for (var p = 0; p < s; p += t) {
                    this._doProcessBlock(x, p)
                }
                var o = x.splice(0, s);
                q.sigBytes -= r
            }
            return new l.init(o,r)
        },
        clone: function() {
            var n = j.clone.call(this);
            n._data = this._data.clone();
            return n
        },
        _minBufferSize: 0
    });
    var f = b.Hasher = i.extend({
        cfg: j.extend(),
        init: function(n) {
            this.cfg = this.cfg.extend(n);
            this.reset()
        },
        reset: function() {
            i.reset.call(this);
            this._doReset()
        },
        update: function(n) {
            this._append(n);
            this._process();
            return this
        },
        finalize: function(n) {
            if (n) {
                this._append(n)
            }
            var o = this._doFinalize();
            return o
        },
        blockSize: 512 / 32,
        _createHelper: function(n) {
            return function(p, o) {
                return new n.init(o).finalize(p)
            }
        },
        _createHmacHelper: function(n) {
            return function(p, o) {
                return new k.HMAC.init(n,o).finalize(p)
            }
        }
    });
    var k = a.algo = {};
    return a
}(Math));
(function(g) {
    var a = CryptoJS
      , f = a.lib
      , e = f.Base
      , h = f.WordArray
      , a = a.x64 = {};
    a.Word = e.extend({
        init: function(b, c) {
            this.high = b;
            this.low = c
        }
    });
    a.WordArray = e.extend({
        init: function(b, c) {
            b = this.words = b || [];
            this.sigBytes = c != g ? c : 8 * b.length
        },
        toX32: function() {
            for (var b = this.words, c = b.length, a = [], d = 0; d < c; d++) {
                var e = b[d];
                a.push(e.high);
                a.push(e.low)
            }
            return h.create(a, this.sigBytes)
        },
        clone: function() {
            for (var b = e.clone.call(this), c = b.words = this.words.slice(0), a = c.length, d = 0; d < a; d++)
                c[d] = c[d].clone();
            return b
        }
    })
}
)();

CryptoJS.lib.Cipher || function(u) {
    var g = CryptoJS
      , f = g.lib
      , k = f.Base
      , l = f.WordArray
      , q = f.BufferedBlockAlgorithm
      , r = g.enc.Base64
      , v = g.algo.EvpKDF
      , n = f.Cipher = q.extend({
        cfg: k.extend(),
        createEncryptor: function(a, b) {
            return this.create(this._ENC_XFORM_MODE, a, b)
        },
        createDecryptor: function(a, b) {
            return this.create(this._DEC_XFORM_MODE, a, b)
        },
        init: function(a, b, c) {
            this.cfg = this.cfg.extend(c);
            this._xformMode = a;
            this._key = b;
            this.reset()
        },
        reset: function() {
            q.reset.call(this);
            this._doReset()
        },
        process: function(a) {
            this._append(a);
            return this._process()
        },
        finalize: function(a) {
            a && this._append(a);
            return this._doFinalize()
        },
        keySize: 4,
        ivSize: 4,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function(a) {
            return {
                encrypt: function(b, c, d) {
                    return ("string" == typeof c ? s : j).encrypt(a, b, c, d)
                },
                decrypt: function(b, c, d) {
                    return ("string" == typeof c ? s : j).decrypt(a, b, c, d)
                }
            }
        }
    });
    f.StreamCipher = n.extend({
        _doFinalize: function() {
            return this._process(!0)
        },
        blockSize: 1
    });
    var m = g.mode = {}
      , t = function(a, b, c) {
        var d = this._iv;
        d ? this._iv = u : d = this._prevBlock;
        for (var e = 0; e < c; e++)
            a[b + e] ^= d[e]
    }
      , h = (f.BlockCipherMode = k.extend({
        createEncryptor: function(a, b) {
            return this.Encryptor.create(a, b)
        },
        createDecryptor: function(a, b) {
            return this.Decryptor.create(a, b)
        },
        init: function(a, b) {
            this._cipher = a;
            this._iv = b
        }
    })).extend();
    h.Encryptor = h.extend({
        processBlock: function(a, b) {
            var c = this._cipher
              , d = c.blockSize;
            t.call(this, a, b, d);
            c.encryptBlock(a, b);
            this._prevBlock = a.slice(b, b + d)
        }
    });
    h.Decryptor = h.extend({
        processBlock: function(a, b) {
            var c = this._cipher
              , d = c.blockSize
              , e = a.slice(b, b + d);
            c.decryptBlock(a, b);
            t.call(this, a, b, d);
            this._prevBlock = e
        }
    });
    m = m.CBC = h;
    h = (g.pad = {}).Pkcs7 = {
        pad: function(a, b) {
            for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, e = [], f = 0; f < c; f += 4)
                e.push(d);
            c = l.create(e, c);
            a.concat(c)
        },
        unpad: function(a) {
            a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255
        }
    };
    f.BlockCipher = n.extend({
        cfg: n.cfg.extend({
            mode: m,
            padding: h
        }),
        reset: function() {
            n.reset.call(this);
            var a = this.cfg
              , b = a.iv
              , a = a.mode;
            if (this._xformMode == this._ENC_XFORM_MODE)
                var c = a.createEncryptor;
            else
                c = a.createDecryptor,
                this._minBufferSize = 1;
            this._mode = c.call(a, this, b && b.words)
        },
        _doProcessBlock: function(a, b) {
            this._mode.processBlock(a, b)
        },
        _doFinalize: function() {
            var a = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
                a.pad(this._data, this.blockSize);
                var b = this._process(!0)
            } else
                b = this._process(!0),
                a.unpad(b);
            return b
        },
        blockSize: 4
    });
    var p = f.CipherParams = k.extend({
        init: function(a) {
            this.mixIn(a)
        },
        toString: function(a) {
            return (a || this.formatter).stringify(this)
        }
    })
      , m = (g.format = {}).OpenSSL = {
        stringify: function(a) {
            var b = a.ciphertext;
            a = a.salt;
            return (a ? l.create([1398893684, 1701076831]).concat(a).concat(b) : b).toString(r)
        },
        parse: function(a) {
            a = r.parse(a);
            var b = a.words;
            if (1398893684 == b[0] && 1701076831 == b[1]) {
                var c = l.create(b.slice(2, 4));
                b.splice(0, 4);
                a.sigBytes -= 16
            }
            return p.create({
                ciphertext: a,
                salt: c
            })
        }
    }
      , j = f.SerializableCipher = k.extend({
        cfg: k.extend({
            format: m
        }),
        encrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            var e = a.createEncryptor(c, d);
            b = e.finalize(b);
            e = e.cfg;
            return p.create({
                ciphertext: b,
                key: c,
                iv: e.iv,
                algorithm: a,
                mode: e.mode,
                padding: e.padding,
                blockSize: a.blockSize,
                formatter: d.format
            })
        },
        decrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            b = this._parse(b, d.format);
            return a.createDecryptor(c, d).finalize(b.ciphertext)
        },
        _parse: function(a, b) {
            return "string" == typeof a ? b.parse(a, this) : a
        }
    })
      , g = (g.kdf = {}).OpenSSL = {
        execute: function(a, b, c, d) {
            d || (d = l.random(8));
            a = v.create({
                keySize: b + c
            }).compute(a, d);
            c = l.create(a.words.slice(b), 4 * c);
            a.sigBytes = 4 * b;
            return p.create({
                key: a,
                iv: c,
                salt: d
            })
        }
    }
      , s = f.PasswordBasedCipher = j.extend({
        cfg: j.cfg.extend({
            kdf: g
        }),
        encrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            c = d.kdf.execute(c, a.keySize, a.ivSize);
            d.iv = c.iv;
            a = j.encrypt.call(this, a, b, c.key, d);
            a.mixIn(c);
            return a
        },
        decrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            b = this._parse(b, d.format);
            c = d.kdf.execute(c, a.keySize, a.ivSize, b.salt);
            d.iv = c.iv;
            return j.decrypt.call(this, a, b, c.key, d)
        }
    })
}();

(function() {
    for (var q = CryptoJS, x = q.lib.BlockCipher, r = q.algo, j = [], y = [], z = [], A = [], B = [], C = [], s = [], u = [], v = [], w = [], g = [], k = 0; 256 > k; k++)
        g[k] = 128 > k ? k << 1 : k << 1 ^ 283;
    for (var n = 0, l = 0, k = 0; 256 > k; k++) {
        var f = l ^ l << 1 ^ l << 2 ^ l << 3 ^ l << 4
          , f = f >>> 8 ^ f & 255 ^ 99;
        j[n] = f;
        y[f] = n;
        var t = g[n]
          , D = g[t]
          , E = g[D]
          , b = 257 * g[f] ^ 16843008 * f;
        z[n] = b << 24 | b >>> 8;
        A[n] = b << 16 | b >>> 16;
        B[n] = b << 8 | b >>> 24;
        C[n] = b;
        b = 16843009 * E ^ 65537 * D ^ 257 * t ^ 16843008 * n;
        s[f] = b << 24 | b >>> 8;
        u[f] = b << 16 | b >>> 16;
        v[f] = b << 8 | b >>> 24;
        w[f] = b;
        n ? (n = t ^ g[g[g[E ^ t]]],
        l ^= g[g[l]]) : n = l = 1
    }
    var F = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]
      , r = r.AES = x.extend({
        _doReset: function() {
            for (var c = this._key, e = c.words, a = c.sigBytes / 4, c = 4 * ((this._nRounds = a + 6) + 1), b = this._keySchedule = [], h = 0; h < c; h++)
                if (h < a)
                    b[h] = e[h];
                else {
                    var d = b[h - 1];
                    h % a ? 6 < a && 4 == h % a && (d = j[d >>> 24] << 24 | j[d >>> 16 & 255] << 16 | j[d >>> 8 & 255] << 8 | j[d & 255]) : (d = d << 8 | d >>> 24,
                    d = j[d >>> 24] << 24 | j[d >>> 16 & 255] << 16 | j[d >>> 8 & 255] << 8 | j[d & 255],
                    d ^= F[h / a | 0] << 24);
                    b[h] = b[h - a] ^ d
                }
            e = this._invKeySchedule = [];
            for (a = 0; a < c; a++)
                h = c - a,
                d = a % 4 ? b[h] : b[h - 4],
                e[a] = 4 > a || 4 >= h ? d : s[j[d >>> 24]] ^ u[j[d >>> 16 & 255]] ^ v[j[d >>> 8 & 255]] ^ w[j[d & 255]]
        },
        encryptBlock: function(c, e) {
            this._doCryptBlock(c, e, this._keySchedule, z, A, B, C, j)
        },
        decryptBlock: function(c, e) {
            var a = c[e + 1];
            c[e + 1] = c[e + 3];
            c[e + 3] = a;
            this._doCryptBlock(c, e, this._invKeySchedule, s, u, v, w, y);
            a = c[e + 1];
            c[e + 1] = c[e + 3];
            c[e + 3] = a
        },
        _doCryptBlock: function(c, e, a, b, h, d, j, m) {
            for (var n = this._nRounds, f = c[e] ^ a[0], g = c[e + 1] ^ a[1], k = c[e + 2] ^ a[2], p = c[e + 3] ^ a[3], l = 4, t = 1; t < n; t++)
                var q = b[f >>> 24] ^ h[g >>> 16 & 255] ^ d[k >>> 8 & 255] ^ j[p & 255] ^ a[l++]
                  , r = b[g >>> 24] ^ h[k >>> 16 & 255] ^ d[p >>> 8 & 255] ^ j[f & 255] ^ a[l++]
                  , s = b[k >>> 24] ^ h[p >>> 16 & 255] ^ d[f >>> 8 & 255] ^ j[g & 255] ^ a[l++]
                  , p = b[p >>> 24] ^ h[f >>> 16 & 255] ^ d[g >>> 8 & 255] ^ j[k & 255] ^ a[l++]
                  , f = q
                  , g = r
                  , k = s;
            q = (m[f >>> 24] << 24 | m[g >>> 16 & 255] << 16 | m[k >>> 8 & 255] << 8 | m[p & 255]) ^ a[l++];
            r = (m[g >>> 24] << 24 | m[k >>> 16 & 255] << 16 | m[p >>> 8 & 255] << 8 | m[f & 255]) ^ a[l++];
            s = (m[k >>> 24] << 24 | m[p >>> 16 & 255] << 16 | m[f >>> 8 & 255] << 8 | m[g & 255]) ^ a[l++];
            p = (m[p >>> 24] << 24 | m[f >>> 16 & 255] << 16 | m[g >>> 8 & 255] << 8 | m[k & 255]) ^ a[l++];
            c[e] = q;
            c[e + 1] = r;
            c[e + 2] = s;
            c[e + 3] = p
        },
        keySize: 8
    });
    q.AES = x._createHelper(r)
}
)();

(function() {
    var h = CryptoJS
      , j = h.lib.WordArray;
    h.enc.Base64 = {
        stringify: function(b) {
            var e = b.words
              , f = b.sigBytes
              , c = this._map;
            b.clamp();
            b = [];
            for (var a = 0; a < f; a += 3)
                for (var d = (e[a >>> 2] >>> 24 - 8 * (a % 4) & 255) << 16 | (e[a + 1 >>> 2] >>> 24 - 8 * ((a + 1) % 4) & 255) << 8 | e[a + 2 >>> 2] >>> 24 - 8 * ((a + 2) % 4) & 255, g = 0; 4 > g && a + 0.75 * g < f; g++)
                    b.push(c.charAt(d >>> 6 * (3 - g) & 63));
            if (e = c.charAt(64))
                for (; b.length % 4; )
                    b.push(e);
            return b.join("")
        },
        parse: function(b) {
            var e = b.length
              , f = this._map
              , c = f.charAt(64);
            c && (c = b.indexOf(c),
            -1 != c && (e = c));
            for (var c = [], a = 0, d = 0; d < e; d++)
                if (d % 4) {
                    var g = f.indexOf(b.charAt(d - 1)) << 2 * (d % 4)
                      , h = f.indexOf(b.charAt(d)) >>> 6 - 2 * (d % 4);
                    c[a >>> 2] |= (g | h) << 24 - 8 * (a % 4);
                    a++
                }
            return j.create(c, a)
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
}
)();

(function() {
    var k = CryptoJS
      , b = k.lib
      , m = b.WordArray
      , l = b.Hasher
      , d = []
      , b = k.algo.SHA1 = l.extend({
        _doReset: function() {
            this._hash = new m.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
        },
        _doProcessBlock: function(n, p) {
            for (var a = this._hash.words, e = a[0], f = a[1], h = a[2], j = a[3], b = a[4], c = 0; 80 > c; c++) {
                if (16 > c)
                    d[c] = n[p + c] | 0;
                else {
                    var g = d[c - 3] ^ d[c - 8] ^ d[c - 14] ^ d[c - 16];
                    d[c] = g << 1 | g >>> 31
                }
                g = (e << 5 | e >>> 27) + b + d[c];
                g = 20 > c ? g + ((f & h | ~f & j) + 1518500249) : 40 > c ? g + ((f ^ h ^ j) + 1859775393) : 60 > c ? g + ((f & h | f & j | h & j) - 1894007588) : g + ((f ^ h ^ j) - 899497514);
                b = j;
                j = h;
                h = f << 30 | f >>> 2;
                f = e;
                e = g
            }
            a[0] = a[0] + e | 0;
            a[1] = a[1] + f | 0;
            a[2] = a[2] + h | 0;
            a[3] = a[3] + j | 0;
            a[4] = a[4] + b | 0
        },
        _doFinalize: function() {
            var b = this._data
              , d = b.words
              , a = 8 * this._nDataBytes
              , e = 8 * b.sigBytes;
            d[e >>> 5] |= 128 << 24 - e % 32;
            d[(e + 64 >>> 9 << 4) + 14] = Math.floor(a / 4294967296);
            d[(e + 64 >>> 9 << 4) + 15] = a;
            b.sigBytes = 4 * d.length;
            this._process();
            return this._hash
        },
        clone: function() {
            var b = l.clone.call(this);
            b._hash = this._hash.clone();
            return b
        }
    });
    k.SHA1 = l._createHelper(b);
    k.HmacSHA1 = l._createHmacHelper(b)
}
)();

(function() {
    var b = CryptoJS
      , a = b.lib
      , d = a.Base
      , m = a.WordArray
      , a = b.algo
      , q = a.HMAC
      , l = a.PBKDF2 = d.extend({
        cfg: d.extend({
            keySize: 4,
            hasher: a.SHA1,
            iterations: 1
        }),
        init: function(a) {
            this.cfg = this.cfg.extend(a)
        },
        compute: function(a, b) {
            for (var c = this.cfg, f = q.create(c.hasher, a), g = m.create(), d = m.create([1]), l = g.words, r = d.words, n = c.keySize, c = c.iterations; l.length < n; ) {
                var h = f.update(b).finalize(d);
                f.reset();
                for (var j = h.words, s = j.length, k = h, p = 1; p < c; p++) {
                    k = f.finalize(k);
                    f.reset();
                    for (var t = k.words, e = 0; e < s; e++)
                        j[e] ^= t[e]
                }
                g.concat(h);
                r[0]++
            }
            g.sigBytes = 4 * n;
            return g
        }
    });
    b.PBKDF2 = function(a, b, c) {
        return l.create(c).compute(a, b)
    }
}
)();
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
function hex2b64(d) {
    var b;
    var e;
    var a = "";
    for (b = 0; b + 3 <= d.length; b += 3) {
        e = parseInt(d.substring(b, b + 3), 16);
        a += b64map.charAt(e >> 6) + b64map.charAt(e & 63)
    }
    if (b + 1 == d.length) {
        e = parseInt(d.substring(b, b + 1), 16);
        a += b64map.charAt(e << 2)
    } else {
        if (b + 2 == d.length) {
            e = parseInt(d.substring(b, b + 2), 16);
            a += b64map.charAt(e >> 2) + b64map.charAt((e & 3) << 4)
        }
    }
    if (b64pad) {
        while ((a.length & 3) > 0) {
            a += b64pad
        }
    }
    return a
}
function b64tohex(f) {
    var d = "";
    var e;
    var b = 0;
    var c;
    var a;
    for (e = 0; e < f.length; ++e) {
        if (f.charAt(e) == b64pad) {
            break
        }
        a = b64map.indexOf(f.charAt(e));
        if (a < 0) {
            continue
        }
        if (b == 0) {
            d += int2char(a >> 2);
            c = a & 3;
            b = 1
        } else {
            if (b == 1) {
                d += int2char((c << 2) | (a >> 4));
                c = a & 15;
                b = 2
            } else {
                if (b == 2) {
                    d += int2char(c);
                    d += int2char(a >> 2);
                    c = a & 3;
                    b = 3
                } else {
                    d += int2char((c << 2) | (a >> 4));
                    d += int2char(a & 15);
                    b = 0
                }
            }
        }
    }
    if (b == 1) {
        d += int2char(c << 2)
    }
    return d
}
function b64toBA(e) {
    var d = b64tohex(e);
    var c;
    var b = new Array();
    for (c = 0; 2 * c < d.length; ++c) {
        b[c] = parseInt(d.substring(2 * c, 2 * c + 2), 16)
    }
    return b
}
;var dbits;
var canary = 244837814094590;
var j_lm = ((canary & 16777215) == 15715070);
function BigInteger(e, d, f) {
    if (e != null) {
        if ("number" == typeof e) {
            this.fromNumber(e, d, f)
        } else {
            if (d == null && "string" != typeof e) {
                this.fromString(e, 256)
            } else {
                this.fromString(e, d)
            }
        }
    }
}
function nbi() {
    return new BigInteger(null)
}
function am1(f, a, b, e, h, g) {
    while (--g >= 0) {
        var d = a * this[f++] + b[e] + h;
        h = Math.floor(d / 67108864);
        b[e++] = d & 67108863
    }
    return h
}
function am2(f, q, r, e, o, a) {
    var k = q & 32767
      , p = q >> 15;
    while (--a >= 0) {
        var d = this[f] & 32767;
        var g = this[f++] >> 15;
        var b = p * d + g * k;
        d = k * d + ((b & 32767) << 15) + r[e] + (o & 1073741823);
        o = (d >>> 30) + (b >>> 15) + p * g + (o >>> 30);
        r[e++] = d & 1073741823
    }
    return o
}
function am3(f, q, r, e, o, a) {
    var k = q & 16383
      , p = q >> 14;
    while (--a >= 0) {
        var d = this[f] & 16383;
        var g = this[f++] >> 14;
        var b = p * d + g * k;
        d = k * d + ((b & 16383) << 14) + r[e] + o;
        o = (d >> 28) + (b >> 14) + p * g;
        r[e++] = d & 268435455
    }
    return o
}
if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30
} else {
    if (j_lm && (navigator.appName != "Netscape")) {
        BigInteger.prototype.am = am1;
        dbits = 26
    } else {
        BigInteger.prototype.am = am3;
        dbits = 28
    }
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1 << dbits) - 1);
BigInteger.prototype.DV = (1 << dbits);
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
    BI_RC[rr++] = vv
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv
}
function int2char(a) {
    return BI_RM.charAt(a)
}
function intAt(b, a) {
    var d = BI_RC[b.charCodeAt(a)];
    return (d == null) ? -1 : d
}
function bnpCopyTo(b) {
    for (var a = this.t - 1; a >= 0; --a) {
        b[a] = this[a]
    }
    b.t = this.t;
    b.s = this.s
}
function bnpFromInt(a) {
    this.t = 1;
    this.s = (a < 0) ? -1 : 0;
    if (a > 0) {
        this[0] = a
    } else {
        if (a < -1) {
            this[0] = a + this.DV
        } else {
            this.t = 0
        }
    }
}
function nbv(a) {
    var b = nbi();
    b.fromInt(a);
    return b
}
function bnpFromString(h, c) {
    var e;
    if (c == 16) {
        e = 4
    } else {
        if (c == 8) {
            e = 3
        } else {
            if (c == 256) {
                e = 8
            } else {
                if (c == 2) {
                    e = 1
                } else {
                    if (c == 32) {
                        e = 5
                    } else {
                        if (c == 4) {
                            e = 2
                        } else {
                            this.fromRadix(h, c);
                            return
                        }
                    }
                }
            }
        }
    }
    this.t = 0;
    this.s = 0;
    var g = h.length
      , d = false
      , f = 0;
    while (--g >= 0) {
        var a = (e == 8) ? h[g] & 255 : intAt(h, g);
        if (a < 0) {
            if (h.charAt(g) == "-") {
                d = true
            }
            continue
        }
        d = false;
        if (f == 0) {
            this[this.t++] = a
        } else {
            if (f + e > this.DB) {
                this[this.t - 1] |= (a & ((1 << (this.DB - f)) - 1)) << f;
                this[this.t++] = (a >> (this.DB - f))
            } else {
                this[this.t - 1] |= a << f
            }
        }
        f += e;
        if (f >= this.DB) {
            f -= this.DB
        }
    }
    if (e == 8 && (h[0] & 128) != 0) {
        this.s = -1;
        if (f > 0) {
            this[this.t - 1] |= ((1 << (this.DB - f)) - 1) << f
        }
    }
    this.clamp();
    if (d) {
        BigInteger.ZERO.subTo(this, this)
    }
}
function bnpClamp() {
    var a = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == a) {
        --this.t
    }
}
function bnToString(c) {
    if (this.s < 0) {
        return "-" + this.negate().toString(c)
    }
    var e;
    if (c == 16) {
        e = 4
    } else {
        if (c == 8) {
            e = 3
        } else {
            if (c == 2) {
                e = 1
            } else {
                if (c == 32) {
                    e = 5
                } else {
                    if (c == 4) {
                        e = 2
                    } else {
                        return this.toRadix(c)
                    }
                }
            }
        }
    }
    var g = (1 << e) - 1, l, a = false, h = "", f = this.t;
    var j = this.DB - (f * this.DB) % e;
    if (f-- > 0) {
        if (j < this.DB && (l = this[f] >> j) > 0) {
            a = true;
            h = int2char(l)
        }
        while (f >= 0) {
            if (j < e) {
                l = (this[f] & ((1 << j) - 1)) << (e - j);
                l |= this[--f] >> (j += this.DB - e)
            } else {
                l = (this[f] >> (j -= e)) & g;
                if (j <= 0) {
                    j += this.DB;
                    --f
                }
            }
            if (l > 0) {
                a = true
            }
            if (a) {
                h += int2char(l)
            }
        }
    }
    return a ? h : "0"
}
function bnNegate() {
    var a = nbi();
    BigInteger.ZERO.subTo(this, a);
    return a
}
function bnAbs() {
    return (this.s < 0) ? this.negate() : this
}
function bnCompareTo(b) {
    var d = this.s - b.s;
    if (d != 0) {
        return d
    }
    var c = this.t;
    d = c - b.t;
    if (d != 0) {
        return (this.s < 0) ? -d : d
    }
    while (--c >= 0) {
        if ((d = this[c] - b[c]) != 0) {
            return d
        }
    }
    return 0
}
function nbits(a) {
    var c = 1, b;
    if ((b = a >>> 16) != 0) {
        a = b;
        c += 16
    }
    if ((b = a >> 8) != 0) {
        a = b;
        c += 8
    }
    if ((b = a >> 4) != 0) {
        a = b;
        c += 4
    }
    if ((b = a >> 2) != 0) {
        a = b;
        c += 2
    }
    if ((b = a >> 1) != 0) {
        a = b;
        c += 1
    }
    return c
}
function bnBitLength() {
    if (this.t <= 0) {
        return 0
    }
    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM))
}
function bnpDLShiftTo(c, b) {
    var a;
    for (a = this.t - 1; a >= 0; --a) {
        b[a + c] = this[a]
    }
    for (a = c - 1; a >= 0; --a) {
        b[a] = 0
    }
    b.t = this.t + c;
    b.s = this.s
}
function bnpDRShiftTo(c, b) {
    for (var a = c; a < this.t; ++a) {
        b[a - c] = this[a]
    }
    b.t = Math.max(this.t - c, 0);
    b.s = this.s
}
function bnpLShiftTo(j, e) {
    var b = j % this.DB;
    var a = this.DB - b;
    var g = (1 << a) - 1;
    var f = Math.floor(j / this.DB), h = (this.s << b) & this.DM, d;
    for (d = this.t - 1; d >= 0; --d) {
        e[d + f + 1] = (this[d] >> a) | h;
        h = (this[d] & g) << b
    }
    for (d = f - 1; d >= 0; --d) {
        e[d] = 0
    }
    e[f] = h;
    e.t = this.t + f + 1;
    e.s = this.s;
    e.clamp()
}
function bnpRShiftTo(g, d) {
    d.s = this.s;
    var e = Math.floor(g / this.DB);
    if (e >= this.t) {
        d.t = 0;
        return
    }
    var b = g % this.DB;
    var a = this.DB - b;
    var f = (1 << b) - 1;
    d[0] = this[e] >> b;
    for (var c = e + 1; c < this.t; ++c) {
        d[c - e - 1] |= (this[c] & f) << a;
        d[c - e] = this[c] >> b
    }
    if (b > 0) {
        d[this.t - e - 1] |= (this.s & f) << a
    }
    d.t = this.t - e;
    d.clamp()
}
function bnpSubTo(d, f) {
    var e = 0
      , g = 0
      , b = Math.min(d.t, this.t);
    while (e < b) {
        g += this[e] - d[e];
        f[e++] = g & this.DM;
        g >>= this.DB
    }
    if (d.t < this.t) {
        g -= d.s;
        while (e < this.t) {
            g += this[e];
            f[e++] = g & this.DM;
            g >>= this.DB
        }
        g += this.s
    } else {
        g += this.s;
        while (e < d.t) {
            g -= d[e];
            f[e++] = g & this.DM;
            g >>= this.DB
        }
        g -= d.s
    }
    f.s = (g < 0) ? -1 : 0;
    if (g < -1) {
        f[e++] = this.DV + g
    } else {
        if (g > 0) {
            f[e++] = g
        }
    }
    f.t = e;
    f.clamp()
}
function bnpMultiplyTo(c, e) {
    var b = this.abs()
      , f = c.abs();
    var d = b.t;
    e.t = d + f.t;
    while (--d >= 0) {
        e[d] = 0
    }
    for (d = 0; d < f.t; ++d) {
        e[d + b.t] = b.am(0, f[d], e, d, 0, b.t)
    }
    e.s = 0;
    e.clamp();
    if (this.s != c.s) {
        BigInteger.ZERO.subTo(e, e)
    }
}
function bnpSquareTo(d) {
    var a = this.abs();
    var b = d.t = 2 * a.t;
    while (--b >= 0) {
        d[b] = 0
    }
    for (b = 0; b < a.t - 1; ++b) {
        var e = a.am(b, a[b], d, 2 * b, 0, 1);
        if ((d[b + a.t] += a.am(b + 1, 2 * a[b], d, 2 * b + 1, e, a.t - b - 1)) >= a.DV) {
            d[b + a.t] -= a.DV;
            d[b + a.t + 1] = 1
        }
    }
    if (d.t > 0) {
        d[d.t - 1] += a.am(b, a[b], d, 2 * b, 0, 1)
    }
    d.s = 0;
    d.clamp()
}
function bnpDivRemTo(n, h, g) {
    var w = n.abs();
    if (w.t <= 0) {
        return
    }
    var k = this.abs();
    if (k.t < w.t) {
        if (h != null) {
            h.fromInt(0)
        }
        if (g != null) {
            this.copyTo(g)
        }
        return
    }
    if (g == null) {
        g = nbi()
    }
    var d = nbi()
      , a = this.s
      , l = n.s;
    var v = this.DB - nbits(w[w.t - 1]);
    if (v > 0) {
        w.lShiftTo(v, d);
        k.lShiftTo(v, g)
    } else {
        w.copyTo(d);
        k.copyTo(g)
    }
    var p = d.t;
    var b = d[p - 1];
    if (b == 0) {
        return
    }
    var o = b * (1 << this.F1) + ((p > 1) ? d[p - 2] >> this.F2 : 0);
    var A = this.FV / o
      , z = (1 << this.F1) / o
      , x = 1 << this.F2;
    var u = g.t
      , s = u - p
      , f = (h == null) ? nbi() : h;
    d.dlShiftTo(s, f);
    if (g.compareTo(f) >= 0) {
        g[g.t++] = 1;
        g.subTo(f, g)
    }
    BigInteger.ONE.dlShiftTo(p, f);
    f.subTo(d, d);
    while (d.t < p) {
        d[d.t++] = 0
    }
    while (--s >= 0) {
        var c = (g[--u] == b) ? this.DM : Math.floor(g[u] * A + (g[u - 1] + x) * z);
        if ((g[u] += d.am(0, c, g, s, 0, p)) < c) {
            d.dlShiftTo(s, f);
            g.subTo(f, g);
            while (g[u] < --c) {
                g.subTo(f, g)
            }
        }
    }
    if (h != null) {
        g.drShiftTo(p, h);
        if (a != l) {
            BigInteger.ZERO.subTo(h, h)
        }
    }
    g.t = p;
    g.clamp();
    if (v > 0) {
        g.rShiftTo(v, g)
    }
    if (a < 0) {
        BigInteger.ZERO.subTo(g, g)
    }
}
function bnMod(b) {
    var c = nbi();
    this.abs().divRemTo(b, null, c);
    if (this.s < 0 && c.compareTo(BigInteger.ZERO) > 0) {
        b.subTo(c, c)
    }
    return c
}
function Classic(a) {
    this.m = a
}
function cConvert(a) {
    if (a.s < 0 || a.compareTo(this.m) >= 0) {
        return a.mod(this.m)
    } else {
        return a
    }
}
function cRevert(a) {
    return a
}
function cReduce(a) {
    a.divRemTo(this.m, null, a)
}
function cMulTo(a, c, b) {
    a.multiplyTo(c, b);
    this.reduce(b)
}
function cSqrTo(a, b) {
    a.squareTo(b);
    this.reduce(b)
}
Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;
function bnpInvDigit() {
    if (this.t < 1) {
        return 0
    }
    var a = this[0];
    if ((a & 1) == 0) {
        return 0
    }
    var b = a & 3;
    b = (b * (2 - (a & 15) * b)) & 15;
    b = (b * (2 - (a & 255) * b)) & 255;
    b = (b * (2 - (((a & 65535) * b) & 65535))) & 65535;
    b = (b * (2 - a * b % this.DV)) % this.DV;
    return (b > 0) ? this.DV - b : -b
}
function Montgomery(a) {
    this.m = a;
    this.mp = a.invDigit();
    this.mpl = this.mp & 32767;
    this.mph = this.mp >> 15;
    this.um = (1 << (a.DB - 15)) - 1;
    this.mt2 = 2 * a.t
}
function montConvert(a) {
    var b = nbi();
    a.abs().dlShiftTo(this.m.t, b);
    b.divRemTo(this.m, null, b);
    if (a.s < 0 && b.compareTo(BigInteger.ZERO) > 0) {
        this.m.subTo(b, b)
    }
    return b
}
function montRevert(a) {
    var b = nbi();
    a.copyTo(b);
    this.reduce(b);
    return b
}
function montReduce(a) {
    while (a.t <= this.mt2) {
        a[a.t++] = 0
    }
    for (var c = 0; c < this.m.t; ++c) {
        var b = a[c] & 32767;
        var d = (b * this.mpl + (((b * this.mph + (a[c] >> 15) * this.mpl) & this.um) << 15)) & a.DM;
        b = c + this.m.t;
        a[b] += this.m.am(0, d, a, c, 0, this.m.t);
        while (a[b] >= a.DV) {
            a[b] -= a.DV;
            a[++b]++
        }
    }
    a.clamp();
    a.drShiftTo(this.m.t, a);
    if (a.compareTo(this.m) >= 0) {
        a.subTo(this.m, a)
    }
}
function montSqrTo(a, b) {
    a.squareTo(b);
    this.reduce(b)
}
function montMulTo(a, c, b) {
    a.multiplyTo(c, b);
    this.reduce(b)
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;
function bnpIsEven() {
    return ((this.t > 0) ? (this[0] & 1) : this.s) == 0
}
function bnpExp(h, j) {
    if (h > 4294967295 || h < 1) {
        return BigInteger.ONE
    }
    var f = nbi()
      , a = nbi()
      , d = j.convert(this)
      , c = nbits(h) - 1;
    d.copyTo(f);
    while (--c >= 0) {
        j.sqrTo(f, a);
        if ((h & (1 << c)) > 0) {
            j.mulTo(a, d, f)
        } else {
            var b = f;
            f = a;
            a = b
        }
    }
    return j.revert(f)
}
function bnModPowInt(b, a) {
    var c;
    if (b < 256 || a.isEven()) {
        c = new Classic(a)
    } else {
        c = new Montgomery(a)
    }
    return this.exp(b, c)
}
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
function bnClone() {
    var a = nbi();
    this.copyTo(a);
    return a
}
function bnIntValue() {
    if (this.s < 0) {
        if (this.t == 1) {
            return this[0] - this.DV
        } else {
            if (this.t == 0) {
                return -1
            }
        }
    } else {
        if (this.t == 1) {
            return this[0]
        } else {
            if (this.t == 0) {
                return 0
            }
        }
    }
    return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0]
}
function bnByteValue() {
    return (this.t == 0) ? this.s : (this[0] << 24) >> 24
}
function bnShortValue() {
    return (this.t == 0) ? this.s : (this[0] << 16) >> 16
}
function bnpChunkSize(a) {
    return Math.floor(Math.LN2 * this.DB / Math.log(a))
}
function bnSigNum() {
    if (this.s < 0) {
        return -1
    } else {
        if (this.t <= 0 || (this.t == 1 && this[0] <= 0)) {
            return 0
        } else {
            return 1
        }
    }
}
function bnpToRadix(c) {
    if (c == null) {
        c = 10
    }
    if (this.signum() == 0 || c < 2 || c > 36) {
        return "0"
    }
    var f = this.chunkSize(c);
    var e = Math.pow(c, f);
    var i = nbv(e)
      , j = nbi()
      , h = nbi()
      , g = "";
    this.divRemTo(i, j, h);
    while (j.signum() > 0) {
        g = (e + h.intValue()).toString(c).substr(1) + g;
        j.divRemTo(i, j, h)
    }
    return h.intValue().toString(c) + g
}
function bnpFromRadix(m, h) {
    this.fromInt(0);
    if (h == null) {
        h = 10
    }
    var f = this.chunkSize(h);
    var g = Math.pow(h, f)
      , e = false
      , a = 0
      , l = 0;
    for (var c = 0; c < m.length; ++c) {
        var k = intAt(m, c);
        if (k < 0) {
            if (m.charAt(c) == "-" && this.signum() == 0) {
                e = true
            }
            continue
        }
        l = h * l + k;
        if (++a >= f) {
            this.dMultiply(g);
            this.dAddOffset(l, 0);
            a = 0;
            l = 0
        }
    }
    if (a > 0) {
        this.dMultiply(Math.pow(h, a));
        this.dAddOffset(l, 0)
    }
    if (e) {
        BigInteger.ZERO.subTo(this, this)
    }
}
function bnpFromNumber(f, e, h) {
    if ("number" == typeof e) {
        if (f < 2) {
            this.fromInt(1)
        } else {
            this.fromNumber(f, h);
            if (!this.testBit(f - 1)) {
                this.bitwiseTo(BigInteger.ONE.shiftLeft(f - 1), op_or, this)
            }
            if (this.isEven()) {
                this.dAddOffset(1, 0)
            }
            while (!this.isProbablePrime(e)) {
                this.dAddOffset(2, 0);
                if (this.bitLength() > f) {
                    this.subTo(BigInteger.ONE.shiftLeft(f - 1), this)
                }
            }
        }
    } else {
        var d = new Array()
          , g = f & 7;
        d.length = (f >> 3) + 1;
        e.nextBytes(d);
        if (g > 0) {
            d[0] &= ((1 << g) - 1)
        } else {
            d[0] = 0
        }
        this.fromString(d, 256)
    }
}
function bnToByteArray() {
    var b = this.t
      , c = new Array();
    c[0] = this.s;
    var e = this.DB - (b * this.DB) % 8, f, a = 0;
    if (b-- > 0) {
        if (e < this.DB && (f = this[b] >> e) != (this.s & this.DM) >> e) {
            c[a++] = f | (this.s << (this.DB - e))
        }
        while (b >= 0) {
            if (e < 8) {
                f = (this[b] & ((1 << e) - 1)) << (8 - e);
                f |= this[--b] >> (e += this.DB - 8)
            } else {
                f = (this[b] >> (e -= 8)) & 255;
                if (e <= 0) {
                    e += this.DB;
                    --b
                }
            }
            if ((f & 128) != 0) {
                f |= -256
            }
            if (a == 0 && (this.s & 128) != (f & 128)) {
                ++a
            }
            if (a > 0 || f != this.s) {
                c[a++] = f
            }
        }
    }
    return c
}
function bnEquals(b) {
    return (this.compareTo(b) == 0)
}
function bnMin(b) {
    return (this.compareTo(b) < 0) ? this : b
}
function bnMax(b) {
    return (this.compareTo(b) > 0) ? this : b
}
function bnpBitwiseTo(c, h, e) {
    var d, g, b = Math.min(c.t, this.t);
    for (d = 0; d < b; ++d) {
        e[d] = h(this[d], c[d])
    }
    if (c.t < this.t) {
        g = c.s & this.DM;
        for (d = b; d < this.t; ++d) {
            e[d] = h(this[d], g)
        }
        e.t = this.t
    } else {
        g = this.s & this.DM;
        for (d = b; d < c.t; ++d) {
            e[d] = h(g, c[d])
        }
        e.t = c.t
    }
    e.s = h(this.s, c.s);
    e.clamp()
}
function op_and(a, b) {
    return a & b
}
function bnAnd(b) {
    var c = nbi();
    this.bitwiseTo(b, op_and, c);
    return c
}
function op_or(a, b) {
    return a | b
}
function bnOr(b) {
    var c = nbi();
    this.bitwiseTo(b, op_or, c);
    return c
}
function op_xor(a, b) {
    return a ^ b
}
function bnXor(b) {
    var c = nbi();
    this.bitwiseTo(b, op_xor, c);
    return c
}
function op_andnot(a, b) {
    return a & ~b
}
function bnAndNot(b) {
    var c = nbi();
    this.bitwiseTo(b, op_andnot, c);
    return c
}
function bnNot() {
    var b = nbi();
    for (var a = 0; a < this.t; ++a) {
        b[a] = this.DM & ~this[a]
    }
    b.t = this.t;
    b.s = ~this.s;
    return b
}
function bnShiftLeft(b) {
    var a = nbi();
    if (b < 0) {
        this.rShiftTo(-b, a)
    } else {
        this.lShiftTo(b, a)
    }
    return a
}
function bnShiftRight(b) {
    var a = nbi();
    if (b < 0) {
        this.lShiftTo(-b, a)
    } else {
        this.rShiftTo(b, a)
    }
    return a
}
function lbit(a) {
    if (a == 0) {
        return -1
    }
    var b = 0;
    if ((a & 65535) == 0) {
        a >>= 16;
        b += 16
    }
    if ((a & 255) == 0) {
        a >>= 8;
        b += 8
    }
    if ((a & 15) == 0) {
        a >>= 4;
        b += 4
    }
    if ((a & 3) == 0) {
        a >>= 2;
        b += 2
    }
    if ((a & 1) == 0) {
        ++b
    }
    return b
}
function bnGetLowestSetBit() {
    for (var a = 0; a < this.t; ++a) {
        if (this[a] != 0) {
            return a * this.DB + lbit(this[a])
        }
    }
    if (this.s < 0) {
        return this.t * this.DB
    }
    return -1
}
function cbit(a) {
    var b = 0;
    while (a != 0) {
        a &= a - 1;
        ++b
    }
    return b
}
function bnBitCount() {
    var c = 0
      , a = this.s & this.DM;
    for (var b = 0; b < this.t; ++b) {
        c += cbit(this[b] ^ a)
    }
    return c
}
function bnTestBit(b) {
    var a = Math.floor(b / this.DB);
    if (a >= this.t) {
        return (this.s != 0)
    }
    return ((this[a] & (1 << (b % this.DB))) != 0)
}
function bnpChangeBit(c, b) {
    var a = BigInteger.ONE.shiftLeft(c);
    this.bitwiseTo(a, b, a);
    return a
}
function bnSetBit(a) {
    return this.changeBit(a, op_or)
}
function bnClearBit(a) {
    return this.changeBit(a, op_andnot)
}
function bnFlipBit(a) {
    return this.changeBit(a, op_xor)
}
function bnpAddTo(d, f) {
    var e = 0
      , g = 0
      , b = Math.min(d.t, this.t);
    while (e < b) {
        g += this[e] + d[e];
        f[e++] = g & this.DM;
        g >>= this.DB
    }
    if (d.t < this.t) {
        g += d.s;
        while (e < this.t) {
            g += this[e];
            f[e++] = g & this.DM;
            g >>= this.DB
        }
        g += this.s
    } else {
        g += this.s;
        while (e < d.t) {
            g += d[e];
            f[e++] = g & this.DM;
            g >>= this.DB
        }
        g += d.s
    }
    f.s = (g < 0) ? -1 : 0;
    if (g > 0) {
        f[e++] = g
    } else {
        if (g < -1) {
            f[e++] = this.DV + g
        }
    }
    f.t = e;
    f.clamp()
}
function bnAdd(b) {
    var c = nbi();
    this.addTo(b, c);
    return c
}
function bnSubtract(b) {
    var c = nbi();
    this.subTo(b, c);
    return c
}
function bnMultiply(b) {
    var c = nbi();
    this.multiplyTo(b, c);
    return c
}
function bnSquare() {
    var a = nbi();
    this.squareTo(a);
    return a
}
function bnDivide(b) {
    var c = nbi();
    this.divRemTo(b, c, null);
    return c
}
function bnRemainder(b) {
    var c = nbi();
    this.divRemTo(b, null, c);
    return c
}
function bnDivideAndRemainder(b) {
    var d = nbi()
      , c = nbi();
    this.divRemTo(b, d, c);
    return new Array(d,c)
}
function bnpDMultiply(a) {
    this[this.t] = this.am(0, a - 1, this, 0, 0, this.t);
    ++this.t;
    this.clamp()
}
function bnpDAddOffset(b, a) {
    if (b == 0) {
        return
    }
    while (this.t <= a) {
        this[this.t++] = 0
    }
    this[a] += b;
    while (this[a] >= this.DV) {
        this[a] -= this.DV;
        if (++a >= this.t) {
            this[this.t++] = 0
        }
        ++this[a]
    }
}
function NullExp() {}
function nNop(a) {
    return a
}
function nMulTo(a, c, b) {
    a.multiplyTo(c, b)
}
function nSqrTo(a, b) {
    a.squareTo(b)
}
NullExp.prototype.convert = nNop;
NullExp.prototype.revert = nNop;
NullExp.prototype.mulTo = nMulTo;
NullExp.prototype.sqrTo = nSqrTo;
function bnPow(a) {
    return this.exp(a, new NullExp())
}
function bnpMultiplyLowerTo(b, f, e) {
    var d = Math.min(this.t + b.t, f);
    e.s = 0;
    e.t = d;
    while (d > 0) {
        e[--d] = 0
    }
    var c;
    for (c = e.t - this.t; d < c; ++d) {
        e[d + this.t] = this.am(0, b[d], e, d, 0, this.t)
    }
    for (c = Math.min(b.t, f); d < c; ++d) {
        this.am(0, b[d], e, d, 0, f - d)
    }
    e.clamp()
}
function bnpMultiplyUpperTo(b, e, d) {
    --e;
    var c = d.t = this.t + b.t - e;
    d.s = 0;
    while (--c >= 0) {
        d[c] = 0
    }
    for (c = Math.max(e - this.t, 0); c < b.t; ++c) {
        d[this.t + c - e] = this.am(e - c, b[c], d, 0, 0, this.t + c - e)
    }
    d.clamp();
    d.drShiftTo(1, d)
}
function Barrett(a) {
    this.r2 = nbi();
    this.q3 = nbi();
    BigInteger.ONE.dlShiftTo(2 * a.t, this.r2);
    this.mu = this.r2.divide(a);
    this.m = a
}
function barrettConvert(a) {
    if (a.s < 0 || a.t > 2 * this.m.t) {
        return a.mod(this.m)
    } else {
        if (a.compareTo(this.m) < 0) {
            return a
        } else {
            var b = nbi();
            a.copyTo(b);
            this.reduce(b);
            return b
        }
    }
}
function barrettRevert(a) {
    return a
}
function barrettReduce(a) {
    a.drShiftTo(this.m.t - 1, this.r2);
    if (a.t > this.m.t + 1) {
        a.t = this.m.t + 1;
        a.clamp()
    }
    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
    this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
    while (a.compareTo(this.r2) < 0) {
        a.dAddOffset(1, this.m.t + 1)
    }
    a.subTo(this.r2, a);
    while (a.compareTo(this.m) >= 0) {
        a.subTo(this.m, a)
    }
}
function barrettSqrTo(a, b) {
    a.squareTo(b);
    this.reduce(b)
}
function barrettMulTo(a, c, b) {
    a.multiplyTo(c, b);
    this.reduce(b)
}
Barrett.prototype.convert = barrettConvert;
Barrett.prototype.revert = barrettRevert;
Barrett.prototype.reduce = barrettReduce;
Barrett.prototype.mulTo = barrettMulTo;
Barrett.prototype.sqrTo = barrettSqrTo;
function bnModPow(q, f) {
    var o = q.bitLength(), h, b = nbv(1), v;
    if (o <= 0) {
        return b
    } else {
        if (o < 18) {
            h = 1
        } else {
            if (o < 48) {
                h = 3
            } else {
                if (o < 144) {
                    h = 4
                } else {
                    if (o < 768) {
                        h = 5
                    } else {
                        h = 6
                    }
                }
            }
        }
    }
    if (o < 8) {
        v = new Classic(f)
    } else {
        if (f.isEven()) {
            v = new Barrett(f)
        } else {
            v = new Montgomery(f)
        }
    }
    var p = new Array()
      , d = 3
      , s = h - 1
      , a = (1 << h) - 1;
    p[1] = v.convert(this);
    if (h > 1) {
        var A = nbi();
        v.sqrTo(p[1], A);
        while (d <= a) {
            p[d] = nbi();
            v.mulTo(A, p[d - 2], p[d]);
            d += 2
        }
    }
    var l = q.t - 1, x, u = true, c = nbi(), y;
    o = nbits(q[l]) - 1;
    while (l >= 0) {
        if (o >= s) {
            x = (q[l] >> (o - s)) & a
        } else {
            x = (q[l] & ((1 << (o + 1)) - 1)) << (s - o);
            if (l > 0) {
                x |= q[l - 1] >> (this.DB + o - s)
            }
        }
        d = h;
        while ((x & 1) == 0) {
            x >>= 1;
            --d
        }
        if ((o -= d) < 0) {
            o += this.DB;
            --l
        }
        if (u) {
            p[x].copyTo(b);
            u = false
        } else {
            while (d > 1) {
                v.sqrTo(b, c);
                v.sqrTo(c, b);
                d -= 2
            }
            if (d > 0) {
                v.sqrTo(b, c)
            } else {
                y = b;
                b = c;
                c = y
            }
            v.mulTo(c, p[x], b)
        }
        while (l >= 0 && (q[l] & (1 << o)) == 0) {
            v.sqrTo(b, c);
            y = b;
            b = c;
            c = y;
            if (--o < 0) {
                o = this.DB - 1;
                --l
            }
        }
    }
    return v.revert(b)
}
function bnGCD(c) {
    var b = (this.s < 0) ? this.negate() : this.clone();
    var h = (c.s < 0) ? c.negate() : c.clone();
    if (b.compareTo(h) < 0) {
        var e = b;
        b = h;
        h = e
    }
    var d = b.getLowestSetBit()
      , f = h.getLowestSetBit();
    if (f < 0) {
        return b
    }
    if (d < f) {
        f = d
    }
    if (f > 0) {
        b.rShiftTo(f, b);
        h.rShiftTo(f, h)
    }
    while (b.signum() > 0) {
        if ((d = b.getLowestSetBit()) > 0) {
            b.rShiftTo(d, b)
        }
        if ((d = h.getLowestSetBit()) > 0) {
            h.rShiftTo(d, h)
        }
        if (b.compareTo(h) >= 0) {
            b.subTo(h, b);
            b.rShiftTo(1, b)
        } else {
            h.subTo(b, h);
            h.rShiftTo(1, h)
        }
    }
    if (f > 0) {
        h.lShiftTo(f, h)
    }
    return h
}
function bnpModInt(e) {
    if (e <= 0) {
        return 0
    }
    var c = this.DV % e
      , b = (this.s < 0) ? e - 1 : 0;
    if (this.t > 0) {
        if (c == 0) {
            b = this[0] % e
        } else {
            for (var a = this.t - 1; a >= 0; --a) {
                b = (c * b + this[a]) % e
            }
        }
    }
    return b
}
function bnModInverse(f) {
    var j = f.isEven();
    if ((this.isEven() && j) || f.signum() == 0) {
        return BigInteger.ZERO
    }
    var i = f.clone()
      , h = this.clone();
    var g = nbv(1)
      , e = nbv(0)
      , l = nbv(0)
      , k = nbv(1);
    while (i.signum() != 0) {
        while (i.isEven()) {
            i.rShiftTo(1, i);
            if (j) {
                if (!g.isEven() || !e.isEven()) {
                    g.addTo(this, g);
                    e.subTo(f, e)
                }
                g.rShiftTo(1, g)
            } else {
                if (!e.isEven()) {
                    e.subTo(f, e)
                }
            }
            e.rShiftTo(1, e)
        }
        while (h.isEven()) {
            h.rShiftTo(1, h);
            if (j) {
                if (!l.isEven() || !k.isEven()) {
                    l.addTo(this, l);
                    k.subTo(f, k)
                }
                l.rShiftTo(1, l)
            } else {
                if (!k.isEven()) {
                    k.subTo(f, k)
                }
            }
            k.rShiftTo(1, k)
        }
        if (i.compareTo(h) >= 0) {
            i.subTo(h, i);
            if (j) {
                g.subTo(l, g)
            }
            e.subTo(k, e)
        } else {
            h.subTo(i, h);
            if (j) {
                l.subTo(g, l)
            }
            k.subTo(e, k)
        }
    }
    if (h.compareTo(BigInteger.ONE) != 0) {
        return BigInteger.ZERO
    }
    if (k.compareTo(f) >= 0) {
        return k.subtract(f)
    }
    if (k.signum() < 0) {
        k.addTo(f, k)
    } else {
        return k
    }
    if (k.signum() < 0) {
        return k.add(f)
    } else {
        return k
    }
}
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
function bnIsProbablePrime(e) {
    var d, b = this.abs();
    if (b.t == 1 && b[0] <= lowprimes[lowprimes.length - 1]) {
        for (d = 0; d < lowprimes.length; ++d) {
            if (b[0] == lowprimes[d]) {
                return true
            }
        }
        return false
    }
    if (b.isEven()) {
        return false
    }
    d = 1;
    while (d < lowprimes.length) {
        var a = lowprimes[d]
          , c = d + 1;
        while (c < lowprimes.length && a < lplim) {
            a *= lowprimes[c++]
        }
        a = b.modInt(a);
        while (d < c) {
            if (a % lowprimes[d++] == 0) {
                return false
            }
        }
    }
    return b.millerRabin(e)
}
function bnpMillerRabin(f) {
    var g = this.subtract(BigInteger.ONE);
    var c = g.getLowestSetBit();
    if (c <= 0) {
        return false
    }
    var h = g.shiftRight(c);
    f = (f + 1) >> 1;
    if (f > lowprimes.length) {
        f = lowprimes.length
    }
    var b = nbi();
    for (var e = 0; e < f; ++e) {
        b.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var l = b.modPow(h, this);
        if (l.compareTo(BigInteger.ONE) != 0 && l.compareTo(g) != 0) {
            var d = 1;
            while (d++ < c && l.compareTo(g) != 0) {
                l = l.modPowInt(2, this);
                if (l.compareTo(BigInteger.ONE) == 0) {
                    return false
                }
            }
            if (l.compareTo(g) != 0) {
                return false
            }
        }
    }
    return true
}
BigInteger.prototype.chunkSize = bnpChunkSize;
BigInteger.prototype.toRadix = bnpToRadix;
BigInteger.prototype.fromRadix = bnpFromRadix;
BigInteger.prototype.fromNumber = bnpFromNumber;
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
BigInteger.prototype.changeBit = bnpChangeBit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.dMultiply = bnpDMultiply;
BigInteger.prototype.dAddOffset = bnpDAddOffset;
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
BigInteger.prototype.modInt = bnpModInt;
BigInteger.prototype.millerRabin = bnpMillerRabin;
BigInteger.prototype.clone = bnClone;
BigInteger.prototype.intValue = bnIntValue;
BigInteger.prototype.byteValue = bnByteValue;
BigInteger.prototype.shortValue = bnShortValue;
BigInteger.prototype.signum = bnSigNum;
BigInteger.prototype.toByteArray = bnToByteArray;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.min = bnMin;
BigInteger.prototype.max = bnMax;
BigInteger.prototype.and = bnAnd;
BigInteger.prototype.or = bnOr;
BigInteger.prototype.xor = bnXor;
BigInteger.prototype.andNot = bnAndNot;
BigInteger.prototype.not = bnNot;
BigInteger.prototype.shiftLeft = bnShiftLeft;
BigInteger.prototype.shiftRight = bnShiftRight;
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
BigInteger.prototype.bitCount = bnBitCount;
BigInteger.prototype.testBit = bnTestBit;
BigInteger.prototype.setBit = bnSetBit;
BigInteger.prototype.clearBit = bnClearBit;
BigInteger.prototype.flipBit = bnFlipBit;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.remainder = bnRemainder;
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
BigInteger.prototype.modPow = bnModPow;
BigInteger.prototype.modInverse = bnModInverse;
BigInteger.prototype.pow = bnPow;
BigInteger.prototype.gcd = bnGCD;
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
BigInteger.prototype.square = bnSquare;
function Arcfour() {
    this.i = 0;
    this.j = 0;
    this.S = new Array()
}
function ARC4init(d) {
    var c, a, b;
    for (c = 0; c < 256; ++c) {
        this.S[c] = c
    }
    a = 0;
    for (c = 0; c < 256; ++c) {
        a = (a + this.S[c] + d[c % d.length]) & 255;
        b = this.S[c];
        this.S[c] = this.S[a];
        this.S[a] = b
    }
    this.i = 0;
    this.j = 0
}
function ARC4next() {
    var a;
    this.i = (this.i + 1) & 255;
    this.j = (this.j + this.S[this.i]) & 255;
    a = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = a;
    return this.S[(a + this.S[this.i]) & 255]
}
Arcfour.prototype.init = ARC4init;
Arcfour.prototype.next = ARC4next;
function prng_newstate() {
    return new Arcfour()
}
var rng_psize = 256;
var rng_state;
var rng_pool;
var rng_pptr;
function rng_seed_int(a) {
    rng_pool[rng_pptr++] ^= a & 255;
    rng_pool[rng_pptr++] ^= (a >> 8) & 255;
    rng_pool[rng_pptr++] ^= (a >> 16) & 255;
    rng_pool[rng_pptr++] ^= (a >> 24) & 255;
    if (rng_pptr >= rng_psize) {
        rng_pptr -= rng_psize
    }
}
function rng_seed_time() {
    rng_seed_int(new Date().getTime())
}
if (rng_pool == null) {
    rng_pool = new Array();
    rng_pptr = 0;
    var t;
    if (window !== undefined && (window.crypto !== undefined || window.msCrypto !== undefined)) {
        var crypto = window.crypto || window.msCrypto;
        if (crypto.getRandomValues) {
            var ua = new Uint8Array(32);
            crypto.getRandomValues(ua);
            for (t = 0; t < 32; ++t) {
                rng_pool[rng_pptr++] = ua[t]
            }
        } else {
            if (navigator.appName == "Netscape" && navigator.appVersion < "5") {
                var z = window.crypto.random(32);
                for (t = 0; t < z.length; ++t) {
                    rng_pool[rng_pptr++] = z.charCodeAt(t) & 255
                }
            }
        }
    }
    while (rng_pptr < rng_psize) {
        t = Math.floor(65536 * Math.random());
        rng_pool[rng_pptr++] = t >>> 8;
        rng_pool[rng_pptr++] = t & 255
    }
    rng_pptr = 0;
    rng_seed_time()
}
function rng_get_byte() {
    if (rng_state == null) {
        rng_seed_time();
        rng_state = prng_newstate();
        rng_state.init(rng_pool);
        for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
            rng_pool[rng_pptr] = 0
        }
        rng_pptr = 0
    }
    return rng_state.next()
}
function rng_get_bytes(b) {
    var a;
    for (a = 0; a < b.length; ++a) {
        b[a] = rng_get_byte()
    }
}
function SecureRandom() {}
SecureRandom.prototype.nextBytes = rng_get_bytes;
function parseBigInt(b, a) {
    return new BigInteger(b,a)
}
function linebrk(c, d) {
    var a = "";
    var b = 0;
    while (b + d < c.length) {
        a += c.substring(b, b + d) + "\n";
        b += d
    }
    return a + c.substring(b, c.length)
}
function byte2Hex(a) {
    if (a < 16) {
        return "0" + a.toString(16)
    } else {
        return a.toString(16)
    }
}
function pkcs1pad2(e, h) {
    if (h < e.length + 11) {
        throw "Message too long for RSA";
        return null
    }
    var g = new Array();
    var d = e.length - 1;
    while (d >= 0 && h > 0) {
        var f = e.charCodeAt(d--);
        if (f < 128) {
            g[--h] = f
        } else {
            if ((f > 127) && (f < 2048)) {
                g[--h] = (f & 63) | 128;
                g[--h] = (f >> 6) | 192
            } else {
                g[--h] = (f & 63) | 128;
                g[--h] = ((f >> 6) & 63) | 128;
                g[--h] = (f >> 12) | 224
            }
        }
    }
    g[--h] = 0;
    var b = new SecureRandom();
    var a = new Array();
    while (h > 2) {
        a[0] = 0;
        while (a[0] == 0) {
            b.nextBytes(a)
        }
        g[--h] = a[0]
    }
    g[--h] = 2;
    g[--h] = 0;
    return new BigInteger(g)
}
function oaep_mgf1_arr(c, a, e) {
    var b = ""
      , d = 0;
    while (b.length < a) {
        b += e(String.fromCharCode.apply(String, c.concat([(d & 4278190080) >> 24, (d & 16711680) >> 16, (d & 65280) >> 8, d & 255])));
        d += 1
    }
    return b
}
function oaep_pad(q, a, f, l) {
    var c = KJUR.crypto.MessageDigest;
    var o = KJUR.crypto.Util;
    var b = null;
    if (!f) {
        f = "sha1"
    }
    if (typeof f === "string") {
        b = c.getCanonicalAlgName(f);
        l = c.getHashLength(b);
        f = function(i) {
            return hextorstr(o.hashHex(rstrtohex(i), b))
        }
    }
    if (q.length + 2 * l + 2 > a) {
        throw "Message too long for RSA"
    }
    var k = "", e;
    for (e = 0; e < a - q.length - 2 * l - 2; e += 1) {
        k += "\x00"
    }
    var h = f("") + k + "\x01" + q;
    var g = new Array(l);
    new SecureRandom().nextBytes(g);
    var j = oaep_mgf1_arr(g, h.length, f);
    var p = [];
    for (e = 0; e < h.length; e += 1) {
        p[e] = h.charCodeAt(e) ^ j.charCodeAt(e)
    }
    var m = oaep_mgf1_arr(p, g.length, f);
    var d = [0];
    for (e = 0; e < g.length; e += 1) {
        d[e + 1] = g[e] ^ m.charCodeAt(e)
    }
    return new BigInteger(d.concat(p))
}
function RSAKey() {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dmp1 = null;
    this.dmq1 = null;
    this.coeff = null
}
function RSASetPublic(b, a) {
    this.isPublic = true;
    this.isPrivate = false;
    if (typeof b !== "string") {
        this.n = b;
        this.e = a
    } else {
        if (b != null && a != null && b.length > 0 && a.length > 0) {
            this.n = parseBigInt(b, 16);
            this.e = parseInt(a, 16)
        } else {
            throw "Invalid RSA public key"
        }
    }
}
function RSADoPublic(a) {
    return a.modPowInt(this.e, this.n)
}
function RSAEncrypt(d) {
    var a = pkcs1pad2(d, (this.n.bitLength() + 7) >> 3);
    if (a == null) {
        return null
    }
    var e = this.doPublic(a);
    if (e == null) {
        return null
    }
    var b = e.toString(16);
    if ((b.length & 1) == 0) {
        return b
    } else {
        return "0" + b
    }
}
function RSAEncryptOAEP(f, e, b) {
    var a = oaep_pad(f, (this.n.bitLength() + 7) >> 3, e, b);
    if (a == null) {
        return null
    }
    var g = this.doPublic(a);
    if (g == null) {
        return null
    }
    var d = g.toString(16);
    if ((d.length & 1) == 0) {
        return d
    } else {
        return "0" + d
    }
}
RSAKey.prototype.doPublic = RSADoPublic;
RSAKey.prototype.setPublic = RSASetPublic;
RSAKey.prototype.encrypt = RSAEncrypt;
RSAKey.prototype.encryptOAEP = RSAEncryptOAEP;
RSAKey.prototype.type = "RSA";
function pkcs1unpad2(g, j) {
    var a = g.toByteArray();
    var f = 0;
    while (f < a.length && a[f] == 0) {
        ++f
    }
    if (a.length - f != j - 1 || a[f] != 2) {
        return null
    }
    ++f;
    while (a[f] != 0) {
        if (++f >= a.length) {
            return null
        }
    }
    var e = "";
    while (++f < a.length) {
        var h = a[f] & 255;
        if (h < 128) {
            e += String.fromCharCode(h)
        } else {
            if ((h > 191) && (h < 224)) {
                e += String.fromCharCode(((h & 31) << 6) | (a[f + 1] & 63));
                ++f
            } else {
                e += String.fromCharCode(((h & 15) << 12) | ((a[f + 1] & 63) << 6) | (a[f + 2] & 63));
                f += 2
            }
        }
    }
    return e
}
function oaep_mgf1_str(c, a, e) {
    var b = ""
      , d = 0;
    while (b.length < a) {
        b += e(c + String.fromCharCode.apply(String, [(d & 4278190080) >> 24, (d & 16711680) >> 16, (d & 65280) >> 8, d & 255]));
        d += 1
    }
    return b
}
function oaep_unpad(o, b, g, p) {
    var e = KJUR.crypto.MessageDigest;
    var r = KJUR.crypto.Util;
    var c = null;
    if (!g) {
        g = "sha1"
    }
    if (typeof g === "string") {
        c = e.getCanonicalAlgName(g);
        p = e.getHashLength(c);
        g = function(d) {
            return hextorstr(r.hashHex(rstrtohex(d), c))
        }
    }
    o = o.toByteArray();
    var h;
    for (h = 0; h < o.length; h += 1) {
        o[h] &= 255
    }
    while (o.length < b) {
        o.unshift(0)
    }
    o = String.fromCharCode.apply(String, o);
    if (o.length < 2 * p + 2) {
        throw "Cipher too short"
    }
    var f = o.substr(1, p);
    var s = o.substr(p + 1);
    var q = oaep_mgf1_str(s, p, g);
    var k = [], h;
    for (h = 0; h < f.length; h += 1) {
        k[h] = f.charCodeAt(h) ^ q.charCodeAt(h)
    }
    var l = oaep_mgf1_str(String.fromCharCode.apply(String, k), o.length - p, g);
    var j = [];
    for (h = 0; h < s.length; h += 1) {
        j[h] = s.charCodeAt(h) ^ l.charCodeAt(h)
    }
    j = String.fromCharCode.apply(String, j);
    if (j.substr(0, p) !== g("")) {
        throw "Hash mismatch"
    }
    j = j.substr(p);
    var a = j.indexOf("\x01");
    var m = (a != -1) ? j.substr(0, a).lastIndexOf("\x00") : -1;
    if (m + 1 != a) {
        throw "Malformed data"
    }
    return j.substr(a + 1)
}
function RSASetPrivate(c, a, b) {
    this.isPrivate = true;
    if (typeof c !== "string") {
        this.n = c;
        this.e = a;
        this.d = b
    } else {
        if (c != null && a != null && c.length > 0 && a.length > 0) {
            this.n = parseBigInt(c, 16);
            this.e = parseInt(a, 16);
            this.d = parseBigInt(b, 16)
        } else {
            throw "Invalid RSA private key"
        }
    }
}
function RSASetPrivateEx(g, d, e, c, b, a, h, f) {
    this.isPrivate = true;
    this.isPublic = false;
    if (g == null) {
        throw "RSASetPrivateEx N == null"
    }
    if (d == null) {
        throw "RSASetPrivateEx E == null"
    }
    if (g.length == 0) {
        throw "RSASetPrivateEx N.length == 0"
    }
    if (d.length == 0) {
        throw "RSASetPrivateEx E.length == 0"
    }
    if (g != null && d != null && g.length > 0 && d.length > 0) {
        this.n = parseBigInt(g, 16);
        this.e = parseInt(d, 16);
        this.d = parseBigInt(e, 16);
        this.p = parseBigInt(c, 16);
        this.q = parseBigInt(b, 16);
        this.dmp1 = parseBigInt(a, 16);
        this.dmq1 = parseBigInt(h, 16);
        this.coeff = parseBigInt(f, 16)
    } else {
        throw "Invalid RSA private key in RSASetPrivateEx"
    }
}
function RSAGenerate(b, i) {
    var a = new SecureRandom();
    var f = b >> 1;
    this.e = parseInt(i, 16);
    var c = new BigInteger(i,16);
    for (; ; ) {
        for (; ; ) {
            this.p = new BigInteger(b - f,1,a);
            if (this.p.subtract(BigInteger.ONE).gcd(c).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
                break
            }
        }
        for (; ; ) {
            this.q = new BigInteger(f,1,a);
            if (this.q.subtract(BigInteger.ONE).gcd(c).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
                break
            }
        }
        if (this.p.compareTo(this.q) <= 0) {
            var h = this.p;
            this.p = this.q;
            this.q = h
        }
        var g = this.p.subtract(BigInteger.ONE);
        var d = this.q.subtract(BigInteger.ONE);
        var e = g.multiply(d);
        if (e.gcd(c).compareTo(BigInteger.ONE) == 0) {
            this.n = this.p.multiply(this.q);
            this.d = c.modInverse(e);
            this.dmp1 = this.d.mod(g);
            this.dmq1 = this.d.mod(d);
            this.coeff = this.q.modInverse(this.p);
            break
        }
    }
    this.isPrivate = true
}
function RSADoPrivate(a) {
    if (this.p == null || this.q == null) {
        return a.modPow(this.d, this.n)
    }
    var c = a.mod(this.p).modPow(this.dmp1, this.p);
    var b = a.mod(this.q).modPow(this.dmq1, this.q);
    while (c.compareTo(b) < 0) {
        c = c.add(this.p)
    }
    return c.subtract(b).multiply(this.coeff).mod(this.p).multiply(this.q).add(b)
}
function RSADecrypt(b) {
    var d = parseBigInt(b, 16);
    var a = this.doPrivate(d);
    if (a == null) {
        return null
    }
    return pkcs1unpad2(a, (this.n.bitLength() + 7) >> 3)
}
function RSADecryptOAEP(e, d, b) {
    var f = parseBigInt(e, 16);
    var a = this.doPrivate(f);
    if (a == null) {
        return null
    }
    return oaep_unpad(a, (this.n.bitLength() + 7) >> 3, d, b)
}
RSAKey.prototype.doPrivate = RSADoPrivate;
RSAKey.prototype.setPrivate = RSASetPrivate;
RSAKey.prototype.setPrivateEx = RSASetPrivateEx;
RSAKey.prototype.generate = RSAGenerate;
RSAKey.prototype.decrypt = RSADecrypt;
RSAKey.prototype.decryptOAEP = RSADecryptOAEP;
var ASN1HEX = new function() {}
;
ASN1HEX.getLblen = function(c, a) {
    if (c.substr(a + 2, 1) != "8") {
        return 1
    }
    var b = parseInt(c.substr(a + 3, 1));
    if (b == 0) {
        return -1
    }
    if (0 < b && b < 10) {
        return b + 1
    }
    return -2
}
;
ASN1HEX.getL = function(c, b) {
    var a = ASN1HEX.getLblen(c, b);
    if (a < 1) {
        return ""
    }
    return c.substr(b + 2, a * 2)
}
;
ASN1HEX.getVblen = function(d, a) {
    var c, b;
    c = ASN1HEX.getL(d, a);
    if (c == "") {
        return -1
    }
    if (c.substr(0, 1) === "8") {
        b = new BigInteger(c.substr(2),16)
    } else {
        b = new BigInteger(c,16)
    }
    return b.intValue()
}
;
ASN1HEX.getVidx = function(c, b) {
    var a = ASN1HEX.getLblen(c, b);
    if (a < 0) {
        return a
    }
    return b + (a + 1) * 2
}
;
ASN1HEX.getV = function(d, a) {
    var c = ASN1HEX.getVidx(d, a);
    var b = ASN1HEX.getVblen(d, a);
    return d.substr(c, b * 2)
}
;
ASN1HEX.getTLV = function(b, a) {
    return b.substr(a, 2) + ASN1HEX.getL(b, a) + ASN1HEX.getV(b, a)
}
;
ASN1HEX.getNextSiblingIdx = function(d, a) {
    var c = ASN1HEX.getVidx(d, a);
    var b = ASN1HEX.getVblen(d, a);
    return c + b * 2
}
;
ASN1HEX.getChildIdx = function(e, f) {
    var j = ASN1HEX;
    var g = new Array();
    var i = j.getVidx(e, f);
    if (e.substr(f, 2) == "03") {
        g.push(i + 2)
    } else {
        g.push(i)
    }
    var l = j.getVblen(e, f);
    var c = i;
    var d = 0;
    while (1) {
        var b = j.getNextSiblingIdx(e, c);
        if (b == null || (b - i >= (l * 2))) {
            break
        }
        if (d >= 200) {
            break
        }
        g.push(b);
        c = b;
        d++
    }
    return g
}
;
ASN1HEX.getNthChildIdx = function(d, b, e) {
    var c = ASN1HEX.getChildIdx(d, b);
    return c[e]
}
;
ASN1HEX.getIdxbyList = function(e, d, c, i) {
    var g = ASN1HEX;
    var f, b;
    if (c.length == 0) {
        if (i !== undefined) {
            if (e.substr(d, 2) !== i) {
                throw "checking tag doesn't match: " + e.substr(d, 2) + "!=" + i
            }
        }
        return d
    }
    f = c.shift();
    b = g.getChildIdx(e, d);
    return g.getIdxbyList(e, b[f], c, i)
}
;
ASN1HEX.getTLVbyList = function(d, c, b, f) {
    var e = ASN1HEX;
    var a = e.getIdxbyList(d, c, b);
    if (a === undefined) {
        throw "can't find nthList object"
    }
    if (f !== undefined) {
        if (d.substr(a, 2) != f) {
            throw "checking tag doesn't match: " + d.substr(a, 2) + "!=" + f
        }
    }
    return e.getTLV(d, a)
}
;
ASN1HEX.getVbyList = function(e, c, b, g, i) {
    var f = ASN1HEX;
    var a, d;
    a = f.getIdxbyList(e, c, b, g);
    if (a === undefined) {
        throw "can't find nthList object"
    }
    d = f.getV(e, a);
    if (i === true) {
        d = d.substr(2)
    }
    return d
}
;
ASN1HEX.hextooidstr = function(e) {
    var h = function(b, a) {
        if (b.length >= a) {
            return b
        }
        return new Array(a - b.length + 1).join("0") + b
    };
    var l = [];
    var o = e.substr(0, 2);
    var f = parseInt(o, 16);
    l[0] = new String(Math.floor(f / 40));
    l[1] = new String(f % 40);
    var m = e.substr(2);
    var k = [];
    for (var g = 0; g < m.length / 2; g++) {
        k.push(parseInt(m.substr(g * 2, 2), 16))
    }
    var j = [];
    var d = "";
    for (var g = 0; g < k.length; g++) {
        if (k[g] & 128) {
            d = d + h((k[g] & 127).toString(2), 7)
        } else {
            d = d + h((k[g] & 127).toString(2), 7);
            j.push(new String(parseInt(d, 2)));
            d = ""
        }
    }
    var n = l.join(".");
    if (j.length > 0) {
        n = n + "." + j.join(".")
    }
    return n
}
;
ASN1HEX.dump = function(t, c, l, g) {
    var p = ASN1HEX;
    var j = p.getV;
    var y = p.dump;
    var w = p.getChildIdx;
    var e = t;
    if (t instanceof KJUR.asn1.ASN1Object) {
        e = t.getEncodedHex()
    }
    var q = function(A, i) {
        if (A.length <= i * 2) {
            return A
        } else {
            var v = A.substr(0, i) + "..(total " + A.length / 2 + "bytes).." + A.substr(A.length - i, i);
            return v
        }
    };
    if (c === undefined) {
        c = {
            ommit_long_octet: 32
        }
    }
    if (l === undefined) {
        l = 0
    }
    if (g === undefined) {
        g = ""
    }
    var x = c.ommit_long_octet;
    if (e.substr(l, 2) == "01") {
        var h = j(e, l);
        if (h == "00") {
            return g + "BOOLEAN FALSE\n"
        } else {
            return g + "BOOLEAN TRUE\n"
        }
    }
    if (e.substr(l, 2) == "02") {
        var h = j(e, l);
        return g + "INTEGER " + q(h, x) + "\n"
    }
    if (e.substr(l, 2) == "03") {
        var h = j(e, l);
        return g + "BITSTRING " + q(h, x) + "\n"
    }
    if (e.substr(l, 2) == "04") {
        var h = j(e, l);
        if (p.isASN1HEX(h)) {
            var k = g + "OCTETSTRING, encapsulates\n";
            k = k + y(h, c, 0, g + "  ");
            return k
        } else {
            return g + "OCTETSTRING " + q(h, x) + "\n"
        }
    }
    if (e.substr(l, 2) == "05") {
        return g + "NULL\n"
    }
    if (e.substr(l, 2) == "06") {
        var m = j(e, l);
        var a = KJUR.asn1.ASN1Util.oidHexToInt(m);
        var o = KJUR.asn1.x509.OID.oid2name(a);
        var b = a.replace(/\./g, " ");
        if (o != "") {
            return g + "ObjectIdentifier " + o + " (" + b + ")\n"
        } else {
            return g + "ObjectIdentifier (" + b + ")\n"
        }
    }
    if (e.substr(l, 2) == "0c") {
        return g + "UTF8String '" + hextoutf8(j(e, l)) + "'\n"
    }
    if (e.substr(l, 2) == "13") {
        return g + "PrintableString '" + hextoutf8(j(e, l)) + "'\n"
    }
    if (e.substr(l, 2) == "14") {
        return g + "TeletexString '" + hextoutf8(j(e, l)) + "'\n"
    }
    if (e.substr(l, 2) == "16") {
        return g + "IA5String '" + hextoutf8(j(e, l)) + "'\n"
    }
    if (e.substr(l, 2) == "17") {
        return g + "UTCTime " + hextoutf8(j(e, l)) + "\n"
    }
    if (e.substr(l, 2) == "18") {
        return g + "GeneralizedTime " + hextoutf8(j(e, l)) + "\n"
    }
    if (e.substr(l, 2) == "30") {
        if (e.substr(l, 4) == "3000") {
            return g + "SEQUENCE {}\n"
        }
        var k = g + "SEQUENCE\n";
        var d = w(e, l);
        var f = c;
        if ((d.length == 2 || d.length == 3) && e.substr(d[0], 2) == "06" && e.substr(d[d.length - 1], 2) == "04") {
            var o = p.oidname(j(e, d[0]));
            var r = JSON.parse(JSON.stringify(c));
            r.x509ExtName = o;
            f = r
        }
        for (var u = 0; u < d.length; u++) {
            k = k + y(e, f, d[u], g + "  ")
        }
        return k
    }
    if (e.substr(l, 2) == "31") {
        var k = g + "SET\n";
        var d = w(e, l);
        for (var u = 0; u < d.length; u++) {
            k = k + y(e, c, d[u], g + "  ")
        }
        return k
    }
    var z = parseInt(e.substr(l, 2), 16);
    if ((z & 128) != 0) {
        var n = z & 31;
        if ((z & 32) != 0) {
            var k = g + "[" + n + "]\n";
            var d = w(e, l);
            for (var u = 0; u < d.length; u++) {
                k = k + y(e, c, d[u], g + "  ")
            }
            return k
        } else {
            var h = j(e, l);
            if (h.substr(0, 8) == "68747470") {
                h = hextoutf8(h)
            }
            if (c.x509ExtName === "subjectAltName" && n == 2) {
                h = hextoutf8(h)
            }
            var k = g + "[" + n + "] " + h + "\n";
            return k
        }
    }
    return g + "UNKNOWN(" + e.substr(l, 2) + ") " + j(e, l) + "\n"
}
;
ASN1HEX.isASN1HEX = function(e) {
    var d = ASN1HEX;
    if (e.length % 2 == 1) {
        return false
    }
    var c = d.getVblen(e, 0);
    var b = e.substr(0, 2);
    var f = d.getL(e, 0);
    var a = e.length - b.length - f.length;
    if (a == c * 2) {
        return true
    }
    return false
}
;
ASN1HEX.oidname = function(a) {
    var c = KJUR.asn1;
    if (KJUR.lang.String.isHex(a)) {
        a = c.ASN1Util.oidHexToInt(a)
    }
    var b = c.x509.OID.oid2name(a);
    if (b === "") {
        b = a
    }
    return b
}
;
if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {}
}
if (typeof KJUR.lang == "undefined" || !KJUR.lang) {
    KJUR.lang = {}
}
KJUR.lang.String = function() {}
;
function Base64x() {}
function stoBA(d) {
    var b = new Array();
    for (var c = 0; c < d.length; c++) {
        b[c] = d.charCodeAt(c)
    }
    return b
}
function BAtos(b) {
    var d = "";
    for (var c = 0; c < b.length; c++) {
        d = d + String.fromCharCode(b[c])
    }
    return d
}
function BAtohex(b) {
    var e = "";
    for (var d = 0; d < b.length; d++) {
        var c = b[d].toString(16);
        if (c.length == 1) {
            c = "0" + c
        }
        e = e + c
    }
    return e
}
function stohex(a) {
    return BAtohex(stoBA(a))
}
function stob64(a) {
    return hex2b64(stohex(a))
}
function stob64u(a) {
    return b64tob64u(hex2b64(stohex(a)))
}
function b64utos(a) {
    return BAtos(b64toBA(b64utob64(a)))
}
function b64tob64u(a) {
    a = a.replace(/\=/g, "");
    a = a.replace(/\+/g, "-");
    a = a.replace(/\//g, "_");
    return a
}
function b64utob64(a) {
    if (a.length % 4 == 2) {
        a = a + "=="
    } else {
        if (a.length % 4 == 3) {
            a = a + "="
        }
    }
    a = a.replace(/-/g, "+");
    a = a.replace(/_/g, "/");
    return a
}
function hextob64u(a) {
    if (a.length % 2 == 1) {
        a = "0" + a
    }
    return b64tob64u(hex2b64(a))
}
function b64utohex(a) {
    return b64tohex(b64utob64(a))
}
var utf8tob64u, b64utoutf8;
if (typeof Buffer === "function") {
    utf8tob64u = function(a) {
        return b64tob64u(new Buffer(a,"utf8").toString("base64"))
    }
    ;
    b64utoutf8 = function(a) {
        return new Buffer(b64utob64(a),"base64").toString("utf8")
    }
} else {
    utf8tob64u = function(a) {
        return hextob64u(uricmptohex(encodeURIComponentAll(a)))
    }
    ;
    b64utoutf8 = function(a) {
        return decodeURIComponent(hextouricmp(b64utohex(a)))
    }
}
function utf8tob64(a) {
    return hex2b64(uricmptohex(encodeURIComponentAll(a)))
}
function b64toutf8(a) {
    return decodeURIComponent(hextouricmp(b64tohex(a)))
}
function utf8tohex(a) {
    return uricmptohex(encodeURIComponentAll(a))
}
function hextoutf8(a) {
    return decodeURIComponent(hextouricmp(a))
}
function hextorstr(c) {
    var b = "";
    for (var a = 0; a < c.length - 1; a += 2) {
        b += String.fromCharCode(parseInt(c.substr(a, 2), 16))
    }
    return b
}
function rstrtohex(c) {
    var a = "";
    for (var b = 0; b < c.length; b++) {
        a += ("0" + c.charCodeAt(b).toString(16)).slice(-2)
    }
    return a
}
function hextob64(a) {
    return hex2b64(a)
}
function hextob64nl(b) {
    var a = hextob64(b);
    var c = a.replace(/(.{64})/g, "$1\r\n");
    c = c.replace(/\r\n$/, "");
    return c
}
function b64nltohex(b) {
    var a = b.replace(/[^0-9A-Za-z\/+=]*/g, "");
    var c = b64tohex(a);
    return c
}
function hextopem(a, b) {
    var c = hextob64nl(a);
    return "-----BEGIN " + b + "-----\r\n" + c + "\r\n-----END " + b + "-----\r\n"
}
function pemtohex(a, b) {
    if (a.indexOf("-----BEGIN ") == -1) {
        throw "can't find PEM header: " + b
    }
    if (b !== undefined) {
        a = a.replace("-----BEGIN " + b + "-----", "");
        a = a.replace("-----END " + b + "-----", "")
    } else {
        a = a.replace(/-----BEGIN [^-]+-----/, "");
        a = a.replace(/-----END [^-]+-----/, "")
    }
    return b64nltohex(a)
}
function hextoArrayBuffer(d) {
    if (d.length % 2 != 0) {
        throw "input is not even length"
    }
    if (d.match(/^[0-9A-Fa-f]+$/) == null) {
        throw "input is not hexadecimal"
    }
    var b = new ArrayBuffer(d.length / 2);
    var a = new DataView(b);
    for (var c = 0; c < d.length / 2; c++) {
        a.setUint8(c, parseInt(d.substr(c * 2, 2), 16))
    }
    return b
}
function ArrayBuffertohex(b) {
    var d = "";
    var a = new DataView(b);
    for (var c = 0; c < b.byteLength; c++) {
        d += ("00" + a.getUint8(c).toString(16)).slice(-2)
    }
    return d
}
function zulutomsec(n) {
    var l, j, m, e, f, i, b, k;
    var a, h, g, c;
    c = n.match(/^(\d{2}|\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(|\.\d+)Z$/);
    if (c) {
        a = c[1];
        l = parseInt(a);
        if (a.length === 2) {
            if (50 <= l && l < 100) {
                l = 1900 + l
            } else {
                if (0 <= l && l < 50) {
                    l = 2000 + l
                }
            }
        }
        j = parseInt(c[2]) - 1;
        m = parseInt(c[3]);
        e = parseInt(c[4]);
        f = parseInt(c[5]);
        i = parseInt(c[6]);
        b = 0;
        h = c[7];
        if (h !== "") {
            g = (h.substr(1) + "00").substr(0, 3);
            b = parseInt(g)
        }
        return Date.UTC(l, j, m, e, f, i, b)
    }
    throw "unsupported zulu format: " + n
}
function zulutosec(a) {
    var b = zulutomsec(a);
    return ~~(b / 1000)
}
function zulutodate(a) {
    return new Date(zulutomsec(a))
}
function datetozulu(g, e, f) {
    var b;
    var a = g.getUTCFullYear();
    if (e) {
        if (a < 1950 || 2049 < a) {
            throw "not proper year for UTCTime: " + a
        }
        b = ("" + a).slice(-2)
    } else {
        b = ("000" + a).slice(-4)
    }
    b += ("0" + (g.getUTCMonth() + 1)).slice(-2);
    b += ("0" + g.getUTCDate()).slice(-2);
    b += ("0" + g.getUTCHours()).slice(-2);
    b += ("0" + g.getUTCMinutes()).slice(-2);
    b += ("0" + g.getUTCSeconds()).slice(-2);
    if (f) {
        var c = g.getUTCMilliseconds();
        if (c !== 0) {
            c = ("00" + c).slice(-3);
            c = c.replace(/0+$/g, "");
            b += "." + c
        }
    }
    b += "Z";
    return b
}
function uricmptohex(a) {
    return a.replace(/%/g, "")
}
function hextouricmp(a) {
    return a.replace(/(..)/g, "%$1")
}
function ipv6tohex(g) {
    var b = "malformed IPv6 address";
    if (!g.match(/^[0-9A-Fa-f:]+$/)) {
        throw b
    }
    g = g.toLowerCase();
    var d = g.split(":").length - 1;
    if (d < 2) {
        throw b
    }
    var e = ":".repeat(7 - d + 2);
    g = g.replace("::", e);
    var c = g.split(":");
    if (c.length != 8) {
        throw b
    }
    for (var f = 0; f < 8; f++) {
        c[f] = ("0000" + c[f]).slice(-4)
    }
    return c.join("")
}
function hextoipv6(e) {
    if (!e.match(/^[0-9A-Fa-f]{32}$/)) {
        throw "malformed IPv6 address octet"
    }
    e = e.toLowerCase();
    var b = e.match(/.{1,4}/g);
    for (var d = 0; d < 8; d++) {
        b[d] = b[d].replace(/^0+/, "");
        if (b[d] == "") {
            b[d] = "0"
        }
    }
    e = ":" + b.join(":") + ":";
    var c = e.match(/:(0:){2,}/g);
    if (c === null) {
        return e.slice(1, -1)
    }
    var f = "";
    for (var d = 0; d < c.length; d++) {
        if (c[d].length > f.length) {
            f = c[d]
        }
    }
    e = e.replace(f, "::");
    return e.slice(1, -1)
}
function hextoip(b) {
    var d = "malformed hex value";
    if (!b.match(/^([0-9A-Fa-f][0-9A-Fa-f]){1,}$/)) {
        throw d
    }
    if (b.length == 8) {
        var c;
        try {
            c = parseInt(b.substr(0, 2), 16) + "." + parseInt(b.substr(2, 2), 16) + "." + parseInt(b.substr(4, 2), 16) + "." + parseInt(b.substr(6, 2), 16);
            return c
        } catch (a) {
            throw d
        }
    } else {
        if (b.length == 32) {
            return hextoipv6(b)
        } else {
            return b
        }
    }
}
function iptohex(f) {
    var j = "malformed IP address";
    f = f.toLowerCase(f);
    if (f.match(/^[0-9.]+$/)) {
        var b = f.split(".");
        if (b.length !== 4) {
            throw j
        }
        var g = "";
        try {
            for (var e = 0; e < 4; e++) {
                var h = parseInt(b[e]);
                g += ("0" + h.toString(16)).slice(-2)
            }
            return g
        } catch (c) {
            throw j
        }
    } else {
        if (f.match(/^[0-9a-f:]+$/) && f.indexOf(":") !== -1) {
            return ipv6tohex(f)
        } else {
            throw j
        }
    }
}
function encodeURIComponentAll(a) {
    var d = encodeURIComponent(a);
    var b = "";
    for (var c = 0; c < d.length; c++) {
        if (d[c] == "%") {
            b = b + d.substr(c, 3);
            c = c + 2
        } else {
            b = b + "%" + stohex(d[c])
        }
    }
    return b
}
function newline_toUnix(a) {
    a = a.replace(/\r\n/mg, "\n");
    return a
}
function newline_toDos(a) {
    a = a.replace(/\r\n/mg, "\n");
    a = a.replace(/\n/mg, "\r\n");
    return a
}
KJUR.lang.String.isInteger = function(a) {
    if (a.match(/^[0-9]+$/)) {
        return true
    } else {
        if (a.match(/^-[0-9]+$/)) {
            return true
        } else {
            return false
        }
    }
}
;
KJUR.lang.String.isHex = function(a) {
    if (a.length % 2 == 0 && (a.match(/^[0-9a-f]+$/) || a.match(/^[0-9A-F]+$/))) {
        return true
    } else {
        return false
    }
}
;
KJUR.lang.String.isBase64 = function(a) {
    a = a.replace(/\s+/g, "");
    if (a.match(/^[0-9A-Za-z+\/]+={0,3}$/) && a.length % 4 == 0) {
        return true
    } else {
        return false
    }
}
;
KJUR.lang.String.isBase64URL = function(a) {
    if (a.match(/[+/=]/)) {
        return false
    }
    a = b64utob64(a);
    return KJUR.lang.String.isBase64(a)
}
;
KJUR.lang.String.isIntegerArray = function(a) {
    a = a.replace(/\s+/g, "");
    if (a.match(/^\[[0-9,]+\]$/)) {
        return true
    } else {
        return false
    }
}
;
function hextoposhex(a) {
    if (a.length % 2 == 1) {
        return "0" + a
    }
    if (a.substr(0, 1) > "7") {
        return "00" + a
    }
    return a
}
function intarystrtohex(b) {
    b = b.replace(/^\s*\[\s*/, "");
    b = b.replace(/\s*\]\s*$/, "");
    b = b.replace(/\s*/g, "");
    try {
        var c = b.split(/,/).map(function(g, e, h) {
            var f = parseInt(g);
            if (f < 0 || 255 < f) {
                throw "integer not in range 0-255"
            }
            var d = ("00" + f.toString(16)).slice(-2);
            return d
        }).join("");
        return c
    } catch (a) {
        throw "malformed integer array string: " + a
    }
}
var strdiffidx = function(c, a) {
    var d = c.length;
    if (c.length > a.length) {
        d = a.length
    }
    for (var b = 0; b < d; b++) {
        if (c.charCodeAt(b) != a.charCodeAt(b)) {
            return b
        }
    }
    if (c.length != a.length) {
        return d
    }
    return -1
};
if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {}
}
if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {
    KJUR.crypto = {}
}
KJUR.crypto.Util = new function() {
    this.DIGESTINFOHEAD = {
        sha1: "3021300906052b0e03021a05000414",
        sha224: "302d300d06096086480165030402040500041c",
        sha256: "3031300d060960864801650304020105000420",
        sha384: "3041300d060960864801650304020205000430",
        sha512: "3051300d060960864801650304020305000440",
        md2: "3020300c06082a864886f70d020205000410",
        md5: "3020300c06082a864886f70d020505000410",
        ripemd160: "3021300906052b2403020105000414",
    };
    this.DEFAULTPROVIDER = {
        md5: "cryptojs",
        sha1: "cryptojs",
        sha224: "cryptojs",
        sha256: "cryptojs",
        sha384: "cryptojs",
        sha512: "cryptojs",
        ripemd160: "cryptojs",
        hmacmd5: "cryptojs",
        hmacsha1: "cryptojs",
        hmacsha224: "cryptojs",
        hmacsha256: "cryptojs",
        hmacsha384: "cryptojs",
        hmacsha512: "cryptojs",
        hmacripemd160: "cryptojs",
        MD5withRSA: "cryptojs/jsrsa",
        SHA1withRSA: "cryptojs/jsrsa",
        SHA224withRSA: "cryptojs/jsrsa",
        SHA256withRSA: "cryptojs/jsrsa",
        SHA384withRSA: "cryptojs/jsrsa",
        SHA512withRSA: "cryptojs/jsrsa",
        RIPEMD160withRSA: "cryptojs/jsrsa",
        MD5withECDSA: "cryptojs/jsrsa",
        SHA1withECDSA: "cryptojs/jsrsa",
        SHA224withECDSA: "cryptojs/jsrsa",
        SHA256withECDSA: "cryptojs/jsrsa",
        SHA384withECDSA: "cryptojs/jsrsa",
        SHA512withECDSA: "cryptojs/jsrsa",
        RIPEMD160withECDSA: "cryptojs/jsrsa",
        SHA1withDSA: "cryptojs/jsrsa",
        SHA224withDSA: "cryptojs/jsrsa",
        SHA256withDSA: "cryptojs/jsrsa",
        MD5withRSAandMGF1: "cryptojs/jsrsa",
        SHA1withRSAandMGF1: "cryptojs/jsrsa",
        SHA224withRSAandMGF1: "cryptojs/jsrsa",
        SHA256withRSAandMGF1: "cryptojs/jsrsa",
        SHA384withRSAandMGF1: "cryptojs/jsrsa",
        SHA512withRSAandMGF1: "cryptojs/jsrsa",
        RIPEMD160withRSAandMGF1: "cryptojs/jsrsa",
    };
    this.CRYPTOJSMESSAGEDIGESTNAME = {
        md5: CryptoJS.algo.MD5,
        sha1: CryptoJS.algo.SHA1,
        sha224: CryptoJS.algo.SHA224,
        sha256: CryptoJS.algo.SHA256,
        sha384: CryptoJS.algo.SHA384,
        sha512: CryptoJS.algo.SHA512,
        ripemd160: CryptoJS.algo.RIPEMD160
    };
    this.getDigestInfoHex = function(a, b) {
        if (typeof this.DIGESTINFOHEAD[b] == "undefined") {
            throw "alg not supported in Util.DIGESTINFOHEAD: " + b
        }
        return this.DIGESTINFOHEAD[b] + a
    }
    ;
    this.getPaddedDigestInfoHex = function(h, a, j) {
        var c = this.getDigestInfoHex(h, a);
        var d = j / 4;
        if (c.length + 22 > d) {
            throw "key is too short for SigAlg: keylen=" + j + "," + a
        }
        var b = "0001";
        var k = "00" + c;
        var g = "";
        var l = d - b.length - k.length;
        for (var f = 0; f < l; f += 2) {
            g += "ff"
        }
        var e = b + g + k;
        return e
    }
    ;
    this.hashString = function(a, c) {
        var b = new KJUR.crypto.MessageDigest({
            alg: c
        });
        return b.digestString(a)
    }
    ;
    this.hashHex = function(b, c) {
        var a = new KJUR.crypto.MessageDigest({
            alg: c
        });
        return a.digestHex(b)
    }
    ;
    this.sha1 = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha1",
            prov: "cryptojs"
        });
        return b.digestString(a)
    }
    ;
    this.sha256 = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha256",
            prov: "cryptojs"
        });
        return b.digestString(a)
    }
    ;
    this.sha256Hex = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha256",
            prov: "cryptojs"
        });
        return b.digestHex(a)
    }
    ;
    this.sha512 = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha512",
            prov: "cryptojs"
        });
        return b.digestString(a)
    }
    ;
    this.sha512Hex = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha512",
            prov: "cryptojs"
        });
        return b.digestHex(a)
    }
}
;
KJUR.crypto.Util.md5 = function(a) {
    var b = new KJUR.crypto.MessageDigest({
        alg: "md5",
        prov: "cryptojs"
    });
    return b.digestString(a)
}
;
KJUR.crypto.Util.ripemd160 = function(a) {
    var b = new KJUR.crypto.MessageDigest({
        alg: "ripemd160",
        prov: "cryptojs"
    });
    return b.digestString(a)
}
;
KJUR.crypto.Util.SECURERANDOMGEN = new SecureRandom();
KJUR.crypto.Util.getRandomHexOfNbytes = function(b) {
    var a = new Array(b);
    KJUR.crypto.Util.SECURERANDOMGEN.nextBytes(a);
    return BAtohex(a)
}
;
KJUR.crypto.Util.getRandomBigIntegerOfNbytes = function(a) {
    return new BigInteger(KJUR.crypto.Util.getRandomHexOfNbytes(a),16)
}
;
KJUR.crypto.Util.getRandomHexOfNbits = function(d) {
    var c = d % 8;
    var a = (d - c) / 8;
    var b = new Array(a + 1);
    KJUR.crypto.Util.SECURERANDOMGEN.nextBytes(b);
    b[0] = (((255 << c) & 255) ^ 255) & b[0];
    return BAtohex(b)
}
;
KJUR.crypto.Util.getRandomBigIntegerOfNbits = function(a) {
    return new BigInteger(KJUR.crypto.Util.getRandomHexOfNbits(a),16)
}
;
KJUR.crypto.Util.getRandomBigIntegerZeroToMax = function(b) {
    var a = b.bitLength();
    while (1) {
        var c = KJUR.crypto.Util.getRandomBigIntegerOfNbits(a);
        if (b.compareTo(c) != -1) {
            return c
        }
    }
}
;
KJUR.crypto.Util.getRandomBigIntegerMinToMax = function(e, b) {
    var c = e.compareTo(b);
    if (c == 1) {
        throw "biMin is greater than biMax"
    }
    if (c == 0) {
        return e
    }
    var a = b.subtract(e);
    var d = KJUR.crypto.Util.getRandomBigIntegerZeroToMax(a);
    return d.add(e)
}
;
KJUR.crypto.MessageDigest = function(c) {
    var b = null;
    var a = null;
    var d = null;
    this.setAlgAndProvider = function(g, f) {
        g = KJUR.crypto.MessageDigest.getCanonicalAlgName(g);
        if (g !== null && f === undefined) {
            f = KJUR.crypto.Util.DEFAULTPROVIDER[g]
        }
        if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(g) != -1 && f == "cryptojs") {
            try {
                this.md = KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[g].create()
            } catch (e) {
                throw "setAlgAndProvider hash alg set fail alg=" + g + "/" + e
            }
            this.updateString = function(h) {
                this.md.update(h)
            }
            ;
            this.updateHex = function(h) {
                var i = CryptoJS.enc.Hex.parse(h);
                this.md.update(i)
            }
            ;
            this.digest = function() {
                var h = this.md.finalize();
                return h.toString(CryptoJS.enc.Hex)
            }
            ;
            this.digestString = function(h) {
                this.updateString(h);
                return this.digest()
            }
            ;
            this.digestHex = function(h) {
                this.updateHex(h);
                return this.digest()
            }
        }
        if (":sha256:".indexOf(g) != -1 && f == "sjcl") {
            try {
                this.md = new sjcl.hash.sha256()
            } catch (e) {
                throw "setAlgAndProvider hash alg set fail alg=" + g + "/" + e
            }
            this.updateString = function(h) {
                this.md.update(h)
            }
            ;
            this.updateHex = function(i) {
                var h = sjcl.codec.hex.toBits(i);
                this.md.update(h)
            }
            ;
            this.digest = function() {
                var h = this.md.finalize();
                return sjcl.codec.hex.fromBits(h)
            }
            ;
            this.digestString = function(h) {
                this.updateString(h);
                return this.digest()
            }
            ;
            this.digestHex = function(h) {
                this.updateHex(h);
                return this.digest()
            }
        }
    }
    ;
    this.updateString = function(e) {
        throw "updateString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName
    }
    ;
    this.updateHex = function(e) {
        throw "updateHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName
    }
    ;
    this.digest = function() {
        throw "digest() not supported for this alg/prov: " + this.algName + "/" + this.provName
    }
    ;
    this.digestString = function(e) {
        throw "digestString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName
    }
    ;
    this.digestHex = function(e) {
        throw "digestHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName
    }
    ;
    if (c !== undefined) {
        if (c.alg !== undefined) {
            this.algName = c.alg;
            if (c.prov === undefined) {
                this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName]
            }
            this.setAlgAndProvider(this.algName, this.provName)
        }
    }
}
;
KJUR.crypto.MessageDigest.getCanonicalAlgName = function(a) {
    if (typeof a === "string") {
        a = a.toLowerCase();
        a = a.replace(/-/, "")
    }
    return a
}
;
KJUR.crypto.MessageDigest.getHashLength = function(c) {
    var b = KJUR.crypto.MessageDigest;
    var a = b.getCanonicalAlgName(c);
    if (b.HASHLENGTH[a] === undefined) {
        throw "not supported algorithm: " + c
    }
    return b.HASHLENGTH[a]
}
;
KJUR.crypto.MessageDigest.HASHLENGTH = {
    md5: 16,
    sha1: 20,
    sha224: 28,
    sha256: 32,
    sha384: 48,
    sha512: 64,
    ripemd160: 20
};
KJUR.crypto.Mac = function(d) {
    var f = null;
    var c = null;
    var a = null;
    var e = null;
    var b = null;
    this.setAlgAndProvider = function(k, i) {
        k = k.toLowerCase();
        if (k == null) {
            k = "hmacsha1"
        }
        k = k.toLowerCase();
        if (k.substr(0, 4) != "hmac") {
            throw "setAlgAndProvider unsupported HMAC alg: " + k
        }
        if (i === undefined) {
            i = KJUR.crypto.Util.DEFAULTPROVIDER[k]
        }
        this.algProv = k + "/" + i;
        var g = k.substr(4);
        if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(g) != -1 && i == "cryptojs") {
            try {
                var j = KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[g];
                this.mac = CryptoJS.algo.HMAC.create(j, this.pass)
            } catch (h) {
                throw "setAlgAndProvider hash alg set fail hashAlg=" + g + "/" + h
            }
            this.updateString = function(l) {
                this.mac.update(l)
            }
            ;
            this.updateHex = function(l) {
                var m = CryptoJS.enc.Hex.parse(l);
                this.mac.update(m)
            }
            ;
            this.doFinal = function() {
                var l = this.mac.finalize();
                return l.toString(CryptoJS.enc.Hex)
            }
            ;
            this.doFinalString = function(l) {
                this.updateString(l);
                return this.doFinal()
            }
            ;
            this.doFinalHex = function(l) {
                this.updateHex(l);
                return this.doFinal()
            }
        }
    }
    ;
    this.updateString = function(g) {
        throw "updateString(str) not supported for this alg/prov: " + this.algProv
    }
    ;
    this.updateHex = function(g) {
        throw "updateHex(hex) not supported for this alg/prov: " + this.algProv
    }
    ;
    this.doFinal = function() {
        throw "digest() not supported for this alg/prov: " + this.algProv
    }
    ;
    this.doFinalString = function(g) {
        throw "digestString(str) not supported for this alg/prov: " + this.algProv
    }
    ;
    this.doFinalHex = function(g) {
        throw "digestHex(hex) not supported for this alg/prov: " + this.algProv
    }
    ;
    this.setPassword = function(h) {
        if (typeof h == "string") {
            var g = h;
            if (h.length % 2 == 1 || !h.match(/^[0-9A-Fa-f]+$/)) {
                g = rstrtohex(h)
            }
            this.pass = CryptoJS.enc.Hex.parse(g);
            return
        }
        if (typeof h != "object") {
            throw "KJUR.crypto.Mac unsupported password type: " + h
        }
        var g = null;
        if (h.hex !== undefined) {
            if (h.hex.length % 2 != 0 || !h.hex.match(/^[0-9A-Fa-f]+$/)) {
                throw "Mac: wrong hex password: " + h.hex
            }
            g = h.hex
        }
        if (h.utf8 !== undefined) {
            g = utf8tohex(h.utf8)
        }
        if (h.rstr !== undefined) {
            g = rstrtohex(h.rstr)
        }
        if (h.b64 !== undefined) {
            g = b64tohex(h.b64)
        }
        if (h.b64u !== undefined) {
            g = b64utohex(h.b64u)
        }
        if (g == null) {
            throw "KJUR.crypto.Mac unsupported password type: " + h
        }
        this.pass = CryptoJS.enc.Hex.parse(g)
    }
    ;
    if (d !== undefined) {
        if (d.pass !== undefined) {
            this.setPassword(d.pass)
        }
        if (d.alg !== undefined) {
            this.algName = d.alg;
            if (d.prov === undefined) {
                this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName]
            }
            this.setAlgAndProvider(this.algName, this.provName)
        }
    }
}
;
KJUR.crypto.Signature = function(o) {
    var q = null;
    var n = null;
    var r = null;
    var c = null;
    var l = null;
    var d = null;
    var k = null;
    var h = null;
    var p = null;
    var e = null;
    var b = -1;
    var g = null;
    var j = null;
    var a = null;
    var i = null;
    var f = null;
    this._setAlgNames = function() {
        var s = this.algName.match(/^(.+)with(.+)$/);
        if (s) {
            this.mdAlgName = s[1].toLowerCase();
            this.pubkeyAlgName = s[2].toLowerCase()
        }
    }
    ;
    this._zeroPaddingOfSignature = function(x, w) {
        var v = "";
        var t = w / 4 - x.length;
        for (var u = 0; u < t; u++) {
            v = v + "0"
        }
        return v + x
    }
    ;
    this.setAlgAndProvider = function(u, t) {
        this._setAlgNames();
        if (t != "cryptojs/jsrsa") {
            throw "provider not supported: " + t
        }
        if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName) != -1) {
            try {
                this.md = new KJUR.crypto.MessageDigest({
                    alg: this.mdAlgName
                })
            } catch (s) {
                throw "setAlgAndProvider hash alg set fail alg=" + this.mdAlgName + "/" + s
            }
            this.init = function(w, x) {
                var y = null;
                try {
                    if (x === undefined) {
                        y = KEYUTIL.getKey(w)
                    } else {
                        y = KEYUTIL.getKey(w, x)
                    }
                } catch (v) {
                    throw "init failed:" + v
                }
                if (y.isPrivate === true) {
                    this.prvKey = y;
                    this.state = "SIGN"
                } else {
                    if (y.isPublic === true) {
                        this.pubKey = y;
                        this.state = "VERIFY"
                    } else {
                        throw "init failed.:" + y
                    }
                }
            }
            ;
            this.updateString = function(v) {
                this.md.updateString(v)
            }
            ;
            this.updateHex = function(v) {
                this.md.updateHex(v)
            }
            ;
            this.sign = function() {
                this.sHashHex = this.md.digest();
                if (typeof this.ecprvhex != "undefined" && typeof this.eccurvename != "undefined") {
                    var v = new KJUR.crypto.ECDSA({
                        curve: this.eccurvename
                    });
                    this.hSign = v.signHex(this.sHashHex, this.ecprvhex)
                } else {
                    if (this.prvKey instanceof RSAKey && this.pubkeyAlgName === "rsaandmgf1") {
                        this.hSign = this.prvKey.signWithMessageHashPSS(this.sHashHex, this.mdAlgName, this.pssSaltLen)
                    } else {
                        if (this.prvKey instanceof RSAKey && this.pubkeyAlgName === "rsa") {
                            this.hSign = this.prvKey.signWithMessageHash(this.sHashHex, this.mdAlgName)
                        } else {
                            if (this.prvKey instanceof KJUR.crypto.ECDSA) {
                                this.hSign = this.prvKey.signWithMessageHash(this.sHashHex)
                            } else {
                                if (this.prvKey instanceof KJUR.crypto.DSA) {
                                    this.hSign = this.prvKey.signWithMessageHash(this.sHashHex)
                                } else {
                                    throw "Signature: unsupported private key alg: " + this.pubkeyAlgName
                                }
                            }
                        }
                    }
                }
                return this.hSign
            }
            ;
            this.signString = function(v) {
                this.updateString(v);
                return this.sign()
            }
            ;
            this.signHex = function(v) {
                this.updateHex(v);
                return this.sign()
            }
            ;
            this.verify = function(v) {
                this.sHashHex = this.md.digest();
                if (typeof this.ecpubhex != "undefined" && typeof this.eccurvename != "undefined") {
                    var w = new KJUR.crypto.ECDSA({
                        curve: this.eccurvename
                    });
                    return w.verifyHex(this.sHashHex, v, this.ecpubhex)
                } else {
                    if (this.pubKey instanceof RSAKey && this.pubkeyAlgName === "rsaandmgf1") {
                        return this.pubKey.verifyWithMessageHashPSS(this.sHashHex, v, this.mdAlgName, this.pssSaltLen)
                    } else {
                        if (this.pubKey instanceof RSAKey && this.pubkeyAlgName === "rsa") {
                            return this.pubKey.verifyWithMessageHash(this.sHashHex, v)
                        } else {
                            if (KJUR.crypto.ECDSA !== undefined && this.pubKey instanceof KJUR.crypto.ECDSA) {
                                return this.pubKey.verifyWithMessageHash(this.sHashHex, v)
                            } else {
                                if (KJUR.crypto.DSA !== undefined && this.pubKey instanceof KJUR.crypto.DSA) {
                                    return this.pubKey.verifyWithMessageHash(this.sHashHex, v)
                                } else {
                                    throw "Signature: unsupported public key alg: " + this.pubkeyAlgName
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    ;
    this.init = function(s, t) {
        throw "init(key, pass) not supported for this alg:prov=" + this.algProvName
    }
    ;
    this.updateString = function(s) {
        throw "updateString(str) not supported for this alg:prov=" + this.algProvName
    }
    ;
    this.updateHex = function(s) {
        throw "updateHex(hex) not supported for this alg:prov=" + this.algProvName
    }
    ;
    this.sign = function() {
        throw "sign() not supported for this alg:prov=" + this.algProvName
    }
    ;
    this.signString = function(s) {
        throw "digestString(str) not supported for this alg:prov=" + this.algProvName
    }
    ;
    this.signHex = function(s) {
        throw "digestHex(hex) not supported for this alg:prov=" + this.algProvName
    }
    ;
    this.verify = function(s) {
        throw "verify(hSigVal) not supported for this alg:prov=" + this.algProvName
    }
    ;
    this.initParams = o;
    if (o !== undefined) {
        if (o.alg !== undefined) {
            this.algName = o.alg;
            if (o.prov === undefined) {
                this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName]
            } else {
                this.provName = o.prov
            }
            this.algProvName = this.algName + ":" + this.provName;
            this.setAlgAndProvider(this.algName, this.provName);
            this._setAlgNames()
        }
        if (o.psssaltlen !== undefined) {
            this.pssSaltLen = o.psssaltlen
        }
        if (o.prvkeypem !== undefined) {
            if (o.prvkeypas !== undefined) {
                throw "both prvkeypem and prvkeypas parameters not supported"
            } else {
                try {
                    var q = KEYUTIL.getKey(o.prvkeypem);
                    this.init(q)
                } catch (m) {
                    throw "fatal error to load pem private key: " + m
                }
            }
        }
    }
}
;
KJUR.crypto.Cipher = function(a) {}
;
KJUR.crypto.Cipher.encrypt = function(e, f, d) {
    if (f instanceof RSAKey && f.isPublic) {
        var c = KJUR.crypto.Cipher.getAlgByKeyAndName(f, d);
        if (c === "RSA") {
            return f.encrypt(e)
        }
        if (c === "RSAOAEP") {
            return f.encryptOAEP(e, "sha1")
        }
        var b = c.match(/^RSAOAEP(\d+)$/);
        if (b !== null) {
            return f.encryptOAEP(e, "sha" + b[1])
        }
        throw "Cipher.encrypt: unsupported algorithm for RSAKey: " + d
    } else {
        throw "Cipher.encrypt: unsupported key or algorithm"
    }
}
;
KJUR.crypto.Cipher.decrypt = function(e, f, d) {
    if (f instanceof RSAKey && f.isPrivate) {
        var c = KJUR.crypto.Cipher.getAlgByKeyAndName(f, d);
        if (c === "RSA") {
            return f.decrypt(e)
        }
        if (c === "RSAOAEP") {
            return f.decryptOAEP(e, "sha1")
        }
        var b = c.match(/^RSAOAEP(\d+)$/);
        if (b !== null) {
            return f.decryptOAEP(e, "sha" + b[1])
        }
        throw "Cipher.decrypt: unsupported algorithm for RSAKey: " + d
    } else {
        throw "Cipher.decrypt: unsupported key or algorithm"
    }
}
;
KJUR.crypto.Cipher.getAlgByKeyAndName = function(b, a) {
    if (b instanceof RSAKey) {
        if (":RSA:RSAOAEP:RSAOAEP224:RSAOAEP256:RSAOAEP384:RSAOAEP512:".indexOf(a) != -1) {
            return a
        }
        if (a === null || a === undefined) {
            return "RSA"
        }
        throw "getAlgByKeyAndName: not supported algorithm name for RSAKey: " + a
    }
    throw "getAlgByKeyAndName: not supported algorithm name: " + a
}
;
KJUR.crypto.OID = new function() {
    this.oidhex2name = {
        "2a864886f70d010101": "rsaEncryption",
        "2a8648ce3d0201": "ecPublicKey",
        "2a8648ce380401": "dsa",
        "2a8648ce3d030107": "secp256r1",
        "2b8104001f": "secp192k1",
        "2b81040021": "secp224r1",
        "2b8104000a": "secp256k1",
        "2b81040023": "secp521r1",
        "2b81040022": "secp384r1",
        "2a8648ce380403": "SHA1withDSA",
        "608648016503040301": "SHA224withDSA",
        "608648016503040302": "SHA256withDSA",
    }
}
;
KEYUTIL = function() {
    var d = function(p, r, q) {
        return k(CryptoJS.AES, p, r, q)
    };
    var e = function(p, r, q) {
        return k(CryptoJS.TripleDES, p, r, q)
    };
    var a = function(p, r, q) {
        return k(CryptoJS.DES, p, r, q)
    };
    var k = function(s, x, u, q) {
        var r = CryptoJS.enc.Hex.parse(x);
        var w = CryptoJS.enc.Hex.parse(u);
        var p = CryptoJS.enc.Hex.parse(q);
        var t = {};
        t.key = w;
        t.iv = p;
        t.ciphertext = r;
        var v = s.decrypt(t, w, {
            iv: p
        });
        return CryptoJS.enc.Hex.stringify(v)
    };
    var l = function(p, r, q) {
        return g(CryptoJS.AES, p, r, q)
    };
    var o = function(p, r, q) {
        return g(CryptoJS.TripleDES, p, r, q)
    };
    var f = function(p, r, q) {
        return g(CryptoJS.DES, p, r, q)
    };
    var g = function(t, y, v, q) {
        var s = CryptoJS.enc.Hex.parse(y);
        var x = CryptoJS.enc.Hex.parse(v);
        var p = CryptoJS.enc.Hex.parse(q);
        var w = t.encrypt(s, x, {
            iv: p
        });
        var r = CryptoJS.enc.Hex.parse(w.toString());
        var u = CryptoJS.enc.Base64.stringify(r);
        return u
    };
    var i = {
        "AES-256-CBC": {
            proc: d,
            eproc: l,
            keylen: 32,
            ivlen: 16
        },
        "AES-192-CBC": {
            proc: d,
            eproc: l,
            keylen: 24,
            ivlen: 16
        },
        "AES-128-CBC": {
            proc: d,
            eproc: l,
            keylen: 16,
            ivlen: 16
        },
        "DES-EDE3-CBC": {
            proc: e,
            eproc: o,
            keylen: 24,
            ivlen: 8
        },
        "DES-CBC": {
            proc: a,
            eproc: f,
            keylen: 8,
            ivlen: 8
        }
    };
    var c = function(p) {
        return i[p]["proc"]
    };
    var m = function(p) {
        var r = CryptoJS.lib.WordArray.random(p);
        var q = CryptoJS.enc.Hex.stringify(r);
        return q
    };
    var n = function(v) {
        var w = {};
        var q = v.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)","m"));
        if (q) {
            w.cipher = q[1];
            w.ivsalt = q[2]
        }
        var p = v.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"));
        if (p) {
            w.type = p[1]
        }
        var u = -1;
        var x = 0;
        if (v.indexOf("\r\n\r\n") != -1) {
            u = v.indexOf("\r\n\r\n");
            x = 2
        }
        if (v.indexOf("\n\n") != -1) {
            u = v.indexOf("\n\n");
            x = 1
        }
        var t = v.indexOf("-----END");
        if (u != -1 && t != -1) {
            var r = v.substring(u + x * 2, t - x);
            r = r.replace(/\s+/g, "");
            w.data = r
        }
        return w
    };
    var j = function(q, y, p) {
        var v = p.substring(0, 16);
        var t = CryptoJS.enc.Hex.parse(v);
        var r = CryptoJS.enc.Utf8.parse(y);
        var u = i[q]["keylen"] + i[q]["ivlen"];
        var x = "";
        var w = null;
        for (; ; ) {
            var s = CryptoJS.algo.MD5.create();
            if (w != null) {
                s.update(w)
            }
            s.update(r);
            s.update(t);
            w = s.finalize();
            x = x + CryptoJS.enc.Hex.stringify(w);
            if (x.length >= u * 2) {
                break
            }
        }
        var z = {};
        z.keyhex = x.substr(0, i[q]["keylen"] * 2);
        z.ivhex = x.substr(i[q]["keylen"] * 2, i[q]["ivlen"] * 2);
        return z
    };
    var b = function(p, v, r, w) {
        var s = CryptoJS.enc.Base64.parse(p);
        var q = CryptoJS.enc.Hex.stringify(s);
        var u = i[v]["proc"];
        var t = u(q, r, w);
        return t
    };
    var h = function(p, s, q, u) {
        var r = i[s]["eproc"];
        var t = r(p, q, u);
        return t
    };
    return {
        version: "1.0.0",
        parsePKCS5PEM: function(p) {
            return n(p)
        },
        getKeyAndUnusedIvByPasscodeAndIvsalt: function(q, p, r) {
            return j(q, p, r)
        },
        decryptKeyB64: function(p, r, q, s) {
            return b(p, r, q, s)
        },
        getDecryptedKeyHex: function(y, x) {
            var q = n(y);
            var t = q.type;
            var r = q.cipher;
            var p = q.ivsalt;
            var s = q.data;
            var w = j(r, x, p);
            var v = w.keyhex;
            var u = b(s, r, v, p);
            return u
        },
        getEncryptedPKCS5PEMFromPrvKeyHex: function(x, s, A, t, r) {
            var p = "";
            if (typeof t == "undefined" || t == null) {
                t = "AES-256-CBC"
            }
            if (typeof i[t] == "undefined") {
                throw "KEYUTIL unsupported algorithm: " + t
            }
            if (typeof r == "undefined" || r == null) {
                var v = i[t]["ivlen"];
                var u = m(v);
                r = u.toUpperCase()
            }
            var z = j(t, A, r);
            var y = z.keyhex;
            var w = h(s, t, y, r);
            var q = w.replace(/(.{64})/g, "$1\r\n");
            var p = "-----BEGIN " + x + " PRIVATE KEY-----\r\n";
            p += "Proc-Type: 4,ENCRYPTED\r\n";
            p += "DEK-Info: " + t + "," + r + "\r\n";
            p += "\r\n";
            p += q;
            p += "\r\n-----END " + x + " PRIVATE KEY-----\r\n";
            return p
        },
        parseHexOfEncryptedPKCS8: function(y) {
            var B = ASN1HEX;
            var z = B.getChildIdx;
            var w = B.getV;
            var t = {};
            var r = z(y, 0);
            if (r.length != 2) {
                throw "malformed format: SEQUENCE(0).items != 2: " + r.length
            }
            t.ciphertext = w(y, r[1]);
            var A = z(y, r[0]);
            if (A.length != 2) {
                throw "malformed format: SEQUENCE(0.0).items != 2: " + A.length
            }
            if (w(y, A[0]) != "2a864886f70d01050d") {
                throw "this only supports pkcs5PBES2"
            }
            var p = z(y, A[1]);
            if (A.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1).items != 2: " + p.length
            }
            var q = z(y, p[1]);
            if (q.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1.1).items != 2: " + q.length
            }
            if (w(y, q[0]) != "2a864886f70d0307") {
                throw "this only supports TripleDES"
            }
            t.encryptionSchemeAlg = "TripleDES";
            t.encryptionSchemeIV = w(y, q[1]);
            var s = z(y, p[0]);
            if (s.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1.0).items != 2: " + s.length
            }
            if (w(y, s[0]) != "2a864886f70d01050c") {
                throw "this only supports pkcs5PBKDF2"
            }
            var x = z(y, s[1]);
            if (x.length < 2) {
                throw "malformed format: SEQUENCE(0.0.1.0.1).items < 2: " + x.length
            }
            t.pbkdf2Salt = w(y, x[0]);
            var u = w(y, x[1]);
            try {
                t.pbkdf2Iter = parseInt(u, 16)
            } catch (v) {
                throw "malformed format pbkdf2Iter: " + u
            }
            return t
        },
        getPBKDF2KeyHexFromParam: function(u, p) {
            var t = CryptoJS.enc.Hex.parse(u.pbkdf2Salt);
            var q = u.pbkdf2Iter;
            var s = CryptoJS.PBKDF2(p, t, {
                keySize: 192 / 32,
                iterations: q
            });
            var r = CryptoJS.enc.Hex.stringify(s);
            return r
        },
        _getPlainPKCS8HexFromEncryptedPKCS8PEM: function(x, y) {
            var r = pemtohex(x, "ENCRYPTED PRIVATE KEY");
            var p = this.parseHexOfEncryptedPKCS8(r);
            var u = KEYUTIL.getPBKDF2KeyHexFromParam(p, y);
            var v = {};
            v.ciphertext = CryptoJS.enc.Hex.parse(p.ciphertext);
            var t = CryptoJS.enc.Hex.parse(u);
            var s = CryptoJS.enc.Hex.parse(p.encryptionSchemeIV);
            var w = CryptoJS.TripleDES.decrypt(v, t, {
                iv: s
            });
            var q = CryptoJS.enc.Hex.stringify(w);
            return q
        },
        getKeyFromEncryptedPKCS8PEM: function(s, q) {
            var p = this._getPlainPKCS8HexFromEncryptedPKCS8PEM(s, q);
            var r = this.getKeyFromPlainPrivatePKCS8Hex(p);
            return r
        },
        parsePlainPrivatePKCS8Hex: function(s) {
            var v = ASN1HEX;
            var u = v.getChildIdx;
            var t = v.getV;
            var q = {};
            q.algparam = null;
            if (s.substr(0, 2) != "30") {
                throw "malformed plain PKCS8 private key(code:001)"
            }
            var r = u(s, 0);
            if (r.length != 3) {
                throw "malformed plain PKCS8 private key(code:002)"
            }
            if (s.substr(r[1], 2) != "30") {
                throw "malformed PKCS8 private key(code:003)"
            }
            var p = u(s, r[1]);
            if (p.length != 2) {
                throw "malformed PKCS8 private key(code:004)"
            }
            if (s.substr(p[0], 2) != "06") {
                throw "malformed PKCS8 private key(code:005)"
            }
            q.algoid = t(s, p[0]);
            if (s.substr(p[1], 2) == "06") {
                q.algparam = t(s, p[1])
            }
            if (s.substr(r[2], 2) != "04") {
                throw "malformed PKCS8 private key(code:006)"
            }
            q.keyidx = v.getVidx(s, r[2]);
            return q
        },
        getKeyFromPlainPrivatePKCS8PEM: function(q) {
            var p = pemtohex(q, "PRIVATE KEY");
            var r = this.getKeyFromPlainPrivatePKCS8Hex(p);
            return r
        },
        getKeyFromPlainPrivatePKCS8Hex: function(p) {
            var q = this.parsePlainPrivatePKCS8Hex(p);
            var r;
            if (q.algoid == "2a864886f70d010101") {
                r = new RSAKey()
            } else {
                if (q.algoid == "2a8648ce380401") {
                    r = new KJUR.crypto.DSA()
                } else {
                    if (q.algoid == "2a8648ce3d0201") {
                        r = new KJUR.crypto.ECDSA()
                    } else {
                        throw "unsupported private key algorithm"
                    }
                }
            }
            r.readPKCS8PrvKeyHex(p);
            return r
        },
        _getKeyFromPublicPKCS8Hex: function(q) {
            var p;
            var r = ASN1HEX.getVbyList(q, 0, [0, 0], "06");
            if (r === "2a864886f70d010101") {
                p = new RSAKey()
            } else {
                if (r === "2a8648ce380401") {
                    p = new KJUR.crypto.DSA()
                } else {
                    if (r === "2a8648ce3d0201") {
                        p = new KJUR.crypto.ECDSA()
                    } else {
                        throw "unsupported PKCS#8 public key hex"
                    }
                }
            }
            p.readPKCS8PubKeyHex(q);
            return p
        },
        parsePublicRawRSAKeyHex: function(r) {
            var u = ASN1HEX;
            var t = u.getChildIdx;
            var s = u.getV;
            var p = {};
            if (r.substr(0, 2) != "30") {
                throw "malformed RSA key(code:001)"
            }
            var q = t(r, 0);
            if (q.length != 2) {
                throw "malformed RSA key(code:002)"
            }
            if (r.substr(q[0], 2) != "02") {
                throw "malformed RSA key(code:003)"
            }
            p.n = s(r, q[0]);
            if (r.substr(q[1], 2) != "02") {
                throw "malformed RSA key(code:004)"
            }
            p.e = s(r, q[1]);
            return p
        },
        parsePublicPKCS8Hex: function(t) {
            var v = ASN1HEX;
            var u = v.getChildIdx;
            var s = v.getV;
            var q = {};
            q.algparam = null;
            var r = u(t, 0);
            if (r.length != 2) {
                throw "outer DERSequence shall have 2 elements: " + r.length
            }
            var w = r[0];
            if (t.substr(w, 2) != "30") {
                throw "malformed PKCS8 public key(code:001)"
            }
            var p = u(t, w);
            if (p.length != 2) {
                throw "malformed PKCS8 public key(code:002)"
            }
            if (t.substr(p[0], 2) != "06") {
                throw "malformed PKCS8 public key(code:003)"
            }
            q.algoid = s(t, p[0]);
            if (t.substr(p[1], 2) == "06") {
                q.algparam = s(t, p[1])
            } else {
                if (t.substr(p[1], 2) == "30") {
                    q.algparam = {};
                    q.algparam.p = v.getVbyList(t, p[1], [0], "02");
                    q.algparam.q = v.getVbyList(t, p[1], [1], "02");
                    q.algparam.g = v.getVbyList(t, p[1], [2], "02")
                }
            }
            if (t.substr(r[1], 2) != "03") {
                throw "malformed PKCS8 public key(code:004)"
            }
            q.key = s(t, r[1]).substr(2);
            return q
        },
    }
}();
KEYUTIL.getKey = function(l, k, n) {
    var G = ASN1HEX
      , L = G.getChildIdx
      , v = G.getV
      , d = G.getVbyList
      , c = KJUR.crypto
      , i = c.ECDSA
      , C = c.DSA
      , w = RSAKey
      , M = pemtohex
      , F = KEYUTIL;
    if (typeof w != "undefined" && l instanceof w) {
        return l
    }
    if (typeof i != "undefined" && l instanceof i) {
        return l
    }
    if (typeof C != "undefined" && l instanceof C) {
        return l
    }
    if (l.curve !== undefined && l.xy !== undefined && l.d === undefined) {
        return new i({
            pub: l.xy,
            curve: l.curve
        })
    }
    if (l.curve !== undefined && l.d !== undefined) {
        return new i({
            prv: l.d,
            curve: l.curve
        })
    }
    if (l.kty === undefined && l.n !== undefined && l.e !== undefined && l.d === undefined) {
        var P = new w();
        P.setPublic(l.n, l.e);
        return P
    }
    if (l.kty === undefined && l.n !== undefined && l.e !== undefined && l.d !== undefined && l.p !== undefined && l.q !== undefined && l.dp !== undefined && l.dq !== undefined && l.co !== undefined && l.qi === undefined) {
        var P = new w();
        P.setPrivateEx(l.n, l.e, l.d, l.p, l.q, l.dp, l.dq, l.co);
        return P
    }
    if (l.kty === undefined && l.n !== undefined && l.e !== undefined && l.d !== undefined && l.p === undefined) {
        var P = new w();
        P.setPrivate(l.n, l.e, l.d);
        return P
    }
    if (l.p !== undefined && l.q !== undefined && l.g !== undefined && l.y !== undefined && l.x === undefined) {
        var P = new C();
        P.setPublic(l.p, l.q, l.g, l.y);
        return P
    }
    if (l.p !== undefined && l.q !== undefined && l.g !== undefined && l.y !== undefined && l.x !== undefined) {
        var P = new C();
        P.setPrivate(l.p, l.q, l.g, l.y, l.x);
        return P
    }
    if (l.kty === "RSA" && l.n !== undefined && l.e !== undefined && l.d === undefined) {
        var P = new w();
        P.setPublic(b64utohex(l.n), b64utohex(l.e));
        return P
    }
    if (l.kty === "RSA" && l.n !== undefined && l.e !== undefined && l.d !== undefined && l.p !== undefined && l.q !== undefined && l.dp !== undefined && l.dq !== undefined && l.qi !== undefined) {
        var P = new w();
        P.setPrivateEx(b64utohex(l.n), b64utohex(l.e), b64utohex(l.d), b64utohex(l.p), b64utohex(l.q), b64utohex(l.dp), b64utohex(l.dq), b64utohex(l.qi));
        return P
    }
    if (l.kty === "RSA" && l.n !== undefined && l.e !== undefined && l.d !== undefined) {
        var P = new w();
        P.setPrivate(b64utohex(l.n), b64utohex(l.e), b64utohex(l.d));
        return P
    }
    if (l.kty === "EC" && l.crv !== undefined && l.x !== undefined && l.y !== undefined && l.d === undefined) {
        var j = new i({
            curve: l.crv
        });
        var t = j.ecparams.keylen / 4;
        var B = ("0000000000" + b64utohex(l.x)).slice(-t);
        var z = ("0000000000" + b64utohex(l.y)).slice(-t);
        var u = "04" + B + z;
        j.setPublicKeyHex(u);
        return j
    }
    if (l.kty === "EC" && l.crv !== undefined && l.x !== undefined && l.y !== undefined && l.d !== undefined) {
        var j = new i({
            curve: l.crv
        });
        var t = j.ecparams.keylen / 4;
        var B = ("0000000000" + b64utohex(l.x)).slice(-t);
        var z = ("0000000000" + b64utohex(l.y)).slice(-t);
        var u = "04" + B + z;
        var b = ("0000000000" + b64utohex(l.d)).slice(-t);
        j.setPublicKeyHex(u);
        j.setPrivateKeyHex(b);
        return j
    }
    if (n === "pkcs5prv") {
        var J = l, G = ASN1HEX, N, P;
        N = L(J, 0);
        if (N.length === 9) {
            P = new w();
            P.readPKCS5PrvKeyHex(J)
        } else {
            if (N.length === 6) {
                P = new C();
                P.readPKCS5PrvKeyHex(J)
            } else {
                if (N.length > 2 && J.substr(N[1], 2) === "04") {
                    P = new i();
                    P.readPKCS5PrvKeyHex(J)
                } else {
                    throw "unsupported PKCS#1/5 hexadecimal key"
                }
            }
        }
        return P
    }
    if (n === "pkcs8prv") {
        var P = F.getKeyFromPlainPrivatePKCS8Hex(l);
        return P
    }
    if (n === "pkcs8pub") {
        return F._getKeyFromPublicPKCS8Hex(l)
    }
    if (n === "x509pub") {
        return X509.getPublicKeyFromCertHex(l)
    }
    if (l.indexOf("-END CERTIFICATE-", 0) != -1 || l.indexOf("-END X509 CERTIFICATE-", 0) != -1 || l.indexOf("-END TRUSTED CERTIFICATE-", 0) != -1) {
        return X509.getPublicKeyFromCertPEM(l)
    }
    if (l.indexOf("-END PUBLIC KEY-") != -1) {
        var O = pemtohex(l, "PUBLIC KEY");
        return F._getKeyFromPublicPKCS8Hex(O)
    }
    if (l.indexOf("-END RSA PRIVATE KEY-") != -1 && l.indexOf("4,ENCRYPTED") == -1) {
        var m = M(l, "RSA PRIVATE KEY");
        return F.getKey(m, null, "pkcs5prv")
    }
    if (l.indexOf("-END DSA PRIVATE KEY-") != -1 && l.indexOf("4,ENCRYPTED") == -1) {
        var I = M(l, "DSA PRIVATE KEY");
        var E = d(I, 0, [1], "02");
        var D = d(I, 0, [2], "02");
        var K = d(I, 0, [3], "02");
        var r = d(I, 0, [4], "02");
        var s = d(I, 0, [5], "02");
        var P = new C();
        P.setPrivate(new BigInteger(E,16), new BigInteger(D,16), new BigInteger(K,16), new BigInteger(r,16), new BigInteger(s,16));
        return P
    }
    if (l.indexOf("-END PRIVATE KEY-") != -1) {
        return F.getKeyFromPlainPrivatePKCS8PEM(l)
    }
    if (l.indexOf("-END RSA PRIVATE KEY-") != -1 && l.indexOf("4,ENCRYPTED") != -1) {
        var o = F.getDecryptedKeyHex(l, k);
        var H = new RSAKey();
        H.readPKCS5PrvKeyHex(o);
        return H
    }
    if (l.indexOf("-END EC PRIVATE KEY-") != -1 && l.indexOf("4,ENCRYPTED") != -1) {
        var I = F.getDecryptedKeyHex(l, k);
        var P = d(I, 0, [1], "04");
        var f = d(I, 0, [2, 0], "06");
        var A = d(I, 0, [3, 0], "03").substr(2);
        var e = "";
        if (KJUR.crypto.OID.oidhex2name[f] !== undefined) {
            e = KJUR.crypto.OID.oidhex2name[f]
        } else {
            throw "undefined OID(hex) in KJUR.crypto.OID: " + f
        }
        var j = new i({
            curve: e
        });
        j.setPublicKeyHex(A);
        j.setPrivateKeyHex(P);
        j.isPublic = false;
        return j
    }
    if (l.indexOf("-END DSA PRIVATE KEY-") != -1 && l.indexOf("4,ENCRYPTED") != -1) {
        var I = F.getDecryptedKeyHex(l, k);
        var E = d(I, 0, [1], "02");
        var D = d(I, 0, [2], "02");
        var K = d(I, 0, [3], "02");
        var r = d(I, 0, [4], "02");
        var s = d(I, 0, [5], "02");
        var P = new C();
        P.setPrivate(new BigInteger(E,16), new BigInteger(D,16), new BigInteger(K,16), new BigInteger(r,16), new BigInteger(s,16));
        return P
    }
    if (l.indexOf("-END ENCRYPTED PRIVATE KEY-") != -1) {
        return F.getKeyFromEncryptedPKCS8PEM(l, k)
    }
    throw "not supported argument"
}
;
KEYUTIL.generateKeypair = function(a, c) {
    if (a == "RSA") {
        var b = c;
        var h = new RSAKey();
        h.generate(b, "10001");
        h.isPrivate = true;
        h.isPublic = true;
        var f = new RSAKey();
        var e = h.n.toString(16);
        var i = h.e.toString(16);
        f.setPublic(e, i);
        f.isPrivate = false;
        f.isPublic = true;
        var k = {};
        k.prvKeyObj = h;
        k.pubKeyObj = f;
        return k
    } else {
        if (a == "EC") {
            var d = c;
            var g = new KJUR.crypto.ECDSA({
                curve: d
            });
            var j = g.generateKeyPairHex();
            var h = new KJUR.crypto.ECDSA({
                curve: d
            });
            h.setPublicKeyHex(j.ecpubhex);
            h.setPrivateKeyHex(j.ecprvhex);
            h.isPrivate = true;
            h.isPublic = false;
            var f = new KJUR.crypto.ECDSA({
                curve: d
            });
            f.setPublicKeyHex(j.ecpubhex);
            f.isPrivate = false;
            f.isPublic = true;
            var k = {};
            k.prvKeyObj = h;
            k.pubKeyObj = f;
            return k
        } else {
            throw "unknown algorithm: " + a
        }
    }
}
;
KEYUTIL.getPEM = function(b, D, y, m, q, j) {
    var F = KJUR
      , k = F.asn1
      , z = k.DERObjectIdentifier
      , f = k.DERInteger
      , l = k.ASN1Util.newObject
      , a = k.x509
      , C = a.SubjectPublicKeyInfo
      , e = F.crypto
      , u = e.DSA
      , r = e.ECDSA
      , n = RSAKey;
    function A(s) {
        var G = l({
            seq: [{
                "int": 0
            }, {
                "int": {
                    bigint: s.n
                }
            }, {
                "int": s.e
            }, {
                "int": {
                    bigint: s.d
                }
            }, {
                "int": {
                    bigint: s.p
                }
            }, {
                "int": {
                    bigint: s.q
                }
            }, {
                "int": {
                    bigint: s.dmp1
                }
            }, {
                "int": {
                    bigint: s.dmq1
                }
            }, {
                "int": {
                    bigint: s.coeff
                }
            }]
        });
        return G
    }
    function B(G) {
        var s = l({
            seq: [{
                "int": 1
            }, {
                octstr: {
                    hex: G.prvKeyHex
                }
            }, {
                tag: ["a0", true, {
                    oid: {
                        name: G.curveName
                    }
                }]
            }, {
                tag: ["a1", true, {
                    bitstr: {
                        hex: "00" + G.pubKeyHex
                    }
                }]
            }]
        });
        return s
    }
    function x(s) {
        var G = l({
            seq: [{
                "int": 0
            }, {
                "int": {
                    bigint: s.p
                }
            }, {
                "int": {
                    bigint: s.q
                }
            }, {
                "int": {
                    bigint: s.g
                }
            }, {
                "int": {
                    bigint: s.y
                }
            }, {
                "int": {
                    bigint: s.x
                }
            }]
        });
        return G
    }
    if (((n !== undefined && b instanceof n) || (u !== undefined && b instanceof u) || (r !== undefined && b instanceof r)) && b.isPublic == true && (D === undefined || D == "PKCS8PUB")) {
        var E = new C(b);
        var w = E.getEncodedHex();
        return hextopem(w, "PUBLIC KEY")
    }
    if (D == "PKCS1PRV" && n !== undefined && b instanceof n && (y === undefined || y == null) && b.isPrivate == true) {
        var E = A(b);
        var w = E.getEncodedHex();
        return hextopem(w, "RSA PRIVATE KEY")
    }
    if (D == "PKCS1PRV" && r !== undefined && b instanceof r && (y === undefined || y == null) && b.isPrivate == true) {
        var i = new z({
            name: b.curveName
        });
        var v = i.getEncodedHex();
        var h = B(b);
        var t = h.getEncodedHex();
        var p = "";
        p += hextopem(v, "EC PARAMETERS");
        p += hextopem(t, "EC PRIVATE KEY");
        return p
    }
    if (D == "PKCS1PRV" && u !== undefined && b instanceof u && (y === undefined || y == null) && b.isPrivate == true) {
        var E = x(b);
        var w = E.getEncodedHex();
        return hextopem(w, "DSA PRIVATE KEY")
    }
    if (D == "PKCS5PRV" && n !== undefined && b instanceof n && (y !== undefined && y != null) && b.isPrivate == true) {
        var E = A(b);
        var w = E.getEncodedHex();
        if (m === undefined) {
            m = "DES-EDE3-CBC"
        }
        return this.getEncryptedPKCS5PEMFromPrvKeyHex("RSA", w, y, m, j)
    }
    if (D == "PKCS5PRV" && r !== undefined && b instanceof r && (y !== undefined && y != null) && b.isPrivate == true) {
        var E = B(b);
        var w = E.getEncodedHex();
        if (m === undefined) {
            m = "DES-EDE3-CBC"
        }
        return this.getEncryptedPKCS5PEMFromPrvKeyHex("EC", w, y, m, j)
    }
    if (D == "PKCS5PRV" && u !== undefined && b instanceof u && (y !== undefined && y != null) && b.isPrivate == true) {
        var E = x(b);
        var w = E.getEncodedHex();
        if (m === undefined) {
            m = "DES-EDE3-CBC"
        }
        return this.getEncryptedPKCS5PEMFromPrvKeyHex("DSA", w, y, m, j)
    }
    var o = function(G, s) {
        var I = c(G, s);
        var H = new l({
            seq: [{
                seq: [{
                    oid: {
                        name: "pkcs5PBES2"
                    }
                }, {
                    seq: [{
                        seq: [{
                            oid: {
                                name: "pkcs5PBKDF2"
                            }
                        }, {
                            seq: [{
                                octstr: {
                                    hex: I.pbkdf2Salt
                                }
                            }, {
                                "int": I.pbkdf2Iter
                            }]
                        }]
                    }, {
                        seq: [{
                            oid: {
                                name: "des-EDE3-CBC"
                            }
                        }, {
                            octstr: {
                                hex: I.encryptionSchemeIV
                            }
                        }]
                    }]
                }]
            }, {
                octstr: {
                    hex: I.ciphertext
                }
            }]
        });
        return H.getEncodedHex()
    };
    var c = function(N, O) {
        var H = 100;
        var M = CryptoJS.lib.WordArray.random(8);
        var L = "DES-EDE3-CBC";
        var s = CryptoJS.lib.WordArray.random(8);
        var I = CryptoJS.PBKDF2(O, M, {
            keySize: 192 / 32,
            iterations: H
        });
        var J = CryptoJS.enc.Hex.parse(N);
        var K = CryptoJS.TripleDES.encrypt(J, I, {
            iv: s
        }) + "";
        var G = {};
        G.ciphertext = K;
        G.pbkdf2Salt = CryptoJS.enc.Hex.stringify(M);
        G.pbkdf2Iter = H;
        G.encryptionSchemeAlg = L;
        G.encryptionSchemeIV = CryptoJS.enc.Hex.stringify(s);
        return G
    };
    if (D == "PKCS8PRV" && n != undefined && b instanceof n && b.isPrivate == true) {
        var g = A(b);
        var d = g.getEncodedHex();
        var E = l({
            seq: [{
                "int": 0
            }, {
                seq: [{
                    oid: {
                        name: "rsaEncryption"
                    }
                }, {
                    "null": true
                }]
            }, {
                octstr: {
                    hex: d
                }
            }]
        });
        var w = E.getEncodedHex();
        if (y === undefined || y == null) {
            return hextopem(w, "PRIVATE KEY")
        } else {
            var t = o(w, y);
            return hextopem(t, "ENCRYPTED PRIVATE KEY")
        }
    }
    if (D == "PKCS8PRV" && r !== undefined && b instanceof r && b.isPrivate == true) {
        var g = new l({
            seq: [{
                "int": 1
            }, {
                octstr: {
                    hex: b.prvKeyHex
                }
            }, {
                tag: ["a1", true, {
                    bitstr: {
                        hex: "00" + b.pubKeyHex
                    }
                }]
            }]
        });
        var d = g.getEncodedHex();
        var E = l({
            seq: [{
                "int": 0
            }, {
                seq: [{
                    oid: {
                        name: "ecPublicKey"
                    }
                }, {
                    oid: {
                        name: b.curveName
                    }
                }]
            }, {
                octstr: {
                    hex: d
                }
            }]
        });
        var w = E.getEncodedHex();
        if (y === undefined || y == null) {
            return hextopem(w, "PRIVATE KEY")
        } else {
            var t = o(w, y);
            return hextopem(t, "ENCRYPTED PRIVATE KEY")
        }
    }
    if (D == "PKCS8PRV" && u !== undefined && b instanceof u && b.isPrivate == true) {
        var g = new f({
            bigint: b.x
        });
        var d = g.getEncodedHex();
        var E = l({
            seq: [{
                "int": 0
            }, {
                seq: [{
                    oid: {
                        name: "dsa"
                    }
                }, {
                    seq: [{
                        "int": {
                            bigint: b.p
                        }
                    }, {
                        "int": {
                            bigint: b.q
                        }
                    }, {
                        "int": {
                            bigint: b.g
                        }
                    }]
                }]
            }, {
                octstr: {
                    hex: d
                }
            }]
        });
        var w = E.getEncodedHex();
        if (y === undefined || y == null) {
            return hextopem(w, "PRIVATE KEY")
        } else {
            var t = o(w, y);
            return hextopem(t, "ENCRYPTED PRIVATE KEY")
        }
    }
    throw "unsupported object nor format"
}
;
KEYUTIL.getKeyFromCSRPEM = function(b) {
    var a = pemtohex(b, "CERTIFICATE REQUEST");
    var c = KEYUTIL.getKeyFromCSRHex(a);
    return c
}
;
KEYUTIL.getKeyFromCSRHex = function(a) {
    var c = KEYUTIL.parseCSRHex(a);
    var b = KEYUTIL.getKey(c.p8pubkeyhex, null, "pkcs8pub");
    return b
}
;
KEYUTIL.parseCSRHex = function(d) {
    var i = ASN1HEX;
    var f = i.getChildIdx;
    var c = i.getTLV;
    var b = {};
    var g = d;
    if (g.substr(0, 2) != "30") {
        throw "malformed CSR(code:001)"
    }
    var e = f(g, 0);
    if (e.length < 1) {
        throw "malformed CSR(code:002)"
    }
    if (g.substr(e[0], 2) != "30") {
        throw "malformed CSR(code:003)"
    }
    var a = f(g, e[0]);
    if (a.length < 3) {
        throw "malformed CSR(code:004)"
    }
    b.p8pubkeyhex = c(g, a[2]);
    return b
}
;
KEYUTIL.getJWKFromKey = function(d) {
    var b = {};
    if (d instanceof RSAKey && d.isPrivate) {
        b.kty = "RSA";
        b.n = hextob64u(d.n.toString(16));
        b.e = hextob64u(d.e.toString(16));
        b.d = hextob64u(d.d.toString(16));
        b.p = hextob64u(d.p.toString(16));
        b.q = hextob64u(d.q.toString(16));
        b.dp = hextob64u(d.dmp1.toString(16));
        b.dq = hextob64u(d.dmq1.toString(16));
        b.qi = hextob64u(d.coeff.toString(16));
        return b
    } else {
        if (d instanceof RSAKey && d.isPublic) {
            b.kty = "RSA";
            b.n = hextob64u(d.n.toString(16));
            b.e = hextob64u(d.e.toString(16));
            return b
        } else {
            if (d instanceof KJUR.crypto.ECDSA && d.isPrivate) {
                var a = d.getShortNISTPCurveName();
                if (a !== "P-256" && a !== "P-384") {
                    throw "unsupported curve name for JWT: " + a
                }
                var c = d.getPublicKeyXYHex();
                b.kty = "EC";
                b.crv = a;
                b.x = hextob64u(c.x);
                b.y = hextob64u(c.y);
                b.d = hextob64u(d.prvKeyHex);
                return b
            } else {
                if (d instanceof KJUR.crypto.ECDSA && d.isPublic) {
                    var a = d.getShortNISTPCurveName();
                    if (a !== "P-256" && a !== "P-384") {
                        throw "unsupported curve name for JWT: " + a
                    }
                    var c = d.getPublicKeyXYHex();
                    b.kty = "EC";
                    b.crv = a;
                    b.x = hextob64u(c.x);
                    b.y = hextob64u(c.y);
                    return b
                }
            }
        }
    }
    throw "not supported key object"
}
;
RSAKey.getPosArrayOfChildrenFromHex = function(a) {
    return ASN1HEX.getChildIdx(a, 0)
}
;
RSAKey.getHexValueArrayOfChildrenFromHex = function(f) {
    var n = ASN1HEX;
    var i = n.getV;
    var k = RSAKey.getPosArrayOfChildrenFromHex(f);
    var e = i(f, k[0]);
    var j = i(f, k[1]);
    var b = i(f, k[2]);
    var c = i(f, k[3]);
    var h = i(f, k[4]);
    var g = i(f, k[5]);
    var m = i(f, k[6]);
    var l = i(f, k[7]);
    var d = i(f, k[8]);
    var k = new Array();
    k.push(e, j, b, c, h, g, m, l, d);
    return k
}
;
RSAKey.prototype.readPrivateKeyFromPEMString = function(d) {
    var c = pemtohex(d);
    var b = RSAKey.getHexValueArrayOfChildrenFromHex(c);
    this.setPrivateEx(b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8])
}
;
RSAKey.prototype.readPKCS5PrvKeyHex = function(c) {
    var b = RSAKey.getHexValueArrayOfChildrenFromHex(c);
    this.setPrivateEx(b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8])
}
;
RSAKey.prototype.readPKCS8PrvKeyHex = function(e) {
    var c, j, l, b, a, f, d, k;
    var m = ASN1HEX;
    var g = m.getVbyList;
    if (m.isASN1HEX(e) === false) {
        throw "not ASN.1 hex string"
    }
    try {
        c = g(e, 0, [2, 0, 1], "02");
        j = g(e, 0, [2, 0, 2], "02");
        l = g(e, 0, [2, 0, 3], "02");
        b = g(e, 0, [2, 0, 4], "02");
        a = g(e, 0, [2, 0, 5], "02");
        f = g(e, 0, [2, 0, 6], "02");
        d = g(e, 0, [2, 0, 7], "02");
        k = g(e, 0, [2, 0, 8], "02")
    } catch (i) {
        throw "malformed PKCS#8 plain RSA private key"
    }
    this.setPrivateEx(c, j, l, b, a, f, d, k)
}
;
RSAKey.prototype.readPKCS5PubKeyHex = function(c) {
    var e = ASN1HEX;
    var b = e.getV;
    if (e.isASN1HEX(c) === false) {
        throw "keyHex is not ASN.1 hex string"
    }
    var a = e.getChildIdx(c, 0);
    if (a.length !== 2 || c.substr(a[0], 2) !== "02" || c.substr(a[1], 2) !== "02") {
        throw "wrong hex for PKCS#5 public key"
    }
    var f = b(c, a[0]);
    var d = b(c, a[1]);
    this.setPublic(f, d)
}
;
RSAKey.prototype.readPKCS8PubKeyHex = function(b) {
    var c = ASN1HEX;
    if (c.isASN1HEX(b) === false) {
        throw "not ASN.1 hex string"
    }
    if (c.getTLVbyList(b, 0, [0, 0]) !== "06092a864886f70d010101") {
        throw "not PKCS8 RSA public key"
    }
    var a = c.getTLVbyList(b, 0, [1, 0]);
    this.readPKCS5PubKeyHex(a)
}
;
RSAKey.prototype.readCertPubKeyHex = function(b, d) {
    var a, c;
    a = new X509();
    a.readCertHex(b);
    c = a.getPublicKeyHex();
    this.readPKCS8PubKeyHex(c)
}
;
var _RE_HEXDECONLY = new RegExp("");
_RE_HEXDECONLY.compile("[^0-9a-f]", "gi");
function _zeroPaddingOfSignature(e, d) {
    var c = "";
    var a = d / 4 - e.length;
    for (var b = 0; b < a; b++) {
        c = c + "0"
    }
    return c + e
}
RSAKey.prototype.sign = function(d, a) {
    var b = function(e) {
        return KJUR.crypto.Util.hashString(e, a)
    };
    var c = b(d);
    return this.signWithMessageHash(c, a)
}
;
RSAKey.prototype.signWithMessageHash = function(e, c) {
    var f = KJUR.crypto.Util.getPaddedDigestInfoHex(e, c, this.n.bitLength());
    var b = parseBigInt(f, 16);
    var d = this.doPrivate(b);
    var a = d.toString(16);
    return _zeroPaddingOfSignature(a, this.n.bitLength())
}
;
function pss_mgf1_str(c, a, e) {
    var b = ""
      , d = 0;
    while (b.length < a) {
        b += hextorstr(e(rstrtohex(c + String.fromCharCode.apply(String, [(d & 4278190080) >> 24, (d & 16711680) >> 16, (d & 65280) >> 8, d & 255]))));
        d += 1
    }
    return b
}
RSAKey.prototype.signPSS = function(e, a, d) {
    var c = function(f) {
        return KJUR.crypto.Util.hashHex(f, a)
    };
    var b = c(rstrtohex(e));
    if (d === undefined) {
        d = -1
    }
    return this.signWithMessageHashPSS(b, a, d)
}
;
RSAKey.prototype.signWithMessageHashPSS = function(l, a, k) {
    var b = hextorstr(l);
    var g = b.length;
    var m = this.n.bitLength() - 1;
    var c = Math.ceil(m / 8);
    var d;
    var o = function(i) {
        return KJUR.crypto.Util.hashHex(i, a)
    };
    if (k === -1 || k === undefined) {
        k = g
    } else {
        if (k === -2) {
            k = c - g - 2
        } else {
            if (k < -2) {
                throw "invalid salt length"
            }
        }
    }
    if (c < (g + k + 2)) {
        throw "data too long"
    }
    var f = "";
    if (k > 0) {
        f = new Array(k);
        new SecureRandom().nextBytes(f);
        f = String.fromCharCode.apply(String, f)
    }
    var n = hextorstr(o(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00" + b + f)));
    var j = [];
    for (d = 0; d < c - k - g - 2; d += 1) {
        j[d] = 0
    }
    var e = String.fromCharCode.apply(String, j) + "\x01" + f;
    var h = pss_mgf1_str(n, e.length, o);
    var q = [];
    for (d = 0; d < e.length; d += 1) {
        q[d] = e.charCodeAt(d) ^ h.charCodeAt(d)
    }
    var p = (65280 >> (8 * c - m)) & 255;
    q[0] &= ~p;
    for (d = 0; d < g; d++) {
        q.push(n.charCodeAt(d))
    }
    q.push(188);
    return _zeroPaddingOfSignature(this.doPrivate(new BigInteger(q)).toString(16), this.n.bitLength())
}
;
function _rsasign_getDecryptSignatureBI(a, d, c) {
    var b = new RSAKey();
    b.setPublic(d, c);
    var e = b.doPublic(a);
    return e
}
function _rsasign_getAlgNameAndHashFromHexDisgestInfo(f) {
    for (var e in KJUR.crypto.Util.DIGESTINFOHEAD) {
        var d = KJUR.crypto.Util.DIGESTINFOHEAD[e];
        var b = d.length;
        if (f.substring(0, b) == d) {
            var c = [e, f.substring(b)];
            return c
        }
    }
    return []
}
RSAKey.prototype.verify = function(f, j) {
    j = j.replace(_RE_HEXDECONLY, "");
    j = j.replace(/[ \n]+/g, "");
    var b = parseBigInt(j, 16);
    if (b.bitLength() > this.n.bitLength()) {
        return 0
    }
    var i = this.doPublic(b);
    var e = i.toString(16).replace(/^1f+00/, "");
    var g = _rsasign_getAlgNameAndHashFromHexDisgestInfo(e);
    if (g.length == 0) {
        return false
    }
    var d = g[0];
    var h = g[1];
    var a = function(k) {
        return KJUR.crypto.Util.hashString(k, d)
    };
    var c = a(f);
    return (h == c)
}
;
RSAKey.prototype.verifyWithMessageHash = function(e, a) {
    a = a.replace(_RE_HEXDECONLY, "");
    a = a.replace(/[ \n]+/g, "");
    var b = parseBigInt(a, 16);
    if (b.bitLength() > this.n.bitLength()) {
        return 0
    }
    var h = this.doPublic(b);
    var g = h.toString(16).replace(/^1f+00/, "");
    var c = _rsasign_getAlgNameAndHashFromHexDisgestInfo(g);
    if (c.length == 0) {
        return false
    }
    var d = c[0];
    var f = c[1];
    return (f == e)
}
;
RSAKey.prototype.verifyPSS = function(c, b, a, f) {
    var e = function(g) {
        return KJUR.crypto.Util.hashHex(g, a)
    };
    var d = e(rstrtohex(c));
    if (f === undefined) {
        f = -1
    }
    return this.verifyWithMessageHashPSS(d, b, a, f)
}
;
RSAKey.prototype.verifyWithMessageHashPSS = function(f, s, l, c) {
    var k = new BigInteger(s,16);
    if (k.bitLength() > this.n.bitLength()) {
        return false
    }
    var r = function(i) {
        return KJUR.crypto.Util.hashHex(i, l)
    };
    var j = hextorstr(f);
    var h = j.length;
    var g = this.n.bitLength() - 1;
    var m = Math.ceil(g / 8);
    var q;
    if (c === -1 || c === undefined) {
        c = h
    } else {
        if (c === -2) {
            c = m - h - 2
        } else {
            if (c < -2) {
                throw "invalid salt length"
            }
        }
    }
    if (m < (h + c + 2)) {
        throw "data too long"
    }
    var a = this.doPublic(k).toByteArray();
    for (q = 0; q < a.length; q += 1) {
        a[q] &= 255
    }
    while (a.length < m) {
        a.unshift(0)
    }
    if (a[m - 1] !== 188) {
        throw "encoded message does not end in 0xbc"
    }
    a = String.fromCharCode.apply(String, a);
    var d = a.substr(0, m - h - 1);
    var e = a.substr(d.length, h);
    var p = (65280 >> (8 * m - g)) & 255;
    if ((d.charCodeAt(0) & p) !== 0) {
        throw "bits beyond keysize not zero"
    }
    var n = pss_mgf1_str(e, d.length, r);
    var o = [];
    for (q = 0; q < d.length; q += 1) {
        o[q] = d.charCodeAt(q) ^ n.charCodeAt(q)
    }
    o[0] &= ~p;
    var b = m - h - c - 2;
    for (q = 0; q < b; q += 1) {
        if (o[q] !== 0) {
            throw "leftmost octets not zero"
        }
    }
    if (o[b] !== 1) {
        throw "0x01 marker not found"
    }
    return e === hextorstr(r(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00" + j + String.fromCharCode.apply(String, o.slice(-c)))))
}
;
RSAKey.SALT_LEN_HLEN = -1;
RSAKey.SALT_LEN_MAX = -2;
RSAKey.SALT_LEN_RECOVER = -2;
window.QccJsWebInfo = "read default WebSettings";
window.QccJsWebVer = "2025.10.22.1";
window.QccJsWebPostBaseUrl = "https://newopenapiweb.17qcc.com";
window.QccJsWebDocumentDomain = "17qcc.com";
window.QccJsWebMergeJsUrl = "//j.17qcc.com/combo?";

