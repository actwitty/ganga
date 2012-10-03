App.kissmetrics  = class KissMetricsApi
  _identity: `undefined`
   
    
  @setUserIdentity: (identifier) ->
      unless identifier is `undefined`
        @_identity = identifier    
        _kmq.push ["identify", identifier]


        
    
  @userInviteSet: (email) ->
    @setUserIdentity email    
    _kmq.push ["record", "Invited",
      email: email
      created: new Date()
      invited: new Date()
      signins: 0
    ]
              

  @trackMinuteSpent: () ->    
    _kmq.push ["record", "Timespent",
      Minute: "1"
    ]
  @trackMainPage: (event) ->    
    _kmq.push ["trackClick", "event", "Clicked on main page"]

  @trackSignUp: (email, username) ->
    @setUserIdentity email
    _kmq.push ["record", "Signed Up",
      email: email
      last_logged: new Date()
      created: new Date()
      username: username      
    ]

  @trackSignIn: (email) ->        
    @setUserIdentity email                
    _kmq.push ["record", "Signed In",
      email: email
      last_logged: new Date()
      created: new Date()
      username: username      
    ]

    


