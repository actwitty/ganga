var rbTCookie = {

  namePrefix : "RBT__",

  // If we do not send following params while setting cookies, defaults will be used. 
  defaultOptions : {
    expire : 24 * 60 * 60 * 1000,  // in hours
    path : "/",
    domain : window.location.hostname,
    secure: true;
  },

  // Just harcode names for some of the default cookies which we will be using
  defaultCookies : {
    "actorid"    : rbTCookie.namePrefix + "actor_id",
    "systemProp" : rbTCookie.namePrefix + "system_prop",
    "actorProp"  : rbTCookie.namePrefix + "actor_prop",
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
      rbTApp.reportError({"exception" : e.message,
                          "message"   : "cookie existence failed",
                          "name"      : cookieName,
                          "log"       : true, 
                         });
    }
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
    try {
        var cookieString = rbTCookie.name(cookieName) + "=" + escape(cookieValue);

        // Set options if passed else use default options.
        options.expire = rbTCookie.hoursToExpireDate(options.expire) || rbTCookie.defaultOptions.expire;
        options.path = options.path || rbTCookie.defaultOptions.path;
        options.domain = options.domain || rbTCookie.defaultOptions.domain;
        options.secure = options.secure || rbTCookie.defaultOptions.secure;

        cookieString += "; path=" + escape(path);
        
        cookieString += "; domain=" + escape(domain);

        if (options.secure) cookieString += "; secure";

        return document.cookie = cookieString;
    } catch(e) {
      // FIXME  what to do?
      rbTApp.reportError({"exception" : e.message,
                          "message"   : "cookie set failed",
                          "name"      : cookieName,
                          "value"     : cookieValue,
                          "options"   : options
                          "log"       : true, 
                         });
    }
  },

  /** Delete a cookie
   *
   * @param {string} cookieName
   * @return void
   */
  deleteCookie :  function(cookieName)
  {
    try {
        var cookieDate = new Date ( );  // current date & time
        cookieDate.setTime ( cookieDate.getTime() - 1 );
        document.cookie = rbTCookie.name(cookieName) += "=; expires=" + cookieDate.toGMTString();
    } catch (e) {
      // FIXME what to do?
      rbTApp.reportError({"exception" : e.message,
                          "message"   : "cookie delete failed",
                          "name"      : cookieName,
                          "log"       : true, 
                         });
    }
  },


  /** Return GTM date string of "now" + time to live
   *
   *  @param {integer} cookieExpireHours
   *  @return string
   */
  hoursToExpireDate: function(cookieExpireHours)
  {
    try {
      if (parseInt(cookieExpireHours) == 'NaN' ) return '';
      else {
        now = new Date();
        now.setTime(now.getTime() + (parseInt(cookieExpireHours) * 60 * 60 * 1000));
        return now.toGMTString();     
      }
    } catch(e) {
      rbTApp.reportError({"exception" : e.message,
                          "message"   : "cookie hours to conversion failed",
                          "data"      : cookieExpireHours,
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
    try {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {   
          var cookieName =  cookies[i].split("=");
          if (cookieName[0].lastIndexOf(rbTCookie.namePrefix, 0) === 0) {
            rbTCookie.deleteCookie(cookieName[0]);
          }
      }
    } catch(e) {
      // FIXME what to do?
      rbTApp.reportError({"exception" : e.message,
                          "message"   : "cookie flush all failed",
                          "log"       : true, 
                         });
    }
  },

};