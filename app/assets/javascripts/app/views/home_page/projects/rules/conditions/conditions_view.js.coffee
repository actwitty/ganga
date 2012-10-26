App.ConditionsView = Ember.View.extend
  templateName: 'home_page/projects/rules/conditions/conditions'
  
  rulesBinding: 'App.router.rulesController'

  showHelpInfo: true

  minimizedState: true

  #GOTCHA!!! - Moment I add a function above this didInsertElement does not get invoked
  didInsertElement: ->
    @_super()
    @applyJqueryConstructs()

  applyJqueryConstructs: ->
    $(".colorpickerProps").colorpicker()  

    $(".select2Props").select2(
                                      minimumInputLength: 0
                                      placeholder: 'Set event'                                      
                                      closeOnSelect: true
                                      openOnEnter: true
                                    )
    
  addNewCondition: (event) ->

    event.preventDefault()

  deleteCondition: (event) ->
    condition = event.context
    event.preventDefault()

  changedProperty: (event) ->
    condition = event.context
    event.preventDefault()    

  changedNegation: (event) ->
    condition = event.context
    event.preventDefault()

  changeOperation: (event) ->
    condition = event.context
    event.preventDefault()

  changeDataType: (event) ->
    condition = event.context
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


    
  


