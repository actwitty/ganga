########################################################
# Main account resource
#######################################################
App.Account = Ember.Resource.extend(
  resourceUrl: '/account'
  resourceName: 'account'
  resourceProperties: [ 'email', 'first_name', 'last_name']

  validate: () ->
    return 
  
  fullName: Ember.computed(->
    @get("first_name") + " " + @get("last_name")
  ).property("first_name", "last_name")
)

