var pwlog = void 0,
    pwerror = void 0;

function isStringEmpty(e) {
    return !e || 0 === e.length
}

function humanReadableFormType(e) {
    switch (e) {
        case WBSAutoFillFormTypeUndetermined:
            return "Undetermined";
        case WBSAutoFillFormTypeAutoFillableStandard:
            return "AutoFillable:Standard";
        case WBSAutoFillFormTypeNonAutoFillable:
            return "NonAutoFillable";
        case WBSAutoFillFormTypeAutoFillableLogin:
            return "AutoFillable:Login";
        case WBSAutoFillFormTypeNewAccount:
            return "NewAccount";
        case WBSAutoFillFormTypeChangePassword:
            return "ChangePassword"
    }
    return "Unrecognized"
}

function domainsForDisplayFromUsernamesAndDomains(e, t) {
    const n = e.length;
    let o = t.map((function(e) {
            return e.replace(/^(www|m)\./, "")
        })),
        s = [];
    for (var a = 0; a < n; a++) s.push([e[a], o[a]]);
    for (a = 0; a < n; a++) {
        let e = [];
        for (var i = a + 1; i < n; i++) s[a].join("\n") === s[i].join("\n") && (e.length || e.push(a), e.push(i));
        for (identicalIndex of e) o[identicalIndex] = t[identicalIndex]
    }
    return o
}
class Localizer {
    static configureDocumentElementForLanguage(e, t) {
        switch (t) {
            case "he":
            case "ar":
            case "fa":
                e.setAttribute("dir", "rtl"), e.setAttribute("lang", t)
        }
    }
    constructor(e) {}
    getMessage(e, t, n) {
        const o = this.messageNamesToTry(e);
        for (let e of o) {
            let o;
            try {
                o = chrome.i18n.getMessage(e, t, n)
            } catch {
                o = chrome.i18n.getMessage(e, t)
            }
            if (o) return o
        }
        return ""
    }
    messageNamesToTry(e) {
        let t = [];
        return t.push(e), t
    }
}
class ExtensionSettings {
    #e = !1;
    #t = !0;
    #n = !0;
    eventTarget = new EventTarget;
    constructor(e = !1) {
        this.#e = e, this.#o(), this.#s()
    }
    get enableInPageAutoFill() {
        return this.#t
    }
    set enableInPageAutoFill(e) {
        this.#t = e, this.#a()
    }
    get allowExtensionToControlAutoFillSettings() {
        return this.#n
    }
    set allowExtensionToControlAutoFillSettings(e) {
        this.#n = e, this.#i().then(this.#a.bind(this))
    }
    #i() {
        return this.#n ? this.attemptToControlBrowserAutoFillSettings() : this.clearControlOfBrowserAutoFillSettings()
    }
    attemptToControlBrowserAutoFillSettings() {
        return this.#e ? Promise.reject(new Error("This Settings instance does not allow writing browser settings")) : Promise.allSettled([this.#r(chrome.privacy.services.passwordSavingEnabled, !1), this.#r(chrome.privacy.services.autofillCreditCardEnabled, !1), this.#r(chrome.privacy.services.autofillAddressEnabled, !1)]).then((e => (this.#l(), e)))
    }
    clearControlOfBrowserAutoFillSettings() {
        return this.#e ? Promise.reject(new Error("This Settings instance does not allow writing browser settings")) : Promise.allSettled([this.#d(chrome.privacy.services.passwordSavingEnabled), this.#d(chrome.privacy.services.autofillCreditCardEnabled), this.#d(chrome.privacy.services.autofillAddressEnabled)]).then((e => (this.#l(), e)))
    }
    #o() {
        let e = new Promise((e => {
            chrome.storage.sync.get({
                enableInPageAutoFill: !0,
                allowExtensionToControlAutoFillSettings: !0
            }, (t => {
                this.#t = t.enableInPageAutoFill, this.#n = t.allowExtensionToControlAutoFillSettings, e()
            }))
        }));
        return this.#e || (e = e.then(this.#i.bind(this))), e.then(this.#l.bind(this))
    }
    #a() {
        return new Promise((e => {
            chrome.storage.sync.set({
                enableInPageAutoFill: this.#t,
                allowExtensionToControlAutoFillSettings: this.#n
            }, (() => {
                e()
            }))
        })).then(this.#l.bind(this))
    }
    #s() {
        this.#e || (chrome.privacy.services.passwordSavingEnabled && chrome.privacy.services.passwordSavingEnabled.onChange.addListener((e => {
            this.#l()
        })), chrome.privacy.services.autofillCreditCardEnabled && chrome.privacy.services.autofillCreditCardEnabled.onChange.addListener((e => {
            this.#l()
        })), chrome.privacy.services.autofillAddressEnabled && chrome.privacy.services.autofillAddressEnabled.onChange.addListener((e => {
            this.#l()
        })))
    }
    #l() {
        const e = new CustomEvent("settingsChanged", {
            detail: {
                enableInPageAutoFill: this.#t
            }
        });
        this.eventTarget.dispatchEvent(e)
    }
    #r(e, t) {
        return this.#c(e).then((n => n ? n.value === t ? {
            details: n,
            newValue: t
        } : new Promise(((o, s) => {
            e.set({
                value: t
            }, (() => {
                chrome.runtime.lastError && (chrome.runtime.lastError, chrome.runtime.lastError, s(chrome.runtime.lastError)), o({
                    details: n,
                    newValue: t
                })
            }))
        })) : {
            details: {},
            newValue: void 0
        }))
    }
    #c(e) {
        return new Promise((t => {
            e || t({}), e.get({}, (e => {
                "not_controllable" === e.levelOfControl && reject(new Error("Cannot control this setting")), t(e)
            }))
        }))
    }
    #d(e) {
        return new Promise((t => {
            e || t(), e.clear({}, (() => {
                t()
            }))
        }))
    }
}
const ContextState = {
        IncompatibleOS: "IncompatibleOS",
        NotInSession: "NotInSession",
        NativeSupportNotInstalled: "NativeSupportNotInstalled",
        CheckEngine: "CheckEngine",
        ChallengeSent: "ChallengeSent",
        MSG1Set: "MSG1Set",
        SessionKeySet: "SessionKeySet"
    },
    DataState = {
        Initial: "Initial",
        Frame0Processed: "Frame0Processed",
        DataProcessed: "DataProcessed"
    },
    RememberIC = {
        NoValueSet: "NoValueSet",
        UnknownPage: "UnknownPage",
        DoNotRemember: "DoNotRemember",
        RememberLoginAndPassword: "RememberLoginAndPassword"
    },
    WBSAutoFillFormTypeUndetermined = 0,
    WBSAutoFillFormTypeAutoFillableStandard = 1,
    WBSAutoFillFormTypeNonAutoFillable = 2,
    WBSAutoFillFormTypeAutoFillableLogin = 3,
    WBSAutoFillFormTypeNewAccount = 4,
    WBSAutoFillFormTypeChangePassword = 5;
var g_lastUpdatedPopupContentsState, g_portToBackgroundPage = null,
    g_appStoreURL = null,
    g_localizer = new Localizer;

function setControlText(e, t) {
    var n = document.getElementById(e);
    n && (n.innerHTML = g_localizer.getMessage(t), n.textContent)
}

function setMessageTitle(e) {
    var t = document.getElementById("divMessageBoardTitle");
    t && (t.innerHTML = g_localizer.getMessage(e), t.textContent)
}

function setMessageSubtitle(e) {
    var t = document.getElementById("divMessageBoardMessage");
    t && (t.innerHTML = g_localizer.getMessage(e), t.textContent)
}

function showMessage(e, t, n) {
    document.querySelector("#iCloudIconId").style.display = n ? "block" : "none", setMessageTitle(e), setMessageSubtitle(t);
    let o = document.getElementById("divMessageBoard");
    o.style.display = "block", n ? o.classList.add("logo-is-present") : o.classList.remove("logo-is-present")
}

function showMessageWithOpenPasswordManagerButton(e, t) {
    showMessage(e, t);
    let n = document.querySelector("#openPasswordManagerList");
    n.children.length || n.appendChild(listItemForOpenPasswordManager())
}

function SetOpeniC4WTitleText(e) {
    var t = document.getElementById("idOpeniC4WTitle");
    t && (t.innerHTML = g_localizer.getMessage(e), t.textContent)
}

function SetOpeniC4WButtonText(e) {
    var t = document.getElementById("idOpeniC4WButton");
    t && (t.innerHTML = g_localizer.getMessage(e), t.textContent)
}

function clearCredentialListContents() {
    let e = document.getElementById("credentialList");
    for (; e.firstChild;) e.removeChild(e.lastChild)
}

function tryToEstablishNativeConnectionInResponseToUserActivatingPopupAfterDelay() {
    setTimeout((function() {
        g_portToBackgroundPage.postMessage({
            subject: "tryToEstablishNativeConnectionInResponseToUserActivatingPopup"
        })
    }), 50)
}

function UpdatePopupContents(e) {
    if (!g_lastUpdatedPopupContentsState || g_lastUpdatedPopupContentsState !== ContextState.NativeSupportNotInstalled || e !== ContextState.NativeSupportNotInstalled) {
        g_lastUpdatedPopupContentsState = e;
        var t = document.getElementById("divPIN"),
            n = document.getElementById("divMessageBoard"),
            o = document.getElementById("divICs"),
            s = document.getElementById("divDownloadPage"),
            a = document.getElementById("divOpeniC4WPage");
        for (let e of[t, n, o, s, a]) e.style.display = "none";
        chrome.tabs.query({
            active: !0,
            currentWindow: !0
        }, (function(n) {
            switch (e) {
                case ContextState.IncompatibleOS:
                    document.querySelector("#openPasswordManagerList").remove(), showMessage("extName", "unsupportedOS", !0);
                    break;
                case ContextState.NativeSupportNotInstalled:
                    setControlText("downloadMessage", "downloadMessage"), g_appStoreURL ? setControlText("downloadButton", "downloadButton") : document.getElementById("downloadButton").display = "none", document.querySelector("#iCloudIconId").style.display = "block", s.classList.add("logo-is-present"), s.style.display = "block", tryToEstablishNativeConnectionInResponseToUserActivatingPopupAfterDelay();
                    break;
                case ContextState.NotInSession:
                    showMessage("extName", "GettingPasswords"), g_portToBackgroundPage.postMessage({
                        subject: "challengePIN"
                    });
                    break;
                case ContextState.CheckEngine:
                    SetOpeniC4WTitleText("CheckEngineMessage"), SetOpeniC4WButtonText("openiCloudForWindowsButtonText"), a.style.display = "block";
                    break;
                case ContextState.ChallengeSent:
                    break;
                case ContextState.MSG1Set:
                    setControlText("divPINTitle", "divPINTitle"), setControlText("divPINMessage", "divPINMessage"), mapOverPINFields((function(e) {
                        e.value = "", e.onkeydown = pinKeyHandler
                    })), t.style.display = "block", document.querySelector("#iCloudIconId").style.display = "block", document.getElementById("PIN0").focus();
                    break;
                case ContextState.SessionKeySet:
                    setMessageTitle("extName", "GettingPasswords"), setControlText("divICsMessage", "divICsMessage"), clearCredentialListContents(), chrome.webNavigation.getAllFrames({
                        tabId: n[0].id
                    }, (e => {
                        n[0].id, e.forEach(((e, t, o) => {
                            JSON.stringify(e);
                            const s = new URL(e.url),
                                a = s.protocol;
                            if ("http:" !== a && "https:" !== a) return e.url, void showMessageWithOpenPasswordManagerButton("GenericPopupTitle", "divNoPasswordsMessage");
                            try {
                                chrome.tabs.sendMessage(n[0].id, {
                                    from: "popup",
                                    subject: "getPageType",
                                    URL: s.hostname,
                                    tabId: n[0].id,
                                    frameId: e.frameId
                                }, {
                                    frameId: e.frameId
                                }, (function(t) {
                                    switch (t || (s.hostname, n[0].id, e.frameId, t = WBSAutoFillFormTypeUndetermined), s.hostname, n[0].id, e.frameId, humanReadableFormType(t), humanReadableFormType(t), t) {
                                        case WBSAutoFillFormTypeUndetermined:
                                        case WBSAutoFillFormTypeAutoFillableStandard:
                                        case WBSAutoFillFormTypeNonAutoFillable:
                                            showMessageWithOpenPasswordManagerButton("GenericPopupTitle", "divNoPasswordsMessage");
                                            break;
                                        case WBSAutoFillFormTypeAutoFillableLogin:
                                        case WBSAutoFillFormTypeChangePassword:
                                        case WBSAutoFillFormTypeNewAccount:
                                            showMessage("extName", "GettingPasswords"), g_portToBackgroundPage.postMessage({
                                                subject: "GetLoginNames4URL",
                                                hostname: s.hostname,
                                                tabId: n[0].id,
                                                frameId: e.frameId
                                            })
                                    }
                                }))
                            } catch (t) {
                                n[0].id, e.frameId, t.message
                            }
                        }))
                    }));
                    break;
                default:
                    t.style.display = "block"
            }
        }))
    }
}

function listItemMouseOverHandler(e) {
    let t = e.target.closest("li");
    if (!t) return;
    let n = t.closest("ul");
    if (n) {
        for (let e of n.querySelectorAll("li")) e.classList.remove("active");
        t.classList.add("active")
    }
}

function listItemMouseOutHandler(e) {
    let t = e.target.closest("li");
    t && t.classList.remove("active")
}

function updatePopupContents(e, t, n, o, s, a) {
    var i = document.getElementById("divPIN"),
        r = document.getElementById("divMessageBoard"),
        l = document.getElementById("divICs"),
        d = document.getElementById("divDownloadPage"),
        c = document.getElementById("divOpeniC4WPage");
    for (let e of[i, r, l, d, c]) e.style.display = "none";
    let u = document.getElementById("credentialList");
    switch (e) {
        case RememberIC.UnknownPage:
            showMessageWithOpenPasswordManagerButton("GenericPopupTitle", "divNoPasswordsMessage");
            break;
        case RememberIC.DoNotRemember:
            showMessageWithOpenPasswordManagerButton("divDoNotRememberTitle", "divDoNotRememberMessage");
            break;
        case RememberIC.RememberLoginAndPassword:
            {
                try {
                    chrome.tabs.sendMessage(t, {
                        from: "popup",
                        subject: "getPresetUserName",
                        tabId: t,
                        frameId: n
                    }, {
                        frameId: n
                    }, (function(a) {
                        JSON.stringify(a), document.querySelector("#iCloudIconId").style.display = "none", clearCredentialListContents();
                        const i = domainsForDisplayFromUsernamesAndDomains(o, s),
                            r = o.length;
                        for (var l = 0; l < r; l++) {
                            let r = document.createElement("li"),
                                d = s[l],
                                c = o[l],
                                g = i[l];
                            a.isPresetUserNamePresent && a.thePresetUserName === c && r.classList.add("haspresetusername"), r.classList.add("selectable"), r.classList.add("credential"), r.onmouseover = listItemMouseOverHandler, r.onmouseout = listItemMouseOutHandler, r.innerHTML = '<img src="images/key.svg"/>', isStringEmpty(c) ? r.innerHTML += `<p class="name no-user-name">${g_localizer.getMessage("NoUserName")}</p>` : r.innerHTML += `<p class="name">${c}</p>`, r.innerHTML += `<p class="website">${g}</p>`, r.addEventListener("click", (function() {
                                chrome.tabs.query({
                                    active: !0,
                                    currentWindow: !0
                                }, (function(o) {
                                    chrome.tabs.sendMessage(o[0].id, {
                                        from: "popup",
                                        subject: "fillLoginIntoForm",
                                        theRememberICSelection: e,
                                        tabId: t,
                                        frameId: n,
                                        theLogin: c,
                                        theURL: d
                                    }, {
                                        frameId: n
                                    }), window.close()
                                }))
                            })), u.appendChild(r)
                        }
                        u.appendChild(listItemForOpenPasswordManager())
                    }))
                } catch (e) {
                    e.message
                }
                let a = document.querySelector("#divMessageBoard .credential-list");
                a && a.remove(), l.style.display = "block"
            }
    }
}

function listItemForOpenPasswordManager() {
    let e = document.createElement("li");
    return e.classList.add("selectable"), e.classList.add("open-password-manager"), e.onmouseover = listItemMouseOverHandler, e.onmouseout = listItemMouseOutHandler, e.innerHTML = g_localizer.getMessage("divOpenPasswords"), e.addEventListener("click", openPasswordsButtonHandler), e
}

function mapOverPINFields(e) {
    return [document.getElementById("PIN0"), document.getElementById("PIN1"), document.getElementById("PIN2"), document.getElementById("PIN3"), document.getElementById("PIN4"), document.getElementById("PIN5")].map(e)
}

function pinKeyHandler(e) {
    let t = e.target,
        n = t ? t.previousElementSibling : null,
        o = t ? t.nextElementSibling : null,
        s = e.keyCode || e.charCode;
    switch (s) {
        case 46:
            t.value = "", e.preventDefault();
            break;
        case 8:
            return t.value = "", e.preventDefault(), n && (n.focus(), n.select()), !1;
        case 37:
            n && (e.preventDefault(), n.focus(), n.select());
            break;
        case 39:
            o && (e.preventDefault(), o.focus(), o.select());
            break;
        default:
            if (e.preventDefault(), !(s >= 48 && s <= 57 || s >= 96 && s <= 105)) {
                t.value = "";
                break
            }
            if (this.value = e.key, o) {
                o.focus();
                break
            }
            let a = mapOverPINFields((function(e) {
                return e.onkeydown = null, e.value.trim()
            })).join("");
            g_portToBackgroundPage.postMessage({
                subject: "userEnteredPIN",
                pin: a
            })
    }
}

function openPasswordsButtonHandler(e) {
    g_portToBackgroundPage.postMessage({
        subject: "openPasswordManager"
    }), window.close()
}
document.documentElement.addEventListener("keydown", (function(e) {
    let t = document.querySelector("li.active"),
        n = e.key,
        o = t ? t.previousElementSibling : null,
        s = t ? t.nextElementSibling : null;
    switch (n) {
        case "ArrowUp":
            if (!t) break;
            return e.preventDefault(), t.classList.remove("active"), o && o.classList.add("active"), !1;
        case "ArrowDown":
            if (e.preventDefault(), !t) {
                let e = document.querySelector("li");
                return e && e.classList.add("active"), !1
            }
            return s && (t.classList.remove("active"), s.classList.add("active")), !1;
        case "Enter":
            if (t) return e.preventDefault(), t.click(), !1
    }
})), window.onload = function() {
    let e = chrome.i18n.getUILanguage();
    Localizer.configureDocumentElementForLanguage(document.documentElement, e), (g_portToBackgroundPage = chrome.runtime.connect({
        name: "popup"
    })).onMessage.addListener((function(e, t, n) {
        switch (e.subject) {
            case "hello":
                g_localizer = new Localizer(e.capabilities);
                break;
            case "nativeConnectionStateChanged":
                g_appStoreURL = e.appStoreURL, UpdatePopupContents(e.state)
        }
    })), g_portToBackgroundPage.postMessage({
        subject: "getNativeConnectionState"
    })
}, document.getElementById("downloadButton").onclick = function(e) {
    chrome.tabs.create({
        url: g_appStoreURL
    })
}, document.getElementById("idOpeniC4WButton").onclick = function() {
    g_portToBackgroundPage.postMessage({
        subject: "startiCloudControlPanel"
    }), window.close()
}, document.getElementById("dismiss").onclick = function() {
    window.close()
}, chrome.runtime.onMessage.addListener(((e, t, n) => {
    if ("users" === e.subject) chrome.tabs.query({
        active: !0,
        currentWindow: !0
    }, (function(t) {
        t[0].id === e.tabId && updatePopupContents(e.theRememberICSelection, e.tabId, e.frameId, e.arrLoginNames, e.arrHLDs, e.arrDates)
    }));
    return Promise.resolve("Dummy response to keep the console quiet")
}));