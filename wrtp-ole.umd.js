(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('@wrtp/ole', ['exports'], factory) :
    (factory((global.wrtp = global.wrtp || {}, global.wrtp.ole = {})));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @type {?} */
    var BEHAVIORS_KEY = 'behaviors';
    /** @type {?} */
    var CURRENT_VERSION = 1;
    /** @type {?} */
    var INITIAL_BEHAVIOR = {
        ibmproductView: [],
        cartAdd: [],
        ibmcartAbandonment: [],
        ibmcartAbandonmentItem: [],
        ibmcartPurchase: [],
        ibmcartPurchaseItem: [],
        ibmelementFormError: []
    };
    /**
     * @return {?}
     */
    function cleanUpOldStorage() {
        Common.removeItem('ibmrtp');
    }
    /**
     * @return {?}
     */
    function getBehaviors() {
        /** @type {?} */
        var behaviors = Common.getItem(BEHAVIORS_KEY);
        return behaviors ? behaviors : INITIAL_BEHAVIOR;
    }
    /**
     * @return {?}
     */
    function behaviorsWithCurrentVersion() {
        /** @type {?} */
        var behaviors = getBehaviors();
        if (behaviors.version) {
            return behaviors;
        }
        else {
            cleanUpOldStorage();
            behaviors.version = CURRENT_VERSION;
            return behaviors;
        }
    }
    /**
     * @param {?} update
     * @return {?}
     */
    function updateBehaviors(update) {
        /** @type {?} */
        var behaviors = behaviorsWithCurrentVersion();
        update(behaviors);
        Common.setItem(BEHAVIORS_KEY, behaviors);
    }
    /**
     * @param {?} ubxEvent
     * @return {?}
     */
    function storeUBXEvent(ubxEvent) {
        updateBehaviors(function (behaviors) {
            /** @type {?} */
            var value = ubxEvent['eventCode'];
            behaviors[value].push({
                eventCode: ubxEvent['eventCode'],
                channel: ubxEvent['channel'],
                ts: ubxEvent['ts'],
                attributes: ubxEvent['eventAttributes'],
                identifiers: ubxEvent['identifiers']
            });
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @return {?}
     */
    function start() {
        // Need to make a generic Event Handler for Storage
        // Store IBM Product View
        Common.storeUBXEvent(window['digitalData']);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @return {?}
     */
    function getTime() {
        /** @type {?} */
        var date = new Date();
        return date.getTime();
    }
    /**
     * @return {?}
     */
    function getProductViewAttribute() {
        /** @type {?} */
        var digitalData = Common.getDigitalData();
        return digitalData ? digitalData.attribute : undefined;
    }
    /**
     * @return {?}
     */
    function getProductViewValue() {
        /** @type {?} */
        var digitalData = Common.getDigitalData();
        return digitalData ? digitalData.value : undefined;
    }
    /**
     * @return {?}
     */
    function getProductViewCategory() {
        /** @type {?} */
        var digitalData = Common.getDigitalData();
        return digitalData ? digitalData.category : undefined;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var MapUBXLSService = (function () {
        function MapUBXLSService() {
        }
        /**
         * @param {?} ubxEvent
         * @return {?}
         */
        MapUBXLSService.mapUBXEvent = /**
         * @param {?} ubxEvent
         * @return {?}
         */
            function (ubxEvent) {
                console.log("Shantanu MapUBXLSService", ubxEvent);
                /** @type {?} */
                var modifiedUBXEvent = {};
                /** @type {?} */
                var attributesLength = ubxEvent.length;
                for (var k = 0; k < attributesLength; k++) {
                    modifiedUBXEvent[ubxEvent[k].name] = ubxEvent[k].value;
                }
                console.log("Shantanu", modifiedUBXEvent);
                return modifiedUBXEvent;
            };
        return MapUBXLSService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @param {?} ubxEvent
     * @return {?}
     */
    function setPageView(ubxEvent) {
        console.log('WR:setPageView called...');
        /** @type {?} */
        var win = window;
        /** @type {?} */
        var ddlObject = ubxEvent;
        /** @type {?} */
        var eventInformation = ddlObject['events'][0];
        /** @type {?} */
        var event = MapUBXLSService.mapUBXEvent(ddlObject['events'][0].attributes);
        /** @type {?} */
        var eventTimeStamp = new Date(eventInformation.timestamp).getTime();
        win['digitalData'] = {
            eventCode: eventInformation.code,
            channel: eventInformation.channel,
            ts: eventTimeStamp,
            eventAttributes: event,
            identifiers: eventInformation.identifiers
        };
        console.log("Shantanu", win['digitalData']);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @type {?} */
    var KEY_NAME = 'ibmrtp';
    /** @type {?} */
    var rtpStorageObj;
    /**
     * @return {?}
     */
    function rtpStorage() {
        // this.rtpStorageObj = this.retrieveRtpStorage();
        if (!rtpStorageObj) {
            rtpStorageObj = retrieveRtpStorage();
        }
        return rtpStorageObj;
    }
    /**
     * @return {?}
     */
    function localStorage() {
        return Common.getLocalStorage();
    }
    /**
     * @return {?}
     */
    function retrieveRtpStorage() {
        /** @type {?} */
        var storage = localStorage().getItem(KEY_NAME);
        return storage ? JSON.parse(storage) : {};
    }
    /**
     * @param {?} storageObject
     * @return {?}
     */
    function updateLocalStorage(storageObject) {
        return localStorage().setItem(KEY_NAME, JSON.stringify(storageObject));
    }
    /**
     * @param {?} key
     * @return {?}
     */
    function getItem(key) {
        return rtpStorage()[key];
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function setItem(key, value) {
        /** @type {?} */
        var storage = rtpStorage();
        storage[key] = value;
        updateLocalStorage(storage);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    function removeItem(key) {
        /** @type {?} */
        var storage = rtpStorage();
        if (storage[key]) {
            delete storage[key];
        }
        updateLocalStorage(storage);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @return {?}
     */
    function getLocalStorage() {
        return window.localStorage;
    }
    /**
     * @return {?}
     */
    function getDigitalData() {
        if (window['digitalData'] !== undefined) {
            return window['digitalData'];
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Constants = (function () {
        function Constants() {
        }
        Constants.API_VERSION = "?version=1.0";
        Constants.DEFAULT_CONTENTID = "6ebdae16-b68f-46ab-8e4f-9fa0aadeb732";
        Constants.REQ_URL = "http://rules-publisher-canary.wrtp-gil-barron.us-south.containers.mybluemix.net/";
        Constants.CARICATURE_API = "service/results/";
        Constants.TENANT_API = "service/channel-tenant/environment/";
        Constants.RULE_API = "service/rtp/";
        // Contextual Data
        Constants.OS_TYPES = ["Macintosh", "Windows", "Linux"];
        Constants.BROWSER_TYPES = [
            "Opera",
            "Chrome",
            "Safari",
            "Firefox",
            "Internet Explorer"
        ];
        Constants.DEVICE_TYPES = ["Desktop", "Mobile", "Tablet"];
        Constants.CON_BROWSER = "contextual.browser";
        Constants.CON_OPERATING_SYSTEM = "contextual.operating-system";
        Constants.CON_DEVICE_TYPE = "contextual.device-type";
        return Constants;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @type {?} */
    var caricatureData;
    /**
     * @param {?} __callback
     * @return {?}
     */
    function getCaricatureData(__callback) {
        /** @type {?} */
        var host;
        /** @type {?} */
        var tenantAPIUrl;
        /** @type {?} */
        var caricatureURL;
        /** @type {?} */
        var caricatureData;
        host = document.location.host;
        // tenantAPIUrl =
        //     Constants.REQ_URL +
        //     Constants.TENANT_API +
        //     hostname +
        //     Constants.API_VERSION;
        caricatureURL =
            Constants.REQ_URL +
                Constants.CARICATURE_API +
                "placeholder" + "/" +
                Common.getCookie('_visitorid') +
                Constants.API_VERSION;
        // if (!!!__callback && tenantAPIUrl) {
        if (!!!__callback && caricatureURL) {
            // Common.jsAjax(tenantAPIUrl)
            // .then((data => {
            // tenantResponse = JSON.parse(data.toString());
            // caricatureURL = caricatureURL.replace("placeholder", tenantResponse["id"]);
            caricatureURL = caricatureURL.replace("placeholder", "sk123456");
            // caricatureURL = caricatureURL.replace("placeholder", "ct-vUsWT2wg");
            // caricatureURL = caricatureURL.replace("placeholder", "ct-lrxdbryg");
            Common.jsAjax(caricatureURL)
                .then(function (res) {
                caricatureData = JSON.parse(res.toString());
                Common.setCarData(caricatureData);
            })
                .catch(function (error) {
                console.log("WR:caricatureDataError", error);
            });
            // }))
            // .catch((error) => {
            //     console.log("WR:TenantDataError", error);
            // })
        }
        else {
            return __callback({ tenantAPIUrl: tenantAPIUrl, caricatureURL: caricatureURL });
        }
    }
    /**
     * @param {?} data
     * @return {?}
     */
    function setCarData(data) {
        caricatureData = data;
        console.log("WR:caricatureData is SET", caricatureData);
    }
    /**
     * @return {?}
     */
    function getCarData() {
        return caricatureData;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @type {?} */
    var contentIdentifier$1 = Constants.DEFAULT_CONTENTID;
    /**
     * @param {?} __zoneId
     * @return {?}
     */
    function Personalization(__zoneId) {
        /** @type {?} */
        var __callback = Common.getCallback();
        /** @type {?} */
        var host;
        /** @type {?} */
        var tenantAPIUrl;
        /** @type {?} */
        var ruleAPIUrl;
        /** @type {?} */
        var arrLclStrg;
        /** @type {?} */
        var arrContextualData;
        arrContextualData = [Common.getBrowserType(), Common.getOSType(), Common.getDeviceType()];
        console.log('WR:contextual data::', Common.getBrowserType(), Common.getOSType(), Common.getDeviceType());
        host = document.location.host;
        // tenantAPIUrl = Constants.REQ_URL + Constants.TENANT_API + hostname + Constants.API_VERSION;
        ruleAPIUrl = Constants.REQ_URL + Constants.RULE_API + "placeholder" + "/" + __zoneId + Constants.API_VERSION;
        // if (!!!__callback && tenantAPIUrl) {
        if (!!!__callback && ruleAPIUrl) {
            // return Common.jsAjax(tenantAPIUrl)
            // .then((data => {
            // tenantResponse = JSON.parse(data.toString());
            // ruleAPIUrl = ruleAPIUrl.replace("placeholder", tenantResponse["id"]);
            ruleAPIUrl = ruleAPIUrl.replace("placeholder", "sk123456");
            return Common.jsAjax(ruleAPIUrl)
                .then(function (res) {
                if (res) {
                    // console.log('WR:caricature data in personalization service::', Common.getCarData());
                    // console.log('WR:here local storage array::', Common.localStorage()['ibmrtp']);
                    if (Common.localStorage()['ibmrtp'] === undefined) {
                        arrLclStrg = [];
                    }
                    else {
                        arrLclStrg = JSON.parse(Common.localStorage()['ibmrtp']);
                    }
                    // console.log('WR:local storage data::', arrLclStrg, arrLclStrg.length);
                    contentIdentifier$1 = Common.matchRules(JSON.parse(res.toString()), Common.getCarData(), arrLclStrg, arrContextualData);
                    console.log('WR:content identifier in personalization service::', contentIdentifier$1);
                }
                else {
                    throw new Error('Value expected!');
                }
                // console.log('WR:local storage data::', arrLclStrg, arrLclStrg.length);
                return contentIdentifier$1;
            })
                .catch(function (error) {
                console.log("WR:caricatureDataError: '404''Published rules not found for the given Tenant Id and Zone Identifier !'", error);
            });
            // }))
            // .catch((error) => {
            //   console.log("WR:TenantDataError", error);
            // })
        }
        else {
            return __callback({ tenantAPIUrl: tenantAPIUrl, ruleAPIUrl: ruleAPIUrl });
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var __xhr = (function (obj) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(obj.method || "GET", obj.url);
            if (obj.headers) {
                Object.keys(obj.headers).forEach(function (key) {
                    xhr.setRequestHeader(key, obj.headers[key]);
                });
            }
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                }
                else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = function () { return reject(xhr.statusText); };
            xhr.send(obj.body);
        });
    });
    /** @type {?} */
    var frameworkCb;
    /**
     * @param {?} cb
     * @return {?}
     */
    function setCallback(cb) {
        frameworkCb = cb;
    }
    /**
     * @return {?}
     */
    function getCallback() {
        return frameworkCb;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @param {?} url
     * @return {?}
     */
    function jsAjax(url) {
        return Common.__xhr({
            url: url,
            headers: { 'Content-type': 'application/json;' }
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @param {?} name
     * @param {?} val
     * @return {?}
     */
    function setCookie(name, val) {
        /** @type {?} */
        var date = new Date();
        /** @type {?} */
        var value = val;
        // Set it expire in 7 days
        // date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
        date.setTime(date.getTime() + (3600 * 1000 * 24 * 365 * 1));
        // Set it
        document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
    }
    /**
     * @param {?} name
     * @return {?}
     */
    function getCookie(name) {
        /** @type {?} */
        var value = "; " + document.cookie;
        /** @type {?} */
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) {
            return parts.pop().split(";").shift();
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    function deleteCookie(name) {
        /** @type {?} */
        var date = new Date();
        // Set it expire in -1 days
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
        // Set it
        document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
    }
    /**
     * @return {?}
     */
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            /** @type {?} */
            var r = Math.random() * 16 | 0;
            /** @type {?} */
            var v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @param {?} arrObjRulesData
     * @param {?} caricatureData
     * @param {?} lclStrg
     * @param {?} arrContextualData
     * @return {?}
     */
    function matchRules(arrObjRulesData, caricatureData, lclStrg, arrContextualData) {
        /** @type {?} */
        var lclStrgBehaviors;
        /** @type {?} */
        var activityCriterion;
        /** @type {?} */
        var recencyCriterion;
        /** @type {?} */
        var maxAgeTime;
        /** @type {?} */
        var searchValue;
        /** @type {?} */
        var arrObjLocalBehavior;
        /** @type {?} */
        var arrLocalBehavior;
        /** @type {?} */
        var conditionId;
        /** @type {?} */
        var isContextual;
        /** @type {?} */
        var contentIdentifier = Constants.DEFAULT_CONTENTID;
        /** @type {?} */
        var boolIsContent = false;
        /** @type {?} */
        var boolIsCaricature = false;
        /** @type {?} */
        var carExpressions = [];
        /** @type {?} */
        var sRulesData;
        /** @type {?} */
        var rulesData = [];
        /** @type {?} */
        var contextualType;
        sRulesData = arrObjRulesData.sort(function (a, b) {
            return a.priority > b.priority ? 1 : b.priority > a.priority ? -1 : 0;
        });
        for (var i = 0; i < sRulesData.length; i++) {
            rulesData = rulesData.concat.apply(rulesData, __spread(sRulesData[i].contentRuleSet.rules));
        }
        console.log('WR:rules data::', rulesData);
        for (var i = 0; i < rulesData.length; i++) {
            console.log('WR:value of i::', i);
            activityCriterion = rulesData[i].condition.activityCriterion;
            conditionId = rulesData[i].condition.conditionId;
            recencyCriterion = rulesData[i].condition.recencyCriterion.intervalInMillis;
            maxAgeTime = getMaxAgeOfTime(recencyCriterion);
            isContextual = rulesData[i].condition.contextual;
            /*
                 * Check weather rules is matching with Contextual Data or not
                */
            if (isContextual === true) {
                switch (activityCriterion.activityType) {
                    case Constants.CON_BROWSER:
                        contextualType = arrContextualData[0].browserName;
                        break;
                    case Constants.CON_OPERATING_SYSTEM:
                        contextualType = arrContextualData[1].osName;
                        break;
                    case Constants.CON_DEVICE_TYPE:
                        contextualType = arrContextualData[2];
                        break;
                }
                if (activityCriterion.activityParameter.indexOf(contextualType) != -1) {
                    contentIdentifier = rulesData[i].contentIdentifier;
                    break;
                }
            }
            else {
                /*
                       * Check weather rules is matching with Caricature result or not
                      */
                if (caricatureData) {
                    carExpressions = caricatureData.expressions;
                    for (var j = 0; j < carExpressions.length; j++) {
                        console.log('WR:now condition ids::', carExpressions[j].id, conditionId);
                        if (carExpressions[j].id === conditionId) {
                            contentIdentifier = rulesData[i].contentIdentifier;
                            boolIsCaricature = true;
                            break;
                        }
                    }
                }
                /*
                       * If rule is not matched with caricature data then pick up data from localstorage for comparison
                      */
                if (boolIsCaricature === false && lclStrg) {
                    lclStrgBehaviors = lclStrg.behaviors;
                    for (var prop in lclStrgBehaviors) {
                        console.log('WR:data1::', activityCriterion.activityType, prop);
                        if (activityCriterion.activityType === prop) {
                            for (var k = lclStrgBehaviors[prop].length - 1; k >= 0; k--) {
                                arrObjLocalBehavior = lclStrgBehaviors[prop][k];
                                arrLocalBehavior = Object.getOwnPropertyNames(arrObjLocalBehavior.at);
                                console.log('WR:local behavior::', arrLocalBehavior);
                                searchValue = arrObjLocalBehavior.at[arrLocalBehavior[1]];
                                console.log('WR:data2::', searchValue, activityCriterion.activityParameter);
                                if (activityCriterion.activityParameter.indexOf(searchValue) != -1 && (arrObjLocalBehavior.ts >= maxAgeTime || recencyCriterion === 0)) {
                                    console.log('WR:Got a match::', arrObjLocalBehavior.ts, maxAgeTime);
                                    contentIdentifier = rulesData[i].contentIdentifier;
                                    console.log('WR:Return this content identifier::', contentIdentifier);
                                    boolIsContent = true;
                                    break;
                                }
                            }
                        }
                        if (boolIsContent === true)
                            break;
                    }
                }
                if (boolIsContent === true || boolIsCaricature === true)
                    break;
            } // end of else
        }
        return contentIdentifier;
    }
    /**
     * @param {?} recCriteria
     * @return {?}
     */
    function getMaxAgeOfTime(recCriteria) {
        /** @type {?} */
        var e = new Date(new Date().getTime() - recCriteria);
        return e.getTime();
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @return {?}
     */
    function getNavigatorAppVersion() {
        return window.navigator.appVersion;
    }
    /**
     * @return {?}
     */
    function getNavigatorUserAgent() {
        return window.navigator.userAgent;
    }
    /**
     * @return {?}
     */
    function getNavigatorLocale() {
        return window.navigator['languages'] !== undefined
            ? window.navigator['languages'][0]
            : window.navigator.language;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @return {?}
     */
    function getBrowserType() {
        return detectBrowser(window);
    }
    /**
     * @param {?} window
     * @return {?}
     */
    function detectBrowser(window) {
        /** @type {?} */
        var browser = null;
        /** @type {?} */
        var version = null;
        /** @type {?} */
        var ngtrUA = Common.getNavigatorUserAgent();
        /** @type {?} */
        var offset;
        if (((offset = ngtrUA.indexOf('Opera')) || ngtrUA.indexOf('OPR')) !== -1) {
            browser = 'Opera';
            version = ngtrUA.substring(offset + 6).split(' ')[0];
        }
        else if ((offset = ngtrUA.indexOf('Chrome')) !== -1) {
            browser = 'Chrome';
            version = ngtrUA.substring(offset + 7).split(' ')[0];
        }
        else if ((offset = ngtrUA.indexOf('Safari')) !== -1) {
            browser = 'Safari';
            version = ngtrUA.substring(offset + 7).split(' ')[0];
        }
        else if ((offset = ngtrUA.indexOf('Firefox')) !== -1) {
            browser = 'Firefox';
            version = ngtrUA.substring(offset + 8).split(' ')[0];
        }
        else if ((offset = ngtrUA.indexOf('MSIE')) !== -1) {
            // IF IE > 10
            browser = 'Internet Explorer';
            version = ngtrUA.substring(offset + 5).split(' ')[0];
        }
        else {
            browser = 'unknown';
            version = 'unknown';
        }
        return { browserName: browser, browserVersion: version };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @return {?}
     */
    function getDeviceType() {
        /** @type {?} */
        var deviceType;
        return (deviceType = detectDevice());
    }
    /**
     * @return {?}
     */
    function detectDevice() {
        /** @type {?} */
        var device;
        // device = window.navigator.userAgent.includes('Mobi') ? 'Mobile' : 'Desktop';
        device = Common.getNavigatorUserAgent().includes('Mobi')
            ? 'Mobile'
            : 'Desktop';
        return device || 'Unknown Device';
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @return {?}
     */
    function getLocale() {
        return Common.getNavigatorLocale();
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * @return {?}
     */
    function getOSType() {
        return detectOS();
    }
    /**
     * @return {?}
     */
    function detectOS() {
        /** @type {?} */
        var osName = 'Unknown OS';
        /** @type {?} */
        var osVersion;
        /** @type {?} */
        var clientStrings = [
            { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
            { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
            { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
            { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
            { s: 'Windows Vista', r: /Windows NT 6.0/ },
            { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
            { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
            { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
            { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
            { s: 'Windows 98', r: /(Windows 98|Win98)/ },
            { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
            { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
            { s: 'Windows CE', r: /Windows CE/ },
            { s: 'Windows 3.11', r: /Win16/ },
            { s: 'Android', r: /Android/ },
            { s: 'Open BSD', r: /OpenBSD/ },
            { s: 'Sun OS', r: /SunOS/ },
            { s: 'Linux', r: /(Linux|X11)/ },
            { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
            { s: 'Mac OS X', r: /Mac OS X/ },
            { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
            { s: 'QNX', r: /QNX/ },
            { s: 'UNIX', r: /UNIX/ },
            { s: 'BeOS', r: /BeOS/ },
            { s: 'OS/2', r: /OS\/2/ },
            {
                s: 'Search Bot',
                r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
            }
        ];
        /** @type {?} */
        var ngtrAV = Common.getNavigatorUserAgent();
        for (var id in clientStrings) {
            /** @type {?} */
            var cs = clientStrings[id];
            if (cs.r.test(ngtrAV)) {
                osName = cs.s;
                break;
            }
        }
        if (/Windows/.test(osName)) {
            osVersion = /Windows (.*)/.exec(osName)[1];
            osName = 'Windows';
        }
        switch (osName) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(ngtrAV)[1];
                break;
            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(ngtrAV)[1];
                break;
            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(Common.getNavigatorAppVersion());
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }
        return { osName: osName, osVersion: osVersion };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @type {?} */
    var Common = {
        // BehaviorRepositoryService
        cleanUpOldStorage: cleanUpOldStorage,
        getBehaviors: getBehaviors,
        behaviorsWithCurrentVersion: behaviorsWithCurrentVersion,
        updateBehaviors: updateBehaviors,
        storeUBXEvent: storeUBXEvent,
        //////////////////////////////
        // LocalStorageService
        start: start,
        /////////////////////////////
        // PagePropertiesService,
        getTime: getTime,
        getProductViewAttribute: getProductViewAttribute,
        getProductViewValue: getProductViewValue,
        getProductViewCategory: getProductViewCategory,
        /////////////////////////////
        // SetDDoService
        setPageView: setPageView,
        /////////////////////////////
        // StorageService
        rtpStorage: rtpStorage,
        localStorage: localStorage,
        retrieveRtpStorage: retrieveRtpStorage,
        updateLocalStorage: updateLocalStorage,
        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem,
        /////////////////////////////
        // WindowPropertiesService
        getLocalStorage: getLocalStorage,
        getDigitalData: getDigitalData,
        /////////////////////////////
        // CaricatureService
        getCaricatureData: getCaricatureData,
        getCarData: getCarData,
        setCarData: setCarData,
        /////////////////////////////
        // PersonalizationService
        Personalization: Personalization,
        /////////////////////////////
        // XhrService
        __xhr: __xhr,
        setCallback: setCallback,
        getCallback: getCallback,
        /////////////////////////////
        // CookieService
        getCookie: getCookie,
        setCookie: setCookie,
        deleteCookie: deleteCookie,
        uuidv4: uuidv4,
        /////////////////////////////
        // jsAjax
        jsAjax: jsAjax,
        /////////////////////////////
        // MatchRule
        matchRules: matchRules,
        /////////////////////////////
        // NavigatorService
        getNavigatorAppVersion: getNavigatorAppVersion,
        getNavigatorUserAgent: getNavigatorUserAgent,
        getNavigatorLocale: getNavigatorLocale,
        /////////////////////////////
        // BrowserTypeService
        getBrowserType: getBrowserType,
        /////////////////////////////
        // DeviceTypeService
        getDeviceType: getDeviceType,
        /////////////////////////////
        // LocaleService
        getLocale: getLocale,
        /////////////////////////////
        // OperatingSystemService
        getOSType: getOSType
        /////////////////////////////
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var StartXEngine = (function () {
        function StartXEngine() {
        }
        /**
         * @return {?}
         */
        StartXEngine.create = /**
         * @return {?}
         */
            function () {
                if (!Common.getCookie('_visitorid')) {
                    Common.setCookie('_visitorid', Common.uuidv4());
                }
                /** @type {?} */
                var notifyChange = function (arr, callback) {
                    if (arr !== undefined) {
                        /** @type {?} */
                        var oldPush_1 = arr.push;
                        arr.push = function (e) {
                            oldPush_1.apply(arr, arguments);
                            callback(arr[arr.length - 1]);
                        };
                    }
                };
                notifyChange(window['ubxEvents'], function (recentUBXEvent) {
                    Common.setPageView(recentUBXEvent);
                    Common.start();
                });
                return Object.create(this.prototype);
            };
        return StartXEngine;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @type {?} */
    var outletDiv;
    /**
     * @param {?} outlet
     * @return {?}
     */
    function setOutlet(outlet) {
        if (document.getElementById(outlet)) {
            return outletDiv = ensureOutlet(document.getElementById(outlet));
        }
    }
    /**
     * @param {?} outlet
     * @return {?}
     */
    function ensureOutlet(outlet) {
        if (!(outlet instanceof Node)) {
            console.error('Expected router outlet to be a valid DOM Node (but got' + outlet + ')');
        }
        return outlet;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /** @type {?} */
    var Outlet = {
        setOutlet: setOutlet
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var WRTP = (function () {
        function WRTP() {
        }
        /**
         * @param {?=} __callback
         * @return {?}
         */
        WRTP.create = /**
         * @param {?=} __callback
         * @return {?}
         */
            function (__callback) {
                Common.setCallback(__callback);
                StartXEngine.create();
                Common.getCaricatureData(__callback);
                return Object.create(this.prototype);
            };
        /**
         * @param {?} tenentId
         * @param {?} authKey
         * @return {?}
         */
        WRTP.init = /**
         * @param {?} tenentId
         * @param {?} authKey
         * @return {?}
         */
            function (tenentId, authKey) {
                console.log("WR:", tenentId, authKey);
            };
        /**
         * @param {?} __zoneId
         * @return {?}
         */
        WRTP.prototype.__getContentId = /**
         * @param {?} __zoneId
         * @return {?}
         */
            function (__zoneId) {
                return Common.Personalization(__zoneId);
            };
        /**
         * @param {?} outlet
         * @return {?}
         */
        WRTP.prototype.__setOutlet = /**
         * @param {?} outlet
         * @return {?}
         */
            function (outlet) {
                return Outlet.setOutlet(outlet);
            };
        return WRTP;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var JsWRTP = (function (_super) {
        __extends(JsWRTP, _super);
        function JsWRTP() {
            return _super.call(this) || this;
        }
        /**
         * @return {?}
         */
        JsWRTP.create = /**
         * @return {?}
         */
            function () {
                WRTP.create();
                return Object.create(this.prototype);
            };
        return JsWRTP;
    }(WRTP));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    /**
     * Framework dependent library
     */
    // export * from "./dependent/ngWrtp";

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.JsWRTP = JsWRTP;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
