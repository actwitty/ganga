"use strict";

rbT.eventHandler = {
	
 //**************************************************************************************** 
	init: function(){

		var eles = document.getElementsByClassName('rbClickable');
        
        for(var i = 0; i<eles.length; i++){

			eles[i].onclick= rbT.eventHandler.clickListner;

		}
 },

//************************************************************************************************8

//this function for the capturing the event from the clicks
	clickListner : function(evt){
        

		var id = evt.target.id;


		var ele = document.getElementById(id);

    var idMatch = id.match(/[A-Z][a-z]*/g);

 

   if (idMatch[3])
   {
     if ( idMatch[3] == 'Close')
     {
        rbT.eventHandler.closeTempl(idMatch);
     }
  
    else if ( idMatch[3] == 'Roi' )
    {
         rbT.eventHandler.roiFromTemplClick(idMatch,evt);

    }

  }
  else{
          rbT.sendErrorToRBServer(" Close or ROI Click is Not valid ");

  }

       evt.preventDefault();

	
  },
	
//*****************************************************************************************************	
 clickHandles: {

   //TODO
	
	},

//*******************************************************************************************************

  timeOutHandler : function (tempalteName , timerValue)
	{


       rbT.templTimers['templ.displaytimer'] = setInterval(function(){rbT.eventHandler.timerDeleteTempl
       (tempalteName)},timerValue); 
       
  },

//******************************************************************************************************
  timerDeleteTempl:function(tempalteName)
  {

       var tempMatch = tempalteName.match(/[a-z]*/g);

 
       
      if(tempMatch[0] != 'modal' )
       { 
           id = "rb" + rbT.makeFirstLetterCapital(tempMatch[0])+rbT.makeFirstLetterCapital(tempMatch[2])+rbT.makeFirstLetterCapital(tempMatch[4])+"BaseContainer";
       }     


     else if(tempMatch[0] == 'modal')
     {

         var id = "rb" + rbT.makeFirstLetterCapital(tempMatch[0])+rbT.makeFirstLetterCapital(tempMatch[2])+rbT.makeFirstLetterCapital(tempMatch[4])+"BaseContainer";
         var transId = "rb" + rbT.makeFirstLetterCapital(tempMatch[0])+rbT.makeFirstLetterCapital(tempMatch[2])+rbT.makeFirstLetterCapital(tempMatch[4])+"TranblockContainer";
         var transBase = document.getElementById(transId);
         if(transBase != 'undefined')
         transBase.parentNode.removeChild(transBase);
     } 
     

        
        rbT.setTemplatesDisplayLockFlags(tempMatch[0],false);
        
        var Base = document.getElementById(id);

         if( typeof Base === 'undefined')
         {
         	  rbT.sendErrorToRBServer("Not able to find template Base for timeout Delete ");

         }

         else
         {
            Base.parentNode.removeChild(Base);
            clearInterval(rbT.templTimers['templ.displaytimer']);

         }	


  },

  //***********************************************************************************************************

   closeTempl:function(idMatch){

      if(rbT.templTimers['templ.displaytimer'])
      {
          clearInterval(rbT.templTimers['templ.displaytimer']);

      }
      if(idMatch[0] == 'Topbar' || idMatch[0] == 'Bottombar' )

     {   

         var id= "rb" + idMatch[0]+idMatch[1]+idMatch[2]+"BaseContainer";


     }

     else if(idMatch[0] == 'Modal')
     {

         var id = "rb" + idMatch[0]+idMatch[1]+idMatch[2]+"BaseContainer";
         var transId = "rb" + idMatch[0]+idMatch[1]+idMatch[2]+"TranblockContainer";
         var transBase = document.getElementById(transId);
         transBase.parentNode.removeChild(transBase);
     } 


      var Base = document.getElementById(id);

      
      if(Base)
      {
         Base.parentNode.removeChild(Base);

         rbT.setTemplatesDisplayLockFlags(rbT.makeFirstLetterSmall(idMatch[0]),false);
         
      }else{
            rbT.sendErrorToRBServer("Not able to find template Base for Normal X Delete ");

      }


  },

//******************************************************************************************************
  
  roiFromTemplClick:function(idMatch,evt){

    var link = evt.target.href;
    window.open(link);

/*
         //rbTServerChannel.roi(JSON);
        //TODO

*/

  },  
 




};