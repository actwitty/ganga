App.Rule = Ember.Object.extend(
 id: null
 name: null
 event: null 
 action: null
 action_param: null

 hasManyConditions: []
  
init: ->
  @_super
  conditions = @get 'conditions'  
  hasManyConditions = []
  if typeof conditions isnt 'undefined'
    for condition in conditions
      hasManyConditions.pushObject(App.Condition.create(condition)) 
  @set 'hasManyConditions', hasManyConditions
      
  



   

 
)