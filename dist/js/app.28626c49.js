(function(t){function e(e){for(var r,u,i=e[0],s=e[1],c=e[2],f=0,d=[];f<i.length;f++)u=i[f],Object.prototype.hasOwnProperty.call(o,u)&&o[u]&&d.push(o[u][0]),o[u]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r]);l&&l(e);while(d.length)d.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,i=1;i<n.length;i++){var s=n[i];0!==o[s]&&(r=!1)}r&&(a.splice(e--,1),t=u(u.s=n[0]))}return t}var r={},o={app:0},a=[];function u(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=t,u.c=r,u.d=function(t,e,n){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},u.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,e){if(1&e&&(t=u(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)u.d(n,r,function(e){return t[e]}.bind(null,r));return n},u.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var l=s;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("85ec"),o=n.n(r);o.a},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("h1",[t._v("Current Routes")]),null!==t.routes?n("div",t._l(t.routes,(function(t){return n("route",{key:t.fields.ID,attrs:{data:t.fields}})})),1):t._e()])},a=[],u=n("bc3a"),i=n.n(u),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"card"},[n("div",{staticClass:"routeColor",style:t.routeColor}),n("div",{staticClass:"top-row"},[n("h2",{staticClass:"title"},[t._v(t._s(t.displayName))]),n("h2",[t._v(t._s(t.data.Grade))])]),n("div",{staticClass:"bottom-row"},[n("span",[t._v(" "+t._s(t.setter)+" ")]),n("span",[t._v(" "+t._s(t.date)+" ")])])])},c=[],l={name:"HelloWorld",props:{data:Object},computed:{displayName:function(){return this.data.Name?this.data.Name:"Route #".concat(this.data.index)},setter:function(){return this.data.Setter?"Set by: ".concat(this.data.Setter):""},date:function(){return this.data.Date?"Date set: ".concat(this.data.Date):""},routeColor:function(){return{"background-color":this.data.Color}}}},f=l,d=(n("6ca5"),n("2877")),p=Object(d["a"])(f,s,c,!1,null,"379a1daf",null),h=p.exports,v={name:"App",components:{Route:h},data:function(){return{routes:[]}},methods:{fetchRoutes:function(){var t=this;i.a.get("http://localhost:5000/api/routes").then((function(e){t.routes=e.data}))}},mounted:function(){this.fetchRoutes()}},b=v,y=(n("034f"),Object(d["a"])(b,o,a,!1,null,null,null)),_=y.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(t){return t(_)}}).$mount("#app")},"6ca5":function(t,e,n){"use strict";var r=n("fe3b"),o=n.n(r);o.a},"85ec":function(t,e,n){},fe3b:function(t,e,n){}});
//# sourceMappingURL=app.28626c49.js.map