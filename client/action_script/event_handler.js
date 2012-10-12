rbT.eventHandler = {
	init: function(){
		var eles = document.getElementsByClassName('rb.clickable');
		for(var i = 0; i<eles.length; i++){
			eles[i].onclick = rbT.eventHandler.clickListner;
		}
			
	},
	
	clickListner: function(evt){

		var id = event.target.id;
		var ele = document.getElementById(id);
		if ( rbT.eventHandler.clickHandles.hasOwnProperty(id) ){
			rbT.eventHandler.clickHandles[id](ele);
		}
		evt.preventDefault();
	},
	
	clickHandles: {
		'action.topbar.left.click': function (ele){
			var id = ele.getAttribute("id");
			alert(id);
		},
		'action.topbar.button.click' : function(ele){
			var id = ele.getAttribute("id");
			alert(id);
		},
		'action.topbar.right.click' : function(ele){
			var id = ele.getAttribute("id");
			alert(id);
		},
		'action.topbar.hide.click' : function(ele){
			var id = ele.getAttribute("id");
			alert(id);
		},
		'action.topbar.help.click' : function(ele){
			var id = ele.getAttribute("id");
			alert(id);
		}
	}

};