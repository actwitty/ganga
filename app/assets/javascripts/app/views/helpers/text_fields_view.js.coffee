App.RequiredAFTextField = Ember.TextField.extend(
	attributeBindings: ["accept", "autocomplete", "autofocus", "name", "required"]
)

App.RequiredTextField = Ember.TextField.extend(
	attributeBindings: ["accept", "name", "required"]
)

App.NonRequiredTextField = Ember.TextField.extend(
	attributeBindings: ["accept", "autofocus", "name"]
)

