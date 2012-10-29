# A child view definition
App.ConditionView = Ember.View.extend
  rulesBinding: 'App.router.rulesController'
  templateName: 'home_page/projects/rules/conditions/condition/single_condition'

  deleteCondition: (event) ->
    condition = event.context
    content = App.get('router.conditionsController').get('content')
    content.removeObject(condition)
    if content.length is 0
      condition = App.Condition.create()
      content = App.get('router.conditionsController').get('content')        
      content.pushObject(condition)  
    event.preventDefault()

  changedProperty: (event) ->
    condition = event.context
    event.preventDefault()    

  changedNegation: (event) ->
    condition = event.context
    event.preventDefault()

  changeOperation: (event) ->
    condition = event.context
    event.preventDefault()

  changeDataType: (event) ->
    condition = event.context
    target = $(event.target)    
    val = target.find('option:selected').val()
    condition.set 'type', val
    condition.changeOperationOnType()
    # This is a hack to make the Select2 control work under ember
    label = $(target).closest('.entry').find(".operation_sel a.select2-choice span")
    label.html(condition.get 'opShow')
    # this is a hack
    event.preventDefault()