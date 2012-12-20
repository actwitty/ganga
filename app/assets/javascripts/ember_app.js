//= require_tree ./app/helpers
//= require_tree ./app/models
//= require_tree ./app/controllers
//= require_tree ./app/views
//= require_tree ./app/others
//= require_tree ./app/library
//= require_tree ./app/templates
//= require_tree ./app/routes
//= require_tree ./action_script
//= require_self
/*************************** REST Init ***************************/
jQuery.ajaxSetup({ 
  'cache' : false,
  'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}
});

/************************** Manage forgery post check ****************/

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


/************************** Ember Init ****************************/
$(document).ready(function(){

  App.AUTH_TOKEN = encodeURIComponent($('meta[name=csrf-token]').attr('content'));
  App.isLoggedIn = false;
  App.AccountID = null;
  App.inDevise = false;
  if ( typeof emberRouterContext === 'undefined'){
    App.inDevise = true;
  }
  if ( typeof loggedInAccountID !== 'undefined'){
    App.AccountID = loggedInAccountID;
    App.isLoggedIn = true; 
  }
  
  App.initialize(App.router);
  App.get("router").send("initDone");
  /* For debugging */
  App.router.get("childStates").forEach(function(state) {
    debugRouter(state);
  });

});
/*******************************************************************/

