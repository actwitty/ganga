


/****************************[[rbTAPP.js]]*************************************/ 


var rbTAPP = {
    

    /* Main configs will be holded here */
    configs : {
      "status" : false
    },

    
    /** 
    *  Do following tasks on initialization of the app
    *  1). include jQuery if need be
    *  2). create session.
    *  3). fetch rules.
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

      // 3). Initialize rulebot rules
      rbTRules.init();

      // 4). Initialize system variables  
      rbTSystemVar.init();

      // 5). FIXME : Check status of last event, if pending, execute it.
      //rbTRules.executeLastPendingEvent();

      window.rb = new RBT();
    },

    /**
    * Check status of RBT APP
    *
    * @param {function} callback Callback function if rbTAPP is alive.
    * @param {object} args Arguments with which callback will be called.
    * @return void   
    */
    isrbTAlive :  function(callback, args)
    {
       return this.configs.status;
       /*
       if (this.configs.status) {
          if (callback)
             callback(args);
          return true;
       }
       else
           return false;
      */

    },  

    /**
    * Set RBT APP Status to true to signal app is alive
    */
    wake_RBT_APP : function()
    {
      rbTAPP.configs.status = true;
      rbTDebug.log("Initializing RBT APP");
      rbTAPP.initialize();
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
    *  Set Actor ID
    *  @param {string} id 
    *  @return void
    */
    setActorID : function(id)
    {
      //this.configs.ActorID = id;
      rbTCookie.setCookie("actor_id", respData);
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
    *  Get Actor ID
    *  @return {string} id 
    */  
    getActorID : function()
    {
      return rbTCookie.getCookie(rbTCookie.defaultCookie.actorID); 
      //return this.configs.actorID;
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
      
       var actor_id = rbTCookie.getCookie(rbTCookie.defaultCookies.actorID);
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
      rbTServerChannel.createSession({success:this.setSessionID});
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
          rbTServerChannel.makeGetRequest( rbTServerChannel.url.setSystemProperty,
                                           params,
                                           { success: rbTServerResponse.setSystemProperty,
                                             error  : rbTServerResponse.defaultError
                                           }
                                          );
      } else {
          rbTAPP.reportError({"message"   : "System params could not be found, report error",
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
      return JSON.parse(rbTCookie.getCookie(rbTCookie.defaultCookie.system));
    },


    /** 
    *  report error to rbT server
    *  @param {object} params Error log message 
    *  @return void
    */ 
    reportError : function(params)
    {
      try {
          if (params.log) {
            debug.error(params);
          } else {
            rbTServerChannel.reportError(params);
          }
      } catch(e) {
        // FIXME what to do?
      }
    },

    /** 
    *  Preprocess params with datatype.
    *  @param {object} params Error log message. 
    *  @return {object} params with added data types.
    */
    preprocessParams : function(params)
    {
      

      
    }
};



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
window.rbTDebug=(function(){var i=this,b=Array.prototype.slice,d=i.console,h={},f,g,m=9,c=["error","warn","info","debug","log"],l="assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "),j=l.length,a=[];while(--j>=0){(function(n){h[n]=function(){m!==0&&d&&d[n]&&d[n].apply(d,arguments)}})(l[j])}j=c.length;while(--j>=0){(function(n,o){h[o]=function(){var q=b.call(arguments),p=[o].concat(q);a.push(p);e(p);if(!d||!k(n)){return}d.firebug?d[o].apply(i,q):d[o]?d[o](q):d.log(q)}})(j,c[j])}function e(n){if(f&&(g||!d||!d.log)){f.apply(i,n)}}h.setLevel=function(n){m=typeof n==="number"?n:9};function k(n){return m>0?m>n:c.length+m<=n}h.setCallback=function(){var o=b.call(arguments),n=a.length,p=n;f=o.shift()||null;g=typeof o[0]==="boolean"?o.shift():false;p-=typeof o[0]==="number"?o.shift():n;while(p<n){e(a[p++])}};return h})();


/****************************[[rbTRules.js]]*************************************/ 


var rbTRules = {

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

  sample_json : [
        {
          id: '1010101010',
          name  : "sample_name", 
          event : "sample_event",
          action: "topbar",
          action_param :
                  {
                    text: "A quickbrown fox jumps over a lazy dog",
                    href: "http://www.google.com",
                    color: "#333333",
                    width: "50"
                  },
          conditions : [
                // event based condition
                { 
                  property: "#customer.email",
                  type : "String",
                  negation: 'false',
                  operation: 'eql',
                  value1: 'gmail.com',
                  connect: 'and' 
                },
                // actor_property based condition
                {
                  property: "$customer.val1",
                  type : "Number",
                  negation: 'false',
                  operation: 'gtn',
                  value1: 2,
                  connect: 'and' 
                },
                // system_property based condition
                {
                  property: "#customer.val2",
                  type : "Number",
                  negation: 'false',
                  operation: 'ltn',
                  value1: 3000,
                  connect: 'and' 
                },
                {
                  property: "#customer.swh",
                  type : "String",
                  negation: 'false',
                  operation: 'swh',
                  value1: 'act',
                  connect: 'and' 
                },
                {
                  property: "#customer.ewh",
                  type : "String",
                  negation: 'false',
                  operation: 'ewh',
                  value1: 'tty',
                  connect: 'and' 
                },
                {
                  property: "#customer.cns",
                  type : "String",
                  negation: 'false',
                  operation: 'cns',
                  value1: 'wit',
                  connect: 'and' 
                },
                {
                  property: "#customer.drg",
                  type : "Date",
                  negation: 'false',
                  operation: 'drg',
                  value1: "2/2/2011",
                  value2: "4/4/2011"
                },
              ]
        }
  ],
  
  /**
  * Initialize Rules for business
  * @param {object} params Parameters passing
  * @return void
  */
  init : function(params)
  {
    "use strict";
    var params = params || "";
    // COMMENTING FOR TIME BEING TILL WE HAVE RULES API UP
    /*try {
          rbTServerChannel.makeGetRequest( rbTServerChannel.url.getRules,
                                           params,
                                           { success: rbTServerResponse.setRulesTable,
                                             error  : rbTServerResponse.defaultError
                                           },
                                           "noasync"
                                         );
    } catch(e) {
      // FIXME what to do?
      rbTAPP.reportError({"exception" : e.message, "message":"rule initialization failed"});
    }*/
    rbTRules.setRulesTable("");
  },
  

  /**
  * Set rules table for business
  * @return void
  */
  setRulesTable : function(rules)
  {
    "use strict";
    rules = this.sample_json;
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
    // FIXME :: ADD NEGATION PARAMS HERE
    function ruleParams(rule)
    {
      if (rule.value2)
        var params = "('"+rule.type+"','"+rule.negation+"','"+rule.property+"','"+rule.value1+"','"+ rule.value2+"')";
      else
        var params = "('"+rule.type+"','"+rule.negation+"' ,'"+rule.property+"','"+rule.value1+"')";  

      return params;
    }

    try {
        jQuery.each(rules, function(index, ruleList) {
          ruleString = " ";
          for (var rule in ruleList.conditions) {
            ruleString = ruleString + "rbTRules.rule." + ruleList.conditions[rule].operation + 
                    ruleParams(ruleList.conditions[rule]) + ruleConnect(ruleList.conditions[rule]);
          }

          rbTRules.ruleTable[ruleList.event] = { "name"         : ruleList.name,
                                                 "ruleString"   : ruleString,
                                                 "action"       : ruleList.action,
                                                 "action_param" : ruleList.action_param
                                               };
        });
    } catch (e) {
      rbTAPP.reportError({"exception" : e.message,
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
      rbTAPP.reportError({"exception"  : e.message,
                          "message"    : "rule execution on event failed" , 
                          "event_name" : event,
                          "rule_string": this.ruleTable[event].ruleString
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
        rbTAPP.reportError({"exception" : e.message,
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
      var lastEvent = rbTCookie.getCookie("lastevent");
      if (lastEvent) {
        this.executeRulesOnEvent(lastEvent);
      } else {
        throw "no last event found"
      }
    } catch(e) {
      rbTDebug.log("no last event found");
    }
  },

  /**
  * FIXME : enable this
  * Evaluate property value to a suitable sys or user property
  * @param {string} rule property For which we need to evaluate data type
  */
  evalProperty : function(ruleProperty, type)
  {
    if (!ruleProperty)
      return "";

    var startCh = ruleProperty.charAt(0);

    var propType = (startCh == "$") ? "actor"  : (
                   (startCh == "#") ? "system" : "open");

    // FIXME : Currently we do not know the structure of response we will get.
    // Based on that we need to process further.

    var p = ruleProperty.slice(1,ruleProperty.length);
    var value = eval("RBT."+p);
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
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
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
    return (x === "true") ? false : true; 
  },

  /**
  * Check the validity of the rule based on permitted operations on data type
  * @param {string} t Type of rule applying.
  * @param {string} a Rule property
  * @param {string} b Rule value 1
  * @param {string} [c] Rule value 2
  * @return boolean validity
  */
  isValidRule : function(dt,t,a,b,c)
  {
    if (!a || !b)
      return false;
    var propDT = this.getDataType(this.evalProperty(a,dt));

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
 
  /* 
     RULE FUNCTIONS 
     We should be having try-catch in all rule functions.
  */
  rule : 
  {
    /**
    * Rule to check for less than
    * @param {string} a Rule property
    * @param {string} b Rule value
    * 
    * @return {boolean} Validity based on rule
    */ 
    ltn : function(t,x,a,b)
    {
      "use strict";
      try {
        $("#applyingrules").append("<h3>less than</h3>");
        if (!rbTRules.isValidRule(t,"ltn",a,b))
          return false;
        var prop = rbTRules.evalProperty(a);
        return ((prop < rbTRules.valueDataType(prop, b)) && rbTRules.isNegate(x) );
      } catch(e) {
        rbTAPP.reportError({"exception" : e.message,
                            "message":"rule evaluation on lt failed" , 
                            "property" : a,
                            "value"    : b
                           });
      }
    },
        
    /**
    * Rule to check for greater than
    * @param {string} a Rule property
    * @param {string} b Rule value
    * 
    * @return {boolean} Validity based on rule
    */ 
    gtn : function(t,x,a,b)
    {
      "use strict";
      try {
        $("#applyingrules").append("<h3>greater than</h3>");
        if (!rbTRules.isValidRule(t,"gtn",a,b))
          return false;
        var prop = rbTRules.evalProperty(a);
        return ((prop > rbTRules.valueDataType(prop, b)) && rbTRules.isNegate(x) );
      } catch(e) {
        rbTAPP.reportError({"exception" : e.message,
                            "message":"rule evaluation on gt failed" , 
                            "property" : a,
                            "value"    : b
                           });
      }
    },

    /**
    * Rule to check for equal to
    * @param {string} x negation status
    * @param {string} a Rule property
    * @param {string} b Rule value
    * 
    * @return {boolean} Validity based on rule
    */ 
    eql : function(t,x,a,b)
    {
      "use strict";
      try {
        $("#applyingrules").append("<h3>equal to</h3>");
        if (!rbTRules.isValidRule(t,"eql",a,b))
          return false;
        var prop = rbTRules.evalProperty(a);
        return ((prop === rbTRules.valueDataType(prop, b)) && rbTRules.isNegate(x) );
      } catch(e) {
        rbTAPP.reportError({"exception" : e.message,
                            "message":"rule evaluation on equal_to failed" , 
                            "property" : a,
                            "value"    : b
                           });
      }
    },

    /**
    * Rule to check for contains
    * @param {string} x negation status
    * @param {string} a Rule property
    * @param {string} b Rule value
    * 
    * @return {boolean} Validity based on rule
    */ 
    cns : function(t,x,a,b)
    {
      "use strict";
      try {
        $("#applyingrules").append("<h3>contains</h3>");
        if (!rbTRules.isValidRule(t,"cns",a,b))
          return false;
        var prop = rbTRules.evalProperty(a);
        if (prop.indexOf(rbTRules.valueDataType(prop, b)) >= 0 )
          return (true && rbTRules.isNegate(x) );
        else
          return (false && rbTRules.isNegate(x) );
      } catch(e) {
        rbTAPP.reportError({"exception" : e.message,
                            "message":"rule evaluation on contains failed" , 
                            "property" : a,
                            "value"    : b
                           });
      }
    },

    /**
    * Rule to check for starts with condition
    * @param {string} x negation status
    * @param {string} a Rule property
    * @param {string} b Rule value
    * 
    * @return {boolean} Validity based on rule
    */ 
    swh : function(t,x,a,b)
    {
      "use strict";
      try {
        $("#applyingrules").append("<h3>starts with</h3>");
        if (!rbTRules.isValidRule(t,"swh",a,b))
          return false;
        var prop = rbTRules.evalProperty(a);
        if (prop.match("^"+rbTRules.valueDataType(prop, b)))
          return (true && rbTRules.isNegate(x) );
        else
          return (false && rbTRules.isNegate(x) );
      } catch(e) {
        rbTAPP.reportError({"exception" : e.message,
                            "message":"rule evaluation on starts_with failed" , 
                            "property" : a,
                            "value"    : b
                           });
      }
    },

    /**
    * Rule to check for ends with condition
    * @param {string} x negation status
    * @param {string} a Rule property
    * @param {string} b Rule value
    * 
    * @return {boolean} Validity based on rule
    */ 
    ewh : function(t,x,a,b)
    {
      "use strict";
      try {
        $("#applyingrules").append("<h3>ends with</h3>");
        if (!rbTRules.isValidRule(t,"ewh",a,b))
          return false;
        var prop = rbTRules.evalProperty(a);
        if (prop.match(rbTRules.valueDataType(prop, b)+"$"))
          return (true && rbTRules.isNegate(x) );
        else
          return (false && rbTRules.isNegate(x) );
      } catch(e) {
        rbTAPP.reportError({"exception" : e.message,
                            "message"   :"rule evaluation on ends_with failed" , 
                            "property"  : a,
                            "value"     : b
                           });
      }
    },

    /**
    * Rule to check for in between range
    * @param {string} x negation status
    * @param {string} a Rule property
    * @param {string} b Rule value
    * @param {string} c Rule value2
    * @return {boolean} Validity based on rule
    */ 
    btn: function(t,x,a,b,c)
    {
      "use strict";
      try {
        $("#applyingrules").append("<h3>between</h3>");
        if (!rbTRules.isValidRule(t,"btn",a,b,c))
          return false;
        var prop = rbTRules.evalProperty(a);
        return prop >= rbTRules.valueDataType(prop, b) && a <= rbTRules.valueDataType(prop, c)  && rbTRules.isNegate(x) ;
      } catch(e) {
        rbTAPP.reportError({"exception" : e.message,
                            "message"   :"rule evaluation on between failed" , 
                            "property"  : a,
                            "value"     : b,
                            "value2"    : c
                           });
      }
    },

    /**
    * Rule to check for regex condition
    * @param {string} x negation status
    * @param {string} a Rule property
    * @param {string} b Rule value
    * @return {boolean} Validity based on rule
    */ 
    rgx :  function(t,x,a,b)
    {
      "use strict";
      try {
        $("#applyingrules").append("<h3>regex</h3>");
        if (!rbTRules.isValidRule(t,"rgx",a,b))
          return false;
        var prop = rbTRules.evalProperty(a);
        regexp = new RegExp(b, 'gi');
        return ( regexp.test(prop) && rbTRules.isNegate(x) ) ;
      } catch (e) {
        rbTAPP.reportError({"exception" : e.message,
                            "message"   :"rule evaluation on regex failed" , 
                            "property"  : a,
                            "value"     : b
                           });
      }
    },

    /**
    * Rule to check for days ago condition
    * @param {string} x negation status
    * @param {string} a Rule property
    * @param {string} b Rule value
    * @return {boolean} Validity based on rule
    */
    dag : function(t,x,a,b)
    {
      "use strict";
      try {
        $("#applyingrules").append("<h3>days ago</h3>");
        if (!rbTRules.isValidRule(t,"dag",a,b))
          return false;
        var prop = rbTRules.evalProperty(a);
        regexp = new RegExp(b, 'gi');
        return ( regexp.test(prop) && rbTRules.isNegate(x) ) ;
      } catch (e) {
        rbTAPP.reportError({"exception" : e.message,
                            "message"   :"rule evaluation on regex failed" , 
                            "property"  : a,
                            "value"     : b
                           });
      }
    },

    /**
    * Rule to check for date range condition
    * @param {string} x negation status
    * @param {string} a Rule property
    * @param {string} b Rule value Date range1
    * @param {string} c Rule value Date range2
    * @return {boolean} Validity based on rule
    */
    drg: function(t,x,a,b,c)
    {
      "use strict";
      try {
        $("#applyingrules").append("<h3>days between</h3>");
        if (!rbTRules.isValidRule(t,"drg",a,b,c))
          return false;
        var prop = rbTRules.evalProperty(a,t);
        return prop >= rbTRules.valueDataType(prop, b) && prop <= rbTRules.valueDataType(prop, c)  && rbTRules.isNegate(x) ;
      } catch (e) {
        rbTAPP.reportError({"exception" : e.message,
                            "message"   :"rule evaluation on regex failed" , 
                            "property"  : a,
                            "value"     : b
                           });
      }
    },

    /**
    * Rule to check for set to condition
    * @param {string} x negation status
    * @param {string} a Rule property
    * @return {boolean} Validity based on rule
    */
    set : function(t,x,a)
    {
      "use strict";
      try {
        $("#applyingrules").append("<h3>set prop</h3>");
        var prop = rbTRules.evalProperty(a);
        return (prop ? true:false);
      } catch (e) {
        rbTAPP.reportError({"exception" : e.message,
                            "message"   :"rule evaluation on is set" , 
                            "property"  : a,
                           });
      }
    }
  }

};


/****************************[[rbTServerResponse.js]]*************************************/ 


var rbTServerResponse = {

  /** 
  *  Handle default success callback if not mentioned explicitly
  *   
  *  @return void
  */ 
  defaultSuccessCallback : function()
  {
    // FIXME : what to do?
    rbTDebug.log("Success callback : default server response");
  },
  /** 
  *  Handle default error callback if not mentioned explicitly
  *   
  *  @return void
  */ 
  defaultErrorCallback : function()
  {
    // FIXME : what to do?
    rbTDebug.warn("Success callback : default server response");
  },


  /**
  * Set actor identification based on server response
  * @param {object} respData Actor identification details
  * @return void
  */
  setActor : function(respData)
  { 
    "use strict";
    try {
      if (respData) {
        // FIXME :: Flush and reset all cookies if there is a change in actor.
        // WAITING AS THERE ARE SOME CHANGES IN BACKEND.
        rbTCookie.setCookie(rbTCookie.defaultCookies.actor, JSON.stringify(respData));

      } else {
        throw "there is no data";
      }
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
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
  setUserProperty : function(respData)
  {
     "use strict";
    // FIXME : check for which property to set
    try {
      if (respData) {
        rbTCookie.setCookie(rbTCookie.defaultCookies.actorprop, JSON.stringify(respData));
      } else {
        throw "there is no data";
      }
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
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
    // FIXME : check for which property to set
    try {
      if (respData) {
        rbTCookie.setCookie(rbTCookie.defaultCookies.system, JSON.stringify(respData));
      } else {
        throw "there is no data";
      }
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
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
    "use strict";
    try {
      if(respData && respData.actor) {
        rbTCookie.setCookie(rbTCookie.defaultCookies.actor, respData.actor);
      } else {
        throw "there is no data";
      }
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
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
    try {
      if(respData) {
        rbTRules.setRulesTable(respData);
      } else {
        throw "there is no data";
      }
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
                          "message"   : "setting rules failed",
                          "data"      : respData
                        });
    }
  }


};


/****************************[[rbTServerReq.js]]*************************************/ 


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
    "roi"               : ""
  },

  /* Default options for server request */
  defaultOptions : {
    "success_callback" : rbTServerResponse.defaultSuccessCallback,
    "error_callback"   : rbTServerResponse.defaultErrorCallback
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
      requestData["properties"] = reqData;
    return requestData;
  },

  /** 
  *  Make a request to server.
  *  @param {string} event
  *  @param {rbTServerChannel.url} url
  *  @param {object} reqData
  *  @param {object} callback
  *  @return {object}
  */
  makeEventRequest :  function(event, url, reqData, callback)
  {
    "use strict";
    try {
      var reqServerData = this.makeRequestData(event, reqData);
      callback = this.extendCallbacks(callback);
      jQuery.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            data: reqServerData,
            beforeSend: function() {
                // FIXME : add status to cookie
                rbTCookie.setCookie("lastevent", event);
            },
            success: function ( respData ) {
                rbTCookie.deleteCookie("lastevent");
                // FIXME : Currently we do not know the format of response we will get from server.
                if (respData && respData.actor) { 
                  rbTServerResponse.setActor(respData.actor);
                  callback.success(respData);
                }
            },
            error:function(XMLHttpRequest,textStatus, errorThrown){ 
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
                          "log"       : "error" 
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


/****************************[[rbTSystemVar.js]]*************************************/ 


/* Rule Bot scope to handle systems variables */
var rbTSystemVar = {

  // All properties will be set here
  properties : {},

  // To get all properties
  allProperties : "browser_info,referrer_info,device_info,screen_info,viewport_info,locale_info,plugins_info,time_info",

  /** Initialize system variable script
   *  @return void
   */
  init : function()
  {
    "use strict";
    function isSystemVarDirty()
    {
      var sysVarInCookie = rbTCookie.getCookie(rbTCookie.defaultCookies.systemProp);
      
      if (!sysVarInCookie) {
        return true; 
      } else {
        var currentSysVar = this.getAllProperty();
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
      var systemVars = this.getAllProperty();
      this.setPropertyInCookie(systemVars);
      rbTAPP.setSystemProperty(systemVars);
    }
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
   *  Following supported
   *  1). "browser_info"
          return -> 
          {
             browser : browser_name,
             os      : os_name,
             version : version_number

          }

      2). "referrer_info"
          return ->
          {
            host: "127.0.1.1"
            path: "/~sammy/"
            port: 80
            protocol: "http:"
          }
      3). "device_info"
          return ->
          {
            is_mobile: false
            is_phone: false
            is_tablet: false
          } 
      4). "screen_info"
          return ->
          {
            height: 768,
            width: 1366
          }
      5). "viewport_info"
          return ->
          {
            height: 768,
            width: 1366
          }
      6). "locale_info"
          return ->
          {
            country: "us",
            lang: "en
          }
      7). "plugins_info"
          return ->
          {
            flash: true
            java: false
            quicktime: true
            silverlight: false
          }
      8). "time_info"
          return ->
          {
            observes_dst: false
            tz_offset: 5.5
          }
   *
   *   @param {string} type
   *   @return {object} value
   */

  getProperty : function(propertyTypes)
  {
    "use strict";
    var types = propertyTypes.split(",");
    var propertyCnf = {};
    for (var i = 0; i < types.length ; ++i) {
      switch(types[i]) {
      case "browser_info":
          propertyCnf[types[i]] =  this.properties.browser; 
          break;
      case "referrer_info":
          propertyCnf[types[i]] =  this.properties.current_session.referrer_info; 
          break;
      case "device_info" :
          propertyCnf[types[i]] =  this.properties.device; 
          break;
      case "screen_info" :
          propertyCnf[types[i]] =  this.properties.device.screen; 
          break;
      case "viewport_info" :
          propertyCnf[types[i]] =  this.properties.device.viewport; 
          break;
      case "locale_info":
          propertyCnf[types[i]] =  this.properties.locale; 
          break;
      case "plugins_info":
          propertyCnf[types[i]] =  this.properties.plugins; 
          break;
      case "time_info":
          propertyCnf[types[i]] =  this.properties.time; 
          break;
      }
    }
    return propertyCnf;
  },

  getAllProperty : function()
  {
    return this.getProperty(this.allProperties);
  },

  setPropertyInCookie : function(property)
  {
    rbTCookie.setCookie(rbTCookie.defaultCookies.systemProp, JSON.stringify(property));
  },


};




/**
 * session.js 0.4.1
 * (c) 2012 Iain, CodeJoust
 * session.js is freely distributable under the MIT license.
 * Portions of session.js are inspired or borrowed from Underscore.js, and quirksmode.org demo javascript.
 * This version uses google's jsapi library for location services.
 * For details, see: https://github.com/codejoust/session.js
 */

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
      api_version: API_VERSION,
      locale: modules.locale(),
      current_session: modules.session(),
      original_session: modules.session(
        options.session_cookie,
        options.session_timeout * 24 * 60 * 60 * 1000),
      browser: modules.browser(),
      plugins: modules.plugins(),
      time: modules.time(),
      device: modules.device()
    };
    // Location switch
    if (options.use_html5_location){
      unloaded_modules.location = modules.html5_location();
    } else if (options.ipinfodb_key){
      unloaded_modules.location = modules.ipinfodb_location(options.ipinfodb_key);
    } else if (options.gapi_location){
      unloaded_modules.location = modules.gapi_location();
    }
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
      for (property in unloaded_modules) {
        rbTSystemVar.setProperty(property, unloaded_modules[property] );
      }
    })();
    //setrbTProperties();
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


var rbTUtils = {
  /** Initialize jquery if needed be
    *  @return void
    *
    */
  includeJQIfNeeded : function() 
  {
    function includeJQ()
    { 
      this.embedScript("https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js",rbTAPP.wake_RBT_APP);
      //this.waitForjQueryAlive();
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
            rbTDebug.log("Script "+ url +"loaded successfully");
            if (callback) {
              if (params)
                callback(params);
              else callback();
            }
        }
      }
  },

  /**
  * Wait till jquery is alive.
  */
  waitForjQueryAlive : function() 
  {
      "use strict";
      function checkJquery()
      {
        if (!window.jQuery) {
            window.setTimeout(checkJquery, 500);
        } else {
          // make RBT APP alive.
          rbTAPP.wake_RBT_APP();
        }
      }
      checkJquery();
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


var rbTCookie = {

  namePrefix : "RBT__",

  // If we do not send following params while setting cookies, defaults will be used. 
  defaultOptions : {
    expire : 24 * 60 * 60 * 1000,  // in hours
    path : "/",
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
      rbTAPP.reportError({"exception" : e.message,
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
      rbTAPP.reportError({"exception" : e.message,
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
      rbTAPP.reportError({"exception" : e.message,
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
      rbTAPP.reportError({"exception" : e.message,
                          "message"   : "cookie flush all failed",
                          "log"       : true 
                         });
    }
  }

};


/****************************[[rbTBusiness.js]]*************************************/ 


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
  rbTServerChannel.makeEventRequest(event, 
                                    rbTServerChannel.url.fireEvent,
                                    params,
                                    { success: rbTServerResponse.handleEvent,
                                      error  : rbTServerResponse.defaultError
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
  rbTServerChannel.makeGetRequest(rbTServerChannel.url.identify,
                                params,
                                { success: rbTServerResponse.setActor,
                                  error  : rbTServerResponse.defaultError
                                }
                               );
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
  rbTServerChannel.makeGetRequest( rbTServerChannel.url.setUserProperty,
                                   params,
                                   { success: rbTServerResponse.setUserProperty,
                                     error  : rbTServerResponse.defaultError
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


var rbJSON = {

  "rb" : {},
	"header" : "rb",
	"state" : [],

	getType : function (a)
  {
    return Object.prototype.toString.call(a).split("]")[0].split(" ")[1]
  },


	currentPath : function()
	{
	  var rState = rbJSON.state;
	  var st = rbJSON.header;
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
	  var st = rbJSON.currentPath();
	  if (!eval(st)) {
	    if (type === "Array")
	        eval(st+"=[];");
	    else 
	        eval(st+"={};");
	  }

  },

  addValueToObj : function(key, value, type)
	{
  	var extKey = getCurrentPath() + (type === "Array") ? "["+key+"]" : "." + key;;
    var type = typeof(value);
    var str = extKey+'={type:"'+type+'",value:"'+value+'"};';
    eval(str);
  },

	extend : function(obj)
	{	
		for (var key in obj)
    {
      if (obj.hasOwnProperty(key)) {
          var type = rbJSON.getType(obj[key]); 
          if (type === "Object" || type === "Array" ) {
            rbJSON.state.push({"type":type,"key":key});
            rbJSON.createNewObj(type);
            rbJSON.mirror(obj[key]);
          } else {
            rbJSON.addValueToObj(key,obj[key], type);
          }
      }
    }
    rbJSON.state.pop();
    return;
	},

  typify : function(obj)
  {
  	rbJSON.rb = {};
  	rbJSON.state = [];
  	rbJSON.extend(obj);
  	return rbJSON.rb;
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
      rbTAPP.setAppID(appid);
      rbTAPP.setAccountID(accid);
      rbTUtils.includeJQIfNeeded();
    }
  } catch (e) {
    rbTAPP.reportError({"exception" : e.message, 
                        "message"   : "App initalization failed"
                       });
  }
})(_rbTK[0][1], _rbTK[1][1]);



function testGanga()
{
  rb.sendEvent("sample_event",{"a":101});
}

function waitForRBT()
{
  if(!rbTAPP.isrbTAlive())
  {
    window.setTimeout(waitForRBT, 500);
  }
  else
  {
    testGanga();
  }
}

waitForRBT();

