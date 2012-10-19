App.Condition = Ember.Object.extend(  
  property: null
  type: null # This never goes back/comes from server
  negation: null
  operation: null
  value1: null
  value2: null

  operation_choices: (->  	
  	type = @type
  	App.operationsPermission[type]
  ).property('type')

)