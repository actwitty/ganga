App.HomeView = Ember.View.extend
  templateName: 'home_page/home'
  accountBinding: 'App.router.accountController.content'
  projectsBinding: 'App.router.projectsController.selected'
   

  
  didInsertElement: (->
   	@_super()   	  
  )