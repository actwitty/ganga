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

    if emailReg.test(emailAddr)
      App.log 'DBG', 'Email id is good'
    else
      emailAddr =  ''
      message = @get ('name')
      message = message.concat(' is invalid')      
      
      App.get('router.applicationController').setInlineAlert('error', 'Validation Failed !', message )            

    @set 'value', emailAddr

#------------------------------------------------------------------
App.NonRequiredEmailField = Ember.TextField.extend
  attributeBindings: ["accept", "name", "required"]

  focusOut: ->  
    emailAddr = @get 'value'
    emailAddr= jQuery.trim( emailAddr )
    emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
   
    if emailReg.test(emailAddr)
      App.log 'DBG', 'Email id is good'
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
    urlReg = /http(s?):\/\/www\.[A-Za-z0-9\.-]{3,}\.[A-Za-z]{3}/

    if url.length is 0
      url =  ''
      message = @get ('name')
      message = message.concat(' cannot be blank, it must be of the form http://www.google.com')
      App.get('router.applicationController').setInlineAlert('error', 'Validation Failed !', message ) 

    if urlReg.test(url)
      App.log 'DBG', 'Email id is good'
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
      message = message.concat(' cannot be blank, can be only alphabets, numerics, underscore')
      App.get('router.applicationController').setInlineAlert('error', 'Validation Failed !', message ) 

    if nameReg.test(name)
      App.log 'DBG', 'Email id is good'
    else
      name =  ''
      message = @get ('name')
      message = message.concat(' is invalid, can be only alphabets, numerics, underscore')
      
      App.get('router.applicationController').setInlineAlert('error', 'Validation Failed !', message )            

    @set 'value', name

