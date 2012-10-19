"use strict";

rbT.eventHandler = {
	
	init: function(){

		var eles = document.getElementsByClassName('rbClickable');
        
        for(var i = 0; i<eles.length; i++){

			eles[i].onclick= rbT.eventHandler.clickListner;

		}
			
                  },


	//this function for the capturing the event from the clicks
	clickListner : function(evt){
        

		var id = event.target.id;

		console.log(evt);

		var ele = document.getElementById(id);



		rbT.eventHandler.clickHandles[id](ele,evt);
		
		evt.preventDefault();
	},
	
	

	clickHandles: {
	
		'rbActionBottombarGenericFblikeCloseClick' : function(ele,evt){
			var id = ele.getAttribute("id");

			var Base = document.getElementById("rbBottombarGenericFblikeBase");

			Base.parentNode.removeChild(Base);

			rbT.templatesDisplayLockFlags['rbT.bottom.displayLock'] = false;

		},

		'rbActionBottombarGenericNormalCloseClick' : function(ele,evt){
			var id = ele.getAttribute("id");

			var Base = document.getElementById("rbBottombarGenericNormalBase");

			Base.parentNode.removeChild(Base);

			rbT.templatesDisplayLockFlags['rbT.bottom.displayLock'] = false;

		},
		'rbActionBottombarGenericTwfollowCloseClick' : function(ele,evt){
			var id = ele.getAttribute("id");

			var Base = document.getElementById("rbBottombarGenericTwfollowBase");

			Base.parentNode.removeChild(Base);

			rbT.templatesDisplayLockFlags['rbT.bottom.displayLock'] = false;

		},
		'rbActionBottombarGenericTwshareCloseClick' : function(ele,evt){
			var id = ele.getAttribute("id");

			var Base = document.getElementById("rbBottombarGenericTwshareBase");

			Base.parentNode.removeChild(Base);

			rbT.templatesDisplayLockFlags['rbT.bottom.displayLock'] = false;

		},
		'rbActionTopbarGenericFblikeCloseClick' : function(ele,evt){
      		var id = ele.getAttribute("id");

      		var Base = document.getElementById("rbTopbarGenericFblikeBase");

      		Base.parentNode.removeChild(Base);

      		rbT.templatesDisplayLockFlags['rbT.top.displayLock'] = false;

    	},

    	'rbActionTopbarGenericNormalCloseClick' : function(ele,evt){
      		
      		var id = ele.getAttribute("id");

      		var ele = document.getElementById("rbTopbarGenericNormalBase");

      		ele.parentNode.removeChild(ele);

     		 rbT.templatesDisplayLockFlags['rbT.top.displayLock'] = false;

    	},
    	'rbActionTopbarGenericTwfollowCloseClick' : function(ele,evt){
      		var id = ele.getAttribute("id");

      		var Base = document.getElementById("rbTopbarGenericTwfollowBase");

     		 Base.parentNode.removeChild(Base);

      		rbT.templatesDisplayLockFlags['rbT.top.displayLock'] = false;

    	},
    	
    	'rbActionTopbarGenericTwshareCloseClick' : function(ele,evt){
      		var id = ele.getAttribute("id");

      		var Base = document.getElementById("rbTopbarGenericTwshareBase");

      		Base.parentNode.removeChild(Base);

      		rbT.templatesDisplayLockFlags['rbT.top.displayLock'] = false;

    	},
      

      'rbModalGenericNormalClose' : function(ele,evt){
       var id = ele.getAttribute("id");

       var Base = document.getElementById("rbModalGenericNormalBase");
       var transBlock = document.getElementById("rbModalGenericNormalTransblock");

       Base.parentNode.removeChild(Base);
       transBlock.parentNode.removeChild(transBlock);



       rbT.templatesDisplayLockFlags['rbT.modal.displayLock'] = false;

      },

      'rbModalGenericNormalBtn' : function(ele,evt){

       //TODO send to server 

       var link = evt.target.href;


        console.log("rbModalGenericNormalBtn");

        //window.open(link, "_self");


      },
      




	},


   timeOutHandler : function (tempalteName , timerValue)
	{

       rbT.templTimer['rbT.templ.displaytimer'] = setInterval(function(){rbT.eventHandler.timerDeleteTempl
       	(tempalteName)},timerValue); 
       
    },


   timerDeleteTempl:function(tempalteName)
   {

       var tempMatch = tempalteName.match(/[a-z]*/g);

       id = "rb" + rbT.capitaliseFirstLetter(tempMatch[0])+rbT.capitaliseFirstLetter(tempMatch[2])+
            rbT.capitaliseFirstLetter(tempMatch[4])+"Base";
        
        rbT.setTemplatesDisplayLockFlags(tempMatch[0],false);
        
        var Base = document.getElementById(id);

         if( typeof Base === 'undefined')
         {
         	 //TODO Report to server
         }

         else
         {
            Base.parentNode.removeChild(Base);
            clearInterval(rbT.templTimer['rbT.templ.displaytimer']);

         }	


   }




};