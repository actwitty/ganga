Handlebars.registerHelper "isShowOne", (op, options) ->
  context = (options.contexts and options.contexts[0]) or this
  op = Ember.Handlebars.getPath(context, op, options)
  if App.operationsValuesCount[op] >= 1
    options.fn(this)
  else
    options.inverse this

  
Handlebars.registerHelper "isShowTwo", (op, options) ->
  context = (options.contexts and options.contexts[0]) or this
  op = Ember.Handlebars.getPath(context, op, options)
  if App.operationsValuesCount[op] >= 2
    options.fn(this)
  else
    options.inverse this


Handlebars.registerHelper "getType", (condition, options) ->
  context = (options.contexts and options.contexts[0]) or this
  condition = Ember.Handlebars.getPath(context, condition, options)
  if App.operationsValuesType[condition.op] is 'type'
  	condition.type
  else
  	App.operationsValuesType[condition.op]

Handlebars.registerHelper "getOperationDescription", (op, options) ->
  context = (options.contexts and options.contexts[0]) or this
  op = Ember.Handlebars.getPath(context, op, options)
  App.operationsLibrary[op].capitalize()



  

