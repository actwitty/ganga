/* Main code */
/* The global Rulebot scope */
"use strict";



//************************************************************************************

rbT.init = function(){
	rbT.keyPrefix = "{{";
	rbT.keySuffix = "}}";
	rbT.inited = true;

};

//******************************************************************************************

rbT.getTemplateHTMLByNameInternal = function(name){
	
    
        if (rbT.templateLib.hasOwnProperty(name) ){
  
			var html = rbT[rbT.templateLib[name]];

			console.log(html);

            return html;
		}else{
		rbT.sendErrorToRBServer("unsupported template " + name);
		return "";
		}
	
};
//*******************************************************************************************

rbT.getTemplateApplyVarsInternal = function(html,vars){
	//TODO: check instanceOf
	if(html.length){
		for (var key in vars) {
			var value = vars[key]; 
			var tempVarToBeReplaced = value.key
            var replaceKey = rbT.keyPrefix + tempVarToBeReplaced + rbT.keySuffix;
			html = html.replace(replaceKey, value.value);
		}
		return html;	
	}else{
	 rbT.sendErrorToRBServer("Bad variable array error for template");
	 return "";
	}

};
//***************************************************************************************

rbT.isTemplateGoodToApplyInternal = function(html){

	nMatched = ""
	var nMatched = html.match(/(\{\{[\w.]*\}\})/g)
	

	if (nMatched != null){
		rbT.sendErrorToRBServer("Not all variables in templates were replaced");
		return false;
	}

	return true;
};

//**************************************************************************************

rbT.applyHtmltoPageInternal = function(html){

	if(html.length){


	 jQuery('body').append(html);

	// document.body.innerHTML = document.body.innerHTML+html;

	}else{

         rbT.sendErrorToRBServer("Bad variable array error for template");
	 			 return "";
	 }
};

//***********************************************************************************
rbT.enableClickHandlingInternal = function(){
	rbT.eventHandler.init();
};

//***************************************************************************************
rbT.enableTimeOutHadnlingInternal= function(templateName,timerValue){
   
    rbT.eventHandler.timeOutHandler(templateName,timerValue);
};

//*************************************************************************************
rbT.invokeActionScriptInternal=function(action,actionParams){

      //TODO get the OS version here based on that action display

      rbT.init();
      
      var templateName = action;
       
      var pos= rbT.extractDisplayPositionFromTemplName(templateName);

      var isPosOccupied = rbT.isTemplPosOccupied(pos);

      if(isPosOccupied)
      {

          rbT.sendErrorToRBServer("Postion Occupied by Another Template");
      }
      else
      {
          var html = rbT.getTemplateHTMLByName(templateName);
          
          
          if(pos =='modal')
          {
               for (var key in actionParams) {
			    var value = actionParams[key]; 
			    if( 'rb.f.nr.transBlockZindex' == value.key)
			    {
				  value.value =  rbT.findZIndex();
			    }
			    else if( 'rb.f.nr.baseZindex' == value.key)
			    {
				  value.value =  rbT.findZIndex()+5;
			    }
             
		       }
         }
          else{
                
            for (var key in actionParams) {
			   var value = actionParams[key]; 
			   if( 'rb.f.nr.baseZindex' == value.key)
			  {
				value.value =  rbT.findZIndex()+5;
			  }
             
		    } 
		  }        

          html = rbT.getTemplateApplyVars(html, actionParams);
  
         console.log(html);

         if (rbT.isTemplateGoodToApply(html)){
           rbT.applyHtmltoPage(html);
           rbT.enableClickHandling();
           //rbT.enableTimeOutHadnling('topbar.generic.normal',10000);
		   rbT.setTemplatesDisplayLockFlags(pos,true);


         }
      }	

};	 