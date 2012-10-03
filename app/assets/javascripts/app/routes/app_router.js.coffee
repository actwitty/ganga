App.Router = Ember.Router.extend
  location: "hash"
  enableLogging: true
    
  root: Ember.Route.extend
    
    #SETUP
    #EVENTS
    loginSwitchRoute: Ember.Route.transitionTo 'loggedIn'
    mainpageSwitchRoute: Ember.Route.transitionTo 'mainPage'
    devisepageSwitchRoute: Ember.Route.transitionTo 'devisePage'
    #STATES
    index: Ember.Route.extend
      route: '/'  

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

    devisePage: Ember.Route.extend
      #SETUP
      route: '/'
      connectOutlets: (router) ->
        router.get('applicationController').connectOutlet('devise')
        deviseController = router.get('deviseController')
        deviseController.connectOutlet({name: 'deviseTopbar',outletName: 'deviseTopBarOutlet'} )
      #EVENTS
      #STATES
    loggedIn  : Ember.Route.extend
      #SETUP
      route: '/home'

      #EVENTS
      connectOutlets: (router) ->
        router.get('applicationController').connectOutlet('home')
        homeController = router.get('homeController')
        homeController.connectOutlet({name: 'homeSideBarDefault',outletName: 'homeSideBarOutlet'} )
        homeController.connectOutlet({name: 'homeContentDefault',outletName: 'homeContentOutlet'} )

      editRule: (router, event) ->
        router.get("rulesController").init()
        router.get("rulesController").loadAPresetRule()   

        router.get("addRuleButtonController").connectOutlet
                                                        name: "submitRuleButton"
                                                        outletName: "submitRuleButonOutlet" 

        router.transitionTo "creatingRule"
       
      
      openRule: Ember.Route.transitionTo("creatingRule") 

      ruleSubmittedSuccess: Ember.Route.transitionTo("submittedRule")

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

      


        
      #EVENTS
      logoutEvent: Ember.Route.transitionTo 'logout'

      index: Ember.Route.extend
        route: '/'  
      #STATES
      logout: Ember.Route.extend
        route: '/thankyou'
        
        

      
      
  


