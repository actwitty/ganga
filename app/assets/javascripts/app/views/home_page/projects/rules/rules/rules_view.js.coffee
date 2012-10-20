App.RulesView = Ember.View.extend(
  templateName: 'home_page/projects/rules/rules'
  showHelpInfo: true
  showNoRule: true

  isShowNoRule: (->
  	  @get("showHelpInfo") is true
  ).property("showNoRule")

  showInfo: (-> 
    @get("showHelpInfo") is true
   ).property("showHelpInfo")
  
  hideInfo: (event) ->
  	@set 'showHelpInfo', false
  	event.preventDefault()

  deleteRule: (event) ->
    rule = event.context
    App.get('router.rulesController.selected')

    event.preventDefault()    
  
)