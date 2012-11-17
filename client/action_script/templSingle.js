


/****************************[[include.js]]*************************************/ 


if(!trigger_fish){    
	var trigger_fish = {};
}

trigger_fish.rbT = { inited: false};


/****************************[[templates.js]]*************************************/ 


trigger_fish.rbT.templateLib = {
'topbar' :{ 
 				'generic.normal':'rbTemplTopbarGenericNormalHTML',
				'generic.twitterfollow':'rbTemplTopbarGenericTwitterfollowHTML',
				'generic.fblike':'rbTemplTopbarGenericFblikeHTML',
				'generic.twittershare':'rbTemplTopbarGenericTwittershareHTML'
 
 	 	 	 }, 



 'bottombar' :{ 
 				'generic.fblike':'rbTemplBottombarGenericFblikeHTML',
				'generic.twitterfollow':'rbTemplBottombarGenericTwitterfollowHTML',
				'generic.twittershare':'rbTemplBottombarGenericTwittershareHTML',
				'generic.normal':'rbTemplBottombarGenericNormalHTML'
 
 	 	 	 }, 



 'modal' :{ 
 				'generic.normal':'rbTemplModalGenericNormalHTML'
 
 	 	 	 }, 



 'support' :{ 
 				'olark.normal':'rbTemplSupportOlarkNormalHTML'
 
 	 	 	 }, 



 'feedback' :{ 
 				'uservoice.normal':'rbTemplFeedbackUservoiceNormalHTML'
 
 	 	 	 }
 
 	 	 	 }; 



 trigger_fish.rbT.templateName = {
	 			
	 			'topbar.generic.normal':'Normal Topbar',
	 			'topbar.generic.twitterfollow':'Twitter Follow Topbar',
	 			'topbar.generic.fblike':'Facebook Like Topbar',
	 			'topbar.generic.twittershare':'Twitter Share Topbar',
	 			'bottombar.generic.twitterfollow':'Twitter Follow Bottombar',
	 			'bottombar.generic.fblike':'Facebook Like Bottombar',
	 			'bottombar.generic.twittershare':'Twitter Share Bottombar',
	 			'bottombar.generic.normal':'Normal Bottombar',
	 			'support.olark.normal':'Chat Window',
	 			'modal.generic.normal':'Modal Window',
	 			'feedback.uservoice.normal':'User Voice Feedback'			
	 			
 	 	 	 	 }; 



 trigger_fish.rbT.templateArgs = {
	 	  'bottombar.generic.fblike':{

 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.nr.textFontsize',
	 	 	 	 	 				value :'15'
	 	 	 	 	 	  },
	 	 	 	 	 	  '1' : {
	 	 	 	 	 				key :'rb.t.cr.textColor',
	 	 	 	 	 				value :'#F2F0F0'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.ft.textFontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.sg.textFontWeight',
	 	 	 	 	 				value :'bold'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.f.nr.baseZindex',
	 	 	 	 	 				value :'1000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.baseWidth',
	 	 	 	 	 				value :'100'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.nr.baseHeight',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.cr.baseBgColor',
	 	 	 	 	 				value :'#3C5891'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.an.baseTextalign',
	 	 	 	 	 				value :'center'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.vsg.textLeft',
	 	 	 	 	 				value :'Hello Hello'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.ul.facebookPage',
	 	 	 	 	 				value :'http://www.google.com'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' :{
	 	 	 	 	 				key :'rb.t.vsg.textRight',
	 	 	 	 	 				value :'Hello Hello'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'topbar.generic.normal':{


 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.nr.textFontsize',
	 	 	 	 	 				value :'15'
	 	 	 	 	 	  },
	 	 	 	 	 	  '2' : {
	 	 	 	 	 				key :'rb.t.cr.textColor ',
	 	 	 	 	 				value :'#333'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.ft.textFontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.sg.textFontWeight',
	 	 	 	 	 				value :'bold'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.f.nr.baseZindex',
	 	 	 	 	 				value :'100'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.baseWidth',
	 	 	 	 	 				value :'100'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.nr.baseHeight',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.cr.baseBgColor',
	 	 	 	 	 				value :'#DCDCDC'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.an.baseTextalign',
	 	 	 	 	 				value :'center'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.vsg.textLeft',
	 	 	 	 	 				value :'Hello'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.nr.btnFontSize',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' : {
	 	 	 	 	 				key :'rb.t.cr.btnBgColor',
	 	 	 	 	 				value :'#548AC7'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '13' : {
	 	 	 	 	 				key :'rb.t.cr.btnColor',
	 	 	 	 	 				value :'white'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '14' : {
	 	 	 	 	 				key :'rb.t.ul.btnLink',
	 	 	 	 	 				value :'http://www.google.com'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '15' : {
	 	 	 	 	 				key :'rb.t.sg.btnLable',
	 	 	 	 	 				value :'Click'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '16' :{
	 	 	 	 	 				key :'rb.t.vsg.textRight',
	 	 	 	 	 				value :'Hello'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'topbar.generic.twitterfollow':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.cr.textColor ',
	 	 	 	 	 				value :'white'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.nr.textFontsize',
	 	 	 	 	 				value :'17'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.cr.textShadow',
	 	 	 	 	 				value :'black'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.ft.textFontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.sg.textFontWeight',
	 	 	 	 	 				value :'bold'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.f.nr.baseZindex',
	 	 	 	 	 				value :'1000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.nr.baeWidth',
	 	 	 	 	 				value :'100'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.nr.baseHeight',
	 	 	 	 	 				value :'50'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.cr.baeBgColor',
	 	 	 	 	 				value :'#0B8AB8'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.an.baseTextalign',
	 	 	 	 	 				value :'center'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.vsg.textLeft',
	 	 	 	 	 				value :'Hello Hello'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' : {
	 	 	 	 	 				key :'rb.t.sg.twitterAccountLink',
	 	 	 	 	 				value :'@actwitty'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '13' : {
	 	 	 	 	 				key :'rb.t.sg.twitterAccountLable',
	 	 	 	 	 				value :'@actwitty'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '14' :{
	 	 	 	 	 				key :'rb.t.vsg.textRight',
	 	 	 	 	 				value :'Hello Hello'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'bottombar.generic.twitterfollow':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.cr.textColor ',
	 	 	 	 	 				value :'white'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.nr.textFontsize',
	 	 	 	 	 				value :'17'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.cr.textShadow',
	 	 	 	 	 				value :'black'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.ft.textFontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.sg.textFontWeight',
	 	 	 	 	 				value :'bold'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.f.nr.baseZindex',
	 	 	 	 	 				value :'1000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.nr.baeWidth',
	 	 	 	 	 				value :'100'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.nr.baseHeight',
	 	 	 	 	 				value :'50'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.cr.baeBgColor',
	 	 	 	 	 				value :'#0B8AB8'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.an.baseTextalign',
	 	 	 	 	 				value :'center'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.vsg.textLeft',
	 	 	 	 	 				value :'Hello Hello'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' : {
	 	 	 	 	 				key :'rb.t.sg.twitterAccountLink',
	 	 	 	 	 				value :'@actwitty'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '13' : {
	 	 	 	 	 				key :'rb.t.sg.twitterAccountLable',
	 	 	 	 	 				value :'@actwitty'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '14' :{
	 	 	 	 	 				key :'rb.t.vsg.textRight',
	 	 	 	 	 				value :'Hello Hello'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'topbar.generic.fblike':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.cr.textColor ',
	 	 	 	 	 				value :'#F2F0F0'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.nr.textFontsize',
	 	 	 	 	 				value :'16'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.ft.textFontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.sg.textFontWeight',
	 	 	 	 	 				value :'bold'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.f.nr.baseZindex',
	 	 	 	 	 				value :'1000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.baseWidth',
	 	 	 	 	 				value :'100'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.nr.baseHeight',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.cr.baseBgColor',
	 	 	 	 	 				value :'#3C5891'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.an.baseTextalign',
	 	 	 	 	 				value :'center'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.vsg.textLeft',
	 	 	 	 	 				value :'Hello Hello'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.ul.facebookPage',
	 	 	 	 	 				value :'http://www.google.com'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' :{
	 	 	 	 	 				key :'rb.t.vsg.textRight',
	 	 	 	 	 				value :'Hello Hello'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'bottombar.generic.twittershare':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.cr.textColor ',
	 	 	 	 	 				value :'white'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.nr.textFontsize',
	 	 	 	 	 				value :'17'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.cr.textShadow',
	 	 	 	 	 				value :'black'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.ft.textFontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.sg.textFontWeight',
	 	 	 	 	 				value :'bold'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.f.nr.baseZindex',
	 	 	 	 	 				value :'1000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.nr.baeWidth',
	 	 	 	 	 				value :'100'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.nr.baseHeight',
	 	 	 	 	 				value :'50'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.cr.baeBgColor',
	 	 	 	 	 				value :'#0B8AB8'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.an.baseTextalign',
	 	 	 	 	 				value :'center'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.vsg.leftText',
	 	 	 	 	 				value :'Hello Hello'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' : {
	 	 	 	 	 				key :'rb.t.sg.twitterSharetext',
	 	 	 	 	 				value :'Twteet please'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '13' :{
	 	 	 	 	 				key :'rb.t.vsg.rightText',
	 	 	 	 	 				value :'Hello Hello'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'support.olark.normal':{

 	 	 	 	 	 	 '1' :{
	 	 	 	 	 				key :'rb.t.sg.olarkIdentity',
	 	 	 	 	 				value :'\'6679-845-10-6199\''
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'modal.generic.normal':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.f.nr.transBlockZindex',
	 	 	 	 	 				value :'1000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.f.nr.baseZindex',
	 	 	 	 	 				value :'1005'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.cr.baseBgColor',
	 	 	 	 	 				value :'white'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.cr.headingBgColor',
	 	 	 	 	 				value :'#e7e7e7'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.cr.modalHeadingColor',
	 	 	 	 	 				value :'#525252'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.modalHeadingFontsize',
	 	 	 	 	 				value :'20'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.ft.headingFontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.cr.modalHeadingTextShadow',
	 	 	 	 	 				value :'#6e6e6e'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.vsg.modalHeadingText',
	 	 	 	 	 				value :'This is the Heading '
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.cr.modalTextColor',
	 	 	 	 	 				value :'#525252'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.nr.modalTextFontsize',
	 	 	 	 	 				value :'12'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' : {
	 	 	 	 	 				key :'rb.t.ft.textFontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '13' : {
	 	 	 	 	 				key :'rb.t.vsg.modalText',
	 	 	 	 	 				value :'Hello Hello Hello Hello Hello hello heello bjashsdgfsdhvfhsdvcfhsdvhcsd hvhvchjsdvchjsdvchjvsdchvsdhvcjhsdvjvh '
	 	 	 	 	 	  },
 	 	 	 	 	 	 '14' : {
	 	 	 	 	 				key :'rb.t.sg.modalImgPath',
	 	 	 	 	 				value :'../../../images/rails.png'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '15' : {
	 	 	 	 	 				key :'rb.t.cr.buttonBgColor',
	 	 	 	 	 				value :'#3B5998'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '16' : {
	 	 	 	 	 				key :'rb.t.ul.modalBtnLink',
	 	 	 	 	 				value :'http://www.google.com'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '17' :{
	 	 	 	 	 				key :'rb.t.sg.modalBtnLable',
	 	 	 	 	 				value :'Click'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'feedback.uservoice.normal':{

	 	 	 	 	 },
	 	  'bottombar.generic.normal':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.cr.textColor ',
	 	 	 	 	 				value :'#333'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.nr.textFontsize',
	 	 	 	 	 				value :'15'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.ft.textFontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.sg.textFontWeight',
	 	 	 	 	 				value :'bold'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.f.nr.baseZindex',
	 	 	 	 	 				value :'100'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.baseWidth',
	 	 	 	 	 				value :'100'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.nr.baseHeight',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.cr.baseBgColor',
	 	 	 	 	 				value :'#DCDCDC'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.an.baseTextalign',
	 	 	 	 	 				value :'center'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.vsg.textLeft',
	 	 	 	 	 				value :'Hello Hello'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.nr.btnFontSize',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' : {
	 	 	 	 	 				key :'rb.t.cr.btnBgColor',
	 	 	 	 	 				value :'#548AC7'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '13' : {
	 	 	 	 	 				key :'rb.t.cr.btnColor',
	 	 	 	 	 				value :'white'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '14' : {
	 	 	 	 	 				key :'rb.t.ul.btnLink',
	 	 	 	 	 				value :'http://www.google.com'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '15' : {
	 	 	 	 	 				key :'rb.t.sg.btnLable',
	 	 	 	 	 				value :'Click'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '16' :{
	 	 	 	 	 				key :'rb.t.vsg.textRight',
	 	 	 	 	 				value :'Hello Hello'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'topbar.generic.twittershare':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.cr.textColor ',
	 	 	 	 	 				value :'white'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.nr.textFontsize',
	 	 	 	 	 				value :'17'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.cr.textShadow',
	 	 	 	 	 				value :'black'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.ft.textFontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.sg.textFontWeight',
	 	 	 	 	 				value :'bold'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.f.nr.baseZindex',
	 	 	 	 	 				value :'1000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.nr.baeWidth',
	 	 	 	 	 				value :'100'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.nr.baseHeight',
	 	 	 	 	 				value :'50'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.cr.baeBgColor',
	 	 	 	 	 				value :'#0B8AB8'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.an.baseTextalign',
	 	 	 	 	 				value :'center'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.vsg.leftText',
	 	 	 	 	 				value :'Hello Hello'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' : {
	 	 	 	 	 				key :'rb.t.sg.twitterSharetext',
	 	 	 	 	 				value :'Twteet please'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '13' :{
	 	 	 	 	 				key :'rb.t.vsg.rightText',
	 	 	 	 	 				value :'Hello Hello'
	 	 	 	 	 	  }
	 	 	 	 	 }
 	 	 	 	 }; 
 



/****************************[[./templates/topbars/rbTemplBottombarGenericFblike.js]]*************************************/ 


trigger_fish.rbT.rbTemplBottombarGenericFblikeHTML='<!-- --><!-- --><style>.rbTextValue   {     color:{{1}};     font-size: {{2}}px;     font-family: {{3}};     text-shadow : #1C2C4C 0px -1px 0px;     font-style: normal;     font-weight:{{4}};   }</style> <div id="fb-root"></div><script>(function(d, s, id) {  var js, fjs = d.getElementsByTagName(s)[0];  var k = \'hello\';  if (d.getElementById(id)) return;  js = d.createElement(s); js.id = id;  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";  fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));</script><div id="rbBottombarGenericFblikeBaseContainer"  style="zIndex:{{5}};width:{{6}}%;height:{{7}}px;display:block; background-color:{{8}};border-style:none; position:fixed; bottom:0px; left:0px; box-shadow: 2px -2px 2px #888888;text-align:{{9}};">      <div id="rbBottombarGenericFblikeLeftClick" class="rbTextValue" style="display:inline;  position:absolute;bottom:5px; margin-right:20px; bottom:10px; left:20px; width:40%;overflow:hidden;">         {{10}}     </div>    <div id="rbBottombarGenericFblikeRoiFblikeButton" class ="rbClickable" style="display:inline;position:absolute;bottom:10px;width:100px;left:42%;margin-right:20px;height:25px;background-color:#FFFFFF;border-radius:5px;cursor:pointer;">                      <div class="fb-like" data-href="{{11}}" data-send="false" data-layout="button_count" data-width="47px" data-show-faces="false" data-font="arial"></div>          </div>      <div id="rbBottombarGenericFblikeRightClick" class="rbTextValue"  style="display:inline;  position:absolute; margin-right:20px; bottom:10px; margin-left:20px; left:49%; width:40%;overflow:hidden;">                  {{12}}     </div>     <div  style="display:inline; position:absolute;bottom:5px;right:30px;margin-left:20px;color:#FFFFFF;font-weight:bold;">                    <a id="rbBottombarGenericFblikeRoiHelp" class="rbClickable" style= "text-decoration:none;color:#FFFFFF;" href="http://www.rulebot.com" >            ?            </a>       </div>    <div id="rbBottombarGenericFblikeCloseClick" class="rbClickable" style="display:inline;position:absolute;color:#FFFFFF; bottom:5px;right:10px;font-weight:bold;cursor:pointer;" >     X    </div> </div>'



/****************************[[./templates/topbars/rbTemplBottombarGenericTwitterfollow.js]]*************************************/ 


trigger_fish.rbT.rbTemplBottombarGenericTwitterfollowHTML='<!-- --><!-- --><style>.rbTextValue  {     color:{{1}};     font-size: {{2}}px;     text-shadow: 1px 1px {{3}};     font-family: {{4}};     text-shadow: 0 -1px 0 #007AA6;     font-weight:{{5}};   }</style> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script><div id="rbBottombarGenericTwitterfollowBaseContainer" style="zIndex:{{6}};width:{{7}}%;height:{{8}}px;display:block; background-color:{{9}};border-style:none; position:fixed; bottom:0px; left:0px; box-shadow: 2px -2px 2px #888888;text-align:{{10}};">       <div id="rbBottombarGenericTwitterfollowLeftClick" class="rbTextValue" style="display:inline;  position:absolute;bottom:5px; margin-right:20px; bottom:10px; left:20px; width:40%;overflow:hidden;">         {{11}}     </div>    <div id="rbBottombarGenericTwitterfollowRoiButton" class ="rbClickable" style="display:inline;position:absolute;bottom:5px;left:42%;margin-right:20px;cursor:pointer;">                        <a  data-show-count="false" data-button = "blue" class="twitter-follow-button" href="https://twitter.com/{{12}}" data-size="large">Follow {{13}} </a>       </div>       <div id="rbBottombarGenericTwitterfollowRightClick" class="rbTextValue"  style="display:inline;  position:absolute; margin-right:20px; bottom:10px; margin-left:20px; left:52%; width:40%;overflow:hidden;">                  {{14}}     </div>     <div  style="display:inline; position:absolute;bottom:5px;right:30px;margin-left:20px;font-weight:bold;">                    <a id="rbBottombarGenericTwitterfollowRoiHelp" class="rbClickable" target="_blank" style= "text-decoration:none ;color:#FFFFFF " href=http://www.rulebot.com"  >            ?            </a>       </div>    <div id="rbBottombarGenericTwitterfollowCloseClick" class="rbClickable" style="display:inline;position:absolute;color:#FFFFFF; bottom:5px;right:10px;font-weight:bold;cursor:pointer;" >     X     </div> </div>'



/****************************[[./templates/topbars/rbTemplBottombarGenericNormal.js]]*************************************/ 


trigger_fish.rbT.rbTemplBottombarGenericNormalHTML='<!-- --><!-- --><style>  .rbTextValue   {     color:{{1}};     font-size: {{2}}px;     font-family: {{3}};     font-weight:{{4}};   }</style><div id="rbBottombarGenericNormalBaseContainer" style="zIndex:{{5}};width:{{6}}%;height:{{7}}px;display:block; background-color:{{8}};border-style:none; position:fixed; bottom:0px; left:0px; box-shadow: 2px -2px 2px #888888;text-align:{{9}};">   <div id="rbBottombarGenericNormalLeftClick" class="rbTextValue" style="display:inline;  position:absolute;bottom:5px; margin-right:20px; bottom:10px; left:20px; width:40%;overflow:hidden;">         {{10}}     </div>   <a id="rbBottombarGenericNormalRoiMiddlebutton" class ="rbClickable" style="display:inline;position:absolute;bottom:5px;width:80px;left:42%;margin-right:20px;height:25px; border-radius:5px;text-decoration:none; font-size:{{11}}px;     background-color:{{12}};text-shadow: 0px -1px 0px #29588D;       color :{{13}};text-align:center;border:1px solid #305580;padding-top:3px;cursor:pointer;" href="{{14}}"> {{15}} </a>      <div id="rbBottombarGenericNormalRightClick" class="rbTextValue"  style="display:inline;  position:absolute; margin-right:20px; bottom:10px; margin-left:20px; left:49%; width:40%;overflow:hidden;">                  {{16}}     </div>    <div  style="display:inline; position:absolute;right:30px; bottom:5px;margin-left:20px;font-weight:bold;">                    <a id="rbBottombarGenericNormalRoiHelp" class="rbClickable" target="_blank" style= "text-decoration:none;color:#333" href="http://www.rulebot.com" >            ?            </a>     </div>    <div id="rbBottombarGenericNormalCloseClick" class="rbClickable" style="display:inline;position:absolute;color:#333; bottom:5px;right:10px;font-weight:bold;cursor:pointer;" >     X    </div> </div>'



/****************************[[./templates/topbars/rbTemplBottombarGenericTwittershare.js]]*************************************/ 


trigger_fish.rbT.rbTemplBottombarGenericTwittershareHTML='<!-- --><!-- --><style>.rbTextValue  {     color:{{1}};     font-size: {{2}}px;     text-shadow: 1px 1px {{3}};     font-family: {{4}};     text-shadow: 0 -1px 0 #007AA6;     font-weight:{{5}};   }</style> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script><div id="rbBottombarGenericTwittershareBaseContainer" style="zIndex:{{6}};width:{{7}}%;height:{{8}}px;display:block; background-color:{{9}};border-style:none; position:fixed; bottom:0px; left:0px; box-shadow: 2px -2px 2px #888888;text-align:{{10}};">      <div id="rbBottombarGenericTwittershareLeftClick" class="rbTextValue" style="display:inline;  position:absolute;bottom:5px; margin-right:20px; bottom:10px; left:20px; width:40%;overflow:hidden;">         {{11}}     </div>       <div id="rbBottombarGenericTwittershareRoiButton" class ="rbClickable" style="display:inline;position:absolute;bottom:5px;left:42%;margin-right:20px;border-radius:5px;cursor:pointer;">                      <a href="https://twitter.com/share?text={{12}}" class="twitter-share-button" data-count="none" data-lang="en" data-size="large">Tweet</a>       </div>       <div id="rbBottombarGenericTwittershareRightClick" class="rbTextValue"  style="display:inline;  position:absolute; margin-right:20px; bottom:10px; margin-left:20px; left:47%; width:40%;overflow:hidden;">                  {{13}}     </div>     <div  style="display:inline; position:absolute;bottom:5px;right:30px;margin-left:20px;font-weight:bold;">                    <a id="rbBottombarGenericTwittershareRoiHelp" class="rbClickable" target="_blank" style= "text-decoration:none ;color:#FFFFFF; " href="http://www.rulebot.com"  >            ?            </a>       </div>    <div id="rbBottombarGenericTwittershareCloseClick" class="rbClickable" style="display:inline;position:absolute;color:#FFFFFF; bottom:5px;right:10px;font-weight:bold;cursor:pointer;" >     X     </div> </div>'



/****************************[[./templates/topbars/rbTemplTopbarGenericFblike.js]]*************************************/ 


trigger_fish.rbT.rbTemplTopbarGenericFblikeHTML='<!-- --><!-- --><style>.rbTextValue   {     color:{{1}};     font-size: {{2}}px;     font-family: {{3}};     text-shadow : #1C2C4C 0px -1px 0px;     font-style: normal;     font-weight:{{4}};   }</style> <div id="fb-root"></div><script>(function(d, s, id) {  var js, fjs = d.getElementsByTagName(s)[0];  if (d.getElementById(id)) return;  js = d.createElement(s); js.id = id;  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";  fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));</script><div id="rbTopbarGenericFblikeBaseContainer" style="zIndex:{{5}};width:{{6}}%;height:{{7}}px;display:block; background-color:{{8}};border-style:none; position:fixed; top:0px; left:0px; box-shadow: 2px 2px 2px #888888;text-align:{{9}};">    <div id="rbTopbarGenericFblikeLeftClick" class="rbTextValue" style="display:inline;  position:absolute;bottom:5px; margin-right:20px; bottom:10px; left:20px; width:40%;overflow:hidden;">         {{10}}     </div>             <div id="rbTopbarGenericFblikeRoiButton" class ="rbClickable" style="display:inline;position:absolute;bottom:10px;width:80px;left:42%;margin-right:20px;height:25px;background-color:#FFFFFF;border-radius:5px;cursor:pointer;">                      <div class="fb-like" data-href="{{11}}" data-send="false" data-layout="button_count" data-width="250px" data-show-faces="false" data-font="arial"></div>          </div>         <div id="rbBottombarGenericFblikeRightClick" class="rbTextValue"  style="display:inline;  position:absolute; margin-right:20px; bottom:10px; margin-left:20px; left:49%; width:40%;overflow:hidden;">                  {{12}}     </div>   <div  style="display:inline; position:absolute;top:5px;right:30px;margin-left:20px;color:#FFFFFF;font-weight:bold;">                    <a id="rbTopbarGenericFblikeRoiHelp" class="rbClickable" style= "text-decoration:none;color:#FFFFFF;" href="http://www.rulebot.com"  >            ?            </a>       </div>   <div id="rbTopbarGenericFblikeCloseClick" class="rbClickable" style="display:inline;position:absolute;color:#FFFFFF; top:5px;right:10px;font-weight:bold;cursor:pointer;" >     X   </div>     </div>'



/****************************[[./templates/topbars/rbTemplTopbarGenericTwitterfollow.js]]*************************************/ 


trigger_fish.rbT.rbTemplTopbarGenericTwitterfollowHTML='<!-- --><!-- --><style>.rbTextValue  {     color:{{1}};     font-size: {{2}}px;     text-shadow: 1px 1px {{3}};     font-family: {{4}};     text-shadow: 0 -1px 0 #007AA6;     font-weight:{{5}};   }</style> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script><div id="rbTopbarGenericTwitterfollowBaseContainer" style="zIndex:{{6}};width:{{7}}%;height:{{8}}px;display:block; background-color:{{9}};border-style:none; position:fixed; top:0px; left:0px; box-shadow: 2px 2px 2px #888888;text-align:{{10}};">          <div id="rbTopbarGenericTwitterfollowLeftClick" class="rbTextValue" style="display:inline;  position:absolute;bottom:5px; margin-right:20px; bottom:10px; left:20px; width:40%;overflow:hidden;">         {{11}}     </div>           <div id="rbTopbarGenericTwitterfollowRoiButton" class ="rbClickable" style="display:inline;position:absolute;bottom:5px;left:42%;margin-right:20px;cursor:pointer;">                        <a  data-show-count="false" data-button = "blue" class="twitter-follow-button" href="https://twitter.com/{{12}}" data-size="large">Follow {{13}} </a>       </div>           <div id="rbTopbarGenericTwitterfollowRightClick" class="rbTextValue"  style="display:inline;  position:absolute; margin-right:20px; bottom:10px; margin-left:20px; left:52%; width:40%;overflow:hidden;">                  {{14}}     </div>   <div style="display:inline; position:absolute;top:5px;right:30px;margin-left:20px;font-weight:bold;">                    <a id="rbTopbarGenericTwitterfollowRoiHelp" class="rbClickable" target="_blank" style= "text-decoration:none ;color:#FFFFFF; " href="http://www.rulebot.com"  >            ?            </a>       </div>  <div id="rbTopbarGenericTwitterfollowCloseClick" class="rbClickable" style="display:inline;position:absolute;color:#FFFFFF; top:5px;right:10px;font-weight:bold;cursor:pointer;" >     X  </div> </div>'



/****************************[[./templates/topbars/rbTemplTopbarGenericNormal.js]]*************************************/ 


trigger_fish.rbT.rbTemplTopbarGenericNormalHTML='<!-- --><!-- --><style>  .rbTextValue   {     color:{{1}};     font-size: {{2}}px;     font-family: {{3}};     font-weight:{{4}};   }</style><div id="rbTopbarGenericNormalBaseContainer" style="zIndex:{{5}};width:{{6}}%;height:{{7}}px;display:block; background-color:{{8}};border-style:none; position:fixed; top:0px; left:0px; box-shadow: 2px 2px 2px #888888;text-align:{{9}};">  <div id="rbTopbarGenericNormalLeftClick" class="rbTextValue" style="display:inline;  position:absolute;bottom:5px; margin-right:20px; bottom:10px; left:20px; width:40%;overflow:hidden;">         {{10}}  </div>    <a id="rbTopbarGenericNormalRoiMiddlebutton" class ="rbClickable" style="display:inline;position:absolute;bottom:5px;width:80px;left:42%;margin-right:20px;height:25px; border-radius:5px;text-decoration:none; font-size:{{11}}px; background-color:{{12}};text-shadow: 0px -1px 0px #29588D;   color :{{13}};text-align:center;border:1px solid #305580; padding-top:3px;cursor:pointer;" href="{{14}}"> {{15}} </a>    <div id="rbTopbarGenericNormalRightClick" class="rbTextValue"  style="display:inline;  position:absolute; margin-right:20px; bottom:10px; margin-left:20px; left:49%; width:40%;overflow:hidden;">                  {{16}}    </div>           <div  style="display:inline; position:absolute;right:30px; top:5px;margin-left:20px;font-weight:bold;">                    <a id="rbTopbarGenericNormalRoiHelp" class="rbClickable" target="_blank" style= "text-decoration:none;color:#333" href="http://www.rulebot.com"  >            ?            </a>     </div><div id="rbTopbarGenericNormalCloseClick" class="rbClickable" style="display:inline;position:absolute;color:#333; top:5px;right:10px;font-weight:bold;cursor:pointer;" >     X</div> </div>'



/****************************[[./templates/topbars/rbTemplTopbarGenericTwittershare.js]]*************************************/ 


trigger_fish.rbT.rbTemplTopbarGenericTwittershareHTML='<!-- --><!-- --><style>.rbTextValue  {     color:{{1}};     font-size: {{2}}px;     text-shadow: 1px 1px {{3}};     font-family: {{4}};     text-shadow: 0 -1px 0 #007AA6;     font-weight:{{5}};   }</style> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script><div id="rbTopbarGenericTwittershareBaseContainer" style="zIndex:{{6}};width:{{7}}%;height:{{8}}px;display:block; background-color:{{9}};border-style:none; position:fixed; top:0px; left:0px; box-shadow: 2px 2px 2px #888888;text-align:{{10}};">      <div id="rbTopbarGenericTwittershareLeftClick" class="rbTextValue" style="display:inline;  position:absolute;bottom:5px; margin-right:20px; top:15px; left:20px; width:40%;overflow:hidden;">         {{11}}     </div>       <div id="rbTopbarGenericTwittershareRoiButton" class ="rbClickable" style="display:inline;position:absolute;top:10px;left:42%;margin-right:20px;border-radius:5px;cursor:pointer;">                      <a href="https://twitter.com/share?text={{12}}" class="twitter-share-button" data-count="none" data-lang="en" data-size="large">Tweet</a>       </div>       <div id="rbTopbarGenericTwittershareRightClick" class="rbTextValue"  style="display:inline;  position:absolute; margin-right:20px; top:15px; margin-left:20px; left:47%; width:40%;overflow:hidden;">                  {{13}}     </div>     <div  style="display:inline; position:absolute;top:5px;right:30px;margin-left:20px;font-weight:bold;">                    <a id="rbTopbarGenericTwittershareRoiHelp" class="rbClickable" target="_blank" style= "text-decoration:none ;color:#FFFFFF; " href="http://www.rulebot.com"  >            ?            </a>       </div>    <div id="rbTopbarGenericTwittershareCloseClick" class="rbClickable" style="display:inline;position:absolute;color:#FFFFFF; top:5px;right:10px;font-weight:bold;cursor:pointer;" >     X     </div> </div>'



/****************************[[./templates/topbars/rbTemplSupportOlarkNormal.js]]*************************************/ 


trigger_fish.rbT.rbTemplSupportOlarkNormalHTML='<!-- --><!-- --><div id="rbChatGenericNormalBaseContainer"><script data-cfasync="false" type=\'text/javascript\'>window.olark||(function(c){var f=window,d=document,l=f.location.protocol=="https:"?"https:":"http:",z=c.name,r="load";var nt=function(){f[z]=function(){(a.s=a.s||[]).push(arguments)};var a=f[z]._={},q=c.methods.length;while(q--){(function(n){f[z][n]=function(){f[z]("call",n,arguments)}})(c.methods[q])}a.l=c.loader;a.i=nt;a.p={0:+new Date};a.P=function(u){a.p[u]=new Date-a.p[0]};function s(){a.P(r);f[z](r)}f.addEventListener?f.addEventListener(r,s,false):f.attachEvent("on"+r,s);var ld=function(){function p(hd){hd="head";return["<",hd,"></",hd,"><",i,\' onl\' + \'oad="var d=\',g,";d.getElementsByTagName(\'head\')[0].",j,"(d.",h,"(\'script\')).",k,"=\'",l,"//",a.l,"\'",\'"\',"></",i,">"].join("")}var i="body",m=d[i];if(!m){return setTimeout(ld,100)}a.P(1);var j="appendChild",h="createElement",k="src",n=d[h]("div"),v=n[j](d[h](z)),b=d[h]("iframe"),g="document",e="domain",o;n.style.display="none";m.insertBefore(n,m.firstChild).id=z;b.frameBorder="0";b.id=z+"-loader";if(/MSIE[ ]+6/.test(navigator.userAgent)){b.src="javascript:false"}b.allowTransparency="true";v[j](b);try{b.contentWindow[g].open()}catch(w){c[e]=d[e];o="javascript:var d="+g+".open();d.domain=\'"+d.domain+"\';";b[k]=o+"void(0);"}try{var t=b.contentWindow[g];t.write(p());t.close()}catch(x){b[k]=o+\'d.write("\'+p().replace(/"/g,String.fromCharCode(92)+\'"\')+\'");d.close();\'}a.P(2)};ld()};nt()})({loader: "static.olark.com/jsclient/loader0.js",name:"olark",methods:["configure","extend","declare","identify"]});olark.identify({{1}});olark.configure(\'box.width\', 200);olark.configure(\'box.height\', 100);</script></div>'



/****************************[[./templates/topbars/rbTemplModalGenericNormal.js]]*************************************/ 


trigger_fish.rbT.rbTemplModalGenericNormalHTML='<!-- --><!-- --><style>#rbModalGenericNormalTranblockContainer {          visibility: visible;         position: fixed;          left: 0px;          top: 0px;           width:100%;           height:100%;       background-color:black;          z-index:{{1}};      opacity:0.6;      filter:alpha(opacity=60);}#rbModalGenericNormalBaseContainer{          visibility: visible;         position: fixed;          left: 0px;          top: 0px;           width:100%;           height:100%;      z-index:{{2}}; }#rbModalGenericNormalSubsubContainer        {                 width:500px; 	           height: 300px;             background-color:{{3}};               border:4px solid #a3a3a3;                position: fixed;             border-radius:5px;             top : 30%;             left : 30%;        }  </style><div id="rbModalGenericNormalTranblockContainer"></div> <div id="rbModalGenericNormalBaseContainer">		<div id="rbModalGenericNormalSubContainer">		<div id="rbModalGenericNormalSubsubContainer"  style="postion:relative;">                                 <div style="top:0px;width:100%;height:18%;left:0px;background-color:{{4}};">           <div style="top:0%;left:0 %;position:absolute;color:{{5}};width:70%; height:14%;font-size:{{6}}px;font-family:{{7}}; overflow:hidden;border-top-left-radius:5px;border-top-right-radius:5px;padding:5px;text-shadow:1px 1px {{8}};">               {{9}}           </div>          <div id="rbModalGenericNormalCloseClick" class="rbClickable"  style="top:1%;right:1%;position:absolute;color:black;font-weight:bold; padding:2px;cursor:pointer;">            X          </div>            </div>           	<div style="top:22%;left:0%;position:absolute;color:{{10}};width:70%;height:65%;overflow:hidden;font-size:{{11}}px;font-family:{{12}};text-align:left;border-bottom-left-radius:5px;border-bottom-right-radius:5px;padding:5px;">           	    {{13}}                         	 </div>             <div style="top:30%;right:5%;width:15%;height:20%;position:absolute;overflow:hidden">              <img src="{{14}}" alt="image"\>             </div> 			               <button   style="bottom:2%;right:2%;position:absolute;color:white;width:75px;height:25px;text-align:center;background-color:{{15}};border-radius:5px;padding-top:2px;border:1px solid #305580 ;font-weight: bold;cursor:pointer;">               <a  id="rbModalGenericNormalRoiClickbutton" class="rbClickable" style="text-decoration:none;color:white;" href= "{{16}}" target="_self" class="rbClickable" >                {{17}}               </a>             </button>	      </div>	</div></div>'



/****************************[[./templates/topbars/rbTemplFeedbackUservoiceNormal.js]]*************************************/ 


trigger_fish.rbT.rbTemplFeedbackUservoiceNormalHTML='<!-- --><!-- --><div id="rbUservoiceGenericNormalBaseContainer">	<script>  var uvOptions = {};  (function() {    var uv = document.createElement(\'script\'); uv.type = \'text/javascript\'; uv.async = true;    uv.src = (\'https:\' == document.location.protocol ? \'https://\' : \'http://\') + \'widget.uservoice.com/QteXP0WAzCiaFH1O2obGg.js\';    var s = document.getElementsByTagName(\'script\')[0]; s.parentNode.insertBefore(uv, s);   })();</script></div>'



/****************************[[helpers.js]]*************************************/ 


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





/****************************[[externals.js]]*************************************/ 



trigger_fish.rbT.facebook = {
	setContext: function(context){
		//
        //  trigger_fish.rbT.facebook.likePage
		//  trigger_fish.rbT.facebook.appID

	},
	getHTML: {
		likeBtn: function(){

		},
		shareBtn: function(){

		},
		
	}


}

trigger_fish.rbT.twitter = {


};




/****************************[[event_handler.js]]*************************************/ 


"use strict";

trigger_fish.rbT.eventHandler = {
	
 //**************************************************************************************** 
	init: function(){

		var eles = document.getElementsByClassName('rbClickable');
        
        for(var i = 0; i<eles.length; i++){

			eles[i].onclick= trigger_fish.rbT.eventHandler.clickListner;

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
        trigger_fish.rbT.eventHandler.closeTempl(idMatch);
     }
  
    else if ( idMatch[3] == 'Roi' )
    {
         trigger_fish.rbT.eventHandler.roiFromTemplClick(idMatch,evt);

    }

  }
  else{
          trigger_fish.rbT.sendErrorToRBServer(" Close or ROI Click is Not valid ");

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


       trigger_fish.rbT.templTimers['templ.displaytimer'] = setInterval(function(){trigger_fish.rbT.eventHandler.timerDeleteTempl
       (tempalteName)},timerValue); 
       
  },

//******************************************************************************************************
  timerDeleteTempl:function(tempalteName)
  {

       var tempMatch = tempalteName.match(/[a-z]*/g);

 
       
      if(tempMatch[0] != 'modal' )
       { 
           id = "rb" + trigger_fish.rbT.makeFirstLetterCapital(tempMatch[0])+trigger_fish.rbT.makeFirstLetterCapital(tempMatch[2])+trigger_fish.rbT.makeFirstLetterCapital(tempMatch[4])+"BaseContainer";
       }     


     else if(tempMatch[0] == 'modal')
     {

         var id = "rb" + trigger_fish.rbT.makeFirstLetterCapital(tempMatch[0])+trigger_fish.rbT.makeFirstLetterCapital(tempMatch[2])+trigger_fish.rbT.makeFirstLetterCapital(tempMatch[4])+"BaseContainer";
         var transId = "rb" + trigger_fish.rbT.makeFirstLetterCapital(tempMatch[0])+trigger_fish.rbT.makeFirstLetterCapital(tempMatch[2])+trigger_fish.rbT.makeFirstLetterCapital(tempMatch[4])+"TranblockContainer";
         var transBase = document.getElementById(transId);
         if(transBase != 'undefined')
         transBase.parentNode.removeChild(transBase);
     } 
     
       
        
        trigger_fish.rbT.setTemplatesDisplayLockFlags(tempMatch[0],false);
        
        var Base = document.getElementById(id);

         if( typeof Base === 'undefined')
         {
         	  trigger_fish.rbT.sendErrorToRBServer("Not able to find template Base for timeout Delete ");

         }

         else
         {
            Base.parentNode.removeChild(Base);
            clearInterval(trigger_fish.rbT.templTimers['templ.displaytimer']);

         }	


  },

  //***********************************************************************************************************

   closeTempl:function(idMatch){

      if(trigger_fish.rbT.templTimers['templ.displaytimer'])
      {
          clearInterval(trigger_fish.rbT.templTimers['templ.displaytimer']);

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

         trigger_fish.rbT.setTemplatesDisplayLockFlags(trigger_fish.rbT.makeFirstLetterSmall(idMatch[0]),false);
         
      }else{
            trigger_fish.rbT.sendErrorToRBServer("Not able to find template Base for Normal X Delete ");

      }


  },

//******************************************************************************************************
  
  roiFromTemplClick:function(idMatch,evt){

    var link = evt.target.href;
    
    window.open(link);
    
    params={};

   params.button = "";
    
    for(var i=0 ; i<idMatch.length ; i++)
    {  
           params.button = params.button + idMatch[i]

    }

    params.button = params.button + " " +"Clicked"
    

/*
         //trigger_fish.rbTServerChannel.conversion(params,trigger_fish.rbT.eventHandler.roiCallBackfromServerResponse);
        //TODO

*/

  },  

//*********************************************************************************************************

  roiCallBackfromServerResponse:function(params){

  
  //TODO handle the server response with Data

  },  
 
 
};


/****************************[[main.js]]*************************************/ 


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

			       else if( 'rb.t.nr.durationOfDisplay'== key)
			       {
                      trigger_fish.rbT.templTimers['templ.templduration']= actionParams[key] ;
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
			  else if( 'rb.t.nr.durationOfDisplay'== key)
              {
                   trigger_fish.rbT.templTimers['templ.templduration']= actionParams[key] ;
			  }

			 } 
             
		    } 
		  }        

		



          html = trigger_fish.rbT.getTemplateApplyVars(html, actionParams);
          

         if (trigger_fish.rbT.isTemplateGoodToApply(html)){
            trigger_fish.rbT.applyHtmltoPage(html);
            trigger_fish.rbT.enableClickHandling();
            trigger_fish.rbT.enableTimeOutHadnling(templateName,trigger_fish.rbT.templTimers['templ.templduration']*1000);
		    trigger_fish.rbT.setTemplatesDisplayLockFlags(pos,true);

             params.display = action + " " +"Display " + "Success";
    
// Report Server Display of Templ Successfull
/*
         //trigger_fish.rbTServerChannel.conversion(params,trigger_fish.rbT.eventHandler.roiCallBackfromServerResponse);

*/

         }
      }	

};	 


/****************************[[interfaces.js]]*************************************/ 


"use strict";
trigger_fish.rbT.isInitialized = function(){
	return trigger_fish.rbT.inited;
};
//------------------------------------------
trigger_fish.rbT.getTemplateHTMLByName = function(name){

	if (!trigger_fish.rbT.isInitialized()){
		return "";
	}
	
	if ( typeof name === 'undefined' ){
		trigger_fish.rbT.sendErrorToRBServer("improper access of interface getTemplateHTMLByName");
		return "";
	}
	return trigger_fish.rbT.getTemplateHTMLByNameInternal(name);
};
//------------------------------------------
trigger_fish.rbT.getTemplateApplyVars = function(html,vars){
	if (!trigger_fish.rbT.isInitialized()){
		return "";
	}

	if ( typeof html === 'undefined' || typeof vars === 'undefined' ){
		trigger_fish.rbT.sendErrorToRBServer("improper access of interface getTemplateApplyVars");
		return "";
	}

	return trigger_fish.rbT.getTemplateApplyVarsInternal(html,vars);
};
//------------------------------------------
trigger_fish.rbT.isTemplateGoodToApply = function(html){
	if (!trigger_fish.rbT.isInitialized()){
		return false;
	}
	if ( typeof html === 'undefined' ){
		trigger_fish.rbT.sendErrorToRBServer("improper access of interface isTemplateGoodToApply");
		return "";
	}
	return trigger_fish.rbT.isTemplateGoodToApplyInternal(html);
};

//------------------------------------------
trigger_fish.rbT.applyHtmltoPage = function(html){
	if (!trigger_fish.rbT.isInitialized()){
		return "";
	}
	if ( typeof html === 'undefined' ){
		trigger_fish.rbT.sendErrorToRBServer("improper access of interface applyHtmltoPage");
		return "";
	}
	return trigger_fish.rbT.applyHtmltoPageInternal(html);
};


//-----------------------------------------
trigger_fish.rbT.enableClickHandling = function(){
	trigger_fish.rbT.enableClickHandlingInternal ();
}


//----------------------------------------------------------------

trigger_fish.rbT.enableTimeOutHadnling =function(templateName,timerValue){

   if (!trigger_fish.rbT.isInitialized()){
		return "";
	}
	if ( typeof templateName === 'undefined' ){
		trigger_fish.rbT.sendErrorToRBServer("improper access of interface enableTimeOutHadnling");
		return "";
	}

	trigger_fish.rbT.enableTimeOutHadnlingInternal(templateName,timerValue);
}

//---------------------------------------------------------------

trigger_fish.rbT.invokeActionScript = function(action,actionParams)
{

	if ( typeof actionParams === 'undefined' ){
		trigger_fish.rbT.sendErrorToRBServer("Invalid params in rule Json");
		return "";
	}

	else{
          trigger_fish.rbT.invokeActionScriptInternal(action,actionParams); 
	}

	
}

