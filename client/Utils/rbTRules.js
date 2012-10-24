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
          'Number': [ 'gtn','ltn','eql','btn','rgx','set'] 
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
                  negation: 'false',
                  operation: 'eql',
                  value1: 'gmail.com',
                  connect: 'and' 
                },
                // actor_property based condition
                {
                  property: "$customer.val1",
                  negation: 'false',
                  operation: 'gtn',
                  value1: 2,
                  connect: 'and' 
                },
                // system_property based condition
                {
                  property: "#customer.val2",
                  negation: 'false',
                  operation: 'gtn',
                  value1: 3
                }
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
    try {
          rbTServerChannel.makeGetRequest( rbTServerChannel.url.getRules,
                                           params,
                                           { success: rbTServerResponse.setRulesTable,
                                             error  : rbTServerResponse.defaultError
                                           });
        } catch(e) {
          // FIXME what to do?
          rbTAPP.reportError({"exception" : e.message, "message":"rule initialization failed"});
        }
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
        var params = "('"+rule.negation+"' ,'"+rule.property+"','"+rule.value1+"','"+ rule.value2+"')";
      else
        var params = "('"+rule.negation+"' ,'"+rule.property+"','"+rule.value1+"')";  

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
  evalProperty : function(ruleProperty)
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
    return value;
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
  isValidRule : function(t,a,b,c)
  {
    if (!a || !b)
      return false;
    var propDT = this.getDataType(this.evalProperty(a));

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
    ltn : function(x,a,b)
    {
      "use strict";
      try {
        if (!rbTRules.isValidRule("ltn",a,b))
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
    gtn : function(x,a,b)
    {
      "use strict";
      try {
        if (!rbTRules.isValidRule("gtn",a,b))
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
    * Rule to check for not equal to condition
    * @param {string} x negation status
    * @param {string} a Rule property
    * @param {string} b Rule value
    * 
    * @return {boolean} Validity based on rule
    */ 
    not_equal_to : function(x,a,b)
    {
      "use strict";
      try {
        if (!rbTRules.isValidRule("ltn",a,b))
          return false;
        var prop = rbTRules.evalProperty(a);
        if (prop !== rbTRules.valueDataType(prop, b) )
          return (true && rbTRules.isNegate(x) );
        else
          return (false && rbTRules.isNegate(x) );
      } catch(e) {
        rbTAPP.reportError({"exception" : e.message,
                            "message":"rule evaluation on not_equal_to failed" , 
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
    eql : function(x,a,b)
    {
      "use strict";
      try {
        if (!rbTRules.isValidRule("eql",a,b))
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
    cns : function(x,a,b)
    {
      "use strict";
      try {
        if (!rbTRules.isValidRule("cns",a,b))
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
    swh : function(x,a,b)
    {
      "use strict";
      try {
        if (!rbTRules.isValidRule("swh",a,b))
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
    ewh : function(x,a,b)
    {
      "use strict";
      try {
        if (!rbTRules.isValidRule("ewh",a,b))
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
    btn: function(x,a,b,c)
    {
      "use strict";
      try {
        if (!rbTRules.isValidRule("btn",a,b,c))
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
    rgx :  function(x,a,b)
    {
      "use strict";
      try {
        if (!rbTRules.isValidRule("rgx",a,b))
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
    dag : function(x,a,b)
    {
      "use strict";
      try {
        if (!rbTRules.isValidRule("dag",a,b))
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
    drg: function(x,a,b,c)
    {
      "use strict";
      try {
        if (!rbTRules.isValidRule("drg",a,b,c))
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
    * Rule to check for set to condition
    * @param {string} x negation status
    * @param {string} a Rule property
    * @param {string} b Rule value
    * @return {boolean} Validity based on rule
    */
    set : function(x,a,b)
    {
      "use strict";
      try {
        if (!rbTRules.isValidRule("set",a,b))
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
    }
  }

};
