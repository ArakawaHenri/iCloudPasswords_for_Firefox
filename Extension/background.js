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
    const s = e.length;
    let a = t.map((function (e) {
        return e.replace(/^(www|m)\./, "")
    })),
        o = [];
    for (var r = 0; r < s; r++) o.push([e[r], a[r]]);
    for (r = 0; r < s; r++) {
        let e = [];
        for (var n = r + 1; n < s; n++) o[r].join("\n") === o[n].join("\n") && (e.length || e.push(r), e.push(n));
        for (identicalIndex of e) a[identicalIndex] = t[identicalIndex]
    }
    return a
}
const ErrCodes = {
    ErrSuccess: "Success",
    InvalidMessage: "InvalidMessage",
    UnexpectedMessage: "UnexpectedMessage",
    InvalidSyntax: "InvalidSyntax",
    InvalidSessionKey: "InvalidSessionKey",
    CryptoError: "CryptoError",
    InvalidUserName: "InvalidUserName"
};
class SecretSessionError extends Error {
    constructor(e, t = null) {
        super(t), this.code = e
    }
}
const SecretSessionVersion = {
    SRPWithOldVerification: 0,
    SRPWithRFCVerification: 1
},
    scriptVersion = "1.0",
    appVersion = "1.0",
    MSGTypes = {
        MSG0: 0,
        MSG1: 1,
        MSG2: 2,
        MSG3: 3
    };
SecretSession = function (e) {
    this.shouldUseBase64 = !1, e.shouldUseBase64 && (this.shouldUseBase64 = e.shouldUseBase64), this.protocolVersion = SecretSessionVersion.SRPWithOldVerification, e.secretSessionVersion && (this.protocolVersion = e.secretSessionVersion), this.grp = sjcl.keyexchange.srp.knownGroup(3072), this.keyLen = 128, this.tagLen = 128, this.setUpSRP()
}, SecretSession.prototype = {
    createSMSG: function (e) {
        if ("object" == typeof e) try {
            e = JSON.stringify(e)
        } catch (e) {
            return ErrCodes.InvalidMessage
        }
        const t = sjcl.codec.utf8String.toBits(e),
            s = this.encrypt(t);
        if ("string" == typeof s) return s;
        let a = null;
        try {
            a = JSON.stringify({
                TID: this.bitsToString(this.I.toBits()),
                SDATA: this.bitsToString(s, !1)
            })
        } catch (e) {
            return ErrCodes.InvalidMessage
        }
        return a
    },
    parseSMSG: function (e) {
        let t = e;
        if ("string" == typeof t) try {
            t = JSON.parse(e)
        } catch (t) {
            throw new SecretSessionError(ErrCodes.InvalidSyntax, `Unable to decode SMSG from string: ${t} ${e}`)
        }
        if ("string" != typeof t.SDATA) throw new SecretSessionError(ErrCodes.InvalidMessage, "Missing or invalid SDATA field in SMSG message.");
        if ("string" != typeof t.TID) throw new SecretSessionError(ErrCodes.InvalidUserName, "Missing or invalid 'TID' field in SMSG object.");
        const s = sjcl.bn.fromBits(this.stringToBits(t.TID));
        if (!this.I.equals(s)) throw new SecretSessionError(ErrCodes.InvalidUserName, "Received SMSG message meant for another session.");
        return sjcl.codec.utf8String.fromBits(this.decrypt(this.stringToBits(t.SDATA)))
    },
    setPin: function (e) {
        this.P = e
    },
    stringToBase64: function (e) {
        let t = sjcl.codec.utf8String.toBits(e);
        return sjcl.codec.base64.fromBits(t, !1, !1)
    },
    bitsToString: function (e, t = !0) {
        return this.shouldUseBase64 ? sjcl.codec.base64.fromBits(e) : (t ? "0x" : "") + sjcl.codec.hex.fromBits(e)
    },
    stringToBits: function (e) {
        return this.shouldUseBase64 ? sjcl.codec.base64.toBits(e) : sjcl.codec.hex.toBits(e)
    },
    setUpSRP: function () {
        this.I = sjcl.bn.fromBits(this._randomWords(4)), this.a = sjcl.bn.fromBits(this._randomWords(8)), this.A = this.grp.g.powermod(this.a, this.grp.N)
    },
    currProtocols: function () {
        return [SecretSessionVersion.SRPWithOldVerification, SecretSessionVersion.SRPWithRFCVerification]
    },
    initialMessage: function () {
        this.expectedMessage = MSGTypes.MSG1;
        let e = null;
        try {
            e = JSON.stringify({
                TID: this.bitsToString(this.I.toBits()),
                MSG: 0,
                A: this.bitsToString(this.A.toBits()),
                VER: "1.0",
                PROTO: this.currProtocols()
            })
        } catch (e) {
            return null
        }
        return this.stringToBase64(e)
    },
    _padToModulusLength: function (e) {
        e = e.replace(/^0x/, "");
        const t = 2 * (sjcl.bitArray.bitLength(this.grp.N.toBits()) + 7 >> 3) - e.length;
        if (0 === t) return e;
        return "0".repeat(t) + e
    },
    processMessage: function (e) {
        const t = sjcl.codec.utf8String.fromBits(sjcl.codec.base64.toBits(e));
        let s = null;
        try {
            s = JSON.parse(t)
        } catch (e) {
            throw new SecretSessionError(ErrCodes.InvalidMessage, `Unable to parse JSON message: ${e}`)
        }
        if ("string" != typeof s.TID) throw new SecretSessionError(ErrCodes.InvalidMessage, "Missing or invalid 'TID' field in PAKE message.");
        let a = sjcl.bn.fromBits(this.stringToBits(s.TID));
        if (!this.I.equals(a)) throw new SecretSessionError(ErrCodes.UnexpectedMessage, "Unexpected message");
        if (!s.MSG) throw new SecretSessionError(ErrCodes.InvalidMessage, "Missing 'MSG' field in PAKE message.");
        const o = parseInt(s.MSG, 10);
        if (this.expectedMessage !== o) throw new SecretSessionError(ErrCodes.UnexpectedMessage, `Received Message ${message.MSG}, but expected Message ${this.expectedMessage} `);
        let r = null;
        if (o === MSGTypes.MSG1) {
            var n = SecretSessionVersion.SRPWithOldVerification;
            "number" == typeof s.PROTO && (n = s.PROTO, Object.values(SecretSessionVersion).includes(n) || (n = SecretSessionVersion.SRPWithOldVerification)), this.protocolVersion = n, r = this.processMessage1(s)
        } else o === MSGTypes.MSG3 && (r = this.processMessage3(s));
        return r
    },
    createSessionKey: function (e, t) {
        const s = sjcl.hash.sha256.hash,
            a = this._calculateX(e, this.bitsToString(this.I.toBits()), this.P, s);
        this.v = this._calculateVerifier(this.grp.g, a, this.grp.N);
        const o = this.A.toString(),
            r = t.toString(),
            n = this._padToModulusLength(o).concat(this._padToModulusLength(r)),
            i = sjcl.bn.fromBits(s(sjcl.codec.hex.toBits(n))),
            c = this.a.add(i.mul(a)),
            d = this.grp.N.toString() + this._padToModulusLength(this.grp.g.toString()),
            l = sjcl.bn.fromBits(s(sjcl.codec.hex.toBits(d))).mulmod(this.v, this.grp.N);
        return s(t.sub(l).powermod(c, this.grp.N).toBits())
    },
    _calculateX: function (e, t, s, a) {
        const o = a(t + ":" + s);
        return sjcl.bn.fromBits(a(e.concat(o)))
    },
    _calculateVerifier: function (e, t, s) {
        return e.powermod(t, s)
    },
    _calculateM: function (e, t, s) {
        const a = sjcl.hash.sha256.hash;
        let o = a(this.grp.N.toBits()),
            r = a(sjcl.codec.hex.toBits(this._padToModulusLength(this.grp.g.toString())));
        const n = sjcl.bitArray.bitLength(o) / 32;
        for (let e = 0; e < n; ++e) o[e] = o[e] ^ r[e];
        let i = a(this.bitsToString(this.I.toBits())),
            c = new sjcl.hash.sha256;
        c.update(o), c.update(i), c.update(e), c.update(this.A.toBits()), c.update(t.toBits()), c.update(s);
        let d = c.finalize();
        return c = new sjcl.hash.sha256, c.update(this.A.toBits()), c.update(d), c.update(s), this.hamk = c.finalize(), d
    },
    processMessage1: function (e) {
        if ("string" != typeof e.s || "string" != typeof e.B) throw new SecretSessionError(ErrCodes.InvalidMessage, "Message 1 is missing some required keys.");
        e.VER && (this.appVer = e.VER);
        const t = this.stringToBits(e.s),
            s = sjcl.bn.fromBits(this.stringToBits(e.B));
        let a = new sjcl.bn(1);
        if (0 == s.mulmod(a, this.grp.N)) throw new SecretSessionError(ErrCodes.CryptoError, "B.mulmod error");
        const o = this.createSessionKey(t, s);
        this.encKey = sjcl.bitArray.bitSlice(o, 0, this.keyLen), this.expectedMessage = MSGTypes.MSG3;
        let r = {
            TID: this.bitsToString(this.I.toBits()),
            MSG: 2
        };
        switch (this.protocolVersion) {
            case SecretSessionVersion.SRPWithRFCVerification:
                r.M = this.bitsToString(this._calculateM(t, s, o), !1);
                break;
            case SecretSessionVersion.SRPWithOldVerification:
                const e = this.shouldUseBase64 ? this.v.toBits() : sjcl.codec.utf8String.toBits(this.v.toString()),
                    a = this.encrypt(e);
                r.v = this.bitsToString(a, !1);
                break;
            default:
                throw new SecretSessionError(ErrCodes.UnexpectedMessage, `Unknown protocol version ${this.protocolVersion}`)
        }
        let n = null;
        try {
            n = JSON.stringify(r)
        } catch (e) {
            throw new SecretSessionError(ErrCodes.InvalidMessage, `Error encoding Message 2 to string:${e}`)
        }
        return this.stringToBase64(n)
    },
    processMessage3: function (e) {
        let t = ErrCodes.ErrSuccess,
            s = "";
        if (0 !== e.ErrCode) s = `Message 3 contained an error: ${e.ErrCode}`, t = ErrCodes.InvalidMessage;
        else switch (this.protocolVersion) {
            case SecretSessionVersion.SRPWithRFCVerification:
                if (e.HAMK) {
                    const a = this.stringToBits(e.HAMK);
                    sjcl.bitArray.equal(a, this.hamk) || (s = "Failed to verify server data.", this.msgExp = MSGTypes.MSG1, t = ErrCodes.InvalidSessionKey)
                } else s = `Message 3 does not contain necessary data:${e.ErrCode}`, t = ErrCodes.InvalidMessage;
                break;
            case SecretSessionVersion.SRPWithOldVerification:
                break;
            default:
                t = ErrCode.UnexpectedMessage, s = `Unknown SecretSessionVersion ${this.protocolVersion}.`
        }
        if (t != ErrCodes.ErrSuccess) throw this.sessionKey = null, this.expectedMessage = MSGTypes.MSG1, new SecretSessionError(t, s);
        return t === ErrCodes.ErrSuccess
    },
    encrypt: function (e) {
        if (!this.encKey) throw new SecretSessionError(ErrCodes.InvalidSessionKey, "Called encrypt() without a session key");
        const t = new sjcl.cipher.aes(this.encKey),
            s = this._randomWords(4);
        let a = null;
        try {
            a = sjcl.mode.gcm.encrypt(t, e, s)
        } catch (e) {
            throw new SecretSessionError(ErrCodes.CryptoError, e.message)
        }
        return sjcl.bitArray.concat(a, s)
    },
    decrypt: function (e) {
        if (!this.encKey) throw new SecretSessionError(ErrCodes.InvalidSessionKey, "Called decrypt() without a session key!");
        const t = new sjcl.cipher.aes(this.encKey),
            s = sjcl.bitArray.bitSlice(e, 0, this.keyLen),
            a = sjcl.bitArray.bitSlice(e, this.keyLen);
        let o = null;
        try {
            o = sjcl.mode.gcm.decrypt(t, a, s)
        } catch (e) {
            throw new SecretSessionError(ErrCodes.CryptoError, `Exception while decrypting message. ${e}`)
        }
        return o
    },
    _randomWords: function (e) {
        return sjcl.random.randomWords(e, 10)
    }
};
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
    CmdEndOp = 0,
    CmdUnused1 = 1,
    CmdChallengePIN = 2,
    CmdSetIconNTitle = 3,
    CmdGetLoginNames4URL = 4,
    CmdGetPassword4LoginName = 5,
    CmdSetPassword4LoginName_URL = 6,
    CmdNewAccount4URL = 7,
    CmdTabEvent = 8,
    CmdPasswordsDisabled = 9,
    CmdReloginNeeded = 10,
    CmdLaunchiCP = 11,
    CmdiCPStateChange = 12,
    CmdLaunchPasswordsApp = 13,
    CmdHello = 14,
    CmdOneTimeCodeAvailable = 15,
    CmdGetOneTimeCodes = 16,
    CmdDidFillOneTimeCode = 17,
    QueryStatus = {
        Success: 0,
        NoResults: 3
    };

function cmd2string(e) {
    switch (e) {
        case 0:
            return "CmdEndOp";
        case 1:
            return "CmdUnused1";
        case 2:
            return "CmdChallengePIN";
        case 3:
            return "CmdSetIconNTitle";
        case 4:
            return "CmdGetLoginNames4URL";
        case 5:
            return "CmdGetPassword4LoginName";
        case 6:
            return "CmdSetPassword4LoginName_URL";
        case 7:
            return "CmdNewAccount4URL";
        case 8:
            return "CmdTabEvent";
        case 9:
            return "CmdPasswordsDisabled";
        case 10:
            return "CmdReloginNeeded";
        case 11:
            return "CmdLaunchiCP";
        case 12:
            return "CmdiCPStateChange";
        case 13:
            return "CmdLaunchPasswordsApp";
        case 14:
            return "CmdHello";
        case 15:
            return "CmdOneTimeCodeAvailable";
        case 16:
            return "CmdGetOneTimeCodes";
        case 17:
            return "CmdDidFillOneTimeCode"
    }
}
var actUnknown = -1,
    actDelete = 0,
    actUpdate = 1,
    actSearch = 2,
    actAddNew = 3,
    actMaybeAdd = 4,
    actGhostSearch = 5;
const DefaultCapabilities = {
    shouldUseBase64: !1,
    secretSessionVersion: SecretSessionVersion.SRPWithOldVerification,
    canFillOneTimeCodes: !1
},
    AmountOfTimeToBlockRefreshForNativeAppDisconnection = 5e3;
var g_lastToolbarIconImageName, g_nativeAppPort = null,
    thePAKE = null,
    g_theState = ContextState.NotInSession,
    g_tabIdToURL = new Map,
    g_Stage1Logins = new Map,
    g_TabsToStateMap = new Map,
    g_ErrorReturned = !1,
    g_secretSession = null,
    g_nativeAppCapabilities = null,
    g_appStoreURL = "https://support.apple.com/kb/DL1455";

function imageDataForName(e) {
    if (!e) return;
    let t = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return {
        16: "images/" + (g_lastToolbarIconImageName = e) + (t ? "-darkmode" : "") + "_icon16.png",
        32: "images/" + g_lastToolbarIconImageName + (t ? "-darkmode" : "") + "_icon32.png"
    }
}

function setUpEventListners() {
    chrome.runtime.onInstalled && chrome.runtime.onInstalled.addListener((function () {
        // chrome.declarativeContent && chrome.declarativeContent.onPageChanged.removeRules(void 0, (function() {
        //     chrome.declarativeContent.onPageChanged.addRules([{
        //         conditions: [new chrome.declarativeContent.PageStateMatcher({
        //             pageUrl: {
        //                 schemes: ["https", "http"]
        //             }
        //         })],
        //         actions: [new chrome.declarativeContent.ShowPageAction]
        //     }])
        // }))
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
            if (changeInfo.status === 'complete' && tab.url.match(/((http|https):\/\/)[\S]*/)) {
                chrome.pageAction.show(tabId);
            } else {
                chrome.pageAction.hide(tabId);
            }
        })
    })), chrome.runtime.onSuspend && chrome.runtime.onSuspend.addListener((function () {
        g_tabIdToURL.clear(), g_Stage1Logins.clear(), g_TabsToStateMap.clear(), g_nativeAppPort.postMessage({
            cmd: 0
        })
    })), chrome.runtime.onSuspendCanceled && chrome.runtime.onSuspendCanceled.addListener((function () { })), chrome.runtime.onUpdateAvailable && chrome.runtime.onUpdateAvailable.addListener((function () { }))
}

function secdSTATUS2string(e) {
    switch (e) {
        case 0:
            return "secdSTATUSsuccess";
        case 1:
            return "genericError";
        case 2:
            return "invalidParam";
        case 3:
            return "itemNotFound";
        case 4:
            return "failedToDelete";
        case 5:
            return "failedToUpdate";
        case 6:
            return "invalidMessageFormat";
        case 7:
            return "duplicateItem";
        case 8:
            return "unknownAction";
        case 9:
            return "invalidSession"
    }
}

function checkForValidOS() {
    const e = new RegExp("\\(Windows\\s*\\w*\\s*(\\d*)\\.(\\d*)", "i").exec(window.navigator.userAgent);
    return null !== e && 3 === e.length && (e[1] >= 10 ? (g_appStoreURL = "ms-windows-store://pdp/?productid=9PKTQ5699M62", !0) : !(e[1] < 6) && !(e[2] < 1))
}

function setGlobalState(e, t) {
    if (setToolbarIcon((g_theState = e) === ContextState.SessionKeySet ? "PasswordsToolbar" : "PasswordsToolbarUnpaired"), !t) try {
        g_portToPopup.postMessage({
            subject: "nativeConnectionStateChanged",
            state: g_theState,
            appStoreURL: g_appStoreURL
        })
    } catch (e) { }
}

function resetTheSession(e) {
    setGlobalState(e), g_secretSession = new SecretSession(g_nativeAppCapabilities)
}

function STATUSErrorReturned(e) {
    switch (secdSTATUS2string(e), g_theState) {
        case ContextState.IncompatibleOS:
        case ContextState.NativeSupportNotInstalled:
        case ContextState.CheckEngine:
        case ContextState.MSG1Set:
        case ContextState.ChallengeSent:
            break;
        case ContextState.SessionKeySet:
            g_ErrorReturned = !0, resetTheSession(ContextState.NotInSession);
        case ContextState.NotInSession:
            chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, (function (e) {
                setToolbarIcon("PasswordsToolbarUnpaired")
            }))
    }
}

function logMapElements(e, t, s) { }

function consultStage1Logins(e, t) {
    return isStringEmpty(e) ? g_Stage1Logins.has(t) ? (LoginName = g_Stage1Logins.get(t), LoginName, g_Stage1Logins.delete(t), LoginName) : "" : e
}

function entriesFromLoginNames4URLData(e) {
    let t = e.Entries;
    return t || (t = [], Object.entries(e).sort().map((([e, s]) => {
        e.includes("Entry_") && t.push(s)
    })), t)
}

function setToolbarIcon(e) {
    chrome.browserAction && chrome.browserAction.setIcon({
        path: imageDataForName(e)
    })
}

function sendMessageToPopupAndCompletionList(e) {
    try {
        chrome.runtime.sendMessage(e)
    } catch (e) { }
    try {
        g_portToCompletionList && g_portToCompletionList.postMessage(e)
    } catch (e) { }
}

function connectToBackgroundNativeAppAndSetUpListeners() {
    setToolbarIcon("PasswordsToolbarUnpaired"), g_nativeAppCapabilities || (g_nativeAppCapabilities = DefaultCapabilities), g_secretSession = new SecretSession(g_nativeAppCapabilities);
    try {
        (g_nativeAppPort = chrome.runtime.connectNative("com.apple.passwordmanager")).onDisconnect.addListener((function (e) {
            const t = chrome.runtime.lastError;
            t.message, setTimeout((function () {
                switch (t.message) {
                    case "Native host has exited.":
                        chrome.storage.local.get(["lastRetryTimestamp"], (e => {
                            const t = e.lastRetryTimestamp;
                            let s = !1;
                            if (t) {
                                s = Date.now() - t > 5e3
                            } else s = !0;
                            s ? (chrome.storage.local.set({
                                lastRetryTimestamp: Date.now()
                            }), connectToBackgroundNativeAppAndSetUpListeners()) : (chrome.storage.local.remove(["lastRetryTimestamp"]), resetTheSession(ContextState.NativeSupportNotInstalled))
                        }));
                        break;
                    default:
                        t.message, resetTheSession(ContextState.NativeSupportNotInstalled)
                }
            }), 1e3)
        })), chrome.runtime.onMessage.addListener(((e, t, s) => {
            const a = new URL(t.url);
            switch (a.hostname, t.tab.id, t.frameId, e.from, e.from) {
                case "content":
                    switch (e.subject, e.subject) {
                        case "CmdDidFocusIntoPage":
                            runPageMetadataHeuristicsOnActiveTab();
                            break;
                        case "CmdCheckEstablishSession":
                            CheckEstablishSession();
                            break;
                        case "SaveStage1LoginName":
                            a.hostname, t.tab.id, e.theLogin, g_tabIdToURL.set(t.tab.id, a.hostname), g_Stage1Logins.set(a.hostname, e.theLogin);
                            break;
                        case "CmdGetPassword4LoginName":
                            let s = JSON.stringify({
                                ACT: actSearch,
                                URL: a.hostname,
                                USR: e.theLogin
                            });
                            var o = g_secretSession.createSMSG(s),
                                r = {
                                    cmd: 5,
                                    tabId: t.tab.id,
                                    frameId: t.frameId,
                                    url: e.theURL,
                                    payload: JSON.stringify({
                                        QID: e.subject,
                                        SMSG: o
                                    })
                                };
                            e.subject, e.subject, g_nativeAppPort.postMessage(r);
                            break;
                        case "CmdSetPassword4LoginName_URL":
                        case "CmdNewAccount4URL":
                            switch (g_theState) {
                                case ContextState.SessionKeySet:
                                    {
                                        e.theNLogin, a.hostname;
                                        let s = consultStage1Logins(e.theNLogin, a.hostname);
                                        if (!isStringEmpty(s)) {
                                            let a = JSON.stringify({
                                                ACT: actMaybeAdd,
                                                URL: e.theURL,
                                                USR: e.theLogin,
                                                PWD: e.thePassword,
                                                NURL: e.theNURL,
                                                NUSR: s,
                                                NPWD: e.theNPassword
                                            });
                                            o = g_secretSession.createSMSG(a), r = {
                                                cmd: 6,
                                                tabId: t.tab.id,
                                                frameId: t.frameId,
                                                payload: JSON.stringify({
                                                    QID: e.subject,
                                                    SMSG: o
                                                })
                                            };
                                            e.subject, g_nativeAppPort.postMessage(r)
                                        }
                                    }
                            }
                            break;
                        case "CmdSetIconNTitle":
                            {
                                let s = !1;
                                switch (e.hostPageType) {
                                    case WBSAutoFillFormTypeUndetermined:
                                    case WBSAutoFillFormTypeAutoFillableStandard:
                                    case WBSAutoFillFormTypeNonAutoFillable:
                                        s = !1;
                                        break;
                                    case WBSAutoFillFormTypeAutoFillableLogin:
                                    case WBSAutoFillFormTypeNewAccount:
                                    case WBSAutoFillFormTypeChangePassword:
                                        s = !0
                                }
                                switch (g_TabsToStateMap.has(t.tab.id) && g_TabsToStateMap.get(t.tab.id) || g_TabsToStateMap.set(t.tab.id, s), a.hostname, t.tab.id, t.frameId, humanReadableFormType(e.hostPageType), e.hostPageType, e.hostPageType) {
                                    case WBSAutoFillFormTypeUndetermined:
                                    case WBSAutoFillFormTypeAutoFillableStandard:
                                    case WBSAutoFillFormTypeNonAutoFillable:
                                        break;
                                    case WBSAutoFillFormTypeAutoFillableLogin:
                                    case WBSAutoFillFormTypeNewAccount:
                                    case WBSAutoFillFormTypeChangePassword:
                                        r = {
                                            cmd: 3,
                                            tabId: t.tab.id,
                                            frameId: t.frameId,
                                            payload: JSON.stringify({
                                                TID: "CmdSetIconNTitle",
                                                URL: a.hostname
                                            })
                                        };
                                        JSON.stringify(r), g_nativeAppPort.postMessage(r)
                                }
                            }
                            break;
                        case "CmdClearCache":
                            g_tabIdToURL.has(t.tab.id) && (strURL = g_tabIdToURL.get(t.tab.id), a.hostname !== strURL && g_Stage1Logins.delete(strURL), g_tabIdToURL.delete(t.tab.id));
                            break;
                        case "ThemeChanged":
                            chrome.pageAction && chrome.pageAction.setIcon({
                                path: imageDataForName(g_lastToolbarIconImageName),
                                tabId: t.tab.id
                            });
                            break;
                        case "fillOneTimeCodeIntoForm":
                            chrome.webNavigation.getFrame({
                                tabId: t.tab.id,
                                frameId: t.frameId
                            }, (s => {
                                s.frameId = t.frameId, didFillOneTimeCode(e.oneTimeCode, {
                                    id: t.tab.id
                                }, s)
                            }));
                            break;
                        case "typedUserNameChanged":
                        case "keydown":
                            g_portToCompletionList.postMessage(e)
                    }
            }
            return Promise.resolve("Dummy response to keep the console quiet")
        })), g_nativeAppPort.onMessage.addListener((function (e) {
            switch (JSON.stringify(e), setChromePasswordSavingEnabled(!1), chrome.storage.local.remove(["lastRetryTimestamp"]), cmd2string(e.cmd), e.cmd, e.cmd) {
                case 9:
                case 10:
                    resetTheSession(ContextState.CheckEngine), setChromePasswordSavingEnabled(!0), chrome.tabs.query({
                        active: !0,
                        currentWindow: !0
                    }, (function (e) {
                        setToolbarIcon("PasswordsToolbarUnpaired")
                    })), setGlobalState(ContextState.NotInSession, !0);
                    break;
                case 2:
                    switch (e.payload.QID, e.payload.QID) {
                        case "m0":
                            thePAKE = e.payload.PAKE, setGlobalState(ContextState.MSG1Set);
                            break;
                        case "m2":
                            try {
                                g_secretSession.processMessage(e.payload.PAKE);
                                setGlobalState(ContextState.SessionKeySet), thePAKE = null
                            } catch (e) {
                                e.code, e.message, resetTheSession(ContextState.NotInSession)
                            }
                    }
                    break;
                case 3:
                    var t = RememberIC.UnknownPage;
                    switch (e.payload, e.payload) {
                        case "DoNotRemember":
                            t = RememberIC.DoNotRemember;
                            break;
                        case "RememberLoginAndPassword":
                            t = RememberIC.RememberLoginAndPassword;
                            break;
                        case "UnknownPage":
                            t = RememberIC.UnknownPage;
                            break;
                        case "NoValueSet":
                            t = RememberIC.NoValueSet, STATUSErrorReturned(e.STATUS)
                    }
                    try {
                        chrome.tabs.sendMessage(e.tabId, {
                            from: "background",
                            subject: "RememberICSelection",
                            tabId: e.tabId,
                            frameId: e.frameId,
                            theRememberICSelection: t
                        }, {
                            frameId: e.frameId
                        })
                    } catch (t) {
                        e.tabId, e.frameId, t.message
                    }
                    break;
                case 4:
                    t = RememberIC.UnknownPage;
                    var s = [],
                        a = [],
                        o = [],
                        r = e.payload,
                        n = e.tabId,
                        i = e.frameId,
                        c = g_secretSession.parseSMSG(r.SMSG),
                        d = JSON.parse(c);
                    switch (JSON.stringify(d), d.STATUS) {
                        case QueryStatus.Success:
                            entriesFromLoginNames4URLData(d).forEach((e => {
                                if ("Passwords not saved" === e.USR) t = RememberIC.DoNotRemember;
                                else switch (s.push(e.USR), a.push(e.CDate || e.ModDate), o.push(e.sites[0]), e.PWD) {
                                    case "Not Included":
                                        t = RememberIC.RememberLoginAndPassword;
                                        break;
                                    default:
                                        t = RememberIC.UnknownPage
                                }
                            })), sendMessageToPopupAndCompletionList({
                                from: "background",
                                subject: "users",
                                arrLoginNames: s,
                                arrDates: a,
                                arrHLDs: o,
                                tabId: n,
                                frameId: i,
                                theRememberICSelection: t
                            });
                            break;
                        case QueryStatus.NoResults:
                            sendMessageToPopupAndCompletionList({
                                from: "background",
                                subject: "users",
                                arrDates: [],
                                tabId: n,
                                frameId: i,
                                arrLoginNames: [],
                                arrHLDs: [],
                                theRememberICSelection: RememberIC.UnknownPage
                            });
                            break;
                        default:
                            STATUSErrorReturned(d.STATUS)
                    }
                    break;
                case 5:
                    r = e.payload, c = g_secretSession.parseSMSG(r.SMSG);
                    switch ((d = JSON.parse(c)).STATUS) {
                        case 0:
                            chrome.tabs.query({
                                active: !0,
                                currentWindow: !0
                            }, (function (t) {
                                try {
                                    entriesFromLoginNames4URLData(d).forEach((s => {
                                        for (site of s.sites)
                                            if (site === e.url) return void chrome.tabs.sendMessage(t[0].id, {
                                                from: "background",
                                                subject: "password",
                                                tabId: e.tabId,
                                                frameId: e.frameId,
                                                theLoginName: s.USR,
                                                thePassword: s.PWD,
                                                theURL: site
                                            }, {
                                                frameId: e.frameId
                                            })
                                    }))
                                } catch (t) {
                                    e.tabId, e.frameId, t.message
                                }
                            }));
                            break;
                        case 3:
                            break;
                        default:
                            STATUSErrorReturned(d.STATUS)
                    }
                    break;
                case 16:
                    handleGetOneTimeCodesCommand(e);
                    break;
                case 8:
                case 7:
                case 6:
                    break;
                case 14:
                    g_nativeAppCapabilities = e.hasOwnProperty("capabilities") ? e.capabilities : DefaultCapabilities, resetTheSession(ContextState.NotInSession);
                    break;
                case 15:
                    handleOneTimeCodeAvailableCommand(e);
                    break;
                case 17:
                    handleDidFillOneTimeCodeCommand(e);
                    break;
                default:
                    cmd2string(e.cmd)
            }
            return Promise.resolve("Dummy response to keep the console quiet")
        }))
    } catch (e) {
        resetTheSession(ContextState.NativeSupportNotInstalled)
    }
    try {
        g_nativeAppPort.postMessage({
            cmd: 14
        })
    } catch (e) {
        resetTheSession(ContextState.NativeSupportNotInstalled)
    }
}

function handleOneTimeCodeAvailableCommand(e) {
    getCurrentActiveTabAndFrame().then((e => getOneTimeCodes(e[0], e[1], null)))
}

function handleGetOneTimeCodesCommand(e) {
    let t = null;
    try {
        t = JSON.parse(g_secretSession.parseSMSG(e.payload.SMSG))
    } catch (e) {
        return
    }
    let s = t.STATUS;
    if (s !== QueryStatus.Success) return void (s !== QueryStatus.NoResults && STATUSErrorReturned(s));
    let a = t.Entries;
    a && sendMessageToPopupAndCompletionList({
        from: "background",
        subject: "oneTimeCodes",
        oneTimeCodes: a
    })
}

function handleDidFillOneTimeCodeCommand(e) {
    let t = null;
    try {
        t = JSON.parse(g_secretSession.parseSMSG(e.payload.SMSG))
    } catch (e) {
        return
    }
    let s = t.STATUS;
    if (s !== QueryStatus.Success) return void (s !== QueryStatus.NoResults && STATUSErrorReturned(s));
    let a = t.Entries;
    a && a.length && chrome.tabs.sendMessage(e.tabId, {
        subject: "fillCurrentTOTPCodeIntoForm",
        oneTimeCodes: a
    }, {
        frameId: e.frameId
    })
}

function CheckEstablishSession() {
    switch (g_theState) {
        case ContextState.NotInSession:
            ChallengePIN()
    }
}

function RunHeuristics(e, t, s) {
    g_theState !== ContextState.MSG1Set && g_theState !== ContextState.ChallengeSent || PINSet("");
    try {
        chrome.tabs.sendMessage(t, {
            from: "background",
            subject: "runFormMetadataHeuristics",
            url: e,
            tabId: t,
            frameId: s
        }, {
            frameId: s
        })
    } catch (e) {
        e.message
    }
}

function startiCloudControlPanel() {
    var e = {
        cmd: 11
    };
    JSON.stringify(e), g_nativeAppPort.postMessage(e)
}

function startPasswordsApp() {
    var e = {
        cmd: 13
    };
    JSON.stringify(e), g_nativeAppPort.postMessage(e)
}

function GetLoginNames4URL(e, t, s) {
    let a = JSON.stringify({
        ACT: actGhostSearch,
        URL: e
    }),
        o = g_secretSession.createSMSG(a),
        r = {
            cmd: 4,
            url: e,
            tabId: t,
            frameId: s,
            payload: JSON.stringify({
                QID: "CmdGetLoginNames4URL",
                SMSG: o
            })
        };
    g_nativeAppPort.postMessage(r)
}

function getOneTimeCodes(e, t, s) {
    getAllParentFrameURLsOfFrame(e, t).then((a => {
        let o = {
            ACT: actGhostSearch,
            TYPE: "oneTimeCodes",
            frameURLs: a
        };
        s && (o.username = s);
        let r = g_secretSession.createSMSG(o),
            n = {
                cmd: 16,
                tabId: e.id,
                frameId: t.frameId,
                payload: JSON.stringify({
                    QID: "CmdGetOneTimeCodes",
                    SMSG: r
                })
            };
        g_nativeAppPort.postMessage(n)
    }))
}

function didFillOneTimeCode(e, t, s) {
    switch (e.source) {
        case "totp":
            getAllParentFrameURLsOfFrame(t, s).then((a => {
                let o = {
                    ACT: actSearch,
                    TYPE: "oneTimeCodes",
                    frameURLs: a
                },
                    r = e.username;
                r && (o.username = r);
                let n = g_secretSession.createSMSG(o),
                    i = {
                        cmd: 17,
                        tabId: t.id,
                        frameId: s.frameId,
                        payload: JSON.stringify({
                            QID: "CmdDidFillOneTimeCode",
                            SMSG: n
                        })
                    };
                g_nativeAppPort.postMessage(i)
            }))
    }
}

function getAllParentFrameURLsOfFrame(e, t) {
    let s = e.id;
    return new Promise((a => {
        -1 !== t.parentFrameId ? chrome.webNavigation.getFrame({
            tabId: s,
            frameId: t.parentFrameId
        }, (s => {
            getAllParentFrameURLsOfFrame(e, s).then((e => {
                a([t.url].concat(e))
            }))
        })) : a([t.url])
    }))
}

function ChallengePIN() {
    var e = g_secretSession.initialMessage(),
        t = {
            cmd: 2,
            msg: JSON.stringify({
                QID: "m0",
                PAKE: e,
                HSTBRSR: chrome.i18n.getMessage("browserName")
            })
        };
    setGlobalState(ContextState.ChallengeSent);
    try {
        g_nativeAppPort.postMessage(t)
    } catch (e) {
        resetTheSession(ContextState.NativeSupportNotInstalled)
    }
}

function PINSet(e) {
    g_secretSession.setPin(e);
    try {
        let e = g_secretSession.processMessage(thePAKE),
            t = {
                cmd: 2,
                msg: JSON.stringify({
                    QID: "m2",
                    PAKE: e
                })
            };
        g_nativeAppPort.postMessage(t)
    } catch (e) {
        e.code, e.message, resetTheSession(ContextState.NotInSession)
    }
}

function setChromePasswordSavingEnabled(e) {
    chrome.privacy.services.passwordSavingEnabled.get({}, (function (t) {
        t.value !== e && chrome.privacy.services.passwordSavingEnabled.set({
            value: e
        }, (function () {
            chrome.runtime.lastError && chrome.runtime.lastError
        }))
    }))
}

function runPageMetadataHeuristicsOnActiveTab() {
    chrome.tabs.query({
        active: !0,
        currentWindow: !0
    }, (function (e) {
        g_TabsToStateMap.delete(e[0].id), chrome.webNavigation.getAllFrames({
            tabId: e[0].id
        }, (t => {
            e[0].id, t.forEach(((t, s, a) => {
                const o = new URL(t.url),
                    r = o.protocol;
                "http:" === r || "https:" === r ? (e[0].id, t.frameId, RunHeuristics(o.hostname, e[0].id, t.frameId)) : t.url
            }))
        }))
    }))
}

function getCurrentActiveTabAndFrame() {
    return new Promise((e => {
        chrome.tabs.query({
            active: !0,
            currentWindow: !0
        }, (function (t) {
            chrome.webNavigation.getAllFrames({
                tabId: t[0].id
            }, (function (s) {
                e([t[0], s[0]])
            }))
        }))
    }))
}

function getCurrentActiveTabAndItsFrames() {
    return new Promise((e => {
        chrome.tabs.query({
            active: !0,
            currentWindow: !0
        }, (function (t) {
            chrome.webNavigation.getAllFrames({
                tabId: t[0].id
            }, (function (s) {
                e([t[0], s])
            }))
        }))
    }))
}

function canFillOneTimeCodes() {
    return (g_nativeAppCapabilities || DefaultCapabilities).canFillOneTimeCodes
}
setUpEventListners(), checkForValidOS() ? connectToBackgroundNativeAppAndSetUpListeners() : (chrome.storage.local.get("hideUnsupportedOSPrompt", (function (e) {
    e.hideUnsupportedOSPrompt || (chrome.storage.local.set({
        hideUnsupportedOSPrompt: 1
    }), window.alert(chrome.i18n.getMessage("unsupportedOS")))
})), setGlobalState(ContextState.IncompatibleOS)), chrome.windows.onFocusChanged.addListener((e => {
    g_nativeAppPort && e !== chrome.windows.WINDOW_ID_NONE && chrome.tabs.query({
        active: !0,
        currentWindow: !0
    }, (function (e) {
        let t = {
            cmd: 8,
            tabId: e[0].id,
            event: 1
        };
        JSON.stringify(t), g_nativeAppPort.postMessage(t)
    }))
}));
var g_portToCompletionList, g_portToPopup, g_IsDirty = !1;

function setUpPortToCompetionList(e) {
    g_portToCompletionList = e, e.onMessage.addListener((function (t) {
        switch (t.subject) {
            case "getContextAndMetadataFromContent":
                getCurrentActiveTabAndItsFrames().then((function (t) {
                    const s = t[0].id;
                    for (const a of t[1]) {
                        const t = a.frameId;
                        chrome.tabs.sendMessage(s, {
                            from: "background",
                            subject: "getTextFieldAndFormMetadataOfActiveTextFieldAndPresetUserNameAndHostname"
                        }, {
                            frameId: t
                        }, (function (a) {
                            e.postMessage({
                                subject: "replyForGetContextAndMetadataFromContent",
                                state: g_theState,
                                tabId: s,
                                frameId: t,
                                textFieldMetadata: a.textFieldMetadata,
                                formMetadata: a.formMetadata,
                                presetUserName: a.presetUserName,
                                hostname: a.hostname,
                                canFillOneTimeCodes: canFillOneTimeCodes()
                            })
                        }))
                    }
                }));
                break;
            case "GetLoginNames4URL":
                GetLoginNames4URL(t.hostname, t.tabId, t.frameId);
                break;
            case "getOneTimeCodes":
                const s = t.tabId,
                    a = t.frameId;
                chrome.webNavigation.getFrame({
                    tabId: s,
                    frameId: a
                }, (e => {
                    e.frameId = a, getOneTimeCodes({
                        id: t.tabId
                    }, e, t.username)
                }));
                break;
            case "openPasswordManagerAndDismissCompletionList":
                startPasswordsApp(), chrome.tabs.sendMessage(t.tabId, {
                    subject: "dismissCompletionList"
                }, {
                    frameId: t.frameId
                });
                break;
            case "resizeCompletionList":
            case "fillLoginIntoForm":
            case "fillOneTimeCodeIntoForm":
            case "dismissCompletionList":
                chrome.tabs.sendMessage(t.tabId, t, {
                    frameId: t.frameId
                })
        }
    }))
}

function setUpPortToPopup(e) {
    g_portToPopup = e, e.onMessage.addListener((function (t, s, a) {
        switch (t.subject) {
            case "getNativeConnectionState":
                e.postMessage({
                    subject: "nativeConnectionStateChanged",
                    state: g_theState,
                    appStoreURL: g_appStoreURL
                });
                break;
            case "tryToEstablishNativeConnectionInResponseToUserActivatingPopup":
                chrome.storage.local.set({
                    lastRetryTimestamp: Date.now()
                }), connectToBackgroundNativeAppAndSetUpListeners();
                break;
            case "challengePIN":
                ChallengePIN();
                break;
            case "userEnteredPIN":
                PINSet(t.pin);
                break;
            case "GetLoginNames4URL":
                GetLoginNames4URL(t.hostname, t.tabId, t.frameId);
                break;
            case "openPasswordManager":
                startPasswordsApp();
                break;
            case "startiCloudControlPanel":
                startiCloudControlPanel()
        }
    })), e.onDisconnect.addListener((function () {
        g_theState === ContextState.MSG1Set && PINSet("")
    }))
}
chrome.tabs.onUpdated.addListener(((e, t, s) => {
    switch (s.status) {
        case "unloaded":
            break;
        case "loading":
            g_IsDirty = !0;
            break;
        case "complete":
            g_IsDirty && (JSON.stringify(t), JSON.stringify(s), g_IsDirty = !1, runPageMetadataHeuristicsOnActiveTab())
    }
})), chrome.tabs.onActivated.addListener((e => {
    if (JSON.stringify(e), !g_nativeAppPort) return;
    let t = {
        cmd: 8,
        tabId: e.tabId,
        event: 1
    };
    JSON.stringify(t), g_nativeAppPort.postMessage(t)
})), chrome.tabs.onRemoved.addListener(((e, t) => {
    if (JSON.stringify(t), !g_nativeAppPort) return;
    let s = {
        cmd: 8,
        tabId: e,
        event: 0
    };
    JSON.stringify(s), g_nativeAppPort.postMessage(s), g_TabsToStateMap.delete(e)
})), chrome.webNavigation.onHistoryStateUpdated.addListener((function (e) {
    JSON.stringify(e), e.transitionQualifiers.includes("forward_back");
    try {
        const t = new URL(e.url);
        let s = e.tabId;
        chrome.webNavigation.getAllFrames({
            tabId: s
        }, (e => {
            e.forEach(((e, a, o) => {
                JSON.stringify(e), chrome.tabs.sendMessage(s, {
                    from: "background",
                    subject: "historyStateDidUpdateInTab",
                    url: t.hostname,
                    tabId: s,
                    frameId: e.frameId
                })
            }))
        }))
    } catch (t) {
        e.tabId, e.frameId, t.message
    }
    setTimeout((function () {
        runPageMetadataHeuristicsOnActiveTab()
    }), 500)
})), chrome.runtime.onConnect.addListener((function (e) {
    "completionList" === e.name ? setUpPortToCompetionList(e) : "popup" === e.name && setUpPortToPopup(e)
})), chrome.app && (chrome.manifest = chrome.app.getDetails());
var injectScriptIntoTab = function (e) {
    if (chrome.manifest) {
        chrome.tabs.executeScript(e.id, {
            file: "content_script.js"
        })
    }
};
chrome.windows.getAll({
    populate: !0
}, (function (e) {
    for (let a of e)
        for (var t = 0, s = a.tabs.length; t < s; t++) {
            const e = a.tabs[t];
            let s;
            try {
                s = new URL(e.url).protocol
            } catch (e) {
                s = ""
            }
            "http:" !== s && "https:" !== s || injectScriptIntoTab(e)
        }
}));