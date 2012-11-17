trigger_fish.rbTServerResponse = {

  /** 
  *  Handle default success callback if not mentioned explicitly
  *   
  *  @return void
  */ 
  defaultSuccessCallback : function(respData)
  {
    // FIXME : what to do?
    trigger_fish.rbTAPP.log({"message": "Success callback : default server response","data":respData});
  },
  /** 
  *  Handle default error callback if not mentioned explicitly
  *   
  *  @return void
  */ 
  defaultErrorCallback : function(respData)
  {
    // FIXME : what to do?
    trigger_fish.rbTAPP.log({"message": "Error callback : default server response","data":respData});
  },


  /**
  * Set actor identification based on server response
  * @param {object} respData Actor identification details
  * @return void
  */
  setActorID : function(respData)
  { 
    "use strict";
    trigger_fish.rbTAPP.log({"message": "Setting actor ID with server resp","data":respData});
    try {
      if (respData && respData.actor_id) {
        // FIXME :: Flush and reset all cookies if there is a change in actor.
        // WAITING AS THERE ARE SOME CHANGES IN BACKEND.
        var oldActorId = trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorID);
        if (!oldActorId || (oldActorId !== respData.actor_id)) {
          trigger_fish.rbTCookie.setCookie(trigger_fish.rbTCookie.defaultCookies.actorID, JSON.stringify(respData.actor_id));
          trigger_fish.rbTActor.setID(respData.actor_id);
          trigger_fish.rbTServerChannel.makeRequest({"url"           : trigger_fish.rbTServerChannel.url.readActor, 
                                                     "set_actor_prop": true,
                                                     "cb"            : { success: trigger_fish.rbTServerResponse.setActorProperty,
                                                                         error  : trigger_fish.rbTServerResponse.defaultError
                                                                       }
                                                    });
        }
      } else {
        throw new Error("there is no server resp data");
      }
    } catch(e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "setting actor failed",
                          "data"      : respData
                        });
    }
  },


  /**
  * Set actor identification based on server response
  * @param {object} respData Actor identification details
  * @return void
  */
  setActorProperty : function(respData)
  {
    "use strict";
    trigger_fish.rbTAPP.log({"message": "Setting actor detail property with server resp","data":respData});

    // FIXME : check for which property to set
    try {
      if (respData && respData.description) {
        trigger_fish.rbTActor.setProperties(respData.description);
      } else {
        throw new Error("there is no data for setting actor property");
      }
    } catch(e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "setting user property failed",
                          "data"      : respData
                        });
    }
  }, 

  

  /**
  * Handle event response from server
  * @param {object} respData Actor identification details
  * @return void
  */
  handleEvent : function(respData)
  {
    "use strict";
    trigger_fish.rbTAPP.log({"message": "Handling event with server resp","data":respData});
    try {
      if(respData && respData.actor) {
        trigger_fish.rbTCookie.setCookie(trigger_fish.rbTCookie.defaultCookies.actor, respData.actor);
      } else {
        throw "there is no data";
      }
    } catch(e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "handling event failed",
                          "data"      : respData
                        });
    }
  },

  /**
  * Set Rules response from server
  * @param {object} respData in the form of rules
  * @return void
  */
  setRules : function(respData)
  {
    "use strict";
    trigger_fish.rbTAPP.log({"message": "Setting rules with server resp","data":respData});

    try {
      if(respData) {
        trigger_fish.rbTRules.setRulesTable(respData);
      } else {
        throw "there is no data";
      }
    } catch(e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "setting rules failed",
                          "data"      : respData
                        });
    }
  },


  /**
  * Set App Specific configs
  * @param {object} respData Data in response to server.
  */
  setAppDetail : function(respData)
  {
    trigger_fish.rbTAPP.log({"message": "Setting app details with server resp","data":respData});
    trigger_fish.rbTAPP.setAppDetail(respData);
    var sample_rule_json = [
        {
          id: '1010101010',
          name  : "sample_name", 
          event : "sample_event",
          action: "topbar.generic.normal",
          action_param :
                  {
                    'rb.t.cr.textColor ':'#333',
                    'rb.t.nr.textFontsize':'15',
                    'rb.t.ft.textFontfamily':'Arial',
                    'rb.t.sg.textFontWeight':'bold',
                    'rb.f.nr.baseZindex':'100',
                    'rb.t.nr.baseWidth':'100',
                    'rb.t.nr.baseHeight':'40',
                    'rb.t.cr.baseBgColor':'#DCDCDC',
                    'rb.t.an.baseTextalign':'center',
                    'rb.t.sg.textLeft':'Hello Hello Hello Hello',
                    'rb.t.nr.btnFontSize':'14',
                    'rb.t.cr.btnBgColor':'#548AC7',
                    'rb.t.cr.btnColor':'white',
                    'rb.t.ul.btnLink':'http://www.google.com',
                    'rb.t.sg.btnLable':'Click',
                    'rb.t.sg.textRight':'Hello Hello',
                    'rb.t.nr.durationOfDisplay':'100'
                  },
          conditions : [
                // event based condition
                { 
                  property: "customer[email]",
                  type : "String",
                  negation: 'false',
                  operation: 'eql',
                  value1: 'gmail.com',
                  scope: "a",
                },
              ]
        },
        {
          id: '1010101010',
          name  : "sample_name", 
          event : "sample_event",
          action: "topbar.generic.normal",
          action_param :
                  [
                     {key:'rb.t.cr.textColor ',value:'#333'},
                     {key:'rb.t.nr.textFontsize',value:'15'},
                     {key:'rb.t.ft.textFontfamily',value:'Arial'},
                     {key:'rb.f.nr.baseZindex',value:'100'},
                     {key:'rb.t.nr.baseWidth',value:'100'},
                     {key:'rb.t.nr.baseHeight',value:'40'},
                     {key:'rb.t.cr.baseBgColor',value:'#DCDCDC'},
                     {key:'rb.t.an.baseTextalign',value:'center'},
                     {key:'rb.t.sg.textLeft',value:'Hello Hello Hello Hello'},
                     {key:'rb.t.nr.btnFontSize',value:'14'},
                     {key:'rb.t.cr.btnBgColor',value:'#548AC7'},
                     {key:'rb.t.cr.btnColor',value:'white'},
                     {key:'rb.t.ul.btnLink',value:'http://www.google.com'},
                     {key:'rb.t.sg.btnLable',value:'Click'},
                     {key:'rb.t.sg.textRight',value:'Hello Hello'},
                     {key:'rb.t.ul.helpLink',value:'http://www.rulebot.com'},
                  ],
          conditions : [
                // event based condition
                { 
                  property: "customer[name]",
                  type : "String",
                  negation: 'false',
                  operation: 'eql',
                  value1: 'samarth',
                  scope: "a",
                },
              ]
        },
    ];
    
    //trigger_fish.rbTRules.setRulesTable(sample_rule_json);
    trigger_fish.rbTRules.setRulesTable(respData.app.rules || {});
    trigger_fish.rbTSystemVar.init(respData);

    trigger_fish.rbTAPP.configs.status = true;
  }

};