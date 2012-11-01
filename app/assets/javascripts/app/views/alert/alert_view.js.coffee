App.AlertView = Ember.View.extend
  templateName: 'alert/alert'

  fancyBoxAlertRequested: (->            
    
    alertParams = @get 'alertParams'
    
    #Put to execute in next runloop
    if alertParams isnt null and alertParams.activate is true      
      Ember.run.next( @, 'showAlertFancyBox')

  ).observes('alertParams')
  
    
    

  #------------------------------
  showAlertFancyBox: ->   
    currentView = @    
    $.fancybox(
                content:$(".fb_alert")
                modal: true
                showCloseButton: false
              )


    $(".alert_btn").click ->
      currentView.closeAlertFancyBox()
      alertParams = currentView.get 'alertParams'
      tag = $(this).attr('tag')
      callback = alertParams[tag]['callback']
      context = alertParams[tag]['context']
      callback(context)
  
  #------------------------------
  closeAlertFancyBox: ->    
    $.fancybox.close()

