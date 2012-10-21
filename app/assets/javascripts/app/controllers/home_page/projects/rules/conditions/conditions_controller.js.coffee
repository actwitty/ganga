App.ConditionsController = Ember.ArrayController.extend(  
  content: []  

  loadContents: (->
    @set 'content', []
    @set 'selected', null
    content = @get 'content'
    selected = @getPath("ruleController.selected")
    conditionContent = selected.get 'conditions'
    
    if conditionContent.get 'length' > 0
      for condition in conditionContent
        newCondition = App.Condition.ctreate(condition)
        content.pushObject newCondition
    else
      newCondition = App.Condition.ctreate()
      content.pushObject newCondition

    @set "content", conditionContent
  ).observes("ruleController.selected")
  
)