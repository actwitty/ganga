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

/**
* Server request interaction manager for the application.
*/
var rbTServerChannel = {
  
  rbt_url : (document.location.hostname==="localhost" || document.location.hostname==="127.0.1.1") ? 
            "http://localhost:3000/" : "http://rulebot.com/",

  
  /* All server url routes to be mapped here */
  url : {
    "appDetails"  : "app/read",
    "fireEvent"   : "event/create",
    "identify"    : "actor/identify",
    "readActor"   : "actor/read",
    "createActor" : "actor/create",
    "setActor"    : "actor/set",
    "conversion"  : "conversion/create",
    "reportError" : "err/create",
  },

  // Server request queue
  queue : [],
  actorRQ: [],

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
    var qLen = this.queue.length;
    
    if (!qLen) return;

    for (var i = 0 ; i < qLen ; ++i) {
      var r = this.queue[i];
      if (r.event && !rbTActor.isReady()) {
        rbTActor.bufferEvRQ(r);
      } else {
        this.makeServerRequest(r);
      }
    }
    this.queue = [];
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
    // FIXME :: **THERE SEEMS TO BE A BIT OF REPEATATION. HANDLE THIS ONCE DECIDED **
    if (obj.event) {
      k = {};
      k["properties"] = obj.params ? obj.params:{};
      k["name"] = obj.event;  
      k["app_id"] = rbTAPP.getAppID() || "";
      k["actor_id"] = rbTActor.getID() || "";
    } else if (obj.app_read) {
      k["id"] = rbTAPP.getAppID() || "";
    } else if(obj.actor_create) {
      k["app_id"] = rbTAPP.getAppID() || "";
    } else if (obj.set_actor) {
      k["properties"] = {"profile":obj.params ? obj.params:{}};
      k["id"] = rbTActor.getID() || "";
      k["app_id"] = rbTAPP.getAppID() || "";
    } else if(obj.set_actor_prop) {
      k["id"] = rbTActor.getID() || "";
      k["app_id"] = rbTAPP.getAppID() || "";
    } else if(obj.identify) {
      k["uid"] = obj.params;
      k["id"] = rbTActor.getID() || "";
      k["app_id"] = rbTAPP.getAppID() || "";
    } else if(obj.err || obj.conversion) {
      k["app_id"] = rbTAPP.getAppID() || "";
      k["actor_id"] = rbTActor.getID() || "";
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

    function getContentType(type)
    {
      return type === "POST" ? 'application/x-www-form-urlencoded' : "application/json";
    }

    function getURL(type, url)
    {
      return this.rbt_url + url + (type === "POST" ? "" : ".json"); 
    }

    function resetEventVar(e)
    {
      rbTAPP.setTransVar(e,{});
    }

    rbTAPP.log("Making rulebot server call for " + obj.url);
    try {
      var reqServerData = this.extendRequestData(obj);
      var callback = this.extendCallbacks(obj.cb);
      if (obj.async && obj.async === "noasync") var asyncSt = false;
      else var asyncSt = true;
      var __this = obj;
      var url = (obj.event) ? rbTServerChannel.url.fireEvent : obj.url;
      __this.requestData = reqServerData;
      jQuery.ajax({
            url: getURL.call(this,obj.type,url),
            type: __this.type || 'GET',
            async: asyncSt,
            contentType : getContentType(obj.type),
            data: reqServerData,
            crossDomain:true,
            cache:true,
            xhrField : { withCredentials:true},
            beforeSend: function() {
                if (__this.event) {
                  rbTStore.set("lastevent", __this.event);
                  rbTAPP.setTransVar(__this.event,__this.params);
                }
            },
            success: function ( respData ) {
                if (typeof respData === "string") respData = JSON.parse(respData);
                rbTAPP.log({"message":"server response success " + __this.url,"data":respData});

                if (__this.event) {
                  rbTStore.deleteKey("lastevent");
                  rbTRules.executeRulesOnEvent(__this.event);
                  if (respData && respData.actor) { 
                    callback.success(respData, __this);
                  }
                  resetEventVar(__this.event);
                } else {
                  respData.url = __this.url;
                  if (__this.set_actor) respData.actor = respData;
                  callback.success(respData, __this);
                }
            },
            error:function(XMLHttpRequest,textStatus, errorThrown){ 
                rbTAPP.log({"message":"server response error " + __this.url,"data_closure":__this,"textStatus":textStatus});
                if (__this.event) {
                  resetEventVar(__this.event); 
                } else if (__this.identify && XMLHttpRequest.responseText.indexOf("is already in use")) {
                  rbTAPP.log("Actor is already in use ::" + __this.requestData.uid);
                  rbTServerChannel.actorDetails();
                }
                callback.error();
            }
      });
    } catch(e) {
      rbTAPP.reportError({ "exception": e.message,
                          "message"   : "SERVER REQUEST FAILED" , 
                          "obj"       : JSON.stringify(__this),
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
    if (!rbTAPP.isAlive()) {
      if (obj.url) {
        obj.async = obj.async || "async";
      }
      this.queueReq(obj); 
      return; 
    } else {
      this.flushReqQueue();
    }
    try {
      rbTServerChannel.makeServerRequest(obj);
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
  *  Request server to app details
  *  FIXME : IF THERE IS ANYTHING MISSING
  *  @return void
  */  
  appDetails : function()
  {
    "use strict";
    this.makeServerRequest({"url"      : this.url.appDetails,
                            "app_read" : true,
                            "cb"       : { success: rbTServerResponse.setAppDetail,
                                           error  : rbTServerResponse.defaultError
                                         }
                           });  
  }, 

  /**
  * Request server to app details
  * FIXME : IF THERE IS ANYTHING MISSING
  * @return void
  */
  actorDetails : function()
  {
    this.makeRequest({"url"           : this.url.readActor, 
                      "set_actor_prop": true,
                      "cb"            : { success: rbTServerResponse.setActorProperty,
                                          error  : rbTServerResponse.defaultError
                                        }
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
    this.makeRequest({"url"        : this.url.conversion, 
                      "params"     : params,
                      "conversion" : true,
                      "type"       : "POST",
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
    this.makeRequest({"url":this.url.reportError,
                      "params":params,
                      "type":"POST",
                      "err":true, 
                      "cb":callback
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
    callback.success = callback.success || this.defaultOptions.success_callback;
    callback.error   = callback.error || this.defaultOptions.error_callback;
    return callback;
  }

};