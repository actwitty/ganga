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

    # DEVISE STATE STARTS HERE
    deviseState: Ember.Route.extend
      #SETUP
      route: '/'
      connectOutlets: (router) ->
        router.get('applicationController').connectOutlet('devise')
        deviseController = router.get('deviseController')
        deviseController.connectOutlet({name: 'deviseTopbar',outletName: 'deviseTopBarOutlet'} )
      #EVENTS
      #STATES
    # DEVISE STATE ENDS HERE

    # LANDING STATE STARTS HERE
    landingState: Ember.Route.extend 
      #SETUP
      route: '/'
      connectOutlets: (router) ->        
        router.get('applicationController').connectOutlet('main')
        mainController = router.get('mainController')
        mainController.connectOutlet({name: 'mainTopbar',outletName: 'mainTopBarOutlet'} )
        mainController.connectOutlet({name: 'mainInvite',outletName: 'mainInviteBoxOutlet'} )
      #EVENTS

      #STATES
    # LANDING STATE ENDS HERE
    
    # LOGGED IN STATE STARTS HERE
    loggedInState  : Ember.Route.extend
      #SETUP
      route: '/'

      #EVENTS  
      # event -------------------------------------------
      bareBoneAccount: (router, event) ->
        router.transitionTo('loggedInState.bareBoneAccountState') 

      # event -------------------------------------------
      newProject: (router, event) ->
        event.preventDefault()
        editController = router.get('projectEditController')
        editController.set('content', App.Project.create())
        router.transitionTo('loggedInState.newProjectState')
        
      # event -------------------------------------------
      deleteProject: (router, event) ->
        editController = router.get('projectEditController')
        editController.deleteProject()
        event.preventDefault()
        
      # event -------------------------------------------
      listProject: (router, event) ->          
        router.transitionTo('loggedInState.listProjectState')    
        

      # event -------------------------------------------
      showProjectRules: (router, event) ->   
        project = event.context        
        router.get('projectsController').set('selected', project)
        router.transitionTo('loggedInState.projectConfigState.showRulesState.indexState')
        event.preventDefault()
      

      # event -------------------------------------------
      openReports: (router, event) ->

      # event -------------------------------------------
      logoutEvent: (router, event) -> 
        #TODO: Trigger logout and transition to loggedout
        router.transitionTo('loggedOutState') 

      #STATES
      #state -------------------------------------
      index: Ember.Route.extend
        route: '/'
        connectOutlets: (router) ->          
          router.get('applicationController').connectOutlet('home')        
          homeController = router.get('homeController')
          homeController.connectOutlet({name: 'homeSide', outletName: 'homeSideOutlet'} )
          router.get('projectsController').load()
      #state -------------------------------------
      bareBoneAccountState: Ember.Route.extend
        route: '/getstarted'
        connectOutlets: (router) ->
          homeController = router.get('homeController')        
          homeController.connectOutlet({name: 'bareBone',outletName: 'homeContentOutlet'} )

      #state -------------------------------------
      newProjectState: Ember.Route.extend
        route: '/new'
        connectOutlets: (router) ->          
          editController = router.get('projectEditController') 
          editController.set('isNew', true)
          editController.resetStates()
          homeController = router.get('homeController')
          homeController.connectOutlet({name: 'projectEdit', outletName: 'homeContentOutlet'} )
      #state -------------------------------------
      editProjectState: Ember.Route.extend
        #SETUP
        route: '/edit'
        connectOutlets: (router) ->
          editController = router.get('projectEditController') 
          editController.set('isNew', false)
          editController.resetStates()   
          homeController = router.get('homeController')
          homeController.connectOutlet({name: 'projectEdit', outletName: 'homeContentOutlet'} ) 

      #state -------------------------------------
      listProjectState: Ember.Route.extend
        #SETUP
        route: '/list'
        connectOutlets: (router) ->          
          homeController = router.get('homeController')
          homeController.connectOutlet({name: 'projects', outletName: 'homeContentOutlet'} )


        #EVENTS
        #event ----------------------------------------
        editProject: (router, event) ->        
          # Context comes as argument
          project = event.context
          editController = router.get('projectEditController')
          router.get('projectsController').set('selected', project)  
          router.transitionTo('loggedInState.editProjectState')        
          event.preventDefault()

      #-------------------------------------
      projectConfigState: Ember.Route.extend
        #SETUP
        route: "/project"

        #EVENTS

        #STATES       
        #state in project -----------------------
        showRulesState: Ember.Route.extend
          #SETUP
          route: '/rules'

          #STATES
          indexState: Ember.Route.extend
          #SETUP
            route: '/'
            connectOutlets: (router, event) ->
              homeController = router.get('homeController')
              homeController.connectOutlet({name: 'rules', outletName: 'homeContentOutlet'} )        
         
            #EVENTS
            # event -------------------------------------------
            editRules: (router, event) ->
              # Context comes as argument
              rule = event.context        
              rulesController = router.get('rulesController')           
              rulesController.markStateOfRuleEdit('old')
              rulesController.storeSerializedBeforeEdit(rule)
              router.transitionTo('editRuleConditionsState')
              event.preventDefault()

            # event -------------------------------------------
            createRule: (router, event) ->
              # Context comes as argument
              rule = App.Rule.create()
              rulesController = router.get('rulesController')           
              rulesController.markStateOfRuleEdit('new')
              rulesController.storeSerializedBeforeEdit(rule)
              router.transitionTo('editRuleConditionsState')
              event.preventDefault()

            # event -------------------------------------------
            deleteRule: (router, event) ->
              event.preventDefault()
          

          editRuleConditionsState: Ember.Route.extend
            #SETUP
            route: '/edit'
            connectOutlets: (router, event) ->
              homeController = router.get('homeController')
              homeController.connectOutlet( {name: 'conditions', outletName: 'homeContentOutlet'} )

            #EVENTS
            # event ------------------------------------------------------  
            deleteCondition: (router, event) ->
              condition = event.context              
              content = App.get('router.conditionsController').get('content')
              content.removeObject(condition)
              if content.length is 0         
                content.pushObject App.Condition.create()                       
              event.preventDefault()

            # event ------------------------------------------------------  
            changeDataType: (router, event) ->
              condition = event.context                            
              condition.set 'type', event.view.getNewDataType(event)
              event.preventDefault()

            # event ------------------------------------------------------  
            changedNegation: (router, event) ->              
              condition = event.context              
              condition.set 'negation', event.view.getNewNegation(event)
              event.preventDefault()

            # event ------------------------------------------------------  
            changedProperty: (router, event) ->
              condition = event.context                            
              
              scope = event.view.getNewPropertyScope(event)              
              property = event.view.getNewProperty(event)
              
              condition.set 'scope', scope
              condition.set 'property', property
              rulesController = App.get('router.rulesController')
              typeSchema = {}

              if scope is 'e'
                typeSchema = rulesController.get('eventSchema')
              else if scope is 's'
                typeSchema = rulesController.get('systemSchema')
              else if scope is 'a'
                typeSchema = rulesController.get('actorSchema')             
              
              condition.set( 'type', typeSchema[property].type)
              event.view.applyChangedType(event, typeSchema[property].type)
              event.preventDefault()

            # event ------------------------------------------------------  
            changedOperation: (router, event) ->
              condition = event.context              
              condition.set 'operation', event.view.getNewOperation(event)
              event.preventDefault()

            # event ------------------------------------------------------  
            changeRuleEvent: (router, event) ->
              event.view.changeRuleEventConfirmation(event)
              event.preventDefault()

            # event ------------------------------------------------------  
            changeConditionValue: (router, event) ->
              condition = event.context                                          
              selectedVal = event.view.getConditionValue(event)
              condition.set 'value1', selectedVal              
              event.preventDefault()
            # event ------------------------------------------------------  
            saveRuleEdit: (router, event) ->
              event.view.saveRuleEditHandler(event)
              event.preventDefault()

            # event ------------------------------------------------------  
            cancelRuleEdit: (router, event) ->
              event.view.cancelRuleEditHandler(event)
              event.preventDefault()

            # event -------------------------------------------
            reenterProjectRules: (router) ->                      
              router.transitionTo('loggedInState.projectConfigState.showRulesState.indexState')        

            #STATES
              

          
          
        #STATES       
    # LOGGED IN STATE ENDS HERE

    # LOGGED OUT STATE STARTS HERE
    loggedOutState  : Ember.Route.extend
      #SETUP
      route: "/thanks"
      connectOutlets: (router, event) ->
        applicationController = router.get('applicationController')
        
      #EVENTS
      #STATES
    # LOGGED OUT STATE ENDS HERE



      
      

        
   
  
   

        

      
      
  


