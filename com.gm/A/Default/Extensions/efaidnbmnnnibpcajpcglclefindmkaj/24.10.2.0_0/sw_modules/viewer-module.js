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
import{analytics as e}from"../common/analytics.js";import{communicate as t}from"./communicate.js";import{util as n}from"./util.js";import{SETTINGS as r}from"./settings.js";import{dcLocalStorage as o}from"../common/local-storage.js";import{downloadManager as s}from"./download-manager.js";import{privateApi as a}from"./private-api.js";import{viewerModuleUtils as i}from"./viewer-module-utils.js";import{floodgate as c}from"./floodgate.js";import{openLocalFteWindow as u}from"./ch-context-menu.js";import{offscreenActions as l}from"./offscreen-actions.js";import{CACHE_PURGE_SCHEME as m}from"./constant.js";let f=null,p=!1,d=chrome.runtime.getURL("viewer.html"),E=!1,_={};function h(e){if(void 0!==e.responseHeaders){const t=w(e.responseHeaders,"content-length");if(t)return t.value}}chrome.extension.isAllowedFileSchemeAccess((e=>{E=e}));const I=e=>{chrome.tabs.get(e.tabId,(e=>{chrome.runtime.lastError||g(e)}))};function g(e){if(!r.IS_READER&&0!=t.version&&(1!=t.version||0!=t.NMHConnStatus)&&e.url){const t=new URL(e.url);chrome.runtime.id===t.host?(chrome.contextMenus.update("convertPageContextMenu",{visible:!1}),chrome.contextMenus.update("appendPageContextMenu",{visible:!1})):(chrome.contextMenus.update("convertPageContextMenu",{visible:!0}),chrome.contextMenus.update("appendPageContextMenu",{visible:!0}))}}function v(e){const t=new Date;t.setMinutes(t.getMinutes()+r.VIEWER_RECHECK_CDN_ACCESS_DELAY_MINS),o.setItem("netAccAdT",t.getTime()),o.setItem("netAcc",e)}const R=e=>{if(!e||null===e||"undefined"===e)return!1;let t=[/^chrome\:\/\//,/^chrome\-extension\:\/\//,/^https:\/\/([a-zA-Z\d-]+\.){0,}officeapps.live.com/,/^https\:\/\/*.*\/(saml|login)/,/^https:\/\/sharedcloud.([a-zA-Z\d-]+)+.(s3|s3-accelerate).amazonaws.com/,/^https\:\/\/*.*.\/(login|auth|okta|saml).*\/S*|\/(login|auth|okta|saml|IWA|owa)\//,/^https\:\/\/www.google.com\/search\?q/,/^https\:\/\/www.citibank.*/,/^https:\/\/[^/]*\.*\/([$-/:-?{-~!"^_`\[\]A-Za-z0-9]*)view-sdk/];let n=c.getFeatureMeta("dc-cv-invalid-urls");if(n){n=JSON.parse(n);for(let e in n)n[e]=new RegExp(n[e]);t=n}return!![/^http\:\/\/[^/]/,/^https\:\/\/[^/]/,/^file?:/].find((t=>t.test(e)))&&!t.find((t=>t.test(e)))};function L(){try{return"true"===o.getItem("pdfViewer")}catch(e){return!1}}function w(e,t){for(let n=0;n<e.length;++n){let r=e[n];if(r.name.toLowerCase()===t)return r}}function C(t){if(void 0!==t.responseHeaders){const n=w(t.responseHeaders,"content-type"),r=w(t.responseHeaders,"content-disposition"),o=t.url&&new URLSearchParams(t.url)?.has("acrobatPromotionSource");if(n){const s=n.value.toLowerCase().split(";",1)[0].trim();if(r&&/^\s*attachment[;]?/i.test(r.value)&&!o)return!1;if("application/pdf"===s)return!0;if("application/octet-stream"===s){if(r&&/\.pdf(["']|$)/i.test(r.value))return e.event(e.e.VIEWER_PDF_PROCESS_OS_CD),!0;t.url.toLowerCase().indexOf(".pdf")>0&&e.event(e.e.VIEWER_PDF_PROCESS_OS_URL)}}}else if("file"==function(e){let t=e.indexOf("/");return e.substr(0,t-1)}(t.url)&&"PDF"==function(e){if(e)try{let t=new URL(e).pathname;return t.substr(t.lastIndexOf(".")+1).toUpperCase()}catch(e){return""}return""}(t.url))return!0;return!1}const b=async(r,o,a)=>{const i=a.incognito;if("complete"===a.status&&g(a),"loading"===o.status){t.loading({id:r});try{!n.isViewerURL(a.url)||L()&&!i||D(r,function(e,t){t||(t=window.location.href);try{const n=new URL(t);return new URLSearchParams(n.search).get(e)}catch(e){return}}("pdfurl",a.url))}catch(e){}}else if("complete"===o.status){s.newTab(a.url,r);const t=await chrome.extension.isAllowedFileSchemeAccess();a.url.toLowerCase().startsWith("file://")&&a.url.toLowerCase().endsWith(".pdf")&&!t&&(u(a),e.event(e.e.LOCAL_FILE_OPENED))}};function D(e,t){e&&t&&chrome.tabs.update(e,{url:t})}function A(e){try{const t=new URL(e.url),n=new URLSearchParams(t.search);let r=!1;const o=e.initiator;return o&&["https://classroom.google.com","https://mail.google.com","https://drive.google.com"].includes(o)&&n.forEach(((e,t)=>{t.startsWith("print")&&"true"===e&&(r=!0)})),r}catch(e){return!1}}async function P(t){try{if(o.getItem("retryOnNextPage")){await chrome.scripting.executeScript({target:{tabId:t},files:["content_scripts/injectCopyLSIframe.js"]}),await n.sleep(300),e.event(e.e.LOCAL_STORAGE_MIGRATION_RETRYING);const r=await chrome.runtime.sendMessage({main_op:"copy-ls"});chrome.tabs.sendMessage(t,{content_op:"remove-lsCopy"}).catch((()=>null)),"succeed"===r&&(e.event(e.e.LOCAL_STORAGE_MIGRATION_RETRYING_SUCCESS),o.removeItem("retryOnNextPage"),Object.assign(o.storage,await chrome.storage.local.get()))}}catch(e){}}const O=(T=chrome.runtime.getURL(""),T?.replace(/\/+$/,""));var T;function S(t){t.initiator!==O&&"main_frame"!==t.type&&function(t){if(void 0!==t.responseHeaders){const n=w(t.responseHeaders,"content-type"),r=w(t.responseHeaders,"content-disposition");if(n){const o=n.value.toLowerCase().split(";",1)[0].trim();if("application/pdf"===o)return e.event(e.e.VIEWER_PDF_DETECT_EMBED_PDF_TYPE_PDF),!0;if("application/octet-stream"===o){if(r&&/\.pdf(["']|$)/i.test(r.value))return e.event(e.e.VIEWER_PDF_DETECT_EMBED_PDF_OCTET_CD),!0;if(new URL(t.url).pathname.toLowerCase().endsWith(".pdf"))return e.event(e.e.VIEWER_PDF_DETECT_EMBED_PDF_OCTET_URL),!0}}}return!1}(t)&&e.event(e.e.VIEWER_PDF_DETECT_EMBED_PDF)}function F(t){a.isMimeHandlerAvailable().then((async s=>{const{tabId:a}=t;if(await P(a),o.getItem("sessionStarted")||(o.setItem("sessionId",n.uuid()),o.setItem("sessionStarted",!0)),!s){let o=n.parseExtensionURL(t.url);if(o){o=d+"?pdfurl="+o+"&tabId="+a+"&aw=true";let n=t.url.indexOf("#");n>0&&(o+=t.url.slice(n)),r.VIEWER_ENABLED&&L()&&!p&&e.event(e.e.VIEWER_EXTN_PDF_OPENED,{tabURL:o}),chrome.tabs.update(a,{url:o})}}}))}function N(t){try{c.hasFlag("dc-cv-enable-webpage-domain-tracking",m.NO_CALL).then((n=>{if(n&&"main_frame"===t.type){const n=new URL(t.url).hostname;e.event(e.e.VIEWER_PDF_WEBPAGE_OPENED,{domain:n})}}))}catch(e){}}function y(s,c){a.isMimeHandlerAvailable().then((async a=>{o.getItem("sessionStarted")||(o.setItem("sessionId",n.uuid()),o.setItem("sessionStarted",!0));const{tabId:u}=s;if(a){const e=A(s),t=s.tabId;t>-1&&(_[t]={isGooglePrint:e})}else{if("main_frame"===s.type){if(await P(u),!function(){if(!navigator.onLine&&o.getItem("offlineSupportDisable"))return!1;const e=new Date,t=o.getItem("netAcc"),n=o.getItem("netAccAdT");return!(n&&n>e.getTime())||t}()||!function(t){if("GET"!==t.method||!r.VIEWER_ENABLED||!L())return!1;let n=t.url,s=`reloadurl-${t.tabId}`;const a=o.getItem(s);if(a&&a===n){try{o.removeItem(s)}catch(e){}return!1}if(!R(n))return!1;const i=C(t);return p?(i&&e.event(e.e.VIEWER_FALLBACK_TO_NATIVE_INCOGNITO),!1):i}(s))return;if(c&&!E)return void e.event(e.e.VIEWER_PDF_LOCAL_FILE_IGNORED);f=s.url,c&&e.event(e.e.VIEWER_PDF_LOCAL_FILE),i.updateVariables(t.version),i.fetchAndUpdateVersionConfig();let{viewerURL:n,acceptRanges:a}=function(e){let t=d,n=!1;if(t+="?pdfurl="+encodeURIComponent(e.url),t+="&tabId="+e.tabId,void 0!==e.responseHeaders){const r=h(e);r&&(t+="&clen="+r);const o=w(e.responseHeaders,"accept-ranges");o&&o.value&&"bytes"===o.value.toLowerCase()&&(t+="&chunk=true",n=!0);const s=w(e.responseHeaders,"content-disposition");if(s&&s.value&&/\.pdf(["']|$)/i.test(s.value)){const e=/filename[^;=\n\*]?=((['"]).*?\2|[^;\n]*)/.exec(s.value);null!=e&&e.length>1&&(t+="&pdffilename="+e[1].replace(/['"]/g,""))}}return A(e)&&(t+="&googlePrint=true"),{viewerURL:t,acceptRanges:n}}(s);e.event(e.e.VIEWER_EXTN_PDF_OPENED,{tabURL:f});const m=h(s),_=void 0!==m?Number(m):m;l.setupWorkerOffscreen({tabId:u,pdfURL:s.url,pdfSize:_,acceptRanges:a});for(let e=0;e<20;e++)try{await chrome.tabs.update(u,{url:n})}catch(e){}}"sub_frame"===s.type&&function(e){return/^https:\/\/[^/]*(acrobat|adobe)\.com\/proxy\/chrome-viewer/.test(e)}(s.url)&&(200!==s.statusCode?403===s.statusCode?(o.setItem("pdfViewer","false"),e.event(e.e.VIEWER_FALLBACK_TO_NATIVE_CDN_FORBIDDEN,{tabURL:s.url}),D(s.tabId,f)):(v(!1),e.event(e.e.VIEWER_FALLBACK_TO_NATIVE_CDN_OFFLINE,{tabURL:s.url}),D(s.tabId,f)):v(!0))}}))}t.registerHandlers({"check-is-google-print":function(e,t,n){return _&&_[e.tabId]?n({isGooglePrint:_[e.tabId].isGooglePrint}):n({isGooglePrint:!1})}});export{y as processRequest,F as honorRequest,I as onTabActivated,b as onTabsUpdated,S as detectEmbeddedPDF,N as logWebpageDomain};