App.ConditionsController = Ember.ArrayController.extend
  content: []  

  loadConditions: (->
    @set 'content', []    
    rule = App.get "router.rulesController.selected"    
    if rule isnt null
      conditions = rule.get 'hasManyConditions'
      if conditions.length > 0
        @set 'content', conditions        
      else
        content = @get 'content'
        content.pushObject App.Condition.create()    
  ).observes("App.router.rulesController.selected.hasManyConditions")
  
