App.ProjectsView = Ember.View.extend
  templateName: 'home_page/projects/projects'
  showHelpInfo: true  

  
  # This is called after the insert of view is complete
  didInsertElement: ->
    @_super()
    $("#appsTable").tablesorter()
    #   # $('#appsTable').dataTable(
    #   #                             "sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>"
    #   #                             "sPaginationType": "bootstrap")

 
  hideInfo: (event) ->
  	@set 'showHelpInfo', false
  	event.preventDefault()

  showInfo: (-> 
    @get("showHelpInfo") is true
   ).property("showHelpInfo")
  
  

  
  
