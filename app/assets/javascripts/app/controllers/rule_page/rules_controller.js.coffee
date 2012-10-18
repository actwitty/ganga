App.RulesController = Ember.ArrayController.extend(
  content: []
  # category_choices: [
  #   category: "Current URL"
  #   type: "string"
  # ,
  #   category: "Referring URL"
  #   type: "string"
  # ,
  #   category: "Visitors Type"
  #   type: "integer"
  # ,
  #   category: "Searching Keywords"
  #   type: "string"
  # ,
  #   category: "Refferal Type"
  #   type: "integer"
  # ,
  #   category: "Operating System"
  #   type: "integer"
  # ]
  
  # # Fill the Other Category  for further Expansion 
  # # actually It shouls be GET JSON From Server not from here
  # ruleData: [
  #   category: "Current URL"
  #   type: "string"
  #   operator: "equal to"
  #   value: "ddd"
  # ,
  #   category: "Visitors Type"
  #   type: "string"
  #   operator: "not equal to"
  #   value: "kkk"
  # ]
  # operators: {}
  # defaultValues: {}
  # hasRule: true
  
  # #init function for loading comparator and defaults
  # init: ->
  #   @_super()

  #   self = this
  #   self.set "content", []
    
  #   # below Code should be Enable to get the value from Server
  #   #$.getJSON("/rules/category", function(data) {
  #   #  console.log(JSON.stringify(data));
  #   #  self.set('fields', data);
  #   # });
  #   self.loadOperators()
  #   self.loadDefaultsValues()
  #   #self.loadCategories()
  #   #self.loadRuleData()


  #   self.set "content", []

  # loadOperators: ->
  
  #   self = this
  #   self.set "operators", App.Constants.Comparators

  # loadDefaultsValues: ->

  #   self = this
  #   self.set "defaultValues", App.Constants.Defaults
    

  # # function for creating each model object
  # addNewCategory: ->

  #   self = this
  #   rule = App.Rule.create(self.category_choices[0])
  #   comps = self.get("operators")
  #   defs = self.get("defaultValues")
  #   rule.setOperatorChoices comps[rule.type]
  #   rule.setDefaultsValues defs[rule.type]
  #   rule.setCategoryChoices self.get("category_choices")
  #   rule.setOperator comps[rule.type][0]["tag"]
  #   rule.setOperator comps[rule.type][0]["tag"]

  #   rule.setDefaultsValues ""
  #   rule.setifCompTextBox false
  #   rule.setifValueTextBox true
  #   rule.setConnect "OR"
  #   self.set "hasRule", true
    
  #   self.pushObject rule

  
  # # function for if value field is textbox or selective options
  # ifValueTextBoxReuired: (ruleObject, value) ->
  #   ruleObject.set "ifValueTextBox", true  if value is "username"
  #   ruleObject.set "ifValueTextBox", false  if value is "date"

  
  # # function for if comparator field is textbox or selective options
  # ifComparatorTextBoxReuired: (ruleObject, value) ->

  
  # #function for load the preset rule from the server and create the model objects f
  # #each rule
  # loadAPresetRule: ->

  #   self = this
  #   m = 0
  #   comps = self.get("operators")
    
  #   # return $.getJSON("/rules/editRule", function(data) {
  #   self.set "content", []
  #   $(self.get("ruleData")).each (index, value) ->
  #     rule = App.Rule.create(value)
  #     connecttemp = rule.get("connect")
  #     if connecttemp is "OR"
  #       rule.set "orSelected", true
  #       rule.set "andSelected", false
  #     else if connecttemp is "AND"
  #       rule.set "andSelected", true
  #       rule.set "orSelected", false
  #     rule.setOperatorChoices comps[rule.type]
  #     rule.setCategoryChoices self.get("category_choices")
      
  #     #category.setDefaults( this.defaults[category.type])
  #     self.pushObject rule


  
  # #});
  
  # # function for if user changing the category field from view
  # selectedFieldChange: (ruleObject, type, value) ->

  #   self = this
  #   valueTextBox = self.ifValueTextBoxReuired(ruleObject, value)
  #   compTextBox = self.ifComparatorTextBoxReuired(ruleObject, value)

    
  #   ruleObject.setCategoryChoices self.get("category_choices")
    
  #   comps = self.get("operators")
  #   defs = self.get("defaultValues")
  #   ruleObject.set "type", type
  #   ruleObject.set "category", value
  #   ruleObject.set "value", ""
  #   ruleObject.setOperatorChoices comps[type]
  #   ruleObject.set "operator" , comps[type][0]["tag"]

  #   ruleObject.setDefaultsValues defs[type]

  
  # #function for if user is chainging the comparator field from view
  # selectedComparatorChange: (ruleObject, comparator) ->
    
  #   #
  #   #
  #   # 
  #   type = ruleObject.get("type")
   
  #   ruleObject.setOperatorChoices @operators[type]
  #   ruleObject.set "operator", comparator

  
  # #function for deleting the rule from view
  # deleteRuleCategory: (ruleObject) ->
 
  #   self = this
  #   self.removeObject ruleObject
  #   noOfObj = (self.content.length)
  #   self.set "hasRule", false  if self.content.length is 0

  
  # #function for if OR from OR/AND selected in rule view for that particular view 
  # selectedOr: (ruleObject, value) ->

  #   self = this
  #   ruleObject.set "connect", value
  #   ruleObject.set "orSelected", true
  #   ruleObject.set "andSelected", false
   

  
  # #function for if AND from OR/AND selected in rule view for that particular view 
  # selectedAnd: (ruleObject, value) ->
  
  #   self = this
  #   ruleObject.set "connect", value
  #   ruleObject.set "orSelected", false
  #   ruleObject.set "andSelected", true
  

  
 
  
  # #function to send the ruleset to Server
  # submitRule: ->
  #   ruleData = @content
  #   sendData = []
  #   i = 0

  #   while i < ruleData.length
  #     data = {}
  #     data["category"] = encodeURIComponent(ruleData[i]["category"])
  #     data["type"] = encodeURIComponent(ruleData[i]["type"])
  #     data["comp"] = encodeURIComponent(ruleData[i]["operator"])
  #     data["defaults"] = encodeURIComponent(ruleData[i]["value"])
  #     data["connect"] = ruleData[i]["connect"]  if ruleData[i]["connect"]?
  #     sendData.push data
  #     i++
  #   $.ajax
  #     type: "POST"
  #     url: "/submitRule"
  #     dataType: "json"
  #     data:
  #       rule: sendData
  #       authenticity_token: App.AUTH_TOKEN

  #     success: (data) ->
  #       if data
  #          App.log App.DBG, "Rule Submitted "
  #         App.get("router").send "ruleSubmittedSuccess"

)