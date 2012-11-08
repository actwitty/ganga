App.RulesView = Ember.View.extend(
  templateName: 'home_page/projects/rules/rules'



  deleteRule: (event) ->
    rule = event.context
    App.get('router.rulesController.selected')

    event.preventDefault()    
  
)