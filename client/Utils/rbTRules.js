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
    try {
        jQuery.each(rules, function(index, ruleList) {
          if (!trigger_fish.rbTRules.ruleTable[ruleList.event])
            trigger_fish.rbTRules.ruleTable[ruleList.event] = [];
          var conditions = [];
          for (var rule in ruleList.conditions) {
            ruleList.conditions[rule].event = ruleList.event; // FIXME ::
            conditions.push(ruleList.conditions[rule]);
          }
          trigger_fish.rbTRules.ruleTable[ruleList.event].push({ "name"         : ruleList.name,
                                                                 "action"       : ruleList.action,
                                                                 "action_param" : ruleList.action_param,
                                                                 "conditions"   : conditions
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
    // Client will not execute any rules if there is no schema set. 
    var appData = trigger_fish.rbTAPP.getAppDetail();
    var that=this;
    if (!appData.app.schema) {
      trigger_fish.rbTDebug.log({"message":"There is no schema set for app, cannot execute rules"});
      return;
    }
    try {
          jQuery.each(this.ruleTable[event], function(index, rule) {
            var conditionCount = rule.conditions.length;
            var isRuleValid = true;
            for(var i = 0; i < conditionCount ; i++) {
              if (!that.evalRule(rule.conditions[i])) {
                isRuleValid = false;
                break;
              }
            } 
            if (isRuleValid) {
              trigger_fish.rbTAPP.log({"message":"++ALL CONDITIONS PASSED++","rule":rule});
              that.invokeAction(rule);
            } else {
              trigger_fish.rbTAPP.log({"message":"**ALL CONDITIONS FAILED**","rule":rule});
            }  
          });
          
    } catch (e) {
      trigger_fish.rbTAPP.reportError({"exception"  : e.message,
                                       "message"    : "rule execution on event failed" , 
                                       "event_name" : event,
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
      var lastEvent = trigger_fish.rbTStore.get("lastevent");
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
  * Check the data type of object
  * @param {string} rule propertry
  * @return {string} datatype of the object.
  */  
  getDataType : function(event,ruleProp,scope,json)
  {
    // FIXME :: WE NEED TO CHANGE THIS TO GET IT FROM SCHEMA
    return json.type || undefined;
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
    var validProp = true;

    function findprop(obj,path) {
      var args=path.split('.'), l=args.length;
      for (var i=0;i<l;i++) {
        if (!obj.hasOwnProperty(args[i]) )
            return undefined;
        obj=obj[ args[i] ];
      }
      return obj; 
    }

    try {
      if (ruleJson.scope === "a") {
        value = findprop(trigger_fish.rbTActor.getProperties(),p).slice(-1)[0];
      } else if (ruleJson.scope === "s") {
        value = findprop(trigger_fish.rbTSystemVar.getProperty(),p);
      } else if (ruleJson.scope === "e") {
        value = findprop(trigger_fish.rbTAPP.getTransVar(ruleJson.event),p);
      }
    } catch (e) {
      validProp = false;
    } 

    if (!validProp || !value) {
      trigger_fish.rbTAPP.log({"message":"Not a valid property to evaluate rule on"});
      return false;
    }
    
    var type = this.getDataType(ruleJson.event, ruleJson.property, ruleJson.scope, ruleJson);
    if (!type)
        return value;

    return this.valueDataType(ruleJson.property, value, type);

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
    if (ruleJson.type === "set") 
      return true;

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
    var ruleJson = typeof rule === "object" ? rule :ruleJSON.parse(rule);
    try {
      
      trigger_fish.rbTAPP.log({"message":"for rule condition","rule":ruleJson}); 
      var res = false;

      if (!this.isValidRule(ruleJson) || !this.rule.hasOwnProperty(ruleJson.operation))
          return res;

      var propDT = this.getDataType(ruleJson.event, ruleJson.property, ruleJson.scope, ruleJson),f
          p = this.evalProperty(ruleJson),
          a = this.valueDataType(ruleJson.property, ruleJson.value1, propDT),
          b = this.valueDataType(ruleJson.property, ruleJson.value2, propDT);

      res = this.rule[ruleJson.operation](p,a,b);
      
      return (ruleJson.negation === "true") ? !res : res;

    } catch (e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                                       "message"   :"rule evaluation on"+ ruleJson.operation +" failed" , 
                                       "rule"      : ruleJson,
                                      });
      return false;
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