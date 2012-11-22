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

var trigger_fish = {};

trigger_fish.rbTAPP = {
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
      trigger_fish.enableCORS(jQuery);
      trigger_fish.initJStorage();
      this.getAppData();
      //this.createDummyActor();
      trigger_fish.rbTActor.retFromCookie();

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
      trigger_fish.rbTDebug.log("Initializing RBT APP");
      trigger_fish.rbTAPP.initialize();
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
    *
    *
    */   
    setTransVar : function(data)
    {
      this.configs.transVar = data;
    },

    /**
    *
    */
    setAppDetail : function(data)
    {
      this.configs.appData = data;
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
    *
    */
    getTransVar : function()
    {
      return this.configs.transVar;
    },

    /**
    *
    */
    getAppDetail : function()
    {
      return this.configs.appData;
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
      
       var actor_id = trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorID);
       if (actor_id)  {
        cnf["actor_id"] = actor_id;
       }
      return cnf;
    },  

   

    /** 
    *  Get Application based configs
    *  FIXME : THIS NEEDS TO BE DISCUSSED AS WE ARE PLANNING TO HAVE A PROXY IN BETWEEN
    *  @return {string} TBD 
    */
    getAppData : function()
    {
      trigger_fish.rbTServerChannel.makeServerRequest({"url"      : trigger_fish.rbTServerChannel.url.appDetails,
                                                       "app_read" : true,
                                                       "async"    : "noasync", 
                                                       "cb"       : { success: trigger_fish.rbTServerResponse.setAppDetail,
                                                                      error  : trigger_fish.rbTServerResponse.defaultError
                                                                    }
                                                      });
    },  

    /** 
    *  report error to rbT server
    *  @param {object} params Error log message 
    *  @return void
    */ 
    reportError : function(params)
    {
      try {
          //trigger_fish.rbTDebug.error(params);
          if (params.server) 
            trigger_fish.rbTServerChannel.reportError(params);
      } catch(e) {
        // FIXME what to do?
      }
    },
    
    /** 
    *  log
    *  @param {object} params Error log message 
    *  @return void
    */
    log : function(params)
    {
      if(params && params.message)
        trigger_fish.rbTDebug.log(params.message);
      trigger_fish.rbTDebug.log(params)
    },

};
