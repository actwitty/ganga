App.ProjectsView = Ember.View.extend(
  templateName: 'home_page/projects/projects'
  showHelpInfo: true  

  showInfo: (-> 
    @get("showHelpInfo") is true
   ).property("showHelpInfo")

  hideInfo: (event) ->
  	@set 'showHelpInfo', false
  	event.preventDefault()

  # This is called after the insert of view is complete
  didInsertElement: (->
    @_super()
    $("#appsTable").tablesorter()

  )
  
)