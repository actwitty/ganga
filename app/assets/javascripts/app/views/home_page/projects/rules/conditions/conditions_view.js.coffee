App.ConditionsView = Ember.View.extend(
  templateName: 'home_page/projects/rules/conditions/conditions'
  
  rulesBinding: 'App.router.rulesController.selected'

  showHelpInfo: true
  

  showInfo: (-> 
    @get("showHelpInfo") is true
   ).property("showHelpInfo")
  
  hideInfo: (event) ->
    @set 'showHelpInfo', false
    event.preventDefault()
  
)
