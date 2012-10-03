App.Rule = Ember.Object.extend(
  category: null
  type: null
  comp: null
  defaults: null
  connect: null
  ifCompTextBox: false
  ifValueTextBox: true
  orSelected: true
  andSelected: false
  comp_choices: null
  default_choices: null
  field_choices: null

  setComparators: (comparators) ->
    @set "comp_choices", comparators

  setDefaults: (defaults) ->
    @set "default_choices", defaults

  setFields: (fields) ->
    @set "field_choices", fields

  setComp: (comparator) ->
    @set "comp", comparator

  setCategory: (category) ->
    @set "category", category

  setConnect: (connect) ->
    @set "connect", connect

  setdefault: (value) ->
    @set "defaults", value

  setifCompTextBox: (value) ->
    @set "ifCompTextBox", value

  setifValueTextBox: (value) ->
    @set "ifValueTextBox", value
)