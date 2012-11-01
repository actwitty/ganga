Handlebars.registerHelper "eachProperty", (obj, options) ->
  ret = ""
  context = (options.contexts and options.contexts[0]) or this
  hash = Ember.Handlebars.getPath(context, obj, options)
  for prop of hash    
    if hash.hasOwnProperty(prop)
      ret = ret + options.fn(                              
                              iter_key: prop
                              iter_val: hash[prop]
                            )
    
  ret