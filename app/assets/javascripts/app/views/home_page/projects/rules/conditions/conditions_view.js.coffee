App.ConditionsView = Ember.View.extend
  templateName: 'home_page/projects/rules/conditions/conditions'  
  rulesBinding: 'App.router.rulesController'  
  alert: null
  showHelpInfo: true  

  #------------------------------------------------------
  init: ->
    @_super()
    conditions =  App.get 'router.rulesController.selected.hasManyConditions'
    msgContext = {}    
    if conditions isnt null and conditions.length isnt 0
      #HELP DOC LINK      

      msgContext = 
                    header: "Modify the rule trigger"
                    message: "You can modify the existing rule trigger for action."
                    href: "/help#modifyRuleForApp"
                    buttonText: "Know More"
    else
      #HELP DOC LINK
      msgContext = 
                    header: "Create a new rule"
                    message: "You can define the trigger rule for this application."
                    href: "/help#firstRuleForApp"
                    buttonText: "Learn"  
      
    app = App.get("router.applicationController")
    app.set('msgContext', msgContext)                    
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
  cancelRuleEditHandler: (event) ->    
    current_this = @
    showAlertOnCancel = ->    

      alert = 
              activate: true
              header: 
                      main : "Reject all changes made "
                      note : "You have requested RuleBot to drop the edits to this rule."
              detail: "Clicking yes will clear all changes and you have done on this screen. Are you sure ? "
              first_btn:
                        class : "btn-warning"
                        text  : "Yes"
                        callback : (context)->
                                  alert = context.get 'alert'
                                  alert.activate = false
                                  alert= null  
                                  context.set 'alert', alert
                                  # TODO: May be route it through the App Router
                                  App.get('router.rulesController').cancelEditOfRule()
                                  event.preventDefault()                              
                        context : current_this
              second_btn:
                        class : "btn-inverse"
                        text  : "No"
                        callback : (context)->
                                  alert = context.get 'alert'
                                  alert.activate = false
                                  alert= null  
                                  context.set 'alert', alert                                    
                                  event.preventDefault()
                        context : current_this
    
      current_this.set 'alert', alert

    showAlertOnCancel()

  # -----------------------------------------------------
  saveRuleEditHandler: (event) ->
    current_this = @    
    # -----------------------------------------------------
    showAlertOnSave = ->    
      alert = 
              activate: true
              header: 
                      main : "Save the edit on this rule "
                      note : "You have requested RuleBot to save the edits on this rule."
              detail: "Clicking yes will save the rule or you can reject the edit. Are you sure ? "
              first_btn:
                        class : "btn-success"
                        text  : "Yes"
                        callback : (context)->
                                  alert = context.get 'alert'
                                  alert.activate = false
                                  alert= null  
                                  context.set 'alert', alert
                                  # TODO: May be route it through the App Router
                                  App.get('router.rulesController').saveEditOfRule()
                                  event.preventDefault()                              
                        context : current_this
              second_btn:
                        class : "btn-warning"
                        text  : "No"
                        callback : (context)->
                                  alert = context.get 'alert'
                                  alert.activate = false
                                  alert= null  
                                  context.set 'alert', alert                                    
                                  event.preventDefault()
                        context : current_this
    
      current_this.set 'alert', alert

    showAlertOnSave()


  # -----------------------------------------------------
  changeRuleEventConfirmation: (event)->

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
                                  # TODO: May be route it through the App Router
                                  App.get('router.rulesController').changeEventOnRule(val)
                                  event.preventDefault()                              
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
                                  event.preventDefault()
                        context : current_this
    
      current_this.set 'alert', alert


    
    if rule.get('event') isnt val
      showAlertEventChange()


  # -----------------------------------------------------
  showInfo: (-> 
    @get("showHelpInfo") is true
  ).property("showHelpInfo")

  # -----------------------------------------------------
  hideInfo: (event) ->
    @set 'showHelpInfo', false
    event.preventDefault()