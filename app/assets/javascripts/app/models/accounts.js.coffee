########################################################
# Main account resource
#######################################################

App.Account = Em.ResourceController.create(
  resourceUrl:        '/account'
  resourceName:       'account'
  resourceProperties: [ 'email','username', '_id', 'name', 
                        'adress', 'city', 'country', 'region', 
                        'pin_code', 'office', 'mobile' , 'photo']

  init: ->
  


)

