var rbTUtils = {

  /** Initialize jquery if needed be
    *  @return void
    *
    */
  includeJQIfNeeded : function() 
  {
    /* loads jQuery if not already loaded, or if not a recent enough version */
    function loadJQ() {
        /* adds a link to jQuery to the head, instead of inline, so it validates */ 
        var headElement = document.getElementsByTagName("head")[0];
        linkElement=document.createElement("script");
        linkElement.src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js";
        linkElement.type="text/javascript";
        headElement.appendChild(linkElement);
    }
    
    if (typeof jQuery != 'undefined') {
        /* jQuery is already loaded... verify minimum version number of 1.6 and reload newer if needed */
        if (/1\.(0|1|2|3|4|5|6)\.(0|1)/.test(jQuery.fn.jquery) 
            || /^1.1/.test(jQuery.fn.jquery) 
            || /^1.2/.test(jQuery.fn.jquery)
            || /^1.3/.test(jQuery.fn.jquery)) {
            rbTUtils.embedScript("https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
        }
    } else {
        rbTUtils.embedScript("https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
    }
  },

	parseURL: function(urlStr)
	{
      var a = doc.createElement("a"), query = {};
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
	*
	*	@return void
	*/
  embedScript: function(url)
  {
      var element  = doc.createElement("script");
      element.type = "text/javascript";
      element.src  = url;
      doc.getElementsByTagName("head")[0].appendChild(element);
  },
    
  // JSON
  JSON : {
      parse: (win.JSON && win.JSON.parse) || function(data)
      {
        if (typeof data !== "string" || !data) { 
        	return null; 
        }
        return (new Function("return " + data))();
      },
    
      stringify: (win.JSON && win.JSON.stringify) || function(object) 
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
    },
    
};