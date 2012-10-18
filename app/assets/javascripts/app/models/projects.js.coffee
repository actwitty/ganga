App.Project = Ember.Object.extend(    
  schema: null
  created_at: null
  app_id: null
  account_id: null


  description: {email: null, address: null, domain: null, name: null}   

  created_time: (->
    time = @get('created_at')    
    date = new Date (time)
    date.toString()
  ).property('created_at')

  filterData: ->
    data = {}
    data.app_id = @app_id
    data.account_id = @account_id
    data.name = @name
    data.domain = @domain
    data.schema = @schema
    data.description = @description
    return data
)