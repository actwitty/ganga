App.BareBoneView = Ember.View.extend
  templateName: 'home_page/projects/bare_bone'

  init: ->
    @_super()
    msgContext = 
                  header: "Create your first application"
                  message: "You can register your application to be managed here."
                  href: "/help#firstApp"
                  buttonText: "Learn"  
    app = App.get("router.applicationController")
    app.set('msgContext', msgContext)                    
