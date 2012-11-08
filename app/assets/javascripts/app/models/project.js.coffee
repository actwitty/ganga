App.Project = Ember.Object.extend  
  app_id: null
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
    # rules = []
    # for rule in hasManyRules
    #   rules.push rule.serialize 
    {
      app_id: @get 'app_id'
      account_id: @get 'account_id'
      schema: @get 'schema'
      description: @get 'description'
      # rules: rules      
    }
   
  created_time: (->
    time = @get('description.created_at') 
    console.log @get 'description'
    date = new Date (time)
    date.toString()
  ).property('description.created_at')

  filterData: ->
    data = {}
    data.app_id = @app_id    
    data.account_id = @account_id        
    data.description = @description
    return data


