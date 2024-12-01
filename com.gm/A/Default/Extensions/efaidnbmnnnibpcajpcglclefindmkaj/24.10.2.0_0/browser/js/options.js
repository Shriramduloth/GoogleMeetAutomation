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
import{analytics as e,events as t}from"../../common/analytics.js";import{dcLocalStorage as n}from"../../common/local-storage.js";import{util as s}from"./content-util.js";import{privateApi as a}from"./content-privateApi.js";import{LOCALES as i,LOCAL_FILE_PERMISSION_URL as o,OptionPageActions as r}from"../../common/constant.js";await n.init(),$((function(){const c=10,l={AnalyticsOptinTitle:"analyticsOptinTitle",AnalyticsOptinDescription:"web2pdfOptOut",AnalyticsOptinDisabledDescription:"web2pdfOptOutDisabled",AnalyticsLearnMoreLink:"LearnMoreURL",AnalyticsLearnMoreTitle:"web2pdfPrivacy",ShowPDFToolsTitle:"web2pdfShowPDFTools",ShowPDFToolsDescription:"web2pdfFrictionlessToggleDescription",ViewerOwnershipTitle:"pdfOwnershipExploreOptionsTitle",ViewerOwnershipDescription:"pdfOwnershipExploreOptionsDescription",ViewConvertedPDFInAcrobatTitle:"web2pdfOpenConvertedPDFTitle",ViewConvertedPDFInAcrobatDescription:"web2pdfOpenConvertedPDFDescription",PersistentOpenInAcrobatTitle:"web2pdfShowPersistentOpen",PersistentOpenInAcrobatDescription:"web2pdfShowPersistentOpenDescription",WebpageConversionTitle:"webpagePDFConversion",WebpageConversionDescription:"webpagePDFConversionDescription",EnableGenAIFeaturesTitle:"enableGenAIFeaturesTitle",EnableGenAIFeaturesDescription:"enableGenAIFeaturesDescription",PromptSuccessMessage:"optionsSuccessPrompt",PromptSuccessReloadRequiredMessage:"optionsSuccessPromptReloadRequired",PromptFailureMessage:"optionsFailurePrompt",AppearancePrefTitle:"appearancePrefTitle",AppearancePrefDesc:"appearancePrefDesc",AppearancePrefOp1:"appearancePrefOp1",AppearancePrefOp2:"appearancePrefOp2",AppearancePrefOp3:"appearancePrefOp3",SaveLocationTitle:"saveLocationPreferenceTitle",SaveLocationDescription:"saveLocationPreferenceDescription",SaveLocationOp1:"saveLocationOp1",SaveLocationOp2:"saveLocationOp2",SaveLocationOp3:"saveLocationOp3",userLocale:"userLocale",acrobatGsuiteTouchPointPreferenceTitle:"acrobatGsuiteTouchPointPreferenceTitle",acrobatGsuiteTouchPointPreferenceDescription:"acrobatGsuiteTouchPointPreferenceDescription",localFileOptionTitle:"localFileOptionTitle",localFileOptionDescription:"localFileOptionDesc"};let p=[],d={},u=null;class h{constructor(){this.showEligibleSaveButton(),this.ID="#web2pdfSaveButton",this.closePromptID="#prompt-close",this.enableState=!1,this.optionStates=new Set,this.timeoutId=null,this.reloadRequiredForPreference=!1,$(this.ID).click((e=>this.SavePreferences(e))),$(this.closePromptID).click((e=>this.HideSavedPrompt(e)))}showEligibleSaveButton(){let e,t;[e,t]=[$("#saveButtonHeader"),$("#saveButtonFooter")],e.removeClass("hidden"),t.remove()}Reset(){this.enableState=!1,this.optionStates.clear(),$(this.ID).prop("disabled",!0)}setEnabled(e){this.optionStates.add(e),$(this.ID).prop("disabled",!1),this.enableState=!0}setDisabled(e){this.optionStates.has(e)&&(this.optionStates.delete(e),0===this.optionStates.size&&($(this.ID).prop("disabled",!0),this.enableState=!1))}GetState(){return this.enableState}SavePreferences(){const e={analytics:[]};for(const t in d)d[t].hasUpdated&&(e[t]=d[t].GetCurrentState());const t=p.find((e=>"pdfViewer"===e.storageKey&&e.hasUpdated));if(t){let e;!0===t.currentState||"true"===t.currentState?(n.setItem("viewer-enabled-source","ownership-consent"),e="true"):e="false",s.isEdge()&&s.messageToMain({main_op:"pdfViewerChanged",value:e})}d.environment&&d.environment.hasUpdated&&(s.messageToMain({main_op:"init-floodgate"}),s.messageToMain({main_op:"closeOffscreenDocument"})),p.filter((e=>e.hasUpdated)).map((e=>e.SavePreferences())).filter((e=>e)).forEach((t=>e.analytics.push(t))),function(e,t){s.messageToMain({main_op:"save-preferences",...e},t)}(e,(e=>{e.success?this.ShowSavedPrompt(!0):this.ShowSavedPrompt(!1),this.Reset(),D((async e=>{O(e.settings),await A(e),_()}))}))}ShowSavedPrompt(e){const t=$("#savePrompt"),n=$(".prompt"),a=$("#optionsSuccessPrompt");e?(this.reloadRequiredForPreference?a.text(s.getTranslation(l.PromptSuccessReloadRequiredMessage)):a.text(s.getTranslation(l.PromptSuccessMessage)),this.reloadRequiredForPreference=!1,n.removeClass("failure")):(a.text(s.getTranslation(l.PromptFailureMessage)),n.addClass("failure")),t.show(),this.timeoutId&&clearTimeout(this.timeoutId),this.timeoutId=setTimeout((e=>this.HideSavedPrompt()),5e3)}HideSavedPrompt(){$("#savePrompt").hide()}}class S{constructor(e,t,s,a){this.titleId=e,this.descriptionId=t,this.storageKey=a,this.defaultState=n.getItem(this.storageKey)||s,this.currentState=this.defaultState,this.hasUpdated=!1,this.savePreferencesButton=null}AttachEventHandler(e){this.savePreferencesButton=e}RenderInputItem(){return $("<div/>")}Render(){const e=$("<div/>",{class:"option"}),t=$("<label/>",{class:"label",for:this.titleId}),n=$("<span/>",{class:"label-title",text:s.getTranslation(this.titleId)||this.titleId,id:this.titleId}),a=$("<span/>",{class:"label-description",text:s.getTranslation(this.descriptionId)||this.descriptionId,id:this.descriptionId});t.append(n),t.append(a),e.append(t);const i=this.RenderInputItem();return e.append(i),e}GetCurrentState(){return this.currentState}SavePreferences(){this.hasUpdated&&(this.storageKey&&(s.consoleLog("Updating Preference for ",this.storageKey,"from",n.getItem(this.storageKey,this.defaultState),"to",this.currentState),"pdfViewer"===this.storageKey&&(n.getWithTTL("ownership-upgrade")&&!1===this.currentState&&(s.messageToMain({main_op:"analytics",analytics:[[t.USE_ACROBAT_VIEWER_DISABLED_DEFAULT_OWNERSHIP_EXPERIMENT,{SOURCE:"OptionsPage",EXPERIMENT:n.getItem("experiment-ownership")}],[t.USE_ACROBAT_VIEWER_DISABLED_DEFAULT_OWNERSHIP,{SOURCE:"OptionsPage"}]]}),n.removeItem("ownership-upgrade"),n.removeItem("defaultOwnerShipExperiment")),a.setViewerState(!0===this.currentState?"enabled":"disabled")),"acrobat-gsuite-touch-points"==this.storageKey&&(u.reloadRequiredForPreference=!0,this.sendAcrobatGsuiteTouchPointsAlert(this.currentState)),n.setItem(this.storageKey,String(this.currentState))),this.hasUpdated=!1,this.defaultState=this.currentState)}sendAcrobatGsuiteTouchPointsAlert(e){let t;t=e?"acrobatGsuiteTouchPointsEnabled":"acrobatGsuiteTouchPointsDisabled",chrome.tabs.query({url:["https://mail.google.com/*","https://drive.google.com/*"]},(function(e){e?.forEach((function(e){chrome.tabs.sendMessage(e.id,{content_op:t})}))}))}}class g extends S{constructor(e,t,s,a,i,o){super(e,t,s,a),this.defaultState=function(e,t=!1){const s=n.getItem(e);return s&&""!==s?"true"===s:t}(this.storageKey,s),this.currentState=this.defaultState,this.analyticsId={enabled:i,disabled:o}}onToggleChange(e){const t=$(e.currentTarget);this.currentState=!t.hasClass("checked"),this.hasUpdated=!this.hasUpdated,t.toggleClass("checked"),this.savePreferencesButton&&this.currentState===this.defaultState?this.savePreferencesButton.setDisabled(this.titleId):this.savePreferencesButton.setEnabled(this.titleId)}RenderDisabledInputItem(){const e=$("<span/>"),t=$("<button/>",{class:"option-toggle-disabled"});return e.append(t),e}RenderInputItem(){const e=$("<span/>"),t=$("<button/>",{class:"option-toggle"});return t.click((e=>this.onToggleChange(e))),this.currentState&&t.addClass("checked"),e.append(t),e}GetAnalytics(){return this.currentState?this.analyticsId.enabled:this.analyticsId.disabled}SavePreferences(){return super.SavePreferences(),this.GetAnalytics()}}class T extends S{constructor(e,t,s,a,i,o,r){super(e,t,a,i),this.valuesMap=s,this.onSavePreferences=o,r&&!n.getItem(i)&&n.setItem(i,String(a))}onSelectionChange(e){this.currentState=$(e.currentTarget).val(),this.currentState===this.defaultState?(this.hasUpdated=!1,this.savePreferencesButton&&this.savePreferencesButton.setDisabled(this.titleId)):(this.hasUpdated=!0,this.savePreferencesButton&&this.savePreferencesButton.setEnabled(this.titleId))}RenderInputItem(){const e=$("<span/>"),t=$("<select/>",{class:"option-select"});for(const e in this.valuesMap){const n=$("<option/>",{value:e,text:this.valuesMap[e]});t.append(n)}return t.change((e=>this.onSelectionChange(e))),this.currentState&&t.val(this.currentState),e.append(t),e}SavePreferences(){const e=this.defaultState;super.SavePreferences(),this.onSavePreferences&&this.onSavePreferences(this.currentState,e)}}class m extends g{constructor(){let e="false"===n.getItem("ANALYTICS_OPT_IN_ADMIN")?l.AnalyticsOptinDisabledDescription:l.AnalyticsOptinDescription;super(l.AnalyticsOptinTitle,e,!0,"logAnalytics",t.OPTIONS_ENABLED_ANALYTICS,t.OPTIONS_DISABLED_ANALYTICS),this.learnMoreLink=l.AnalyticsLearnMoreLink,this.learnMoreTitle=l.AnalyticsLearnMoreTitle}Render(){const e=$("<div/>",{class:"option"}),a=$("<label/>",{class:"label",for:this.titleId}),i=$("<span/>",{class:"label-title",text:s.getTranslation(this.titleId),id:this.titleId}),o=$("<span/>",{class:"label-description",text:s.getTranslation(this.descriptionId)+" ",id:this.descriptionId}),r=$("<a/>",{class:"learn-more",href:s.getTranslation(this.learnMoreLink),text:s.getTranslation(this.learnMoreTitle),target:"_blank"});let c;return r.click((function(){s.messageToMain({main_op:"analytics",analytics:[[t.OPTIONS_ABOUT_ADOBE_ACROBAT_CLICKED]]})})),a.append(i),a.append(o),e.append(a),"false"===n.getItem("ANALYTICS_OPT_IN_ADMIN")?c=this.RenderDisabledInputItem():(c=this.RenderInputItem(),o.append(r)),e.append(c),e}SavePreferences(){if(this.hasUpdated)return this.hasUpdated=!1,this.defaultState=this.currentState,this.GetAnalytics()}}class I extends S{constructor(e,t){super(e,t,null,null)}onButtonClick(n){chrome.tabs.create({url:o,active:!0}),chrome.extension.isAllowedFileSchemeAccess().then((n=>{e.event(t.LOCAL_FILE_OPTIONS_CLICKED,{STATE:n?"Disable":"Enable"})}))}RenderInputItem(){const e=$("<span/>"),t=$("<button/>",{class:"option-localfile"}),n=$("<span/>",{class:"option-localfile-text"});return chrome.extension.isAllowedFileSchemeAccess().then((e=>{n.text(s.getTranslation(e?"Disable":"Enable")),t.append(n),t.append($("<img>",{class:"option-localfile-icon"}).attr("src","../images/SDC_LinkOut_13_N.svg"))})),t.click((e=>this.onButtonClick(e))),e.append(t),e}SavePreferences(){}}class f extends S{constructor(e,t){super(e,t,null,null)}handleClick(){s.messageToMain({main_op:"analytics",analytics:[t.TREFOIL_HTML_PREFERENCES_CLICK]}),s.messageToMain({main_op:"showConversionSettingsDialog"})}RenderInputItem(){const e=$("<span/>"),t=$("<button/>",{class:"option-webpage-conversion"}),n=$("<span/>",{class:"option-webpage-conversion-text"});return n.text(s.getTranslation("editMegaVerbText")),t.append(n),t.click(this.handleClick),e.append(t),e}}function E(e){return e.version>13}function P(e){return 13==e.version}function v(){const e=n.getItem("fteDenied")||"0",t="false"===n.getItem("pdfViewer");return SETTINGS.VIEWER_SHOW_OPEN_IN_ACRO&&(parseInt(e)===c||t)}function O(e){if(e&&e.settings){for(const t in e.settings)SETTINGS[t]=e.settings[t];(function(e){return null===e.locale})(e)&&(SETTINGS.FRICTIONLESS_ENABLED=!1)}}function _(){null==u&&(u=new h);const e=$("#toggles");$("#progress").remove(),e.empty(),p.forEach((t=>{t.AttachEventHandler(u);const n=t.Render();e.append(n)}))}async function A(e){p=[],d={};const o=new m,r=new g(l.ShowPDFToolsTitle,l.ShowPDFToolsDescription,!0,"always-show-pdftools",t.FRICTIONLESS_AUTO_SUGGESTION_ENABLED,t.FRICTIONLESS_AUTO_SUGGESTION_DISABLED),c=new g(l.ViewerOwnershipTitle,l.ViewerOwnershipDescription,!1,"pdfViewer",t.USE_ACROBAT_IN_CHROME_ENABLED,t.USE_ACROBAT_IN_CHROME_DISABLED),u=new g(l.ViewConvertedPDFInAcrobatTitle,l.ViewConvertedPDFInAcrobatDescription,!0,"ViewResultsPref",t.TREFOIL_HTML_OPENPDF_PREF_ON,t.TREFOIL_HTML_OPENPDF_PREF_OFF),h=new g(l.PersistentOpenInAcrobatTitle,l.PersistentOpenInAcrobatDescription,!0,"always-show-pdf-menu",t.OPTIONS_ENABLED_OPEN_IN_ACROBAT,t.OPTIONS_DISABLED_OPEN_IN_ACROBAT),S=new g(l.EnableGenAIFeaturesTitle,l.EnableGenAIFeaturesDescription,!0,"egaf",t.OPTIONS_ENABLE_GENAI_FEATURES,t.OPTIONS_DISABLE_GENAI_FEATURES),O=new I(l.localFileOptionTitle,l.localFileOptionDescription),_=new f(l.WebpageConversionTitle,l.WebpageConversionDescription);E(e)?(p.push(u),SETTINGS.VIEWER_ENABLED&&SETTINGS.VIEWER_ENABLED_FOR_ACROBAT?(p.push(c),v()&&p.push(h)):p.push(h)):P(e)?await async function(){const e=await async function(){return!(s.isEdge()&&await a.isMimeHandlerAvailable()&&n.getItem("openInAcrobatEnable")&&"admin"!==n.getItem("installSource"))}();SETTINGS.VIEWER_ENABLED?(p.push(c),v()&&e&&p.push(h)):e&&p.push(h)}():SETTINGS.VIEWER_ENABLED&&p.push(c);const A=await chrome.runtime.sendMessage({main_op:"getFloodgateFlag",flag:"dc-cv-genai-disable-pref"});"true"===n.getItem("genAIEligible")&&A&&p.push(S),SETTINGS.FRICTIONLESS_ENABLED&&p.push(r);const D=await chrome.runtime.sendMessage({main_op:"getFloodgateFlag",flag:"dc-cv-local-file-fte"}),b=await chrome.extension.isAllowedFileSchemeAccess();!D||s.isEdge()||b||p.push(O);const w=s.getTranslation(l.AppearancePrefOp1),L=s.getTranslation(l.AppearancePrefOp2),N=s.getTranslation(l.AppearancePrefOp3);const R=new T(l.AppearancePrefTitle,l.AppearancePrefDesc,{auto:w,dark:L,light:N},"auto","theme",(function(e,n){s.messageToMain({main_op:"themeChange",analytics:[[t.OPTIONS_APPEARENCE_THEME_CHANGED,{OLDTHEME:n,NEWTHEME:e}]]})}),!0);if(p.push(R),!0===n.getItem("isSaveLocationPrefEnabled")){const G=s.getTranslation(l.SaveLocationOp1),$=s.getTranslation(l.SaveLocationOp2),U=s.getTranslation(l.SaveLocationOp3);function x(e,a){s.messageToMain({main_op:"analytics",analytics:[[t.SAVE_LOCATION_PREFERENCE_CHANGED,{OLDPREF:a,NEWPREF:e}]]}),n.setItem("selectedSaveLocationPreference",!0)}const k=new T(l.SaveLocationTitle,l.SaveLocationDescription,{ask:G,cloud:$,local:U},"ask","saveLocation",x,!0);p.push(k)}const C=new T(l.userLocale,null,i,n.getItem("viewer-locale")||s.getFrictionlessLocale(chrome.i18n.getMessage("@@ui_locale")),"appLocale",(async()=>{}),!0);p.push(C);const F=[chrome.runtime.sendMessage({main_op:"getFloodgateFlag",flag:"dc-cv-gmail-attachment-card-prompt"}),chrome.runtime.sendMessage({main_op:"getFloodgateFlag",flag:"dc-cv-gmail-list-view-prompt"}),chrome.runtime.sendMessage({main_op:"getFloodgateFlag",flag:"dc-cv-gdrive-prompt"})],[y,M,B]=await Promise.all(F);if(y||M||B){const V=new g(l.acrobatGsuiteTouchPointPreferenceTitle,l.acrobatGsuiteTouchPointPreferenceDescription,!0,"acrobat-gsuite-touch-points",t.OPTIONS_ACROBAT_GSUITE_TOUCHPOINT_ENABLED,t.OPTIONS_ACROBAT_GSUITE_TOUCHPOINT_DISABLED);p.push(V)}p.push(o),d.analytics_on=o,function(e){function t(e){s.messageToMain({panel_op:"common",requestType:"update_env",env:e})}const a=new T("Development Environment","Select the target environment for the extension.",{prod:"Production",stage:"Stage",test:"Test",dev:"Dev","local-dev":"Local Dev"},e.environment||"prod","env",t),i=new T("Development Environment","Select the target environment for the extension.",{prod:"Production",stage:"Stage"},e.environment||"prod","env",t),o=E(e)?"acrobat":P(e)?"reader":"no-app",r=new T("Connected Application","Select the target connected application for the extension functionalities. This settings only mock the views, the functionality may be broken.",{acrobat:"Acrobat",reader:"Reader","no-app":"No App"},o||"acrobat"),c="true"===n.getItem("adobeInternal");SETTINGS.DEBUG_MODE?(p.push(a,r),d.environment=a,d.product=r):c&&(p.push(i),d.environment=i)}(e),E(e)&&p.push(_)}function D(e){s.messageToMain({main_op:"fetch-preferences"},e)}function b(e){const t=p.filter((t=>t.titleId===e));return t.length>0?t[0]:null}function w(e,t,n){if(SETTINGS.TEST_MODE)return;const s=e.toggleId,a=b(s),i=e.requestType;let o,c;if(i===r.OPTIONS_UPDATE_TOGGLE)a?(a.currentState=e.toggleVal,a.savePreferencesButton.SavePreferences(),o=a.currentState):c="Toggle not visible.",n&&n({requestType:i,toggleId:s,response:o,error:c})}$(document).ready((function(){s.translateElements(".translate"),D((async e=>{O(e),await A(e),_(),s.addMainListener(w),function(){if(!SETTINGS.TEST_MODE)return;const e="check_toggle_state",t="update_toggle_state";chrome.runtime.onMessage.addListener((function(n,s,a){if(!n.panel_op||"test"!==n.panel_op)return;const i=n.test_extension,o=n.toggleId,r=b(o);let c,l;switch(i){case e:r?c=r.currentState:l="Toggle not visible.";break;case t:r?(r.currentState=n.toggleVal,r.hasUpdated=!0,r.savePreferencesButton.SavePreferences(),c=r.currentState):l="Toggle not visible.";break;default:l="Invalid request type."}a({requestType:i,toggleId:o,response:c,error:l})}))}();await a.isMimeHandlerAvailable()||chrome.runtime.sendMessage({main_op:"updateLoadedTabsInfo"})}))}))}));