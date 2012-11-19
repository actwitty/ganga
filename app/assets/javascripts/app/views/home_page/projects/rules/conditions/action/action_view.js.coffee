App.ActionView = Ember.View.extend
  templateName: 'home_page/projects/rules/actions/action' 
  apiChoices : null
  templateChoices: null
  minimizedState: true
  # -----------------------------------------------------
  init: ->
    @_super()
    @set 'templateChoices', trigger_fish       
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
    @set 'apiChoices', trigger_fish
    rule = @get 'rule'
    template = rule.get 'action.desc.type'         
    @set 'apiChoices', trigger_fish.rbT.templateLib[template]
    
    api = rule.get 'action.desc.api'
    if api is null or api.length is 0
      for api_name of trigger_fish.rbT.templateLib[template]
        api = api_name
        break
      rule.set 'action.desc.api', api
      

  # -----------------------------------------------------
  selectTemplateName: (event) ->
    rule = event.context
    target = $(event.target)    
    val = target.select2('val')
    rule.set 'action.desc.type', val
    rule.set 'action.desc.api', null
    @setApiChoices()
    api = rule.get 'action.desc.api'
    rule.set 'action.params',rule.setActionParam(val, api)
    @rerender()
    Ember.run.next( this, 'applyJqueryConstructs')
    # rule.loadParam(trigger_fish.rbT.templateArgs[val])
    event.preventDefault()

# -------------------------------------------------------
  selectTemplateApi: (event) ->
    rule = event.context
    target = $(event.target)    
    val = target.select2('val')
    type =  rule.get 'action.desc.type'
    rule.set 'action.desc.api', val  
    rule.set 'action.params',rule.setActionParam(type, val)
    @rerender()
    Ember.run.next( this, 'applyJqueryConstructs')
    event.preventDefault()
  # -----------------------------------------------------
  showTemplatePreview: (event) ->   
    rule = event.context        
    trigger_fish.rbT.invokeActionScript(rule.serializeAction())
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
  showTemplateDecker: (->
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





