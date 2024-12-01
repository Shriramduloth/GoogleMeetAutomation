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
import{common as e}from"./common.js";import{getVersionConfig as t}from"./api-util.js";import{util as i}from"./util.js";import{SETTINGS as n}from"./settings.js";import{dcLocalStorage as o}from"../common/local-storage.js";import{floodgate as c}from"./floodgate.js";import{loggingApi as s}from"../common/loggingApi.js";import{analytics as r}from"../common/analytics.js";let a;a||(a=new function(){this.updateVariables=async function(t){try{let r=0!=t&&1!=t&&-1!=t,a=!(!r||t===n.READER_VER||t===n.ERP_READER_VER);o.setItem("locale",i.getFrictionlessLocale(chrome.i18n.getMessage("@@ui_locale"))),o.setItem("cdnUrl",e.deriveCDNURL(e.getEnv())),o.setItem("signInUrl",e.getSignInUrl()),o.setItem("isDeskTop",r),o.setItem("env",e.getEnv()),o.setItem("viewerImsClientId",e.getViewerIMSClientId()),o.setItem("imsContextId",e.getImsContextId()),o.setItem("viewerImsClientIdSocial",e.getViewerIMSClientIdSocial()),o.setItem("imsURL",e.getIMSurl()),o.setItem("imsLibUrl",e.getImsLibUrl()),o.setItem("dcApiUri",e.getDcApiUri()),o.setItem("isAcrobat",a),o.getItem("theme")||o.setItem("theme","auto");const l={"dc-cv-enable-download-dialog":"edd","dc-cv-rapid-rendition-view":"rrv","dc-cv-lin-rrv":"lrrv","dc-cv-save-location-on-options":"isSaveLocationPrefEnabled","dc-cv-enable-splunk-logging":"splunkLoggingEnable","dc-cv-enable-embed-viewer":"ev","dc-cv-ext-menu-dark-mode":"enableExtMenuDarkMode","dc-cv-alloy-on":"ao","dc-register-access-token-expired":"rate","dc-cv-alloy-on-ext-menu":"aoem","dc-cv-image-print":"ip","dc-cv-document-properties":"sdp","dc-cv-show-digital-signature":"sds","dc-cv-enable-cdn-versioning":"enableCDNVersioning","dc-cv-gen-ai":"genAI","dc-cv-premium-icon":"pi","dc-cv-mega-verbs":"mv","dc-cv-keyboard-shortcut":"ks","dc-cv-inline-rs":"rs","dc-cv-enable-CSRF":"enableCSRF","dc-cv-night-mode":"supportNightMode","dc-cv-thumbnail-plg-test":"tpt","dc-cv-local-file-access-tp":"lft","dc-cv-upsell-full-screen-chrome":"fsu","dc-cv-doc-cloud-share":"dcs","dc-cv-enable-genai-limits-api":"egal","dc-cv-other-tab-signout":"ots","dc-cv-cdn-sign-in":"csi","dc-cv-settings-window":"openSettingsInWindow","dc-cv-localised-gif":"showLocalisedGif","dc-cv-enable-guest-genai":"gga","dc-cv-reset-counter":"rc","dc-cv-decrease-cooldown":"dc","dc-cv-enable-pnb":"pnb","dc-cv-enable-akamai":"akamai","dc-cv-subscription-v2-api":"subv2","dc-cv-s3-download":"s3d","dc-cv-ims-profile-switcher":"ips","dc-cv-resolve-ims-promise-error":"ripe"};navigator.onLine&&(l["dc-cv-offline-support-disable"]="offlineSupportDisable");const d=await Promise.all(Object.entries(l).map((([e,t])=>this.checkFeatureEnable({flagName:e,storageKey:t}).then((e=>[t,e]))))),m=Object.fromEntries(d),v=m.isSaveLocationPrefEnabled,g=m.splunkLoggingEnable,p=m.supportNightMode;if(!v&&o.getItem("saveLocation")?o.removeItem("saveLocation"):v&&!o.getItem("saveLocation")&&o.setItem("saveLocation","ask"),!p&&o.getItem("isDarkPageThemeEnabled")&&o.removeItem("isDarkPageThemeEnabled"),s.registerLogInterval(g),g){let e=c.getFeatureMeta("dc-cv-enable-splunk-logging")||{};e=JSON.parse(e),o.setItem("allowedLogIndex",e.index)}o.removeItem("allownft")}catch(e){console.error("Error checking feature flags:",e)}},this.checkFeatureEnable=async function(e){const{flagName:t,storageKey:i}=e,n=await c.hasFlag(t);return i&&o.setItem(i,!!n),n},this.fetchAndUpdateVersionConfig=async function(){if(o.getItem("enableCDNVersioning"))try{const e=await t();if(e){const t={...i("prod",e.prod),...i("non_prod",e.non_prod)};o.setItem("version-config",t)}}catch(e){console.log(new Error(`Version Config failure: ${e}`))}function e(e,t){for(var i in e.extension)if(e.extension[i].id===t)return{iv:e.extension[i].internal_version,ev:e.extension[i].external_version}}function i(t,i){if(!i)return;let n={};const o=e(i,"all_extensions"),c=e(i,chrome.runtime.id);return n[`ev_${t}`]="inherit"!==c?.ev?c?.ev:o?.ev,n[`iv_${t}`]="inherit"!==c?.iv?c?.iv:o?.iv,n}}});export const viewerModuleUtils=a;