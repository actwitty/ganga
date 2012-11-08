App.BannerView = Ember.View.extend
  templateName: 'banner/banner'
  showHideClass: 'hide'
  msgContextBinding: 'App.router.applicationController.msgContext'
  
  msgContextChangeObserve: (-> 
    msgContext  = @get 'msgContext'
    if msgContext .hasOwnProperty('message')
      @set 'showHideClass', 'show'
    else
      @set 'showHideClass', 'hide'

  ).observes('msgContext')

  # hideInfo: (event) ->
  #   @set 'showHideClass', 'hide'
  #   event.preventDefault()
