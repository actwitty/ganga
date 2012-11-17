

# ---------------------------------------------------------
App.testTemplateDataType= (obj, name, api, key, options, type) ->  
  context = (options.contexts and options.contexts[0]) or obj
  name_in = Ember.Handlebars.getPath(context, name, options)
  api_in  = Ember.Handlebars.getPath(context, api, options)
  key_in  = Ember.Handlebars.getPath(context, key, options)
  test_key = trigger_fish.rbT.templateArgs[ name_in + '.' + api_in][key_in]['key']

  namescopeArr = test_key.split('.')
  datatype = namescopeArr[App.templatesConstants.type]  
  if datatype is App.templatesLibraryVars[type]    
    options.fn(obj)
  else
    options.inverse obj
# ----------------------------------------------------------------
Handlebars.registerHelper "isNumeric", (name, api, key, options) ->    
  App.testTemplateDataType( this, name, api, key, options, 'numeric')

# ---------------------------------------------------------------- 
Handlebars.registerHelper "isFont", (name, api, key, options) ->  
  App.testTemplateDataType( this, name, api, key, options, 'font')

# ----------------------------------------------------------------
Handlebars.registerHelper "isColor", (name, api, key, options) ->    
  App.testTemplateDataType( this, name, api, key, options, 'color')
# ----------------------------------------------------------------
Handlebars.registerHelper "isAlign", (name, api, key, options)->
  App.testTemplateDataType( this, name, api, key, options, 'align')  

# ----------------------------------------------------------------
Handlebars.registerHelper "isString", (name, api, key, options) ->
  App.testTemplateDataType( this, name, api, key, options, 'string')      

# ----------------------------------------------------------------
Handlebars.registerHelper "isUrl", (name, api, key, options) ->
  App.testTemplateDataType( this, name, api, key, options, 'url')      
# ----------------------------------------------------------------
Handlebars.registerHelper "isWeight", (name, api, key, options) ->
  App.testTemplateDataType( this, name, api, key, options, 'weight')  
#----------------------------------------------------------
Handlebars.registerHelper "getTemplateName", (name, api, options) ->
  
  context = (options.contexts and options.contexts[0]) or this  
  name_in = Ember.Handlebars.getPath(context, name, options)      
  api_in = Ember.Handlebars.getPath(context, api, options)      
  id = name_in + '.' + api_in  
  trigger_fish.rbT.templateName[id]

# ---------------------------------------------------------
Handlebars.registerHelper "getTemplatePlaceHolder", (name, api, key, options) ->
  context = (options.contexts and options.contexts[0]) or this
  name_in = Ember.Handlebars.getPath(context, name, options)
  api_in = Ember.Handlebars.getPath(context, api, options)
  key_in = Ember.Handlebars.getPath(context, key, options)
  test_key = trigger_fish.rbT.templateArgs[ name_in + '.' + api_in][key_in]['key']
  namescopeArr = test_key.split('.')
  namescopeArr[App.templatesConstants.label]
# ---------------------------------------------------------
Handlebars.registerHelper "shouldShow", (name, api, key, options) ->
  context = (options.contexts and options.contexts[0]) or this
  name_in = Ember.Handlebars.getPath(context, name, options)
  api_in = Ember.Handlebars.getPath(context, api, options)
  key_in = Ember.Handlebars.getPath(context, key, options)
  template_id = name_in + '.' + api_in
  targ = trigger_fish.rbT.templateArgs  
  if targ.hasOwnProperty template_id    
    if targ[template_id].hasOwnProperty key_in       
      if targ[template_id][key_in]         
        if targ[template_id][key_in].hasOwnProperty 'key'          
          test_key = targ[template_id][key_in]['key']
          namescopeArr = test_key.split('.')
          if namescopeArr[App.templatesConstants.show] is 't'
            return options.fn(this)

    
  
  options.inverse this

# -----------------------------------------------------
  
Handlebars.registerHelper "paramBind", (key, options) ->
  ret = ""    
  context = (options.contexts and options.contexts[0]) or this
  key_in = Ember.Handlebars.getPath(context, key, options)
  ret = options.fn(                              
                    bindVal: 'view.params.' + key_in                               
                  )
  ret
