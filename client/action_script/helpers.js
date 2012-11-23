"use strict";

// Templ Sys , Actor and Event Varibales

trigger_fish.rbT.currentSystemVar = {} //{'browser':{'name':'Chrome','version':'1.2','name2':{'myname':'Amartya'}}};
trigger_fish.rbT.currentActorVar = {};
trigger_fish.rbT.currentEventVar = {};


//templ related timers

trigger_fish.rbT.templTimers= {
 'templ.displaytimer':'false',
 'templ.templduration':'100'

};


//templ delay Q

trigger_fish.rbT.minPipeSize = 10;
trigger_fish.rbT.globalDelayQ = new Array(trigger_fish.rbT.minPipeSize);
trigger_fish.rbT.globalDelayQTimeVal = new Array(trigger_fish.rbT.minPipeSize); 



// display lock for templ positions

trigger_fish.rbT.templatesDisplayLockFlags = {

    'trigger_fish.rbT.topbar.displayLock':'false',
    'trigger_fish.rbT.bottombar.displayLock':'false',
    'trigger_fish.rbT.modal.displayLock' :'false',
    'trigger_fish.rbT.chat.displayLock' :'false',
    'trigger_fish.rbT.uservoice.displayLock' :'false',


};

//function to handle on timout for templ delay display
trigger_fish.rbT.handleTimeoutforTemplDelayedDisplay = function(timerIndexforDisplayDelay,actionIndexforDisplayDelay)
{ 
   if(trigger_fish.rbT.globalDelayQ[actionIndexforDisplayDelay] != undefined )
   {
      trigger_fish.rbT.globalDelayQ[actionIndexforDisplayDelay].timers.delay = 0;
      
      var tempStatus=trigger_fish.rbT.invokeActionScript(trigger_fish.rbT.globalDelayQ[actionIndexforDisplayDelay]);
      
      trigger_fish.rbT.globalDelayQ[actionIndexforDisplayDelay] = undefined;
      
    } 
    
    if(trigger_fish.rbT.globalDelayQTimeVal[timerIndexforDisplayDelay] != undefined)
    {  
      clearInterval(trigger_fish.rbT.globalDelayQTimeVal[timerIndexforDisplayDelay]);
        
      trigger_fish.rbT.globalDelayQTimeVal[timerIndexforDisplayDelay] = undefined; 
    }    
};


//function for handling delay for templ display
 trigger_fish.rbT.handlingOfDelayForTemplDisplay=function(action)
 {

    var i= 0;
    var j = 0;
    var foundTimerIndex = false;
    var foundActionIndex = false;


    var delay = action.timers.delay;

    
    for(i=0 ; i<trigger_fish.rbT.globalDelayQTimeVal.length;i++)
    {
      if(trigger_fish.rbT.globalDelayQTimeVal[i] == undefined)
       { 
         foundTimerIndex =true;
          break;
        } 

    }
    

    for(j=0 ;j<trigger_fish.rbT.globalDelayQ.length;j++)
    {
      if(trigger_fish.rbT.globalDelayQ[j] == undefined)
      {
        foundActionIndex =true; 
        break;
       }  

    }
 
    if(foundActionIndex ==true && foundTimerIndex == false)
     {
        trigger_fish.rbT.globalDelayQTimeVal.push('undefined');
        i = i+1;
     } 

     else if(foundActionIndex == false && foundTimerIndex == true)
     {
        trigger_fish.rbT.globalDelayQ.push('undefined');
        j = j+1;
     } 

      var timerIndexforDisplayDelay = i;
      var actionIndexforDisplayDelay = j;
      trigger_fish.rbT.globalDelayQ[j] = action; 
      
      trigger_fish.rbT.globalDelayQTimeVal[timerIndexforDisplayDelay] = setInterval(function(){trigger_fish.rbT.handleTimeoutforTemplDelayedDisplay(timerIndexforDisplayDelay,actionIndexforDisplayDelay)}
          ,delay*1000); 



 };





//function for set the display lock for templ postions

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

// INTEGRATION_ENABLE                            

                         //  trigger_fish.rbT.currentSystemVar = trigger_fish.rbTSystemVar.getProperty();
                         //  trigger_fish.rbT.currentActorVar = trigger_fish.rbTActor.getProperties();
                         //  trigger_fish.rbT.currentEventVar = trigger_fish.rbTAPP.getTransVar();

                             
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
                              } 
                               return actionparmaskey;


              
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


trigger_fish.rbT.sendErrorToRBServer = function(string){

// INTEGRATION_ENABLE  
   
// trigger_fish.rbTAPP.log({"message": string,"log":true});

// trigger_fish.rbTAPP.reportError({"message":string,"server":true});

console.log(string);

};


