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
  let o = t.map((function (e) {
    return e.replace(/^(www|m)\./, "")
  })),
    i = [];
  for (var r = 0; r < n; r++) i.push([e[r], o[r]]);
  for (r = 0; r < n; r++) {
    let e = [];
    for (var s = r + 1; s < n; s++) i[r].join("\n") === i[s].join("\n") && (e.length || e.push(r), e.push(s));
    for (identicalIndex of e) o[identicalIndex] = t[identicalIndex]
  }
  return o
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
    this.#e = e, this.#o(), this.#i()
  }
  get enableInPageAutoFill() {
    return this.#t
  }
  set enableInPageAutoFill(e) {
    this.#t = e, this.#r()
  }
  get allowExtensionToControlAutoFillSettings() {
    return this.#n
  }
  set allowExtensionToControlAutoFillSettings(e) {
    this.#n = e, this.#s().then(this.#r.bind(this))
  }
  #s() {
    return this.#n ? this.attemptToControlBrowserAutoFillSettings() : this.clearControlOfBrowserAutoFillSettings()
  }
  attemptToControlBrowserAutoFillSettings() {
    return this.#e ? Promise.reject(new Error("This Settings instance does not allow writing browser settings")) : Promise.allSettled([this.#l(chrome.privacy.services.passwordSavingEnabled, !1), this.#l(chrome.privacy.services.autofillCreditCardEnabled, !1), this.#l(chrome.privacy.services.autofillAddressEnabled, !1)]).then((e => (this.#a(), e)))
  }
  clearControlOfBrowserAutoFillSettings() {
    return this.#e ? Promise.reject(new Error("This Settings instance does not allow writing browser settings")) : Promise.allSettled([this.#g(chrome.privacy.services.passwordSavingEnabled), this.#g(chrome.privacy.services.autofillCreditCardEnabled), this.#g(chrome.privacy.services.autofillAddressEnabled)]).then((e => (this.#a(), e)))
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
    return this.#e || (e = e.then(this.#s.bind(this))), e.then(this.#a.bind(this))
  }
  #r() {
    return new Promise((e => {
      chrome.storage.sync.set({
        enableInPageAutoFill: this.#t,
        allowExtensionToControlAutoFillSettings: this.#n
      }, (() => {
        e()
      }))
    })).then(this.#a.bind(this))
  }
  #i() {
    this.#e || (chrome.privacy.services.passwordSavingEnabled && chrome.privacy.services.passwordSavingEnabled.onChange.addListener((e => {
      this.#a()
    })), chrome.privacy.services.autofillCreditCardEnabled && chrome.privacy.services.autofillCreditCardEnabled.onChange.addListener((e => {
      this.#a()
    })), chrome.privacy.services.autofillAddressEnabled && chrome.privacy.services.autofillAddressEnabled.onChange.addListener((e => {
      this.#a()
    })))
  }
  #a() {
    const e = new CustomEvent("settingsChanged", {
      detail: {
        enableInPageAutoFill: this.#t
      }
    });
    this.eventTarget.dispatchEvent(e)
  }
  #l(e, t) {
    return this.#c(e).then((n => n ? n.value === t ? {
      details: n,
      newValue: t
    } : new Promise(((o, i) => {
      e.set({
        value: t
      }, (() => {
        chrome.runtime.lastError && (chrome.runtime.lastError, chrome.runtime.lastError, i(chrome.runtime.lastError)), o({
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
  #g(e) {
    return new Promise((t => {
      e || t(), e.clear({}, (() => {
        t()
      }))
    }))
  }
}
let extensionSettings = new ExtensionSettings;

function localizeSettingsPage() {
  document.title = chrome.i18n.getMessage("optionsTitle"), document.querySelectorAll(".localizedElement").forEach((e => {
    const t = e.dataset.localizedMessage;
    if (!t) return;
    const n = chrome.i18n.getMessage(t);
    e.innerHTML = n
  }))
}
window.addEventListener("DOMContentLoaded", (e => {
  Localizer.configureDocumentElementForLanguage(document.documentElement, chrome.i18n.getUILanguage()), localizeSettingsPage();
  const setUpCheckbox = (e, t, n) => {
    const o = document.getElementById(e);
    o.checked = t, o.addEventListener("change", (e => {
      const t = e.target.checked;
      n(t)
    }))
  };
  setUpCheckbox("enable-inpage-autofill-checkbox", extensionSettings.enableInPageAutoFill, (e => {
    extensionSettings.enableInPageAutoFill = e
  })), setUpCheckbox("allow-extention-to-control-autofill-checkbox", extensionSettings.allowExtensionToControlAutoFillSettings, (e => {
    extensionSettings.allowExtensionToControlAutoFillSettings = e
  })), extensionSettings.eventTarget.addEventListener("settingsChanged", (e => {
    const t = e.detail;
    void 0 !== t.enableInPageAutoFill && (document.getElementById("enable-inpage-autofill-checkbox").checked = t.enableInPageAutoFill), void 0 !== t.allowExtensionToControlAutoFillSettings && (document.getElementById("allow-extention-to-control-autofill-checkbox").checked = t.allowExtensionToControlAutoFillSettings)
  }))
}));