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
		for (var i =0; i<vars.length; i++) {
			
			var value = vars[i]; 
			
			if( value.key != 'rb.t.nr.templDuration')
            {
			  var tempVarToBeReplaced = value.key
              var replaceKey = rbT.keyPrefix + tempVarToBeReplaced + rbT.keySuffix;
			  html = html.replace(replaceKey, value.value);
			} 
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
               for (var i =0;i<actionParams.length;i++) {
			      var value = actionParams[i]; 
			       if( 'rb.f.nr.transBlockZindex' == value.key)
			       {
				      value.value =  rbT.findZIndex();
			       }

			       else if( 'rb.f.nr.baseZindex' == value.key)
			       {
				      value.value =  rbT.findZIndex()+5;
			       }

			       else if( 'rb.t.nr.durationOfDisplay'== value.key)
			       {
                      rbT.templTimers['rbT.templ.templduration']= value.value;
			       }
             
		       }
         }
          else{
                
           for (var j =0;j<actionParams.length;j++) {
			    var value = actionParams[j]; 
			  if( 'rb.f.nr.baseZindex' == value.key)
			  {
				value.value =  rbT.findZIndex()+5;
			  }
			  else if( 'rb.t.nr.durationOfDisplay'== value.key)
			  {
                   rbT.templTimers['rbT.templ.templduration']= value.value;
			  }
             
		    } 
		  }        

          html = rbT.getTemplateApplyVars(html, actionParams);
  
         console.log(html);

         if (rbT.isTemplateGoodToApply(html)){
           rbT.applyHtmltoPage(html);
           rbT.enableClickHandling();
           //rbT.enableTimeOutHadnling(templateName,rbT.templTimers['rbT.templ.templduration']);
		   rbT.setTemplatesDisplayLockFlags(pos,true);


         }
      }	

};	 