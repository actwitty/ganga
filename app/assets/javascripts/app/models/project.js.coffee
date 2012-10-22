App.Project = Ember.Object.extend(      
  created_at: null
  app_id: null
  account_id: null
  schema: null
  rules: null
  description: {email: null, address: null, domain: null, name: null}   
  hasManyRules: []


  init: ->
    @_super  
    hasManyRules = []     
    rules = @get 'rules'       
    if rules isnt null
      for rule in rules
        hasManyRules.pushObject(App.Rule.create(rule)) 
    @set 'hasManyRules', hasManyRules
    
   
  created_time: (->
    time = @get('created_at')    
    date = new Date (time)
    date.toString()
  ).property('created_at')

  filterData: ->
    data = {}
    data.app_id = @app_id    
    data.account_id = @account_id        
    data.description = @description
    return data


)