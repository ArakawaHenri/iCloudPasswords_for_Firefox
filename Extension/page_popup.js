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
    let o = t.map((function (e) {
        return e.replace(/^(www|m)\./, "")
    })),
        s = [];
    for (var a = 0; a < n; a++) s.push([e[a], o[a]]);
    for (a = 0; a < n; a++) {
        let e = [];
        for (var r = a + 1; r < n; r++) s[a].join("\n") === s[r].join("\n") && (e.length || e.push(a), e.push(r));
        for (identicalIndex of e) o[identicalIndex] = t[identicalIndex]
    }
    return o
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
    g_appStoreURL = null;

function setControlText(e, t) {
    var n = document.getElementById(e);
    n && (n.innerHTML = chrome.i18n.getMessage(t), n.textContent)
}

function setMessageTitle(e) {
    var t = document.getElementById("divMessageBoardTitle");
    t && (t.innerHTML = chrome.i18n.getMessage(e), t.textContent)
}

function setMessageSubtitle(e) {
    var t = document.getElementById("divMessageBoardMessage");
    t && (t.innerHTML = chrome.i18n.getMessage(e), t.textContent)
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
    t && (t.innerHTML = chrome.i18n.getMessage(e), t.textContent)
}

function SetOpeniC4WButtonText(e) {
    var t = document.getElementById("idOpeniC4WButton");
    t && (t.innerHTML = chrome.i18n.getMessage(e), t.textContent)
}

function clearCredentialListContents() {
    let e = document.getElementById("credentialList");
    for (; e.firstChild;) e.removeChild(e.lastChild)
}

function tryToEstablishNativeConnectionInResponseToUserActivatingPopupAfterDelay() {
    setTimeout((function () {
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
        for (let e of [t, n, o, s, a]) e.style.display = "none";
        chrome.tabs.query({
            active: !0,
            currentWindow: !0
        }, (function (n) {
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
                    setControlText("divPINTitle", "divPINTitle"), setControlText("divPINMessage", "divPINMessage"), t.style.display = "block", document.querySelector("#iCloudIconId").style.display = "block", document.getElementById("PIN0").focus();
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
                                }, (function (t) {
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
    var r = document.getElementById("divPIN"),
        i = document.getElementById("divMessageBoard"),
        l = document.getElementById("divICs"),
        d = document.getElementById("divDownloadPage"),
        c = document.getElementById("divOpeniC4WPage");
    for (let e of [r, i, l, d, c]) e.style.display = "none";
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
                    }, (function (a) {
                        JSON.stringify(a), document.querySelector("#iCloudIconId").style.display = "none", clearCredentialListContents();
                        const r = domainsForDisplayFromUsernamesAndDomains(o, s),
                            i = o.length;
                        for (var l = 0; l < i; l++) {
                            let i = document.createElement("li"),
                                d = s[l],
                                c = o[l],
                                m = r[l];
                            a.isPresetUserNamePresent && a.thePresetUserName === c && i.classList.add("haspresetusername"), i.classList.add("selectable"), i.classList.add("credential"), i.onmouseover = listItemMouseOverHandler, i.onmouseout = listItemMouseOutHandler, i.innerHTML = '<img src="images/key.svg"/>', isStringEmpty(c) ? i.innerHTML += `<p class="name no-user-name">${chrome.i18n.getMessage("NoUserName")}</p>` : i.innerHTML += `<p class="name">${c}</p>`, i.innerHTML += `<p class="website">${m}</p>`, i.addEventListener("click", (function () {
                                chrome.tabs.query({
                                    active: !0,
                                    currentWindow: !0
                                }, (function (o) {
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
                            })), u.appendChild(i)
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
    return e.classList.add("selectable"), e.classList.add("open-password-manager"), e.onmouseover = listItemMouseOverHandler, e.onmouseout = listItemMouseOutHandler, e.innerHTML = chrome.i18n.getMessage("divOpenPasswords"), e.addEventListener("click", openPasswordsButtonHandler), e
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
            let a = mapOverPINFields((function (e) {
                return e.value.trim()
            })).join("");
            g_portToBackgroundPage.postMessage({
                subject: "userEnteredPIN",
                pin: a
            }), setTimeout((function () {
                mapOverPINFields((function (e) {
                    e.value = ""
                }))
            }), 0)
    }
}

function openPasswordsButtonHandler(e) {
    g_portToBackgroundPage.postMessage({
        subject: "openPasswordManager"
    }), window.close()
}
document.documentElement.addEventListener("keydown", (function (e) {
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
})), window.onload = function () {
    let e = chrome.i18n.getUILanguage();
    switch (e) {
        case "he":
        case "ar":
        case "fa":
            document.documentElement.setAttribute("dir", "rtl"), document.documentElement.setAttribute("lang", e)
    }(g_portToBackgroundPage = chrome.runtime.connect({
        name: "popup"
    })).onMessage.addListener((function (e, t, n) {
        switch (e.subject) {
            case "nativeConnectionStateChanged":
                g_appStoreURL = e.appStoreURL, UpdatePopupContents(e.state)
        }
    })), g_portToBackgroundPage.postMessage({
        subject: "getNativeConnectionState"
    })
}, mapOverPINFields((function (e) {
    e.onkeydown = pinKeyHandler
})), document.getElementById("downloadButton").onclick = function (e) {
    chrome.tabs.create({
        url: g_appStoreURL
    })
}, document.getElementById("idOpeniC4WButton").onclick = function () {
    g_portToBackgroundPage.postMessage({
        subject: "startiCloudControlPanel"
    }), window.close()
}, document.getElementById("dismiss").onclick = function () {
    window.close()
}, chrome.runtime.onMessage.addListener(((e, t, n) => {
    switch (e.subject) {
        case "users":
            chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, (function (t) {
                t[0].id === e.tabId && updatePopupContents(e.theRememberICSelection, e.tabId, e.frameId, e.arrLoginNames, e.arrHLDs, e.arrDates)
            }))
    }
    return Promise.resolve("Dummy response to keep the console quiet")
}));