App.Router = Ember.Router.extend
  location: "hash"
  enableLogging: true
    
  root: Ember.Route.extend
    
    #SETUP
    #EVENTS
      initDone: (router, event) ->
        if App.inDevise is true
          router.transitionTo('devisePage')
        else
          if App.isLoggedIn is true
            router.get('accountController').load()            
          else
            router.transitionTo('mainPage')
      credentialGetDone: (router, event) ->
        router.transitionTo('loggedInPage')
      credentialGetFailed:(router, event) ->
        router.transitionTo('mainPage')
    #STATES
    index: Ember.Route.extend
      #SETUP
      route: '/'  
      #EVENTS


      #STATES

    devisePage: Ember.Route.extend
      #SETUP
      route: '/'
      connectOutlets: (router) ->
        router.get('applicationController').connectOutlet('devise')
        deviseController = router.get('deviseController')
        deviseController.connectOutlet({name: 'deviseTopbar',outletName: 'deviseTopBarOutlet'} )
      #EVENTS
      #STATES

    mainPage: Ember.Route.extend
      #SETUP
      route: '/'
      connectOutlets: (router) ->        
        router.get('applicationController').connectOutlet('main')
        mainController = router.get('mainController')
        mainController.connectOutlet({name: 'mainTopbar',outletName: 'mainTopBarOutlet'} )
        mainController.connectOutlet({name: 'mainInvite',outletName: 'mainInviteBoxOutlet'} )
      #EVENTS

      #STATES

    loggedInPage  : Ember.Route.extend
      #SETUP
      route: '/home'      

      connectOutlets: (router) ->        
        homeController = router.get('homeController')
        homeController.connectOutlet({name: 'homeSide',outletName: 'homeSideOutlet'} )
        # homeController.connectOutlet({name: 'homeContentDefault',outletName: 'homeContentOutlet'} )

      #EVENTS
      newProject: (router, event) ->

      openProject: (router, event) ->

      editProject: (router, event) ->

      openEvents: (router, event) ->

      openReports: (router, event) ->



      #STATES
      newProject: Ember.Route.extend(
          #SETUP
          route: '/new'
          connectOutlets: (router) ->
            homeController = router.get('homeController')
            projectEditController = router.get('projectEditController')
            projectEditController.set 'content', App.Project.create()
            projectEditController.set 'isNew', true  

            homeController.connectOutlet({name: 'projectEdit',outletName: 'homeContentOutlet'} )

          #EVENTS
          cancel: (router, event) ->

          save: (router, event) ->
          
          #STATES


        )
      projectOpened: Ember.Route.extend(
        #SETUP
        route: "/project"

        #EVENTS

        
        
        #STATES       
        creatingRule: Ember.Route.extend(
          
          #SETUP
          route: "/rule"

          #EVENTS
          connectOutlets: (router) ->
            router.get("rulesController").get('content')
            homeContentDefaultController = router.get("homeContentDefaultController")
            homeContentDefaultController.connectOutlet "addRuleButton"
            addRuleButtonController = router.get("addRuleButtonController")
            addRuleButtonController.connectOutlet "rules"
          
          addRule: (router) ->
            ruleController = router.get("rulesController")
            ruleController.addNewCategory()
            router.get("addRuleButtonController").connectOutlet
              name: "submitRuleButton"
              outletName: "submitRuleButonOutlet"

          editRule: (router, event) ->
            router.get("rulesController").init()
            router.get("rulesController").loadAPresetRule()   

            router.get("addRuleButtonController").connectOutlet
                                                            name: "submitRuleButton"
                                                            outletName: "submitRuleButonOutlet" 

            router.transitionTo "creatingRule"
           
          
          openRule: Ember.Route.transitionTo("creatingRule") 

          ruleSubmittedSuccess: Ember.Route.transitionTo("submittedRule")
        
        )

        submittedRule: Ember.Route.extend(
          
          #SETUP
          route: "/success"

          #EVENTS
          connectOutlets: (router) ->
            homeContentDefaultController = router.get("homeContentDefaultController")
            homeContentDefaultController.connectOutlet "ruleSubSuccess"

            
            
          addAnotherRule: (router) ->
            router.get("rulesController").init()
            router.transitionTo "creatingRule"  

          #STATES

        )

      
      )

        
      #EVENTS
      logoutEvent: Ember.Route.transitionTo 'logout'

      index: Ember.Route.extend
        route: '/'  
      #STATES
      logout: Ember.Route.extend
        route: '/thankyou'
        
        

      
      
  


