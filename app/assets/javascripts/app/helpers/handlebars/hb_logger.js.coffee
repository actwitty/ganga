Handlebars.registerHelper 'logger', (param,options) ->  
  return false  if not param?
  context = (options.contexts and options.contexts[0]) or this  
  value = Ember.Handlebars.getPath(context, param, options)  
  return false  if not value?	

  App.log App.DBG, '[Handlebars] --- start '
  console.log value
  App.log App.DBG, '[Handlebars] --- end '

