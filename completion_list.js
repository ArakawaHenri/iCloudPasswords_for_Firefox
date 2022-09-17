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
let g_presetUserName, g_theRememberICSelection, g_tabId, g_frameId, g_LoginNames, g_HLDs, g_arrDates, g_canFillOneTimeCodes;

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

function listItemIsInView(e) {
    let t = e.getBoundingClientRect();
    return t.top >= 0 && t.bottom <= window.innerHeight
}

function keyHandler(e) {
    let t = document.querySelector("li.active"),
        n = e.key,
        o = t ? t.previousElementSibling : null,
        s = t ? t.nextElementSibling : null;
    switch (n) {
        case "ArrowUp":
            if (!t) break;
            return e.preventDefault && e.preventDefault(), t.classList.remove("active"), o && (o.classList.add("active"), listItemIsInView(o) || o.scrollIntoView(!0)), !1;
        case "ArrowDown":
            if (e.preventDefault && e.preventDefault(), !t) {
                let e = document.querySelector("li");
                return e && (e.classList.add("active"), listItemIsInView(e) || e.scrollIntoView(!0)), !1
            }
            return s && (t.classList.remove("active"), s.classList.add("active"), listItemIsInView(s) || s.scrollIntoView(!1)), !1;
        case "Enter":
            if (t) return e.preventDefault && e.preventDefault(), t.click(), !1
    }
}

function showLoginChoices(e, t, n, o, s, a, i, r) {
    let l = document.getElementById("credentialList"),
        d = document.querySelector("li.active");
    clearCredentialListContents();
    const c = function() {
            const e = /(.*)@/.exec(r);
            return e ? e[1] : null
        }(),
        m = domainsForDisplayFromUsernamesAndDomains(s, a),
        g = s.length;
    let u = [],
        p = [];
    for (var h = 0; h < g; h++) {
        let i = a[h],
            l = s[h],
            d = m[h];
        const g = l.toLowerCase().startsWith(r.toLowerCase()),
            I = g || l.toLowerCase().startsWith(c ? c.toLowerCase() : null);
        if (!g && !I) continue;
        let f = newCredentialListItem();
        e && e === l && f.classList.add("haspresetusername");
        let b = "";
        isStringEmpty(l) ? b += `<div style="float: left"><p class="name no-user-name">${chrome.i18n.getMessage("NoUserName")}</p>` : b += `<div style="float: left"><p class="name">${l}</p>`, b += `<br><p class="website">${d}</p></div>`, f.innerHTML += b, f.addEventListener("click", (function() {
            g_portToBackgroundPage.postMessage({
                from: "completionList",
                subject: "fillLoginIntoForm",
                theRememberICSelection: t,
                tabId: n,
                frameId: o,
                theLogin: l,
                theURL: i
            })
        })), g ? u.push(f) : I && p.push(f)
    }
    for (const e of u) l.appendChild(e);
    for (const e of p) l.appendChild(e);
    if (l.children.length || !r.length) {
        const e = !l.children.length;
        l.appendChild(newPasswordsButtonListItem(e))
    }
    d && l.children.length && l.children[0].classList.add("active"), 1 === l.children.length ? document.body.style.overflowY = "hidden" : document.body.style.overflowY = "initial", platformScrollbarWidth() > 0 && document.body.classList.add("visibleScroller"), resizeCompletionList(calculateFittingSizeOfCompletionList(l))
}

function showOneTimeCodeChoices(e) {
    let t = document.getElementById("credentialList"),
        n = document.querySelector("li.active");
    clearCredentialListContents();
    for (let n of e) {
        let e = newCredentialListItem();
        switch (n.source) {
            case "totp":
                let t = n.domain ? chrome.i18n.getMessage("totpVerificationCodeNameWithDomain", [n.domain]) : chrome.i18n.getMessage("totpVerificationCodeName");
                e.innerHTML += `<p class="name">${t}</p>`;
                let o = n.username,
                    s = o || n.code;
                e.innerHTML += `<br><p class="website">${s}</p>`
        }
        n.code && e.setAttribute("data-code", n.code), e.addEventListener("click", (() => {
            g_portToBackgroundPage.postMessage({
                tabId: g_tabId,
                frameId: g_frameId,
                subject: "fillOneTimeCodeIntoForm",
                oneTimeCode: n
            })
        })), t.appendChild(e)
    }
    t.appendChild(newPasswordsButtonListItem(!1)), n && t.children.length && t.children[0].classList.add("active"), resizeCompletionList(calculateFittingSizeOfCompletionList(t))
}

function scrollbarWidth() {
    return platformScrollbarWidth() > 0 ? 18 : 0
}

function platformScrollbarWidth() {
    const e = document.createElement("div");
    e.style.visibility = "hidden", e.style.overflow = "scroll", document.body.appendChild(e);
    const t = document.createElement("div");
    e.appendChild(t);
    const n = e.offsetWidth - t.offsetWidth;
    return e.parentNode.removeChild(e), n
}

function calculateFittingSizeOfCompletionList(e) {
    e.classList.add("inline");
    let t = 0;
    for (let n of e.children) {
        getComputedStyle(n);
        let e = Math.ceil(parseFloat(n.getBoundingClientRect().width));
        e > t && (t = e)
    }
    e.classList.remove("inline");
    let n = e.offsetHeight,
        o = 0;
    if (e.children.length > 5) {
        n = 4.5 * parseFloat(e.children[0].getBoundingClientRect().height), o = scrollbarWidth()
    }
    return {
        width: Math.max(t + o, 200),
        height: n
    }
}

function resizeCompletionList(e) {
    g_portToBackgroundPage.postMessage({
        subject: "resizeCompletionList",
        tabId: g_tabId,
        frameId: g_frameId,
        height: e.height,
        width: e.width
    })
}

function UpdateUserContents(e, t, n, o, s, a) {
    switch (clearCredentialListContents(), e) {
        case RememberIC.UnknownPage:
        case RememberIC.RememberLoginAndPassword:
            {
                g_theRememberICSelection = e, g_tabId = t, g_frameId = n, g_LoginNames = o, g_HLDs = s, g_arrDates = a;
                const i = new URLSearchParams(document.location.search).get("username");
                showLoginChoices(g_presetUserName, e, t, n, o, s, a, i), divICs.style.display = "block"
            }
    }
}

function newCredentialListItem() {
    let e = document.createElement("li");
    return e.classList.add("selectable"), e.classList.add("credential"), e.onmouseover = listItemMouseOverHandler, e.onmouseout = listItemMouseOutHandler, e.innerHTML = '<img src="images/key.svg"/>', e
}

function newPasswordsButtonListItem(e) {
    let t = document.createElement("li");
    return t.classList.add("selectable"), t.classList.add("open-password-manager"), t.onmouseover = listItemMouseOverHandler, t.onmouseout = listItemMouseOutHandler, t.innerHTML = e ? `<span><p class="title">${chrome.i18n.getMessage("divOpenPasswords")}</p><p class="subtitle">${chrome.i18n.getMessage("divOpenPasswordsSubtitle")}</p></span>` : `<span>${chrome.i18n.getMessage("divOpenPasswords")}</span>`, t.addEventListener("click", (function() {
        g_portToBackgroundPage.postMessage({
            tabId: g_tabId,
            frameId: g_frameId,
            subject: "openPasswordManagerAndDismissCompletionList"
        })
    })), t
}

function clearCredentialListContents() {
    document.getElementById("needToPairMessageBox").style.display = "none";
    let e = document.getElementById("credentialList");
    for (; e.firstChild;) e.removeChild(e.lastChild)
}

function updateCompletionList(e, t, n) {
    if (e === ContextState.NotInSession) {
        document.getElementById("needToPairTitle").innerHTML = chrome.i18n.getMessage("enableAutoFillPasswordsTitle"), document.getElementById("needToPairMessage").innerHTML = chrome.i18n.getMessage("enableAutoFillPasswordsMessage");
        let e = document.getElementById("needToPairMessageBox");
        e.style.display = "flex";
        const t = e.getBoundingClientRect();
        return void resizeCompletionList({
            width: t.width,
            height: t.height
        })
    }
    let o = n ? n.AutoFillFormType : WBSAutoFillFormTypeUndetermined;
    if (g_canFillOneTimeCodes && t && t.ControlLooksLikeOneTimeCodeField) g_portToBackgroundPage.postMessage({
        subject: "getOneTimeCodes",
        tabId: g_tabId,
        frameId: g_frameId,
        username: g_presetUserName
    });
    else switch (o) {
        case WBSAutoFillFormTypeAutoFillableLogin:
            g_portToBackgroundPage.postMessage({
                subject: "GetLoginNames4URL",
                hostname: g_hostname,
                tabId: g_tabId,
                frameId: g_frameId
            });
            break;
        case WBSAutoFillFormTypeChangePassword:
        case WBSAutoFillFormTypeNewAccount:
            if (t.ControlUniqueID === n.UsernameElementUniqueID || t.ControlUniqueID === n.OldPasswordElementUniqueID) {
                g_portToBackgroundPage.postMessage({
                    subject: "GetLoginNames4URL",
                    hostname: g_hostname,
                    tabId: g_tabId,
                    frameId: g_frameId
                });
                break
            }
            if (t.ControlUniqueID === n.PasswordElementUniqueID || t.ControlUniqueID === n.ConfirmPasswordElementUniqueID) {
                showLoginChoices(g_presetUserName, g_theRememberICSelection, g_tabId, g_frameId, [], [], [], "");
                break
            }
        default:
            (t.ControlIsSecureTextField || t.ControlClaimsToBeUsernameViaAutocompleteAttribute) && (g_hostname, g_portToBackgroundPage.postMessage({
                subject: "GetLoginNames4URL",
                hostname: g_hostname,
                tabId: g_tabId,
                frameId: g_frameId
            }))
    }
}
document.documentElement.addEventListener("keydown", keyHandler), window.onload = function() {
    let e = chrome.i18n.getUILanguage();
    switch (e) {
        case "he":
        case "ar":
        case "fa":
            document.documentElement.setAttribute("dir", "rtl"), document.documentElement.setAttribute("lang", e)
    }
    g_portToBackgroundPage = chrome.runtime.connect({
        name: "completionList"
    }), g_portToBackgroundPage.onMessage.addListener((function(e) {
        switch (e.subject) {
            case "replyForGetContextAndMetadataFromContent":
                g_tabId = e.tabId, g_frameId = e.frameId, g_hostname = e.hostname, g_presetUserName = e.presetUserName, g_canFillOneTimeCodes = e.canFillOneTimeCodes;
                updateCompletionList(e.state, e.textFieldMetadata, e.formMetadata);
                break;
            case "users":
                UpdateUserContents(e.theRememberICSelection, e.tabId, e.frameId, e.arrLoginNames, e.arrHLDs, e.arrDates);
                break;
            case "oneTimeCodes":
                showOneTimeCodeChoices(e.oneTimeCodes);
                break;
            case "keydown":
                keyHandler(e.event);
                break;
            case "typedUserNameChanged":
                if ("flex" === document.getElementById("needToPairMessageBox").style.display) {
                    g_portToBackgroundPage.postMessage({
                        tabId: g_tabId,
                        frameId: g_frameId,
                        subject: "dismissCompletionList"
                    });
                    break
                }
                if (!g_LoginNames.length) {
                    g_portToBackgroundPage.postMessage({
                        tabId: g_tabId,
                        frameId: g_frameId,
                        subject: "dismissCompletionList"
                    });
                    break
                }
                showLoginChoices(g_presetUserName, g_theRememberICSelection, g_tabId, g_frameId, g_LoginNames, g_HLDs, g_arrDates, e.username)
        }
    })), g_portToBackgroundPage.postMessage({
        subject: "getContextAndMetadataFromContent"
    })
};