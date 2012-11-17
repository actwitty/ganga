App.Rule = Ember.Object.extend
  id: null
  name: null
  event: 'beacon' 
  owner: 'client'
  action: 
          service: 
                  name: null
          desc:
                type: null
                api: null
          params: null
  
  conditions: null


  hasManyConditions: []
  actionParamArr: []

  setActionParam: (type, api)->
    params = {}
    params_key = type + '.' + api
    for param of  trigger_fish.rbT.templateArgs[params_key]  
      params[param] = trigger_fish.rbT.templateArgs[params_key][param]['value']      
    return params

  setAction: ->
    action = @get 'action'
    if action.service.name is null
      newAction = 
                  service: {}
                  desc: {}
                  params: {}

      newAction['service']['name'] = 'rb_template_lib'

      type = ''
      api = ''
      for key of trigger_fish.rbT.templateLib
        type = key
        for api_name of trigger_fish.rbT.templateLib[key]
          api = api_name
          break
        break
      
      newAction['desc']['type'] = type
      newAction['desc']['api'] = api

      newAction.params = @setActionParam(type, api)
      @set 'action', newAction

      
  init: ->
    
    @_super()

    hasManyConditions = []
    conditions = @get 'conditions'    
    if conditions isnt null      
      for condition in conditions      
        newCondition = App.Condition.create(condition)      
        hasManyConditions.pushObject(newCondition)        
      @set 'hasManyConditions', hasManyConditions 
    else      
      @set 'hasManyConditions', [App.Condition.create()]    
    @setAction() 
    
    


  serializeAction: ->
    action = @get 'action'
    actionS = {}
    
    serviceS = {}
    service = @get 'action.service'
    for key of service
      serviceS[key] = action.service[key]

    desc = @get 'action.desc'
    descS = {}
    for key of desc
      descS[key] = desc[key]

    params = @get 'action.params'
    paramsS = {}
    for key of params
      paramsS[key] = params[key]

    actionS.service = serviceS
    actionS.desc = descS
    actionS.params = paramsS    
    actionS


  serialize: ->
    conditions = []
    for condition in @get 'hasManyConditions'
      conditions.push condition.serialize()
    {
      id: @get 'id'
      name: @get 'name'
      event: @get 'event'
      owner: @get 'owner'
      action: @serializeAction() 
      conditions: conditions      
    }




  displayAction: (->
    type = @get 'action.desc.type'
    api = @get 'action.desc.api'
    key = type + '.' + api
    trigger_fish.rbT.templateName[key]
  ).property('action')

  

    

 
