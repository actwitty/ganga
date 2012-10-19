var rbTServerChannel = {
  
  /* All server url routes to be mapped here */
  url : {
    createSession     : "",
    fireEvent         : "http://localhost:3000/event/create",
    identify          : "",
    setUserProperty   : "",
    setSystemProperty : "",
    getRules          : "",
    reportError       : "",
  },

  /* Default options for server request */
  defaultOptions : {
    "success_callback" : rbTServerResponse.defaultSuccessCallback,
    "error_callback"   : rbTServerResponse.defaultErrorCallback,
  },

  /** 
  *  Set Request data for all server interactions
  *  @param {string} event
  *  @param {object} reqData
  *  @return {object}
  */  
  makeRequestData : function(event, reqData)
  {
    /* 
    if (!event) {
      return {
        "app_configs"  : rbTAPP.getConfigs(),  // mandatory
        "request_data" : reqData,     
      };
    } else {
      return {
        "app_configs"  : rbTAPP.getConfigs(),  // mandatory
        "event"        : event,                // mandatory 
        "request_data" : reqData,     
      };
    }*/
    if (!event) {
      return {
         "app_id"  : rbTAPP.getAppID(),  // mandatory
         "account_id"  : rbTAPP.getAccountID(),  // mandatory
         // "actor_id" : rbTAPP.getConfigs(),
         "properties" : reqData,    
      };
    } else {
      return {
         "app_id"  : rbTAPP.getAppID(),  // mandatory
         "account_id"  : rbTAPP.getAccountID(),  // mandatory
         // "actor_id" : rbTAPP.getConfigs(),
         "event"        : event,                // mandatory 
         "properties" : reqData,    
      };
    }
  },

  /** 
  *  Make a request to server.
  *  @param {string} event
  *  @param {rbTServerChannel.url} url
  *  @param {object} reqData
  *  @param {object} callback
  *  @return {object}
  */
  makeEventRequest :  function(event, url, reqData, callback)
  {
    "use strict";
    var reqServerData = rbTServerChannel.makeRequestData(event, reqData);
    callback = rbTServerChannel.extendCallbacks(callback);

    jQuery.ajax({
          url: url,
          type: 'GET',
          dataType: 'json',
          contentType: 'application/json',
          data: reqServerData,
          beforeSend: function() {
              // FIXME : add status to cookie
              rbTCookie.setCookie("lastevent", event);
          },
          success: function ( respData ) {
              callback.success(respData);
              rbTCookie.deleteCookie("lastevent");
          },
          error:function(XMLHttpRequest,textStatus, errorThrown){ 
              // todo : what to do??            
              callback.error(); 
          }
    });
  },

  /** 
  *  Request server to create session
  *   
  *  @return void
  */  
  createSession : function(url, callback)
  {
    "use strict";
    var reqServerData = {"app_id" : rbTAPP.configs.appID, "account_id" : rbTAPP.configs.accountID};
    callback = rbTServerChannel.extendCallbacks(callback);
    jQuery.ajax({
          url: rbTServerChannel.url.createSession,
          type: 'GET',
          dataType: 'json',
          contentType: 'application/json',
          data: reqServerData,
          success: function ( respData ) {
              callback.success(respData);
          },error:function(XMLHttpRequest,textStatus, errorThrown){ 
              // todo : what to do??            
              callback.error(); 
          }
    });
  },

  /** 
  *  Request server to for getting data
  *   
  *  @return void
  */  
  makeGetRequest : function(url, params, callback)
  {
    "use strict";
    var reqServerData = rbTServerChannel.makeRequestData(undefined, params);
    //var reqServerData = {"app_id" : rbTAPP.configs.appID, "account_id" : rbTAPP.configs.accountID};
    callback = rbTServerChannel.extendCallbacks(callback);
    jQuery.ajax({
          url: url,
          type: 'GET',
          dataType: 'json',
          contentType: 'application/json',
          data: reqServerData,
          success: function ( respData ) {
              callback.success(respData);
          },error:function(XMLHttpRequest,textStatus, errorThrown){ 
              // todo : what to do??            
              callback.error(); 
          }
    });
  },
   
  /** 
  *  Send error report to server
  *  @param {object} params Error log message 
  *  @return void
  */ 
  reportError : function(params)
  {
    "use strict";
    callback = rbTServerChannel.extendCallbacks(callback);
    jQuery.ajax({
          url: rbTServerChannel.url.reportError,
          type: 'GET',
          dataType: 'json',
          contentType: 'application/json',
          data: params,
          success: function ( respData ) {
              callback.success(respData);
          },error:function(XMLHttpRequest,textStatus, errorThrown){ 
              // todo : what to do??            
              callback.error(); 
          }
    });
  },

  /** 
  *  Extend callback if not mentioned explicitly
  *   
  *  @return void
  */  
  extendCallbacks : function(callback)
  {
    "use strict";
    callback.success = callback.success || rbTServerChannel.defaultOptions.success_callback;
    callback.error   = callback.error || rbTServerChannel.defaultOptions.error_callback;
    return callback;
  },

  

};