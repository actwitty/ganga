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
trigger_fish.rbTServerChannel = {
  
  rbt_url : "http://localhost:3000/",

  
  /* All server url routes to be mapped here */
  url : {
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
    "success_callback" : trigger_fish.rbTServerResponse.defaultSuccessCallback,
    "error_callback"   : trigger_fish.rbTServerResponse.defaultErrorCallback
  },

  /**
  *
  */
  serverUrl : function(type, url)
  {
    var u = this.rbt_url + url + (type === "POST" ? "" : ".json"); 
    return u;
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
    if (!this.queue.length)
      return;
    for (var req in this.queue) {
      this.makeServerRequest(this.queue[req]);
    }
    this.queue = [];
  },


  /**
  * Check for App status, if alive , flush all req queue and clear interval.
  *
  */
  reqQFlushInterval : function()
  {
    if (this.queue.length > 1)
      return;
    var interval = setInterval(function() {
      if (trigger_fish.rbTAPP.isrbTAlive()) {
        clearInterval(interval);
        trigger_fish.rbTServerChannel.flushReqQueue();
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
      requestData["properties"] = reqData ? reqData:{};
      requestData["name"] = event;  
    }
    requestData["id"] = trigger_fish.rbTAPP.getAppID(); // mandatory
    requestData["account_id"] = trigger_fish.rbTAPP.getAccountID(); // mandatory  

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
      requestData["properties"] = {"profile":reqData ? obj.params : {}};
      requestData["actor_id"] = trigger_fish.rbTActor.getID() || "";
    } else if(obj.set_actor_prop) {
      requestData["actor_id"] = trigger_fish.rbTActor.getID() || "";
    } else if(obj.identify) {
      requestData["uid"] = obj.params;
    }
    return requestData;
  },
  /** 
  *  Set Request data for all server interactions
  *  @param {object} obj . The data which needs to be padded with request parameters
  *  @return {object} extReqData . Object padded with request params.
  */ 
  extendRequestData : function(obj) 
  {
    if (!obj)
      return {};
    var k = {};
    // FIXME :: **THERE SEEMS TO BE A BIT OF REPEATATION. HANDLE THIS**
    if (obj.event) {
      k = {};
      k["properties"] = obj.params ? obj.params:{};
      k["name"] = obj.event;  
      k["app_id"] = trigger_fish.rbTAPP.getAppID() || "";
      k["actor_id"] = trigger_fish.rbTActor.getID() || "";
    } else if (obj.app_read) {
      k["id"] = trigger_fish.rbTAPP.getAppID() || "";
    } else if (obj.set_actor) {
      k["properties"] = {"profile":obj.params ? obj.params:{}};
      k["id"] = trigger_fish.rbTActor.getID() || "";
      k["app_id"] = trigger_fish.rbTAPP.getAppID() || "";
    } else if(obj.set_actor_prop) {
      k["id"] = trigger_fish.rbTActor.getID() || "";
      k["app_id"] = trigger_fish.rbTAPP.getAppID() || "";
    } else if(obj.identify) {
      k["uid"] = obj.params;
      k["id"] = trigger_fish.rbTActor.getID() || "";
      k["app_id"] = trigger_fish.rbTAPP.getAppID() || "";
    } else if(obj.err || obj.conversion) {
      k["app_id"] = trigger_fish.rbTAPP.getAppID() || "";
      k["actor_id"] = trigger_fish.rbTActor.getID() || "";
      k["properties"] = obj.params ? obj.params:{};
    }

    return k;
  },
  /**
  * Make XMLHttpRequest to Server
  * @param {object} obj Data format which needs to be send.
  * @return void
  */
  makeServerRequest : function(obj)
  {
    "use strict";
    var that = obj;
    try {
      var reqServerData = this.extendRequestData(obj);
      var callback = this.extendCallbacks(obj.cb);
      if (obj.async && obj.async === "noasync")
        var asyncSt = false;
      else 
        var asyncSt = true;
      var that = obj;
      var url = (obj.event) ? trigger_fish.rbTServerChannel.url.fireEvent : obj.url;
      jQuery.ajax({
            url: this.serverUrl(obj.type,url),
            type: that.type || 'GET',
            async: asyncSt,
            //dataType: 'json',
            //contentType : 'application/javascript',
            contentType : 'application/x-www-form-urlencoded',
            data: reqServerData,
            crossDomain:true,
            timeout : 10000,
            xhrField : {
              withCredentials : true
            },
            beforeSend: function() {
                if (that.event) {
                  trigger_fish.rbTCookie.setCookie("lastevent", that.event);
                  trigger_fish.rbTAPP.setTransVar(that.params);
                }
            },
            success: function ( respData ) {
                trigger_fish.rbTAPP.log({"message":"server response success","data":respData});
                if (that.event) {
                  trigger_fish.rbTCookie.deleteCookie("lastevent");
                  trigger_fish.rbTRules.executeRulesOnEvent(that.event);
                  if (respData && respData.actor) { 
                    trigger_fish.rbTServerResponse.setActor(respData.actor);
                    callback.success(respData);
                  }
                  trigger_fish.rbTAPP.setTransVar({});
                } else {
                  respData.url = that.url;
                  callback.success(respData);
                }
            },
            error:function(XMLHttpRequest,textStatus, errorThrown){ 
                trigger_fish.rbTAPP.log({"message":"server response error","data_closure":that,"textStatus":textStatus});
                // FIXME :: ADDED ONLY TO TEST CLIENT SIDE
                if (that.event)
                  trigger_fish.rbTRules.executeRulesOnEvent(that.event);
                callback.error();
                trigger_fish.rbTAPP.setTransVar({}); 
            }
      });
    } catch(e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   :"SERVER REQUEST FAILED" , 
                          "obj"       : JSON.stringify(that),
                          "log"       : "error" 
                         }); 
    }
  },


  /**
  * Prepare Server request, queue req's if needed be.
  * @param {object} obj Data format which needs to be send.
  */  
  makeRequest : function(obj)
  {
    var that = obj;
    if (!obj)
      return;
    if (!trigger_fish.rbTAPP.isrbTAlive()) {
      if (obj.url)
        obj.async = obj.async || "async";
      this.queueReq(obj);  
      this.reqQFlushInterval();
      return;
    } else {
      this.flushReqQueue();
    }
    try {
      trigger_fish.rbTServerChannel.makeServerRequest(obj);
    } catch (e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "server request params are not valid" , 
                          "url"       : that.url,
                          "log"       : true,
                          "server"    : true
                         });
    }

  },

  /** 
  *  Request server to app details
  *  FIXME : IF THERE IS ANYTHING MISSING
  *  @return void
  */  
  appDetails : function(params, callback)
  {
    "use strict";
    var cb = this.extendCallbacks(callback);
    this.makeServerRequest({"url": this.url.details,
                      "params"     : params,
                      "cb"         : cb
                     });  
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
    this.makeRequest({"url"        : rbTServerChannel.url.conversion, 
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
    this.makeRequest({"url":this.url.reportError,"params":params,"err":true, "cb":callback});
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