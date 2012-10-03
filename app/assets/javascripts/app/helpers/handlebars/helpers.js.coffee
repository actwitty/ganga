getPath = Ember.Handlebars.getPath
Handlebars.registerHelper "ifequal", (val1, val2, options) ->
  return false  if not val1? or not val2?
  context = (options.fn.contexts and options.fn.contexts[0]) or this
  val1 = getPath(context, val1, options.fn)
  val2 = getPath(context, val2, options.fn)
  if val1 is val2
    return options.fn(this)
    val1
  else
    options.inverse this

console.log "Handlebars.registerHelper"


Handlebars.registerHelper "console_log", (val1,options) ->
  return false  if not val1?	
  context = (options.contexts.fn and options.fn.contexts[0]) or this
  val1 = getPath(context, val1, options.fn)
  console.log  "Amartya_console"
  console.log val1

