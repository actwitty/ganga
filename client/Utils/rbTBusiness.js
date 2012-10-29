/* MAIN BUSINESS SPECIFIC CALLS */
var RBT = function() {
	this._appID = rbTAPP.getAppID();
	this._accountID = rbTAPP.getAccountID();
	this._status = rbTAPP.isrbTAlive();
};


/** 
* Tell whether RBT app is alive
* 
* @return {boolean} status
*/
RBT.prototype.isAlive = function()
{
	this._status = rbTAPP.isrbTAlive();
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
  if (!event || typeof(event) != "string" || event == "" ) {
    return;
  }
  rbTServerChannel.makeRequest({"event" : event, 
                                "params": params,
                                "cb"    : { success: rbTServerResponse.handleEvent,
                                            error  : rbTServerResponse.defaultError
                                          }
                              });
  /*rbTServerChannel.makeEventRequest(event, 
                                    params,
                                    { success: rbTServerResponse.handleEvent,
                                      error  : rbTServerResponse.defaultError
                                    });*/
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
  rbTServerChannel.makeRequest({"url"    : rbTServerChannel.url.identify, 
                                "params" : params,
                                "cb"     : { success: rbTServerResponse.setActor,
                                             error  : rbTServerResponse.defaultError
                                           }
                              });
  /*rbTServerChannel.makeGetRequest(,
                                params,
                                { success: rbTServerResponse.setActor,
                                  error  : rbTServerResponse.defaultError
                                }
                               );*/
};



/** 
* Req RBT server to set current actor property
* 
* @param {object} params Option based on which actor property will be set
* @return void
*/
RBT.prototype.setUserProperty = function(params)
{
  "use strict";
  rbTServerChannel.makeRequest({"url"   : rbTServerChannel.url.setUserProperty, 
                                "params": params,
                                "cb"    : { success: rbTServerResponse.setUserProperty,
                                            error  : rbTServerResponse.defaultError
                                          }
                              });
  /*rbTServerChannel.makeGetRequest( rbTServerChannel.url.setUserProperty,
                                   params,
                                   { success: rbTServerResponse.setUserProperty,
                                     error  : rbTServerResponse.defaultError
                                  });*/
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
