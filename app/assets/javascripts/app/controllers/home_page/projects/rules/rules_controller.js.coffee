App.RulesController = Em.ArrayController.extend
  
  selected: null
  events: []
  systemSchema: null
  actorSchema: null
  eventSchema: null  
  editState: 'new'

  url:
      create : "rule/create"
      update : "rule/update"
      delete : "rule/delete"
      setSystem: "/actor/set"
  

  #########################################################  
  init: ->
    @_super()

  #########################################################
  serializeRule: ->
    rule = @get 'selected'
    if rule isnt null
      rule.serialize
    else
      null
  #########################################################

  changeEventOnRule: (eventname) ->
    selected = @get 'selected'
    selected.set 'event', eventname
    hasManyConditions = [App.Condition.create()]
    selected.set 'hasManyConditions', hasManyConditions
  #########################################################  
  markStateOfRuleEdit: (state)->    
    @set 'editState', state
      
  #########################################################
  storeSerializedBeforeEdit: (rule)->    
    @set 'serializeSelected', rule.serialize()
    @set 'selected', rule


  #########################################################
  cancelEditOfRule: -> 
    serialized = @get 'serializeSelected'
    project = App.get 'router.projectsController.selected'
    editState = @get 'editState'    
    console.log '1'
    if editState is 'old'      
      editRule = @get 'selected'      
      @set 'selected', null
      console.log '2'
      @set 'serializeSelected', null
      console.log '3'
      ruleArr = project.get 'hasManyRules'        
      console.log '4'
      console.log serialized
      restoreRule = App.Rule.create(serialized)
      console.log '5'
      index = ruleArr.indexOf editRule      
      if index >= 0        
        ruleArr[index] = restoreRule     
        console.log '6'
      App.get("router").send("reenterProjectRules")
    else      
      @set 'selected', null   
      @set 'serializeSelected', null   
      App.get("router").send("reenterProjectRules")
      
  #########################################################
  saveEditOfRule: ->    
    project = App.get 'router.projectsController.selected'
    editState = @get 'editState'    
    rule = @get 'selected'
       
    if editState is 'new'        
      @createRule(project.get('id'), rule)
    else  
      @updateRule(project.get('id'), rule)                    
      
  #########################################################
  translatePropertyName: (property) ->    
    property.replace('][',".").replace("[",".").replace("]","")

  #########################################################
  loadSystemSchema: ->
    props = {}
    for k,v of App.systemSchema      
      prop = 
            'show': @translatePropertyName(k)
            'actual': k
            'key' : 's.' + k
            'type': v
            'scope': 's'
            
      props[k] = prop
    @set 'systemSchema', props

  #########################################################
  loadActorSchema: ->
    project = App.get('router.projectsController').get('selected')
    if project isnt null
      schema = project.get('schema')     
      props = {}
      if project.schema.hasOwnProperty 'profile'
        profile_p = project.schema.profile          
        for k,v of profile_p      
          prop = 
                 'show': k       
                 'actual': k
                 'key' : 'a.' + k
                 'type': v
                 'scope': 'a'
                 
          props[k] = prop
      @set 'actorSchema', props

  #########################################################
  loadEventSchema: ->    
    project = App.get('router.projectsController').get('selected')
    rule = @get('selected')
    schema = project.get('schema')    
    if rule isnt null

      event = rule.get 'event'
      event_p = undefined
      props = {}

      if "schema" of project
        if "events" of project.schema
          event_p = project.schema.events[event]

      for k,v of event_p      
        prop = 
               'show': @translatePropertyName(k)
               'actual': k
               'key' : 'e.' + k
               'type': v
               'scope': 'e'
               'scope_name': 'event'
        props[k] = prop

    @set 'eventSchema', props    

  #########################################################

  loadEvents: ()->    
    events = []
    @set 'events', events
    project = App.get('router.projectsController').get('selected')
    if project isnt null
      event_p = {}

      if "schema" of project
        if "events" of project.schema
          event_p = project.schema.events

          for k,v of event_p
            if not /^__/.test k
              events.push k

          if not event_p.hasOwnProperty 'beacon'
            events.push 'beacon'
      if events.length is 0    
        events.push 'beacon'
      @set 'events', events 


        

  #########################################################
  loadRules: ->
    project = App.get('router.projectsController').get('selected')
    @set 'content', project.get('hasManyRules')   


  #########################################################
  reloadSchema: (->    
    ruleSelected = @get 'selected'    
    if ruleSelected  isnt null      
      @loadEventSchema()      
  ).observes('selected.event')

  #########################################################
  # Get triggered on the selection of project changes
  projectChanged: (->    
    @set 'content', []
    @set 'selected', null

    project =  App.get('router.projectsController').get('selected') 
    if project isnt null   
      @loadSystemSchema()
      @loadActorSchema()
      @loadEvents()
      @loadRules()
  ).observes('App.router.projectsController.selected.hasManyRules')


  #########################################################
  # Create a Rule
  createRule: (proj_id, ruleNew)->
    controllerObj = this
    success= (data) ->
      if data.hasOwnProperty('rule_id')
        ruleNew.set 'id', data.rule_id
        console.log controllerObj.get('content')
        controllerObj.get('content').pushObject(ruleNew)
      App.get("router").send("reenterProjectRules")
    error= () ->
      # TODO: Pop out error
    url = @get 'url.create'
    json = 
            app_id : proj_id
            rule : ruleNew.serialize()
    
    App.getRequest  url, json, success, error
    @updateSystemVariables ruleNew
  #########################################################
  updateSystemVariables: (rule)->    
    
    system_param = {}
    json = {}
    sys = false

    conditions = rule.get 'hasManyConditions'
    
    for condition in conditions    
      scope = condition.get 'scope'    
      if scope is 's'   
        sys = true
        property =  condition.get 'property'
        defaultVal = null
        type = App.systemSchema[property]
        
        if  type is 'String'
          defaultVal = 'default'
        else if type is 'Number'
          defaultVal = 1
        else if type is 'Boolean'
          defaultVal = true
        
        
        system_param[property] = defaultVal

    if sys is true            
      json['app_id'] = App.get('router.projectsController.selected.id')
      json['id'] = App.get('router.projectsController.selected.description.super_actor_id')
      json['properties'] = {system : system_param}
      
      url = @get 'url.setSystem'
      success= (data) ->
      error= (data) ->    
      App.getRequest url, json, success, error

  #########################################################
  # Update a Rule  
  updateRule: (proj_id, ruleNew)->

    success= (data) ->
      App.get("router").send("reenterProjectRules")
    error= () ->
      # TODO: Pop out error
    url = @get 'url.update'
    json = 
            app_id : proj_id
            rule : ruleNew.serialize()
            id : ruleNew.get('id')
    

    App.getRequest  url, json, success, error
    @updateSystemVariables ruleNew

  #########################################################
  # Delete a Rule
  deleteRule: (rule)->
    url = @get 'url.delete'
    controllerObj = this
    del_app_id = App.get('router.projectsController.selected.id')
    
    del_rule_id = rule.get('id')
    # Success callback -------------------------
    success= (data) ->
       
      if data.status is true                   
        content = controllerObj.get('content')
        content.removeObject(rule)         
        App.get('router.applicationController').setInlineAlert('success', 'Successfully Deleted !', 'Rule has been removed permanently.' )        
    # Error callback -------------------------
    error= ()->
      App.get('router.applicationController').setInlineAlert('error', 'Deletion Failed !', 'Failed to delete the rule' ) 
    App.getRequest url, {app_id : del_app_id, rule_id: del_rule_id}, success, error

      






