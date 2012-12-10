# ---------------------------------------------------------
App.testTemplateDataType= (obj, type, api, key, options, check) ->  
  context = (options.contexts and options.contexts[0]) or obj
  type_in = Ember.Handlebars.get(context, type, options)
  api_in  = Ember.Handlebars.get(context, api, options)
  key_in  = Ember.Handlebars.get(context, key, options)  
  
  templates = App.actions.get('template')  
  template_id = templates.getKey(type_in,api_in)    
  
  test_key = templates.params[template_id][key_in]['key']

  namescopeArr = test_key.split('.')
  datatype = namescopeArr[templates.configs.parse.varType]  

  if datatype is templates.configs.vars[check]        
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
# -----------------------------------------------------------------
Handlebars.registerHelper "isWeight", (type, api, key, options) ->
  App.testTemplateDataType( this, type, api, key, options, 'weight')  

# ----------------------------------------------------------------
Handlebars.registerHelper "isImg", (type, api, key, options) ->      
  App.testTemplateDataType( this, type, api, key, options, 'image')

# ------------------------------------------------------------------------------
Handlebars.registerHelper "getTemplatePlaceHolder", (type, api, key, options) ->
  context = (options.contexts and options.contexts[0]) or this
  type_in = Ember.Handlebars.get(context, type, options)
  api_in = Ember.Handlebars.get(context, api, options)
  key_in = Ember.Handlebars.get(context, key, options)
  templates = App.actions.get('template');

  template_id = templates.getKey(type_in,api_in)  
  test_key = templates.params[template_id][key_in]['key']
  
  namescopeArr = test_key.split('.')  
  label_arr = namescopeArr[templates.configs.parse.label].split('_')
  label_arr.splice(0,1)
  label_arr.join(' ')

# -------------------------------------------------------
  
Handlebars.registerHelper "paramBind", (key, options) ->
  ret = ""    
  context = (options.contexts and options.contexts[0]) or this
  key_in = Ember.Handlebars.get(context, key, options)
  console.log key_in
  ret = options.fn(                              
                    bindVal: 'view.params.' + key_in                               
                  )
  ret

# -------------------------------------------------------------------------
Handlebars.registerHelper "eachSortedParam", (type, api, obj, options) ->
  ret = ""
  context = (options.contexts and options.contexts[0]) or this
  hash = Ember.Handlebars.get(context, obj, options)  
  type_in = Ember.Handlebars.get(context, type, options)
  api_in = Ember.Handlebars.get(context, api, options)    
  targ = App.templateParams

  templates = App.actions.get 'template'
  template_id = templates.getKey(type_in,api_in)  

  targ = templates.get 'params'

  if targ.hasOwnProperty template_id    

    arr = []

    
    compare= (in1,in2)->
      a = in1.name.toLowerCase()
      b = in2.name.toLowerCase() 
      result = 0
      if a < b 
        result = -1
      else
        result = 1            
      

    for prop of hash    
      if hash.hasOwnProperty(prop)
        key = targ[template_id][prop]['key']
        namescopeArr = key.split('.')        
        temp = 
              id: prop
              name: namescopeArr[templates.configs.parse.label].replace(/_/g, '')
              head: namescopeArr[templates.configs.parse.label].split('_')[0]
              level: namescopeArr[templates.configs.parse.level]
        arr.push(temp)
    
    arr = arr.sort(compare)
    # TODO
    # Sorry to write some bad code, will write a new handlebar for this
    last_head = null    
    last_temp = null
    hard_count = 0
    easy_count = 0
    
    for temp in arr
      temp['last_tail'] = false
      temp['new_head'] = false      

      if temp['head'] != last_head
        temp['new_head'] = true
        if last_temp isnt null
          last_temp['last_tail'] = true

        if hard_count > 0 and easy_count > 0
          last_temp['show_more'] = true
        else if hard_count > 0 and easy_count <= 0
          last_temp['show_all'] = true

        hard_count = 0
        easy_count = 0


      else
        temp['new_head'] = false


      if temp['level'] is 'e'
        temp['class'] = 'easy'
        easy_count = easy_count + 1
      else
        temp['class'] = 'hard'
        hard_count = hard_count + 1

      last_head = temp['head']
      last_temp = temp

    last_temp['last_tail'] = true


    for temp in arr          
      ret = ret + options.fn(                
                              iter_key: temp.id
                              iter_val: temp
                            )
    ret