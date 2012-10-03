App.RulesController = Ember.ArrayController.extend(
  content: []
  fields: [
    category: "Current URL"
    type: "string"
  ,
    category: "Referring URL"
    type: "string"
  ,
    category: "Visitors Type"
    type: "integer"
  ,
    category: "Searching Keywords"
    type: "string"
  ,
    category: "Refferal Type"
    type: "integer"
  ,
    category: "Operating System"
    type: "integer"
  ]
  
  # Fill the Other Category  for further Expansion 
  # actually It shouls be GET JSON From Server not from here
  ruleData: [
    category: "Current URL"
    type: "string"
    comp: "equal to"
    defaults: "ddd"
  ,
    category: "Visitors Type"
    type: "string"
    comp: "not equal to"
    defaults: "kkk"
  ]
  comparators: {}
  defaults: {}
  hasRule: true
  
  #init function for loading comparator and defaults
  init: ->
    @_super()

    self = this
    self.set "content", []
    
    # below Code should be Enable to get the value from Server
    #$.getJSON("/rules/category", function(data) {
    #  console.log(JSON.stringify(data));
    #  self.set('fields', data);
    # });
    self.loadComparators()
    self.loadDefaults()
    self.set "content", []

  loadComparators: ->
  
    self = this
    self.set "comparators", App.Constants.Comparators

  loadDefaults: ->

    self = this
    self.set "defaults", App.Constants.Defaults

  
  # function for creating each model object
  addNewCategory: ->

    self = this
    console.log self.fields
    rule = App.Rule.create(self.fields[0])
    comps = self.get("comparators")
    defs = self.get("defaults")
    console.log JSON.stringify(rule)
    rule.setComparators comps[rule.type]
    rule.setDefaults defs[rule.type]
    rule.setFields self.get("fields")
    rule.setComp comps[rule.type][0]["tag"]
    rule.setdefault ""
    rule.setifCompTextBox false
    rule.setifValueTextBox true
    rule.setConnect "OR"
    self.set "hasRule", true
    
    #  console.log("Amartya "+ comps[rule.type].[0]+ " Das");
    self.pushObject rule
    console.log JSON.stringify(self.get("content"))

  
  # function for if value field is textbox or selective options
  ifValueTextBoxReuired: (ruleObject, value) ->
    console.log "Inside ifValueTextBoxReuired "
    console.log "Amartya Text Category" + value
    ruleObject.set "ifValueTextBox", true  if value is "username"
    ruleObject.set "ifValueTextBox", false  if value is "date"

  
  # function for if comparator field is textbox or selective options
  ifComparatorTextBoxReuired: (ruleObject, value) ->
    console.log "Inside ifComparatorTextBoxReuired"

  
  #function for load the preset rule from the server and create the model objects f
  #each rule
  loadAPresetRule: ->

    self = this
    m = 0
    comps = self.get("comparators")
    
    # return $.getJSON("/rules/editRule", function(data) {
    self.set "content", []
    $(self.get("ruleData")).each (index, value) ->
      rule = App.Rule.create(value)
      connecttemp = rule.get("connect")
      if connecttemp is "OR"
        rule.set "orSelected", true
        rule.set "andSelected", false
      else if connecttemp is "AND"
        rule.set "andSelected", true
        rule.set "orSelected", false
      rule.setComparators comps[rule.type]
      rule.setFields self.get("fields")
      
      #category.setDefaults( this.defaults[category.type])
      self.pushObject rule
      console.log "*********LOAD**********"
      console.log "loadAPresetRule"


  
  #});
  
  # function for if user changing the category field from view
  selectedFieldChange: (ruleObject, type, value) ->

    self = this
    valueTextBox = self.ifValueTextBoxReuired(ruleObject, value)
    compTextBox = self.ifComparatorTextBoxReuired(ruleObject, value)

    found = 0
    i = 0
    while i < self.fields.length
      if self.fields[i]["category"] is value
        temp = self.fields[i]
        self.fields[i] = self.fields[0]
        self.fields[0] = temp
        found = 1
        break
      i++
    ruleObject.setFields self.get("fields")
    if found is 1
      temp = self.fields[0]
      self.fields[0] = self.fields[i]
      self.fields[i] = temp
    console.log "Amartya_fields_length :" + self.fields.length
    console.log "Amartya_Text " + valueTextBox
    comps = self.get("comparators")
    defs = self.get("defaults")
    ruleObject.set "type", type
    ruleObject.set "category", value
    ruleObject.set "defaults", ""
    value2 = ruleObject.get("defaults")
    ruleObject.set comps[type][0]["tag"]
    ruleObject.setComparators comps[type]
    console.log "*********************"
    console.log comps[type][0]["tag"]
    ruleObject.setDefaults defs[type]

  
  #function for if user is chainging the comparator field from view
  selectedComparatorChange: (ruleObject, comparator) ->
    
    #
    #
    # 
    type = ruleObject.get("type")
   
    found = 0
    ruleObject.setComparators @comparators[type]
    ruleObject.set "comp", comparator

  
  #function for deleting the rule from view
  deleteRuleCategory: (ruleObject) ->
 
    self = this
    console.log "Inside deleteRuleCategory"
    self.removeObject ruleObject
    noOfObj = (self.content.length)
    console.log "No of Rules = " + noOfObj
    self.set "hasRule", false  if self.content.length is 0

  
  #function for if OR from OR/AND selected in rule view for that particular view 
  selectedOr: (ruleObject, value) ->

    self = this
    console.log "Inside selectedOr"
    ruleObject.set "connect", value
    ruleObject.set "orSelected", true
    ruleObject.set "andSelected", false
    console.log ruleObject.get("orSelected")
   

  
  #function for if AND from OR/AND selected in rule view for that particular view 
  selectedAnd: (ruleObject, value) ->
  
    self = this
    console.log "Inside selectedAnd"
    ruleObject.set "connect", value
    ruleObject.set "orSelected", false
    ruleObject.set "andSelected", true
  

  
 
  
  #function to send the ruleset to Server
  submitRule: ->
    ruleData = @content
    sendData = []
    console.log JSON.stringify(ruleData)
    i = 0

    while i < ruleData.length
      data = {}
      data["category"] = encodeURIComponent(ruleData[i]["category"])
      data["type"] = encodeURIComponent(ruleData[i]["type"])
      data["comp"] = encodeURIComponent(ruleData[i]["comp"])
      data["defaults"] = encodeURIComponent(ruleData[i]["defaults"])
      data["connect"] = ruleData[i]["connect"]  if ruleData[i]["connect"]?
      sendData.push data
      i++
    console.log "Sending Rule"
    console.log JSON.stringify(sendData)
    $.ajax
      type: "POST"
      url: "/submitRule"
      dataType: "json"
      data:
        rule: sendData
        authenticity_token: App.AUTH_TOKEN

      success: (data) ->
        if data
          console.log "success"
          App.get("router").send "ruleSubmittedSuccess"

)