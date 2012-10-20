#TODO: I don't have a clear idea on how to use this in a non DS/REST Manager setup, parked this definition
App.Condition = Ember.Object.extend(  
  property: null
  type: null # This never goes back/comes from server
  negation: null
  operation: null
  value1: null
  value2: null
  connect: null


  
  
  operation_choices: (->  	
  	type = @type
  	App.operationsPermission[type]
  ).property('type')

)