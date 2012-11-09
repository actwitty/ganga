App.InlineAlertView = Ember.View.extend
  templateName: 'alert/inline_alert'

  #-----------------------------------------------------------
  bootstrap: 
            error: 'alert alert-error'
            success: 'alert alert-success'
            info: 'alert alert-info'
            block: 'alert alert-block'

            
  alertClass: ''
  displayText: ''
  header: ''
  alertShowClass: 'hide'
  
  

  #-----------------------------------------------------------
  closeOnAlert: (event) ->    
    @set 'alertShowClass', 'hide'
    

    
  #-----------------------------------------------------------
  init: ->    
    @_super()    
    controller = App.get("router.applicationController")
    controller.set('errorMessage', {})


  #------------------------------------------------------------
  errorChangeObserve: (->    
    
    classes = @get 'bootstrap'
    controller = App.get("router.applicationController")
    errorMessage = controller.get('errorMessage')
    

    if errorMessage.hasOwnProperty('class') and classes.hasOwnProperty(errorMessage.class)      
      @set 'alertClass', classes[errorMessage.class]
    else       
      @set 'alertClass', classes.block

    
    if errorMessage.hasOwnProperty('header')
      @set 'header', errorMessage.header
    else
      @set 'header', ''

    
    if errorMessage.hasOwnProperty('message') and errorMessage.message.length isnt 0      
      @set 'displayText', errorMessage.message      
      @set 'alertShowClass', 'show_block'
    else   
      console.log 'BAILING OUT'
      @set 'header', ''
      @set 'alertClass', ''
      @set 'displayText', null
      @set 'alertShowClass', 'hide'

  ).observes('App.router.applicationController.errorMessage')





