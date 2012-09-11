//= require ./app/store
//= require_tree ./app/models
//= require_tree ./app/controllers
//= require_tree ./app/views
//= require_tree ./app/helpers
//= require_tree ./templates
//= require_tree ./app/routes
//= require_self

App.initialize();

App.displayError = function(e) {
  if (typeof e === "string") {
    return alert(e);
  } else if (typeof e === "object" && e.responseText !== undefined) {
    return alert(e.responseText);
  } else {
    return alert("An unexpected error occurred.");
  }
};
