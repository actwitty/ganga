App.ApplicationController = Ember.Controller.extend
  transaction: null
  content: []
  init: ->    
    App.actions = App.ActionHelper.create()
  #------------------------------------------
  errorMessage: {}
  setInlineAlert: (classIn,headerIn,messageIn) ->    
    errorMessage = 
                    class: classIn
                    header: headerIn
                    message: messageIn    
    @set 'errorMessage', errorMessage
  #------------------------------------------
  #------------------------------------------
  msgContext: {}
  #------------------------------------------


