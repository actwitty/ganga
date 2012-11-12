var TEST_RBT_RULE_JSON = {
                            "customer":{
                                        "name" :"samarth",
                                        "email":"gmail.com",
                                        "val1":123,
                                        "val2":321,
                                        "swh":"actwitty",
                                        "ewh":"actwitty",
                                        "cns":"actwitty",
                                        "drg":"3/3/2011",
                                        "rgx":"deosamarth",
                                        "set":"abc",
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
      rbTDebug.log({"message":"There is no schema set for app, cannot execute rules"});
      return;
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
    var value = eval("TEST_RBT_RULE_JSON."+p);
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
     FIXME :: MERGE ALL IN ONE FUNCTION WITH CONDITION TO SAVE SPACE
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
        if (!trigger_fish.rbTRules.isValidRule(t,"ltn",a,b))
          return false;
        var res = false;
        var prop = trigger_fish.rbTRules.evalProperty(a);
        res = ((prop < trigger_fish.rbTRules.valueDataType(prop, b)) || trigger_fish.rbTRules.isNegate(x) );
        return (x === "true") ? !res : res;
      } catch(e) {
        trigger_fish.rbTAPP.reportError({"exception" : e.message,
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
        if (!trigger_fish.rbTRules.isValidRule(t,"gtn",a,b))
          return false;
        var res = false;
        var prop = trigger_fish.rbTRules.evalProperty(a);
        res = ((prop > trigger_fish.rbTRules.valueDataType(prop, b)) || trigger_fish.rbTRules.isNegate(x) );
        return (x === "true") ? !res : res;
      } catch(e) {
        trigger_fish.rbTAPP.reportError({"exception" : e.message,
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
        if (!trigger_fish.rbTRules.isValidRule(t,"eql",a,b))
          return false;
        var res = false;
        var prop = trigger_fish.rbTRules.evalProperty(a);
        res =  ((prop === trigger_fish.rbTRules.valueDataType(prop, b)) || trigger_fish.rbTRules.isNegate(x) );
        return (x === "true") ? !res : res; 
      } catch(e) {
        trigger_fish.rbTAPP.reportError({"exception" : e.message,
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
        if (!trigger_fish.rbTRules.isValidRule(t,"cns",a,b))
          return false;
        var prop = trigger_fish.rbTRules.evalProperty(a);
        var res;
        if (prop.indexOf(trigger_fish.rbTRules.valueDataType(prop, b)) >= 0 )
          res = true;
        else
          res = false;
        return (x === "true") ? !res : res; 
      } catch(e) {
        trigger_fish.rbTAPP.reportError({"exception" : e.message,
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
        if (!trigger_fish.rbTRules.isValidRule(t,"swh",a,b))
          return false;
        var res = false;
        var prop = trigger_fish.rbTRules.evalProperty(a);
        if (prop.match("^"+trigger_fish.rbTRules.valueDataType(prop, b)))
          res = true;
        else
          res = false;
        return (x === "true") ? !res : res;
      } catch(e) {
        trigger_fish.rbTAPP.reportError({"exception" : e.message,
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
        if (!trigger_fish.rbTRules.isValidRule(t,"ewh",a,b))
          return false;
        var prop = trigger_fish.rbTRules.evalProperty(a);
        var res;
        if (prop.match(trigger_fish.rbTRules.valueDataType(prop, b)+"$"))
          res = true;
        else
          res = false;
        return (x === "true") ? !res : res;
      } catch(e) {
        trigger_fish.rbTAPP.reportError({"exception" : e.message,
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
        if (!trigger_fish.rbTRules.isValidRule(t,"btn",a,b,c))
          return false;
        var prop = trigger_fish.rbTRules.evalProperty(a);
        var res;
        res = (prop >= trigger_fish.rbTRules.valueDataType(prop, b) && a <= trigger_fish.rbTRules.valueDataType(prop, c)) ;
        return (x === "true") ? !res : res;
      } catch(e) {
        trigger_fish.rbTAPP.reportError({"exception" : e.message,
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
        if (!trigger_fish.rbTRules.isValidRule(t,"rgx",a,b))
          return false;
        var prop = trigger_fish.rbTRules.evalProperty(a);
        var regexp = new RegExp(b, 'gi');
        var res = regexp.test(prop);
        return (x === "true") ? !res : res;
      } catch (e) {
        trigger_fish.rbTAPP.reportError({"exception" : e.message,
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
        if (!trigger_fish.rbTRules.isValidRule(t,"dag",a,b))
          return false;
        var prop = trigger_fish.rbTRules.evalProperty(a);
        var regexp = new RegExp(b, 'gi');
        var res = regexp.test(prop) ;
        return (x === "true") ? !res : res;
      } catch (e) {
        trigger_fish.rbTAPP.reportError({"exception" : e.message,
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
        if (!trigger_fish.rbTRules.isValidRule(t,"drg",a,b,c))
          return false;
        var prop = trigger_fish.rbTRules.evalProperty(a,t);
        var res = (prop >= trigger_fish.rbTRules.valueDataType(prop, b) && prop <= trigger_fish.rbTRules.valueDataType(prop, c));
        return (x === "true") ? !res : res;
      } catch (e) {
        trigger_fish.rbTAPP.reportError({"exception" : e.message,
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
        var prop = trigger_fish.rbTRules.evalProperty(a);
        var res = (prop ? true:false);
        return (x === "true") ? !res : res;
      } catch (e) {
        trigger_fish.rbTAPP.reportError({"exception" : e.message,
                            "message"   :"rule evaluation on is set" , 
                            "property"  : a,
                           });
      }
    }
  }

};