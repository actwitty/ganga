App.Router = Ember.Router.extend
  location: "hash"
  enableLogging: true
    
  root: Ember.Route.extend
    
    #SETUP
    #EVENTS
      initDone: (router, event) ->
        if App.inDevise is true
          router.transitionTo('deviseState')
        else
          if App.isLoggedIn is true
            router.get('accountController').load()            
          else
            router.transitionTo('landingState')
      credentialGetDone: (router, event) ->        
        router.transitionTo('loggedInState.index')
      credentialGetFailed:(router, event) ->
        router.transitionTo('landingState')

    #STATES
    index: Ember.Route.extend
      #SETUP
      route: '/'  
      #EVENTS


      #STATES

    deviseState: Ember.Route.extend
      #SETUP
      route: '/'
      connectOutlets: (router) ->
        router.get('applicationController').connectOutlet('devise')
        deviseController = router.get('deviseController')
        deviseController.connectOutlet({name: 'deviseTopbar',outletName: 'deviseTopBarOutlet'} )
      #EVENTS
      #STATES

    landingState: Ember.Route.extend (
      #SETUP
      route: '/'
      connectOutlets: (router) ->        
        router.get('applicationController').connectOutlet('main')
        mainController = router.get('mainController')
        mainController.connectOutlet({name: 'mainTopbar',outletName: 'mainTopBarOutlet'} )
        mainController.connectOutlet({name: 'mainInvite',outletName: 'mainInviteBoxOutlet'} )
      #EVENTS

      #STATES
    )
    loggedInState  : Ember.Route.extend
      #SETUP
      route: '/'



      #EVENTS  
      bareBoneAccount: (router, event) ->
        homeController = router.get('homeController')        
        homeController.connectOutlet({name: 'bareBone',outletName: 'homeContentOutlet'} )

      newProject: (router, event) ->
        editController = router.get('projectEditController')
        editController.set('content', App.Project.create())
        editController.set('isNew', true)
        editController.resetStates()
        homeController = router.get('homeController')
        homeController.connectOutlet({name: 'projectEdit', outletName: 'homeContentOutlet'} )     

      editProject: (router, event) ->        
        # Context comes as argument
        project = event.context
        editController = router.get('projectEditController')
        router.get('projectsController').set('selected', project)
        editController.set('content', project)     
        editController.set('isNew', false)
        editController.resetStates()   
        homeController = router.get('homeController')
        homeController.connectOutlet({name: 'projectEdit', outletName: 'homeContentOutlet'} ) 
        event.preventDefault()



      deleteProject: (router, event) ->
        editController = router.get('projectEditController')
        editController.deleteProject()
        


      listProject: (router, event) ->        
        homeController = router.get('homeController')
        homeController.connectOutlet({name: 'projects', outletName: 'homeContentOutlet'} )


      openProject: (router,events) ->
        
      openEvents: (router, event) ->

      openReports: (router, event) ->

      logoutEvent: (router, event) -> 
     

      #STATES
 
      index: Ember.Route.extend
        route: '/'
        connectOutlets: (router) ->          
          router.get('applicationController').connectOutlet('home')        
          homeController = router.get('homeController')
          homeController.connectOutlet({name: 'homeSide', outletName: 'homeSideOutlet'} )
          router.get('projectsController').load()

      projectOpenState: Ember.Route.extend(
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

        
   
  
   

        

      
      
  


