App.HomeView = Ember.View.extend
  templateName: 'home_page/home'
  accountBinding: 'App.router.accountController.content'
  projectBinding: 'App.router.projectsController.selected'
  projectsListBinding: 'App.router.projectsController.content'
   
    
  # # Reference callbacks
  # willInsertElement: ->    
  #   @_super()

  # didInsertElement: ->
  #   @_super()

  # #call before rerender (tear down)
  # willClearRender: ->
  # 	@_super()