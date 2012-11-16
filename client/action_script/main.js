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

trigger_fish.rbT.getTemplateHTMLByNameInternal = function(name){
	
    
        if (trigger_fish.rbT.templateLib.hasOwnProperty(name) ){
  
			var html =  trigger_fish.rbT[trigger_fish.rbT.templateLib[name]];


            return html;
		}else{
		trigger_fish.rbT.sendErrorToRBServer("unsupported template " + name);
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

trigger_fish.rbT.applyHtmltoPageInternal = function(html){

	if(html.length){


	 jQuery('body').append(html);

	// document.body.innerHTML = document.body.innerHTML+html;

	}else{

         trigger_fish.rbT.sendErrorToRBServer("Bad variable array error for template");
	 			 return "";
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

//*************************************************************************************
trigger_fish.rbT.invokeActionScriptInternal=function(action,actionParams){

/*

      //TODO get the OS version here based on that action display
*/    
      params= {};  
      
      trigger_fish.rbT.init();
      

      var templateName = action;
       
      var pos= trigger_fish.rbT.extractDisplayPositionFromTemplName(templateName);

      var isPosOccupied = trigger_fish.rbT.isTemplPosOccupied(pos);

      if(isPosOccupied)
      {

          trigger_fish.rbT.sendErrorToRBServer("Postion Occupied by Another Template");
      }
      else
      {
          var html = trigger_fish.rbT.getTemplateHTMLByName(templateName);
          
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

          
          if(pos =='modal')
          {
               for (var key in actionParams) {

               	if(actionParams.hasOwnProperty(key))
               	{
			         if( 'rb.f.nr.transBlockZindex' == key)
			       {
				       actionParams[key] =  trigger_fish.rbT.findZIndex();
			       }

			       else if( 'rb.f.nr.baseZindex' == key)
			       {
				      actionParams[key]  =  trigger_fish.rbT.findZIndex()+5;
			       }

			    
             
		       }
		     }  
         }
          else{
                
           for (var key in actionParams) {
             if(actionParams.hasOwnProperty(key))
			  {	
			  if( 'rb.f.nr.baseZindex' == key)
			  {
				actionParams[key] =  trigger_fish.rbT.findZIndex()+5;
			  }
			  

			 } 
             
		    } 
		  }        

		



          html = trigger_fish.rbT.getTemplateApplyVars(html, actionParams);
          

         if (trigger_fish.rbT.isTemplateGoodToApply(html)){
            trigger_fish.rbT.applyHtmltoPage(html);
            trigger_fish.rbT.enableClickHandling();
           // trigger_fish.rbT.enableTimeOutHadnling(templateName,trigger_fish.rbT.templTimers['templ.templduration']*1000);
		    trigger_fish.rbT.setTemplatesDisplayLockFlags(pos,true);

             params.display = action + " " +"Display " + "Success";
    
// Report Server Display of Templ Successfull
/*
         //trigger_fish.rbTServerChannel.conversion(params,trigger_fish.rbT.eventHandler.roiCallBackfromServerResponse);

*/

         }
      }	

};	 