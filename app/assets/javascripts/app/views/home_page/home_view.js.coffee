App.HomeView = Ember.View.extend
  templateName: 'home_page/home'
  accountBinding: 'App.router.accountController.content'
  appsBinding: 'App.router.projectsController.content'
  # didInsertElement: (->
  # 	@_super()
  # 	console.log(App.get('router.accountController').get('content'))
  # 	console.log(@account)
  # )