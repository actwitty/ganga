App.Rule = Ember.Object.extend(
  category: null
  type: null
  operator: null
  value: null
  connect: null
  ifCompTextBox: false
  ifValueTextBox: true
  orSelected: true
  andSelected: false
  operator_choices: null
  value_choices: null
  category_choices: null

  setOperatorChoices: (comparators) ->
    @set "operator_choices", comparators

  setDefaultsValues: (defaults) ->
    @set "value_choices", defaults

  setCategoryChoices: (categories) ->
    @set "category_choices", categories

  setOperator: (operator) ->
    @set "operator", operator

  setCategory: (category) ->
    @set "category", category

  setConnect: (connect) ->
    @set "connect", connect

  setdefault: (value) ->
    @set "value", value

  setifCompTextBox: (value) ->
    @set "ifCompTextBox", value

  setifValueTextBox: (value) ->
    @set "ifValueTextBox", value
)