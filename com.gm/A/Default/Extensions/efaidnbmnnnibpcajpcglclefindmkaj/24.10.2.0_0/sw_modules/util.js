/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2015 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by all applicable intellectual property laws,
* including trade secret and or copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/
import{ajax as e,ajaxError as t,each as r,Deferred as n,extend as o,param as i}from"./polyfills.js";import{SETTINGS as s}from"./settings.js";import{validFrictionlessLocales as a,validFrictionlessOCRLocales as c,validFrictionlessChatPdfLocales as u}from"../common/constant.js";import{dcLocalStorage as m}from"../common/local-storage.js";var l=["http","https","ftp","file","blob","data","filesystem","drive"],f=chrome.runtime.getURL("/");let d;export const util={extend:o,getFrictionlessLocale:function(e){return a[e]||a.en},getFrictionlessLocaleChatPdf:function(e){return u[e]},getFrictionlessLocaleOcrPdf:function(e){return c[e]},isChrome:function(){return!0},isLocalFileUrl:e=>e.startsWith("file:///")&&(e.endsWith(".pdf")||e.endsWith(".PDF")),isEdge:function(){let e=navigator.userAgent.toLowerCase();return-1!==e.indexOf("chrome")&&-1!==e.indexOf("edg/")},isChromeOnlyMessage:function(e){return-1!==["web2pdfMissingMac","web2pdfFrictionlessUrl","web2pdfBadVersion","pdfOwnershipExploreAcrobat","pdfOwnershipPromptContent","LearnMoreURL"].indexOf(e)},getBrowser:function(){return this.isEdge()?2:1},stackDelimiter:function(){return"\n"},Deferred:n,each:r,ajax:e,ajaxError:t,param:i,newBlob:function(e){return new Blob(e)},newFormData:function(){return new FormData},newXHR:function(){return new XMLHttpRequest},createTab:function(e,t){return t?chrome.tabs.create({url:e,active:!0},t):chrome.tabs.create({url:e,active:!0})},isDevEnv:function(){var e=n();return chrome.management.getSelf((function(t){e.resolve("development"===t.installType)})),e.promise()},closeWindow:function(e){chrome.windows.remove(e.id)},getTranslation:function(e,t){if(e)return this.isChromeOnlyMessage(e)&&this.isEdge()&&(e+="Edge"),t?chrome.i18n.getMessage(e,t):chrome.i18n.getMessage(e)},sendMessage:function(e,t,r){chrome.tabs.sendMessage(e.tabId,e,r)},consoleLog:function(...e){s.DEBUG_MODE&&console.log(...e)},consoleLogDir:function(...e){s.DEBUG_MODE&&console.dir(...e)},consoleError:function(...e){s.DEBUG_MODE&&console.error(...e)},atob16:function(e){var t,r=atob(e),n=[];for(t=0;t<r.length;t+=2)n.push(String.fromCharCode(r.charCodeAt(t)+256*r.charCodeAt(t+1)));return n.join("")},removeQueryParams:function(e){const t=e.split("?");return null!=t?t[0]:e},parseExtensionURL:function(e){var t=(e=e.substring(f.length)).search(/:|%3A/i);if(-1!==t){var r=e.slice(0,t).toLowerCase();return l.includes(r)?(":"===(e=e.split("#")[0]).charAt(t)&&(e=encodeURIComponent(e)),e):void 0}},isViewerURL:function(e){if(e)try{var t=e.substring(f.length),r=t.search(/:|%3A/i);if(-1!==r){var n=t.slice(0,r).toLowerCase();if(l.includes(n))return!0}return e.startsWith(`chrome-extension://${chrome.runtime.id}/viewer.html`)}catch(e){}return!1},uuid:function(){try{let e=(new Date).getTime();return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){let r=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"===t?r:3&r|8).toString(16)}))}catch(e){return Math.random()}},sleep:e=>new Promise((t=>setTimeout(t,e))),verCmp:(e,t)=>e.localeCompare(t,void 0,{numeric:!0,sensitivity:"base"}),isAcrobatAvailable:e=>!(0==e||1==e||e===s.READER_VER||e===s.ERP_READER_VER),mimeReloadAllTabs:()=>{const e=m.getItem("loadedTabsInfo"),t=e?.tabsInfo||[];chrome.tabs.query({},(e=>{e.forEach((({id:e})=>{t.includes(e)&&chrome.tabs.reload(e)}));const r=m.getItem("settingsWindow");r&&setTimeout((()=>{chrome.windows.remove(r.id),m.removeItem("settingsWindow"),chrome.tabs.query({active:!0,currentWindow:!0},(e=>{chrome.runtime.sendMessage({content_op:"showLocalFileAccessToast",tabId:e[0].id})}))}),1e3)})),m.removeItem("loadedTabsInfo")},setupOffscreenDocument:async({path:e,reasons:t,justification:r})=>{try{if((await chrome.runtime.getContexts({contextTypes:["OFFSCREEN_DOCUMENT"]})).length>0)return;d||(d=!0,await chrome.offscreen.createDocument({url:e,reasons:t,justification:r}))}finally{d=!1}},isAcrobatOrigin:e=>/^https:\/\/((dev|stage)+\.){0,}acrobat\.adobe\.com?$/.test(e),isAdobeOrigin:e=>/^https:\/\/www\.((dev01|stage)+\.){0,}adobe\.com?$/.test(e),checkOS:async()=>{const e=await chrome.runtime.getPlatformInfo();var t;s.OS=e.os,s.CHROME_VERSION=0,s.EXTENSION_VERSION=0;try{(t=navigator.userAgent.match(/Chrome\/([0-9]+)/))&&(s.CHROME_VERSION=+t[1])}catch(e){}try{s.EXTENSION_VERSION=chrome.runtime.getManifest().version}catch(e){}return e.os}};