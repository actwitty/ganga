/* Main code */
/* The global Rulebot scope */
"use strict";



//************************************************************************************

trigger_fish.rbT.init = function(){
	trigger_fish.rbT.keyPrefix = "{{";
	trigger_fish.rbT.keySuffix = "}}";  
  trigger_fish.rbT.inited = true;


};


//******************************************************************************************

trigger_fish.rbT.getTemplateHTMLByNameInternal = function(type,api){
	
    

            	var html = trigger_fish.rbT[trigger_fish.rbT.templateLib[type][api]];
                
                if(html != undefined)  
                {     
                     return html;
                }     
                else
                {
                	 trigger_fish.rbT.sendErrorToRBServer("Unsupported Templ");
                	 return "";
                } 
	
	
};
//*******************************************************************************************

trigger_fish.rbT.getTemplateApplyVarsInternal = function(html,vars){
	//TODO: check instanceOf
	if(html.length){
		for (var key in vars) {
		
		if(vars.hasOwnProperty(key))
		{	
			var value = vars[key] ; 
			
			if( key != 'rb.t.nr.templDuration')
            {
			  var tempVarToBeReplaced = key;			  
              var replaceKey = trigger_fish.rbT.keyPrefix + tempVarToBeReplaced + trigger_fish.rbT.keySuffix;

			  html = html.replace(replaceKey, value);

			} 
		}	
	  }
		return html;	
	}else{
	 trigger_fish.rbT.sendErrorToRBServer("Bad variable array error for template");
	 return "";
	}

};
//***************************************************************************************

trigger_fish.rbT.isTemplateGoodToApplyInternal = function(html){

	nMatched = ""
	var nMatched = html.match(/(\{\{[\w.]*\}\})/g)
	

	if (nMatched != null){
		trigger_fish.rbT.sendErrorToRBServer("Not all variables in templates were replaced");
		return false;
	}

	return true;
};

//**************************************************************************************

trigger_fish.rbT.applyHtmltoPageInternal = function(html,type){

  var isPosOccupied = trigger_fish.rbT.isTemplPosOccupied(type);
   if(isPosOccupied)
   {
      trigger_fish.rbT.sendErrorToRBServer("Postion Occupied by Another Template");
   }else{
	
      if(html.length){

    	 jQuery('body').append(html);
    	// document.body.innerHTML = document.body.innerHTML+html;
    	}else{

             trigger_fish.rbT.sendErrorToRBServer("Bad variable array error for template");
    	 			 return "";
    	 }
  }
};

//***********************************************************************************
trigger_fish.rbT.enableClickHandlingInternal = function(){
	trigger_fish.rbT.eventHandler.init();
};

//***************************************************************************************
trigger_fish.rbT.enableTimeOutHadnlingInternal= function(templateName,timerValue){
   
    trigger_fish.rbT.eventHandler.timeOutHandler(templateName,timerValue);
};

//***************************************************************************************
trigger_fish.rbT.applyHtmlToPage= function(){
   
    var html = trigger_fish.rbT.htmlGlobalStruct['trigger_fish.rbT.html'];
    var type = trigger_fish.rbT.htmlGlobalStruct['trigger_fish.rbT.type']; 
    var servermsg = trigger_fish.rbT.htmlGlobalStruct['trigger_fish.rbT.roiServerMsg']; 

    if (trigger_fish.rbT.isTemplateGoodToApply(html)){
        trigger_fish.rbT.applyHtmltoPage(html);
        trigger_fish.rbT.enableClickHandling();
        // trigger_fish.rbT.enableTimeOutHadnling(templateName,trigger_fish.rbT.templTimers['templ.templduration']*1000);

        params.display = servermsg + " " +"Display " + "Success";

        //trigger_fish.rbTServerChannel.conversion(params,trigger_fish.rbT.eventHandler.roiCallBackfromServerResponse);
    }
};

//*************************************************************************************

trigger_fish.rbT.invokeActionScriptInternal=function(action){

/*

      //TODO get the OS version here based on that action display

*/

    if(1) // Check for Service Type Enhancement
     {   
     
          params= {};  
          
          trigger_fish.rbT.init();

          var delayVal = 0;
          
          if (action.hasOwnProperty(timer) 
              && action.timer.hasOwnProperty(delay) 
                && typeof action.timer.delay === 'number'){
            delayVal = action.timer.delay;
          }


          if(delayVal==0)  //check for delay value to display templates
            {
                var actionParams = action.params;
                 
                var type=action.desc.type; 
                var api = action.desc.api;
                var servermsg = type + "."+api;
                var custom = undefined;

                var isPosOccupied = trigger_fish.rbT.isTemplPosOccupied(type);

                if(isPosOccupied)
                {

                    trigger_fish.rbT.sendErrorToRBServer("Postion Occupied by Another Template");
                }
                else
                {
                        if(type != 'custom' && api != 'html')
                    
                        {
                          var html = trigger_fish.rbT.getTemplateHTMLByName(type,api);
                     
                        }
                        else{

                          var html = undefined;    
                        }
                        for (var key in actionParams)
                        {
                            if(actionParams.hasOwnProperty(key))
                            {
                               var keyVal = key;
                                 var value = actionParams[key];
                                 var tempMatch = ""
                                 var tempMatch = value.match(/\{\{[\w.\=\%\:\/\s\#\@\-\']*\}\}/g);
                                 if(tempMatch)
                                 {
                                    var tempActionKeyRetVal =""
                                    tempActionKeyRetVal=trigger_fish.rbT.fillTheRuntimeValueForTemplArgs(tempMatch,actionParams[key]);
                                    

                                    if(tempActionKeyRetVal != undefined)
                                    { 
                                       actionParams[key] = tempActionKeyRetVal;
                                    }   
                                 }
                             }

                        }      

                  //   for (var key in actionParams) {             
                  //     if(actionParams.hasOwnProperty(key)){  
                     //     if( 'Zindex' == actionParams[key] ) {               
                      //      actionParams[key] =  trigger_fish.rbT.findZIndex()+5;
                     //     }
                     //  }              
                    // } 

                    if(type != 'custom' && api != 'html'){
                       html = trigger_fish.rbT.getTemplateApplyVars(html, actionParams);
                   

                    }else
                    {
                       html = actionParams.html;
                    }
                    
                    if (trigger_fish.rbT.isTemplateGoodToApply(html)){
                      trigger_fish.rbT.applyHtmltoPage(html,type);
                      trigger_fish.rbT.enableClickHandling();
                     // trigger_fish.rbT.enableTimeOutHadnling(templateName,trigger_fish.rbT.templTimers['templ.templduration']*1000);
                       
                       trigger_fish.rbT.setTemplatesDisplayLockFlags(type,true);

                       params.display = servermsg + " " +"Display " + "Success";

                       //trigger_fish.rbTServerChannel.conversion(params,trigger_fish.rbT.eventHandler.roiCallBackfromServerResponse);
                    }
                }
          }else{

                    trigger_fish.rbT.handlingOfDelayForTemplDisplay(action);

          }   
      }else{

         // Report to Server for If Service Type Wrong

      }    

    };   