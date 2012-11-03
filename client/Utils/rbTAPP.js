var rbTAPP = {
    

    /* Main configs will be holded here */
    configs : {
      "status" : false
    },

    
    /** 
    *  Do following tasks on initialization of the app
    *  1). include jQuery if need be
    *  2). create session.
    *  3). fetch configs.
    *  4). check status of last event, if pending, execute it.
    *  5). fetch system properties if cache miss
    *  6). Allow Business to make calls
    *  
    *  @return void
    */
    initialize : function()
    {
      "use strict";
      // 1). includin jquery if need be
      //rbTUtils.includeJQIfNeeded();

      // 2). Create session Deferred till further discussion
      //rbTAPP.createSession();

      // 3). Initialize rulebot rules
      rbTRules.init();

      // 4). Initialize system variables  
      rbTSystemVar.init();

      // 5). FIXME : Check status of last event, if pending, execute it.
      //rbTRules.executeLastPendingEvent();

      window.rb = new RBT();
    },

    /**
    * Check status of RBT APP
    *
    * @param {function} callback Callback function if rbTAPP is alive.
    * @param {object} args Arguments with which callback will be called.
    * @return void   
    */
    isrbTAlive :  function()
    {
       return this.configs.status;
    },  

    /**
    * Set RBT APP Status to true to signal app is alive
    */
    wake_RBT_APP : function()
    {
      rbTAPP.configs.status = true;
      rbTDebug.log("Initializing RBT APP");
      rbTAPP.initialize();
    },

    /** 
    *  Set App Id
    *  @param {string} id
    *  @return void
    */
    setAppID: function(id)
    {
      this.configs.appID = id;
    },

    /** 
    *  Set Account ID
    *  @param {string} id 
    *  @return void
    */
    setAccountID : function(id)
    {
      this.configs.accountID = id;
    },

    /** 
    *  Set Session ID
    *  @param {string} id 
    *  @return void
    */
    setSessionID : function(id)
    {
      this.configs.sessionID = id;
    },

    /** 
    *  Set Actor ID
    *  @param {string} id 
    *  @return void
    */
    setActorID : function(id)
    {
      //this.configs.ActorID = id;
      rbTCookie.setCookie("actor_id", respData);
    },   



    /** 
    *  Get App ID
    *  @return {string} id 
    */
    getAppID : function()
    {
      return this.configs.appID
    },

    /** 
    *  Get Account ID
    *  @return {string} id 
    */  
    getAccountID : function()
    {
      return this.configs.accountID;
    },   

    /** 
    *  Get Session ID
    *  @return {string} id 
    */  
    getSessionID : function()
    {
      return this.configs.sessionID;
    },

    /** 
    *  Get Actor ID
    *  @return {string} id 
    */  
    getActorID : function()
    {
      return rbTCookie.getCookie(rbTCookie.defaultCookie.actorID); 
      //return this.configs.actorID;
    },


    /** 
    *  Get Application configs
    *  @return {rbTAPP.configs} 
    */ 
    getConfigs : function()
    {
      "use strict";
      var cnf = {"app_id"  : this.configs.appID,
                 "account_id" : this.configs.accountID  
                }; 
      
       var actor_id = rbTCookie.getCookie(rbTCookie.defaultCookies.actorID);
       if (actor_id)  {
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
      rbTServerChannel.createSession({success:this.setSessionID});
    },

    /** 
    *  Get Application based configs
    *  FIXME : THIS NEEDS TO BE DISCUSSED AS WE ARE PLANNING TO HAVE A PROXY IN BETWEEN
    *  @return {string} TBD 
    */
    getAppData : function()
    {
      rbTServerChannel.makeRequest({ "url"   : rbTServerChannel.url.appDetails,
                                     "params": {"appid":this.configs.appID},
                                     "cb"    : { success: rbTServerResponse.setAppDetail,
                                                 error  : rbTServerResponse.defaultError
                                               }
                                   });
    },  

    /** 
    * Set System properties
    * 
    * @param {object} params Option based on which system property will be set
    * @return void
    */
    setSystemProperty : function(params)
    {
      "use strict";
      if (params) {
          rbTServerChannel.makeGetRequest( rbTServerChannel.url.setSystemProperty,
                                           params,
                                           { success: rbTServerResponse.setSystemProperty,
                                             error  : rbTServerResponse.defaultError
                                           }
                                          );
      } else {
          rbTAPP.reportError({"message"   : "System params could not be found, report error",
                              "data"      : params
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
    *  report error to rbT server
    *  @param {object} params Error log message 
    *  @return void
    */ 
    reportError : function(params)
    {
      try {
          if (params.log) 
            rbTDebug.error(params);
          if (params.server) 
            rbTServerChannel.reportError(params);
      } catch(e) {
        // FIXME what to do?
      }
    },

    /** 
    *  Preprocess params with datatype.
    *  @param {object} params Error log message. 
    *  @return {object} params with added data types.
    */
    preprocessParams : function(params)
    {
      
     
    }
};
