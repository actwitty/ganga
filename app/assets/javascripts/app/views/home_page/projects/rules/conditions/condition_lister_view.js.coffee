# A child view definition
App.ConditionListerView = Ember.View.extend  
  templateName: 'home_page/projects/rules/conditions/condition_lister'
  # -----------------------------------------------------
  addNewCondition: (event) ->    
    condition = App.Condition.create()
    content = App.get('router.conditionsController').get('content')        
    content.pushObject(condition)  
    event.preventDefault()  
