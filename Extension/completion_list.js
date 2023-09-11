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
      return "ChangePassword";
    case WBSAutoFillFormTypeFoundTOTPURI:
      return "FoundTOTPUri"
  }
  return "Unrecognized"
}

function domainsForDisplayFromUsernamesAndDomains(e, t) {
  const n = e.length;
  let s = t.map((function (e) {
    return e.replace(/^(www|m)\./, "")
  })),
    o = [];
  for (var i = 0; i < n; i++) o.push([e[i], s[i]]);
  for (i = 0; i < n; i++) {
    let e = [];
    for (var a = i + 1; a < n; a++) o[i].join("\n") === o[a].join("\n") && (e.length || e.push(i), e.push(a));
    for (identicalIndex of e) s[identicalIndex] = t[identicalIndex]
  }
  return s
}

function urlIsBrowserURL(e) {
  const t = e.protocol;
  return "chrome:" === t || "edge:" === t || "about:" == t
}

function capabilitiesDeclaresMacOS(e) {
  try {
    return "macos" === e.operatingSystem.name
  } catch {
    return !1
  }
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
  constructor(e) { }
  getMessage(e, t, n) {
    const s = this.messageNamesToTry(e);
    for (let e of s) {
      let s;
      try {
        s = chrome.i18n.getMessage(e, t, n)
      } catch {
        s = chrome.i18n.getMessage(e, t)
      }
      if (s) return s
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
    this.#e = e, this.#s(), this.#o()
  }
  get enableInPageAutoFill() {
    return this.#t
  }
  set enableInPageAutoFill(e) {
    this.#t = e, this.#i()
  }
  get allowExtensionToControlAutoFillSettings() {
    return this.#n
  }
  set allowExtensionToControlAutoFillSettings(e) {
    this.#n = e, this.#a().then(this.#i.bind(this))
  }
  #a() {
    return this.#n ? this.attemptToControlBrowserAutoFillSettings() : this.clearControlOfBrowserAutoFillSettings()
  }
  attemptToControlBrowserAutoFillSettings() {
    return this.#e ? Promise.reject(new Error("This Settings instance does not allow writing browser settings")) : Promise.allSettled([this.#r(chrome.privacy.services.passwordSavingEnabled, !1), this.#r(chrome.privacy.services.autofillCreditCardEnabled, !1), this.#r(chrome.privacy.services.autofillAddressEnabled, !1)]).then((e => (this.#l(), e)))
  }
  clearControlOfBrowserAutoFillSettings() {
    return this.#e ? Promise.reject(new Error("This Settings instance does not allow writing browser settings")) : Promise.allSettled([this.#d(chrome.privacy.services.passwordSavingEnabled), this.#d(chrome.privacy.services.autofillCreditCardEnabled), this.#d(chrome.privacy.services.autofillAddressEnabled)]).then((e => (this.#l(), e)))
  }
  #s() {
    let e = new Promise((e => {
      chrome.storage.sync.get({
        enableInPageAutoFill: !0,
        allowExtensionToControlAutoFillSettings: !0
      }, (t => {
        this.#t = t.enableInPageAutoFill, this.#n = t.allowExtensionToControlAutoFillSettings, e()
      }))
    }));
    return this.#e || (e = e.then(this.#a.bind(this))), e.then(this.#l.bind(this))
  }
  #i() {
    return new Promise((e => {
      chrome.storage.sync.set({
        enableInPageAutoFill: this.#t,
        allowExtensionToControlAutoFillSettings: this.#n
      }, (() => {
        e()
      }))
    })).then(this.#l.bind(this))
  }
  #o() {
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
    return this.#g(e).then((n => n ? n.value === t ? {
      details: n,
      newValue: t
    } : new Promise(((s, o) => {
      e.set({
        value: t
      }, (() => {
        chrome.runtime.lastError && (chrome.runtime.lastError, chrome.runtime.lastError, o(chrome.runtime.lastError)), s({
          details: n,
          newValue: t
        })
      }))
    })) : {
      details: {},
      newValue: void 0
    }))
  }
  #g(e) {
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
  WBSAutoFillFormTypeChangePassword = 5,
  WBSAutoFillFormTypeFoundTOTPURI = 6;
let g_presetUserName, g_theRememberICSelection, g_tabId, g_frameId, g_pageURL, g_username, g_LoginNames = [],
  g_HLDs = [],
  g_arrDates = [],
  g_canFillOneTimeCodes = !1,
  g_oneTimeCodes = [],
  g_extensionSettings = new ExtensionSettings(!0);
const RequestDataState = {
  DoNotRequest: 0,
  WillOrAreRequesting: 1,
  RequestReturnedData: 2
};
let g_requestOneTimeCodesState = RequestDataState.DoNotRequest,
  g_requestLoginsState = RequestDataState.DoNotRequest,
  g_capabilities = null,
  g_localizer = new Localizer;

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
    s = t ? t.previousElementSibling : null,
    o = t ? t.nextElementSibling : null;
  switch (n) {
    case "ArrowUp":
      if (!t) break;
      return e.preventDefault && e.preventDefault(), t.classList.remove("active"), s && (s.classList.add("active"), listItemIsInView(s) || s.scrollIntoView(!0)), !1;
    case "ArrowDown":
      if (e.preventDefault && e.preventDefault(), !t) {
        let e = document.querySelector("li.selectable");
        return e && (e.classList.add("active"), listItemIsInView(e) || e.scrollIntoView(!0)), !1
      }
      return o && (t.classList.remove("active"), o.classList.add("active"), listItemIsInView(o) || o.scrollIntoView(!1)), !1;
    case "Enter":
      if (t) return e.preventDefault && e.preventDefault(), t.click(), !1
  }
}

function showChoices(e, t, n, s, o, i, a, r, l, d, g) {
  let c = document.getElementById("credentialList"),
    u = document.querySelector("li.active");
  clearCredentialListContents(), addOneTimeCodeItemsToCompletionList(d, c, u);
  const m = function () {
    const e = /(.*)@/.exec(l);
    return e ? e[1] : null
  }(),
    h = domainsForDisplayFromUsernamesAndDomains(i, a),
    p = i.length;
  let C = [],
    S = [];
  for (var f = 0; f < p; f++) {
    let o = a[f],
      r = i[f],
      d = h[f];
    const g = r.toLowerCase().startsWith(l.toLowerCase()),
      c = g || r.toLowerCase().startsWith(m ? m.toLowerCase() : null);
    if (!g && !c) continue;
    let u = newCredentialListItem();
    e && e === r && u.classList.add("haspresetusername");
    let p = "";
    isStringEmpty(r) ? p += `<div style="float: left"><p class="name no-user-name">${g_localizer.getMessage("NoUserName")}</p>` : p += `<div style="float: left"><p class="name">${r}</p>`, p += `<br><p class="website">${d}</p></div>`, u.innerHTML += p, u.addEventListener("click", (function () {
      g_portToBackgroundPage.postMessage({
        from: "completionList",
        subject: "fillLoginIntoForm",
        theRememberICSelection: t,
        tabId: n,
        frameId: s,
        theLogin: r,
        theURL: o
      })
    })), g ? C.push(u) : c && S.push(u)
  }
  for (const e of C) c.appendChild(e);
  for (const e of S) c.appendChild(e);
  if (c.children.length || !l.length) {
    const e = !c.children.length;
    c.appendChild(newOpenPasswordManagerButtonListItem(e))
  }
  u && c.children.length && !g && c.children[0].classList.add("active"), 1 === c.children.length ? document.body.style.overflowY = "hidden" : document.body.style.overflowY = "initial", platformScrollbarWidth() > 0 && document.body.classList.add("visibleScroller"), c.children.length > 0 && c.insertBefore(iCloudPasswordsListItem(), c.children[0]), resizeCompletionList(calculateFittingSizeOfCompletionList(c))
}

function addOneTimeCodeItemsToCompletionList(e, t, n) {
  for (let n of e) {
    let e = newCredentialListItem();
    if ("totp" === n.source) {
      let t = n.domain ? g_localizer.getMessage("totpVerificationCodeNameWithDomain", [n.domain]) : g_localizer.getMessage("totpVerificationCodeName");
      e.innerHTML += `<p class="name">${t}</p>`;
      let s = n.username,
        o = s || n.code;
      e.innerHTML += `<br><p class="website">${o}</p>`
    }
    e.addEventListener("click", (() => {
      g_portToBackgroundPage.postMessage({
        tabId: g_tabId,
        frameId: g_frameId,
        subject: "fillOneTimeCodeIntoForm",
        oneTimeCode: n
      })
    })), t.appendChild(e)
  }
}

function populateCompletionListWithCachedContentIfReady() {
  g_requestOneTimeCodesState !== RequestDataState.WillOrAreRequesting && g_requestLoginsState !== RequestDataState.WillOrAreRequesting && showChoices(g_presetUserName, g_theRememberICSelection, g_tabId, g_frameId, g_pageURL, g_LoginNames, g_HLDs, g_arrDates, g_username, g_oneTimeCodes, !1)
}

function gotOneTimeCodeChoices(e) {
  g_oneTimeCodes = e, g_requestOneTimeCodesState = RequestDataState.RequestReturnedData, populateCompletionListWithCachedContentIfReady()
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
  if (!g_extensionSettings.enableInPageAutoFill) return {
    width: 0,
    height: 0
  };
  e.classList.add("inline");
  let t = 0;
  for (let n of e.children) {
    getComputedStyle(n);
    let e = Math.ceil(parseFloat(n.getBoundingClientRect().width));
    e > t && (t = e)
  }
  e.classList.remove("inline");
  let n = e.offsetHeight,
    s = 0;
  if (e.children.length > 5) {
    n = parseFloat(e.children[0].getBoundingClientRect().height) + 4.5 * parseFloat(e.children[1].getBoundingClientRect().height), s = scrollbarWidth()
  }
  return {
    width: Math.max(t + s, 200),
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

function UpdateUserContents(e, t, n, s, o, i) {
  switch (clearCredentialListContents(), e) {
    case RememberIC.UnknownPage:
    case RememberIC.RememberLoginAndPassword: {
      g_theRememberICSelection = e, g_tabId = t, g_frameId = n, g_LoginNames = s, g_HLDs = o, g_arrDates = i;
      const a = new URLSearchParams(document.location.search).get("username");
      g_username = a, g_requestLoginsState = RequestDataState.RequestReturnedData, populateCompletionListWithCachedContentIfReady(), divICs.style.display = "block"
    }
  }
}

function newCredentialListItem() {
  let e = document.createElement("li");
  return e.classList.add("selectable"), e.classList.add("credential"), e.onmouseover = listItemMouseOverHandler, e.onmouseout = listItemMouseOutHandler, e.innerHTML = '<img src="images/key.svg"/>', e
}

function selectableAndHoverableListItem() {
  let e = document.createElement("li");
  return e.classList.add("selectable"), e.onmouseover = listItemMouseOverHandler, e.onmouseout = listItemMouseOutHandler, e
}

function newOpenPasswordManagerButtonListItem(e) {
  let t = selectableAndHoverableListItem();
  return t.classList.add("open-password-manager"), t.innerHTML = e ? `<span><p class="title">${g_localizer.getMessage("divOpenPasswords")}</p><p class="subtitle">${g_localizer.getMessage("divOpenPasswordsSubtitle")}</p></span>` : `<span>${g_localizer.getMessage("divOpenPasswords")}</span>`, t.addEventListener("click", (function () {
    g_portToBackgroundPage.postMessage({
      tabId: g_tabId,
      frameId: g_frameId,
      subject: "openPasswordManagerAndDismissCompletionList"
    })
  })), t
}

function iCloudPasswordsListItem() {
  let e = document.createElement("li");
  return e.classList.add("iCloudPasswords"), e.innerHTML = `<span><img src="images/PasswordsToolbar_icon32.png" class="fromiCloudPasswordsMenuIcon">${g_localizer.getMessage("extName")}</span>`, e
}

function clearCredentialListContents() {
  document.getElementById("needToPairMessageBox").style.display = "none";
  let e = document.getElementById("credentialList");
  for (; e.firstChild;) e.removeChild(e.lastChild)
}

function updateCompletionList(e, t, n) {
  if (e === ContextState.NotInSession) {
    document.getElementById("needToPairTitle").innerHTML = g_localizer.getMessage("enableAutoFillPasswordsTitle"), document.getElementById("needToPairMessage").innerHTML = g_localizer.getMessage("enableAutoFillPasswordsMessage");
    let e = document.getElementById("needToPairMessageBox");
    e.style.display = "flex";
    const t = e.getBoundingClientRect();
    return void resizeCompletionList({
      width: t.width,
      height: t.height
    })
  }
  g_requestOneTimeCodesState = RequestDataState.DoNotRequest, g_requestLoginsState = RequestDataState.DoNotRequest;
  let s = n ? n.AutoFillFormType : WBSAutoFillFormTypeUndetermined;
  switch (g_canFillOneTimeCodes && t && t.ControlLooksLikeOneTimeCodeField && (g_requestOneTimeCodesState = RequestDataState.WillOrAreRequesting), s) {
    case WBSAutoFillFormTypeAutoFillableLogin:
      g_requestLoginsState = RequestDataState.WillOrAreRequesting;
      break;
    case WBSAutoFillFormTypeChangePassword:
    case WBSAutoFillFormTypeNewAccount:
      if (t.ControlUniqueID === n.UsernameElementUniqueID || t.ControlUniqueID === n.OldPasswordElementUniqueID) {
        g_requestLoginsState = RequestDataState.WillOrAreRequesting;
        break
      }
      if (t.ControlUniqueID === n.PasswordElementUniqueID || t.ControlUniqueID === n.ConfirmPasswordElementUniqueID) return void showChoices(g_presetUserName, g_theRememberICSelection, g_tabId, g_frameId, g_pageURL, [], [], [], "", [], !0);
    default:
      (t.ControlIsSecureTextField || t.ControlClaimsToBeUsernameViaAutocompleteAttribute || t.ControlIsLabeledUsernameField) && (g_hostname, g_requestLoginsState = RequestDataState.WillOrAreRequesting)
  }
  g_requestOneTimeCodesState === RequestDataState.WillOrAreRequesting && g_portToBackgroundPage.postMessage({
    subject: "getOneTimeCodes",
    tabId: g_tabId,
    frameId: g_frameId,
    username: g_presetUserName
  }), g_requestLoginsState === RequestDataState.WillOrAreRequesting && g_portToBackgroundPage.postMessage({
    subject: "GetLoginNames4URL",
    hostname: g_hostname,
    tabId: g_tabId,
    frameId: g_frameId
  })
}
document.documentElement.addEventListener("keydown", keyHandler), window.onload = function () {
  Localizer.configureDocumentElementForLanguage(document.documentElement, chrome.i18n.getUILanguage()), g_portToBackgroundPage = chrome.runtime.connect({
    name: "completionList"
  }), g_portToBackgroundPage.onMessage.addListener((function (e) {
    switch (e.subject) {
      case "hello":
        g_capabilities = e.capabilities, g_localizer = new Localizer(e.capabilities);
        break;
      case "replyForGetContextAndMetadataFromContent":
        g_tabId = e.tabId, g_frameId = e.frameId, g_pageURL = e.url, g_hostname = e.hostname, g_presetUserName = e.presetUserName, g_canFillOneTimeCodes = e.canFillOneTimeCodes;
        updateCompletionList(e.state, e.textFieldMetadata, e.formMetadata);
        break;
      case "users":
        UpdateUserContents(e.theRememberICSelection, e.tabId, e.frameId, e.arrLoginNames, e.arrHLDs, e.arrDates);
        break;
      case "oneTimeCodes":
        gotOneTimeCodeChoices(e.oneTimeCodes);
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
        showChoices(g_presetUserName, g_theRememberICSelection, g_tabId, g_frameId, g_pageURL, g_LoginNames, g_HLDs, g_arrDates, e.username, g_oneTimeCodes, !1)
    }
  })), g_portToBackgroundPage.postMessage({
    subject: "getContextAndMetadataFromContent"
  })
};