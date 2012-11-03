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
    "roi"               : "",
    "appDetails"        : ""
  },

  // Server request queue
  queue : [],

  /* Default options for server request */
  defaultOptions : {
    "success_callback" : rbTServerResponse.defaultSuccessCallback,
    "error_callback"   : rbTServerResponse.defaultErrorCallback
  },

  
  /**
  * Queue server requests.
  * @param {object} obj Object to be queued.
  * @return void
  */
  queueReq : function(obj)
  {
    this.queue.push(obj);
  },

  /**
  * Flush request queue by initiating server requests for queued requests.
  *
  * @return void
  */
  flushReqQueue : function()
  {
    for (var req in this.queue) {
      if (this.queue[req].event) {
        this.makeEventRequest(this.queue[req].event, this.queue[req].params, this.queue[req].callback);
      } else {
        this.makeGetRequest(this.queue[req].url, this.queue[req].params, this.queue[req].callback, this.queue[req].async);
      }
    }
  },


  /**
  * Check for App status, if alive , flush all req queue and clear interval.
  *
  */
  reqFlushIntervalId : function()
  {
      var interval = setInterval(function() {
        if (rbTAPP.isrbTAlive()) {
          clearInterval(interval);
          rbTServerChannel.flushReqQueue();
        }
      }, 2000);
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
      requestData["properties"] = rbJSON.typify(reqData);
    return requestData;
  },

  /** 
  *  Make a request to server.
  *  @param {string} event
  *  @param {object} params
  *  @param {object} callback
  *  @return {object}
  */
  makeEventRequest :  function(event, params, callback)
  {
    "use strict";
    try {
      var reqServerData = this.makeRequestData(event, params);
      callback = this.extendCallbacks(callback);
      jQuery.ajax({
            url: rbTServerChannel.url.fireEvent,
            type: 'GET',
            dataType: 'json',
            data: reqServerData,
            beforeSend: function() {
                // FIXME : add status to cookie
                rbTCookie.setCookie("lastevent", event);
            },
            success: function ( respData ) {
                rbTCookie.deleteCookie("lastevent");
                // FIXME :: ADDED ONLY TO TEST CLIENT SIDE
                rbTRules.executeRulesOnEvent(event);

                // FIXME : Currently we do not know the format of response we will get from server.
                if (respData && respData.actor) { 
                  rbTServerResponse.setActor(respData.actor);
                  callback.success(respData);
                }
            },
            error:function(XMLHttpRequest,textStatus, errorThrown){ 
                // FIXME :: ADDED ONLY TO TEST CLIENT SIDE
                rbTRules.executeRulesOnEvent(event);

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
  makeGetRequest : function(url, params, callback, async)
  {
    "use strict";
    try {
       var reqServerData = this.makeRequestData(undefined, params);
      callback = this.extendCallbacks(callback);
      if (async && async === "noasync")
        var asyncSt = false;
      else 
        var asyncSt = true;

      jQuery.ajax({
            url: url,
            async: asyncSt,
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
                          "log"       : true,
                          "server"    : true
                         });
    }
  },

  /**
  *
  *
  */  
  makeRequest : function(obj)
  {
    if (!obj)
      return;
    if (!rbTAPP.isrbTAlive()) {
      if (obj.url) {
        obj.async = obj.async || "async";
        this.queueReq({url:obj.url, params:obj.params, callback:obj.cb, async:obj.async});
      }
      else
        this.queueReq({event:obj.event, params:obj.params, callback:obj.cb});
      return;
    } else {
      this.flushReqQueue();
    }
    try {
      if (obj.event) {
        rbTServerChannel.makeEventRequest(obj.event, obj.params, obj.cb);
      } else if (obj.url) {
        rbTServerChannel.makeGetRequest(obj.url, obj.params, obj.cb);
      } else throw new Error("Wrong server req data");
    } catch (e) {
      rbTAPP.reportError({"exception" : e.message,
                          "message"   :"server request params are not valid" , 
                          "log"       : true,
                          "server"    : true
                         });
    }

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
  *  Request server to app details
  *  FIXME : IF THERE IS ANYTHING MISSING
  *  @return void
  */  
  appDetails : function(params, callback)
  {
    "use strict";
    callback = this.extendCallbacks(callback);
    this.makeGetRequest(this.url.details, null, callback);
  }, 


  /** 
  *  Send ROI to server
  *  @param {object} params 
  *  @return void
  */      
  roi : function(params, callback)
  {
    "use strict";
    var cb = this.extendCallbacks(callback);
    this.makeGetRequest(this.url.roi, params, callback);
  }, 

  /** 
  *  Send error report to server
  *  @param {object} params Error log message 
  *  @return void
  */ 
  reportError : function(params)
  {
    "use strict";
    var callback = this.extendCallbacks(callback);
    this.makeGetRequest(this.url.reportError, params, callback);
    callback = this.extendCallbacks(callback);
  },

  /** 
  *  Extend callback if not mentioned explicitly
  *   
  *  @return void
  */  
  extendCallbacks : function(callback)
  {
    "use strict";
    callback.success = callback.success || this.defaultOptions.success_callback;
    callback.error   = callback.error || this.defaultOptions.error_callback;
    return callback;
  }

};