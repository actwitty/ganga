App.ActionsView = Ember.View.extend
  templateName: 'home_page/projects/rules/conditions/actions'
  
  rulesBinding: 'App.router.rulesController'

  
  didInsertElement: ->
    @_super()    
