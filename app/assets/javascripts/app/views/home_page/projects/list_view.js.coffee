App.ProjectsView = Ember.View.extend
  templateName: 'home_page/projects/projects'

  init: ->
    @_super()
    content =  @get 'controller.content'
    msgContext = {}    
    if content isnt null and content.get('length') isnt 0
      #HELP DOC LINK
      msgContext = 
                    header: "Manage Applications"
                    message: "You can configure events and trigger actions by clicking these applications"
                    href: "/help#manageApps"
                    buttonText: "Know More"                    
    else
      #HELP DOC LINK      
      msgContext = 
                    header: "Create your first application"
                    message: "You have not created any application, you can create by clicking the button below."
                    href: "/help#firstApp"
                    buttonText: "Learn"

    app = App.get("router.applicationController")
    app.set('msgContext', msgContext)

  
    

  # This is called after the insert of view is complete
  didInsertElement: ->
    @_super()
    Ember.run.next(this, 'applyJqueryConstructs')
    
    

   applyJqueryConstructs: ->
    # $("#appsTable").tablesorter()
    $('#appsTable').dataTable(
                              sDom: "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>"
                              sPaginationType : "bootstrap")



  
  

  
  
