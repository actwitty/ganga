App.mixpanel  = class MixpanelApi
  _identity: `undefined`
  
  
  mixPanelResponse  : (response) ->
    if response is -1
        App.log App.DBG, "Request queued until identify() is called."
    else if response is 0
        App.log App.DBG, "Invalid request, rejected by API."
    else if response is 1
        App.log App.DBG, "Successful response from server."
    
  @setUserIdentity: (identifier) ->
      unless identifier is `undefined`
        @_identity = identifier      
        mixpanel.people.identify identifier, (response) ->
          if response is -1
            console.log "Request queued until identify() is called."
          else if response is 0
            console.log "Invalid request, rejected by API."
          else console.log "Successful response from server."  if response is 1
        
    
  @userInviteSet: (email) ->
    @setUserIdentity email
    mixpanel.people.set
              "$email": email
              "$created": new Date()
              "invited": new Date()
              "signins" : 0
              

  @trackMinuteSpent: () ->
    setInterval mixpanel.people.increment("minutes_spent": 1), 6000

  @trackMainPage: (event) ->
    mixpanel.people.increment event, 1

  @trackSignUp: (email, username) ->
    @setUserIdentity email
    mixpanel.people.set
              "$email": email
              "$created": new Date()
              "$username": name
              "signins" : 0

  @trackSignIn: (email) ->        
    @setUserIdentity email                
    mixpanel.people.set
               $email: email
               $last_login: new Date() 
    mixpanel.people.increment "signins", 1

    


