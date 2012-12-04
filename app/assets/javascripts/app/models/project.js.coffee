App.Project = Ember.Object.extend  
  id: null
  account_id: null
  schema: null
  rules: null
  description: 
              email: null
              comment: null
              origin: 'http://'
              name: null
              super_actor_id: null              
  hasManyRules: null


  init: ->
    @_super  
    
  setRules: (rules)->    
    hasManyRules = [] 
    if rules isnt null
      for rule in rules
        hasManyRules.pushObject(App.Rule.create(rule)) 
    @set 'hasManyRules', hasManyRules

  checkRulesIsNull: ->
    hasManyRules = @get 'hasManyRules'
    if hasManyRules is null
      true
  serialize: -> 
    {
      id:       @get 'id'
      account_id:   @get 'account_id'
      schema:       @get 'schema'
      description:  @get 'description'
      # rules: rules      
    }
   


  filterData: ->
    data = {}
    data.id = @id    
    data.account_id = @account_id        
    data.description = @description
    return data


