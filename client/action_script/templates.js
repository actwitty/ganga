trigger_fish.rbT.templateLib = {
		'bottombar':{ 
				'generic.fblike':'rbTemplBottombarGenericFblikeHTML',
				'generic.twitterfollow':'rbTemplBottombarGenericTwitterfollowHTML',
				'generic.twittershare':'rbTemplBottombarGenericTwittershareHTML',
				'generic.normal':'rbTemplBottombarGenericNormalHTML'
 
 	 	 	 },
		'topbar':{ 
				'generic.normal':'rbTemplTopbarGenericNormalHTML',
				'generic.twitterfollow':'rbTemplTopbarGenericTwitterfollowHTML',
				'generic.fblike':'rbTemplTopbarGenericFblikeHTML',
				'generic.twittershare':'rbTemplTopbarGenericTwittershareHTML'
 
 	 	 	 },
		'support':{ 
				'olark.normal':'rbTemplSupportOlarkNormalHTML'
 
 	 	 	 },
		'feedback':{ 
				'uservoice.normal':'rbTemplFeedbackUservoiceNormalHTML'
 
 	 	 	 }
 
 }; 



 trigger_fish.rbT.templateName = {
	 			'bottombar.generic.fblike':'A bottom bar to influence visitors from Facebook',
	 			'topbar.generic.normal':'A promo top bar with link and some text',
	 			'topbar.generic.twitterfollow':'Top bar to Gather followers from twitter',
	 			'bottombar.generic.twitterfollow':'Bottom bar to Gather followers from twitter',
	 			'topbar.generic.fblike':'A top bar to influence visitors from Facebook',
	 			'bottombar.generic.twittershare':'Influence a Twitter user to share about your business',
	 			'support.olark.normal':'Chat Window',
	 			'feedback.uservoice.normal':'User Voice Feedback',
	 			'bottombar.generic.normal':'A promo bottom bar with link and some text',
	 			'topbar.generic.twittershare':'Influence a Twitter user to share about your business'
 	 	 	 	 }; 



 trigger_fish.rbT.templateArgs = {
	 	  'bottombar.generic.fblike':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_zindex',
	 	 	 	 	 				value :'10000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_font_size',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.ft.h.bar_font',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.cr.h.bar_border_color',
	 	 	 	 	 				value :'#304A80'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.cr.h.bar_background_color',
	 	 	 	 	 				value :'#6087C6'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_width',
	 	 	 	 	 				value :'900'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_height',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.ul.e.facebook_page',
	 	 	 	 	 				value :'http://www.google.com'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' :{
	 	 	 	 	 				key :'rb.t.vsg.e.text_left',
	 	 	 	 	 				value :'Woo Facebook users coming to your page by writing something to make them like you.'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'topbar.generic.normal':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_zindex',
	 	 	 	 	 				value :'10000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.cr.h.bar_background_color',
	 	 	 	 	 				value :'#E24E35'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_width',
	 	 	 	 	 				value :'900'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_height',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.cr.h.text_color ',
	 	 	 	 	 				value :'#ffffff'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.h.text_fontsize',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.ft.h.text_fontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.fw.h.text_fontweight',
	 	 	 	 	 				value :'normal'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.cr.h.button_background_color',
	 	 	 	 	 				value :'whiteSmoke'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.cr.h.button_color',
	 	 	 	 	 				value :'#333'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.nr.h.button_fontSize',
	 	 	 	 	 				value :'16'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' : {
	 	 	 	 	 				key :'rb.t.cr.h.button_background_on_focus',
	 	 	 	 	 				value :'#d9d9d9'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '13' : {
	 	 	 	 	 				key :'rb.t.cr.h.button_color_on_focus',
	 	 	 	 	 				value :'#888'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '14' : {
	 	 	 	 	 				key :'rb.t.vsg.e.text_left',
	 	 	 	 	 				value :'Please add the promotional left text here'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '15' : {
	 	 	 	 	 				key :'rb.t.ul.e.button_link',
	 	 	 	 	 				value :'http://www.google.com'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '16' : {
	 	 	 	 	 				key :'rb.t.sg.e.button_label',
	 	 	 	 	 				value :'Promo Link'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '17' :{
	 	 	 	 	 				key :'rb.t.vsg.e.text_right',
	 	 	 	 	 				value :'Please add the promotional right text here'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'topbar.generic.twitterfollow':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_zindex',
	 	 	 	 	 				value :'10000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.cr.h.bar_background_color',
	 	 	 	 	 				value :'#377CA8'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_width',
	 	 	 	 	 				value :'900'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_height',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.cr.h.text_color ',
	 	 	 	 	 				value :'#ffffff'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.h.text_fontsize',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.ft.h.text_fontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.fw.h.text_fontweight',
	 	 	 	 	 				value :'normal'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.sg.e.twitter_account_link',
	 	 	 	 	 				value :'@act_witty'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.sg.e.twitter_label',
	 	 	 	 	 				value :'@act_witty'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.vsg.e.text_left',
	 	 	 	 	 				value :'Increase your market reach by connecting to users'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' :{
	 	 	 	 	 				key :'rb.t.vsg.e.text_right',
	 	 	 	 	 				value :'Gathering reach on twitter to increase business.'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'bottombar.generic.twitterfollow':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_zindex',
	 	 	 	 	 				value :'10000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.cr.h.bar_background_color',
	 	 	 	 	 				value :'#377CA8'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_width',
	 	 	 	 	 				value :'900'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_height',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.cr.h.text_color ',
	 	 	 	 	 				value :'#ffffff'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.h.text_fontsize',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.ft.h.text_fontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.fw.h.text_fontweight',
	 	 	 	 	 				value :'normal'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.sg.e.twitter_account_link',
	 	 	 	 	 				value :'@act_witty'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.sg.e.twitter_label',
	 	 	 	 	 				value :'@act_witty'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.vsg.e.text_left',
	 	 	 	 	 				value :'Increase your market reach by connecting to users'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' :{
	 	 	 	 	 				key :'rb.t.vsg.e.text_right',
	 	 	 	 	 				value :'Gathering reach on twitter to increase business.'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'topbar.generic.fblike':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_zindex',
	 	 	 	 	 				value :'10000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar.font_size',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.ft.h.bar_font',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.cr.h.bar_border_color',
	 	 	 	 	 				value :'#304A80'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.cr.h.bar_background_color',
	 	 	 	 	 				value :'#6087C6'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_show_width',
	 	 	 	 	 				value :'900'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_height',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.ul.e.facebook_page',
	 	 	 	 	 				value :'http://www.google.com'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' :{
	 	 	 	 	 				key :'rb.t.vsg.e.text_left',
	 	 	 	 	 				value :'Woo Facebook users coming to your page by writing something to make them like you.'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'bottombar.generic.twittershare':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_zindex',
	 	 	 	 	 				value :'10000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.cr.h.bar_background_color',
	 	 	 	 	 				value :'#377CA8'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_width',
	 	 	 	 	 				value :'900'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_height',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.cr.h.text_color ',
	 	 	 	 	 				value :'#ffffff'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.h.text_fontsize',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.ft.h.text_fontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.fw.h.text_fontweight',
	 	 	 	 	 				value :'normal'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.sg.e.twitter_share_text',
	 	 	 	 	 				value :'make #twitter user to share about your blog at a sample url like http://www.rulebot.com'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.vsg.e.text_left',
	 	 	 	 	 				value :'Ask here to twitter user to share your blog'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' :{
	 	 	 	 	 				key :'rb.t.vsg.e.text_right',
	 	 	 	 	 				value :'Influence your visitors.'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'support.olark.normal':{

 	 	 	 	 	 	 '1' :{
	 	 	 	 	 				key :'rb.t.sg.e.olarkIdentity',
	 	 	 	 	 				value :'\'6679-845-10-6199\''
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'feedback.uservoice.normal':{

	 	 	 	 	 },
	 	  'bottombar.generic.normal':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_zindex',
	 	 	 	 	 				value :'10000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.cr.h.bar_background_color',
	 	 	 	 	 				value :'#181818'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_width',
	 	 	 	 	 				value :'900'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_height',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.cr.h.text_color ',
	 	 	 	 	 				value :'#ffffff'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.h.text_fontsize',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.ft.h.text_fontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.fw.h.text_fontweight',
	 	 	 	 	 				value :'normal'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.cr.h.button_background_color',
	 	 	 	 	 				value :'#0e0c0b'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.cr.h.button_color',
	 	 	 	 	 				value :'#BFBFBF'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.nr.h.button_fontSize',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' : {
	 	 	 	 	 				key :'rb.t.cr.h.button_background_on_focus',
	 	 	 	 	 				value :'#333'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '13' : {
	 	 	 	 	 				key :'rb.t.cr.h.button_color_on_focus',
	 	 	 	 	 				value :'#FFFFFF'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '14' : {
	 	 	 	 	 				key :'rb.t.vsg.e.text_left',
	 	 	 	 	 				value :'Please add the promotional left text here'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '15' : {
	 	 	 	 	 				key :'rb.t.ul.e.button_link',
	 	 	 	 	 				value :'http://www.google.com'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '16' : {
	 	 	 	 	 				key :'rb.t.sg.e.button_label',
	 	 	 	 	 				value :'Promo Link'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '17' :{
	 	 	 	 	 				key :'rb.t.vsg.e.text_right',
	 	 	 	 	 				value :'Please add the promotional right text here'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'topbar.generic.twittershare':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_zindex',
	 	 	 	 	 				value :'10000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.cr.h.bar_background_color',
	 	 	 	 	 				value :'#377CA8'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_width',
	 	 	 	 	 				value :'900'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.nr.h.bar_height',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.cr.h.text_color ',
	 	 	 	 	 				value :'#ffffff'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.h.text_fontsize',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.ft.h.text_fontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.fw.h.text_fontweight',
	 	 	 	 	 				value :'normal'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.sg.e.twitter_share_text',
	 	 	 	 	 				value :'make #twitter user to share about your blog at a sample url like http://www.rulebot.com'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.vsg.e.text_left',
	 	 	 	 	 				value :'Ask here to twitter user to share your blog'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' :{
	 	 	 	 	 				key :'rb.t.vsg.e.text_right',
	 	 	 	 	 				value :'Influence your visitors.'
	 	 	 	 	 	  }
	 	 	 	 	 }
 	 	 	 	 }; 
 
