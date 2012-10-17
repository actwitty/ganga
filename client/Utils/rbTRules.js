var rbTRules = {


  ruleTable : {}, 

  sample_json : [
        {
          name  : "sample_name", 
          event : "sample_event",
          action: {
                  handler : {
                      "id"    : "action id",
                      "name"  : "name of action",
                      "params": {},
                  },
          },
          rules : [
                // event based condition
                { 
                  property : "",
                  operator : "contains",
                  value    : "83.samarth@gmail.com",
                  connect  : "end", 
                },
                // actor_property based condition
                {
                  property : "$83.samarth@gmail.com",
                  operator : "contains",
                  value    : "83.samarth@gmail.com",
                  connect  : "end", 
                },
                // system_property based condition
                {
                  property : "#83.samarth@gmail.com",
                  operator : "contains",
                  value    : "83.samarth@gmail.com",
                  connect  : "end", 
                },
              ],
        },
  ],
  
  /**
  * Initialize Rules for business
  * @return void
  */
  init : function()
  {
    try {
          rbtServerChannel.makeEventRequest(event, 
                                          rbtServerChannel.url.getRules,
                                          params,
                                          { success: rbTServerResponse.setRulesTable,
                                            error  : rbtServerResponse.defaultError
                                          });
        } catch(e) {
          // FIXME what to do?
          rbTApp.reportError({"exception" : e.message, "message":"rule initialization failed"});
        }
  },
  

  /**
  * Set rules table for business
  * @return void
  */
  setRulesTable : function(rules)
  {
    rules = rbTRules.sample_json;
    var ruleString = "";


    function ruleConnect(rule)
    {
      if (rule.connect) {
        if (rule.connect === "and")
          return "&& ";
        else if (rule.connect === "or")
          return "|| ";
        else 
          return " ";
      } else 
        return " ";
    }

    function ruleParams(rule)
    {
      if (rule.value2)
        var params = "('"+rule.property+"','"+rule.value+"','"+ rule.value2+"')";
      else
        var params = "('"+rule.property+"','"+rule.value+"')";  

      return params;
    }

    try {
        jQuery.each(rules, function(index, ruleList) {
          ruleString = " ";
          for (rule in ruleList.rules) {
            ruleString = ruleString + "rbTRules.rule." + ruleList.rules[rule].operator + 
                    ruleParams(ruleList.rules[rule]) + ruleConnect(ruleList.rules[rule]);
          }

          rbTRules.ruleTable[ruleList.event] = { "name"       : ruleList.name,
                                             "ruleString" : ruleString,
          };
        });
    } catch (e) {
      rbTApp.reportError({"exception" : e.message,
                          "message"   : "rule table setting failed",
                          "rules"     : rules
                        });
    }

  },

  /**
  * Execute rules table for particular events
  * @param (string) event The event for which we need to check rules.
  * @return void
  */
  executeRulesOnEvent : function(event)
  {
    function prepareFunctionCode(ruleString) 
    {
      return 'if (' + ruleString + ') { return true; } else { return false;}';
    }

    try {
          var functionCode = prepareFunctionCode(rbTRules.ruleTable[event].ruleString);
          var ruleExecute = new Function(functionCode)();
    } catch (e) {
      rbTApp.reportError({"exception" : e.message,
                          "message":"rule execution on event failed" , 
                          "event_name" : event});
    } 
  },
  
  /**
  *   Execute rules table for particular events
  *   @param (string) property The property for which we need to operate upon
  *   @param (string) value The value for which we need to operate upon
  *   @return (object) value Converted value based on property data type
  */
  valueDataType : function(property, value)
  {
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
        rbTApp.reportError({"exception" : e.message,
                            "message":"data type conversion on rule value failed" , 
                            "property" : property,
                            "value" : value,
                           });
    }
  },

    

  /* RULE FUNCTIONS */
  rule : 
  {
    /**
    * Rule to check for less than
    * @param {string} a Rule property
    * @param {string} b Rule value
    * 
    * @return {boolean} Validity based on rule
    */ 
    lt : function(a, b)
    {
      console.log("********************"); 
      try {
        return a < rbTRules.valueDataType(a, b);
      } catch(e) {
        rbTApp.reportError({"exception" : e.message,
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
    gt : function(a, b)
    {
      console.log("********************");
      try {
        return a > rbTRules.valueDataType(a, b);
      } catch(e) {
        rbTApp.reportError({"exception" : e.message,
                            "message":"rule evaluation on gt failed" , 
                            "property" : a,
                            "value"    : b
                           });
      }
    },

    /**
    * Rule to check for not equal to condition
    * @param {string} a Rule property
    * @param {string} b Rule value
    * 
    * @return {boolean} Validity based on rule
    */ 
    not_equal_to : function(a, b)
    {
      console.log("********************"); 
      try {
        if (a !== rbTRules.valueDataType(a, b) )
          return true;
        else
          return false;
      } catch(e) {
        rbTApp.reportError({"exception" : e.message,
                            "message":"rule evaluation on not_equal_to failed" , 
                            "property" : a,
                            "value"    : b
                           });
            
      }
    },

    /**
    * Rule to check for equal to
    * @param {string} a Rule property
    * @param {string} b Rule value
    * 
    * @return {boolean} Validity based on rule
    */ 
    equal_to : function(a, b)
    {
      console.log("********************");
      try {
        return (a === rbTRules.valueDataType(a, b));
      } catch(e) {
        rbTApp.reportError({"exception" : e.message,
                            "message":"rule evaluation on equal_to failed" , 
                            "property" : a,
                            "value"    : b
                           });
      }
    },

    /**
    * Rule to check for contains
    * @param {string} a Rule property
    * @param {string} b Rule value
    * 
    * @return {boolean} Validity based on rule
    */ 
    contains : function(a, b)
    {
      console.log("********************");
      try {
        if (a.indexOf(rbTRules.valueDataType(a, b)) >= 0 )
          return true;
        else
          return false;
      } catch(e) {
        rbTApp.reportError({"exception" : e.message,
                            "message":"rule evaluation on contains failed" , 
                            "property" : a,
                            "value"    : b
                           });
      }
    },

    /**
    * Rule to check for starts with condition
    * @param {string} a Rule property
    * @param {string} b Rule value
    * 
    * @return {boolean} Validity based on rule
    */ 
    starts_with : function(a, b)
    {
      console.log("********************");
      try {
        if (a.match("^"+rbTRules.valueDataType(a, b)))
          return true;
        else
          return false;
      } catch(e) {
        rbTApp.reportError({"exception" : e.message,
                            "message":"rule evaluation on starts_with failed" , 
                            "property" : a,
                            "value"    : b
                           });
        
      }
    },

    /**
    * Rule to check for ends with condition
    * @param {string} a Rule property
    * @param {string} b Rule value
    * 
    * @return {boolean} Validity based on rule
    */ 
    ends_with : function(a, b)
    {
      console.log("********************");
      try {
        if (a.match(rbTRules.valueDataType(a, b)+"$"))
          return true;
        else
          return false;
      } catch(e) {
        rbTApp.reportError({"exception" : e.message,
                            "message"   :"rule evaluation on ends_with failed" , 
                            "property"  : a,
                            "value"     : b
                           });
      }
    },

    /**
    * Rule to check for in between range
    * @param {string} a Rule property
    * @param {string} b Rule value
    * @param {string} c Rule value2
    * @return {boolean} Validity based on rule
    */ 
    between: function(a, b, c)
    {
      console.log("********************");
      try {
        return a >= rbTRules.valueDataType(a, b) && a <= rbTRules.valueDataType(a, c);
      } catch(e) {
        rbTApp.reportError({"exception" : e.message,
                            "message"   :"rule evaluation on between failed" , 
                            "property"  : a,
                            "value"     : b,
                            "value2"    : c
                           });
      }
    },

    /**
    * Rule to check for regex condition
    * @param {string} a Rule property
    * @param {string} b Rule value
    * @param {string} c Rule value2
    * @return {boolean} Validity based on rule
    */ 
    regex :  function(a, b)
    {
      console.log("********************");
      try {
        regexp = new RegExp(b, 'gi');
        return regexp.test(a);
      } catch (e) {
        rbTApp.reportError({"exception" : e.message,
                            "message"   :"rule evaluation on regex failed" , 
                            "property"  : a,
                            "value"     : b
                           });
      }
    },


  },

};

