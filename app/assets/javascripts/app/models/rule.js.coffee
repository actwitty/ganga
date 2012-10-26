App.Rule = Ember.Object.extend(
 id: null
 name: null
 event: null 
 action: null
 action_param: null
 conditions: null

 hasManyConditions: []
  
init: ->
  @_super  
  hasManyConditions = []
  conditions = @get 'conditions'
  if conditions isnt null
    for condition in conditions
      hasManyConditions.pushObject(App.Condition.create(condition)) 
  @set 'hasManyConditions', hasManyConditions   
    

 
)