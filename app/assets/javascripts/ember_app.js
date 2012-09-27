//= require ./app/store
//= require_tree ./app/models
//= require_tree ./app/controllers
//= require_tree ./app/views
//= require_tree ./templates
//= require_tree ./app/routes
//= require_self
/*************************** REST Init ***************************/
jQuery.ajaxSetup({ 
  'cache' : false,
  'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}
});


/************************** Ember Init ****************************/
App.initialize();

/************************** Manage forgery post check ****************/
if (typeof(AUTH_TOKEN) !== "undefined"){
  App['AUTH_TOKEN'] = encodeURIComponent(AUTH_TOKEN);
}

App.displayError = function(e) {
  if (typeof e === "string") {
    return alert(e);
  } else if (typeof e === "object" && e.responseText !== undefined) {
    return alert(e.responseText);
  } else {
    return alert("An unexpected error occurred.");
  }
};

App.DBG = 1;
App.WARN = 2;
App.ERR = 3;
App.CRI = 4;
/*
Master Initializer code
*/
App.LogLvl = App.DBG;

App.log = function(level, message){
	if ( level !== undefined && level >= App.LogLvl && message !== undefined ){
		console.log(arguments.callee.caller.name + ":" + message);
	}
}
/*******************************************************************/
/*          DEBUG ROUTER                                           */

debugRouter = function(state) {
  App.log(App.DBG, "ROUTE : " + state.get("path"));
  state.get("childStates").forEach(function(childState) {
    debugRouter(childState);
  });
};


App.router.get("childStates").forEach(function(state) {
  debugRouter(state);
});

/* temp hack */
$(".in_pg_nav").live('click', function(){
  var divid = $(this).attr('href');
  document.getElementById(divid).scrollIntoView();
  return false;
});