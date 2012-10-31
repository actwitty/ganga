Handlebars.registerHelper "ifequal", (val1, val2, options) ->
  return false  if not val1? or not val2?
  context = (options.contexts and options.contexts[0]) or this
  val1 = Ember.Handlebars.getPath(context, val1, options)
  val2 = Ember.Handlebars.getPath(context, val2, options)
  if val1 is val2
    options.fn(this)
  else
    options.inverse this





