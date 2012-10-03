App.RuleValueTextFieldView = Ember.View.extend({
  
  templateName: 'rule_page/rule_valueTextField',
  
  focusOut: function(evt){ 
  	console.log("focusout") ;
  	console.log(evt);
  },
});