App.ConditionsView = Ember.View.extend(
  templateName: 'home_page/projects/rules/conditions/conditions'
  
  rulesBinding: 'App.router.rulesController.selected'

  properties : null
  conditions: null
  default_values: null


  eventChanged: (->    
    rule = App.get 'router.rulesController'
    @set 'properties', rule.getSchema()    
  ).observes('App.router.rulesController.selected.event')


  
  showHelpInfo: true
  

  showInfo: (-> 
    @get("showHelpInfo") is true
   ).property("showHelpInfo")
  
  hideInfo: (event) ->
    @set 'showHelpInfo', false
    event.preventDefault()
  
)
