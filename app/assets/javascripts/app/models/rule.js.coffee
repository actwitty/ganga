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
          timer:
                delay: 0
  conditions: null

  hasManyConditions: []
  
  
  init: ->
    @_super()
    hasManyConditions = []
    conditions = @get 'conditions'        
    if conditions isnt null
      for k,condition of conditions          
        newCondition = App.Condition.create(condition)      
        hasManyConditions.pushObject(newCondition)        
      @set 'hasManyConditions', hasManyConditions 
    else      
      @set 'hasManyConditions', [App.Condition.create()]    
    @setAction() 


    
  setActionParam: (service, type, api)->          
    params = {}    
    paramList = App.actions.getParamList(service, type, api)

    for param of paramList 
      params[param] = paramList[param]['value']      
    params

  setAction: ->
    action = @get 'action'
    if action.service.name is null
      newAction = 
                  service: {}
                  desc: {}
                  params: {}
                  timer: {delay:0}
      service = App.actions.getDefaultService()      
      newAction['service']['name'] = service
      type = App.actions.getDefaultType(service)
      newAction['desc']['type'] = type
      api = App.actions.getDefaultApi(service, type)      
      newAction['desc']['api'] = api
      newAction.params = @setActionParam(service, type, api)
      @set 'action', newAction


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
    timer = @get 'action.timer'
    timerS = {}
    for key of timer
      timerS[key] = timer[key]

    actionS.service = serviceS
    actionS.desc = descS
    actionS.params = paramsS 
    actionS.timer = timerS

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
    api = @get  'action.desc.api'
    name = @get 'action.service.name'
    App.actions.getDisplayName(name, type, api)
  ).property('action.desc.type', 'action.desc.api')

  

    

 
