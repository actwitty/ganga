"use strict";

//templ related timers

rbT.templTimers= {
 'rbT.templ.displaytimer':'false',

};

// display lock for templ positions

rbT.templatesDisplayLockFlags = {

    'rbT.topbar.displayLock':'false',
    'rbT.bottombar.displayLock':'false',
    'rbT.modal.displayLock' :'false',
    'rbT.chat.displayLock' :'false',
    'rbT.feedback.displayLock' :'false',


};

//function fir set the display lock for templ postions

rbT.setTemplatesDisplayLockFlags=function(pos,value)
{

   if(pos == 'topbar') 
   {
     rbT.templatesDisplayLockFlags['rbT.topbar.displayLock'] = value; 
   }

   else if(pos == 'bottombar') 
   {
     rbT.templatesDisplayLockFlags['rbT.bottombar.displayLock'] = value; 
   }

   else if(pos == 'modal') 
   {
     rbT.templatesDisplayLockFlags['rbT.modal.displayLock'] = value; 
   }

   else if(pos == 'chat') 
   {
     rbT.templatesDisplayLockFlags['rbT.chat.displayLock'] = value; 
   }

  else if(pos == 'feedback') 
   {
     rbT.templatesDisplayLockFlags['rbT.feedback.displayLock'] = value; 
   }

}



//************************************************
//function returns the string making capital letter the first letter

rbT.capitaliseFirstLetter=function(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
};


//********************************************************


//*************************************************

//from template name extract the disply position for the template

rbT.extractDisplayPositionFromTemplName = function(templName){

    var tempReg = /[a-z]*/g;
    var tempMatch = tempReg.exec(templName);
    return tempMatch;

};

//******************************************************************8
//check for the if templ position is occupied
rbT.isTemplPosOccupied = function(pos){
   
   var ret = false;
 

   if(pos == 'topbar' && rbT.templatesDisplayLockFlags['rbT.topbar.displayLock'] 
    == true ) 
   {
     ret= true;
      
   }
   else if(pos == 'bottombar' && rbT.templatesDisplayLockFlags['rbT.bottombar.displayLock'] 
    == true ) 
   {
     ret= true;
    }
  else if(pos == 'modal' && rbT.templatesDisplayLockFlags['rbT.modal.displayLock'] 
    == true )
  {
     //TODO
  }

 else if(pos == 'chat' && rbT.templatesDisplayLockFlags['rbT.chat.displayLock'] 
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
rbT.findZIndex = function(){

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

rbT.getBrowserVersion = function(){
  //TODO: Modernzer
};


rbT.getPlatform = function(){
 //TODO: Modernzer

};


rbT.sendEventToRBServer = function(){


};

rbT.sendErrorToRBServer = function(string){

  //TODO: Implement post to server
  console.log(string);
};


rbT.foo = function (val)
{
   rbT.foo.staticProperty = "flag";

}