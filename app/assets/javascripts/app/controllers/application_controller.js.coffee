App.ApplicationController = Ember.ObjectController.extend
  transaction: null
  content: []

  # 
  errorMessage: {}
  setInlineAlert: (classIn,headerIn,messageIn) ->    
    errorMessage = 
                    class: classIn
                    header: headerIn
                    message: messageIn    
    @set 'errorMessage', errorMessage


