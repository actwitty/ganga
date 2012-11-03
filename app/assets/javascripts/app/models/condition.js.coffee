#TODO: I don't have a clear idea on how to use this in a non DS/REST Manager setup, parked this definition
App.Condition = Ember.Object.extend
  property: null
  type: 'String'
  scope: 'e'
  negation: 'false'
  operation: null
  value1: null
  value2: null
  connect: 'and'
      
  opList: null
  init: ->
    @_super()
    operation = @get 'operation'     

    type = @get 'type'
    @set 'opList', App.operationsList[type]   
    if operation is null        
      for op of App.operationsList[type]
        
        if App.operationsList[type].hasOwnProperty(op)
          @set 'operation', op
          break


  observeOperationChange: (->
    @set 'value1', ''
    @set 'value2', ''   
  ).observes('operation')


  observesTypeChange: (->
    type = @get 'type'    
    @set 'opList', App.operationsList[type]    
    for op of App.operationsList[type]
      if App.operationsList[type].hasOwnProperty(op)
        @set 'operation', op
        break
  ).observes('type')    

  
  serialize: ->
    {
      property: @get 'property'
      type: @get 'type'
      scope: @get 'scope'
      negation: @get 'negation'
      operation: @get 'operation'
      value1: @get 'value1'
      value2: @get 'value2'
      connect: @get 'connect'
    } 

    

  
    


  

   
    

