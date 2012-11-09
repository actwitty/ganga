App.RulesView = Ember.View.extend
  templateName: 'home_page/projects/rules/rules'

  init: ->
    @_super()

    rules =  @get 'controller.content'
    msgContext = {}    
    if rules isnt null and rules.length isnt 0
      #HELP DOC LINK
      msgContext = 
                    header: "Manage rules set for this application"
                    message: "You can manage the conditions for trigger of each rule for the application"
                    href: "/help#manageRules"
                    buttonText: "Know More"                    
    else
      #HELP DOC LINK      
      msgContext = 
                    header: "Manage rules set for this application"
                    message: "You can manage the conditions for trigger of each rule for the application"
                    href: "/help#manageRules"
                    buttonText: "Know More"        
      

    app = App.get("router.applicationController")
    app.set('msgContext', msgContext)

  # --------------------------------------------------------
  confirmDeletion: (rule)->
    current_this = @
    showAlertOnDelete = ->    
      alert = 
              activate: true
              header: 
                      main : "Delete the rule "
                      note : "You have requested to delete this rule."
              detail: "Clicking yes will delete the triggers associated with this rule ? "
              first_btn:
                        class : "btn-danger"
                        text  : "Yes"
                        callback : (context)->
                                  alert = context.get 'alert'
                                  alert.activate = false
                                  alert= null  
                                  context.set 'alert', alert
                                  # TODO: May be route it through the App Router
                                  App.get("router").send("deletionConfirmed", rule)                                  
                                  event.preventDefault()                              
                        context : current_this
              second_btn:
                        class : "btn-success"
                        text  : "No"
                        callback : (context)->
                                  alert = context.get 'alert'
                                  alert.activate = false
                                  alert= null  
                                  context.set 'alert', alert                                    
                                  event.preventDefault()
                        context : current_this
    
      current_this.set 'alert', alert

    showAlertOnDelete()

  
