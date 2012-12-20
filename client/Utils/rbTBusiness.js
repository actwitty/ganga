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
/* MAIN BUSINESS SPECIFIC CALLS */


/**
* Rule bot specific functions to be available for business.
*/






var RBT = function()
{
  var _appId = rbTAPP.getAppID();
  var _accountID = rbTAPP.getAccountID();
  var _status = rbTAPP.isAlive();
  var _state = true;

  /** 
  * Send event to RBT server 
  * 
  * @param {string} event
  * @param {object} [params]
  * @return void
  */
  var _sendEvent = function(event, params)
  {
    "use strict";
    if (!this.isEnabled())
      return;  
    if (!event || typeof(event) != "string" || event === "" ) {
      return;
    } 
    var obj = {"event" : event, 
               "params": params,
               "type"  : "POST",
               "cb"    : { success: rbTServerResponse.handleEvent,
                           error  : rbTServerResponse.defaultError
                         }
              };
    rbTServerChannel.makeRequest(obj);
  };

  /** 
  * Req RBT server to identify actor based on params
  * 
  * @param {object} params Option based on which actor will be identified
  * @return void
  */
  var _identify = function(params)
  {
    "use strict";
    if (!this.isEnabled())
      return;
    var obj = {"url"     : rbTServerChannel.url.identify, 
               "params"  : params,
               "identify": true,
               "type"    : "POST",
               "cb"      : { success: rbTServerResponse.setActorID,
                             error  : rbTServerResponse.defaultError
                           }
              };
    rbTServerChannel.makeRequest(obj);
  };

  /** 
  * Req RBT server to set current actor property
  * 
  * @param {object} params Option based on which actor property will be set
  * @return void
  */
  var _setUser = function(params)
  {
    "use strict";
    var diff = {};
    if (!this.isEnabled()) return;
    diff = rbTActor.propExist(params);
    if (!diff) return;  
    var obj = {"url"      : rbTServerChannel.url.setActor, 
               "params"   : diff,
               "set_actor": true,
               "type"     : "POST",
               "cb"       : { success: rbTServerResponse.setActorProperty,
                              error  : rbTServerResponse.defaultError
                            }
               };
    rbTServerChannel.makeRequest(obj);
  };

  return {
    /** 
    * Tell whether RBT app is alive
    * 
    * @return {boolean} status
    */
    isAlive : function()
    {
      _status = rbTAPP.isAlive();
      return _status;
    },

    /**
    * Enable rulebot api's
    */
    enable : function()
    { 
      _state = true;
    },

    /**
    * Disable rulebot api's
    */
    disable : function()
    {
      _state = false;
    },

    /**
    *
    */
    logger : function(cmd)
    {
      rbTDebug.setLevel(rbTDebug.INFO);
    },

    /**
    * Tell the status of rulebot.
    * @param {boolean} state.
    */
    isEnabled : function()
    {
      return _state;
    },

    /**
    * Set easy jquery callback data coming from global Callback of EasyJquery
    * @param {Object} data. EasyJQuery data
    */
    setSysVars : function(data)
    {
      rbTUtils.keepEasyJQVars(data);
    },


    /** 
    * ALIAS
    * 
    * @param {object} params Option based on which system property will be set
    * @return void
    */
    alias : function()
    {
      if (!this.isEnabled())
        return;
    },

    /**
    * Exposed api to track events
    * @param {String} ev Event to ve tracked
    * @param {Object} prop Property attached to the event.
    * @return {Boolean} status of the api call. 
    */
    track : function(ev, prop)
    {
      if (!ev || !prop) return false;

      if (ev === "set") {
        _setUser.call(this,prop);
      } else {
        _sendEvent.call(this,ev, prop)
      }

      return true;
    },

    /**
    * Exposed api to track user
    * @param {String} id The id on which user needs to be identified.
    * @return {Boolean} status of the api call.
    */
    identify : function(id)
    {
      _identify.call(this,id);
      return true;
    },

    set
  };
};


