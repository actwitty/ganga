/* Main code */
/* The global Rulebot scope */
"use strict";

var rbT = { inited: false};

rbT.init = function(){
	rbT.keyPrefix = "{{";
	rbT.keySuffix = "}}";
	rbT.inited = true;

};

rbT.getTemplateHTMLByNameInternal = function(name){
	console.log(name);
    
   var templPos = rbT.extractDisplayPositionFromTemplName(name);

   console.log(templPos);
   
   var checkforPosAvl = rbT.isTemplPosOccupied(templPos);

   console.log(checkforPosAvl);


   if(!checkforPosAvl)
   {

		if (rbT.templateLib.hasOwnProperty(name) ){
  
			var html = rbT.templateLib[name];
			return html;
		}else{
		rbT.sendErrorToRBServer("unsupported template " + name);
		return "";
		}
	}else{
			rbT.sendErrorToRBServer("Template Position Occupied " + name);
		return "";
	}	
};


rbT.getTemplateApplyVarsInternal = function(html,vars){
	//TODO: check instanceOf
	if(html.length){
		for (var key in vars) {
			var value = vars[key];
			var replaceKey = rbT.keyPrefix + key + rbT.keySuffix;
			html = html.replace(replaceKey, value);
		}
		return html;	
	}else{
	 rbT.sendErrorToRBServer("Bad variable array error for template");
	 return "";
	}

};

rbT.isTemplateGoodToApplyInternal = function(html){

	var nMatched = html.match(/(\{\{[\w\.]*\}\})/g)
	if (nMatched > 0){
		rbT.sendErrorToRBServer("Not all variables in templates were replaced");
		return false;
	}
	return true;
};

rbT.applyHtmltoPageInternal = function(html){

	if(html.length){


	 jQuery('body').append(html);

	// document.body.innerHTML = document.body.innerHTML+html;

	}else{

         rbT.sendErrorToRBServer("Bad variable array error for template");
	 			 return "";
	 }
};


rbT.enableClickHandlingInternal = function(){
	rbT.eventHandler.init();
};


rbT.enableTimeOutHadnlingInternal= function(templateName,timerValue){
   
    rbT.eventHandler.timeOutHandler(templateName,timerValue);
};
