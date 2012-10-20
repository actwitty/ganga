App.OldRulesController = Ember.ArrayController.extend(
  ruleControllerBinding: "App.projectsController"
  content: []
  selected: null
  updateContent: (->
    selected = @getPath("projectController.selected")
    ruleContent = selected.get 'rules'
    @set "content", ruleContent
  )	.observes("projectController.selected")
)