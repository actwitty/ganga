#TODO: I don't have a clear idea on how to use this in a non DS/REST Manager setup, parked this definition
App.Condition = Ember.Object.extend(  
  property: null
  type: null
  negation: 'false'
  operation: []
  value1: null
  value2: null
  connect: 'and'

  # operations choice is a dependent prooperty
  operation_choices: (->        
    type = @get 'type'    
    App.operationsPermission[type]    
  ).property('type')



)