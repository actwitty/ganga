# A child view definition
App.ConditionView = Ember.View.extend
  rulesBinding: 'App.router.rulesController'
  templateName: 'home_page/projects/rules/conditions/condition/condition'

  showHideInputOne: 'hide'
  showHideInputTwo: 'hide'
  inputBoxType: 'input_box Fixnum'
      
  # ------------------------------------------
  init: ->
    @_super()    
    @observeChangeInOperation()
    @observeChangeInType()
  
  # ------------------------------------------
  observeChangeInOperation: (->
    operation = @get('condition').get('operation')
    
    if App.operationsValuesCount[operation] >= 1
      @set 'showHideInputOne', 'rule_val show'
      if App.operationsValuesCount[operation] >= 2
        @set 'showHideInputTwo', 'rule_val show'
      else
        @set 'showHideInputTwo', 'rule_val hide'
    else
      @set 'showHideInputOne', 'rule_val hide'
      @set 'showHideInputTwo', 'rule_val hide'
  ).observes('condition.operation')
  
  # ------------------------------------------
  observeChangeInType: (->    
    type = @get('condition').get('type')
    @set 'inputBoxType', 'input_box ' + type
  ).observes('condition.type')
  # ------------------------------------------
  applyChangedType: (event, type) ->
    target = $(event.target)
    target.closest('.entry').find('.type_sel').select2('val', type)

  # ------------------------------------------
  getNewDataType: (event) ->
    target = $(event.target)
    val = target.select2("val")

  # -------------------------------------------
  getNewNegation: (event) ->
    target = $(event.target)  
    val = target.select2('val')

  # ------------------------------------------
  getNewProperty: (event) ->
    target = $(event.target)
    val = target.select2("val")
  # ------------------------------------------
  getNewPropertyScope: (event) ->
    target = $(event.target)
    val = target.select2("val")
    option = target.find 'option[value="' + val  + '"]'
    option.attr 'scope'
   

  
    
    
    
    
    
    
    