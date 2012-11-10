App.Project = Ember.Object.extend  
  id: null
  account_id: null
  schema: null
  rules: null
  description: 
              email: null
              address: null
              domain: 'http://'
              name: null
              super_actor_id: null
              created_at: null
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
   
  created_time: (->
    time = @get('description.created_at') 
    date = new Date (time)
    date.toString()
  ).property('description.created_at')

  filterData: ->
    data = {}
    data.id = @id    
    data.account_id = @account_id        
    data.description = @description
    return data


