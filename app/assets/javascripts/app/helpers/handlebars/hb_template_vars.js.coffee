

# ---------------------------------------------------------
App.testTemplateDataType= (obj, key, options, type) ->
  context = (options.contexts and options.contexts[0]) or obj
  namescope = Ember.Handlebars.getPath(context, key, options)
  namescopeArr = namescope.split('.')
  datatype = namescopeArr[App.templatesConstants.type]

  if datatype is App.templatesLibraryVars[type]
    options.fn(obj)
  else
    options.inverse obj

Handlebars.registerHelper "isNumeric", (key, options) ->
  App.testTemplateDataType( this, key, options, 'numeric')
 
Handlebars.registerHelper "isFont", (key, options) ->
  App.testTemplateDataType( this, key, options, 'font')

Handlebars.registerHelper "isColor", (key, options) ->
  App.testTemplateDataType( this, key, options, 'color')

Handlebars.registerHelper "isAlign", (key, options) ->
  App.testTemplateDataType( this, key, options, 'align')

Handlebars.registerHelper "isString", (key, options) ->
  App.testTemplateDataType( this, key, options, 'string')

Handlebars.registerHelper "isUrl", (key, options) ->
  App.testTemplateDataType( this, key, options, 'url')

# ---------------------------------------------------------
Handlebars.registerHelper "getTemplatePlaceHolder", (key, options) ->
  context = (options.contexts and options.contexts[0]) or this
  namescope = Ember.Handlebars.getPath(context, key, options)
  namescopeArr = namescope.split('.')
  namescopeArr[App.templatesConstants.label].capitalize()

# ---------------------------------------------------------
Handlebars.registerHelper "shouldShow", (key, options) ->
  context = (options.contexts and options.contexts[0]) or this
  namescope = Ember.Handlebars.getPath(context, key, options)
  namescopeArr = namescope.split('.')
  if namescopeArr[App.templatesConstants.show] is 't'
    options.fn(this)
  else
    options.inverse this