
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
//rbTServerResponse = {
var rbTServerResponse = {  

  /** 
  *  Handle default success callback if not mentioned explicitly
  *   
  *  @return void
  */ 
  defaultSuccessCallback : function(respData)
  {
    // FIXME : what to do?
    rbTAPP.log({"message": "Success callback : default server response","data":respData});
  },
  /** 
  *  Handle default error callback if not mentioned explicitly
  *   
  *  @return void
  */ 
  defaultErrorCallback : function(respData)
  {
    // FIXME : what to do?
    rbTAPP.log({"message": "Error callback : default server response","data":respData});
  },


  /**
  * Set actor identification based on server response
  * @param {object} respData Actor identification details
  * @return void
  */
  setActorID : function(respData)
  { 
    "use strict";
    rbTAPP.log({"message": "Setting actor ID with server resp","data":respData});
    try {
      if (respData && respData.id) {
        rbTActor.setID(respData.id);
        rbTActor.requestActorDetails(respData);
      } else {
        throw new Error("there is no server resp data");
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
  setActorProperty : function(respData)
  {
    "use strict";
    rbTAPP.log({"message": "Setting actor detail property with server resp","data":respData});

    // FIXME : check for which property to set
    try {
      if (respData && respData.actor.description.profile) {
        rbTActor.setProperties(respData.actor.description.profile);

      } else {
        throw new Error("there is no data for setting actor property");
      }
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
                                       "message"   : "setting user property failed",
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
    rbTAPP.log({"message": "Handling event with server resp","data":respData});
    try {
      if(respData && respData.actor) {
        rbTStore.set(rbTStore.defaultKeys.actor, respData.actor);
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
    rbTAPP.log({"message": "Setting rules with server resp","data":respData});

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
  },


  /**
  * Set App Specific configs
  * Once we get the App deatails, do the following
  * 1). Set App details
  * 2). Set rules table
  * 3). Set system vars
  * 4). Retrieve stored actor data.
  * 5). Make rbt app alive for calls.
  * @param {object} respData Data in response to server.
  *
  */
  setAppDetail : function(respData)
  {
    rbTAPP.log({"message": "Setting app details with server resp","data":respData});
    rbTAPP.setAppDetail(respData);
    rbTRules.setRulesTable(respData.app.rules || {});
    rbTSystemVar.init(respData);
    //rbTActor.retFromCookie();
    rbTAPP.setrbTAlive();
  }
};