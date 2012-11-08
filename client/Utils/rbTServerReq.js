var rbTServerChannel = {
  
  rbt_url : "http://localhost:3000/",

  serverUrl : function(url)
  {
    return this.rbt_url + url + ".jsonp";
  }, 

  /* All server url routes to be mapped here */
  url : {
    "createSession"     : "",
    "appDetails"        : "app/read",
    "fireEvent"         : "event/create",
    "identify"          : "actor/identify",
    "readActor"         : "actor/read",
    "createActor"       : "actor/create",
    "setActor"          : "actor/set",
    "conversion"        : "conversion/create",
    "reportError"       : "err/create",
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
        //this.makeEventRequest(this.queue[req].event, this.queue[req].params, this.queue[req].callback);
        this.makeEventRequest(this.queue[req]);
      } else {
        //this.makeGetRequest(this.queue[req].url, this.queue[req].params, this.queue[req].callback, this.queue[req].async);
        this.makeGetRequest(this.queue[req]);
      }
    }
  },


  /**
  * Check for App status, if alive , flush all req queue and clear interval.
  *
  */
  reqQFlushInterval : function()
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
    if (event) {
      requestData = {};
      requestData["properties"] = reqData ? rbJSON.typify(reqData) : {};
      requestData["event"] = event;  
    }
    requestData["app_id"] = rbTAPP.getAppID(); // mandatory
    requestData["account_id"] = rbTAPP.getAccountID(); // mandatory  

    return requestData;
  },

  /**
  *
  *
  *
  */
  extendReqData : function(obj, reqData)
  {
    if (!obj || !reqData)
      return {};
    var requestData = reqData;

    if (obj.set_actor || obj.conversion) {
      obj.params = obj.params || {};
      requestData["properties"] = {"profile":reqData ? rbJSON.typify(obj.params) : {}};
      requestData["actor_id"] = rbTAPP.getActorID() || "";
    } else if(obj.set_actor_prop) {
      requestData["actor_id"] = rbTAPP.getActorID() || "";
    }


    return requestData;
  },

  /** 
  *  Make a request to server.
  *  @param {string} event
  *  @param {object} params
  *  @param {object} callback
  *  @return {object}
  */
  //makeEventRequest :  function(event, params, callback)
  makeEventRequest :  function(obj)
  {
    "use strict";
    var that = obj;
    try {
      var reqServerData = this.makeRequestData(obj.event, obj.params );
      var callback = this.extendCallbacks(obj.callback);
      var that = obj;
      jQuery.ajax({
            url: this.serverUrl(rbTServerChannel.url.fireEvent),
            type: 'GET',
            dataType: 'jsonp',
            contentType : 'application/javascript',
            data: reqServerData,
            crossDomain:true,
            timeout : 10000,
            beforeSend: function() {
                rbTCookie.setCookie("lastevent", that.event);
            },
            success: function ( respData ) {
                rbTCookie.deleteCookie("lastevent");
                // FIXME :: ADDED ONLY TO TEST CLIENT SIDE
                rbTRules.executeRulesOnEvent(that.event);

                // FIXME : Currently we do not know the format of response we will get from server.
                if (respData && respData.actor) { 
                  rbTServerResponse.setActor(respData.actor);
                  callback.success(respData);
                }
            },
            error:function(XMLHttpRequest,textStatus, errorThrown){ 
                // FIXME :: ADDED ONLY TO TEST CLIENT SIDE
                rbTRules.executeRulesOnEvent(that.event);

                callback.error(); 
                
            }
      });
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
                          "message"   :"server event request failed" , 
                          "event"     : that.event,
                          "obj"       : JSON.stringify(that),
                          "log"       : "error" 
                         }); 
    }
  },

 

  /** 
  *  Request server to for getting data
  *   
  *  @return void
  */  
  //makeGetRequest : function(url, params, callback, async)
  makeGetRequest : function(obj)
  {
    "use strict";
    var that = obj;
    try {
      var reqServerData = this.extendReqData(obj,this.makeRequestData(undefined, obj.params));
      var callback = this.extendCallbacks(obj.cb);
      if (obj.async && obj.async === "noasync")
        var asyncSt = false;
      else 
        var asyncSt = true;
      //reqServerData["format"]="javascript";
      jQuery.ajax({
            url: this.serverUrl(obj.url),
            async: asyncSt,
            type: 'GET',
            dataType: 'jsonp',
            contentType : 'application/javascript',
            data: reqServerData,
            crossDomain:true,
            timeout : 10000,
            success: function ( respData ) {
                respData.url = that.url;
                callback.success(respData);
            },error:function(XMLHttpRequest,textStatus, errorThrown){ 
                // todo : what to do??            
                callback.error(); 
            }
      });
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
                          "message"   : "server request failed" , 
                          "object"    : obj,
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
    var that = obj;
    if (!obj)
      return;
    if (!rbTAPP.isrbTAlive()) {
      if (obj.url) {
        obj.async = obj.async || "async";
        this.queueReq({url:obj.url, params:obj.params, callback:obj.cb, async:obj.async});
      }
      else {
        this.queueReq({event:obj.event, params:obj.params, callback:obj.cb});
      }
      this.reqQFlushInterval();
      return;
    } else {
      this.flushReqQueue();
    }
    try {
      if (obj.event) {
        rbTServerChannel.makeEventRequest(obj.event, obj.params, obj.cb);
      } else if (obj.url) {
        rbTServerChannel.makeGetRequest(obj);
      } else throw new Error("Wrong server req data");
    } catch (e) {
      rbTAPP.reportError({"exception" : e.message,
                          "message"   : "server request params are not valid" , 
                          "url"       : that.url,
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
  *  Send conversion to server
  *  @param {object} params 
  *  @return void
  */      
  conversion : function(params, callback)
  {
    "use strict";
    var cb = this.extendCallbacks(callback);
    this.makeGetRequest({"url"        : rbTServerChannel.url.conversion, 
                         "params"     : params,
                         "conversion" : true,
                         "cb"         : cb
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
    var callback = this.extendCallbacks(callback);
    this.makeGetRequest(this.url.reportError, params, callback);
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