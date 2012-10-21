App.ProjectEditView = Ember.View.extend(
  templateName: 'home_page/projects/project_edit'
  showHelpInfo: true
  

  showInfo: (-> 
    @get("showHelpInfo") is true
   ).property("showHelpInfo")

  submitNewProject: (event) ->
  	projController = App.router.get('projectEditController')
  	projController.postProject()
  	event.preventDefault()

  updateProject: (event) ->
  	projController = App.router.get('projectEditController')
  	projController.postProject()
  	event.preventDefault()


  hideInfo: (event) ->
  	@set 'showHelpInfo', false
  	event.preventDefault()
  
)
