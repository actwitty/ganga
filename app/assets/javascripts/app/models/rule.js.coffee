App.Rule = Ember.Object.extend
  id: null
  name: null
  event: 'beacon' 
  owner: 'client'
  action: null
  action_param: null
  conditions: null


  hasManyConditions: []
  actionParamArr: []

  setDefaultAction: ->
    action = @get 'action'
    if action is null
      defaultAction = ''
      for key of rbT.templateLib
        defaultAction = key
        break

      action_param = {}
      @set 'action', defaultAction      
      for property of  rbT.templateArgs[defaultAction]  
        action_param[property] = rbT.templateArgs[defaultAction][property]

      @set 'action_param', action_param
      
  init: ->
    @_super  
    hasManyConditions = []
    conditions = @get 'conditions'
    if conditions isnt null
      for k,condition of conditions
        hasManyConditions.pushObject(App.Condition.create(condition))
      @set 'hasManyConditions', hasManyConditions 
    else
      @set 'hasManyConditions', [App.Condition.create()]

    @setDefaultAction() 
    @loadParam(@get 'action_param')  


  serializeParams: ->
    params = @get 'actionParamArr'
    action_param = {}
    $.each params, (index, param) ->
      action_param[param.key] = param.value
    action_param

  serialize: ->
    conditions = []
    for condition in @get 'hasManyConditions'
      conditions.push condition.serialize()
    {
      id: @get 'id'
      name: @get 'name'
      event: @get 'event'
      owner: @get 'owner'
      action: @get 'action'
      action_param: @serializeParams()
      conditions: conditions      
    }


  loadParam: (action_param)->
    actionParamArr = []    
    for property of action_param      
      if action_param.hasOwnProperty(property)
        param = {}
        param.key = property
        param.value = action_param[property]      
        actionParamArr.push(param)
    @set 'actionParamArr', actionParamArr

  displayAction: (->
    action = @get 'action'
    rbT.templateName[action]
  ).property('action')

  

    

 
