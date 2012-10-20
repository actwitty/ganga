var rbTServerChannel = {
  
  /* All server url routes to be mapped here */
  url : {
    "createSession"     : "",
    "fireEvent"         : "http://localhost:3000/event/create",
    "identify"          : "",
    "setUserProperty"   : "",
    "setSystemProperty" : "",
    "getRules"          : "",
    "reportError"       : "",
    "roi"               : ""
  },

  /* Default options for server request */
  defaultOptions : {
    "success_callback" : rbTServerResponse.defaultSuccessCallback,
    "error_callback"   : rbTServerResponse.defaultErrorCallback
  },

  /** 
  *  Set Request data for all server interactions
  *  @param {string} event
  *  @param {object} reqData
  *  @return {object}
  */  
  makeRequestData : function(event, reqData)
  {
    var requestData = {};

    requestData["app_id"] = rbTAPP.getAppID(); // mandatory
    requestData["account_id"] = rbTAPP.getAccountID(); // mandatory
   
    if (event)
      requestData["event"] = event;
    if (reqData)
      requestData["properties"] = reqData;
    return requestData;
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
<<<<<<< HEAD
    var reqServerData = rbTServerChannel.makeRequestData(event, reqData);
    callback = rbTServerChannel.extendCallbacks(callback);
=======
    "use strict";
    try {
      var reqServerData = this.makeRequestData(event, reqData);
      callback = this.extendCallbacks(callback);
>>>>>>> 2537852c42ccb4889bd7dcf15d9a65ef617dc76a

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
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
                          "message"   :"server event request failed" , 
                          "event"     : event,
                          "reqData"   : JSON.stringify(reqData),
                          "log"       : "error" 
                         }); 
    }
  },

 

  /** 
  *  Request server to for getting data
  *   
  *  @return void
  */  
  makeGetRequest : function(url, params, callback)
  {
<<<<<<< HEAD
    reqServerData = {"app_id" : rbTAPP.configs.appID, "account_id" : rbTAPP.configs.accountID};
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
=======
    "use strict";
    try {
      var reqServerData = this.makeRequestData(undefined, params);
      callback = this.extendCallbacks(callback);
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
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
                          "message"   :"server request failed" , 
                          "url"       : url,
                          "log"       : "error" 
                         });
    }
>>>>>>> 2537852c42ccb4889bd7dcf15d9a65ef617dc76a
  },
   
   /** 
  *  Request server to create session
  *  FIXME : NEED TO KNOW HOW SESSION WILL BE CREATED, BASED ON THAT WE WILL REMOVE MULTIPLE AJAX 
  *  @return void
  */  
  createSession : function(url, callback)
  {
    "use strict";
    callback = this.extendCallbacks(callback);
    this.makeGetRequest(url, null, callback);
  }, 

  /** 
  *  Request server for ROI
  *  @param {object} params Parameters to pass as payload for ROI.
  *  @param {object} callback Defined callback for roi. 
  *  @return void
  */  
<<<<<<< HEAD
  makeGetRequest : function(url, callback)
  {
    reqServerData = {"app_id" : rbTAPP.configs.appID, "account_id" : rbTAPP.configs.accountID};
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
   
=======
  roi : function(params, callback)
  {
    "use strict";
    var cb = this.extendCallbacks(callback);
    this.makeGetRequest(this.url.roi, params, callback);
  }, 

>>>>>>> 2537852c42ccb4889bd7dcf15d9a65ef617dc76a
  /** 
  *  Send error report to server
  *  @param {object} params Error log message 
  *  @return void
  */ 
  reportError : function(params)
  {
<<<<<<< HEAD
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
=======
    "use strict";
    var callback = this.extendCallbacks(callback);
    this.makeGetRequest(this.url.reportError, params, callback);
    callback = this.extendCallbacks(callback);
>>>>>>> 2537852c42ccb4889bd7dcf15d9a65ef617dc76a
  },

  /** 
  *  Extend callback if not mentioned explicitly
  *   
  *  @return void
  */  
  extendCallbacks : function(callback)
  {
<<<<<<< HEAD
    callback.success = callback.success || rbTServerChannel.defaultOptions.success_callback;
    callback.error   = callback.error || rbTServerChannel.defaultOptions.error_callback;
=======
    "use strict";
    callback.success = callback.success || this.defaultOptions.success_callback;
    callback.error   = callback.error || this.defaultOptions.error_callback;
>>>>>>> 2537852c42ccb4889bd7dcf15d9a65ef617dc76a
    return callback;
  }

};