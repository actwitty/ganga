App.ConditionsView = Ember.View.extend
  templateName: 'home_page/projects/rules/conditions/conditions'
  
  rulesBinding: 'App.router.rulesController'
  showHelpInfo: true
  
  didInsertElement: ->
    @_super()    
    $(".bootstrap_select2").select2()

  showInfo: (-> 
    @get("showHelpInfo") is true
   ).property("showHelpInfo")
  
  hideInfo: (event) ->
    @set 'showHelpInfo', false
    event.preventDefault()
  


