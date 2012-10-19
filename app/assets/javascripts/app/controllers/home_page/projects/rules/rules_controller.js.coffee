App.RulesController = Em.ObjectController.extend(
 
  content: []
  selected: null
  events: []

  
  #########################################################
  translatePropertyName: (property) ->
    property.replace('][',".").replace("[","").replace("]","")

  
  #########################################################
  loadSchema: ->
    project = App.get('router.projectsController').get('selected')
    rule = @get('selected')
    
    if typeof schema is 'undefined'

      event = rule.get 'event'

      event_p = undefined
      actor_p = undefined
      system_p = undefined
      props = []


      if "schema" of project
        if "events" of project.schema
          event_p = project.schema.events[event]
        if "actor" of project.schema
          actor_p = project.schema.actor
        if "events" of project.schema
          system_p = project.schema.system

      for k,v of event_p      
        prop = 
               'key': translatePropertyName(k)
               'actual': k
               'type': v
               'scope': 'event'
        props.push(prop)       

      for k,v of actor_p      
        prop = 
               'key': translatePropertyName(k)
               'actual': k
               'type': v
               'scope': 'actor'
        props.push(prop)       
        
      for k,v of system_p      
        prop = 
               'key': translatePropertyName(k)
               'actual': k
               'type': v
               'scope': 'system'
        props.push(prop) 

      rule.set 'schema', schema

  #########################################################

  loadEvents: ()->    
    events = []
    @set 'events', events
    project = App.get('router.projectsController').get('selected')
    event_p = undefined
    if "schema" of project
      if "events" of project.schema
        event_p = project.schema.events[event]

    for k,v of system_p      
      events.push k
    @set 'events', events


  #########################################################
  loadRules: ->
    #TODO

  reloadSchema: (->
    rule = @selected
    rule.set('schema', null)
    @loadSchema()
  ).observes('selected.event')

  # Get triggered on the selection of project changes
  projectChanged: (->
    project =  App.get('router.projectsController').get('selected')
    @loadSchema()
    @loadEvents()
    # loadRules(data)
  ).observes('App.router.projectsController.selected')
)

