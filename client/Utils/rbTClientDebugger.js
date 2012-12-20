/**
 * See (http://jquery.com/).
 * @name jQuery
 * @class 
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */
 
/**
 * See (http://jquery.com/)
 * @name fn
 * @class 
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf jQuery
 */
/*
 * JavaScript Debug - v0.4 - 6/22/2010
 * http://benalman.com/projects/javascript-debug-console-log/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 * 
 * With lots of help from Paul Irish!
 * http://paulirish.com/
 */
//var rbTDebug=(function(){var i=this,b=Array.prototype.slice,d=i.console,h={},f,g,m=9,c=["error","warn","info","debug","log"],l="assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "),j=l.length,a=[];while(--j>=0){(function(n){h[n]=function(){m!==0&&d&&d[n]&&d[n].apply(d,arguments)}})(l[j])}j=c.length;while(--j>=0){(function(n,o){h[o]=function(){var q=b.call(arguments),p=[o].concat(q);a.push(p);e(p);if(!d||!k(n)){return}d.firebug?d[o].apply(i,q):d[o]?d[o](q):d.log(q)}})(j,c[j])}function e(n){if(f&&(g||!d||!d.log)){f.apply(i,n)}}h.setLevel=function(n){m=typeof n==="number"?n:9};function k(n){return m>0?m>n:c.length+m<=n}h.setCallback=function(){var o=b.call(arguments),n=a.length,p=n;f=o.shift()||null;g=typeof o[0]==="boolean"?o.shift():false;p-=typeof o[0]==="number"?o.shift():n;while(p<n){e(a[p++])}};return h})();
(function(a){"use strict";var b={};b.VERSION="0.9.2";var c;var d={};var e=function(a,b){return function(){return b.apply(a,arguments)}};var f=function(){var a=arguments,b=a[0],c,d;for(d=1;d<a.length;d++){for(c in a[d]){if(!(c in b)&&a[d].hasOwnProperty(c)){b[c]=a[d][c]}}}return b};var g=function(a,b){return{value:a,name:b}};b.DEBUG=g(1,"DEBUG");b.INFO=g(2,"INFO");b.WARN=g(4,"WARN");b.ERROR=g(8,"ERROR");b.OFF=g(99,"OFF");var h=function(a){this.context=a;this.setLevel(a.filterLevel);this.log=this.info};h.prototype={setLevel:function(a){if(a&&"value"in a){this.context.filterLevel=a}},enabledFor:function(a){var b=this.context.filterLevel;return a.value>=b.value},debug:function(){this.invoke(b.DEBUG,arguments)},info:function(){this.invoke(b.INFO,arguments)},warn:function(){this.invoke(b.WARN,arguments)},error:function(){this.invoke(b.ERROR,arguments)},invoke:function(a,b){if(c&&this.enabledFor(a)){c(b,f({level:a},this.context))}}};var i=new h({filterLevel:b.OFF});(function(){var a=b;a.enabledFor=e(i,i.enabledFor);a.debug=e(i,i.debug);a.info=e(i,i.info);a.warn=e(i,i.warn);a.error=e(i,i.error);a.log=a.info})();b.setHandler=function(a){c=a};b.setLevel=function(a){i.setLevel(a);for(var b in d){if(d.hasOwnProperty(b)){d[b].setLevel(a)}}};b.get=function(a){return d[a]||(d[a]=new h(f({name:a},i.context)))};b.useDefaults=function(c){if(!("console"in a)){return}b.setLevel(c||b.DEBUG);b.setHandler(function(c,d){var e=a.console;var f=e.log;if(d.name){c[0]="["+d.name+"] "+c[0]}if(d.level===b.WARN&&e.warn){f=e.warn}else if(d.level===b.ERROR&&e.error){f=e.error}f.apply(e,c)})};if(typeof define==="function"&&define.amd){define(b)}else if(typeof module!=="undefined"&&module.exports){module.exports=b}else{a["Logger"]=b}})(window);
var rbTDebug = Logger;