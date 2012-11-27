App.EventsListView = Ember.View.extend
  templateName: 'home_page/events/events_list'
  accountBinding: 'App.router.accountController.content'
  projectIdBinding: 'App.router.projectsController.selected.id'
  #---------------------------------------------
  init: ->
    @_super()
    
    domain = App.get('router.projectsController.selected.description.domain')

    msgContext = {}    

    #HELP DOC LINK
    msgContext = 
                  header: "Events - Pluggable Javascripts"
                  message: "You can add these sample javascripts to  " + domain + " to activate events"
                  href: "/help#eventsAddition"
                  buttonText: "Learn"                    
    

    app = App.get("router.applicationController")
    app.set('msgContext', msgContext)
    Ember.run.next(this, 'applyHighlighting')


  #---------------------------------------------
  applyHighlighting: ->
    prettyPrint()
    #hljs.tabReplace = '  '
    #hljs.initHighlighting()



