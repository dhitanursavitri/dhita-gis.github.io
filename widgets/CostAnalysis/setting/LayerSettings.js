// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:widgets/CostAnalysis/setting/LayerSettings.html":'\x3cdiv class\x3d"esriCTTabNode"\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"layerSettingsMainContainer"\x3e\r\n    \x3cdiv class\x3d"esriCTLayerSettingsTableNode" data-dojo-attach-point\x3d"layerSettingsTableNode"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"esriCTHidden esriCTNoAssetLayersAvailable" data-dojo-attach-point\x3d"noAssetLayersAvailable"\x3e\r\n      ${nls.layerSettings.noAssetLayersAvailable}\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare jimu/BaseWidget dojo/Evented jimu/dijit/Message dijit/_WidgetsInTemplateMixin dojo/text!./LayerSettings.html dojo/_base/lang jimu/dijit/SimpleTable jimu/dijit/Popup dojo/_base/array dojo/query dijit/registry dojo/dom-class dojo/dom-construct dojo/_base/html dojo/on dojo/dom-attr ./AttributeSettings".split(" "),function(r,t,u,v,w,x,f,y,z,h,k,l,g,m,A,q,n,B){return r([t,u,w],{templateString:x,attributeSettingPopup:null,baseClass:"jimu-widget-cost-analysis-layer-settings",_layerSettingsTable:null,
constructor:function(a){f.mixin(this,a)},postMixInProperties:function(){this.nls.common={};f.mixin(this.nls.common,window.jimuNls.common)},postCreate:function(){this.inherited(arguments);this.attributeSettingPopup=this._layerSettingsTable=null},setConfig:function(){this._filterLayers()},getConfig:function(){return this._getUpdateLayerSettings()},_getUpdateLayerSettings:function(){if(this._layerSettingsTable){var a=this._layerSettingsTable.getData();return a=this._getSelectedFields(a)}},_createlayerSettingsGrid:function(){this._layerSettingsTable=
new y({fields:[{name:"editable",title:this.nls.layerSettings.EditableLayerHeaderTitle,type:"checkbox",editable:!1,width:"16%"},{name:"title",title:this.nls.layerSettings.layerNameHeaderTitle,type:"text",editable:!1,width:"64%"},{name:"fieldPicker",title:this.nls.layerSettings.fieldPickerHeaderTitle,type:"empty",editable:!1,hidden:!0,width:"0%"},{name:"selectable",title:"",type:"checkbox",editable:!1,hidden:!0,width:"0%"},{name:"id",title:"",type:"text",editable:!1,hidden:!0,width:"0%"},{name:"url",
title:"",type:"text",editable:!1,hidden:!0,width:"0%"},{name:"attributeSetting",title:this.nls.layerSettings.attributeSettingHeaderTitle,type:"empty",editable:!1,width:"20%"}],selectable:!0});this._layerSettingsTable.placeAt(this.layerSettingsTableNode);A.setStyle(this._layerSettingsTable.domNode,{height:"100%"});this._layerSettingsTable.startup()},onLayerSettingChange:function(a){var b={};if(a=this._layerSettingsTable.getRowData(a))b.layerId=a.id,b.editable=null===a.editable?!1:a.editable;this.emit("onLayerSettingUpdate",
b)},_filterLayers:function(){var a,b=[];var d=this.map.itemInfo.itemData.operationalLayers;0===d.length?g.remove(this.noAssetLayersAvailable,"esriCTHidden"):(g.add(this.noAssetLayersAvailable,"esriCTDisabled"),this._createlayerSettingsGrid(),this._setTableHeadTooltip(),b=[this.config.projectSettings.costingGeometryLayer||"",this.config.projectSettings.projectLayer||"",this.config.projectSettings.pointLayerCentroid||""],this.config&&0<this.config.layerSettings.length&&h.forEach(this.config.layerSettings,
f.hitch(this,function(c){(a=this.map.getLayer(c.id))&&(!a.errors||0>=a.errors.length)&&(b.push(c.id),a.editable=this._checkEditCapabilities(a),this._createFieldsRows(c,a.editable))})),h.forEach(d,f.hitch(this,function(c){c.errors&&!(0>=c.errors.length)||"ArcGISFeatureLayer"!==c.layerType||c.hasOwnProperty("featureCollection")||-1!==b.indexOf(c.id)||(c.selectable=!0,c.editable=this._checkEditCapabilities(c.layerObject),this._createFieldsRows(c,c.editable))})));this.updateAttributeButtonState(this.config.projectSettings.projectLayer)},
_checkEditCapabilities:function(a){return a&&a.capabilities&&-1!==a.capabilities.indexOf("Delete")&&-1!==a.capabilities.indexOf("Create")&&-1!==a.capabilities.indexOf("Update")&&a.globalIdField?!0:!1},_getInvalidLayersMsg:function(a){var b=[];var d="";a=this.layerInfosObj.getLayerInfoById(a).layerObject;a.capabilities?(-1===a.capabilities.indexOf("Create")&&b.push("Create"),-1===a.capabilities.indexOf("Update")&&b.push("Update"),-1===a.capabilities.indexOf("Delete")&&b.push("deleteColumnLabel")):
b=["Create","Update","deleteColumnLabel"];0<b.length&&(d=this.nls.layerSettings.missingCapabilitiesMsg,d+="\x3cbr/\x3e",h.forEach(b,f.hitch(this,function(c){d="deleteColumnLabel"===c?d+("\x3cli\x3e"+this.nls.layerSettings[c]+"\x3c/li\x3e"):d+("\x3cli\x3e"+this.nls.layerSettings[c.toLowerCase()]+"\x3c/li\x3e")})));a.globalIdField||(d+="\x3cbr/\x3e",d+=this.nls.layerSettings.missingGlobalIdMsg);return d},_enableDisableEditableCheckbox:function(a,b,d){var c;var e=k(".simple-table-cell ",a)[0];e.children[0]&&
(c=l.byNode(e.children[0]));d?c.setStatus(!0):(n.set(c.domNode,"title",this.nls.layerSettings.disableEditableCheckboxTooltip),c.setValue(!1),c.setStatus(!1),g.add(c.domNode,"jimu-float-leading"),a.errorDiv||(b=this._getInvalidLayersMsg(b.id),a.errorDiv=m.create("div",{"class":"esriCTFieldError"},e),n.set(a.errorDiv,"errorMessage",b),a.errorSpan=m.create("span",{"class":"jimu-icon jimu-icon-error"},a.errorDiv),this.own(q(a.errorDiv,"click",f.hitch(this,function(p){p=n.get(p.currentTarget,"errorMessage");
v({message:p})})))))},_createFieldsRows:function(a,b){a.editable&&(a.selectable=a.editable);var d=this._layerSettingsTable.addRow({title:a.title?a.title:a.name,editable:this._existingInLayerSettings(a.id)?a.editable:!1,selectable:a.selectable,id:a.id,url:a.url});d.tr.layerInfo=this.map._layers[a.id];d.tr.attributeSettingFields=a.attributeSetting;var c=k(".jimu-checkbox",d.tr.children[3]);var e=k(".jimu-checkbox",d.tr.children[0]);a.editable&&this._setCheckBoxState(e[0],c[0]);setTimeout(f.hitch(this,
function(){this._setHeaderCheckBoxState()}),200);l.byNode(e[0]).set("checked",this._existingInLayerSettings(a.id)?a.editable:!1);this.own(q(l.byNode(e[0]),"change",f.hitch(this,function(p){this._setCheckBoxState(e[0],c[0]);this._setHeaderCheckBoxState();this.onLayerSettingChange(e[0].parentElement.parentElement);this._addAttributeSettingIcon(d.tr,a,p)})));this._enableDisableEditableCheckbox(d.tr,a,b);this._addAttributeSettingIcon(d.tr,a,b)},_addAttributeSettingIcon:function(a,b,d){var c=k(".simple-table-cell",
a)[6];m.empty(c);c&&(d?(a.attributeSetting=m.create("div",{"class":"esriCTAttributeSettingIcon"},c),this.projectLayer&&""!==this.projectLayer||g.add(a.attributeSetting,"esriCTAttributeSettingDisableIcon"),this.own(q(a.attributeSetting,"click",f.hitch(this,function(e){g.contains(e.currentTarget,"esriCTAttributeSettingDisableIcon")||(e=a.layerInfo,this._curRow=a,e||(e={selectedFields:null},a.layerInfo=e),e.layerLabel="",e.layer=this.layerInfosObj.getLayerInfoById(b.id),this._createAttributeSettingsPopup({nls:this.nls,
featureLayer:e.layer.layerObject,selectedFields:a.attributeSettingFields,layerGridInfo:e,config:this.config,projectLayer:this.projectLayer}))})))):a.attributeSetting=m.create("div",{"class":"esriCTAttributeSettingDisableIcon"},c))},updateAttributeButtonState:function(a){var b=!1,d=k(".esriCTAttributeSettingIcon",this.domNode);a&&""!==a||(b=!0);d&&0<d.length&&h.forEach(d,f.hitch(this,function(c){b?g.add(c,"esriCTAttributeSettingDisableIcon"):g.remove(c,"esriCTAttributeSettingDisableIcon")}))},_createAttributeSettingsPopup:function(a){a.map=
this.map;var b=m.create("button",{title:this.nls.common.ok});b.label=this.nls.common.ok;var d=m.create("button",{title:this.nls.common.cancel});d.label=this.nls.common.cancel;this._attributeSettings=new B(a);this._attributeSettings.startup();var c=new z({titleLabel:this.nls.layerSettings.attributeSettingsPopupTitle,content:this._attributeSettings,width:830,height:500,autoHeight:!0,buttons:[b,d]});b.onClick=f.hitch(this,function(){this._curRow.attributeSettingFields=this._attributeSettings.okButtonClicked();
this._attributeSettings.destroy();this._attributeSettings=null;c.close()});d.onClick=f.hitch(this,function(){this._attributeSettings.destroy();this._attributeSettings=null;c.close()})},_setCheckBoxState:function(a,b){a=l.byNode(a);b=l.byNode(b);a.checked?(b.set("checked",!0),b.set("status",!1),b.set("disable",!0),g.add(b.domNode,"jimu-state-disabled")):(b.set("checked",!0),b.set("status",!0),b.set("disable",!1),g.remove(b.domNode,"jimu-state-disabled"));g.add(b.domNode.children[0],"checked")},_setHeaderCheckBoxState:function(){var a,
b=!0;var d=k(".simple-table-title .checkbox",this.domNode)[1];var c=k(".simple-table-title .jimu-checkbox",this.domNode)[1];h.some(this._layerSettingsTable.getRows(),f.hitch(this,function(e){a=k("td.selectable .checked",e);if(0===a.length)return b=!1,!0}));b?(g.add(d,"checked"),l.byNode(c).set("checked",!0)):(g.remove(d,"checked"),l.byNode(c).set("checked",!1))},updateLayerSettingsTable:function(a){var b=this._layerSettingsTable.getData(),d;a.lastSelectedId&&(d=this.layerInfosObj.getLayerInfoById(a.lastSelectedId))&&
d.layerObject&&(d=d.layerObject,d.editable=!1,d.selectable=!0,this._createFieldsRows(d,this._checkEditCapabilities(d)));a.currentSelectedLayerId&&h.some(b,f.hitch(this,function(c,e){if(c.id===a.currentSelectedLayerId)return this._layerSettingsTable.deleteRow(this._layerSettingsTable.tbody.rows[e]),!0}));this._clearSelectedLayerFields(a.currentSelectedLayerId)},_clearSelectedLayerFields:function(){var a=this._layerSettingsTable.getRows();h.forEach(a,f.hitch(this,function(b){b.attributeSettingFields=
[]}))},_getFieldsOptionsObj:function(a){var b=[];var d=a.fields;var c=["esriFieldTypeString"];b.push({label:this.nls.layerSettings.selectLabel,value:""});h.forEach(d,f.hitch(this,function(e){e.editable&&!e.domain&&-1<c.indexOf(e.type)&&37<e.length&&e.name!==a.typeIdField&&b.push({label:e.alias||e.name,value:e.name})}));return b},_getSelectedFields:function(a){var b=this._layerSettingsTable.getRows();h.forEach(b,f.hitch(this,function(d,c){null===a[c].editable&&(a[c].editable=!1);a[c].attributeSetting=
d.attributeSettingFields;delete a[c].fieldPicker}));return a},_setTableHeadTooltip:function(){var a=k(".simple-table-thead th",this.domNode);a.length&&(n.set(a[0],"title",this.nls.layerSettings.EditableLayerHeaderTooltip),n.set(a[1],"title",this.nls.layerSettings.fieldPickerHeaderTooltip),n.set(a[2],"title",this.nls.layerSettings.layerNameHeaderTooltip),n.set(a[3],"title",this.nls.layerSettings.SelectableLayerHeaderTooltip))},_existingInLayerSettings:function(a){var b=!1;0<this.config.layerSettings.length&&
this.config.layerSettings.filter(f.hitch(this,function(d){d.id===a&&(b=!0)}));return b}})});