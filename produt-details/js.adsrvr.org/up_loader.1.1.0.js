! function() {
    "use strict";
    let c = null;
    const l = ["debug", "info", "warn", "error"];
    let s = l.reduce((e, d, a) => (e[d] = function() {
        var e = "debug" === d ? "log" : d;
        if (c && console && "function" == typeof console[e]) {
            var t = l.indexOf(c.toString().toLocaleLowerCase());
            if (!0 === c || -1 < t && t <= a) {
                for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++) i[o] = arguments[o];
                const [a, ...r] = [...i];
                console[e](d.toUpperCase() + " - (TTD) " + a, ...r)
            }
        }
    }, e), {});

    function e(e) {
        c = e
    }
    let f = null,
        o = {},
        p = {},
        v = {},
        m = {};

    function t(e) {
        var t = e[0],
            e = e[1];
        if ("setIdentifier" !== t) throw "method not implemented";
        i(e)
    }

    function r(e, t) {
        n(t),
            function t(e, n) {
                let i = f.detectionEventType;
                let o = h(e, n, f.triggerElements);
                let r = [];
                let d = h(e, n, f.cssSelectors);
                p[n] = p[n] || [];
                m[n] = m[n] || [];
                v[n] = v[n] || [];
                for (var a of d) a && a.tagName && "INPUT" === a.tagName && m[n].push(a);
                s.debug(`triggers ["${n}"] `, o);
                s.debug(`validInputs ["${n}"] `, d);
                o.forEach(e => {
                    p[n].push(e), r.push(e[i]), v[n].push(e[i])
                });
                for (let n = 0; n < o.length; n++) o[n][i] = function() {
                    try {
                        s.debug("Detect event: ", i, "on element, ", o[n]);
                        let e = Object.entries(m).map(e => e[1]).flatMap(e => e);
                        for (var t of e) {
                            let e = t.value.trim();
                            if (w(e)) {
                                s.debug("We detected: ", e), g();
                                break
                            }
                        }
                    } catch (e) {}
                    r[n] && r[n](...arguments)
                };
                let c = _(e);
                for (let e = 0; e < c.length; e++) {
                    const l = c[e],
                        u = n + "/shadow_root_" + e;
                    t(l, u), y(l, u)
                }
            }(e, t)
    }

    function g() {
        if (s.debug("Detection stopped."), f.detectDynamicNodes) {
            s.debug("Checking for dynamically added elements is turned off.");
            for (var [e, t] of Object.entries(o)) t && t.disconnect(), o = {}
        }
        n("all")
    }

    function n(e) {
        if (s.debug(`clearing detection hooks (${e})`), "all" === e) {
            for (var [t, n] of Object.entries(p))
                if (n)
                    for (let e = 0; e < n.length; e++) n[e][f.detectionEventType] = v[t][e];
            p = {}, v = {}
        } else {
            var i, o, r = [];
            for ([i, o] of Object.entries(p))
                if (i.startsWith(e)) {
                    var d = v[i];
                    if (o)
                        for (let e = 0; e < o.length; e++) o[e][f.detectionEventType] = d[e];
                    r.push(i)
                }
            for (let e = 0; e < r.length; e++) {
                var a = r[e];
                p[a] = [], v[a] = []
            }
        }
    }

    function w(e) {
        return function(e) {
            var t = /((([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,}))/i;
            if (f.detectionSubject.includes("email") && t.test(e)) return e = e.match(t)[0].toLowerCase().trim(), s.debug("We detected email: " + e), d(e, "email"), !0;
            return !1
        }(e) || !1
    }

    function y(n, i) {
        f.detectDynamicNodes && new MutationObserver(function(e, t) {
            s.debug("Detected dynamically added nodes."), o[i] = t, r(n, i)
        }).observe(n, {
            childList: !0,
            subtree: !0,
            attributes: !0
        })
    }

    function i(e) {
        e && e.type && e.identifier ? "email" !== e.type ? s.error("Identifier type is not supported, ", e.type) : (d(e.identifier, e.type), g()) : s.error("wrong identifier format")
    }

    function d(e, t) {
        var n;
        e && t && (n = new CustomEvent("detected-identifier", {
            detail: {
                identifier: e,
                type: t
            }
        }), s.info("Dispatched event with identifier: ", e, " and type: ", t), window.dispatchEvent(n))
    }

    function u(e) {
        if (e && e.__upixel_detection) try {
            r(e.__upixel_detection.root, e.__upixel_detection.scopeName)
        } catch (e) {}
    }

    function h(t, n, i) {
        s.debug(`collectElements("${n}", ${i})`);
        let o = [];
        for (var e of i) 0 < e.length && (e = t.querySelectorAll(e)) && e.forEach(e => {
            o.includes(e) || o.push(e)
        });
        var r = window.location.hostname,
            d = document.getElementsByTagName("iframe");
        for (let e = 0; e < d.length; e++) {
            var a = d[e];
            if (function(e, t) {
                    if (t.src) try {
                        var n = e === new URL(t.src).hostname;
                        return n && s.debug("Iframe " + t.src + " can be accessed"), n
                    } catch (e) {
                        s.debug("error: ", e)
                    }
                }(r, a) && (a.__upixel_detection = {
                    root: t,
                    scopeName: n + "/iframe"
                }, a.removeEventListener("load", u), a.addEventListener("load", u), a.contentDocument))
                for (var c of i) 0 < c.length && a.contentDocument.querySelectorAll(c).forEach(e => {
                    o.includes(e) || o.push(e)
                })
        }
        return o
    }

    function _(e) {
        return [...e.querySelectorAll("*")].filter(e => !!e.shadowRoot).map(e => e.shadowRoot)
    }
    window.ttdPixel = window.ttdPixel || {}, window.ttdPixel.startDetection = function(e) {
        f = e, s.info("Detection started! Library is configured to detect: ", f.detectionSubject), s.info("Detection event type is ", f.detectionEventType), s.debug("Full config: ", f), "onsubmit" === f.detectionEventType || "onclick" === f.detectionEventType ? (e = document.querySelector("body")) && (r(e, "document"), f.detectDynamicNodes) && y(e, "document") : s.debug("Detection type not supported! We will not start auto detection."), window.ttdPixelEventsLayer = window.ttdPixelEventsLayer || [], window.ttdPixelEventsLayer.forEach(t), window.ttdPixelEventsLayer.push = function(e) {
            return Array.prototype.push.call(window.ttdPixelEventsLayer, e), t(e), this.length
        }
    }, window.ttdPixel.setIdentifier = i, window.ttdPixel.enableDebug = () => e("debug"), window.ttdPixel.disableLog = () => e(null)
}();
var ttd_dom_ready = function() {
        var t, n, i = {
                "[object Boolean]": "boolean",
                "[object Number]": "number",
                "[object String]": "string",
                "[object Function]": "function",
                "[object Array]": "array",
                "[object Date]": "date",
                "[object RegExp]": "regexp",
                "[object Object]": "object"
            },
            u = {
                isReady: !1,
                readyWait: 1,
                holdReady: function(e) {
                    e ? u.readyWait++ : u.ready(!0)
                },
                ready: function(e) {
                    if (!0 === e && !--u.readyWait || !0 !== e && !u.isReady) {
                        if (!document.body) return setTimeout(u.ready, 1);
                        (u.isReady = !0) !== e && 0 < --u.readyWait || t.resolveWith(document, [u])
                    }
                },
                bindReady: function() {
                    if (!t) {
                        if (t = u._Deferred(), "complete" === document.readyState) return setTimeout(u.ready, 1);
                        if (document.addEventListener) document.addEventListener("DOMContentLoaded", n, !1), window.addEventListener("load", u.ready, !1);
                        else if (document.attachEvent) {
                            document.attachEvent("onreadystatechange", n), window.attachEvent("onload", u.ready);
                            var e = !1;
                            try {
                                e = null == window.frameElement
                            } catch (e) {}
                            document.documentElement.doScroll && e && o()
                        }
                    }
                },
                _Deferred: function() {
                    var d, n, a, c = [],
                        l = {
                            done: function() {
                                if (!a) {
                                    var e, t, n, i, o, r = arguments;
                                    for (d && (o = d, d = 0), e = 0, t = r.length; e < t; e++) "array" === (i = u.type(n = r[e])) ? l.done.apply(l, n) : "function" === i && c.push(n);
                                    o && l.resolveWith(o[0], o[1])
                                }
                                return this
                            },
                            resolveWith: function(e, t) {
                                if (!a && !d && !n) {
                                    t = t || [], n = 1;
                                    try {
                                        for (; c[0];) c.shift().apply(e, t)
                                    } finally {
                                        d = [e, t], n = 0
                                    }
                                }
                                return this
                            },
                            resolve: function() {
                                return l.resolveWith(this, arguments), this
                            },
                            isResolved: function() {
                                return !(!n && !d)
                            },
                            cancel: function() {
                                return a = 1, c = [], this
                            }
                        };
                    return l
                },
                type: function(e) {
                    return null == e ? String(e) : i[Object.prototype.toString.call(e)] || "object"
                }
            };

        function o() {
            if (!u.isReady) {
                try {
                    document.documentElement.doScroll("left")
                } catch (e) {
                    return void setTimeout(o, 1)
                }
                u.ready()
            }
        }
        return document.addEventListener ? n = function() {
                document.removeEventListener("DOMContentLoaded", n, !1), u.ready()
            } : document.attachEvent && (n = function() {
                "complete" === document.readyState && (document.detachEvent("onreadystatechange", n), u.ready())
            }),
            function(e) {
                u.bindReady(), u.type(e), t.done(e)
            }
    }(),
    ttd_up_api = {
        topLevelUrl: "",
        set_top_level_url: function(e) {
            this.topLevelUrl = e
        },
        init: function(e, t, n, i, o) {
            new TTDUniversalPixelApi(this.topLevelUrl).init(e, t, n, i, o)
        }
    };

function TTDUniversalPixelApi(B) {
    this.getVersion = function() {
        return "1.1.0"
    }, this._uid2SdkListenerLock = {}, this.setupUid2Sdk = function(e, i, o) {
        void 0 === this._uid2SdkListenerLock[e] && (this._uid2SdkListenerLock[e] = 1, void 0 === window.__uid2 && void 0 === window.ttdPixel.uid2SdkLoaderPromise ? window.ttdPixel.uid2SdkLoaderPromise = new Promise((e, t) => {
            var n = document.createElement("script");
            n.setAttribute("defer", !0), n.setAttribute("src", "https://cdn.prod.uidapi.com/uid2-sdk-3.2.0.js"), n.addEventListener("load", () => {
                e(), i()
            }), n.addEventListener("error", e => {
                t(e), o(e)
            }), document.body.appendChild(n)
        }) : (async () => {
            try {
                await window.ttdPixel.uid2SdkLoaderPromise, i()
            } catch (e) {
                console.warn("Failed to load uid2 sdk: ", e)
            }
        })())
    }, this.init = function(r, t, e, d, a) {
        if ("string" == typeof arguments[3] && (arguments[3] = null, 4 < arguments.length))
            for (var c = 4; c < arguments.length; c++) arguments[c - 1] = arguments[c];
        if (r && "" != r && t && !(t.length <= 0)) {
            var l = document.getElementsByTagName("body")[0];
            if (l) {
                var u = "",
                    s = {
                        MonetaryValue: "v",
                        MonetaryValueFormat: "vf"
                    },
                    f = [];
                if ("undefined" != typeof _pixelParams)
                    for (var c in _pixelParams) {
                        var p = _pixelParams[c],
                            v = s[c];
                        v && p && !/%%.*%%/i.test(p) && f.push(v + "=" + encodeURIComponent(p))
                    }
                var m = "adv=" + r,
                    g = "upid=" + t.join(","),
                    w = B || function() {
                        var e = window,
                            t = "",
                            n = !1;
                        try {
                            top.location.href && (t = top.location.href)
                        } catch (e) {
                            n = !0
                        }
                        if (n)
                            for (;;) try {
                                if (t = e.document.referrer, window.parent == e) break;
                                e = window.parent
                            } catch (e) {
                                break
                            } - 1 < t.indexOf("cloudfront.net") && (t = function(e, t) {
                                t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                                t = new RegExp("[\\?&]" + t + "=([^&#]*)").exec(e);
                                return null === t ? "" : decodeURIComponent(t[1].replace(/\+/g, " "))
                            }(t, "url") || t);
                        return t
                    }(),
                    u = e + "?" + m + "&ref=" + encodeURIComponent(w) + "&" + g + "&upv=" + this.getVersion();
                if (d)
                    for (var y in d) u = u + "&" + y + "=" + d[y];
                0 < f.length && (u = u + "&" + f.join("&")), navigator.joinAdInterestGroup && (u += "&paapi=1");
                let n;
                const O = new Promise((e, t) => {
                    n = e
                });
                var h = null,
                    _ = !1,
                    b = null;
                "function" == typeof __tcfapi ? (D = setTimeout(W, 1e3), __tcfapi("addEventListener", 2, M)) : "function" == typeof __cmp ? (h = setTimeout(U, 1e3), __cmp("ping", null, j)) : "function" == typeof __gpp ? void 0 !== (m = P()).gppString ? N(m.gppString, m.gppSid) : (E = setTimeout(T, 1e3), __gpp("addEventListener", k)) : I();
                let i = !1,
                    o = (void 0 !== a && (i = !0), r + ":" + t.join(","));
                i ? this.setupUid2Sdk(o, () => x(a), e => {
                    console.warn("UID2 enabled but failed to register hooks: ", e)
                }) : window.addEventListener("message", e => {
                    try {
                        if (null !== e.origin && "null" !== e.origin) {
                            var t = new URL(e.origin);
                            if (t.hostname.endsWith(".adsrvr.org") && !i && "string" == typeof e.data) {
                                const n = JSON.parse(e.data);
                                n.advertiserId && "string" == typeof n.advertiserId && n.advertiserId == r && this.setupUid2Sdk(o, () => x(n), e => {
                                    console.warn("UID2 enabled but failed to register hooks: ", e)
                                })
                            }
                        }
                    } catch (e) {}
                });
                var E = null,
                    L = !1,
                    D = null,
                    S = !1;

                function x(a) {
                    try {
                        window.__uid2.callbacks.push(async (e, t) => {
                            switch (e) {
                                case "SdkLoaded":
                                    try {
                                        window.__ttd_m_invoke_once = window.__ttd_m_invoke_once || {}, window.__ttd_m_invoke_once._uid2_init || (window.__ttd_m_invoke_once._uid2_init = 1, a.baseUrl || (a.baseUrl = "https://global.prod.uidapi.com"), __uid2.init({
                                            baseUrl: a.baseUrl
                                        }))
                                    } catch (e) {
                                        console.info("Non-TTD actor initialized UID2 SDK, mind the consistency of UID2 baseUrl.")
                                    }
                                    break;
                                case "InitCompleted":
                                    var n = () => t.identity,
                                        i = a;
                                    try {
                                        var o, r, d = n();
                                        d ? await R(d.advertising_token) : window.ttdPixel.activeDetection || (o = new Promise(t => {
                                            window.addEventListener("detected-identifier", function(e) {
                                                t(e.detail.identifier), window.ttdPixel.activeDetection = null
                                            }), window.ttdPixel.startDetection(i)
                                        }), r = await (window.ttdPixel.activeDetection = o), await window.__uid2.setIdentityFromEmail(r, i))
                                    } catch (e) {
                                        console.warn("error setting up fireOrDetact: ", e)
                                    }
                                    await 0;
                                    break;
                                case "IdentityUpdated":
                                    await R(t.identity.advertising_token)
                            }
                        })
                    } catch (e) {
                        console.warn("Did not setup uid2 hooks: ", e)
                    }
                }

                function P() {
                    var e, t = __gpp("getGPPData"),
                        t = {
                            gppString: t ? .gppString,
                            gppSid: t ? .applicableSections ? .join(",")
                        };
                    return void 0 === t.gppString && (e = __gpp("ping"), t.gppString = e ? .gppString, t.gppSid = e ? .applicableSections ? .join(",")), t
                }

                function k(e, t) {
                    var n;
                    L ? __gpp("removeEventListener", function() {}, e.listenerId) : "signalStatus" === e.eventName && "ready" === e.data && (n = P(), clearTimeout(E), b = new Date, N(n.gppString, n.gppSid), __gpp("removeEventListener", function() {}, e.listenerId))
                }

                function T() {
                    L = !0, I()
                }

                function U() {
                    _ = !0, I()
                }

                function j(e) {
                    _ || (e.cmpLoaded || e.gdprAppliesGlobally ? (clearTimeout(h), b = new Date, __cmp("getConsentData", null, I)) : setTimeout(function() {
                        __cmp("ping", null, j)
                    }, 200))
                }

                function I(e) {
                    null != b && (u = u + "&ret=" + (new Date - b)), _ && (u += "&pto=1"), null != e && (u = u + "&gdpr=" + (e.gdprApplies ? "1" : "0") + "&gdpr_consent=" + e.consentData), A()
                }

                function A() {
                    var e = "universal_pixel_" + t.join("_");
                    n(u), C(u, e, "TTD Universal Pixel")
                }
                async function R(e) {
                    C(await O + "&uiddt=" + e, "universal_pixel_" + t.join("_") + "_uid", "TTD Universal Pixel with UID")
                }

                function C(e, t, n) {
                    let i = document.getElementById(t);
                    for (; i && i.parentElement.removeChild(i), i = document.getElementById(t););
                    let o = document.createElement("iframe");

                    function r() {
                        l.appendChild(o)
                    }
                    o.setAttribute("id", t), o.setAttribute("height", 0), o.setAttribute("width", 0), o.setAttribute("style", "display:none;"), o.setAttribute("src", e), o.setAttribute("title", n), "complete" === document.readyState ? setTimeout(r, 0) : window.addEventListener ? window.addEventListener("load", r) : window.attachEvent ? window.attachEvent("onload", r) : r()
                }

                function W() {
                    S = !0, I()
                }

                function M(e, t) {
                    S ? __tcfapi("removeEventListener", 2, function(e) {}, e.listenerId) : t && (clearTimeout(D), t = e, null != b && (u = u + "&ret=" + (new Date - b)), S && (u += "&pto=1"), null != t && (u = u + "&gdpr=" + function(e) {
                        return e ? "1" : "0"
                    }(t.gdprApplies) + "&gdpr_consent=" + t.tcString), A(), b = new Date, __tcfapi("removeEventListener", 2, function(e) {}, e.listenerId))
                }

                function N(e, t) {
                    null != b && (u = u + "&ret=" + (new Date - b)), null != e && (u = u + "&gpp_consent=" + e), null != t && (u = u + "&gpp_sid=" + t), A()
                }
            }
        }
    }
}