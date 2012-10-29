#TODO: I don't have a clear idea on how to use this in a non DS/REST Manager setup, parked this definition
App.Condition = Ember.Object.extend
  property: null
  type: 'String'
  negation: 'false'
  operation: null
  value1: null
  value2: null
  connect: 'and'
  

  opShow: null
  opList: null

  init: ->
    @_super()
 
    op = @get 'operation'     
    type = @get 'type'
    @set 'opList', App.operationsList[type]
    if op is null        
      @set 'opShow', App.operationsList[type][0]
    else
      @set 'opShow', App.opLookup[op]

  changeOperationOnType: ->
    type = @get 'type'
    @set 'opList', App.operationsList[type]
    @set 'opShow', App.operationsList[type][0]

   
    

