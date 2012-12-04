

# ---------------------------------------------------------
App.testTemplateDataType= (obj, type, api, key, options, check) ->  
  context = (options.contexts and options.contexts[0]) or obj
  type_in = Ember.Handlebars.get(context, type, options)
  api_in  = Ember.Handlebars.get(context, api, options)
  key_in  = Ember.Handlebars.get(context, key, options)
  test_key = trigger_fish.rbT.templateArgs[ type_in + '.' + api_in][key_in]['key']

  namescopeArr = test_key.split('.')
  datatype = namescopeArr[App.templatesConstants.varType]  
  if datatype is App.templatesLibraryVars[check]    
    options.fn(obj)
  else
    options.inverse obj
# ----------------------------------------------------------------
Handlebars.registerHelper "isNumeric", (type, api, key, options) ->    
  App.testTemplateDataType( this, type, api, key, options, 'numeric')

# ---------------------------------------------------------------- 
Handlebars.registerHelper "isFont", (type, api, key, options) ->  
  App.testTemplateDataType( this, type, api, key, options, 'font')

# ----------------------------------------------------------------
Handlebars.registerHelper "isColor", (type, api, key, options) ->    
  App.testTemplateDataType( this, type, api, key, options, 'color')
# ----------------------------------------------------------------
Handlebars.registerHelper "isAlign", (type, api, key, options)->
  App.testTemplateDataType( this, type, api, key, options, 'align')  

# ----------------------------------------------------------------
Handlebars.registerHelper "isString", (type, api, key, options) ->
  App.testTemplateDataType( this, type, api, key, options, 'string')    

# ----------------------------------------------------------------
Handlebars.registerHelper "isVString", (type, api, key, options) ->
  App.testTemplateDataType( this, type, api, key, options, 'vstring')     

# ----------------------------------------------------------------
Handlebars.registerHelper "isUrl", (type, api, key, options) ->
  App.testTemplateDataType( this, type, api, key, options, 'url')      
# ----------------------------------------------------------------
Handlebars.registerHelper "isWeight", (type, api, key, options) ->
  App.testTemplateDataType( this, type, api, key, options, 'weight')  
#----------------------------------------------------------
Handlebars.registerHelper "getTemplateName", (type, api, options) ->
  
  context = (options.contexts and options.contexts[0]) or this  
  type_in = Ember.Handlebars.get(context, type, options)      
  api_in = Ember.Handlebars.get(context, api, options)      
  id = type_in + '.' + api_in  
  trigger_fish.rbT.templateName[id]

# ---------------------------------------------------------
Handlebars.registerHelper "getTemplatePlaceHolder", (type, api, key, options) ->
  context = (options.contexts and options.contexts[0]) or this
  type_in = Ember.Handlebars.get(context, type, options)
  api_in = Ember.Handlebars.get(context, api, options)
  key_in = Ember.Handlebars.get(context, key, options)
  test_key = trigger_fish.rbT.templateArgs[ type_in + '.' + api_in][key_in]['key']
  namescopeArr = test_key.split('.')
  namescopeArr[App.templatesConstants.label].replace(/_/g, ' ')
# ---------------------------------------------------------
Handlebars.registerHelper "shouldShow", (type, api, key, options) ->
  context = (options.contexts and options.contexts[0]) or this
  type_in = Ember.Handlebars.get(context, type, options)
  api_in = Ember.Handlebars.get(context, api, options)
  key_in = Ember.Handlebars.get(context, key, options)
  template_id = type_in + '.' + api_in
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
  key_in = Ember.Handlebars.get(context, key, options)
  ret = options.fn(                              
                    bindVal: 'view.params.' + key_in                               
                  )
  ret



# ---------------------------------------------------------------
Handlebars.registerHelper "eachSortedParam", (type, api, obj, options) ->
  ret = ""
  context = (options.contexts and options.contexts[0]) or this
  hash = Ember.Handlebars.get(context, obj, options)  
  type_in = Ember.Handlebars.get(context, type, options)
  api_in = Ember.Handlebars.get(context, api, options)  
  template_id = type_in + '.' + api_in
  targ = trigger_fish.rbT.templateArgs  

  if targ.hasOwnProperty template_id    

    arr = []

    
    compare= (in1,in2)->
      a = in1.name.toLowerCase()
      b = in2.name.toLowerCase()            
      ((a < b) ? -1 : ((a > b) ? 1 : 0))  
      
      
    

    for prop of hash    
      if hash.hasOwnProperty(prop)
        key = targ[template_id][prop]['key']
        namescopeArr = key.split('.')        
        temp = 
              id: prop
              name: namescopeArr[App.templatesConstants.label].replace(/_/g, '')
        arr.push(temp)

    console.log arr
    arr = arr.sort()
    console.log arr
  
  
    for temp in arr
      ret = ret + options.fn(                              
                                iter_key: temp.id
                                iter_val: hash[temp.id]
                              )
    
    ret  