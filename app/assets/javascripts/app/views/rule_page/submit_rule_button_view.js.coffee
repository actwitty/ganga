App.SubmitRuleButtonView = Ember.View.extend(
  templateName: "rule_page/submit_rule_button"
  submitRule: (event) ->
    App.router.rulesController.submitRule()
)