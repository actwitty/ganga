App.HomeView = Ember.View.extend
  templateName: 'home_page/home'
  accountBinding: 'App.router.accountController.content'
  projectsBinding: 'App.router.projectsController.selected'
   
    
  # # Reference callbacks
  # willInsertElement: ->    
  #   @_super()

  # didInsertElement: ->
  #   @_super()

  # #call before rerender (tear down)
  # willClearRender: ->
  # 	@_super()