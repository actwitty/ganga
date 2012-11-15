#TODO: I don't have a clear idea on how to use this in a non DS/REST Manager setup, parked this definition
App.Condition = Ember.Object.extend
  property: 'browser'
  type: 'String'
  scope: 's'
  negation: 'false'
  operation: 'eql'
  value1: ''
  value2: ''
  connect: null
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
    
    scope = @get 'scope'
    property = @get 'property'
    @set 'property', scope + '.' + property   


    if App.LimitedValueList.hasOwnProperty(property)          
      @set 'valueOptions', App.LimitedValueList[property]      
      value1 = @get 'value1'      
      if value1 is null or value1.length is 0                
        for key of App.LimitedValueList[property]         
          @set 'value1', key        
          break  
    else
      @set 'valueOptions', null

  observeOperationChange: (->
    property = @trueProperty()
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
    property = @trueProperty()
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

  trueProperty: ->
    property = @get 'property'
    length = property.length
    property.substr(2, length-2)
    
  serialize: ->
    console.log {
      
      
      property: @trueProperty()
      type: @get 'type'
      scope: @get 'scope'
      negation: @get 'negation'
      operation: @get 'operation'
      value1: @get 'value1'
      value2: @get 'value2'
      connect: @get 'connect'
    } 
    {
      
      
      property: @trueProperty()
      type: @get 'type'
      scope: @get 'scope'
      negation: @get 'negation'
      operation: @get 'operation'
      value1: @get 'value1'
      value2: @get 'value2'
      connect: @get 'connect'
    } 

    

  
    


  

   
    

