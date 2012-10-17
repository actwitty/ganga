var rbTServerChannel = {
  "use strict"
  
  /* All server url routes to be mapped here */
  url : {
    createSession     : "",
    fireEvent         : "",
    identify          : "",
    setUserProperty   : "",
    setSystemProperty : "",
    getRules          : "",
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
    return {
      "app_configs"  : rbTAPP.getConfigs(),  // mandatory
      "event"        : event,                // mandatory 
      "request_data" : reqData,     
    };
  },

  /** 
  *  Make a request to server.
  *  @param {string} event
  *  @param {rbtServerChannel.url} url
  *  @param {object} reqData
  *  @param {object} callback
  *  @return {object}
  */
  makeEventRequest :  function(event, url, reqData, callback)
  {
    var reqServerData = rbtServerChannel.makeRequestData(event, reqData);
    callback = rbtServerChannel.extendCallbacks(callback);

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
  createSession : function(callback)
  {
    reqServerData = {"app_id" : rbTAPP.configs.appID, "account_id" : rbTAPP.configs.accountID};
    jQuery.ajax({
          url: rbtServerChannel.url.createSession,
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
  *  Send event to server
  *  @param {string} event
  * 
  *  @return void
  */
  fireEvent : function(event, params)
  {
    // FIXME : to add functionality
  },



  /** 
  *  Extend callback if not mentioned explicitly
  *   
  *  @return void
  */  
  extendCallbacks : function(callback)
  {
    callback.success = callback.success || rbtServerChannel.defaultOptions.success_callback;
    callback.error   = callback.error || rbtServerChannel.defaultOptions.error_callback;
    return callback;
  },

  

};