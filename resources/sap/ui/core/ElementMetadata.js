/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ui.core.ElementMetadata");jQuery.sap.require("sap.ui.base.Metadata");jQuery.sap.require("sap.ui.base.DataType");
sap.ui.core.ElementMetadata=function(c,C){sap.ui.base.Metadata.apply(this,arguments)};
sap.ui.core.ElementMetadata.prototype=jQuery.sap.newObject(sap.ui.base.Metadata.prototype);
sap.ui.core.ElementMetadata.prototype.applySettings=function(c){var s=c.metadata;var r=c.hasOwnProperty("renderer")?(c.renderer||""):undefined;delete c.renderer;sap.ui.base.Metadata.prototype.applySettings.call(this,c);var a=/(children|ies|ves|oes|ses|ches|shes|xes|s)$/i;var S={'children':-3,'ies':'y','ves':'f','oes':-2,'ses':-2,'ches':-2,'shes':-2,'xes':-2,'s':-1};function n(i,D,o){var N,I;i=i||{};for(N in i){I=i[N];if(D&&typeof I!=="object"){I={};I[D]=i[N]}I=jQuery.extend({},o,I);I.name=N;if(I.multiple===true&&!I.singularName){I.singularName=N.replace(a,function($,P){var v=S[P.toLowerCase()];return typeof v==="string"?v:P.slice(0,v)})}i[N]=I}return i}var b=/([a-z][^.]*(?:\.[a-z][^.]*)*)\./;function d(N){var m=b.exec(N);return(m&&m[1])||""}this._sLibraryName=s.library||d(this.getName());this._mProperties=n(s.properties,"type",{type:"string",group:"Misc"});this._mAggregations=n(s.aggregations,"type",{type:"sap.ui.core.Control",multiple:true});this._sDefaultAggregation=s.defaultAggregation||null;this._mAssociations=n(s.associations,"type",{type:"sap.ui.core.Control",multiple:false});this._mEvents=n(s.events,null,{allowPreventDefault:false});this._sRendererName=this.getName()+"Renderer";this._bEnriched=false;if(c.metadata.__version>1.0){this.generateAccessors()}if(typeof r!=="undefined"){if(typeof r==="string"){this._sRendererName=r||undefined;return}if(typeof r==="function"){r={render:r}}var p=this.getParent();var B;if(p&&p instanceof sap.ui.core.ElementMetadata){B=p.getRenderer()}if(!B){jQuery.sap.require("sap.ui.core.Renderer");B=sap.ui.core.Renderer}var R=jQuery.sap.newObject(B);jQuery.extend(R,r);jQuery.sap.setObject(this.getRendererName(),R)}};
sap.ui.core.ElementMetadata.prototype.afterApplySettings=function(){sap.ui.base.Metadata.prototype.afterApplySettings.call(this);var p=this.getParent();if(p&&p instanceof sap.ui.core.ElementMetadata){this._mAllEvents=jQuery.extend({},p._mAllEvents,this._mEvents);this._mAllProperties=jQuery.extend({},p._mAllProperties,this._mProperties);this._mAllAggregations=jQuery.extend({},p._mAllAggregations,this._mAggregations);this._mAllAssociations=jQuery.extend({},p._mAllAssociations,this._mAssociations);this._sDefaultAggregation=this._sDefaultAggregation||p._sDefaultAggregation;if(p._mHiddenAggregations){this._mHiddenAggregations=jQuery.extend({},p._mHiddenAggregations)}}else{this._mAllEvents=this._mEvents;this._mAllProperties=this._mProperties;this._mAllAggregations=this._mAggregations;this._mAllAssociations=this._mAssociations}};
sap.ui.core.ElementMetadata.Kind={PROPERTY:0,SINGLE_AGGREGATION:1,MULTIPLE_AGGREGATION:2,SINGLE_ASSOCIATION:3,MULTIPLE_ASSOCIATION:4,EVENT:5};
sap.ui.core.ElementMetadata.prototype.getElementName=function(){return this._sClassName};
sap.ui.core.ElementMetadata.prototype.getLibraryName=function(){return this._sLibraryName};
sap.ui.core.ElementMetadata.prototype.isAbstract=function(){return this._bAbstract};
sap.ui.core.ElementMetadata.prototype.addProperty=function(n,i){i.name=n;this._mProperties[n]=i;if(!this._mAllProperties[n]){this._mAllProperties[n]=i}if(this._bEnriched){this._enrichChildInfos()}};
sap.ui.core.ElementMetadata.prototype.hasProperty=function(n){return!!this._mAllProperties[n]};
sap.ui.core.ElementMetadata.prototype.getProperties=function(){return this._mProperties};
sap.ui.core.ElementMetadata.prototype.getAllProperties=function(){return this._mAllProperties};
sap.ui.core.ElementMetadata.prototype.getAggregations=function(){return this._mAggregations};
sap.ui.core.ElementMetadata.prototype.hasAggregation=function(n){return!!this._mAllAggregations[n]};
sap.ui.core.ElementMetadata.prototype.getAllAggregations=function(){return this._mAllAggregations};
sap.ui.core.ElementMetadata.prototype.getDefaultAggregationName=function(){return this._sDefaultAggregation};
sap.ui.core.ElementMetadata.prototype.getDefaultAggregation=function(){return this._sDefaultAggregation&&this.getAllAggregations()[this._sDefaultAggregation]};
sap.ui.core.ElementMetadata.prototype.getAssociations=function(){return this._mAssociations};
sap.ui.core.ElementMetadata.prototype.hasAssociation=function(n){return!!this._mAllAssociations[n]};
sap.ui.core.ElementMetadata.prototype.getAllAssociations=function(){return this._mAllAssociations};
sap.ui.core.ElementMetadata.prototype.getEvents=function(){return this._mEvents};
sap.ui.core.ElementMetadata.prototype.hasEvent=function(n){return!!this._mAllEvents[n]};
sap.ui.core.ElementMetadata.prototype.getAllEvents=function(){return this._mAllEvents};
sap.ui.core.ElementMetadata.prototype.getPropertyDefaults=function(){var d=this._mDefaults,t;if(d){return d}if(this.getParent()instanceof sap.ui.core.ElementMetadata){d=jQuery.sap.newObject(this.getParent().getPropertyDefaults())}else{d={}}for(var s in this._mProperties){if(this._mProperties[s].defaultValue!==null){d[s]=this._mProperties[s].defaultValue}else{t=sap.ui.base.DataType.getType(this._mProperties[s].type);if(t instanceof sap.ui.base.DataType){d[s]=t.getDefaultValue()}else{for(var i in t){d[s]=t[i];break}}}}return(this._mDefaults=d)};
sap.ui.core.ElementMetadata.prototype.getRendererName=function(){return this._sRendererName};
sap.ui.core.ElementMetadata.prototype.getRenderer=function(){var r=this.getRendererName();if(!r){return}var R=jQuery.sap.getObject(r);if(R){return R}jQuery.sap.require(r);return jQuery.sap.getObject(r)};
sap.ui.core.ElementMetadata.prototype.createPropertyBag=function(){if(!this._fnPropertyBagFactory){this._fnPropertyBagFactory=jQuery.sap.factory(this.getPropertyDefaults())}return new(this._fnPropertyBagFactory)()};
sap.ui.core.ElementMetadata.prototype._enrichChildInfos=function(){if(this._bEnriched){return}if(this.getParent()instanceof sap.ui.core.ElementMetadata){this.getParent()._enrichChildInfos()}var m,n,i;function a(p,n){return p+n.substring(0,1).toUpperCase()+n.substring(1)}m=this._mProperties;for(n in m){i=m[n];i._sName=n;i._sUID=n;i._oParent=this;i._iKind=sap.ui.core.ElementMetadata.Kind.PROPERTY;i._sMutator=a("set",n);i._sGetter=a("get",n)}m=this._mAggregations;for(n in m){i=m[n];i._sName=n;i._sUID="aggregation:"+n;i._oParent=this;i._sDestructor=a("destroy",n);i._sGetter=a("get",n);if(i.multiple){i._iKind=sap.ui.core.ElementMetadata.Kind.MULTIPLE_AGGREGATION;i._sMutator=a("add",i.singularName);i._sRemoveMutator=a("remove",i.singularName)}else{i._iKind=sap.ui.core.ElementMetadata.Kind.SINGLE_AGGREGATION;i._sMutator=a("set",n)}}m=this._mAssociations;for(n in m){i=m[n];i._sName=n;i._sUID="association:"+n;i._oParent=this;i._sGetter=a("get",n);if(i.multiple){i._iKind=sap.ui.core.ElementMetadata.Kind.MULTIPLE_ASSOCIATION;i._sMutator=a("add",i.singularName)}else{i._iKind=sap.ui.core.ElementMetadata.Kind.SINGLE_ASSOCIATION;i._sMutator=a("set",n)}}m=this._mEvents;for(n in m){i=m[n];i._sName=n;i._sUID="event:"+n;i._oParent=this;i._iKind=sap.ui.core.ElementMetadata.Kind.EVENT;i._sMutator=a("attach",n)}this._bEnriched=true};
sap.ui.core.ElementMetadata.prototype.getJSONKeys=function(){if(this._mJSONKeys){return this._mJSONKeys}this._enrichChildInfos();var j={};function a(m){var n,i;for(n in m){i=m[n];if(!j[n]||i._iKind<j[n]._iKind){j[n]=i};j[i._sUID]=i}}a(this.getAllProperties());a(this.getAllAggregations());a(this.getAllAssociations());a(this.getAllEvents());return(this._mJSONKeys=j)};
sap.ui.core.ElementMetadata.prototype.generateAccessors=function(){var b=this;var c=this.getClass().prototype;function e(p,n,f,d){var n=p+n.substring(0,1).toUpperCase()+n.substring(1);if(!c[n]){c[n]=d?function(){jQuery.sap.log.warning("Usage of deprecated feature: "+b.getName()+"."+n);return f.apply(this,arguments)}:f;b._aPublicMethods.push(n)}}jQuery.each(this._mProperties,function(n,i){e("get",n,function(){return this.getProperty(n)});e("set",n,function(v){this.setProperty(n,v);return this},i.deprecated);if(i.bindable){e("bind",n,function(p,f,m){this.bindProperty(n,p,f,m);return this},i.deprecated);e("unbind",n,function(p){this.unbindProperty(n,p);return this})}});jQuery.each(this._mAggregations,function(n,d){if(!d.multiple){e("get",n,function(){return this.getAggregation(n)});e("set",n,function(v){this.setAggregation(n,v);return this},d.deprecated)}else{var g=d.singularName;e("get",n,function(){return this.getAggregation(n,[])});e("add",g,function(a){this.addAggregation(n,a);return this},d.deprecated);e("insert",g,function(i,a){this.insertAggregation(n,i,a);return this},d.deprecated);e("remove",g,function(a){return this.removeAggregation(n,a)});e("removeAll",n,function(){return this.removeAllAggregation(n)});e("indexOf",g,function(a){return this.indexOfAggregation(n,a)})}e("destroy",n,function(){this.destroyAggregation(n);return this});if(d.bindable){e("bind",n,function(p,t,s,f){this.bindAggregation(n,p,t,s,f);return this},d.deprecated);e("unbind",n,function(p){this.unbindAggregation(n,p);return this})}});jQuery.each(this._mAssociations,function(n,i){if(!i.multiple){e("get",n,function(){return this.getAssociation(n)});e("set",n,function(v){this.setAssociation(n,v);return this},i.deprecated)}else{var d=i.singularName;e("get",n,function(){return this.getAssociation(n,[])});e("add",d,function(a){this.addAssociation(n,a);return this},i.deprecated);e("remove",d,function(a){return this.removeAssociation(n,a)});e("removeAll",n,function(){return this.removeAllAssociation(n)})}});jQuery.each(this._mEvents,function(n,i){e("attach",n,function(d,f,o){this.attachEvent(n,d,f,o);return this},i.deprecated);e("detach",n,function(f,o){this.detachEvent(n,f,o);return this});var a=!!i.allowPreventDefault;e("fire",n,function(p){return this.fireEvent(n,p,a)})})};
(function(){var u={};function a(i){i=sap.ui.getCore().getConfiguration().getUIDPrefix()+i;u[i]=u[i]||0;return(i+u[i]++)}sap.ui.core.ElementMetadata.uid=a;sap.ui.core.ElementMetadata.prototype.uid=function(){var i=this._sUIDToken;if(typeof i!=="string"){i=this.getName();i=i.slice(i.lastIndexOf('.')+1);i=i.replace(/([a-z])([A-Z])/g,"$1 $2").split(" ").slice(-1)[0];i=this._sUIDToken=i.replace(/([^A-Za-z0-9-_.:])|([0-9]$)/g,"").toLowerCase()}return a(i)}}());