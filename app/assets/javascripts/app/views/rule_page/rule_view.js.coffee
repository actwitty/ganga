App.RuleView = Ember.View.extend(
  templateName: "rule_page/rule"
  
  #indexParent: null,   
  focusOut: (evt) ->
    console.log "-------------------"
    console.log @get("content")
    defaults = @get("content.defaults")
    console.log "-------------------"
    console.log @get("context").get("content")
    console.log "-------------------"
    console.log "-------------------"
    console.log "focusout"
    console.log evt
    emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    if emailReg.test(defaults)
      console.log "Test pass"
    else
      console.log "Test fail"

  deleteRule: (event) ->
    modelObject = event.context
    App.router.rulesController.deleteRuleCategory modelObject

  selectedOr: (event) ->
    
    #var modelObject = event.context;
    target = event.target or event.srcElement
    console.log event
    orClass = $(target).find("className:or")
    name = orClass.attr("className")
    
    # console.log("className" + name);
    modelObject = event.context
    
    #console.log ("Amartya OR" + event);
    or_ = "OR"
    
    #console.log(' OR Seleceted');
    App.router.rulesController.selectedOr modelObject, or_

  selectedAnd: (event) ->
    and_ = "AND"
    modelObject = event.context
    App.router.rulesController.selectedAnd modelObject, and_

  selectedCategoryField: (event) ->
    console.log event
    target = event.target or event.srcElement
    option = $(target).find("option:selected")
    type = option.attr("type")
    value = option.attr("value")
    modelObject = event.context
    console.log event.context
    
    # console.log('-------------------');
    App.router.rulesController.selectedFieldChange modelObject, type, value

  comaparatorField: (event) ->
    target = event.target or event.srcElement
    option = $(target).find("option:selected")
    type = option.attr("type")
    comparator = option.attr("value")
    modelObject = event.context
    console.log "-------------------"
    App.router.rulesController.selectedComparatorChange modelObject, comparator
)