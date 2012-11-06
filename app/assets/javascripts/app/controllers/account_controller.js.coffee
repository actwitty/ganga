App.AccountController = Em.ObjectController.extend
  content: null  
  url: "/credentials"   
  logoutUrl: "/signout"
  #------------------------------------------------------
  load: ->
    controllerObj = this
    controllerObj.set 'content', null
    
    success= (data) ->
      account = App.Account.create(data)
      
      controllerObj.set 'content', account      
      
      App.get("router").send("credentialGetDone")
  
    error= () ->
      App.get("router").send("credentialGetFailed")
    

    App.getRequest controllerObj.url, {}, success, error
  #------------------------------------------------------
  logout: ->
    controllerObj = this
    controllerObj.set 'content', null

    success= (data) ->
      App.get("router").send("logoutDoneEvent")    
    error= () ->      
    
    App.getRequest controllerObj.logoutUrl, {}, success, error


  
   
   
	
  		
