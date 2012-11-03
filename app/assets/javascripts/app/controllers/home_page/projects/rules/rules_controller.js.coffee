App.RulesController = Em.ArrayController.extend(

  content: []
  selected: null
  events: []
  systemSchema: null
  actorSchema: null
  eventSchema: null
  templateLib: []
  editState: 'new'

  #########################################################  
  init: ->
    @_super()

    #Initialize templates library only once
    templateLib = []
    templates = rbT.templateLib

    for k,v of templates
      template = {}
      templateNameArr = k.split('.')
      template['id'] = k
      if templateNameArr instanceof Array
        template['category'] = templateNameArr[0].capitalize()
        template['displayName'] = ''
        for namespace in templateNameArr
          template['displayName'] = template['displayName'] + namespace.capitalize()
      else 
        template['category'] = templateNameArr.capitalize()
        template['displayName'] = templateNameArr.capitalize()
      templateLib.push template
    
    @set 'templateLib', templateLib

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
    if editState is 'old'      
      editRule = @get 'selected'      
      @set 'selected', null
      @set 'serializeSelected', null
      ruleArr = project.get 'hasManyRules'        
      restoreRule = App.Rule.create(serialized)
      index = ruleArr.indexOf editRule      
      if index >= 0        
        ruleArr[index] = restoreRule     
      App.get("router").send("reenterProjectRules")
    else      
      @set 'selected', null   
      @set 'serializeSelected', null   
      App.get("router").send("reenterProjectRules")
      
  #########################################################
  saveEditOfRule: -> 
    serialized = @get 'serializeSelected'
    project = App.get 'router.projectsController.selected'
    editState = @get 'editState'    
    if editState is 'old'      
      editRule = @get 'selected'      
      @set 'selected', null
      ruleArr = project.get 'hasManyRules'        
      restoreRule = App.Rule.create(serialized)
      index = ruleArr.indexOf editRule      
      if index >= 0        
        ruleArr[index] = restoreRule     
      App.get("router").send("reenterProjectRules")
    else      
      @set 'selected', null      
      App.get("router").send("reenterProjectRules")
      


  #########################################################
  translatePropertyName: (property) ->    
    property.replace('][',".").replace("[",".").replace("]","")

  #########################################################
  loadSystemSchema: ->
    project = App.get('router.projectsController').get('selected')
    schema = project.get('schema')
    props = {}
    if "system" of project.schema
      system_p = project.schema.system
      for k,v of system_p      
        prop = 
               'show': @translatePropertyName(k)
               'actual': k
               'type': v
               'scope': 's'
        props[k] = prop
      @set 'systemSchema', props

  #########################################################
  loadActorSchema: ->
    project = App.get('router.projectsController').get('selected')
    schema = project.get('schema')     
    props = {}
    if "actor" of project.schema
      actor_p = project.schema.actor
      for k,v of actor_p      
        prop = 
               'show': k       
               'actual': k
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
               'type': v
               'scope': 'e'
        props[k] = prop

      @set 'eventSchema', props    

  #########################################################

  loadEvents: ()->    
    events = []
    @set 'events', events
    project = App.get('router.projectsController').get('selected')
    event_p = {}


    if "schema" of project
      if "events" of project.schema
        event_p = project.schema.events

    for k,v of event_p 
      events.push k
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
    @loadSystemSchema()
    @loadActorSchema()
    @loadEvents()
    @loadRules()
  ).observes('App.router.projectsController.selected')



)



