!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=3)}([function(t,e,i){var s=i(1),n=i(2);"string"==typeof(n=n.__esModule?n.default:n)&&(n=[[t.i,n,""]]);var o={insert:"head",singleton:!1};s(n,o);t.exports=n.locals||{}},function(t,e,i){"use strict";var s,n=function(){return void 0===s&&(s=Boolean(window&&document&&document.all&&!window.atob)),s},o=function(){var t={};return function(e){if(void 0===t[e]){var i=document.querySelector(e);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(t){i=null}t[e]=i}return t[e]}}(),r=[];function a(t){for(var e=-1,i=0;i<r.length;i++)if(r[i].identifier===t){e=i;break}return e}function l(t,e){for(var i={},s=[],n=0;n<t.length;n++){var o=t[n],l=e.base?o[0]+e.base:o[0],d=i[l]||0,h="".concat(l," ").concat(d);i[l]=d+1;var c=a(h),u={css:o[1],media:o[2],sourceMap:o[3]};-1!==c?(r[c].references++,r[c].updater(u)):r.push({identifier:h,updater:f(u,e),references:1}),s.push(h)}return s}function d(t){var e=document.createElement("style"),s=t.attributes||{};if(void 0===s.nonce){var n=i.nc;n&&(s.nonce=n)}if(Object.keys(s).forEach((function(t){e.setAttribute(t,s[t])})),"function"==typeof t.insert)t.insert(e);else{var r=o(t.insert||"head");if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(e)}return e}var h,c=(h=[],function(t,e){return h[t]=e,h.filter(Boolean).join("\n")});function u(t,e,i,s){var n=i?"":s.media?"@media ".concat(s.media," {").concat(s.css,"}"):s.css;if(t.styleSheet)t.styleSheet.cssText=c(e,n);else{var o=document.createTextNode(n),r=t.childNodes;r[e]&&t.removeChild(r[e]),r.length?t.insertBefore(o,r[e]):t.appendChild(o)}}function v(t,e,i){var s=i.css,n=i.media,o=i.sourceMap;if(n?t.setAttribute("media",n):t.removeAttribute("media"),o&&btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleSheet)t.styleSheet.cssText=s;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(s))}}var m=null,p=0;function f(t,e){var i,s,n;if(e.singleton){var o=p++;i=m||(m=d(e)),s=u.bind(null,i,o,!1),n=u.bind(null,i,o,!0)}else i=d(e),s=v.bind(null,i,e),n=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(i)};return s(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;s(t=e)}else n()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=n());var i=l(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var s=0;s<i.length;s++){var n=a(i[s]);r[n].references--}for(var o=l(t,e),d=0;d<i.length;d++){var h=a(i[d]);0===r[h].references&&(r[h].updater(),r.splice(h,1))}i=o}}}},function(t,e,i){},function(t,e,i){"use strict";i.r(e);i(0);function s(t){return function(t){if(Array.isArray(t))return n(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return n(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);"Object"===i&&t.constructor&&(i=t.constructor.name);if("Map"===i||"Set"===i)return Array.from(t);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return n(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,s=new Array(e);i<e;i++)s[i]=t[i];return s}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}var a=function(){function t(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};o(this,t);var s=i.items,n=void 0===s?4:s,r=i.nav,a=void 0!==r&&r,l=i.dots,d=void 0!==l&&l,h=i.loop,c=void 0!==h&&h,u=i.rewind,v=void 0!==u&&u,m=i.responsive,p=void 0===m?{}:m,f=i.smartSpeed,g=void 0===f?250:f,_=i.dotsSpeed,y=void 0!==_&&_;this.options={items:n,nav:a,dots:d,loop:c,rewind:v,responsive:p,smartSpeed:g,dotsSpeed:y},this.settings={items:this.options.items,nav:this.options.nav,dots:this.options.dots,loop:this.options.loop,rewind:this.options.rewind,smartSpeed:this.options.smartSpeed,dotsSpeed:this.options.dotsSpeed},this._items=[],this._clones=[],this._breakpoint=null,this._width=null,this._current=0,this.navigation={},this._dots={items:[],positions:[]},this.selector=document.querySelector(e);var b=this.selector.querySelector(".td-carousel");this.cloneCarousel=b.cloneNode(!0),b.remove(),this.itemsCount=this.cloneCarousel.childElementCount,this.breakpoint(),this.checkingConfig(),this.init(),window.addEventListener("resize",this.responsive.bind(this))}var e,i,n;return e=t,(i=[{key:"breakpoint",value:function(){var t=document.documentElement.clientWidth,e=this.options.responsive,i=-1;if(e){for(var s in e)s<=t&&s>i&&(i=Number(s));if(-1!==i){if(i!==this._breakpoint)for(var n in this.settings)n in e[i]?this.settings[n]=e[i][n]:this.settings[n]=this.options[n]}else for(var o in this.settings)this.settings[o]=this.options[o]}this._breakpoint=i,this._width=this.selector.clientWidth/this.settings.items}},{key:"init",value:function(){this.createCarousel(),this.responsive()}},{key:"checkingConfig",value:function(){var t=this.settings;!0===t.rewind&&!0===t.loop&&console.warn('The "rewind" parameter is a priority, so for loop to work, you must set the "rewind" parameter to "false"')}},{key:"isNumeric",value:function(t){return!isNaN(parseFloat(t))}},{key:"normalize",value:function(t,e){var i=this._items.length,s=e?0:this._clones.length;return!this.isNumeric(t)||i<1?t=void 0:(t<0||t>=i+s)&&(t=((t-s/2)%i+i)%i+s/2),t}},{key:"relative",value:function(t){return t-=this._clones.length/2,this.normalize(t,!0)}},{key:"current",value:function(t){return void 0===t?this._current:0!==this._items.length?(t=this.normalize(t),this._current!==t&&(this._current=t),this._current):void 0}},{key:"initItems",value:function(){var t,e,i=[],n=Math.max(2*this.settings.items,4),o=2*Math.ceil(this._items.length/2),r=this.settings.loop&&this._items.length?this.settings.rewind?n:Math.max(n,o):0,a=[],l=[];for(r/=2;r>0;){i.push(this.normalize(i.length/2,!0));var d=this._items[i[i.length-1]].cloneNode(!0);d.classList.add("cloned"),a.push(d),i.push(this.normalize(this._items.length-1-(i.length-1)/2,!0)),(d=this._items[i[i.length-1]].cloneNode(!0)).classList.add("cloned"),l.push(d),r-=1}this._clones=i,l=l.reverse(),(t=this._stage).prepend.apply(t,s(l)),(e=this._stage).append.apply(e,a),this._current=this.minimum()}},{key:"createCarousel",value:function(){var t=this,e=document.createElement("div"),i=document.createElement("div"),s=document.createElement("div");e.classList.add("td-carousel"),i.classList.add("td-carousel-outer"),s.classList.add("td-clearfix"),this._stage=s,i.append(s),e.append(i);for(var n=0;n<this.cloneCarousel.children.length;n++){var o=this.cloneCarousel.children[n].cloneNode(!0);o.style.width="".concat(this._width,"px"),o.style.float="left",this._stage.append(o),this._items.push(o)}!0===this.settings.loop&&this.initItems(),this._current=this.minimum(),s.style.width=Math.ceil(this._stage.childNodes.length*this._width)+"px",s.style.transition="all 0s ease 0s",s.style.transform="translate3d(-".concat(this._width*this._current,"px, 0px , 0px)"),e.append(this.createNav()),e.append(this.createDots()),this.selector.append(e),this._stage.addEventListener("transitionend",(function(e){s.style.transition="all 0s ease 0s",t._stage.style.transform="translate3d(-".concat(t._width*t._current,"px, 0px , 0px)")}))}},{key:"createNav",value:function(){var t=this,e=document.createElement("div"),i=document.createElement("button"),s=document.createElement("button");return e.classList.add("td-carousel-nav"),e.classList.add("disabled"),i.classList.add("td-carousel-prev"),s.classList.add("td-carousel-next"),i.innerText="<",s.innerText=">",i.addEventListener("click",(function(e){t.prev(t.smartSpeed)})),s.addEventListener("click",(function(e){t.next(t.smartSpeed)})),e.append(i),this.navigation.previous=i,e.append(s),this.navigation.next=s,this.navigation.nav=e,this.responsiveNav(),e}},{key:"responsiveNav",value:function(){!0===this.settings.nav&&this._items.length>this.settings.items?(this.navigation.nav.classList.remove("disabled"),!1===this.settings.rewind&&!1===this.settings.loop?this.navToggler():(this.navigation.previous.classList.remove("disabled"),this.navigation.next.classList.remove("disabled"))):this.navigation.nav.classList.add("disabled")}},{key:"navToggler",value:function(){var t=this.minimum(),e=this.maximum(),i=this.navigation.previous,s=this.navigation.next;this._current>t&&this._current<e?(i.classList.remove("disabled"),s.classList.remove("disabled")):this._current===t?(i.classList.add("disabled"),s.classList.remove("disabled")):this._current===e?(i.classList.remove("disabled"),s.classList.add("disabled")):(i.classList.add("disabled"),s.classList.add("disabled"))}},{key:"createDots",value:function(){var t=this,e=document.createElement("div");e.classList.add("td-carousel-dots"),e.classList.add("disabled");for(var i=Math.ceil(this._items.length/this.settings.items),s=0;s<i;s++){var n=document.createElement("button");n.classList.add("td-carousel-dot"),this._dots.items.push(n),e.append(n)}return this._dots.items[0].classList.add("active"),this.positionsDots(),e.addEventListener("click",(function(e){if(e.target.classList.contains("td-carousel-dot")){for(var i=0,s=0;s<t._dots.items.length;s++)e.target===t._dots.items[s]&&(i=t._dots.positions[s]);t.to(i,t.settings.dotsSpeed)}})),this.navigation.dots=e,this.responsiveDots(),e}},{key:"responsiveDots",value:function(){if(!0===this.settings.dots){var t=Math.ceil(this._items.length/this.settings.items);if(t>1){if(this.navigation.dots.classList.remove("disabled"),this._dots.items.length===t)return;if(this._dots.items.length>t)for(;this._dots.items.length>t;)this._dots.items.pop(),this.navigation.dots.childNodes[this.navigation.dots.childNodes.length-1].remove();else if(this._dots.items.length<t){var e=document.createElement("button");for(e.classList.add("td-carousel-dot");this._dots.items.length<t;){var i=e.cloneNode(!0);this._dots.items.push(i),this.navigation.dots.append(i)}}this.positionsDots(),this.currentDots()}else this.navigation.dots.classList.add("disabled")}else this.navigation.dots.classList.add("disabled")}},{key:"positionsDots",value:function(){var t=this.maximum(),e=Math.ceil(this._items.length/this.settings.items);!0===this.settings.rewind&&(t-=this.settings.items-1),this._dots.positions=[];for(var i=0;i<e;i++){var s=i*this.settings.items+this.minimum();s>t&&(s=t),this._dots.positions.push(s)}}},{key:"currentDots",value:function(){for(var t=0,e=this._current,i=0;i<this._dots.positions.length;i++)e===this._dots.positions[i]&&(t=i);if(e===this._dots.positions[t]){for(i=0;i<this._dots.items.length;i++)this._dots.items[i].classList.remove("active");this._dots.items[t].classList.add("active")}}},{key:"maximum",value:function(t){var e=this._stage.childNodes.length;return e=!0===this.settings.loop?this._clones.length/2+this._items.length-1:this._items.length-this.settings.items,t&&(e-=this._clones.length/2),Math.max(e,0)}},{key:"minimum",value:function(t){return t?0:this._clones.length/2}},{key:"duration",value:function(t,e,i){return 0===i?0:Math.min(Math.max(Math.abs(e-t),1),6)*Math.abs(i||this.settings.smartSpeed)}},{key:"to",value:function(t,e){var i=this.relative(t),s=this.current(),n=null,o=i-this.relative(s),r=(o>0)-(o<0),a=this._items.length,l=this.minimum(),d=this.maximum();!0===this.settings.rewind?i=t=t<l?d-this.settings.items+1:t>d-this.settings.items+1?l:t:!0===this.settings.loop?(Math.abs(o)>a/2&&(o+=-1*r*a),(n=(((i=s+o)-l)%a+a)%a+l)!==i&&n-o<=d&&n-o>0&&(s=n-o,i=n)):(t<0&&(t=0),t>d&&(t=d),i=t),this.current(i),this._stage.style.transform="translate3d(-".concat(this._width*t,"px, 0px , 0px)"),this._stage.style.transition="all ".concat(this.duration(s,i,e)/1e3,"s ease 0s"),this.currentDots(),!1===this.settings.rewind&&!1===this.settings.loop&&this.navToggler()}},{key:"prev",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.to(this._current-1,t)}},{key:"next",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.to(this._current+1,t)}},{key:"responsiveItems",value:function(){if(this._tmpItemsCount<this.settings.items){for(var t=this._stage.querySelectorAll(".cloned"),e=0;e<t.length;e++)t[e].remove();this.initItems()}var i=this._stage.childNodes;for(e=0;e<i.length;e++)i[e].style.width="".concat(this._width,"px")}},{key:"responsive",value:function(){var t=this._breakpoint;this._tmpItemsCount=this.settings.items,this.breakpoint(),this.responsiveItems(),this._stage.style.transform="translate3d(-"+this._width*this._current+"px, 0px , 0px)",this._stage.style.width=Math.ceil(this._stage.childNodes.length*this._width)+"px",-1!==this._breakpoint&&this._breakpoint!==t&&(this.responsiveNav(),this.responsiveDots())}}])&&r(e.prototype,i),n&&r(e,n),t}();window.TDC=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new a(t,e)}}]);