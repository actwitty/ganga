"use strict";

// Templ Sys , Actor and Event Varibales

trigger_fish.rbT.currentSystemVar = {'browser':{'name':'Chrome','version':'1.2','name2':{'myname':'Amartya'}}};
trigger_fish.rbT.currentActorVar = {};
trigger_fish.rbT.currentEventVar = {};


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


//**********************************************************************************

// fill the run time variable in in templ args from sys,actor and event varibale

trigger_fish.rbT.fillTheRuntimeValueForTemplArgs = function(tempMatch,actionparmaskey)
{

      try{
             

// if e. event hash
// if s. system hash
// if a. actor variable

                           // fetch system variable here 
                           // fetch actor variable here
                           // fetch event variable here
                             
                           for(var i=0 ; i<tempMatch.length ; i++)
                           {

                              var objNested = {};
                               
                               
                               var tempMatchForscope = ""

                               tempMatch[i]=tempMatch[i].replace("{{","");
                               tempMatch[i]=tempMatch[i].replace("}}","");


                               tempMatchForscope = tempMatch[i].match(/[\w]*/g);

                               if(tempMatchForscope[0])
                               
                               {
                                   var k =0;

                                

                                    if(tempMatchForscope[0] == "s")
                                    {
                                       objNested = trigger_fish.rbT.currentSystemVar; 
   
                                       for(k=2;k<=tempMatchForscope.length-2;k++)
                                       {
                                         if(k%2 === 0)
                                          {
                                             var objNested = objNested[tempMatchForscope[k]] 

                                          } 
                                       }
                                   }

                                  else if(tempMatchForscope[0] == "e")
                                    {
                                       objNested =trigger_fish.rbT.currentEventVar; 
   
                                       for(k=2;k<=tempMatchForscope.length-2;k++)
                                       {
                                         if(k%2 === 0)
                                          {
                                             var objNested = objNested[tempMatchForscope[k]] 

                                          } 
                                       }
                                   }

                                  else if(tempMatchForscope[0] == "a")
                                    {
                                       objNested =trigger_fish.rbT.currentActorVar ; 
   
                                       for(k=2;k<=tempMatchForscope.length-2;k++)
                                       {
                                         if(k%2 === 0)
                                          {
                                             var objNested = objNested[tempMatchForscope[k]] 

                                          } 
                                       }
                                   }

                                 
                          }  

                               tempMatch[i] = '{{'+ tempMatch[i] + '}}';

                               actionparmaskey = actionparmaskey.replace(tempMatch[i],objNested);

                               return actionparmaskey;


                         }         
              
         }catch(e){

                trigger_fish.rbT.sendErrorToRBServer(e.message);

         }

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

  /* trigger_fish.rbTAPP.log({"message": "Handling event with server resp","data":respData});
 */
  console.log(string);
};


