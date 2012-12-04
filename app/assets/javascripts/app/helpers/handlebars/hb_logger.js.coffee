Handlebars.registerHelper 'logger', (param,options) ->  
  return false  if not param?
  context = (options.contexts and options.contexts[0]) or this  
  value = Ember.Handlebars.get(context, param, options)  
  return false  if not value?	
  console.log value
  

