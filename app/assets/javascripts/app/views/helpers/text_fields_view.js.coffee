App.RequiredAFTextField = Ember.TextField.extend
  attributeBindings: ["accept", "autocomplete", "autofocus", "name", "required"]


App.RequiredTextField = Ember.TextField.extend
  attributeBindings: ["accept", "name", "required"]


App.NonRequiredTextField = Ember.TextField.extend
  attributeBindings: ["accept", "autofocus", "name"]



App.RequiredEmailField = Ember.TextField.extend
  attributeBindings: ["accept", "name", "required"]

  focusOut: ->  
    emailAddr = @get 'value'
    emailAddr= jQuery.trim( emailAddr )
    emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

    if emailAddr.length is 0
      emailAddr =  ''
      this.get('parentView').set('validationErr', @get 'name' + 'cannot be blanks')
    if emailReg.test(emailAddr)
      App.log 'DBG', 'Email id is good'
    else
      emailAddr =  ''
      this.get('parentView').set('validationErr', @get 'name' + ' address is invalid')

    @set 'value', emailAddr

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
      this.get('parentView').set('validationErr', @get 'name' + ' address is invalid')

    @set 'value', emailAddr

