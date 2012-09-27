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
	  loggedIn	: Ember.Route.extend
	    #SETUP
	    route: '/home'
	    connectOutlets: (router) ->
	      router.get('applicationController').connectOutlet('home')
	      homeController = router.get('homeController')
	      homeController.connectOutlet({name: 'homeSideBarDefault',outletName: 'homeSideBarOutlet'} )
	      homeController.connectOutlet({name: 'homeContentDefault',outletName: 'homeContentOutlet'} )	      
	    #EVENTS
	    logoutEvent: Ember.Route.transitionTo 'logout'

	    index: Ember.Route.extend
	      route: '/'	
	    #STATES
	    logout: Ember.Route.extend
	      route: '/thankyou'
	    	
	    	

	    
	    
	


