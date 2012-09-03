App.Router = Em.Router.extend
  enableLogging: true
  location: 'hash'
  





  root: Em.Route.extend
    # SETUP
    # EVENTS
    # STATES
    index: Em.Route.extend
      route: '/'
      index: Em.Route.extend(enter: (router) ->
        logged = App.Router.get('accountsController').isLoaded()
        Ember.run.next ->
          if logged
            router.transitionTo "loggedIn"
          else
            # stay where you are
            
    loggedIn: Em.Route.extend
      # SETUP
      route: '/home/index'
      # EVENTS
      createPost: Em.Route.transitionTo 'create'
      editPost: Em.Route.transitionTo 'edit'
      showPost: Em.Route.transitionTo 'show.index'
      goBack: Em.Route.transitionTo 'posts.index'
      cancel: (router, event) ->
        router.get('applicationController.transaction').rollback()
        router.transitionTo('index')
      save: (router, event) ->
        router.get('applicationController.transaction').commit()
        router.transitionTo('index')
      # STATES

