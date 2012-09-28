App.MainTopbarView = Ember.View.extend
  templateName: 'main_page/main_topbar'
  clickMainHeader: (router, jqueryEvent) ->
   	arg = jqueryEvent
   	console.log(jqueryEvent)