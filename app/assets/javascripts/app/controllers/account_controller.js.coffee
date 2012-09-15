App.AccountController = Em.ObjectController.extend
  
  init: ->    
    self = this 
    $.ajax
      type: "GET"
      url: "/credentials.json"
      contentType: "json"
      dataType: "json"
      data: {}
      success: (data) ->
        App.log App.DBG, "Received: " + JSON.stringify(data)
        self.set('content', App.Account.create(data))        
        if data and data.logged_in is true
          App.get("router").send "loginSwitchRoute"
        else
          App.get("router").send "mainpageSwitchRoute"

      error: (xhr, textStatus, errorThrown) ->
        $("#error").html xhr.responseText

  
   
   
	
  		
