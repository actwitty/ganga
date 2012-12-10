App.ActionView = Ember.View.extend
  templateName: 'home_page/projects/rules/actions/action' 
  apiChoices : null
  typeChoices: null
  minimizedState: true
  # -----------------------------------------------------
  init: ->
    @_super()
    service = @get 'rule.action.service.name'
    @set 'typeChoices', App.actions.getTypeChoices(service)
    @setApiChoices()
    Ember.run.next( this, 'applyJqueryConstructs')
  
  # -----------------------------------------------------
  applyJqueryConstructs: ->    
    $(".select2Props").not(".select2-container").select2(
                                minimumInputLength: 0                                      
                                closeOnSelect: true
                                openOnEnter: true)
    $(".colorpickerProps").colorpicker()  

  # -----------------------------------------------------
  setApiChoices: ->    
    rule = @get 'rule'
    service = rule.get 'action.service.name'
    type = rule.get 'action.desc.type'
    @set 'apiChoices', App.actions.getApiChoices(service, type)    
    api = rule.get 'action.desc.api'    
    if api is null or api.length is 0
      rule.set 'action.desc.api', App.actions.getDefaultApi(service, type)
      

  # -----------------------------------------------------
  selectActionType: (event) ->
    rule = event.context
    target = $(event.target)    
    type = target.select2('val')
    rule.set 'action.desc.type', type
    rule.set 'action.desc.api', null
    @setApiChoices()
    api = rule.get 'action.desc.api'
    rule.set 'action.params',App.actions.getParamList(service, type, api)
    @rerender()
    Ember.run.next( this, 'applyJqueryConstructs')    
    event.preventDefault()

# -------------------------------------------------------
  selectActionApi: (event) ->
    rule = event.context
    target = $(event.target)    
    api = target.select2('val')
    service = rule.get 'action.service.name'
    type =  rule.get 'action.desc.type'
    rule.set 'action.desc.api', api  
    rule.set 'action.params',App.actions.getParamList(service, type, api)
    @rerender()
    Ember.run.next( this, 'applyJqueryConstructs')
    event.preventDefault()
  # -----------------------------------------------------
  showActionPreview: (event) ->   
    rule = event.context   
    service = rule.get 'action.service.name'         
    App.actions.preview(service, rule.serializeAction())
    event.preventDefault()
  # -----------------------------------------------------
  manageDeckerMinimize: (event) ->    
    state = @get "minimizedState"
    if state is true
      @set "minimizedState", false
    else
      @set "minimizedState", true
    event.preventDefault()

  # -----------------------------------------------------
  showParamDecker: (->
    state = @get "minimizedState"
    if state is true
      return 'decker decker_hide'
    else
      return 'decker decker_show'

  ).property("minimizedState")

  # -----------------------------------------------------
  showDeckerControl: (->    
    state = @get "minimizedState"
    if state is true
      return 'minimized'
    else
      return 'maximized'
  ).property("minimizedState")


#-------------------------------------------------------------------
Handlebars.registerHelper "getApiName", (name, type, api, options) ->  
  context = (options.contexts and options.contexts[0]) or this  

  service_in = Ember.Handlebars.get(context, name, options) 
  type_in = Ember.Handlebars.get(context, type, options)  
  api_in = Ember.Handlebars.get(context, api, options) 
  console.log App.actions.getApiName(service_in, type_in, api_in)
  
  App.actions.getApiName(service_in, type_in, api_in)
  