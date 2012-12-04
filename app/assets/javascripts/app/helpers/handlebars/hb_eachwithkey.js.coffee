# A simple helper to let me set the values to any thing in the option listing
Handlebars.registerHelper 'getvalue', (param, options) ->  
  return false  if not param?
  context = (options.contexts and options.contexts[0]) or this  
  value = Ember.Handlebars.get(context, param, options)  
  
  return value

 