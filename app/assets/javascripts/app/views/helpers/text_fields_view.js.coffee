App.RequiredAFTextField = Ember.TextField.extend
  attributeBindings: ["accept", "autocomplete", "autofocus", "name", "required"]

#------------------------------------------------------------------
App.RequiredTextField = Ember.TextField.extend
  attributeBindings: ["accept", "name", "required"]

#------------------------------------------------------------------
App.NonRequiredTextField = Ember.TextField.extend
  attributeBindings: ["accept", "autofocus", "name"]

#------------------------------------------------------------------
App.RequiredEmailField = Ember.TextField.extend
  attributeBindings: ["accept", "name", "required"]

  focusOut: ->  
    emailAddr = @get 'value'
    emailAddr= jQuery.trim( emailAddr )
    emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    
    if emailAddr.length is 0
      emailAddr =  ''
      message = @get ('name')
      message = message.concat(' cannot be blank')
      App.get('router.applicationController').setInlineAlert('error', 'Validation Failed !', message ) 
    else
      if emailReg.test(emailAddr)        
        App.get('router.applicationController').setInlineAlert('', '', '' )
      else
        emailAddr =  ''
        message = @get ('name')
        message = message.concat(' is invalid')      
        
        App.get('router.applicationController').setInlineAlert('error', 'Validation Failed !', message )            

    @set 'value', emailAddr


#------------------------------------------------------------------
App.RequiredUrlField = Ember.TextField.extend
  attributeBindings: ["accept", "name", "required"]

  focusOut: ->  
    url = @get 'value'
    url= jQuery.trim( url )
    urlReg = /http(s?):\/\/www\.[A-Za-z0-9\.-]{3,}\.[A-Za-z]{2,4}/

    if url.length is 0
      url =  ''
      message = @get ('name')
      message = message.concat(' cannot be blank, it must be of the form http://www.google.com')
      App.get('router.applicationController').setInlineAlert('error', 'Validation Failed !', message ) 
    else
      if urlReg.test(url)
        App.get('router.applicationController').setInlineAlert('', '', '' )
      else
        url =  'http://'
        message = @get ('name')
        message = message = message.concat(' is invalid, it must be of the form http://www.google.com')
        
        App.get('router.applicationController').setInlineAlert('error', 'Validation Failed !', message )            

    @set 'value', url

#------------------------------------------------------------------
App.RequiredNameField = Ember.TextField.extend
  attributeBindings: ["accept", "name", "required"]
  focusOut: ->  
    name = @get 'value'
    name= jQuery.trim(name)
    nameReg = /^[-a-zA-Z0-9_ ]+$/

    if name.length is 0
      name =  ''
      message = @get ('name')
      message = message.concat(' cannot be blank, can be only alphabets, numerics, underscore or hyphen')
      App.get('router.applicationController').setInlineAlert('error', 'Validation Failed !', message ) 
    else
      if nameReg.test(name) is true
        App.get('router.applicationController').setInlineAlert('', '', '' )
      else
        name =  ''
        message = @get ('name')
        message = message.concat(' is invalid, can be only alphabets, numerics, underscore')
        
        App.get('router.applicationController').setInlineAlert('error', 'Validation Failed !', message )            

    @set 'value', name
#------------------------------------------------------------------
App.RequiredTextOnly = Ember.TextField.extend
  attributeBindings: ["accept", "name", "required"]
  focusOut: ->  
    text = @get 'value'
    defaultVal = @get 'defaultVal'

    if defaultVal is null
      defaultVal = ''

    text = jQuery.trim(text)
    textReg = /^[a-zA-Z]+$/

    if text.length is 0
      text =  defaultVal
      message = @get ('name')
      message = message.concat(' cannot be blank, can be only alphabets')
      App.get('router.applicationController').setInlineAlert('error', 'Validation Failed !', message ) 
    else
      if textReg.test(text) is true
        App.get('router.applicationController').setInlineAlert('', '', '' )
      else
        text =  defaultVal
        message = @get ('name')
        message = message.concat(' is invalid, can be only alphabets.')
        
        App.get('router.applicationController').setInlineAlert('error', 'Validation Failed !', message )            

    @set 'value', text    

#------------------------------------------------------------------
App.RequiredNumberOnly = Ember.TextField.extend
  attributeBindings: ["accept", "name", "required"]
  focusOut: ->  
    num = @get 'value'
    defaultVal = '0'
    num = jQuery.trim(num)
    numReg = /^[0-9]+$/

    if num.length is 0
      num =  defaultVal
      message = @get ('name')
      message = message.concat(' cannot be blank')
      App.get('router.applicationController').setInlineAlert('error', 'Validation Failed !', message ) 
    else
      if numReg.test(num) is true
        console.log 'Number  is good'
        App.get('router.applicationController').setInlineAlert('', '', '' )
      else
        num =  defaultVal
        message = @get ('name')
        message = message.concat(' is invalid, can be only numbers.')
        
        App.get('router.applicationController').setInlineAlert('error', 'Validation Failed !', message )            

    @set 'value', num    

