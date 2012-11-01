App.ConditionsView = Ember.View.extend
  templateName: 'home_page/projects/rules/conditions/conditions'
  
  rulesBinding: 'App.router.rulesController'  
  alert: null
  showHelpInfo: true
  minimizedState: true

  # -----------------------------------------------------
  didInsertElement: ->
    @_super()        
    @applyJqueryConstructs()

  didContentChange: (->        
    Ember.run.next(this, 'applyJqueryConstructs')
  ).observes('App.router.conditionsController.content.@each')
  
  # -----------------------------------------------------
  applyJqueryConstructs: ->
    
    $(".colorpickerProps").colorpicker()      
    $(".select2Props").not(".select2-container").select2(
                                minimumInputLength: 0                                      
                                closeOnSelect: true
                                openOnEnter: true
                              )

  # -----------------------------------------------------
  selectTemplate: (event) ->
    rule = event.context
    target = $(event.target)    
    val = target.find('option:selected').val()
    rule.set 'action', val
    rule.loadParam(rbT.templateArgs[val])
    event.preventDefault()



  # -----------------------------------------------------
  changeRuleEvent: (event)->

    rule = @get('rules').get('selected')
    target = $(event.target)    
    oldVal = rule.get 'event'    
    val = target.select2("val")
    
    current_this = @

    # -----------------------------------------------------
    showAlertEventChange = ->    

      alert = 
              activate: true
              header: 
                      main : "Changed the event "
                      note : "You have changed the event to which this rule trigger is associated."
              detail: "Change of the event will reset all the rule conditions,you now have to reset the rules. "
              first_btn:
                        class : "btn-warning"
                        text  : "Yes"
                        callback : (context)->
                                  alert = context.get 'alert'
                                  alert.activate = false
                                  alert= null  
                                  context.set 'alert', alert
                                  App.get('router.rulesController').changeEventOnRule(val)                               
                        context : current_this
              second_btn:
                        class : "btn-inverse"
                        text  : "No"
                        callback : (context)->
                                  alert = context.get 'alert'
                                  alert.activate = false
                                  alert= null  
                                  context.set 'alert', alert  
                                  target.select2('val',oldVal)                            
                        context : current_this
    
      current_this.set 'alert', alert


    
    if rule.get('event') isnt val
      showAlertEventChange()

    event.preventDefault()  




  
   

  # -----------------------------------------------------
  showTemplatePreview: (event) ->   
    rule = event.context    
    rbT.invokeActionScript(rule.get('action'), rule.serializeParams())
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

  # -----------------------------------------------------
  showInfo: (-> 
    @get("showHelpInfo") is true
  ).property("showHelpInfo")

  # -----------------------------------------------------
  hideInfo: (event) ->
    @set 'showHelpInfo', false
    event.preventDefault()