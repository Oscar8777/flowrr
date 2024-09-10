!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).msgpackr = {})
}(this, function(e) {
    "use strict";
    try {
        $ = new TextDecoder
    } catch (t) {}
    var $, r, n, i, s, f, u, l, o, a = 0, c = {}, x = 0, d = 0, h = [], _ = {
        useRecords: !1,
        mapsAsObjects: !0
    };
    class p {
    }
    let g = new p;
    g.name = "MessagePack 0xC1";
    var y = !1
      , b = 2;
    try {
        Function("")
    } catch (w) {
        b = 1 / 0
    }
    class m {
        constructor(e) {
            e && (!1 === e.useRecords && void 0 === e.mapsAsObjects && (e.mapsAsObjects = !0),
            !e.sequential || !1 === e.trusted || (e.trusted = !0,
            e.structures || !1 == e.useRecords || (e.structures = [],
            e.maxSharedStructures || (e.maxSharedStructures = 0))),
            e.structures ? e.structures.sharedLength = e.structures.length : e.getStructures && ((e.structures = []).uninitialized = !0,
            e.structures.sharedLength = 0),
            e.int64AsNumber && (e.int64AsType = "number")),
            Object.assign(this, e)
        }
        unpack(e, t) {
            if (r)
                return G( () => (H(),
                this ? this.unpack(e, t) : m.prototype.unpack.call(_, e, t)));
            e.buffer || e.constructor !== ArrayBuffer || (e = "undefined" != typeof Buffer ? Buffer.from(e) : new Uint8Array(e)),
            "object" == typeof t ? (n = t.end || e.length,
            a = t.start || 0) : (a = 0,
            n = t > -1 ? t : e.length),
            d = 0,
            s = null,
            f = null,
            r = e;
            try {
                l = e.dataView || (e.dataView = new DataView(e.buffer,e.byteOffset,e.byteLength))
            } catch ($) {
                if (r = null,
                e instanceof Uint8Array)
                    throw $;
                throw Error("Source must be a Uint8Array or Buffer but was a " + (e && "object" == typeof e ? e.constructor.name : typeof e))
            }
            return this instanceof m ? (c = this,
            this.structures ? i = this.structures : (!i || i.length > 0) && (i = [])) : (c = _,
            (!i || i.length > 0) && (i = [])),
            S(t)
        }
        unpackMultiple(e, t) {
            let $, r = 0;
            try {
                y = !0;
                let n = e.length
                  , i = this ? this.unpack(e, n) : ee.unpack(e, n);
                if (t) {
                    if (!1 === t(i, r, a))
                        return;
                    for (; a < n; )
                        if (r = a,
                        !1 === t(S(), r, a))
                            return
                } else {
                    for ($ = [i]; a < n; )
                        r = a,
                        $.push(S());
                    return $
                }
            } catch (s) {
                throw s.lastPosition = r,
                s.values = $,
                s
            } finally {
                y = !1,
                H()
            }
        }
        _mergeStructures(e, t) {
            Object.isFrozen(e = e || []) && (e = e.map(e => e.slice(0)));
            for (let $ = 0, r = e.length; $ < r; $++) {
                let n = e[$];
                n && (n.isShared = !0,
                $ >= 32 && (n.highByte = $ - 32 >> 5))
            }
            for (let i in e.sharedLength = e.length,
            t || [])
                if (i >= 0) {
                    let s = e[i]
                      , f = t[i];
                    f && (s && ((e.restoreStructures || (e.restoreStructures = []))[i] = s),
                    e[i] = f)
                }
            return this.structures = e
        }
        decode(e, t) {
            return this.unpack(e, t)
        }
    }
    function S(e) {
        try {
            if (!c.trusted && !y) {
                let t = i.sharedLength || 0;
                t < i.length && (i.length = t)
            }
            let $;
            if (c.randomAccessStructure && r[a] < 64 && r[a] >= 32 && o ? ($ = o(r, a, n, c),
            r = null,
            !(e && e.lazy) && $ && ($ = $.toJSON()),
            a = n) : $ = k(),
            f && (a = f.postBundlePosition,
            f = null),
            y && (i.restoreStructures = null),
            a == n)
                i && i.restoreStructures && U(),
                i = null,
                r = null,
                u && (u = null);
            else if (a > n)
                throw Error("Unexpected end of MessagePack data");
            else if (!y) {
                let s;
                try {
                    s = JSON.stringify($, (e, t) => "bigint" == typeof t ? `${t}n` : t).slice(0, 100)
                } catch (l) {
                    s = "(JSON view not available " + l + ")"
                }
                throw Error("Data read, but end of buffer not reached " + s)
            }
            return $
        } catch (x) {
            throw i && i.restoreStructures && U(),
            H(),
            (x instanceof RangeError || x.message.startsWith("Unexpected end of buffer") || a > n) && (x.incomplete = !0),
            x
        }
    }
    function U() {
        for (let e in i.restoreStructures)
            i[e] = i.restoreStructures[e];
        i.restoreStructures = null
    }
    function k() {
        let e = r[a++];
        if (e < 160) {
            if (e < 128) {
                if (e < 64)
                    return e;
                {
                    let t = i[63 & e] || c.getStructures && O()[63 & e];
                    return t ? (t.read || (t.read = A(t, 63 & e)),
                    t.read()) : e
                }
            }
            if (e < 144) {
                if (e -= 128,
                c.mapsAsObjects) {
                    let $ = {};
                    for (let u = 0; u < e; u++) {
                        let o = W();
                        "__proto__" === o && (o = "__proto_"),
                        $[o] = k()
                    }
                    return $
                }
                {
                    let _ = new Map;
                    for (let p = 0; p < e; p++)
                        _.set(k(), k());
                    return _
                }
            }
            {
                let y = Array(e -= 144);
                for (let b = 0; b < e; b++)
                    y[b] = k();
                return c.freezeData ? Object.freeze(y) : y
            }
        }
        if (e < 192) {
            let w = e - 160;
            if (d >= a)
                return s.slice(a - x, (a += w) - x);
            if (0 == d && n < 140) {
                let m = w < 16 ? C(w) : R(w);
                if (null != m)
                    return m
            }
            return T(w)
        }
        {
            let S;
            switch (e) {
            case 192:
                return null;
            case 193:
                if (f) {
                    if ((S = k()) > 0)
                        return f[1].slice(f.position1, f.position1 += S);
                    return f[0].slice(f.position0, f.position0 -= S)
                }
                return g;
            case 194:
                return !1;
            case 195:
                return !0;
            case 196:
                if (void 0 === (S = r[a++]))
                    throw Error("Unexpected end of buffer");
                return N(S);
            case 197:
                return S = l.getUint16(a),
                a += 2,
                N(S);
            case 198:
                return S = l.getUint32(a),
                a += 4,
                N(S);
            case 199:
                return D(r[a++]);
            case 200:
                return S = l.getUint16(a),
                a += 2,
                D(S);
            case 201:
                return S = l.getUint32(a),
                a += 4,
                D(S);
            case 202:
                if (S = l.getFloat32(a),
                c.useFloat32 > 2) {
                    let U = Q[(127 & r[a]) << 1 | r[a + 1] >> 7];
                    return a += 4,
                    (U * S + (S > 0 ? .5 : -.5) >> 0) / U
                }
                return a += 4,
                S;
            case 203:
                return S = l.getFloat64(a),
                a += 8,
                S;
            case 204:
                return r[a++];
            case 205:
                return S = l.getUint16(a),
                a += 2,
                S;
            case 206:
                return S = l.getUint32(a),
                a += 4,
                S;
            case 207:
                return "number" === c.int64AsType ? (S = 4294967296 * l.getUint32(a),
                S += l.getUint32(a + 4)) : "string" === c.int64AsType ? S = l.getBigUint64(a).toString() : "auto" === c.int64AsType ? (S = l.getBigUint64(a)) <= BigInt(2) << BigInt(52) && (S = Number(S)) : S = l.getBigUint64(a),
                a += 8,
                S;
            case 208:
                return l.getInt8(a++);
            case 209:
                return S = l.getInt16(a),
                a += 2,
                S;
            case 210:
                return S = l.getInt32(a),
                a += 4,
                S;
            case 211:
                return "number" === c.int64AsType ? (S = 4294967296 * l.getInt32(a),
                S += l.getUint32(a + 4)) : "string" === c.int64AsType ? S = l.getBigInt64(a).toString() : "auto" === c.int64AsType ? (S = l.getBigInt64(a)) >= BigInt(-2) << BigInt(52) && S <= BigInt(2) << BigInt(52) && (S = Number(S)) : S = l.getBigInt64(a),
                a += 8,
                S;
            case 212:
                if (114 == (S = r[a++]))
                    return J(63 & r[a++]);
                {
                    let I = h[S];
                    if (I) {
                        if (I.read)
                            return a++,
                            I.read(k());
                        if (I.noBuffer)
                            return a++,
                            I();
                        return I(r.subarray(a, ++a))
                    }
                    throw Error("Unknown extension " + S)
                }
            case 213:
                if (114 == (S = r[a]))
                    return a++,
                    J(63 & r[a++], r[a++]);
                return D(2);
            case 214:
                return D(4);
            case 215:
                return D(8);
            case 216:
                return D(16);
            case 217:
                if (S = r[a++],
                d >= a)
                    return s.slice(a - x, (a += S) - x);
                return B(S);
            case 218:
                if (S = l.getUint16(a),
                d >= (a += 2))
                    return s.slice(a - x, (a += S) - x);
                return L(S);
            case 219:
                if (S = l.getUint32(a),
                d >= (a += 4))
                    return s.slice(a - x, (a += S) - x);
                return F(S);
            case 220:
                return S = l.getUint16(a),
                a += 2,
                z(S);
            case 221:
                return S = l.getUint32(a),
                a += 4,
                z(S);
            case 222:
                return S = l.getUint16(a),
                a += 2,
                E(S);
            case 223:
                return S = l.getUint32(a),
                a += 4,
                E(S);
            default:
                if (e >= 224)
                    return e - 256;
                if (void 0 === e) {
                    let v = Error("Unexpected end of MessagePack data");
                    throw v.incomplete = !0,
                    v
                }
                throw Error("Unknown MessagePack token " + e)
            }
        }
    }
    let I = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
    function A(e, t) {
        function $() {
            if ($.count++ > b) {
                let r = e.read = Function("r", "return function(){return " + (c.freezeData ? "Object.freeze" : "") + "({" + e.map(e => "__proto__" === e ? "__proto_:r()" : I.test(e) ? e + ":r()" : "[" + JSON.stringify(e) + "]:r()").join(",") + "})}")(k);
                return 0 === e.highByte && (e.read = v(t, e.read)),
                r()
            }
            let n = {};
            for (let i = 0, s = e.length; i < s; i++) {
                let f = e[i];
                "__proto__" === f && (f = "__proto_"),
                n[f] = k()
            }
            return c.freezeData ? Object.freeze(n) : n
        }
        return ($.count = 0,
        0 === e.highByte) ? v(t, $) : $
    }
    let v = (e, t) => function() {
        let $ = r[a++];
        if (0 === $)
            return t();
        let n = e < 32 ? -(e + ($ << 5)) : e + ($ << 5)
          , s = i[n] || O()[n];
        if (!s)
            throw Error("Record id is not defined for " + n);
        return s.read || (s.read = A(s, e)),
        s.read()
    }
    ;
    function O() {
        let e = G( () => (r = null,
        c.getStructures()));
        return i = c._mergeStructures(e, i)
    }
    var T = P
      , B = P
      , L = P
      , F = P;
    function P(e) {
        let t;
        if (e < 16 && (t = C(e)))
            return t;
        if (e > 64 && $)
            return $.decode(r.subarray(a, a += e));
        let n = a + e
          , i = [];
        for (t = ""; a < n; ) {
            let s = r[a++];
            if ((128 & s) == 0)
                i.push(s);
            else if ((224 & s) == 192) {
                let f = 63 & r[a++];
                i.push((31 & s) << 6 | f)
            } else if ((240 & s) == 224) {
                let u = 63 & r[a++]
                  , l = 63 & r[a++];
                i.push((31 & s) << 12 | u << 6 | l)
            } else if ((248 & s) == 240) {
                let o = 63 & r[a++]
                  , c = 63 & r[a++]
                  , x = 63 & r[a++]
                  , d = (7 & s) << 18 | o << 12 | c << 6 | x;
                d > 65535 && (d -= 65536,
                i.push(d >>> 10 & 1023 | 55296),
                d = 56320 | 1023 & d),
                i.push(d)
            } else
                i.push(s);
            i.length >= 4096 && (t += M.apply(String, i),
            i.length = 0)
        }
        return i.length > 0 && (t += M.apply(String, i)),
        t
    }
    function z(e) {
        let t = Array(e);
        for (let $ = 0; $ < e; $++)
            t[$] = k();
        return c.freezeData ? Object.freeze(t) : t
    }
    function E(e) {
        if (c.mapsAsObjects) {
            let t = {};
            for (let $ = 0; $ < e; $++) {
                let r = W();
                "__proto__" === r && (r = "__proto_"),
                t[r] = k()
            }
            return t
        }
        {
            let n = new Map;
            for (let i = 0; i < e; i++)
                n.set(k(), k());
            return n
        }
    }
    var M = String.fromCharCode;
    function R(e) {
        let t = a
          , $ = Array(e);
        for (let n = 0; n < e; n++) {
            let i = r[a++];
            if ((128 & i) > 0) {
                a = t;
                return
            }
            $[n] = i
        }
        return M.apply(String, $)
    }
    function C(e) {
        if (e < 4) {
            if (e < 2) {
                if (0 === e)
                    return "";
                {
                    let t = r[a++];
                    if ((128 & t) > 1) {
                        a -= 1;
                        return
                    }
                    return M(t)
                }
            }
            {
                let $ = r[a++]
                  , n = r[a++];
                if ((128 & $) > 0 || (128 & n) > 0) {
                    a -= 2;
                    return
                }
                if (e < 3)
                    return M($, n);
                let i = r[a++];
                if ((128 & i) > 0) {
                    a -= 3;
                    return
                }
                return M($, n, i)
            }
        }
        {
            let s = r[a++]
              , f = r[a++]
              , u = r[a++]
              , l = r[a++];
            if ((128 & s) > 0 || (128 & f) > 0 || (128 & u) > 0 || (128 & l) > 0) {
                a -= 4;
                return
            }
            if (e < 6) {
                if (4 === e)
                    return M(s, f, u, l);
                {
                    let o = r[a++];
                    if ((128 & o) > 0) {
                        a -= 5;
                        return
                    }
                    return M(s, f, u, l, o)
                }
            }
            if (e < 8) {
                let c = r[a++]
                  , x = r[a++];
                if ((128 & c) > 0 || (128 & x) > 0) {
                    a -= 6;
                    return
                }
                if (e < 7)
                    return M(s, f, u, l, c, x);
                let d = r[a++];
                if ((128 & d) > 0) {
                    a -= 7;
                    return
                }
                return M(s, f, u, l, c, x, d)
            }
            {
                let h = r[a++]
                  , _ = r[a++]
                  , p = r[a++]
                  , g = r[a++];
                if ((128 & h) > 0 || (128 & _) > 0 || (128 & p) > 0 || (128 & g) > 0) {
                    a -= 8;
                    return
                }
                if (e < 10) {
                    if (8 === e)
                        return M(s, f, u, l, h, _, p, g);
                    {
                        let y = r[a++];
                        if ((128 & y) > 0) {
                            a -= 9;
                            return
                        }
                        return M(s, f, u, l, h, _, p, g, y)
                    }
                }
                if (e < 12) {
                    let b = r[a++]
                      , w = r[a++];
                    if ((128 & b) > 0 || (128 & w) > 0) {
                        a -= 10;
                        return
                    }
                    if (e < 11)
                        return M(s, f, u, l, h, _, p, g, b, w);
                    let m = r[a++];
                    if ((128 & m) > 0) {
                        a -= 11;
                        return
                    }
                    return M(s, f, u, l, h, _, p, g, b, w, m)
                }
                {
                    let S = r[a++]
                      , U = r[a++]
                      , k = r[a++]
                      , I = r[a++];
                    if ((128 & S) > 0 || (128 & U) > 0 || (128 & k) > 0 || (128 & I) > 0) {
                        a -= 12;
                        return
                    }
                    if (e < 14) {
                        if (12 === e)
                            return M(s, f, u, l, h, _, p, g, S, U, k, I);
                        {
                            let A = r[a++];
                            if ((128 & A) > 0) {
                                a -= 13;
                                return
                            }
                            return M(s, f, u, l, h, _, p, g, S, U, k, I, A)
                        }
                    }
                    {
                        let v = r[a++]
                          , O = r[a++];
                        if ((128 & v) > 0 || (128 & O) > 0) {
                            a -= 14;
                            return
                        }
                        if (e < 15)
                            return M(s, f, u, l, h, _, p, g, S, U, k, I, v, O);
                        let T = r[a++];
                        if ((128 & T) > 0) {
                            a -= 15;
                            return
                        }
                        return M(s, f, u, l, h, _, p, g, S, U, k, I, v, O, T)
                    }
                }
            }
        }
    }
    function j() {
        let e = r[a++], t;
        if (e < 192)
            t = e - 160;
        else
            switch (e) {
            case 217:
                t = r[a++];
                break;
            case 218:
                t = l.getUint16(a),
                a += 2;
                break;
            case 219:
                t = l.getUint32(a),
                a += 4;
                break;
            default:
                throw Error("Expected string")
            }
        return P(t)
    }
    function N(e) {
        return c.copyBuffers ? Uint8Array.prototype.slice.call(r, a, a += e) : r.subarray(a, a += e)
    }
    function D(e) {
        let t = r[a++];
        if (h[t]) {
            let $;
            return h[t](r.subarray(a, $ = a += e), e => {
                a = e;
                try {
                    return k()
                } finally {
                    a = $
                }
            }
            )
        }
        throw Error("Unknown extension type " + t)
    }
    var V = Array(4096);
    function W() {
        let e = r[a++];
        if (!(e >= 160) || !(e < 192))
            return a--,
            k().toString();
        if (e -= 160,
        d >= a)
            return s.slice(a - x, (a += e) - x);
        if (!(0 == d && n < 180))
            return T(e);
        let t = (e << 5 ^ (e > 1 ? l.getUint16(a) : e > 0 ? r[a] : 0)) & 4095, $ = V[t], i = a, f = a + e - 3, u, o = 0;
        if ($ && $.bytes == e) {
            for (; i < f; ) {
                if ((u = l.getUint32(i)) != $[o++]) {
                    i = 1879048192;
                    break
                }
                i += 4
            }
            for (f += 3; i < f; )
                if ((u = r[i++]) != $[o++]) {
                    i = 1879048192;
                    break
                }
            if (i === f)
                return a = i,
                $.string;
            f -= 3,
            i = a
        }
        for ($ = [],
        V[t] = $,
        $.bytes = e; i < f; )
            u = l.getUint32(i),
            $.push(u),
            i += 4;
        for (f += 3; i < f; )
            u = r[i++],
            $.push(u);
        let c = e < 16 ? C(e) : R(e);
        return null != c ? $.string = c : $.string = T(e)
    }
    let J = (e, t) => {
        let $ = k().map(e => e.toString())
          , r = e;
        void 0 !== t && (e = e < 32 ? -((t << 5) + e) : (t << 5) + e,
        $.highByte = t);
        let n = i[e];
        return n && (n.isShared || y) && ((i.restoreStructures || (i.restoreStructures = []))[e] = n),
        i[e] = $,
        $.read = A($, r),
        $.read()
    }
    ;
    h[0] = () => {}
    ,
    h[0].noBuffer = !0;
    let q = {
        Error,
        TypeError,
        ReferenceError
    };
    h[101] = () => {
        let e = k();
        return (q[e[0]] || Error)(e[1])
    }
    ,
    h[105] = e => {
        let t = l.getUint32(a - 4);
        u || (u = new Map);
        let $ = r[a], n;
        n = $ >= 144 && $ < 160 || 220 == $ || 221 == $ ? [] : {};
        let i = {
            target: n
        };
        u.set(t, i);
        let s = k();
        return i.used ? Object.assign(n, s) : (i.target = s,
        s)
    }
    ,
    h[112] = e => {
        let t = l.getUint32(a - 4)
          , $ = u.get(t);
        return $.used = !0,
        $.target
    }
    ,
    h[115] = () => new Set(k());
    let K = ["Int8", "Uint8", "Uint8Clamped", "Int16", "Uint16", "Int32", "Uint32", "Float32", "Float64", "BigInt64", "BigUint64"].map(e => e + "Array")
      , Y = "object" == typeof globalThis ? globalThis : window;
    h[116] = e => {
        let t = e[0]
          , $ = K[t];
        if (!$)
            throw Error("Could not find typed array for code " + t);
        return new Y[$](Uint8Array.prototype.slice.call(e, 1).buffer)
    }
    ,
    h[120] = () => {
        let e = k();
        return RegExp(e[0], e[1])
    }
    ;
    let Z = [];
    function G(e) {
        let t = n
          , $ = a
          , o = x
          , h = d
          , _ = s
          , p = u
          , g = f
          , b = new Uint8Array(r.slice(0, n))
          , w = i
          , m = i.slice(0, i.length)
          , S = c
          , U = y
          , k = e();
        return n = t,
        a = $,
        x = o,
        d = h,
        s = _,
        u = p,
        f = g,
        r = b,
        y = U,
        (i = w).splice(0, i.length, ...m),
        c = S,
        l = new DataView(r.buffer,r.byteOffset,r.byteLength),
        k
    }
    function H() {
        r = null,
        u = null,
        i = null
    }
    h[98] = e => {
        let t = (e[0] << 24) + (e[1] << 16) + (e[2] << 8) + e[3]
          , $ = a;
        return a += t - e.length,
        f = Z,
        (f = [j(), j()]).position0 = 0,
        f.position1 = 0,
        f.postBundlePosition = a,
        a = $,
        k()
    }
    ,
    h[255] = e => 4 == e.length ? new Date((16777216 * e[0] + (e[1] << 16) + (e[2] << 8) + e[3]) * 1e3) : 8 == e.length ? new Date(((e[0] << 22) + (e[1] << 14) + (e[2] << 6) + (e[3] >> 2)) / 1e6 + ((3 & e[3]) * 4294967296 + 16777216 * e[4] + (e[5] << 16) + (e[6] << 8) + e[7]) * 1e3) : 12 == e.length ? new Date(((e[0] << 24) + (e[1] << 16) + (e[2] << 8) + e[3]) / 1e6 + ((128 & e[4] ? -281474976710656 : 0) + 1099511627776 * e[6] + 4294967296 * e[7] + 16777216 * e[8] + (e[9] << 16) + (e[10] << 8) + e[11]) * 1e3) : new Date("invalid");
    let Q = Array(147);
    for (let X = 0; X < 256; X++)
        Q[X] = +("1e" + Math.floor(45.15 - .30103 * X));
    var ee = new m({
        useRecords: !1
    });
    let et = ee.unpack, e$ = ee.unpackMultiple, er = ee.unpack, en = {
        NEVER: 0,
        ALWAYS: 1,
        DECIMAL_ROUND: 3,
        DECIMAL_FIT: 4
    }, ei = new Float32Array(1), es = new Uint8Array(ei.buffer,0,4), ef;
    try {
        ef = new TextEncoder
    } catch (eu) {}
    let el, eo, ea = "undefined" != typeof Buffer, ec = ea ? function(e) {
        return Buffer.allocUnsafeSlow(e)
    }
    : Uint8Array, ex = ea ? Buffer : Uint8Array, ed = ea ? 4294967296 : 2144337920, eh, e_, ep, eg = 0, ey, e0 = null, e2, e1 = /[\u0080-\uFFFF]/, e6 = Symbol("record-id");
    class e4 extends m {
        constructor(e) {
            super(e),
            this.offset = 0;
            let t, $, r, n, i = ex.prototype.utf8Write ? function(e, t) {
                return eh.utf8Write(e, t, 4294967295)
            }
            : !!ef && !!ef.encodeInto && function(e, t) {
                return ef.encodeInto(e, eh.subarray(t)).written
            }
            , s = this;
            e || (e = {});
            let f = e && e.sequential
              , u = e.structures || e.saveStructures
              , l = e.maxSharedStructures;
            if (null == l && (l = u ? 32 : 0),
            l > 8160)
                throw Error("Maximum maxSharedStructure is 8160");
            e.structuredClone && void 0 == e.moreTypes && (this.moreTypes = !0);
            let o = e.maxOwnStructures;
            null == o && (o = u ? 32 : 64),
            this.structures || !1 == e.useRecords || (this.structures = []);
            let a = l > 32 || o + l > 64
              , c = l + 64
              , x = l + o + 64;
            if (x > 8256)
                throw Error("Maximum maxSharedStructure + maxOwnStructure is 8192");
            let d = []
              , h = 0
              , _ = 0;
            this.pack = this.encode = function(e, i) {
                if (eh || (ep = (eh = new ec(8192)).dataView || (eh.dataView = new DataView(eh.buffer,0,8192)),
                eg = 0),
                (ey = eh.length - 10) - eg < 2048 ? (ep = (eh = new ec(eh.length)).dataView || (eh.dataView = new DataView(eh.buffer,0,eh.length)),
                ey = eh.length - 10,
                eg = 0) : eg = eg + 7 & 2147483640,
                t = eg,
                i & eT && (eg += 255 & i),
                n = s.structuredClone ? new Map : null,
                s.bundleStrings && "string" != typeof e ? (e0 = []).size = 1 / 0 : e0 = null,
                r = s.structures) {
                    r.uninitialized && (r = s._mergeStructures(s.getStructures()));
                    let u = r.sharedLength || 0;
                    if (u > l)
                        throw Error("Shared structures is larger than maximum shared structures, try increasing maxSharedStructures to " + r.sharedLength);
                    if (!r.transitions) {
                        r.transitions = Object.create(null);
                        for (let o = 0; o < u; o++) {
                            let a = r[o];
                            if (!a)
                                continue;
                            let c, x = r.transitions;
                            for (let d = 0, h = a.length; d < h; d++) {
                                let _ = a[d];
                                (c = x[_]) || (c = x[_] = Object.create(null)),
                                x = c
                            }
                            x[e6] = o + 64
                        }
                        this.lastNamedStructuresLength = u
                    }
                    f || (r.nextId = u + 64)
                }
                $ && ($ = !1);
                try {
                    s.randomAccessStructure && e && e.constructor && e.constructor === Object ? A(e) : y(e);
                    let g = e0;
                    if (e0 && eS(t, y, 0),
                    n && n.idsToInsert) {
                        let b = n.idsToInsert.sort( (e, t) => e.offset > t.offset ? 1 : -1)
                          , w = b.length
                          , m = -1;
                        for (; g && w > 0; ) {
                            let S = b[--w].offset + t;
                            S < g.stringsPosition + t && -1 === m && (m = 0),
                            S > g.position + t ? m >= 0 && (m += 6) : (m >= 0 && (ep.setUint32(g.position + t, ep.getUint32(g.position + t) + m),
                            m = -1),
                            g = g.previous,
                            w++)
                        }
                        m >= 0 && g && ep.setUint32(g.position + t, ep.getUint32(g.position + t) + m),
                        (eg += 6 * b.length) > ey && U(eg),
                        s.offset = eg;
                        let k = function e(t, $) {
                            let r, n = 6 * $.length, i = t.length - n;
                            for (; r = $.pop(); ) {
                                let s = r.offset
                                  , f = r.id;
                                t.copyWithin(s + n, s, i);
                                let u = s + (n -= 6);
                                t[u++] = 214,
                                t[u++] = 105,
                                t[u++] = f >> 24,
                                t[u++] = f >> 16 & 255,
                                t[u++] = f >> 8 & 255,
                                t[u++] = 255 & f,
                                i = s
                            }
                            return t
                        }(eh.subarray(t, eg), b);
                        return n = null,
                        k
                    }
                    if (s.offset = eg,
                    i & ev)
                        return eh.start = t,
                        eh.end = eg,
                        eh;
                    return eh.subarray(t, eg)
                } finally {
                    if (r && (p(),
                    $ && s.saveStructures)) {
                        var I, v;
                        let O = r.sharedLength || 0
                          , T = eh.subarray(t, eg)
                          , B = (I = r,
                        v = s,
                        I.isCompatible = e => {
                            let t = !e || (v.lastNamedStructuresLength || 0) === e.length;
                            return t || v._mergeStructures(e),
                            t
                        }
                        ,
                        I);
                        if (!1 === s.saveStructures(B, B.isCompatible))
                            return s.pack(e, i);
                        return s.lastNamedStructuresLength = O,
                        T
                    }
                    i & eO && (eg = t)
                }
            }
            ;
            let p = () => {
                _ < 10 && _++;
                let e = r.sharedLength || 0;
                if (r.length > e && !f && (r.length = e),
                h > 1e4)
                    r.transitions = null,
                    _ = 0,
                    h = 0,
                    d.length > 0 && (d = []);
                else if (d.length > 0 && !f) {
                    for (let t = 0, $ = d.length; t < $; t++)
                        d[t][e6] = 0;
                    d = []
                }
            }
              , g = e => {
                var t = e.length;
                t < 16 ? eh[eg++] = 144 | t : t < 65536 ? (eh[eg++] = 220,
                eh[eg++] = t >> 8,
                eh[eg++] = 255 & t) : (eh[eg++] = 221,
                ep.setUint32(eg, t),
                eg += 4);
                for (let $ = 0; $ < t; $++)
                    y(e[$])
            }
              , y = e => {
                eg > ey && (eh = U(eg));
                var $, r = typeof e;
                if ("string" === r) {
                    let s = e.length;
                    if (e0 && s >= 4 && s < 4096) {
                        if ((e0.size += s) > 21760) {
                            let f, u = (e0[0] ? 3 * e0[0].length + e0[1].length : 0) + 10;
                            eg + u > ey && (eh = U(eg + u));
                            let l;
                            e0.position ? (l = e0,
                            eh[eg] = 200,
                            eg += 3,
                            eh[eg++] = 98,
                            f = eg - t,
                            eg += 4,
                            eS(t, y, 0),
                            ep.setUint16(f + t - 3, eg - t - f)) : (eh[eg++] = 214,
                            eh[eg++] = 98,
                            f = eg - t,
                            eg += 4),
                            (e0 = ["", ""]).previous = l,
                            e0.size = 0,
                            e0.position = f
                        }
                        let o = e1.test(e);
                        e0[o ? 0 : 1] += e,
                        eh[eg++] = 193,
                        y(o ? -s : s);
                        return
                    }
                    let a;
                    a = s < 32 ? 1 : s < 256 ? 2 : s < 65536 ? 3 : 5;
                    let c = 3 * s;
                    if (eg + c > ey && (eh = U(eg + c)),
                    s < 64 || !i) {
                        let x, d, h, _ = eg + a;
                        for (x = 0; x < s; x++)
                            (d = e.charCodeAt(x)) < 128 ? eh[_++] = d : d < 2048 ? (eh[_++] = d >> 6 | 192,
                            eh[_++] = 63 & d | 128) : (64512 & d) == 55296 && (64512 & (h = e.charCodeAt(x + 1))) == 56320 ? (d = 65536 + ((1023 & d) << 10) + (1023 & h),
                            x++,
                            eh[_++] = d >> 18 | 240,
                            eh[_++] = d >> 12 & 63 | 128,
                            eh[_++] = d >> 6 & 63 | 128,
                            eh[_++] = 63 & d | 128) : (eh[_++] = d >> 12 | 224,
                            eh[_++] = d >> 6 & 63 | 128,
                            eh[_++] = 63 & d | 128);
                        $ = _ - eg - a
                    } else
                        $ = i(e, eg + a);
                    $ < 32 ? eh[eg++] = 160 | $ : $ < 256 ? (a < 2 && eh.copyWithin(eg + 2, eg + 1, eg + 1 + $),
                    eh[eg++] = 217,
                    eh[eg++] = $) : $ < 65536 ? (a < 3 && eh.copyWithin(eg + 3, eg + 2, eg + 2 + $),
                    eh[eg++] = 218,
                    eh[eg++] = $ >> 8,
                    eh[eg++] = 255 & $) : (a < 5 && eh.copyWithin(eg + 5, eg + 3, eg + 3 + $),
                    eh[eg++] = 219,
                    ep.setUint32(eg, $),
                    eg += 4),
                    eg += $
                } else if ("number" === r) {
                    if (e >>> 0 === e)
                        e < 32 || e < 128 && !1 === this.useRecords || e < 64 && !this.randomAccessStructure ? eh[eg++] = e : e < 256 ? (eh[eg++] = 204,
                        eh[eg++] = e) : e < 65536 ? (eh[eg++] = 205,
                        eh[eg++] = e >> 8,
                        eh[eg++] = 255 & e) : (eh[eg++] = 206,
                        ep.setUint32(eg, e),
                        eg += 4);
                    else if (e >> 0 === e)
                        e >= -32 ? eh[eg++] = 256 + e : e >= -128 ? (eh[eg++] = 208,
                        eh[eg++] = e + 256) : e >= -32768 ? (eh[eg++] = 209,
                        ep.setInt16(eg, e),
                        eg += 2) : (eh[eg++] = 210,
                        ep.setInt32(eg, e),
                        eg += 4);
                    else {
                        let p;
                        if ((p = this.useFloat32) > 0 && e < 4294967296 && e >= -2147483648) {
                            eh[eg++] = 202,
                            ep.setFloat32(eg, e);
                            let b;
                            if (p < 4 || (b = e * Q[(127 & eh[eg]) << 1 | eh[eg + 1] >> 7]) >> 0 === b) {
                                eg += 4;
                                return
                            }
                            eg--
                        }
                        eh[eg++] = 203,
                        ep.setFloat64(eg, e),
                        eg += 8
                    }
                } else if ("object" === r || "function" === r) {
                    if (e) {
                        if (n) {
                            let w = n.get(e);
                            if (w) {
                                if (!w.id) {
                                    let m = n.idsToInsert || (n.idsToInsert = []);
                                    w.id = m.push(w)
                                }
                                eh[eg++] = 214,
                                eh[eg++] = 112,
                                ep.setUint32(eg, w.id),
                                eg += 4;
                                return
                            }
                            n.set(e, {
                                offset: eg - t
                            })
                        }
                        let k = e.constructor;
                        if (k === Object)
                            S(e, !0);
                        else if (k === Array)
                            g(e);
                        else if (k === Map) {
                            if (this.mapAsEmptyObject)
                                eh[eg++] = 128;
                            else
                                for (let[I,A] of (($ = e.size) < 16 ? eh[eg++] = 128 | $ : $ < 65536 ? (eh[eg++] = 222,
                                eh[eg++] = $ >> 8,
                                eh[eg++] = 255 & $) : (eh[eg++] = 223,
                                ep.setUint32(eg, $),
                                eg += 4),
                                e))
                                    y(I),
                                    y(A)
                        } else {
                            for (let v = 0, O = el.length; v < O; v++)
                                if (e instanceof eo[v]) {
                                    let T = el[v];
                                    if (T.write) {
                                        T.type && (eh[eg++] = 212,
                                        eh[eg++] = T.type,
                                        eh[eg++] = 0);
                                        let B = T.write.call(this, e);
                                        B === e ? Array.isArray(e) ? g(e) : S(e) : y(B);
                                        return
                                    }
                                    let L = eh
                                      , F = ep
                                      , P = eg;
                                    eh = null;
                                    let z;
                                    try {
                                        z = T.pack.call(this, e, e => (eh = L,
                                        L = null,
                                        (eg += e) > ey && U(eg),
                                        {
                                            target: eh,
                                            targetView: ep,
                                            position: eg - e
                                        }), y)
                                    } finally {
                                        L && (eh = L,
                                        ep = F,
                                        eg = P,
                                        ey = eh.length - 10)
                                    }
                                    z && (z.length + eg > ey && U(z.length + eg),
                                    eg = em(z, eh, eg, T.type));
                                    return
                                }
                            if (Array.isArray(e))
                                g(e);
                            else {
                                if (e.toJSON) {
                                    let E = e.toJSON();
                                    if (E !== e)
                                        return y(E)
                                }
                                if ("function" === r)
                                    return y(this.writeFunction && this.writeFunction(e));
                                S(e, !e.hasOwnProperty)
                            }
                        }
                    } else
                        eh[eg++] = 192
                } else if ("boolean" === r)
                    eh[eg++] = e ? 195 : 194;
                else if ("bigint" === r) {
                    if (e < BigInt(1) << BigInt(63) && e >= -(BigInt(1) << BigInt(63)))
                        eh[eg++] = 211,
                        ep.setBigInt64(eg, e);
                    else if (e < BigInt(1) << BigInt(64) && e > 0)
                        eh[eg++] = 207,
                        ep.setBigUint64(eg, e);
                    else if (this.largeBigIntToFloat)
                        eh[eg++] = 203,
                        ep.setFloat64(eg, Number(e));
                    else
                        throw RangeError(e + " was too large to fit in MessagePack 64-bit integer format, set largeBigIntToFloat to convert to float-64");
                    eg += 8
                } else if ("undefined" === r)
                    this.encodeUndefinedAsNil ? eh[eg++] = 192 : (eh[eg++] = 212,
                    eh[eg++] = 0,
                    eh[eg++] = 0);
                else
                    throw Error("Unknown type: " + r)
            }
              , b = this.variableMapSize || this.coercibleKeyAsNumber ? e => {
                let t = Object.keys(e)
                  , $ = t.length;
                $ < 16 ? eh[eg++] = 128 | $ : $ < 65536 ? (eh[eg++] = 222,
                eh[eg++] = $ >> 8,
                eh[eg++] = 255 & $) : (eh[eg++] = 223,
                ep.setUint32(eg, $),
                eg += 4);
                let r;
                if (this.coercibleKeyAsNumber)
                    for (let n = 0; n < $; n++) {
                        let i = Number(r = t[n]);
                        y(isNaN(i) ? r : i),
                        y(e[r])
                    }
                else
                    for (let s = 0; s < $; s++)
                        y(r = t[s]),
                        y(e[r])
            }
            : (e, $) => {
                eh[eg++] = 222;
                let r = eg - t;
                eg += 2;
                let n = 0;
                for (let i in e)
                    ($ || e.hasOwnProperty(i)) && (y(i),
                    y(e[i]),
                    n++);
                eh[r++ + t] = n >> 8,
                eh[r + t] = 255 & n
            }
              , w = !1 === this.useRecords ? b : e.progressiveRecords && !a ? (e, $) => {
                let n, i = r.transitions || (r.transitions = Object.create(null)), s = eg++ - t, f;
                for (let u in e)
                    if ($ || e.hasOwnProperty(u)) {
                        if (n = i[u])
                            i = n;
                        else {
                            let l = Object.keys(e)
                              , o = i;
                            i = r.transitions;
                            let a = 0;
                            for (let c = 0, x = l.length; c < x; c++) {
                                let d = l[c];
                                !(n = i[d]) && (n = i[d] = Object.create(null),
                                a++),
                                i = n
                            }
                            s + t + 1 == eg ? (eg--,
                            k(i, l, a)) : I(i, l, s, a),
                            f = !0,
                            i = o[u]
                        }
                        y(e[u])
                    }
                if (!f) {
                    let h = i[e6];
                    h ? eh[s + t] = h : I(i, Object.keys(e), s, 0)
                }
            }
            : (e, t) => {
                let $, n = r.transitions || (r.transitions = Object.create(null)), i = 0;
                for (let s in e)
                    (t || e.hasOwnProperty(s)) && (!($ = n[s]) && ($ = n[s] = Object.create(null),
                    i++),
                    n = $);
                let f = n[e6];
                for (let u in f ? f >= 96 && a ? (eh[eg++] = (31 & (f -= 96)) + 96,
                eh[eg++] = f >> 5) : eh[eg++] = f : k(n, n.__keys__ || Object.keys(e), i),
                e)
                    (t || e.hasOwnProperty(u)) && y(e[u])
            }
              , m = "function" == typeof this.useRecords && this.useRecords
              , S = m ? (e, t) => {
                m(e) ? w(e, t) : b(e, t)
            }
            : w
              , U = e => {
                let $;
                if (e > 16777216) {
                    if (e - t > ed)
                        throw Error("Packed buffer would be larger than maximum buffer size");
                    $ = Math.min(ed, 4096 * Math.round(Math.max((e - t) * (e > 67108864 ? 1.25 : 2), 4194304) / 4096))
                } else
                    $ = (Math.max(e - t << 2, eh.length - 1) >> 12) + 1 << 12;
                let r = new ec($);
                return ep = r.dataView || (r.dataView = new DataView(r.buffer,0,$)),
                e = Math.min(e, eh.length),
                eh.copy ? eh.copy(r, 0, t, e) : r.set(eh.slice(t, e)),
                eg -= t,
                t = 0,
                ey = r.length - 10,
                eh = r
            }
              , k = (e, t, n) => {
                let i = r.nextId;
                i || (i = 64),
                i < c && this.shouldShareStructure && !this.shouldShareStructure(t) ? ((i = r.nextOwnId) < x || (i = c),
                r.nextOwnId = i + 1) : (i >= x && (i = c),
                r.nextId = i + 1);
                let s = t.highByte = i >= 96 && a ? i - 96 >> 5 : -1;
                e[e6] = i,
                e.__keys__ = t,
                r[i - 64] = t,
                i < c ? (t.isShared = !0,
                r.sharedLength = i - 63,
                $ = !0,
                s >= 0 ? (eh[eg++] = (31 & i) + 96,
                eh[eg++] = s) : eh[eg++] = i) : (s >= 0 ? (eh[eg++] = 213,
                eh[eg++] = 114,
                eh[eg++] = (31 & i) + 96,
                eh[eg++] = s) : (eh[eg++] = 212,
                eh[eg++] = 114,
                eh[eg++] = i),
                n && (h += _ * n),
                d.length >= o && (d.shift()[e6] = 0),
                d.push(e),
                y(t))
            }
              , I = (e, $, r, n) => {
                let i = eh
                  , s = eg
                  , f = ey
                  , u = t;
                eh = e_,
                eg = 0,
                t = 0,
                eh || (e_ = eh = new ec(8192)),
                ey = eh.length - 10,
                k(e, $, n),
                e_ = eh;
                let l = eg;
                if (eh = i,
                eg = s,
                ey = f,
                t = u,
                l > 1) {
                    let o = eg + l - 1;
                    o > ey && U(o);
                    let a = r + t;
                    eh.copyWithin(a + l, a + 1, eg),
                    eh.set(e_.slice(0, l), a),
                    eg = o
                } else
                    eh[r + t] = e_[0]
            }
              , A = (e, n) => {
                let i = e2(e, eh, t, eg, r, U, (e, t, r) => {
                    if (r)
                        return $ = !0;
                    eg = t;
                    let n = eh;
                    return (y(e),
                    p(),
                    n !== eh) ? {
                        position: eg,
                        targetView: ep,
                        target: eh
                    } : eg
                }
                , this);
                if (0 === i)
                    return S(e, !0);
                eg = i
            }
        }
        useBuffer(e) {
            eh = e,
            ep = new DataView(eh.buffer,eh.byteOffset,eh.byteLength),
            eg = 0
        }
        clearSharedData() {
            this.structures && (this.structures = []),
            this.typedStructs && (this.typedStructs = [])
        }
    }
    function eb(e, t, $, r) {
        let n = e.byteLength;
        if (n + 1 < 256) {
            var {target: i, position: s} = $(4 + n);
            i[s++] = 199,
            i[s++] = n + 1
        } else if (n + 1 < 65536) {
            var {target: i, position: s} = $(5 + n);
            i[s++] = 200,
            i[s++] = n + 1 >> 8,
            i[s++] = n + 1 & 255
        } else {
            var {target: i, position: s, targetView: f} = $(7 + n);
            i[s++] = 201,
            f.setUint32(s, n + 1),
            s += 4
        }
        i[s++] = 116,
        i[s++] = t,
        i.set(new Uint8Array(e.buffer,e.byteOffset,e.byteLength), s)
    }
    function ew(e, t) {
        let $ = e.byteLength;
        if ($ < 256) {
            var r, n, {target: r, position: n} = t($ + 2);
            r[n++] = 196,
            r[n++] = $
        } else if ($ < 65536) {
            var {target: r, position: n} = t($ + 3);
            r[n++] = 197,
            r[n++] = $ >> 8,
            r[n++] = 255 & $
        } else {
            var {target: r, position: n, targetView: i} = t($ + 5);
            r[n++] = 198,
            i.setUint32(n, $),
            n += 4
        }
        r.set(e, n)
    }
    function em(e, t, $, r) {
        let n = e.length;
        switch (n) {
        case 1:
            t[$++] = 212;
            break;
        case 2:
            t[$++] = 213;
            break;
        case 4:
            t[$++] = 214;
            break;
        case 8:
            t[$++] = 215;
            break;
        case 16:
            t[$++] = 216;
            break;
        default:
            n < 256 ? (t[$++] = 199,
            t[$++] = n) : n < 65536 ? (t[$++] = 200,
            t[$++] = n >> 8,
            t[$++] = 255 & n) : (t[$++] = 201,
            t[$++] = n >> 24,
            t[$++] = n >> 16 & 255,
            t[$++] = n >> 8 & 255,
            t[$++] = 255 & n)
        }
        return t[$++] = r,
        t.set(e, $),
        $ += n
    }
    function eS(e, t, $) {
        if (e0.length > 0) {
            ep.setUint32(e0.position + e, eg + $ - e0.position - e),
            e0.stringsPosition = eg - e;
            let r = e0;
            e0 = null,
            t(r[0]),
            t(r[1])
        }
    }
    eo = [Date, Set, Error, RegExp, ArrayBuffer, Object.getPrototypeOf(Uint8Array.prototype).constructor, p],
    el = [{
        pack(e, t, $) {
            let r = e.getTime() / 1e3;
            if ((this.useTimestamp32 || 0 === e.getMilliseconds()) && r >= 0 && r < 4294967296) {
                let {target: n, targetView: i, position: s} = t(6);
                n[s++] = 214,
                n[s++] = 255,
                i.setUint32(s, r)
            } else if (r > 0 && r < 4294967296) {
                let {target: f, targetView: u, position: l} = t(10);
                f[l++] = 215,
                f[l++] = 255,
                u.setUint32(l, 4e6 * e.getMilliseconds() + (r / 1e3 / 4294967296 >> 0)),
                u.setUint32(l + 4, r)
            } else if (isNaN(r)) {
                if (this.onInvalidDate)
                    return t(0),
                    $(this.onInvalidDate());
                let {target: o, targetView: a, position: c} = t(3);
                o[c++] = 212,
                o[c++] = 255,
                o[c++] = 255
            } else {
                let {target: x, targetView: d, position: h} = t(15);
                x[h++] = 199,
                x[h++] = 12,
                x[h++] = 255,
                d.setUint32(h, 1e6 * e.getMilliseconds()),
                d.setBigInt64(h + 4, BigInt(Math.floor(r)))
            }
        }
    }, {
        pack(e, t, $) {
            if (this.setAsEmptyObject)
                return t(0),
                $({});
            let r = Array.from(e)
              , {target: n, position: i} = t(this.moreTypes ? 3 : 0);
            this.moreTypes && (n[i++] = 212,
            n[i++] = 115,
            n[i++] = 0),
            $(r)
        }
    }, {
        pack(e, t, $) {
            let {target: r, position: n} = t(this.moreTypes ? 3 : 0);
            this.moreTypes && (r[n++] = 212,
            r[n++] = 101,
            r[n++] = 0),
            $([e.name, e.message])
        }
    }, {
        pack(e, t, $) {
            let {target: r, position: n} = t(this.moreTypes ? 3 : 0);
            this.moreTypes && (r[n++] = 212,
            r[n++] = 120,
            r[n++] = 0),
            $([e.source, e.flags])
        }
    }, {
        pack(e, t) {
            this.moreTypes ? eb(e, 16, t) : ew(ea ? Buffer.from(e) : new Uint8Array(e), t)
        }
    }, {
        pack(e, t) {
            let $ = e.constructor;
            $ !== ex && this.moreTypes ? eb(e, K.indexOf($.name), t) : ew(e, t)
        }
    }, {
        pack(e, t) {
            let {target: $, position: r} = t(1);
            $[r] = 193
        }
    }];
    let eU = new e4({
        useRecords: !1
    })
      , ek = eU.pack
      , eI = eU.pack
      , {NEVER: e8, ALWAYS: eA, DECIMAL_ROUND: e5, DECIMAL_FIT: e3} = en
      , ev = 512
      , eO = 1024
      , eT = 2048;
    async function *eB(e, t) {
        let $ = new e4(t);
        for await(let r of e)
            yield $.pack(r)
    }
    let eL = function e(t, $={}) {
        if (!t || "object" != typeof t)
            throw Error("first argument must be an Iterable, Async Iterable, Iterator, Async Iterator, or a promise");
        let r = new m($), n, i = e => {
            let t;
            n && (e = Buffer.concat([n, e]),
            n = void 0);
            try {
                t = r.unpackMultiple(e)
            } catch ($) {
                if ($.incomplete)
                    n = e.slice($.lastPosition),
                    t = $.values;
                else
                    throw $
            }
            return t
        }
        ;
        return "function" == typeof t[Symbol.iterator] ? function *e() {
            for (let $ of t)
                yield*i($)
        }() : "function" == typeof t[Symbol.asyncIterator] ? async function *e() {
            for await(let $ of t)
                yield*i($)
        }() : void 0
    }
      , eF = function e(t, $={}) {
        if (t && "object" == typeof t) {
            if ("function" == typeof t[Symbol.iterator])
                return function *e(t, $) {
                    let r = new e4($);
                    for (let n of t)
                        yield r.pack(n)
                }(t, $);
            if ("function" == typeof t.then || "function" == typeof t[Symbol.asyncIterator])
                return eB(t, $);
            else
                throw Error("first argument must be an Iterable, Async Iterable, Iterator, Async Iterator, or a Promise")
        }
        throw Error("first argument must be an Iterable, Async Iterable, or a Promise for an Async Iterable")
    };
    e.ALWAYS = eA,
    e.C1 = g,
    e.DECIMAL_FIT = e3,
    e.DECIMAL_ROUND = e5,
    e.Decoder = m,
    e.Encoder = e4,
    e.FLOAT32_OPTIONS = en,
    e.NEVER = e8,
    e.Packr = e4,
    e.REUSE_BUFFER_MODE = ev,
    e.Unpackr = m,
    e.addExtension = function e(t) {
        var $;
        if (t.Class) {
            if (!t.pack && !t.write)
                throw Error("Extension has no pack or write function");
            if (t.pack && !t.type)
                throw Error("Extension has no type (numeric code to identify the extension)");
            eo.unshift(t.Class),
            el.unshift(t)
        }
        ($ = t).unpack ? h[$.type] = $.unpack : h[$.type] = $
    }
    ,
    e.clearSource = H,
    e.decode = er,
    e.decodeIter = eL,
    e.encode = eI,
    e.encodeIter = eF,
    e.isNativeAccelerationEnabled = !1,
    e.mapsAsObjects = !0,
    e.pack = ek,
    e.roundFloat32 = function e(t) {
        ei[0] = t;
        let $ = Q[(127 & es[3]) << 1 | es[2] >> 7];
        return ($ * t + (t > 0 ? .5 : -.5) >> 0) / $
    }
    ,
    e.unpack = et,
    e.unpackMultiple = e$,
    e.useRecords = !1
});
