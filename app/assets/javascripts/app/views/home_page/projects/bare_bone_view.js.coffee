App.BareBoneView = Ember.View.extend(
  templateName: 'home_page/projects/bare_bone'
  showHelpInfo: true
  

  showInfo: (-> 
    @get("showHelpInfo") is true
   ).property("showHelpInfo")
  
  hideInfo: (event) ->
  	@set 'showHelpInfo', false
  	event.preventDefault()
  
)
