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
    function ruleParams(rule,event)
    {
      //return "('"+JSON.stringify(rule)+",'"+event+"')";
      rule.event = event;
      return "('"+JSON.stringify(rule)+"')";
    }

    try {
        jQuery.each(rules, function(index, ruleList) {
          if (!trigger_fish.rbTRules.ruleTable[ruleList.event])
            trigger_fish.rbTRules.ruleTable[ruleList.event] = [];
          ruleString = " ";
          for (var rule in ruleList.conditions) {
            ruleString = ruleString + "trigger_fish.rbTRules.evalRule" + 
                         ruleParams(ruleList.conditions[rule],ruleList.event) + 
                         ruleConnect(ruleList.conditions[rule]);
          }
          trigger_fish.rbTRules.ruleTable[ruleList.event].push({ "name"         : ruleList.name,
                                                                 "ruleString"   : ruleString,
                                                                 "action"       : ruleList.action,
                                                                 "action_param" : ruleList.action_param
                                                               });                                                  

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
    function prepareFunctionCode(ruleString) 
    {
      $("#rulestring").append('<h3>'+ruleString+'</h3>');
      return 'if (' + ruleString + ') { return true; } else { return false;}';
    }
    // Client will not execute any rules if there is no schema set. 
    var appData = trigger_fish.rbTAPP.getAppDetail();
    if (!appData.app.schema) {
      trigger_fish.rbTDebug.log({"message":"There is no schema set for app, cannot execute rules"});
      return;
    }
    try {
          var that=this;
          jQuery.each(this.ruleTable[event], function(index, rule) {
            var functionCode = prepareFunctionCode(rule.ruleString);
            var isRuleValid = new Function(functionCode)();
            if (isRuleValid) {
              trigger_fish.rbTAPP.log({"message":"++ALL CONDITIONS PASSED++","rule":rule});
              that.invokeAction(rule);
            } else {
              trigger_fish.rbTAPP.log({"message":"**ALL CONDITIONS FAILED**","rule":rule});
            }  
          });
          
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
  * Invoke the action on rule.
  * @param {object} rule The rule for which we need to invoke action
  * @return void
  */
  invokeAction : function(rule)
  {
    try {
      // Hand over action to templating engine for processing event action.
      trigger_fish.rbT.invokeActionScript(rule.action);
    } catch(e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
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
    return (x === "true") ? true : false; 
  },

  /**
  * Check the data type of object
  * @param {string} rule propertry
  * @return {string} datatype of the object.
  */  
  getDataType : function(event,ruleProp,scope,json)
  {
    return json.type || undefined;
    /* 
    // FIXME :: WE NEED TO CHANGE THIS TO GET IT FROM SCHEMA
    //return Object.prototype.toString.call(a).split("]")[0].split(" ")[1];
    var appSchema = trigger_fish.rbTAPP.getAppDetail().app.schema;

    if (scope === "e") {
      return appSchema.events[event][ruleProp];
    } else if (scope === "s") {
      return appSchema.system[ruleProp];
    } else if (scope === "a") {
      return appSchema.profile[ruleProp];
    }
    */

  },

  /**
  * FIXME : enable this with new json format (based on scope property)
  * Evaluate property value to a suitable sys or user property
  * @param {string} ruleProperty For which we need to evaluate data type
  * @param {string} type Datatype of the property
  * @param {string} scope Scope of the property, to which we need to look for.
  * @return {object} or {boolean}
  */
  //evalProperty : function(ruleProperty, type, scope)
  evalProperty : function(ruleJson)
  {
    if (!ruleJson.property)
      return "";
 
    var p = ruleJson.property.replace(/]/g,"").replace(/\[/g,".");
    var value = null;

    var validProp = 1;
    try {
      if (ruleJson.scope === "a") {
        var actorProp = trigger_fish.rbTActor.getProperties();
        value = eval("actorProp."+p+".slice(-1)[0]");
      } else if (ruleJson.scope === "s") {
        var systemVars = trigger_fish.rbTSystemVar.getProperty();
        value = eval("systemVars."+p);
      } else if (ruleJson.scope === "e") {
        var transVar = trigger_fish.rbTAPP.getTransVar(); 
        value = eval("transVar."+p); 
      }
    } catch (e) {
      validProp = 0;
    } 

    if (!validProp || !value) {
      trigger_fish.rbTAPP.log({"message":"Not a valid property to evaluate rule on"});
      return false;
    }
    
    var type = this.getDataType(ruleJson.event, ruleJson.property, ruleJson.scope, ruleJson);
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
  *   Execute rules table for particular events
  *   @param {string} property The property for which we need to operate upon
  *   @param {string} value The value for which we need to operate upon
  *   @return {object} value Converted value based on property data type
  */
  valueDataType : function(property, value, dataType)
  {
    "use strict";
    // We are expecting only 3 types i.e string or number or date
    // ******FIXME : WE NEED TO GET THE DATA TYPES FROM APP SCHEMA********
    if (!value || !property)
      return undefined;
    var dt = dataType;
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
  * Check the validity of the rule based on permitted operations on data type
  * @param {object} ruleJson. Type of condition.
  * @return boolean validity
  */
  isValidRule : function(ruleJson )
  {
    if (!ruleJson.property) 
      return false;
    if (ruleJson.type ==="set") 
      return true;
    //var propVal = this.evalProperty(ruleJson.property,ruleJson.type,ruleJson.scope);
    var propVal = this.evalProperty(ruleJson);
    if (!propVal)
      return false;
    var propDT = this.getDataType(ruleJson.event, ruleJson.property, ruleJson.scope, ruleJson);
       

    var v1DT = Object.prototype.toString.call(ruleJson.value1).split("]")[0].split(" ")[1];
    if (ruleJson.value2)
      var v2DT = Object.prototype.toString.call(ruleJson.value2).split("]")[0].split(" ")[1];

    var v2DT = v2DT || v1DT;

    if (!this.permissions[propDT] || this.permissions[propDT].indexOf(ruleJson.operation) < 0)
      return false;
    
    if (propDT === "String" && (v1DT!==propDT || v2DT!==propDT)) {
      return false;
    } else if (propDT === "Number" && (parseFloat(ruleJson.value1) === "NaN" || (ruleJson.value2 && parseFloat(ruleJson.value2) === "NaN"))) {
      return false;
    } else if (propDT === "Date") {
      var v1Date = new Date(ruleJson.value2);
      if (ruleJson.value2)
        var v2Date = new Date(ruleJson.value2);
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
      
      trigger_fish.rbTAPP.log({"message":"for rule condition","rule":ruleJson}); 

      if (!trigger_fish.rbTRules.isValidRule(ruleJson))
          return false;
      var res = false;
      var propDT = this.getDataType(ruleJson.event, ruleJson.property, ruleJson.scope, ruleJson);
      var p = trigger_fish.rbTRules.evalProperty(ruleJson),
          a = trigger_fish.rbTRules.valueDataType(ruleJson.property, ruleJson.value1, propDT),
          b = trigger_fish.rbTRules.valueDataType(ruleJson.property, ruleJson.value2, propDT);

      // FIXME :: we can coalesce this but will we lost datatype?
      switch(ruleJson.operation) {
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
      return (ruleJson.negation === "true") ? !res : res;
    } catch (e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                                       "message"   :"rule evaluation on"+ ruleJson.operation +" failed" , 
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