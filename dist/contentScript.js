parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"j1rc":[function(require,module,exports) {
!function(){var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t={rotl:function(r,t){return r<<t|r>>>32-t},rotr:function(r,t){return r<<32-t|r>>>t},endian:function(r){if(r.constructor==Number)return 16711935&t.rotl(r,8)|4278255360&t.rotl(r,24);for(var n=0;n<r.length;n++)r[n]=t.endian(r[n]);return r},randomBytes:function(r){for(var t=[];r>0;r--)t.push(Math.floor(256*Math.random()));return t},bytesToWords:function(r){for(var t=[],n=0,o=0;n<r.length;n++,o+=8)t[o>>>5]|=r[n]<<24-o%32;return t},wordsToBytes:function(r){for(var t=[],n=0;n<32*r.length;n+=8)t.push(r[n>>>5]>>>24-n%32&255);return t},bytesToHex:function(r){for(var t=[],n=0;n<r.length;n++)t.push((r[n]>>>4).toString(16)),t.push((15&r[n]).toString(16));return t.join("")},hexToBytes:function(r){for(var t=[],n=0;n<r.length;n+=2)t.push(parseInt(r.substr(n,2),16));return t},bytesToBase64:function(t){for(var n=[],o=0;o<t.length;o+=3)for(var e=t[o]<<16|t[o+1]<<8|t[o+2],u=0;u<4;u++)8*o+6*u<=8*t.length?n.push(r.charAt(e>>>6*(3-u)&63)):n.push("=");return n.join("")},base64ToBytes:function(t){t=t.replace(/[^A-Z0-9+\/]/gi,"");for(var n=[],o=0,e=0;o<t.length;e=++o%4)0!=e&&n.push((r.indexOf(t.charAt(o-1))&Math.pow(2,-2*e+8)-1)<<2*e|r.indexOf(t.charAt(o))>>>6-2*e);return n}};module.exports=t}();
},{}],"v4Bk":[function(require,module,exports) {
var n={utf8:{stringToBytes:function(t){return n.bin.stringToBytes(unescape(encodeURIComponent(t)))},bytesToString:function(t){return decodeURIComponent(escape(n.bin.bytesToString(t)))}},bin:{stringToBytes:function(n){for(var t=[],e=0;e<n.length;e++)t.push(255&n.charCodeAt(e));return t},bytesToString:function(n){for(var t=[],e=0;e<n.length;e++)t.push(String.fromCharCode(n[e]));return t.join("")}}};module.exports=n;
},{}],"yQtW":[function(require,module,exports) {
function t(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}function n(n){return"function"==typeof n.readFloatLE&&"function"==typeof n.slice&&t(n.slice(0,0))}module.exports=function(o){return null!=o&&(t(o)||n(o)||!!o._isBuffer)};
},{}],"tW0u":[function(require,module,exports) {
!function(){var r=require("crypt"),n=require("charenc").utf8,e=require("is-buffer"),t=require("charenc").bin,i=function(o,u){o.constructor==String?o=u&&"binary"===u.encoding?t.stringToBytes(o):n.stringToBytes(o):e(o)?o=Array.prototype.slice.call(o,0):Array.isArray(o)||(o=o.toString());for(var a=r.bytesToWords(o),s=8*o.length,c=1732584193,f=-271733879,g=-1732584194,l=271733878,y=0;y<a.length;y++)a[y]=16711935&(a[y]<<8|a[y]>>>24)|4278255360&(a[y]<<24|a[y]>>>8);a[s>>>5]|=128<<s%32,a[14+(s+64>>>9<<4)]=s;var h=i._ff,_=i._gg,v=i._hh,b=i._ii;for(y=0;y<a.length;y+=16){var d=c,T=f,p=g,q=l;c=h(c,f,g,l,a[y+0],7,-680876936),l=h(l,c,f,g,a[y+1],12,-389564586),g=h(g,l,c,f,a[y+2],17,606105819),f=h(f,g,l,c,a[y+3],22,-1044525330),c=h(c,f,g,l,a[y+4],7,-176418897),l=h(l,c,f,g,a[y+5],12,1200080426),g=h(g,l,c,f,a[y+6],17,-1473231341),f=h(f,g,l,c,a[y+7],22,-45705983),c=h(c,f,g,l,a[y+8],7,1770035416),l=h(l,c,f,g,a[y+9],12,-1958414417),g=h(g,l,c,f,a[y+10],17,-42063),f=h(f,g,l,c,a[y+11],22,-1990404162),c=h(c,f,g,l,a[y+12],7,1804603682),l=h(l,c,f,g,a[y+13],12,-40341101),g=h(g,l,c,f,a[y+14],17,-1502002290),c=_(c,f=h(f,g,l,c,a[y+15],22,1236535329),g,l,a[y+1],5,-165796510),l=_(l,c,f,g,a[y+6],9,-1069501632),g=_(g,l,c,f,a[y+11],14,643717713),f=_(f,g,l,c,a[y+0],20,-373897302),c=_(c,f,g,l,a[y+5],5,-701558691),l=_(l,c,f,g,a[y+10],9,38016083),g=_(g,l,c,f,a[y+15],14,-660478335),f=_(f,g,l,c,a[y+4],20,-405537848),c=_(c,f,g,l,a[y+9],5,568446438),l=_(l,c,f,g,a[y+14],9,-1019803690),g=_(g,l,c,f,a[y+3],14,-187363961),f=_(f,g,l,c,a[y+8],20,1163531501),c=_(c,f,g,l,a[y+13],5,-1444681467),l=_(l,c,f,g,a[y+2],9,-51403784),g=_(g,l,c,f,a[y+7],14,1735328473),c=v(c,f=_(f,g,l,c,a[y+12],20,-1926607734),g,l,a[y+5],4,-378558),l=v(l,c,f,g,a[y+8],11,-2022574463),g=v(g,l,c,f,a[y+11],16,1839030562),f=v(f,g,l,c,a[y+14],23,-35309556),c=v(c,f,g,l,a[y+1],4,-1530992060),l=v(l,c,f,g,a[y+4],11,1272893353),g=v(g,l,c,f,a[y+7],16,-155497632),f=v(f,g,l,c,a[y+10],23,-1094730640),c=v(c,f,g,l,a[y+13],4,681279174),l=v(l,c,f,g,a[y+0],11,-358537222),g=v(g,l,c,f,a[y+3],16,-722521979),f=v(f,g,l,c,a[y+6],23,76029189),c=v(c,f,g,l,a[y+9],4,-640364487),l=v(l,c,f,g,a[y+12],11,-421815835),g=v(g,l,c,f,a[y+15],16,530742520),c=b(c,f=v(f,g,l,c,a[y+2],23,-995338651),g,l,a[y+0],6,-198630844),l=b(l,c,f,g,a[y+7],10,1126891415),g=b(g,l,c,f,a[y+14],15,-1416354905),f=b(f,g,l,c,a[y+5],21,-57434055),c=b(c,f,g,l,a[y+12],6,1700485571),l=b(l,c,f,g,a[y+3],10,-1894986606),g=b(g,l,c,f,a[y+10],15,-1051523),f=b(f,g,l,c,a[y+1],21,-2054922799),c=b(c,f,g,l,a[y+8],6,1873313359),l=b(l,c,f,g,a[y+15],10,-30611744),g=b(g,l,c,f,a[y+6],15,-1560198380),f=b(f,g,l,c,a[y+13],21,1309151649),c=b(c,f,g,l,a[y+4],6,-145523070),l=b(l,c,f,g,a[y+11],10,-1120210379),g=b(g,l,c,f,a[y+2],15,718787259),f=b(f,g,l,c,a[y+9],21,-343485551),c=c+d>>>0,f=f+T>>>0,g=g+p>>>0,l=l+q>>>0}return r.endian([c,f,g,l])};i._ff=function(r,n,e,t,i,o,u){var a=r+(n&e|~n&t)+(i>>>0)+u;return(a<<o|a>>>32-o)+n},i._gg=function(r,n,e,t,i,o,u){var a=r+(n&t|e&~t)+(i>>>0)+u;return(a<<o|a>>>32-o)+n},i._hh=function(r,n,e,t,i,o,u){var a=r+(n^e^t)+(i>>>0)+u;return(a<<o|a>>>32-o)+n},i._ii=function(r,n,e,t,i,o,u){var a=r+(e^(n|~t))+(i>>>0)+u;return(a<<o|a>>>32-o)+n},i._blocksize=16,i._digestsize=16,module.exports=function(n,e){if(null==n)throw new Error("Illegal argument "+n);var o=r.wordsToBytes(i(n,e));return e&&e.asBytes?o:e&&e.asString?t.bytesToString(o):r.bytesToHex(o)}}();
},{"crypt":"j1rc","charenc":"v4Bk","is-buffer":"yQtW"}],"RiUx":[function(require,module,exports) {
"use strict";function t(t){return n(t)||r(t)||e()}function e(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function r(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function n(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.styleValidator=exports.getTypographyHTML=exports.setInStorage=exports.getTypoGraphyStyle=void 0;var o=function(t){return("0"+parseInt(t).toString(16)).slice(-2)},i=function(t){return/^#[0-9A-F]{6}$/i.test(t)?t:(t=t.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/),"#"+o(t[1])+o(t[2])+o(t[3]))},a=function(t){return{fontFamily:t.fontFamily,fontSize:t.fontSize,color:i(t.color),lineHeight:t.lineHeight,fontWeight:t.fontWeight}};exports.getTypoGraphyStyle=a;var s=function(t,e){localStorage.setItem(t,JSON.stringify(e))};exports.setInStorage=s;var c=function(t,e,r){return"<div id='".concat(t,"'>\n        <span style='font-family:").concat(e,"; font-size: ").concat(r,"'>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit, \n        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n        </span>\n    </div>")};exports.getTypographyHTML=c;var l={set:function(e,r,n){var o;return e[r]={styles:n[0],usage:(o=n[1],void 0===e[r]?[o]:-1===e[r].usage.indexOf(o)?[].concat(t(e[r].usage),[o]):e[r].usage),id:r,type:n[2]},!0}};exports.styleValidator=l;
},{}],"VdKl":[function(require,module,exports) {
"use strict";var t=r(require("md5")),e=require("./utils/utils");function r(t){return t&&t.__esModule?t:{default:t}}function n(t){return i(t)||a(t)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function a(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function i(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}var l=function(){var r=n(document.querySelectorAll("body *:not(script)")).filter(function(t){return!(!t.text||!t.text.trim().length)}),o=JSON.parse(localStorage.getItem("siteStyles"))||{},a={},i="",l=new Proxy(o,e.styleValidator),c=new Proxy(a,e.styleValidator);r.forEach(function(r){var n=getComputedStyle(r),o=r.tagName.toLowerCase(),a=o+(r.id.length?"#"+r.id:"")+(r.className.length?"."+r.className.replace(/ /g,"."):""),u=(0,e.getTypoGraphyStyle)(n),s=(0,t.default)(unescape(encodeURIComponent(JSON.stringify(u))));l[s]=[u,a,o],c[s]=[u,a,o],i+=(0,e.getTypographyHTML)(s,u.fontFamily,u.fontSize)}),chrome.storage.local.set({typography:i}),fetch(chrome.extension.getURL("/popup.html")).then(function(t){return t.text()}).then(function(t){document.body.innerHTML+=t}).catch(function(t){}),(0,e.setInStorage)("siteStyles",o),(0,e.setInStorage)("pageStyles",a)};l();
},{"md5":"tW0u","./utils/utils":"RiUx"}]},{},["VdKl"], null)
//# sourceMappingURL=/contentScript.js.map