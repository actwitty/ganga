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
trigger_fish.rbTUtils = {
  /** Initialize jquery if needed be
    *  @return void
    *
    */
  includeJQIfNeeded : function() 
  {
    function includeJQ()
    { 
      this.embedScript("https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js",trigger_fish.rbTAPP.wake_RBT_APP);
    }

    if (typeof jQuery != 'undefined') {
        /* jQuery is already loaded... verify minimum version number of 1.6 and reload newer if needed */
        if (/1\.(0|1|2|3|4|5|6)\.(0|1)/.test(jQuery.fn.jquery) 
            || /^1.1/.test(jQuery.fn.jquery) 
            || /^1.2/.test(jQuery.fn.jquery)
            || /^1.3/.test(jQuery.fn.jquery)) {
            includeJQ.call(this);
        }
    } else {
        includeJQ.call(this);
    }
  },

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
            trigger_fish.rbTDebug.log("Script "+ url +"loaded successfully");
            if (callback) {
              if (params)
                callback(params);
              else callback();
            }
        }
      }
  },
  
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
    
};