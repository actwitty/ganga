# App created for Ember
window.App = Em.Application.create()

#Main error handler function
App.displayError = (e) ->
  if typeof e is "string"
    
    # display error strings
    alert e
  else if typeof e is "object" and e.responseText isnt `undefined`
    
    # TODO - further process json errors
    alert e.responseText
  else
    alert "An unexpected error occurred."
