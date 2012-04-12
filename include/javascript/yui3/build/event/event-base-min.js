/*
 Copyright (c) 2010, Yahoo! Inc. All rights reserved.
 Code licensed under the BSD License:
 http://developer.yahoo.com/yui/license.html
 version: 3.3.0
 build: 3167
 */
var GLOBAL_ENV=YUI.Env;if(!GLOBAL_ENV._ready){GLOBAL_ENV._ready=function(){GLOBAL_ENV.DOMReady=true;GLOBAL_ENV.remove(YUI.config.doc,"DOMContentLoaded",GLOBAL_ENV._ready);};GLOBAL_ENV.add(YUI.config.doc,"DOMContentLoaded",GLOBAL_ENV._ready);}YUI.add("event-base",function(e){e.publish("domready",{fireOnce:true,async:true});if(GLOBAL_ENV.DOMReady){e.fire("domready");}else{e.Do.before(function(){e.fire("domready");},YUI.Env,"_ready");}var b=e.UA,d={},a={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9,63272:46,63273:36,63275:35},c=function(h){if(!h){return h;}try{if(h&&3==h.nodeType){h=h.parentNode;}}catch(g){return null;}return e.one(h);},f=function(g,h,i){this._event=g;this._currentTarget=h;this._wrapper=i||d;this.init();};e.extend(f,Object,{init:function(){var i=this._event,j=this._wrapper.overrides,g=i.pageX,l=i.pageY,k,h=this._currentTarget;this.altKey=i.altKey;this.ctrlKey=i.ctrlKey;this.metaKey=i.metaKey;this.shiftKey=i.shiftKey;this.type=(j&&j.type)||i.type;this.clientX=i.clientX;this.clientY=i.clientY;this.pageX=g;this.pageY=l;k=i.keyCode||i.charCode;if(b.webkit&&(k in a)){k=a[k];}this.keyCode=k;this.charCode=k;this.which=i.which||i.charCode||k;this.button=this.which;this.target=c(i.target);this.currentTarget=c(h);this.relatedTarget=c(i.relatedTarget);if(i.type=="mousewheel"||i.type=="DOMMouseScroll"){this.wheelDelta=(i.detail)?(i.detail*-1):Math.round(i.wheelDelta/80)||((i.wheelDelta<0)?-1:1);}if(this._touch){this._touch(i,h,this._wrapper);}},stopPropagation:function(){this._event.stopPropagation();this._wrapper.stopped=1;this.stopped=1;},stopImmediatePropagation:function(){var g=this._event;if(g.stopImmediatePropagation){g.stopImmediatePropagation();}else{this.stopPropagation();}this._wrapper.stopped=2;this.stopped=2;},preventDefault:function(g){var h=this._event;h.preventDefault();h.returnValue=g||false;this._wrapper.prevented=1;this.prevented=1;},halt:function(g){if(g){this.stopImmediatePropagation();}else{this.stopPropagation();}this.preventDefault();}});f.resolve=c;e.DOM2EventFacade=f;e.DOMEventFacade=f;(function(){e.Env.evt.dom_wrappers={};e.Env.evt.dom_map={};var o=e.Env.evt,h=e.config,l=h.win,q=YUI.Env.add,j=YUI.Env.remove,n=function(){YUI.Env.windowLoaded=true;e.Event._load();j(l,"load",n);},g=function(){e.Event._unload();},i="domready",k="~yui|2|compat~",m=function(s){try{return(s&&typeof s!=="string"&&e.Lang.isNumber(s.length)&&!s.tagName&&!s.alert);}catch(r){return false;}},p=function(){var t=false,u=0,s=[],v=o.dom_wrappers,r=null,w=o.dom_map;return{POLL_RETRYS:1000,POLL_INTERVAL:40,lastError:null,_interval:null,_dri:null,DOMReady:false,startInterval:function(){if(!p._interval){p._interval=setInterval(p._poll,p.POLL_INTERVAL);}},onAvailable:function(x,B,F,y,C,E){var D=e.Array(x),z,A;for(z=0;z<D.length;z=z+1){s.push({id:D[z],fn:B,obj:F,override:y,checkReady:C,compat:E});}u=this.POLL_RETRYS;setTimeout(p._poll,0);A=new e.EventHandle({_delete:function(){if(A.handle){A.handle.detach();return;}var H,G;for(H=0;H<D.length;H++){for(G=0;G<s.length;G++){if(D[H]===s[G].id){s.splice(G,1);}}}}});return A;},onContentReady:function(B,z,A,y,x){return p.onAvailable(B,z,A,y,true,x);},attach:function(A,z,y,x){return p._attach(e.Array(arguments,0,true));},_createWrapper:function(D,C,x,y,B){var A,E=e.stamp(D),z="event:"+E+C;if(false===B){z+="native";}if(x){z+="capture";}A=v[z];if(!A){A=e.publish(z,{silent:true,bubbles:false,contextFn:function(){if(y){return A.el;}else{A.nodeRef=A.nodeRef||e.one(A.el);return A.nodeRef;}}});A.overrides={};A.el=D;A.key=z;A.domkey=E;A.type=C;A.fn=function(F){A.fire(p.getEvent(F,D,(y||(false===B))));};A.capture=x;if(D==l&&C=="load"){A.fireOnce=true;r=z;}v[z]=A;w[E]=w[E]||{};w[E][z]=A;q(D,C,A.fn,x);}return A;},_attach:function(D,C){var I,K,A,H,x,z=false,B,E=D[0],F=D[1],y=D[2]||l,L=C&&C.facade,J=C&&C.capture,G=C&&C.overrides;if(D[D.length-1]===k){I=true;}if(!F||!F.call){return false;}if(m(y)){K=[];e.each(y,function(N,M){D[2]=N;K.push(p._attach(D,C));});return new e.EventHandle(K);}else{if(e.Lang.isString(y)){if(I){A=e.DOM.byId(y);}else{A=e.Selector.query(y);switch(A.length){case 0:A=null;break;case 1:A=A[0];break;default:D[2]=A;return p._attach(D,C);}}if(A){y=A;}else{B=p.onAvailable(y,function(){B.handle=p._attach(D,C);},p,true,false,I);return B;}}}if(!y){return false;}if(e.Node&&e.instanceOf(y,e.Node)){y=e.Node.getDOMNode(y);}H=p._createWrapper(y,E,J,I,L);if(G){e.mix(H.overrides,G);}if(y==l&&E=="load"){if(YUI.Env.windowLoaded){z=true;}}if(I){D.pop();}x=D[3];B=H._on(F,x,(D.length>4)?D.slice(4):null);if(z){H.fire();}return B;},detach:function(E,F,z,C){var D=e.Array(arguments,0,true),H,A,G,B,x,y;if(D[D.length-1]===k){H=true;}if(E&&E.detach){return E.detach();}if(typeof z=="string"){if(H){z=e.DOM.byId(z);}else{z=e.Selector.query(z);A=z.length;if(A<1){z=null;}else{if(A==1){z=z[0];}}}}if(!z){return false;}if(z.detach){D.splice(2,1);return z.detach.apply(z,D);}else{if(m(z)){G=true;for(B=0,A=z.length;B<A;++B){D[2]=z[B];G=(e.Event.detach.apply(e.Event,D)&&G);}return G;}}if(!E||!F||!F.call){return p.purgeElement(z,false,E);}x="event:"+e.stamp(z)+E;y=v[x];if(y){return y.detach(F);}else{return false;}},getEvent:function(A,y,x){var z=A||l.event;return(x)?z:new e.DOMEventFacade(z,y,v["event:"+e.stamp(y)+A.type]);},generateId:function(x){return e.DOM.generateID(x);},_isValidCollection:m,_load:function(x){if(!t){t=true;if(e.fire){e.fire(i);}p._poll();}},_poll:function(){if(p.locked){return;}if(e.UA.ie&&!YUI.Env.DOMReady){p.startInterval();return;}p.locked=true;var y,x,C,z,B,D,A=!t;if(!A){A=(u>0);}B=[];D=function(G,H){var F,E=H.override;if(H.compat){if(H.override){if(E===true){F=H.obj;}else{F=E;}}else{F=G;}H.fn.call(F,H.obj);}else{F=H.obj||e.one(G);H.fn.apply(F,(e.Lang.isArray(E))?E:[]);}};for(y=0,x=s.length;y<x;++y){C=s[y];if(C&&!C.checkReady){z=(C.compat)?e.DOM.byId(C.id):e.Selector.query(C.id,null,true);if(z){D(z,C);s[y]=null;}else{B.push(C);}}}for(y=0,x=s.length;y<x;++y){C=s[y];if(C&&C.checkReady){z=(C.compat)?e.DOM.byId(C.id):e.Selector.query(C.id,null,true);if(z){if(t||(z.get&&z.get("nextSibling"))||z.nextSibling){D(z,C);s[y]=null;}}else{B.push(C);}}}u=(B.length===0)?0:u-1;if(A){p.startInterval();}else{clearInterval(p._interval);p._interval=null;}p.locked=false;return;},purgeElement:function(A,x,E){var C=(e.Lang.isString(A))?e.Selector.query(A,null,true):A,G=p.getListeners(C,E),B,D,F,z,y;if(x&&C){G=G||[];z=e.Selector.query("*",C);B=0;D=z.length;for(;B<D;++B){y=p.getListeners(z[B],E);if(y){G=G.concat(y);}}}if(G){B=0;D=G.length;for(;B<D;++B){F=G[B];F.detachAll();j(F.el,F.type,F.fn,F.capture);delete v[F.key];delete w[F.domkey][F.key];}}},getListeners:function(B,A){var C=e.stamp(B,true),x=w[C],z=[],y=(A)?"event:"+C+A:null,D=o.plugins;if(!x){return null;}if(y){if(D[A]&&D[A].eventDef){y+="_synth";}if(x[y]){z.push(x[y]);}y+="native";if(x[y]){z.push(x[y]);}}else{e.each(x,function(F,E){z.push(F);});}return(z.length)?z:null;},_unload:function(x){e.each(v,function(z,y){z.detachAll();j(z.el,z.type,z.fn,z.capture);delete v[y];delete w[z.domkey][y];});j(l,"unload",g);},nativeAdd:q,nativeRemove:j};}();e.Event=p;if(h.injected||YUI.Env.windowLoaded){n();}else{q(l,"load",n);}if(e.UA.ie){e.on(i,p._poll);}q(l,"unload",g);p.Custom=e.CustomEvent;p.Subscriber=e.Subscriber;p.Target=e.EventTarget;p.Handle=e.EventHandle;p.Facade=e.EventFacade;p._poll();})();e.Env.evt.plugins.available={on:function(i,h,k,j){var g=arguments.length>4?e.Array(arguments,4,true):null;return e.Event.onAvailable.call(e.Event,k,h,j,g);}};e.Env.evt.plugins.contentready={on:function(i,h,k,j){var g=arguments.length>4?e.Array(arguments,4,true):null;return e.Event.onContentReady.call(e.Event,k,h,j,g);}};},"3.3.0",{requires:["event-custom-base"]});
