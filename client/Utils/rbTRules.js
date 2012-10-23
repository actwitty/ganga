var rbTRules = {


  ruleTable : {}, 

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
                  property: 'person[email]',
                  negation: 'true',
                  operation: 'ew',
                  value1: '@gmail.com',
                  connect: 'and' 
                },
                // actor_property based condition
                {
                  property: 'person[counter]',
                  negation: 'false',
                  operation: 'gt',
                  value1: 5,
                  connect: 'and' 
                },
                // system_property based condition
                {
                  property: 'person[counter]',
                  negation: 'false',
                  operation: 'gt',
                  value1: 5
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
          for (rule in ruleList.conditions) {
            ruleString = ruleString + "rbTRules.rule." + ruleList.rules[rule].operator + 
                    ruleParams(ruleList.rules[rule]) + ruleConnect(ruleList.rules[rule]);
          }

          this.ruleTable[ruleList.event] = { "name"         : ruleList.name,
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
      return 'if (' + ruleString + ') { return true; } else { return false;}';
    }

    try {
          var functionCode = prepareFunctionCode(this.ruleTable[event].ruleString);
          var isRuleValid = new Function(functionCode)();
          if (isRuleValid) {
            this.invokeAction(event);
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
    // We are expecting only 2 types i.e string or number
    try {
        if (typeof property === "string") {
          return value.toString();
        } else if(typeof property === "number") {
          return parseFloat(value);
        } else if(Object.prototype.toString.call(date) === '[object Date]') {
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
  * 
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
      rbTTemplates.invoke(this.ruleTable[event].action, this.ruleTable[event].action_param);
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
                          "message": "action could not be invoked" , 
                          "event" : event
                         });
    }
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
    lt : function(x,a,b)
    {
      "use strict";
      try {
        var prop = this.evalProperty(a);
        return ((prop < this.valueDataType(prop, b)) && this.isNegate(x) );
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
    gt : function(x,a,b)
    {
      "use strict";
      try {
        var prop = this.evalProperty(a);
        return ((prop > this.valueDataType(prop, b)) && this.isNegate(x) );
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
        var prop = this.evalProperty(a);
        if (prop !== this.valueDataType(prop, b) )
          return (true && this.isNegate(x) );
        else
          return (false && this.isNegate(x) );
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
    equal_to : function(x,a,b)
    {
      "use strict";
      try {
        var prop = this.evalProperty(a);
        return ((prop === this.valueDataType(prop, b)) && this.isNegate(x) );
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
    contains : function(x,a,b)
    {
      "use strict";
      try {
        var prop = this.evalProperty(a);
        if (prop.indexOf(this.valueDataType(prop, b)) >= 0 )
          return (true && this.isNegate(x) );
        else
          return (false && this.isNegate(x) );
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
    starts_with : function(x,a,b)
    {
      "use strict";
      try {
        var prop = this.evalProperty(a);
        if (prop.match("^"+this.valueDataType(prop, b)))
          return (true && this.isNegate(x) );
        else
          return (false && this.isNegate(x) );
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
    ends_with : function(x,a,b)
    {
      "use strict";
      try {
        var prop = this.evalProperty(a);
        if (prop.match(this.valueDataType(prop, b)+"$"))
          return (true && this.isNegate(x) );
        else
          return (false && this.isNegate(x) );
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
    between: function(x,a,b,c)
    {
      "use strict";
      try {
        var prop = this.evalProperty(a);
        return prop >= this.valueDataType(prop, b) && a <= this.valueDataType(prop, c)  && this.isNegate(x) ;
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
    regex :  function(x,a,b)
    {
      "use strict";
      try {
        var prop = this.evalProperty(a);
        regexp = new RegExp(b, 'gi');
        return ( regexp.test(prop) && this.isNegate(x) ) ;
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

