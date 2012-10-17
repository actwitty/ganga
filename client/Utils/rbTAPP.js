var rbTAPP = {

    /* Main configs will be holded here */
    configs : {},

    
    /** 
    *  Do following tasks
    *  1). create session
    *  2).
    *  3). Fetch rules.
    *  4). check status of last event, if pending, execute it.
    *  5). 
    *  
    *  @return void
    */
    onInit : function()
    {
      // Create session
      rbTAPP.createSession();

      // Initialize rulebot rules
      rbTRules.init();

      // Check status of last event, if pending, execute it.
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
    *  @return {string} sessionID 
    */ 
    createSession : function()
    {
      rbtServerChannel.createSession({success:rbTAPP.setSessionID});
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
          // FIXME what to do?
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
        }
      },

      /** 
      * Req RBT server to set system property
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
          // FIXME what to do?
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
