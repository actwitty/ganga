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
var RBT = function() {
	this._appID = rbTAPP.getAppID();
	this._accountID = rbTAPP.getAccountID();
	this._status = rbTAPP.isAlive();
  this._state = true;
};


RBT.prototype = {
  /** 
  * Tell whether RBT app is alive
  * 
  * @return {boolean} status
  */
  isAlive : function()
  {
    this._status = rbTAPP.isAlive();
    return this._status;
  },

  /**
  * Enable rulebot api's
  */
  enable : function()
  { 
    this._state = true;
  },

  /**
  * Disable rulebot api's
  */
  disable : function()
  {
    this._state = false;
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
    return this._state;
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
  * Send event to RBT server 
  * 
  * @param {string} event
  * @param {object} [params]
  * @return void
  */
  sendEvent : function(event, params)
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
  },

  /** 
  * Req RBT server to identify actor based on params
  * 
  * @param {object} params Option based on which actor will be identified
  * @return void
  */
  identify : function(params)
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
  },

  /** 
  * Req RBT server to set current actor property
  * 
  * @param {object} params Option based on which actor property will be set
  * @return void
  */
  setUser : function(params)
  {
    "use strict";
    var diff = {};
    if (!this.isEnabled()) return;
    diff = rbTActor.propExist(params);
    //params = (diff === undefined ) ? params : diff ;
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
  }

};
