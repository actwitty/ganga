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

  inited: false
  # ----------------------------------------------------
  init: ->    
    @_super()            
    @setUniqProperty()
    @setValueDefault(false)
    @setOperationList(false)     

    # this must be last
    Ember.run.next(this, 'enableObserversAfterInit')

  # ----------------------------------------------------
  enableObserversAfterInit: ->
    @set 'inited', true

  # ----------------------------------------------------
  setUniqProperty: ->
    scope = @get 'scope'
    property = @get 'property'
    @set 'property', scope + '.' + property  
  # ----------------------------------------------------
  setOperationList: (reset)->       
    property = @get 'property'        
    # Override for some system parameters that have a predefined list of values    
    if App.operationListOverrides.hasOwnProperty(property)         
      
      @set 'opList', App.operationListOverrides[property]
      if reset is true or operation is null      
        for op of App.operationListOverrides[property]                  
          if App.operationListOverrides[property].hasOwnProperty(op)
            @set 'operation', op
            break

    else      
      type = @get 'type'         
      @set 'opList', App.operationsList[type]    
      operation = @get 'operation' 

      if reset is true or operation is null      
        for op of App.operationsList[type]        
          if App.operationsList[type].hasOwnProperty(op)
            @set 'operation', op
            break
  # ----------------------------------------------------
  setValueDefault: (reset) ->
    property = @get 'property'    
    if App.LimitedValueList.hasOwnProperty(property)       
      @set 'valueOptions', App.LimitedValueList[property]      
      value1 = @get('value1')    

      if reset is true or value1 is null or value1.length is 0          
        for key of App.LimitedValueList[property]
          
          @set 'value1', key        
          break
        @set 'value2', '' 
    else
      if reset is true
        @set 'valueOptions', null
        @set 'value1', ''
        @set 'value2', ''


  # ----------------------------------------------------
  observeOperationChange: (->  
    if @get('inited')  is true
      @setValueDefault(true)

  ).observes('operation')

  # ----------------------------------------------------
  observesTypeChange: (->
    if @get('inited')  is true
      @setOperationList(true)
      @setValueDefault(true)
  ).observes('type')    


  observesPropertyChange: (->
    if @get('inited')  is true      
      @setOperationList(true)
      @setValueDefault(true)              
  ).observes('property')  

  trueProperty: ->
    property = @get 'property'
    length = property.length
    property.substr(2, length-2)
    
  serialize: ->
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

    

  
    


  

   
    

