Handlebars.registerHelper "ifnotnull", (val, options) ->
  context = (options.contexts and options.contexts[0]) or this
  valPassed = Ember.Handlebars.getPath(context, val, options)
  if valPassed is null
    options.fn this
  else
    options.inverse this