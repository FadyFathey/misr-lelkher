! function() {
    "use strict";

    function t() {
        t = function() {
            return e
        };
        var e = {},
            r = Object.prototype,
            n = r.hasOwnProperty,
            o = "function" == typeof Symbol ? Symbol : {},
            i = o.iterator || "@@iterator",
            a = o.asyncIterator || "@@asyncIterator",
            c = o.toStringTag || "@@toStringTag";

        function u(t, e, r) {
            return Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }), t[e]
        }
        try {
            u({}, "")
        } catch (t) {
            u = function(t, e, r) {
                return t[e] = r
            }
        }

        function l(t, e, r, n) {
            var o = e && e.prototype instanceof p ? e : p,
                i = Object.create(o.prototype),
                a = new I(n || []);
            return i._invoke = function(t, e, r) {
                var n = "suspendedStart";
                return function(o, i) {
                    if ("executing" === n) throw new Error("Generator is already running");
                    if ("completed" === n) {
                        if ("throw" === o) throw i;
                        return T()
                    }
                    for (r.method = o, r.arg = i;;) {
                        var a = r.delegate;
                        if (a) {
                            var c = g(a, r);
                            if (c) {
                                if (c === s) continue;
                                return c
                            }
                        }
                        if ("next" === r.method) r.sent = r._sent = r.arg;
                        else if ("throw" === r.method) {
                            if ("suspendedStart" === n) throw n = "completed", r.arg;
                            r.dispatchException(r.arg)
                        } else "return" === r.method && r.abrupt("return", r.arg);
                        n = "executing";
                        var u = f(t, e, r);
                        if ("normal" === u.type) {
                            if (n = r.done ? "completed" : "suspendedYield", u.arg === s) continue;
                            return {
                                value: u.arg,
                                done: r.done
                            }
                        }
                        "throw" === u.type && (n = "completed", r.method = "throw", r.arg = u.arg)
                    }
                }
            }(t, r, a), i
        }

        function f(t, e, r) {
            try {
                return {
                    type: "normal",
                    arg: t.call(e, r)
                }
            } catch (t) {
                return {
                    type: "throw",
                    arg: t
                }
            }
        }
        e.wrap = l;
        var s = {};

        function p() {}

        function h() {}

        function y() {}
        var d = {};
        u(d, i, (function() {
            return this
        }));
        var _ = Object.getPrototypeOf,
            v = _ && _(_(S([])));
        v && v !== r && n.call(v, i) && (d = v);
        var m = y.prototype = p.prototype = Object.create(d);

        function b(t) {
            ["next", "throw", "return"].forEach((function(e) {
                u(t, e, (function(t) {
                    return this._invoke(e, t)
                }))
            }))
        }

        function w(t, e) {
            function r(o, i, a, c) {
                var u = f(t[o], t, i);
                if ("throw" !== u.type) {
                    var l = u.arg,
                        s = l.value;
                    return s && "object" == typeof s && n.call(s, "__await") ? e.resolve(s.__await).then((function(t) {
                        r("next", t, a, c)
                    }), (function(t) {
                        r("throw", t, a, c)
                    })) : e.resolve(s).then((function(t) {
                        l.value = t, a(l)
                    }), (function(t) {
                        return r("throw", t, a, c)
                    }))
                }
                c(u.arg)
            }
            var o;
            this._invoke = function(t, n) {
                function i() {
                    return new e((function(e, o) {
                        r(t, n, e, o)
                    }))
                }
                return o = o ? o.then(i, i) : i()
            }
        }

        function g(t, e) {
            var r = t.iterator[e.method];
            if (void 0 === r) {
                if (e.delegate = null, "throw" === e.method) {
                    if (t.iterator.return && (e.method = "return", e.arg = void 0, g(t, e), "throw" === e.method)) return s;
                    e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method")
                }
                return s
            }
            var n = f(r, t.iterator, e.arg);
            if ("throw" === n.type) return e.method = "throw", e.arg = n.arg, e.delegate = null, s;
            var o = n.arg;
            return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, s) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, s)
        }

        function O(t) {
            var e = {
                tryLoc: t[0]
            };
            1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
        }

        function E(t) {
            var e = t.completion || {};
            e.type = "normal", delete e.arg, t.completion = e
        }

        function I(t) {
            this.tryEntries = [{
                tryLoc: "root"
            }], t.forEach(O, this), this.reset(!0)
        }

        function S(t) {
            if (t) {
                var e = t[i];
                if (e) return e.call(t);
                if ("function" == typeof t.next) return t;
                if (!isNaN(t.length)) {
                    var r = -1,
                        o = function e() {
                            for (; ++r < t.length;)
                                if (n.call(t, r)) return e.value = t[r], e.done = !1, e;
                            return e.value = void 0, e.done = !0, e
                        };
                    return o.next = o
                }
            }
            return {
                next: T
            }
        }

        function T() {
            return {
                value: void 0,
                done: !0
            }
        }
        return h.prototype = y, u(m, "constructor", y), u(y, "constructor", h), h.displayName = u(y, c, "GeneratorFunction"), e.isGeneratorFunction = function(t) {
            var e = "function" == typeof t && t.constructor;
            return !!e && (e === h || "GeneratorFunction" === (e.displayName || e.name))
        }, e.mark = function(t) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(t, y) : (t.__proto__ = y, u(t, c, "GeneratorFunction")), t.prototype = Object.create(m), t
        }, e.awrap = function(t) {
            return {
                __await: t
            }
        }, b(w.prototype), u(w.prototype, a, (function() {
            return this
        })), e.AsyncIterator = w, e.async = function(t, r, n, o, i) {
            void 0 === i && (i = Promise);
            var a = new w(l(t, r, n, o), i);
            return e.isGeneratorFunction(r) ? a : a.next().then((function(t) {
                return t.done ? t.value : a.next()
            }))
        }, b(m), u(m, c, "Generator"), u(m, i, (function() {
            return this
        })), u(m, "toString", (function() {
            return "[object Generator]"
        })), e.keys = function(t) {
            var e = [];
            for (var r in t) e.push(r);
            return e.reverse(),
                function r() {
                    for (; e.length;) {
                        var n = e.pop();
                        if (n in t) return r.value = n, r.done = !1, r
                    }
                    return r.done = !0, r
                }
        }, e.values = S, I.prototype = {
            constructor: I,
            reset: function(t) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(E), !t)
                    for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0)
            },
            stop: function() {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval
            },
            dispatchException: function(t) {
                if (this.done) throw t;
                var e = this;

                function r(r, n) {
                    return a.type = "throw", a.arg = t, e.next = r, n && (e.method = "next", e.arg = void 0), !!n
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                    var i = this.tryEntries[o],
                        a = i.completion;
                    if ("root" === i.tryLoc) return r("end");
                    if (i.tryLoc <= this.prev) {
                        var c = n.call(i, "catchLoc"),
                            u = n.call(i, "finallyLoc");
                        if (c && u) {
                            if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                            if (this.prev < i.finallyLoc) return r(i.finallyLoc)
                        } else if (c) {
                            if (this.prev < i.catchLoc) return r(i.catchLoc, !0)
                        } else {
                            if (!u) throw new Error("try statement without catch or finally");
                            if (this.prev < i.finallyLoc) return r(i.finallyLoc)
                        }
                    }
                }
            },
            abrupt: function(t, e) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                    var o = this.tryEntries[r];
                    if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                        var i = o;
                        break
                    }
                }
                i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
                var a = i ? i.completion : {};
                return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, s) : this.complete(a)
            },
            complete: function(t, e) {
                if ("throw" === t.type) throw t.arg;
                return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), s
            },
            finish: function(t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var r = this.tryEntries[e];
                    if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), E(r), s
                }
            },
            catch: function(t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var r = this.tryEntries[e];
                    if (r.tryLoc === t) {
                        var n = r.completion;
                        if ("throw" === n.type) {
                            var o = n.arg;
                            E(r)
                        }
                        return o
                    }
                }
                throw new Error("illegal catch attempt")
            },
            delegateYield: function(t, e, r) {
                return this.delegate = {
                    iterator: S(t),
                    resultName: e,
                    nextLoc: r
                }, "next" === this.method && (this.arg = void 0), s
            }
        }, e
    }

    function e(t) {
        return e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, e(t)
    }

    function r(t, e) {
        return r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t
        }, r(t, e)
    }

    function n() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
            return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
        } catch (t) {
            return !1
        }
    }

    function o(t, e, i) {
        return o = n() ? Reflect.construct.bind() : function(t, e, n) {
            var o = [null];
            o.push.apply(o, e);
            var i = new(Function.bind.apply(t, o));
            return n && r(i, n.prototype), i
        }, o.apply(null, arguments)
    }

    function i(t) {
        return function(t) {
            if (Array.isArray(t)) return a(t)
        }(t) || function(t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
        }(t) || function(t, e) {
            if (!t) return;
            if ("string" == typeof t) return a(t, e);
            var r = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === r && t.constructor && (r = t.constructor.name);
            if ("Map" === r || "Set" === r) return Array.from(t);
            if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return a(t, e)
        }(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function a(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
        return n
    }
    var c, u;
    ! function(t) {
        t.MUSICAL_LY = "musical_ly", t.MUSICALLY_GO = "musically_go", t.TRILL = "trill"
    }(c || (c = {})),
    function(t) {
        t.LOAD_START = "load_start", t.LOAD_END = "load_end", t.BEFORE_INIT = "before_init", t.INIT_START = "init_start", t.INIT_END = "init_end", t.JSB_INIT_START = "jsb_init_start", t.JSB_INIT_END = "jsb_init_end", t.BEFORE_AD_INFO_INIT_START = "before_ad_info_init_start", t.AD_INFO_INIT_START = "ad_info_init_start", t.AD_INFO_INIT_END = "ad_info_init_end", t.IDENTIFY_INIT_START = "identify_init_start", t.IDENTIFY_INIT_END = "identify_init_end", t.PLUGIN_INIT_START = "_init_start", t.PLUGIN_INIT_END = "_init_end", t.PIXEL_SEND = "pixel_send", t.PIXEL_SEND_PCM = "pixel_send_PCM", t.JSB_SEND = "jsb_send", t.HTTP_SEND = "http_send", t.HANDLE_CACHE = "handle_cache", t.INIT_ERROR = "init_error", t.PIXEL_EMPTY = "pixel_empty", t.JSB_ERROR = "jsb_error", t.API_ERROR = "api_error", t.PLUGIN_ERROR = "plugin_error", t.CUSTOM_INFO = "custom_info", t.CUSTOM_ERROR = "custom_error", t.CUSTOM_TIMER = "custom_timer"
    }(u || (u = {}));
    var l = function() {
            return "undefined" != typeof window ? window : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof global ? global : new Function("return this")()
        },
        f = function() {
            return l().TiktokAnalyticsObject || "ttq"
        },
        s = function() {
            return l()[f()]
        },
        p = function(t) {
            try {
                var e = s()._plugins || {};
                return null == e[t] || !!e[t]
            } catch (t) {
                return !0
            }
        },
        h = {
            info: [],
            error: []
        };
    try {
        ! function() {
            if (/function bind\(\) \{[\s\S]*\[native code\][\s\S]*\}/.test(Function.prototype.bind.toString())) return !0;

            function t() {}
            return new(t.bind.apply(t, [void 0, 1])) instanceof t
        }() || Function.prototype._ttq_bind ? Function.prototype._ttq_bind || Object.defineProperty(Function.prototype, "_ttq_bind", {
                value: function(t) {
                    if ("function" != typeof this) throw new TypeError("What is being called by bind is not a function.");
                    var e = t || window,
                        r = Array.prototype.slice.call(arguments).slice(1),
                        n = Symbol("key");
                    return e[n] = this,
                        function t() {
                            return this instanceof t ? o(e[n], i(r).concat(Array.prototype.slice.call(arguments))) : e[n].apply(e, i(r).concat(Array.prototype.slice.call(arguments)))
                        }
                },
                enumerable: !1,
                writable: !1,
                configurable: !1
            }) : Object.defineProperty(Function.prototype, "_ttq_bind", {
                value: Function.prototype.bind,
                enumerable: !1,
                writable: !1,
                configurable: !1
            }), Object._ttq_keys || (Object._ttq_keys = function(t) {
                try {
                    return Array.isArray(t) ? Object.keys(t).filter((function(t) {
                        return -1 === ["each", "eachSlice", "all", "any", "collect", "detect", "findAll", "grep", "include", "inGroupsOf", "inject", "invoke", "max", "min", "partition", "pluck", "reject", "sortBy", "toArray", "zip", "size", "inspect", "select", "member", "_reverse", "_each", "clear", "first", "last", "compact", "flatten", "without", "uniq", "intersect", "clone", "toJSON", "remove", "swap", "putAll"].indexOf(t)
                    })) : Object.keys(t)
                } catch (e) {
                    return Object.keys(t)
                }
            }),
            function() {
                var e = f();

                function r(t) {
                    return null === t ? "NULL" : void 0 === t ? "UNDEFINED" : "[object Object]" === Object.prototype.toString.call(t) || "[object Array]" === Object.prototype.toString.call(t) ? JSON.stringify(t) : t.toString()
                }
                /function Map\(\) \{[\s\S]*\[native code\][\s\S]*\}/.test(Map.toString()) ? window[e]._ttq_map = Map : window[e]._ttq_map || (window[e]._ttq_map = function() {
                    this.items = {}, this.size = 0
                }, window[e]._ttq_map.prototype.set = function(t, e) {
                    return this.has(t) || (this.items[r(t)] = e, this.size++), this
                }, window[e]._ttq_map.prototype.get = function(t) {
                    return this.items[r(t)]
                }, window[e]._ttq_map.prototype.has = function(t) {
                    return void 0 !== this.items[r(t)]
                }, window[e]._ttq_map.prototype.delete = function(t) {
                    return this.has(t) && (delete this.items[r(t)], this.size--), this
                }, window[e]._ttq_map.prototype.clear = function() {
                    this.items = {}, this.size = 0
                }, window[e]._ttq_map.prototype.keys = function() {
                    var e = t().mark(o),
                        r = [];
                    for (var n in this.items) this.has(n) && r.push(n);

                    function o() {
                        return t().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return t.delegateYield(r, "t0", 1);
                                case 1:
                                case "end":
                                    return t.stop()
                            }
                        }), e)
                    }
                    return o()
                }, window[e]._ttq_map.prototype.values = function() {
                    var e = t().mark(o),
                        r = [];
                    for (var n in this.items) this.has(n) && r.push(this.items[n]);

                    function o() {
                        return t().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return t.delegateYield(r, "t0", 1);
                                case 1:
                                case "end":
                                    return t.stop()
                            }
                        }), e)
                    }
                    return o()
                })
            }(), /function create\(\) \{[\s\S]*\[native code\][\s\S]*\}/.test(Map.toString()) ? Object._ttq_create = Object.create : Object._ttq_create = function() {
                function t() {}
                var r = Object.prototype.hasOwnProperty;
                return function(n, o) {
                    if ("object" !== e(n) && "function" != typeof n) throw new TypeError("Object prototype may only be an Object or null");
                    t.prototype = n;
                    var i = new t;
                    return t.prototype = null, null != o && Object.keys(o).forEach((function(t) {
                        var n = o[t];
                        if ("object" !== e(n) || null === n) throw new TypeError("Property description must be an object: " + n);
                        r.call(n, "value") ? i[t] = n.value : "function" != typeof n.get && "function" != typeof n.set || Object.defineProperty(i, t, n)
                    })), i
                }
            }()
    } catch (t) {
        ! function(t, e) {
            var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            try {
                var o = s(),
                    i = o.getPlugin && o.getPlugin("Monitor") || null;
                i && i.error && "function" == typeof i.error ? i.error.call(i, t, e, r, n) : p("Monitor") && h.error.push({
                    event: t,
                    err: e,
                    detail: r,
                    withoutJSB: n
                })
            } catch (t) {}
        }(u.INIT_ERROR, t)
    }
}();
! function() {
    "use strict";

    function e() {
        e = function() {
            return t
        };
        var t = {},
            n = Object.prototype,
            r = n.hasOwnProperty,
            i = "function" == typeof Symbol ? Symbol : {},
            o = i.iterator || "@@iterator",
            a = i.asyncIterator || "@@asyncIterator",
            c = i.toStringTag || "@@toStringTag";

        function s(e, t, n) {
            return Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }), e[t]
        }
        try {
            s({}, "")
        } catch (e) {
            s = function(e, t, n) {
                return e[t] = n
            }
        }

        function u(e, t, n, r) {
            var i = t && t.prototype instanceof d ? t : d,
                o = Object._ttq_create(i.prototype),
                a = new O(r || []);
            return o._invoke = function(e, t, n) {
                var r = "suspendedStart";
                return function(i, o) {
                    if ("executing" === r) throw new Error("Generator is already running");
                    if ("completed" === r) {
                        if ("throw" === i) throw o;
                        return N()
                    }
                    for (n.method = i, n.arg = o;;) {
                        var a = n.delegate;
                        if (a) {
                            var c = b(a, n);
                            if (c) {
                                if (c === f) continue;
                                return c
                            }
                        }
                        if ("next" === n.method) n.sent = n._sent = n.arg;
                        else if ("throw" === n.method) {
                            if ("suspendedStart" === r) throw r = "completed", n.arg;
                            n.dispatchException(n.arg)
                        } else "return" === n.method && n.abrupt("return", n.arg);
                        r = "executing";
                        var s = l(e, t, n);
                        if ("normal" === s.type) {
                            if (r = n.done ? "completed" : "suspendedYield", s.arg === f) continue;
                            return {
                                value: s.arg,
                                done: n.done
                            }
                        }
                        "throw" === s.type && (r = "completed", n.method = "throw", n.arg = s.arg)
                    }
                }
            }(e, n, a), o
        }

        function l(e, t, n) {
            try {
                return {
                    type: "normal",
                    arg: e.call(t, n)
                }
            } catch (e) {
                return {
                    type: "throw",
                    arg: e
                }
            }
        }
        t.wrap = u;
        var f = {};

        function d() {}

        function h() {}

        function p() {}
        var v = {};
        s(v, o, (function() {
            return this
        }));
        var _ = Object.getPrototypeOf,
            g = _ && _(_(S([])));
        g && g !== n && r.call(g, o) && (v = g);
        var y = p.prototype = d.prototype = Object._ttq_create(v);

        function m(e) {
            ["next", "throw", "return"].forEach((function(t) {
                s(e, t, (function(e) {
                    return this._invoke(t, e)
                }))
            }))
        }

        function E(e, t) {
            function n(i, o, a, c) {
                var s = l(e[i], e, o);
                if ("throw" !== s.type) {
                    var u = s.arg,
                        f = u.value;
                    return f && "object" == typeof f && r.call(f, "__await") ? t.resolve(f.__await).then((function(e) {
                        n("next", e, a, c)
                    }), (function(e) {
                        n("throw", e, a, c)
                    })) : t.resolve(f).then((function(e) {
                        u.value = e, a(u)
                    }), (function(e) {
                        return n("throw", e, a, c)
                    }))
                }
                c(s.arg)
            }
            var i;
            this._invoke = function(e, r) {
                function o() {
                    return new t((function(t, i) {
                        n(e, r, t, i)
                    }))
                }
                return i = i ? i.then(o, o) : o()
            }
        }

        function b(e, t) {
            var n = e.iterator[t.method];
            if (void 0 === n) {
                if (t.delegate = null, "throw" === t.method) {
                    if (e.iterator.return && (t.method = "return", t.arg = void 0, b(e, t), "throw" === t.method)) return f;
                    t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method")
                }
                return f
            }
            var r = l(n, e.iterator, t.arg);
            if ("throw" === r.type) return t.method = "throw", t.arg = r.arg, t.delegate = null, f;
            var i = r.arg;
            return i ? i.done ? (t[e.resultName] = i.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = void 0), t.delegate = null, f) : i : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, f)
        }

        function T(e) {
            var t = {
                tryLoc: e[0]
            };
            1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
        }

        function I(e) {
            var t = e.completion || {};
            t.type = "normal", delete t.arg, e.completion = t
        }

        function O(e) {
            this.tryEntries = [{
                tryLoc: "root"
            }], e.forEach(T, this), this.reset(!0)
        }

        function S(e) {
            if (e) {
                var t = e[o];
                if (t) return t.call(e);
                if ("function" == typeof e.next) return e;
                if (!isNaN(e.length)) {
                    var n = -1,
                        i = function t() {
                            for (; ++n < e.length;)
                                if (r.call(e, n)) return t.value = e[n], t.done = !1, t;
                            return t.value = void 0, t.done = !0, t
                        };
                    return i.next = i
                }
            }
            return {
                next: N
            }
        }

        function N() {
            return {
                value: void 0,
                done: !0
            }
        }
        return h.prototype = p, s(y, "constructor", p), s(p, "constructor", h), h.displayName = s(p, c, "GeneratorFunction"), t.isGeneratorFunction = function(e) {
            var t = "function" == typeof e && e.constructor;
            return !!t && (t === h || "GeneratorFunction" === (t.displayName || t.name))
        }, t.mark = function(e) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(e, p) : (e.__proto__ = p, s(e, c, "GeneratorFunction")), e.prototype = Object._ttq_create(y), e
        }, t.awrap = function(e) {
            return {
                __await: e
            }
        }, m(E.prototype), s(E.prototype, a, (function() {
            return this
        })), t.AsyncIterator = E, t.async = function(e, n, r, i, o) {
            void 0 === o && (o = Promise);
            var a = new E(u(e, n, r, i), o);
            return t.isGeneratorFunction(n) ? a : a.next().then((function(e) {
                return e.done ? e.value : a.next()
            }))
        }, m(y), s(y, c, "Generator"), s(y, o, (function() {
            return this
        })), s(y, "toString", (function() {
            return "[object Generator]"
        })), t.keys = function(e) {
            var t = [];
            for (var n in e) t.push(n);
            return t.reverse(),
                function n() {
                    for (; t.length;) {
                        var r = t.pop();
                        if (r in e) return n.value = r, n.done = !1, n
                    }
                    return n.done = !0, n
                }
        }, t.values = S, O.prototype = {
            constructor: O,
            reset: function(e) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(I), !e)
                    for (var t in this) "t" === t.charAt(0) && r.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0)
            },
            stop: function() {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval
            },
            dispatchException: function(e) {
                if (this.done) throw e;
                var t = this;

                function n(n, r) {
                    return a.type = "throw", a.arg = e, t.next = n, r && (t.method = "next", t.arg = void 0), !!r
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var o = this.tryEntries[i],
                        a = o.completion;
                    if ("root" === o.tryLoc) return n("end");
                    if (o.tryLoc <= this.prev) {
                        var c = r.call(o, "catchLoc"),
                            s = r.call(o, "finallyLoc");
                        if (c && s) {
                            if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                            if (this.prev < o.finallyLoc) return n(o.finallyLoc)
                        } else if (c) {
                            if (this.prev < o.catchLoc) return n(o.catchLoc, !0)
                        } else {
                            if (!s) throw new Error("try statement without catch or finally");
                            if (this.prev < o.finallyLoc) return n(o.finallyLoc)
                        }
                    }
                }
            },
            abrupt: function(e, t) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                    var i = this.tryEntries[n];
                    if (i.tryLoc <= this.prev && r.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
                        var o = i;
                        break
                    }
                }
                o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
                var a = o ? o.completion : {};
                return a.type = e, a.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, f) : this.complete(a)
            },
            complete: function(e, t) {
                if ("throw" === e.type) throw e.arg;
                return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), f
            },
            finish: function(e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), I(n), f
                }
            },
            catch: function(e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.tryLoc === e) {
                        var r = n.completion;
                        if ("throw" === r.type) {
                            var i = r.arg;
                            I(n)
                        }
                        return i
                    }
                }
                throw new Error("illegal catch attempt")
            },
            delegateYield: function(e, t, n) {
                return this.delegate = {
                    iterator: S(e),
                    resultName: t,
                    nextLoc: n
                }, "next" === this.method && (this.arg = void 0), f
            }
        }, t
    }

    function t(e) {
        return t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, t(e)
    }

    function n(e, t, n, r, i, o, a) {
        try {
            var c = e[o](a),
                s = c.value
        } catch (e) {
            return void n(e)
        }
        c.done ? t(s) : Promise.resolve(s).then(r, i)
    }

    function r(e) {
        return function() {
            var t = this,
                r = arguments;
            return new Promise((function(i, o) {
                var a = e.apply(t, r);

                function c(e) {
                    n(a, i, o, c, s, "next", e)
                }

                function s(e) {
                    n(a, i, o, c, s, "throw", e)
                }
                c(void 0)
            }))
        }
    }

    function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function o(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function a(e, t, n) {
        return t && o(e.prototype, t), n && o(e, n), Object.defineProperty(e, "prototype", {
            writable: !1
        }), e
    }

    function c(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function s(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object._ttq_create(t && t.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), Object.defineProperty(e, "prototype", {
            writable: !1
        }), t && l(e, t)
    }

    function u(e) {
        return u = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        }, u(e)
    }

    function l(e, t) {
        return l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
            return e.__proto__ = t, e
        }, l(e, t)
    }

    function f(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function d(e, t) {
        if (t && ("object" == typeof t || "function" == typeof t)) return t;
        if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
        return f(e)
    }

    function h(e) {
        var t = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
            } catch (e) {
                return !1
            }
        }();
        return function() {
            var n, r = u(e);
            if (t) {
                var i = u(this).constructor;
                n = Reflect.construct(r, arguments, i)
            } else n = r.apply(this, arguments);
            return d(this, n)
        }
    }

    function p(e, t) {
        for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = u(e)););
        return e
    }

    function v() {
        return v = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(e, t, n) {
            var r = p(e, t);
            if (r) {
                var i = Object.getOwnPropertyDescriptor(r, t);
                return i.get ? i.get.call(arguments.length < 3 ? e : n) : i.value
            }
        }, v.apply(this, arguments)
    }

    function _(e, t) {
        return m(e) || function(e, t) {
            var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (null == n) return;
            var r, i, o = [],
                a = !0,
                c = !1;
            try {
                for (n = n.call(e); !(a = (r = n.next()).done) && (o.push(r.value), !t || o.length !== t); a = !0);
            } catch (e) {
                c = !0, i = e
            } finally {
                try {
                    a || null == n.return || n.return()
                } finally {
                    if (c) throw i
                }
            }
            return o
        }(e, t) || b(e, t) || I()
    }

    function g(e) {
        return m(e) || E(e) || b(e) || I()
    }

    function y(e) {
        return function(e) {
            if (Array.isArray(e)) return T(e)
        }(e) || E(e) || b(e) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function m(e) {
        if (Array.isArray(e)) return e
    }

    function E(e) {
        if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
    }

    function b(e, t) {
        if (e) {
            if ("string" == typeof e) return T(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? T(e, t) : void 0
        }
    }

    function T(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r
    }

    function I() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }

    function O(e, t) {
        var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
        if (!n) {
            if (Array.isArray(e) || (n = b(e)) || t && e && "number" == typeof e.length) {
                n && (e = n);
                var r = 0,
                    i = function() {};
                return {
                    s: i,
                    n: function() {
                        return r >= e.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: e[r++]
                        }
                    },
                    e: function(e) {
                        throw e
                    },
                    f: i
                }
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var o, a = !0,
            c = !1;
        return {
            s: function() {
                n = n.call(e)
            },
            n: function() {
                var e = n.next();
                return a = e.done, e
            },
            e: function(e) {
                c = !0, o = e
            },
            f: function() {
                try {
                    a || null == n.return || n.return()
                } finally {
                    if (c) throw o
                }
            }
        }
    }
    var S, N = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    ! function(e) {
        ! function(t) {
            var n = "object" == typeof N ? N : "object" == typeof self ? self : "object" == typeof this ? this : Function("return this;")(),
                r = i(e);

            function i(e, t) {
                return function(n, r) {
                    "function" != typeof e[n] && Object.defineProperty(e, n, {
                        configurable: !0,
                        writable: !0,
                        value: r
                    }), t && t(n, r)
                }
            }
            void 0 === n.Reflect ? n.Reflect = e : r = i(n.Reflect, r),
                function(e) {
                    var t = Object.prototype.hasOwnProperty,
                        n = "function" == typeof Symbol,
                        r = n && void 0 !== Symbol.toPrimitive ? Symbol.toPrimitive : "@@toPrimitive",
                        i = n && void 0 !== Symbol.iterator ? Symbol.iterator : "@@iterator",
                        o = "function" == typeof Object.create,
                        a = {
                            __proto__: []
                        }
                    instanceof Array, c = !o && !a, s = {
                        create: o ? function() {
                            return re(Object._ttq_create(null))
                        } : a ? function() {
                            return re({
                                __proto__: null
                            })
                        } : function() {
                            return re({})
                        },
                        has: c ? function(e, n) {
                            return t.call(e, n)
                        } : function(e, t) {
                            return t in e
                        },
                        get: c ? function(e, n) {
                            return t.call(e, n) ? e[n] : void 0
                        } : function(e, t) {
                            return e[t]
                        }
                    }, u = Object.getPrototypeOf(Function), l = "object" == typeof process && process.env && "true" === process.env.REFLECT_METADATA_USE_MAP_POLYFILL, f = l || "function" != typeof Map || "function" != typeof Map.prototype.entries ? ee() : Map, d = l || "function" != typeof Set || "function" != typeof Set.prototype.entries ? te() : Set, h = new(l || "function" != typeof WeakMap ? ne() : WeakMap);

                    function p(e, t, n, r) {
                        if (D(n)) {
                            if (!J(e)) throw new TypeError;
                            if (!K(t)) throw new TypeError;
                            return O(e, t)
                        }
                        if (!J(e)) throw new TypeError;
                        if (!U(t)) throw new TypeError;
                        if (!U(r) && !D(r) && !x(r)) throw new TypeError;
                        return x(r) && (r = void 0), S(e, t, n = G(n), r)
                    }

                    function v(e, t) {
                        function n(n, r) {
                            if (!U(n)) throw new TypeError;
                            if (!D(r) && !Y(r)) throw new TypeError;
                            w(e, t, n, r)
                        }
                        return n
                    }

                    function _(e, t, n, r) {
                        if (!U(n)) throw new TypeError;
                        return D(r) || (r = G(r)), w(e, t, n, r)
                    }

                    function g(e, t, n) {
                        if (!U(t)) throw new TypeError;
                        return D(n) || (n = G(n)), R(e, t, n)
                    }

                    function y(e, t, n) {
                        if (!U(t)) throw new TypeError;
                        return D(n) || (n = G(n)), A(e, t, n)
                    }

                    function m(e, t, n) {
                        if (!U(t)) throw new TypeError;
                        return D(n) || (n = G(n)), P(e, t, n)
                    }

                    function E(e, t, n) {
                        if (!U(t)) throw new TypeError;
                        return D(n) || (n = G(n)), C(e, t, n)
                    }

                    function b(e, t) {
                        if (!U(e)) throw new TypeError;
                        return D(t) || (t = G(t)), k(e, t)
                    }

                    function T(e, t) {
                        if (!U(e)) throw new TypeError;
                        return D(t) || (t = G(t)), M(e, t)
                    }

                    function I(e, t, n) {
                        if (!U(t)) throw new TypeError;
                        D(n) || (n = G(n));
                        var r = N(t, n, !1);
                        if (D(r)) return !1;
                        if (!r.delete(e)) return !1;
                        if (r.size > 0) return !0;
                        var i = h.get(t);
                        return i.delete(n), i.size > 0 || h.delete(t), !0
                    }

                    function O(e, t) {
                        for (var n = e.length - 1; n >= 0; --n) {
                            var r = (0, e[n])(t);
                            if (!D(r) && !x(r)) {
                                if (!K(r)) throw new TypeError;
                                t = r
                            }
                        }
                        return t
                    }

                    function S(e, t, n, r) {
                        for (var i = e.length - 1; i >= 0; --i) {
                            var o = (0, e[i])(t, n, r);
                            if (!D(o) && !x(o)) {
                                if (!U(o)) throw new TypeError;
                                r = o
                            }
                        }
                        return r
                    }

                    function N(e, t, n) {
                        var r = h.get(e);
                        if (D(r)) {
                            if (!n) return;
                            r = new f, h.set(e, r)
                        }
                        var i = r.get(t);
                        if (D(i)) {
                            if (!n) return;
                            i = new f, r.set(t, i)
                        }
                        return i
                    }

                    function R(e, t, n) {
                        if (A(e, t, n)) return !0;
                        var r = $(t);
                        return !x(r) && R(e, r, n)
                    }

                    function A(e, t, n) {
                        var r = N(t, n, !1);
                        return !D(r) && H(r.has(e))
                    }

                    function P(e, t, n) {
                        if (A(e, t, n)) return C(e, t, n);
                        var r = $(t);
                        return x(r) ? void 0 : P(e, r, n)
                    }

                    function C(e, t, n) {
                        var r = N(t, n, !1);
                        if (!D(r)) return r.get(e)
                    }

                    function w(e, t, n, r) {
                        N(n, r, !0).set(e, t)
                    }

                    function k(e, t) {
                        var n = M(e, t),
                            r = $(e);
                        if (null === r) return n;
                        var i = k(r, t);
                        if (i.length <= 0) return n;
                        if (n.length <= 0) return i;
                        for (var o = new d, a = [], c = 0, s = n; c < s.length; c++) {
                            var u = s[c];
                            o.has(u) || (o.add(u), a.push(u))
                        }
                        for (var l = 0, f = i; l < f.length; l++) {
                            u = f[l];
                            o.has(u) || (o.add(u), a.push(u))
                        }
                        return a
                    }

                    function M(e, t) {
                        var n = [],
                            r = N(e, t, !1);
                        if (D(r)) return n;
                        for (var i = X(r.keys()), o = 0;;) {
                            var a = Q(i);
                            if (!a) return n.length = o, n;
                            var c = z(a);
                            try {
                                n[o] = c
                            } catch (e) {
                                try {
                                    Z(i)
                                } finally {
                                    throw e
                                }
                            }
                            o++
                        }
                    }

                    function L(e) {
                        if (null === e) return 1;
                        switch (typeof e) {
                            case "undefined":
                                return 0;
                            case "boolean":
                                return 2;
                            case "string":
                                return 3;
                            case "symbol":
                                return 4;
                            case "number":
                                return 5;
                            case "object":
                                return null === e ? 1 : 6;
                            default:
                                return 6
                        }
                    }

                    function D(e) {
                        return void 0 === e
                    }

                    function x(e) {
                        return null === e
                    }

                    function j(e) {
                        return "symbol" == typeof e
                    }

                    function U(e) {
                        return "object" == typeof e ? null !== e : "function" == typeof e
                    }

                    function B(e, t) {
                        switch (L(e)) {
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                                return e
                        }
                        var n = 3 === t ? "string" : 5 === t ? "number" : "default",
                            i = q(e, r);
                        if (void 0 !== i) {
                            var o = i.call(e, n);
                            if (U(o)) throw new TypeError;
                            return o
                        }
                        return F(e, "default" === n ? "number" : n)
                    }

                    function F(e, t) {
                        if ("string" === t) {
                            var n = e.toString;
                            if (W(n))
                                if (!U(i = n.call(e))) return i;
                            if (W(r = e.valueOf))
                                if (!U(i = r.call(e))) return i
                        } else {
                            var r;
                            if (W(r = e.valueOf))
                                if (!U(i = r.call(e))) return i;
                            var i, o = e.toString;
                            if (W(o))
                                if (!U(i = o.call(e))) return i
                        }
                        throw new TypeError
                    }

                    function H(e) {
                        return !!e
                    }

                    function V(e) {
                        return "" + e
                    }

                    function G(e) {
                        var t = B(e, 3);
                        return j(t) ? t : V(t)
                    }

                    function J(e) {
                        return Array.isArray ? Array.isArray(e) : e instanceof Object ? e instanceof Array : "[object Array]" === Object.prototype.toString.call(e)
                    }

                    function W(e) {
                        return "function" == typeof e
                    }

                    function K(e) {
                        return "function" == typeof e
                    }

                    function Y(e) {
                        switch (L(e)) {
                            case 3:
                            case 4:
                                return !0;
                            default:
                                return !1
                        }
                    }

                    function q(e, t) {
                        var n = e[t];
                        if (null != n) {
                            if (!W(n)) throw new TypeError;
                            return n
                        }
                    }

                    function X(e) {
                        var t = q(e, i);
                        if (!W(t)) throw new TypeError;
                        var n = t.call(e);
                        if (!U(n)) throw new TypeError;
                        return n
                    }

                    function z(e) {
                        return e.value
                    }

                    function Q(e) {
                        var t = e.next();
                        return !t.done && t
                    }

                    function Z(e) {
                        var t = e.return;
                        t && t.call(e)
                    }

                    function $(e) {
                        var t = Object.getPrototypeOf(e);
                        if ("function" != typeof e || e === u) return t;
                        if (t !== u) return t;
                        var n = e.prototype,
                            r = n && Object.getPrototypeOf(n);
                        if (null == r || r === Object.prototype) return t;
                        var i = r.constructor;
                        return "function" != typeof i || i === e ? t : i
                    }

                    function ee() {
                        var e = {},
                            t = [],
                            n = function() {
                                function e(e, t, n) {
                                    this._index = 0, this._keys = e, this._values = t, this._selector = n
                                }
                                return e.prototype["@@iterator"] = function() {
                                    return this
                                }, e.prototype[i] = function() {
                                    return this
                                }, e.prototype.next = function() {
                                    var e = this._index;
                                    if (e >= 0 && e < this._keys.length) {
                                        var n = this._selector(this._keys[e], this._values[e]);
                                        return e + 1 >= this._keys.length ? (this._index = -1, this._keys = t, this._values = t) : this._index++, {
                                            value: n,
                                            done: !1
                                        }
                                    }
                                    return {
                                        value: void 0,
                                        done: !0
                                    }
                                }, e.prototype.throw = function(e) {
                                    throw this._index >= 0 && (this._index = -1, this._keys = t, this._values = t), e
                                }, e.prototype.return = function(e) {
                                    return this._index >= 0 && (this._index = -1, this._keys = t, this._values = t), {
                                        value: e,
                                        done: !0
                                    }
                                }, e
                            }();
                        return function() {
                            function t() {
                                this._keys = [], this._values = [], this._cacheKey = e, this._cacheIndex = -2
                            }
                            return Object.defineProperty(t.prototype, "size", {
                                get: function() {
                                    return this._keys.length
                                },
                                enumerable: !0,
                                configurable: !0
                            }), t.prototype.has = function(e) {
                                return this._find(e, !1) >= 0
                            }, t.prototype.get = function(e) {
                                var t = this._find(e, !1);
                                return t >= 0 ? this._values[t] : void 0
                            }, t.prototype.set = function(e, t) {
                                var n = this._find(e, !0);
                                return this._values[n] = t, this
                            }, t.prototype.delete = function(t) {
                                var n = this._find(t, !1);
                                if (n >= 0) {
                                    for (var r = this._keys.length, i = n + 1; i < r; i++) this._keys[i - 1] = this._keys[i], this._values[i - 1] = this._values[i];
                                    return this._keys.length--, this._values.length--, t === this._cacheKey && (this._cacheKey = e, this._cacheIndex = -2), !0
                                }
                                return !1
                            }, t.prototype.clear = function() {
                                this._keys.length = 0, this._values.length = 0, this._cacheKey = e, this._cacheIndex = -2
                            }, t.prototype.keys = function() {
                                return new n(this._keys, this._values, r)
                            }, t.prototype.values = function() {
                                return new n(this._keys, this._values, o)
                            }, t.prototype.entries = function() {
                                return new n(this._keys, this._values, a)
                            }, t.prototype["@@iterator"] = function() {
                                return this.entries()
                            }, t.prototype[i] = function() {
                                return this.entries()
                            }, t.prototype._find = function(e, t) {
                                return this._cacheKey !== e && (this._cacheIndex = this._keys.indexOf(this._cacheKey = e)), this._cacheIndex < 0 && t && (this._cacheIndex = this._keys.length, this._keys.push(e), this._values.push(void 0)), this._cacheIndex
                            }, t
                        }();

                        function r(e, t) {
                            return e
                        }

                        function o(e, t) {
                            return t
                        }

                        function a(e, t) {
                            return [e, t]
                        }
                    }

                    function te() {
                        return function() {
                            function e() {
                                this._map = new f
                            }
                            return Object.defineProperty(e.prototype, "size", {
                                get: function() {
                                    return this._map.size
                                },
                                enumerable: !0,
                                configurable: !0
                            }), e.prototype.has = function(e) {
                                return this._map.has(e)
                            }, e.prototype.add = function(e) {
                                return this._map.set(e, e), this
                            }, e.prototype.delete = function(e) {
                                return this._map.delete(e)
                            }, e.prototype.clear = function() {
                                this._map.clear()
                            }, e.prototype.keys = function() {
                                return this._map.keys()
                            }, e.prototype.values = function() {
                                return this._map.values()
                            }, e.prototype.entries = function() {
                                return this._map.entries()
                            }, e.prototype["@@iterator"] = function() {
                                return this.keys()
                            }, e.prototype[i] = function() {
                                return this.keys()
                            }, e
                        }()
                    }

                    function ne() {
                        var e = 16,
                            n = s.create(),
                            r = i();
                        return function() {
                            function e() {
                                this._key = i()
                            }
                            return e.prototype.has = function(e) {
                                var t = o(e, !1);
                                return void 0 !== t && s.has(t, this._key)
                            }, e.prototype.get = function(e) {
                                var t = o(e, !1);
                                return void 0 !== t ? s.get(t, this._key) : void 0
                            }, e.prototype.set = function(e, t) {
                                return o(e, !0)[this._key] = t, this
                            }, e.prototype.delete = function(e) {
                                var t = o(e, !1);
                                return void 0 !== t && delete t[this._key]
                            }, e.prototype.clear = function() {
                                this._key = i()
                            }, e
                        }();

                        function i() {
                            var e;
                            do {
                                e = "@@WeakMap@@" + u()
                            } while (s.has(n, e));
                            return n[e] = !0, e
                        }

                        function o(e, n) {
                            if (!t.call(e, r)) {
                                if (!n) return;
                                Object.defineProperty(e, r, {
                                    value: s.create()
                                })
                            }
                            return e[r]
                        }

                        function a(e, t) {
                            for (var n = 0; n < t; ++n) e[n] = 255 * Math.random() | 0;
                            return e
                        }

                        function c(e) {
                            return "function" == typeof Uint8Array ? "undefined" != typeof crypto ? crypto.getRandomValues(new Uint8Array(e)) : "undefined" != typeof msCrypto ? msCrypto.getRandomValues(new Uint8Array(e)) : a(new Uint8Array(e), e) : a(new Array(e), e)
                        }

                        function u() {
                            var t = c(e);
                            t[6] = 79 & t[6] | 64, t[8] = 191 & t[8] | 128;
                            for (var n = "", r = 0; r < e; ++r) {
                                var i = t[r];
                                4 !== r && 6 !== r && 8 !== r || (n += "-"), i < 16 && (n += "0"), n += i.toString(16).toLowerCase()
                            }
                            return n
                        }
                    }

                    function re(e) {
                        return e.__ = void 0, delete e.__, e
                    }
                    e("decorate", p), e("metadata", v), e("ttq_defineMetadata", _), e("ttq_hasMetadata", g), e("ttq_hasOwnMetadata", y), e("ttq_getMetadata", m), e("getOwnMetadata", E), e("getMetadataKeys", b), e("getOwnMetadataKeys", T), e("deleteMetadata", I)
                }(r)
        }()
    }(S || (S = {}));
    var R, A = {},
        P = {};
    R = P, Object.defineProperty(R, "__esModule", {
        value: !0
    }), R.NON_CUSTOM_TAG_KEYS = R.POST_CONSTRUCT = R.DESIGN_PARAM_TYPES = R.PARAM_TYPES = R.TAGGED_PROP = R.TAGGED = R.MULTI_INJECT_TAG = R.INJECT_TAG = R.OPTIONAL_TAG = R.UNMANAGED_TAG = R.NAME_TAG = R.NAMED_TAG = void 0, R.NAMED_TAG = "named", R.NAME_TAG = "name", R.UNMANAGED_TAG = "unmanaged", R.OPTIONAL_TAG = "optional", R.INJECT_TAG = "inject", R.MULTI_INJECT_TAG = "multi_inject", R.TAGGED = "inversify:tagged", R.TAGGED_PROP = "inversify:tagged_props", R.PARAM_TYPES = "inversify:paramtypes", R.DESIGN_PARAM_TYPES = "design:paramtypes", R.POST_CONSTRUCT = "post_construct", R.NON_CUSTOM_TAG_KEYS = [R.INJECT_TAG, R.MULTI_INJECT_TAG, R.NAME_TAG, R.UNMANAGED_TAG, R.NAMED_TAG, R.OPTIONAL_TAG];
    var C = {},
        w = {},
        k = {};
    Object.defineProperty(k, "__esModule", {
        value: !0
    }), k.TargetTypeEnum = k.BindingTypeEnum = k.BindingScopeEnum = void 0;
    k.BindingScopeEnum = {
        Request: "Request",
        Singleton: "Singleton",
        Transient: "Transient"
    };
    k.BindingTypeEnum = {
        ConstantValue: "ConstantValue",
        Constructor: "Constructor",
        DynamicValue: "DynamicValue",
        Factory: "Factory",
        Function: "Function",
        Instance: "Instance",
        Invalid: "Invalid",
        Provider: "Provider"
    };
    k.TargetTypeEnum = {
        ClassProperty: "ClassProperty",
        ConstructorArgument: "ConstructorArgument",
        Variable: "Variable"
    };
    var M = {};
    Object.defineProperty(M, "__esModule", {
        value: !0
    }), M.id = void 0;
    var L = 0;
    M.id = function() {
        return L++
    }, Object.defineProperty(w, "__esModule", {
        value: !0
    }), w.Binding = void 0;
    var D = k,
        x = M,
        j = function() {
            function e(e, t) {
                this.id = x.id(), this.activated = !1, this.serviceIdentifier = e, this.scope = t, this.type = D.BindingTypeEnum.Invalid, this.constraint = function(e) {
                    return !0
                }, this.implementationType = null, this.cache = null, this.factory = null, this.provider = null, this.onActivation = null, this.dynamicValue = null
            }
            return e.prototype.clone = function() {
                var t = new e(this.serviceIdentifier, this.scope);
                return t.activated = t.scope === D.BindingScopeEnum.Singleton && this.activated, t.implementationType = this.implementationType, t.dynamicValue = this.dynamicValue, t.scope = this.scope, t.type = this.type, t.factory = this.factory, t.provider = this.provider, t.constraint = this.constraint, t.onActivation = this.onActivation, t.cache = this.cache, t
            }, e
        }();
    w.Binding = j;
    var U = {};
    Object.defineProperty(U, "__esModule", {
        value: !0
    }), U.STACK_OVERFLOW = U.CIRCULAR_DEPENDENCY_IN_FACTORY = U.POST_CONSTRUCT_ERROR = U.MULTIPLE_POST_CONSTRUCT_METHODS = U.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = U.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = U.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = U.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = U.ARGUMENTS_LENGTH_MISMATCH = U.INVALID_DECORATOR_OPERATION = U.INVALID_TO_SELF_VALUE = U.INVALID_FUNCTION_BINDING = U.INVALID_MIDDLEWARE_RETURN = U.NO_MORE_SNAPSHOTS_AVAILABLE = U.INVALID_BINDING_TYPE = U.NOT_IMPLEMENTED = U.CIRCULAR_DEPENDENCY = U.UNDEFINED_INJECT_ANNOTATION = U.MISSING_INJECT_ANNOTATION = U.MISSING_INJECTABLE_ANNOTATION = U.NOT_REGISTERED = U.CANNOT_UNBIND = U.AMBIGUOUS_MATCH = U.KEY_NOT_FOUND = U.NULL_ARGUMENT = U.DUPLICATED_METADATA = U.DUPLICATED_INJECTABLE_DECORATOR = void 0, U.DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.", U.DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:", U.NULL_ARGUMENT = "NULL argument", U.KEY_NOT_FOUND = "Key Not Found", U.AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:", U.CANNOT_UNBIND = "Could not unbind serviceIdentifier:", U.NOT_REGISTERED = "No matching bindings found for serviceIdentifier:", U.MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:", U.MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
    U.UNDEFINED_INJECT_ANNOTATION = function(e) {
        return "@inject called with undefined this could mean that the class " + e + " has a circular dependency problem. You can use a LazyServiceIdentifer to  overcome this limitation."
    }, U.CIRCULAR_DEPENDENCY = "Circular dependency found:", U.NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.", U.INVALID_BINDING_TYPE = "Invalid binding type:", U.NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.", U.INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Middleware must return!", U.INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!", U.INVALID_TO_SELF_VALUE = "The toSelf function can only be applied when a constructor is used as service identifier", U.INVALID_DECORATOR_OPERATION = "The @inject @multiInject @tagged and @named decorators must be applied to the parameters of a class constructor or a class property.";
    U.ARGUMENTS_LENGTH_MISMATCH = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return "The number of constructor arguments in the derived class " + e[0] + " must be >= than the number of constructor arguments of its base class."
    }, U.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = "Invalid Container constructor argument. Container options must be an object.", U.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = "Invalid Container option. Default scope must be a string ('singleton' or 'transient').", U.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = "Invalid Container option. Auto bind injectable must be a boolean", U.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = "Invalid Container option. Skip base check must be a boolean", U.MULTIPLE_POST_CONSTRUCT_METHODS = "Cannot apply @postConstruct decorator multiple times in the same class";
    U.POST_CONSTRUCT_ERROR = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return "@postConstruct error in class " + e[0] + ": " + e[1]
    };
    U.CIRCULAR_DEPENDENCY_IN_FACTORY = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return "It looks like there is a circular dependency in one of the '" + e[0] + "' bindings. Please investigate bindings withservice identifier '" + e[1] + "'."
    }, U.STACK_OVERFLOW = "Maximum call stack size exceeded";
    var B = {};
    Object.defineProperty(B, "__esModule", {
        value: !0
    }), B.MetadataReader = void 0;
    var F = P,
        H = function() {
            function e() {}
            return e.prototype.getConstructorMetadata = function(e) {
                return {
                    compilerGeneratedMetadata: Reflect.ttq_getMetadata(F.PARAM_TYPES, e),
                    userGeneratedMetadata: Reflect.ttq_getMetadata(F.TAGGED, e) || {}
                }
            }, e.prototype.getPropertiesMetadata = function(e) {
                return Reflect.ttq_getMetadata(F.TAGGED_PROP, e) || []
            }, e
        }();
    B.MetadataReader = H;
    var V = {},
        G = {};
    Object.defineProperty(G, "__esModule", {
        value: !0
    }), G.BindingCount = void 0;
    G.BindingCount = {
        MultipleBindingsAvailable: 2,
        NoBindingsAvailable: 0,
        OnlyOneBindingAvailable: 1
    };
    var J = {};
    Object.defineProperty(J, "__esModule", {
        value: !0
    }), J.isStackOverflowExeption = void 0;
    var W = U;
    J.isStackOverflowExeption = function(e) {
        return e instanceof RangeError || e.message === W.STACK_OVERFLOW
    };
    var K = {};
    Object.defineProperty(K, "__esModule", {
        value: !0
    }), K.circularDependencyToException = K.listMetadataForTarget = K.listRegisteredBindingsForServiceIdentifier = K.getServiceIdentifierAsString = K.getFunctionName = void 0;
    var Y = U;

    function q(e) {
        return "function" == typeof e ? e.name : "symbol" == typeof e ? e.toString() : e
    }

    function X(e, t) {
        return null !== e.parentRequest && (e.parentRequest.serviceIdentifier === t || X(e.parentRequest, t))
    }

    function z(e) {
        if (e.name) return e.name;
        var t = e.toString(),
            n = t.match(/^function\s*([^\s(]+)/);
        return n ? n[1] : "Anonymous function: " + t
    }
    K.getServiceIdentifierAsString = q, K.listRegisteredBindingsForServiceIdentifier = function(e, t, n) {
        var r = "",
            i = n(e, t);
        return 0 !== i.length && (r = "\nRegistered bindings:", i.forEach((function(e) {
            var t = "Object";
            null !== e.implementationType && (t = z(e.implementationType)), r = r + "\n " + t, e.constraint.metaData && (r = r + " - " + e.constraint.metaData)
        }))), r
    }, K.circularDependencyToException = function e(t) {
        t.childRequests.forEach((function(t) {
            if (X(t, t.serviceIdentifier)) {
                var n = function(e) {
                    return function e(t, n) {
                        void 0 === n && (n = []);
                        var r = q(t.serviceIdentifier);
                        return n.push(r), null !== t.parentRequest ? e(t.parentRequest, n) : n
                    }(e).reverse().join(" --\x3e ")
                }(t);
                throw new Error(Y.CIRCULAR_DEPENDENCY + " " + n)
            }
            e(t)
        }))
    }, K.listMetadataForTarget = function(e, t) {
        if (t.isTagged() || t.isNamed()) {
            var n = "",
                r = t.getNamedTag(),
                i = t.getCustomTags();
            return null !== r && (n += r.toString() + "\n"), null !== i && i.forEach((function(e) {
                n += e.toString() + "\n"
            })), " " + e + "\n " + e + " - " + n
        }
        return " " + e
    }, K.getFunctionName = z;
    var Q = {};
    Object.defineProperty(Q, "__esModule", {
        value: !0
    }), Q.Context = void 0;
    var Z = M,
        $ = function() {
            function e(e) {
                this.id = Z.id(), this.container = e
            }
            return e.prototype.addPlan = function(e) {
                this.plan = e
            }, e.prototype.setCurrentRequest = function(e) {
                this.currentRequest = e
            }, e
        }();
    Q.Context = $;
    var ee = {};
    Object.defineProperty(ee, "__esModule", {
        value: !0
    }), ee.Metadata = void 0;
    var te = P,
        ne = function() {
            function e(e, t) {
                this.key = e, this.value = t
            }
            return e.prototype.toString = function() {
                return this.key === te.NAMED_TAG ? "named: " + this.value.toString() + " " : "tagged: { key:" + this.key.toString() + ", value: " + this.value + " }"
            }, e
        }();
    ee.Metadata = ne;
    var re = {};
    Object.defineProperty(re, "__esModule", {
        value: !0
    }), re.Plan = void 0;
    var ie = function(e, t) {
        this.parentContext = e, this.rootRequest = t
    };
    re.Plan = ie;
    var oe = {},
        ae = {},
        ce = {};
    Object.defineProperty(ce, "__esModule", {
        value: !0
    }), ce.tagProperty = ce.tagParameter = ce.decorate = void 0;
    var se = U,
        ue = P;

    function le(e, t, n, r, i) {
        var o = {},
            a = "number" == typeof i,
            c = void 0 !== i && a ? i.toString() : n;
        if (a && void 0 !== n) throw new Error(se.INVALID_DECORATOR_OPERATION);
        Reflect.ttq_hasOwnMetadata(e, t) && (o = Reflect.ttq_getMetadata(e, t));
        var s = o[c];
        if (Array.isArray(s))
            for (var u = 0, l = s; u < l.length; u++) {
                var f = l[u];
                if (f.key === r.key) throw new Error(se.DUPLICATED_METADATA + " " + f.key.toString())
            } else s = [];
        s.push(r), o[c] = s, Reflect.ttq_defineMetadata(e, o, t)
    }

    function fe(e, t) {
        Reflect.decorate(e, t)
    }

    function de(e, t) {
        return function(n, r) {
            t(n, r, e)
        }
    }
    ce.tagParameter = function(e, t, n, r) {
        le(ue.TAGGED, e, t, r, n)
    }, ce.tagProperty = function(e, t, n) {
        le(ue.TAGGED_PROP, e.constructor, t, n)
    }, ce.decorate = function(e, t, n) {
        "number" == typeof n ? fe([de(n, e)], t) : "string" == typeof n ? Reflect.decorate([e], t, n) : fe([e], t)
    }, Object.defineProperty(ae, "__esModule", {
        value: !0
    }), ae.inject = ae.LazyServiceIdentifer = void 0;
    var he = U,
        pe = P,
        ve = ee,
        _e = ce,
        ge = function() {
            function e(e) {
                this._cb = e
            }
            return e.prototype.unwrap = function() {
                return this._cb()
            }, e
        }();
    ae.LazyServiceIdentifer = ge, ae.inject = function(e) {
        return function(t, n, r) {
            if (void 0 === e) throw new Error(he.UNDEFINED_INJECT_ANNOTATION(t.name));
            var i = new ve.Metadata(pe.INJECT_TAG, e);
            "number" == typeof r ? _e.tagParameter(t, n, r, i) : _e.tagProperty(t, n, i)
        }
    };
    var ye = {},
        me = {};
    Object.defineProperty(me, "__esModule", {
        value: !0
    }), me.QueryableString = void 0;
    var Ee = function() {
        function e(e) {
            this.str = e
        }
        return e.prototype.startsWith = function(e) {
            return 0 === this.str.indexOf(e)
        }, e.prototype.endsWith = function(e) {
            var t, n = e.split("").reverse().join("");
            return t = this.str.split("").reverse().join(""), this.startsWith.call({
                str: t
            }, n)
        }, e.prototype.contains = function(e) {
            return -1 !== this.str.indexOf(e)
        }, e.prototype.equals = function(e) {
            return this.str === e
        }, e.prototype.value = function() {
            return this.str
        }, e
    }();
    me.QueryableString = Ee, Object.defineProperty(ye, "__esModule", {
        value: !0
    }), ye.Target = void 0;
    var be = P,
        Te = M,
        Ie = ee,
        Oe = me,
        Se = function() {
            function e(e, t, n, r) {
                this.id = Te.id(), this.type = e, this.serviceIdentifier = n, this.name = new Oe.QueryableString(t || ""), this.metadata = new Array;
                var i = null;
                "string" == typeof r ? i = new Ie.Metadata(be.NAMED_TAG, r) : r instanceof Ie.Metadata && (i = r), null !== i && this.metadata.push(i)
            }
            return e.prototype.hasTag = function(e) {
                for (var t = 0, n = this.metadata; t < n.length; t++) {
                    if (n[t].key === e) return !0
                }
                return !1
            }, e.prototype.isArray = function() {
                return this.hasTag(be.MULTI_INJECT_TAG)
            }, e.prototype.matchesArray = function(e) {
                return this.matchesTag(be.MULTI_INJECT_TAG)(e)
            }, e.prototype.isNamed = function() {
                return this.hasTag(be.NAMED_TAG)
            }, e.prototype.isTagged = function() {
                return this.metadata.some((function(e) {
                    return be.NON_CUSTOM_TAG_KEYS.every((function(t) {
                        return e.key !== t
                    }))
                }))
            }, e.prototype.isOptional = function() {
                return this.matchesTag(be.OPTIONAL_TAG)(!0)
            }, e.prototype.getNamedTag = function() {
                return this.isNamed() ? this.metadata.filter((function(e) {
                    return e.key === be.NAMED_TAG
                }))[0] : null
            }, e.prototype.getCustomTags = function() {
                return this.isTagged() ? this.metadata.filter((function(e) {
                    return be.NON_CUSTOM_TAG_KEYS.every((function(t) {
                        return e.key !== t
                    }))
                })) : null
            }, e.prototype.matchesNamedTag = function(e) {
                return this.matchesTag(be.NAMED_TAG)(e)
            }, e.prototype.matchesTag = function(e) {
                var t = this;
                return function(n) {
                    for (var r = 0, i = t.metadata; r < i.length; r++) {
                        var o = i[r];
                        if (o.key === e && o.value === n) return !0
                    }
                    return !1
                }
            }, e
        }();
    ye.Target = Se,
        function(e) {
            var t = N && N.__spreadArray || function(e, t) {
                for (var n = 0, r = t.length, i = e.length; n < r; n++, i++) e[i] = t[n];
                return e
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.getFunctionName = e.getBaseClassDependencyCount = e.getDependencies = void 0;
            var n = ae,
                r = U,
                i = k,
                o = P,
                a = K;
            Object.defineProperty(e, "getFunctionName", {
                enumerable: !0,
                get: function() {
                    return a.getFunctionName
                }
            });
            var c = ye;

            function s(e, n, i, o) {
                var a = e.getConstructorMetadata(i),
                    c = a.compilerGeneratedMetadata;
                if (void 0 === c) {
                    var s = r.MISSING_INJECTABLE_ANNOTATION + " " + n + ".";
                    throw new Error(s)
                }
                var f = a.userGeneratedMetadata,
                    d = Object.keys(f),
                    h = 0 === i.length && d.length > 0,
                    p = d.length > i.length,
                    v = function(e, t, n, r, i) {
                        for (var o = [], a = 0; a < i; a++) {
                            var c = u(a, e, t, n, r);
                            null !== c && o.push(c)
                        }
                        return o
                    }(o, n, c, f, h || p ? d.length : i.length),
                    _ = l(e, i);
                return t(t([], v), _)
            }

            function u(e, t, o, a, s) {
                var u = s[e.toString()] || [],
                    l = f(u),
                    d = !0 !== l.unmanaged,
                    h = a[e],
                    p = l.inject || l.multiInject;
                if ((h = p || h) instanceof n.LazyServiceIdentifer && (h = h.unwrap()), d) {
                    if (!t && (h === Object || h === Function || void 0 === h)) {
                        var v = r.MISSING_INJECT_ANNOTATION + " argument " + e + " in class " + o + ".";
                        throw new Error(v)
                    }
                    var _ = new c.Target(i.TargetTypeEnum.ConstructorArgument, l.targetName, h);
                    return _.metadata = u, _
                }
                return null
            }

            function l(e, n) {
                for (var r = e.getPropertiesMetadata(n), o = [], a = 0, s = Object._ttq_keys(r); a < s.length; a++) {
                    var u = s[a],
                        d = r[u],
                        h = f(r[u]),
                        p = h.targetName || u,
                        v = h.inject || h.multiInject,
                        _ = new c.Target(i.TargetTypeEnum.ClassProperty, p, v);
                    _.metadata = d, o.push(_)
                }
                var g = Object.getPrototypeOf(n.prototype).constructor;
                if (g !== Object) {
                    var y = l(e, g);
                    o = t(t([], o), y)
                }
                return o
            }

            function f(e) {
                var t = {};
                return e.forEach((function(e) {
                    t[e.key.toString()] = e.value
                })), {
                    inject: t[o.INJECT_TAG],
                    multiInject: t[o.MULTI_INJECT_TAG],
                    targetName: t[o.NAME_TAG],
                    unmanaged: t[o.UNMANAGED_TAG]
                }
            }
            e.getDependencies = function(e, t) {
                return s(e, a.getFunctionName(t), t, !1)
            }, e.getBaseClassDependencyCount = function e(t, n) {
                var r = Object.getPrototypeOf(n.prototype).constructor;
                if (r !== Object) {
                    var i = s(t, a.getFunctionName(r), r, !0),
                        c = i.map((function(e) {
                            return e.metadata.filter((function(e) {
                                return e.key === o.UNMANAGED_TAG
                            }))
                        })),
                        u = [].concat.apply([], c).length,
                        l = i.length - u;
                    return l > 0 ? l : e(t, r)
                }
                return 0
            }
        }(oe);
    var Ne = {};
    Object.defineProperty(Ne, "__esModule", {
        value: !0
    }), Ne.Request = void 0;
    var Re = M,
        Ae = function() {
            function e(e, t, n, r, i) {
                this.id = Re.id(), this.serviceIdentifier = e, this.parentContext = t, this.parentRequest = n, this.target = i, this.childRequests = [], this.bindings = Array.isArray(r) ? r : [r], this.requestScope = null === n ? new window[window.TiktokAnalyticsObject || "ttq"]._ttq_map : null
            }
            return e.prototype.addChildRequest = function(t, n, r) {
                var i = new e(t, this.parentContext, this, n, r);
                return this.childRequests.push(i), i
            }, e
        }();
    Ne.Request = Ae, Object.defineProperty(V, "__esModule", {
        value: !0
    }), V.getBindingDictionary = V.createMockRequest = V.plan = void 0;
    var Pe = G,
        Ce = U,
        we = k,
        ke = P,
        Me = J,
        Le = K,
        De = Q,
        xe = ee,
        je = re,
        Ue = oe,
        Be = Ne,
        Fe = ye;

    function He(e) {
        return e._bindingDictionary
    }

    function Ve(e, t, n, r, i) {
        var o = Je(n.container, i.serviceIdentifier),
            a = [];
        return o.length === Pe.BindingCount.NoBindingsAvailable && n.container.options.autoBindInjectable && "function" == typeof i.serviceIdentifier && e.getConstructorMetadata(i.serviceIdentifier).compilerGeneratedMetadata && (n.container.bind(i.serviceIdentifier).toSelf(), o = Je(n.container, i.serviceIdentifier)), a = t ? o : o.filter((function(e) {
                var t = new Be.Request(e.serviceIdentifier, n, r, e, i);
                return e.constraint(t)
            })),
            function(e, t, n, r) {
                switch (t.length) {
                    case Pe.BindingCount.NoBindingsAvailable:
                        if (n.isOptional()) return t;
                        var i = Le.getServiceIdentifierAsString(e),
                            o = Ce.NOT_REGISTERED;
                        throw o += Le.listMetadataForTarget(i, n), o += Le.listRegisteredBindingsForServiceIdentifier(r, i, Je), new Error(o);
                    case Pe.BindingCount.OnlyOneBindingAvailable:
                        if (!n.isArray()) return t;
                    case Pe.BindingCount.MultipleBindingsAvailable:
                    default:
                        if (n.isArray()) return t;
                        i = Le.getServiceIdentifierAsString(e), o = Ce.AMBIGUOUS_MATCH + " " + i;
                        throw o += Le.listRegisteredBindingsForServiceIdentifier(r, i, Je), new Error(o)
                }
            }(i.serviceIdentifier, a, i, n.container), a
    }

    function Ge(e, t, n, r, i, o) {
        var a, c;
        if (null === i) {
            a = Ve(e, t, r, null, o), c = new Be.Request(n, r, null, a, o);
            var s = new je.Plan(r, c);
            r.addPlan(s)
        } else a = Ve(e, t, r, i, o), c = i.addChildRequest(o.serviceIdentifier, a, o);
        a.forEach((function(t) {
            var n = null;
            if (o.isArray()) n = c.addChildRequest(t.serviceIdentifier, t, o);
            else {
                if (t.cache) return;
                n = c
            }
            if (t.type === we.BindingTypeEnum.Instance && null !== t.implementationType) {
                var i = Ue.getDependencies(e, t.implementationType);
                if (!r.container.options.skipBaseClassChecks) {
                    var a = Ue.getBaseClassDependencyCount(e, t.implementationType);
                    if (i.length < a) {
                        var s = Ce.ARGUMENTS_LENGTH_MISMATCH(Ue.getFunctionName(t.implementationType));
                        throw new Error(s)
                    }
                }
                i.forEach((function(t) {
                    Ge(e, !1, t.serviceIdentifier, r, n, t)
                }))
            }
        }))
    }

    function Je(e, t) {
        var n = [],
            r = He(e);
        return r.hasKey(t) ? n = r.get(t) : null !== e.parent && (n = Je(e.parent, t)), n
    }
    V.getBindingDictionary = He, V.plan = function(e, t, n, r, i, o, a, c) {
        void 0 === c && (c = !1);
        var s = new De.Context(t),
            u = function(e, t, n, r, i, o) {
                var a = e ? ke.MULTI_INJECT_TAG : ke.INJECT_TAG,
                    c = new xe.Metadata(a, n),
                    s = new Fe.Target(t, r, n, c);
                if (void 0 !== i) {
                    var u = new xe.Metadata(i, o);
                    s.metadata.push(u)
                }
                return s
            }(n, r, i, "", o, a);
        try {
            return Ge(e, c, i, s, null, u), s
        } catch (e) {
            throw Me.isStackOverflowExeption(e) && s.plan && Le.circularDependencyToException(s.plan.rootRequest), e
        }
    }, V.createMockRequest = function(e, t, n, r) {
        var i = new Fe.Target(we.TargetTypeEnum.Variable, "", t, new xe.Metadata(n, r)),
            o = new De.Context(e);
        return new Be.Request(t, o, null, [], i)
    };
    var We = {},
        Ke = {},
        Ye = N && N.__spreadArray || function(e, t) {
            for (var n = 0, r = t.length, i = e.length; n < r; n++, i++) e[i] = t[n];
            return e
        };
    Object.defineProperty(Ke, "__esModule", {
        value: !0
    }), Ke.resolveInstance = void 0;
    var qe = U,
        Xe = k,
        ze = P;
    Ke.resolveInstance = function(e, t, n) {
        var r, i, o = null;
        if (t.length > 0) {
            var a = t.filter((function(e) {
                return null !== e.target && e.target.type === Xe.TargetTypeEnum.ConstructorArgument
            })).map(n);
            i = a, o = function(e, t, n) {
                var r = t.filter((function(e) {
                        return null !== e.target && e.target.type === Xe.TargetTypeEnum.ClassProperty
                    })),
                    i = r.map(n);
                return r.forEach((function(t, n) {
                    var r;
                    r = t.target.name.value();
                    var o = i[n];
                    e[r] = o
                })), e
            }(o = new((r = e)._ttq_bind.apply(r, Ye([void 0], i))), t, n)
        } else o = new e;
        return function(e, t) {
            if (Reflect.ttq_hasMetadata(ze.POST_CONSTRUCT, e)) {
                var n = Reflect.ttq_getMetadata(ze.POST_CONSTRUCT, e);
                try {
                    t[n.value]()
                } catch (t) {
                    throw new Error(qe.POST_CONSTRUCT_ERROR(e.name, t.message))
                }
            }
        }(e, o), o
    }, Object.defineProperty(We, "__esModule", {
        value: !0
    }), We.resolve = void 0;
    var Qe = U,
        Ze = k,
        $e = J,
        et = K,
        tt = Ke,
        nt = function(e, t, n) {
            try {
                return n()
            } catch (n) {
                throw $e.isStackOverflowExeption(n) ? new Error(Qe.CIRCULAR_DEPENDENCY_IN_FACTORY(e, t.toString())) : n
            }
        },
        rt = function(e) {
            return function(t) {
                t.parentContext.setCurrentRequest(t);
                var n = t.bindings,
                    r = t.childRequests,
                    i = t.target && t.target.isArray(),
                    o = !(t.parentRequest && t.parentRequest.target && t.target && t.parentRequest.target.matchesArray(t.target.serviceIdentifier));
                if (i && o) return r.map((function(t) {
                    return rt(e)(t)
                }));
                var a = null;
                if (!t.target.isOptional() || 0 !== n.length) {
                    var c = n[0],
                        s = c.scope === Ze.BindingScopeEnum.Singleton,
                        u = c.scope === Ze.BindingScopeEnum.Request;
                    if (s && c.activated) return c.cache;
                    if (u && null !== e && e.has(c.id)) return e.get(c.id);
                    if (c.type === Ze.BindingTypeEnum.ConstantValue) a = c.cache, c.activated = !0;
                    else if (c.type === Ze.BindingTypeEnum.Function) a = c.cache, c.activated = !0;
                    else if (c.type === Ze.BindingTypeEnum.Constructor) a = c.implementationType;
                    else if (c.type === Ze.BindingTypeEnum.DynamicValue && null !== c.dynamicValue) a = nt("toDynamicValue", c.serviceIdentifier, (function() {
                        return c.dynamicValue(t.parentContext)
                    }));
                    else if (c.type === Ze.BindingTypeEnum.Factory && null !== c.factory) a = nt("toFactory", c.serviceIdentifier, (function() {
                        return c.factory(t.parentContext)
                    }));
                    else if (c.type === Ze.BindingTypeEnum.Provider && null !== c.provider) a = nt("toProvider", c.serviceIdentifier, (function() {
                        return c.provider(t.parentContext)
                    }));
                    else {
                        if (c.type !== Ze.BindingTypeEnum.Instance || null === c.implementationType) {
                            var l = et.getServiceIdentifierAsString(t.serviceIdentifier);
                            throw new Error(Qe.INVALID_BINDING_TYPE + " " + l)
                        }
                        a = tt.resolveInstance(c.implementationType, r, rt(e))
                    }
                    return "function" == typeof c.onActivation && (a = c.onActivation(t.parentContext, a)), s && (c.cache = a, c.activated = !0), u && null !== e && !e.has(c.id) && e.set(c.id, a), a
                }
            }
        };
    We.resolve = function(e) {
        return rt(e.plan.rootRequest.requestScope)(e.plan.rootRequest)
    };
    var it = {},
        ot = {},
        at = {},
        ct = {},
        st = {},
        ut = {},
        lt = {};
    Object.defineProperty(lt, "__esModule", {
        value: !0
    }), lt.typeConstraint = lt.namedConstraint = lt.taggedConstraint = lt.traverseAncerstors = void 0;
    var ft = P,
        dt = ee,
        ht = function(e, t) {
            var n = e.parentRequest;
            return null !== n && (!!t(n) || ht(n, t))
        };
    lt.traverseAncerstors = ht;
    var pt = function(e) {
        return function(t) {
            var n = function(n) {
                return null !== n && null !== n.target && n.target.matchesTag(e)(t)
            };
            return n.metaData = new dt.Metadata(e, t), n
        }
    };
    lt.taggedConstraint = pt;
    var vt = pt(ft.NAMED_TAG);
    lt.namedConstraint = vt;
    lt.typeConstraint = function(e) {
        return function(t) {
            var n = null;
            if (null !== t) {
                if (n = t.bindings[0], "string" == typeof e) return n.serviceIdentifier === e;
                var r = t.bindings[0].implementationType;
                return e === r
            }
            return !1
        }
    }, Object.defineProperty(ut, "__esModule", {
        value: !0
    }), ut.BindingWhenSyntax = void 0;
    var _t = st,
        gt = lt,
        yt = function() {
            function e(e) {
                this._binding = e
            }
            return e.prototype.when = function(e) {
                return this._binding.constraint = e, new _t.BindingOnSyntax(this._binding)
            }, e.prototype.whenTargetNamed = function(e) {
                return this._binding.constraint = gt.namedConstraint(e), new _t.BindingOnSyntax(this._binding)
            }, e.prototype.whenTargetIsDefault = function() {
                return this._binding.constraint = function(e) {
                    return null !== e.target && !e.target.isNamed() && !e.target.isTagged()
                }, new _t.BindingOnSyntax(this._binding)
            }, e.prototype.whenTargetTagged = function(e, t) {
                return this._binding.constraint = gt.taggedConstraint(e)(t), new _t.BindingOnSyntax(this._binding)
            }, e.prototype.whenInjectedInto = function(e) {
                return this._binding.constraint = function(t) {
                    return gt.typeConstraint(e)(t.parentRequest)
                }, new _t.BindingOnSyntax(this._binding)
            }, e.prototype.whenParentNamed = function(e) {
                return this._binding.constraint = function(t) {
                    return gt.namedConstraint(e)(t.parentRequest)
                }, new _t.BindingOnSyntax(this._binding)
            }, e.prototype.whenParentTagged = function(e, t) {
                return this._binding.constraint = function(n) {
                    return gt.taggedConstraint(e)(t)(n.parentRequest)
                }, new _t.BindingOnSyntax(this._binding)
            }, e.prototype.whenAnyAncestorIs = function(e) {
                return this._binding.constraint = function(t) {
                    return gt.traverseAncerstors(t, gt.typeConstraint(e))
                }, new _t.BindingOnSyntax(this._binding)
            }, e.prototype.whenNoAncestorIs = function(e) {
                return this._binding.constraint = function(t) {
                    return !gt.traverseAncerstors(t, gt.typeConstraint(e))
                }, new _t.BindingOnSyntax(this._binding)
            }, e.prototype.whenAnyAncestorNamed = function(e) {
                return this._binding.constraint = function(t) {
                    return gt.traverseAncerstors(t, gt.namedConstraint(e))
                }, new _t.BindingOnSyntax(this._binding)
            }, e.prototype.whenNoAncestorNamed = function(e) {
                return this._binding.constraint = function(t) {
                    return !gt.traverseAncerstors(t, gt.namedConstraint(e))
                }, new _t.BindingOnSyntax(this._binding)
            }, e.prototype.whenAnyAncestorTagged = function(e, t) {
                return this._binding.constraint = function(n) {
                    return gt.traverseAncerstors(n, gt.taggedConstraint(e)(t))
                }, new _t.BindingOnSyntax(this._binding)
            }, e.prototype.whenNoAncestorTagged = function(e, t) {
                return this._binding.constraint = function(n) {
                    return !gt.traverseAncerstors(n, gt.taggedConstraint(e)(t))
                }, new _t.BindingOnSyntax(this._binding)
            }, e.prototype.whenAnyAncestorMatches = function(e) {
                return this._binding.constraint = function(t) {
                    return gt.traverseAncerstors(t, e)
                }, new _t.BindingOnSyntax(this._binding)
            }, e.prototype.whenNoAncestorMatches = function(e) {
                return this._binding.constraint = function(t) {
                    return !gt.traverseAncerstors(t, e)
                }, new _t.BindingOnSyntax(this._binding)
            }, e
        }();
    ut.BindingWhenSyntax = yt, Object.defineProperty(st, "__esModule", {
        value: !0
    }), st.BindingOnSyntax = void 0;
    var mt = ut,
        Et = function() {
            function e(e) {
                this._binding = e
            }
            return e.prototype.onActivation = function(e) {
                return this._binding.onActivation = e, new mt.BindingWhenSyntax(this._binding)
            }, e
        }();
    st.BindingOnSyntax = Et, Object.defineProperty(ct, "__esModule", {
        value: !0
    }), ct.BindingWhenOnSyntax = void 0;
    var bt = st,
        Tt = ut,
        It = function() {
            function e(e) {
                this._binding = e, this._bindingWhenSyntax = new Tt.BindingWhenSyntax(this._binding), this._bindingOnSyntax = new bt.BindingOnSyntax(this._binding)
            }
            return e.prototype.when = function(e) {
                return this._bindingWhenSyntax.when(e)
            }, e.prototype.whenTargetNamed = function(e) {
                return this._bindingWhenSyntax.whenTargetNamed(e)
            }, e.prototype.whenTargetIsDefault = function() {
                return this._bindingWhenSyntax.whenTargetIsDefault()
            }, e.prototype.whenTargetTagged = function(e, t) {
                return this._bindingWhenSyntax.whenTargetTagged(e, t)
            }, e.prototype.whenInjectedInto = function(e) {
                return this._bindingWhenSyntax.whenInjectedInto(e)
            }, e.prototype.whenParentNamed = function(e) {
                return this._bindingWhenSyntax.whenParentNamed(e)
            }, e.prototype.whenParentTagged = function(e, t) {
                return this._bindingWhenSyntax.whenParentTagged(e, t)
            }, e.prototype.whenAnyAncestorIs = function(e) {
                return this._bindingWhenSyntax.whenAnyAncestorIs(e)
            }, e.prototype.whenNoAncestorIs = function(e) {
                return this._bindingWhenSyntax.whenNoAncestorIs(e)
            }, e.prototype.whenAnyAncestorNamed = function(e) {
                return this._bindingWhenSyntax.whenAnyAncestorNamed(e)
            }, e.prototype.whenAnyAncestorTagged = function(e, t) {
                return this._bindingWhenSyntax.whenAnyAncestorTagged(e, t)
            }, e.prototype.whenNoAncestorNamed = function(e) {
                return this._bindingWhenSyntax.whenNoAncestorNamed(e)
            }, e.prototype.whenNoAncestorTagged = function(e, t) {
                return this._bindingWhenSyntax.whenNoAncestorTagged(e, t)
            }, e.prototype.whenAnyAncestorMatches = function(e) {
                return this._bindingWhenSyntax.whenAnyAncestorMatches(e)
            }, e.prototype.whenNoAncestorMatches = function(e) {
                return this._bindingWhenSyntax.whenNoAncestorMatches(e)
            }, e.prototype.onActivation = function(e) {
                return this._bindingOnSyntax.onActivation(e)
            }, e
        }();
    ct.BindingWhenOnSyntax = It, Object.defineProperty(at, "__esModule", {
        value: !0
    }), at.BindingInSyntax = void 0;
    var Ot = k,
        St = ct,
        Nt = function() {
            function e(e) {
                this._binding = e
            }
            return e.prototype.inRequestScope = function() {
                return this._binding.scope = Ot.BindingScopeEnum.Request, new St.BindingWhenOnSyntax(this._binding)
            }, e.prototype.inSingletonScope = function() {
                return this._binding.scope = Ot.BindingScopeEnum.Singleton, new St.BindingWhenOnSyntax(this._binding)
            }, e.prototype.inTransientScope = function() {
                return this._binding.scope = Ot.BindingScopeEnum.Transient, new St.BindingWhenOnSyntax(this._binding)
            }, e
        }();
    at.BindingInSyntax = Nt, Object.defineProperty(ot, "__esModule", {
        value: !0
    }), ot.BindingInWhenOnSyntax = void 0;
    var Rt = at,
        At = st,
        Pt = ut,
        Ct = function() {
            function e(e) {
                this._binding = e, this._bindingWhenSyntax = new Pt.BindingWhenSyntax(this._binding), this._bindingOnSyntax = new At.BindingOnSyntax(this._binding), this._bindingInSyntax = new Rt.BindingInSyntax(e)
            }
            return e.prototype.inRequestScope = function() {
                return this._bindingInSyntax.inRequestScope()
            }, e.prototype.inSingletonScope = function() {
                return this._bindingInSyntax.inSingletonScope()
            }, e.prototype.inTransientScope = function() {
                return this._bindingInSyntax.inTransientScope()
            }, e.prototype.when = function(e) {
                return this._bindingWhenSyntax.when(e)
            }, e.prototype.whenTargetNamed = function(e) {
                return this._bindingWhenSyntax.whenTargetNamed(e)
            }, e.prototype.whenTargetIsDefault = function() {
                return this._bindingWhenSyntax.whenTargetIsDefault()
            }, e.prototype.whenTargetTagged = function(e, t) {
                return this._bindingWhenSyntax.whenTargetTagged(e, t)
            }, e.prototype.whenInjectedInto = function(e) {
                return this._bindingWhenSyntax.whenInjectedInto(e)
            }, e.prototype.whenParentNamed = function(e) {
                return this._bindingWhenSyntax.whenParentNamed(e)
            }, e.prototype.whenParentTagged = function(e, t) {
                return this._bindingWhenSyntax.whenParentTagged(e, t)
            }, e.prototype.whenAnyAncestorIs = function(e) {
                return this._bindingWhenSyntax.whenAnyAncestorIs(e)
            }, e.prototype.whenNoAncestorIs = function(e) {
                return this._bindingWhenSyntax.whenNoAncestorIs(e)
            }, e.prototype.whenAnyAncestorNamed = function(e) {
                return this._bindingWhenSyntax.whenAnyAncestorNamed(e)
            }, e.prototype.whenAnyAncestorTagged = function(e, t) {
                return this._bindingWhenSyntax.whenAnyAncestorTagged(e, t)
            }, e.prototype.whenNoAncestorNamed = function(e) {
                return this._bindingWhenSyntax.whenNoAncestorNamed(e)
            }, e.prototype.whenNoAncestorTagged = function(e, t) {
                return this._bindingWhenSyntax.whenNoAncestorTagged(e, t)
            }, e.prototype.whenAnyAncestorMatches = function(e) {
                return this._bindingWhenSyntax.whenAnyAncestorMatches(e)
            }, e.prototype.whenNoAncestorMatches = function(e) {
                return this._bindingWhenSyntax.whenNoAncestorMatches(e)
            }, e.prototype.onActivation = function(e) {
                return this._bindingOnSyntax.onActivation(e)
            }, e
        }();
    ot.BindingInWhenOnSyntax = Ct, Object.defineProperty(it, "__esModule", {
        value: !0
    }), it.BindingToSyntax = void 0;
    var wt = U,
        kt = k,
        Mt = ot,
        Lt = ct,
        Dt = function() {
            function e(e) {
                this._binding = e
            }
            return e.prototype.to = function(e) {
                return this._binding.type = kt.BindingTypeEnum.Instance, this._binding.implementationType = e, new Mt.BindingInWhenOnSyntax(this._binding)
            }, e.prototype.toSelf = function() {
                if ("function" != typeof this._binding.serviceIdentifier) throw new Error("" + wt.INVALID_TO_SELF_VALUE);
                var e = this._binding.serviceIdentifier;
                return this.to(e)
            }, e.prototype.toConstantValue = function(e) {
                return this._binding.type = kt.BindingTypeEnum.ConstantValue, this._binding.cache = e, this._binding.dynamicValue = null, this._binding.implementationType = null, this._binding.scope = kt.BindingScopeEnum.Singleton, new Lt.BindingWhenOnSyntax(this._binding)
            }, e.prototype.toDynamicValue = function(e) {
                return this._binding.type = kt.BindingTypeEnum.DynamicValue, this._binding.cache = null, this._binding.dynamicValue = e, this._binding.implementationType = null, new Mt.BindingInWhenOnSyntax(this._binding)
            }, e.prototype.toConstructor = function(e) {
                return this._binding.type = kt.BindingTypeEnum.Constructor, this._binding.implementationType = e, this._binding.scope = kt.BindingScopeEnum.Singleton, new Lt.BindingWhenOnSyntax(this._binding)
            }, e.prototype.toFactory = function(e) {
                return this._binding.type = kt.BindingTypeEnum.Factory, this._binding.factory = e, this._binding.scope = kt.BindingScopeEnum.Singleton, new Lt.BindingWhenOnSyntax(this._binding)
            }, e.prototype.toFunction = function(e) {
                if ("function" != typeof e) throw new Error(wt.INVALID_FUNCTION_BINDING);
                var t = this.toConstantValue(e);
                return this._binding.type = kt.BindingTypeEnum.Function, this._binding.scope = kt.BindingScopeEnum.Singleton, t
            }, e.prototype.toAutoFactory = function(e) {
                return this._binding.type = kt.BindingTypeEnum.Factory, this._binding.factory = function(t) {
                    return function() {
                        return t.container.get(e)
                    }
                }, this._binding.scope = kt.BindingScopeEnum.Singleton, new Lt.BindingWhenOnSyntax(this._binding)
            }, e.prototype.toProvider = function(e) {
                return this._binding.type = kt.BindingTypeEnum.Provider, this._binding.provider = e, this._binding.scope = kt.BindingScopeEnum.Singleton, new Lt.BindingWhenOnSyntax(this._binding)
            }, e.prototype.toService = function(e) {
                this.toDynamicValue((function(t) {
                    return t.container.get(e)
                }))
            }, e
        }();
    it.BindingToSyntax = Dt;
    var xt = {};
    Object.defineProperty(xt, "__esModule", {
        value: !0
    }), xt.ContainerSnapshot = void 0;
    var jt = function() {
        function e() {}
        return e.of = function(t, n) {
            var r = new e;
            return r.bindings = t, r.middleware = n, r
        }, e
    }();
    xt.ContainerSnapshot = jt;
    var Ut = {};
    Object.defineProperty(Ut, "__esModule", {
        value: !0
    }), Ut.Lookup = void 0;
    var Bt = U,
        Ft = function() {
            function e() {
                this._map = new window[window.TiktokAnalyticsObject || "ttq"]._ttq_map
            }
            return e.prototype.getMap = function() {
                return this._map
            }, e.prototype.add = function(e, t) {
                if (null == e) throw new Error(Bt.NULL_ARGUMENT);
                if (null == t) throw new Error(Bt.NULL_ARGUMENT);
                var n = this._map.get(e);
                void 0 !== n ? (n.push(t), this._map.set(e, n)) : this._map.set(e, [t])
            }, e.prototype.get = function(e) {
                if (null == e) throw new Error(Bt.NULL_ARGUMENT);
                var t = this._map.get(e);
                if (void 0 !== t) return t;
                throw new Error(Bt.KEY_NOT_FOUND)
            }, e.prototype.remove = function(e) {
                if (null == e) throw new Error(Bt.NULL_ARGUMENT);
                if (!this._map.delete(e)) throw new Error(Bt.KEY_NOT_FOUND)
            }, e.prototype.removeByCondition = function(e) {
                var t = this;
                this._map.forEach((function(n, r) {
                    var i = n.filter((function(t) {
                        return !e(t)
                    }));
                    i.length > 0 ? t._map.set(r, i) : t._map.delete(r)
                }))
            }, e.prototype.hasKey = function(e) {
                if (null == e) throw new Error(Bt.NULL_ARGUMENT);
                return this._map.has(e)
            }, e.prototype.clone = function() {
                var t = new e;
                return this._map.forEach((function(e, n) {
                    e.forEach((function(e) {
                        return t.add(n, e.clone())
                    }))
                })), t
            }, e.prototype.traverse = function(e) {
                this._map.forEach((function(t, n) {
                    e(n, t)
                }))
            }, e
        }();
    Ut.Lookup = Ft;
    var Ht = N && N.__awaiter || function(e, t, n, r) {
            return new(n || (n = Promise))((function(i, o) {
                function a(e) {
                    try {
                        s(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    try {
                        s(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function s(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                        e(t)
                    }))).then(a, c)
                }
                s((r = r.apply(e, t || [])).next())
            }))
        },
        Vt = N && N.__generator || function(e, t) {
            var n, r, i, o, a = {
                label: 0,
                sent: function() {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: c(0),
                throw: c(1),
                return: c(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }), o;

            function c(o) {
                return function(c) {
                    return function(o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; a;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return a.label++, {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    a.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = a.ops.pop(), a.trys.pop();
                                    continue;
                                default:
                                    if (!(i = a.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        a = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        a.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && a.label < i[1]) {
                                        a.label = i[1], i = o;
                                        break
                                    }
                                    if (i && a.label < i[2]) {
                                        a.label = i[2], a.ops.push(o);
                                        break
                                    }
                                    i[2] && a.ops.pop(), a.trys.pop();
                                    continue
                            }
                            o = t.call(e, a)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, c])
                }
            }
        },
        Gt = N && N.__spreadArray || function(e, t) {
            for (var n = 0, r = t.length, i = e.length; n < r; n++, i++) e[i] = t[n];
            return e
        };
    Object.defineProperty(C, "__esModule", {
        value: !0
    }), C.Container = void 0;
    var Jt = w,
        Wt = U,
        Kt = k,
        Yt = P,
        qt = B,
        Xt = V,
        zt = We,
        Qt = it,
        Zt = M,
        $t = K,
        en = xt,
        tn = Ut,
        nn = function() {
            function e(e) {
                this._appliedMiddleware = [];
                var t = e || {};
                if ("object" != typeof t) throw new Error("" + Wt.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT);
                if (void 0 === t.defaultScope) t.defaultScope = Kt.BindingScopeEnum.Transient;
                else if (t.defaultScope !== Kt.BindingScopeEnum.Singleton && t.defaultScope !== Kt.BindingScopeEnum.Transient && t.defaultScope !== Kt.BindingScopeEnum.Request) throw new Error("" + Wt.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE);
                if (void 0 === t.autoBindInjectable) t.autoBindInjectable = !1;
                else if ("boolean" != typeof t.autoBindInjectable) throw new Error("" + Wt.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE);
                if (void 0 === t.skipBaseClassChecks) t.skipBaseClassChecks = !1;
                else if ("boolean" != typeof t.skipBaseClassChecks) throw new Error("" + Wt.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK);
                this.options = {
                    autoBindInjectable: t.autoBindInjectable,
                    defaultScope: t.defaultScope,
                    skipBaseClassChecks: t.skipBaseClassChecks
                }, this.id = Zt.id(), this._bindingDictionary = new tn.Lookup, this._snapshots = [], this._middleware = null, this.parent = null, this._metadataReader = new qt.MetadataReader
            }
            return e.merge = function(t, n) {
                for (var r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
                var o = new e,
                    a = Gt([t, n], r).map((function(e) {
                        return Xt.getBindingDictionary(e)
                    })),
                    c = Xt.getBindingDictionary(o);

                function s(e, t) {
                    e.traverse((function(e, n) {
                        n.forEach((function(e) {
                            t.add(e.serviceIdentifier, e.clone())
                        }))
                    }))
                }
                return a.forEach((function(e) {
                    s(e, c)
                })), o
            }, e.prototype.load = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                for (var n = this._getContainerModuleHelpersFactory(), r = 0, i = e; r < i.length; r++) {
                    var o = i[r],
                        a = n(o.id);
                    o.registry(a.bindFunction, a.unbindFunction, a.isboundFunction, a.rebindFunction)
                }
            }, e.prototype.loadAsync = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return Ht(this, void 0, void 0, (function() {
                    var t, n, r, i, o;
                    return Vt(this, (function(a) {
                        switch (a.label) {
                            case 0:
                                t = this._getContainerModuleHelpersFactory(), n = 0, r = e, a.label = 1;
                            case 1:
                                return n < r.length ? (i = r[n], o = t(i.id), [4, i.registry(o.bindFunction, o.unbindFunction, o.isboundFunction, o.rebindFunction)]) : [3, 4];
                            case 2:
                                a.sent(), a.label = 3;
                            case 3:
                                return n++, [3, 1];
                            case 4:
                                return [2]
                        }
                    }))
                }))
            }, e.prototype.unload = function() {
                for (var e = this, t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                var r = function(e) {
                    return function(t) {
                        return t.moduleId === e
                    }
                };
                t.forEach((function(t) {
                    var n = r(t.id);
                    e._bindingDictionary.removeByCondition(n)
                }))
            }, e.prototype.bind = function(e) {
                var t = this.options.defaultScope || Kt.BindingScopeEnum.Transient,
                    n = new Jt.Binding(e, t);
                return this._bindingDictionary.add(e, n), new Qt.BindingToSyntax(n)
            }, e.prototype.rebind = function(e) {
                return this.unbind(e), this.bind(e)
            }, e.prototype.unbind = function(e) {
                try {
                    this._bindingDictionary.remove(e)
                } catch (t) {
                    throw new Error(Wt.CANNOT_UNBIND + " " + $t.getServiceIdentifierAsString(e))
                }
            }, e.prototype.unbindAll = function() {
                this._bindingDictionary = new tn.Lookup
            }, e.prototype.isBound = function(e) {
                var t = this._bindingDictionary.hasKey(e);
                return !t && this.parent && (t = this.parent.isBound(e)), t
            }, e.prototype.isBoundNamed = function(e, t) {
                return this.isBoundTagged(e, Yt.NAMED_TAG, t)
            }, e.prototype.isBoundTagged = function(e, t, n) {
                var r = !1;
                if (this._bindingDictionary.hasKey(e)) {
                    var i = this._bindingDictionary.get(e),
                        o = Xt.createMockRequest(this, e, t, n);
                    r = i.some((function(e) {
                        return e.constraint(o)
                    }))
                }
                return !r && this.parent && (r = this.parent.isBoundTagged(e, t, n)), r
            }, e.prototype.snapshot = function() {
                this._snapshots.push(en.ContainerSnapshot.of(this._bindingDictionary.clone(), this._middleware))
            }, e.prototype.restore = function() {
                var e = this._snapshots.pop();
                if (void 0 === e) throw new Error(Wt.NO_MORE_SNAPSHOTS_AVAILABLE);
                this._bindingDictionary = e.bindings, this._middleware = e.middleware
            }, e.prototype.createChild = function(t) {
                var n = new e(t || this.options);
                return n.parent = this, n
            }, e.prototype.applyMiddleware = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this._appliedMiddleware = this._appliedMiddleware.concat(e);
                var n = this._middleware ? this._middleware : this._planAndResolve();
                this._middleware = e.reduce((function(e, t) {
                    return t(e)
                }), n)
            }, e.prototype.applyCustomMetadataReader = function(e) {
                this._metadataReader = e
            }, e.prototype.get = function(e) {
                return this._get(!1, !1, Kt.TargetTypeEnum.Variable, e)
            }, e.prototype.getTagged = function(e, t, n) {
                return this._get(!1, !1, Kt.TargetTypeEnum.Variable, e, t, n)
            }, e.prototype.getNamed = function(e, t) {
                return this.getTagged(e, Yt.NAMED_TAG, t)
            }, e.prototype.getAll = function(e) {
                return this._get(!0, !0, Kt.TargetTypeEnum.Variable, e)
            }, e.prototype.getAllTagged = function(e, t, n) {
                return this._get(!1, !0, Kt.TargetTypeEnum.Variable, e, t, n)
            }, e.prototype.getAllNamed = function(e, t) {
                return this.getAllTagged(e, Yt.NAMED_TAG, t)
            }, e.prototype.resolve = function(e) {
                var t = this.createChild();
                return t.bind(e).toSelf(), this._appliedMiddleware.forEach((function(e) {
                    t.applyMiddleware(e)
                })), t.get(e)
            }, e.prototype._getContainerModuleHelpersFactory = function() {
                var e = this,
                    t = function(e, t) {
                        e._binding.moduleId = t
                    },
                    n = function(n) {
                        return function(r) {
                            var i = e.rebind.bind(e)(r);
                            return t(i, n), i
                        }
                    };
                return function(r) {
                    return {
                        bindFunction: (i = r, function(n) {
                            var r = e.bind.bind(e)(n);
                            return t(r, i), r
                        }),
                        isboundFunction: function(t) {
                            return e.isBound.bind(e)(t)
                        },
                        rebindFunction: n(r),
                        unbindFunction: function(t) {
                            e.unbind.bind(e)(t)
                        }
                    };
                    var i
                }
            }, e.prototype._get = function(e, t, n, r, i, o) {
                var a = null,
                    c = {
                        avoidConstraints: e,
                        contextInterceptor: function(e) {
                            return e
                        },
                        isMultiInject: t,
                        key: i,
                        serviceIdentifier: r,
                        targetType: n,
                        value: o
                    };
                if (this._middleware) {
                    if (null == (a = this._middleware(c))) throw new Error(Wt.INVALID_MIDDLEWARE_RETURN)
                } else a = this._planAndResolve()(c);
                return a
            }, e.prototype._planAndResolve = function() {
                var e = this;
                return function(t) {
                    var n = Xt.plan(e._metadataReader, e, t.isMultiInject, t.targetType, t.serviceIdentifier, t.key, t.value, t.avoidConstraints);
                    return n = t.contextInterceptor(n), zt.resolve(n)
                }
            }, e
        }();
    C.Container = nn;
    var rn = {};
    Object.defineProperty(rn, "__esModule", {
        value: !0
    }), rn.AsyncContainerModule = rn.ContainerModule = void 0;
    var on = M,
        an = function(e) {
            this.id = on.id(), this.registry = e
        };
    rn.ContainerModule = an;
    var cn = function(e) {
        this.id = on.id(), this.registry = e
    };
    rn.AsyncContainerModule = cn;
    var sn = {};
    Object.defineProperty(sn, "__esModule", {
        value: !0
    }), sn.injectable = void 0;
    var un = U,
        ln = P;
    sn.injectable = function() {
        return function(e) {
            if (Reflect.ttq_hasOwnMetadata(ln.PARAM_TYPES, e)) throw new Error(un.DUPLICATED_INJECTABLE_DECORATOR);
            var t = Reflect.ttq_getMetadata(ln.DESIGN_PARAM_TYPES, e) || [];
            return Reflect.ttq_defineMetadata(ln.PARAM_TYPES, t, e), e
        }
    };
    var fn = {};
    Object.defineProperty(fn, "__esModule", {
        value: !0
    }), fn.tagged = void 0;
    var dn = ee,
        hn = ce;
    fn.tagged = function(e, t) {
        return function(n, r, i) {
            var o = new dn.Metadata(e, t);
            "number" == typeof i ? hn.tagParameter(n, r, i, o) : hn.tagProperty(n, r, o)
        }
    };
    var pn = {};
    Object.defineProperty(pn, "__esModule", {
        value: !0
    }), pn.named = void 0;
    var vn = P,
        _n = ee,
        gn = ce;
    pn.named = function(e) {
        return function(t, n, r) {
            var i = new _n.Metadata(vn.NAMED_TAG, e);
            "number" == typeof r ? gn.tagParameter(t, n, r, i) : gn.tagProperty(t, n, i)
        }
    };
    var yn = {};
    Object.defineProperty(yn, "__esModule", {
        value: !0
    }), yn.optional = void 0;
    var mn = P,
        En = ee,
        bn = ce;
    yn.optional = function() {
        return function(e, t, n) {
            var r = new En.Metadata(mn.OPTIONAL_TAG, !0);
            "number" == typeof n ? bn.tagParameter(e, t, n, r) : bn.tagProperty(e, t, r)
        }
    };
    var Tn = {};
    Object.defineProperty(Tn, "__esModule", {
        value: !0
    }), Tn.unmanaged = void 0;
    var In = P,
        On = ee,
        Sn = ce;
    Tn.unmanaged = function() {
        return function(e, t, n) {
            var r = new On.Metadata(In.UNMANAGED_TAG, !0);
            Sn.tagParameter(e, t, n, r)
        }
    };
    var Nn = {};
    Object.defineProperty(Nn, "__esModule", {
        value: !0
    }), Nn.multiInject = void 0;
    var Rn = P,
        An = ee,
        Pn = ce;
    Nn.multiInject = function(e) {
        return function(t, n, r) {
            var i = new An.Metadata(Rn.MULTI_INJECT_TAG, e);
            "number" == typeof r ? Pn.tagParameter(t, n, r, i) : Pn.tagProperty(t, n, i)
        }
    };
    var Cn = {};
    Object.defineProperty(Cn, "__esModule", {
        value: !0
    }), Cn.targetName = void 0;
    var wn = P,
        kn = ee,
        Mn = ce;
    Cn.targetName = function(e) {
        return function(t, n, r) {
            var i = new kn.Metadata(wn.NAME_TAG, e);
            Mn.tagParameter(t, n, r, i)
        }
    };
    var Ln = {};
    Object.defineProperty(Ln, "__esModule", {
        value: !0
    }), Ln.postConstruct = void 0;
    var Dn = U,
        xn = P,
        jn = ee;
    Ln.postConstruct = function() {
        return function(e, t, n) {
            var r = new jn.Metadata(xn.POST_CONSTRUCT, t);
            if (Reflect.ttq_hasOwnMetadata(xn.POST_CONSTRUCT, e.constructor)) throw new Error(Dn.MULTIPLE_POST_CONSTRUCT_METHODS);
            Reflect.ttq_defineMetadata(xn.POST_CONSTRUCT, r, e.constructor)
        }
    };
    var Un = {};
    Object.defineProperty(Un, "__esModule", {
        value: !0
    }), Un.multiBindToService = void 0;
    Un.multiBindToService = function(e) {
            return function(t) {
                return function() {
                    for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
                    return n.forEach((function(n) {
                        return e.bind(n).toService(t)
                    }))
                }
            }
        },
        function(e) {
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.multiBindToService = e.getServiceIdentifierAsString = e.typeConstraint = e.namedConstraint = e.taggedConstraint = e.traverseAncerstors = e.decorate = e.id = e.MetadataReader = e.postConstruct = e.targetName = e.multiInject = e.unmanaged = e.optional = e.LazyServiceIdentifer = e.inject = e.named = e.tagged = e.injectable = e.ContainerModule = e.AsyncContainerModule = e.TargetTypeEnum = e.BindingTypeEnum = e.BindingScopeEnum = e.Container = e.METADATA_KEY = void 0;
            var t = P;
            e.METADATA_KEY = t;
            var n = C;
            Object.defineProperty(e, "Container", {
                enumerable: !0,
                get: function() {
                    return n.Container
                }
            });
            var r = k;
            Object.defineProperty(e, "BindingScopeEnum", {
                enumerable: !0,
                get: function() {
                    return r.BindingScopeEnum
                }
            }), Object.defineProperty(e, "BindingTypeEnum", {
                enumerable: !0,
                get: function() {
                    return r.BindingTypeEnum
                }
            }), Object.defineProperty(e, "TargetTypeEnum", {
                enumerable: !0,
                get: function() {
                    return r.TargetTypeEnum
                }
            });
            var i = rn;
            Object.defineProperty(e, "AsyncContainerModule", {
                enumerable: !0,
                get: function() {
                    return i.AsyncContainerModule
                }
            }), Object.defineProperty(e, "ContainerModule", {
                enumerable: !0,
                get: function() {
                    return i.ContainerModule
                }
            });
            var o = sn;
            Object.defineProperty(e, "injectable", {
                enumerable: !0,
                get: function() {
                    return o.injectable
                }
            });
            var a = fn;
            Object.defineProperty(e, "tagged", {
                enumerable: !0,
                get: function() {
                    return a.tagged
                }
            });
            var c = pn;
            Object.defineProperty(e, "named", {
                enumerable: !0,
                get: function() {
                    return c.named
                }
            });
            var s = ae;
            Object.defineProperty(e, "inject", {
                enumerable: !0,
                get: function() {
                    return s.inject
                }
            }), Object.defineProperty(e, "LazyServiceIdentifer", {
                enumerable: !0,
                get: function() {
                    return s.LazyServiceIdentifer
                }
            });
            var u = yn;
            Object.defineProperty(e, "optional", {
                enumerable: !0,
                get: function() {
                    return u.optional
                }
            });
            var l = Tn;
            Object.defineProperty(e, "unmanaged", {
                enumerable: !0,
                get: function() {
                    return l.unmanaged
                }
            });
            var f = Nn;
            Object.defineProperty(e, "multiInject", {
                enumerable: !0,
                get: function() {
                    return f.multiInject
                }
            });
            var d = Cn;
            Object.defineProperty(e, "targetName", {
                enumerable: !0,
                get: function() {
                    return d.targetName
                }
            });
            var h = Ln;
            Object.defineProperty(e, "postConstruct", {
                enumerable: !0,
                get: function() {
                    return h.postConstruct
                }
            });
            var p = B;
            Object.defineProperty(e, "MetadataReader", {
                enumerable: !0,
                get: function() {
                    return p.MetadataReader
                }
            });
            var v = M;
            Object.defineProperty(e, "id", {
                enumerable: !0,
                get: function() {
                    return v.id
                }
            });
            var _ = ce;
            Object.defineProperty(e, "decorate", {
                enumerable: !0,
                get: function() {
                    return _.decorate
                }
            });
            var g = lt;
            Object.defineProperty(e, "traverseAncerstors", {
                enumerable: !0,
                get: function() {
                    return g.traverseAncerstors
                }
            }), Object.defineProperty(e, "taggedConstraint", {
                enumerable: !0,
                get: function() {
                    return g.taggedConstraint
                }
            }), Object.defineProperty(e, "namedConstraint", {
                enumerable: !0,
                get: function() {
                    return g.namedConstraint
                }
            }), Object.defineProperty(e, "typeConstraint", {
                enumerable: !0,
                get: function() {
                    return g.typeConstraint
                }
            });
            var y = K;
            Object.defineProperty(e, "getServiceIdentifierAsString", {
                enumerable: !0,
                get: function() {
                    return y.getServiceIdentifierAsString
                }
            });
            var m = Un;
            Object.defineProperty(e, "multiBindToService", {
                enumerable: !0,
                get: function() {
                    return m.multiBindToService
                }
            })
        }(A);
    var Bn, Fn, Hn, Vn, Gn, Jn, Wn, Kn, Yn, qn, Xn = ["ttuts", "ad_info_from"];
    ! function(e) {
        e.LDU = "limited_data_use", e.EVENTID = "eventID", e.EVENT_ID = "event_id"
    }(Bn || (Bn = {})),
    function(e) {
        e[e.defaultReport = 0] = "defaultReport", e[e.httpReport = 1] = "httpReport", e[e.htmlHttpReport = 2] = "htmlHttpReport"
    }(Fn || (Fn = {})),
    function(e) {
        e.Normal = "1", e.Iframe = "2", e.WebWorker = "3", e.SandboxIframe = "4"
    }(Hn || (Hn = {})),
    function(e) {
        e.EMPTY_VALUE = "empty_value", e.WRONG_FORMAT = "wrong_format", e.CORRECT_FORMAT = "correct_format", e.HASHED = "hashed", e.HASHED_ERR = "hashed_err", e.HASHED_CORRECT = "hashed_correct", e.PLAINTEXT_EMAIL = "plaintext_email", e.PLAINTEXT_PHONE = "plaintext_phone"
    }(Vn || (Vn = {})),
    function(e) {
        e.EMPTY_VALUE = "empty_value", e.PLAIN_EMAIL = "plain_email", e.PLAIN_PHONE = "plain_phone", e.HASHED = "hashed", e.FILTER_EVENTS = "filter_events", e.UNKNOWN_INVALID = "unknown_invalid", e.BASE64_STRING_HASHED = "base64_string_hashed", e.BASE64_HEX_HASHED = "base64_hex_hashed", e.PLAIN_MDN_EMAIL = "plain_mdn_email", e.ZIP_CODE_IS_NOT_HASHED = "zip_code_is_not_hashed", e.ZIP_CODE_IS_NOT_US = "zip_code_is_not_us", e.ZIP_CODE_IS_HASHED = "zip_code_is_hashed", e.ZIP_CODE_IS_US = "zip_code_is_us"
    }(Gn || (Gn = {})),
    function(e) {
        e.Manual = "manual", e.ManualV2 = "manual_v2", e.Auto = "auto"
    }(Jn || (Jn = {})),
    function(e) {
        e.empty = "empty", e.whitespace = "whitespace", e.hardcode = "hardcode", e.encode = "encode"
    }(Wn || (Wn = {})),
    function(e) {
        e.letterCase = "letter_case", e.isNotValidEmail = "is_not_valid_email", e.isNotPossibleEmail = "is_not_possible_email", e.domainTypo = "domain_typo", e.addressFormat = "address_format"
    }(Kn || (Kn = {})),
    function(e) {
        e.invalidCountry = "invalid_country", e.notANumber = "not_a_number", e.tooShort = "too_short", e.tooLong = "too_long", e.invalidLength = "invalid_length", e.emptyCountryCodeThroughIP = "empty_country_code_through_ip", e.invalidCountryAfterInjectPlus = "invalid_country_after_inject_plus", e.notANumberAfterInjectPlus = "not_a_number_after_inject_plus", e.tooShortAfterInjectPlus = "too_short_after_inject_plus", e.tooLongAfterInjectPlus = "too_long_after_inject_plus", e.invalidLengthAfterInjectPlus = "invalid_length_after_inject_plus", e.invalidCountryAfterInjectCountry = "invalid_country_after_inject_country", e.notANumberAfterInjectCountry = "not_a_number_after_inject_country", e.tooShortAfterInjectCountry = "too_short_after_inject_country", e.tooLongAfterInjectCountry = "too_long_after_inject_country", e.invalidLengthAfterInjectCountry = "invalid_length_after_inject_country"
    }(Yn || (Yn = {})),
    function(e) {
        e.missing = "missing", e.valid = "valid", e.invalid = "invalid"
    }(qn || (qn = {}));
    var zn, Qn, Zn, $n = {
        raw_email: {
            label: qn.missing
        },
        raw_auto_email: {
            label: qn.missing
        },
        raw_phone: {
            label: qn.missing
        },
        raw_auto_phone: {
            label: qn.missing
        },
        hashed_email: {
            label: qn.missing
        },
        hashed_phone: {
            label: qn.missing
        }
    };
    ! function(e) {
        e[e.UNKNOWN = 0] = "UNKNOWN", e[e.HOLD = 1] = "HOLD", e[e.REVOKE = 2] = "REVOKE", e[e.GRANT = 3] = "GRANT"
    }(zn || (zn = {})),
    function(e) {
        e[e.NOT_SURE = 0] = "NOT_SURE", e[e.INVOKE_METHOD_ENABLED = 1] = "INVOKE_METHOD_ENABLED", e[e.INVOKE_METHOD_NOT_ENABLED = 2] = "INVOKE_METHOD_NOT_ENABLED", e[e.TOUTIAO_BRIDGE_NOT_ENABLED = 3] = "TOUTIAO_BRIDGE_NOT_ENABLED"
    }(Qn || (Qn = {})),
    function(e) {
        e.PIXEL_CODE = "pixelCode", e.EVENT_SOURCE_ID = "eventSourceId", e.SHOP_ID = "shopId"
    }(Zn || (Zn = {}));
    var er = function(e) {
            return "[object Object]" === Object.prototype.toString.call(e)
        },
        tr = function(e) {
            return "{}" === JSON.stringify(e)
        },
        nr = function(e) {
            return "".concat(e, "-").concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12)
        },
        rr = function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "-";
            return "".concat(e).concat(n).concat(t)
        },
        ir = function() {
            return new Date(Date.now() + 864e5).toUTCString()
        };

    function or(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500,
            n = -1;
        return function() {
            var r = Array.prototype.slice.apply(arguments),
                i = Date.now();
            i - n >= t && (e.apply(void 0, y(r)), n = Date.now())
        }
    }
    var ar, cr, sr, ur, lr, fr = "tt_adInfo",
        dr = "tt_appInfo",
        hr = "_tt_enable_cookie",
        pr = "_ttp",
        vr = "messageId",
        _r = "tt_sessionId",
        gr = "tt_pixel_session_index",
        yr = "default_eventId",
        mr = "::";
    ! function(e) {
        e.MUSICAL_LY = "musical_ly", e.MUSICALLY_GO = "musically_go", e.TRILL = "trill"
    }(ar || (ar = {})),
    function(e) {
        e[e.OFFSITE = 0] = "OFFSITE", e[e.ONSITE = 1] = "ONSITE"
    }(cr || (cr = {})),
    function(e) {
        e.INIT_START = "initStart", e.INIT_END = "initEnd", e.CONTEXT_INIT_START = "contextInitStart", e.CONTEXT_INIT_END = "contextInitEnd", e.PAGE_URL_WILL_CHANGE = "pageUrlWillChange", e.PAGE_URL_DID_CHANGE = "pageUrlDidChange", e.PAGE_DID_LOAD = "pageDidLoad", e.PAGE_WILL_LEAVE = "pageWillLeave", e.AD_INFO_INIT_START = "adInfoInitStart", e.AD_INFO_INIT_END = "adInfoInitEnd", e.BEFORE_AD_INFO_INIT_START = "beforeAdInfoInitStart", e.BEFORE_SHOPIFY_PIXEL_SEND = "beforeShopifyPixelSend", e.PIXEL_SEND = "pixelSend", e.PIXEL_DID_MOUNT = "pixelDidMount"
    }(sr || (sr = {})),
    function(e) {
        e.UNKNOWN = "-1", e.LOADING = "0", e.INTERACTIVE = "1", e.COMPLETE = "2"
    }(ur || (ur = {})),
    function(e) {
        e.EXTERNAL = "external", e.APP = "app", e.TIKTOK = "tiktok"
    }(lr || (lr = {}));
    var Er, br = {
            ID: Symbol.for("ID"),
            Type: Symbol.for("type"),
            Partner: Symbol.for("partner"),
            Options: Symbol.for("Options"),
            Plugins: Symbol.for("Plugins"),
            Rules: Symbol.for("Rules"),
            Info: Symbol.for("Info"),
            ExtraParams: Symbol.for("extraParams"),
            WebLibraryInfo: Symbol.for("WebLibraryInfo"),
            SignalType: Symbol.for("SignalType"),
            IsOnsitePage: Symbol.for("IsOnsitePage")
        },
        Tr = "Pageview",
        Ir = [],
        Or = {
            TTQ: Symbol.for("TTQ"),
            GLOBAL_TTQ: Symbol.for("GLOBAL_TTQ"),
            SHOPIFY_TTQ: Symbol.for("SHOPIFY_TTQ"),
            ENV: Symbol.for("ENV"),
            CONTEXT: Symbol.for("CONTEXT"),
            REPORTER: Symbol.for("REPORTER"),
            REPORTERS: Symbol.for("REPORTERS"),
            PLUGIN: Symbol.for("PLUGIN"),
            PLUGINS: Symbol.for("PLUGINS"),
            TTQ_GLOBAL_OPTIONS: Symbol.for("TTQ_GLOBAL_OPTIONS"),
            PERFORMANCE_PLUGIN: Symbol.for("PERFORMANCE_PLUGIN"),
            INTERACTION_PLUGIN: Symbol.for("INTERACTION_PLUGIN"),
            INTERACTION_PLUGIN_MONITOR: Symbol.for("INTERACTION_PLUGIN_MONITOR"),
            PERFORMANCE_PLUGIN_MONITOR: Symbol.for("PERFORMANCE_PLUGIN_MONITOR"),
            ADVANCED_MATCHING_PLUGIN: Symbol.for("ADVANCED_MATCHING_PLUGIN"),
            AUTO_ADVANCED_MATCHING_PLUGIN: Symbol.for("AUTO_ADVANCED_MATCHING_PLUGIN"),
            CALLBACK_PLUGIN: Symbol.for("CALLBACK_PLUGIN"),
            IDENTIFY_PLUGIN: Symbol.for("IDENTIFY_PLUGIN"),
            MONITOR_PLUGIN: Symbol.for("MONITOR_PLUGIN"),
            PERFORMANCE_INTERACTION_PLUGIN: Symbol.for("PERFORMANCE_INTERACTION_PLUGIN"),
            WEB_FL_PLUGIN: Symbol.for("WEB_FL_PLUGIN"),
            SHOPIFY_PLUGIN: Symbol.for("SHOPIFY_PLUGIN"),
            AUTO_CONFIG_PLUGIN: Symbol.for("AUTO_CONFIG_PLUGIN"),
            DIAGNOSTICS_CONSOLE_PLUGIN: Symbol.for("DIAGNOSTICS_CONSOLE_PLUGIN"),
            COMPETITOR_INSIGHT_PLUGIN: Symbol.for("COMPETITOR_INSIGHT_PLUGIN"),
            PANGLE_COOKIE_MATCHING_PLUGIN: Symbol.for("PANGLE_COOKIE_MATCHING_PLUGIN"),
            EVENT_BUILDER_PLUGIN: Symbol.for("EVENT_BUILDER_PLUGIN"),
            ENRICH_IPV6_PLUGIN: Symbol.for("ENRICH_IPV6_PLUGIN"),
            PAGE_PERFORMANCE_MONITOR: Symbol.for("PAGE_PERFORMANCE_MONITOR"),
            PAGE_INTERACTION_MONITOR: Symbol.for("PAGE_INTERACTION_MONITOR"),
            PAGEDATA_PLUGIN: Symbol.for("PAGEDATA_PLUGIN"),
            HISTORY_OBSERVER: Symbol.for("HISTORY_OBSERVER"),
            BATCH_SERVICE: Symbol.for("BATCH_SERVICE"),
            REPORT_SERVICE: Symbol.for("REPORT_SERVICE"),
            AD_SERVICE: Symbol.for("AD_SERVICE"),
            APP_SERVICE: Symbol.for("APP_SERVICE"),
            BRIDGE_SERVICE: Symbol.for("BRIDGE"),
            HTTP_SERVICE: Symbol.for("HTTP_SERVICE"),
            COOKIE_SERVICE: Symbol.for("COOKIE_SERVICE"),
            CONSENT_SERVICE: Symbol.for("CONSENT_SERVICE"),
            JS_BRIDGE: Symbol.for("JS_BRIDGE"),
            TTQ_REPORTERS: Symbol.for("TTQ_REPORTERS"),
            INTERACTION_MONITOR: Symbol.for("INTERACTION_MONITOR"),
            PERFORMANCE_MONITOR: Symbol.for("PERFORMANCE_MONITOR"),
            SANDBOX_PIXEL_API: Symbol("SANDBOX_PIXEL_API")
        };
    ! function(e) {
        e.TRACK = "track", e.PERFORMANCE = "performance", e.INTERACTION = "interaction", e.PCM = "PCM", e.PERFORMANCE_INTERACTION = "performance_interaction", e.SELFHOST = "selfhost", e.AUTO_CONFIG = "auto_config", e.PAGE = "Pf"
    }(Er || (Er = {}));
    var Sr, Nr, Rr = ["EnrichAM"],
        Ar = "https://analytics.tiktok.com/api/v2",
        Pr = "".concat(Ar, "/pixel"),
        Cr = "".concat(Ar, "/performance"),
        wr = "".concat(Ar, "/interaction"),
        kr = "".concat(Ar, "/performance_interaction"),
        Mr = "".concat(Ar, "/pixel/act"),
        Lr = "ttclid",
        Dr = "_toutiao_params",
        xr = ["phone_number", "email", "external_id"],
        jr = "email_is_hashed",
        Ur = "phone_is_hashed",
        Br = "sha256_email",
        Fr = "sha256_phone",
        Hr = "auto_trigger_type";
    ! function(e) {
        e.LOAD_START = "load_start", e.LOAD_END = "load_end", e.BEFORE_INIT = "before_init", e.INIT_START = "init_start", e.INIT_END = "init_end", e.JSB_INIT_START = "jsb_init_start", e.JSB_INIT_END = "jsb_init_end", e.BEFORE_AD_INFO_INIT_START = "before_ad_info_init_start", e.AD_INFO_INIT_START = "ad_info_init_start", e.AD_INFO_INIT_END = "ad_info_init_end", e.IDENTIFY_INIT_START = "identify_init_start", e.IDENTIFY_INIT_END = "identify_init_end", e.PLUGIN_INIT_START = "_init_start", e.PLUGIN_INIT_END = "_init_end", e.PIXEL_SEND = "pixel_send", e.PIXEL_SEND_PCM = "pixel_send_PCM", e.JSB_SEND = "jsb_send", e.HTTP_SEND = "http_send", e.HANDLE_CACHE = "handle_cache", e.INIT_ERROR = "init_error", e.PIXEL_EMPTY = "pixel_empty", e.JSB_ERROR = "jsb_error", e.API_ERROR = "api_error", e.PLUGIN_ERROR = "plugin_error", e.CUSTOM_INFO = "custom_info", e.CUSTOM_ERROR = "custom_error", e.CUSTOM_TIMER = "custom_timer"
    }(Sr || (Sr = {})),
    function(e) {
        e.EMPTY_EVENT_TYPE_NAME = "EMPTY_EVENT_TYPE_NAME", e.MISMATCHED_EVENT_TYPE_NAME_FOR_CUSTOM_EVENT = "MISMATCHED_EVENT_TYPE_NAME_FOR_CUSTOM_EVENT", e.LONG_EVENT_TYPE_NAME = "LONG_EVENT_TYPE_NAME", e.MISSING_VALUE_PARAMETER = "MISSING_VALUE_PARAMETER", e.MISSING_CURRENCY_PARAMETER = "MISSING_CURRENCY_PARAMETER", e.MISSING_CONTENT_ID = "MISSING_CONTENT_ID", e.MISSING_EMAIL_AND_PHONE = "MISSING_EMAIL_AND_PHONE", e.INVALID_EVENT_PARAMETER_VALUE = "INVALID_EVENT_PARAMETER_VALUE", e.INVALID_CURRENCY_CODE = "INVALID_CURRENCY_CODE", e.INVALID_CONTENT_ID = "INVALID_CONTENT_ID", e.INVALID_CONTENT_TYPE = "INVALID_CONTENT_TYPE", e.INVALID_EMAIL_FORMAT = "INVALID_EMAIL_FORMAT", e.INVALID_PHONE_NUMBER_FORMAT = "INVALID_PHONE_NUMBER_FORMAT", e.INVALID_EMAIL_INFORMATION = "INVALID_EMAIL_INFORMATION", e.INVALID_PHONE_NUMBER_INFORMATION = "INVALID_PHONE_NUMBER_INFORMATION", e.DUPLICATE_PIXEL_CODE = "DUPLICATE_PIXEL_CODE", e.MISSING_PIXEL_CODE = "MISSING_PIXEL_CODE", e.INVALID_PIXEL_CODE = "INVALID_PIXEL_CODE"
    }(Nr || (Nr = {}));
    var Vr = null,
        Gr = function() {
            return "undefined" != typeof window ? window : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof global ? global : new Function("return this")()
        },
        Jr = function() {
            return Gr().TiktokAnalyticsObject || "ttq"
        },
        Wr = function() {
            var e = Gr();
            return Vr || e[Jr()]
        },
        Kr = function() {
            return !!Wr()._is_onsite
        },
        Yr = function() {
            var e = Gr();
            return ("object" === ("undefined" == typeof navigator ? "undefined" : t(navigator)) && navigator.userAgent ? navigator.userAgent : "") || e._userAgent
        },
        qr = function(e) {
            try {
                var t = Wr();
                return t && t._self_host_config && t._self_host_config[e] || ""
            } catch (e) {
                return ""
            }
        },
        Xr = function() {
            var e = Wr();
            return e._partner ? e._partner : ""
        },
        zr = function(e) {
            try {
                var t = Wr()._plugins || {};
                return null == t[e] || !!t[e]
            } catch (e) {
                return !0
            }
        };
    var Qr = function(e) {
            return Boolean(e)
        },
        Zr = function(e) {
            var t;
            return Object.keys((null === (t = null == e ? void 0 : e.context) || void 0 === t ? void 0 : t.user) || {}).some((function(e) {
                return -1 !== xr.indexOf(e)
            }))
        };

    function $r(e, t) {
        var n, r = e;
        return function() {
            if (r) {
                for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
                n = e.apply(t, o), r = null
            }
            return n
        }
    }
    var ei = function(e) {
        return ((e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce(((e, t) => e + ((t &= 63) < 36 ? t.toString(36) : t < 62 ? (t - 26).toString(36).toUpperCase() : t > 62 ? "-" : "_")), ""))(e)
    };

    function ti(e, t) {
        var n = Object.assign({}, e);
        return t.forEach((function(e) {
            null !== n[e] && void 0 !== n[e] && delete n[e]
        })), n
    }
    var ni = function(e, t) {
        if (!e) return {};
        var n = {};
        return Object.keys(e).forEach((function(r) {
            t[r] && (n[r] = e[r])
        })), n
    };

    function ri(e, t, n) {
        var r;
        return function() {
            for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
            clearTimeout(r), r = setTimeout((function() {
                e.apply(n, o)
            }), t)
        }
    }

    function ii() {
        return oi.apply(this, arguments)
    }

    function oi() {
        return oi = r(e().mark((function t() {
            var n, r = arguments;
            return e().wrap((function(e) {
                for (;;) switch (e.prev = e.next) {
                    case 0:
                        return n = r.length > 0 && void 0 !== r[0] ? r[0] : 500, e.abrupt("return", new Promise((function(e) {
                            setTimeout((function() {
                                e(!0)
                            }), n)
                        })));
                    case 2:
                    case "end":
                        return e.stop()
                }
            }), t)
        }))), oi.apply(this, arguments)
    }
    var ai = ["input[type='button']", "input[type='image']", "input[type='submit']", "button", "[class*=btn]", "[class*=Btn]", "[class*=button]", "[class*=Button]", "[role*=button]", "[id*=btn]", "[id*=Btn]", "[id*=button]", "[id*=Button]", "a"],
        ci = ["[href^='tel:']", "[href^='callto:']", "[href^='sms:']", "[href^='skype:']", "[href^='whatsapp:']", "[href^='mailto:']"],
        si = function(e) {
            var t = ai.some((function(t) {
                    return e.matches(t)
                })),
                n = ci.some((function(t) {
                    return e.matches(t)
                }));
            return t && !n
        };

    function ui(e, n) {
        var r = {};
        for (var i in e)
            if (e.hasOwnProperty(i) && !n.hasOwnProperty(i)) r[i] = e[i];
            else if (e.hasOwnProperty(i) && n.hasOwnProperty(i) && e[i] !== n[i])
            if ("object" === t(e[i]) && "object" === t(n[i])) {
                var o = ui(e[i], n[i]);
                Object.keys(o).length > 0 && (r[i] = o)
            } else r[i] = e[i];
        for (var a in n) n.hasOwnProperty(a) && !e.hasOwnProperty(a) && (r[a] = n[a]);
        return r
    }

    function li(e, t) {
        return Object.keys(ui(e, t)).length > 0
    }

    function fi(e, t) {
        var n = {};
        return e && (function(e) {
            return "string" == typeof e
        }(e) || function(e) {
            return "number" == typeof e
        }(e) ? n.external_id = e.toString() : er(e) && (n = e)), t && er(t) && Object.assign(n, t), n
    }
    var di = function(e) {
            try {
                var t = e && function(e) {
                    for (var t = Array.prototype.slice.call(document.getElementsByTagName("script")), n = 0; n < t.length; n++) {
                        var r = t[n];
                        if (r.innerHTML && r.innerHTML.indexOf(e) > -1) return r
                    }
                }(e);
                if (t) {
                    if (hi(t)) return "isInHead";
                    if (pi(t)) return "isInBodyTop10"
                }
                return "unknown"
            } catch (e) {
                return "unknown"
            }
        },
        hi = function e(t) {
            var n = t.parentElement;
            return !!n && ("HEAD" === n.tagName || e(n))
        },
        pi = function(e) {
            return function(e, n) {
                for (var r, i = [document.body], o = 0; o <= e && i.length;) {
                    var a = i.pop();
                    if (a === n) return !0;
                    if (!("script" === (null == a ? void 0 : a.tagName.toLowerCase()) && (null === (r = a.src) || void 0 === r ? void 0 : r.indexOf("analytics.tiktok.com")) > -1) && (o++, "object" === t(a) && a.children))
                        for (var c = a.children.length - 1; c >= 0; c--) i.push(a.children[c])
                }
                return !1
            }(10, e)
        },
        vi = function() {
            var e, t;
            return (null === (t = null === (e = Wr()) || void 0 === e ? void 0 : e._env) || void 0 === t ? void 0 : t.env) || lr.EXTERNAL
        },
        _i = function() {
            var e, t;
            return null !== (t = null === (e = Wr()) || void 0 === e ? void 0 : e._is_onsite) && void 0 !== t ? t : cr.OFFSITE
        },
        gi = function(e) {
            return (e || vi()) !== lr.EXTERNAL
        },
        yi = function(e) {
            return (e || vi()) === lr.TIKTOK
        },
        mi = function() {
            var e = Yr();
            return /windows phone/i.test(e) ? "Windows Phone" : /android/i.test(e) ? "android" : /iPad|iPhone|iPod/.test(e) ? "ios" : "pc"
        },
        Ei = function() {
            try {
                return navigator.userAgentData.getHighEntropyValues(["model", "platformVersion"])
            } catch (e) {
                return Promise.resolve({})
            }
        },
        bi = function() {
            return "android" === mi()
        },
        Ti = function() {
            return "ios" === mi()
        },
        Ii = $r((function() {
            return /open_news/i.test(Yr())
        })),
        Oi = $r((function() {
            return /ultralite/i.test(Yr())
        }));

    function Si() {
        var e;
        return [Qn.INVOKE_METHOD_ENABLED, Qn.INVOKE_METHOD_NOT_ENABLED, Qn.TOUTIAO_BRIDGE_NOT_ENABLED][
            [!!(null === (e = null === window || void 0 === window ? void 0 : window.ToutiaoJSBridge) || void 0 === e ? void 0 : e.invokeMethod), !!(null === window || void 0 === window ? void 0 : window.ToutiaoJSBridge), !0].findIndex((function(e) {
                return e
            }))
        ]
    }
    var Ni = function() {
            return (void 0 !== (e = Gr()).DedicatedWorkerGlobalScope ? e instanceof e.DedicatedWorkerGlobalScope : "DedicatedWorkerGlobalScope" === e.constructor.name) ? Hn.WebWorker : globalThis.self && globalThis.self !== globalThis.self.top ? Hn.Iframe : Hn.Normal;
            var e
        },
        Ri = function() {
            var e = Ti() ? function() {
                    for (var e = Yr(), t = 0, n = Object.keys(ar); t < n.length; t++) {
                        var r = n[t],
                            i = new RegExp("\\b".concat(ar[r], "_(\\d+\\.\\d+\\.\\d+)"));
                        if (e && e.match(i)) return ar[r]
                    }
                }() : bi() ? function() {
                    var e = Yr();
                    if (e) {
                        var t = e.match(/\bAppName\/(\S*)/);
                        if (t)
                            for (var n = 0, r = Object.keys(ar); n < r.length; n++) {
                                var i = r[n],
                                    o = ar[i];
                                if (o === t[1]) return o
                            }
                    }
                }() : null,
                t = Ti() ? function() {
                    var e = Yr();
                    if (e)
                        for (var t = 0, n = Object.keys(ar); t < n.length; t++) {
                            var r = n[t],
                                i = new RegExp("\\b".concat(ar[r], "_(\\S*)")),
                                o = e.match(i),
                                a = o && o[1] ? o[1].match(/^\d+\.\d+\.\d+$/) : void 0;
                            if (a) return a[0]
                        }
                }() : bi() ? function() {
                    var e = Yr();
                    if (e) {
                        var t = e.match(/\bapp_version\/(\S*)/),
                            n = t && t[1] ? t[1].match(/^\d+\.\d+\.\d+$/) : void 0;
                        return n ? n[0] : void 0
                    }
                }() : null;
            return !(!t || !e || e != ar.MUSICAL_LY && e != ar.TRILL) && (Ti() ? Ai("33.4.0", t) : !bi() || Ai("23.1.0", t))
        },
        Ai = function(e, t) {
            for (var n = e.split("."), r = t.split("."), i = 0; i < Math.max(n.length, r.length); i++) {
                var o = parseInt(n[i]) || Number.MAX_VALUE,
                    a = parseInt(r[i]) || -1;
                if (o < a) return !0;
                if (o > a) return !1
            }
            return !0
        },
        Pi = {
            info: [],
            error: []
        };

    function Ci(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        try {
            var r = Wr(),
                i = r.getPlugin && r.getPlugin("Monitor") || null;
            i && i.info && "function" == typeof i.info ? i.info.call(i, e, t, n) : zr("Monitor") && Pi.info.push({
                event: e,
                detail: t,
                withoutJSB: n
            })
        } catch (e) {}
    }

    function wi(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
        try {
            var i = Wr(),
                o = i.getPlugin && i.getPlugin("Monitor") || null;
            o && o.error && "function" == typeof o.error ? o.error.call(o, e, t, n, r) : zr("Monitor") && Pi.error.push({
                event: e,
                err: t,
                detail: n,
                withoutJSB: r
            })
        } catch (e) {}
    }

    function ki(e, t) {
        try {
            var n = Wr(),
                r = n.getPlugin && n.getPlugin("DiagnosticsConsole") || null;
            r && r.warn.apply(r, [e, t])
        } catch (e) {}
    }

    function Mi() {
        try {
            0;
            var e = document && document.currentScript,
                t = e && e.src || "http://emptyURLSrc";
            return {
                pixelCode: new URL(t).searchParams.get("sdkid") || e && e.getAttribute("data-id") || "",
                lib: Jr() || "ttq"
            }
        } catch (e) {
            return {
                lib: "ttq",
                pixelCode: ""
            }
        }
    }
    var Li = function(e, t) {
            if ("selfhost" === e && t && qr(t)) return "https://".concat(qr(t), "/api/v2/pixel");
            var n = {
                track: Pr,
                performance: Cr,
                interaction: wr,
                performance_interaction: kr,
                auto_config: Mr
            }[e];
            return n || null
        },
        Di = function(e) {
            try {
                var t = window.sessionStorage.getItem(e);
                return t ? JSON.parse(t) : null
            } catch (e) {
                return null
            }
        },
        xi = function(e, t) {
            try {
                var n = JSON.stringify(t);
                window.sessionStorage.setItem(e, n)
            } catch (e) {}
        };

    function ji(e, t) {
        try {
            return new URL(e).searchParams.get(t) || ""
        } catch (e) {
            return ""
        }
    }
    var Ui = function(e, t, n) {
            try {
                var r = ji(t || window.location.href, e);
                return r || ji(n || document.referrer, e)
            } catch (e) {}
            return ""
        },
        Bi = "",
        Fi = function(e) {
            if (0 === document.cookie.length) return "";
            var t, n, r = (t = e, n = {}, document.cookie.split(";").forEach((function(e) {
                var t = e.split("="),
                    r = t[0].trim();
                n[r] = t.slice(1).join("=")
            })), n[t] || "");
            return r ? unescape(r) : ""
        },
        Hi = function(e, t, n) {
            try {
                if (n) {
                    if (Bi) return n.domain = Bi, void(document.cookie = "".concat(e, "=").concat(t).concat(Gi(n)));
                    for (var r = (n.domain || window.location.hostname).split("."), i = r.length, o = "", a = 0; a < i; a++) {
                        if (o = ".".concat(r[i - a - 1]).concat(o), n.domain = o, document.cookie = "".concat(e, "=").concat(t).concat(Gi(n)), Fi(e)) {
                            Bi = o;
                            break
                        }
                    }
                } else document.cookie = "".concat(e, "=").concat(t).concat(Gi(n))
            } catch (e) {}
        },
        Vi = function(e) {
            var t = e.index,
                n = e.main;
            sessionStorage.setItem(gr, JSON.stringify({
                index: t,
                main: n
            }))
        },
        Gi = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                t = Object.assign({}, {
                    path: "/"
                }, e);
            "number" == typeof t.expires && (t.expires = new Date(Date.now() + 864e5 * t.expires)), t.expires instanceof Date && (t.expires = t.expires.toUTCString());
            var n = "";
            for (var r in t) t[r] && (n += "; ".concat(r), !0 !== t[r] && (n += "=".concat(t[r].split(";")[0])));
            return n
        },
        Ji = function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "/",
                r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ir(),
                i = {
                    path: n,
                    expires: r
                };
            Hi(e, t, i)
        };

    function Wi() {
        try {
            var e = document.readyState;
            return "loading" == e ? ur.LOADING : "interactive" == e ? ur.INTERACTIVE : "complete" == e ? ur.COMPLETE : ur.UNKNOWN
        } catch (e) {
            return ur.UNKNOWN
        }
    }

    function Ki(e) {
        return new Promise((function(t, n) {
            var r = document.createElement("script");
            r.type = "text/javascript", r.async = !0, r.src = e;
            var i = document.getElementsByTagName("script")[0];
            i && i.parentNode ? i.parentNode.insertBefore(r, i) : n("none element"), r.onload = function() {
                t(!0)
            }, r.onerror = n
        }))
    }
    var Yi = function() {
            var t = r(e().mark((function t(n) {
                var r, i = arguments;
                return e().wrap((function(e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            if (!((r = i.length > 1 && void 0 !== i[1] ? i[1] : 1) >= 0)) {
                                e.next = 13;
                                break
                            }
                            return e.prev = 2, e.next = 5, Ki(n);
                        case 5:
                            return e.abrupt("return", Promise.resolve(!0));
                        case 8:
                            return e.prev = 8, e.t0 = e.catch(2), e.abrupt("return", Yi.call(null, n, r - 1));
                        case 11:
                            e.next = 14;
                            break;
                        case 13:
                            throw Error;
                        case 14:
                        case "end":
                            return e.stop()
                    }
                }), t, null, [
                    [2, 8]
                ])
            })));
            return function(e) {
                return t.apply(this, arguments)
            }
        }(),
        qi = function(e) {
            return "function" == typeof Promise.allSettled ? Promise.allSettled(e) : function(e) {
                var t = new Array(e.length),
                    n = 0;
                return new Promise((function(r, i) {
                    for (var o = function(i) {
                            var o = e[i];
                            o && "function" == typeof o.then ? o.then((function(o) {
                                t[i] = {
                                    status: "fulfilled",
                                    value: o
                                }, ++n === e.length && r(t)
                            })).catch((function(o) {
                                t[i] = {
                                    status: "rejected",
                                    reason: o
                                }, ++n === e.length && r(t)
                            })) : (t[i] = {
                                status: "fulfilled",
                                value: o
                            }, ++n === e.length && r(t))
                        }, a = 0; a < e.length; a++) o(a)
                }))
            }(e)
        },
        Xi = ["COP", "USD", "DZD", "TWD", "QAR", "VES", "NGN", "EGP", "IDR", "HNL", "ISK", "CRC", "PEN", "AED", "GBP", "BOB", "DKK", "CAD", "PKR", "MXN", "HUF", "VND", "KWD", "RON", "BIF", "MYR", "ZAR", "SAR", "NOK", "SGD", "HKD", "AUD", "CHF", "KRW", "CNY", "TRY", "BDT", "NZD", "CLP", "THB", "EUR", "ARS", "NIO", "KZT", "GTQ", "RUB", "SEK", "MOP", "PYG", "INR", "JPY", "CZK", "BRL", "MAD", "PLN", "PHP", "KES", "ILS"];

    function zi(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            n = t || Xi;
        return n.includes(e)
    }

    function Qi(e) {
        return !isNaN(e) && e >= 0
    }
    var Zi, $i = String.fromCharCode.bind(String),
        eo = Array.prototype.slice.call("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="),
        to = function(e) {
            if (e.length < 2) {
                var t = e.charCodeAt(0);
                return t < 128 ? e : t < 2048 ? $i(192 | t >>> 6) + $i(128 | 63 & t) : $i(224 | t >>> 12 & 15) + $i(128 | t >>> 6 & 63) + $i(128 | 63 & t)
            }
            var n = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
            return $i(240 | n >>> 18 & 7) + $i(128 | n >>> 12 & 63) + $i(128 | n >>> 6 & 63) + $i(128 | 63 & n)
        },
        no = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
        ro = function(e) {
            return function(e) {
                return e.replace(/=/g, "").replace(/[+\/]/g, (function(e) {
                    return "+" === e ? "-" : "_"
                }))
            }(function(e) {
                for (var t, n, r, i, o = "", a = e.length % 3, c = 0; c < e.length;) {
                    if ((n = e.charCodeAt(c++)) > 255 || (r = e.charCodeAt(c++)) > 255 || (i = e.charCodeAt(c++)) > 255) throw new TypeError("invalid character found");
                    o += eo[(t = n << 16 | r << 8 | i) >> 18 & 63] + eo[t >> 12 & 63] + eo[t >> 6 & 63] + eo[63 & t]
                }
                return a ? o.slice(0, a - 3) + "===".substring(a) : o
            }(function(e) {
                return e.replace(no, to)
            }(e)))
        },
        io = function(e) {
            return t = JSON.stringify(e), ro(t);
            var t
        },
        oo = {};

    function ao(e) {
        var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        t && oo["".concat(e)] || (oo["".concat(e)] = {
            start: performance.now()
        })
    }

    function co(e) {
        var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        if (!(t && oo["".concat(e)] && oo["".concat(e)].end)) {
            var n = oo["".concat(e)];
            n && (n.end = performance.now());
            var r = n.end - n.start;
            return Ci(Sr.CUSTOM_TIMER, {
                custom_name: e,
                latency: Math.ceil(1e3 * r)
            }), r
        }
    }! function(e) {
        e.AUTO_CONFIG_CONTENT = "auto_config_content", e.AUTO_CONFIG_FORM = "auto_config_form", e.AUTO_CONFIG_CLICK = "auto_config_click", e.EB_RULE_COMPUTE_TOKENIZE_TEXT = "eb_rule_compute_tokenize_text", e.EB_RULE_COMPUTE_IMG_SRC = "eb_rule_compute_img_src", e.EB_RULE_COMPUTE_ELEMENT_XPATH = "eb_rule_compute_element_xpath", e.EB_PARAMETER_V2 = "eb_parameter_v2", e.EB_PARAMETER_V1 = "eb_parameter_v1"
    }(Zi || (Zi = {}));
    var so = function() {
            var e = Wr();
            return "object" === t(e) && e._i ? e._i : {}
        },
        uo = function(e, t) {
            var n = so() || {};
            Object.keys(n).forEach((function(r) {
                var i = n[r];
                i._init || i.push([e].concat(t))
            }))
        },
        lo = function(e, t, n) {
            var r = (so() || {})[e];
            if (r) {
                if (r._init) return;
                r.push([t].concat(n))
            }
        },
        fo = function(e, t) {
            try {
                var n = Ui(Lr, e, t) || void 0,
                    r = Ui("ext_params", e, t) || void 0,
                    i = Ui(Dr, e, t) || void 0,
                    o = parseInt(Ui("ttuts", e, t), 10) || void 0,
                    a = i ? JSON.parse(i) : {},
                    c = a.log_extra,
                    s = void 0 === c ? void 0 : c,
                    u = a.idc,
                    l = void 0 === u ? void 0 : u,
                    f = a.cid,
                    d = void 0 === f ? void 0 : f;
                return {
                    callback: n,
                    ext_params: r,
                    log_extra: s,
                    creative_id: d,
                    idc: l,
                    ttuts: o,
                    ad_info_from: (s || l || d) && "url"
                }
            } catch (e) {
                return {}
            }
        },
        ho = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        po = function() {
            function e(t) {
                i(this, e), this.userFormatInfo = {}, this.userFormatInfoV2 = {}, this.enableAdTracking = !0, this.offsiteAdInfo = {}, this.tt_test_id = "", this.signalDiagnosticLabels = Object.assign({}, $n), this.init(t)
            }
            return a(e, [{
                key: "init",
                value: function(e) {
                    this.userInfo = {}, this.adInfo = {}, this.appInfo = {}, this.pageInfo = {
                        url: "",
                        referrer: ""
                    }, this.pageSign = {
                        sessionId: "",
                        pageId: ""
                    }, this.libraryInfo = e
                }
            }, {
                key: "getAllData",
                value: function() {
                    return {
                        userInfo: this.userInfo,
                        adInfo: this.adInfo,
                        appInfo: this.appInfo,
                        libraryInfo: this.libraryInfo,
                        pageInfo: this.pageInfo,
                        pageSign: this.pageSign,
                        signalType: this.signalType,
                        userFormatInfo: this.userFormatInfo,
                        userFormatInfoV2: this.userFormatInfoV2,
                        enableAdTracking: this.enableAdTracking,
                        offsiteAdInfo: this.offsiteAdInfo,
                        tt_test_id: this.tt_test_id
                    }
                }
            }, {
                key: "getLibraryInfo",
                value: function() {
                    return this.libraryInfo
                }
            }, {
                key: "setSignalType",
                value: function(e) {
                    this.signalType = e
                }
            }, {
                key: "getSignalType",
                value: function() {
                    return this.signalType
                }
            }, {
                key: "setTestID",
                value: function(e) {
                    this.tt_test_id = e
                }
            }, {
                key: "getTestID",
                value: function() {
                    return this.tt_test_id
                }
            }, {
                key: "setEnableAdTracking",
                value: function(e) {
                    this.enableAdTracking = e
                }
            }, {
                key: "getEnableAdTracking",
                value: function() {
                    return this.enableAdTracking
                }
            }, {
                key: "setOffsiteAdInfo",
                value: function(e) {
                    this.offsiteAdInfo = Object.assign({}, this.offsiteAdInfo, e)
                }
            }, {
                key: "getOffsiteAdInfo",
                value: function() {
                    return this.offsiteAdInfo
                }
            }, {
                key: "getUserFormatInfo",
                value: function() {
                    return this.userFormatInfo
                }
            }, {
                key: "setUserFormatInfo",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    Object.assign(this.userFormatInfo, e)
                }
            }, {
                key: "getUserFormatInfoV2",
                value: function() {
                    return this.userFormatInfoV2
                }
            }, {
                key: "setUserFormatInfoV2",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    Object.assign(this.userFormatInfoV2, e)
                }
            }, {
                key: "setUserInfo",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    Object.assign(this.userInfo, e)
                }
            }, {
                key: "setUserInfoWithoutIdentifyPlugin",
                value: function(e) {
                    e && Object.assign(this.userInfo, e)
                }
            }, {
                key: "getUserInfo",
                value: function() {
                    return this.userInfo
                }
            }, {
                key: "getAdInfo",
                value: function() {
                    return this.adInfo
                }
            }, {
                key: "setAdInfo",
                value: function(e) {
                    e && (this.adInfo ? this.adInfo = Object.assign({}, this.adInfo, e) : this.adInfo = e)
                }
            }, {
                key: "getAppInfo",
                value: function() {
                    return this.appInfo
                }
            }, {
                key: "setAppInfo",
                value: function(e) {
                    e && (this.appInfo = Object.assign({}, this.appInfo, e))
                }
            }, {
                key: "getPageInfo",
                value: function() {
                    return this.pageInfo
                }
            }, {
                key: "getPageSign",
                value: function() {
                    return this.pageSign
                }
            }, {
                key: "setPageInfo",
                value: function(e, t) {
                    var n = Object.assign({}, this.pageInfo),
                        r = Object.assign({}, this.pageSign);
                    if (n.url !== e) {
                        var i = n.url;
                        if (void 0 !== n.url && (n.referrer = n.url), void 0 !== t && (n.referrer = t), void 0 !== r.pageIndex) {
                            var o = r.pageIndex,
                                a = o.index,
                                c = o.sub,
                                s = o.main;
                            r.pageIndex = {
                                index: ++a,
                                sub: ++c,
                                main: s
                            }
                        }
                        return n.url = e, this.pageInfo = n, this.pageSign = r, {
                            from: i,
                            pageIndex: r.pageIndex
                        }
                    }
                }
            }, {
                key: "setPageInfoData",
                value: function(e) {
                    this.pageInfo = Object.assign({}, this.pageInfo, e)
                }
            }, {
                key: "getSessionIdFromCache",
                value: function() {
                    return null
                }
            }, {
                key: "setSessionIdToCache",
                value: function(e) {}
            }, {
                key: "setSignalDiagnosticLabels",
                value: function(e) {
                    Object.assign(this.signalDiagnosticLabels, e)
                }
            }, {
                key: "getSignalDiagnosticLabels",
                value: function() {
                    return this.signalDiagnosticLabels
                }
            }, {
                key: "getPageId",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "".concat(Date.now());
                    return "".concat(e, "-").concat(ei(5))
                }
            }, {
                key: "getPageViewId",
                value: function() {
                    var e = this.pageSign,
                        t = e.pageId,
                        n = e.pageIndex;
                    return "".concat(t).concat(n ? ".".concat(n.main, ".").concat(n.sub) : "")
                }
            }, {
                key: "getVariationId",
                value: function() {
                    return ""
                }
            }, {
                key: "isLegacyPixel",
                value: function(e) {
                    return !1
                }
            }, {
                key: "initPageSign",
                value: function() {
                    var e = this.getSessionIdFromCache();
                    null === e && (e = nr("sessionId"), this.setSessionIdToCache(e));
                    var t = {
                        sessionId: e,
                        pageId: nr("pageId")
                    };
                    this.pageSign = t
                }
            }]), e
        }();
    po = ho([A.injectable()], po);
    var vo = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        _o = function() {
            function e() {
                i(this, e), this.events = {}
            }
            return a(e, [{
                key: "on",
                value: function(e, t) {
                    var n = this.events[e] || [];
                    n.push(t), this.events[e] = n
                }
            }, {
                key: "emit",
                value: function(e) {
                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                    var i = this.events[e] || [];
                    i.forEach((function(e) {
                        return e.apply(void 0, n)
                    }))
                }
            }, {
                key: "off",
                value: function(e, t) {
                    var n = this.events[e] || [];
                    this.events[e] = n.filter((function(e) {
                        return e !== t
                    }))
                }
            }]), e
        }();
    _o = vo([A.injectable()], _o);
    var go = function() {
        function e(t) {
            i(this, e), this.pixelCode = "", this.loaded = !1, this.status = 1, this.name = "", this.advertiserID = "", this.setupMode = 0, this.partner = "", this.reporterInfo = {}, this.plugins = {}, this.options = {}, this.rules = [], this.pixelCode = t
        }
        return a(e, [{
            key: "getParameterInfo",
            value: function() {
                return Promise.resolve({
                    pixelCode: this.pixelCode,
                    name: this.name,
                    status: this.status,
                    setupMode: this.setupMode,
                    advertiserID: this.advertiserID,
                    partner: this.partner,
                    is_onsite: !1,
                    advancedMatchingAvailableProperties: {}
                })
            }
        }, {
            key: "getReporterId",
            value: function() {
                return ""
            }
        }, {
            key: "getReporterUniqueLoadId",
            value: function() {
                return ""
            }
        }, {
            key: "getReporterPartner",
            value: function() {}
        }, {
            key: "getReporterInfo",
            value: function() {
                return {
                    reporter: {}
                }
            }
        }, {
            key: "getReportResultSet",
            value: function() {
                return []
            }
        }, {
            key: "isOnsite",
            value: function() {
                return !1
            }
        }, {
            key: "isPartnerReporter",
            value: function() {
                return !1
            }
        }, {
            key: "setAdvancedMatchingAvailableProperties",
            value: function(e) {}
        }, {
            key: "clearHistory",
            value: function() {}
        }, {
            key: "page",
            value: function(e) {}
        }, {
            key: "track",
            value: function(e, t, n) {
                return Promise.resolve(null)
            }
        }, {
            key: "getUserInfo",
            value: function(e) {
                return {}
            }
        }, {
            key: "getReporterMatchedUserFormatInfo",
            value: function() {
                return {}
            }
        }, {
            key: "getReporterMatchedUserFormatInfoV2",
            value: function() {
                return {}
            }
        }, {
            key: "assemblyData",
            value: function() {
                return {
                    event: "",
                    message_id: "",
                    event_id: "",
                    is_onsite: !1,
                    properties: {},
                    context: {
                        ad: {},
                        device: {},
                        library: {
                            name: "",
                            version: ""
                        },
                        page: {
                            url: ""
                        },
                        pageview_id: "",
                        session_id: "",
                        variation_id: "",
                        user: {}
                    },
                    partner: "",
                    timestamp: ""
                }
            }
        }, {
            key: "assemblySelfHostData",
            value: function() {
                return this.assemblyData()
            }
        }, {
            key: "trackSync",
            value: function() {}
        }, {
            key: "getReportEventHistoryKey",
            value: function(e) {
                return "tiktok"
            }
        }, {
            key: "hasReportEventHistory",
            value: function(e, t) {
                return !1
            }
        }]), e
    }();
    new go("empty");
    var yo = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        mo = function(e) {
            s(n, e);
            var t = h(n);

            function n(e, r) {
                var o;
                return i(this, n), (o = t.call(this)).reporterInfo = {}, o.options = {}, o.plugins = {}, o.rules = [], o.reportEventHistory = {}, o.reportResultSet = [], o.selfHostConfig = {}, o.currentHref = "", o.advancedMatchingAvailableProperties = {
                    external_id: !0
                }, o.reportService = r, o.context = e, o
            }
            return a(n, [{
                key: "getParameterInfo",
                value: function() {
                    var e = this;
                    return this.getInstance().then((function() {
                        var t = e.reporterInfo,
                            n = t.name,
                            r = void 0 === n ? "" : n,
                            i = t.status,
                            o = void 0 === i ? 1 : i,
                            a = t.setupMode,
                            c = void 0 === a ? 0 : a,
                            s = t.advertiserID,
                            u = void 0 === s ? "" : s,
                            l = t.is_onsite,
                            f = void 0 !== l && l;
                        return {
                            pixelCode: e.getReporterId(),
                            name: r,
                            status: o,
                            setupMode: c,
                            advertiserID: u.toString(),
                            partner: e.getReporterPartner() || "",
                            is_onsite: f,
                            advancedMatchingAvailableProperties: e.advancedMatchingAvailableProperties,
                            rules: e.rules
                        }
                    }))
                }
            }, {
                key: "getInstance",
                value: function() {
                    return this.pixelPromise = Promise.resolve(this)
                }
            }, {
                key: "getReporterId",
                value: function() {
                    return ""
                }
            }, {
                key: "getReporterUniqueLoadId",
                value: function() {
                    return "".concat(this.getReporterId())
                }
            }, {
                key: "getReporterPartner",
                value: function() {}
            }, {
                key: "getReporterInfo",
                value: function() {
                    return {
                        pixel: {
                            code: this.getReporterId()
                        }
                    }
                }
            }, {
                key: "setAdvancedMatchingAvailableProperties",
                value: function(e) {
                    this.advancedMatchingAvailableProperties = Object.assign({}, this.advancedMatchingAvailableProperties, e)
                }
            }, {
                key: "isOnsite",
                value: function() {
                    return !1
                }
            }, {
                key: "isPartnerReporter",
                value: function() {
                    return !1
                }
            }, {
                key: "getReportResultSet",
                value: function() {
                    return this.reportResultSet
                }
            }, {
                key: "getUserInfo",
                value: function(e) {
                    return {}
                }
            }, {
                key: "getReporterMatchedUserFormatInfo",
                value: function() {
                    return {}
                }
            }, {
                key: "getReporterMatchedUserFormatInfoV2",
                value: function() {
                    return {}
                }
            }, {
                key: "getReportEventHistoryKey",
                value: function(e) {
                    return "tiktok"
                }
            }, {
                key: "clearHistory",
                value: function() {
                    this.reportEventHistory = {}
                }
            }, {
                key: "pushReport",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "tiktok";
                    this.reportEventHistory[t] || (this.reportEventHistory[t] = []), this.reportEventHistory[t].push(e)
                }
            }, {
                key: "hasReportEventHistory",
                value: function(e, t) {
                    var n = this.getReportEventHistoryKey(t);
                    return this.reportEventHistory[n] ? !(!Ir.includes(e) || !this.reportEventHistory[n].includes(e)) : (this.reportEventHistory[n] = [], !1)
                }
            }, {
                key: "page",
                value: function() {}
            }, {
                key: "track",
                value: function(e, t, n, r, i) {
                    var o = this,
                        a = r || Er.TRACK,
                        c = i || Fn.defaultReport;
                    return !this.reportService || this.hasReportEventHistory(e, c) ? Promise.resolve(null) : (this.pushReport(e, this.getReportEventHistoryKey(c)), qi(this.reportService.reportPreposition || []).then((function() {
                        var r = o.getReporterId(),
                            i = o.trackSync(r, e, t, n, a, c);
                        if (o.trackPostTask({
                                reporterId: r,
                                eventType: e,
                                properties: t,
                                eventConfig: n,
                                type: a,
                                reportType: c,
                                reportData: i
                            }) && i) {
                            var s = {
                                reporterId: r,
                                eventType: e,
                                properties: t,
                                eventConfig: n,
                                type: a,
                                reportType: c,
                                reportData: i
                            };
                            return Promise.resolve(s)
                        }
                        return Promise.resolve(null)
                    })))
                }
            }, {
                key: "getEventType",
                value: function(e) {
                    return e
                }
            }, {
                key: "trackPostTask",
                value: function(e) {
                    return !0
                }
            }, {
                key: "trackSync",
                value: function(e, t, n, r) {
                    var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : Er.TRACK,
                        o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : Fn.defaultReport,
                        a = arguments.length > 6 ? arguments[6] : void 0,
                        c = i !== Er.SELFHOST ? this.assemblyData(e, t, n, r, i) : this.assemblySelfHostData(e, t, n, r, i),
                        s = a || Li(i, e);
                    if (null !== s && this.reportService) return this.emit("beforeReport", e, t, c, r, i), this.reportResultSet.push(this.reportService.report(s, c, o)), c
                }
            }, {
                key: "handlePropertiesToOptions",
                value: function(e, t) {
                    var n = {};
                    return t.forEach((function(t) {
                        n[t] = e[t], delete e[t]
                    })), n
                }
            }, {
                key: "assemblyData",
                value: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                    arguments.length > 4 && void 0 !== arguments[4] || Er.TRACK;
                    var i = this.context.getAllData(),
                        o = i.adInfo,
                        a = i.userInfo,
                        c = i.appInfo,
                        s = i.pageSign,
                        u = i.libraryInfo,
                        l = i.pageInfo,
                        f = i.signalType,
                        d = s.sessionId,
                        h = s.variationId,
                        p = Object.assign({}, n),
                        v = p && p.pixelMethod || "";
                    p && p.pixelMethod && delete p.pixelMethod;
                    var _ = Object.assign({}, u, {
                            version: this.context.isLegacyPixel(e) ? "legacy-".concat(u.version) : u.version
                        }),
                        g = ti(o, Xn),
                        y = Object.assign({}, g, {
                            device_id: c.device_id,
                            uid: c.user_id
                        }),
                        m = this.handlePropertiesToOptions(p, [Bn.LDU, Bn.EVENTID, Bn.EVENT_ID]),
                        E = this.options.limited_data_use,
                        b = null !== m.limited_data_use && void 0 !== m.limited_data_use ? m.limited_data_use : E;
                    null == b ? delete m.limited_data_use : m.limited_data_use = !!b;
                    var T = r && (r.event_id || r.eventID) || "";
                    m.event_id = T || m.event_id || m.eventID || "", delete m.eventID;
                    var I = this.getReporterInfo();
                    I.pixel && (I.pixel.runtime = Ni(), v && (I.pixel.mode = v));
                    var O = this.getUserInfo(Jn.Manual) || {},
                        S = this.getUserInfo(Jn.ManualV2) || {},
                        N = this.getReporterMatchedUserFormatInfoV2() || {},
                        R = this.getUserInfo(Jn.Auto) || {};
                    R.auto_trigger_type && (Object.assign(p, {
                        auto_trigger_type: R.auto_trigger_type
                    }), delete R.auto_trigger_type), bi() && Object.assign(p, {
                        android_version: c.android_version,
                        device_model: c.device_model
                    });
                    var A = {};
                    a.anonymous_id && (A.anonymous_id = a.anonymous_id);
                    var P = this.getEventType(t),
                        C = {
                            event: P,
                            event_id: T,
                            message_id: rr(nr(vr), e),
                            is_onsite: !!f,
                            timestamp: (new Date).toJSON(),
                            context: Object.assign(Object.assign({
                                ad: y,
                                device: {
                                    platform: c.platform
                                },
                                user: Object.assign({}, A, O, S, R)
                            }, I), {
                                page: Object.assign({}, l),
                                library: Object.assign({}, _),
                                session_id: rr(d, e),
                                pageview_id: rr(this.context.getPageViewId(), this.getReporterUniqueLoadId(), mr),
                                variation_id: h || ""
                            }),
                            _inspection: N,
                            properties: p
                        };
                    return Object.assign(C, m)
                }
            }, {
                key: "assemblySelfHostData",
                value: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        i = arguments.length > 4 ? arguments[4] : void 0;
                    return this.assemblyData(e, t, n, r, i)
                }
            }]), n
        }(_o);
    mo = yo([A.injectable()], mo);
    var Eo = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        bo = function() {
            function e(t) {
                var n = t.name,
                    r = t.context,
                    o = t.reporters;
                i(this, e), this.reporters = [], this.context = r, this.reporters = o, this.name = n
            }
            return a(e, [{
                key: "initStart",
                value: function() {}
            }, {
                key: "initEnd",
                value: function() {}
            }, {
                key: "adInfoInitStart",
                value: function() {}
            }, {
                key: "adInfoInitEnd",
                value: function() {}
            }, {
                key: "contextInitStart",
                value: function() {}
            }, {
                key: "contextInitEnd",
                value: function() {}
            }, {
                key: "pageUrlWillChange",
                value: function(e, t) {}
            }, {
                key: "pageUrlDidChange",
                value: function(e, t) {}
            }, {
                key: "pageDidLoad",
                value: function() {}
            }, {
                key: "pageWillLeave",
                value: function(e) {}
            }, {
                key: "pixelSend",
                value: function(e, t, n, r, i) {}
            }, {
                key: "pixelDidMount",
                value: function(e) {}
            }]), e
        }(),
        To = function(e) {
            s(n, e);
            var t = h(n);

            function n() {
                return i(this, n), t.apply(this, arguments)
            }
            return a(n)
        }(bo = Eo([A.injectable()], bo)),
        Io = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        Oo = function() {
            function e(t, n) {
                i(this, e), this.initialize = !1, this.plugins = [], this.observers = [], this.reporters = [], this.context = t, this.reportService = n
            }
            return a(e, [{
                key: "init",
                value: function(e) {
                    this.initContextInfo(e), this.initialize = !0
                }
            }, {
                key: "initContextInfo",
                value: function(e) {
                    var t = this;
                    this.dispatch(sr.CONTEXT_INIT_START);
                    var n = e && e.href ? e.href : "";
                    Ri() || this.initAdInfo(n), this.initAppInfo(n), this.reportService.pushPreposition(Promise.resolve().then((function() {
                        return t.initUserInfo()
                    }))), this.initTestId(n), this.dispatch(sr.CONTEXT_INIT_END)
                }
            }, {
                key: "setPageIndex",
                value: function(e) {}
            }, {
                key: "setPageInfo",
                value: function(e, t) {
                    var n = this.context.getPageInfo();
                    if (n.url !== e) {
                        this.dispatch(sr.PAGE_URL_WILL_CHANGE, n.url, e);
                        var r = this.context.setPageInfo(e, t);
                        r && (r.pageIndex && this.setPageIndex(r.pageIndex), this.dispatch(sr.PAGE_URL_DID_CHANGE, e, r.from || ""))
                    }
                }
            }, {
                key: "initAdInfo",
                value: function(e) {}
            }, {
                key: "initOffsiteAdInfo",
                value: function(e) {}
            }, {
                key: "initAppInfo",
                value: function(e) {}
            }, {
                key: "initUserInfo",
                value: function() {}
            }, {
                key: "initTestId",
                value: function(e) {}
            }, {
                key: "usePlugin",
                value: function(e) {
                    try {
                        if (!this.plugins.find((function(t) {
                                return t.name === e.name
                            }))) {
                            this.plugins.push(e);
                            var t = e.name;
                            if (t) this["".concat(t[0].toLowerCase() + t.slice(1), "Plugin")] = e
                        }
                    } catch (e) {}
                }
            }, {
                key: "useObserver",
                value: function(e) {
                    try {
                        if (!this.observers.find((function(t) {
                                return t.name === e.name
                            }))) {
                            this.observers.push(e);
                            var t = e.name;
                            if (t) this["".concat(t[0].toLowerCase() + t.slice(1))] = e
                        }
                    } catch (e) {}
                }
            }, {
                key: "getPlugin",
                value: function(e) {
                    return this.plugins.find((function(t) {
                        return t.name === e
                    })) || null
                }
            }, {
                key: "getReporter",
                value: function(e) {
                    return this.reporters.find((function(t) {
                        return t.getReporterId() === e
                    }))
                }
            }, {
                key: "instance",
                value: function(e) {
                    var t = this.getReporter(e);
                    return t || (wi(Sr.PIXEL_EMPTY, new Error(""), {
                        pixelCode: e
                    }), new go(e))
                }
            }, {
                key: "instances",
                value: function() {
                    return this.reporters
                }
            }, {
                key: "identify",
                value: function(e, t) {
                    var n = fi(e, t);
                    this.context.setUserInfo(n)
                }
            }, {
                key: "page",
                value: function(e) {
                    e.url !== this.context.getPageInfo().url && (this.setPageInfo(e.url, e.referrer), this.reporters.forEach((function(e) {
                        e.clearHistory()
                    })));
                    var t = Object.assign({}, e);
                    delete t.url, delete t.referrer, this.reporters.forEach((function(e) {
                        e.page(t)
                    }))
                }
            }, {
                key: "isOnsitePage",
                value: function() {
                    return this.context.getSignalType() === cr.ONSITE || this.reporters.every((function(e) {
                        return e.isOnsite()
                    }))
                }
            }, {
                key: "track",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    this.instances().forEach((function(r, i) {
                        r.track(e, t, Object.assign({
                            _i: i
                        }, n))
                    }))
                }
            }, {
                key: "dispatch",
                value: function(e) {
                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                    var i = this.plugins.concat(this.observers);
                    i.forEach((function(t) {
                        if ("function" == typeof t[e]) try {
                            t[e].apply(t, n)
                        } catch (r) {
                            wi(Sr.PLUGIN_ERROR, r, {
                                extJSON: {
                                    plugin_name: t.name,
                                    cycle_name: e,
                                    data: n
                                }
                            })
                        }
                    }))
                }
            }, {
                key: "getAllReportResultSet",
                value: function() {
                    return this.instances().reduce((function(e, t) {
                        return e.concat(t.getReportResultSet())
                    }), [])
                }
            }, {
                key: "resetCookieExpires",
                value: function() {}
            }, {
                key: "enableCookie",
                value: function() {}
            }, {
                key: "disableCookie",
                value: function() {}
            }, {
                key: "enableFirstPartyCookie",
                value: function(e) {}
            }, {
                key: "holdConsent",
                value: function() {}
            }, {
                key: "revokeConsent",
                value: function() {}
            }, {
                key: "grantConsent",
                value: function() {}
            }]), e
        }();
    Oo = Io([A.injectable()], Oo);
    var So = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        No = function() {
            function t(e, n) {
                i(this, t), this.reportPreposition = [], this.httpService = e, this.bridgeService = n
            }
            var n;
            return a(t, [{
                key: "pushPreposition",
                value: function(e) {
                    this.reportPreposition.push(e)
                }
            }, {
                key: "report",
                value: (n = r(e().mark((function t(n, r, i) {
                    return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.abrupt("return", Promise.resolve());
                            case 1:
                            case "end":
                                return e.stop()
                        }
                    }), t)
                }))), function(e, t, r) {
                    return n.apply(this, arguments)
                })
            }]), t
        }();
    No = So([A.injectable()], No);
    var Ro, Ao = function(e) {
        s(n, e);
        var t = h(n);

        function n(e) {
            var r;
            return i(this, n), (r = t.call(this, e)).observers = new Set([]), r
        }
        return a(n, [{
            key: "addObserver",
            value: function(e) {
                this.observers.add(e)
            }
        }, {
            key: "removeObserver",
            value: function(e) {
                this.observers.delete(e)
            }
        }, {
            key: "notifyObservers",
            value: function(e, t) {
                this.observers.forEach((function(n) {
                    return n.call(t, e)
                }))
            }
        }]), n
    }(bo);
    ! function(e) {
        e[e.Live = 0] = "Live", e[e.NoRecord = 1] = "NoRecord"
    }(Ro || (Ro = {}));
    var Po, Co = function(e, t, n) {
            e.isBound(t) ? e.rebind(t).toConstantValue(n) : e.bind(t).toConstantValue(n)
        },
        wo = function(e, t) {
            var n = t.id,
                r = t.type,
                i = void 0 === r ? Zn.PIXEL_CODE : r,
                o = t.info,
                a = t.options,
                s = void 0 === a ? {} : a,
                u = t.plugins,
                l = void 0 === u ? {} : u,
                f = t.rules,
                d = void 0 === f ? [] : f,
                h = e.get(Or.TTQ),
                p = e.get(Or.TTQ_REPORTERS);
            if (!p.some((function(e) {
                    return e.getReporterId() === n
                }))) {
                Co(e, br.ID, n), Co(e, br.Type, i), Co(e, br.Info, o || c({}, i, n)), Co(e, br.Options, s), Co(e, br.Plugins, l), Co(e, br.Rules, d), h.enableFirstPartyCookie((null == o ? void 0 : o.firstPartyCookieEnabled) || !1);
                var v = e.get(Or.REPORTER);
                if (l) {
                    var _ = l.AdvancedMatching,
                        g = l.AutoAdvancedMatching,
                        y = {};
                    _ && Object.assign(y, _), g && Object.assign(y, g), v.setAdvancedMatchingAvailableProperties(y)
                }
                return v.on("beforeReport", (function(e, t, n, r, i) {
                    h.dispatch(sr.PIXEL_SEND, e, t, n, r, i)
                })), p.push(v), e.rebind(Or.TTQ_REPORTERS).toConstantValue(p), h.dispatch(sr.PIXEL_DID_MOUNT, v), v
            }
        },
        ko = function(e, t) {
            var n = e.get(Or.TTQ_GLOBAL_OPTIONS) || {};
            ! function(e, t) {
                var n = e || {},
                    r = n._partner,
                    i = n._ttp,
                    o = n._self_host_config,
                    a = n._usd_exchange_rate,
                    c = n._legacy,
                    s = n._cc,
                    u = n._variation_id,
                    l = n._server_unique_id,
                    f = n._currency_list,
                    d = n._plugins,
                    h = n._aam,
                    p = n._auto_config;
                Object.assign(t, {
                    partner: r,
                    ttp: i,
                    cc: s,
                    self_host_config: o,
                    usd_exchange_rate: a,
                    legacy: c,
                    variation_id: u,
                    server_unqiue_id: l,
                    currency_list: f,
                    plugins: d,
                    aam: h,
                    auto_config: p
                })
            }(t, n), e.isBound(Or.TTQ_GLOBAL_OPTIONS) ? e.rebind(Or.TTQ_GLOBAL_OPTIONS).toConstantValue(n) : e.bind(Or.TTQ_GLOBAL_OPTIONS).toConstantValue(n)
        },
        Mo = function(e) {
            var t = Gr(),
                n = Jr(),
                r = Wr(),
                i = Mi().pixelCode,
                o = void 0 === i ? "" : i,
                a = ["holdConsent", "revokeConsent", "grantConsent"];
            ["instance", "instances", "loadPixel", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"].forEach((function(t) {
                    Object.defineProperty(r, t, {
                        get: function() {
                            return function() {
                                try {
                                    var n = Array.prototype.slice.call(arguments);
                                    return a.indexOf(t) > -1 && setTimeout((function() {
                                        Ci(Sr.CUSTOM_INFO, {
                                            pixelCode: o,
                                            custom_name: t,
                                            custom_enum: JSON.stringify(n)
                                        })
                                    })), e[t].apply(e, n)
                                } catch (e) {
                                    return wi(Sr.API_ERROR, e, {
                                        extJSON: {
                                            api: t
                                        }
                                    }), {}
                                }
                            }
                        },
                        set: function() {}
                    })
                })), ["page", "track", "identify"].forEach((function(t) {
                    Object.defineProperty(r, t, {
                        get: function() {
                            return function() {
                                try {
                                    var n = 1 === arguments.length && void 0 === arguments[0] ? [] : Array.prototype.slice.call(arguments);
                                    return a.indexOf(t) > -1 && setTimeout((function() {
                                        var e = JSON.stringify(n.map((function(e) {
                                            return er(e) ? Object.keys(e) : e
                                        })));
                                        Ci(Sr.CUSTOM_INFO, {
                                            pixelCode: o,
                                            custom_name: t,
                                            custom_enum: e
                                        })
                                    })), uo(t, n), e[t].apply(e, n)
                                } catch (e) {
                                    return wi(Sr.API_ERROR, e, {
                                        extJSON: {
                                            api: t
                                        }
                                    }), {}
                                }
                            }
                        },
                        set: function() {}
                    })
                })), t[n]._mounted = !0, t[n].initialize = !0,
                function(e) {
                    Vr = e
                }(t[n])
        },
        Lo = function(e, t, n) {
            var r = Wr(),
                i = function() {
                    var e = Wr();
                    return e && e._i || {}
                }();
            if (Object.entries(i).forEach((function(r) {
                    var i = _(r, 2),
                        o = i[0],
                        a = i[1];
                    if (!a._init && ("Tealium" === Xr() || Kr() || a.info)) {
                        if (t.getReporter(o)) ki(Nr.DUPLICATE_PIXEL_CODE);
                        else(n || wo)(e, {
                            id: o,
                            type: Zn.PIXEL_CODE,
                            info: a.info,
                            options: a.options,
                            rules: a.rules,
                            plugins: a.plugins
                        });
                        if (a._init = !0, a.length > 0)
                            for (; a.length;) {
                                var c = a.shift();
                                if (c) {
                                    var s = g(c),
                                        u = s[0],
                                        l = s.slice(1),
                                        f = t.instance(o);
                                    if (f) switch (u) {
                                        case "identify":
                                            t.identify(l[0], l[1]);
                                            break;
                                        case "page":
                                            t.page(l[0]);
                                            break;
                                        case "track":
                                            f.track(l[0], l[1], l[2] || {});
                                            break;
                                        default:
                                            f[u] ? f[u](l[0], l[1], l[2] || {}) : wi(Sr.CUSTOM_ERROR, new Error("action not find: ".concat(f[u])))
                                    }
                                }
                            }
                    }
                })), r.length > 0)
                for (; r.length;) {
                    var o = r.shift();
                    if (o) {
                        var a = g(o),
                            c = a[0],
                            s = a.slice(1);
                        switch ("Tealium" !== Xr() && uo(c, s), c) {
                            case "identify":
                                t.identify(s[0], s[1]);
                                break;
                            case "page":
                                t.page(s[0]);
                                break;
                            case "track":
                                t.track(s[0], s[1], s[2] || {});
                                break;
                            case "enableCookie":
                                t.enableCookie();
                                break;
                            case "disableCookie":
                                t.disableCookie();
                                break;
                            case "holdConsent":
                                t.holdConsent();
                                break;
                            case "revokeConsent":
                                t.revokeConsent();
                                break;
                            case "grantConsent":
                                t.grantConsent()
                        }
                    }
                }
        },
        Do = {
            ViewForm: "ViewContent",
            ViewConsultationPage: "ViewContent",
            ViewDownloadPage: "ViewContent",
            Checkout: "PlaceAnOrder",
            Purchase: "CompletePayment",
            Registration: "CompleteRegistration",
            AddBilling: "AddPaymentInfo",
            StartCheckout: "InitiateCheckout",
            ClickInDownloadPage: "ClickButton",
            ClickInConsultationPage: "ClickButton",
            ClickForm: "ClickButton",
            ClickToDownload: "Download",
            Consult: "Contact",
            ConsultByPhone: "Contact"
        },
        xo = ["event_experiment", "dynamic_parameter_config", "eb_version"],
        jo = function(e) {
            var t;
            return e.context.ad = {}, Object.keys((null === (t = null == e ? void 0 : e.context) || void 0 === t ? void 0 : t.user) || {}).forEach((function(t) {
                e.context.user[t] = ""
            })), e
        },
        Uo = function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return e.forEach((function(e) {
                t.hasOwnProperty(e) && (n[e] = t[e], delete t[e])
            })), n
        },
        Bo = function(e) {
            s(r, e);
            var n = h(r);

            function r(e) {
                var t;
                i(this, r);
                var o = e.id,
                    a = e.type,
                    s = e.isOnsitePage,
                    u = e.context,
                    l = e.reporterInfo,
                    f = e.ttqOptions,
                    d = e.reportService,
                    h = e.plugins,
                    p = void 0 === h ? {} : h,
                    v = e.rules,
                    _ = void 0 === v ? [] : v,
                    g = e.options,
                    y = void 0 === g ? {} : g;
                return (t = n.call(this, u, d)).ttp = "", t.loaded = !1, t.id = o, t.pixelCode = o, t.type = a, t.isOnsitePage = s, t.options = y || {}, t.plugins = p || {}, t.rules = _ || [], t.reporterInfo = Object.assign(l || {}, c({}, a, o)), t.ttp = f.ttp || "", t.currency_list = f.currency_list || null, t.ttqPartner = f.partner || "", t.selfHostConfig = f.self_host_config || {}, t.pixelPromise = t.getInstance(), t
            }
            return a(r, [{
                key: "identify",
                value: function(e, t) {
                    var n = fi(e, t);
                    this.context.setUserInfo(n)
                }
            }, {
                key: "getReporterId",
                value: function() {
                    return this.id || ""
                }
            }, {
                key: "getReporterUniqueLoadId",
                value: function() {
                    return "".concat(this.reporterInfo.loadId, "-").concat(this.getReporterId())
                }
            }, {
                key: "getReporterPartner",
                value: function() {
                    var e;
                    return (null === (e = this.reporterInfo) || void 0 === e ? void 0 : e.partner) || ""
                }
            }, {
                key: "setPixelInfo",
                value: function(e, t, n) {
                    var r = this.type;
                    this.reporterInfo = Object.assign(this.reporterInfo, Object.assign({}, e), c({}, r, this.getReporterId())), t && (this.rules = t), n && (this.plugins = n)
                }
            }, {
                key: "getInstance",
                value: function() {
                    return Promise.resolve(this)
                }
            }, {
                key: "getReporterInfo",
                value: function() {
                    return this.reporterInfo.pixelCode ? v(u(r.prototype), "getReporterInfo", this).call(this) : {
                        shop_id: this.reporterInfo.shopId,
                        eventSourceId: this.reporterInfo.eventSourceId
                    }
                }
            }, {
                key: "getUserInfo",
                value: function(e) {
                    var t = this.context.getUserInfo(),
                        n = ni(t, Object.assign({}, this.advancedMatchingAvailableProperties));
                    switch (e) {
                        case Jn.Manual:
                            return ni(this.isPartnerReporter() ? n : t, {
                                external_id: !0,
                                email: !0,
                                phone_number: !0
                            });
                        case Jn.ManualV2:
                            return ni(n, {
                                first_name: !0,
                                last_name: !0,
                                city: !0,
                                state: !0,
                                country: !0,
                                zip_code: !0
                            });
                        case Jn.Auto:
                            var r = ni(n, {
                                external_id: !0,
                                auto_email: !0,
                                auto_phone_number: !0
                            });
                            return Object.assign(r, (r.auto_email || r.auto_phone_number) && t.auto_trigger_type ? {
                                auto_trigger_type: t.auto_trigger_type
                            } : {});
                        default:
                            return n
                    }
                }
            }, {
                key: "getReporterMatchedUserFormatInfo",
                value: function() {
                    var e = this.context.getUserFormatInfo(),
                        t = function(e, t) {
                            var n = {
                                identity_params: {}
                            };
                            return 0 === Object.keys(e).length ? {} : (Object.entries(t).forEach((function(t) {
                                var r = _(t, 2),
                                    i = r[0];
                                if (r[1])
                                    if (e[i] && e[i].length) {
                                        var o = e[i] || [Vn.EMPTY_VALUE];
                                        n.identity_params[i] = y(o)
                                    } else n.identity_params[i] = [Vn.EMPTY_VALUE]
                            })), n)
                        }(e, this.isPartnerReporter() ? this.advancedMatchingAvailableProperties : {
                            external_id: !0,
                            email: !0,
                            phone_number: !0
                        }),
                        n = ni(e, {
                            auto_email: !0,
                            auto_phone_number: !0
                        });
                    return Object.keys(n).length > 0 && (t.identity_params || (t.identity_params = {}), Object.assign(t.identity_params, n)), t
                }
            }, {
                key: "getReporterMatchedUserFormatInfoV2",
                value: function() {
                    var e, t = this.context.getUserFormatInfoV2(),
                        n = this.isPartnerReporter() ? this.advancedMatchingAvailableProperties : {
                            external_id: !0,
                            email: !0,
                            phone_number: !0
                        };
                    return n.zip_code = (null === (e = this.advancedMatchingAvailableProperties) || void 0 === e ? void 0 : e.zip_code) || !1,
                        function(e, t) {
                            if (0 === Object.keys(e).length) return {};
                            var n = {
                                    identity_params: {}
                                },
                                r = {
                                    email: ["email_is_hashed", "sha256_email"],
                                    phone_number: ["phone_is_hashed", "sha256_phone"],
                                    zip_code: ["zip_code"]
                                };
                            return Object.entries(t).forEach((function(t) {
                                var i = _(t, 2),
                                    o = i[0];
                                i[1] && r[o] && r[o].forEach((function(t) {
                                    if (n.identity_params[t] = [Vn.EMPTY_VALUE], e[t]) {
                                        var r = e[t] || [Vn.EMPTY_VALUE];
                                        n.identity_params && (n.identity_params[t] = y(r))
                                    }
                                }))
                            })), n
                        }(t, n)
                }
            }, {
                key: "isOnsite",
                value: function() {
                    var e;
                    return !!(null === (e = this.reporterInfo) || void 0 === e ? void 0 : e.is_onsite)
                }
            }, {
                key: "isPartnerReporter",
                value: function() {
                    var e = this.getReporterPartner();
                    return !(!e || "None" === e)
                }
            }, {
                key: "getSignalDiagnosticLabels",
                value: function() {
                    var e = this.context.getSignalDiagnosticLabels();
                    if (!e) return Object.assign({}, $n);
                    var t = this.advancedMatchingAvailableProperties,
                        n = t.email,
                        r = t.phone_number,
                        i = t.auto_email,
                        o = t.auto_phone_number;
                    n = !this.isPartnerReporter() || n, r = !this.isPartnerReporter() || r;
                    var a = ni(e, {
                        raw_email: n,
                        raw_phone: r,
                        hashed_email: n,
                        hashed_phone: r,
                        raw_auto_email: i,
                        raw_auto_phone: o
                    });
                    return Object.assign({}, $n, a)
                }
            }, {
                key: "assemblyData",
                value: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : Er.TRACK,
                        a = v(u(r.prototype), "assemblyData", this).call(this, e, t, n, i, o);
                    a.is_onsite = this.isOnsitePage.value;
                    var c = this.ttqPartner;
                    c && (a.partner = c), a.signal_diagnostic_labels = this.getSignalDiagnosticLabels();
                    var s = Yr();
                    s && (a.context.userAgent = s);
                    var l = Wi();
                    return l && (a.context.page.load_progress = l), a._inspection = Uo(xo, a.properties, a._inspection), a.context.ad.sdk_env = vi(), a.context.ad.jsb_status = Si(), o !== Er.INTERACTION && o !== Er.PERFORMANCE && o !== Er.PERFORMANCE_INTERACTION || !1 !== this.context.getEnableAdTracking() || this.isOnsitePage.value || (a.context.user = {}, a.context.ad = this.context.getOffsiteAdInfo(), a.context.ad = ti(a.context.ad, Xn)), a
                }
            }, {
                key: "page",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    window.location.href !== this.currentHref && (this.currentHref = window.location.href, this.track(Tr, e, {}))
                }
            }, {
                key: "track",
                value: function(e) {
                    var t = this,
                        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : Er.TRACK,
                        a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : Fn.defaultReport;
                    return i && i.pixel_code && this.getReporterId() !== i.pixel_code ? Promise.resolve(null) : this.getInstance().then((function() {
                        var c = t.getReporterId();
                        if (Rr.includes(e)) return v(u(r.prototype), "track", t).call(t, e, n, i, o, a);
                        var s = Object.assign({}, i);
                        return t.selfHostConfig[c] && !i.eventID && (s = Object.assign({}, s, {
                            eventID: rr(nr(yr), c)
                        })), v(u(r.prototype), "track", t).call(t, e, n, s, o, a)
                    }))
                }
            }, {
                key: "getEventType",
                value: function(e) {
                    return Do[e] || e
                }
            }, {
                key: "trackSync",
                value: function(e, n) {
                    var i, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        c = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : Er.TRACK,
                        s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : Fn.defaultReport,
                        l = arguments.length > 6 ? arguments[6] : void 0;
                    if ("track" === c && Ci(Sr.PIXEL_SEND, {
                            pixelCode: e,
                            extJSON: {
                                event: n
                            }
                        }), c === Er.TRACK) {
                        o && "string" == typeof o.currency && (o.currency = o.currency.toUpperCase());
                        var f = this.context.getTestID();
                        if (f) {
                            var d = this.assemblyData(e, n, o, a);
                            d.tt_test_id = f;
                            var h = jo(d);
                            return null === (i = null == this ? void 0 : this.reportService) || void 0 === i || i.report(l || Pr, h, Fn.httpReport), h
                        }
                        if (o && "object" === t(o)) {
                            var p = o.value,
                                _ = o.currency;
                            void 0 === p || Qi(p) || Ci(Sr.CUSTOM_ERROR, {
                                pixelCode: e,
                                custom_name: "invalid_value",
                                extJSON: {
                                    event: n,
                                    value: p,
                                    currency: _
                                }
                            }), void 0 === _ || zi(_, this.currency_list) || Ci(Sr.CUSTOM_ERROR, {
                                pixelCode: e,
                                custom_name: "invalid_currency",
                                extJSON: {
                                    event: n,
                                    value: p,
                                    currency: _
                                }
                            })
                        }
                        return v(u(r.prototype), "trackSync", this).call(this, e, n, o, a, c, s, l)
                    }
                    v(u(r.prototype), "trackSync", this).call(this, e, n, o, a, c, s, l)
                }
            }, {
                key: "trackPostTask",
                value: function(e) {
                    var t = e.reporterId,
                        n = e.eventType,
                        r = e.properties,
                        i = e.eventConfig;
                    return !Rr.includes(n) && (this.selfHostConfig[t] && !this.hasReportEventHistory(n, Fn.htmlHttpReport) && (this.pushReport(n, this.getReportEventHistoryKey(Fn.htmlHttpReport)), this.trackSync(t, n, r, i, Er.SELFHOST, Fn.htmlHttpReport)), !0)
                }
            }, {
                key: "getReportEventHistoryKey",
                value: function(e) {
                    return e === Fn.htmlHttpReport ? this.selfHostConfig[this.getReporterId()] : "tiktok"
                }
            }, {
                key: "assemblySelfHostData",
                value: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        i = arguments.length > 4 ? arguments[4] : void 0,
                        o = this.assemblyData(e, t, n, r, i),
                        a = this.ttp;
                    return a && (o.context.user.ttp = a), o
                }
            }]), r
        }(mo),
        Fo = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        Ho = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        Vo = function(e) {
            s(n, e);
            var t = h(n);

            function n(e, r, o, a, c, s, u, l, f, d) {
                return i(this, n), t.call(this, {
                    id: e,
                    type: r,
                    isOnsitePage: o,
                    context: a,
                    reporterInfo: c,
                    ttqOptions: s,
                    reportService: u,
                    plugins: l,
                    rules: f,
                    options: d
                })
            }
            return a(n, [{
                key: "getInstance",
                value: function() {
                    var e = this;
                    if (this.pixelPromise) return this.pixelPromise;
                    var t = function(e) {
                        return so()[e] || {}
                    }(this.id);
                    return Kr() || t && t.info ? (this.loaded = !0, this.pixelPromise = Promise.resolve(this)) : (this.pixelPromise = new Promise((function(t, n) {
                        var r, i;
                        Yi((r = e.id, i = location && location.hostname, "".concat("https://analytics.tiktok.com/i18n/pixel/config.js", "?sdkid=").concat(r, "&hostname=").concat(i))).then((function() {
                            e.loaded = !0, t(e)
                        })).catch((function(t) {
                            e.pixelPromise = null, n(t)
                        }))
                    })), this.pixelPromise)
                }
            }]), n
        }(Bo),
        Go = function(e) {
            s(n, e);
            var t = h(n);

            function n() {
                return i(this, n), t.apply(this, arguments)
            }
            return a(n, [{
                key: "getInstance",
                value: function() {
                    return this.pixelPromise = Promise.resolve(this), this.pixelPromise
                }
            }, {
                key: "track",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    return lo(this.getReporterId(), "track", [e, t, n]), Promise.resolve(null)
                }
            }]), n
        }(Vo = Fo([A.injectable(), Ho(0, A.inject(br.ID)), Ho(1, A.inject(br.Type)), Ho(2, A.inject(br.IsOnsitePage)), Ho(3, A.inject(Or.CONTEXT)), Ho(4, A.inject(br.Info)), Ho(5, A.inject(Or.TTQ_GLOBAL_OPTIONS)), Ho(6, A.inject(Or.REPORT_SERVICE)), Ho(6, A.optional()), Ho(7, A.inject(br.Plugins)), Ho(7, A.optional()), Ho(8, A.inject(br.Rules)), Ho(8, A.optional()), Ho(9, A.inject(br.Options)), Ho(9, A.optional())], Vo)),
        Jo = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        Wo = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        Ko = function(t) {
            s(c, t);
            var n, o = h(c);

            function c(e, t, n, r, a, s, u, l, f, d, h, p, v, _, g, y, m, E, b, T, I, O, S) {
                var N;
                return i(this, c), (N = o.call(this, e, a)).env = l, N.reporters = t, N.cookieService = s, N.consentService = u, N.adService = n, N.appService = r, N.historyObserver = S, N.autoAdvancedMatchingPlugin = d, N.callbackPlugin = h, N.identifyPlugin = p, N.monitorPlugin = f, N.performanceInteractionPlugin = v, N.webFLPlugin = _, N.shopifyPlugin = g, N.autoConfigPlugin = y, N.diagnosticsConsolePlugin = m, N.competitorInsightPlugin = E, N.pangleCookieMatchingPlugin = b, N.eventBuilderPlugin = T, N.pagedataPlugin = O, N.enrichIpv6Plugin = I, N.enrichIpv6Plugin = I, N.historyObserver && N.useObserver(N.historyObserver), N.autoAdvancedMatchingPlugin && N.usePlugin(N.autoAdvancedMatchingPlugin), N.callbackPlugin && N.usePlugin(N.callbackPlugin), N.identifyPlugin && N.usePlugin(N.identifyPlugin), N.monitorPlugin && N.usePlugin(N.monitorPlugin), N.performanceInteractionPlugin && N.usePlugin(N.performanceInteractionPlugin), N.webFLPlugin && N.usePlugin(N.webFLPlugin), N.shopifyPlugin && N.usePlugin(N.shopifyPlugin), N.autoConfigPlugin && N.usePlugin(N.autoConfigPlugin), N.diagnosticsConsolePlugin && N.usePlugin(N.diagnosticsConsolePlugin), N.competitorInsightPlugin && N.usePlugin(N.competitorInsightPlugin), N.pangleCookieMatchingPlugin && N.usePlugin(N.pangleCookieMatchingPlugin), N.eventBuilderPlugin && N.usePlugin(N.eventBuilderPlugin), N.enrichIpv6Plugin && N.usePlugin(N.enrichIpv6Plugin), N.monitorPlugin && (Pi.info.forEach((function(e) {
                    var t;
                    null === (t = N.monitorPlugin) || void 0 === t || t.info(e.event, e.detail, e.withoutJSB)
                })), Pi.error.forEach((function(e) {
                    var t;
                    null === (t = N.monitorPlugin) || void 0 === t || t.error(e.event, e.err, e.detail, e.withoutJSB)
                })), Pi.info = [], Pi.error = []), N.dispatch(sr.INIT_START), N.pagedataPlugin && N.usePlugin(N.pagedataPlugin), N.onPageLoaded(), N.onPageLeave(), N.init(window.location), N.setPageInfo(location.href, document.referrer), N.dispatch(sr.INIT_END), N
            }
            return a(c, [{
                key: "initAdInfo",
                value: function(e) {
                    var t = Di(fr);
                    this.dispatch(sr.BEFORE_AD_INFO_INIT_START), t ? this.initAdCache(t) : this.initBaseAdInfo(e)
                }
            }, {
                key: "initAdCache",
                value: function(e) {
                    this.dispatch(sr.AD_INFO_INIT_START), e.ad_info_from = "cache", e.ad_info_status = "fulfilled(cache)", this.setAdInfo(e), this.initOffsiteAdInfo(e)
                }
            }, {
                key: "initBaseAdInfo",
                value: function(t) {
                    var n = this;
                    this.adService.webBridgeService.jsbridge && this.dispatch(sr.AD_INFO_INIT_START), this.reportService.pushPreposition(r(e().mark((function r() {
                        var i;
                        return e().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0, e.next = 3, n.adService.getAdInfo(t);
                                case 3:
                                    i = e.sent, n.context.setAdInfo(i), n.initOffsiteAdInfo(i), e.next = 11;
                                    break;
                                case 8:
                                    e.prev = 8, e.t0 = e.catch(0), wi(Sr.INIT_ERROR, e.t0, {
                                        extJSON: {
                                            position: "initAdInfo"
                                        }
                                    });
                                case 11:
                                case "end":
                                    return e.stop()
                            }
                        }), r, null, [
                            [0, 8]
                        ])
                    })))())
                }
            }, {
                key: "initOffsiteAdInfo",
                value: function(e) {
                    var t = function(e, t) {
                        var n = {};
                        try {
                            var r = e.creative_id,
                                i = (e.callback, e.idc),
                                o = e.convert_id,
                                a = e.ad_info_from,
                                c = e.ad_info_status,
                                s = e.log_extra,
                                u = e.ext_params,
                                l = e.ATTStatus;
                            if (r && (n.creative_id = r), i && (n.idc = i), o && (n.convert_id = o), a && (n.ad_info_from = a), c && (n.ad_info_status = c), u && (n.ext_params = u), l && (n.ATTStatus = l), s) {
                                var f = JSON.parse(s),
                                    d = f.ad_user_agent,
                                    h = f.ad_id,
                                    p = f.rit,
                                    v = f.ocbs,
                                    _ = f.vid,
                                    g = f.idc,
                                    y = f.country_id;
                                h && (n.ad_id = h), p && (n.rit = p), d && (n.ad_user_agent = d), v && (n.ocbs = v), _ && (n.vid = _), g && (n.idc = g), y && (n.country_id = y)
                            }
                            return n
                        } catch (e) {
                            return t && t(e), n
                        }
                    }(e, (function(e) {
                        wi(Sr.INIT_ERROR, e, {
                            extJSON: {
                                position: "handleAdInfoOfficial"
                            }
                        })
                    }));
                    this.context.setOffsiteAdInfo(t);
                    var n = function(e, t) {
                        try {
                            var n = e.log_extra,
                                r = e.ttuts;
                            return !Ti() || (yi(t) ? n ? 1 !== JSON.parse(n).user_tracking_status : null === e.ATTStatus || void 0 === e.ATTStatus || 3 === e.ATTStatus : null == r || 1 !== r)
                        } catch (e) {
                            return !1
                        }
                    }(e, this.env);
                    this.context.setEnableAdTracking(n), this.dispatch(sr.AD_INFO_INIT_END, {
                        extJSON: {
                            enabledAdTracking: n
                        }
                    })
                }
            }, {
                key: "initAppInfo",
                value: function(t) {
                    var n = this,
                        i = Di(dr);
                    i ? this.context.setAppInfo(i) : this.reportService.pushPreposition(r(e().mark((function r() {
                        var i;
                        return e().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, n.initBaseAppInfo(t);
                                case 2:
                                    return i = e.sent, e.abrupt("return", i);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }), r)
                    })))())
                }
            }, {
                key: "initBaseAppInfo",
                value: (n = r(e().mark((function t(n) {
                    var r;
                    return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2, this.appService.getAppInfo(n);
                            case 2:
                                return r = e.sent, this.context.setAppInfo(r), e.abrupt("return", r);
                            case 5:
                            case "end":
                                return e.stop()
                        }
                    }), t, this)
                }))), function(e) {
                    return n.apply(this, arguments)
                })
            }, {
                key: "initTestId",
                value: function(e) {
                    if (!this.context.getTestID()) {
                        var t = function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                            try {
                                var n = Ui("tt_test_id", e);
                                return n && n !== t && Ji("tt_test_id", n, void 0, "session"), n || t
                            } catch (e) {
                                return ""
                            }
                        }(e, Fi("tt_test_id"));
                        this.context.setTestID(t)
                    }
                }
            }, {
                key: "initUserInfo",
                value: function() {
                    this.setCookieInfo()
                }
            }, {
                key: "setPageIndex",
                value: function(e) {
                    e && Vi(e)
                }
            }, {
                key: "instance",
                value: function(e) {
                    var t = this.getReporter(e);
                    return t || new Go(e, Zn.PIXEL_CODE, {
                        value: !1
                    }, this.context, {
                        pixelCode: e
                    }, {})
                }
            }, {
                key: "instances",
                value: function() {
                    return this.reporters
                }
            }, {
                key: "page",
                value: function(e) {
                    v(u(c.prototype), "page", this).call(this, Object.assign({
                        url: (null == e ? void 0 : e.page) || location.href,
                        referrer: (null == e ? void 0 : e.referrer) || document.referrer
                    }, e))
                }
            }, {
                key: "track",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        r = n.pixel_code;
                    if (void 0 === r) v(u(c.prototype), "track", this).call(this, e, t, n);
                    else {
                        var i = this.instance(r);
                        if (i instanceof Go) return;
                        i.track(e, t, n)
                    }
                }
            }, {
                key: "setAdInfo",
                value: function(e) {
                    this.context.setAdInfo(e)
                }
            }, {
                key: "enableFirstPartyCookie",
                value: function(e) {
                    this.cookieService.enableFirstPartyCookie(e), e && this.setCookieInfo()
                }
            }, {
                key: "enableCookie",
                value: function() {
                    this.cookieService.enableFirstPartyCookie(!0), this.setCookieInfo(), this.cookieService.enableCookie()
                }
            }, {
                key: "disableCookie",
                value: function() {
                    this.cookieService.disableCookie(), this.context.setUserInfoWithoutIdentifyPlugin({
                        anonymous_id: void 0
                    }), this.disablePangleCookie()
                }
            }, {
                key: "holdConsent",
                value: function() {
                    this.consentService.setConsentMode(zn.HOLD)
                }
            }, {
                key: "revokeConsent",
                value: function() {
                    this.consentService.setConsentMode(zn.REVOKE)
                }
            }, {
                key: "grantConsent",
                value: function() {
                    this.consentService.setConsentMode(zn.GRANT)
                }
            }, {
                key: "disablePangleCookie",
                value: function() {
                    this.pangleCookieMatchingPlugin && this.pangleCookieMatchingPlugin.disablePangleCookie()
                }
            }, {
                key: "setAnonymousId",
                value: function(e) {
                    this.cookieService.setAnonymousId(e), this.initUserInfo()
                }
            }, {
                key: "resetCookieExpires",
                value: function() {
                    this.cookieService.resetExpires()
                }
            }, {
                key: "setCookieInfo",
                value: function() {
                    if (this.cookieService.canUseCookie()) {
                        var e = this.cookieService.getAnonymousId();
                        if (e) {
                            var t = {
                                anonymous_id: e
                            };
                            this.context.setUserInfoWithoutIdentifyPlugin(t)
                        }
                    }
                }
            }, {
                key: "onPageLoaded",
                value: function() {
                    var e = this;
                    window.addEventListener("load", (function() {
                        e.dispatch(sr.PAGE_DID_LOAD)
                    }), {
                        once: !0
                    })
                }
            }, {
                key: "onPageLeave",
                value: function() {
                    var e = this,
                        t = function() {
                            var t = Date.now();
                            e.dispatch(sr.PAGE_WILL_LEAVE, t), e.consentService.updateCache()
                        };
                    window.addEventListener("beforeunload", t, {
                        once: !0
                    }), Ti() && window.addEventListener("onpagehide" in window ? "pagehide" : "unload", t)
                }
            }, {
                key: "loadPixel",
                value: function(e, t) {
                    e && (this.reporters.find((function(t) {
                        return t.getReporterId() === e
                    })) ? ki(Nr.DUPLICATE_PIXEL_CODE) : Wr().load(e, t || {}))
                }
            }]), c
        }(Oo),
        Yo = Ko = Jo([A.injectable(), Wo(0, A.inject(Or.CONTEXT)), Wo(1, A.inject(Or.TTQ_REPORTERS)), Wo(2, A.inject(Or.AD_SERVICE)), Wo(3, A.inject(Or.APP_SERVICE)), Wo(4, A.inject(Or.REPORT_SERVICE)), Wo(5, A.inject(Or.COOKIE_SERVICE)), Wo(6, A.inject(Or.CONSENT_SERVICE)), Wo(7, A.inject(Or.ENV)), Wo(8, A.inject(Or.MONITOR_PLUGIN)), Wo(8, A.optional()), Wo(9, A.inject(Or.AUTO_ADVANCED_MATCHING_PLUGIN)), Wo(9, A.optional()), Wo(10, A.inject(Or.CALLBACK_PLUGIN)), Wo(10, A.optional()), Wo(11, A.inject(Or.IDENTIFY_PLUGIN)), Wo(11, A.optional()), Wo(12, A.inject(Or.PERFORMANCE_INTERACTION_PLUGIN)), Wo(12, A.optional()), Wo(13, A.inject(Or.WEB_FL_PLUGIN)), Wo(13, A.optional()), Wo(14, A.inject(Or.SHOPIFY_PLUGIN)), Wo(14, A.optional()), Wo(15, A.inject(Or.AUTO_CONFIG_PLUGIN)), Wo(15, A.optional()), Wo(16, A.inject(Or.DIAGNOSTICS_CONSOLE_PLUGIN)), Wo(16, A.optional()), Wo(17, A.inject(Or.COMPETITOR_INSIGHT_PLUGIN)), Wo(17, A.optional()), Wo(18, A.inject(Or.PANGLE_COOKIE_MATCHING_PLUGIN)), Wo(18, A.optional()), Wo(19, A.inject(Or.EVENT_BUILDER_PLUGIN)), Wo(19, A.optional()), Wo(20, A.inject(Or.ENRICH_IPV6_PLUGIN)), Wo(20, A.optional()), Wo(21, A.inject(Or.PAGEDATA_PLUGIN)), Wo(21, A.optional()), Wo(22, A.inject(Or.HISTORY_OBSERVER)), Wo(22, A.optional())], Ko);
    ! function(e) {
        e.BIND = "bind", e.REBIND = "rebind"
    }(Po || (Po = {}));
    var qo = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        Xo = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        zo = function(e) {
            s(n, e);
            var t = h(n);

            function n(e, r, o, a, c) {
                var s;
                return i(this, n), (s = t.call(this, e)).setSignalType(c || cr.OFFSITE), s.pageSign = {
                    sessionId: "",
                    pageId: "",
                    variationId: "",
                    pageIndex: {
                        main: -1,
                        sub: -1,
                        index: -1
                    }
                }, s.legacy = o.legacy || [], s.variationId = o.variation_id || "", s.serverUniqueId = o.server_unqiue_id || "", s.reportService = r, s.initPageSign(), yi(a) && Ti() && (s.enableAdTracking = !1), s.data = f(s), s
            }
            return a(n, [{
                key: "getSessionIdFromCache",
                value: function() {
                    var e = null;
                    try {
                        e = JSON.parse(sessionStorage.getItem(_r) || "")
                    } catch (e) {}
                    return e
                }
            }, {
                key: "setSessionIdToCache",
                value: function(e) {
                    xi(_r, e)
                }
            }, {
                key: "getVariationId",
                value: function() {
                    return this.variationId
                }
            }, {
                key: "isLegacyPixel",
                value: function(e) {
                    return function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                        try {
                            return t.includes(e)
                        } catch (e) {
                            return !1
                        }
                    }(e, this.legacy)
                }
            }, {
                key: "assignPageInfo",
                value: function(e) {
                    Object.assign(this.pageInfo, e)
                }
            }, {
                key: "getSessionIndex",
                value: function() {
                    var e = {
                        main: -1,
                        sub: -1,
                        index: -1
                    };
                    try {
                        var t = JSON.parse(sessionStorage.getItem(gr) || "{}");
                        if (t) return Object.assign({}, e, t)
                    } catch (e) {}
                    return e
                }
            }, {
                key: "setUserInfo",
                value: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if (0 !== Object.keys(t).length) {
                        var n = {};
                        Object.entries(t).forEach((function(t) {
                            var r = _(t, 2),
                                i = r[0],
                                o = r[1];
                            o && (i !== Hr ? n[i] = String(o).trim() : e.setUserInfoWithoutIdentifyPlugin(c({}, Hr, o)))
                        }));
                        var r = Wr(),
                            i = null == r ? void 0 : r.getPlugin("Identify");
                        i && this.reportService.pushPreposition(i.handleUserProperties(n, t).then((function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                r = t.userProperties,
                                o = t.userDataFormat,
                                a = t.userDataFormatV2;
                            if (r) {
                                Object.assign(e.userInfo, r);
                                var c = e.getUserFormatInfo() || {},
                                    s = e.getUserFormatInfoV2() || {},
                                    u = e.getSignalDiagnosticLabels() || {};
                                if (e.setUserFormatInfo(Object.assign({}, c, o)), e.setUserFormatInfoV2(Object.assign({}, s, a)), e.setSignalDiagnosticLabels(Object.assign({}, u, t.identifierLabel || {})), 0 === Object.keys(e.userInfo).length || 1 === Object.keys(n).length && Object.keys(n).includes("external_id")) return;
                                var l = i.reporters[0] || null,
                                    f = l ? Object.keys(Object.assign({}, l.getUserInfo(Jn.Manual), l.getUserInfo(Jn.Auto))) : [];
                                l && f.length && l.track("EnrichAM", {}, {}, Er.TRACK)
                            }
                        })).catch((function(e) {
                            wi(Sr.API_ERROR, e, {
                                extJSON: {
                                    api: "identify"
                                }
                            })
                        })))
                    }
                }
            }, {
                key: "initPageSign",
                value: function() {
                    var e, t = this.getSessionIdFromCache();
                    null === t && (t = (e = this.serverUniqueId) ? "".concat(e).concat(mr).concat(ei(20)) : nr("sessionId"), this.setSessionIdToCache(t));
                    var n, r = this.getPageId((n = t) ? n.split(mr)[0] : ""),
                        i = this.getVariationId(),
                        o = this.getSessionIndex();
                    o.main++, this.pageSign = {
                        sessionId: t,
                        pageId: r,
                        variationId: i,
                        pageIndex: o
                    }
                }
            }]), n
        }(po);
    zo = qo([A.injectable(), Xo(0, A.inject(br.WebLibraryInfo)), Xo(1, A.inject(Or.REPORT_SERVICE)), Xo(2, A.inject(Or.TTQ_GLOBAL_OPTIONS)), Xo(3, A.inject(Or.ENV)), Xo(3, A.optional()), Xo(4, A.inject(br.SignalType)), Xo(4, A.optional())], zo);
    var Qo = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        Zo = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        $o = function() {
            function t(e) {
                i(this, t), this.webBridgeService = e
            }
            var n;
            return a(t, [{
                key: "getAdInfo",
                value: (n = r(e().mark((function t() {
                    var n, r, i, o, a = arguments;
                    return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (n = a.length > 0 && void 0 !== a[0] ? a[0] : window.location.href, r = this.getAdInfoFromURL(n), !this.webBridgeService.jsbridge) {
                                    e.next = 8;
                                    break
                                }
                                return e.next = 5, this.webBridgeService.getAdInfo();
                            case 5:
                                e.t0 = e.sent, e.next = 9;
                                break;
                            case 8:
                                e.t0 = {};
                            case 9:
                                return i = e.t0, (o = Object.assign({}, r, i)) && (o.creative_id && o.log_extra || o.callback) && xi(fr, o), e.abrupt("return", o);
                            case 13:
                            case "end":
                                return e.stop()
                        }
                    }), t, this)
                }))), function() {
                    return n.apply(this, arguments)
                })
            }, {
                key: "getAdInfoFromURL",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.href;
                    return fo(e)
                }
            }]), t
        }();
    $o = Qo([A.injectable(), Zo(0, A.inject(Or.BRIDGE_SERVICE))], $o);
    var ea = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        ta = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        na = function() {
            function t(e) {
                i(this, t), this.webBridgeService = e
            }
            var n;
            return a(t, [{
                key: "getAppInfo",
                value: (n = r(e().mark((function t(n) {
                    var r, i, o, a, c;
                    return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (r = n || window.location.href, (i = this.getAppInfoFromURL(r)).platform = mi(), !bi()) {
                                    e.next = 11;
                                    break
                                }
                                return e.next = 6, Ei();
                            case 6:
                                o = e.sent, a = o.model, c = o.platformVersion, i.device_model = a, i.android_version = c;
                            case 11:
                                return tr(i) || xi(dr, i), e.abrupt("return", i);
                            case 13:
                            case "end":
                                return e.stop()
                        }
                    }), t, this)
                }))), function(e) {
                    return n.apply(this, arguments)
                })
            }, {
                key: "getAppInfoFromURL",
                value: function(e) {
                    try {
                        var t = Ui(Dr, e || window.location.href),
                            n = t && JSON.parse(t);
                        return {
                            device_id: n.device_id,
                            user_id: n.uid
                        }
                    } catch (e) {
                        return {}
                    }
                }
            }]), t
        }();
    na = ea([A.injectable(), ta(0, A.inject(Or.BRIDGE_SERVICE))], na);
    var ra = "ad_analytics_msg",
        ia = "insight_log",
        oa = function(e) {
            return !!(e.code && e.data && e.ret)
        };

    function aa(e) {
        var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
            n = {};
        try {
            if ("string" == typeof e) n.data = JSON.parse(e);
            else if (oa(e))(n = e).__data && (n.data = n.__data);
            else if (void 0 !== e.code) {
                var r = Object.assign({}, e),
                    i = r.code;
                n.code = i, delete r.code, r.data ? n.data = r.data : n.data = r
            } else n.data = e
        } catch (e) {
            t && wi(Sr.JSB_ERROR, e, {
                extJSON: {
                    position: "getCallPromise bridge.call"
                }
            })
        }
        return n
    }
    var ca, sa = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        ua = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        la = function() {
            function t(e, n) {
                i(this, t), this.env = e, gi(this.env) && (this.jsbridge = n), this.bridgeTimeout = 400
            }
            var n, o, c, s, u, l, f;
            return a(t, [{
                key: "getAdInfo",
                value: (f = r(e().mark((function t() {
                    var n = this;
                    return e().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                if (this.jsbridge) {
                                    t.next = 3;
                                    break
                                }
                                return wi(Sr.JSB_ERROR, new Error("tt bridge error when getting ad info"), {
                                    extJSON: {
                                        position: "getAdInfo"
                                    }
                                }), t.abrupt("return", Promise.resolve({}));
                            case 3:
                                return t.abrupt("return", new Promise(function() {
                                    var t = r(e().mark((function t(r) {
                                        var i;
                                        return e().wrap((function(e) {
                                            for (;;) switch (e.prev = e.next) {
                                                case 0:
                                                    return e.prev = 0, e.next = 3, n.callAdInfo();
                                                case 3:
                                                    (i = e.sent).ad_info_from = "jsb", i.ad_info_status = i.ad_info_status || "fulfilled", r(i), e.next = 13;
                                                    break;
                                                case 9:
                                                    e.prev = 9, e.t0 = e.catch(0), r({}), wi(Sr.JSB_ERROR, e.t0, {
                                                        extJSON: {
                                                            position: "getAdInfo"
                                                        }
                                                    });
                                                case 13:
                                                case "end":
                                                    return e.stop()
                                            }
                                        }), t, null, [
                                            [0, 9]
                                        ])
                                    })));
                                    return function(e) {
                                        return t.apply(this, arguments)
                                    }
                                }()));
                            case 4:
                            case "end":
                                return t.stop()
                        }
                    }), t, this)
                }))), function() {
                    return f.apply(this, arguments)
                })
            }, {
                key: "callAdInfo",
                value: (l = r(e().mark((function t() {
                    var n, r;
                    return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.prev = 0, e.next = 3, this.call("adInfo", {}, window.top !== window ? 3500 : 5e3);
                            case 3:
                                if ((n = e.sent).data) {
                                    e.next = 6;
                                    break
                                }
                                return e.abrupt("return", Promise.reject("adInfo no data"));
                            case 6:
                                return r = {
                                    creative_id: n.data.cid,
                                    log_extra: n.data.log_extra
                                }, e.abrupt("return", r);
                            case 10:
                                if (e.prev = 10, e.t0 = e.catch(0), "JSBRIDGE TIMEOUT" !== e.t0) {
                                    e.next = 17;
                                    break
                                }
                                return Ci(Sr.CUSTOM_INFO, {
                                    custom_name: "ad_info_init_timeout"
                                }), e.abrupt("return", {
                                    ad_info_status: "timeout"
                                });
                            case 17:
                                return wi(Sr.JSB_ERROR, e.t0, {
                                    extJSON: {
                                        position: "getAdInfo"
                                    }
                                }), e.abrupt("return", {});
                            case 19:
                            case "end":
                                return e.stop()
                        }
                    }), t, this, [
                        [0, 10]
                    ])
                }))), function() {
                    return l.apply(this, arguments)
                })
            }, {
                key: "getAppInfo",
                value: (u = r(e().mark((function t() {
                    return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.abrupt("return", Promise.resolve({}));
                            case 1:
                            case "end":
                                return e.stop()
                        }
                    }), t)
                }))), function() {
                    return u.apply(this, arguments)
                })
            }, {
                key: "send",
                value: (s = r(e().mark((function t(n, r) {
                    var i, o, a, c, s, u, l, f, d, h;
                    return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (this.jsbridge) {
                                    e.next = 2;
                                    break
                                }
                                return e.abrupt("return", Promise.resolve());
                            case 2:
                                return a = (null === (o = null === (i = null == n ? void 0 : n.context) || void 0 === i ? void 0 : i.ad) || void 0 === o ? void 0 : o.creative_id) || "0", c = io(n), s = {
                                    analytics_message: c,
                                    trackLogData: JSON.stringify(n),
                                    category: "ad_analytics_msg",
                                    tag: ra,
                                    label: ia
                                }, f = {
                                    eventName: ra,
                                    labelName: ia,
                                    value: a,
                                    extValue: "0",
                                    extJson: s
                                }, Ri() ? (l = "sendLog", u = this.call("sendLog", f, this.bridgeTimeout)) : yi(this.env) ? Ti() && r ? (d = {
                                    eventName: ia,
                                    params: s
                                }, l = "sendLogWithAdInfo", u = this.call("sendLogWithAdInfo", d, this.bridgeTimeout)) : (l = "sendLog", u = this.call("sendLog", f, this.bridgeTimeout)) : (h = {
                                    event_name: ia,
                                    version: 2,
                                    properties: s
                                }, l = "track_event", u = this.call("track_event", h, 400)), Ci(Sr.CUSTOM_INFO, {
                                    custom_name: "send_report_data",
                                    extJSON: {
                                        api_name: l
                                    }
                                }), e.abrupt("return", u);
                            case 9:
                            case "end":
                                return e.stop()
                        }
                    }), t, this)
                }))), function(e, t) {
                    return s.apply(this, arguments)
                })
            }, {
                key: "call",
                value: (c = r(e().mark((function t(n) {
                    var r, i, o, a = this,
                        c = arguments;
                    return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return r = c.length > 1 && void 0 !== c[1] ? c[1] : {}, i = c.length > 2 && void 0 !== c[2] ? c[2] : 400, o = !(c.length > 3 && void 0 !== c[3]) || c[3], e.abrupt("return", new Promise((function(e, t) {
                                    if (!a.jsbridge) return t("JSBRIDGE ERROR"), void(o && wi(Sr.JSB_ERROR, new Error("JSBRIDGE ERROR"), {
                                        extJSON: {
                                            position: "getCallPromise"
                                        }
                                    }));
                                    var c;
                                    i > 0 && (c = window.setTimeout((function() {
                                        t("JSBRIDGE TIMEOUT"), o && wi(Sr.JSB_ERROR, new Error("JSBRIDGE TIMEOUT"), {
                                            extJSON: {
                                                position: "getCallPromise",
                                                method: n
                                            }
                                        })
                                    }), i)), a.jsbridge && a.jsbridge.call && a.jsbridge.call(n, r, (function(t) {
                                        var n = aa(t, o);
                                        e(n), window.clearTimeout(c)
                                    }))
                                })));
                            case 4:
                            case "end":
                                return e.stop()
                        }
                    }), t)
                }))), function(e) {
                    return c.apply(this, arguments)
                })
            }, {
                key: "sendAnalyticsEvent",
                value: (o = r(e().mark((function t(n) {
                    var r, i, o, a, c;
                    return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return r = n.method, i = n.path, o = n.params, a = n.data, e.next = 3, this.call("sendAnalyticsEvent", {
                                    method: r,
                                    path: i,
                                    params: o,
                                    data: a,
                                    header: {
                                        "Content-Type": "application/json"
                                    }
                                }, 0, !1);
                            case 3:
                                return c = e.sent, e.abrupt("return", null == c ? void 0 : c.code);
                            case 5:
                            case "end":
                                return e.stop()
                        }
                    }), t, this)
                }))), function(e) {
                    return o.apply(this, arguments)
                })
            }, {
                key: "updateWebFlData",
                value: (n = r(e().mark((function t(n) {
                    return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (!yi(this.env) || !Ti()) {
                                    e.next = 2;
                                    break
                                }
                                return e.abrupt("return", this.call("updateFLLocalConv", n, this.bridgeTimeout));
                            case 2:
                            case "end":
                                return e.stop()
                        }
                    }), t, this)
                }))), function(e) {
                    return n.apply(this, arguments)
                })
            }]), t
        }();
    la = sa([A.injectable(), ua(0, A.inject(Or.ENV)), ua(0, A.optional()), ua(1, A.inject(Or.JS_BRIDGE)), ua(1, A.optional())], la),
        function(e) {
            e[e.P0 = 4] = "P0", e[e.P1 = 3] = "P1", e[e.P2 = 2] = "P2", e[e.P3 = 1] = "P3"
        }(ca || (ca = {}));
    var fa = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        da = "tt_hold_events",
        ha = function(e) {
            s(n, e);
            var t = h(n);

            function n() {
                var e;
                return i(this, n), (e = t.apply(this, arguments)).consentMode = zn.UNKNOWN, e.queue = [], e.debounceUpdateCache = ri((function() {
                    e.updateCache()
                }), 200, f(e)), e.handleHistoryQueue = $r((function() {
                    var t = Di(da);
                    Array.isArray(t) && (e.queue = e.queue.concat(t), e.changeQueueWithConsent())
                })), e
            }
            return a(n, [{
                key: "on",
                value: function(e, t) {
                    v(u(n.prototype), "on", this).call(this, e, t), this.handleHistoryQueue()
                }
            }, {
                key: "setConsentMode",
                value: function(e) {
                    this.consentMode = e, this.changeQueueWithConsent()
                }
            }, {
                key: "changeQueueWithConsent",
                value: function() {
                    switch (this.consentMode) {
                        case zn.REVOKE:
                            this.cleanQueue();
                            break;
                        case zn.GRANT:
                            this.releaseQueue(), this.cleanQueue();
                        case zn.HOLD:
                        case zn.UNKNOWN:
                    }
                }
            }, {
                key: "getConsentMode",
                value: function() {
                    return this.consentMode
                }
            }, {
                key: "cacheReportTask",
                value: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Fn.defaultReport;
                    this.queue.push({
                        url: e,
                        data: t,
                        type: n
                    }), this.debounceUpdateCache()
                }
            }, {
                key: "cleanQueue",
                value: function() {
                    this.queue = [],
                        function(e) {
                            try {
                                window.sessionStorage.removeItem(e)
                            } catch (e) {}
                        }(da)
                }
            }, {
                key: "updateCache",
                value: function() {
                    this.queue && this.queue.length > 0 && xi(da, this.queue)
                }
            }, {
                key: "releaseQueue",
                value: function() {
                    var e = this;
                    this.queue.sort((function(t, n) {
                        return e.getEventPriority(n.data) - e.getEventPriority(t.data)
                    })), this.emit("queue", this.queue)
                }
            }, {
                key: "getEventPriority",
                value: function(e) {
                    return e.event && e.event.length > 0 ? ca.P0 : e.action && e.action.length > 0 ? ca.P1 : "" === e.event ? ca.P2 : ca.P3
                }
            }]), n
        }(_o);
    ha = fa([A.injectable()], ha);
    var pa = function(e) {
            return Boolean(e)
        },
        va = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        _a = function() {
            function t() {
                i(this, t)
            }
            var n;
            return a(t, [{
                key: "send",
                value: (n = r(e().mark((function t(n, r) {
                    var i, o, a = arguments;
                    return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (i = a.length > 2 && void 0 !== a[2] ? a[2] : 0, e.prev = 1, navigator && navigator.sendBeacon) {
                                    e.next = 4;
                                    break
                                }
                                return e.abrupt("return", !1);
                            case 4:
                                if ((o = navigator.sendBeacon(n, JSON.stringify(r))) || "number" != typeof i || !(i > 0)) {
                                    e.next = 10;
                                    break
                                }
                                return i--, e.next = 9, ii(200);
                            case 9:
                                return e.abrupt("return", this.send(n, r, i));
                            case 10:
                                return e.abrupt("return", o);
                            case 13:
                                return e.prev = 13, e.t0 = e.catch(1), e.abrupt("return", !1);
                            case 16:
                            case "end":
                                return e.stop()
                        }
                    }), t, this, [
                        [1, 13]
                    ])
                }))), function(e, t) {
                    return n.apply(this, arguments)
                })
            }, {
                key: "sendByImage",
                value: function(e, t) {
                    (new Image).src = function(e, t) {
                        var n = new URL(e);
                        return Object.keys(t).forEach((function(e) {
                            var r = t[e].toJSON ? t[e].toJSON() : String(t[e]);
                            n.searchParams.set(e, r)
                        })), n.toString()
                    }(e, t)
                }
            }]), t
        }();
    _a = va([A.injectable()], _a);
    var ga = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        ya = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        ma = function(t) {
            s(f, t);
            var n, o, c, u, l = h(f);

            function f(e, t, n, r) {
                var o;
                return i(this, f), (o = l.call(this, e, t)).supportSendAnalyticsEvent = !0, o.consentService = n, o.consentService.on("queue", (function(e) {
                    e.forEach((function(e) {
                        var t = e.url,
                            n = e.data,
                            r = e.type;
                        o.report(t, n, r)
                    }))
                })), o.env = r, o
            }
            return a(f, [{
                key: "send",
                value: (u = r(e().mark((function t(n, r, i) {
                    var o, a, c, s, u, l;
                    return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (this.bridgeService.jsbridge) {
                                    e.next = 2;
                                    break
                                }
                                return e.abrupt("return");
                            case 2:
                                return u = !!r.context && "timeout" === (null === (a = null === (o = r.context) || void 0 === o ? void 0 : o.ad) || void 0 === a ? void 0 : a.ad_info_status), l = {}, e.prev = 4, e.next = 7, this.bridgeService.send(r, u);
                            case 7:
                                if ((l = e.sent) && 1 === l.code) {
                                    e.next = 10;
                                    break
                                }
                                throw new Error("[fetch bridge] sendLog error: code ".concat(l && l.code, ", data: ").concat(l && JSON.stringify(l)));
                            case 10:
                                return Qr(r.event) && Ci(Sr.JSB_SEND, {
                                    pixelCode: null === (c = r.context.pixel) || void 0 === c ? void 0 : c.code,
                                    app_name: Oi() ? "ultralite" : "",
                                    extJSON: {
                                        event: r.event,
                                        event_id: r.event_id,
                                        need_inject_ad_info: u
                                    }
                                }), e.abrupt("return", l);
                            case 14:
                                e.prev = 14, e.t0 = e.catch(4), Qr(r.event) && wi(Sr.JSB_ERROR, e.t0, {
                                    pixelCode: null === (s = r.context.pixel) || void 0 === s ? void 0 : s.code,
                                    custom_name: "sendReportData",
                                    custom_enum: l && l.code ? "".concat(l.code) : "non",
                                    app_name: Oi() ? "ultralite" : "",
                                    extJSON: {
                                        position: "sendReportData"
                                    }
                                }), Oi() && bi() && this.sendHttpReport(n, r, i);
                            case 18:
                            case "end":
                                return e.stop()
                        }
                    }), t, this, [
                        [4, 14]
                    ])
                }))), function(e, t, n) {
                    return u.apply(this, arguments)
                })
            }, {
                key: "sendHttpReport",
                value: (c = r(e().mark((function t(n, r, i) {
                    var o, a, c, s = arguments;
                    return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return o = !(s.length > 3 && void 0 !== s[3]) || s[3], a = s.length > 4 ? s[4] : void 0, e.next = 4, this.httpService.send(n, r, a);
                            case 4:
                                e.sent || this.httpService.sendByImage(n, {
                                    analytics_message: i
                                }), o && Ci(Sr.HTTP_SEND, {
                                    pixelCode: null === (c = r.context.pixel) || void 0 === c ? void 0 : c.code,
                                    extJSON: {
                                        event: r.event,
                                        event_id: r.event_id
                                    }
                                });
                            case 7:
                            case "end":
                                return e.stop()
                        }
                    }), t, this)
                }))), function(e, t, n) {
                    return c.apply(this, arguments)
                })
            }, {
                key: "beforeReport",
                value: (o = r(e().mark((function t(n, r) {
                    var i, o, a = arguments;
                    return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (i = a.length > 2 && void 0 !== a[2] ? a[2] : Fn.defaultReport, (o = this.consentService.getConsentMode()) !== zn.REVOKE) {
                                    e.next = 4;
                                    break
                                }
                                return e.abrupt("return", !1);
                            case 4:
                                if (o !== zn.HOLD) {
                                    e.next = 7;
                                    break
                                }
                                return this.consentService.cacheReportTask(n, r, i), e.abrupt("return", !1);
                            case 7:
                                return e.abrupt("return", !0);
                            case 8:
                            case "end":
                                return e.stop()
                        }
                    }), t, this)
                }))), function(e, t) {
                    return o.apply(this, arguments)
                })
            }, {
                key: "report",
                value: (n = r(e().mark((function t(n, r) {
                    var i, o, a, c, s, u = arguments;
                    return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return i = u.length > 2 && void 0 !== u[2] ? u[2] : Fn.defaultReport, e.next = 3, this.beforeReport(n, r, i);
                            case 3:
                                if (e.sent) {
                                    e.next = 6;
                                    break
                                }
                                return e.abrupt("return");
                            case 6:
                                if (o = io(r), i !== Fn.defaultReport || !this.bridgeService.jsbridge) {
                                    e.next = 11;
                                    break
                                }
                                return e.next = 10, this.send(n, r, o);
                            case 10:
                                return e.abrupt("return", e.sent);
                            case 11:
                                if (i !== Fn.httpReport || !this.bridgeService.jsbridge || !yi(this.env) || Ii() || !this.supportSendAnalyticsEvent) {
                                    e.next = 30;
                                    break
                                }
                                return a = n, e.prev = 13, a = new URL(n).pathname, e.next = 17, this.bridgeService.sendAnalyticsEvent({
                                    path: a,
                                    method: "POST",
                                    data: r
                                });
                            case 17:
                                if (c = e.sent, s = new Error("sendAnalyticsEvent not support: code ".concat(c, ", path: ").concat(a, ", data: ").concat(JSON.stringify(r))), null != c && -2 !== c) {
                                    e.next = 22;
                                    break
                                }
                                throw this.supportSendAnalyticsEvent = !1, s;
                            case 22:
                                if (1 !== c) {
                                    e.next = 24;
                                    break
                                }
                                return e.abrupt("return");
                            case 24:
                                throw s;
                            case 27:
                                e.prev = 27, e.t0 = e.catch(13), wi(Sr.CUSTOM_ERROR, e.t0, {
                                    custom_name: "sendAnalyticsEvent",
                                    custom_enum: String(c)
                                }, !0);
                            case 30:
                                this.sendHttpReport(n, r, o, !(!Qr(r.event) || !Zr(r)), pa(r.action) ? 3 : void 0);
                            case 31:
                            case "end":
                                return e.stop()
                        }
                    }), t, this, [
                        [13, 27]
                    ])
                }))), function(e, t) {
                    return n.apply(this, arguments)
                })
            }, {
                key: "reportFL",
                value: function(e) {
                    this.bridgeService.jsbridge && this.bridgeService.updateWebFlData(e)
                }
            }]), f
        }(No);
    ma = ga([A.injectable(), ya(0, A.inject(Or.HTTP_SERVICE)), ya(1, A.inject(Or.BRIDGE_SERVICE)), ya(2, A.inject(Or.CONSENT_SERVICE)), ya(3, A.inject(Or.ENV)), ya(3, A.optional())], ma);
    var Ea = {
            expires: 390
        },
        ba = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        Ta = function() {
            function t() {
                i(this, t)
            }
            var n;
            return a(t, [{
                key: "genCookieID",
                value: function() {
                    return ei(27)
                }
            }, {
                key: "enableCookie",
                value: (n = r(e().mark((function t() {
                    return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return Hi(hr, "1", Ea), e.abrupt("return", Yi("https://analytics.tiktok.com/i18n/pixel/enable_cookie"));
                            case 2:
                            case "end":
                                return e.stop()
                        }
                    }), t)
                }))), function() {
                    return n.apply(this, arguments)
                })
            }, {
                key: "enableFirstPartyCookie",
                value: function(e) {
                    if (e) {
                        Hi(hr, "1", Ea);
                        var t = this.genCookieID(),
                            n = this.getAnonymousId();
                        this.setAnonymousId(n || t)
                    }
                }
            }, {
                key: "disableCookie",
                value: function() {
                    Hi(hr, "0", Ea), Hi(pr, "", Object.assign(Ea, {
                        expires: -1
                    })), Yi("https://analytics.tiktok.com/i18n/pixel/disable_cookie")
                }
            }, {
                key: "setAnonymousId",
                value: function(e) {
                    var t = this.getAnonymousId() || e;
                    t && Hi(pr, t, Ea)
                }
            }, {
                key: "getAnonymousId",
                value: function() {
                    return Fi(pr) || ""
                }
            }, {
                key: "canUseCookie",
                value: function() {
                    try {
                        return "0" !== Fi(hr)
                    } catch (e) {}
                    return !1
                }
            }, {
                key: "resetExpires",
                value: function() {
                    var e = Fi(hr);
                    e && Hi(hr, e, Ea);
                    var t = this.getAnonymousId();
                    t && this.setAnonymousId(t)
                }
            }]), t
        }();
    Ta = ba([A.injectable()], Ta);
    var Ia = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        Oa = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        Sa = function(e) {
            s(n, e);
            var t = h(n);

            function n(e, r) {
                return i(this, n), t.call(this, {
                    name: "Callback",
                    reporters: r,
                    context: e
                })
            }
            return a(n, [{
                key: "pixelDidMount",
                value: function(e) {
                    var t = Ui("ttclid");
                    t && Ji("ttclid", t)
                }
            }, {
                key: "beforeShopifyPixelSend",
                value: function(e, t) {
                    var n = ji(e, "ttclid");
                    n || (n = ji(t, "ttclid")), n && Ji("ttclid", n)
                }
            }]), n
        }(To);
    Sa = Ia([A.injectable(), Oa(0, A.inject(Or.CONTEXT)), Oa(1, A.inject(Or.TTQ_REPORTERS))], Sa);
    var Na = {
            isHash: function(e) {
                return !1
            },
            genIdentifierLabelByUserProperties: function(e) {
                return {}
            }
        },
        Ra = {
            validatePhoneNumberLength: function(e) {},
            parsePhoneNumberFromString: function(e) {}
        },
        Aa = {
            tryDecodeHashedBase64String: function(e) {
                return null
            },
            tryDecodeHashedBase64Hex: function(e) {
                return null
            }
        },
        Pa = function(e) {
            var t, n = e.parsePhoneNumberFromString,
                r = e.validatePhoneNumberLength,
                i = e.isHash,
                o = e.genIdentifierLabelByUserProperties,
                a = e.tryDecodeHashedBase64String,
                c = e.tryDecodeHashedBase64Hex,
                s = e.checkEmailFormat,
                u = e.checkMDNEmailFormat;
            e.sha256, t = {
                    checkEmailFormat: s,
                    checkMDNEmailFormat: u
                }, t.checkMDNEmailFormat,
                function(e) {
                    var t = e.tryDecodeHashedBase64String,
                        n = e.tryDecodeHashedBase64Hex;
                    Aa.tryDecodeHashedBase64String = t, Aa.tryDecodeHashedBase64Hex = n
                }({
                    tryDecodeHashedBase64String: a,
                    tryDecodeHashedBase64Hex: c
                }),
                function(e) {
                    var t = e.isHash,
                        n = e.genIdentifierLabelByUserProperties;
                    Na.isHash = t, Na.genIdentifierLabelByUserProperties = n
                }({
                    isHash: i,
                    genIdentifierLabelByUserProperties: o
                }),
                function(e) {
                    var t = e.parsePhoneNumberFromString,
                        n = e.validatePhoneNumberLength;
                    Ra.parsePhoneNumberFromString = t, Ra.validatePhoneNumberLength = n
                }({
                    parsePhoneNumberFromString: n,
                    validatePhoneNumberLength: r
                })
        },
        Ca = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Ra.parsePhoneNumberFromString,
                r = e,
                i = t ? n(e, t) : n(e);
            return i ? r = "86" === i.countryCallingCode ? i.nationalNumber : i.number : e.replace(/[^0-9]/g, "").length > 0 && (r = e.replace(/[^0-9]/g, "")), r
        },
        wa = ["(null)", "", "''\"", void 0, "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", "eb045d78d273107348b0300c01d29b7552d622abbc6faf81b3ec55359aa9950c", "not set", null, "6181738008c985a1b5f106b796c98e719efcc3c0ff68ddcd14a049825f4900a8", "2a539d6520266b56c3b0c525b9e6128858baeccb5ee9b694a2906e123c8d6dd3", "c6e52c372287175a895926604fa738a0ad279538a67371cd56909c7917e69ea1", "None", "74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b", "f24f02d3c35894296522abac8c4b2439b1c1b650e1fb4c97c0f3c50b580b0a3c", "no", "a683c5c5349f6f7fb903ba8a9e7e55d0ba1b8f03579f95be83f4954c33e81098", "f18a2548c063c5a2b1560c6f2b9ec44bf9ed9017884404016d74f330119aaefe", "449f06574cd639e1826848ff5d70ba95904574be84f34e61baa526d517dfb493", "fcbcf165908dd18a9e49f7ff27810176db8e9f63b4352213741664245224f8aa", "NA", "bc857c49633bbc75644c51f36b16b2f768cc0ee13f65402ec7c32c96308272dd", "42cbf37902c6911d7b4e371fe8f8708a0ceda6946249d4a3e23de8d5e60ae8b7"],
        ka = function(e) {
            s(n, e);
            var t = h(n);

            function n(e) {
                var r = e.name,
                    o = e.context,
                    a = e.reporters;
                return i(this, n), t.call(this, {
                    name: r,
                    reporters: a,
                    context: o
                })
            }
            return a(n, [{
                key: "setIdentifyUtils",
                value: function(e) {
                    var t = e.isHash,
                        n = e.sha256,
                        r = e.genIdentifierLabelByUserProperties,
                        i = e.tryDecodeHashedBase64String,
                        o = e.tryDecodeHashedBase64Hex,
                        a = e.validatePhoneNumberLength,
                        c = e.parsePhoneNumberFromString,
                        s = e.checkEmailFormat,
                        u = e.checkMDNEmailFormat,
                        l = e.getCookieDeprecationLabel,
                        f = void 0 === l ? function() {} : l,
                        d = e.getAllTopics,
                        h = void 0 === d ? function() {} : d;
                    Pa({
                        isHash: t,
                        sha256: n,
                        genIdentifierLabelByUserProperties: r,
                        tryDecodeHashedBase64String: i,
                        tryDecodeHashedBase64Hex: o,
                        validatePhoneNumberLength: a,
                        parsePhoneNumberFromString: c,
                        checkEmailFormat: s,
                        checkMDNEmailFormat: u
                    }), this.parsePhoneNumberFromString = c, this.checkMDNEmailFormat = u, this.checkEmailFormat = s, this.sha256 = n, this.getCookieDeprecationLabel = f, this.getAllTopics = h
                }
            }, {
                key: "baseHandleUserProperties",
                value: function(e, t) {
                    var n = this;
                    if (e) {
                        var r = this.identifyParamsFormattedInfo(e),
                            i = this.identifyParamsFormattedInfoV2(e),
                            o = Na.genIdentifierLabelByUserProperties(t);
                        return this.handlePIIDiagnostics(i), Object.entries(e).forEach((function(t) {
                            var r = _(t, 2),
                                o = r[0],
                                a = r[1],
                                c = void 0 === a ? "" : a;
                            if (c) {
                                var s = String(c);
                                if (["email", "phone_number", "sha256_email", "sha256_phone_number"].includes(o)) {
                                    var u = n.getUserDataFormatInfoV2KeyName(o),
                                        l = Aa.tryDecodeHashedBase64Hex(s);
                                    if (null !== l) e[o] = l, null !== u && (i = n.updateUserDataFormatV2Label(u, Gn.BASE64_HEX_HASHED, i));
                                    else {
                                        var f = Aa.tryDecodeHashedBase64String(s);
                                        f && (e[o] = f, null !== u && (i = n.updateUserDataFormatV2Label(u, Gn.BASE64_STRING_HASHED, i)))
                                    }
                                }
                                switch ("zip_code" === o && s && (Na.isHash(s) ? i = n.updateUserDataFormatV2Label("zip_code", Gn.ZIP_CODE_IS_HASHED, i) : (i = n.updateUserDataFormatV2Label("zip_code", Gn.ZIP_CODE_IS_NOT_HASHED, i), n.isZipFromUs(e) ? (e.zip_code = n.sha256(n.truncateString(s, 5)), i = n.updateUserDataFormatV2Label("zip_code", Gn.ZIP_CODE_IS_US, i)) : (e.zip_code = n.sha256(s), i = n.updateUserDataFormatV2Label("zip_code", Gn.ZIP_CODE_IS_NOT_US, i)))), o) {
                                    case "email":
                                        e.email = Na.isHash(s) && !n.checkEmailFormat(s) ? s : n.sha256(n.handleEmail(s));
                                        break;
                                    case "phone_number":
                                        e.phone_number = Na.isHash(s) ? s : n.sha256(n.handlePhoneNumber(s));
                                        break;
                                    case "auto_email":
                                        e.auto_email = n.sha256(n.handleEmail(s));
                                        break;
                                    case "auto_phone_number":
                                        e.auto_phone_number = n.sha256(n.handlePhoneNumber(s));
                                        break;
                                    case "first_name":
                                        e.first_name = Na.isHash(s) ? s : n.sha256(s);
                                        break;
                                    case "last_name":
                                        e.last_name = Na.isHash(s) ? s : n.sha256(s);
                                        break;
                                    case "city":
                                        e.city = n.truncateString(s, 80);
                                        break;
                                    case "state":
                                        e.state = n.truncateString(s, 80);
                                        break;
                                    case "country":
                                        e.country = n.truncateString(s, 80);
                                        break;
                                    default:
                                        return
                                }
                            }
                        })), e.sha256_email && (e.email = this.handleCheckHashedEmailValue(String(e.sha256_email), r)), e.sha256_phone_number && (e.phone_number = this.handleCheckHashedPhoneValue(String(e.sha256_phone_number), r)), {
                            userProperties: e,
                            userDataFormat: r,
                            userDataFormatV2: i,
                            identifierLabel: o
                        }
                    }
                }
            }, {
                key: "identifyParamsFormattedInfo",
                value: function(e) {
                    var t = this,
                        n = {},
                        r = /^sha256_(.*)$/;
                    return Object.entries(e).forEach((function(e) {
                        var i = _(e, 2),
                            o = i[0],
                            a = i[1],
                            c = String(void 0 === a ? "" : a),
                            s = o.match(r);
                        switch (o) {
                            case "email":
                                t.handleEmailFormat(c, "email", n);
                                break;
                            case "phone_number":
                                t.handlePhoneNumberFormat(c, "phone_number", n);
                                break;
                            case "auto_email":
                                t.handleEmailFormat(c, "auto_email", n);
                                break;
                            case "auto_phone_number":
                                t.handlePhoneNumberFormat(c, "auto_phone_number", n);
                                break;
                            case (s || {}).input:
                                var u = null == s ? void 0 : s.pop();
                                u && xr.includes(u) && (n[u] = [Vn.HASHED]);
                                break;
                            case "first_name":
                            case "last_name":
                            case "city":
                            case "state":
                            case "country":
                            case "zip_code":
                                t.handleNewPiisFormat(c, o, n);
                                break;
                            default:
                                n[o] = [Vn.CORRECT_FORMAT]
                        }
                    })), n
                }
            }, {
                key: "identifyParamsFormattedInfoV2",
                value: function(e) {
                    var t = this,
                        n = {};
                    return Object.entries(e).forEach((function(e) {
                        var r = _(e, 2),
                            i = r[0],
                            o = r[1],
                            a = String(void 0 === o ? "" : o);
                        switch (i) {
                            case "email":
                                t.handlePixelValidation(a, jr, n);
                                break;
                            case "phone_number":
                                t.handlePixelValidation(a, Ur, n);
                                break;
                            case "sha256_email":
                                t.handlePixelValidation(a, Br, n);
                                break;
                            case "sha256_phone_number":
                                t.handlePixelValidation(a, Fr, n);
                                break;
                            case "first_name":
                            case "last_name":
                            case "city":
                            case "state":
                            case "country":
                            case "zip_code":
                                break;
                            default:
                                n[i] = [Gn.UNKNOWN_INVALID]
                        }
                    })), n
                }
            }, {
                key: "updateUserDataFormatV2Label",
                value: function(e, t, n) {
                    var r, i;
                    return (null === n[e] || void 0 === n[e] || (null === (r = n[e]) || void 0 === r ? void 0 : r.includes(Gn.UNKNOWN_INVALID))) && (n[e] = []), null === (i = n[e]) || void 0 === i || i.push(t), n
                }
            }, {
                key: "getUserDataFormatInfoV2KeyName",
                value: function(e) {
                    return {
                        email: "email_is_hashed",
                        phone_number: "phone_is_hashed",
                        sha256_email: "sha256_email",
                        sha256_phone_number: "sha256_phone",
                        zip_code: "zip_code"
                    }[e] || null
                }
            }, {
                key: "handlePIIDiagnostics",
                value: function(e) {}
            }, {
                key: "handleEmail",
                value: function(e) {
                    return e.toLowerCase()
                }
            }, {
                key: "handlePhoneNumber",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.parsePhoneNumberFromString;
                    return Ca(e, "", t)
                }
            }, {
                key: "handleCheckHashedEmailValue",
                value: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.checkEmailFormat;
                    return t.email = t.email || [], Na.isHash(e) ? (null == t || t.email.push(Vn.HASHED_CORRECT), e) : n(e) ? (null == t || t.email.push(Vn.PLAINTEXT_EMAIL), this.sha256(this.handleEmail(String(e)))) : (null == t || t.email.push(Vn.HASHED_ERR), this.sha256(e))
                }
            }, {
                key: "handleCheckHashedPhoneValue",
                value: function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.parsePhoneNumberFromString;
                    return t.phone_number = t.phone_number || [], Na.isHash(e) ? (null == t || t.phone_number.push(Vn.HASHED_CORRECT), e) : n(e) ? (t.phone_number.push(Vn.PLAINTEXT_PHONE), this.sha256(this.handlePhoneNumber(String(e), n))) : (null == t || t.phone_number.push(Vn.HASHED_ERR), this.sha256(e))
                }
            }, {
                key: "handlePixelValidation",
                value: function(e, t, n) {
                    n[t] = [], wa.includes(e) && n[t].push(Gn.FILTER_EVENTS), e && Na.isHash(e) && n[t].push(Gn.HASHED), e && this.checkEmailFormat(e) && n[t].push(Gn.PLAIN_EMAIL), e && this.checkMDNEmailFormat(e) && n[t].push(Gn.PLAIN_MDN_EMAIL), e && this.parsePhoneNumberFromString(e) && n[t].push(Gn.PLAIN_PHONE), e && 0 === n[t].length && n[t].push(Gn.UNKNOWN_INVALID)
                }
            }, {
                key: "isZipFromUs",
                value: function(e) {
                    var t;
                    return "us" === (null === (t = e.country) || void 0 === t ? void 0 : t.toLowerCase()) || !1
                }
            }, {
                key: "truncateString",
                value: function(e, t) {
                    var n = Array.from(e);
                    return n.length <= t ? e : n.slice(0, t).join("")
                }
            }, {
                key: "handlePhoneNumberFormat",
                value: function(e, t, n) {
                    var r = this.handleCheckPhoneNumber(String(e), this.parsePhoneNumberFromString);
                    n[t] = r
                }
            }, {
                key: "handleCheckPhoneNumber",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.parsePhoneNumberFromString,
                        n = [];
                    if (!e) return n.push(Vn.EMPTY_VALUE), n;
                    if (Na.isHash(e)) return n.push(Vn.HASHED), n;
                    var r = t(e);
                    return r ? (n.push(Vn.CORRECT_FORMAT), n) : (n.push(Vn.WRONG_FORMAT), n)
                }
            }, {
                key: "handleCheckEmail",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.checkEmailFormat,
                        n = [];
                    return e ? Na.isHash(e) ? (n.push(Vn.HASHED), n) : t(e) ? (n.push(Vn.CORRECT_FORMAT), n) : (n.push(Vn.WRONG_FORMAT), n) : (n.push(Vn.EMPTY_VALUE), n)
                }
            }, {
                key: "handleEmailFormat",
                value: function(e, t, n) {
                    var r = this.handleCheckEmail(String(e), this.checkEmailFormat);
                    n && n[t] && (n[t] || []).includes(Vn.HASHED) || (n[t] = r)
                }
            }, {
                key: "handleNewPiisFormat",
                value: function(e, t, n) {
                    e && (n[t] = [Vn.CORRECT_FORMAT])
                }
            }]), n
        }(To),
        Ma = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        La = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        Da = function(t) {
            s(u, t);
            var n, o, c = h(u);

            function u(e, t) {
                var n;
                return i(this, u), (n = c.call(this, {
                    name: "Identify",
                    reporters: t,
                    context: e
                })).init(), n
            }
            return a(u, [{
                key: "init",
                value: function() {
                    var e = this;
                    return this.pluginPromise || (Ci(Sr.IDENTIFY_INIT_START), this.pluginPromise = Yi("https://analytics.tiktok.com/i18n/pixel/static/identify_c2008b8c.js").then((function() {
                        e.detectTopics(), Ci(Sr.IDENTIFY_INIT_END)
                    })).catch((function() {
                        var e = new Error("Loading chunk identify failed.\n(error: ".concat(window.location.host, "/static/identify.js)"));
                        return e.name = "ChunkLoadError", Promise.reject(e)
                    }))), this.pluginPromise
                }
            }, {
                key: "handleUserProperties",
                value: (o = r(e().mark((function t(n, r) {
                    return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (n) {
                                    e.next = 2;
                                    break
                                }
                                return e.abrupt("return", void 0);
                            case 2:
                                return e.next = 4, this.init();
                            case 4:
                                return e.abrupt("return", this.baseHandleUserProperties(n, r));
                            case 5:
                            case "end":
                                return e.stop()
                        }
                    }), t, this)
                }))), function(e, t) {
                    return o.apply(this, arguments)
                })
            }, {
                key: "handlePIIDiagnostics",
                value: function(e) {
                    try {
                        var t = e.email_is_hashed,
                            n = void 0 === t ? [] : t,
                            r = e.sha256_email,
                            i = void 0 === r ? [] : r,
                            o = e.phone_is_hashed,
                            a = void 0 === o ? [] : o,
                            c = e.sha256_phone,
                            s = void 0 === c ? [] : c;
                        if (n.includes(Gn.UNKNOWN_INVALID) || i.includes(Gn.UNKNOWN_INVALID)) return void ki(Nr.INVALID_EMAIL_FORMAT);
                        if (a.includes(Gn.UNKNOWN_INVALID) || s.includes(Gn.UNKNOWN_INVALID)) return void ki(Nr.INVALID_PHONE_NUMBER_FORMAT);
                        if (n.includes(Gn.FILTER_EVENTS) || i.includes(Gn.FILTER_EVENTS)) return void ki(Nr.INVALID_EMAIL_INFORMATION);
                        if (a.includes(Gn.FILTER_EVENTS) || s.includes(Gn.FILTER_EVENTS)) return void ki(Nr.INVALID_PHONE_NUMBER_INFORMATION)
                    } catch (e) {}
                }
            }, {
                key: "detectTopics",
                value: (n = r(e().mark((function t() {
                    var n, r;
                    return e().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.prev = 0, e.next = 3, this.getCookieDeprecationLabel();
                            case 3:
                                return n = e.sent, e.next = 6, this.getAllTopics();
                            case 6:
                                (r = e.sent) && Ci(Sr.CUSTOM_INFO, {
                                    custom_name: "topics",
                                    custom_enum: r.toString(),
                                    extJSON: {
                                        cookie_label: String(n)
                                    }
                                }), e.next = 12;
                                break;
                            case 10:
                                e.prev = 10, e.t0 = e.catch(0);
                            case 12:
                            case "end":
                                return e.stop()
                        }
                    }), t, this, [
                        [0, 10]
                    ])
                }))), function() {
                    return n.apply(this, arguments)
                })
            }]), u
        }(ka);

    function xa(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500,
            n = Date.now();
        return function() {
            var r = Array.prototype.slice.call(arguments),
                i = Date.now();
            i - n >= t && (e.apply(void 0, y(r)), n = i)
        }
    }
    Da = Ma([A.injectable(), La(0, A.inject(Or.CONTEXT)), La(1, A.inject(Or.TTQ_REPORTERS))], Da);
    var ja = {
        fcp: "first_contentful_paint",
        lcp: "largest_contentful_paint",
        cls: "cumulative_layout_shift",
        fid: "first_input_delay",
        tti: "time_to_interactive",
        navigationStart: "navigation_start",
        loadEventStart: "load_event_start",
        requestStart: "request_start",
        enterTime: "enter_time",
        leaveTime: "leave_time",
        docHeight: "doc_height",
        maxScrollHeight: "max_scroll_height",
        clickTimes: "click_times",
        scrollTimes: "scroll_times",
        connectionType: "connection_type"
    };

    function Ua() {
        var e = document.body,
            t = document.documentElement;
        return Math.max(e ? e.scrollHeight : 0, e ? e.offsetHeight : 0, t ? t.clientHeight : 0, t ? t.scrollHeight : 0, t ? t.offsetHeight : 0)
    }

    function Ba() {
        return document.documentElement.clientHeight + window.pageYOffset
    }
    var Fa = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        Ha = function() {
            function e() {
                i(this, e), this.connectionType = "", this._docHeight = 0, this._maxScrollHeight = 0, this.clickTimes = 0, this.scrollTimes = 0, this.isDocHeightChanged = !1, this.isMaxScrollHeightChanged = !1, this.enterTime = 0, this.leaveTime = 0, this.isFirstReport = !0
            }
            return a(e, [{
                key: "init",
                value: function() {
                    var e, t;
                    e = this.updateClickTimes.bind(this), t = xa((function(t) {
                            e()
                        }), 100), window.addEventListener("click", t, {
                            capture: !0
                        }),
                        function(e) {
                            var t = xa((function() {
                                var t = {
                                    scrollHeight: Ba(),
                                    docHeight: Ua()
                                };
                                e(t)
                            }), 500);
                            window.addEventListener("scroll", t, {
                                passive: !0
                            })
                        }(this.updateScrollData.bind(this))
                }
            }, {
                key: "pageUrlWillChange",
                value: function(e, t) {
                    "" !== e ? this.leaveTime = Date.now() : this.enterTime = window.performance.timing.navigationStart
                }
            }, {
                key: "pageUrlDidChange",
                value: function(e) {
                    0 !== this.enterTime && (this.resetAfterPageChange(), this.initInteractionData(), this.enterTime = Date.now())
                }
            }, {
                key: "pageWillLeave",
                value: function(e) {
                    this.leaveTime = e
                }
            }, {
                key: "updateClickTimes",
                value: function() {
                    this.clickTimes += 1
                }
            }, {
                key: "updateScrollData",
                value: function(e) {
                    var t = e.scrollHeight,
                        n = e.docHeight;
                    this.scrollTimes += 1, this.maxScrollHeight = t, this.docHeight = n
                }
            }, {
                key: "initInteractionData",
                value: function() {
                    var e, t = {
                            docHeight: Ua(),
                            scrollHeight: Ba(),
                            connectionType: (e = navigator.connection, e && e.effectiveType ? e.effectiveType : "")
                        },
                        n = t.docHeight,
                        r = t.scrollHeight,
                        i = t.connectionType;
                    this.docHeight = n, this.maxScrollHeight = r, this.connectionType = i
                }
            }, {
                key: "resetAfterPageChange",
                value: function() {
                    this.clearAfterReport(), this.maxScrollHeight = 0, this.docHeight = 0, this.leaveTime = 0, this.isFirstReport = !0, this.connectionType = ""
                }
            }, {
                key: "clearAfterReport",
                value: function() {
                    this.clickTimes = 0, this.scrollTimes = 0, this.isDocHeightChanged = !1, this.isMaxScrollHeightChanged = !1, this.isFirstReport = !1
                }
            }, {
                key: "getResult",
                value: function() {
                    var e = {};
                    return this.scrollTimes && (e.scrollTimes = this.scrollTimes), this.clickTimes && (e.clickTimes = this.clickTimes), this.leaveTime && (e.leaveTime = this.leaveTime), this.isDocHeightChanged && (e.docHeight = this.docHeight), this.isMaxScrollHeightChanged && (e.maxScrollHeight = this.maxScrollHeight), this.isFirstReport && (e.connectionType = this.connectionType, e.enterTime = this.enterTime), this.clearAfterReport(), e
                }
            }, {
                key: "isChanged",
                value: function() {
                    return this.isDocHeightChanged || this.isMaxScrollHeightChanged || 0 !== this.scrollTimes || 0 !== this.clickTimes || 0 !== this.leaveTime
                }
            }, {
                key: "docHeight",
                get: function() {
                    return this._docHeight
                },
                set: function(e) {
                    e > this._docHeight ? (this._docHeight = e, this.isDocHeightChanged = !0) : 0 === e && (this._docHeight = 0, this.isDocHeightChanged = !1)
                }
            }, {
                key: "maxScrollHeight",
                get: function() {
                    return this._maxScrollHeight
                },
                set: function(e) {
                    e > this._maxScrollHeight ? (this._maxScrollHeight = e, this.isMaxScrollHeightChanged = !0) : 0 === e && (this._maxScrollHeight = 0, this.isMaxScrollHeightChanged = !1)
                }
            }]), e
        }();
    Ha = Fa([A.injectable()], Ha);
    var Va, Ga = function(e, t) {
            try {
                var n = null == t ? void 0 : t.type;
                if (n && PerformanceObserver.supportedEntryTypes.indexOf(n) > -1) {
                    var r = new PerformanceObserver((function(t) {
                        t.getEntries().forEach(e)
                    }));
                    return r.observe(t), r
                }
            } catch (e) {}
        },
        Ja = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            document.addEventListener("visibilitychange", (function(t) {
                "hidden" === document.visibilityState && e(t)
            }), {
                once: t
            })
        },
        Wa = function() {
            return void 0 === Va && (Va = "hidden" === document.visibilityState ? 0 : 1 / 0, Ja((function(e) {
                Va = Math.min(Va, e.timeStamp)
            }))), {
                get timeStamp() {
                    return Va
                }
            }
        },
        Ka = "first-contentful-paint";

    function Ya(e) {
        if (!(window && window.performance && (null === (t = window.performance) || void 0 === t ? void 0 : t.getEntries))) return -1;
        var t, n = performance.getEntriesByType("paint");
        if (Array.isArray(n)) {
            var r = n.filter((function(t) {
                return t.name === e
            }));
            return r.length && r[0] && r[0].startTime && r[0].startTime || -1
        }
        return -1
    }
    var qa, Xa = {
        exports: {}
    };
    qa = Xa,
        function() {
            var e = "undefined" != typeof window && window === this ? this : void 0 !== N && null != N ? N : this,
                t = "function" == typeof Object.defineProperties ? Object.defineProperty : function(e, t, n) {
                    e != Array.prototype && e != Object.prototype && (e[t] = n.value)
                };

            function n() {
                n = function() {}, e.Symbol || (e.Symbol = i)
            }
            var r = 0;

            function i(e) {
                return "jscomp_symbol_" + (e || "") + r++
            }

            function o() {
                n();
                var r = e.Symbol.iterator;
                r || (r = e.Symbol.iterator = e.Symbol("iterator")), "function" != typeof Array.prototype[r] && t(Array.prototype, r, {
                    configurable: !0,
                    writable: !0,
                    value: function() {
                        return a(this)
                    }
                }), o = function() {}
            }

            function a(t) {
                var n = 0;
                return function(t) {
                    return o(), (t = {
                        next: t
                    })[e.Symbol.iterator] = function() {
                        return this
                    }, t
                }((function() {
                    return n < t.length ? {
                        done: !1,
                        value: t[n++]
                    } : {
                        done: !0
                    }
                }))
            }

            function c(e) {
                o();
                var t = e[Symbol.iterator];
                return t ? t.call(e) : a(e)
            }

            function s(e) {
                if (!(e instanceof Array)) {
                    e = c(e);
                    for (var t, n = []; !(t = e.next()).done;) n.push(t.value);
                    e = n
                }
                return e
            }
            var u = 0,
                l = "img script iframe link audio video source".split(" ");

            function f(e, t) {
                for (var n = (e = c(e)).next(); !n.done; n = e.next())
                    if (n = n.value, t.includes(n.nodeName.toLowerCase()) || f(n.children, t)) return !0;
                return !1
            }

            function d(e, t) {
                if (2 < e.length) return performance.now();
                for (var n = [], r = (t = c(t)).next(); !r.done; r = t.next()) r = r.value, n.push({
                    timestamp: r.start,
                    type: "requestStart"
                }), n.push({
                    timestamp: r.end,
                    type: "requestEnd"
                });
                for (r = (t = c(e)).next(); !r.done; r = t.next()) n.push({
                    timestamp: r.value,
                    type: "requestStart"
                });
                for (n.sort((function(e, t) {
                        return e.timestamp - t.timestamp
                    })), e = e.length, t = n.length - 1; 0 <= t; t--) switch (r = n[t], r.type) {
                    case "requestStart":
                        e--;
                        break;
                    case "requestEnd":
                        if (2 < ++e) return r.timestamp;
                        break;
                    default:
                        throw Error("Internal Error: This should never happen")
                }
                return 0
            }

            function h(e) {
                e = e || {}, this.w = !!e.useMutationObserver, this.u = e.minValue || null, e = window.__tti && window.__tti.e;
                var t = window.__tti && window.__tti.o;
                this.a = e ? e.map((function(e) {
                        return {
                            start: e.startTime,
                            end: e.startTime + e.duration
                        }
                    })) : [], t && t.disconnect(), this.b = [], this.f = new window[window.TiktokAnalyticsObject || "ttq"]._ttq_map, this.j = null, this.v = -1 / 0, this.i = !1, this.h = this.c = this.s = null,
                    function(e, t) {
                        var n = XMLHttpRequest.prototype.send,
                            r = u++;
                        XMLHttpRequest.prototype.send = function(i) {
                            for (var o = [], a = 0; a < arguments.length; ++a) o[a - 0] = arguments[a];
                            var c = this;
                            return e(r), this.addEventListener("readystatechange", (function() {
                                4 === c.readyState && t(r)
                            })), n.apply(this, o)
                        }
                    }(this.m.bind(this), this.l.bind(this)),
                    function(e, t) {
                        var n = fetch;
                        fetch = function(r) {
                            for (var i = [], o = 0; o < arguments.length; ++o) i[o - 0] = arguments[o];
                            return new Promise((function(r, o) {
                                var a = u++;
                                e(a), n.apply(null, [].concat(s(i))).then((function(e) {
                                    t(a), r(e)
                                }), (function(e) {
                                    t(e), o(e)
                                }))
                            }))
                        }
                    }(this.m.bind(this), this.l.bind(this)),
                    function(e) {
                        e.c = new PerformanceObserver((function(t) {
                            for (var n = (t = c(t.getEntries())).next(); !n.done; n = t.next())
                                if ("resource" === (n = n.value).entryType && (e.b.push({
                                        start: n.fetchStart,
                                        end: n.responseEnd
                                    }), v(e, d(e.g, e.b) + 5e3)), "longtask" === n.entryType) {
                                    var r = n.startTime + n.duration;
                                    e.a.push({
                                        start: n.startTime,
                                        end: r
                                    }), v(e, r + 5e3)
                                }
                        })), e.c.observe({
                            entryTypes: ["longtask", "resource"]
                        })
                    }(this), this.w && (this.h = function(e) {
                        var t = new MutationObserver((function(t) {
                            for (var n = (t = c(t)).next(); !n.done; n = t.next())("childList" == (n = n.value).type && f(n.addedNodes, l) || "attributes" == n.type && l.includes(n.target.tagName.toLowerCase())) && e(n)
                        }));
                        return t.observe(document, {
                            attributes: !0,
                            childList: !0,
                            subtree: !0,
                            attributeFilter: ["href", "src"]
                        }), t
                    }(this.B.bind(this)))
            }

            function p(e) {
                e.i = !0;
                var t = 0 < e.a.length ? e.a[e.a.length - 1].end : 0,
                    n = d(e.g, e.b);
                v(e, Math.max(n + 5e3, t))
            }

            function v(e, t) {
                !e.i || e.v > t || (clearTimeout(e.j), e.j = setTimeout((function() {
                    var t = performance.timing.navigationStart,
                        n = d(e.g, e.b);
                    if (t = (window.a && window.a.A ? 1e3 * window.a.A().C - t : 0) || performance.timing.domContentLoadedEventEnd - t, e.u) var r = e.u;
                    else r = performance.timing.domContentLoadedEventEnd ? (r = performance.timing).domContentLoadedEventEnd - r.navigationStart : null;
                    var i = performance.now();
                    null === r && v(e, Math.max(n + 5e3, i + 1e3));
                    var o = e.a;
                    (n = 5e3 > i - n || 5e3 > i - (n = o.length ? o[o.length - 1].end : t) ? null : Math.max(n, r)) && (e.s(n), clearTimeout(e.j), e.i = !1, e.c && e.c.disconnect(), e.h && e.h.disconnect()), v(e, performance.now() + 1e3)
                }), t - performance.now()), e.v = t)
            }
            h.prototype.getFirstConsistentlyInteractive = function() {
                var e = this;
                return new Promise((function(t) {
                    e.s = t, "complete" == document.readyState ? p(e) : window.addEventListener("load", (function() {
                        p(e)
                    }))
                }))
            }, h.prototype.m = function(e) {
                this.f.set(e, performance.now())
            }, h.prototype.l = function(e) {
                this.f.delete(e)
            }, h.prototype.B = function() {
                v(this, performance.now() + 5e3)
            }, e.Object.defineProperties(h.prototype, {
                g: {
                    configurable: !0,
                    enumerable: !0,
                    get: function() {
                        return [].concat(s(this.f.values()))
                    }
                }
            });
            var _ = {
                getFirstConsistentlyInteractive: function(e) {
                    return e = e || {}, "PerformanceLongTaskTiming" in window ? new h(e).getFirstConsistentlyInteractive() : Promise.resolve(null)
                }
            };
            qa.exports ? qa.exports = _ : window.ttiPolyfill = _
        }();
    var za = Xa.exports,
        Qa = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        Za = ["fcp", "lcp", "cls", "fid", "tti", "navigationStart", "loadEventStart", "requestStart"],
        $a = function() {
            function e() {
                i(this, e), this.fcp = -1, this.lcp = -1, this.cls = -1, this.fid = -1, this.tti = -1, this.navigationStart = -1, this.loadEventStart = -1, this.requestStart = -1, this.everythingDone = !1, this.changedMap = {}, this.init()
            }
            return a(e, [{
                key: "init",
                value: function() {
                    var e, t, n, r;
                    this.updatePerformanceTiming(), e = this.baseHandler.bind(this, "cls"), t = 0, r = Ga(n = function(e) {
                            e.hadRecentInput || (t += e.value)
                        }, {
                            type: "layout-shift",
                            buffered: !0
                        }), Ja((function() {
                            r && (r.takeRecords().forEach(n), r.disconnect()), e(t)
                        })),
                        function(e) {
                            var t = Ya(Ka);
                            if (-1 === t) {
                                var n = Wa();
                                Ga((function(t) {
                                    if (t.name === Ka) {
                                        if (t.startTime < n.timeStamp) return void e(t.startTime);
                                        e(-1)
                                    }
                                }), {
                                    type: "paint",
                                    buffered: !0
                                })
                            } else e(t)
                        }(this.baseHandler.bind(this, "fcp")),
                        function(e) {
                            var t = Wa();
                            Ga((function(n) {
                                if (n.startTime < t.timeStamp) {
                                    var r = n.processingStart - n.startTime;
                                    e(r)
                                }
                            }), {
                                type: "first-input"
                            })
                        }(this.baseHandler.bind(this, "fid")),
                        function(e) {
                            var t = Wa(),
                                n = 0,
                                r = function(r) {
                                    r.startTime < t.timeStamp && (n = r.startTime, e(n))
                                },
                                i = Ga(r, {
                                    type: "largest-contentful-paint",
                                    buffered: !0
                                });
                            Ja((function() {
                                i && (i.takeRecords().forEach(r), i.disconnect()), e(n)
                            }))
                        }(this.baseHandler.bind(this, "lcp")),
                        function(e) {
                            try {
                                za.getFirstConsistentlyInteractive({}).then((function(t) {
                                    e(t)
                                }))
                            } catch (e) {}
                        }(this.baseHandler.bind(this, "tti"))
                }
            }, {
                key: "updatePerformanceTiming",
                value: function() {
                    var e = this,
                        t = function() {
                            var e = window.performance.timing;
                            return {
                                navigationStart: (null == e ? void 0 : e.navigationStart) || 0,
                                loadEventStart: (null == e ? void 0 : e.loadEventStart) || 0,
                                requestStart: (null == e ? void 0 : e.responseStart) || 0
                            }
                        }(),
                        n = t.navigationStart,
                        r = t.loadEventStart,
                        i = t.requestStart;
                    this.baseHandler("navigationStart", n), this.baseHandler("loadEventStart", r), this.baseHandler("requestStart", i), 0 !== n && 0 !== r && 0 !== i || setTimeout((function() {
                        e.updatePerformanceTiming()
                    }), 5e3)
                }
            }, {
                key: "baseHandler",
                value: function(e, t) {
                    this.everythingDone || -1 === this[e] && 0 !== t && -1 !== t && (this.changedMap[e] = !0, this[e] = t)
                }
            }, {
                key: "isChanged",
                value: function() {
                    return 0 !== Object.keys(this.changedMap).length
                }
            }, {
                key: "getResult",
                value: function() {
                    var e = {};
                    if (this.everythingDone) e = this.getAllData();
                    else
                        for (var t = 0, n = Object.keys(this.changedMap); t < n.length; t++) {
                            var r = n[t];
                            e[r] = this[r]
                        }
                    return this.clearAfterReport(), e
                }
            }, {
                key: "getAllData",
                value: function() {
                    var e = this;
                    return Za.reduce((function(t, n) {
                        return t[n] = e[n], t
                    }), {})
                }
            }, {
                key: "clearAfterReport",
                value: function() {
                    this.changedMap = {}
                }
            }, {
                key: "pageUrlWillChange",
                value: function(e, t) {}
            }, {
                key: "pageUrlDidChange",
                value: function(e) {
                    var t = this;
                    this.everythingDone = Za.every((function(e) {
                        return -1 !== t[e]
                    }), this), this.changedMap.navigationStart = !0
                }
            }, {
                key: "pageWillLeave",
                value: function(e) {}
            }]), e
        }();
    $a = Qa([A.injectable()], $a);
    var ec = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        tc = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        nc = function(e) {
            s(n, e);
            var t = h(n);

            function n(e, r, o, a, c) {
                var s;
                return i(this, n), (s = t.call(this, {
                    name: "PerformanceInteraction",
                    reporters: o,
                    context: r
                })).monitors = [], s.currentUrl = "", s.ttqOptions = {}, s.env = e, s.reportService = a, s.ttqOptions = c, s.init(), s
            }
            return a(n, [{
                key: "reportSwitch",
                value: function() {
                    var e, t, n = Ui(Lr),
                        r = "";
                    try {
                        var i = window.sessionStorage && window.sessionStorage.getItem(fr);
                        if (i) r = JSON.parse(i).callback
                    } catch (e) {}
                    return !!(n || r || yi(this.env) || (null === (t = null === (e = this.ttqOptions) || void 0 === e ? void 0 : e.plugins) || void 0 === t ? void 0 : t.PerformanceInteraction))
                }
            }, {
                key: "init",
                value: function() {
                    var e = this;
                    this.reportSwitch() && (this.interactionMonitor = new Ha, this.performanceMonitor = new $a, this.monitors.push(this.interactionMonitor), this.monitors.push(this.performanceMonitor), this.monitors.forEach((function(e) {
                        e.init()
                    })), setInterval((function() {
                        e.report()
                    }), 1e4))
                }
            }, {
                key: "pageUrlWillChange",
                value: function(e, t) {
                    this.reportSwitch() && (this.monitors.forEach((function(n) {
                        n.pageUrlWillChange(e, t)
                    })), e && this.report())
                }
            }, {
                key: "pageWillLeave",
                value: function(e) {
                    this.reportSwitch() && (this.monitors.forEach((function(t) {
                        t.pageWillLeave(e)
                    })), this.report())
                }
            }, {
                key: "pageUrlDidChange",
                value: function(e) {
                    this.currentUrl !== e && this.reportSwitch() && (this.currentUrl = e, this.monitors.forEach((function(t) {
                        t.pageUrlDidChange(e)
                    })), this.report())
                }
            }, {
                key: "report",
                value: function() {
                    var e = this;
                    if (this.reportSwitch()) {
                        var t = this.transformReportData(this.collectorData());
                        if (Object.keys(t).length) {
                            var n = Er.PERFORMANCE_INTERACTION,
                                r = Li(n);
                            null !== r && qi(this.reportService.reportPreposition || []).then((function() {
                                e.reportService.report(r, e.assemblyMergedData(t, n), function(e) {
                                    return {
                                        performance_interaction: Fn.httpReport
                                    }[e] || Fn.htmlHttpReport
                                }(n))
                            }))
                        }
                    }
                }
            }, {
                key: "assemblyMergedData",
                value: function(e, t) {
                    var n, r = this.context.getPageSign(),
                        i = this.reporters[0],
                        o = (null == i ? void 0 : i.getReporterId()) || "",
                        a = this.reporters.map((function(e) {
                            return e.getReporterId()
                        })).join("|"),
                        c = null == i ? void 0 : i.assemblyData(o, "", e, {}, t);
                    return c && (c.context.pixel && (c.context.pixel.codes = a), c.context.index = null === (n = r.pageIndex) || void 0 === n ? void 0 : n.index, c.context.session_id = r.sessionId), c || {}
                }
            }, {
                key: "collectorData",
                value: function() {
                    return this.monitors.reduce((function(e, t) {
                        return t.isChanged() && (e = Object.assign({}, e, t.getResult())), e
                    }), {})
                }
            }, {
                key: "transformReportData",
                value: function(e) {
                    return Object.entries(e).reduce((function(e, t) {
                        var n = _(t, 2),
                            r = n[0],
                            i = n[1];
                        return e[ja[r]] = i, e
                    }), {})
                }
            }]), n
        }(To);
    nc = ec([A.injectable(), tc(0, A.inject(Or.ENV)), tc(1, A.inject(Or.CONTEXT)), tc(2, A.inject(Or.TTQ_REPORTERS)), tc(3, A.inject(Or.REPORT_SERVICE)), tc(4, A.inject(Or.TTQ_GLOBAL_OPTIONS))], nc);
    var rc, ic = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        oc = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        ac = function(e) {
            s(n, e);
            var t = h(n);

            function n(e, r, o, a) {
                var c;
                return i(this, n), (c = t.call(this, {
                    name: "WebFL",
                    reporters: r,
                    context: e
                })).reportService = o, c.ttqOptions = a, c.useExchangeRate = a.usd_exchange_rate, c
            }
            return a(n, [{
                key: "pixelSend",
                value: function(e, t, n) {
                    var r, i;
                    Boolean(null === (i = null === (r = this.ttqOptions) || void 0 === r ? void 0 : r.plugins) || void 0 === i ? void 0 : i.WebFL) && n && this.reportFlConv(n)
                }
            }, {
                key: "reportFlConv",
                value: function(e) {
                    var t;
                    if (e && "Pageview" !== e.event) {
                        var n, r = e.context,
                            i = e.properties,
                            o = void 0 === i ? {} : i,
                            a = void 0 !== r.ad.log_extra ? r.ad.log_extra : "{}";
                        try {
                            n = JSON.parse(a)
                        } catch (e) {
                            n = {}
                        }
                        var c = {
                                req_id: n.req_id || "",
                                cid: r.ad.creative_id || "",
                                value: o.value || "",
                                currency: o.currency || "",
                                raw: Object.assign({}, o)
                            },
                            s = o.value,
                            u = o.currency,
                            l = function(e, t, n) {
                                return isNaN(e) || e < 0 || null === n || !n[t] ? "" : (e / n[t] * 1e5).toFixed(0)
                            }(s, u, this.useExchangeRate || null),
                            f = r.pixel ? r.pixel.code : "";
                        l && (c.usd_value = l, Ci(Sr.CUSTOM_INFO, {
                            pixelCode: f,
                            custom_name: "odfl_rate_exchange",
                            extJSON: {
                                message_id: e.message_id,
                                cid: c.cid,
                                event: e.event,
                                value: s,
                                currency: u,
                                usdValue: l
                            }
                        }));
                        var d = {
                            business: "devicefl_join_label",
                            entrance: "app_to_web_conversion",
                            inputParams: {
                                message_id: e.message_id,
                                event: e.event,
                                event_props: c,
                                event_source_id: null === (t = r.pixel) || void 0 === t ? void 0 : t.code,
                                event_source_type: "web"
                            }
                        };
                        this.reportService && this.reportService.reportFL && (this.reportService.reportFL(d), Ci(Sr.CUSTOM_INFO, {
                            pixelCode: f,
                            custom_name: "fl_jsb_report",
                            extJSON: {
                                message_id: e.message_id,
                                cid: c.cid,
                                event: e.event
                            }
                        }))
                    }
                }
            }]), n
        }(To);
    ac = ic([A.injectable(), oc(0, A.inject(Or.CONTEXT)), oc(1, A.inject(Or.TTQ_REPORTERS)), oc(2, A.inject(Or.REPORT_SERVICE)), oc(3, A.inject(Or.TTQ_GLOBAL_OPTIONS))], ac),
        function(e) {
            e.ERROR_FORMAT = "error_format", e.OVER_LENGTH = "over_length_3e4", e.FILTER_SENSITIVE_FIELDS = "filter_sensitive_fields"
        }(rc || (rc = {}));
    var cc, sc, uc, lc, fc, dc = "form_detail_error";
    ! function(e) {
        e.GET_ELEMENTS_ERROR = "get_elements_error", e.INIT_ERROR = "init_error", e.ASSEMBLE_FORM_DETAIL_ERROR = "assemble_form_detail_error", e.DETECT_FORM_ELEMENT_ERROR = "detect_form_element_error", e.GET_OVERALL_FORM_DETAIL_ERROR = "get_overall_form_detail_error", e.FORM_OBSERVER_ERROR = "form_observer_error", e.OVER_LENGTH = "over_length_3e4"
    }(cc || (cc = {})),
    function(e) {
        e.METADATA = "Metadata", e.CLICK = "Click"
    }(sc || (sc = {})),
    function(e) {
        e.AUTO_COLLECTION = "AUTO_COLLECTION", e.AUTO_FORM = "AUTO_FORM", e.AUTO_CLICK = "AUTO_CLICK", e.AUTO_VC = "AUTO_VC", e.AUTO_VC_REVERSE = "AUTO_VC_REVERSE"
    }(uc || (uc = {})),
    function(e) {
        e.AUTO_FORM = "form_rules", e.AUTO_VC = "vc_rules", e.AUTO_VC_REVERSE = "vc_rules_reverse"
    }(lc || (lc = {})),
    function(e) {
        e.PAGE_LEAVE = "PageLeave", e.PAGE_VIEW = "PageView", e.DOM_CHANGE = "DomChange", e.URL_CHANGE = "UrlChange", e.CLICK = "Click", e.SCROLL = "Scroll"
    }(fc || (fc = {}));
    var hc = ["AnatomicalStructure", "AnatomicalSystem", "ApprovedIndication", "ArriveAction", "Artery", "BioChemEntity", "BloodTest", "Bone", "BorrowAction", "BrainStructure", "BrokerageAccount", "CDCPMDRecord", "ChemicalSubstance", "CovidTestingFacility", "DDxElement", "DepartAction", "DepositAccount", "DiagnosticLab", "DiagnosticProcedure", "Diet", "DietarySupplement", "DoseSchedule", "ElementarySchool", "HighSchool", "ExercisePlan", "Gene", "GovernmentBenefitsType", "GovernmentService", "HealthAspectEnumeration", "HealthInsurancePlan", "HealthPlanCostSharingSpecification", "HealthTopicContent", "Hospital", "ImagingTest", "InfectiousAgentClass", "InvestmentFund", "InvestmentOrDeposit", "Invoice", "Joint", "LendAction", "LifestyleModification", "Ligament", "LoanOrCredit", "LymphaticVessel", "MaximumDoseSchedule", "MedicalAudience", "MedicalAudienceType", "MedicalCause", "MedicalCode", "MedicalCondition", "MedicalConditionStage", "MedicalContraindication", "MedicalDevice", "MedicalEntity", "MedicalEvidenceLevel", "MedicalGuidelineContraindication", "MedicalIndication", "MedicalIntangible", "MedicalObservationalStudy", "MedicalOrganization", "MedicalProcedure", "MedicalProcedureType", "MedicalRiskCalculator", "MedicalRiskFactor", "MedicalRiskScore", "MedicalSign", "MedicalSignOrSymptom", "MedicalStudy", "MedicalSymptom", "MedicalTest", "MedicalTestPanel", "MedicalTherapy", "MedicalTrial", "MiddleSchool", "MoneyTransfer", "Muscle", "Nerve", "OccupationalTherapy", "Order", "PalliativeProcedure", "ParentAudience", "PathologyTest", "Patient", "PeopleAudience", "Person", "Pharmacy", "PhysicalActivity", "PhysicalTherapy", "Physician", "PoliticalParty", "Preschool", "PreventionIndication", "Protein", "PsychologicalTreatment", "RadiationTherapy", "RecommendedDoseSchedule", "ReportedDoseSchedule", "School", "Substance", "SuperficialAnatomy", "SurgicalProcedure", "Text", "TherapeuticProcedure", "TreatmentIndication", "URL", "Vein", "Vessel", "VitalSign", "WorkersUnion"],
        pc = 2e3;

    function vc(e) {
        return /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi.test(e) || /(\+?0?86-?)?1[3-9]\d{9}/g.test(e) || /(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g.test(e) || /^[\-!$><-==&_\/\?\.,0-9:; \]\[%~\"\{\}\)\(\+\@\^\`]/g.test(e) || hc.some((function(t) {
            return e.toLowerCase().indexOf(t.toLowerCase()) > -1
        }))
    }
    var _c = function e(t) {
        if (!t || t.nodeType !== Node.ELEMENT_NODE) return "";
        if (t === document.documentElement) return "/HTML";
        for (var n = 1, r = t.previousSibling; r;) r.nodeType === Node.ELEMENT_NODE && r.tagName === t.tagName && n++, r = r.previousSibling;
        var i = t.tagName.toLowerCase(),
            o = e(t.parentNode);
        return "".concat(o, "/").concat(i, "[").concat(n, "]")
    };

    function gc(e) {
        return _c(e)
    }

    function yc(e, t) {
        return function() {
            for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
            window.requestIdleCallback && window.requestIdleCallback(e.bind.apply(e, [t].concat(r))), e.apply(t, r)
        }
    }

    function mc(e) {
        var t = e.options,
            n = e.plugins;
        return t && !1 !== t.autoConfig && n && n[cs]
    }

    function Ec(e, t) {
        if (!lc[t]) return !0;
        var n = e.plugins;
        return t === uc.AUTO_VC_REVERSE ? mc(e) && n[cs] && !n[cs][lc.AUTO_VC] : mc(e) && n[cs] && n[cs][lc[t]]
    }
    var bc = function e(t) {
            for (var n = 0, r = t.children, i = 0; i < r.length; i++) {
                var o = r[i],
                    a = !1;
                try {
                    a = si(o)
                } catch (e) {
                    wi(Sr.CUSTOM_ERROR, e, {
                        custom_name: "button_check_error",
                        custom_enum: "auto_click",
                        extJSON: {
                            element: o
                        }
                    }), a = !1
                }
                a && n++, n += e(o)
            }
            return n
        },
        Tc = function(e) {
            var t, n, r, i, o = "";
            if ("A" === e.tagName.toUpperCase()) o = null !== (t = e.getAttribute("href")) && void 0 !== t ? t : "";
            else if ("BUTTON" === e.tagName.toUpperCase()) {
                var a = null !== (n = e.getAttribute("onclick")) && void 0 !== n ? n : "",
                    c = null !== (r = e.getAttribute("formaction")) && void 0 !== r ? r : "",
                    s = a.match(/^.*=(['"])(.*)\1.*$/);
                c ? o = c : s && (o = s[2])
            } else "FORM" === e.tagName.toUpperCase() && (o = null !== (i = e.getAttribute("action")) && void 0 !== i ? i : "");
            return o
        };

    function Ic(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500;
        return "string" != typeof e ? "" : (e = e.trim()).length < t ? e : e.slice(0, 500)
    }

    function Oc(e) {
        return null != ["og:image"].filter((function(t) {
            return t === e
        }))[0]
    }

    function Sc(e, t) {
        return null != [{
            property: "image",
            type: "Product"
        }].filter((function(n) {
            return (e === "https://schema.org/" + n.type || e === "http://schema.org/" + n.type) && n.property === t
        }))[0]
    }

    function Nc() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return {
            items: e,
            has: function(e) {
                return this.items.some((function(t) {
                    return t === e
                }))
            },
            add: function(e) {
                this.has(e) || this.items.push(e)
            }
        }
    }

    function Rc(e) {
        var t;
        switch (e.tagName.toLowerCase()) {
            case "meta":
                t = e.getAttribute("content");
                break;
            case "audio":
            case "embed":
            case "iframe":
            case "img":
            case "source":
            case "track":
            case "video":
                t = e.getAttribute("src");
                break;
            case "a":
            case "area":
            case "link":
                t = e.getAttribute("href");
                break;
            case "object":
                t = e.getAttribute("data");
                break;
            case "data":
            case "meter":
                t = e.getAttribute("value");
                break;
            case "time":
                t = e.getAttribute("datetime");
                break;
            default:
                t = function(e) {
                    if (e) {
                        if (e.innerText && e.innerText.length > 0) return e.innerText;
                        if (e.textContent && e.textContent.length > 0) return e.textContent
                    }
                    return ""
                }(e) || ""
        }
        return "string" == typeof t ? Ic(t) : ""
    }

    function Ac(e, n) {
        if ("object" === t(e)) {
            if (Array.isArray(e)) return e.map((function(e) {
                return Ac(e, n)
            }));
            var r = {};
            for (var i in e) Pc(i, n) || (r[i] = Ac(e[i], n));
            return r
        }
        return e
    }

    function Pc(e, t) {
        return !!(t && t.length > 0) && t.some((function(t) {
            return e.toLowerCase() === t.toLowerCase()
        }))
    }

    function Cc(e) {
        if ("object" === t(e)) {
            if (Array.isArray(e)) return e.map((function(e) {
                return Cc(e)
            }));
            var n = Object.assign({}, e),
                r = n["@type"];
            for (var i in n) "@type" !== i && "@context" !== i && ("object" === t(n[i]) ? n[i] = Cc(n[i]) : r && wc(r) && delete n[i]);
            return n
        }
        return e
    }

    function wc(e) {
        return Array.isArray(e) ? e.some((function(e) {
            return wc(e)
        })) : "string" == typeof e && (e = e.toLowerCase().replace(/https?:\/\/schema\.org\//, ""), hc.some((function(t) {
            return e === t.toLowerCase()
        })))
    }

    function kc(e) {
        var t = {
            open_graph: "{}",
            microdata: "[]",
            json_ld: "[]",
            meta: "{}"
        };
        try {
            t.microdata = function() {
                for (var e = document.querySelectorAll("[itemscope]"), t = [], n = Nc(), r = 0; r < e.length; r++) n.add(e[r]);
                for (var i = e.length - 1; i >= 0; i--) {
                    var o = e[i],
                        a = o.getAttribute("itemtype");
                    if ("string" == typeof a && "" !== a) {
                        for (var c = {}, s = o.querySelectorAll("[itemprop]"), u = 0; u < s.length; u++) {
                            var l = s[u];
                            if (!n.has(l)) {
                                n.add(l);
                                var f = l.getAttribute("itemprop");
                                if ("string" == typeof f && "" !== f) {
                                    var d = Rc(l);
                                    if (null != d) {
                                        var h = c[f];
                                        null != h && Sc(a, f) ? Array.isArray(h) ? c[f].push(d) : c[f] = [h, d] : c[f] = d
                                    }
                                }
                            }
                        }
                        t.unshift({
                            schema: {
                                dimensions: {
                                    h: o.clientHeight,
                                    w: o.clientWidth
                                },
                                properties: wc(a) ? {} : c,
                                subscopes: [],
                                type: a
                            },
                            scope: o
                        })
                    }
                }
                for (var p = [], v = [], _ = 0; _ < t.length; _++) {
                    for (var g = t[_], y = g.scope, m = g.schema, E = p.length - 1; E >= 0; E--) {
                        if (p[E].scope.contains(y)) {
                            p[E].schema.subscopes.push(m);
                            break
                        }
                        p.pop()
                    }
                    0 === p.length && v.push(m), p.push({
                        schema: m,
                        scope: y
                    })
                }
                return JSON.stringify(v)
            }()
        } catch (e) {
            wi(Sr.CUSTOM_ERROR, e, {
                custom_name: "assemble_auto_config_failed",
                custom_enum: "microdata"
            })
        }
        try {
            var n = function() {
                    for (var e = [], t = [], n = document.querySelectorAll('script[type="application/ld+json"]'), r = 0, i = 0; i < n.length; i++) {
                        var o = n[i].innerText;
                        if (null != o && "" !== o) {
                            if ((r += o.length) > 3e4) return {
                                data: JSON.stringify([]),
                                errors: [{
                                    name: rc.OVER_LENGTH,
                                    message: "".concat(String(r))
                                }]
                            };
                            var a = void 0;
                            try {
                                a = JSON.parse(o.replace(/[\n\r\t]+/g, " "))
                            } catch (e) {
                                t.push({
                                    name: rc.ERROR_FORMAT,
                                    message: e.message
                                })
                            }
                            try {
                                a = Cc(a)
                            } catch (e) {
                                return {
                                    data: JSON.stringify([]),
                                    errors: [{
                                        name: rc.FILTER_SENSITIVE_FIELDS,
                                        message: e.message
                                    }]
                                }
                            }
                            a && e.push(a)
                        }
                    }
                    return {
                        data: JSON.stringify(e),
                        errors: t
                    }
                }(),
                r = n.data,
                i = n.errors;
            t.json_ld = r, i && i.forEach((function(e) {
                var t = e.name,
                    n = e.message;
                wi(Sr.CUSTOM_ERROR, {
                    message: n
                }, {
                    custom_name: "parse_json_ld_failed",
                    custom_enum: t
                })
            }))
        } catch (e) {
            wi(Sr.CUSTOM_ERROR, e, {
                custom_name: "assemble_auto_config_failed",
                custom_enum: "json_ld"
            })
        }
        try {
            t.open_graph = function(e) {
                for (var t = Nc(["og", "product", "music", "video", "article", "book", "profile", "website", "twitter"]), n = {}, r = document.querySelectorAll("meta[property],meta[name]"), i = 0; i < r.length; i++) {
                    var o = r[i],
                        a = o.getAttribute("property") || o.getAttribute("name"),
                        c = Ic(o.getAttribute("content"));
                    if ("string" == typeof a && -1 !== a.indexOf(":") && "string" == typeof c && t.has(a.split(":")[0])) {
                        var s = n[a];
                        null != s && Oc(a) ? Array.isArray(s) ? n[a].push(c) : n[a] = [s, c] : n[a] = c
                    }
                }
                return JSON.stringify(Ac(n, e))
            }(e.open_graph)
        } catch (e) {
            wi(Sr.CUSTOM_ERROR, e, {
                custom_name: "assemble_auto_config_failed",
                custom_enum: "open_graph"
            })
        }
        try {
            t.meta = function(e) {
                var t = {},
                    n = Nc(["description", "keywords", "keyword"]),
                    r = document.querySelector("title");
                r && (t.title = Ic(r.innerText));
                for (var i = document.querySelectorAll("meta[property],meta[name]"), o = 0; o < i.length; o++) {
                    var a = i[o],
                        c = a.getAttribute("name") || a.getAttribute("property"),
                        s = Ic(a.getAttribute("content"));
                    "string" == typeof c && "string" == typeof s && n.has(c) && (t[c] = s)
                }
                return JSON.stringify(Ac({
                    title: t.title,
                    "meta:description": t.description,
                    "meta:keywords": t.keywords || t.keyword
                }, e))
            }(e.meta)
        } catch (e) {
            wi(Sr.CUSTOM_ERROR, e, {
                custom_name: "assemble_auto_config_failed",
                custom_enum: "meta"
            })
        }
        return t
    }
    var Mc, Lc = ["form", "[id*=form], [class*=form]"],
        Dc = ["label"],
        xc = ["input,select,textarea"],
        jc = ["radio", "checkbox"],
        Uc = ["hidden", "reset", "submit", "password"];

    function Bc(e, t) {
        try {
            for (var n = 0; n < e.length; n++) {
                var r = t.querySelectorAll(e[n]);
                if (r && r.length > 0) return Array.from(r)
            }
            return []
        } catch (e) {
            return wi(Sr.CUSTOM_ERROR, e, {
                custom_name: dc,
                custom_enum: cc.GET_ELEMENTS_ERROR
            }), []
        }
    }

    function Fc(e) {
        var t = "";
        return function e(n) {
            for (; n;) n.nodeType === Node.TEXT_NODE ? t += n.textContent : "SELECT" !== n.nodeName && n.firstChild && e(n.firstChild), n = n.nextSibling
        }(e.firstChild), t.replace(/[\t\n]/g, "").trim()
    }

    function Hc(e) {
        if (!e) return !1;
        var t = window.getComputedStyle(e);
        return "none" !== t.display && ("visible" === t.visibility && (!Vc(e) && (0 !== e.offsetWidth || 0 !== e.offsetHeight)))
    }

    function Vc(e) {
        return !(!e || e.isSameNode(document.body) || e.isSameNode(document)) && ("0" == window.getComputedStyle(e).opacity || Vc(e.parentElement))
    }

    function Gc(e) {
        var t = e.getAttribute("type");
        return !!t && Uc.indexOf(t) > -1
    }

    function Jc(e) {
        return e && vc(e) ? "__Text__" : e
    }! function(e) {
        e[e.CONTAIN = 0] = "CONTAIN", e[e.ID = 1] = "ID", e[e.SELECTOR = 2] = "SELECTOR"
    }(Mc || (Mc = {}));
    var Wc = function() {
            function e(t) {
                i(this, e), this.formUpdateHandlers = [], this.answerMap = {}, this.rules = this.getRules(t), this.init()
            }
            return a(e, [{
                key: "getRules",
                value: function(e) {
                    var t = e.plugins && e.plugins.AutoConfig;
                    return t && t[lc.AUTO_FORM]
                }
            }, {
                key: "init",
                value: function() {
                    var e = this;
                    try {
                        this.forms = this.detectFormElement(), this.forms && this.forms.forEach((function(t) {
                            t.formDetail = e.assembleFormDetail(t), e.startFormObserver(t, e.formUpdateHandlers)
                        }))
                    } catch (e) {
                        wi(Sr.CUSTOM_ERROR, e, {
                            custom_name: dc,
                            custom_enum: cc.INIT_ERROR
                        })
                    }
                }
            }, {
                key: "getOverallFormDetail",
                value: function() {
                    try {
                        return this.forms && this.forms.length > 0 ? (this.forms.some((function(e) {
                            var t = e.el;
                            return !document.body.contains(t)
                        })) && this.init(), JSON.stringify(this.forms.map((function(e) {
                            return e.formDetail
                        })).filter((function(e) {
                            return e
                        })))) : "[]"
                    } catch (e) {
                        return wi(Sr.CUSTOM_ERROR, e, {
                            custom_name: dc,
                            custom_enum: cc.GET_OVERALL_FORM_DETAIL_ERROR
                        }), "[]"
                    }
                }
            }, {
                key: "addFormUpdateHandler",
                value: function(e) {
                    this.formUpdateHandlers.push(e)
                }
            }, {
                key: "startFormObserver",
                value: function(e, t) {
                    var n = this;
                    try {
                        var r = ri((function() {
                            var r = n.assembleFormDetail(e);
                            (!e.formDetail || r && li(r, e.formDetail)) && (e.formDetail = r, t.forEach((function(t) {
                                return t.call(n, e.formDetail)
                            })))
                        }), pc, this);
                        if (e.el.parentNode) {
                            var i = e.el.parentNode;
                            this.observer && this.observer.disconnect(), this.observer = new MutationObserver(r), this.observer.observe(i, {
                                attributes: !0,
                                childList: !0,
                                subtree: !0
                            }), i.addEventListener("click", r, {
                                capture: !0
                            })
                        }
                    } catch (e) {
                        wi(Sr.CUSTOM_ERROR, e, {
                            custom_name: dc,
                            custom_enum: cc.FORM_OBSERVER_ERROR
                        })
                    }
                }
            }, {
                key: "detectFormElement",
                value: function() {
                    try {
                        var e = [0, 0, 0],
                            t = function(e) {
                                return (t = Bc(e || Lc, document)).filter((function(e) {
                                    return !t.some((function(t) {
                                        return t.contains(e) && t !== e
                                    }))
                                }));
                                var t
                            }(this.rules);
                        if (!t) return [];
                        var n = t.map((function(e) {
                            return {
                                el: e,
                                questions: []
                            }
                        }));
                        return n.forEach((function(t) {
                            var n, r = function(e) {
                                    return Bc(Dc, e)
                                }(t.el),
                                i = new Set([]);
                            r.forEach((function(n) {
                                var r = function(e, t) {
                                    var n = Bc(xc, e);
                                    if (n && n.length) return {
                                        els: n,
                                        from: Mc.CONTAIN
                                    };
                                    var r = e.getAttribute("for");
                                    return !(!r || (n = function(e, t) {
                                        return Bc(["input[id='".concat(e, "'],select[id='").concat(e, "'],textarea[id='").concat(e, "']")], t)
                                    }(r, t), !n)) && {
                                        els: n,
                                        from: Mc.ID
                                    }
                                }(n, t.el);
                                if (r) {
                                    var o = r.els,
                                        a = r.from,
                                        c = o.filter((function(e) {
                                            return !Gc(e)
                                        })).map((function(e) {
                                            return i.add(e), {
                                                el: e,
                                                from: a
                                            }
                                        }));
                                    c && c.length && (e[a] = 1, t.questions.push({
                                        el: n,
                                        answers: c
                                    }))
                                }
                            })), (n = t.el, Bc(xc, n)).filter((function(e) {
                                return !Gc(e)
                            })).forEach((function(n) {
                                if (!i.has(n)) {
                                    e[Mc.SELECTOR] = 1;
                                    var r = function(e, t) {
                                        return function e(n) {
                                            return null == n || n.isSameNode(t) ? t : Fc(n).length > 0 ? n : e(n.parentNode)
                                        }(e.parentNode)
                                    }(n, t.el);
                                    t.questions.push({
                                        el: r,
                                        answers: [{
                                            el: n,
                                            from: Mc.SELECTOR
                                        }]
                                    })
                                }
                            }))
                        })), Ci(Sr.CUSTOM_INFO, {
                            custom_name: "form_detail_answer_from",
                            custom_enum: e.join("")
                        }), n
                    } catch (e) {
                        return wi(Sr.CUSTOM_ERROR, e, {
                            custom_name: dc,
                            custom_enum: cc.DETECT_FORM_ELEMENT_ERROR
                        }), []
                    }
                }
            }, {
                key: "calculateQuestionFilledTime",
                value: function(e) {
                    var t = e.el,
                        n = e.answers,
                        r = gc(t),
                        i = n.reduce((function(e, t) {
                            var n = t.el,
                                r = n.getAttribute("type");
                            return r && jc.indexOf(r.toLowerCase()) > -1 ? "".concat(e, ",").concat(n.checked) : "".concat(e, ",").concat(n.value)
                        }), "");
                    this.answerMap[r] || (this.answerMap[r] = {
                        defaultValue: i,
                        value: i
                    });
                    var o = this.answerMap[r],
                        a = o.defaultValue,
                        c = o.filledTime;
                    if (this.answerMap[r].value = i, a !== i) return c || (this.answerMap[r].filledTime = +new Date);
                    delete this.answerMap[r].filledTime
                }
            }, {
                key: "assembleFormDetail",
                value: function(e) {
                    var t = this,
                        n = e.el,
                        r = e.questions;
                    try {
                        var i = {
                            xpath: gc(n),
                            id: n.id,
                            name: Jc(n.getAttribute("name")),
                            tag: n.tagName.toLowerCase(),
                            class_name: n.className,
                            questions: [],
                            width: n.offsetWidth,
                            height: n.offsetHeight,
                            is_visible: Hc(n)
                        };
                        return i.questions = r.map((function(e) {
                            var n = e.el,
                                r = e.answers,
                                i = {
                                    xpath: gc(n),
                                    id: n.id,
                                    name: Jc(Fc(n)),
                                    tag: n.tagName.toLowerCase(),
                                    class_name: n.className,
                                    filled_time: t.calculateQuestionFilledTime(e),
                                    answers: [],
                                    width: n.offsetWidth,
                                    height: n.offsetHeight,
                                    is_visible: Hc(n)
                                };
                            return r.forEach((function(e) {
                                var t = e.el,
                                    n = e.from;
                                t && "SELECT" === t.tagName.toUpperCase() ? i.answers = i.answers.concat(Array.from(t.querySelectorAll("option")).map((function(e) {
                                    return {
                                        xpath: gc(e),
                                        id: e.id,
                                        name: Jc(e.value || e.innerText),
                                        tag: e.tagName.toLowerCase(),
                                        class_name: e.className,
                                        from: n,
                                        width: e.offsetWidth,
                                        height: e.offsetHeight,
                                        is_visible: Hc(t)
                                    }
                                }))) : i.answers.push({
                                    xpath: gc(t),
                                    id: t.id,
                                    name: Jc(t.getAttribute("name")),
                                    tag: t.tagName.toLowerCase(),
                                    class_name: t.className,
                                    input_type: t.getAttribute("type"),
                                    placeholder: Jc(t.getAttribute("placeholder")),
                                    from: n,
                                    width: t.offsetWidth,
                                    height: t.offsetHeight,
                                    is_visible: Hc(t)
                                })
                            })), i
                        })), i
                    } catch (e) {
                        return void wi(Sr.CUSTOM_ERROR, e, {
                            custom_name: dc,
                            custom_enum: cc.ASSEMBLE_FORM_DETAIL_ERROR
                        })
                    }
                }
            }]), e
        }(),
        Kc = ["United States", "US", "Canada", "CA", "Australia", "AU", "Mexico", "MX", "Argentina", "AR", "Chile", "CL", "Colombia", "CO", "Fiji", "FJ", "Liberia", "LR", "Namibia", "NA", "New Zealand", "NZ", "Singapore", "SG", "Solomon Islands", "SB", "Suriname", "SR", "South Africa", "ZA", "Barbados", "BB", "Belize", "BZ", "Cuba", "CU", "Dominican Republic", "DO", "Guyana", "GY", "Jamaica", "JM", "Cayman Islands", "KY", "Trinidad and Tobago", "TT", "Tuvalu", "TV", "Zimbabwe", "ZW", "United Kingdom", "GB", "Egypt", "EG", "Falkland Islands", "FK", "Gibraltar", "GI", "Guernsey", "GG", "Isle of Man", "IM", "Jersey", "JE", "Lebanon", "LB", "Saint Helena", "SH", "Syria", "SY", "Sudan", "SD", "Japan", "JP", "China", "CN", "Japan", "JP", "CN", "South Korea", "KR", "Philippines", "PH", "Cuba", "CU", "Sweden", "SE", "Norway", "NO", "Denmark", "DK", "Iceland", "IS", "Costa Rica", "CR", "El Salvador", "SV", "Bolivia", "BO", "Venezuela", "VE", "Bahamas", "BS", "Brunei", "BN", "Ethiopia", "ET", "Eritrea", "ER", "Iran", "IR", "Oman", "OM", "Qatar", "QA", "Saudi Arabia", "SA", "Yemen", "YE", "Bulgaria", "BG", "Kyrgyzstan", "KG", "Central African CFA franc zone", "XAF", "West African CFA franc zone", "XOF"].map((function(e) {
            return e.toUpperCase()
        })),
        Yc = ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BOV", "BRL", "BSD", "BTC", "BTN", "BWP", "BYN", "BYR", "BZD", "CAD", "CDF", "CHE", "CHF", "CHW", "CLF", "CLP", "CNH", "CNY", "COP", "COU", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EEK", "EGP", "ERN", "ETB", "ETH", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHC", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTC", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MRU", "MUR", "MVR", "MWK", "MXN", "MXV", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RMB", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SSP", "STD", "STN", "SVC", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRL", "TRY", "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYI", "UYU", "UYW", "UZS", "VEF", "VES", "VND", "VUV", "WST", "XAF", "XBT", "XCD", "XOF", "XPF", "XSU", "XUA", "YER", "ZAR", "ZMW", "ZWD", "ZWL"],
        qc = function(e) {
            try {
                var t = e.plugins && e.plugins.AutoConfig;
                return t && t.vc_rules
            } catch (e) {
                return
            }
        },
        Xc = function(e, t) {
            var n, r;
            try {
                var i = e.getPageInfo();
                if (i.url.includes("checkout")) {
                    var o = Object.values(t)[0];
                    for (var a in t) i.url.includes(a) && (o = t[a]);
                    if (o) {
                        var c, s = O(o);
                        try {
                            for (s.s(); !(c = s.n()).done;) {
                                var u = c.value,
                                    l = u.currency.val,
                                    f = zc(u.valueXpath, u.valueClass),
                                    d = null == f ? void 0 : f.textContent;
                                if (d) {
                                    var h = Qc(d);
                                    if (h) {
                                        var p = void 0,
                                            v = void 0,
                                            _ = void 0;
                                        if (u.currency.xpath) {
                                            var g = null === (n = document.evaluate(u.currency.xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) || void 0 === n ? void 0 : n.textContent;
                                            g && Ci(Sr.CUSTOM_INFO, {
                                                custom_name: "auto_value_currency_currency_code_form_xpath",
                                                extJSON: {
                                                    url: i.url,
                                                    currencyCode: g,
                                                    vcConfig: t
                                                }
                                            }), g && Yc.includes(g.toUpperCase().trim()) && (v = g.toUpperCase().trim())
                                        }
                                        if (u.countryCodeXpath) {
                                            var y = null === (r = document.evaluate(u.countryCodeXpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) || void 0 === r ? void 0 : r.textContent;
                                            y && Ci(Sr.CUSTOM_INFO, {
                                                custom_name: "auto_value_currency_country_form_xpath",
                                                extJSON: {
                                                    url: i.url,
                                                    country: y,
                                                    vcConfig: t
                                                }
                                            }), y && Kc.includes(y.toUpperCase().trim()) && (p = y.toUpperCase().trim())
                                        }
                                        try {
                                            var m = new URL(null == i ? void 0 : i.url).hostname.split(".");
                                            for (var E in m) Kc.includes(m[E].toUpperCase()) && (_ = m[E].toUpperCase())
                                        } catch (e) {}
                                        var b = {
                                            vc_properties: {
                                                value: h,
                                                currency: v || l,
                                                ori_value: d,
                                                rule_key: u.rule_key,
                                                country_code: p || _
                                            }
                                        };
                                        return Ci(Sr.CUSTOM_INFO, {
                                            custom_name: "auto_value_currency_update_info",
                                            extJSON: {
                                                url: i.url,
                                                autoProperties: b,
                                                vcConfig: t
                                            }
                                        }), Zc(es, b), b
                                    }
                                }
                            }
                        } catch (e) {
                            s.e(e)
                        } finally {
                            s.f()
                        }
                    }
                    return null
                }
                return null
            } catch (e) {
                return wi(Sr.CUSTOM_ERROR, e, {
                    custom_name: "auto_value_currency_update_error",
                    custom_enum: "auto_value_currency",
                    extJSON: {
                        error: e
                    }
                }), null
            }
        };

    function zc(e, t) {
        for (var n, r = document.evaluate(e, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null), i = null; n = r.iterateNext();) /\d/.test(n.innerText) && (i = n);
        if (!i && t)
            for (var o = document.getElementsByClassName(t), a = 0; a < o.length; a++) {
                var c = o[a];
                c instanceof HTMLElement && /\d/.test(c.innerText) && (i = c)
            }
        return i
    }

    function Qc(e) {
        var t, n, r, i, o = e.match(/(?:\d[\d\s,.]*\d|\d)/g);
        if (o) {
            var a, c = o[0],
                s = O(o);
            try {
                for (s.s(); !(a = s.n()).done;) {
                    if (a.value !== c) return null
                }
            } catch (e) {
                s.e(e)
            } finally {
                s.f()
            }
            return n = (t = c).replace(/[\s,\.]/g, ""), r = Math.max(t.lastIndexOf("."), t.lastIndexOf(",")), i = !1, -1 !== r && r >= t.length - 3 && (i = !0), i && (n = n.slice(0, r - (t.length - 1)) + "." + n.slice(r - (t.length - 1))), n
        }
        return null
    }
    var Zc = function(e, t) {
            try {
                sessionStorage.setItem(e, JSON.stringify(t))
            } catch (e) {}
        },
        $c = function(e) {
            try {
                var t = sessionStorage.getItem(e);
                return t ? JSON.parse(t) : null
            } catch (e) {
                return null
            }
        },
        es = "value_currency_rule",
        ts = [fc.CLICK, fc.SCROLL],
        ns = function() {
            function e(t) {
                var n = this;
                i(this, e), this.handlerArray = t, ts.forEach((function(e) {
                    window.addEventListener(e.toLowerCase(), ri((function() {
                        n.interactionHandler(e)
                    }), pc, n), {
                        capture: !0,
                        passive: !0
                    })
                }))
            }
            return a(e, [{
                key: "iterateHandlerArray",
                value: function(e) {
                    this.handlerArray.forEach((function(t) {
                        return t(e)
                    }))
                }
            }, {
                key: "interactionHandler",
                value: function(e) {
                    var t = this;
                    this.timeoutId && clearTimeout(this.timeoutId), this.iterateHandlerArray(e), this.timeoutId = setTimeout((function() {
                        t.iterateHandlerArray(e)
                    }), pc)
                }
            }]), e
        }(),
        rs = function() {
            function e() {
                i(this, e), this.history = {}
            }
            return a(e, [{
                key: "hasReport",
                value: function(e, t, n) {
                    var r = this.genHistoryKey(e, t);
                    return this.history[r] && this.history[r].indexOf(n) > -1
                }
            }, {
                key: "addHistory",
                value: function(e, t, n) {
                    var r = this.genHistoryKey(e, t);
                    this.history[r] || (this.history[r] = []), this.history[r].push(n)
                }
            }, {
                key: "clearHistory",
                value: function() {
                    this.history = {}
                }
            }, {
                key: "genHistoryKey",
                value: function(e, t) {
                    return "".concat(e, ":").concat(t)
                }
            }]), e
        }(),
        is = function() {
            function e(t, n, r) {
                i(this, e), this.context = t, this.reportHistory = new rs, this.reporters = n, this.reportService = r
            }
            return a(e, [{
                key: "report",
                value: function(e, t, n) {
                    var r = this,
                        i = Li(Er.AUTO_CONFIG),
                        o = this.getReportPixelList(t, n),
                        a = this.assemblyReportData(e, n, o);
                    a && i && qi(this.reportService.reportPreposition || []).then((function() {
                        r.reportService.report(i, a, Fn.defaultReport)
                    }))
                }
            }, {
                key: "clearHistory",
                value: function() {
                    this.reportHistory.clearHistory()
                }
            }, {
                key: "getReportPixelList",
                value: function(e, t) {
                    var n = this,
                        r = JSON.stringify(Object.assign({}, t, {
                            page_trigger: void 0
                        }));
                    return this.reporters.filter((function(t) {
                        return !!mc(t) && Ec(t, e)
                    })).filter((function(t) {
                        var i = t.getReporterId();
                        return !([uc.AUTO_COLLECTION, uc.AUTO_FORM].indexOf(e) > -1 && n.reportHistory.hasReport(e, i, r)) && (n.reportHistory.addHistory(e, i, r), t)
                    }))
                }
            }, {
                key: "assemblyReportData",
                value: function(e, t, n) {
                    var r;
                    if (0 !== n.length) {
                        var i = n.map((function(e) {
                                return e.getReporterId()
                            })),
                            o = this.context.getPageSign(),
                            a = n[0],
                            c = a.assemblyData(a.getReporterId(), "", {}, {}, Er.AUTO_CONFIG);
                        return delete c.event, c.action = e, c.auto_collected_properties = t, c.context.pixel || (c.context.pixel = {}), c.context.pixel.code = i[0], c.context.pixel.codes = i.join("|"), c.context.index = null === (r = o.pageIndex) || void 0 === r ? void 0 : r.index, c.context.session_id = o.sessionId, c.context.pageview_id = rr(this.context.getPageViewId(), a.reporterInfo.loadId, mr), c.message_id = c.message_id.replace(/-[^-]*$/, ""), c
                    }
                }
            }]), e
        }(),
        os = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        as = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        cs = "AutoConfig",
        ss = function(e) {
            s(n, e);
            var t = h(n);

            function n(e, r, o, a) {
                var c;
                return i(this, n), (c = t.call(this, {
                    name: cs,
                    reporters: r,
                    context: e
                })).autoCollectedMetadata = {}, c.initialize = !1, c.autoFormUpdateHandler = ri((function(e) {
                    if (c.autoForm) {
                        if (c.autoCollectedFormDetail = c.autoForm.getOverallFormDetail(), c.autoCollectedFormDetail.length > 3e4) return void wi(Sr.CUSTOM_ERROR, {
                            message: "".concat(String(c.autoCollectedFormDetail.length))
                        }, {
                            custom_name: dc,
                            custom_enum: cc.OVER_LENGTH
                        });
                        c.actTracker.report(sc.METADATA, uc.AUTO_FORM, {
                            page_trigger: e,
                            form_details: c.autoCollectedFormDetail
                        })
                    }
                }), 200, f(c)), c.autoCollectionUpdateHandler = ri((function(e) {
                    ao(Zi.AUTO_CONFIG_CONTENT), c.autoCollectedMetadata = kc(c.filter), co(Zi.AUTO_CONFIG_CONTENT), c.actTracker.report(sc.METADATA, uc.AUTO_COLLECTION, {
                        page_trigger: e,
                        content_data: c.autoCollectedMetadata
                    })
                }), 200, f(c)), c.autoClickCallback = function(e) {
                    try {
                        c.signal_insights_config && Xc(c.context, c.signal_insights_config);
                        var t = function(e) {
                            var t = e,
                                n = e.parentNode,
                                r = 0,
                                i = !1;
                            try {
                                i = si(t)
                            } catch (e) {
                                wi(Sr.CUSTOM_ERROR, e, {
                                    custom_name: "button_check_error",
                                    custom_enum: "auto_click",
                                    extJSON: {
                                        element: t
                                    }
                                }), i = !1
                            }
                            if (i) return t;
                            for (; r < 5 && n && n !== document;) {
                                var o = !1;
                                try {
                                    o = si(n)
                                } catch (e) {
                                    wi(Sr.CUSTOM_ERROR, e, {
                                        custom_name: "button_check_error",
                                        custom_enum: "auto_click",
                                        extJSON: {
                                            element: t
                                        }
                                    }), o = !1
                                }
                                if (o) return n;
                                n = n.parentNode, r++
                            }
                            return e
                        }(e.target);
                        if (t) {
                            var n = function(e) {
                                var t = e.tag,
                                    n = e.class,
                                    r = e.destination,
                                    i = e.id,
                                    o = e.name,
                                    a = e.type,
                                    c = e.value,
                                    s = e.rect,
                                    u = e.xpath,
                                    l = e.inner_text,
                                    f = e.image_url,
                                    d = {
                                        tag: t,
                                        attributes: {},
                                        inner_text: l,
                                        xpath: u,
                                        num_child_buttons: e.num_child_buttons,
                                        timestamp: (new Date).toISOString(),
                                        position: s ? {
                                            x: s.x,
                                            y: s.y
                                        } : {
                                            x: "",
                                            y: ""
                                        }
                                    };
                                return n && (d.attributes.class = n), r && (d.attributes.destination = r), i && (d.attributes.id = i), o && (d.attributes.name = o), a && (d.attributes.type = a), c && (d.attributes.value = c), f && (d.image_url = f), d
                            }(function(e) {
                                for (var t, n, r, i, o, a, c, s = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], u = e.attributes, l = {
                                        type: "",
                                        value: "",
                                        name: "",
                                        class: "",
                                        dataset: "",
                                        id: "",
                                        tag: "",
                                        destination: "",
                                        xpath: "",
                                        inner_text: "",
                                        image_url: "",
                                        num_child_buttons: 0
                                    }, f = 0; f < u.length; f++) {
                                    var d = u[f];
                                    l[d.name] = d.value
                                }
                                var h = e.dataset;
                                l.dataset = JSON.stringify(h), l.id = null !== (t = e.id) && void 0 !== t ? t : "", l.class = null !== (n = e.className) && void 0 !== n ? n : "", l.tag = e.tagName, l.destination = Tc(e), l.name = null !== (r = e.getAttribute("name")) && void 0 !== r ? r : "", l.value = null !== (i = e.getAttribute("value")) && void 0 !== i ? i : "", l.type = null !== (o = e.getAttribute("type")) && void 0 !== o ? o : "";
                                var p = e.getBoundingClientRect();
                                l.rect = p;
                                try {
                                    l.xpath = _c(e)
                                } catch (t) {
                                    l.xpath = "", wi(Sr.CUSTOM_ERROR, t, {
                                        custom_name: "button_check_error",
                                        custom_enum: "auto_click",
                                        extJSON: {
                                            element: e
                                        }
                                    })
                                }
                                return l.inner_text = null !== (a = e.innerText) && void 0 !== a ? a : "", l.image_url = null !== (c = e.getAttribute("src")) && void 0 !== c ? c : "", l.num_child_buttons = s ? bc(e) : 0, l
                            }(t));
                            if (function(e) {
                                    var t, n, r = (null === (t = e.inner_text) || void 0 === t ? void 0 : t.toString().toLowerCase()) || "",
                                        i = (null === (n = e.image_url) || void 0 === n ? void 0 : n.toString().toLowerCase()) || "",
                                        o = [];
                                    if (e.attributes) {
                                        var a = e.attributes;
                                        o = [a.class, a.id, a.name, a.type, a.value, a.destination].map((function(e) {
                                            return (null == e ? void 0 : e.toString().toLowerCase()) || ""
                                        }))
                                    }
                                    return [r, i].concat(y(o)).some(vc)
                                }(n)) return void Ci(Sr.CUSTOM_INFO, {
                                custom_name: "sensitive_button",
                                extJSON: {
                                    attributes: {
                                        id: n.attributes.id,
                                        tag: n.tag,
                                        class: n.attributes.class
                                    }
                                }
                            });
                            c.reportButtonClick(n)
                        }
                    } catch (e) {
                        wi(Sr.CUSTOM_ERROR, e, {
                            custom_name: "auto_click_callback_error",
                            custom_enum: "auto_click"
                        })
                    }
                }, c.filter = o.auto_config || {
                    open_graph: [],
                    microdata: [],
                    json_ld: [],
                    meta: []
                }, c.actTracker = new is(e, r, a), c
            }
            return a(n, [{
                key: "initBaseFeature",
                value: function(e) {
                    !this.initialize && mc(e) && (this.initAutoClick(), this.initAutoCollection(), this.initInteractionListener(e), this.initialize = !0)
                }
            }, {
                key: "initExtraFeature",
                value: function(e) {
                    !this.autoForm && this.initialize && Ec(e, uc.AUTO_FORM) && this.initAutoForm(e), this.initAutoVC(e)
                }
            }, {
                key: "initInteractionListener",
                value: function(e) {
                    var t = this,
                        n = e.options;
                    !this.initialize && n && !1 !== n.autoConfigListener && new ns([function(e) {
                        yc(t.autoCollectionUpdateHandler, t)(e)
                    }, function(e) {
                        yc(t.autoFormUpdateHandler, t)(e)
                    }])
                }
            }, {
                key: "initAutoClick",
                value: function() {
                    var e, t;
                    e = this.autoClickCallback, t = or((function(t) {
                        ao(Zi.AUTO_CONFIG_CLICK), e(t), co(Zi.AUTO_CONFIG_CLICK)
                    }), 1e3), document.querySelectorAll(ai.join(", ")).forEach((function(e) {
                        ci.some((function(t) {
                            return e.matches(t)
                        })) || e.addEventListener("click", t, {
                            capture: !0
                        })
                    }))
                }
            }, {
                key: "initAutoVC",
                value: function(e) {
                    var t = qc(e);
                    t && (this.signal_insights_config = t)
                }
            }, {
                key: "initAutoCollection",
                value: function() {}
            }, {
                key: "initAutoForm",
                value: function(e) {
                    ao(Zi.AUTO_CONFIG_FORM), this.autoForm = new Wc(e), co(Zi.AUTO_CONFIG_FORM), this.autoForm.addFormUpdateHandler(this.autoFormUpdateHandler.bind(this)), this.autoCollectedFormDetail = this.autoForm.getOverallFormDetail()
                }
            }, {
                key: "pixelDidMount",
                value: function(e) {
                    this.initBaseFeature(e), this.initExtraFeature(e)
                }
            }, {
                key: "pixelSend",
                value: function(e, t, n) {
                    var r = this.reporters.find((function(t) {
                        return t.getReporterId() === e
                    }));
                    this.signal_insights_config && Xc(this.context, this.signal_insights_config), r && qc(r) && $c(es) && ("CompletePayment" === t || "Pageview" === t || "InitiateCheckout" === t || "PlaceAnOrder" === t) && (n.auto_collected_properties = $c(es)), "CompletePayment" === t && setTimeout((function() {
                        ! function(e) {
                            try {
                                sessionStorage.removeItem(e)
                            } catch (e) {}
                        }(es)
                    }), 500), "Pageview" === t && (r && !mc(r) || (yc(this.autoCollectionUpdateHandler, this)(fc.PAGE_VIEW), yc(this.autoFormUpdateHandler, this)(fc.PAGE_VIEW)))
                }
            }, {
                key: "pageUrlDidChange",
                value: function(e, t) {
                    null != t && "" != t && (this.autoCollectionUpdateHandler(fc.URL_CHANGE), this.autoFormUpdateHandler(fc.URL_CHANGE))
                }
            }, {
                key: "pageWillLeave",
                value: function() {
                    this.autoCollectionUpdateHandler(fc.PAGE_LEAVE), this.autoFormUpdateHandler(fc.PAGE_LEAVE)
                }
            }, {
                key: "reportButtonClick",
                value: function(e) {
                    var t;
                    this.actTracker.report(sc.CLICK, uc.AUTO_VC, {
                        page_trigger: fc.CLICK,
                        trigger_element: e,
                        vc_properties: null === (t = $c(es)) || void 0 === t ? void 0 : t.vc_properties
                    }), this.actTracker.report(sc.CLICK, uc.AUTO_VC_REVERSE, {
                        page_trigger: fc.CLICK,
                        trigger_element: e
                    })
                }
            }]), n
        }(To);
    ss = os([A.injectable(), as(0, A.inject(Or.CONTEXT)), as(1, A.inject(Or.TTQ_REPORTERS)), as(2, A.inject(Or.TTQ_GLOBAL_OPTIONS)), as(3, A.inject(Or.REPORT_SERVICE))], ss);
    var us = {
        exports: {}
    };
    ! function(e, t) {
        var n = "__lodash_hash_undefined__",
            r = 9007199254740991,
            i = "[object Arguments]",
            o = "[object Boolean]",
            a = "[object Date]",
            c = "[object Function]",
            s = "[object GeneratorFunction]",
            u = "[object Map]",
            l = "[object Number]",
            f = "[object Object]",
            d = "[object Promise]",
            h = "[object RegExp]",
            p = "[object Set]",
            v = "[object String]",
            _ = "[object Symbol]",
            g = "[object WeakMap]",
            y = "[object ArrayBuffer]",
            m = "[object DataView]",
            E = "[object Float32Array]",
            b = "[object Float64Array]",
            T = "[object Int8Array]",
            I = "[object Int16Array]",
            O = "[object Int32Array]",
            S = "[object Uint8Array]",
            R = "[object Uint8ClampedArray]",
            A = "[object Uint16Array]",
            P = "[object Uint32Array]",
            C = /\w*$/,
            w = /^\[object .+?Constructor\]$/,
            k = /^(?:0|[1-9]\d*)$/,
            M = {};
        M[i] = M["[object Array]"] = M[y] = M[m] = M[o] = M[a] = M[E] = M[b] = M[T] = M[I] = M[O] = M[u] = M[l] = M[f] = M[h] = M[p] = M[v] = M[_] = M[S] = M[R] = M[A] = M[P] = !0, M["[object Error]"] = M[c] = M[g] = !1;
        var L = "object" == typeof N && N && N.Object === Object && N,
            D = "object" == typeof self && self && self.Object === Object && self,
            x = L || D || Function("return this")(),
            j = t && !t.nodeType && t,
            U = j && e && !e.nodeType && e,
            B = U && U.exports === j;

        function F(e, t) {
            return e.set(t[0], t[1]), e
        }

        function H(e, t) {
            return e.add(t), e
        }

        function V(e, t, n, r) {
            var i = -1,
                o = e ? e.length : 0;
            for (r && o && (n = e[++i]); ++i < o;) n = t(n, e[i], i, e);
            return n
        }

        function G(e) {
            var t = !1;
            if (null != e && "function" != typeof e.toString) try {
                t = !!(e + "")
            } catch (e) {}
            return t
        }

        function J(e) {
            var t = -1,
                n = Array(e.size);
            return e.forEach((function(e, r) {
                n[++t] = [r, e]
            })), n
        }

        function W(e, t) {
            return function(n) {
                return e(t(n))
            }
        }

        function K(e) {
            var t = -1,
                n = Array(e.size);
            return e.forEach((function(e) {
                n[++t] = e
            })), n
        }
        var Y = Array.prototype,
            q = Function.prototype,
            X = Object.prototype,
            z = x["__core-js_shared__"],
            Q = function() {
                var e = /[^.]+$/.exec(z && z.keys && z.keys.IE_PROTO || "");
                return e ? "Symbol(src)_1." + e : ""
            }(),
            Z = q.toString,
            $ = X.hasOwnProperty,
            ee = X.toString,
            te = RegExp("^" + Z.call($).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
            ne = B ? x.Buffer : void 0,
            re = x.Symbol,
            ie = x.Uint8Array,
            oe = W(Object.getPrototypeOf, Object),
            ae = Object.create,
            ce = X.propertyIsEnumerable,
            se = Y.splice,
            ue = Object.getOwnPropertySymbols,
            le = ne ? ne.isBuffer : void 0,
            fe = W(Object.keys, Object),
            de = je(x, "DataView"),
            he = je(x, "Map"),
            pe = je(x, "Promise"),
            ve = je(x, "Set"),
            _e = je(x, "WeakMap"),
            ge = je(Object, "create"),
            ye = Ve(de),
            me = Ve(he),
            Ee = Ve(pe),
            be = Ve(ve),
            Te = Ve(_e),
            Ie = re ? re.prototype : void 0,
            Oe = Ie ? Ie.valueOf : void 0;

        function Se(e) {
            var t = -1,
                n = e ? e.length : 0;
            for (this.clear(); ++t < n;) {
                var r = e[t];
                this.set(r[0], r[1])
            }
        }

        function Ne(e) {
            var t = -1,
                n = e ? e.length : 0;
            for (this.clear(); ++t < n;) {
                var r = e[t];
                this.set(r[0], r[1])
            }
        }

        function Re(e) {
            var t = -1,
                n = e ? e.length : 0;
            for (this.clear(); ++t < n;) {
                var r = e[t];
                this.set(r[0], r[1])
            }
        }

        function Ae(e) {
            this.__data__ = new Ne(e)
        }

        function Pe(e, t) {
            var n = Je(e) || function(e) {
                    return function(e) {
                        return function(e) {
                            return !!e && "object" == typeof e
                        }(e) && We(e)
                    }(e) && $.call(e, "callee") && (!ce.call(e, "callee") || ee.call(e) == i)
                }(e) ? function(e, t) {
                    for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n);
                    return r
                }(e.length, String) : [],
                r = n.length,
                o = !!r;
            for (var a in e) !t && !$.call(e, a) || o && ("length" == a || Fe(a, r)) || n.push(a);
            return n
        }

        function Ce(e, t, n) {
            var r = e[t];
            $.call(e, t) && Ge(r, n) && (void 0 !== n || t in e) || (e[t] = n)
        }

        function we(e, t) {
            for (var n = e.length; n--;)
                if (Ge(e[n][0], t)) return n;
            return -1
        }

        function ke(e, t, n, r, d, g, N) {
            var w;
            if (r && (w = g ? r(e, d, g, N) : r(e)), void 0 !== w) return w;
            if (!qe(e)) return e;
            var k = Je(e);
            if (k) {
                if (w = function(e) {
                        var t = e.length,
                            n = e.constructor(t);
                        t && "string" == typeof e[0] && $.call(e, "index") && (n.index = e.index, n.input = e.input);
                        return n
                    }(e), !t) return function(e, t) {
                    var n = -1,
                        r = e.length;
                    t || (t = Array(r));
                    for (; ++n < r;) t[n] = e[n];
                    return t
                }(e, w)
            } else {
                var L = Be(e),
                    D = L == c || L == s;
                if (Ke(e)) return function(e, t) {
                    if (t) return e.slice();
                    var n = new e.constructor(e.length);
                    return e.copy(n), n
                }(e, t);
                if (L == f || L == i || D && !g) {
                    if (G(e)) return g ? e : {};
                    if (w = function(e) {
                            return "function" != typeof e.constructor || He(e) ? {} : (t = oe(e), qe(t) ? ae(t) : {});
                            var t
                        }(D ? {} : e), !t) return function(e, t) {
                        return De(e, Ue(e), t)
                    }(e, function(e, t) {
                        return e && De(t, Xe(t), e)
                    }(w, e))
                } else {
                    if (!M[L]) return g ? e : {};
                    w = function(e, t, n, r) {
                        var i = e.constructor;
                        switch (t) {
                            case y:
                                return Le(e);
                            case o:
                            case a:
                                return new i(+e);
                            case m:
                                return function(e, t) {
                                    var n = t ? Le(e.buffer) : e.buffer;
                                    return new e.constructor(n, e.byteOffset, e.byteLength)
                                }(e, r);
                            case E:
                            case b:
                            case T:
                            case I:
                            case O:
                            case S:
                            case R:
                            case A:
                            case P:
                                return function(e, t) {
                                    var n = t ? Le(e.buffer) : e.buffer;
                                    return new e.constructor(n, e.byteOffset, e.length)
                                }(e, r);
                            case u:
                                return function(e, t, n) {
                                    return V(t ? n(J(e), !0) : J(e), F, new e.constructor)
                                }(e, r, n);
                            case l:
                            case v:
                                return new i(e);
                            case h:
                                return function(e) {
                                    var t = new e.constructor(e.source, C.exec(e));
                                    return t.lastIndex = e.lastIndex, t
                                }(e);
                            case p:
                                return function(e, t, n) {
                                    return V(t ? n(K(e), !0) : K(e), H, new e.constructor)
                                }(e, r, n);
                            case _:
                                return c = e, Oe ? Object(Oe.call(c)) : {}
                        }
                        var c
                    }(e, L, ke, t)
                }
            }
            N || (N = new Ae);
            var x = N.get(e);
            if (x) return x;
            if (N.set(e, w), !k) var j = n ? function(e) {
                return function(e, t, n) {
                    var r = t(e);
                    return Je(e) ? r : function(e, t) {
                        for (var n = -1, r = t.length, i = e.length; ++n < r;) e[i + n] = t[n];
                        return e
                    }(r, n(e))
                }(e, Xe, Ue)
            }(e) : Xe(e);
            return function(e, t) {
                for (var n = -1, r = e ? e.length : 0; ++n < r && !1 !== t(e[n], n, e););
            }(j || e, (function(i, o) {
                j && (i = e[o = i]), Ce(w, o, ke(i, t, n, r, o, e, N))
            })), w
        }

        function Me(e) {
            return !(!qe(e) || (t = e, Q && Q in t)) && (Ye(e) || G(e) ? te : w).test(Ve(e));
            var t
        }

        function Le(e) {
            var t = new e.constructor(e.byteLength);
            return new ie(t).set(new ie(e)), t
        }

        function De(e, t, n, r) {
            n || (n = {});
            for (var i = -1, o = t.length; ++i < o;) {
                var a = t[i],
                    c = r ? r(n[a], e[a], a, n, e) : void 0;
                Ce(n, a, void 0 === c ? e[a] : c)
            }
            return n
        }

        function xe(e, t) {
            var n, r, i = e.__data__;
            return ("string" == (r = typeof(n = t)) || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== n : null === n) ? i["string" == typeof t ? "string" : "hash"] : i.map
        }

        function je(e, t) {
            var n = function(e, t) {
                return null == e ? void 0 : e[t]
            }(e, t);
            return Me(n) ? n : void 0
        }
        Se.prototype.clear = function() {
            this.__data__ = ge ? ge(null) : {}
        }, Se.prototype.delete = function(e) {
            return this.has(e) && delete this.__data__[e]
        }, Se.prototype.get = function(e) {
            var t = this.__data__;
            if (ge) {
                var r = t[e];
                return r === n ? void 0 : r
            }
            return $.call(t, e) ? t[e] : void 0
        }, Se.prototype.has = function(e) {
            var t = this.__data__;
            return ge ? void 0 !== t[e] : $.call(t, e)
        }, Se.prototype.set = function(e, t) {
            return this.__data__[e] = ge && void 0 === t ? n : t, this
        }, Ne.prototype.clear = function() {
            this.__data__ = []
        }, Ne.prototype.delete = function(e) {
            var t = this.__data__,
                n = we(t, e);
            return !(n < 0) && (n == t.length - 1 ? t.pop() : se.call(t, n, 1), !0)
        }, Ne.prototype.get = function(e) {
            var t = this.__data__,
                n = we(t, e);
            return n < 0 ? void 0 : t[n][1]
        }, Ne.prototype.has = function(e) {
            return we(this.__data__, e) > -1
        }, Ne.prototype.set = function(e, t) {
            var n = this.__data__,
                r = we(n, e);
            return r < 0 ? n.push([e, t]) : n[r][1] = t, this
        }, Re.prototype.clear = function() {
            this.__data__ = {
                hash: new Se,
                map: new(he || Ne),
                string: new Se
            }
        }, Re.prototype.delete = function(e) {
            return xe(this, e).delete(e)
        }, Re.prototype.get = function(e) {
            return xe(this, e).get(e)
        }, Re.prototype.has = function(e) {
            return xe(this, e).has(e)
        }, Re.prototype.set = function(e, t) {
            return xe(this, e).set(e, t), this
        }, Ae.prototype.clear = function() {
            this.__data__ = new Ne
        }, Ae.prototype.delete = function(e) {
            return this.__data__.delete(e)
        }, Ae.prototype.get = function(e) {
            return this.__data__.get(e)
        }, Ae.prototype.has = function(e) {
            return this.__data__.has(e)
        }, Ae.prototype.set = function(e, t) {
            var n = this.__data__;
            if (n instanceof Ne) {
                var r = n.__data__;
                if (!he || r.length < 199) return r.push([e, t]), this;
                n = this.__data__ = new Re(r)
            }
            return n.set(e, t), this
        };
        var Ue = ue ? W(ue, Object) : function() {
                return []
            },
            Be = function(e) {
                return ee.call(e)
            };

        function Fe(e, t) {
            return !!(t = null == t ? r : t) && ("number" == typeof e || k.test(e)) && e > -1 && e % 1 == 0 && e < t
        }

        function He(e) {
            var t = e && e.constructor;
            return e === ("function" == typeof t && t.prototype || X)
        }

        function Ve(e) {
            if (null != e) {
                try {
                    return Z.call(e)
                } catch (e) {}
                try {
                    return e + ""
                } catch (e) {}
            }
            return ""
        }

        function Ge(e, t) {
            return e === t || e != e && t != t
        }(de && Be(new de(new ArrayBuffer(1))) != m || he && Be(new he) != u || pe && Be(pe.resolve()) != d || ve && Be(new ve) != p || _e && Be(new _e) != g) && (Be = function(e) {
            var t = ee.call(e),
                n = t == f ? e.constructor : void 0,
                r = n ? Ve(n) : void 0;
            if (r) switch (r) {
                case ye:
                    return m;
                case me:
                    return u;
                case Ee:
                    return d;
                case be:
                    return p;
                case Te:
                    return g
            }
            return t
        });
        var Je = Array.isArray;

        function We(e) {
            return null != e && function(e) {
                return "number" == typeof e && e > -1 && e % 1 == 0 && e <= r
            }(e.length) && !Ye(e)
        }
        var Ke = le || function() {
            return !1
        };

        function Ye(e) {
            var t = qe(e) ? ee.call(e) : "";
            return t == c || t == s
        }

        function qe(e) {
            var t = typeof e;
            return !!e && ("object" == t || "function" == t)
        }

        function Xe(e) {
            return We(e) ? Pe(e) : function(e) {
                if (!He(e)) return fe(e);
                var t = [];
                for (var n in Object(e)) $.call(e, n) && "constructor" != n && t.push(n);
                return t
            }(e)
        }
        e.exports = function(e) {
            return ke(e, !0, !0)
        }
    }(us, us.exports);
    var ls = us.exports,
        fs = {
            EMPTY_EVENT_TYPE_NAME: {
                title: "Missing Event Name",
                desc: "The event name for one or more of your events is empty. This can affect the accuracy of reporting for your conversions.",
                suggestion: "Go to your source code and add a name that follows our format requirements and TikTok policies.",
                link: "https://ads.tiktok.com/marketing_api/docs?rid=5ipocbxyw8v&id=1701890973258754"
            },
            INVALID_CONTENT_ID: {
                title: "Missing value for content ID",
                desc: "Include a value for your 'content_id' parameter. This is required for Video Shopping Ads (VSA).",
                suggestion: "If you are or plan to run Video Shopping Ads (VSA), go to your source code and include a value for the 'content_id' parameter.",
                link: "https://ads.tiktok.com/help/article/standard-events-parameters?redirected=2"
            },
            INVALID_CONTENT_TYPE: {
                title: "Invalid content type",
                desc: 'The content type for one or more of your events is invalid. Content type must be either "product" or "product_group".',
                suggestion: "Go to your source code and update the content type.",
                link: "https://ads.tiktok.com/help/article/standard-events-parameters?redirected=2"
            },
            INVALID_CURRENCY_CODE: {
                title: "Invalid currency code",
                desc: "The currency code for one or more of your events isn't supported. This can affect the accuracy of reporting for your ROAS.",
                suggestion: "Go to your source code and update the 'currency' parameters with a supported currency code.",
                link: "https://ads.tiktok.com/help/article/standard-events-parameters?redirected=2"
            },
            INVALID_EMAIL_FORMAT: {
                title: "Incorrect email format",
                desc: "The email format for your events does not match the format supported. This can impact Advanced Matching and your ad performance.",
                suggestion: "Go to your source code and update the format of your shared emails. It should follow 'xxx@xxx.com' format.",
                link: "https://ads.tiktok.com/marketing_api/docs?id=1739585700402178"
            },
            INVALID_EMAIL_INFORMATION: {
                title: "Invalid email information",
                desc: "The emails shared with your events were invalid.",
                suggestion: 'Go to your source code to double check shared emails. Leave your string empty when customer information isn\'t available. Avoid spaces, "undefined", or other hardcoded values.',
                link: "https://ads.tiktok.com/marketing_api/docs?id=1739585700402178"
            },
            INVALID_EVENT_PARAMETER_VALUE: {
                title: "Invalid value parameter",
                desc: "The 'value' parameter for one or more of your events is invalid. This is used calculate ROAS for people and the bid for your highest value customers. Parameters must be an integer or in the decimal format (e.g. 9.99). Also, they can't contain currency symbols, special characters, letters, or commas.",
                suggestion: "Go to your source code and update the 'value' parameter. It can only include numbers greater than or equal to zero (e.g. 9.99). Do not include currency symbols, special characters, letters, or commas.",
                link: "https://ads.tiktok.com/help/article/standard-events-parameters?redirected=2"
            },
            INVALID_PHONE_NUMBER_FORMAT: {
                title: "Incorrect phone number format",
                desc: "The phone number format for your events doesn't follow the E.164 format. This can affect Advanced Matching and your ad performance.",
                suggestion: "Go to your source code and update your shared phone numbers. It should follow the E.164 format.",
                link: "https://ads.tiktok.com/marketing_api/docs?id=1739585700402178"
            },
            INVALID_PHONE_NUMBER_INFORMATION: {
                title: "Invalid phone number information",
                desc: "The phone numbers shared with your events were invalid.",
                suggestion: 'Go to your source code to double check shared phone numbers. Leave your string empty when customer information isn\'t available. Avoid spaces, "undefined", or other hardcoded values.',
                link: "https://ads.tiktok.com/marketing_api/docs?id=1739585700402178"
            },
            LONG_EVENT_TYPE_NAME: {
                title: "Event Name Too Long",
                desc: "1 event type exceeds the 50 character limit.",
                suggestion: "Go to your source code and make these event names 50 characters or less.",
                link: "https://ads.tiktok.com/help/article/custom-events?lang=en"
            },
            MISMATCHED_EVENT_TYPE_NAME_FOR_CUSTOM_EVENT: {
                title: "Invalid Event Name Format",
                desc: "1 event name was rejected for not following TikTok format requirements.",
                suggestion: "Go to your source code and update these event types according to TikTok format requirements.",
                link: "https://ads.tiktok.com/help/article/custom-events?lang=en"
            },
            MISSING_CONTENT_ID: {
                title: "Missing 'content_id' paramter",
                desc: "The 'content_id' parameter isn't being received. This is required for Video Shopping Ads (VSA).",
                suggestion: "Include the 'content_id' parameter in your source code. This is required for Video Shopping Ads (VSA).",
                link: "https://ads.tiktok.com/help/article/standard-events-parameters?redirected=2"
            },
            MISSING_CURRENCY_PARAMETER: {
                title: 'Missing "currency" parameter',
                desc: "Events shared are missing a 'currency' parameter. This impacts our ability to receive the value amount correctly, which can affect the accuracy of reporting for your return on ad spend.",
                suggestion: 'Go to your source code and include the "currency" parameter. You can check supported currency codes. {{learn_more}}',
                link: "https://ads.tiktok.com/help/article/standard-events-parameters?redirected=2"
            },
            MISSING_EMAIL_AND_PHONE: {
                title: "Missing email and phone number",
                desc: "Email and phone number info isn't being received. This information is required for Complete Payment events.",
                suggestion: "Improve your email and phone coverage. This allows you to attribute more conversions and reach more people with your ads.",
                link: "https://ads.tiktok.com/marketing_api/docs?rid=5ipocbxyw8v&id=1701890972946433"
            },
            MISSING_VALUE_PARAMETER: {
                title: 'Missing "value" parameter',
                desc: "Events shared are missing a 'value' parameter'. This is used calculate ROAS for people and the bid for your highest value customers. ",
                suggestion: 'Go to your source code and include the "value" parameter.',
                link: "https://ads.tiktok.com/help/article/standard-events-parameters?redirected=2"
            },
            DUPLICATE_PIXEL_CODE: {
                title: "Duplicate Pixel ID",
                desc: "The pixel ID is duplicate. This could impact the pixel data accuracy.",
                suggestion: "Please double check and delete any unnecessary pixel code.",
                link: ""
            },
            MISSING_PIXEL_CODE: {
                title: "Missing pixel ID",
                desc: "Some of the events sent to your TikTok account are missing a pixel ID.",
                suggestion: "Go to your source code and double check that the 20-character pixel ID has been added to the ttq.load() function. Don't send null values or spaces. If you edited the base code, ensure the event.js has the 'sdkid' in the Chrome network panel.",
                link: ""
            },
            INVALID_PIXEL_CODE: {
                title: "Invalid pixel ID",
                desc: "The pixel ID is invalid. This could prevent your pixel from receiving data.",
                suggestion: "Please go to Events Manager and find the correct pixel ID.",
                link: ""
            }
        },
        ds = /^[a-zA-Z\d]([a-zA-Z_\-\d ]{0,}[a-zA-Z_\-\d])?$/,
        hs = ["product", "product_group"],
        ps = ["email_is_hashed", "phone_is_hashed", "sha256_email", "sha256_phone"],
        vs = ["AED", "ARS", "AUD", "BDT", "BHD", "BIF", "BOB", "BRL", "CAD", "CHF", "CLP", "CNY", "COP", "CRC", "CZK", "DKK", "DZD", "EGP", "EUR", "GBP", "GTQ", "HKD", "HNL", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KES", "KHR", "KRW", "KWD", "KZT", "MAD", "MOP", "MXN", "MYR", "NGN", "NIO", "NOK", "NZD", "OMR", "PEN", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RUB", "SAR", "SEK", "SGD", "THB", "TRY", "TWD", "UAH", "USD", "VES", "VND", "ZAR"],
        _s = ["CompletePayment", "InitiateCheckout", "AddToCart", "PlaceAnOrder", "ViewContent", "AddToWishlist"],
        gs = function(e) {
            return void 0 === e
        },
        ys = "CompletePayment",
        ms = function(e) {
            var t = e.event,
                n = void 0 === t ? "" : t;
            return !!["null", "undefined"].includes(n) || (!!/^\s*$/.test(n) || !n)
        },
        Es = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        bs = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        Ts = function(e) {
            s(n, e);
            var t = h(n);

            function n(e, r, o) {
                var a, c;
                return i(this, n), (a = t.call(this, {
                    name: "DiagnosticsConsole",
                    reporters: r,
                    context: e
                })).isEnableDiagnosticsConsole = !1, a.isEnableDiagnosticsConsole = Boolean(null === (c = null == o ? void 0 : o.plugins) || void 0 === c ? void 0 : c.DiagnosticsConsole), a
            }
            return a(n, [{
                key: "isDisableDiagnosticsConsole",
                value: function() {
                    try {
                        return !this.isEnableDiagnosticsConsole || Boolean(Object.values(this.reporters).some((function(e) {
                            var t, n;
                            return void 0 !== (null === (t = null == e ? void 0 : e.options) || void 0 === t ? void 0 : t.diagnostics) && !(null === (n = null == e ? void 0 : e.options) || void 0 === n ? void 0 : n.diagnostics)
                        })))
                    } catch (e) {
                        return !1
                    }
                }
            }, {
                key: "warn",
                value: function(e, t) {
                    try {
                        if (this.isDisableDiagnosticsConsole()) return;
                        ! function(e, t) {
                            if (Nr[e]) {
                                var n = Gr(),
                                    r = fs[e],
                                    i = "".concat("[TikTok Pixel]", " - ").concat(r.title);
                                r.desc && (i += "\nIssue: ".concat(r.desc)), r.suggestion && (i += "\nSuggestion: ".concat(r.suggestion)), t && Object.keys(t).forEach((function(e) {
                                    i = i.split("{{".concat(e, "}}")).join(t[e])
                                })), i = i.trim(), r.link && (i += " See ".concat(r.link, " for more information.")), n && n.console && n.console.warn && n.console.warn(i)
                            }
                        }(e, t)
                    } catch (t) {
                        wi(Sr.CUSTOM_ERROR, t, {
                            custom_name: "diagnostics_console",
                            custom_enum: e
                        })
                    }
                }
            }, {
                key: "pixelDidMount",
                value: function(e) {
                    var t = this;
                    e.getParameterInfo().then((function(e) {
                        t.handlePixelInfoValidate(e)
                    })).catch((function(e) {
                        wi(Sr.CUSTOM_ERROR, e, {
                            custom_name: "diagnostics_console",
                            custom_enum: "pixel"
                        })
                    }))
                }
            }, {
                key: "pixelSend",
                value: function(e, t, n) {
                    var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        i = arguments.length > 4 ? arguments[4] : void 0;
                    try {
                        r && r._i || i !== Er.TRACK || t === Tr || this.handleEventPayloadValidate(ls(n || {}))
                    } catch (e) {
                        wi(Sr.CUSTOM_ERROR, e, {
                            custom_name: "diagnostics_console",
                            custom_enum: "track"
                        })
                    }
                }
            }, {
                key: "handlePixelInfoValidate",
                value: function(e) {
                    if (e.status === Ro.Live);
                    else this.warn(Nr.INVALID_PIXEL_CODE)
                }
            }, {
                key: "handleEventPayloadValidate",
                value: function(e) {
                    e.properties || (e.properties = {}), ms(e) && this.warn(Nr.EMPTY_EVENT_TYPE_NAME),
                        function(e) {
                            var t = e.event,
                                n = void 0 === t ? "" : t;
                            return !!ms(e) || ds.test(n)
                        }(e) || this.warn(Nr.MISMATCHED_EVENT_TYPE_NAME_FOR_CUSTOM_EVENT),
                        function(e) {
                            var t = e.event;
                            return (void 0 === t ? "" : t).length <= 50
                        }(e) || this.warn(Nr.LONG_EVENT_TYPE_NAME),
                        function(e) {
                            var t = e.event,
                                n = e._inspection;
                            if (t === ys) {
                                var r = (void 0 === n ? {} : n).identity_params,
                                    i = void 0 === r ? {} : r;
                                return 0 === Object.keys(i).length || ps.every((function(e) {
                                    return (i[e] || []).includes(Gn.EMPTY_VALUE)
                                }))
                            }
                            return !1
                        }(e) && this.warn(Nr.MISSING_EMAIL_AND_PHONE),
                        function(e) {
                            var t = e._inspection,
                                n = void 0 === t ? {} : t;
                            return !(!n || !n.identity_params) && ((n.identity_params.email_is_hashed || []).includes(Gn.FILTER_EVENTS) || (n.identity_params.sha256_email || []).includes(Gn.FILTER_EVENTS))
                        }(e) && this.warn(Nr.INVALID_EMAIL_INFORMATION),
                        function(e) {
                            var t = e._inspection,
                                n = void 0 === t ? {} : t;
                            return !(!n || !n.identity_params) && ((n.identity_params.email_is_hashed || []).includes(Gn.UNKNOWN_INVALID) || (n.identity_params.sha256_email || []).includes(Gn.UNKNOWN_INVALID))
                        }(e) && this.warn(Nr.INVALID_EMAIL_FORMAT),
                        function(e) {
                            var t = e._inspection,
                                n = void 0 === t ? {} : t;
                            return !(!n || !n.identity_params) && ((n.identity_params.phone_is_hashed || []).includes(Gn.FILTER_EVENTS) || (n.identity_params.sha256_phone || []).includes(Gn.FILTER_EVENTS))
                        }(e) && this.warn(Nr.INVALID_PHONE_NUMBER_INFORMATION),
                        function(e) {
                            var t = e._inspection,
                                n = void 0 === t ? {} : t;
                            return !(!n || !n.identity_params) && ((n.identity_params.phone_is_hashed || []).includes(Gn.UNKNOWN_INVALID) || (n.identity_params.sha256_phone || []).includes(Gn.UNKNOWN_INVALID))
                        }(e) && this.warn(Nr.INVALID_PHONE_NUMBER_FORMAT),
                        function(e) {
                            var t = e.event,
                                n = void 0 === t ? "" : t,
                                r = e.properties,
                                i = void 0 === r ? {} : r;
                            if (_s.includes(n)) {
                                if (gs(i.contents) && gs(i.content_id)) return !0;
                                if (!gs(i.contents)) return !Array.isArray(i.contents) || i.contents.length < 1 || !i.contents.every((function(e) {
                                    return e && !gs(e.content_id)
                                }))
                            }
                            return !1
                        }(e) && this.warn(Nr.MISSING_CONTENT_ID),
                        function(e) {
                            var t = e.properties,
                                n = void 0 === t ? {} : t,
                                r = n.content_id,
                                i = n.contents;
                            return !(!gs(r) && /^\s*$/.test(r)) && (!(!gs(i) && Array.isArray(i)) || i.every((function(e) {
                                return e && !gs(e.content_id) && !/^\s*$/.test(e.content_id)
                            })))
                        }(e) || this.warn(Nr.INVALID_CONTENT_ID),
                        function(e) {
                            var t = e.properties.content_type;
                            return !t || hs.includes(t)
                        }(e) || this.warn(Nr.INVALID_CONTENT_TYPE),
                        function(e) {
                            var t = e.properties.value;
                            return !t || "number" == typeof t || !("string" != typeof t || !/^\d+(\.\d+)?$/.test(t) && !/^\d+$/.test(t))
                        }(e) || this.warn(Nr.INVALID_EVENT_PARAMETER_VALUE),
                        function(e) {
                            var t = e.event,
                                n = void 0 === t ? "" : t,
                                r = e.properties,
                                i = void 0 === r ? {} : r;
                            return !(n !== ys || !gs(i.value)) || !(gs(i.currency) || !gs(i.value))
                        }(e) && this.warn(Nr.MISSING_VALUE_PARAMETER),
                        function(e) {
                            var t = e.properties.currency;
                            return !t || vs.includes(t)
                        }(e) || this.warn(Nr.INVALID_CURRENCY_CODE),
                        function(e) {
                            var t = e.event,
                                n = void 0 === t ? "" : t,
                                r = e.properties,
                                i = void 0 === r ? {} : r;
                            return !(n !== ys || !gs(i.currency)) || !(gs(i.value) || !gs(i.currency))
                        }(e) && this.warn(Nr.MISSING_CURRENCY_PARAMETER, {
                            learn_more: ""
                        })
                }
            }]), n
        }(To);
    Ts = Es([A.injectable(), bs(0, A.inject(Or.CONTEXT)), bs(1, A.inject(Or.TTQ_REPORTERS)), bs(2, A.inject(Or.TTQ_GLOBAL_OPTIONS))], Ts);
    var Is = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        Os = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        Ss = function(e) {
            s(n, e);
            var t = h(n);

            function n(e, r, o, a) {
                var c;
                return i(this, n), (c = t.call(this, {
                    name: "PangleCookieMatching",
                    reporters: r,
                    context: e
                })).hasReport = !1, c.reportService = o, c.env = a, c
            }
            return a(n, [{
                key: "isPixelPangleCookieMatching",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                        t = this.reporters;
                    if (e) {
                        var n = t.find((function(t) {
                            return t.getReporterId() === e
                        }));
                        if (n && n.plugins.PangleCookieMatching) return !0
                    } else if (t.some((function(e) {
                            return Boolean(e.plugins.PangleCookieMatching)
                        }))) return !0;
                    return !1
                }
            }, {
                key: "disablePangleCookie",
                value: function() {
                    this.isPixelPangleCookieMatching() && Yi("https://analytics.pangle-ads.com/api/v2/pangle_disable_cookie")
                }
            }, {
                key: "pixelSend",
                value: function(e, t, n) {
                    var r;
                    try {
                        if (0 === (null === (r = this.context.getPageSign().pageIndex) || void 0 === r ? void 0 : r.index) && !gi(this.env) && n && n.message_id && this.isPixelPangleCookieMatching(e) && !this.hasReport) {
                            var i = {
                                event: n.event,
                                message_id: n.message_id,
                                context: {
                                    library: n.context.library
                                },
                                timestamp: (new Date).toJSON()
                            };
                            this.hasReport = !0, this.reportService.report("https://analytics.pangle-ads.com/api/v2/pangle_pixel", i, Fn.httpReport)
                        }
                    } catch (e) {
                        wi(Sr.CUSTOM_ERROR, e, {
                            custom_name: "pangle_report"
                        })
                    }
                }
            }]), n
        }(To);
    Ss = Is([A.injectable(), Os(0, A.inject(Or.CONTEXT)), Os(1, A.inject(Or.TTQ_REPORTERS)), Os(2, A.inject(Or.REPORT_SERVICE)), Os(3, A.inject(Or.ENV))], Ss);
    var Ns, Rs = "https://analytics.tiktok.com/i18n/pixel/eb.js",
        As = "_tt_event_builder";
    ! function(e) {
        e.EVENT_BUILD_BOOTSTRAP_ACK = "event_builder_bootstrap_ack", e.EVENT_BUILD_WRONG_CODE = "event_builder_wrong_code", e.EVENT_BUILD_BOOTSTRAP = "event_builder_bootstrap"
    }(Ns || (Ns = {}));
    var Ps = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        Cs = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        ws = function(e) {
            s(n, e);
            var t = h(n);

            function n(e, r) {
                var o;
                return i(this, n), (o = t.call(this, {
                    name: "EventBuilder",
                    reporters: r,
                    context: e
                })).pluginMounted = !1, o
            }
            return a(n, [{
                key: "pixelDidMount",
                value: function(e) {
                    var t = this;
                    if (!this.pluginMounted) {
                        this.pluginMounted = !0;
                        var n = Wr(),
                            r = function(e) {
                                e.data.type !== Ns.EVENT_BUILD_BOOTSTRAP || n._event_builder_pickup_sdk_loaded || (t.reporters.find((function(t) {
                                    return t.getReporterId() === e.data.pixelCode
                                })) ? (n._event_builder_pickup_sdk_loaded = !0, xi(As, {
                                    pixelCode: e.data.pixelCode,
                                    token: e.data.token,
                                    advId: e.data.advId,
                                    emUrl: e.data.emUrl,
                                    lang: e.data.lang
                                }), Yi(Rs).then((function() {
                                    window.opener.window.postMessage({
                                        type: Ns.EVENT_BUILD_BOOTSTRAP_ACK
                                    }, "*")
                                })).catch((function(e) {
                                    wi(Sr.CUSTOM_ERROR, e, {
                                        custom_name: "event_builder_load_error",
                                        custom_enum: "load_ebjs"
                                    })
                                }))) : n._event_builder_pickup_sdk_verify_flag || (setTimeout((function() {
                                    t.reporters.find((function(t) {
                                        return t.getReporterId() === e.data.pixelCode
                                    })) || window.opener.window.postMessage({
                                        type: Ns.EVENT_BUILD_WRONG_CODE
                                    }, "*")
                                }), 5e3), n._event_builder_pickup_sdk_verify_flag = !0))
                            };
                        n._event_builder_pickup_sdk_loaded || (Di(As) ? Yi(Rs).then((function() {
                            n._event_builder_pickup_sdk_loaded = !0
                        })) : window.opener && (window.addEventListener("message", r), setTimeout((function() {
                            window.removeEventListener("message", r)
                        }), 8e3)))
                    }
                }
            }]), n
        }(To);
    ws = Ps([A.injectable(), Cs(0, A.inject(Or.CONTEXT)), Cs(1, A.inject(Or.TTQ_REPORTERS))], ws);
    var ks = "https://analytics-ipv6.tiktokw.us/ipv6/enrich_ipv6",
        Ms = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        Ls = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        Ds = "tt_pixel_is_enrich_ipv6_triggered_by_enrich_am",
        xs = function(e) {
            s(n, e);
            var t = h(n);

            function n(e, r, o, a) {
                var c;
                return i(this, n), (c = t.call(this, {
                    name: "EnrichIpv6",
                    reporters: r,
                    context: e
                })).hasReported = !1, c.shouldReportAfterEnrichAM = !1, c.reportService = o, c.env = a, c
            }
            return a(n, [{
                key: "isPixelEnrichIpv6",
                value: function() {
                    var e = this.reporters;
                    return !(!e || 0 === e.length) && e.every((function(e) {
                        return e && e.plugins && !0 === e.plugins.EnrichIpv6
                    }))
                }
            }, {
                key: "isEnrichIpv6V2SwitchOn",
                value: function() {
                    var e = "EnrichIpv6V2";
                    try {
                        var t = Wr()._plugins || {};
                        return null != t[e] && !!t[e]
                    } catch (e) {
                        return !1
                    }
                }
            }, {
                key: "buildEnrichIpv6Data",
                value: function(e) {
                    var t = this.isEnrichIpv6V2SwitchOn() ? "#source=2" : "#source=1";
                    return Object.assign(Object.assign({}, e), {
                        event: "EnrichIpv6",
                        trigger_event: e.event,
                        message_id: e.message_id + t
                    })
                }
            }, {
                key: "pixelSend",
                value: function(e, t, n) {
                    var r, i = arguments.length > 4 ? arguments[4] : void 0;
                    try {
                        if (i !== Er.TRACK) return;
                        if ("Shopify" !== Xr() && !this.isEnrichIpv6V2SwitchOn()) return;
                        if (gi(this.env) || !n || !n.message_id) return;
                        var o = this.context.getPageSign();
                        0 === (null === (r = o.pageIndex) || void 0 === r ? void 0 : r.index) && !this.hasReported && this.isPixelEnrichIpv6() && (this.hasReported = !0, this.reportService.report(ks, this.buildEnrichIpv6Data(n), Fn.htmlHttpReport));
                        var a = "true" === sessionStorage.getItem(Ds);
                        if (a) return;
                        "EnrichAM" === t && (this.shouldReportAfterEnrichAM = !0), this.shouldReportAfterEnrichAM && this.isPixelEnrichIpv6() && (this.shouldReportAfterEnrichAM = !1, sessionStorage.setItem(Ds, "true"), this.reportService.report(ks, this.buildEnrichIpv6Data(n), Fn.htmlHttpReport))
                    } catch (e) {
                        wi(Sr.CUSTOM_ERROR, e, {
                            custom_name: "enrich_ipv6_report"
                        })
                    }
                }
            }]), n
        }(To);

    function js(e, t) {
        return function() {
            for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
            window.requestIdleCallback ? window.requestIdleCallback(e.bind.apply(e, [t].concat(r))) : e.apply(t, r)
        }
    }

    function Us(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 4;
        try {
            return Number.isInteger(e) ? e : parseFloat(e.toFixed(t))
        } catch (e) {
            return -1
        }
    }
    xs = Ms([A.injectable(), Ls(0, A.inject(Or.CONTEXT)), Ls(1, A.inject(Or.TTQ_REPORTERS)), Ls(2, A.inject(Or.REPORT_SERVICE)), Ls(3, A.inject(Or.ENV))], xs);
    var Bs;
    ! function(e) {
        e.FIRST_CONTENTFUL_PAINT = "fcp", e.LARGEST_CONTENTFUL_PAINT = "lcp", e.FIRST_INPUT_DELAY = "fid", e.TIME_TO_FIRST_BYTE = "ttfb", e.PAGE_LEAVE = "pl", e.LOAD_FINISH = "lf", e.TIME_TO_INTERACTIVE = "tti", e.TIME_WINDOW_TRACKER = "twt", e.DOM_COTENT_LOADED = "load2"
    }(Bs || (Bs = {}));
    var Fs, Hs, Vs, Gs, Js = function() {
            function e(t, n, r) {
                i(this, e), this.reportService = r, this.context = t, this.reporters = n
            }
            return a(e, [{
                key: "getResult",
                value: function(e) {
                    return {
                        action_event: e
                    }
                }
            }, {
                key: "report",
                value: function(e) {
                    var t = this;
                    if (void 0 !== e) {
                        var n = Li(Er.AUTO_CONFIG);
                        if (void 0 !== n) {
                            var r = this.getReportPixelList(),
                                i = this.assemblyReportData(Er.PAGE, e, r);
                            i && n && qi(this.reportService.reportPreposition || []).then((function() {
                                t.reportService.report(n, i, Fn.defaultReport)
                            })), this.resetAfterReport()
                        }
                    }
                }
            }, {
                key: "getReportPixelList",
                value: function() {
                    return this.reporters
                }
            }, {
                key: "assemblyReportData",
                value: function(e, t, n) {
                    var r;
                    if (0 !== n.length) {
                        var i = n.map((function(e) {
                                return e.getReporterId()
                            })),
                            o = this.context.getPageSign(),
                            a = n[0],
                            c = a.assemblyData(a.getReporterId(), "", {}, {}, Er.AUTO_CONFIG);
                        return delete c.event, c.action = e, c.auto_collected_properties = t, c.context.pixel || (c.context.pixel = {}), c.context.pixel.code = i[0], c.context.pixel.codes = i.join("|"), c.context.index = null === (r = o.pageIndex) || void 0 === r ? void 0 : r.index, c.context.session_id = o.sessionId, c.context.pageview_id = rr(this.context.getPageViewId(), a.reporterInfo.loadId, mr), c.message_id = c.message_id.replace(/-[^-]*$/, ""), c
                    }
                }
            }]), e
        }(),
        Ws = function(e) {
            s(n, e);
            var t = h(n);

            function n(e, r, o) {
                var a;
                return i(this, n), (a = t.call(this, e, r, o)).clickTimes = 0, a.scrollTimes = 0, a.init(), a
            }
            return a(n, [{
                key: "init",
                value: function() {
                    var e, t, n = this;
                    e = js(this.updateClickTimes, this), t = or((function(t) {
                            e()
                        }), 100), window.addEventListener("click", t, {
                            capture: !0
                        }),
                        function(e) {
                            var t = or((function() {
                                e()
                            }), 500);
                            window.addEventListener("scroll", t, {
                                passive: !0
                            })
                        }(js(this.updateScrollTimes, this)), setInterval((function() {
                            n.reportInteraction()
                        }), 1e4)
                }
            }, {
                key: "reportInteraction",
                value: function() {
                    this.isUpdated() && (this.report(this.getResult(Bs.TIME_WINDOW_TRACKER)), this.resetAfterReport())
                }
            }, {
                key: "getResult",
                value: function(e) {
                    return {
                        action_event: e,
                        inter: {
                            ct: this.clickTimes,
                            st: this.scrollTimes
                        }
                    }
                }
            }, {
                key: "updateClickTimes",
                value: function() {
                    this.clickTimes += 1
                }
            }, {
                key: "updateScrollTimes",
                value: function() {
                    this.scrollTimes += 1
                }
            }, {
                key: "isUpdated",
                value: function() {
                    return 0 != this.clickTimes || 0 != this.scrollTimes
                }
            }, {
                key: "resetAfterReport",
                value: function() {
                    this.clickTimes = 0, this.scrollTimes = 0
                }
            }]), n
        }(Js),
        Ks = function(e) {
            var t = function() {
                new Promise((function(e, t) {
                    setTimeout((function() {
                        var n = performance.getEntriesByType("navigation");
                        if (n.length > 0) {
                            var r = n[0];
                            e(r.loadEventEnd - r.startTime)
                        } else window.performance.timing ? e(window.performance.timing.loadEventEnd - window.performance.timing.navigationStart || -1) : t("Performance timing not supported")
                    }), 0)
                })).then((function(t) {
                    e(Bs.LOAD_FINISH, t)
                })).catch((function(t) {
                    e(Bs.LOAD_FINISH, -1)
                }))
            };
            "complete" === window.document.readyState ? t() : window.addEventListener("load", t)
        },
        Ys = -1,
        qs = function(e) {
            addEventListener("pageshow", (function(t) {
                t.persisted && (Ys = t.timeStamp, e(t))
            }), !0)
        },
        Xs = function() {
            return window.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0]
        },
        zs = function() {
            var e = Xs();
            return e && e.activationStart || 0
        },
        Qs = function(e, t) {
            var n = Xs(),
                r = "navigate";
            return Ys >= 0 ? r = "back-forward-cache" : n && (document.prerendering || zs() > 0 ? r = "prerender" : document.wasDiscarded ? r = "restore" : n.type && (r = n.type.replace(/_/g, "-"))), {
                name: e,
                value: void 0 === t ? -1 : t,
                rating: "good",
                delta: 0,
                entries: [],
                id: "v3-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
                navigationType: r
            }
        },
        Zs = function(e, t, n) {
            try {
                if (PerformanceObserver.supportedEntryTypes.includes(e)) {
                    var r = new PerformanceObserver((function(e) {
                        Promise.resolve().then((function() {
                            t(e.getEntries())
                        }))
                    }));
                    return r.observe(Object.assign({
                        type: e,
                        buffered: !0
                    }, n || {})), r
                }
            } catch (e) {}
        },
        $s = function(e, t, n, r) {
            var i, o;
            return function(a) {
                t.value >= 0 && (a || r) && ((o = t.value - (i || 0)) || void 0 === i) && (i = t.value, t.delta = o, t.rating = function(e, t) {
                    return e > t[1] ? "poor" : e > t[0] ? "needs-improvement" : "good"
                }(t.value, n), e(t))
            }
        },
        eu = function(e) {
            requestAnimationFrame((function() {
                return requestAnimationFrame((function() {
                    return e()
                }))
            }))
        },
        tu = function(e) {
            var t = function(t) {
                "pagehide" !== t.type && "hidden" !== document.visibilityState || e(t)
            };
            addEventListener("visibilitychange", t, !0), addEventListener("pagehide", t, !0)
        },
        nu = function(e) {
            var t = !1;
            return function(n) {
                t || (e(n), t = !0)
            }
        },
        ru = -1,
        iu = function() {
            return "hidden" !== document.visibilityState || document.prerendering ? 1 / 0 : 0
        },
        ou = function(e) {
            "hidden" === document.visibilityState && ru > -1 && (ru = "visibilitychange" === e.type ? e.timeStamp : 0, cu())
        },
        au = function() {
            addEventListener("visibilitychange", ou, !0), addEventListener("prerenderingchange", ou, !0)
        },
        cu = function() {
            removeEventListener("visibilitychange", ou, !0), removeEventListener("prerenderingchange", ou, !0)
        },
        su = function() {
            return ru < 0 && (ru = iu(), au(), qs((function() {
                setTimeout((function() {
                    ru = iu(), au()
                }), 0)
            }))), {
                get firstHiddenTime() {
                    return ru
                }
            }
        },
        uu = function(e) {
            document.prerendering ? addEventListener("prerenderingchange", (function() {
                return e()
            }), !0) : e()
        },
        lu = [1800, 3e3],
        fu = function(e, t) {
            t = t || {}, uu((function() {
                var n, r = su(),
                    i = Qs("FCP"),
                    o = Zs("paint", (function(e) {
                        e.forEach((function(e) {
                            "first-contentful-paint" === e.name && (o.disconnect(), e.startTime < r.firstHiddenTime && (i.value = Math.max(e.startTime - zs(), 0), i.entries.push(e), n(!0)))
                        }))
                    }));
                o && (n = $s(e, i, lu, t.reportAllChanges), qs((function(r) {
                    i = Qs("FCP"), n = $s(e, i, lu, t.reportAllChanges), eu((function() {
                        i.value = performance.now() - r.timeStamp, n(!0)
                    }))
                })))
            }))
        },
        du = [.1, .25],
        hu = {
            passive: !0,
            capture: !0
        },
        pu = new Date,
        vu = function(e, t) {
            Fs || (Fs = t, Hs = e, Vs = new Date, yu(removeEventListener), _u())
        },
        _u = function() {
            if (Hs >= 0 && Hs < Vs - pu) {
                var e = {
                    entryType: "first-input",
                    name: Fs.type,
                    target: Fs.target,
                    cancelable: Fs.cancelable,
                    startTime: Fs.timeStamp,
                    processingStart: Fs.timeStamp + Hs
                };
                Gs.forEach((function(t) {
                    t(e)
                })), Gs = []
            }
        },
        gu = function(e) {
            if (e.cancelable) {
                var t = (e.timeStamp > 1e12 ? new Date : performance.now()) - e.timeStamp;
                "pointerdown" == e.type ? function(e, t) {
                    var n = function() {
                            vu(e, t), i()
                        },
                        r = function() {
                            i()
                        },
                        i = function() {
                            removeEventListener("pointerup", n, hu), removeEventListener("pointercancel", r, hu)
                        };
                    addEventListener("pointerup", n, hu), addEventListener("pointercancel", r, hu)
                }(t, e) : vu(t, e)
            }
        },
        yu = function(e) {
            ["mousedown", "keydown", "touchstart", "pointerdown"].forEach((function(t) {
                return e(t, gu, hu)
            }))
        },
        mu = [100, 300],
        Eu = [2500, 4e3],
        bu = {},
        Tu = [800, 1800],
        Iu = function e(t) {
            document.prerendering ? uu((function() {
                return e(t)
            })) : "complete" !== document.readyState ? addEventListener("load", (function() {
                return e(t)
            }), !0) : setTimeout(t, 0)
        },
        Ou = function(e, t) {
            t = t || {};
            var n = Qs("TTFB"),
                r = $s(e, n, Tu, t.reportAllChanges);
            Iu((function() {
                var i = Xs();
                if (i) {
                    var o = i.responseStart;
                    if (o <= 0 || o > performance.now()) return;
                    n.value = Math.max(o - zs(), 0), n.entries = [i], r(!0), qs((function() {
                        n = Qs("TTFB", 0), (r = $s(e, n, Tu, t.reportAllChanges))(!0)
                    }))
                }
            }))
        },
        Su = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        Nu = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        Ru = function(e) {
            s(n, e);
            var t = h(n);

            function n(e, r, o) {
                var a;
                return i(this, n), (a = t.call(this, e, r, o)).cls = -1, a.init(), a
            }
            return a(n, [{
                key: "init",
                value: function() {
                    ! function(e, t) {
                        t = t || {}, fu(nu((function() {
                            var n, r = Qs("CLS", 0),
                                i = 0,
                                o = [],
                                a = function(e) {
                                    e.forEach((function(e) {
                                        if (!e.hadRecentInput) {
                                            var t = o[0],
                                                n = o[o.length - 1];
                                            i && e.startTime - n.startTime < 1e3 && e.startTime - t.startTime < 5e3 ? (i += e.value, o.push(e)) : (i = e.value, o = [e])
                                        }
                                    })), i > r.value && (r.value = i, r.entries = o, n())
                                },
                                c = Zs("layout-shift", a);
                            c && (n = $s(e, r, du, t.reportAllChanges), tu((function() {
                                a(c.takeRecords()), n(!0)
                            })), qs((function() {
                                i = 0, r = Qs("CLS", 0), n = $s(e, r, du, t.reportAllChanges), eu((function() {
                                    return n()
                                }))
                            })), setTimeout(n, 0))
                        })))
                    }(this.clsHandler.bind(this), {
                        reportAllChanges: !0
                    }), Ou(this.webVitalHandler.bind(this)), fu(this.webVitalHandler.bind(this)),
                        function(e, t) {
                            t = t || {}, uu((function() {
                                var n, r = su(),
                                    i = Qs("LCP"),
                                    o = function(e) {
                                        var t = e[e.length - 1];
                                        t && t.startTime < r.firstHiddenTime && (i.value = Math.max(t.startTime - zs(), 0), i.entries = [t], n())
                                    },
                                    a = Zs("largest-contentful-paint", o);
                                if (a) {
                                    n = $s(e, i, Eu, t.reportAllChanges);
                                    var c = nu((function() {
                                        bu[i.id] || (o(a.takeRecords()), a.disconnect(), bu[i.id] = !0, n(!0))
                                    }));
                                    ["keydown", "click"].forEach((function(e) {
                                        addEventListener(e, (function() {
                                            return setTimeout(c, 0)
                                        }), !0)
                                    })), tu(c), qs((function(r) {
                                        i = Qs("LCP"), n = $s(e, i, Eu, t.reportAllChanges), eu((function() {
                                            i.value = performance.now() - r.timeStamp, bu[i.id] = !0, n(!0)
                                        }))
                                    }))
                                }
                            }))
                        }(this.webVitalHandler.bind(this), {
                            reportAllChanges: !0
                        }),
                        function(e, t) {
                            t = t || {}, uu((function() {
                                var n, r = su(),
                                    i = Qs("FID"),
                                    o = function(e) {
                                        e.startTime < r.firstHiddenTime && (i.value = e.processingStart - e.startTime, i.entries.push(e), n(!0))
                                    },
                                    a = function(e) {
                                        e.forEach(o)
                                    },
                                    c = Zs("first-input", a);
                                n = $s(e, i, mu, t.reportAllChanges), c && tu(nu((function() {
                                    a(c.takeRecords()), c.disconnect()
                                }))), c && qs((function() {
                                    var r;
                                    i = Qs("FID"), n = $s(e, i, mu, t.reportAllChanges), Gs = [], Hs = -1, Fs = null, yu(addEventListener), r = o, Gs.push(r), _u()
                                }))
                            }))
                        }(this.webVitalHandler.bind(this)),
                        function(e) {
                            try {
                                za.getFirstConsistentlyInteractive({}).then((function(t) {
                                    e(Bs.TIME_TO_INTERACTIVE, t)
                                }))
                            } catch (e) {}
                        }(this.baseHandler.bind(this)), Ks(this.baseHandler.bind(this))
                }
            }, {
                key: "getResult",
                value: function(e) {
                    var t;
                    return {
                        action_event: e,
                        perf: {
                            ttns: Math.floor(performance && performance.timing ? t ? Date.now() - t : Date.now() - performance.timing.navigationStart : -1),
                            cls: Us(this.cls),
                            idx: this.getSessionIndex(),
                            pep: Us(this.getPep())
                        }
                    }
                }
            }, {
                key: "resetAfterReport",
                value: function() {}
            }, {
                key: "clsHandler",
                value: function(e) {
                    this.cls = e.value || -1
                }
            }, {
                key: "webVitalHandler",
                value: function(e) {
                    var t = this.getResult(e.name.toLocaleLowerCase());
                    t.perf && (t.perf.ttns = (null == e ? void 0 : e.value) ? Math.floor(e.value) : -1), this.report(t), this.resetAfterReport()
                }
            }, {
                key: "baseHandler",
                value: function(e, t) {
                    var n = this.getResult(e);
                    n.perf && (n.perf.ttns = t ? Math.floor(t) : -1), this.report(n), this.resetAfterReport()
                }
            }, {
                key: "getSessionIndex",
                value: function() {
                    var e, t = null === (e = this.context.getPageSign().pageIndex) || void 0 === e ? void 0 : e.main;
                    return null == t ? -1 : t
                }
            }, {
                key: "getCurrScrollPosition",
                value: function() {
                    return document.documentElement.scrollTop || document.body.scrollTop
                }
            }, {
                key: "getViewportHeight",
                value: function() {
                    return window.innerHeight || document.documentElement.clientHeight
                }
            }, {
                key: "getMaxHeight",
                value: function() {
                    var e = document.body,
                        t = document.documentElement;
                    return Math.max(e.scrollHeight, e.offsetHeight, t.clientHeight, t.scrollHeight, t.offsetHeight)
                }
            }, {
                key: "getPep",
                value: function() {
                    return (this.getCurrScrollPosition() + this.getViewportHeight()) / this.getMaxHeight()
                }
            }]), n
        }(Js);
    Ru = Su([Nu(0, A.inject(Or.CONTEXT)), Nu(1, A.inject(Or.TTQ_REPORTERS)), Nu(2, A.inject(Or.REPORT_SERVICE))], Ru);
    var Au = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        Pu = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        Cu = function(e) {
            s(n, e);
            var t = h(n);

            function n(e, r, o, a) {
                var c;
                return i(this, n), (c = t.call(this, {
                    name: "PageData",
                    reporters: r,
                    context: e
                })).monitors = [], c.ttqOptions = {}, c.reportService = o, c.context = e, c.reporters = r, c.ttqOptions = a, c.isPluginInit = !1, c
            }
            return a(n, [{
                key: "init",
                value: function() {
                    this.isPageDataEnabled() && (this.interactionMonitor = new Ws(this.context, this.reporters, this.reportService), this.performanceMonitor = new Ru(this.context, this.reporters, this.reportService), this.monitors.push(this.performanceMonitor), this.monitors.push(this.interactionMonitor))
                }
            }, {
                key: "isPageDataEnabled",
                value: function() {
                    var e, t;
                    return null === (t = null === (e = this.ttqOptions) || void 0 === e ? void 0 : e.plugins) || void 0 === t ? void 0 : t.PageData
                }
            }, {
                key: "report",
                value: function(e) {
                    var t = this.performanceMonitor,
                        n = this.performanceMonitor.getResult(e),
                        r = this.interactionMonitor.getResult(e),
                        i = this.mergeReportData(e, r, n);
                    t.report(i), this.interactionMonitor.resetAfterReport(), this.performanceMonitor.resetAfterReport()
                }
            }, {
                key: "mergeReportData",
                value: function(e, t, n) {
                    var r = {
                        action_event: e
                    };
                    return r.perf = n.perf, r.inter = t.inter, r
                }
            }, {
                key: "pageWillLeave",
                value: function(e) {
                    this.report(Bs.PAGE_LEAVE)
                }
            }, {
                key: "pixelDidMount",
                value: function(e) {
                    this.isPluginInit || (this.init(), this.isPluginInit = !0)
                }
            }]), n
        }(To);
    Cu = Au([A.injectable(), Pu(0, A.inject(Or.CONTEXT)), Pu(1, A.inject(Or.TTQ_REPORTERS)), Pu(2, A.inject(Or.REPORT_SERVICE)), Pu(3, A.inject(Or.TTQ_GLOBAL_OPTIONS))], Cu);
    var wu, ku, Mu = [{
            identifier: Or.CALLBACK_PLUGIN,
            to: Sa,
            name: "Callback"
        }, {
            identifier: Or.IDENTIFY_PLUGIN,
            to: Da,
            name: "Identify",
            required: !0
        }, {
            identifier: Or.WEB_FL_PLUGIN,
            to: ac,
            name: "WebFL"
        }, {
            identifier: Or.PERFORMANCE_INTERACTION_PLUGIN,
            to: nc,
            required: !0,
            name: "PerformanceInteraction"
        }, {
            identifier: Or.AUTO_CONFIG_PLUGIN,
            to: ss,
            name: "AutoConfig"
        }, {
            identifier: Or.DIAGNOSTICS_CONSOLE_PLUGIN,
            to: Ts,
            name: "DiagnosticsConsole"
        }, {
            identifier: Or.PANGLE_COOKIE_MATCHING_PLUGIN,
            to: Ss,
            name: "PangleCookieMatching"
        }, {
            identifier: Or.EVENT_BUILDER_PLUGIN,
            to: ws,
            name: "EventBuilder"
        }, {
            identifier: Or.ENRICH_IPV6_PLUGIN,
            to: xs,
            name: "EnrichIpv6"
        }, {
            identifier: Or.PAGEDATA_PLUGIN,
            to: Cu,
            name: "PageData"
        }],
        Lu = /^[\w!#\$%&\'\*\+\/\=\?\^`\{\|\}~\-]+(:?\.[\w!#\$%&\'\*\+\/\=\?\^`\{\|\}~\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?$/,
        Du = function(e) {
            return "function" == typeof Element ? e instanceof Element : e && "object" === t(e) && e.nodeType === Node.ELEMENT_NODE && "string" == typeof e.nodeName
        },
        xu = function(e, t) {
            var n = e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector || null;
            return !(null === n || !n.call(e, t.join(","))) || e instanceof HTMLButtonElement && !!t.includes("button[type='".concat(e.type, "']"))
        },
        ju = function(e) {
            return e.trim().toLowerCase()
        },
        Uu = function(e, t) {
            return !(!e || !t) && e.indexOf(t) >= 0
        },
        Bu = function(e) {
            return "string" == typeof e && Lu.test(e)
        },
        Fu = function(e, t) {
            var n = e.id,
                r = e.name,
                i = e.placeholder,
                o = void 0 === i ? "" : i,
                a = e.value,
                c = void 0 === a ? "" : a;
            return t.filter((function(e) {
                return e.length > 2 ? Uu(r, e) || Uu(n, e) || Uu(o, e) || Uu(c, e) : r === e || n === e || o === e || c === e
            })).length > 0
        },
        Hu = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        Vu = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        Gu = function(e) {
            s(r, e);
            var n = h(r);

            function r(e, t, o) {
                var a;
                return i(this, r), (a = n.call(this, {
                    name: "AutoAdvancedMatching",
                    reporters: t,
                    context: e
                })).rateMS = 1e3, a.lastTime = 0, a.lastElement = null, a.matchHistory = [], a.config = o.aam || {
                    in_form: !0,
                    selectors: {},
                    exclude_selectors: [],
                    phone_regex: "",
                    phone_selectors: [],
                    restricted_keywords: []
                }, a.phoneRegex = a.config.phone_regex ? new RegExp(a.config.phone_regex) : null, a.init(), a
            }
            return a(r, [{
                key: "init",
                value: function() {
                    var e = this;
                    document.addEventListener("click", (function(t) {
                        try {
                            var n = Wr() || [],
                                r = t && t.target && t.target instanceof Node && Du(t.target) ? t.target : null;
                            if (!r) return;
                            if (!e.throttle(r)) return;
                            var i = e.getWrappingButton(r);
                            if (!i) return;
                            var o = e.getFormByButton(i);
                            if (e.config.in_form && !o) return;
                            var a = e.getUserDataByForm(o);
                            if (0 === Object.keys(a).length) return;
                            null == n || n.identify(Object.assign(a || {}, {
                                auto_trigger_type: e.getTriggerType(i, !!o)
                            })), e.matchHistory.push(Object.assign({}, a))
                        } catch (t) {
                            Ci(Sr.CUSTOM_ERROR, {
                                pixelCode: Mi().pixelCode,
                                custom_name: "advancedMatching"
                            })
                        }
                    }), {
                        capture: !0,
                        once: !1,
                        passive: !0
                    })
                }
            }, {
                key: "throttle",
                value: function(e) {
                    var t = !1;
                    return (!this.lastElement || !this.lastTime || Date.now() - this.lastTime >= this.rateMS || this.lastElement !== e) && (t = !0), this.lastElement = e, this.lastTime = Date.now(), t
                }
            }, {
                key: "getWrappingButton",
                value: function(e) {
                    if (!e || ! function(e) {
                            if (!e || e === document.body) return !1;
                            if (e.getBoundingClientRect && "function" == typeof e.getBoundingClientRect) {
                                var t = e.getBoundingClientRect().height || e.offsetHeight || 11;
                                return t > 10 && t < 600
                            }
                            return !0
                        }(e)) return null;
                    if ((this.config.exclude_selectors || []).length > 0 && xu(e, this.config.exclude_selectors || [])) return null;
                    var t = Object.keys(this.config.selectors || {});
                    if (xu(e, t)) return e;
                    var n = e.parentNode;
                    return n && Du(n) ? this.getWrappingButton(n) : null
                }
            }, {
                key: "getFormByButton",
                value: function(e) {
                    if (void 0 !== ("undefined" == typeof HTMLInputElement ? "undefined" : t(HTMLInputElement)) && e instanceof HTMLInputElement) return e.form;
                    for (var n = e;
                        "FORM" !== n.nodeName.toUpperCase();) {
                        var r = n.parentElement;
                        if (!r) return null;
                        n = r
                    }
                    return n
                }
            }, {
                key: "getUserDataByForm",
                value: function(e) {
                    for (var t = {}, n = (e || document).querySelectorAll("input,textarea,select"), r = 0; r < n.length; r++) {
                        var i = n[r];
                        if (i instanceof HTMLInputElement || i instanceof HTMLTextAreaElement) {
                            var o = this.getPIIFieldsByInput(i);
                            o && Object.assign(t, o)
                        }
                    }
                    return t
                }
            }, {
                key: "getPIIFieldsByInput",
                value: function(e) {
                    var t = e.getAttribute("type") || "",
                        n = e.getAttribute("inputmode") || "",
                        r = e.value,
                        i = ju(e.placeholder ? e.placeholder : "").replace(/[_-]/g, ""),
                        o = {
                            id: ju(e.id).replace(/[_-]/g, ""),
                            name: ju(e.name).replace(/[_-]/g, "")
                        };
                    if ("password" === t || !r || Fu(o, this.config.restricted_keywords)) return null;
                    if (Bu(r)) return {
                        auto_email: ju(r)
                    };
                    var a, c = function(e) {
                        if (!e) return null;
                        for (var t = e.parentElement, n = e, r = ""; n;)(n = n.previousElementSibling) && (n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement) && (r = n.value, n = null);
                        if (!r || "string" != typeof r) return null;
                        if (!t || (t.innerText || t.textContent || "").indexOf("@") < 0) return null;
                        var i = "".concat(r, "@").concat(e.value);
                        return Bu(i) ? i : null
                    }(e);
                    if (c) return {
                        auto_email: ju(c)
                    };
                    if ("US" === ((Wr() || [])._cc || "").toUpperCase() && (a = r, a.replace(/\D/g, "")).length < 10) return null;
                    var s = !(this.config.phone_selectors.length > 0) || ("tel" === t || "tel" === n || Fu(Object.assign(o, {
                            placeholder: i
                        }), this.config.phone_selectors)),
                        u = !this.phoneRegex || this.phoneRegex.test(r);
                    return s && u ? {
                        auto_phone_number: r
                    } : null
                }
            }, {
                key: "getTriggerType",
                value: function(e, t) {
                    var n = this;
                    try {
                        var r = [];
                        return Object.keys(this.config.selectors).forEach((function(t) {
                            xu(e, [t]) && r.push(n.config.selectors[t])
                        })), 0 === r.length ? "" : "".concat(r.join(","), "-").concat(t ? 1 : 0)
                    } catch (e) {
                        return ""
                    }
                }
            }]), r
        }(To);
    Gu = Hu([A.injectable(), Vu(0, A.inject(Or.CONTEXT)), Vu(1, A.inject(Or.TTQ_REPORTERS)), Vu(2, A.inject(Or.TTQ_GLOBAL_OPTIONS))], Gu);
    var Ju = function(e, t) {
            wu = t, (ku = e).isBound(Or.AUTO_ADVANCED_MATCHING_PLUGIN) || ku.bind(Or.AUTO_ADVANCED_MATCHING_PLUGIN).to(Gu).inSingletonScope(),
                function(e, t) {
                    return !(!wu._mounted || wu.getPlugin(t) || !ku.isBound(e))
                }(Or.AUTO_ADVANCED_MATCHING_PLUGIN, "AutoAdvancedMatching") && wu.usePlugin(ku.get(Or.AUTO_ADVANCED_MATCHING_PLUGIN))
        },
        Wu = function(e, t) {
            return Wu = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            }, Wu(e, t)
        };

    function Ku(e, t) {
        function n() {
            this.constructor = e
        }
        Wu(e, t), e.prototype = null === t ? Object._ttq_create(t) : (n.prototype = t.prototype, new n)
    }
    var Yu, qu = function() {
        return qu = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        }, qu.apply(this, arguments)
    };
    ! function(e) {
        e[e.Failure = 0] = "Failure", e[e.Success = 1] = "Success", e[e.Unauthorized = -1] = "Unauthorized", e[e.NotExist = -2] = "NotExist"
    }(Yu || (Yu = {}));
    var Xu = function() {
            function e(e) {
                this.version = e.version || "2.0.2", this.nativeMethodInvoker = e.nativeMethodInvoker, this.nativeEventListener = e.nativeEventListener, this.scheme = e.scheme || "nativeapp://", this.dispatchMessagePath = e.dispatchMessagePath || "dispatch_message/", this.setResultPath = e.setResultPath || "private/setresult/SCENE_FETCHQUEUE", this.dispatchMessageIFrameId = e.dispatchMessageIFrameId || "__JSBridgeIframe__", this.setResultIFrameId = e.setResultIFrameId || "__JSBridgeIframe_SetResult__", this.listenNativeEvent = !0 === e.listenNativeEvent, this.callbackId = 1023, this.callbackMap = {}, this.eventMap = {}, this.javascriptMessageQueue = [], this.callbackProcessor = e.callbackProcessor
            }
            return e.prototype.call = function(e, t, n, r) {
                void 0 === r && (r = this.version);
                var i, o = this.version;
                if (e && "string" == typeof e) {
                    "object" != typeof t && (t = {}), "string" == typeof r ? o = r || this.version : "object" == typeof r && (i = r.namespace, o = r.sdkVersion || this.version);
                    var a = {
                        func: e,
                        params: t,
                        JSSDK: o,
                        __msg_type: "call",
                        namespace: i
                    };
                    if ("function" == typeof n || void 0 === n) {
                        var c = this.registerCallback(e, n);
                        a.__callback_id = c
                    }
                    "undefined" == typeof __PIA_WORKER__ && window.parent !== window && (a.__iframe_url = window.location.href), this.sendMessageToNative(a)
                }
            }, e.prototype.on = function(e, t, n) {
                if (void 0 === n && (n = !1), e && "string" == typeof e && "function" == typeof t) {
                    var r = this.registerCallback(e, t);
                    return this.eventMap[e] = this.eventMap[e] || {}, this.eventMap[e][r] = {
                        once: n
                    }, this.listenNativeEvent && (this.nativeEventListener ? this.nativeEventListener(e) : this.call("addEventListener", {
                        name: e
                    }, null, {
                        sdkVersion: 1
                    })), r
                }
            }, e.prototype.once = function(e, t) {
                return this.on(e, t, !0)
            }, e.prototype.off = function(e, t) {
                if (!e || "string" != typeof e) return !0;
                var n = this.eventMap[e];
                return !n || "object" != typeof n || !n.hasOwnProperty(t) || (this.deregisterCallback(t), delete n[t], !0)
            }, e.prototype.trigger = function(e, t) {
                return this.handleMessageFromNative({
                    __msg_type: "event",
                    __params: t,
                    __event_id: e
                })
            }, e.prototype.handleMessageFromNative = function(e) {
                var t = this,
                    n = e,
                    r = String(n.__callback_id);
                if (this.callbackProcessor && "function" == typeof this.callbackProcessor) {
                    var i = (this.callbackMap && this.callbackMap[r] || {}).method;
                    this.callbackProcessor(n, i)
                }
                var o = n.__params,
                    a = String(n.__event_id || ""),
                    c = n.__msg_type;
                this.callbackMap[r] ? c = "callback" : this.eventMap[r] && (c = "event", a = a || r);
                var s = {
                    __err_code: "cb404"
                };
                switch (c) {
                    case "callback":
                        var u = (this.callbackMap && this.callbackMap[r] || {}).callback;
                        "function" == typeof u && (s = u(o)), this.deregisterCallback(r);
                        break;
                    case "event":
                        var l = this.eventMap[a];
                        l && "object" == typeof l && Object.keys(l).forEach((function(e) {
                            var n = (t.callbackMap && t.callbackMap[e] || {}).callback,
                                r = l[e];
                            "function" == typeof n && (s = n(o)), r && r.once && (t.deregisterCallback(e), delete l[e])
                        }))
                }
                return s
            }, e.prototype.fetchJavaScriptMessageQueue = function() {
                var e = JSON.stringify(this.javascriptMessageQueue),
                    t = btoa(unescape(encodeURIComponent(e)));
                return this.setResultIFrame && this.javascriptMessageQueue.length > 0 && (this.setResultIFrame.src = "" + this.scheme + this.setResultPath + "&" + t), this.javascriptMessageQueue.splice(0, this.javascriptMessageQueue.length), e
            }, e.prototype.sendMessageToNative = function(e) {
                if ("1" !== String(e.JSSDK) && this.nativeMethodInvoker) {
                    var t = this.nativeMethodInvoker(e);
                    if (t) {
                        var n = JSON.parse(t);
                        this.handleMessageFromNative(n)
                    }
                } else this.javascriptMessageQueue.push(e), this.dispatchMessageIFrame || this.tryCreateIFrames(), this.dispatchMessageIFrame.src = "" + this.scheme + this.dispatchMessagePath
            }, e.prototype.registerCallback = function(e, t) {
                var n = String(this.callbackId++);
                return this.callbackMap[n] = {
                    method: e,
                    callback: t
                }, n
            }, e.prototype.deregisterCallback = function(e) {
                delete this.callbackMap[e]
            }, e.prototype.tryCreateIFrames = function() {
                this.dispatchMessageIFrame = this.createIFrame(this.dispatchMessageIFrameId), this.setResultIFrame = this.createIFrame(this.setResultIFrameId)
            }, e.prototype.createIFrame = function(e) {
                var t = document.getElementById(e);
                return t && "IFRAME" === t.tagName || ((t = document.createElement("iframe")).style.display = "none", t.id = e, document.documentElement.appendChild(t)), t
            }, e
        }(),
        zu = "2.2.15",
        Qu = "undefined" != typeof __PIA_WORKER__ ? new Function("return this")() : "undefined" != typeof window ? window : {},
        Zu = void 0 !== Qu && Qu.navigator ? Qu.navigator.userAgent : "",
        $u = (!!Zu.match(/(newsarticle|videoarticle|lv|faceu|ulike|beauty_me_|faceu-os|ulike-os|beauty_me_oversea_|retouch)\/([\d.]+)/i) || /super|automobile/gi.test(Zu)) && !/webcast/gi.test(Zu) && !/luckycatversion/gi.test(Zu),
        el = !!Zu.match(/(faceu)\/([\d.]+)/i) || /gsdk/gi.test(Zu) || /PIANativeWorker/gi.test(Zu),
        tl = !!Zu.match(/ttad\/0/i),
        nl = !!Zu.match(/aweme|trill|musical_ly|phoenix_\d+|TikTokNow_\d+/i),
        rl = !!Zu.match(/live_stream/i),
        il = !!Zu.match(/Webcast/i),
        ol = !!Zu.match(/super/i),
        al = !!Zu.match(/life_service_merchant/i),
        cl = /super/gi.test(Zu);

    function sl() {
        var e;
        if ($u) return Qu.JSBridge && Qu.JSBridge.on ? e = Qu.JSBridge.on : Qu.JS2NativeBridge && Qu.JS2NativeBridge.on ? e = function(e) {
            var t = {
                JSSDK: zu,
                __msg_type: "event",
                __callback_id: e,
                func: e
            };
            Qu.JS2NativeBridge.on(e, JSON.stringify(t))
        } : Qu.webkit && Qu.webkit.messageHandlers && Qu.webkit.messageHandlers.onMethodParams ? e = function(e) {
            var t = {
                JSSDK: zu,
                __msg_type: "event",
                __callback_id: e,
                func: e
            };
            Qu.webkit.messageHandlers.onMethodParams.postMessage(t)
        } : Qu.onMethodParams && (e = function(e) {
            var t = {
                JSSDK: zu,
                __msg_type: "event",
                __callback_id: e,
                func: e
            };
            return Qu.onMethodParams(e, t)
        }), e
    }

    function ul(e, t) {
        if (("string" != typeof t || !0 !== /^(x|tc)\./.test(t)) && (nl || rl || il || al)) {
            var n = e.__params;
            Qu.JS2NativeBridge && Qu.JS2NativeBridge._invokeMethod && (e.__params = qu({
                code: n.code
            }, n.data))
        }
    }
    var ll = function(e) {
            function t() {
                var t = e.call(this, {
                    version: zu,
                    scheme: "bytedance://",
                    listenNativeEvent: !0,
                    dispatchMessageIFrameId: "__JSBridgeIframe_1.0__",
                    setResultIFrameId: "__JSBridgeIframe_SetResult_1.0__",
                    nativeEventListener: sl(),
                    callbackProcessor: ul
                }) || this;
                return t.publicApi = {
                    call: t.call.bind(t),
                    on: t.on.bind(t),
                    once: t.once.bind(t),
                    off: t.off.bind(t),
                    trigger: t.trigger.bind(t),
                    _fetchQueue: t.fetchJavaScriptMessageQueue.bind(t),
                    _handleMessageFromToutiao: t.handleMessageFromNative.bind(t)
                }, t
            }
            return Ku(t, e), t.prototype.exposePublicApiToGlobal = function() {
                Qu.ToutiaoJSBridge = Object.assign(Qu.ToutiaoJSBridge || {}, this.publicApi)
            }, t
        }(Xu),
        fl = function(e) {
            function t(t) {
                var n, r = e.call(this, {
                    version: zu,
                    nativeMethodInvoker: (Qu.JS2NativeBridge && Qu.JS2NativeBridge._invokeMethod ? n = function(e) {
                        return Qu.JS2NativeBridge._invokeMethod(JSON.stringify(e))
                    } : Qu.ToutiaoJSBridge && Qu.ToutiaoJSBridge.invokeMethod ? n = function(e) {
                        return Qu.ToutiaoJSBridge.invokeMethod(JSON.stringify(e))
                    } : Qu.JS2NativeBridge && Qu.JS2NativeBridge.call ? n = function(e) {
                        return Qu.JS2NativeBridge.call(e.func, JSON.stringify(e))
                    } : Qu.webkit && Qu.webkit.messageHandlers && Qu.webkit.messageHandlers.callMethodParams ? n = function(e) {
                        Qu.webkit.messageHandlers.callMethodParams.postMessage(e)
                    } : Qu.callMethodParams && (n = function(e) {
                        return Qu.callMethodParams(e.func, e)
                    }), n),
                    nativeEventListener: sl(),
                    scheme: ol ? "bds://" : cl ? "bytedance://" : $u || Qu.JSBridge && Qu.JSBridge._invokeMethod ? "nativeapp://" : "bytedance://",
                    listenNativeEvent: $u,
                    callbackProcessor: ul
                }) || this;
                return r.toutiaoLegacyJSB = t, r.publicApi = {
                    call: r.call.bind(r),
                    on: r.on.bind(r),
                    once: r.once.bind(r),
                    off: r.off.bind(r),
                    trigger: r.trigger.bind(r),
                    _fetchQueue: r.fetchJavaScriptMessageQueue.bind(r),
                    _handleMessageFromApp: r.handleMessageFromNative.bind(r),
                    _handleMessageFromToutiao: r.handleMessageFromNative.bind(r)
                }, r
            }
            return Ku(t, e), t.prototype.call = function(t, n, r, i) {
                void 0 === i && (i = zu), this.isLegacyCall(t) ? this.toutiaoLegacyJSB.call(t, n, r, i) : e.prototype.call.call(this, t, n, r, i)
            }, t.prototype.on = function(t, n, r, i) {
                return void 0 === r && (r = !1), (i || {}).useLegacy || this.isLegacyCall(t) ? this.toutiaoLegacyJSB.on(t, n, r) : e.prototype.on.call(this, t, n, r)
            }, t.prototype.once = function(t, n) {
                return this.isLegacyCall(t) ? this.toutiaoLegacyJSB.once(t, n) : e.prototype.once.call(this, t, n)
            }, t.prototype.off = function(t, n) {
                return this.isLegacyCall(t) ? this.toutiaoLegacyJSB.off(t, n) : e.prototype.off.call(this, t, n)
            }, t.prototype.trigger = function(t, n) {
                return this.isLegacyCall(t) ? this.toutiaoLegacyJSB.trigger(t, n) : e.prototype.trigger.call(this, t, n)
            }, t.prototype.exposePublicApiToGlobal = function() {
                var e = this;
                Qu.JSBridge = Object.assign(Qu.JSBridge || {}, this.publicApi), Qu.__DISABLE_JSB_PROTOCAL2__ || (Qu.Native2JSBridge = Object.assign(Qu.Native2JSBridge || {}, this.publicApi)), cl ? Qu.ToutiaoJSBridge = Object.assign(Qu.ToutiaoJSBridge || {}, this.publicApi) : ($u || tl) && this.toutiaoLegacyJSB ? this.toutiaoLegacyJSB.exposePublicApiToGlobal() : Qu.ToutiaoJSBridge = Object.assign(Qu.ToutiaoJSBridge || {}, this.publicApi), Qu.parent !== Qu && Qu.addEventListener && Qu.addEventListener("message", (function(t) {
                    t && t.data && t.data.__callback_id && e.handleMessageFromNative(t.data)
                }), !1), Object.defineProperties(Qu, {
                    JSBridge: {
                        writable: !1
                    },
                    Native2JSBridge: {
                        writable: !1
                    },
                    ToutiaoJSBridge: {
                        writable: !1
                    }
                }), Object.freeze(Qu.JSBridge), Object.freeze(Qu.Native2JSBridge), Object.freeze(Qu.ToutiaoJSBridge)
            }, t.prototype.isLegacyCall = function(e) {
                return !(!e || "string" != typeof e || !this.toutiaoLegacyJSB) && (!!tl || !el && !cl && ($u && e.indexOf(".") < 0))
            }, t
        }(Xu);

    function dl(e, t) {
        if (null == e) throw new TypeError("Cannot convert first argument to object");
        for (var n = Object(e), r = 1; r < arguments.length; r++) {
            var i = arguments[r];
            if (null != i)
                for (var o = Object.keys(Object(i)), a = 0, c = o.length; a < c; a++) {
                    var s = o[a],
                        u = Object.getOwnPropertyDescriptor(i, s);
                    void 0 !== u && u.enumerable && (n[s] = i[s])
                }
        }
        return n
    }({
        assign: dl,
        polyfill: function() {
            Object.assign || Object.defineProperty(Object, "assign", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: dl
            })
        }
    }).polyfill();
    var hl = new fl(new ll);
    try {
        hl.exposePublicApiToGlobal()
    } catch (wi) {}
    var pl = hl.publicApi;
    globalThis.window && (window.CustomEvent || function() {
        var e = function(e, t) {
            var n;
            return t = t || {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            }, (n = document.createEvent("CustomEvent")).initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
        };
        e.prototype = window.Event.prototype, window.CustomEvent = e
    }());
    var vl, _l = function(e) {
            var n, r, i;
            return r = function(e) {
                var t = document.createElement("iframe");
                t.style.display = "none", t.src = e, document.body.appendChild(t), setTimeout((function() {
                    document.body.removeChild(t)
                }), 100)
            }, n = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.pacific ? function(e, t) {
                i = {
                    action: e,
                    parameters: (t = t || {}).params,
                    print: !!t.print
                }, "string" == typeof t.callback ? i.callback = {
                    type: 0,
                    name: t.callback,
                    parameters: ["key"]
                } : i.callback = t.callback, window.webkit.messageHandlers.pacific.postMessage(i)
            } : function(n, i) {
                var o, a, c, s = [];
                if (o = ((i = i || {}).protocol || "sslocal") + "://" + n, i.callback && (i.params = i.params || {}, i.params.callback = i.callback), i.params) {
                    for (a in c = i.params)
                        if (c.hasOwnProperty(a)) {
                            var u = c[a];
                            "object" == t(u) && (u = JSON.stringify(u)), s.push(encodeURIComponent(a) + "=" + encodeURIComponent(u))
                        }
                    s.push("r=" + (Math.random() + "").slice(2)), o += "?" + s.join("&")
                }
                e ? (i.debugCall && i.debugCall(n, i.params), (console.dir || console.log)(o)) : r(o)
            }, {
                call: function(t, r, i) {
                    var o = r = r || {};
                    if (i && "function" == typeof i) {
                        var a = t + "DidFinish" + (e ? "" : "_" + Math.random().toString(36).slice(2));
                        document.addEventListener(a, (function e(t) {
                            "success" === t.detail.message && i(t.detail.data), document.removeEventListener(a, e)
                        }))
                    }
                    n(t, {
                        callback: a,
                        params: o
                    })
                }
            }
        }(!!window.globalConfig && window.globalConfig.isDebug),
        gl = _l,
        yl = "HistoryObserver";

    function ml(e, t) {
        var n = history[e];
        return function() {
            var e = Array.prototype.slice.call(arguments);
            n.apply(history, e), t()
        }
    }

    function El(e) {
        var t = e.options,
            n = e.plugins;
        return t && !1 !== t.historyObserver && n && n[yl]
    }! function(e) {
        e.DYNAMIC_WEB_PAGEVIEW = "dynamic_web_pageview"
    }(vl || (vl = {}));
    var bl = function(e, n, r, i) {
            var o, a = arguments.length,
                c = a < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, r) : i;
            if ("object" === ("undefined" == typeof Reflect ? "undefined" : t(Reflect)) && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, n, r, i);
            else
                for (var s = e.length - 1; s >= 0; s--)(o = e[s]) && (c = (a < 3 ? o(c) : a > 3 ? o(n, r, c) : o(n, r)) || c);
            return a > 3 && c && Object.defineProperty(n, r, c), c
        },
        Tl = function(e, t) {
            return function(n, r) {
                t(n, r, e)
            }
        },
        Il = function(e) {
            s(n, e);
            var t = h(n);

            function n(e, r) {
                var o;
                return i(this, n), (o = t.call(this, {
                    name: yl,
                    reporters: r,
                    context: e
                })).initialize = !1, o
            }
            return a(n, [{
                key: "init",
                value: function() {
                    var e = this;
                    this.initialize || (this.addObserver((function() {
                        var t = location.href,
                            n = e.context.getPageInfo().url;
                        if (t !== n) {
                            var r, i = e.context.setPageInfo(t, n);
                            i && i.pageIndex && Vi(i.pageIndex), e.reporters.filter((r = vl.DYNAMIC_WEB_PAGEVIEW, function(e) {
                                var t = e.plugins;
                                return El(e) && t[yl] && t[yl][r]
                            })).forEach((function(e) {
                                e.isPartnerReporter() || setTimeout((function() {
                                    e.page({
                                        event_experiment: "pageview"
                                    })
                                }))
                            }))
                        }
                    })), this.listenSPAHistoryChange(), this.initialize = !0)
                }
            }, {
                key: "pixelSend",
                value: function(e, t) {
                    var n = this.reporters.find((function(t) {
                        return t.getReporterId() === e
                    }));
                    "Pageview" === t && (Xr() || n && n.isPartnerReporter() || n && !El(n) || this.init())
                }
            }, {
                key: "listenSPAHistoryChange",
                value: function() {
                    var e = this,
                        t = function() {
                            e.notifyObservers()
                        };
                    window.addEventListener("popstate", t), history.pushState = ml("pushState", t), history.replaceState = ml("replaceState", t)
                }
            }]), n
        }(Ao);
    Il = bl([A.injectable(), Tl(0, A.inject(Or.CONTEXT)), Tl(1, A.inject(Or.TTQ_REPORTERS))], Il);
    var Ol = [{
            identifier: Or.HISTORY_OBSERVER,
            to: Il,
            name: "HistoryObserver"
        }],
        Sl = Wr(),
        Nl = (null == Sl ? void 0 : Sl._container) || new A.Container,
        Rl = (null == Sl ? void 0 : Sl._container) ? Po.REBIND : Po.BIND;
    vi();
    var Al = Nl[Rl](Or.ENV),
        Pl = Nl[Rl](br.SignalType);
    Nl[Rl](br.ID), Nl[Rl](br.Type), Nl[Rl](br.Options), Nl[Rl](br.Plugins), Nl[Rl](br.Rules), Nl[Rl](br.Info);
    var Cl = Nl[Rl](br.WebLibraryInfo),
        wl = Nl[Rl](Or.TTQ_GLOBAL_OPTIONS);
    try {
        if (!Nl.get(Or.TTQ_GLOBAL_OPTIONS)) throw new Error("")
    } catch (e) {
        wl.toConstantValue({})
    }
    var kl = function(e, t) {
            var n = function(e) {
                    return {
                        name: "pixel.js",
                        version: "2.2.0",
                        options: e
                    }
                }(),
                r = _i();
            Cl.toConstantValue(n), Al.toConstantValue(t), Pl.toConstantValue(r), !e || e._mounted || Nl.isBound(Or.JS_BRIDGE) || gi(t) && (yi(t) ? Nl.bind(Or.JS_BRIDGE).toConstantValue(function() {
                if (window && window.ToutiaoJSBridge && window.ToutiaoJSBridge.call) return window.ToutiaoJSBridge
            }() || pl) : Nl.bind(Or.JS_BRIDGE).toConstantValue(gl))
        },
        Ml = function(e) {
            (null == e ? void 0 : e._container) || (Nl.bind(Or.TTQ).to(Yo).inSingletonScope(), Nl.bind(Or.CONTEXT).to(zo).inSingletonScope(), Nl.bind(Or.REPORTER).to(Vo), Nl.bind(Or.TTQ_REPORTERS).toConstantValue([]), Nl.bind(Or.REPORT_SERVICE).to(ma).inSingletonScope(), Nl.bind(Or.AD_SERVICE).to($o).inSingletonScope(), Nl.bind(Or.APP_SERVICE).to(na).inSingletonScope(), Nl.bind(Or.BRIDGE_SERVICE).to(la).inSingletonScope(), Nl.bind(Or.HTTP_SERVICE).to(_a).inSingletonScope(), Nl.bind(br.IsOnsitePage).toConstantValue({
                value: !1
            }), Nl.bind(Or.COOKIE_SERVICE).to(Ta).inSingletonScope(), Nl.bind(Or.CONSENT_SERVICE).to(ha).inSingletonScope()), e && !e._container && (e._container = Nl)
        },
        Ll = function() {
            Mu.forEach((function(e) {
                var t = e.to,
                    n = e.name,
                    r = void 0 === n ? "" : n,
                    i = e.required,
                    o = void 0 !== i && i,
                    a = e.identifier;
                !o && !zr(r) || Nl.isBound(a) || Nl.bind(a).to(t).inSingletonScope()
            }))
        },
        Dl = function() {
            Ol.forEach((function(e) {
                var t = e.to,
                    n = e.name,
                    r = void 0 === n ? "" : n,
                    i = e.identifier;
                zr(r) && !Nl.isBound(i) && Nl.bind(i).to(t).inSingletonScope()
            }))
        },
        xl = function(e) {
            return e && e.Math == Math && e
        },
        jl = xl("object" == typeof globalThis && globalThis) || xl("object" == typeof window && window) || xl("object" == typeof self && self) || xl("object" == typeof N && N) || Function("return this")(),
        Ul = {},
        Bl = function(e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        },
        Fl = !Bl((function() {
            return 7 != Object.defineProperty({}, 1, {
                get: function() {
                    return 7
                }
            })[1]
        })),
        Hl = {},
        Vl = {}.propertyIsEnumerable,
        Gl = Object.getOwnPropertyDescriptor,
        Jl = Gl && !Vl.call({
            1: 2
        }, 1);
    Hl.f = Jl ? function(e) {
        var t = Gl(this, e);
        return !!t && t.enumerable
    } : Vl;
    var Wl = function(e, t) {
            return {
                enumerable: !(1 & e),
                configurable: !(2 & e),
                writable: !(4 & e),
                value: t
            }
        },
        Kl = {}.toString,
        Yl = function(e) {
            return Kl.call(e).slice(8, -1)
        },
        ql = Yl,
        Xl = "".split,
        zl = Bl((function() {
            return !Object("z").propertyIsEnumerable(0)
        })) ? function(e) {
            return "String" == ql(e) ? Xl.call(e, "") : Object(e)
        } : Object,
        Ql = function(e) {
            if (null == e) throw TypeError("Can't call method on " + e);
            return e
        },
        Zl = zl,
        $l = Ql,
        ef = function(e) {
            return Zl($l(e))
        },
        tf = function(e) {
            return "object" == typeof e ? null !== e : "function" == typeof e
        },
        nf = tf,
        rf = function(e, t) {
            if (!nf(e)) return e;
            var n, r;
            if (t && "function" == typeof(n = e.toString) && !nf(r = n.call(e))) return r;
            if ("function" == typeof(n = e.valueOf) && !nf(r = n.call(e))) return r;
            if (!t && "function" == typeof(n = e.toString) && !nf(r = n.call(e))) return r;
            throw TypeError("Can't convert object to primitive value")
        },
        of = {}.hasOwnProperty,
        af = function(e, t) {
            return of.call(e, t)
        },
        cf = tf,
        sf = jl.document,
        uf = cf(sf) && cf(sf.createElement),
        lf = function(e) {
            return uf ? sf.createElement(e) : {}
        },
        ff = lf,
        df = !Fl && !Bl((function() {
            return 7 != Object.defineProperty(ff("div"), "a", {
                get: function() {
                    return 7
                }
            }).a
        })),
        hf = Fl,
        pf = Hl,
        vf = Wl,
        _f = ef,
        gf = rf,
        yf = af,
        mf = df,
        Ef = Object.getOwnPropertyDescriptor;
    Ul.f = hf ? Ef : function(e, t) {
        if (e = _f(e), t = gf(t, !0), mf) try {
            return Ef(e, t)
        } catch (e) {}
        if (yf(e, t)) return vf(!pf.f.call(e, t), e[t])
    };
    var bf = {},
        Tf = tf,
        If = function(e) {
            if (!Tf(e)) throw TypeError(String(e) + " is not an object");
            return e
        },
        Of = Fl,
        Sf = df,
        Nf = If,
        Rf = rf,
        Af = Object.defineProperty;
    bf.f = Of ? Af : function(e, t, n) {
        if (Nf(e), t = Rf(t, !0), Nf(n), Sf) try {
            return Af(e, t, n)
        } catch (e) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported");
        return "value" in n && (e[t] = n.value), e
    };
    var Pf = bf,
        Cf = Wl,
        wf = Fl ? function(e, t, n) {
            return Pf.f(e, t, Cf(1, n))
        } : function(e, t, n) {
            return e[t] = n, e
        },
        kf = {
            exports: {}
        },
        Mf = jl,
        Lf = wf,
        Df = function(e, t) {
            try {
                Lf(Mf, e, t)
            } catch (n) {
                Mf[e] = t
            }
            return t
        },
        xf = Df,
        jf = "__core-js_shared__",
        Uf = jl[jf] || xf(jf, {}),
        Bf = Uf,
        Ff = Function.toString;
    "function" != typeof Bf.inspectSource && (Bf.inspectSource = function(e) {
        return Ff.call(e)
    });
    var Hf = Bf.inspectSource,
        Vf = Hf,
        Gf = jl.WeakMap,
        Jf = "function" == typeof Gf && /native code/.test(Vf(Gf)),
        Wf = {
            exports: {}
        },
        Kf = Uf;
    (Wf.exports = function(e, t) {
        return Kf[e] || (Kf[e] = void 0 !== t ? t : {})
    })("versions", []).push({
        version: "3.6.4",
        mode: "global",
        copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
    });
    var Yf, qf, Xf, zf = 0,
        Qf = Math.random(),
        Zf = function(e) {
            return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++zf + Qf).toString(36)
        },
        $f = Wf.exports,
        ed = Zf,
        td = $f("keys"),
        nd = function(e) {
            return td[e] || (td[e] = ed(e))
        },
        rd = {},
        id = Jf,
        od = tf,
        ad = wf,
        cd = af,
        sd = nd,
        ud = rd,
        ld = jl.WeakMap;
    if (id) {
        var fd = new ld,
            dd = fd.get,
            hd = fd.has,
            pd = fd.set;
        Yf = function(e, t) {
            return pd.call(fd, e, t), t
        }, qf = function(e) {
            return dd.call(fd, e) || {}
        }, Xf = function(e) {
            return hd.call(fd, e)
        }
    } else {
        var vd = sd("state");
        ud[vd] = !0, Yf = function(e, t) {
            return ad(e, vd, t), t
        }, qf = function(e) {
            return cd(e, vd) ? e[vd] : {}
        }, Xf = function(e) {
            return cd(e, vd)
        }
    }
    var _d = {
            set: Yf,
            get: qf,
            has: Xf,
            enforce: function(e) {
                return Xf(e) ? qf(e) : Yf(e, {})
            },
            getterFor: function(e) {
                return function(t) {
                    var n;
                    if (!od(t) || (n = qf(t)).type !== e) throw TypeError("Incompatible receiver, " + e + " required");
                    return n
                }
            }
        },
        gd = jl,
        yd = wf,
        md = af,
        Ed = Df,
        bd = Hf,
        Td = _d.get,
        Id = _d.enforce,
        Od = String(String).split("String");
    (kf.exports = function(e, t, n, r) {
        var i = !!r && !!r.unsafe,
            o = !!r && !!r.enumerable,
            a = !!r && !!r.noTargetGet;
        "function" == typeof n && ("string" != typeof t || md(n, "name") || yd(n, "name", t), Id(n).source = Od.join("string" == typeof t ? t : "")), e !== gd ? (i ? !a && e[t] && (o = !0) : delete e[t], o ? e[t] = n : yd(e, t, n)) : o ? e[t] = n : Ed(t, n)
    })(Function.prototype, "toString", (function() {
        return "function" == typeof this && Td(this).source || bd(this)
    }));
    var Sd = jl,
        Nd = Sd,
        Rd = jl,
        Ad = function(e) {
            return "function" == typeof e ? e : void 0
        },
        Pd = function(e, t) {
            return arguments.length < 2 ? Ad(Nd[e]) || Ad(Rd[e]) : Nd[e] && Nd[e][t] || Rd[e] && Rd[e][t]
        },
        Cd = {},
        wd = Math.ceil,
        kd = Math.floor,
        Md = function(e) {
            return isNaN(e = +e) ? 0 : (e > 0 ? kd : wd)(e)
        },
        Ld = Md,
        Dd = Math.min,
        xd = function(e) {
            return e > 0 ? Dd(Ld(e), 9007199254740991) : 0
        },
        jd = Md,
        Ud = Math.max,
        Bd = Math.min,
        Fd = ef,
        Hd = xd,
        Vd = function(e, t) {
            var n = jd(e);
            return n < 0 ? Ud(n + t, 0) : Bd(n, t)
        },
        Gd = function(e) {
            return function(t, n, r) {
                var i, o = Fd(t),
                    a = Hd(o.length),
                    c = Vd(r, a);
                if (e && n != n) {
                    for (; a > c;)
                        if ((i = o[c++]) != i) return !0
                } else
                    for (; a > c; c++)
                        if ((e || c in o) && o[c] === n) return e || c || 0;
                return !e && -1
            }
        },
        Jd = {
            includes: Gd(!0),
            indexOf: Gd(!1)
        },
        Wd = af,
        Kd = ef,
        Yd = Jd.indexOf,
        qd = rd,
        Xd = function(e, t) {
            var n, r = Kd(e),
                i = 0,
                o = [];
            for (n in r) !Wd(qd, n) && Wd(r, n) && o.push(n);
            for (; t.length > i;) Wd(r, n = t[i++]) && (~Yd(o, n) || o.push(n));
            return o
        },
        zd = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
        Qd = Xd,
        Zd = zd.concat("length", "prototype");
    Cd.f = Object.getOwnPropertyNames || function(e) {
        return Qd(e, Zd)
    };
    var $d = {};
    $d.f = Object.getOwnPropertySymbols;
    var eh, th = Cd,
        nh = $d,
        rh = If,
        ih = Pd("Reflect", "ownKeys") || function(e) {
            var t = th.f(rh(e)),
                n = nh.f;
            return n ? t.concat(n(e)) : t
        },
        oh = af,
        ah = ih,
        ch = Ul,
        sh = bf,
        uh = Bl,
        lh = /#|\.prototype\./,
        fh = function(e, t) {
            var n = hh[dh(e)];
            return n == vh || n != ph && ("function" == typeof t ? uh(t) : !!t)
        },
        dh = fh.normalize = function(e) {
            return String(e).replace(lh, ".").toLowerCase()
        },
        hh = fh.data = {},
        ph = fh.NATIVE = "N",
        vh = fh.POLYFILL = "P",
        _h = fh,
        gh = jl,
        yh = Ul.f,
        mh = wf,
        Eh = kf.exports,
        bh = Df,
        Th = function(e, t) {
            for (var n = ah(t), r = sh.f, i = ch.f, o = 0; o < n.length; o++) {
                var a = n[o];
                oh(e, a) || r(e, a, i(t, a))
            }
        },
        Ih = _h,
        Oh = function(e, t) {
            var n, r, i, o, a, c = e.target,
                s = e.global,
                u = e.stat;
            if (n = s ? gh : u ? gh[c] || bh(c, {}) : (gh[c] || {}).prototype)
                for (r in t) {
                    if (o = t[r], i = e.noTargetGet ? (a = yh(n, r)) && a.value : n[r], !Ih(s ? r : c + (u ? "." : "#") + r, e.forced) && void 0 !== i) {
                        if (typeof o == typeof i) continue;
                        Th(o, i)
                    }(e.sham || i && i.sham) && mh(o, "sham", !0), Eh(n, r, o, e)
                }
        },
        Sh = Bl,
        Nh = !!Object.getOwnPropertySymbols && !Sh((function() {
            return !String(Symbol())
        })),
        Rh = Nh && !Symbol.sham && "symbol" == typeof Symbol.iterator,
        Ah = Yl,
        Ph = Array.isArray || function(e) {
            return "Array" == Ah(e)
        },
        Ch = Ql,
        wh = function(e) {
            return Object(Ch(e))
        },
        kh = Xd,
        Mh = zd,
        Lh = Object.keys || function(e) {
            return kh(e, Mh)
        },
        Dh = bf,
        xh = If,
        jh = Lh,
        Uh = Fl ? Object.defineProperties : function(e, t) {
            xh(e);
            for (var n, r = jh(t), i = r.length, o = 0; i > o;) Dh.f(e, n = r[o++], t[n]);
            return e
        },
        Bh = Pd("document", "documentElement"),
        Fh = If,
        Hh = Uh,
        Vh = zd,
        Gh = rd,
        Jh = Bh,
        Wh = lf,
        Kh = nd("IE_PROTO"),
        Yh = function() {},
        qh = function(e) {
            return "<script>" + e + "</" + "script>"
        },
        Xh = function() {
            try {
                eh = document.domain && new ActiveXObject("htmlfile")
            } catch (e) {}
            var e, t;
            Xh = eh ? function(e) {
                e.write(qh("")), e.close();
                var t = e.parentWindow.Object;
                return e = null, t
            }(eh) : ((t = Wh("iframe")).style.display = "none", Jh.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(), e.write(qh("document.F=Object")), e.close(), e.F);
            for (var n = Vh.length; n--;) delete Xh.prototype[Vh[n]];
            return Xh()
        };
    Gh[Kh] = !0;
    var zh = Object.create || function(e, t) {
            var n;
            return null !== e ? (Yh.prototype = Fh(e), n = new Yh, Yh.prototype = null, n[Kh] = e) : n = Xh(), void 0 === t ? n : Hh(n, t)
        },
        Qh = {},
        Zh = ef,
        $h = Cd.f,
        ep = {}.toString,
        tp = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
    Qh.f = function(e) {
        return tp && "[object Window]" == ep.call(e) ? function(e) {
            try {
                return $h(e)
            } catch (e) {
                return tp.slice()
            }
        }(e) : $h(Zh(e))
    };
    var np = jl,
        rp = Wf.exports,
        ip = af,
        op = Zf,
        ap = Nh,
        cp = Rh,
        sp = rp("wks"),
        up = np.Symbol,
        lp = cp ? up : up && up.withoutSetter || op,
        fp = function(e) {
            return ip(sp, e) || (ap && ip(up, e) ? sp[e] = up[e] : sp[e] = lp("Symbol." + e)), sp[e]
        },
        dp = {},
        hp = fp;
    dp.f = hp;
    var pp = Sd,
        vp = af,
        _p = dp,
        gp = bf.f,
        yp = bf.f,
        mp = af,
        Ep = fp("toStringTag"),
        bp = function(e, t, n) {
            e && !mp(e = n ? e : e.prototype, Ep) && yp(e, Ep, {
                configurable: !0,
                value: t
            })
        },
        Tp = function(e) {
            if ("function" != typeof e) throw TypeError(String(e) + " is not a function");
            return e
        },
        Ip = Tp,
        Op = function(e, t, n) {
            if (Ip(e), void 0 === t) return e;
            switch (n) {
                case 0:
                    return function() {
                        return e.call(t)
                    };
                case 1:
                    return function(n) {
                        return e.call(t, n)
                    };
                case 2:
                    return function(n, r) {
                        return e.call(t, n, r)
                    };
                case 3:
                    return function(n, r, i) {
                        return e.call(t, n, r, i)
                    }
            }
            return function() {
                return e.apply(t, arguments)
            }
        },
        Sp = tf,
        Np = Ph,
        Rp = fp("species"),
        Ap = Op,
        Pp = zl,
        Cp = wh,
        wp = xd,
        kp = function(e, t) {
            var n;
            return Np(e) && ("function" != typeof(n = e.constructor) || n !== Array && !Np(n.prototype) ? Sp(n) && null === (n = n[Rp]) && (n = void 0) : n = void 0), new(void 0 === n ? Array : n)(0 === t ? 0 : t)
        },
        Mp = [].push,
        Lp = function(e) {
            var t = 1 == e,
                n = 2 == e,
                r = 3 == e,
                i = 4 == e,
                o = 6 == e,
                a = 5 == e || o;
            return function(c, s, u, l) {
                for (var f, d, h = Cp(c), p = Pp(h), v = Ap(s, u, 3), _ = wp(p.length), g = 0, y = l || kp, m = t ? y(c, _) : n ? y(c, 0) : void 0; _ > g; g++)
                    if ((a || g in p) && (d = v(f = p[g], g, h), e))
                        if (t) m[g] = d;
                        else if (d) switch (e) {
                    case 3:
                        return !0;
                    case 5:
                        return f;
                    case 6:
                        return g;
                    case 2:
                        Mp.call(m, f)
                } else if (i) return !1;
                return o ? -1 : r || i ? i : m
            }
        },
        Dp = {
            forEach: Lp(0),
            map: Lp(1),
            filter: Lp(2),
            some: Lp(3),
            every: Lp(4),
            find: Lp(5),
            findIndex: Lp(6)
        },
        xp = Oh,
        jp = jl,
        Up = Pd,
        Bp = Fl,
        Fp = Nh,
        Hp = Rh,
        Vp = Bl,
        Gp = af,
        Jp = Ph,
        Wp = tf,
        Kp = If,
        Yp = wh,
        qp = ef,
        Xp = rf,
        zp = Wl,
        Qp = zh,
        Zp = Lh,
        $p = Cd,
        ev = Qh,
        tv = $d,
        nv = Ul,
        rv = bf,
        iv = Hl,
        ov = wf,
        av = kf.exports,
        cv = Wf.exports,
        sv = rd,
        uv = Zf,
        lv = fp,
        fv = dp,
        dv = function(e) {
            var t = pp.Symbol || (pp.Symbol = {});
            vp(t, e) || gp(t, e, {
                value: _p.f(e)
            })
        },
        hv = bp,
        pv = _d,
        vv = Dp.forEach,
        _v = nd("hidden"),
        gv = "Symbol",
        yv = lv("toPrimitive"),
        mv = pv.set,
        Ev = pv.getterFor(gv),
        bv = Object.prototype,
        Tv = jp.Symbol,
        Iv = Up("JSON", "stringify"),
        Ov = nv.f,
        Sv = rv.f,
        Nv = ev.f,
        Rv = iv.f,
        Av = cv("symbols"),
        Pv = cv("op-symbols"),
        Cv = cv("string-to-symbol-registry"),
        wv = cv("symbol-to-string-registry"),
        kv = cv("wks"),
        Mv = jp.QObject,
        Lv = !Mv || !Mv.prototype || !Mv.prototype.findChild,
        Dv = Bp && Vp((function() {
            return 7 != Qp(Sv({}, "a", {
                get: function() {
                    return Sv(this, "a", {
                        value: 7
                    }).a
                }
            })).a
        })) ? function(e, t, n) {
            var r = Ov(bv, t);
            r && delete bv[t], Sv(e, t, n), r && e !== bv && Sv(bv, t, r)
        } : Sv,
        xv = function(e, t) {
            var n = Av[e] = Qp(Tv.prototype);
            return mv(n, {
                type: gv,
                tag: e,
                description: t
            }), Bp || (n.description = t), n
        },
        jv = Hp ? function(e) {
            return "symbol" == typeof e
        } : function(e) {
            return Object(e) instanceof Tv
        },
        Uv = function(e, t, n) {
            e === bv && Uv(Pv, t, n), Kp(e);
            var r = Xp(t, !0);
            return Kp(n), Gp(Av, r) ? (n.enumerable ? (Gp(e, _v) && e[_v][r] && (e[_v][r] = !1), n = Qp(n, {
                enumerable: zp(0, !1)
            })) : (Gp(e, _v) || Sv(e, _v, zp(1, {})), e[_v][r] = !0), Dv(e, r, n)) : Sv(e, r, n)
        },
        Bv = function(e, t) {
            Kp(e);
            var n = qp(t),
                r = Zp(n).concat(Gv(n));
            return vv(r, (function(t) {
                Bp && !Fv.call(n, t) || Uv(e, t, n[t])
            })), e
        },
        Fv = function(e) {
            var t = Xp(e, !0),
                n = Rv.call(this, t);
            return !(this === bv && Gp(Av, t) && !Gp(Pv, t)) && (!(n || !Gp(this, t) || !Gp(Av, t) || Gp(this, _v) && this[_v][t]) || n)
        },
        Hv = function(e, t) {
            var n = qp(e),
                r = Xp(t, !0);
            if (n !== bv || !Gp(Av, r) || Gp(Pv, r)) {
                var i = Ov(n, r);
                return !i || !Gp(Av, r) || Gp(n, _v) && n[_v][r] || (i.enumerable = !0), i
            }
        },
        Vv = function(e) {
            var t = Nv(qp(e)),
                n = [];
            return vv(t, (function(e) {
                Gp(Av, e) || Gp(sv, e) || n.push(e)
            })), n
        },
        Gv = function(e) {
            var t = e === bv,
                n = Nv(t ? Pv : qp(e)),
                r = [];
            return vv(n, (function(e) {
                !Gp(Av, e) || t && !Gp(bv, e) || r.push(Av[e])
            })), r
        };
    (Fp || (Tv = function() {
        if (this instanceof Tv) throw TypeError("Symbol is not a constructor");
        var e = arguments.length && void 0 !== arguments[0] ? String(arguments[0]) : void 0,
            t = uv(e),
            n = function(e) {
                this === bv && n.call(Pv, e), Gp(this, _v) && Gp(this[_v], t) && (this[_v][t] = !1), Dv(this, t, zp(1, e))
            };
        return Bp && Lv && Dv(bv, t, {
            configurable: !0,
            set: n
        }), xv(t, e)
    }, av(Tv.prototype, "toString", (function() {
        return Ev(this).tag
    })), av(Tv, "withoutSetter", (function(e) {
        return xv(uv(e), e)
    })), iv.f = Fv, rv.f = Uv, nv.f = Hv, $p.f = ev.f = Vv, tv.f = Gv, fv.f = function(e) {
        return xv(lv(e), e)
    }, Bp && (Sv(Tv.prototype, "description", {
        configurable: !0,
        get: function() {
            return Ev(this).description
        }
    }), av(bv, "propertyIsEnumerable", Fv, {
        unsafe: !0
    }))), xp({
        global: !0,
        wrap: !0,
        forced: !Fp,
        sham: !Fp
    }, {
        Symbol: Tv
    }), vv(Zp(kv), (function(e) {
        dv(e)
    })), xp({
        target: gv,
        stat: !0,
        forced: !Fp
    }, {
        for: function(e) {
            var t = String(e);
            if (Gp(Cv, t)) return Cv[t];
            var n = Tv(t);
            return Cv[t] = n, wv[n] = t, n
        },
        keyFor: function(e) {
            if (!jv(e)) throw TypeError(e + " is not a symbol");
            if (Gp(wv, e)) return wv[e]
        },
        useSetter: function() {
            Lv = !0
        },
        useSimple: function() {
            Lv = !1
        }
    }), xp({
        target: "Object",
        stat: !0,
        forced: !Fp,
        sham: !Bp
    }, {
        create: function(e, t) {
            return void 0 === t ? Qp(e) : Bv(Qp(e), t)
        },
        defineProperty: Uv,
        defineProperties: Bv,
        getOwnPropertyDescriptor: Hv
    }), xp({
        target: "Object",
        stat: !0,
        forced: !Fp
    }, {
        getOwnPropertyNames: Vv,
        getOwnPropertySymbols: Gv
    }), xp({
        target: "Object",
        stat: !0,
        forced: Vp((function() {
            tv.f(1)
        }))
    }, {
        getOwnPropertySymbols: function(e) {
            return tv.f(Yp(e))
        }
    }), Iv) && xp({
        target: "JSON",
        stat: !0,
        forced: !Fp || Vp((function() {
            var e = Tv();
            return "[null]" != Iv([e]) || "{}" != Iv({
                a: e
            }) || "{}" != Iv(Object(e))
        }))
    }, {
        stringify: function(e, t, n) {
            for (var r, i = [e], o = 1; arguments.length > o;) i.push(arguments[o++]);
            if (r = t, (Wp(t) || void 0 !== e) && !jv(e)) return Jp(t) || (t = function(e, t) {
                if ("function" == typeof r && (t = r.call(this, e, t)), !jv(t)) return t
            }), i[1] = t, Iv.apply(null, i)
        }
    });
    Tv.prototype[yv] || ov(Tv.prototype, yv, Tv.prototype.valueOf), hv(Tv, gv), sv[_v] = !0;
    var Jv = Fl,
        Wv = Bl,
        Kv = Lh,
        Yv = $d,
        qv = Hl,
        Xv = wh,
        zv = zl,
        Qv = Object.assign,
        Zv = Object.defineProperty,
        $v = !Qv || Wv((function() {
            if (Jv && 1 !== Qv({
                    b: 1
                }, Qv(Zv({}, "a", {
                    enumerable: !0,
                    get: function() {
                        Zv(this, "b", {
                            value: 3,
                            enumerable: !1
                        })
                    }
                }), {
                    b: 2
                })).b) return !0;
            var e = {},
                t = {},
                n = Symbol(),
                r = "abcdefghijklmnopqrst";
            return e[n] = 7, r.split("").forEach((function(e) {
                t[e] = e
            })), 7 != Qv({}, e)[n] || Kv(Qv({}, t)).join("") != r
        })) ? function(e, t) {
            for (var n = Xv(e), r = arguments.length, i = 1, o = Yv.f, a = qv.f; r > i;)
                for (var c, s = zv(arguments[i++]), u = o ? Kv(s).concat(o(s)) : Kv(s), l = u.length, f = 0; l > f;) c = u[f++], Jv && !a.call(s, c) || (n[c] = s[c]);
            return n
        } : Qv,
        e_ = $v;
    Oh({
        target: "Object",
        stat: !0,
        forced: Object.assign !== e_
    }, {
        assign: e_
    }), Oh({
        target: "Object",
        stat: !0,
        sham: !Fl
    }, {
        create: zh
    });
    Oh({
        target: "Object",
        stat: !0,
        forced: !Fl,
        sham: !Fl
    }, {
        defineProperty: bf.f
    });
    Oh({
        target: "Object",
        stat: !0,
        forced: !Fl,
        sham: !Fl
    }, {
        defineProperties: Uh
    });
    var t_ = Fl,
        n_ = Lh,
        r_ = ef,
        i_ = Hl.f,
        o_ = function(e) {
            return function(t) {
                for (var n, r = r_(t), i = n_(r), o = i.length, a = 0, c = []; o > a;) n = i[a++], t_ && !i_.call(r, n) || c.push(e ? [n, r[n]] : r[n]);
                return c
            }
        },
        a_ = {
            entries: o_(!0),
            values: o_(!1)
        },
        c_ = a_.entries;
    Oh({
        target: "Object",
        stat: !0
    }, {
        entries: function(e) {
            return c_(e)
        }
    });
    var s_ = !Bl((function() {
            return Object.isExtensible(Object.preventExtensions({}))
        })),
        u_ = {
            exports: {}
        },
        l_ = rd,
        f_ = tf,
        d_ = af,
        h_ = bf.f,
        p_ = s_,
        v_ = Zf("meta"),
        __ = 0,
        g_ = Object.isExtensible || function() {
            return !0
        },
        y_ = function(e) {
            h_(e, v_, {
                value: {
                    objectID: "O" + ++__,
                    weakData: {}
                }
            })
        },
        m_ = u_.exports = {
            REQUIRED: !1,
            fastKey: function(e, t) {
                if (!f_(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                if (!d_(e, v_)) {
                    if (!g_(e)) return "F";
                    if (!t) return "E";
                    y_(e)
                }
                return e[v_].objectID
            },
            getWeakData: function(e, t) {
                if (!d_(e, v_)) {
                    if (!g_(e)) return !0;
                    if (!t) return !1;
                    y_(e)
                }
                return e[v_].weakData
            },
            onFreeze: function(e) {
                return p_ && m_.REQUIRED && g_(e) && !d_(e, v_) && y_(e), e
            }
        };
    l_[v_] = !0;
    var E_ = Oh,
        b_ = s_,
        T_ = Bl,
        I_ = tf,
        O_ = u_.exports.onFreeze,
        S_ = Object.freeze;
    E_({
        target: "Object",
        stat: !0,
        forced: T_((function() {
            S_(1)
        })),
        sham: !b_
    }, {
        freeze: function(e) {
            return S_ && I_(e) ? S_(O_(e)) : e
        }
    });
    var N_ = {
            exports: {}
        },
        R_ = {},
        A_ = R_,
        P_ = fp("iterator"),
        C_ = Array.prototype,
        w_ = {};
    w_[fp("toStringTag")] = "z";
    var k_ = "[object z]" === String(w_),
        M_ = k_,
        L_ = Yl,
        D_ = fp("toStringTag"),
        x_ = "Arguments" == L_(function() {
            return arguments
        }()),
        j_ = M_ ? L_ : function(e) {
            var t, n, r;
            return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(n = function(e, t) {
                try {
                    return e[t]
                } catch (e) {}
            }(t = Object(e), D_)) ? n : x_ ? L_(t) : "Object" == (r = L_(t)) && "function" == typeof t.callee ? "Arguments" : r
        },
        U_ = j_,
        B_ = R_,
        F_ = fp("iterator"),
        H_ = If,
        V_ = If,
        G_ = function(e) {
            return void 0 !== e && (A_.Array === e || C_[P_] === e)
        },
        J_ = xd,
        W_ = Op,
        K_ = function(e) {
            if (null != e) return e[F_] || e["@@iterator"] || B_[U_(e)]
        },
        Y_ = function(e, t, n, r) {
            try {
                return r ? t(H_(n)[0], n[1]) : t(n)
            } catch (t) {
                var i = e.return;
                throw void 0 !== i && H_(i.call(e)), t
            }
        },
        q_ = function(e, t) {
            this.stopped = e, this.result = t
        };
    (N_.exports = function(e, t, n, r, i) {
        var o, a, c, s, u, l, f, d = W_(t, n, r ? 2 : 1);
        if (i) o = e;
        else {
            if ("function" != typeof(a = K_(e))) throw TypeError("Target is not iterable");
            if (G_(a)) {
                for (c = 0, s = J_(e.length); s > c; c++)
                    if ((u = r ? d(V_(f = e[c])[0], f[1]) : d(e[c])) && u instanceof q_) return u;
                return new q_(!1)
            }
            o = a.call(e)
        }
        for (l = o.next; !(f = l.call(o)).done;)
            if ("object" == typeof(u = Y_(o, d, f.value, r)) && u && u instanceof q_) return u;
        return new q_(!1)
    }).stop = function(e) {
        return new q_(!0, e)
    };
    var X_ = rf,
        z_ = bf,
        Q_ = Wl,
        Z_ = function(e, t, n) {
            var r = X_(t);
            r in e ? z_.f(e, r, Q_(0, n)) : e[r] = n
        },
        $_ = Oh,
        eg = N_.exports,
        tg = Z_;
    $_({
        target: "Object",
        stat: !0
    }, {
        fromEntries: function(e) {
            var t = {};
            return eg(e, (function(e, n) {
                tg(t, e, n)
            }), void 0, !0), t
        }
    });
    var ng = Oh,
        rg = Bl,
        ig = ef,
        og = Ul.f,
        ag = Fl,
        cg = rg((function() {
            og(1)
        }));
    ng({
        target: "Object",
        stat: !0,
        forced: !ag || cg,
        sham: !ag
    }, {
        getOwnPropertyDescriptor: function(e, t) {
            return og(ig(e), t)
        }
    });
    var sg = ih,
        ug = ef,
        lg = Ul,
        fg = Z_;
    Oh({
        target: "Object",
        stat: !0,
        sham: !Fl
    }, {
        getOwnPropertyDescriptors: function(e) {
            for (var t, n, r = ug(e), i = lg.f, o = sg(r), a = {}, c = 0; o.length > c;) void 0 !== (n = i(r, t = o[c++])) && fg(a, t, n);
            return a
        }
    });
    var dg = Oh,
        hg = Bl,
        pg = Qh.f;
    dg({
        target: "Object",
        stat: !0,
        forced: hg((function() {
            return !Object.getOwnPropertyNames(1)
        }))
    }, {
        getOwnPropertyNames: pg
    });
    var vg = !Bl((function() {
            function e() {}
            return e.prototype.constructor = null, Object.getPrototypeOf(new e) !== e.prototype
        })),
        _g = af,
        gg = wh,
        yg = vg,
        mg = nd("IE_PROTO"),
        Eg = Object.prototype,
        bg = yg ? Object.getPrototypeOf : function(e) {
            return e = gg(e), _g(e, mg) ? e[mg] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? Eg : null
        },
        Tg = wh,
        Ig = bg,
        Og = vg;
    Oh({
        target: "Object",
        stat: !0,
        forced: Bl((function() {
            Ig(1)
        })),
        sham: !Og
    }, {
        getPrototypeOf: function(e) {
            return Ig(Tg(e))
        }
    });
    var Sg = Object.is || function(e, t) {
        return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
    };
    Oh({
        target: "Object",
        stat: !0
    }, {
        is: Sg
    });
    var Ng = Oh,
        Rg = Bl,
        Ag = tf,
        Pg = Object.isExtensible;
    Ng({
        target: "Object",
        stat: !0,
        forced: Rg((function() {
            Pg(1)
        }))
    }, {
        isExtensible: function(e) {
            return !!Ag(e) && (!Pg || Pg(e))
        }
    });
    var Cg = Oh,
        wg = Bl,
        kg = tf,
        Mg = Object.isFrozen;
    Cg({
        target: "Object",
        stat: !0,
        forced: wg((function() {
            Mg(1)
        }))
    }, {
        isFrozen: function(e) {
            return !kg(e) || !!Mg && Mg(e)
        }
    });
    var Lg = Oh,
        Dg = Bl,
        xg = tf,
        jg = Object.isSealed;
    Lg({
        target: "Object",
        stat: !0,
        forced: Dg((function() {
            jg(1)
        }))
    }, {
        isSealed: function(e) {
            return !xg(e) || !!jg && jg(e)
        }
    });
    var Ug = wh,
        Bg = Lh;
    Oh({
        target: "Object",
        stat: !0,
        forced: Bl((function() {
            Bg(1)
        }))
    }, {
        keys: function(e) {
            return Bg(Ug(e))
        }
    });
    var Fg = Oh,
        Hg = tf,
        Vg = u_.exports.onFreeze,
        Gg = s_,
        Jg = Bl,
        Wg = Object.preventExtensions;
    Fg({
        target: "Object",
        stat: !0,
        forced: Jg((function() {
            Wg(1)
        })),
        sham: !Gg
    }, {
        preventExtensions: function(e) {
            return Wg && Hg(e) ? Wg(Vg(e)) : e
        }
    });
    var Kg = Oh,
        Yg = tf,
        qg = u_.exports.onFreeze,
        Xg = s_,
        zg = Bl,
        Qg = Object.seal;
    Kg({
        target: "Object",
        stat: !0,
        forced: zg((function() {
            Qg(1)
        })),
        sham: !Xg
    }, {
        seal: function(e) {
            return Qg && Yg(e) ? Qg(qg(e)) : e
        }
    });
    var Zg = tf,
        $g = If,
        ey = function(e) {
            if (!Zg(e) && null !== e) throw TypeError("Can't set " + String(e) + " as a prototype");
            return e
        },
        ty = Object.setPrototypeOf || ("__proto__" in {} ? function() {
            var e, t = !1,
                n = {};
            try {
                (e = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n, []), t = n instanceof Array
            } catch (e) {}
            return function(n, r) {
                return $g(n), ey(r), t ? e.call(n, r) : n.__proto__ = r, n
            }
        }() : void 0);
    Oh({
        target: "Object",
        stat: !0
    }, {
        setPrototypeOf: ty
    });
    var ny = a_.values;
    Oh({
        target: "Object",
        stat: !0
    }, {
        values: function(e) {
            return ny(e)
        }
    });
    var ry = j_,
        iy = k_ ? {}.toString : function() {
            return "[object " + ry(this) + "]"
        },
        oy = k_,
        ay = kf.exports,
        cy = iy;
    oy || ay(Object.prototype, "toString", cy, {
        unsafe: !0
    });
    var sy = jl,
        uy = !Bl((function() {
            var e = Math.random();
            __defineSetter__.call(null, e, (function() {})), delete sy[e]
        })),
        ly = wh,
        fy = Tp,
        dy = bf;
    Fl && Oh({
        target: "Object",
        proto: !0,
        forced: uy
    }, {
        __defineGetter__: function(e, t) {
            dy.f(ly(this), e, {
                get: fy(t),
                enumerable: !0,
                configurable: !0
            })
        }
    });
    var hy = wh,
        py = Tp,
        vy = bf;
    Fl && Oh({
        target: "Object",
        proto: !0,
        forced: uy
    }, {
        __defineSetter__: function(e, t) {
            vy.f(hy(this), e, {
                set: py(t),
                enumerable: !0,
                configurable: !0
            })
        }
    });
    var _y = Oh,
        gy = Fl,
        yy = uy,
        my = wh,
        Ey = rf,
        by = bg,
        Ty = Ul.f;
    gy && _y({
        target: "Object",
        proto: !0,
        forced: yy
    }, {
        __lookupGetter__: function(e) {
            var t, n = my(this),
                r = Ey(e, !0);
            do {
                if (t = Ty(n, r)) return t.get
            } while (n = by(n))
        }
    });
    var Iy = Oh,
        Oy = Fl,
        Sy = uy,
        Ny = wh,
        Ry = rf,
        Ay = bg,
        Py = Ul.f;

    function Cy(e) {
        var t = this.constructor;
        return this.then((function(n) {
            return t.resolve(e()).then((function() {
                return n
            }))
        }), (function(n) {
            return t.resolve(e()).then((function() {
                return t.reject(n)
            }))
        }))
    }

    function wy(e) {
        return new this((function(t, n) {
            if (!e || void 0 === e.length) return n(new TypeError(typeof e + " " + e + " is not iterable(cannot read property Symbol(Symbol.iterator))"));
            var r = Array.prototype.slice.call(e);
            if (0 === r.length) return t([]);
            var i = r.length;

            function o(e, n) {
                if (n && ("object" == typeof n || "function" == typeof n)) {
                    var a = n.then;
                    if ("function" == typeof a) return void a.call(n, (function(t) {
                        o(e, t)
                    }), (function(n) {
                        r[e] = {
                            status: "rejected",
                            reason: n
                        }, 0 == --i && t(r)
                    }))
                }
                r[e] = {
                    status: "fulfilled",
                    value: n
                }, 0 == --i && t(r)
            }
            for (var a = 0; a < r.length; a++) o(a, r[a])
        }))
    }

    function ky(e, t) {
        this.name = "AggregateError", this.errors = e, this.message = t || ""
    }

    function My(e) {
        var t = this;
        return new t((function(n, r) {
            if (!e || void 0 === e.length) return r(new TypeError("Promise.any accepts an array"));
            var i = Array.prototype.slice.call(e);
            if (0 === i.length) return r();
            for (var o = [], a = 0; a < i.length; a++) try {
                t.resolve(i[a]).then(n).catch((function(e) {
                    o.push(e), o.length === i.length && r(new ky(o, "All promises were rejected"))
                }))
            } catch (e) {
                r(e)
            }
        }))
    }
    Oy && Iy({
        target: "Object",
        proto: !0,
        forced: Sy
    }, {
        __lookupSetter__: function(e) {
            var t, n = Ny(this),
                r = Ry(e, !0);
            do {
                if (t = Py(n, r)) return t.set
            } while (n = Ay(n))
        }
    }), bp(Math, "Math", !0), bp(jl.JSON, "JSON", !0), Sd.Object, ky.prototype = Error.prototype;
    var Ly = setTimeout;

    function Dy(e) {
        return Boolean(e && void 0 !== e.length)
    }

    function xy() {}

    function jy(e) {
        if (!(this instanceof jy)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof e) throw new TypeError("not a function");
        this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], Gy(e, this)
    }

    function Uy(e, t) {
        for (; 3 === e._state;) e = e._value;
        0 !== e._state ? (e._handled = !0, jy._immediateFn((function() {
            var n = 1 === e._state ? t.onFulfilled : t.onRejected;
            if (null !== n) {
                var r;
                try {
                    r = n(e._value)
                } catch (e) {
                    return void Fy(t.promise, e)
                }
                By(t.promise, r)
            } else(1 === e._state ? By : Fy)(t.promise, e._value)
        }))) : e._deferreds.push(t)
    }

    function By(e, t) {
        try {
            if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
            if (t && ("object" == typeof t || "function" == typeof t)) {
                var n = t.then;
                if (t instanceof jy) return e._state = 3, e._value = t, void Hy(e);
                if ("function" == typeof n) return void Gy((r = n, i = t, function() {
                    r.apply(i, arguments)
                }), e)
            }
            e._state = 1, e._value = t, Hy(e)
        } catch (t) {
            Fy(e, t)
        }
        var r, i
    }

    function Fy(e, t) {
        e._state = 2, e._value = t, Hy(e)
    }

    function Hy(e) {
        2 === e._state && 0 === e._deferreds.length && jy._immediateFn((function() {
            e._handled || jy._unhandledRejectionFn(e._value)
        }));
        for (var t = 0, n = e._deferreds.length; t < n; t++) Uy(e, e._deferreds[t]);
        e._deferreds = null
    }

    function Vy(e, t, n) {
        this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n
    }

    function Gy(e, t) {
        var n = !1;
        try {
            e((function(e) {
                n || (n = !0, By(t, e))
            }), (function(e) {
                n || (n = !0, Fy(t, e))
            }))
        } catch (e) {
            if (n) return;
            n = !0, Fy(t, e)
        }
    }
    jy.prototype.catch = function(e) {
        return this.then(null, e)
    }, jy.prototype.then = function(e, t) {
        var n = new this.constructor(xy);
        return Uy(this, new Vy(e, t, n)), n
    }, jy.prototype.finally = Cy, jy.all = function(e) {
        return new jy((function(t, n) {
            if (!Dy(e)) return n(new TypeError("Promise.all accepts an array"));
            var r = Array.prototype.slice.call(e);
            if (0 === r.length) return t([]);
            var i = r.length;

            function o(e, a) {
                try {
                    if (a && ("object" == typeof a || "function" == typeof a)) {
                        var c = a.then;
                        if ("function" == typeof c) return void c.call(a, (function(t) {
                            o(e, t)
                        }), n)
                    }
                    r[e] = a, 0 == --i && t(r)
                } catch (e) {
                    n(e)
                }
            }
            for (var a = 0; a < r.length; a++) o(a, r[a])
        }))
    }, jy.any = My, jy.allSettled = wy, jy.resolve = function(e) {
        return e && "object" == typeof e && e.constructor === jy ? e : new jy((function(t) {
            t(e)
        }))
    }, jy.reject = function(e) {
        return new jy((function(t, n) {
            n(e)
        }))
    }, jy.race = function(e) {
        return new jy((function(t, n) {
            if (!Dy(e)) return n(new TypeError("Promise.race accepts an array"));
            for (var r = 0, i = e.length; r < i; r++) jy.resolve(e[r]).then(t, n)
        }))
    }, jy._immediateFn = "function" == typeof setImmediate && function(e) {
        setImmediate(e)
    } || function(e) {
        Ly(e, 0)
    }, jy._unhandledRejectionFn = function(e) {
        "undefined" != typeof console && console
    };
    var Jy = function() {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof global) return global;
        throw new Error("unable to locate global object")
    }();
    "function" != typeof Jy.Promise ? Jy.Promise = jy : (Jy.Promise.prototype.finally || (Jy.Promise.prototype.finally = Cy), Jy.Promise.allSettled || (Jy.Promise.allSettled = wy), Jy.Promise.any || (Jy.Promise.any = My)),
        function() {
            if ("undefined" != typeof window) try {
                var e = new window.CustomEvent("test", {
                    cancelable: !0
                });
                if (e.preventDefault(), !0 !== e.defaultPrevented) throw new Error("Could not prevent default")
            } catch (e) {
                var t = function(e, t) {
                    var n, r;
                    return (t = t || {}).bubbles = !!t.bubbles, t.cancelable = !!t.cancelable, (n = document.createEvent("CustomEvent")).initCustomEvent(e, t.bubbles, t.cancelable, t.detail), r = n.preventDefault, n.preventDefault = function() {
                        r.call(this);
                        try {
                            Object.defineProperty(this, "defaultPrevented", {
                                get: function() {
                                    return !0
                                }
                            })
                        } catch (e) {
                            this.defaultPrevented = !0
                        }
                    }, n
                };
                t.prototype = window.Event.prototype, window.CustomEvent = t
            }
        }(),
        function() {
            if ("object" == typeof window)
                if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) "isIntersecting" in window.IntersectionObserverEntry.prototype || Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
                    get: function() {
                        return this.intersectionRatio > 0
                    }
                });
                else {
                    var e = window.document;
                    n.prototype.THROTTLE_TIMEOUT = 100, n.prototype.POLL_INTERVAL = null, n.prototype.USE_MUTATION_OBSERVER = !0, n.prototype.observe = function(e) {
                        if (!this._observationTargets.some((function(t) {
                                return t.element == e
                            }))) {
                            if (!e || 1 != e.nodeType) throw new Error("target must be an Element");
                            this._registerInstance(), this._observationTargets.push({
                                element: e,
                                entry: null
                            }), this._monitorIntersections(), this._checkForIntersections()
                        }
                    }, n.prototype.unobserve = function(e) {
                        this._observationTargets = this._observationTargets.filter((function(t) {
                            return t.element != e
                        })), this._observationTargets.length || (this._unmonitorIntersections(), this._unregisterInstance())
                    }, n.prototype.disconnect = function() {
                        this._observationTargets = [], this._unmonitorIntersections(), this._unregisterInstance()
                    }, n.prototype.takeRecords = function() {
                        var e = this._queuedEntries.slice();
                        return this._queuedEntries = [], e
                    }, n.prototype._initThresholds = function(e) {
                        var t = e || [0];
                        return Array.isArray(t) || (t = [t]), t.sort().filter((function(e, t, n) {
                            if ("number" != typeof e || isNaN(e) || e < 0 || e > 1) throw new Error("threshold must be a number between 0 and 1 inclusively");
                            return e !== n[t - 1]
                        }))
                    }, n.prototype._parseRootMargin = function(e) {
                        var t = (e || "0px").split(/\s+/).map((function(e) {
                            var t = /^(-?\d*\.?\d+)(px|%)$/.exec(e);
                            if (!t) throw new Error("rootMargin must be specified in pixels or percent");
                            return {
                                value: parseFloat(t[1]),
                                unit: t[2]
                            }
                        }));
                        return t[1] = t[1] || t[0], t[2] = t[2] || t[0], t[3] = t[3] || t[1], t
                    }, n.prototype._monitorIntersections = function() {
                        this._monitoringIntersections || (this._monitoringIntersections = !0, this.POLL_INTERVAL ? this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL) : (r(window, "resize", this._checkForIntersections, !0), r(e, "scroll", this._checkForIntersections, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in window && (this._domObserver = new MutationObserver(this._checkForIntersections), this._domObserver.observe(e, {
                            attributes: !0,
                            childList: !0,
                            characterData: !0,
                            subtree: !0
                        }))))
                    }, n.prototype._unmonitorIntersections = function() {
                        this._monitoringIntersections && (this._monitoringIntersections = !1, clearInterval(this._monitoringInterval), this._monitoringInterval = null, i(window, "resize", this._checkForIntersections, !0), i(e, "scroll", this._checkForIntersections, !0), this._domObserver && (this._domObserver.disconnect(), this._domObserver = null))
                    }, n.prototype._checkForIntersections = function() {
                        var e = this._rootIsInDom(),
                            n = e ? this._getRootRect() : {
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                width: 0,
                                height: 0
                            };
                        this._observationTargets.forEach((function(r) {
                            var i = r.element,
                                a = o(i),
                                c = this._rootContainsTarget(i),
                                s = r.entry,
                                u = e && c && this._computeTargetAndRootIntersection(i, n),
                                l = r.entry = new t({
                                    time: window.performance && performance.now && performance.now(),
                                    target: i,
                                    boundingClientRect: a,
                                    rootBounds: n,
                                    intersectionRect: u
                                });
                            s ? e && c ? this._hasCrossedThreshold(s, l) && this._queuedEntries.push(l) : s && s.isIntersecting && this._queuedEntries.push(l) : this._queuedEntries.push(l)
                        }), this), this._queuedEntries.length && this._callback(this.takeRecords(), this)
                    }, n.prototype._computeTargetAndRootIntersection = function(t, n) {
                        if ("none" != window.getComputedStyle(t).display) {
                            for (var r, i, a, s, u, l, f, d, h = o(t), p = c(t), v = !1; !v;) {
                                var _ = null,
                                    g = 1 == p.nodeType ? window.getComputedStyle(p) : {};
                                if ("none" == g.display) return;
                                if (p == this.root || p == e ? (v = !0, _ = n) : p != e.body && p != e.documentElement && "visible" != g.overflow && (_ = o(p)), _ && (r = _, i = h, a = void 0, s = void 0, u = void 0, l = void 0, f = void 0, d = void 0, a = Math.max(r.top, i.top), s = Math.min(r.bottom, i.bottom), u = Math.max(r.left, i.left), l = Math.min(r.right, i.right), d = s - a, !(h = (f = l - u) >= 0 && d >= 0 && {
                                        top: a,
                                        bottom: s,
                                        left: u,
                                        right: l,
                                        width: f,
                                        height: d
                                    }))) break;
                                p = c(p)
                            }
                            return h
                        }
                    }, n.prototype._getRootRect = function() {
                        var t;
                        if (this.root) t = o(this.root);
                        else {
                            var n = e.documentElement,
                                r = e.body;
                            t = {
                                top: 0,
                                left: 0,
                                right: n.clientWidth || r.clientWidth,
                                width: n.clientWidth || r.clientWidth,
                                bottom: n.clientHeight || r.clientHeight,
                                height: n.clientHeight || r.clientHeight
                            }
                        }
                        return this._expandRectByRootMargin(t)
                    }, n.prototype._expandRectByRootMargin = function(e) {
                        var t = this._rootMarginValues.map((function(t, n) {
                                return "px" == t.unit ? t.value : t.value * (n % 2 ? e.width : e.height) / 100
                            })),
                            n = {
                                top: e.top - t[0],
                                right: e.right + t[1],
                                bottom: e.bottom + t[2],
                                left: e.left - t[3]
                            };
                        return n.width = n.right - n.left, n.height = n.bottom - n.top, n
                    }, n.prototype._hasCrossedThreshold = function(e, t) {
                        var n = e && e.isIntersecting ? e.intersectionRatio || 0 : -1,
                            r = t.isIntersecting ? t.intersectionRatio || 0 : -1;
                        if (n !== r)
                            for (var i = 0; i < this.thresholds.length; i++) {
                                var o = this.thresholds[i];
                                if (o == n || o == r || o < n != o < r) return !0
                            }
                    }, n.prototype._rootIsInDom = function() {
                        return !this.root || a(e, this.root)
                    }, n.prototype._rootContainsTarget = function(t) {
                        return a(this.root || e, t)
                    }, n.prototype._registerInstance = function() {}, n.prototype._unregisterInstance = function() {}, window.IntersectionObserver = n, window.IntersectionObserverEntry = t
                }
            function t(e) {
                this.time = e.time, this.target = e.target, this.rootBounds = e.rootBounds, this.boundingClientRect = e.boundingClientRect, this.intersectionRect = e.intersectionRect || {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: 0,
                    height: 0
                }, this.isIntersecting = !!e.intersectionRect;
                var t = this.boundingClientRect,
                    n = t.width * t.height,
                    r = this.intersectionRect,
                    i = r.width * r.height;
                this.intersectionRatio = n ? Number((i / n).toFixed(4)) : this.isIntersecting ? 1 : 0
            }

            function n(e, t) {
                var n, r, i, o = t || {};
                if ("function" != typeof e) throw new Error("callback must be a function");
                if (o.root && 1 != o.root.nodeType) throw new Error("root must be an Element");
                this._checkForIntersections = (n = this._checkForIntersections.bind(this), r = this.THROTTLE_TIMEOUT, i = null, function() {
                    i || (i = setTimeout((function() {
                        n(), i = null
                    }), r))
                }), this._callback = e, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(o.rootMargin), this.thresholds = this._initThresholds(o.threshold), this.root = o.root || null, this.rootMargin = this._rootMarginValues.map((function(e) {
                    return e.value + e.unit
                })).join(" ")
            }

            function r(e, t, n, r) {
                "function" == typeof e.addEventListener ? e.addEventListener(t, n, r || !1) : "function" == typeof e.attachEvent && e.attachEvent("on" + t, n)
            }

            function i(e, t, n, r) {
                "function" == typeof e.removeEventListener ? e.removeEventListener(t, n, r || !1) : "function" == typeof e.detatchEvent && e.detatchEvent("on" + t, n)
            }

            function o(e) {
                var t;
                try {
                    t = e.getBoundingClientRect()
                } catch (e) {}
                return t ? (t.width && t.height || (t = {
                    top: t.top,
                    right: t.right,
                    bottom: t.bottom,
                    left: t.left,
                    width: t.right - t.left,
                    height: t.bottom - t.top
                }), t) : {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: 0,
                    height: 0
                }
            }

            function a(e, t) {
                for (var n = t; n;) {
                    if (n == e) return !0;
                    n = c(n)
                }
                return !1
            }

            function c(e) {
                var t = e.parentNode;
                return t && 11 == t.nodeType && t.host ? t.host : t && t.assignedSlot ? t.assignedSlot.parentNode : t
            }
        }();
    var Wy, Ky = ["", "webkit", "Moz", "MS", "ms", "o"],
        Yy = window,
        qy = void 0 !== function(e, t) {
            var n, r, i = t[0].toUpperCase() + t.slice(1),
                o = 0;
            for (; o < Ky.length;) {
                if ((r = (n = Ky[o]) ? n + i : t) in e) return e[r];
                o++
            }
            return
        }(Yy, "PointerEvent"),
        Xy = "ontouchstart" in Yy;
    ! function(e) {
        e[e.Default = 0] = "Default", e[e.Start = 1] = "Start", e[e.Move = 2] = "Move", e[e.End = 4] = "End", e[e.Cancle = 8] = "Cancle"
    }(Wy || (Wy = {}));
    var zy = {
        pointer: {
            events: ["pointerdown", "pointermove", "pointerup", "pointercancel"],
            handler: function(e) {
                var t = e.type,
                    n = {
                        status: Wy.Default,
                        timestamp: Date.now(),
                        position: [e.clientX, e.clientY]
                    };
                return t !== this.events[0] || 0 !== e.button && "touch" !== e.pointerType ? t === this.events[1] ? n.status = Wy.Move : t === this.events[2] ? n.status = Wy.End : t === this.events[3] && (n.status = Wy.Cancle) : n.status = Wy.Start, n
            }
        },
        touch: {
            events: ["touchstart", "touchmove", "touchend", "touchcancel"],
            handler: function(e) {
                var t = e.type;
                if (1 !== e.changedTouches.length) return null;
                var n = {
                    status: Wy.Default,
                    timestamp: Date.now(),
                    position: [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
                };
                return t === this.events[0] ? n.status = Wy.Start : t === this.events[1] ? n.status = Wy.Move : t === this.events[2] ? n.status = Wy.End : t === this.events[3] && (n.status = Wy.Cancle), n.status === Wy.Default ? null : n
            }
        },
        mouse: {
            events: ["mousedown", "mousemove", "mouseup"],
            handler: function(e) {
                var t = e.type,
                    n = {
                        status: Wy.Default,
                        timestamp: Date.now(),
                        position: [e.clientX, e.clientY]
                    };
                return t === this.events[0] && 0 === e.button ? n.status = Wy.Start : t === this.events[1] ? n.status = Wy.Move : t === this.events[2] && (n.status = Wy.End), n.status & Wy.Move && 1 !== e.which && (n.status = Wy.End), n.status === Wy.Default ? null : n
            }
        }
    };
    "MSPointerEvent" in Yy && !("PointerEvent" in Yy) && (zy.pointer.events = ["MSPointerDown", "MSPointerMove", "MSPointerUp", "MSPointerCancel"]);
    var Qy = 250,
        Zy = 9;

    function $y(e, t, n) {
        for (var r = 0; r < e.length; r++) document.addEventListener(e[r], t, n)
    }
    var em, tm, nm = function(e, t) {
        var n = function(t) {
            var n, r, i;
            return function(o) {
                var a = zy[t].handler(o);
                if (null !== a) {
                    if (a.status & Wy.Start) return n = Wy.Start, r = a.timestamp, void(i = a.position);
                    if (a.status & Wy.End) n & Wy.Start && a.timestamp - r < Qy && Math.sqrt(Math.pow(a.position[0] - i[0], 2) + Math.pow(a.position[1] - i[1], 2)) < Zy && e(o);
                    else if (a.status & Wy.Move && n & Wy.Start) return
                }
                n = 0, r = 0, i = [0, 0]
            }
        };
        qy ? $y(zy.pointer.events, n("pointer"), t) : Xy ? $y(zy.touch.events, n("touch"), t) : $y(zy.mouse.events, n("mouse"), t)
    };
    ! function(e) {
        e.V1 = "v1", e.V2 = "v2"
    }(em || (em = {})),
    function(e) {
        e.ELEMENT_V2 = "ELEMENT_V2", e.IMG_SRC = "IMG_SRC", e.TOKENIZE_TEXT = "TOKENIZE_TEXT", e.PAGE_URL_V2 = "PAGE_URL_V2"
    }(tm || (tm = {}));
    var rm = function(e, t, n) {
            var r = document.querySelectorAll(t);
            for (var i in r)
                if (n) {
                    if (Object.is(i, e)) return !0
                } else if (!Object.is(i, e)) return !0;
            return !1
        },
        im = function(e) {
            var t = document.createRange(),
                n = document.body ? document.body : document.head;
            t.selectNode(n);
            var r = t.createContextualFragment(e);
            n.appendChild(r)
        },
        om = function(e, t, n) {
            var r = function() {
                    var e = {},
                        t = new Promise((function(t, n) {
                            e.resolve = t, e.reject = n
                        }));
                    return e.promise = t, e
                }(),
                i = new IntersectionObserver((function(e) {
                    e.forEach((function(e) {
                        if (e.isIntersecting) {
                            var i = {
                                result: e.isIntersecting,
                                curValue: t,
                                condition: n
                            };
                            r.resolve(i)
                        }
                    }))
                }), {
                    root: null,
                    rootMargin: "0px",
                    threshold: .5
                });
            return i.observe(e), r.promise
        };

    function am(e, t) {
        var n = history[e],
            r = "".concat(e, "-").concat(t);
        return function() {
            n.apply(history, arguments);
            var e = new CustomEvent(r, {
                detail: arguments
            });
            window.dispatchEvent(e)
        }
    }
    var cm = function(e) {
            history.pushState = am("pushState", e), history.replaceState = am("replaceState", e)
        },
        sm = function(e, t) {
            var n = e.getComputedStyle(t);
            return "none" !== n.display && ("visible" === n.visibility && !(Number(n.opacity) < .1))
        },
        um = function(e) {
            var t = e;
            if ("string" == typeof e) try {
                t = decodeURI(e)
            } catch (n) {
                t = e
            }
            return t
        },
        lm = function(e, t) {
            try {
                var n = new URL(e);
                return n.searchParams.delete(t), n.toString()
            } catch (t) {
                return e
            }
        },
        fm = '"pixelMethod":"standard"',
        dm = function(e, t) {
            try {
                var n = e.split(fm),
                    r = "";
                return t && (r += ',"is_button":"true"'), r ? n[0] + fm + r + n[1] : e
            } catch (t) {
                return e
            }
        },
        hm = function(e) {
            try {
                var t = e.split(fm);
                return t[0] + fm + ',"is_standard_mode":"1"' + t[1]
            } catch (t) {
                return e
            }
        },
        pm = function(e, t) {
            try {
                var n = e.split(fm),
                    r = ',"eb_version":"' + t + '"';
                return n[0] + fm + r + n[1]
            } catch (t) {
                return e
            }
        },
        vm = /[\-!$><-==&_\/\?\.,0-9:; \]\[%~\"\{\}\)\(\+\@\^\`]/g,
        _m = /((([a-z])(?=[A-Z]))|(([A-Z])(?=[A-Z][a-z])))/g,
        gm = /\s+/g,
        ym = {
            TOKENIZE_TEXT: "rule_compute_tokenize_text_error",
            IMG_SRC: "rule_compute_img_src_error",
            ELEMENT_V2: "rule_compute_element_v2_xpath_error"
        },
        mm = {
            TOKENIZE_TEXT: Zi.EB_RULE_COMPUTE_TOKENIZE_TEXT,
            IMG_SRC: Zi.EB_RULE_COMPUTE_IMG_SRC,
            ELEMENT_V2: Zi.EB_RULE_COMPUTE_ELEMENT_XPATH
        },
        Em = function(e) {
            var t;
            return null === e ? null : (null === (t = e.innerText) || void 0 === t ? void 0 : t.length) > 0 ? function(e) {
                return e.replace(vm, " ").replace(_m, (function(e) {
                    return "".concat(e, " ")
                })).replace(gm, " ").toLowerCase().trim()
            }(e.innerText) : null
        },
        bm = function(e, t) {
            var n;
            return (null === (n = Em(e)) || void 0 === n ? void 0 : n.toLowerCase()) === t
        },
        Tm = function(e, t) {
            return function(e) {
                var t, n;
                if ("IMG" === e.tagName) return e.getAttribute("src") || "";
                if (window.getComputedStyle) {
                    var r = window.getComputedStyle(e).getPropertyValue("background-image");
                    if (null !== r && "none" !== r && r.length > 0) return r
                }
                return "INPUT" === e.tagName && e.getAttribute("src") || (null === (n = null === (t = e.getElementsByTagName("img")) || void 0 === t ? void 0 : t[0]) || void 0 === n ? void 0 : n.getAttribute("src")) || null
            }(e) === t
        },
        Im = function(e, t) {
            var n;
            return !!(null === (n = null == e ? void 0 : e.matches) || void 0 === n ? void 0 : n.call(e, t))
        },
        Om = function(e, t, n, r, i) {
            var o = null,
                a = !1,
                c = null;
            r && (o = mm[t]) && ao(o);
            var s = null;
            switch (t) {
                case "TOKENIZE_TEXT":
                    s = bm;
                    break;
                case "IMG_SRC":
                    s = Tm;
                    break;
                case "ELEMENT_V2":
                    s = Im
            }
            for (var u = 0; u < 5 && !["HTML", "BODY"].includes(null == e ? void 0 : e.tagName); u++) {
                if ((null == e ? void 0 : e.matches("input[type='button'], input[type='image'], input[type='submit'], button, [class*=btn], [class*=Btn], [class*=button], [class*=Button], [role*=button], [href^='tel: '], [href^='callto: '], [href^='mailto: '], [href^='sms: '], [href^='skype: '], [href^='whatsapp: '], [id*=btn], [id*=Btn], [id*=button], [id*=Button], a")) && (null == s ? void 0 : s(e, n))) {
                    a = !0, c = e;
                    break
                }
                e = e.parentElement
            }
            return r && o && co(o), i ? c : a
        };
    String.prototype.startsWith || Object.defineProperty(String.prototype, "startsWith", {
        value: function(e, t) {
            return t = !t || t < 0 ? 0 : +t, this.substring(t, t + e.length) === e
        }
    }), String.prototype.endsWith || (String.prototype.endsWith = function(e, t) {
        return (void 0 === t || t > this.length) && (t = this.length), this.substring(t - e.length, t) === e
    });
    var Sm = function(e, t, n, r) {
            switch (t) {
                case "EQUALS":
                    if ([tm.TOKENIZE_TEXT, tm.IMG_SRC, tm.ELEMENT_V2].includes(r)) try {
                        return Om(e, r, n, !0, !1)
                    } catch (e) {
                        return wi(Sr.CUSTOM_ERROR, e, {
                            custom_name: "eb_jelly_error",
                            custom_enum: ym[r]
                        }), !1
                    } else if ("ELEMENT" == r) try {
                        for (var i = document.querySelectorAll(n), o = Array.prototype.slice.call(i), a = 0; a < o.length; a++)
                            if (o[a].contains(e)) return !0
                    } catch (e) {
                        return wi(Sr.CUSTOM_ERROR, e, {
                            custom_name: "eb_jelly_error",
                            custom_enum: "rule_compute_element_xpath_error"
                        }), !1
                    }
                    if (n.split(";").filter((function(t) {
                            return e == t
                        })).length > 0) return !0;
                    break;
                case "LT":
                    if (e < n) return !0;
                    break;
                case "GT":
                    if (e > n) return !0;
                    break;
                case "LT_OR_EQUAL":
                    if (e <= n) return !0;
                    break;
                case "GT_OR_EQUAL":
                    if (e >= n) return !0;
                    break;
                case "CONTAINS":
                    if (n.split(";").filter((function(t) {
                            return (null == t ? void 0 : t.length) > 0 && e.indexOf(t) > -1
                        })).length > 0) return !0;
                    break;
                case "DOES_NOT_EQUAL":
                    if (0 == n.split(";").filter((function(t) {
                            return e == t
                        })).length) return !0;
                    break;
                case "DOES_NOT_CONTAIN":
                    if (-1 == e.indexOf(n)) return !0;
                    break;
                case "STARTS_WITH":
                    if (e.startsWith(n)) return !0;
                    break;
                case "ENDS_WITH":
                    if (e.endsWith(n)) return !0;
                    break;
                case "MATCHES_REGEX":
                    if (n.test(e)) return !0;
                    break;
                case "MATCHES_REGEX_IGNORE_CASE":
                    if (!n.test(e)) return !0;
                    break;
                case "MATCHES_CSS_SELECTOR":
                    if (rm(e, n, !0)) return !0;
                    break;
                case "DOSE_NOT_MATCHES_CSS_SELECTOR":
                    if (rm(e, n, !1)) return !0
            }
            return !1
        },
        Nm = {
            click: ["ELEMENT", "TOKENIZE_TEXT", "IMG_SRC", "ELEMENT_V2", "ELEMENT_CLASSES", "ELEMENT_ID", "ELEMENT_TARGET", "ElEMENT_URL", "ELEMENT_TEXT"],
            pageview: ["PAGE_URL", "PAGE_URL_V2", "PAGE_HOSTNAME", "PAGE_PATH", "REFERRER"],
            visibility: ["ELEMENT", "ELEMENT_CLASSES", "ELEMENT_ID"],
            history_change: ["NEW_HISTORY_FRAGMENT", "OLD_HISTORY_FRAGMENT", "NEW_HISTORY_STATE", "OLD_HISTORY_STATE", "HISTORY_SOURCE"]
        },
        Rm = "ttclid",
        Am = function() {
            function e() {
                i(this, e)
            }
            return a(e, [{
                key: "dispatcher",
                value: function(e, t, n, r) {
                    var i, o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : document,
                        a = t.variable_type,
                        c = O("visibility" == e ? ["pageview", "history_change", "visibility"] : ["pageview", "history_change", "click"]);
                    try {
                        for (c.s(); !(i = c.n()).done;) {
                            var s = i.value;
                            if (Nm[s].indexOf(a) > -1) {
                                var u = void 0;
                                switch (s) {
                                    case "click":
                                        u = this.click(a, n);
                                        break;
                                    case "pageview":
                                        u = this.pageview(a);
                                        break;
                                    case "history_change":
                                        u = this.history_change(a, n, r);
                                        break;
                                    case "visibility":
                                        u = this.visibility(a, t.value, o)
                                }
                                return u
                            }
                        }
                    } catch (e) {
                        c.e(e)
                    } finally {
                        c.f()
                    }
                }
            }, {
                key: "click",
                value: function(e, t) {
                    var n;
                    if (!t) return !1;
                    switch (e) {
                        case "ELEMENT":
                        case "ELEMENT_V2":
                        case "TOKENIZE_TEXT":
                        case "IMG_SRC":
                        case "ELEMENT_TARGET":
                            n = t.target;
                            break;
                        case "ELEMENT_CLASSES":
                            n = t.target.className;
                            break;
                        case "ELEMENT_ID":
                            n = t.target.id;
                            break;
                        case "ElEMENT_URL":
                            n = t.target.href || t.target.src || "";
                            break;
                        case "ELEMENT_TEXT":
                            n = t.target.text || "";
                            break;
                        default:
                            n = null
                    }
                    return n
                }
            }, {
                key: "pageview",
                value: function(e) {
                    var t;
                    switch (e) {
                        case "PAGE_URL":
                        case "PAGE_URL_V2":
                            t = lm(location.href, Rm);
                            break;
                        case "PAGE_HOSTNAME":
                            t = location.hostname;
                            break;
                        case "PAGE_PATH":
                            t = location.pathname;
                            break;
                        case "REFERRER":
                            t = lm(document.referrer, Rm);
                            break;
                        default:
                            t = null
                    }
                    return t
                }
            }, {
                key: "history_change",
                value: function(e, t, n) {
                    var r;
                    switch (e) {
                        case "NEW_HISTORY_FRAGMENT":
                            r = location.hash;
                            break;
                        case "OLD_HISTORY_FRAGMENT":
                            r = n.old_hash;
                            break;
                        case "NEW_HISTORY_STATE":
                            r = history.state;
                            break;
                        case "OLD_HISTORY_STATE":
                            r = n.old_state;
                            break;
                        case "HISTORY_SOURCE":
                            r = t.type;
                            break;
                        default:
                            r = null
                    }
                    return r
                }
            }, {
                key: "visibility",
                value: function(e, t) {
                    var n, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document;
                    switch (e) {
                        case "ELEMENT_ID":
                            n = "#" + t;
                            break;
                        case "ELEMENT_CLASS":
                            n = "." + t;
                            break;
                        case "ELEMENT":
                            n = t;
                            break;
                        default:
                            n = null
                    }
                    return r.querySelector(n)
                }
            }]), e
        }(),
        Pm = {
            exports: {}
        };
    ! function(e) {
        function t(e) {
            if (e) return function(e) {
                for (var n in t.prototype) e[n] = t.prototype[n];
                return e
            }(e)
        }
        e.exports = t, t.prototype.on = t.prototype.addEventListener = function(e, t) {
            return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
        }, t.prototype.once = function(e, t) {
            function n() {
                this.off(e, n), t.apply(this, arguments)
            }
            return n.fn = t, this.on(e, n), this
        }, t.prototype.off = t.prototype.removeListener = t.prototype.removeAllListeners = t.prototype.removeEventListener = function(e, t) {
            if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
            var n, r = this._callbacks["$" + e];
            if (!r) return this;
            if (1 == arguments.length) return delete this._callbacks["$" + e], this;
            for (var i = 0; i < r.length; i++)
                if ((n = r[i]) === t || n.fn === t) {
                    r.splice(i, 1);
                    break
                }
            return 0 === r.length && delete this._callbacks["$" + e], this
        }, t.prototype.emit = function(e) {
            this._callbacks = this._callbacks || {};
            for (var t = new Array(arguments.length - 1), n = this._callbacks["$" + e], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
            if (n) {
                r = 0;
                for (var i = (n = n.slice(0)).length; r < i; ++r) n[r].apply(this, t)
            }
            return this
        }, t.prototype.listeners = function(e) {
            return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
        }, t.prototype.hasListeners = function(e) {
            return !!this.listeners(e).length
        }
    }(Pm);
    var Cm, wm, km = Pm.exports,
        Mm = function(e) {
            s(n, e);
            var t = h(n);

            function n(e, r) {
                var o;
                return i(this, n), (o = t.call(this)).BaseConf = e, o.SDK_ID = r, o.BaseConf.forEach((function(e) {
                    e.id = e.code_id, e.conditions = e.conditions || [], e.conditions.forEach((function(e) {
                        e.result = !1
                    }))
                })), o
            }
            return a(n, [{
                key: "sendDebugEvent",
                value: function(e, t, n) {
                    var r = this.BaseConf,
                        i = [];
                    r.forEach((function(e) {
                        e.code_id == t && (e.conditions = n), i.push(e)
                    }));
                    var o = {
                        sdk_id: this.SDK_ID,
                        event_name: e,
                        data: i
                    };
                    this.emit("jelly_message", o)
                }
            }]), n
        }(km);
    ! function(e) {
        e[e.WRONG = -1] = "WRONG", e[e.KEEP = 0] = "KEEP", e[e.ARRAY = -2] = "ARRAY", e[e.TURNINTOINTEGER = 1] = "TURNINTOINTEGER", e[e.TURNINTODECIMAL = 2] = "TURNINTODECIMAL"
    }(Cm || (Cm = {})),
    function(e) {
        e[e.CLICK_EVENT = 0] = "CLICK_EVENT", e[e.DESTINATION_URL = 1] = "DESTINATION_URL"
    }(wm || (wm = {}));
    var Lm, Dm = function(e) {
            var t, n = {};
            try {
                if (ao(Zi.EB_PARAMETER_V1), e.currency && (n.currency = e.currency), e.value) {
                    document.querySelectorAll(e.value).length;
                    var r = document.querySelector(e.value);
                    (null == r ? void 0 : r.innerHTML) && (n.ori_value = r.innerHTML, n.value = xm(null === (t = r.innerHTML) || void 0 === t ? void 0 : t.trim(), e.value_index, e.value_parsing_method))
                }
                if (e.contents && void 0 !== e.contents[0].content_type && (1 === e.contents[0].content_type && (n.content_type = "product"), 2 === e.contents[0].content_type && (n.content_type = "product_group")), e.contents && e.contents[0].content_name) {
                    var i = document.querySelector(e.contents[0].content_name);
                    n.content_name = null == i ? void 0 : i.innerHTML
                }
                if (e.contents && e.contents[0].content_id)
                    if (e.contents[0].content_from === wm.CLICK_EVENT) {
                        var o = document.querySelector(e.contents[0].content_id);
                        n.content_id = null == o ? void 0 : o.innerHTML
                    } else if (e.contents[0].content_from === wm.DESTINATION_URL) {
                    var a = new URL(location.href);
                    if (e.contents[0].content_id.startsWith("path")) {
                        var c = a.pathname.split("/"),
                            s = e.contents[0].content_id.split("|")[1];
                        n.content_id = c[s]
                    }
                    if (e.contents[0].content_id.startsWith("search")) {
                        var u = new URLSearchParams(a.search),
                            l = e.contents[0].content_id.split("|")[1];
                        n.content_id = u.get(l)
                    }
                }
                return co(Zi.EB_PARAMETER_V1), n
            } catch (e) {
                return co(Zi.EB_PARAMETER_V1), wi(Sr.CUSTOM_ERROR, e, {
                    custom_name: "eb_jelly_error",
                    custom_enum: "dynamicParameter_v1_error"
                }), n
            }
        },
        xm = function(e, t, n) {
            var r = "";
            if (-1 === t || void 0 === t) {
                var i = Um(e)[0];
                r = void 0 !== i ? jm(i, n) : ""
            } else {
                var o = Um(e)[t];
                r = void 0 !== o ? jm(o, n) : ""
            }
            return r
        },
        jm = function(e, t) {
            var n = "";
            if (t !== Cm.KEEP && t !== Cm.WRONG || (n = e), t === Cm.TURNINTOINTEGER && (n = e.replace(/[,\.]/g, "")), t === Cm.TURNINTODECIMAL) {
                var r = e.split(/[,\.]/g),
                    i = "";
                r.forEach((function(e, t) {
                    t < r.length - 1 ? i += e : i += "." + e
                })), n = i
            }
            return n
        },
        Um = function(e) {
            for (var t, n = /[\d|\.|,]+/gm, r = []; null !== (t = n.exec(e));) t.index === n.lastIndex && n.lastIndex++, t.forEach((function(e) {
                r.push(e)
            }));
            return r
        },
        Bm = function(e, t, n) {
            try {
                var r = e.split(fm),
                    i = "";
                return Object.keys(t).forEach((function(e) {
                    null === t[e] && void 0 === t[e] || (i += ',"' + e + '":"' + ("value" !== e ? encodeURIComponent(t[e]) : t[e]) + '"')
                })), n && (i += ',"dynamic_parameter_config":' + JSON.stringify(n)), i ? r[0] + fm + i + r[1] : e
            } catch (t) {
                return wi(Sr.CUSTOM_ERROR, t, {
                    custom_name: "eb_jelly_error",
                    custom_enum: "dynamicParameter_v1_transform_code_error"
                }), e
            }
        },
        Fm = function(e, t) {
            var n, r;
            if (!e || "" === e) return null;
            var i, o = null === (n = e.match(/closest\$([^$]+)\$/)) || void 0 === n ? void 0 : n[1],
                a = null === (r = e.match(/children\$([^$]+)\$/)) || void 0 === r ? void 0 : r[1];
            if (t && o && a) {
                Element.prototype.closest || (Element.prototype.closest = function(e) {
                    var t = this;
                    if (!document.contains(t)) return null;
                    do {
                        if (t.matches(e)) return t;
                        t = t.parentElement || t.parentNode
                    } while (null !== t && 1 === t.nodeType);
                    return null
                });
                var c = t.closest(o);
                i = null == c ? void 0 : c.querySelector(a)
            } else i = t && a ? t.querySelector(a) : document.querySelector(e);
            return i
        },
        Hm = function(e, t) {
            var n, r = {};
            try {
                if (ao(Zi.EB_PARAMETER_V2), e.currency && (r.currency = e.currency), e.value) {
                    var i = Fm(e.value, t);
                    (null == i ? void 0 : i.innerHTML) && (r.ori_value = i.innerHTML, r.value = xm(null === (n = i.innerHTML) || void 0 === n ? void 0 : n.trim(), e.value_index, e.value_parsing_method)), r.value || Ci(Sr.CUSTOM_INFO, {
                        custom_name: "eb_jelly_info",
                        custom_enum: "dynamic_parameter_v2_value_empty",
                        extJSON: {
                            selector: e.value
                        }
                    })
                }
                return e.contents && e.contents.length > 0 && (r.contents = [], function(e, t, n) {
                    e.map((function(e) {
                        var r = e.content_type,
                            i = e.content_id,
                            o = e.content_from,
                            a = {};
                        if (r && (1 === r ? a.content_type = "product" : 2 === r && (a.content_type = "product_group")), i) {
                            if (o === wm.CLICK_EVENT) {
                                var c = Fm(i, n);
                                (null == c ? void 0 : c.innerText) && (a.content_id = null == c ? void 0 : c.innerText)
                            } else if (o === wm.DESTINATION_URL) {
                                var s = new URL(location.href);
                                if (i.startsWith("path")) {
                                    var u = s.pathname.split("/"),
                                        l = i.split("|")[1];
                                    a.content_id = u[l]
                                }
                                if (i.startsWith("search")) {
                                    var f = new URLSearchParams(s.search),
                                        d = i.split("|")[1];
                                    a.content_id = f.get(d) || void 0
                                }
                            }
                            a.content_id || Ci(Sr.CUSTOM_INFO, {
                                custom_name: "eb_jelly_info",
                                custom_enum: "dynamic_parameter_v2_content_id_empty",
                                extJSON: {
                                    selector: i
                                }
                            })
                        }
                        o && (a.content_from = o), t.push(a)
                    }))
                }(e.contents, r.contents, t)), co(Zi.EB_PARAMETER_V2), r
            } catch (e) {
                return co(Zi.EB_PARAMETER_V2), wi(Sr.CUSTOM_ERROR, e, {
                    custom_name: "eb_jelly_error",
                    custom_enum: "dynamicParameter_v2_error"
                }), r
            }
        },
        Vm = function(e, t, n) {
            try {
                var r = e.split(fm),
                    i = "";
                return Object.keys(t).forEach((function(e) {
                    if (null !== t[e] || void 0 !== t[e])
                        if ("contents" === e) {
                            var n = t[e];
                            i += ',"' + e + '":[', null == n || n.map((function(e, t) {
                                i += "{";
                                var r = Object.keys(e);
                                r.forEach((function(t, n) {
                                    "content_id" === t && e[t] && (e[t] = encodeURIComponent(e[t])), i += '"' + t + '":"' + e[t] + '"' + (n === (null == r ? void 0 : r.length) - 1 ? "" : ",")
                                })), i += "}" + (t === (null == n ? void 0 : n.length) - 1 ? "" : ",")
                            })), i += "]"
                        } else i += ',"' + e + '":"' + ("value" !== e ? encodeURIComponent(t[e]) : t[e]) + '"'
                })), n && (i += ',"dynamic_parameter_config":' + JSON.stringify(n)), i ? r[0] + fm + i + r[1] : e
            } catch (t) {
                return wi(Sr.CUSTOM_ERROR, t, {
                    custom_name: "eb_jelly_error",
                    custom_enum: "dynamicParameter_v2_transform_error"
                }), e
            }
        },
        Gm = new Am,
        Jm = function(e) {
            s(n, e);
            var t = h(n);

            function n(e, r, o, a) {
                var c;
                return i(this, n), (c = t.call(this)).on("jelly_message", a), c.SendEvent = new Mm(r, o), c.SendEvent.on("jelly_message", (function(e) {
                    c.emit("jelly_message", e)
                })), c.CLICK = e.CLICK || [], c.PAGEVIEW = e.PAGEVIEW || [], c.VISIBILITY = e.VISIBILITY || [], c.HISTORY_CHANGE = e.HISTORY_CHANGE || [], c.SDK_ID = o || "", c.click(), c.pageview(), c.visibility(), c
            }
            return a(n, [{
                key: "dispatcher",
                value: function(e, t, n, r) {
                    if (t) {
                        var i, o, a = O(t);
                        try {
                            for (a.s(); !(i = a.n()).done;) {
                                var c, s = i.value,
                                    u = [],
                                    l = O(s.conditions);
                                try {
                                    for (l.s(); !(c = l.n()).done;) {
                                        var f = c.value,
                                            d = Gm.dispatcher(e, f, n, r),
                                            h = Sm(d, f.operator, f.value, f.variable_type);
                                        if ("history_change" !== e && "pageview" !== e || (h = h || Sm(um(d), f.operator, f.value, f.variable_type)), h) {
                                            var p = !1,
                                                v = (o = f.variable_type, Object.values(tm).includes(o) ? em.V2 : em.V1);
                                            try {
                                                p = ["ELEMENT", tm.TOKENIZE_TEXT, tm.IMG_SRC, tm.ELEMENT_V2].includes(f.variable_type) && si(d)
                                            } catch (e) {
                                                p = !1, wi(Sr.CUSTOM_ERROR, e, {
                                                    custom_name: "button_check_jelly_error",
                                                    custom_enum: "auto_click",
                                                    extJSON: {
                                                        element: d
                                                    }
                                                })
                                            }
                                            var _ = dm(s.code, p);
                                            if (_ = hm(_), _ = pm(_, v), f.dynamic_parameter) try {
                                                var g = void 0,
                                                    y = void 0;
                                                switch (f.variable_type) {
                                                    case tm.PAGE_URL_V2:
                                                        g = Hm(f.dynamic_parameter, null), y = Vm(_, g, f.dynamic_parameter);
                                                        break;
                                                    case tm.ELEMENT_V2:
                                                    case tm.TOKENIZE_TEXT:
                                                    case tm.IMG_SRC:
                                                        var m = Om(d, f.variable_type, f.value, !1, !0);
                                                        g = Hm(f.dynamic_parameter, m), y = Vm(_, g, f.dynamic_parameter);
                                                        break;
                                                    default:
                                                        g = Dm(f.dynamic_parameter), y = Bm(_, g, f.dynamic_parameter)
                                                }
                                                im(y)
                                            } catch (e) {
                                                e(Sr.CUSTOM_ERROR, e, {
                                                    custom_name: "eb_jelly_error",
                                                    custom_enum: "dynamic_parameter_code_concat"
                                                }), im(_)
                                            } else im(_);
                                            this.SendEvent.sendDebugEvent("jelly." + e, s.code_id, u)
                                        }
                                        u.push(Object.assign(f, {
                                            cur_value: d,
                                            result: h
                                        }))
                                    }
                                } catch (e) {
                                    l.e(e)
                                } finally {
                                    l.f()
                                }
                            }
                        } catch (e) {
                            a.e(e)
                        } finally {
                            a.f()
                        }
                    }
                }
            }, {
                key: "click",
                value: function() {
                    var e = this;
                    nm((function(t) {
                        e.dispatcher("click", e.CLICK, t)
                    }), !0)
                }
            }, {
                key: "pageview",
                value: function() {
                    this.dispatcher("pageview", this.PAGEVIEW), this.history_change(this.PAGEVIEW)
                }
            }, {
                key: "history_change",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.HISTORY_CHANGE,
                        t = this,
                        n = history.state,
                        r = location.hash,
                        i = location.href;
                    cm(this.SDK_ID), window.addEventListener("pushState-".concat(this.SDK_ID), (function(r) {
                        if (location.href != i) {
                            var o = {
                                old_state: n
                            };
                            t.dispatcher("history_change", e, r, o), n = history.state, i = location.href
                        }
                    })), window.addEventListener("replaceState-".concat(this.SDK_ID), (function() {
                        if (location.href != i) {
                            var r = {
                                old_state: n
                            };
                            t.dispatcher("history_change", e, r), n = history.state, i = location.href
                        }
                    })), window.addEventListener("popstate", (function(n) {
                        if (location.href != i) {
                            var o = {
                                old_hash: r
                            };
                            t.dispatcher("history_change", e, n, o), r = location.hash, i = location.href
                        }
                    }))
                }
            }, {
                key: "visibility",
                value: function() {
                    if (!(this.VISIBILITY.length < 1)) {
                        var e = this.VISIBILITY,
                            t = this.SendEvent.sendDebugEvent.bind(this.SendEvent);
                        new MutationObserver(Wm(e, t, window)).observe(document, {
                            childList: !0,
                            characterData: !0,
                            subtree: !0,
                            attributes: !0
                        });
                        for (var n = document.getElementsByTagName("iframe"), r = 0; r < n.length; r++) try {
                            var i = n[r].contentWindow;
                            if (null != i) new MutationObserver(Wm(e, t, i)).observe(i.document, {
                                childList: !0,
                                characterData: !0,
                                subtree: !0,
                                attributes: !0
                            })
                        } catch (e) {}
                    }
                }
            }]), n
        }(km),
        Wm = function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window,
                r = {};
            return function() {
                e.forEach((function(e) {
                    var i = !0,
                        o = [],
                        a = [];
                    e.conditions.forEach((function(e) {
                        if (Nm.visibility.indexOf(e.variable_type) > -1) {
                            var t = Gm.dispatcher("visibility", e, null, null, n.document),
                                c = "_" + e.value;
                            t && sm(n, t) && !r[c] && (o.push(om(t, "", e)), r[c] = !0)
                        } else {
                            var s = Gm.dispatcher("visibility", e),
                                u = Sm(s, e.operator, e.value, e.variable_type);
                            u || (i = !1), a.push(Object.assign(e, {
                                cur_value: s,
                                result: u
                            }))
                        }
                    })), o.length > 0 && Promise.all(o).then((function(n) {
                        var r, o = !0,
                            c = O(n);
                        try {
                            for (c.s(); !(r = c.n()).done;) {
                                var s = r.value;
                                a.push(Object.assign(s.condition, {
                                    cur_value: s.curValue,
                                    result: s.result
                                })), s.result && i || (o = !1)
                            }
                        } catch (e) {
                            c.e(e)
                        } finally {
                            c.f()
                        }
                        o && im(e.code), t("jelly.visibility", e.code_id, a)
                    }), (function() {}))
                }))
            }
        },
        Km = function(e) {
            s(n, e);
            var t = h(n);

            function n(e, r) {
                var o;
                if (i(this, n), (o = t.call(this)).BaseConf = r, o.SDK_ID = e, window.jelly_tool_events && window.jelly_tool_events.length && window.jelly_tool_events.forEach((function(e) {
                        o.on(e.name, e.callback)
                    })), o.emit("jelly_event", {
                        SDK_ID: e,
                        BaseConf: r || []
                    }), o.BaseConf instanceof Array) {
                    if (self._jelly_sdks = self._jelly_sdks || {}, self._jelly_sdks[e]) return d(o);
                    self._jelly_sdks[e] = !0;
                    var a = o.dispatch();
                    o.trigger = new Jm(a, r, e, (function(e) {
                        o.emit("jelly_message", e)
                    }))
                }
                return o
            }
            return a(n, [{
                key: "dispatch",
                value: function() {
                    var e = {
                        CLICK: [],
                        PAGEVIEW: [],
                        VISIBILITY: [],
                        HISTORY_CHANGE: []
                    };
                    return this.BaseConf.forEach((function(t) {
                        var n = {
                            code_id: t.code_id,
                            code: t.code,
                            conditions: t.conditions || []
                        };
                        void 0 !== t.trigger_type && e[t.trigger_type] && e[t.trigger_type].push(n)
                    })), e
                }
            }]), n
        }(km);
    window.TiktokJelly = Km;
    var Ym = Jr();
    try {
        ! function() {
            var e = Mi().pixelCode,
                t = Wr(),
                n = vi(),
                r = _i();
            if (function(e, t, n) {
                    kl(e, n), ko(t, e), Dl(), Ml(e), Ll(), Ju(t, e)
                }(t, Nl, n), zr("Monitor")) {
                var i = function() {
                    try {
                        return Nl.get(Or.MONITOR_PLUGIN) || null
                    } catch (e) {
                        return null
                    }
                }();
                null == i || i.info(Sr.BEFORE_INIT, {
                    pixelCode: e,
                    extJSON: {
                        stack: di(e)
                    }
                })
            }
            if (t) {
                t._mounted ? (Ci(Sr.HANDLE_CACHE, {
                    pixelCode: e
                }), Lo(Nl, t)) : (Lm = function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : cr.OFFSITE;
                    return Co(e, Or.ENV, t), Co(e, br.SignalType, n), e.get(Or.TTQ)
                }(Nl, n, r), window[Ym] = function(e, t) {
                    return ["getReporter", "usePlugin", "getPlugin", "resetCookieExpires"].forEach((function(n) {
                        e[n] = function() {
                            for (var e = arguments.length, r = new Array(e), i = 0; i < e; i++) r[i] = arguments[i];
                            return t[n].apply(t, r)
                        }
                    })), e.context = t.context, e.reporters = t.reporters, e
                }(t, Lm), t.resetCookieExpires && t.resetCookieExpires(), Lo(Nl, Lm), Mo(Lm));
                var o = Nl.get(br.IsOnsitePage);
                o.value = r === cr.ONSITE || t.reporters.every((function(e) {
                        return e.isOnsite()
                    })), Nl.rebind(br.IsOnsitePage).toConstantValue(o),
                    function(e) {
                        e.reporters.forEach((function(e) {
                            e.rules && new Km(e.getReporterId(), e.rules)
                        }))
                    }(t)
            }
        }()
    } catch (Fs) {
        wi(Sr.INIT_ERROR, Fs)
    }
}();