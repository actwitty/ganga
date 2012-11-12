App.EventsListView = Ember.View.extend
  templateName: 'home_page/events/events_list'

  #---------------------------------------------
  init: ->
    @_super()
    
    domain = App.get('router.projectsController.selected.description.domain')

    msgContext = {}    

    #HELP DOC LINK
    msgContext = 
                  header: "Events Javascripts"
                  message: "You can add these sample javascripts to  " + domain
                  href: "/help#eventsAddition"
                  buttonText: "Learn"                    
    

    app = App.get("router.applicationController")
    app.set('msgContext', msgContext)

  #---------------------------------------------


