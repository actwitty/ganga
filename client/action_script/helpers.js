"use strict";

//templ related timers

trigger_fish.rbT.templTimers= {
 'templ.displaytimer':'false',
 'templ.templduration':'100'

};

// display lock for templ positions

trigger_fish.rbT.templatesDisplayLockFlags = {

    'trigger_fish.rbT.topbar.displayLock':'false',
    'trigger_fish.rbT.bottombar.displayLock':'false',
    'trigger_fish.rbT.modal.displayLock' :'false',
    'trigger_fish.rbT.chat.displayLock' :'false',
    'trigger_fish.rbT.uservoice.displayLock' :'false',


};

//function fir set the display lock for templ postions

trigger_fish.rbT.setTemplatesDisplayLockFlags=function(pos,value)
{

   if(pos == 'topbar') 
   {
     trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.topbar.displayLock'] = value; 
   }

   else if(pos == 'bottombar') 
   {
     trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.bottombar.displayLock'] = value; 
   }

   else if(pos == 'modal') 
   {
     trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.modal.displayLock'] = value; 
   }

   else if(pos == 'chat') 
   {
     trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.chat.displayLock'] = value; 
   }

  else if(pos == 'feedback') 
   {
     trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.feedback.displayLock'] = value; 
   }

}



//************************************************
//function returns the string making capital letter the first letter

trigger_fish.rbT.makeFirstLetterCapital=function(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
};


////************************************************
//function returns the string making capital letter the first letter

trigger_fish.rbT.makeFirstLetterSmall=function(string)
{
    return string.charAt(0).toLowerCase() + string.slice(1);
};


//********************************************************


//*************************************************

//from template name extract the disply position for the template

trigger_fish.rbT.extractDisplayPositionFromTemplName = function(templName){

    var tempReg = /[a-z]*/g;
    var tempMatch = tempReg.exec(templName);
    return tempMatch;

};

//******************************************************************
//check for the if templ position is occupied
trigger_fish.rbT.isTemplPosOccupied = function(pos){
   
   var ret = false;
 

   if(pos == 'topbar' && trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.topbar.displayLock'] 
    == true ) 
   {
     ret= true;
      
   }
   else if(pos == 'bottombar' && trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.bottombar.displayLock'] 
    == true ) 
   {
     ret= true;
    }
  else if(pos == 'modal' && trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.modal.displayLock'] 
    == true )
  {
     //TODO
  }

 else if(pos == 'chat' && trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.chat.displayLock'] 
    == true )
  {
     ret= true;
  }


  else if(pos == 'feedback')
  {
     //TODO
  }


 return ret;
};


//**************************************************************

//function for find hightest Z index
trigger_fish.rbT.findZIndex = function(){

  var elements = document.getElementsByTagName("*");
  var highest_index = 0;

  for (var i = 0; i < elements.length - 1; i++) 
  {
    if (parseInt(elements[i].style.zIndex) > highest_index)
    { 
       highest_index = parseInt(elements[i].style.zIndex);
    }
  }

  highest_index = highest_index +1;


  return highest_index ;

};

trigger_fish.rbT.getBrowserVersion = function(){
  //TODO: Modernzer
};


trigger_fish.rbT.getPlatform = function(){
 //TODO: Modernzer

};


trigger_fish.rbT.sendEventToRBServer = function(){


};

trigger_fish.rbT.sendErrorToRBServer = function(string){

  
/*

 trigger_fish.rbTAPP.reportError({"message":string,"server":true});


*/

  //TODO: Implement post to server // for console log=true
  console.log(string);
};


