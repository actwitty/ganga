App.ProjectEditView = Ember.View.extend
  templateName: 'home_page/projects/project_edit'
  showHelpInfo: true
  

  showInfo: (-> 
    @get("showHelpInfo") is true
  ).property("showHelpInfo")


  hideInfo: (event) ->
  	@set 'showHelpInfo', false
  	event.preventDefault()
  

  confirmCancellation: ->
    current_this = @
    # -----------------------------------------------------
    showAlertOnCancel = ->    
      alert = 
              activate: true
              header: 
                      main : "Cancel edit on application"
                      note : "You have requested to cancel the edit on application."
              detail: "Clicking yes will undo the edit. Are you sure ? "
              first_btn:
                        class : "btn-warning"
                        text  : "Yes"
                        callback : (context)->
                                  alert = context.get 'alert'
                                  alert.activate = false
                                  alert= null  
                                  context.set 'alert', alert
                                  # TODO: May be route it through the App Router
                                  App.get("router").send("listProject")
                                  event.preventDefault()                              
                        context : current_this
              second_btn:
                        class : "btn-success"
                        text  : "No"
                        callback : (context)->
                                  alert = context.get 'alert'
                                  alert.activate = false
                                  alert= null  
                                  context.set 'alert', alert                                    
                                  event.preventDefault()
                        context : current_this
    
      current_this.set 'alert', alert 
    showAlertOnCancel()
