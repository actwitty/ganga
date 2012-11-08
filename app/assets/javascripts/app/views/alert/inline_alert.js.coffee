App.InlineAlertView = Ember.View.extend
  templateName: 'alert/inline_alert'
  alertClass: "alert "
  message: null


  errorChangeObserve: (->
    errorMesasge = App.get("router.applicationController.errorMessage")
    
  ).observes('router.applicationController.errorMessage')





  