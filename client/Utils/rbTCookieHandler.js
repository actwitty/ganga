var rbTCookie = {

  namePrefix : "RBT__",

  // If we do not send following params while setting cookies, defaults will be used. 
  defaultOptions : {
    expire : 24 * 60 * 60 * 1000,  // in hours
    path : "/",
    domain : window.location.hostname,
    secure: false,
  },

  // Just harcode names for some of the default cookies which we will be using
  defaultCookies : {
    "actorID"    : "actor_id",
    "systemProp" : "system_prop",
    "actorProp"  : "actor_prop",
  },

  /** Get RBT cookie string name.
   *  @param {string} cookieName
   *  @return string
   */
  name : function(cookieName)
  {
    return rbTCookie.namePrefix + cookieName;
  },

  /** Get cookie string.
   *  @param {String} cookieName
   *  @return string
   */
  getCookie : function(cookieName)
  {
    "use strict";
    var results = document.cookie.match ( '(^|;) ?' + rbTCookie.name(cookieName) + '=([^;]*)(;|$)' );

    if (results)
        return (unescape(results[2]));
    else
        return null;
  },

  /** Check cookie existence
   *  @param {string} cookieName
   *  @return boolean
   */
  doesCookieExist : function(cookieName)
  {
    try {
      if (document.cookie.indexOf(rbTCookie.name(cookieName)) >= 0) {
        return true;
      } else {
        return false;
      }
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
                          "message"   : "cookie existence failed",
                          "name"      : cookieName,
                          "log"       : true, 
                         });
    }
  }, 


  /** Set cookie options.
   * 
   * @param {rbTCookie.defaultOptions} [options] set options
   * @return string
   */
  cookieOptions : function(options) {
    "use strict";
    var cOptions = {};

    function getExpDate(hours)
    {
      var expiryDate = new Date();
      expiryDate.setTime(expiryDate.getTime()+(5 * hours));
      return expiryDate.toGMTString();
    }

    if (!options) {
      rbTCookie.defaultOptions.expire = getExpDate(rbTCookie.defaultOptions.expire);
      return rbTCookie.defaultOptions;
    }
      

    // Set options if passed else use default options.
    cOptions.expire = options.expire || rbTCookie.defaultOptions.expire;
    cOptions.path = options.path || rbTCookie.defaultOptions.path;
    cOptions.domain = options.domain || rbTCookie.defaultOptions.domain;
    cOptions.secure = options.secure || rbTCookie.defaultOptions.secure;  

    cOptions.expire = getExpDate(cOptions.expire);

    return cOptions;

  },
 
  /** Set cookie with options passed as key:value pair.
   * 
   * @param {string} cookieName
   * @param {string} cookieValue
   * @param {rbTCookie.defaultOptions} [options] set options
   * @return string
   */
  setCookie : function(cookieName, cookieValue, options)
  {
    "use strict";
    try {
        var cookieString = rbTCookie.name(cookieName) + "=" + escape(cookieValue);
        var cookieOptions =  rbTCookie.cookieOptions(options);

        cookieString += "; expires=" + cookieOptions.expire;
        cookieString += "; path=" + escape(cookieOptions.path);
        cookieString += "; domain=" + escape(cookieOptions.domain);

        if (cookieOptions.secure) cookieString += "; secure";
        
        document.cookie = cookieString;

    } catch(e) {
      // FIXME  what to do?
      rbTAPP.reportError({"exception" : e.message,
                          "message"   : "cookie set failed",
                          "name"      : cookieName,
                          "value"     : cookieValue,
                          "options"   : options,
                          "log"       : true, 
                         });
    }
  },

  /** Delete a cookie
   *
   * @param {string} cookieName
   * @return void
   */
  deleteCookie :  function(cookieName, options)
  {
    "use strict";
    try {
        var cookieOptions =  rbTCookie.cookieOptions(options);
        document.cookie = rbTCookie.name(cookieName) + "=" +
                          "; path=" + cookieOptions.path +
                          "; domain=" + cookieOptions.domain +
                          "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    } catch (e) {
      // FIXME what to do?
      rbTAPP.reportError({"exception" : e.message,
                          "message"   : "cookie delete failed",
                          "name"      : cookieName,
                          "log"       : true, 
                         });
    }
  },


  /** Flush all cookie
   *
   *  @return void
   */
  flushAllCookie: function() 
  {
    "use strict";
    try {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {   
          var cookie =  cookies[i].split("=");
          var cookieName = cookie[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
          if (cookieName.lastIndexOf(rbTCookie.namePrefix, 0) === 0) {
            rbTCookie.deleteCookie(cookieName.slice(rbTCookie.namePrefix.length, cookieName.length));
          }
      }
    } catch(e) {
      // FIXME what to do?
      rbTAPP.reportError({"exception" : e.message,
                          "message"   : "cookie flush all failed",
                          "log"       : true, 
                         });
    }
  },

};