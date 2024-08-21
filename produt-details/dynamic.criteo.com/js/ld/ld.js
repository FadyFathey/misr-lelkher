window.Criteo = window.Criteo || {};
window.Criteo.oneTagConfig = {
    partnerId: 99626,
    visitEventEnabled: true,
    fpIdentifier: undefined,
    waitForGum: true,
    dynamic: !0,
    gumDomain: "gum.criteo.com",
    privateModeDetectionEnabled: true,
    blockedSteps: [],
    addClientSideSupportForId5: false
};
! function() {
    "use strict";

    function v(e, t) {
        var n = null == (n = window.Criteo) ? void 0 : n.oneTagConfig;
        return null != (n = n && n[e]) ? n : t
    }
    var I, T = "5.26.1",
        u = ((P = I = I || {})[P.None = 0] = "None", P[P.Cookie = 1] = "Cookie", P[P.LocalStorage = 2] = "LocalStorage", P[P.Library = 3] = "Library", o.checkLocalStorageIsWritable = function() {
            try {
                var e;
                return window.localStorage ? (e = "criteo_localstorage_check", window.localStorage.setItem(e, e), window.localStorage.removeItem(e), !0) : !1
            } catch (e) {
                return !1
            }
        }, o.checkCookiesAreWritable = function() {
            var e = new o("criteo_write_test", 1e4),
                t = (e.setValueWithNoDomain("1"), "1" === e.cookieValue);
            return e.removeWithNoDomain(), t
        }, o.prototype.setCookieRead = function() {
            this.isCookieRead = !0
        }, o.prototype.setValue = function(e, t) {
            void 0 === t && (t = !0), this.cookieValue = e, this.isCookieValueExternallySet = !0, t && this.writeOnAllStorages(e)
        }, o.prototype.setValueFromExistingCookie = function() {
            var e = this.getValue();
            void 0 !== e && (this.cookieValue = e, this.cookieExtractor = {
                origin: I.Cookie
            })
        }, o.prototype.setValueFromAllStorages = function() {
            var e = this.getFromAllStorages();
            this.cookieValue = e.value, this.cookieExtractor = e.identifierExtractor
        }, o.prototype.getValue = function() {
            for (var e = 0, t = document.cookie.split(";"); e < t.length; e++) {
                var n = t[e];
                if (n.substr(0, n.indexOf("=")).replace(/^\s+|\s+$/g, "") === this.cookieName) return n = n.substr(n.indexOf("=") + 1), (decodeURIComponent || unescape)(n)
            }
        }, o.prototype.removeWithNoDomain = function() {
            this.setValueWithNoDomainWithExpiration("", 0)
        }, o.prototype.removeOnMainDomain = function() {
            this.setOnMainDomainWithExpiration("", 0)
        }, o.prototype.setOnMainDomain = function(e) {
            return this.setOnMainDomainWithExpiration(e, this.cookieRetentionTimeInMs)
        }, o.prototype.writeOnAllStorages = function(e) {
            this.setOnMainDomain(e), this.useLocalStorage && window.localStorage.setItem(this.cookieName, e)
        }, o.prototype.getFromAllStorages = function() {
            switch (this.cookieExtractor.origin) {
                case I.LocalStorage:
                    return {
                        value: window.localStorage.getItem(this.cookieName),
                        identifierExtractor: {
                            origin: I.LocalStorage
                        }
                    };
                case I.Cookie:
                    return {
                        value: this.getValue(),
                        identifierExtractor: {
                            origin: I.Cookie
                        }
                    };
                case I.Library:
                    return {
                        value: null == (e = (t = this.cookieExtractor).retrievalMethod) ? void 0 : e.call(t),
                        identifierExtractor: {
                            origin: I.Library
                        }
                    };
                case I.None:
                    var e = null,
                        t = (this.useLocalStorage && (e = window.localStorage.getItem(this.cookieName)), this.getValue() || null);
                    return {
                        value: t || e,
                        identifierExtractor: {
                            origin: this.computeStorageOrigin(t, e)
                        }
                    }
            }
        }, o.prototype.removeFromAllStorages = function() {
            this.removeOnMainDomain(), this.useLocalStorage && window.localStorage.removeItem(this.cookieName)
        }, o.prototype.setValueWithNoDomainWithExpiration = function(e, t) {
            var n = new Date,
                t = (n.setTime(n.getTime() + t), "expires=" + n.toUTCString()),
                n = encodeURIComponent || escape,
                n = (document.cookie = this.cookieName + "=" + n(e) + ";" + t + ";path=/", this.getValue());
            void 0 !== n && (this.cookieValue = n)
        }, o.prototype.setValueWithNoDomain = function(e) {
            this.setValueWithNoDomainWithExpiration(e, this.cookieRetentionTimeInMs)
        }, o.prototype.toFragmentData = function() {
            return {
                identifierExtractor: this.cookieExtractor,
                value: this.cookieValue
            }
        }, o.prototype.setOnMainDomainWithExpiration = function(e, t) {
            for (var n = new Date, o = (n.setTime(n.getTime() + t), "expires=" + n.toUTCString()), i = null === document.location ? [] : document.location.hostname.split("."), r = null, a = 0; a < i.length; ++a) {
                var s = "domain=." + (r = i.slice(i.length - a - 1, i.length).join(".")),
                    c = encodeURIComponent || escape,
                    c = (document.cookie = this.cookieName + "=" + c(e) + ";" + o + ";" + s + ";path=/", this.getValue());
                if (c && c === e) break
            }
            return r || document.location
        }, o.prototype.computeStorageOrigin = function(e, t) {
            var n = I.None;
            return e && (n |= I.Cookie), t && (n |= I.LocalStorage), n
        }, o.prototype.getMatchingKeyInAllStorage = function(e) {
            if (!(e instanceof RegExp)) return e;
            if ("undefined" != typeof localStorage)
                for (var t = 0, n = Object.keys(localStorage); t < n.length; t++) {
                    var o = n[t];
                    if (e.test(o)) return o
                }
            for (var i = 0, r = document.cookie.split(";"); i < r.length; i++) {
                var a = r[i];
                if (e.test(a)) return a
            }
            return ""
        }, o);

    function o(e, t, n) {
        void 0 === n && (n = {
            origin: I.None
        }), this.cookieValue = null, this.isCookieValueExternallySet = !1, this.isCookieRead = !1, this.cookieName = this.getMatchingKeyInAllStorage(e), this.cookieRetentionTimeInMs = t, this.cookieExtractor = n, this.useLocalStorage = o.checkLocalStorageIsWritable()
    }
    var _, t, i = "OneTag",
        S = ["color: #fff;", "background: #ff4f00;", "display: inline-block;", "padding: 1px 4px;", "border-radius: 3px;"].join(" "),
        W = ((P = _ = _ || {})[P.Off = 0] = "Off", P[P.Error = 1] = "Error", P[P.Warning = 2] = "Warning", P[P.Info = 3] = "Info", P[P.Debug = 4] = "Debug", r.setLogLevel = function(e) {
            r.level = e, this.debug("Log level set to " + _[e])
        }, r.debug = function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            r.log(console.log, _.Debug, e)
        }, r.info = function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            r.log(console.log, _.Info, e)
        }, r.warn = function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            r.log(console.warn, _.Warning, e)
        }, r.error = function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            r.log(console.error, _.Error, e)
        }, r.log = function(e, t, n) {
            t <= r.level && (t = 0 < (t = window.navigator.userAgent).indexOf("MSIE ") || 0 < t.indexOf("Trident/") ? ["[" + i + "]"] : ["%c" + i, S], e.apply(console, t.concat(n)))
        }, r.level = _.Warning, r);

    function r() {}(P = t = t || {})[P.Unknown = 0] = "Unknown", P[P.TopLevel = 1] = "TopLevel", P[P.Child = 2] = "Child";
    a.extractHostname = function(e) {
        var t = document.createElement("a");
        return t.href = e, t.hostname
    }, a.getAnchorWithReferrer = function(e) {
        var t;
        return e && e.referrer ? ((t = e.createElement("a")).href = e.referrer, t) : null
    }, a.getQueryString = function(t) {
        var n;
        try {
            n = t.top.location.search
        } catch (e) {
            var o = t;
            try {
                for (; o.parent.document !== o.document && o.parent.document;) o = o.parent
            } catch (e) {}
            o && (t = a.getAnchorWithReferrer(o.document)) && (n = t.search)
        }
        return n
    }, a.getHighestAccessibleUrl = function(e) {
        try {
            var t = e.top.location.href;
            if (t) return t
        } catch (e) {}
        return a.getHighestAccessibleWindow(e).topFrame.location.href
    }, a.getPreviousUrl = function(e) {
        var e = a.getHighestAccessibleWindow(e),
            t = e.topFrame,
            n = "";
        return (n = e.err ? n : t.document.referrer || (null == (e = t.top) ? void 0 : e.document.referrer) || "") || (t = null == (e = t.location) ? void 0 : e.ancestorOrigins) && 0 < t.length && (n = t[t.length - 1]), n
    }, a.onBodyReady = function(t, n) {
        ! function e() {
            document.body ? t.setProtectedTimeout(n, 0) : t.setProtectedTimeout(e, 10)
        }()
    }, a.onDocumentReady = function(n, o) {
        if ("complete" === document.readyState) o();
        else if (document.addEventListener) n.addProtectedEventListener(document, "DOMContentLoaded", o, !1), n.addProtectedEventListener(window, "load", o, !1);
        else {
            n.attachProtectedEvent(document, "onreadystatechange", o), n.attachProtectedEvent(window, "onload", o);
            var t, i, r, e = !1;
            try {
                e = null === window.frameElement && document.documentElement
            } catch (e) {}
            e && e.doScroll ? function t() {
                if (e) {
                    try {
                        e.doScroll("left")
                    } catch (e) {
                        return void n.setProtectedTimeout(t, 50)
                    }
                    o()
                }
            }() : (t = !1, i = null === document.onload ? null : function(e, t) {
                return e.onload(t)
            }, r = null === document.onreadystatechange ? null : function(e, t) {
                return e.onreadystatechange(t)
            }, document.onload = document.onreadystatechange = function(e) {
                r instanceof Function && r(document, e), t || document.readyState && "complete" !== document.readyState || (i instanceof Function && i(document, e), t = !0, o())
            })
        }
    }, a.removeLater = function(e, t) {
        e.setProtectedTimeout(function() {
            null !== t && null !== t.parentElement && t.parentElement.removeChild(t)
        }, 3e4)
    }, a.appendCriteoContainer = function(e) {
        var t;
        return e ? ((t = document.createElement("div")).setAttribute("id", "criteo-tags-div"), t.style.display = "none", e.appendChild(t), t) : null
    }, a.getOneTagLocation = function() {
        try {
            return window.self === window.top ? t.TopLevel : t.Child
        } catch (e) {
            return W.info("Cannot get OneTag location", e), t.Unknown
        }
    }, a.getHighestAccessibleWindow = function(e) {
        var t = e,
            n = !1;
        try {
            for (; t.parent.document !== t.document;) {
                if (!t.parent.document) {
                    n = !0;
                    break
                }
                t = t.parent
            }
        } catch (e) {
            n = !0
        }
        return {
            topFrame: t,
            err: n
        }
    };
    var N = a;

    function a() {}
    e.prototype.catchAndStoreException = function(e, t) {
        try {
            return void 0 === t ? e() : e.apply(this, t)
        } catch (e) {
            e instanceof Error ? this.exceptions.push(e) : this.exceptions.push(new Error(e))
        }
    }, e.prototype.setProtectedTimeout = function(e, t) {
        var n = this;
        if ("undefined" != typeof window && "function" == typeof window.setTimeout) return window.setTimeout(function() {
            return n.catchAndStoreException(e)
        }, t)
    }, e.prototype.addProtectedEventListener = function(e, t, n, o) {
        var i = this;
        if (void 0 !== e && "function" == typeof e.addEventListener) return e.addEventListener(t, function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return i.catchAndStoreException(n, e)
        }, o)
    }, e.prototype.attachProtectedEvent = function(e, t, n) {
        var o = this;
        if (void 0 !== e && "function" == typeof e.attachEvent) return e.attachEvent(t, function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return o.catchAndStoreException(n, e)
        })
    };
    var D = e;

    function e() {
        this.exceptions = []
    }
    l.prototype.preload = function() {
        var t = this;
        this.onUserIdAvailable(function(e) {
            t.logger("preload complete, userId:", e)
        }, l.maxWaitForApiMs)
    }, l.prototype.onUserIdAvailable = function(i, r) {
        function a(e) {
            var t, n, o;
            c || (t = e * l.retryIntervalMs, void 0 !== (n = s.instance()) ? (c = !0, o = Math.max(r - t, 0), s.logger("instance available after waiting (ms):", t, "allowing for user id to be available more (ms):", o), n.onAvailable(function(e) {
                e = e.getUserId();
                return s.logger("user ID available:", e), i(e)
            }, o)) : r <= t ? (c = !0, s.logger("timeout waiting for instance after waiting (ms):", t), i(void 0)) : (s.exceptionHandler.setProtectedTimeout(function() {
                return a(e)
            }, l.retryIntervalMs), e++))
        }
        var s = this,
            c = !1;
        return a(0), this
    }, l.prototype.instance = function() {
        var e;
        return void 0 === this._instance && window.hasOwnProperty("Criteo") && null != (e = window.Criteo) && e.hasOwnProperty("ID5") && (this._instance = window.Criteo.ID5.init({
            partnerId: l.criteoPartnerId
        })), this._instance
    }, l.prototype.getUserId = function() {
        var e = this.instance(),
            t = null == e ? void 0 : e.getUserId();
        return this.logger("[getUserId] instance:", e, " userId:", t), t
    }, l.prototype.initialize = function() {
        (e = document.createElement("iframe")).style.display = "none", document.body.appendChild(e);
        var e, t, n, o, i = e;
        e = "https://cdn.id5-sync.com/api/1.0/id5-api.js", t = i, n = function() {
            window.Criteo = window.Criteo || {}, window.Criteo.ID5 = i.contentWindow.ID5
        }, (o = document.createElement("script")).src = e, o.type = "text/javascript", o.onload = n, null != (e = t.contentWindow) && e.document.head.appendChild(o), this.preload()
    }, l.criteoPartnerId = 203, l.retryIntervalMs = 100, l.maxWaitForApiMs = 2e4;
    var G = l;

    function l() {
        this.logger = function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return W.debug.apply(W, function() {
                for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
                for (var o = Array(e), i = 0, t = 0; t < n; t++)
                    for (var r = arguments[t], a = 0, s = r.length; a < s; a++, i++) o[i] = r[a];
                return o
            }(["[ID5]"], e))
        }, this.exceptionHandler = new D
    }
    n.prototype.getReadyToRetrieveProvider = function() {
        return this.tcfv2ConsentProvider.hasCallerFunctionInFrame() ? this.tcfv2ConsentProvider : this.tcfv1ConsentProvider.hasCallerFunctionInFrame() ? this.tcfv1ConsentProvider : void 0 !== this.tcfv2ConsentProvider.getCMPFrame() ? this.tcfv2ConsentProvider : void 0 !== this.tcfv1ConsentProvider.getCMPFrame() ? this.tcfv1ConsentProvider : void 0
    }, n.prototype.retrieveConsentForPassback = function(e) {
        var t = this.getReadyToRetrieveProvider();
        void 0 === t && (this.logger("No compatible GDPR privacy provider found"), e(void 0)), t === this.tcfv1ConsentProvider ? this.tcfv1ConsentProvider.retrieveConsentForPassback(e) : t === this.tcfv2ConsentProvider && this.tcfv2ConsentProvider.retrieveConsent(e)
    }, n.prototype.retrieveConsent = function(e) {
        var t = this.getReadyToRetrieveProvider();
        void 0 === t && (this.logger("No compatible GDPR privacy provider found"), e(void 0)), null != t && t.retrieveConsent(e)
    }, n.prototype.readyToRetrieve = function() {
        return this.tcfv2ConsentProvider.readyToRetrieve() || this.tcfv1ConsentProvider.readyToRetrieve()
    };
    var F = n;

    function n(e, t, n) {
        void 0 === n && (n = function(e) {}), this.tcfv1ConsentProvider = e, this.tcfv2ConsentProvider = t, this.logger = n
    }

    function s(e) {
        try {
            return JSON.parse(e)
        } catch (e) {}
    }
    c.prototype.getCMPFrame = function() {
        for (var e, t = this.currentWindow, n = 0; n < 10; ++n) {
            try {
                t.frames.__cmpLocator && (e = t)
            } catch (e) {}
            if (t === this.currentWindow.top) break;
            t = t.parent
        }
        return e
    }, c.prototype.hasCallerFunctionInFrame = function() {
        return "function" == typeof this.currentWindow.__cmp
    }, c.prototype.readyToRetrieve = function() {
        return this.hasCallerFunctionInFrame() || void 0 !== this.getCMPFrame()
    }, c.prototype.pingWithTimeout = function(o, e, t, n) {
        function i(e, t) {
            r.logger(t), clearTimeout(e), n()
        }
        var r = this;
        return window.setTimeout(function() {
            var n = window.setTimeout(function() {
                i(o, "Timeout: Unable to get ping return after " + e + "ms")
            }, e);
            r.executeCommand("ping", null, function(e, t) {
                clearTimeout(n), t ? (r.logger("GDPR CMP ping returned"), !0 !== e.cmpLoaded && i(o, "GDPR ping returned cmpLoaded which is not true"), r.logger("GDPR ping returned cmpLoaded which is true")) : i(o, "Error sending ping to GDPR CMP")
            })
        }, t)
    }, c.prototype.retrieveConsent = function(e) {
        this.executeRetrieveConsent("getConsentData", null, e)
    }, c.prototype.retrieveConsentForPassback = function(e) {
        this.executeRetrieveConsent("getVendorConsents", [91], e)
    }, c.prototype.executeRetrieveConsent = function(e, t, n) {
        var o = this,
            i = !1,
            r = window.setTimeout(function() {
                i = !0, o.logger("Timeout: Unable to resolve GDPR consent after " + o.timeout + "ms"), n(void 0)
            }, this.timeout),
            a = !1 !== this.cmpAutoDetect ? this.pingWithTimeout(r, this.pingTimeout, this.pingDelay, function() {
                i = !0, o.logger("Timeout: Unable to ping GDPR API after " + o.pingTimeout + "ms"), n(void 0)
            }) : void 0;
        this.executeCommand(e, t, function(e, t) {
            clearTimeout(a), i || (clearTimeout(r), t ? (o.logger("GDPR consent retrieved"), o.processConsentData(e, n)) : (o.logger("Error retrieving GDPR consent data from CMP"), n(void 0)))
        })
    }, c.prototype.processConsentData = function(e, t) {
        var n;
        e ? (n = {}, "undefined" === e.consentData && (e.consentData = ""), n.consentData = void 0 !== e.consentData ? e.consentData : "", void 0 !== e.gdprApplies && (n.gdprApplies = !!e.gdprApplies), t(n)) : (this.logger("Unable to read GDPR consent data from CMP"), t(void 0))
    }, c.prototype.executeCommand = function(e, t, n) {
        var o, i = this;
        this.hasCallerFunctionInFrame() || (this.logger("No GDPR CMP defined on current frame"), o = this.getCMPFrame(), this.currentWindow.__cmp = function(e, t, n) {
            o ? (t = {
                __cmpCall: {
                    command: e,
                    parameter: t,
                    callId: e = Math.random().toString(10)
                }
            }, i.cmpCallbacks[e] = n, o.postMessage(t, "*")) : (i.logger("GDPR CMP not found in any frame"), n({
                msg: "GDPR CMP not found in any frame"
            }, !1))
        }, this.currentWindow.addEventListener("message", function(e) {
            var e = "string" == typeof e.data ? s(e.data) : e.data;
            e && e.__cmpReturn && e.__cmpReturn.callId && e.__cmpReturn.returnValue && (e = e.__cmpReturn, i.cmpCallbacks) && i.cmpCallbacks[e.callId] && (i.cmpCallbacks[e.callId](e.returnValue, e.success), delete i.cmpCallbacks[e.callId])
        }, !1)), this.currentWindow.__cmp(e, t, n)
    };
    var E = c;

    function c(e, t, n) {
        void 0 === n && (n = function(e) {}), this.cmpCallbacks = {}, this.currentWindow = e, this.timeout = t.tcfTimeout, this.pingTimeout = t.tcfPingTimeout, this.pingDelay = t.tcfPingDelay, this.cmpAutoDetect = t.cmpAutoDetect, this.logger = n
    }(P = d = d || {}).LOADED = "tcloaded", P.UI_SHOWN = "cmpuishown", P.USER_ACTION_COMPLETE = "useractioncomplete", p.prototype.getCMPFrame = function() {
        for (var e, t = this.currentWindow, n = 0; n < 10; ++n) {
            try {
                t.frames.__tcfapiLocator && (e = t)
            } catch (e) {}
            if (t === this.currentWindow.top) break;
            t = t.parent
        }
        return e
    }, p.prototype.hasCallerFunctionInFrame = function() {
        return "function" == typeof this.currentWindow.__tcfapi
    }, p.prototype.readyToRetrieve = function() {
        return this.hasCallerFunctionInFrame() || void 0 !== this.getCMPFrame()
    }, p.prototype.pingWithTimeout = function(n, e, t, o) {
        function i(e, t) {
            r.logger(t), clearTimeout(e), o()
        }
        var r = this;
        return window.setTimeout(function() {
            var t = window.setTimeout(function() {
                i(n, "Timeout: Unable to get TCFv2 ping return after " + e + "ms")
            }, e);
            r.executeCommand("ping", 2, function(e) {
                clearTimeout(t), r.logger("TCFv2 CMP ping returned in ms"), "error" === e.cmpStatus ? i(n, "Error status on ping to TCFv2 CMP") : !0 !== e.cmpLoaded ? i(n, "TCFv2 ping returned cmpLoaded = false") : r.logger("TCFv2 ping returned cmpLoaded = true")
            })
        }, t)
    }, p.prototype.retrieveConsent = function(n) {
        var o, i, r = this,
            a = !1,
            s = window.setTimeout(function() {
                a = !0, i === d.UI_SHOWN ? (r.logger("Timeout: User hasn't confirm their consent settings after " + r.timeout + "ms"), n(o)) : (r.logger("Timeout: Unable to resolve TCFv2 consent after " + r.timeout + "ms"), n(void 0))
            }, this.timeout),
            c = !1 !== this.cmpAutoDetect ? this.pingWithTimeout(s, this.pingTimeout, this.pingDelay, function() {
                a = !0, r.logger("Timeout: Unable to ping TCFv2 API after " + r.pingTimeout + "ms"), n(void 0)
            }) : void 0;
        this.executeCommand("addEventListener", 2, function(e, t) {
            clearTimeout(c), a || ((i = e.eventStatus) !== d.UI_SHOWN && clearTimeout(s), t ? (r.logger("TCFv2 consent retrieved in ms"), e || (r.logger("Unable to read GDPR consent data from CMP"), n(void 0)), o = r.processResponseData(e), i !== d.LOADED && i !== d.USER_ACTION_COMPLETE || n(o)) : (r.logger("Error retrieving TCFv2 consent data from CMP"), n(void 0)))
        })
    }, p.prototype.processResponseData = function(e) {
        var t, n = {};
        return "undefined" === e.tcString && (e.tcString = ""), n.consentData = void 0 !== e.tcString ? e.tcString : "", void 0 !== e.gdprApplies && (n.gdprApplies = !!e.gdprApplies), n.version = e.tcfPolicyVersion || 2, n.purposes = null == (t = null == e ? void 0 : e.purpose) ? void 0 : t.consents, n.vendorConsents = null == (t = null == e ? void 0 : e.vendor) ? void 0 : t.consents, n
    }, p.prototype.executeCommand = function(e, t, n, o) {
        var i, r = this;
        this.hasCallerFunctionInFrame() || (this.logger("No TCFv2 CMP defined on current frame"), i = this.getCMPFrame(), this.currentWindow.__tcfapi = function(e, t, n, o) {
            i ? (t = {
                __tcfapiCall: {
                    command: e,
                    version: t,
                    parameter: o,
                    callId: e = Math.random().toString(10)
                }
            }, r.cmpCallbacks[e] = n, i.postMessage(t, "*")) : (r.logger("TCFv2 CMP not found in any frame"), n({
                msg: "TCFv2 CMP not found in any frame"
            }, !1))
        }, this.currentWindow.addEventListener("message", function(e) {
            var e = "string" == typeof e.data ? s(e.data) : e.data;
            e && e.__tcfapiReturn && e.__tcfapiReturn.callId && e.__tcfapiReturn.returnValue && (e = e.__tcfapiReturn, r.cmpCallbacks) && r.cmpCallbacks[e.callId] && "function" == typeof r.cmpCallbacks[e.callId] && (r.cmpCallbacks[e.callId](e.returnValue, e.success), e.returnValue.eventStatus !== d.UI_SHOWN) && delete r.cmpCallbacks[e.callId]
        }, !1)), this.currentWindow.__tcfapi(e, t, n, o)
    };
    var d, x = p;

    function p(e, t, n) {
        void 0 === n && (n = function(e) {}), this.cmpCallbacks = {}, this.currentWindow = e, this.timeout = t.tcfTimeout, this.pingTimeout = t.tcfPingTimeout, this.pingDelay = t.tcfPingDelay, this.cmpAutoDetect = t.cmpAutoDetect, this.logger = n
    }
    h.prototype.getCMPFrame = function() {
        for (var e, t = this.currentWindow, n = 0; n < 10; ++n) {
            try {
                t.frames.__uspapiLocator && (e = t)
            } catch (e) {}
            if (t === this.currentWindow.top) break;
            t = t.parent
        }
        return e
    }, h.prototype.hasCallerFunctionInWindow = function() {
        return "function" == typeof this.currentWindow.__uspapi
    }, h.prototype.readyToRetrieve = function() {
        return this.hasCallerFunctionInWindow() || void 0 !== this.getCMPFrame()
    }, h.prototype.retrieveConsent = function(n) {
        var o = this,
            i = !1,
            r = window.setTimeout(function() {
                i = !0, o.logger("Timeout: Unable to resolve CCPA consent after " + o.timeout + "ms"), n(void 0)
            }, this.timeout);
        this.executeCommand("getUSPData", 1, function(e, t) {
            i || (clearTimeout(r), t ? (o.logger("CCPA consent retrieved"), o.processResponseData(e, n)) : (o.logger("Error retrieving CCPA consent data from CMP"), n(void 0)))
        })
    }, h.prototype.processResponseData = function(e, t) {
        e ? t(e) : (this.logger("Unable to read CCPA consent data from CMP"), t(void 0))
    }, h.prototype.executeCommand = function(e, t, n) {
        var o, i = this;
        this.hasCallerFunctionInWindow() || (this.logger("No CCPA CMP defined on current frame"), o = this.getCMPFrame(), this.currentWindow.__uspapi = function(e, t, n) {
            o ? (t = {
                __uspapiCall: {
                    command: e,
                    parameter: t,
                    callId: e = Math.random().toString(10)
                }
            }, i.uspapiCallbacks[e] = n, o.postMessage(t, "*")) : (i.logger("CCPA CMP not found in any frame"), n({
                msg: "CCPA CMP not found in any frame"
            }, !1))
        }, this.currentWindow.addEventListener("message", function(e) {
            var e = "string" == typeof e.data ? s(e.data) : e.data;
            e && e.__uspapiReturn && e.__uspapiReturn.callId && e.__uspapiReturn.returnValue && (e = e.__uspapiReturn, i.uspapiCallbacks) && i.uspapiCallbacks[e.callId] && (i.uspapiCallbacks[e.callId](e.returnValue, e.success), delete i.uspapiCallbacks[e.callId])
        }, !1)), this.currentWindow.__uspapi(e, t, n)
    }, h.prototype.hasUserOptOut = function(e) {
        return !(!e || !e.uspString || "1YNY" === e.uspString.toUpperCase() || "1YNN" === e.uspString.toUpperCase() || "1YN-" === e.uspString.toUpperCase() || "1-N-" === e.uspString.toUpperCase() || "1-NN" === e.uspString.toUpperCase() || "1-NY" === e.uspString.toUpperCase() || "1---" === e.uspString)
    };
    var M = h;

    function h(e, t, n) {
        void 0 === n && (n = function(e) {}), this.uspapiCallbacks = {}, this.currentWindow = e, this.timeout = t.uspApiTimeout, this.logger = n
    }
    f.prototype.retrieveConsent = function(t) {
        var n, e = this.tcfCompatibleConsentProvider.readyToRetrieve(),
            o = this.ccpaConsentProvider.readyToRetrieve(),
            i = {};
        e || o ? (n = e && o ? 2 : 1, e && this.tcfCompatibleConsentProvider.retrieveConsent(function(e) {
            i.gdprConsent = e, 0 == --n && t(i)
        }), o && this.ccpaConsentProvider.retrieveConsent(function(e) {
            i.ccpaConsent = e, 0 == --n && t(i)
        })) : t(i)
    };
    var H = f;

    function f(e, t, n, o, i) {
        t = {
            tcfTimeout: t = void 0 === t ? 1e4 : t,
            tcfPingTimeout: n = void 0 === n ? 50 : n,
            tcfPingDelay: o = void 0 === o ? 1e3 : o
        }, n = {
            uspApiTimeout: i = void 0 === i ? 500 : i
        };
        this.tcfCompatibleConsentProvider = new F(new E(e, t, W.info), new x(e, t, W.info), W.info), this.ccpaConsentProvider = new M(e, n, W.info)
    }

    function R(e, t) {
        if (e instanceof Array)
            for (var n = 0, o = e; n < o.length; n++) R(o[n], t);
        else V(t, e) || t.push(e)
    }

    function V(e, t) {
        for (var n = JSON.stringify || encodeURIComponent || escape, o = n(t), i = 0, r = e; i < r.length; i++) {
            var a = r[i];
            if (a === t || n(a) === o) return 1
        }
    }

    function A(e) {
        for (var t = [], n = 0, o = e; n < o.length; n++) {
            var i = o[n];
            null != i && t.push(i)
        }
        return t
    }

    function j(e, t) {
        if (void 0 !== e || void 0 !== t) {
            if (void 0 === e || void 0 === t) return !1;
            if (!(e instanceof Array)) return j([e], t);
            if (!(t instanceof Array)) return j(e, [t]);
            if (e.length !== t.length) return !1;
            for (var n = 0, o = e; n < o.length; n++)
                if (!V(t, o[n])) return !1
        }
        return !0
    }

    function B(e) {
        var t = e;
        if (e instanceof Function) return (t = e()) instanceof Function ? t : B(t);
        if (e instanceof Array)
            for (var t = [], n = 0; n < e.length; ++n) t[n] = B(e[n]);
        else if (e && "[object Object]" === e.toString()) {
            t = {};
            for (var o = 0, i = Object.getOwnPropertyNames(e); o < i.length; o++) {
                var r = i[o];
                t[r] = B(e[r])
            }
        }
        return t
    }

    function z(e, t) {
        for (var n = 0, o = e; n < o.length; n++) {
            var i = o[n];
            if (i.event === t.event && j(t.account, i.account)) {
                for (var r in t) t.hasOwnProperty(r) && "account" !== r && (i[r] = t[r]);
                return
            }
        }
        e.push(t)
    }

    function J(e, t) {
        for (var n = 0, o = e; n < o.length; n++) {
            var i = o[n];
            if (i.event === t.event && j(t.account, i.account) && i.hash_method === t.hash_method) return void(void 0 !== t.email && (i.email = function(e, t) {
                var n = [];
                if (void 0 === e) return void 0 === t ? n : t.slice();
                if (void 0 === t) return e.slice();
                for (var o = 0, i = t; o < i.length; o++) {
                    var r = i[o];
                    V(e, r) || n.push(r)
                }
                return e.concat(n)
            }(i.email instanceof Array || void 0 === i.email ? i.email : [i.email], t.email instanceof Array ? t.email : [t.email])))
        }
        e.push(t)
    }

    function q(e, t, n) {
        n = B(n);
        return Q(e, n), z(t, B(n)), 1
    }

    function Q(e, t) {
        for (var n = 0, o = e; n < o.length; n++) {
            var i = o[n];
            if (i.event === t.event && void 0 === t.account && void 0 === i.account || j(t.account, i.account)) {
                for (var r in t) t.hasOwnProperty(r) && "account" !== r && (i[r] = t[r]);
                return
            }
        }
        e.push(t)
    }
    L.prototype.getJsonForQueryString = function() {
        var e, t = {
                fbc: this.fbcCookie.getValue(),
                fbp: this.fbpCookie.getValue(),
                crto_fbc: this.crtoFbcCookie.getValue(),
                crto_fbp: this.crtoFbpCookie.getValue(),
                ttclid: this.ttclidCookie.getValue(),
                ttp: this.ttpCookie.getValue()
            },
            n = {};
        for (e in t) void 0 !== t[e] && (n[e] = t[e]);
        return 0 === Object.keys(n).length ? null : encodeURIComponent(JSON.stringify(n))
    };
    var O = L;

    function L() {
        this.metaCookieRetentionTime = 7776e6, this.tiktokCookieRetentionTime = 34164e6, this.fbcCookie = new u("_fbc", this.metaCookieRetentionTime), this.fbpCookie = new u("_fbp", this.metaCookieRetentionTime), this.crtoFbcCookie = new u("crto_fbc", this.metaCookieRetentionTime), this.crtoFbpCookie = new u("crto_fbp", this.metaCookieRetentionTime), this.ttclidCookie = new u("ttclid", this.tiktokCookieRetentionTime), this.ttpCookie = new u("_ttp", this.tiktokCookieRetentionTime)
    }
    g.prototype.fillQueryStringParams = function(e, t) {
        var n = this.config.trackingCallData.firstPartyIdentifier,
            o = this.socialCookie.getJsonForQueryString();
        n && e.push("fpid=" + n), this.gaid && e.push("ai=" + this.gaid), this.idfa && e.push("idfa=" + this.idfa), this.canWriteCookie && e.push("adce=1"), null !== this.clickOriginPayload && e.push("cop=" + this.clickOriginPayload), null !== this.optoutCookie.cookieValue && e.push("optout=1"), null != this.bundleCookie.cookieValue && e.push("bundle=" + this.bundleCookie.cookieValue), null !== this.secureIdCookie.cookieValue && (e.push("sid=" + this.secureIdCookie.cookieValue), e.push("sid_read=" + (this.secureIdCookie.isCookieValueExternallySet ? "1" : "0"))), null !== o && e.push("sc=" + o), null !== this.tld && e.push("tld=" + this.tld), t.privateModeDetectionEnabled && null !== this.privateMode && 0 !== this.privateMode ? e.push("pm=" + this.privateMode) : t.privateModeDetectionEnabled || e.push("pm=3"), void 0 !== new u("cto_clc", this.readonlyCookieRetentionTime).getValue() && e.push("clc=1")
    }, g.prototype.checkAcid = function() {
        this.setCanWriteCookie(), this.setCanWriteLocalStorage()
    }, g.prototype.setCop = function(e) {
        var t = N.getQueryString(e);
        if (void 0 !== t && (this.clickOriginPayload = this.getParameterValueByName(t, "cto_pld")), null === this.clickOriginPayload) try {
            var n = N.getAnchorWithReferrer(e.top.document);
            n && n.search && (this.clickOriginPayload = this.getParameterValueByName(n.search, "cto_pld"))
        } catch (e) {}
    }, g.prototype.checkClientSideIdentityStatus = function() {
        this.optoutCookie.getFromAllStorages(), this.secureIdCookie.setValueFromAllStorages(), this.bundleCookie.setValueFromAllStorages(), this.ifaCookie.setValueFromAllStorages()
    }, g.prototype.checkCookies = function(e) {
        var t = !0;
        if (e.callbacks) {
            for (var n = 0, o = "string" == typeof e.callbacks ? [e.callbacks] : e.callbacks; n < o.length; n++) {
                var i = o[n],
                    r = document.createElement("img"),
                    i = (r.setAttribute("style", "display:none;"), r.setAttribute("width", "1"), r.setAttribute("height", "1"), r.setAttribute("data-owner", "criteo-tag"), r.setAttribute("src", i), document.getElementsByTagName("script")[0]);
                i.parentNode.insertBefore(r, i), N.removeLater(this.exceptionHandler, r)
            }
            t = !1
        }
        e.optout ? (this.optoutCookie.setValue("1", t), this.secureIdCookie.removeFromAllStorages(), this.bundleCookie.removeFromAllStorages()) : (e.bundle && this.bundleCookie.setValue(e.bundle, t), e.removeSid ? this.secureIdCookie.removeFromAllStorages() : e.sid && this.secureIdCookie.setValue(e.sid, t))
    }, g.prototype.scrapIdentifiers = function(n) {
        return Object.keys(n.externalIdentifiersToRead).map(function(e) {
            var t = n.externalIdentifiersToRead[e],
                t = new u(t.key, 0, t.storageSource).getFromAllStorages().value;
            return null != t && 0 < t.length ? JSON.stringify({
                type: e,
                value: t
            }) : ""
        }).filter(function(e) {
            return 0 < e.length
        }).join(",")
    }, g.prototype.getParameterValueByName = function(e, t) {
        if (e && 1 < e.length) {
            var n, t = "&" + t + "=",
                o = (e = "?" === e[0] ? "&" + e.substr(1) : e).indexOf(t);
            if (-1 !== o) return n = e.indexOf("&", o + t.length), e.slice(o + t.length, n < 0 ? void 0 : n)
        }
        return null
    }, g.prototype.setCanWriteCookie = function() {
        this.canWriteCookie = u.checkCookiesAreWritable()
    }, g.prototype.setCanWriteLocalStorage = function() {
        this.canWriteLocalStorage = u.checkLocalStorageIsWritable()
    }, g.prototype.getTld = function() {
        var e = new u("cto_tld_test", 36e5),
            t = e.setOnMainDomain("woot");
        return e.removeOnMainDomain(), t
    }, g.prototype.getPrivateMode = function(e, t) {
        if (e.isSafari) try {
            if ("function" == typeof t.openDatabase) return t.openDatabase(null, null, null, null), 1
        } catch (e) {
            return 2
        }
        return 0
    };
    var Y = g;

    function g(e, t, n, o) {
        this.readonlyCookieRetentionTime = 0, this.optoutCookieRetentionTime = 15768e7, this.identificationCookieRetentionTime = 34164e6, this.optoutCookie = new u("cto_optout", this.optoutCookieRetentionTime), this.secureIdCookie = new u("cto_sid", this.identificationCookieRetentionTime), this.bundleCookie = new u("cto_bundle", this.identificationCookieRetentionTime), this.ifaCookie = new u("id_controller_ifa", this.identificationCookieRetentionTime), this.socialCookie = new O, this.canWriteCookie = !1, this.canWriteLocalStorage = !1, this.clickOriginPayload = null, this.tld = this.getTld(), this.privateMode = this.getPrivateMode(t, n), this.exceptionHandler = e, this.config = o
    }
    m.prototype.fillQueryStringParams = function(e, t) {}, m.prototype.checkAcid = function() {}, m.prototype.setCop = function(e) {}, m.prototype.checkClientSideIdentityStatus = function() {}, m.prototype.checkCookies = function(e) {}, m.prototype.scrapIdentifiers = function(e) {
        return ""
    };
    var K = m;

    function m() {
        this.secureIdCookie = new u("empty", 0), this.optoutCookie = new u("empty", 0), this.bundleCookie = new u("empty", 0), this.ifaCookie = new u("empty", 0), this.clickOriginPayload = null, this.tld = null, this.canWriteCookie = !1, this.canWriteLocalStorage = !1, this.privateMode = 0
    }
    y.prototype.createIframe = function(e, t, n, o, i) {
        var r = document.createElement("iframe"),
            a = encodeURIComponent || escape,
            s = N.getHighestAccessibleUrl(window),
            a = a(N.extractHostname(s)),
            s = window.SYNCFRAME_ORIGIN || "onetag",
            t = {
                bundle: e.bundleCookie.toFragmentData(),
                cw: e.canWriteCookie,
                optout: e.optoutCookie.toFragmentData(),
                origin: s,
                sid: e.secureIdCookie.toFragmentData(),
                tld: e.tld,
                topUrl: a,
                version: t.replace(/\./g, "_"),
                ifa: e.ifaCookie.toFragmentData(),
                lsw: e.canWriteLocalStorage,
                pm: o ? e.privateMode : 3
            },
            o = this.gumSyncFrameEndPoint,
            e = ("#gum-debug-mode" === window.location.hash ? o += "?debug=1&topUrl=" + a : o += "?topUrl=" + a, s && (o += "&origin=" + s), i.gdprConsent),
            a = (e && (void 0 !== e.gdprApplies && (o += "&gdpr=" + (e.gdprApplies ? 1 : 0)), void 0 !== e.consentData) && (o += "&gdpr_consent=" + e.consentData), i.ccpaConsent);
        return a && void 0 !== a.uspString && (o += "&us_privacy=" + a.uspString), o += "#" + JSON.stringify(t), r.src = o, r.id = this.gumSyncFrameId, r.width = "0", r.height = "0", r.frameBorder = "0", r.setAttribute("style", "border-width:0px; margin:0px; display:none"), r.setAttribute("sandbox", "allow-scripts allow-same-origin"), r.title = "Criteo GUM iframe", N.removeLater(n, r), r
    }, y.prototype.setWaitingFlag = function(e) {
        this.waitingForSyncframe = this.waitingForSyncframe && null === e.bundleCookie.cookieValue && null === e.optoutCookie.cookieValue
    }, y.prototype.shouldInjectSyncframe = function() {
        return void 0 !== window.addEventListener || this.forceSyncFrame
    };
    var $ = y;

    function y(e) {
        this.forceSyncFrame = !1, this.gumSyncFrameOrigin = "https://" + v("gumDomain", "gum.criteo.com"), this.gumSyncFrameEndPoint = window.CriteoSyncFrameUrlOverride || this.gumSyncFrameOrigin + "/syncframe", this.gumSyncFrameId = "criteo-syncframe-onetag", this.waitingForSyncframe = e.hasItp || v("waitForGum", !0)
    }
    C.prototype.createIframe = function(e, t, n, o, i) {
        return document.createElement("iframe")
    }, C.prototype.setWaitingFlag = function(e) {}, C.prototype.shouldInjectSyncframe = function() {
        return !1
    };
    var X = C;

    function C() {
        this.gumSyncFrameOrigin = "", this.gumSyncFrameEndPoint = "", this.gumSyncFrameId = "", this.forceSyncFrame = !1, this.waitingForSyncframe = !1
    }
    var Z = new RegExp(/^Mozilla\/5\.0 \([^)]+\) AppleWebKit\/[^ ]+ \(KHTML, like Gecko\) Version\/([^ ]+)( Mobile\/[^ ]+)? Safari\/[^ ]+$/i),
        ee = (w.prototype.canRetrieveMetrics = function() {
            return this.hasPerformanceApi
        }, w.prototype.startRecordingInit = function() {
            this.canRetrieveMetrics() && (this.beginInit = performance.now())
        }, w.prototype.stopRecordingInit = function() {
            var e;
            this.canRetrieveMetrics() && null === this.timings.initTime && null !== this.beginInit && (e = performance.now(), this.timings.initTime = e - this.beginInit)
        }, w.prototype.startRecordingPush = function() {
            this.canRetrieveMetrics() && (this.beginPush = performance.now())
        }, w.prototype.stopRecordingPush = function() {
            var e;
            this.canRetrieveMetrics() && null === this.timings.pushTime && null !== this.beginPush && null !== this.timings.initTime && (e = performance.now(), this.timings.pushTime = e - this.beginPush)
        }, w.prototype.getPerformanceOrDegradedNow = function() {
            return this.canRetrieveMetrics() ? performance.now() : (new Date).getTime()
        }, w);

    function w() {
        this.timings = {
            initTime: null,
            pushTime: null
        }, this.beginInit = null, this.beginPush = null, this.hasPerformanceApi = void 0 !== window.performance && "function" == typeof window.performance.now
    }
    b.prototype.trySetPageId = function(e, t) {
        this.isCbsEnabled && this.checkNotExistOrEmpty(e.page_id) && (e.page_id = t)
    }, b.prototype.tryForceViewListPageId = function(e) {
        this.isCbsEnabled && this.checkNotExistOrEmpty(e.page_id) && (this.checkNotExistOrEmpty(e.category) ? this.checkNotExistOrEmpty(e.keywords) ? e.page_id = "viewList" : e.page_id = "viewSearchResult" : e.page_id = "viewCategory")
    }, b.prototype.tryRunActionAfterAdBlockDetectionOrImmediate = function(t, e) {
        var n = this,
            o = window.criteo_q;
        null != o && (o = o.adBlockDetector, this.isCbsEnabled) && void 0 !== o ? (o(function(e) {
            n.abe = e, t()
        }), e(t)) : t()
    }, b.prototype.tryAppendAdBlockerParameter = function(e) {
        void 0 !== this.abe && e.push("abe=" + (this.abe ? 1 : 0))
    }, b.prototype.tryAppendUatParameter = function(e) {
        var t;
        this.isCbsEnabled && void 0 !== this.uat && (t = encodeURIComponent || escape, e.push("uat=" + t(this.uat)))
    }, b.prototype.clean = function() {
        this.abe = void 0, this.isCbsEnabled = !1, this.uat = void 0
    }, b.prototype.enable = function() {
        this.isCbsEnabled = !0
    }, b.prototype.setUat = function(e) {
        this.uat = e
    }, b.prototype.checkNotExistOrEmpty = function(e) {
        return void 0 === e || "" === e
    };
    var te = b;

    function b() {
        this.abe = void 0, this.isCbsEnabled = !1, this.uat = void 0
    }
    var U = /^#(enable|disable)-criteo-tag-debug-mode(=(\d+))?$/;

    function ne(e, t, n, o, i) {
        var r, a, s, c;
        return document && window.location.hash && (a = U.exec(window.location.hash)) && 4 === a.length && (r = "enable" === a[1], a = Number(a[3]), new u("criteoTagDebugMode", r ? 864e5 : 0).setValueWithNoDomain(r && a && !isNaN(a) ? String(a) : "0"), window.location.href = window.location.href.substr(0, window.location.href.indexOf("#"))), document && "function" == typeof Array.prototype.indexOf && -1 !== document.cookie.indexOf("criteoTagDebugMode=") ? (s = i, c = {
            exceptions: e.exceptions,
            m_config: n,
            m_state: o,
            originalPush: e.push,
            performances: e.performances,
            push: function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                0 < e.length && this.stagedPushes.push(e), s.stopRecordingInit()
            },
            pushError: function(e) {
                this.stagedPushes.push(e)
            },
            removeLater: e.removeLater,
            setProtectedTimeout: t.setProtectedTimeout,
            stagedErrors: [],
            stagedPushes: []
        }, window.onerror = function(i) {
            return function(e, t, n, o) {
                return c.pushError({
                    column: o,
                    lineNumber: n,
                    message: e,
                    url: t
                }), !(!i || "function" != typeof i) && i.apply(window, [e, t, n, o])
            }
        }(window.onerror), r = c, document && (a = "ld-tag-debug." + T + ".js", (i = document.createElement("script")).setAttribute("type", "text/javascript"), i.setAttribute("src", document.location.protocol + "//static.criteo.net/js/ld/" + a), (a = document.getElementsByTagName("script")[0]).parentNode.insertBefore(i, a)), r) : e
    }

    function oe(t, n) {
        function e(e) {
            void 0 === e && (e = !1), n.eventSent || (e && t({
                event: "setRequestType",
                type: "beacon"
            }), t({
                event: "viewPage"
            }))
        }
        window.addEventListener && window.addEventListener("pagehide", function() {
            return e(!0)
        });
        var o = v("visitEventDelay", 5e3);
        0 <= o && setTimeout(e, o)
    }
    k.prototype.registerTrigger = function(e) {
        var t;
        this.isFeatureAllowed("attribution-reporting") && ((t = document.createElement("img")).setAttribute("style", "display:none;"), t.setAttribute("width", "1"), t.setAttribute("height", "1"), t.setAttribute("attributionsrc", k.ATTRIBUTION_TRIGGER_URL_PREFIX + "?" + e), e = document.getElementsByTagName("script")[0], t.setAttribute("data-owner", "criteo-tag"), e.parentNode.insertBefore(t, e), N.removeLater(this.exceptionHandler, t))
    }, k.prototype.isFeatureAllowed = function(t) {
        return !(!document.featurePolicy || !document.featurePolicy.features()) && document.featurePolicy.features().some(function(e) {
            return e === t
        })
    }, k.ATTRIBUTION_TRIGGER_URL_PREFIX = "https://measurement-api.criteo.com/conversiontracking";
    var ie = k;

    function k(e, t) {
        this.document = e, this.exceptionHandler = t
    }
    se.generateUUID = function() {
        for (var e = "", t = 0; t < 36; t++) e += 8 === t || 13 === t || 18 === t || 23 === t ? "-" : 14 === t ? "4" : (19 === t ? Math.floor(4 * Math.random()) + 8 : Math.floor(16 * Math.random())).toString(16);
        return e
    };
    var re, P, ae = se;

    function se() {}

    function ce() {
        void 0 !== (null == (u = null === window || void 0 === window ? void 0 : window.location) ? void 0 : u.hash) && -1 !== window.location.hash.indexOf("onetag-debug") && W.setLogLevel(_.Debug);
        var e, n, t, o, i, r, a, s, c, F = new D,
            h = new ee,
            y = (h.startRecordingInit(), {
                app: {
                    accounts: [],
                    actions: [],
                    bodyReady: !1,
                    disingScheduled: [],
                    domReady: !1,
                    eventSent: !1,
                    queue: []
                },
                cbs: new te
            }),
            C = (n = v("blockedSteps", []), u = {
                account: v("partnerId") || null,
                firstPartyIdentifier: v("fpIdentifier") || null,
                customerInfo: [],
                extraData: [],
                handlerParams: {
                    v: T,
                    otl: N.getOneTagLocation()
                },
                handlerResponseType: "single",
                handlerUrlPrefix: "https://sslwidget.criteo.com/event",
                partnerPayload: null,
                requestType: "pixel",
                responseType: "js",
                tagVersion: T,
                dynamic: v("dynamic") || null,
                fullUrlMaxLength: v("fullUrlMaxLength", 4e3),
                previousUrlMaxLength: v("previousUrlMaxLength", 400),
                privateModeDetectionEnabled: v("privateModeDetectionEnabled", !0),
                isStepAllowed: function(t) {
                    return !n.some(function(e) {
                        return e == t
                    })
                }
            }, t = {
                item: !0,
                "item.id": !0,
                product: !0,
                "product.id": !0
            }, o = {
                item: !0,
                product: !0
            }, d = {
                shouldEncodeField: function(e) {
                    return t[e]
                }
            }, i = {
                shouldParseField: function(e) {
                    return o[e]
                }
            }, l = {
                externalIdentifiersToRead: {
                    FirstId: {
                        key: "firstid",
                        storageSource: {
                            origin: I.Cookie
                        }
                    },
                    IntimateMergerId: {
                        key: /^_im_uid\./,
                        storageSource: {
                            origin: I.LocalStorage
                        }
                    }
                }
            }, v("addClientSideSupportForId5") && ((e = new G).initialize(), l.externalIdentifiersToRead.Id5 = {
                key: "id5",
                storageSource: {
                    origin: I.Library,
                    retrievalMethod: function() {
                        return e.getUserId()
                    }
                }
            }), {
                hooks: {},
                shortNameMap: {
                    events: {
                        applaunched: "al",
                        viewitem: "vp",
                        viewhome: "vh",
                        viewlist: "vl",
                        viewbasket: "vb",
                        viewsearch: "vs",
                        viewpage: "vpg",
                        tracktransaction: "vc",
                        addtocart: "ac",
                        calldising: "dis",
                        setdata: "exd",
                        setemail: "ce",
                        setidentity: "id"
                    },
                    properties: {
                        event: "e",
                        account: "a",
                        first_party_identifier: "fpid",
                        currency: "c",
                        product: "p",
                        item: "p",
                        "item.id": "i",
                        "item.price": "pr",
                        "item.quantity": "q",
                        "item.availability": "pav",
                        "item.buy_box": "bb",
                        "item.sku_parent": "psp",
                        "item.store_id": "ps",
                        item_whitelist: "iw",
                        "product.id": "i",
                        "product.price": "pr",
                        "product.quantity": "q",
                        "product.availability": "pav",
                        "product.buy_box": "bb",
                        "product.sku_parent": "psp",
                        "product.store_id": "ps",
                        data: "d",
                        keywords: "kw",
                        checkin_date: "din",
                        checkout_date: "dout",
                        deduplication: "dd",
                        delivery: "dl",
                        attribution: "at",
                        "attribution.channel": "ac",
                        "attribution.value": "v",
                        user_segment: "si",
                        new_customer: "nc",
                        customer_id: "ci",
                        email: "m",
                        hash_method: "h",
                        identity: "id",
                        raw_identity: "rid",
                        transaction_value: "tv",
                        client_revenue: "cr",
                        responseType: "rt",
                        page_name: "pn",
                        page_id: "pi",
                        page_number: "pnb",
                        category: "ca",
                        filters: "f",
                        "filters.name": "fn",
                        "filters.operator": "fo",
                        "filters.value": "fv",
                        retailer_visitor_id: "rvi",
                        price: "pr",
                        availability: "av",
                        sub_event_type: "se",
                        store_id: "s",
                        item_group_id: "sp",
                        sku_parent: "sp",
                        zipcode: "z",
                        nocall: "noc",
                        block: "bl"
                    }
                },
                trackingCallData: u,
                workflow: {
                    container: null,
                    disOnce: !1,
                    manualDising: !1,
                    manualFlush: !1,
                    noPartialFlush: !1,
                    partialDis: !1
                },
                encodingConfig: d,
                parsingConfig: i,
                identifierScrappingConfig: l
            }),
            u = C.trackingCallData.isStepAllowed("identify"),
            l = (d = window.navigator.userAgent, i = null !== (d = d.match(Z)), {
                hasItp: null !== d && 11 <= parseFloat(d[1]),
                isSafari: i
            }),
            w = u ? new Y(F, l, window, C) : new K,
            b = u ? new $(l) : new X,
            d = new H(window),
            E = new ie(document, F),
            x = (r = d.retrieveConsent.bind(d), a = !1, s = void 0, c = [], function(e) {
                a ? e(s) : (c.push(e), 1 === c.length && r(function(e) {
                    a = !0, s = e;
                    for (var t = 0, n = c; t < n.length; t++)(0, n[t])(s)
                }))
            });

        function S(e, t, n, o, i, r, a, s, c, u, l) {
            e.waitingForSyncframe && (e.waitingForSyncframe = !1, m(e, t, n, o, i, r, a, s, c, u, l))
        }

        function f(h, f, g, m, v, y, C, w, b, k, P, e) {
            h.shouldInjectSyncframe() && (e = h.createIframe(m, w.tagVersion, F, w.privateModeDetectionEnabled, e), window.addEventListener) && (F.addProtectedEventListener(window, "message", function(e) {
                var t, n, o, i, r, a, s, c, u, l, d, p;
                t = h, n = f, o = g, i = m, r = v, a = y, s = C, c = w, u = b, l = k, d = P, ((p = (e = e).data) && e.origin == t.gumSyncFrameOrigin || window.BypassSyncframeMessageSanityCheck) && (e.stopPropagation(), i.checkCookies(p), t.waitingForSyncframe) && S(t, n, o, i, r, a, s, c, u, l, d)
            }, !0), O(f, k, b, {
                event: "appendtag",
                element: e
            }))
        }

        function p(e, t) {
            var n = e.extraData,
                o = !1;
            if (200 < n.length) o = !0;
            else
                for (var i = 0, r = n; i < r.length; i++) {
                    var a = r[i],
                        s = 0;
                    if (Object.keys) s = Object.keys(a).length;
                    else
                        for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && (s += 1);
                    if (200 < s) {
                        o = !0;
                        break
                    }
                }
            o && (n.length = 0), e.customerInfo = [], t.clean()
        }

        function g() {
            for (var n = [], e = 0; e < arguments.length; e++) n[e] = arguments[e];
            F.catchAndStoreException(function() {
                h.startRecordingPush();
                for (var e = 0, t = n; e < t.length; e++) y.app.queue.push(t[e]);
                m(b, y.app, y.cbs, w, C.shortNameMap, C.encodingConfig, C.parsingConfig, C.trackingCallData, C.hooks, C.workflow, C.identifierScrappingConfig), p(C.trackingCallData, y.cbs), h.stopRecordingPush()
            }, n), h.stopRecordingInit()
        }

        function m(e, t, n, o, i, r, a, s, c, u, l) {
            for (var d = [], p = t.queue, h = 0; h < p.length; ++h) {
                var f = p[h];
                if (f instanceof Array && p.splice.apply(p, [h + 1, 0].concat(f)), f instanceof Function) p.splice(h + 1, 0, f());
                else if (f && "[object Object]" === f.toString()) switch (function(e, t, n, o, i, r, a, s, c, u, l, d, p, h) {
                    var f = l.event,
                        g = L(e, l);
                    if (null !== g) return g;
                    switch (l.event) {
                        case "setdata":
                            return q(a.extraData, e.actions, l);
                        case "setparameter":
                            for (var m in l) "event" !== m.toLowerCase() && l.hasOwnProperty(m) && (a.handlerParams[m] = l[m]);
                            return 1;
                        case "calldising":
                            M(a, e, l);
                            break;
                        case "setzipcode":
                        case "setstore":
                            return l.event = "setdata", q(a.extraData, e.actions, l);
                        case "setcustomerid":
                            return l.event = "setdata", l.customer_id = l.id, delete l.id, q(a.extraData, e.actions, l);
                        case "setretailervisitorid":
                            return t.enable(), l.event = "setdata", l.retailer_visitor_id = l.id, delete l.id, q(a.extraData, e.actions, l);
                        case "setgoogleadvertisingid":
                            return n.gaid = l.gaid, q(a.extraData, e.actions, {
                                event: "setdata",
                                site_type: "aa"
                            });
                        case "setappleadvertisingid":
                            return n.idfa = l.idfa, q(a.extraData, e.actions, {
                                event: "setdata",
                                site_type: "aios"
                            });
                        case "setemail":
                        case "sethashedemail":
                        case "ceh":
                            l.event = "setemail", l.hasOwnProperty("email") && (l.email instanceof Array || (l.email = [l.email]), l.email = A(l.email));
                            var v = B(l);
                            return a.customerInfo.push(v), J(e.actions, B(l)), 1;
                        case "setidentity":
                            if (l.hasOwnProperty("identity"))
                                if (0 < (v = A(v = l.identity instanceof Array ? l.identity : [l.identity])).length) return l.identity = v, e.actions.push(B(l)), 1;
                            return 0;
                        case "setsitetype":
                            v = "d";
                            return "aios" !== l.type && "aa" != l.type || (v = l.type), "mobile" !== l.type && "m" !== l.type || (v = "m"), "tablet" !== l.type && "t" !== l.type || (v = "t"), l.event = "setdata", delete l.type, l.site_type = v, q(a.extraData, e.actions, l);
                        case "appendtag":
                            return k(e, c, s, l);
                        case "gettagstate":
                            return l.callback instanceof Function ? l.callback(y, C, w, b) : 1;
                        case "setuat":
                            return t.setUat(l.uat), 1;
                        case "viewsearchresult":
                        case "viewcategory":
                            t.trySetPageId(l, f), l.event = "viewlist";
                            break;
                        case "viewlist":
                            t.tryForceViewListPageId(l);
                            break;
                        case "viewitem":
                        case "viewhome":
                        case "viewbasket":
                        case "tracktransaction":
                        case "addtocart":
                            t.trySetPageId(l, f);
                            break;
                        case "viewstore":
                            t.trySetPageId(l, f), l.event = "viewHome", l.sub_event_type = "s";
                            break;
                        case "checkavailability":
                            t.trySetPageId(l, f), l.event = "viewBasket", l.sub_event_type = "a";
                            break;
                        case "reserveinstore":
                            t.trySetPageId(l, f), l.event = "viewBasket", l.sub_event_type = "r";
                            break;
                        case "flush":
                        case "flushevents":
                            return P(e, t, n, o, i, r, a, s, c, u, d !== p.length - 1 || 0 !== h.length), 1;
                        case "setaccount":
                            return a.account = l.account, 1;
                        case "seturl":
                            return a.handlerUrlPrefix = l.url, 1;
                        case "setcalltype":
                            return a.handlerResponseType = l.type, 1;
                        case "setresponsetype":
                            return a.responseType = l.type, 1;
                        case "setrequesttype":
                            return a.requestType = l.type, 1;
                        case "setpartnerpayload":
                            return a.partnerPayload = l.payload, 1;
                        case "oninitialized":
                            return s.onInitialized = l.callback, 1;
                        case "ondomready":
                            return s.onDOMReady = l.callback, 1;
                        case "beforeappend":
                            return s.beforeAppend = l.callback, 1;
                        case "aftereval":
                            return s.afterEval = l.callback, 1;
                        case "onflush":
                            return s.onFlush = l.callback, 1;
                        case "onurlgenerated":
                            return s.onUrlGenerated = l.callback, 1;
                        case "disonce":
                            return c.disOnce = !0, 1;
                        case "manualdising":
                            return c.manualDising = !0, 1;
                        case "manualflush":
                            return c.manualFlush = !0, 1;
                        case "nopartialflush":
                            return c.noPartialFlush = !0, 1;
                        case "disonpartialflush":
                            return c.partialDis = !0, 1
                    }
                    return e.actions.push(B(l)), 1
                }(t, n, o, i, r, a, s, c, u, l, f, h, p, d)) {
                    case 0:
                        d.push(f);
                        break;
                    case -1:
                        d = d.concat(p.slice(h)), h = p.length
                }
            }
            c.afterEval instanceof Function && c.afterEval(), t.queue = d || [], u.manualFlush || u.noPartialFlush && 0 !== t.queue.length || e.waitingForSyncframe || P(t, n, o, i, r, a, s, c, u, l, 0 !== t.queue.length)
        }

        function M(e, t, n) {
            n.hasOwnProperty("account") || (n.account = t.accounts);
            e = e.handlerResponseType;
            n.hasOwnProperty("type") && (e = n.type, delete n.type), R(n.account, t.disingScheduled), "sequential" === e && (n.dc = !0)
        }

        function O(e, t, n, o) {
            var i = L(e, o);
            null === i && k(e, t, n, o)
        }

        function k(e, t, n, o) {
            if (!e.bodyReady || t.container && document.body.contains(t.container) || (t.container = N.appendCriteoContainer(document.body)), o.url && (e = void 0, o.isImgUrl ? ((e = document.createElement("img")).setAttribute("style", "display:none;"), e.setAttribute("width", "1"), e.setAttribute("height", "1")) : ((e = document.createElement("script")).setAttribute("async", "true"), e.setAttribute("type", "text/javascript")), e.setAttribute("src", o.url), o.element = e), n.beforeAppend instanceof Function && (o.element = n.beforeAppend(o.element)), B(o), o.element && (o.element.tagName || o.isImgUrl)) {
                if (t.container || "script" !== o.element.tagName.toLowerCase() && !o.isImgUrl) {
                    if (!t.container) return 0;
                    t.container.appendChild(o.element)
                } else {
                    e = document.getElementsByTagName("script")[0];
                    o.element.setAttribute("data-owner", "criteo-tag"), e.parentNode.insertBefore(o.element, e)
                }
                N.removeLater(F, o.element)
            }
            return 1
        }

        function L(e, t) {
            return !e.domReady && t.requiresDOM && "no" !== t.requiresDOM ? "blocking" === t.requiresDOM ? -1 : 0 : (delete t.requiresDOM, t.event ? (t.account && R(t.account, e.accounts), t.event = t.event.toLowerCase(), null) : (B(t), 1))
        }

        function P(n, o, e, t, i, r, a, s, c, u, l) {
            if (s.onFlush instanceof Function && (s.onFlush(), W.warn("on flush hook is deprecated and will soon be removed. Please do not use it and contact criteo if you think this may break your integration")), 0 !== n.actions.length) {
                for (var d = 0, p = a.extraData; d < p.length; d++) {
                    var h = p[d];
                    z(n.actions, h)
                }
                for (var f = 0, g = a.customerInfo; f < g.length; f++) {
                    var m = g[f];
                    J(n.actions, m)
                }
                for (var v, y, C, w = 0, b = n.actions; w < b.length; w++) {
                    var k = b[w];
                    (v = void 0) !== (k = k).identity && JSON.stringify && (v = k.identity instanceof Array ? k.identity : [k.identity], k.raw_identity = JSON.stringify(v), delete k.identity)
                }
                if (!c.manualDising && (!l || c.partialDis)) {
                    for (var P = [], S = 0, I = n.accounts; S < I.length; S++) {
                        var T = I[S];
                        V(n.disingScheduled, T) || P.push(T)
                    }
                    0 < P.length && (l = a, null === L(y = n, C = {
                        event: "callDising",
                        account: P
                    })) && (M(l, y, C), y.actions.push(B(C)))
                }
                var _ = !1,
                    D = function(e, t, n, o, i, r, a, s) {
                        var c = e.actions,
                            u = [];
                        1 === e.accounts.length && (i.account = e.accounts[0]);
                        null !== i.account && u.push("a=" + U(o, r, a, i.account, []));
                        "js" !== i.responseType && u.push("rt=" + U(o, r, a, i.responseType, []));
                        i.handlerParams && (e = decodeURIComponent(U(o, r, a, i.handlerParams, []))) && u.push(e);
                        e = function() {
                            for (var e = document.getElementsByTagName("script"), t = 0; t < e.length; t++) {
                                var n = e[t],
                                    n = n.nonce || n.getAttribute("nonce");
                                if (null != n && "" !== n) return n
                            }
                            return
                        }();
                        void 0 !== e && (p = encodeURIComponent || escape, u.push("csp-nonce=" + p(e)));
                        t.tryAppendUatParameter(u);
                        for (var l = 0; l < c.length; ++l) {
                            var d = c[l];
                            d.account && j(null === i.account ? void 0 : i.account, null === d.account ? void 0 : d.account) && delete d.account, u.push("p" + l + "=" + U(o, r, a, d, []))
                        }
                        n.fillQueryStringParams(u, i), null !== i.partnerPayload && u.push("pp=" + U(o, r, a, i.partnerPayload, []));
                        i.dynamic && u.push("dy=1");
                        ue(N.getHighestAccessibleUrl(window), u, i.fullUrlMaxLength, "fu", "ful"), i.isStepAllowed("readPreviousUrl") && ue(N.getPreviousUrl(window), u, i.previousUrlMaxLength, "pu", "pul");
                        u.push("ceid=" + ae.generateUUID());
                        var p = n.scrapIdentifiers(s);
                        0 < p.length && u.push("external_advids=" + encodeURIComponent("[" + p + "]"));
                        return u
                    }(n, o, e, t, a, i, r, u),
                    R = (n.actions = [], function() {
                        var e, t;
                        _ || (_ = !0, o.tryAppendAdBlockerParameter(D), e = D.join("&"), t = {
                            event: "appendTag",
                            isImgUrl: "gif" === a.responseType,
                            url: a.handlerUrlPrefix + "?" + e
                        }, "function" == typeof s.onUrlGenerated ? s.onUrlGenerated(t.url) : "beacon" === a.requestType && navigator.sendBeacon ? navigator.sendBeacon(t.url) : O(n, c, s, t), W.info("DIS call triggered", t.url, D), (n.eventSent = !0) === t.isImgUrl && E.registerTrigger(e), c.disOnce) || (n.disingScheduled = [])
                    }),
                    A = function() {
                        a.isStepAllowed("readCmaTestLabel") && "cookieDeprecationLabel" in navigator ? navigator.cookieDeprecationLabel.getValue().then(function(e) {
                            D.push("cl=" + e), R()
                        }).catch(function(e) {
                            R()
                        }) : R()
                    };
                x(function(e) {
                    var t, n;
                    D.push.apply(D, (t = [], (n = (e = e).gdprConsent) && (void 0 !== n.gdprApplies && t.push("gra=" + (n.gdprApplies ? 1 : 0)), void 0 !== n.consentData && t.push("grs=" + n.consentData), void 0 !== n.version) && t.push("grv=" + n.version), (n = e.ccpaConsent) && (void 0 !== n.uspString && t.push("cs=" + n.uspString), void 0 !== n.version) && t.push("cv=" + n.version), t)), o.tryRunActionAfterAdBlockDetectionOrImmediate(A, function(e) {
                        return F.setProtectedTimeout(e, 500)
                    })
                })
            }
        }

        function U(e, t, n, o, i) {
            var r, a, s, c, u, l = encodeURIComponent || escape,
                d = "";
            if (o instanceof Function) d = U(e, t, n, o(), i);
            else if (o instanceof Array) {
                for (var p = [], h = 0; h < o.length; ++h) p[h] = U(e, t, n, o[h], i);
                d += "[" + p.join(",") + "]"
            } else if (o && "[object Object]" === o.toString()) {
                var f, g, m = [];
                for (f in o) o.hasOwnProperty(f) && (g = i.concat([f]), m.push((s = e, c = f, u = (u = g).join("."), (s.properties[u] || c) + "=" + U(e, t, n, o[f], g))));
                d += m.join("&")
            } else if (1 === i.length && "event" === i[0]) d += e.events[o.toLowerCase()] ? e.events[o.toLowerCase()] : o;
            else {
                v = n, a = o, r = (r = i).join(".");
                var v = "string" == typeof a && v.shouldParseField(r) && 0 != a.length && "[" == a.charAt(0) && "]" == a.charAt(a.length - 1) ? a.substring(1, a.length - 1).split(",", -1).map(function(e) {
                    return e.trim()
                }) : [];
                if (0 < v.length) return U(e, t, n, v, i);
                r = t, a = (a = i).join("."), r.shouldEncodeField(a) ? d += l(o) : d += o
            }
            return l(d)
        }
        return F.catchAndStoreException(function() {
            w.checkAcid(), w.checkClientSideIdentityStatus(), w.setCop(window), e = b, t = y.app, n = y.cbs, o = w, i = C.shortNameMap, r = C.encodingConfig, a = C.parsingConfig, s = C.trackingCallData, c = C.hooks, u = C.workflow, l = C.identifierScrappingConfig, e.setWaitingFlag(o), e.waitingForSyncframe && F.setProtectedTimeout(function() {
                S(e, t, n, o, i, r, a, s, c, u, l)
            }, 1e4), N.onBodyReady(F, function() {
                C.hooks.onInitialized instanceof Function ? (y.app.bodyReady = C.hooks.onInitialized(), W.warn("onInitialized hook is deprecated and will soon be removed. Please do not use it and contact criteo if you think this may break your integration")) : y.app.bodyReady = !0, x(function(e) {
                    f(b, y.app, y.cbs, w, C.shortNameMap, C.encodingConfig, C.parsingConfig, C.trackingCallData, C.hooks, C.workflow, C.identifierScrappingConfig, e)
                }), m(b, y.app, y.cbs, w, C.shortNameMap, C.encodingConfig, C.parsingConfig, C.trackingCallData, C.hooks, C.workflow, C.identifierScrappingConfig)
            }), N.onDocumentReady(F, function() {
                C.hooks.onDOMReady instanceof Function ? (y.app.domReady = C.hooks.onDOMReady(), W.warn("on DOM ready hook is deprecated and will soon be removed. Please do not use it and contact criteo if you think this may break your integration")) : y.app.domReady = !0, m(b, y.app, y.cbs, w, C.shortNameMap, C.encodingConfig, C.parsingConfig, C.trackingCallData, C.hooks, C.workflow, C.identifierScrappingConfig)
            });
            var e, t, n, o, i, r, a, s, c, u, l, d = C.trackingCallData.extraData;
            try {
                var p = N.getAnchorWithReferrer(document);
                p && p.hostname !== document.location.hostname && Q(d, {
                    event: "setData",
                    ref: p.protocol + "//" + p.hostname
                })
            } catch (e) {}
            return v("visitEventEnabled", !1) && oe(g, y.app), ne({
                exceptions: F.exceptions,
                performances: h.timings,
                push: g,
                removeLater: function(e) {
                    return N.removeLater(F, e)
                }
            }, F, C, y, h)
        })
    }

    function ue(e, t, n, o, i) {
        var r;
        e && 0 !== (e = e.trim()).length && (n < (e = (r = encodeURIComponent || escape)(e)).length && (t.push(i + "=" + e.length), e = e.substr(0, n)), i = r(e), t.push(o + "=" + i))
    }(!window.criteo_q || window.criteo_q instanceof Array) && (P = window.criteo_q || [], window.criteo_q = ce(), P.adBlockDetector, window.criteo_q.adBlockDetector = P.adBlockDetector, (re = window.criteo_q).push.apply(re, P))
}();