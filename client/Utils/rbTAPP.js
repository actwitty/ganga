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

var version = "1.0.1";

var rbTAPP = function() {
  var configs = {
                 "status"   : false,
                 "transVar" : {}
                }; 

  return {    
      /** 
      *  Do following tasks on initialization of the app
      *  Get app details
      *  @return void
      */
      initialize : function()
      {
        rbTDebug.log("Initializing RBT APP");
        rbTServerChannel.appDetails();
      },

      /**
      *
      */ 
      releasePreInitCalls : function(w)
      {
        var l = w.rb.q;
        w.rb = new RBT();
        if (l.length) {
          for (var c in l) { var o = l[c]; rb[o.t](o.a,o.b,o.c); }    
        }
      },

      /**
      *
      */
      actOnJQInit : function()
      {
        this.enablePlugins();
        rbTActor.retFromCookie();
        this.releasePreInitCalls(window);
        rbTUtils.invokeEasyJquery("rbTUtils.keepEasyJQVars");
      },

      /**
      * Enable plugins related to cors/storage. 
      * Additional responsibilty of invoking Easy Jquery
      */
      enablePlugins : function()
      {
        enableCORS(jQuery);
        initJStorage();
      },

      /**
      * Check status of RBT APP
      *
      * @param {function} callback Callback function if rbTAPP is alive.
      * @param {object} args Arguments with which callback will be called.
      * @return void   
      */
      isAlive :  function()
      {
        return configs.status;
      },  

      /**
      *
      */
      setrbTAlive : function()
      {
        configs.status = true;
        rbTServerChannel.flushReqQueue();
      },

      /**
      * Set RBT APP Status to true to signal app is alive
      */
      wakeUp : function()
      {
        rbTDebug.log("Initializing RBT APP");
        this.initialize();
      },

      /** 
      *  Set App Id
      *  @param {string} id
      *  @return void
      */
      setAppID: function(id)
      {
        configs.appID = id;
      },

      /** 
      *  Set Account ID
      *  @param {string} id 
      *  @return void
      */
      setAccountID : function(id)
      {
        configs.accountID = id;
      },

      /** 
      *  Set Session ID
      *  @param {string} id 
      *  @return void
      */
      setSessionID : function(id)
      {
        configs.sessionID = id;
      },

      /**
      *
      */   
      setTransVar : function(event,data)
      {
        configs.transVar.event = data;
      },

      /**
      *
      */
      setAppDetail : function(data)
      {
        configs.appData = data;
      },

      /** 
      *  Get App ID
      *  @return {string} id 
      */
      getAppID : function()
      {
        return configs.appID;
      },

      /** 
      *  Get Account ID
      *  @return {string} id 
      */  
      getAccountID : function()
      {
        return configs.accountID;
      },   

      /** 
      *  Get Session ID
      *  @return {string} id 
      */  
      getSessionID : function()
      {
        return configs.sessionID;
      },

      /**
      *
      */
      getTransVar : function(event)
      {
        return configs.transVar.event;
      },

      /**
      *
      */
      getAppDetail : function()
      {
        return configs.appData;
      },

      /** 
      *  report error to rbT server
      *  @param {object} params Error log message 
      *  @return void
      */ 
      reportError : function(params)
      {
        try {
            this.log(params);
            if (params.server) {
              rbTServerChannel.reportError(params);
            }
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
        if(params && params.message) {
          rbTDebug.log(params.message);
        }
        //rbTDebug.log(params)
        console.log(params);
      },
  };    
}();
