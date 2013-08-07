App.AddEventView = Ember.View.extend
  templateName: 'home_page/events/add_new_event'
  accountBinding: 'App.router.accountController.content'
  codemirror: null
  #---------------------------------------------
  init: ->
    @_super()
    
    domain = App.get('router.projectsController.selected.description.domain')

    msgContext = {}    

    #HELP DOC LINK
    msgContext = 
                  header: "Events - Declare Events"
                  message: "You can edit and add these sample javascripts to  " + domain + " to activate events"
                  href: "/help#eventsAddition"
                  buttonText: "Learn"                    
    

    app = App.get("router.applicationController")
    app.set('msgContext', msgContext)
    Ember.run.next(this, 'applyCodeBox')


  #---------------------------------------------
  applyCodeBox: ->   
    obj = this   
    $(".addcode").each ->
      cb = $(this)
      code = cb.html()      
      cb.empty()
      cm = codemirror this,
                      value: code
                      mode: "javascript"
                      lineNumbers: true
                      smartIndent: true
                      autoClearEmptyLines: true
                      matchBrackets: true

      obj.set 'codemirror', cm

  
      
      
      
                         
                         
