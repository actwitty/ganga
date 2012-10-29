App.ConditionsView = Ember.View.extend
  templateName: 'home_page/projects/rules/conditions/conditions'
  
  rulesBinding: 'App.router.rulesController'
  

  showHelpInfo: true

  minimizedState: true

  #GOTCHA!!! - Moment I add a function above this didInsertElement does not get invoked
  didInsertElement: ->
    @_super()        
    @applyJqueryConstructs()

  didContentChange: (->        
    Ember.run.schedule('render', this, 'applyJqueryConstructs')
  ).observes('App.router.conditionsController.content.@each')
  

  applyJqueryConstructs: ->
    
    $(".colorpickerProps").colorpicker()      
    $(".select2Props").not(".select2-container").select2(
                                minimumInputLength: 0                                      
                                closeOnSelect: true
                                openOnEnter: true
                              )
    
  addNewCondition: (event) ->    
    condition = App.Condition.create()
    content = App.get('router.conditionsController').get('content')        
    content.pushObject(condition)  
    event.preventDefault()




  showTemplatePreview: (event) ->   
    event.preventDefault()


  manageDeckerMinimize: (event) ->    
    state = @get "minimizedState"
    if state is true
      @set "minimizedState", false
    else
      @set "minimizedState", true
    event.preventDefault()


  showTemplateDecker: (->
    state = @get "minimizedState"
    if state is true
      return 'decker decker_hide'
    else
      return 'decker decker_show'

  ).property("minimizedState")


  showDeckerControl: (->    
    state = @get "minimizedState"
    if state is true
      return 'minimized'
    else
      return 'maximized'
  ).property("minimizedState")


  showInfo: (-> 
    @get("showHelpInfo") is true
  ).property("showHelpInfo")
  
  hideInfo: (event) ->
    @set 'showHelpInfo', false
    event.preventDefault()

