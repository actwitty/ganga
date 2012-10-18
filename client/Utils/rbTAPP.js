
/** Start Rule Bot APP 
* @param {string} appid App ID for rulebot account
* @param {string} accid Account ID for rulebot account
* 
* @return void
*
*/
function StartRBTApp(appid,accid){
  try {
    if (!appid || !accid || appid="" || accid="") {
      throw new Error("App-id, Account-ID are not mentioned")
    } else {
      // if everything seems fine, then set app/acc id and initialize rbTAPP.
      rbTAPP.setAppID(appid);
      rbTAPP.setAccountID(accid);
      rbTAPP.initialize();
    }
  } catch (e) {
    rbTApp.reportError({"exception" : e.message, 
                        "message"   : "App initalization failed"
                       });
  }
}(_rbTK[0][1], _rbTK[1][1]);


var rbTAPP = {

    /* Main configs will be holded here */
    configs : {},

    
    /** 
    *  Do following tasks on initialization of the app
    *  1). include jQuery if need be
    *  2). create session.
    *  3). fetch rules.
    *  4). check status of last event, if pending, execute it.
    *  5). fetch system properties if cache miss
    *  
    *  @return void
    */
    initialize : function()
    {
      // 1). includin jquery if need be
      rbTUtils.includeJQIfNeeded();

      // 2). Create session Deferred till further discussion
      //rbTAPP.createSession();

      // 3). Initialize rulebot rules
      rbTRules.init();

      // 4). Initialize system variables  
      rbTSystemVar.init();

      // 5). FIXME : Check status of last event, if pending, execute it.
      rbTRules.executeLastPendingEvent();
    }

    /** 
    *  Set App Id
    *  @param {string} id
    *  @return void
    */
    setAppID: function(id)
    {
      rbTAPP.configs.appID = id;
    },

    /** 
    *  Set Account ID
    *  @param {string} id 
    *  @return void
    */
    setAccountID : function(id)
    {
      rbTAPP.configs.accountID = id;
    },

    /** 
    *  Set Session ID
    *  @param {string} id 
    *  @return void
    */
    setSessionID : function(id)
    {
      rbTAPP.configs.sessionID = id;
    },

    /** 
    *  Set Actor ID
    *  @param {string} id 
    *  @return void
    */
    setActorID : function(id)
    {
      //rbTAPP.configs.ActorID = id;
      rbTCookie.setCookie("actor_id", respData);
    },   

    /** 
    *  Get App ID
    *  @return {string} id 
    */
    getAppID : function()
    {
      return rbTAPP.configs.appID
    },

    /** 
    *  Get Account ID
    *  @return {string} id 
    */  
    getAccountID : function()
    {
      return rbTAPP.configs.accountID;
    },   

    /** 
    *  Get Session ID
    *  @return {string} id 
    */  
    getSessionID : function()
    {
      return rbTAPP.configs.sessionID;
    },

    /** 
    *  Get Actor ID
    *  @return {string} id 
    */  
    getActorID : function()
    {
      return rbTCookie.getCookie(rbTCookie.defaultCookie.actorID); 
      //return rbTAPP.configs.actorID;
    },


    /** 
    *  Get Application configs
    *  @return {rbTAPP.configs} 
    */ 
    getConfigs : function()
    {
      var cnf = {"app_id"  : rbTAPP.configs.appID,
                 "account_id" : rbTAPP.configs.accountID,  
                }; 
      
      if (var actor_id = rbTCookie.getCookie(rbTCookie.defaultCookie.actorID))  {
        cnf["actor_id"] = actor_id;
      }
      return cnf;
    },  



    /** 
    *  Create Session for current app/account id
    *  FIXME : THIS NEEDS TO BE DISCUSSED AS WE ARE PLANNING TO HAVE A PROXY IN BETWEEN
    *  @return {string} sessionID 
    */ 
    createSession : function()
    {
      rbtServerChannel.createSession({success:rbTAPP.setSessionID});
    },


    /** 
    * Set System properties
    * 
    * @param {object} params Option based on which system property will be set
    * @return void
    */
    setSystemProperty : function(params)
    {
      try {
          rbtServerChannel.makeEventRequest("set_system_property", 
                                        rbtServerChannel.url.setSystemProperty,
                                        params,
                                        { success: rbTServerResponse.setSystemProperty,
                                          error  : rbtServerResponse.defaultError
                                        });
      } catch(e) {
        rbTApp.reportError({"exception" : e.message,
                            "message"   : "setting system properties failed",
                            "data"      : rules
                           });
      }
    },

    /** 
    * Set System properties
    *  
    * @return {object} system properties in the form of json
    */
    getSystemProperty : function()
    {
      return JSON.parse(rbTCookie.getCookie(rbTCookie.defaultCookie.system));
    },


    /** 
    *  report error to rbt server
    *  @param {object} params Error log message 
    *  @return void
    */ 
    reportError : function(params)
    {
      try {
          if (params.log) {
            debug.error(params);
          } else {
            rbtServerChannel.reportError(params);
          }
      } catch(e) {
        // FIXME what to do?
      }
    },  

    /* Business specific call */
    call : {
      /** 
      * Send event to RBT server 
      * 
      * @param {string} event
      * @param {object} [params]
      * @return void
      */
      sendEvent : function(event, params)
      {
        try {
            rbtServerChannel.makeEventRequest(event, 
                                          rbtServerChannel.url.fireEvent,
                                          params,
                                          { success: rbTServerResponse.handleEvent,
                                            error  : rbtServerResponse.defaultError
                                          });
        } catch(e) {
          // FIXME what to do?
          rbTApp.reportError({"exception" : e.message,
                              "message"   : "business send event failed",
                              "event"     : event,
                              "data"      : params, 
                             });
        }
      },

      /** 
      * Req RBT server to identify actor based on params
      * 
      * @param {object} params Option based on which actor will be identified
      * @return void
      */
      identify : function(params)
      {
        try {
            rbtServerChannel.makeEventRequest("identify", 
                                          rbtServerChannel.url.identify,
                                          params,
                                          { success: rbTServerResponse.setActor,
                                            error  : rbtServerResponse.defaultError
                                          });
        } catch(e) {
          rbTApp.reportError({"exception" : e.message,
                              "message"   : "business identify event failed",
                              "data"      : params, 
                             });
        }
      },

      /** 
      * Req RBT server to set current actor property
      * 
      * @param {object} params Option based on which actor property will be set
      * @return void
      */
      setUserProperty : function(params)
      {
        try {
            rbtServerChannel.makeEventRequest("set_user_property", 
                                          rbtServerChannel.url.setUserProperty,
                                          params,
                                          { success: rbTServerResponse.setUserProperty,
                                            error  : rbtServerResponse.defaultError
                                          });
        } catch(e) {
          // FIXME what to do?
          rbTApp.reportError({"exception" : e.message,
                              "message"   : "business set user property event failed",
                              "event"     : event,
                              "data"      : params, 
                             });
        }
      },

      
      /** 
      * ALIAS
      * 
      * @param {object} params Option based on which system property will be set
      * @return void
      */
      alias : function(params)
      {
          // FIXME : what to do?
      },


    }, 
};


