App.RulesView = Ember.View.extend(
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
                    header: "Start setting rules for this application"
                    message: "You have not set a trigger rule for this application. Click the button below to start with a new rule"
                    href: "/help#firstRule"
                    buttonText: "Learn"

    app = App.get("router.applicationController")
    app.set('msgContext', msgContext)


  deleteRule: (event) ->
    rule = event.context
    App.get('router.rulesController.selected')

    event.preventDefault()    
  
)