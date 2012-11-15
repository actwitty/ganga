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
        editController = router.get('projectEditController')
        editController.set('content', App.Project.create())
        editController.set('isNew', true)        
        router.transitionTo('loggedInState.editProjectState')    
        router.get('homeSideController').set 'selectedMenu', 'appNew'
        event.preventDefault()
        
      #event ----------------------------------------
      editProjectFromMenu: (router) ->                
        
        project = router.get('projectsController.selected')
        if project isnt null
          editController = router.get('projectEditController')
          editController.set('isNew', false)
          router.get('projectsController').set('selected', project)  
          router.get('homeSideController').set 'selectedMenu', 'appEdit'
          router.transitionTo('loggedInState.editProjectState')

        event.preventDefault()

      # event -------------------------------------------
      deleteProject: (router, event) ->
        event.view.confirmDeletion()
        event.preventDefault()
      # event -------------------------------------------
      deleteProjectConfirmed: (router, event) ->
        editController = router.get('projectEditController')
        editController.deleteProject()
        
        
      # event -------------------------------------------
      listProject: (router, event) ->          
        router.transitionTo('loggedInState.listProjectState')            

      # event -------------------------------------------
      showProjectRules: (router, event) ->   
        project = event.context      
        router.get('projectsController').loadProjectRules(project)        
        
        event.preventDefault()

      forceProjectRules: (router, project) ->
        router.get('projectsController').loadProjectRules(project)
        event.preventDefault()

      # event -------------------------------------------
      projectRulesLoaded: (router, project) ->
        router.get('projectsController').set('selected', project)  
        App.get('router').transitionTo('loggedInState.projectConfigState.showRulesState.indexState')
      
      # event -------------------------------------------
      openProjectRules: (router, event) ->   
        project = router.get('projectsController').get('selected')  
        if project isnt null
          router.get('projectsController').loadProjectRules(project)
        event.preventDefault()      

      #event --------------------------------------------
      openEventList: (router, event) ->
        router.transitionTo('loggedInState.projectConfigState.listEventState')
        console.log router

        event.preventDefault()

      #event --------------------------------------------
      openSettings: (router, event) ->

      # event -------------------------------------------
      openReports: (router, event) ->



            
      
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
        #SETUP
        route: '/getstarted'
        connectOutlets: (router) ->
          homeController = router.get('homeController')        
          homeController.connectOutlet({name: 'bareBone',outletName: 'homeContentOutlet'} )
        #EVENTS       
     

      #state -------------------------------------
      editProjectState: Ember.Route.extend
        #SETUP
        route: '/edit'
        connectOutlets: (router) ->
          editController = router.get('projectEditController')                      
          homeController = router.get('homeController')            
          router.get('homeSideController').set 'selectedMenu', 'appEdit'
          homeController.connectOutlet({name: 'projectEdit', outletName: 'homeContentOutlet'} )           
        #EVENTS
        updateProject: (router, event) ->
          projController = App.router.get('projectEditController')
          projController.postProject()
          event.preventDefault()

        submitNewProject: (router, event) ->
          projController = App.router.get('projectEditController')
          projController.postProject()
          event.preventDefault()          

        cancelProjectEdit: (router, event) ->
          event.view.confirmCancellation()

      #state -------------------------------------
      listProjectState: Ember.Route.extend
        #SETUP
        route: '/list'
        connectOutlets: (router) ->          
          homeController = router.get('homeController')
          router.get('homeSideController').set 'selectedMenu', 'appList'   
          projectController = router.get('projectsController')       
          if projectController.selected is null
            if projectController.get 'content' isnt null and projectController.get('content').length isnt 0
              projectController.set 'selected', projectController.get('content')[0]
          homeController.connectOutlet({name: 'projects', outletName: 'homeContentOutlet'} )


        #EVENTS
        #event ----------------------------------------
        editProject: (router, event) ->        
          # Context comes as argument
          project = event.context
          editController = router.get('projectEditController')
          editController.set('isNew', false)
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
              homeController.connectOutlet({name: 'rules', outletName: 'homeContentOutlet'})        
              router.get('homeSideController').set 'selectedMenu', 'ruleList'
         
            #EVENTS
            #event -------------------------------------------
            createRule: (router, event) ->
              # Context comes as argument    
              rule = App.Rule.create()
              rulesController = router.get('rulesController')           
              rulesController.markStateOfRuleEdit('new')
              rulesController.storeSerializedBeforeEdit(rule)
              router.transitionTo('editRuleConditionsState')
              event.preventDefault()            
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
            deleteRule: (router, event) ->
              rule = event.context
              event.view.confirmDeletion(rule)
              event.preventDefault()
          
            # event -------------------------------------------
            deletionConfirmed: (router, rule) ->            
              rulesController = router.get('rulesController')
              rulesController.deleteRule(rule)
              

          editRuleConditionsState: Ember.Route.extend
            #SETUP
            route: '/edit'
            connectOutlets: (router, event) ->
              homeController = router.get('homeController')
              homeController.connectOutlet( {name: 'conditions', outletName: 'homeContentOutlet'} )

            #EVENTS
            # event ------------------------------------------------------
            addNewCondition: (router, event) ->    
              condition = App.Condition.create()                      
              content = App.get('router.conditionsController').get('content')
              length = content.length
              last = content[length - 1]
              last.set 'connect', 'and'
              content.pushObject(condition)  
              event.preventDefault()

            # event ------------------------------------------------------  
            deleteCondition: (router, event) ->
              condition = event.context              
              content = App.get('router.conditionsController').get('content')
              content.removeObject(condition)
              length = content.length
              if length is 0         
                content.pushObject App.Condition.create()
              else
                last = content[length - 1]
                last.set 'connect', null

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
        #state in project -----------------------
        listEventState: Ember.Route.extend
          #SETUP
          route: '/'
          connectOutlets: (router, event) ->
            homeController = router.get('homeController')
            homeController.connectOutlet({name: 'eventsList', outletName: 'homeContentOutlet'})    
            router.get('homeSideController').set 'selectedMenu', 'eventList'      
          #EVENTS
          #STATES



          
          
        #STATES       
    # LOGGED IN STATE ENDS HERE






      
      

        
   
  
   

        

      
      
  


