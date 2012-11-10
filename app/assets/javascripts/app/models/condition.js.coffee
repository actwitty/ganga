#TODO: I don't have a clear idea on how to use this in a non DS/REST Manager setup, parked this definition
App.Condition = Ember.Object.extend
  property: 'browser'
  type: 'String'
  scope: 'e'
  negation: 'false'
  operation: 'eql'
  value1: ''
  value2: ''
  connect: 'and'
  valueOptions: null
      
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

    property = @get 'property'
    if App.LimitedValueList.hasOwnProperty(property)
      @set 'valueOptions', App.LimitedValueList[property]
    else
       @set 'valueOptions', null

  observeOperationChange: (->
    property = @get 'property'    
    if App.LimitedValueList.hasOwnProperty(property)       
      for key of App.LimitedValueList[property]
        @set 'value1', key        
        break
      @set 'value2', '' 
    else
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


  observesPropertyChange: (->
    property = @get 'property'
    console.log property 
    if App.LimitedValueList.hasOwnProperty(property)       
      @set 'valueOptions', App.LimitedValueList[property]
      for key of App.LimitedValueList[property]
        @set 'value1', key        
        break
      @set 'value2', '' 
    else
      @set 'valueOptions', null
      @set 'value1', ''
      @set 'value2', ''    
    
      
  ).observes('property')  


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

    

  
    


  

   
    

