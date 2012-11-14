App.Account = Ember.Object.extend
  email: null
  name: null  
  _id: null
  description: null

  id: (->  	
  	@get '_id'
  ).property('_id')



