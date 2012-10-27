var rbTServerResponse = {

  /** 
  *  Handle default success callback if not mentioned explicitly
  *   
  *  @return void
  */ 
  defaultSuccessCallback : function()
  {
    // FIXME : what to do?
    rbTDebug.log("Success callback : default server response");
  },
  /** 
  *  Handle default error callback if not mentioned explicitly
  *   
  *  @return void
  */ 
  defaultErrorCallback : function()
  {
    // FIXME : what to do?
    rbTDebug.warn("Success callback : default server response");
  },


  /**
  * Set actor identification based on server response
  * @param {object} respData Actor identification details
  * @return void
  */
  setActor : function(respData)
  { 
    "use strict";
    try {
      if (respData) {
        // FIXME :: Flush and reset all cookies if there is a change in actor.
        // WAITING AS THERE ARE SOME CHANGES IN BACKEND.
        rbTCookie.setCookie(rbTCookie.defaultCookies.actor, JSON.stringify(respData));

      } else {
        throw "there is no data";
      }
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
                          "message"   : "setting actor failed",
                          "data"      : respData
                        });
    }
  },


  /**
  * Set actor identification based on server response
  * @param {object} respData Actor identification details
  * @return void
  */
  setUserProperty : function(respData)
  {
     "use strict";
    // FIXME : check for which property to set
    try {
      if (respData) {
        rbTCookie.setCookie(rbTCookie.defaultCookies.actorprop, JSON.stringify(respData));
      } else {
        throw "there is no data";
      }
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
                          "message"   : "setting user property failed",
                          "data"      : respData
                        });
    }
  }, 

  /**
  * Set actor identification based on server response
  * @param {object} respData Actor identification details
  * @return void
  */
  setSystemProperty : function(respData)
  {
    "use strict";
    // FIXME : check for which property to set
    try {
      if (respData) {
        rbTCookie.setCookie(rbTCookie.defaultCookies.system, JSON.stringify(respData));
      } else {
        throw "there is no data";
      }
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
                          "message"   : "setting system property failed",
                          "data"      : respData
                        });
    }
  }, 

  /**
  * Handle event response from server
  * @param {object} respData Actor identification details
  * @return void
  */
  handleEvent : function(respData)
  {
    "use strict";
    try {
      if(respData && respData.actor) {
        rbTCookie.setCookie(rbTCookie.defaultCookies.actor, respData.actor);
      } else {
        throw "there is no data";
      }
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
                          "message"   : "handling event failed",
                          "data"      : respData
                        });
    }
  },

  
  /**
  * Set Rules response from server
  * @param {object} respData in the form of rules
  * @return void
  */
  setRules : function(respData)
  {
    "use strict";
    try {
      if(respData) {
        rbTRules.setRulesTable(respData);
      } else {
        throw "there is no data";
      }
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
                          "message"   : "setting rules failed",
                          "data"      : respData
                        });
    }
  }


};