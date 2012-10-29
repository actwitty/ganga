"use strict";
rbT.isInitialized = function(){
	return rbT.inited;
};
//------------------------------------------
rbT.getTemplateHTMLByName = function(name){

	if (!rbT.isInitialized()){
		return "";
	}
	
	if ( typeof name === 'undefined' ){
		rbT.sendErrorToRBServer("improper access of interface getTemplateHTMLByName");
		return "";
	}
	return rbT.getTemplateHTMLByNameInternal(name);
};
//------------------------------------------
rbT.getTemplateApplyVars = function(html,vars){
	if (!rbT.isInitialized()){
		return "";
	}

	if ( typeof html === 'undefined' || typeof vars === 'undefined' ){
		rbT.sendErrorToRBServer("improper access of interface getTemplateApplyVars");
		return "";
	}

	return rbT.getTemplateApplyVarsInternal(html,vars);
};
//------------------------------------------
rbT.isTemplateGoodToApply = function(html){
	if (!rbT.isInitialized()){
		return false;
	}
	if ( typeof html === 'undefined' ){
		rbT.sendErrorToRBServer("improper access of interface isTemplateGoodToApply");
		return "";
	}
	return rbT.isTemplateGoodToApplyInternal(html);
};

//------------------------------------------
rbT.applyHtmltoPage = function(html){
	if (!rbT.isInitialized()){
		return "";
	}
	if ( typeof html === 'undefined' ){
		rbT.sendErrorToRBServer("improper access of interface applyHtmltoPage");
		return "";
	}
	return rbT.applyHtmltoPageInternal(html);
};


//-----------------------------------------
rbT.enableClickHandling = function(){
	rbT.enableClickHandlingInternal ();
}


//----------------------------------------------------------------

rbT.enableTimeOutHadnling =function(templateName,timerValue){

   if (!rbT.isInitialized()){
		return "";
	}
	if ( typeof templateName === 'undefined' ){
		rbT.sendErrorToRBServer("improper access of interface enableTimeOutHadnling");
		return "";
	}

	rbT.enableTimeOutHadnlingInternal(templateName,timerValue);
}

//---------------------------------------------------------------

rbT.invokeActionScript = function(action,actionParams)
{

	if ( typeof actionParams === 'undefined' ){
		rbT.sendErrorToRBServer("Invalid params in rule Json");
		return "";
	}

	else{
          rbT.invokeActionScriptInternal(action,actionParams); 
	}

	
}

