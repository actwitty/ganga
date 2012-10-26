App.RulesController = Em.ArrayController.extend(

  content: []
  selected: null
  events: []
  systemSchema: null
  actorSchema: null
  eventSchema: null
  templateLib: []
  
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
  translatePropertyName: (property) ->
    property.replace('][',".").replace("[","").replace("]","")

  #########################################################
  loadSystemSchema: ->
    project = App.get('router.projectsController').get('selected')
    schema = project.get('schema')
    props = []
    if "system" of project.schema
      system_p = project.schema.system
      for k,v of system_p      
        prop = 
               'key': @translatePropertyName(k).capitalize()              
               'actual': '$' + k
               'type': v
               'scope': 'actor'
        props.push(prop)    
      @set 'systemSchema', props

  #########################################################
  loadActorSchema: ->
    project = App.get('router.projectsController').get('selected')
    schema = project.get('schema')     
    props = []
    if "actor" of project.schema
      actor_p = project.schema.actor
      for k,v of actor_p      
        prop = 
               'key': @translatePropertyName(k).capitalize()              
               'actual': '#' + k
               'type': v
               'scope': 'actor'
        props.push(prop)    
      @set 'actorSchema', props

  #########################################################
  loadEventSchema: ->
    project = App.get('router.projectsController').get('selected')
    rule = @get('selected')
    schema = project.get('schema')    
    if rule isnt null

      event = rule.get 'event'
      event_p = undefined
      props = []

      if "schema" of project
        if "events" of project.schema
          event_p = project.schema.events[event]

      for k,v of event_p      
        prop = 
               'key': @translatePropertyName(k)
               'label': @translatePropertyName(k)
               'actual': k
               'type': v
               'scope': 'event'
        props.push(prop)       


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



