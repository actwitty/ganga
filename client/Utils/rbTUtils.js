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


var rbTUtils = {

  eJQ : {},

  /**
  *
  */
  keepEasyJQVars : function(data)
  {
    this.eJQ = data;
    rbTStore.set("easy_jquery",data);
    rbTAPP.initialize(); 
  },

  /**
  *
  */
  easyJQVars : function()
  {
    return this.eJQ;
  },  

  /**
  *
  */
  invokeEasyJquery : function(fname, is_full)
  {
    var full_version = "";
    var easyJQData = rbTStore.get("easy_jquery");
    
    if (!easyJQData) {
      rbTAPP.log("Could not found easyJQData in cache, fetching it now!!!");
      jQuery.getScript("https://api.easyjquery.com/ips/?callback=" + fname + full_version);
    } else{
      rbTAPP.log("Found easyJQData in cache, setting it now!!!");
      this.keepEasyJQVars(easyJQData);
    }
  },


  /** Initialize jquery if needed be
    *  @return void
    *
    */
  includeJQIfNeeded : function() 
  {
    function includeJQ()
    { 
      var rbTApp = rbTAPP;
      this.embedScript("https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js",
                        this.bindCB(rbTApp,rbTApp.actOnJQInit)
                      );
    }

    if (typeof jQuery != 'undefined') {
        /* jQuery is already loaded... verify minimum version number of 1.6 and reload newer if needed */
        if (/1\.(0|1|2|3|4|5|6)\.(0|1)/.test(jQuery.fn.jquery) 
            || /^1.1/.test(jQuery.fn.jquery) 
            || /^1.2/.test(jQuery.fn.jquery)
            || /^1.3/.test(jQuery.fn.jquery)) {
            includeJQ.call(this);
        } else {
          rbTAPP.actOnJQInit();
        }
    } else {
        includeJQ.call(this);
    }
  },

  /**
  *
  */
  bindCB : function(scope, fn) 
  {
    return function () {
        fn.apply(scope, arguments);
    };
  },
  
  /**
  * 
  */
  type : function(obj)
  {
    return Object.prototype.toString.call(obj).split("]")[0].split(" ")[1];
  },

  /**
  * Check if object is empty. Find it recursively not only on keys but also on values.
  * @param {object} o The object for which emptiness has to be checked.
  * @return {boolean} 
  */
  isEmpty : function(o) 
  {
    if (!o) return true;
    if (this.type(o) === "String" || this.type(o) === "Array") {
      return o.length === 0;
    } else if (this.type(o) === "Number") { return false;}
    for(var i in o) {
      if (this.type(o[i]) === "Object") {
        return this.isEmpty(o[i]);
      } else if (this.type(o[i]) === "String" || this.type(o[i]) === "Array") {
        if (o[i].length) { return false;}
      } else if (this.type(o[i]) === "Number") { return false;}
    }
    return true;
  },

  /**
  * Specially curated to get difference from Rulebot server response.
  * @param {object} first. The object for which difference has to be find out.
  * @param {object} second. The object against which difference has to be find out.
  * @param {object} r. The resultant object in which differential data will be stored.
  * @return {object|undefined} If differential object, else undefined.
  */ 
  diff : function(first,second,r)
  {
    var i = 0;
    for (i in first) {
      if (this.type(second[i]) === "Undefined")  {
        r[i] = first[i];  
      } else if (this.type(first[i]) === "Object" && this.type(second[i]) === "Object") {
        r[i] = diff(first[i], second[i], {});
        if (!result[i]) delete result[i];
      } else if ( this.type(second[i]) === "Array" && first[i] !== second[i][second[i].length-1]) {
        r[i] = first[i];
      }
    }
    return this.isEmpty(r) ? undefined : r;
  },

  /**
  *
  */ 
	parseURL: function(urlStr)
	{
      var a = document.createElement("a"), query = {};
      a.href = urlStr; queryStr = a.search.substr(1);
      // Disassemble query string
      if (queryStr != ''){
        var pairs = queryStr.split("&"), i = 0,
            length = pairs.length, parts;
        for (; i < length; i++){
          parts = pairs[i].split("=");
          if (parts.length === 2){
            query[parts[0]] = decodeURI(parts[1]); }
        }
      }
      return {
        host:     a.host,
        path:     a.pathname,
        protocol: a.protocol,
        port:     a.port === '' ? 80 : a.port,
        search:   a.search,
        query:    query }
  },
    
  /** Embed any other script.
	* @param {string} url Script URL to load.
  * @param {object} callback Function to call when script is loaded successfully.
  * @param {object} params Callback initiated with param as arguments.
  *	@return void
	*/
  embedScript: function(url, callback, params)
  {
      if (!url || typeof(url) != "string" || url == "")
        return;
      
      var scriptElement  = document.createElement("script");
      scriptElement.type = "text/javascript";
      scriptElement.src  = url;
      document.getElementsByTagName("head")[0].appendChild(scriptElement);
      scriptElement.onload = scriptElement.onreadystatechange = function() {
        if(!this.readyState ||
            this.readyState == "loaded" || 
            this.readyState == "complete") {
            rbTDebug.log("Script "+ url +"loaded successfully");
            if (callback) {
              if (params)
                callback(params);
              else callback();
            }
        }
      }
  },
  /*
  // JSON
  JSON : {
      parse: (window.JSON && window.JSON.parse) || function(data)
      {
        if (typeof data !== "string" || !data) { 
          return null; 
        }
        return (new Function("return " + data))();
      },
    
      stringify: (window.JSON && window.JSON.stringify) || function(object) 
      {
        var type = typeof object;
        if (type !== "object" || object === null) {
          if (type === "string") {
            return '"' + object + '"'; 
          }
        } else {
          var k, v, json = [],
          isArray = (object && object.constructor === Array);
          for (k in object ) {
            v = object[k]; type = typeof v;
            if (type === "string")
              v = '"' + v + '"';
            else if (type === "object" && v !== null)
              v = this.stringify(v);
            json.push((isArray ? "" : '"' + k + '":') + v);
          }
          return (isArray ? "[" : "{") + json.join(",") + (isArray ? "]" : "}");
        } 
      } 
    }
    */

    
};