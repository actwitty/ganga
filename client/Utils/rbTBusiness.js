/* MAIN BUSINESS SPECIFIC CALLS */
var RBT = function() {
	this._appID = trigger_fish.rbTAPP.getAppID();
	this._accountID = trigger_fish.rbTAPP.getAccountID();
	this._status = trigger_fish.rbTAPP.isrbTAlive();
};


/** 
* Tell whether RBT app is alive
* 
* @return {boolean} status
*/
RBT.prototype.isAlive = function()
{
	this._status = trigger_fish.rbTAPP.isrbTAlive();
	return this._status;
};


/** 
* Send event to RBT server 
* 
* @param {string} event
* @param {object} [params]
* @return void
*/
RBT.prototype.sendEvent = function(event, params)
{
  "use strict";
  if (!event || typeof(event) != "string" || event === "" ) {
    return;
  }
  trigger_fish.rbTServerChannel.makeRequest({"event" : event, 
                                "params": params,
                                "cb"    : { success: trigger_fish.rbTServerResponse.handleEvent,
                                            error  : trigger_fish.rbTServerResponse.defaultError
                                          }
                              });
};

/** 
* Req RBT server to identify actor based on params
* 
* @param {object} params Option based on which actor will be identified
* @return void
*/
RBT.prototype.identify = function(params)
{
  "use strict";
  trigger_fish.rbTServerChannel.makeRequest({"url"     : trigger_fish.rbTServerChannel.url.identify, 
                                "params"  : params,
                                "identify": true,
                                "cb"      : { success: trigger_fish.rbTServerResponse.setActorID,
                                             error  : trigger_fish.rbTServerResponse.defaultError
                                           }
                              });
};



/** 
* Req RBT server to set current actor property
* 
* @param {object} params Option based on which actor property will be set
* @return void
*/
RBT.prototype.setActor = function(params)
{
  "use strict";
  if (trigger_fish.rbTActor.propExist(params))
    return;
  trigger_fish.rbTServerChannel.makeRequest({"url"        : trigger_fish.rbTServerChannel.url.setActor, 
                                "params"     : params,
                                "set_actor"  : true,
                                "cb"         : { success: trigger_fish.rbTServerResponse.setActorProperty,
                                                 error  : trigger_fish.rbTServerResponse.defaultError
                                               }
                              });
};


/** 
* ALIAS
* 
* @param {object} params Option based on which system property will be set
* @return void
*/
RBT.prototype.alias = function(params)
{
    // FIXME : what to do?
};
