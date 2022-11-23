// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

define("dojo/_base/declare dijit/_WidgetBase dojo/_base/lang dojo/Evented dojo/dom-style dojo/dom-construct dojo/on".split(" "),function(f,g,d,h,b,k,l){return f([g,h],{baseClass:"jimu-widget-ParcelDrafter-MapTooltipHandler",map:null,handleClickFor:null,_mapTooltip:null,_mapMoveHandler:null,_mapClickHandler:null,_mouseDragHandler:null,constructor:function(a){d.mixin(this,a)},startup:function(){this.handleClickFor||(this.handleClickFor=this.map);this._createTooltip()},connectEventHandler:function(a){a&&
this.updateTooltip(a);this._disableWebMapPopup();this._mapClickHandler=this.own(l(this.handleClickFor,"click",d.hitch(this,function(c){this._clicked(c)})))[0];"ontouchstart"in document.documentElement?b.set(this._mapTooltip,"display","none"):(this._mapMoveHandler=this.own(this.map.on("mouse-move",d.hitch(this,this._onMapMouseMove)))[0],this.own(this.map.on("mouse-out",d.hitch(this,function(){b.set(this._mapTooltip,"display","none")}))))},disconnectEventHandler:function(){this._enableWebMapPopup();
this._mapClickHandler&&this._mapClickHandler.remove();this._mapMoveHandler&&(this._mapMoveHandler.remove(),this._mapTooltip.style.display="none");this.disconnectMouseDragHandler()},connectMouseDragHandler:function(a){a&&this.updateTooltip(a);this._disableWebMapPopup();this._mapClickHandler&&this._mapClickHandler.remove();this.map.disableMapNavigation();this._mouseDragHandler=this.own(this.map.on("mouse-drag",d.hitch(this,function(c){this._onDragging(c)})))[0]},disconnectMouseDragHandler:function(){this._mouseDragHandler&&
(this._mouseDragHandler.remove(),this._mapTooltip.style.display="none");this.map.enableMapNavigation()},_createTooltip:function(){this._mapTooltip=k.create("div",{"class":"esriCTMapTooltip",innerHTML:this.toolTipText},this.map.container);b.set(this._mapTooltip,"position","fixed");b.set(this._mapTooltip,"display","none")},_enableWebMapPopup:function(){this.map&&(this.map.infoWindow.hide(),this.map.setInfoWindowOnClick(!0))},_disableWebMapPopup:function(){this.map&&(this.map.infoWindow.hide(),this.map.setInfoWindowOnClick(!1))},
_onMapMouseMove:function(a){if(a.clientX||a.pageY){var c=a.clientX;var e=a.clientY}else c=a.clientX+document.body.scrollLeft-document.body.clientLeft,e=a.clientY+document.body.scrollTop-document.body.clientTop;b.set(this._mapTooltip,"display","none");b.set(this._mapTooltip,{left:c+15+"px",top:e+"px"});b.set(this._mapTooltip,"display","");this._onMoving(a)},_clicked:function(a){this.emit("clicked",a)},_onDragging:function(a){this.emit("dragging",a)},_onMoving:function(a){this.emit("moving",a)},updateTooltip:function(a){this.toolTipText=
a;this._mapTooltip.innerHTML=this.toolTipText}})});