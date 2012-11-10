


/****************************[[rbTAPP.js]]*************************************/ 


var trigger_fish = {};




trigger_fish.rbTAPP = {
    /* Main configs will be holded here */
    configs : {
      "status" : false
    },
    
    /** 
    *  Do following tasks on initialization of the app
    *  1). include jQuery if need be
    *  2). create session.
    *  3). fetch configs.
    *  4). check status of last event, if pending, execute it.
    *  5). fetch system properties if cache miss
    *  6). Allow Business to make calls
    *  
    *  @return void
    */
    initialize : function()
    {
      "use strict";
      // 1). includin jquery if need be
      //rbTUtils.includeJQIfNeeded();

      // 2). Create session Deferred till further discussion
      //rbTAPP.createSession();

      // 3). Get rulebot app details
      //rbTRules.init();
      this.getAppData();

      trigger_fish.rbTActor.retFromCookie();

      // 4). Initialize system variables  
      //rbTSystemVar.init();

      // 5). FIXME : Check status of last event, if pending, execute it.
      //rbTRules.executeLastPendingEvent();

      //rbTServerChannel.flushReqQueue();

    },

    /**
    * Check status of RBT APP
    *
    * @param {function} callback Callback function if rbTAPP is alive.
    * @param {object} args Arguments with which callback will be called.
    * @return void   
    */
    isrbTAlive :  function()
    {
       return this.configs.status;
    },  

    /**
    * Set RBT APP Status to true to signal app is alive
    */
    wake_RBT_APP : function()
    {
      trigger_fish.rbTDebug.log("Initializing RBT APP");
      trigger_fish.rbTAPP.initialize();
    },

    /** 
    *  Set App Id
    *  @param {string} id
    *  @return void
    */
    setAppID: function(id)
    {
      this.configs.appID = id;
    },

    /** 
    *  Set Account ID
    *  @param {string} id 
    *  @return void
    */
    setAccountID : function(id)
    {
      this.configs.accountID = id;
    },

    /** 
    *  Set Session ID
    *  @param {string} id 
    *  @return void
    */
    setSessionID : function(id)
    {
      this.configs.sessionID = id;
    },

    /**
    *
    *
    */   
    setTransVar : function(data)
    {
      this.configs.transVar = data;
    },

    /**
    *
    */
    setAppDetail : function(data)
    {
      this.configs.appData = data;
    },

    /** 
    *  Get App ID
    *  @return {string} id 
    */
    getAppID : function()
    {
      return this.configs.appID
    },

    /** 
    *  Get Account ID
    *  @return {string} id 
    */  
    getAccountID : function()
    {
      return this.configs.accountID;
    },   

    /** 
    *  Get Session ID
    *  @return {string} id 
    */  
    getSessionID : function()
    {
      return this.configs.sessionID;
    },

    /**
    *
    */
    getTransVar : function()
    {
      return this.configs.transVar;
    },

    /**
    *
    */
    getAppDetail : function()
    {
      return this.configs.appData;
    },

    /** 
    *  Get Application configs
    *  @return {rbTAPP.configs} 
    */ 
    getConfigs : function()
    {
      "use strict";
      var cnf = {"app_id"  : this.configs.appID,
                 "account_id" : this.configs.accountID  
                }; 
      
       var actor_id = trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorID);
       if (actor_id)  {
        cnf["actor_id"] = actor_id;
       }
      return cnf;
    },  



    /** 
    *  Create Session for current app/account id
    *  FIXME : THIS NEEDS TO BE DISCUSSED AS WE ARE PLANNING TO HAVE A PROXY IN BETWEEN
    *  @return {string} sessionID 
    */ 
    createSession : function()
    {
      trigger_fish.rbTServerChannel.createSession({success:this.setSessionID});
    },

    /** 
    *  Get Application based configs
    *  FIXME : THIS NEEDS TO BE DISCUSSED AS WE ARE PLANNING TO HAVE A PROXY IN BETWEEN
    *  @return {string} TBD 
    */
    getAppData : function()
    {
      trigger_fish.rbTServerChannel.makeServerRequest({"url"   : trigger_fish.rbTServerChannel.url.appDetails,
                                          "cb"    : { success: trigger_fish.rbTServerResponse.setAppDetail,
                                                      error  : trigger_fish.rbTServerResponse.defaultError
                                                    }
                                         });
    },  

    /** 
    * Set System properties
    * 
    * @param {object} params Option based on which system property will be set
    * @return void
    */
    setSystemProperty : function(params)
    {
      "use strict";
      if (params) {
          trigger_fish.rbTServerChannel.makeRequest({"url"   : trigger_fish.rbTServerChannel.url.setSystemProperty,
                                        "params": params,
                                        "cb"    : { success: trigger_fish.rbTServerResponse.setSystemProperty,
                                                    error  : trigger_fish.rbTServerResponse.defaultError
                                                  }
                                      });
      } else {
          trigger_fish.rbTAPP.reportError({"message"   : "System params could not be found, report error",
                              "data"      : params
                             });
      }

    },

    /** 
    * Set System properties
    *  
    * @return {object} system properties in the form of json
    */
    getSystemProperty : function()
    {
      return JSON.parse(trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookie.system));
    },


    /** 
    *  report error to rbT server
    *  @param {object} params Error log message 
    *  @return void
    */ 
    reportError : function(params)
    {
      try {
          trigger_fish.rbTDebug.error(params);
          if (params.server) 
            trigger_fish.rbTServerChannel.reportError(params);
      } catch(e) {
        // FIXME what to do?
      }
    },
    
    /** 
    *  log
    *  @param {object} params Error log message 
    *  @return void
    */
    log : function(params)
    {
      if(params && params.message)
        trigger_fish.rbTDebug.log(params.message);
      trigger_fish.rbTDebug.log(params)
    },

};



/****************************[[rbTActor.js]]*************************************/ 


trigger_fish.rbTActor = function() {

  var __id = "";
  var __prop = {};

  return {

      /**
      * Fetch data from cookie for an actor.
      * @return void
      */
      retFromCookie : function()
      {
      	trigger_fish.rbTDebug.log("retrieveing data for actor from cookie");
        if (trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorProp))
          this.setProperties(trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorProp)); 
        if (trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorID))
          this.setID(trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorID));
      },

      /** 
      *  Get Actor ID
      *  @return {string} id 
      */  
      getID : function()
      {
        return __id;
      },
      
      /**
      * Get actor properties.
      * @return {object} Actor properties object. => see actor_controller/read
      */
      getProperties : function()
      {
        return __prop;
      },

      /** 
      *  Set Actor ID
      *  @param {string} id 
      *  @return void
      */
      setID : function(id)
      {
        trigger_fish.rbTCookie.setCookie(trigger_fish.rbTCookie.defaultCookies.actorID, id);
        __id = id;
      },

      /**
      * Set actor properties as well as set it in cookie.
      * @param {object} prop Actor properties.
      */
      setProperties : function(prop)
      {
        __prop = prop;
        trigger_fish.rbTCookie.setCookie(trigger_fish.rbTCookie.defaultCookies.actorProp, JSON.stringify(prop));
      },

      /**
      * Check if property, desired to be set for an actor, already exist.
      * @return {boolean}
      */
      propExist : function(prop)
      {
        var a = JSON.stringify(__prop).replace(/(^{)|(}$)/g, "");
        var b = JSON.stringify(prop).replace(/(^{)|(}$)/g, "");
        trigger_fish.rbTDebug.log({"stored" : a , "passed" : b, "message":"actor prop existence"});
        return (a.indexOf(b) >= 0) ? true : false;
      }

  };

}();



/****************************[[rbTClientDebugger.js]]*************************************/ 


/*
 * JavaScript Debug - v0.4 - 6/22/2010
 * http://benalman.com/projects/javascript-debug-console-log/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 * 
 * With lots of help from Paul Irish!
 * http://paulirish.com/
 */
trigger_fish.rbTDebug=(function(){var i=this,b=Array.prototype.slice,d=i.console,h={},f,g,m=9,c=["error","warn","info","debug","log"],l="assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "),j=l.length,a=[];while(--j>=0){(function(n){h[n]=function(){m!==0&&d&&d[n]&&d[n].apply(d,arguments)}})(l[j])}j=c.length;while(--j>=0){(function(n,o){h[o]=function(){var q=b.call(arguments),p=[o].concat(q);a.push(p);e(p);if(!d||!k(n)){return}d.firebug?d[o].apply(i,q):d[o]?d[o](q):d.log(q)}})(j,c[j])}function e(n){if(f&&(g||!d||!d.log)){f.apply(i,n)}}h.setLevel=function(n){m=typeof n==="number"?n:9};function k(n){return m>0?m>n:c.length+m<=n}h.setCallback=function(){var o=b.call(arguments),n=a.length,p=n;f=o.shift()||null;g=typeof o[0]==="boolean"?o.shift():false;p-=typeof o[0]==="number"?o.shift():n;while(p<n){e(a[p++])}};return h})();


/****************************[[rbTRules.js]]*************************************/ 


var TEST_RBT_RULE_JSON = {
                            "customer":{
                                        "name" :["samarth"],
                                        "email":["gmail.com"],
                                        "val1":[123],
                                        "val2":[321],
                                        "swh":["actwitty"],
                                        "ewh":["actwitty"],
                                        "cns":["actwitty"],
                                        "drg":["3/3/2011"],
                                        "dag":["11/7/2012"],
                                        "rgx":["deosamarth"],
                                        "set":["abc"],
                                       }
                         };

trigger_fish.rbTRules = {

  ruleTable : {},

  operations : { 
                  'gtn': 'greater than',
                  'ltn': 'lesser than',
                  'eql': 'equal to',
                  'swh': 'starts with',
                  'ewh': 'ends with',
                  'cns': 'contains',
                  'btn': 'between',
                  'rgx': 'regex',
                  'dag': 'days ago',
                  'drg': 'date range',
                  'set': 'set'
  },
  "permissions" : {
          'String': [ 'eql', 'swh','ewh','cns','rgx','set' ],
          'Date': [ 'gtn','ltn','eql','dag','drg','set' ],  
          'Number': [ 'gtn','ltn','eql','btn','set'] 
  },

  /**
  * Set rules table for business
  * @return void
  */
  setRulesTable : function(rules)
  {
    "use strict";
    //rules = this.sample_json;
    var ruleString = "";


    function ruleConnect(rule)
    {
      if (rule.connect) {
        if (rule.connect === "and")
          return "&& ";
        else if (rule.connect === "or")
          return " || ";
        else 
          return " ";
      } else 
        return " ";
    }
    function ruleParams(rule)
    {
      /*if (rule.value2)
        var params = "('"+rule.type+"','"+rule.negation+"','"+rule.property+"','"+rule.value1+"','"+ rule.value2+"')";
      else
        var params = "('"+rule.type+"','"+rule.negation+"' ,'"+rule.property+"','"+rule.value1+"')";  
      */

      var params = "('"+JSON.stringify(rule)+"')";

      return params;
    }

    try {
        jQuery.each(rules, function(index, ruleList) {
          ruleString = " ";
          for (var rule in ruleList.conditions) {
            /*ruleString = ruleString + "trigger_fish.rbTRules.rule." + ruleList.conditions[rule].operation + 
                    ruleParams(ruleList.conditions[rule]) + ruleConnect(ruleList.conditions[rule]);*/
            ruleString = ruleString + "trigger_fish.rbTRules.evalRule" + 
                         ruleParams(ruleList.conditions[rule]) + 
                         ruleConnect(ruleList.conditions[rule]);
          }

          trigger_fish.rbTRules.ruleTable[ruleList.event] = { "name"         : ruleList.name,
                                                              "ruleString"   : ruleString,
                                                              "action"       : ruleList.action,
                                                              "action_param" : ruleList.action_param
                                                            };
        });
    } catch (e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "rule table setting failed",
                          "rules"     : rules
                        });
    }

  },

  /**
  * Execute rules table for particular events
  * @param {string} event The event for which we need to check rules.
  * @return void
  */
  executeRulesOnEvent : function(event)
  {
    //"use strict";

    function prepareFunctionCode(ruleString) 
    {
      $("#rulestring").text(ruleString);
      return 'if (' + ruleString + ') { return true; } else { return false;}';
    }
    
    // Client will not execute any rules if there is no schema set. 
    var appData = trigger_fish.rbTAPP.getAppDetail();
    if (!appData.schema) {
      trigger_fish.rbTDebug.log({"message":"There is no schema set for app, cannot execute rules"});
      //return;
    }
    try {
          var functionCode = prepareFunctionCode(this.ruleTable[event].ruleString);
          var isRuleValid = new Function(functionCode)();
          if (isRuleValid) {
            $("#result").text("RULES PASSED");
            this.invokeAction(event);
          } else {
            $("#result").text("RULES FAILED");
          }
    } catch (e) {
      if (this.ruleTable[event])
        var ruleStr = this.ruleTable[event].ruleString || "--";
      else
        var ruleStr = "Rule string cannot be formed!";  
        trigger_fish.rbTAPP.reportError({"exception"  : e.message,
                          "message"    : "rule execution on event failed" , 
                          "event_name" : event,
                          "rule_string": ruleStr
                         });
    } 
  },
  

  /**
  *   Execute rules table for particular events
  *   @param {string} property The property for which we need to operate upon
  *   @param {string} value The value for which we need to operate upon
  *   @return {object} value Converted value based on property data type
  */
  valueDataType : function(property, value)
  {
    "use strict";
    // We are expecting only 3 types i.e string or number or date
    // ******FIXME : WE NEED TO GET THE DATA TYPES FROM APP SCHEMA********
    if (!value || !property)
      return "undefined";
    var dt = this.getDataType(property);
    try {
        if (dt === "String") {
          return value.toString();
        } else if(dt === "Number") {
          return parseFloat(value);
        } else if(dt === "Date") {
          return new Date(value);
        }
    } catch (e) {
        // FIXME :: something wrong with type conversion
        trigger_fish.rbTAPP.reportError({"exception" : e.message,
                            "message":"data type conversion on rule value failed" , 
                            "property" : property,
                            "value" : value
                           });
    }
  },

  /**
  * FIXME : check if this needs to be invoked in getRulesTable's server response
  * Evaluate property value to a suitable sys or user property
  * 
  * @return {string} status Status of the event execution (no-pending, executed, error)
  */
  executeLastPendingEvent : function()
  {
    "use strict";
    try {
      var lastEvent = trigger_fish.rbTCookie.getCookie("lastevent");
      if (lastEvent) {
        this.executeRulesOnEvent(lastEvent);
      } else {
        throw "no last event found"
      }
    } catch(e) {
      trigger_fish.rbTDebug.log("no last event found");
    }
  },

  /**
  * FIXME : enable this with new json format (based on scope property)
  * Evaluate property value to a suitable sys or user property
  * @param {string} ruleProperty For which we need to evaluate data type
  * @param {string} type Datatype of the property
  * @param {string} scope Scope of the property, to which we need to look for.
  * @return {object} or {boolean}
  */
  evalProperty : function(ruleProperty, type, scope)
  {
    if (!ruleProperty)
      return "";

    // FIXME : Currently we do not know the structure of response we will get.
    // Based on that we need to process further.
 
    var p = ruleProperty.replace(/]/g,"").replace(/\[/g,".");
    var value = null;

    var validProp = 1;
    try {
      if (scope === "a") {
        value = eval("TEST_RBT_RULE_JSON."+p+".slice(-1)[0]");
      } else if (scope === "s") {
        var systemVars = trigger_fish.rbTSystemVar.getProperty();
        value = eval("systemVars."+p);
      } else if (scope === "e") {
        var transVar = trigger_fish.rbTAPP.getTransVar(); 
        value = eval("transVar."+p); 
      }
    } catch (e) {
      validProp = 0;
    } 

    if (!validProp) {
      trigger_fish.rbTAPP.log({"message":"Not a valid property to evaluate rule on"});
      return false;
    }

    if (!type)
        return value;
    if (type === "String")
        return value.toString(); 
    else if (type === "Date")
        return new Date(value);
    else if (type === "Number")
        return parseFloat(value);
  },


  /**
  * Invoke the action on rule.
  * @param {string} event The event for which we need to invoke action
  * @return void
  */
  invokeAction : function(event)
  {
    try {
      // Hand over action to templating engine for processing event action.
      //rbTTemplates.invoke(this.ruleTable[event].action, this.ruleTable[event].action_param);
      rbT.invokeActionScript(this.ruleTable[event].action, this.ruleTable[event].action_param);
    } catch(e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message": "action could not be invoked" , 
                          "event" : event
                         });
    }
  },

  /**
  * Check the data type of object
  * @param {string} negation status
  * @return boolean !negate status
  */  
  getDataType : function(a)
  {
    return Object.prototype.toString.call(a).split("]")[0].split(" ")[1];
  },

  /**
  * Check the negate status
  * @param {string} negation status
  * @return boolean !negate status
  */
  isNegate :  function(x)
  {
    return (x === "true") ? true : false; 
  },

  /**
  * Check the validity of the rule based on permitted operations on data type
  * @param {string} dt DataType of rule applying.
  * @param {string} s Scope of rule applying.
  * @param {string} t Type of rule applying.
  * @param {string} a Rule property
  * @param {string} b Rule value 1
  * @param {string} [c] Rule value 2
  * @return boolean validity
  */
  isValidRule : function(dt,s,t,a,b,c)
  {
    if (!a)
      return false;
    if (t==="set") return true;
    var propVal = this.evalProperty(a,dt,s);
    if (!propVal)
      return false;
    var propDT = this.getDataType(propVal);
    if (dt === "Date")
      propDT = dt;
    else if (propDT !== dt)
      return false;

    var v1DT = this.getDataType(b);
    if (c)
      var v2DT = this.getDataType(c);

    var v2DT = v2DT || v1DT;

    if (!this.permissions[propDT] || this.permissions[propDT].indexOf(t) < 0)
      return false;
    
    if (propDT === "String" && (v1DT!=propDT || v2DT!=propDT)) {
      return false;
    } else if (propDT === "Number" && (parseFloat(b) === "NaN" || (c && parseFloat(c) === "NaN"))) {
      return false;
    } else if (propDT === "Date") {
      var v1Date = new Date(b);
      if (c)
        var v2Date = new Date(c);
      v2Date = v2Date || v1Date;
      if (v1Date.toString() === "Invalid Date" || v2Date.toString() === "Invalid Date")
        return false;
    }
    
    return true; 
  },
 
  /**
  * Function to evaluate rule.
  * @param {object} rule The rule json which needs to be executed.
  *
  * @return {boolean} result That outcome of rule evaluation.
  */
  evalRule : function(rule)
  {
    var ruleJson = JSON.parse(rule);
    try {
      var v1   = ruleJson.value1,
          v2   = ruleJson.value2,
          neg  = ruleJson.negation,
          op   = ruleJson.operation,
          type = ruleJson.type,
          prop = ruleJson.property,
          scope= ruleJson.scope;
      if (!trigger_fish.rbTRules.isValidRule(type,scope,op,prop,v1))
          return false;
      var res = false;
      var p = trigger_fish.rbTRules.evalProperty(prop,type,scope);
          a = trigger_fish.rbTRules.valueDataType(prop, v1),
          b = trigger_fish.rbTRules.valueDataType(prop, v2);
      switch(op) {
      case "ltn":
          res = this.rule.ltn(p,a);
          break;
      case "gtn":
          res = this.rule.gtn(p,a);
          break;
      case "eql":
          res = this.rule.eql(p,a);
          break;
      case "cns":
          res = this.rule.cns(p,a);
          break;
      case "swh":
          res = this.rule.swh(p,a);
          break;
      case "ewh":
          res = this.rule.ewh(p,a);
          break;
      case "btn":
          res = this.rule.btn(p,a,b);
          break;
      case "rgx":
          res = this.rule.rgx(p,a);
          break;
      case "drg":
          res = this.rule.drg(p,a,b);
          break;
      case "dag":
          res = this.rule.dag(p,a);
          break;
      case "set":
          res = this.rule.set(p,a);
          break;
      }
      return (neg === "true") ? !res : res;
    } catch (e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                                       "message"   :"rule evaluation on"+ ruleJson.op +" failed" , 
                                       "rule"      : ruleJson,
                                      });
    }
  },

  /* RULE FUNCTIONS */
  rule : 
  {
    /**
    * Rule to check for less than
    * @param {object} p Rule property
    * @param {object} v Rule value
    * @return {boolean} Validity based on rule
    */ 
    ltn : function(p,v)
    {
      $("#applyingrules").append("<h3>less than</h3>");
      return (p < v);
    },
        
    /**
    * Rule to check for greater than
    * @param {object} p Rule property
    * @param {object} v Rule value
    * @return {boolean} Validity based on rule    */ 
    gtn : function(p,v)
    {
      "use strict";
      $("#applyingrules").append("<h3>greater than</h3>");
      return (p > v);
    },

    /**
    * Rule to check for equal to
    * @param {object} p Rule property
    * @param {object} v Rule value
    * @return {boolean} Validity based on rule
    */ 
    eql : function(p,v)
    {
      "use strict";
      $("#applyingrules").append("<h3>equal to</h3>");
      return (p === v);
    },

    /**
    * Rule to check for contains
    * @param {object} p Rule property
    * @param {object} v Rule value
    * @return {boolean} Validity based on rule
    */ 
    cns: function(p,v)
    {
      "use strict";
      $("#applyingrules").append("<h3>contains</h3>");
      return ((p.indexOf(v) >= 0)?true:false);
    },

    /**
    * Rule to check for starts with condition
    * @param {object} p Rule property
    * @param {object} v Rule value
    * @return {boolean} Validity based on rule
    */ 
    swh : function(p,v)
    {
      "use strict";
      $("#applyingrules").append("<h3>starts with</h3>");
      return ((p.match("^"+v))?true:false);  
    },

    /**
    * Rule to check for ends with condition
    * @param {object} p Rule property
    * @param {object} v Rule value
    * @return {boolean} Validity based on rule
    */ 
    ewh : function(p,v)
    {
      "use strict";
      $("#applyingrules").append("<h3>ends with</h3>");
      return (p.match(v+"$")?true:false);
    },

    /**
    * Rule to check for in between range
    * @param {object} p Rule property
    * @param {object} v1 Rule value1
    * @param {object} v2 Rule value2
    * @return {boolean} Validity based on rule
    */ 
    btn : function(p,v1,v2)
    {
      "use strict";
      $("#applyingrules").append("<h3>between</h3>");
      return ((p>=v1)&&(p<=v2))?true:false;
    },

    /**
    * Rule to check for regex condition
    * @param {object} p Rule property
    * @param {object} v Rule value
    * @return {boolean} Validity based on rule
    */ 
    rgx : function(p,v)
    {
      "use strict";
      $("#applyingrules").append("<h3>regex</h3>");
      var regexp = new RegExp(v,'gi'); 
      var res = regexp.test(p);
      return res;
    },

    /**
    * Rule to check for days ago condition
    * @param {object} p Rule property
    * @param {object} v Rule value
    * @return {boolean} Validity based on rule
    */
    dag : function(p,v)
    {
      "use strict";
      $("#applyingrules").append("<h3>days ago</h3>");
      var oneDay = 24*60*60*1000,fD = new Date(p),sD = new Date();
      var diffDays = Math.round( Math.abs((fD.getTime() - sD.getTime())/(oneDay)) );
      return (diffDays === trigger_fish.rbTRules.valueDataType(diffDays, v))?true:false;
    },

    /**
    * Rule to check for date range condition
    * @param {object} p Rule property
    * @param {object} v Rule value
    * @return {boolean} Validity based on rule
    */
    drg : function(p,v1,v2)
    {
      "use strict";
      $("#applyingrules").append("<h3>days between</h3>");
      return ( (p>=trigger_fish.rbTRules.valueDataType(p,v1)) && 
               (p<=trigger_fish.rbTRules.valueDataType(p,v2)) )
                ? true : false;  
    },

    /**
    * Rule to check for set to condition
    * @param {object} p Rule property
    * @return {boolean} Validity based on rule
    */
    set : function(p)
    {
      "use strict";
      $("#applyingrules").append("<h3>set prop</h3>");
      return (p?true:false);
    }

  }
};


/****************************[[rbTServerResponse.js]]*************************************/ 


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
        if (!oldActorId || oldActorId !== respData.actor_id) {
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
  * Set actor identification based on server response
  * @param {object} respData Actor identification details
  * @return void
  */
  setSystemProperty : function(respData)
  {
    "use strict";
    trigger_fish.rbTAPP.log({"message": "Setting system property with server resp","data":respData});

    // FIXME : check for which property to set
    try {
      if (respData) {
        trigger_fish.rbTCookie.setCookie(trigger_fish.rbTCookie.defaultCookies.system, JSON.stringify(respData));
      } else {
        throw "there is no data";
      }
    } catch(e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "setting system property failed",
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
                  property: "customer[email]",
                  type : "String",
                  negation: 'false',
                  operation: 'eql',
                  value1: 'gmail.com',
                  scope: "a",
                  connect: 'and' 
                },
                
                // negate condition
                { 
                  property: "customer[name]",
                  type : "String",
                  negation: 'true',
                  operation: 'swh',
                  value1: 'a',
                  scope: "a",
                  connect: 'and' 
                },
                // actor_property based condition
                {
                  property: "customer[val1]",
                  type : "Number",
                  negation: 'false',
                  operation: 'gtn',
                  value1: 2,
                  scope: "a",
                  connect: 'and' 
                },
                // system_property based condition
                {
                  property: "customer[val2]",
                  type : "Number",
                  negation: 'false',
                  operation: 'ltn',
                  value1: 3000,
                  scope: "a",
                  connect: 'and' 
                },
                // starts with
                {
                  property: "customer[swh]",
                  type : "String",
                  negation: 'false',
                  operation: 'swh',
                  value1: 'act',
                  scope: "a",
                  connect: 'and' 
                },
                // ends with
                {
                  property: "customer[ewh]",
                  type : "String",
                  negation: 'false',
                  operation: 'ewh',
                  value1: 'tty',
                  scope: "a",
                  connect: 'and' 
                },
                // contains
                {
                  property: "customer[cns]",
                  type : "String",
                  negation: 'false',
                  operation: 'cns',
                  value1: 'wit',
                  scope: "a",
                  connect: 'and' 
                },
                // date range
                {
                  property: "customer[drg]",
                  type : "Date",
                  negation: 'false',
                  operation: 'drg',
                  value1: "2/2/2011",
                  value2: "4/4/2011",
                  scope: "a",
                  connect: 'and'
                },
                // days ago
                {
                  property: "customer[dag]",
                  type : "Date",
                  negation: 'false',
                  operation: 'dag',
                  value1: "4",
                  scope: "a",
                  connect: 'and'
                },
                // regex
                {
                  property: "customer[rgx]",
                  type : "String",
                  negation: 'false',
                  operation: 'rgx',
                  value1: 'sam',
                  scope: "a",
                  connect: 'and' 
                },
                // set
                {
                  property: "customer[set]",
                  type : "String",
                  negation: 'false',
                  scope: "a",
                  operation: 'set',
                  connect: 'and'
                },

                // cns in systems
                {
                  property: "country",            
                  type: "String",                         
                  negation: "false",
                  operation: "cns",
                  value1: 'IN',
                  scope: "s",
                  connect: 'and'
                },

                // eql in systems
                {
                  property: "device[name]",             
                  type: "String",                        
                  negation: "false",
                  operation: "eql",
                  value1: 'Chrome',
                  scope: "s",
                  connect: 'and'
                },
                // eql in event transient var
                {
                  property: "name",             
                  type: "String",                        
                  negation: "false",
                  operation: "eql",
                  value1: 'samarth',
                  scope: "e",
                },
                
              ]
        },
    ];
    
    trigger_fish.rbTRules.setRulesTable(sample_rule_json);
    trigger_fish.rbTSystemVar.init(respData);

    trigger_fish.rbTAPP.configs.status = true;
  }

};


/****************************[[rbTServerReq.js]]*************************************/ 


trigger_fish.rbTServerChannel = {
  
  rbt_url : "http://localhost:3000/",

  
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
    "success_callback" : trigger_fish.rbTServerResponse.defaultSuccessCallback,
    "error_callback"   : trigger_fish.rbTServerResponse.defaultErrorCallback
  },

  /**
  *
  */
  serverUrl : function(url)
  {
    return this.rbt_url + url + ".jsonp";
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
    requestData["app_id"] = trigger_fish.rbTAPP.getAppID(); // mandatory
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
  * Make XMLHttpRequest to Server
  * @param {object} obj Data format which needs to be send.
  * @return void
  */
  makeServerRequest : function(obj)
  {
    "use strict";
    var that = obj;
    try {

      var reqServerData = this.extendReqData(obj,this.makeRequestData(obj.event?obj.event:undefined,obj.params));
      var callback = this.extendCallbacks(obj.cb);
      if (obj.async && obj.async === "noasync")
        var asyncSt = false;
      else 
        var asyncSt = true;
      var that = obj;
      var url = (obj.event) ? trigger_fish.rbTServerChannel.url.fireEvent : obj.url;
      jQuery.ajax({
            url: this.serverUrl(url),
            type: 'GET',
            async: asyncSt,
            dataType: 'jsonp',
            contentType : 'application/javascript',
            data: reqServerData,
            crossDomain:true,
            timeout : 10000,
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
    this.makeRequest({"url":this.url.reportError,"params":params,"cb":callback});
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


/****************************[[rbTSystemVar.js]]*************************************/ 


/* Rule Bot scope to handle systems variables */
trigger_fish.rbTSystemVar = {

  // All properties will be set here
  properties : {},

  /** Initialize system variable script
   *  @return void
   */
  init : function(respData)
  {
    "use strict";
    function isSystemVarDirty()
    {
      var sysVarInCookie = trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.systemProp);
      
      if (!sysVarInCookie) {
        return true; 
      } else {
        var currentSysVar = this.getProperty();
        return (sysVarInCookie === currentSysVar) ? false : true;
      }
    }

    // session.js specific calls
    if (typeof(window.exports) === 'undefined'){
      session_fetch(window, document, navigator);
    } else {
      window.exports.session = session_fetch;
    }

    if (isSystemVarDirty.call(this)) {
      // Put current sys var in cookie and send it to server 
      // for update only if we have cookie miss 
      var systemVars = this.getProperty();
      this.setPropertyInCookie(systemVars);
      var schema = respData.app.schema;
      this.notifyServerOfChange(schema?schema.system:undefined);
      //rbTAPP.setSystemProperty(systemVars);
    }
  },

  /**
  *
  *
  */
  notifyServerOfChange : function(systemVarsDesired)
  {
    trigger_fish.rbTAPP.log({"message":"System variables desired from dashboard","variables":systemVarsDesired});
  },

  /** Set system variable property
   *  @param {string} type
   *  @param {object} value
   *  @return void
   */
  setProperty : function(type, value)
  {
    this.properties[type] = value;
  },


  /** Get system variable property
    'browser' : 'String'
    'browser_version' : 'String'
    'operatingsystem' : 'String'
    'referrer[host]' : 'String'
    'referrer[path]' : 'String'
    'referrer[name]' : 'String'
    'device[type]' : 'String'
    'device[name]' : 'String'
    'screen[height]' : 'Number'
    'screen[width]' :  'Number'
    'viewport[height]' : 'Number'
    'viewport[width]' : 'Number'
    'country' : 'String'
    'language' : 'String'
    'plugins' : 'Array'
    'timezone' : 'String'
    'day_light_saving' : 'Boolean'
  */
  getProperty : function(propertyTypes)
  {
    return this.properties;
  },

  setPropertyInCookie : function(property)
  {
    trigger_fish.rbTCookie.setCookie(trigger_fish.rbTCookie.defaultCookies.systemProp, JSON.stringify(property));
  },

  setEJProp : function(json)
  {
     this.setProperty("country",json.Country); 
     this.setProperty("timezone",json.LocalTimeZone); 
  },

  setSessionJSProp : function(json)
  {
    trigger_fish.rbTAPP.log({"message":"System Properties got through Session JS","data":json});
    this.setProperty("browser",json.browser.browser);
    this.setProperty("browser_version",json.browser.version);
    this.setProperty("operatingsystem",json.browser.os);
    this.setProperty("referrer",json.current_session.referrer_info);
    this.setProperty("device",json.device.type);
    this.setProperty("screen",json.device.screen);
    this.setProperty("viewport",json.device.viewport);
    this.setProperty("plugins",json.plugins);
    this.setProperty("language",json.locale.lang);
    this.setProperty("day_light_saving",json.time.observes_dst);
  },

};

var backcode="1102012";
function EasyjQuery_Cache_IP(fname,json) {
  trigger_fish.rbTAPP.log({"message":"easy jquery response","data":json});
  eval(fname + "(json);");
}
function EasyjQuery_Get_IP(fname,is_full) {
  var full_version = "";
  jQuery.getScript("http://api.easyjquery.com/ips/?callback=" + fname + full_version);
}
  


/**
 * session.js 0.4.1
 * (c) 2012 Iain, CodeJoust
 * session.js is freely distributable under the MIT license.
 * Portions of session.js are inspired or borrowed from Underscore.js, and quirksmode.org demo javascript.
 * This version uses google's jsapi library for location services.
 * For details, see: https://github.com/codejoust/session.js
 */

// FIXME : NOT ALL PROPERTIES FROM SESSION.JS IS NEEDED NOW..GETTING SOMETHINGS FROM EASYJQUERY

var session_fetch = (function(win, doc, nav)
{
  // Changing the API Version invalidates olde cookies with previous api version tags.
  var API_VERSION = 0.4;
  // Settings: defaults
  var options = {
    // Use the HTML5 Geolocation API
    // this ONLY returns lat & long, no city/address
    use_html5_location: false,
    // Attempts to use IPInfoDB if provided a valid key
    // Get a key at http://ipinfodb.com/register.php
    ipinfodb_key: false,
    // Leaving true allows for fallback for both
    // the HTML5 location and the IPInfoDB
    gapi_location: true,
    // Name of the location cookie (set blank to disable cookie)
    //   - WARNING: different providers use the same cookie
    //   - if switching providers, remember to use another cookie or provide checks for old cookies
    location_cookie: "location",
    // Location cookie expiration in hours
    location_cookie_timeout: 5,
    // Session expiration in days
    session_timeout: 32,
    // Session cookie name (set blank to disable cookie)
    session_cookie: "first_session"
  };

  // Session object
  var SessionRunner = function(){
    win.session = win.session || {};
    // Helper for querying.
    // Usage: session.current_session.referrer_info.hostname.contains(['github.com','news.ycombinator.com'])
    win.session.contains = function(other_str){
      if (typeof(other_str) === 'string'){
        return (this.indexOf(other_str) !== -1); }
      for (var i = 0; i < other_str.length; i++){
        if (this.indexOf(other_str[i]) !== -1){ return true; } }
      return false; }
    // Merge options
    if (win.session && win.session.options) {
      for (option in win.session.options){
        options[option] = win.session.options[option]; }
    }
    // Modules to run
    // If the module has arguments,
    //   it _needs_ to return a callback function.
    var unloaded_modules = {
      locale: modules.locale(),
      current_session: modules.session(),
      original_session: modules.session(
        options.session_cookie,
        options.session_timeout * 24 * 60 * 60 * 1000),
      browser: modules.browser(),
      plugins: modules.plugins(),
      time: modules.time(),
      device: modules.device(),
    };
    // Location switch
    // FIXME :: NOW NOT GETTING LOCATION INFO FROM SESSION JS, INSTEAD GETTING FROM EASYJQUERY
    /*
    if (options.use_html5_location){
      unloaded_modules.location = modules.html5_location();
    } else if (options.ipinfodb_key){
      unloaded_modules.location = modules.ipinfodb_location(options.ipinfodb_key);
    } else if (options.gapi_location){
      unloaded_modules.location = modules.gapi_location();
    }
    */
    // Cache win.session.start
    if (win.session && win.session.start){
      var start = win.session.start;
    }
    // Set up checking, if all modules are ready
    var asynchs = 0, module, result,
    check_asynch = function(deinc){
      if (deinc){ asynchs--; }
      if (asynchs === 0){
        // Run start calback
        if (start){ start(win.session); }
      }
    };
    win.session = {};
    // Run asynchronous methods
    for (var name in unloaded_modules){
      module = unloaded_modules[name];
      if (typeof module === "function"){
        try {
          module(function(data){
            win.session[name] = data;
            check_asynch(true);
          });
          asynchs++;
        } catch(err){
          if (win.console && typeof(console.log) === "function"){
            console.log(err); check_asynch(true); }
        }
      } else {
        win.session[name] = module;
      } }
    check_asynch();


    /* set the properties in our rbT hash */
    (function setrbTProperties() {
      var sessionJSProp = {};
      for (property in unloaded_modules) {
        //rbTSystemVar.setProperty(property, unloaded_modules[property] );
        sessionJSProp[property] = unloaded_modules[property];
      }
      trigger_fish.rbTSystemVar.setSessionJSProp(sessionJSProp);
    })();
    EasyjQuery_Get_IP("trigger_fish.rbTSystemVar.setEJProp");
  };






  // Browser (and OS) detection
  var browser = {
    detect: function(){
      return {
        browser: this.search(this.data.browser),
        version: this.search(nav.userAgent) || this.search(nav.appVersion),
        os: this.search(this.data.os)
    } },
    search: function(data) {
      if (typeof data === "object"){
        // search for string match
        for(var i = 0; i < data.length; i++) {
          var dataString = data[i].string,
              dataProp   = data[i].prop;
          this.version_string =
           data[i].versionSearch || data[i].identity;
          if (dataString){
            if (dataString.indexOf(data[i].subString) != -1){
              return data[i].identity;
            }
          } else if (dataProp){
            return data[i].identity;
          }
        }
      } else {
        // search for version number
        var index = data.indexOf(this.version_string);
        if (index == -1) return;
        return parseFloat(data.substr(index + this.version_string.length + 1));
      }
    },
    data: {
      browser: [
        { string: nav.userAgent, subString: "Chrome", identity: "Chrome" },
        { string: nav.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb" },
        { string: nav.vendor, subString: "Apple", identity: "Safari", versionSearch: "Version" },
        { prop:   win.opera, identity: "Opera", versionSearch: "Version" },
        { string: nav.vendor, subString: "iCab",identity: "iCab" },
        { string: nav.vendor, subString: "KDE", identity: "Konqueror" },
        { string: nav.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: nav.vendor, subString: "Camino", identity: "Camino" },
        { string: nav.userAgent, subString: "Netscape", identity: "Netscape" },
        { string: nav.userAgent, subString: "MSIE", identity: "Explorer", versionSearch: "MSIE" },
        { string: nav.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv" },
        { string: nav.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla" }
      ],
      os: [
        { string: nav.platform, subString: "Win", identity: "Windows" },
        { string: nav.platform, subString: "Mac", identity: "Mac" },
        { string: nav.userAgent, subString: "iPhone", identity: "iPhone/iPod" },
        { string: nav.userAgent, subString: "iPad", identity: "iPad" },
        { string: nav.userAgent, subString: "Android", identity: "Android" },
        { string: nav.platform, subString: "Linux", identity: "Linux" }
      ]}
  };

  var modules = {
    browser: function(){
      return browser.detect();
    },
    time: function(){
      // split date and grab timezone estimation.
      // timezone estimation: http://www.onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/
      var d1 = new Date(), d2 = new Date();
      d1.setMonth(0); d1.setDate(1); d2.setMonth(6); d2.setDate(1);
      return({tz_offset: -(new Date().getTimezoneOffset()) / 60, observes_dst: (d1.getTimezoneOffset() !== d2.getTimezoneOffset()) });
      // Gives a browser estimation, not guaranteed to be correct.
    },
    locale: function() {
      var lang = ((
        nav.language        ||
        nav.browserLanguage ||
        nav.systemLanguage  ||
        nav.userLanguage
      ) || '').split("-");
      if (lang.length == 2){
        return { country: lang[1].toLowerCase(), lang: lang[0].toLowerCase() };
      } else if (lang) {
        return {lang: lang[0].toLowerCase(), country: null };
      } else { return{lang: null, country: null }; }
    },
    device: function() {
      var device = {
        screen: {
          width:  win.screen.width,
          height: win.screen.height
        }
      };
      device.viewport = {
        width: win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth,
        height: win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight 
      };
      device.is_tablet = !!nav.userAgent.match(/(iPad|SCH-I800|xoom|kindle)/i);
      device.is_phone = !device.is_tablet && !!nav.userAgent.match(/(iPhone|iPod|blackberry|android 0.5|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i);
      device.is_mobile = device.is_tablet || device.is_phone;
      if (device.is_mobile) {
        var name = nav.userAgent.match(/(iPhone|iPod|blackberry|android 0.5|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii|SCH-I800|xoom|kindle)/ig);
        if (name)
          name = name[0];
      }
      device.type = { type: device.is_mobile ? "mobile" : "pc", name: name || browser.detect().browser};
      return device;
    },
    plugins: function(){
      var check_plugin = function(name){
        if (nav.plugins){
          var plugin, i = 0, length = nav.plugins.length;
          for (; i < length; i++ ){
            plugin = nav.plugins[i];
            if (plugin && plugin.name && plugin.name.toLowerCase().indexOf(name) !== -1){
              return true;
            } }
          return false;
        } return false;
      }
      return {
        flash:       check_plugin("flash"),
        silverlight: check_plugin("silverlight"),
        java:        check_plugin("java"),
        quicktime:   check_plugin("quicktime")
      };
    },
    session: function (cookie, expires){
      var session = util.get_obj(cookie);
      if (session == null){
        session = {
          visits: 1,
          start: new Date().getTime(), last_visit: new Date().getTime(),
          url: win.location.href, path: win.location.pathname,
          referrer: doc.referrer, referrer_info: util.parse_url(doc.referrer),
          search: { engine: null, query: null }
        };
        var search_engines = [
          { name: "Google", host: "google", query: "q" },
          { name: "Bing", host: "bing.com", query: "q" },
          { name: "Yahoo", host: "search.yahoo", query: "p" },
          { name: "AOL", host: "search.aol", query: "q" },
          { name: "Ask", host: "ask.com", query: "q" },
          { name: "Baidu", host: "baidu.com", query: "wd" }
        ], length = search_engines.length,
           engine, match, i = 0,
           fallbacks = 'q query term p wd query text'.split(' ');
        for (i = 0; i < length; i++){
          engine = search_engines[i];
          if (session.referrer_info.host.indexOf(engine.host) !== -1){
            session.search.engine = engine.name;
            session.search.query  = session.referrer_info.query[engine.query];
            session.search.terms  = session.search.query ? session.search.query.split(" ") : null;
            break;
          }
        }
        if (session.search.engine === null && session.referrer_info.search.length > 1){
          for (i = 0; i < fallbacks.length; i++){
            var terms = session.referrer_info.query[fallbacks[i]];
            if (terms){
              session.search.engine = "Unknown";
              session.search.query  = terms; session.search.terms  = terms.split(" ");
              break;
            }
          }
        }
      } else {
        session.prev_visit = session.last_visit;
        session.last_visit = new Date().getTime();
        session.visits++;
        session.time_since_last_visit = session.last_visit - session.prev_visit;
      }
      util.set_cookie(cookie, util.package_obj(session), expires);
      return session;
    },
    html5_location: function(){
      return function(callback){
        nav.geolocation.getCurrentPosition(function(pos){
          pos.source = 'html5';
          callback(pos);
        }, function(err) {
          if (options.gapi_location){
            modules.gapi_location()(callback);
          } else {
            callback({error: true, source: 'html5'}); }
        });
      };
    },
    gapi_location: function(){
      return function(callback){
        var location = util.get_obj(options.location_cookie);
        if (!location || location.source !== 'google'){
          win.gloader_ready = function() {
            if ("google" in win){
              if (win.google.loader.ClientLocation){
                win.google.loader.ClientLocation.source = "google";
                callback(win.google.loader.ClientLocation);
              } else {
                callback({error: true, source: "google"});
              }
              util.set_cookie(
                options.location_cookie,
                util.package_obj(win.google.loader.ClientLocation),
                options.location_cookie_timeout * 60 * 60 * 1000);
            }}
          util.embed_script("https://www.google.com/jsapi?callback=gloader_ready");
        } else {
          callback(location);
        }}
    },
    ipinfodb_location: function(api_key){
      return function (callback){
        var location_cookie = util.get_obj(options.location_cookie);
        if (location_cookie && location_cookie.source === 'ipinfodb'){ callback(location_cookie); }
        win.ipinfocb = function(data){
          if (data.statusCode === "OK"){
            data.source = "ipinfodb";
            util.set_cookie(
              options.location_cookie,
              util.package_obj(data),
              options.location_cookie * 60 * 60 * 1000);
            callback(data);
          } else {
            if (options.gapi_location){ return modules.gapi_location()(callback); }
            else { callback({error: true, source: "ipinfodb", message: data.statusMessage}); }
          }}
        util.embed_script("http://api.ipinfodb.com/v3/ip-city/?key=" + api_key + "&format=json&callback=ipinfocb");
      }}
  };

  // Utilities
  var util = {
    parse_url: function(url_str){
      var a = doc.createElement("a"), query = {};
      a.href = url_str; query_str = a.search.substr(1);
      // Disassemble query string
      if (query_str != ''){
        var pairs = query_str.split("&"), i = 0,
            length = pairs.length, parts;
        for (; i < length; i++){
          parts = pairs[i].split("=");
          if (parts.length === 2){
            query[parts[0]] = decodeURI(parts[1]); }
        }
      }
      return {
        host:     a.host,
        path:     a.pathname,
        protocol: a.protocol,
        port:     a.port === '' ? 80 : a.port,
        search:   a.search,
        query:    query }
    },
    set_cookie: function(cname, value, expires, options){ // from jquery.cookie.js
      if (!cname){ return null; }
      if (!options){ var options = {}; }
      if (value === null || value === undefined){ expires = -1; }
      if (expires){ options.expires = (new Date().getTime()) + expires; }
      return (doc.cookie = [
          encodeURIComponent(cname), '=',
          encodeURIComponent(String(value)),
          options.expires ? '; expires=' + new Date(options.expires).toUTCString() : '', // use expires attribute, max-age is not supported by IE
          '; path=' + (options.path ? options.path : '/'),
          options.domain ? '; domain=' + options.domain : '',
          (win.location && win.location.protocol === 'https:') ? '; secure' : ''
      ].join(''));
    },
    get_cookie: function(cookie_name, result){ // from jquery.cookie.js
      return (result = new RegExp('(?:^|; )' + encodeURIComponent(cookie_name) + '=([^;]*)').exec(doc.cookie)) ? decodeURIComponent(result[1]) : null;
    },
    embed_script: function(url){
      var element  = doc.createElement("script");
      element.type = "text/javascript";
      element.src  = url;
      doc.getElementsByTagName("body")[0].appendChild(element);
    },
    package_obj: function (obj){
      if(obj) {
        obj.version = API_VERSION;
        var ret = JSON.stringify(obj);
        delete obj.version;
        return ret;
      }
    },
    get_obj: function(cookie_name){
      var obj;
      try { obj = JSON.parse(util.get_cookie(cookie_name)); } catch(e){};
      if (obj && obj.version == API_VERSION){
        delete obj.version; return obj;
      }
    }
  };

  // JSON
  var JSON = {
    parse: (win.JSON && win.JSON.parse) || function(data){
        if (typeof data !== "string" || !data){ return null; }
        return (new Function("return " + data))();
    },
    stringify: (win.JSON && win.JSON.stringify) || function(object){
      var type = typeof object;
      if (type !== "object" || object === null) {
        if (type === "string"){ return '"' + object + '"'; }
      } else {
        var k, v, json = [],
            isArray = (object && object.constructor === Array);
        for (k in object ) {
          v = object[k]; type = typeof v;
          if (type === "string")
            v = '"' + v + '"';
          else if (type === "object" && v !== null)
            v = this.stringify(v);
          json.push((isArray ? "" : '"' + k + '":') + v);
        }
        return (isArray ? "[" : "{") + json.join(",") + (isArray ? "]" : "}");
      } } };

  // Initialize SessionRunner
  SessionRunner();

});




/****************************[[rbTUtils.js]]*************************************/ 


trigger_fish.rbTUtils = {
  /** Initialize jquery if needed be
    *  @return void
    *
    */
  includeJQIfNeeded : function() 
  {
    function includeJQ()
    { 
      this.embedScript("https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js",trigger_fish.rbTAPP.wake_RBT_APP);
    }

    if (typeof jQuery != 'undefined') {
        /* jQuery is already loaded... verify minimum version number of 1.6 and reload newer if needed */
        if (/1\.(0|1|2|3|4|5|6)\.(0|1)/.test(jQuery.fn.jquery) 
            || /^1.1/.test(jQuery.fn.jquery) 
            || /^1.2/.test(jQuery.fn.jquery)
            || /^1.3/.test(jQuery.fn.jquery)) {
            includeJQ.call(this);
        }
    } else {
        includeJQ.call(this);
    }
  },

	parseURL: function(urlStr)
	{
      var a = document.createElement("a"), query = {};
      a.href = urlStr; queryStr = a.search.substr(1);
      // Disassemble query string
      if (queryStr != ''){
        var pairs = queryStr.split("&"), i = 0,
            length = pairs.length, parts;
        for (; i < length; i++){
          parts = pairs[i].split("=");
          if (parts.length === 2){
            query[parts[0]] = decodeURI(parts[1]); }
        }
      }
      return {
        host:     a.host,
        path:     a.pathname,
        protocol: a.protocol,
        port:     a.port === '' ? 80 : a.port,
        search:   a.search,
        query:    query }
  },
    
  /** Embed any other script.
	* @param {string} url Script URL to load.
  * @param {object} callback Function to call when script is loaded successfully.
  * @param {object} params Callback initiated with param as arguments.
  *	@return void
	*/
  embedScript: function(url, callback, params)
  {
      if (!url || typeof(url) != "string" || url == "")
        return;
      
      var scriptElement  = document.createElement("script");
      scriptElement.type = "text/javascript";
      scriptElement.src  = url;
      document.getElementsByTagName("head")[0].appendChild(scriptElement);
      scriptElement.onload = scriptElement.onreadystatechange = function() {
        if(!this.readyState ||
            this.readyState == "loaded" || 
            this.readyState == "complete") {
            trigger_fish.rbTDebug.log("Script "+ url +"loaded successfully");
            if (callback) {
              if (params)
                callback(params);
              else callback();
            }
        }
      }
  },
  
  // JSON
  JSON : {
      parse: (window.JSON && window.JSON.parse) || function(data)
      {
        if (typeof data !== "string" || !data) { 
          return null; 
        }
        return (new Function("return " + data))();
      },
    
      stringify: (window.JSON && window.JSON.stringify) || function(object) 
      {
        var type = typeof object;
        if (type !== "object" || object === null) {
          if (type === "string") {
            return '"' + object + '"'; 
          }
        } else {
          var k, v, json = [],
          isArray = (object && object.constructor === Array);
          for (k in object ) {
            v = object[k]; type = typeof v;
            if (type === "string")
              v = '"' + v + '"';
            else if (type === "object" && v !== null)
              v = this.stringify(v);
            json.push((isArray ? "" : '"' + k + '":') + v);
          }
          return (isArray ? "[" : "{") + json.join(",") + (isArray ? "]" : "}");
        } 
      } 
    }
    
};


/****************************[[rbTCookieHandler.js]]*************************************/ 


trigger_fish.rbTCookie = {

  namePrefix : "RBT__",

  // If we do not send following params while setting cookies, defaults will be used. 
  defaultOptions : {
    expire : 24 * 60 * 60 * 1000,  // in hours
    path : "rulebot",
    domain : window.location.hostname,
    secure: false
  },

  // Just harcode names for some of the default cookies which we will be using
  defaultCookies : {
    "actorID"    : "actor_id",
    "systemProp" : "system_prop",
    "actorProp"  : "actor_prop"
  },

  /** Get RBT cookie string name.
   *  @param {string} cookieName
   *  @return string
   */
  name : function(cookieName)
  {
    return this.namePrefix + cookieName;
  },

  /** Get cookie string.
   *  @param {String} cookieName
   *  @return string
   */
  getCookie : function(cookieName)
  {
    "use strict";
    var results = document.cookie.match ( '(^|;) ?' + this.name(cookieName) + '=([^;]*)(;|$)' );

    if (results)
        return (unescape(results[2]));
    else
        return null;
  },

  /** Check cookie existence
   *  @param {string} cookieName
   *  @return boolean
   */
  doesCookieExist : function(cookieName)
  {
    try {
      if (document.cookie.indexOf(this.name(cookieName)) >= 0) {
        return true;
      } else {
        return false;
      }
    } catch(e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "cookie existence failed",
                          "name"      : cookieName,
                          "log"       : true 
                         });
    }
  }, 


  /** Set cookie options.
   * 
   * @param {this.defaultOptions} [options] set options
   * @return string
   */
  cookieOptions : function(options) {
    "use strict";
    var cOptions = {};

    function getExpDate(hours)
    {
      var expiryDate = new Date();
      expiryDate.setTime(expiryDate.getTime()+(30 * hours)); // default day is set to 30
      return expiryDate.toGMTString();
    }

    if (!options) {
      this.defaultOptions.expire = getExpDate(this.defaultOptions.expire);
      return this.defaultOptions;
    }
      

    // Set options if passed else use default options.
    cOptions.expire = options.expire || this.defaultOptions.expire;
    cOptions.path = options.path || this.defaultOptions.path;
    cOptions.domain = options.domain || this.defaultOptions.domain;
    cOptions.secure = options.secure || this.defaultOptions.secure;  

    cOptions.expire = getExpDate(cOptions.expire);

    return cOptions;

  },
 
  /** Set cookie with options passed as key:value pair.
   * 
   * @param {string} cookieName
   * @param {string} cookieValue
   * @param {this.defaultOptions} [options] set options
   * @return string
   */
  setCookie : function(cookieName, cookieValue, options)
  {
    "use strict";
    try {
        var cookieString = this.name(cookieName) + "=" + escape(cookieValue);
        var cookieOptions =  this.cookieOptions(options);

        cookieString += "; expires=" + cookieOptions.expire;
        cookieString += "; path=" + escape(cookieOptions.path);
        cookieString += "; domain=" + escape(cookieOptions.domain);

        if (cookieOptions.secure) cookieString += "; secure";
        
        document.cookie = cookieString;

    } catch(e) {
      // FIXME  what to do?
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "cookie set failed",
                          "name"      : cookieName,
                          "value"     : cookieValue,
                          "options"   : options,
                          "log"       : true 
                         });
    }
  },

  /** Delete a cookie
   *
   * @param {string} cookieName
   * @return void
   */
  deleteCookie :  function(cookieName, options)
  {
    "use strict";
    try {
        var cookieOptions =  this.cookieOptions(options);
        document.cookie = this.name(cookieName) + "=" +
                          "; path=" + cookieOptions.path +
                          "; domain=" + cookieOptions.domain +
                          "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    } catch (e) {
      // FIXME what to do?
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "cookie delete failed",
                          "name"      : cookieName,
                          "log"       : true 
                         });
    }
  },


  /** Flush all cookie
   *
   *  @return void
   */
  flushAllCookie: function() 
  {
    "use strict";
    try {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {   
          var cookie =  cookies[i].split("=");
          var cookieName = cookie[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
          if (cookieName.lastIndexOf(this.namePrefix, 0) === 0) {
            this.deleteCookie(cookieName.slice(this.namePrefix.length, cookieName.length));
          }
      }
    } catch(e) {
      // FIXME what to do?
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "cookie flush all failed",
                          "log"       : true 
                         });
    }
  }

};


/****************************[[rbTBusiness.js]]*************************************/ 


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



/****************************[[rbJSON.js]]*************************************/ 


trigger_fish.rbJSON = {

  "rb" : {},
  "header" : "rbJSON.rb",
  "state" : [],

  getType : function (a)
  {
    return Object.prototype.toString.call(a).split("]")[0].split(" ")[1]
  },


  currentPath : function()
  {
    var rState = this.state;
    var st = this.header;
    for (var i=0 ; i < rState.length ; ++i) {
      if (rState[i].type === "Array") {
        st = st + "." + rState[i].key;
      } else if (rState[i].type === "Object") {
        if (rState[i-1] && rState[i-1].type === "Array")
          st = st + "[" + rState[i].key + "]";
        else
          st = st + "." + rState[i].key;
      }
    }
    return st;
  },

  createNewObj : function(type)
  {
    var st = this.currentPath();
    if (!eval(st)) {
      if (type === "Array")
          eval(st+"=[];");
      else 
          eval(st+"={};");
    }

  },

  addValueToObj : function(key, value, type)
  {
    if (type === "Array" || type === "Object")
      var extKey = this.currentPath() + ((type === "Array") ? "["+key+"]" : "." + key);
    else
      var extKey = this.currentPath() + "." + key;

    var type = this.getType(value);
    var str = extKey+'={type:"'+type+'",value:"'+value+'"};';
    eval(str);
  },

  extend : function(obj)
  { 
    for (var key in obj)
    {
      if (obj.hasOwnProperty(key)) {
          var type = this.getType(obj[key]); 
          if (type === "Object" || type === "Array" ) {
            this.state.push({"type":type,"key":key});
            this.createNewObj(type);
            this.extend(obj[key]);
          } else {
            var pType = (this.state.length) ? this.state[this.state.length-1].type : "";
            this.addValueToObj(key,obj[key], pType);
          }
      }
    }
    this.state.pop();
    return;
  },

  typify : function(obj)
  {
    /*this.rb = {};
    this.state = [];
    this.extend(obj);
    return this.rb;*/
    return obj;
  }

};


/****************************[[rbTInitApp.js]]*************************************/ 


/** Start Rule Bot APP 
* @param {string} appid App ID for rulebot account
* @param {string} accid Account ID for rulebot account
* 
* @return void
*
*/
(function StartRBTApp(appid,accid){
  alert("Initializing RBT APP with AppID = " + appid + " Account ID = " + accid);
  try {
    if (!appid || !accid || appid == "" || accid == "") {
      throw new Error("App-id, Account-ID are not mentioned")
    } else {
      // if everything seems fine, then set app/acc id and initialize rbTAPP.
      trigger_fish.rbTAPP.setAppID(appid);
      trigger_fish.rbTAPP.setAccountID(accid);
      trigger_fish.rbTUtils.includeJQIfNeeded();
      window.rb = new RBT();
    }
  } catch (e) {
    trigger_fish.rbTAPP.reportError({"exception" : e.message, 
                        "message"   : "App initalization failed"
                       });
  }
})(_rbTK[0][1], _rbTK[1][1]);



function testGanga()
{
  //rb.sendEvent("sample_event",{"a":101});
  //rb.identify("83.samarth@gmail.com");
  //rb.identify({"uid":"83.samarth@gmail.com"});
  //rb.setActor({"name":"samarth","age":"29"});

  rb.sendEvent("sample_event",{"name":"samarth"});


  console.log("ENDING TESTING SEQUENCE");
}

testGanga();

