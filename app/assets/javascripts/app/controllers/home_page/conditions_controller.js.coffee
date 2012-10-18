App.ConditionsController = Ember.ArrayController.extend(
  ruleControllerBinding: "App.rulesController"
  content: []
  selected: null

  updateContent: (->
    selected = @getPath("ruleController.selected")
    conditionContent = selected.get 'conditions'
    @set "content", conditionContent
  ).observes("ruleController.selected")
  
)