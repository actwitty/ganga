


/****************************[[include.js]]*************************************/ 


var rbT = { inited: false};


/****************************[[templates.js]]*************************************/ 


rbT.templateLib = {
	 	  'bottombar.generic.fblike':'rbTemplBottombarGenericFblikeHTML',
	 	  'topbar.generic.normal':'rbTemplTopbarGenericNormalHTML',
	 	  'chat.generic.normal':'rbTemplChatGenericNormalHTML',
	 	  'topbar.generic.twitterfollow':'rbTemplTopbarGenericTwitterfollowHTML',
	 	  'bottombar.generic.twitterfollow':'rbTemplBottombarGenericTwitterfollowHTML',
	 	  'topbar.generic.fblike':'rbTemplTopbarGenericFblikeHTML',
	 	  'bottombar.generic.twittershare':'rbTemplBottombarGenericTwittershareHTML',
	 	  'modal.generic.normal':'rbTemplModalGenericNormalHTML',
	 	  'bottombar.generic.normal':'rbTemplBottombarGenericNormalHTML',
	 	  'topbar.generic.twittershare':'rbTemplTopbarGenericTwittershareHTML'
 
 	 	 	 }; 



 rbT.templateName = {
	 			'bottombar.generic.fblike':'Facebook Like Bottombar',
	 			'topbar.generic.normal':'Normal Topbar',
	 			'chat.generic.normal':'Chat Window',
	 			'topbar.generic.twitterfollow':'Twitter Follow Topbar',
	 			'bottombar.generic.twitterfollow':'Twitter Follow Bottombar',
	 			'topbar.generic.fblike':'Facebook Like Topbar',
	 			'bottombar.generic.twittershare':'Twitter Share Bottombar',
	 			'modal.generic.normal':'Modal Window',
	 			'bottombar.generic.normal':'Normal Bottombar',
	 			'topbar.generic.twittershare':'Twitter Share Topbar'
 	 	 	 	 }; 



 rbT.templateArgs = {
	 	  'bottombar.generic.fblike':{
	 	 	 	 	 	 'rb.t.cr.textColor ':'#F2F0F0',
	 	 	 	 	 	 'rb.t.nr.textFontsize':'15',
	 	 	 	 	 	 'rb.t.ft.textFontfamily':'Arial',
	 	 	 	 	 	 'rb.t.ft.textFontWeight':'bold',
	 	 	 	 	 	 'rb.f.nr.baseZindex':'1000',
	 	 	 	 	 	 'rb.t.nr.baseWidth':'100',
	 	 	 	 	 	 'rb.t.nr.baseHeight':'40',
	 	 	 	 	 	 'rb.t.cr.baseBgColor':'#3C5891',
	 	 	 	 	 	 'rb.t.an.baseTextalign':'center',
	 	 	 	 	 	 'rb.t.sg.textLeft':'Hello Hello',
	 	 	 	 	 	 'rb.t.ul.facebookPage':'http://www.google.com',
	 	 	 	 	 	 'rb.t.sg.textRight':'Hello Hello',
	 	 	 	 	 	 'rb.t.nr.durationOfDisplay':'10'
	 	 	 	 	 },
	 	  'topbar.generic.normal':{
	 	 	 	 	 	 'rb.t.cr.textColor ':'#333',
	 	 	 	 	 	 'rb.t.nr.textFontsize':'15',
	 	 	 	 	 	 'rb.t.ft.textFontfamily':'Arial',
	 	 	 	 	 	 'rb.t.sg.textFontWeight':'bold',
	 	 	 	 	 	 'rb.f.nr.baseZindex':'100',
	 	 	 	 	 	 'rb.t.nr.baseWidth':'100',
	 	 	 	 	 	 'rb.t.nr.baseHeight':'40',
	 	 	 	 	 	 'rb.t.cr.baseBgColor':'#DCDCDC',
	 	 	 	 	 	 'rb.t.an.baseTextalign':'center',
	 	 	 	 	 	 'rb.t.sg.textLeft':'Hello Hello Hello Hello',
	 	 	 	 	 	 'rb.t.nr.btnFontSize':'14',
	 	 	 	 	 	 'rb.t.cr.btnBgColor':'#548AC7',
	 	 	 	 	 	 'rb.t.cr.btnColor':'white',
	 	 	 	 	 	 'rb.t.ul.btnLink':'http://www.google.com',
	 	 	 	 	 	 'rb.t.sg.btnLable':'Click',
	 	 	 	 	 	 'rb.t.sg.textRight':'Hello Hello',
	 	 	 	 	 	 'rb.t.nr.durationOfDisplay':'100'
	 	 	 	 	 },
	 	  'chat.generic.normal':{
	 	 	 	 	 	 'rb.t.sg.olarkIdentity':'\'6679-845-10-6199\'',
	 	 	 	 	 	 'rb.t.nr.durationOfDisplay':'10'
	 	 	 	 	 },
	 	  'topbar.generic.twitterfollow':{
	 	 	 	 	 	 'rb.t.cr.textColor ':'white',
	 	 	 	 	 	 'rb.t.nr.textFontsize':'17',
	 	 	 	 	 	 'rb.t.cr.textShadow':'black',
	 	 	 	 	 	 'rb.t.ft.textFontfamily':'Arial',
	 	 	 	 	 	 'rb.t.sg.textFontWeight':'bold',
	 	 	 	 	 	 'rb.f.nr.baseZindex':'1000',
	 	 	 	 	 	 'rb.t.nr.baeWidth':'100',
	 	 	 	 	 	 'rb.t.nr.baseHeight':'50',
	 	 	 	 	 	 'rb.t.cr.baeBgColor':'#0B8AB8',
	 	 	 	 	 	 'rb.t.an.baseTextalign':'center',
	 	 	 	 	 	 'rb.t.sg.textLeft':'Hello Hello',
	 	 	 	 	 	 'rb.t.sg.twitterAccountLink':'@actwitty',
	 	 	 	 	 	 'rb.t.sg.twitterAccountLable':'@actwitty',
	 	 	 	 	 	 'rb.t.sg.textRight':'Hello Hello',
	 	 	 	 	 	 'rb.t.nr.durationOfDisplay':'100'
	 	 	 	 	 },
	 	  'bottombar.generic.twitterfollow':{
	 	 	 	 	 	 'rb.t.cr.textColor ':'white',
	 	 	 	 	 	 'rb.t.nr.textFontsize':'17',
	 	 	 	 	 	 'rb.t.cr.textShadow':'black',
	 	 	 	 	 	 'rb.t.ft.textFontfamily':'Arial',
	 	 	 	 	 	 'rb.t.sg.textFontWeight':'bold',
	 	 	 	 	 	 'rb.f.nr.baseZindex':'1000',
	 	 	 	 	 	 'rb.t.nr.baeWidth':'100',
	 	 	 	 	 	 'rb.t.nr.baseHeight':'50',
	 	 	 	 	 	 'rb.t.cr.baeBgColor':'#0B8AB8',
	 	 	 	 	 	 'rb.t.an.baseTextalign':'center',
	 	 	 	 	 	 'rb.t.sg.textLeft':'Hello Hello',
	 	 	 	 	 	 'rb.t.sg.twitterAccountLink':'@actwitty',
	 	 	 	 	 	 'rb.t.sg.twitterAccountLable':'@actwitty',
	 	 	 	 	 	 'rb.t.sg.textRight':'Hello Hello',
	 	 	 	 	 	 'rb.t.nr.durationOfDisplay':'100'
	 	 	 	 	 },
	 	  'topbar.generic.fblike':{
	 	 	 	 	 	 'rb.t.cr.textColor ':'#F2F0F0',
	 	 	 	 	 	 'rb.t.nr.textFontsize':'16',
	 	 	 	 	 	 'rb.t.ft.textFontfamily':'Arial',
	 	 	 	 	 	 'rb.t.sg.textFontWeight':'bold',
	 	 	 	 	 	 'rb.f.nr.baseZindex':'1000',
	 	 	 	 	 	 'rb.t.nr.baseWidth':'100',
	 	 	 	 	 	 'rb.t.nr.baseHeight':'40',
	 	 	 	 	 	 'rb.t.cr.baseBgColor':'#3C5891',
	 	 	 	 	 	 'rb.t.an.baseTextalign':'center',
	 	 	 	 	 	 'rb.t.sg.textLeft':'Hello Hello',
	 	 	 	 	 	 'rb.t.ul.facebookPage=%%http://www.google.com':'',
	 	 	 	 	 	 'rb.t.sg.textRight':'Hello Hello',
	 	 	 	 	 	 'rb.t.nr.durationOfDisplay':'100'
	 	 	 	 	 },
	 	  'bottombar.generic.twittershare':{
	 	 	 	 	 	 'rb.t.cr.textColor ':'white',
	 	 	 	 	 	 'rb.t.nr.textFontsize':'17',
	 	 	 	 	 	 'rb.t.cr.textShadow':'black',
	 	 	 	 	 	 'rb.t.ft.textFontfamily':'Arial',
	 	 	 	 	 	 'rb.t.sg.textFontWeight':'bold',
	 	 	 	 	 	 'rb.f.nr.baseZindex':'1000',
	 	 	 	 	 	 'rb.t.nr.baeWidth':'100',
	 	 	 	 	 	 'rb.t.nr.baseHeight':'50',
	 	 	 	 	 	 'rb.t.cr.baeBgColor':'#0B8AB8',
	 	 	 	 	 	 'rb.t.an.baseTextalign':'center',
	 	 	 	 	 	 'rb.t.sg.leftText':'Hello Hello',
	 	 	 	 	 	 'rb.t.sg.twitterSharetext':'Twteet please',
	 	 	 	 	 	 'rb.t.sg.rightText':'Hello Hello',
	 	 	 	 	 	 'rb.t.nr.durationOfDisplay':'10'
	 	 	 	 	 },
	 	  'modal.generic.normal':{
	 	 	 	 	 	 'rb.f.nr.transBlockZindex':'1000',
	 	 	 	 	 	 'rb.f.nr.baseZindex':'1005',
	 	 	 	 	 	 'rb.t.cr.baseBgColor':'white',
	 	 	 	 	 	 'rb.t.cr.headingBgColor':'#e7e7e7',
	 	 	 	 	 	 'rb.t.cr.modalHeadingColor':'#525252',
	 	 	 	 	 	 'rb.t.nr.modalHeadingFontsize':'20',
	 	 	 	 	 	 'rb.t.ft.headingFontfamily':'Arial',
	 	 	 	 	 	 'rb.t.cr.modalHeadingTextShadow#6e6e6e':'',
	 	 	 	 	 	 'rb.t.sg.modalHeadingText':'This is the Heading ',
	 	 	 	 	 	 'rb.t.cr.modalTextColor':'#525252',
	 	 	 	 	 	 'rb.t.nr.modalTextFontsize':'12',
	 	 	 	 	 	 'rb.t.ft.textFontfamily':'Arial',
	 	 	 	 	 	 'rb.t.sg.modalText':'Hello Hello Hello Hello Hello hello heello bjashsdgfsdhvfhsdvcfhsdvhcsd hvhvchjsdvchjsdvchjvsdchvsdhvcjhsdvjvh ',
	 	 	 	 	 	 'rb.t.sg.modalImgPath':'../../../images/rails.png',
	 	 	 	 	 	 'rb.t.cr.buttonBgColor':'#3B5998',
	 	 	 	 	 	 'rb.t.ul.modalBtnLink':'http://www.google.com',
	 	 	 	 	 	 'rb.t.sg.modalBtnLable':'Click',
	 	 	 	 	 	 'rb.t.nr.durationOfDisplay':'10'
	 	 	 	 	 },
	 	  'bottombar.generic.normal':{
	 	 	 	 	 	 'rb.t.cr.textColor ':'#333',
	 	 	 	 	 	 'rb.t.nr.textFontsize':'15',
	 	 	 	 	 	 'rb.t.ft.textFontfamily':'Arial',
	 	 	 	 	 	 'rb.t.sg.textFontWeight':'bold',
	 	 	 	 	 	 'rb.f.nr.baseZindex':'100',
	 	 	 	 	 	 'rb.t.nr.baseWidth':'100',
	 	 	 	 	 	 'rb.t.nr.baseHeight':'40',
	 	 	 	 	 	 'rb.t.cr.baseBgColor':'#DCDCDC',
	 	 	 	 	 	 'rb.t.an.baseTextalign':'center',
	 	 	 	 	 	 'rb.t.sg.textLeft':'Hello Hello',
	 	 	 	 	 	 'rb.t.nr.btnFontSize':'14',
	 	 	 	 	 	 'rb.t.cr.btnBgColor':'#548AC7',
	 	 	 	 	 	 'rb.t.cr.btnColor':'white',
	 	 	 	 	 	 'rb.t.ul.btnLink':'http://www.google.com',
	 	 	 	 	 	 'rb.t.sg.btnLable':'Click',
	 	 	 	 	 	 'rb.t.sg.textRight':'Hello Hello',
	 	 	 	 	 	 'rb.t.nr.durationOfDisplay':'10'
	 	 	 	 	 },
	 	  'topbar.generic.twittershare':{
	 	 	 	 	 	 'rb.t.cr.textColor ':'white',
	 	 	 	 	 	 'rb.t.nr.textFontsize':'17',
	 	 	 	 	 	 'rb.t.cr.textShadow':'black',
	 	 	 	 	 	 'rb.t.ft.textFontfamily':'Arial',
	 	 	 	 	 	 'rb.t.sg.textFontWeight':'bold',
	 	 	 	 	 	 'rb.f.nr.baseZindex':'1000',
	 	 	 	 	 	 'rb.t.nr.baeWidth':'100',
	 	 	 	 	 	 'rb.t.nr.baseHeight':'50',
	 	 	 	 	 	 'rb.t.cr.baeBgColor':'#0B8AB8',
	 	 	 	 	 	 'rb.t.an.baseTextalign':'center',
	 	 	 	 	 	 'rb.t.sg.leftText':'Hello Hello',
	 	 	 	 	 	 'rb.t.sg.twitterSharetext':'Tweet Please',
	 	 	 	 	 	 'rb.t.sg.rightText':'Hello Hello',
	 	 	 	 	 	 'rb.t.nr.durationOfDisplay':'100'
	 	 	 	 	 }
 	 	 	 	 }; 
 



/****************************[[./templates/topbars/rbTemplBottombarGenericFblike.js]]*************************************/ 


rbT.rbTemplBottombarGenericFblikeHTML='<!-- {{##Title##}}--><!-- {{##Timer##}}--><style>.rbTextValue   {     color:{{rb.t.cr.textColor }};     font-size: {{rb.t.nr.textFontsize}}px;     font-family: {{rb.t.ft.textFontfamily}};     text-shadow : #1C2C4C 0px -1px 0px;     font-style: normal;     font-weight:{{rb.t.ft.textFontWeight}};   }</style> <div id="fb-root"></div><script>(function(d, s, id) {  var js, fjs = d.getElementsByTagName(s)[0];  var k = \'hello\';  if (d.getElementById(id)) return;  js = d.createElement(s); js.id = id;  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";  fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));</script><div id="rbBottombarGenericFblikeBaseContainer"  style="zIndex:{{rb.f.nr.baseZindex}};width:{{rb.t.nr.baseWidth}}%;height:{{rb.t.nr.baseHeight}}px;display:block; background-color:{{rb.t.cr.baseBgColor}};border-style:none; position:fixed; bottom:0px; left:0px; box-shadow: 2px -2px 2px #888888;text-align:{{rb.t.an.baseTextalign}};">      <div id="rbBottombarGenericFblikeLeftClick" class="rbTextValue" style="display:inline;  position:absolute;bottom:5px; margin-right:20px; bottom:10px; left:20px; width:40%;overflow:hidden;">         {{rb.t.sg.textLeft}}     </div>    <div id="rbBottombarGenericFblikeRoiButton" class ="rbClickable" style="display:inline;position:absolute;bottom:10px;width:100px;left:42%;margin-right:20px;height:25px;background-color:#FFFFFF;border-radius:5px;cursor:pointer;">                      <div class="fb-like" data-href="{{rb.t.ul.facebookPage}}" data-send="false" data-layout="button_count" data-width="47px" data-show-faces="false" data-font="arial"></div>          </div>      <div id="rbBottombarGenericFblikeRightClick" class="rbTextValue"  style="display:inline;  position:absolute; margin-right:20px; bottom:10px; margin-left:20px; left:49%; width:40%;overflow:hidden;">                  {{rb.t.sg.textRight}}     </div>     <div  style="display:inline; position:absolute;bottom:5px;right:30px;margin-left:20px;color:#FFFFFF;font-weight:bold;">                    <a id="rbBottombarGenericFblikeRoiHelp" class="rbClickable" style= "text-decoration:none;color:#FFFFFF;" href="http://www.rulebot.com" >            ?            </a>       </div>    <div id="rbBottombarGenericFblikeCloseClick" class="rbClickable" style="display:inline;position:absolute;color:#FFFFFF; bottom:5px;right:10px;font-weight:bold;cursor:pointer;" >     X    </div> </div>'



/****************************[[./templates/topbars/rbTemplBottombarGenericTwitterfollow.js]]*************************************/ 


rbT.rbTemplBottombarGenericTwitterfollowHTML='<!-- {{##Title##}}--><!-- {{##Timer##}}--><style>.rbTextValue  {     color:{{rb.t.cr.textColor }};     font-size: {{rb.t.nr.textFontsize}}px;     text-shadow: 1px 1px {{rb.t.cr.textShadow}};     font-family: {{rb.t.ft.textFontfamily}};     text-shadow: 0 -1px 0 #007AA6;     font-weight:{{rb.t.ft.textFontWeight}};   }</style> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script><div id="rbBottombarGenericTwitterfollowBaseContainer" style="zIndex:{{rb.f.nr.baseZindex}};width:{{rb.t.nr.baeWidth}}%;height:{{rb.t.nr.baseHeight}}px;display:block; background-color:{{rb.t.cr.baeBgColor}};border-style:none; position:fixed; bottom:0px; left:0px; box-shadow: 2px -2px 2px #888888;text-align:{{rb.t.an.baseTextalign}};">       <div id="rbBottombarGenericTwitterfollowLeftClick" class="rbTextValue" style="display:inline;  position:absolute;bottom:5px; margin-right:20px; bottom:10px; left:20px; width:40%;overflow:hidden;">         {{rb.t.sg.textLeft}}     </div>    <div id="rbBottombarGenericTwitterfollowRoiButton" class ="rbClickable" style="display:inline;position:absolute;bottom:5px;left:42%;margin-right:20px;cursor:pointer;">                        <a  data-show-count="false" data-button = "blue" class="twitter-follow-button" href="https://twitter.com/{{rb.t.sg.twitterAccountLink}}" data-size="large">Follow {{rb.t.sg.twitterAccountLable}} </a>       </div>       <div id="rbBottombarGenericTwitterfollowRightClick" class="rbTextValue"  style="display:inline;  position:absolute; margin-right:20px; bottom:10px; margin-left:20px; left:52%; width:40%;overflow:hidden;">                  {{rb.t.sg.textRight}}     </div>     <div  style="display:inline; position:absolute;bottom:5px;right:30px;margin-left:20px;font-weight:bold;">                    <a id="rbBottombarGenericTwitterfollowRoiHelp" class="rbClickable" target="_blank" style= "text-decoration:none ;color:#FFFFFF " href=http://www.rulebot.com"  >            ?            </a>       </div>    <div id="rbBottombarGenericTwitterfollowCloseClick" class="rbClickable" style="display:inline;position:absolute;color:#FFFFFF; bottom:5px;right:10px;font-weight:bold;cursor:pointer;" >     X     </div> </div>'



/****************************[[./templates/topbars/rbTemplBottombarGenericNormal.js]]*************************************/ 


rbT.rbTemplBottombarGenericNormalHTML='<!-- {{##Title##}}--><!-- {{##Timer##}}--><style>  .rbTextValue   {     color:{{rb.t.cr.textColor }};     font-size: {{rb.t.nr.textFontsize}}px;     font-family: {{rb.t.ft.textFontfamily}};     font-weight:{{rb.t.ft.textFontWeight}};   }</style><div id="rbBottombarGenericNormalBaseContainer" style="zIndex:{{rb.f.nr.baseZindex}};width:{{rb.t.nr.baseWidth}}%;height:{{rb.t.nr.baseHeight}}px;display:block; background-color:{{rb.t.cr.baseBgColor}};border-style:none; position:fixed; bottom:0px; left:0px; box-shadow: 2px -2px 2px #888888;text-align:{{rb.t.an.baseTextalign}};">   <div id="rbBottombarGenericNormalLeftClick" class="rbTextValue" style="display:inline;  position:absolute;bottom:5px; margin-right:20px; bottom:10px; left:20px; width:40%;overflow:hidden;">         {{rb.t.sg.textLeft}}     </div>   <a id="rbBottombarGenericNormalRoiButton" class ="rbClickable" style="display:inline;position:absolute;bottom:5px;width:80px;left:42%;margin-right:20px;height:25px; border-radius:5px;text-decoration:none; font-size:{{rb.t.nr.btnFontSize}}px;     background-color:{{rb.t.cr.btnBgColor}};text-shadow: 0px -1px 0px #29588D;       color :{{rb.t.cr.btnColor}};text-align:center;border:1px solid #305580;padding-top:3px;cursor:pointer;" href="{{rb.t.ul.btnLink}}"> {{rb.t.sg.btnLable}} </a>      <div id="rbBottombarGenericNormalRightClick" class="rbTextValue"  style="display:inline;  position:absolute; margin-right:20px; bottom:10px; margin-left:20px; left:49%; width:40%;overflow:hidden;">                  {{rb.t.sg.textRight}}     </div>    <div  style="display:inline; position:absolute;right:30px; bottom:5px;margin-left:20px;font-weight:bold;">                    <a id="rbBottombarGenericNormalRoiHelp" class="rbClickable" target="_blank" style= "text-decoration:none;color:#333" href="http://www.rulebot.com" >            ?            </a>     </div>    <div id="rbBottombarGenericNormalCloseClick" class="rbClickable" style="display:inline;position:absolute;color:#333; bottom:5px;right:10px;font-weight:bold;cursor:pointer;" >     X    </div> </div>'



/****************************[[./templates/topbars/rbTemplBottombarGenericTwittershare.js]]*************************************/ 


rbT.rbTemplBottombarGenericTwittershareHTML='<!-- {{##Title##}}--><!-- {{##Timer##}}--><style>.rbTextValue  {     color:{{rb.t.cr.textColor }};     font-size: {{rb.t.nr.textFontsize}}px;     text-shadow: 1px 1px {{rb.t.cr.textShadow}};     font-family: {{rb.t.ft.textFontfamily}};     text-shadow: 0 -1px 0 #007AA6;     font-weight:{{rb.t.ft.textFontWeight}};   }</style> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script><div id="rbBottombarGenericTwittershareBaseContainer" style="zIndex:{{rb.f.nr.baseZindex}};width:{{rb.t.nr.baeWidth}}%;height:{{rb.t.nr.baseHeight}}px;display:block; background-color:{{rb.t.cr.baeBgColor}};border-style:none; position:fixed; bottom:0px; left:0px; box-shadow: 2px -2px 2px #888888;text-align:{{rb.t.an.baseTextalign}};">      <div id="rbBottombarGenericTwittershareLeftClick" class="rbTextValue" style="display:inline;  position:absolute;bottom:5px; margin-right:20px; bottom:10px; left:20px; width:40%;overflow:hidden;">         {{rb.t.sg.leftText}}     </div>       <div id="rbBottombarGenericTwittershareRoiButton" class ="rbClickable" style="display:inline;position:absolute;bottom:5px;left:42%;margin-right:20px;border-radius:5px;cursor:pointer;">                      <a href="https://twitter.com/share?text={{rb.t.sg.twitterSharetext}}" class="twitter-share-button" data-count="none" data-lang="en" data-size="large">Tweet</a>       </div>       <div id="rbBottombarGenericTwittershareRightClick" class="rbTextValue"  style="display:inline;  position:absolute; margin-right:20px; bottom:10px; margin-left:20px; left:47%; width:40%;overflow:hidden;">                  {{rb.t.sg.rightText}}     </div>     <div  style="display:inline; position:absolute;bottom:5px;right:30px;margin-left:20px;font-weight:bold;">                    <a id="rbBottombarGenericTwittershareRoiHelp" class="rbClickable" target="_blank" style= "text-decoration:none ;color:#FFFFFF; " href="http://www.rulebot.com"  >            ?            </a>       </div>    <div id="rbBottombarGenericTwittershareCloseClick" class="rbClickable" style="display:inline;position:absolute;color:#FFFFFF; bottom:5px;right:10px;font-weight:bold;cursor:pointer;" >     X     </div> </div>'



/****************************[[./templates/topbars/rbTemplTopbarGenericFblike.js]]*************************************/ 


rbT.rbTemplTopbarGenericFblikeHTML='<!-- {{##Title##}}--><!-- {{##Timer##}}--><style>.rbTextValue   {     color:{{rb.t.cr.textColor }};     font-size: {{rb.t.nr.textFontsize}}px;     font-family: {{rb.t.ft.textFontfamily}};     text-shadow : #1C2C4C 0px -1px 0px;     font-style: normal;     font-weight:{{rb.t.ft.textFontWeight}};   }</style> <div id="fb-root"></div><script>(function(d, s, id) {  var js, fjs = d.getElementsByTagName(s)[0];  if (d.getElementById(id)) return;  js = d.createElement(s); js.id = id;  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";  fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));</script><div id="rbTopbarGenericFblikeBaseContainer" style="zIndex:{{rb.f.nr.baseZindex}};width:{{rb.t.nr.baseWidth}}%;height:{{rb.t.nr.baseHeight}}px;display:block; background-color:{{rb.t.cr.baseBgColor}};border-style:none; position:fixed; top:0px; left:0px; box-shadow: 2px 2px 2px #888888;text-align:{{rb.t.an.baseTextalign}};">    <div id="rbTopbarGenericFblikeLeftClick" class="rbTextValue" style="display:inline;  position:absolute;bottom:5px; margin-right:20px; bottom:10px; left:20px; width:40%;overflow:hidden;">         {{rb.t.sg.textLeft}}     </div>             <div id="rbTopbarGenericFblikeRoiButton" class ="rbClickable" style="display:inline;position:absolute;bottom:10px;width:80px;left:42%;margin-right:20px;height:25px;background-color:#FFFFFF;border-radius:5px;cursor:pointer;">                      <div class="fb-like" data-href="{{rb.t.ul.facebookPage=%%http://www.google.com}}" data-send="false" data-layout="button_count" data-width="250px" data-show-faces="false" data-font="arial"></div>          </div>         <div id="rbBottombarGenericFblikeRightClick" class="rbTextValue"  style="display:inline;  position:absolute; margin-right:20px; bottom:10px; margin-left:20px; left:49%; width:40%;overflow:hidden;">                  {{rb.t.sg.textRight}}     </div>   <div  style="display:inline; position:absolute;top:5px;right:30px;margin-left:20px;color:#FFFFFF;font-weight:bold;">                    <a id="rbTopbarGenericFblikeRoiHelp" class="rbClickable" style= "text-decoration:none;color:#FFFFFF;" href="http://www.rulebot.com"  >            ?            </a>       </div>   <div id="rbTopbarGenericFblikeCloseClick" class="rbClickable" style="display:inline;position:absolute;color:#FFFFFF; top:5px;right:10px;font-weight:bold;cursor:pointer;" >     X   </div>     </div>'



/****************************[[./templates/topbars/rbTemplTopbarGenericTwitterfollow.js]]*************************************/ 


rbT.rbTemplTopbarGenericTwitterfollowHTML='<!-- {{##Title##}}--><!-- {{##Timer##}}--><style>.rbTextValue  {     color:{{rb.t.cr.textColor }};     font-size: {{rb.t.nr.textFontsize}}px;     text-shadow: 1px 1px {{rb.t.cr.textShadow}};     font-family: {{rb.t.ft.textFontfamily}};     text-shadow: 0 -1px 0 #007AA6;     font-weight:{{rb.t.ft.textFontWeight}};   }</style> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script><div id="rbTopbarGenericTwitterfollowBaseContainer" style="zIndex:{{rb.f.nr.baseZindex}};width:{{rb.t.nr.baeWidth}}%;height:{{rb.t.nr.baseHeight}}px;display:block; background-color:{{rb.t.cr.baeBgColor}};border-style:none; position:fixed; top:0px; left:0px; box-shadow: 2px 2px 2px #888888;text-align:{{rb.t.an.baseTextalign}};">          <div id="rbTopbarGenericTwitterfollowLeftClick" class="rbTextValue" style="display:inline;  position:absolute;bottom:5px; margin-right:20px; bottom:10px; left:20px; width:40%;overflow:hidden;">         {{rb.t.sg.textLeft}}     </div>           <div id="rbTopbarGenericTwitterfollowRoiButton" class ="rbClickable" style="display:inline;position:absolute;bottom:5px;left:42%;margin-right:20px;cursor:pointer;">                        <a  data-show-count="false" data-button = "blue" class="twitter-follow-button" href="https://twitter.com/{{rb.t.sg.twitterAccountLink}}" data-size="large">Follow {{rb.t.sg.twitterAccountLable}} </a>       </div>           <div id="rbTopbarGenericTwitterfollowRightClick" class="rbTextValue"  style="display:inline;  position:absolute; margin-right:20px; bottom:10px; margin-left:20px; left:52%; width:40%;overflow:hidden;">                  {{rb.t.sg.textRight}}     </div>   <div style="display:inline; position:absolute;top:5px;right:30px;margin-left:20px;font-weight:bold;">                    <a id="rbTopbarGenericTwitterfollowRoiHelp" class="rbClickable" target="_blank" style= "text-decoration:none ;color:#FFFFFF; " href="http://www.rulebot.com"  >            ?            </a>       </div>  <div id="rbTopbarGenericTwitterfollowCloseClick" class="rbClickable" style="display:inline;position:absolute;color:#FFFFFF; top:5px;right:10px;font-weight:bold;cursor:pointer;" >     X  </div> </div>'



/****************************[[./templates/topbars/rbTemplTopbarGenericNormal.js]]*************************************/ 


rbT.rbTemplTopbarGenericNormalHTML='<!-- {{##Title##}}--><!-- {{##Timer##}}--><style>  .rbTextValue   {     color:{{rb.t.cr.textColor }};     font-size: {{rb.t.nr.textFontsize}}px;     font-family: {{rb.t.ft.textFontfamily}};     font-weight:{{rb.t.ft.textFontWeight}};   }</style><div id="rbTopbarGenericNormalBaseContainer" style="zIndex:{{rb.f.nr.baseZindex}};width:{{rb.t.nr.baseWidth}}%;height:{{rb.t.nr.baseHeight}}px;display:block; background-color:{{rb.t.cr.baseBgColor}};border-style:none; position:fixed; top:0px; left:0px; box-shadow: 2px 2px 2px #888888;text-align:{{rb.t.an.baseTextalign}};">  <div id="rbTopbarGenericNormalLeftClick" class="rbTextValue" style="display:inline;  position:absolute;bottom:5px; margin-right:20px; bottom:10px; left:20px; width:40%;overflow:hidden;">         {{rb.t.sg.textLeft}}  </div>    <a id="rbTopbarGenericNormalRoiButton" class ="rbClickable" style="display:inline;position:absolute;bottom:5px;width:80px;left:42%;margin-right:20px;height:25px; border-radius:5px;text-decoration:none; font-size:{{rb.t.nr.btnFontSize}}px; background-color:{{rb.t.cr.btnBgColor}};text-shadow: 0px -1px 0px #29588D;   color :{{rb.t.cr.btnColor}};text-align:center;border:1px solid #305580; padding-top:3px;cursor:pointer;" href="{{rb.t.ul.btnLink}}"> {{rb.t.sg.btnLable}} </a>    <div id="rbTopbarGenericNormalRightClick" class="rbTextValue"  style="display:inline;  position:absolute; margin-right:20px; bottom:10px; margin-left:20px; left:49%; width:40%;overflow:hidden;">                  {{rb.t.sg.textRight}}    </div>           <div  style="display:inline; position:absolute;right:30px; top:5px;margin-left:20px;font-weight:bold;">                    <a id="rbTopbarGenericNormalRoiHelp" class="rbClickable" target="_blank" style= "text-decoration:none;color:#333" href="http://www.rulebot.com"  >            ?            </a>     </div><div id="rbTopbarGenericNormalCloseClick" class="rbClickable" style="display:inline;position:absolute;color:#333; top:5px;right:10px;font-weight:bold;cursor:pointer;" >     X</div> </div>'



/****************************[[./templates/topbars/rbTemplTopbarGenericTwittershare.js]]*************************************/ 


rbT.rbTemplTopbarGenericTwittershareHTML='<!-- {{##Title##}}--><!-- {{##Timer##}}--><style>.rbTextValue  {     color:{{rb.t.cr.textColor }};     font-size: {{rb.t.nr.textFontsize}}px;     text-shadow: 1px 1px {{rb.t.cr.textShadow}};     font-family: {{rb.t.ft.textFontfamily}};     text-shadow: 0 -1px 0 #007AA6;     font-weight:{{rb.t.ft.textFontWeight}};   }</style> <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script><div id="rbTopbarGenericTwittershareBaseContainer" style="zIndex:{{rb.f.nr.baseZindex}};width:{{rb.t.nr.baeWidth}}%;height:{{rb.t.nr.baseHeight}}px;display:block; background-color:{{rb.t.cr.baeBgColor}};border-style:none; position:fixed; top:0px; left:0px; box-shadow: 2px 2px 2px #888888;text-align:{{rb.t.an.baseTextalign}};">        <div id="rbTopbarGenericTwittershareLeftClick" class="rbTextValue" style="display:inline;  position:absolute;bottom:5px; margin-right:20px; bottom:10px; left:20px; width:40%;overflow:hidden;">         {{rb.t.sg.leftText}}  </div>   <div id="rbTopbarGenericTwittershareRoiButton" class ="rbClickable" style="display:inline;position:absolute;bottom:5px;left:42%;margin-right:20px;border-radius:5px;cursor:pointer;">                      <a href="https://twitter.com/share?text={{rb.t.sg.twitterSharetext}}" class="twitter-share-button" data-count="none" data-lang="en" data-size="large">Tweet</a>       </div>     <div id="rbBottombarGenericTwittershareRightClick" class="rbTextValue"  style="display:inline;  position:absolute; margin-right:20px; bottom:10px; margin-left:20px; left:47%; width:40%;overflow:hidden;">                  {{rb.t.sg.rightText}}  </div>       <div  style="display:inline; position:absolute;top:5px;right:30px;margin-left:20px;font-weight:bold;">                    <a id="rbTopbarGenericTwittershareRoiHelp" class="rbClickable" target="_blank" style= "text-decoration:none ;color:#FFFFFF; " href="http://www.rulebot.com"  >            ?            </a>       </div>    <div id="rbTopbarGenericTwittershareCloseClick" class="rbClickable" style="display:inline;position:absolute;color:#FFFFFF; top:5px;right:10px;font-weight:bold;cursor:pointer;cursor:pointer;" >     X     </div> </div>'



/****************************[[./templates/topbars/rbTemplChatGenericNormal.js]]*************************************/ 


rbT.rbTemplChatGenericNormalHTML='<!-- {{##Title##}}--><!-- {{##Timer##}}--><div id="rbChatGenericNormalBaseContainer"><script data-cfasync="false" type=\'text/javascript\'>window.olark||(function(c){var f=window,d=document,l=f.location.protocol=="https:"?"https:":"http:",z=c.name,r="load";var nt=function(){f[z]=function(){(a.s=a.s||[]).push(arguments)};var a=f[z]._={},q=c.methods.length;while(q--){(function(n){f[z][n]=function(){f[z]("call",n,arguments)}})(c.methods[q])}a.l=c.loader;a.i=nt;a.p={0:+new Date};a.P=function(u){a.p[u]=new Date-a.p[0]};function s(){a.P(r);f[z](r)}f.addEventListener?f.addEventListener(r,s,false):f.attachEvent("on"+r,s);var ld=function(){function p(hd){hd="head";return["<",hd,"></",hd,"><",i,\' onl\' + \'oad="var d=\',g,";d.getElementsByTagName(\'head\')[0].",j,"(d.",h,"(\'script\')).",k,"=\'",l,"//",a.l,"\'",\'"\',"></",i,">"].join("")}var i="body",m=d[i];if(!m){return setTimeout(ld,100)}a.P(1);var j="appendChild",h="createElement",k="src",n=d[h]("div"),v=n[j](d[h](z)),b=d[h]("iframe"),g="document",e="domain",o;n.style.display="none";m.insertBefore(n,m.firstChild).id=z;b.frameBorder="0";b.id=z+"-loader";if(/MSIE[ ]+6/.test(navigator.userAgent)){b.src="javascript:false"}b.allowTransparency="true";v[j](b);try{b.contentWindow[g].open()}catch(w){c[e]=d[e];o="javascript:var d="+g+".open();d.domain=\'"+d.domain+"\';";b[k]=o+"void(0);"}try{var t=b.contentWindow[g];t.write(p());t.close()}catch(x){b[k]=o+\'d.write("\'+p().replace(/"/g,String.fromCharCode(92)+\'"\')+\'");d.close();\'}a.P(2)};ld()};nt()})({loader: "static.olark.com/jsclient/loader0.js",name:"olark",methods:["configure","extend","declare","identify"]});olark.identify({{rb.t.sg.olarkIdentity}});olark.configure(\'box.width\', 200);olark.configure(\'box.height\', 100);</script></div>'



/****************************[[./templates/topbars/rbTemplModalGenericNormal.js]]*************************************/ 


rbT.rbTemplModalGenericNormalHTML='<!-- {{##Title##}}--><!-- {{##Timer##}}--><style>#rbModalGenericNormalTranblockContainer {          visibility: visible;         position: fixed;          left: 0px;          top: 0px;           width:100%;           height:100%;       background-color:black;          z-index:{{rb.f.nr.transBlockZindex}};      opacity:0.6;      filter:alpha(opacity=60);}#rbModalGenericNormalBaseContainer{          visibility: visible;         position: fixed;          left: 0px;          top: 0px;           width:100%;           height:100%;      z-index:{{rb.f.nr.baseZindex}}; }#rbModalGenericNormalSubsubContainer        {                 width:500px; 	           height: 300px;             background-color:{{rb.t.cr.baseBgColor}};               border:4px solid #a3a3a3;                position: fixed;             border-radius:5px;             top : 30%;             left : 30%;        }  </style><div id="rbModalGenericNormalTranblockContainer"></div> <div id="rbModalGenericNormalBaseContainer">		<div id="rbModalGenericNormalSubContainer">		<div id="rbModalGenericNormalSubsubContainer"  style="postion:relative;">                                 <div style="top:0px;width:100%;height:18%;left:0px;background-color:{{rb.t.cr.headingBgColor}};">           <div style="top:0%;left:0 %;position:absolute;color:{{rb.t.cr.modalHeadingColor}};width:70%; height:14%;font-size:{{rb.t.nr.modalHeadingFontsize}}px;font-family:{{rb.t.ft.headingFontfamily}}; overflow:hidden;border-top-left-radius:5px;border-top-right-radius:5px;padding:5px;text-shadow:1px 1px {{rb.t.cr.modalHeadingTextShadow#6e6e6e}};">               {{rb.t.sg.modalHeadingText}}           </div>          <div id="rbModalGenericNormalCloseClick" class="rbClickable"  style="top:1%;right:1%;position:absolute;color:black;font-weight:bold; padding:2px;cursor:pointer;">            X          </div>            </div>           	<div style="top:22%;left:0%;position:absolute;color:{{rb.t.cr.modalTextColor}};width:70%;height:65%;overflow:hidden;font-size:{{rb.t.nr.modalTextFontsize}}px;font-family:{{rb.t.ft.textFontfamily}};text-align:left;border-bottom-left-radius:5px;border-bottom-right-radius:5px;padding:5px;">           	    {{rb.t.sg.modalText}}                         	 </div>             <div style="top:30%;right:5%;width:15%;height:20%;position:absolute;overflow:hidden">              <img src="{{rb.t.sg.modalImgPath}}" alt="image"\>             </div> 			               <button   style="bottom:2%;right:2%;position:absolute;color:white;width:75px;height:25px;text-align:center;background-color:{{rb.t.cr.buttonBgColor}};border-radius:5px;padding-top:2px;border:1px solid #305580 ;font-weight: bold;cursor:pointer;">               <a  id="rbModalGenericNormalRoiButton" class="rbClickable" style="text-decoration:none;color:white;" href= "{{rb.t.ul.modalBtnLink}}" target="_self" class="rbClickable" >                {{rb.t.sg.modalBtnLable}}               </a>             </button>	      </div>	</div></div>'



/****************************[[helpers.js]]*************************************/ 


"use strict";

//templ related timers

rbT.templTimers= {
 'templ.displaytimer':'false',
 'templ.templduration':'100'

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

rbT.makeFirstLetterCapital=function(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
};


////************************************************
//function returns the string making capital letter the first letter

rbT.makeFirstLetterSmall=function(string)
{
    return string.charAt(0).toLowerCase() + string.slice(1);
};


//********************************************************


//*************************************************

//from template name extract the disply position for the template

rbT.extractDisplayPositionFromTemplName = function(templName){

    var tempReg = /[a-z]*/g;
    var tempMatch = tempReg.exec(templName);
    return tempMatch;

};

//******************************************************************
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

  
/*

 rbTAPP.reportError({"message":string,"server":true});


*/

  //TODO: Implement post to server // for console log=true
  console.log(string);
};





/****************************[[externals.js]]*************************************/ 



rbT.facebook = {
	setContext: function(context){
		//
        //  rbT.facebook.likePage
		//  rbT.facebook.appID

	},
	getHTML: {
		likeBtn: function(){

		},
		shareBtn: function(){

		},
		
	}


}

rbT.twitter = {


};




/****************************[[event_handler.js]]*************************************/ 


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


/****************************[[main.js]]*************************************/ 


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
		for (var key in vars) {
		
		if(vars.hasOwnProperty(key))
		{	
			var value = vars[key] ; 
			
			if( key != 'rb.t.nr.templDuration')
            {
			  var tempVarToBeReplaced = key;
              var replaceKey = rbT.keyPrefix + tempVarToBeReplaced + rbT.keySuffix;
			  html = html.replace(replaceKey, value);
			} 
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

/*

      //TODO get the OS version here based on that action display
*/      

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
               for (var key in actionParams) {

               	if(actionParams.hasOwnProperty(key))
               	{
			         if( 'rb.f.nr.transBlockZindex' == key)
			       {
				       actionParams[key] =  rbT.findZIndex();
			       }

			       else if( 'rb.f.nr.baseZindex' == key)
			       {
				      actionParams[key]  =  rbT.findZIndex()+5;
			       }

			       else if( 'rb.t.nr.durationOfDisplay'== key)
			       {
                      rbT.templTimers['templ.templduration']= actionParams[key] ;
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
				actionParams[key] =  rbT.findZIndex()+5;
			  }
			  else if( 'rb.t.nr.durationOfDisplay'== key)
              {
                   rbT.templTimers['templ.templduration']= actionParams[key] ;
			  }

			 } 
             
		    } 
		  }        

          html = rbT.getTemplateApplyVars(html, actionParams);
  

         if (rbT.isTemplateGoodToApply(html)){
           rbT.applyHtmltoPage(html);
           rbT.enableClickHandling();
           rbT.enableTimeOutHadnling(templateName,rbT.templTimers['templ.templduration']*1000);
		   rbT.setTemplatesDisplayLockFlags(pos,true);


         }
      }	

};	 


/****************************[[interfaces.js]]*************************************/ 


"use strict";
rbT.isInitialized = function(){
	return rbT.inited;
};
//------------------------------------------
rbT.getTemplateHTMLByName = function(name){

	if (!rbT.isInitialized()){
		return "";
	}
	
	if ( typeof name === 'undefined' ){
		rbT.sendErrorToRBServer("improper access of interface getTemplateHTMLByName");
		return "";
	}
	return rbT.getTemplateHTMLByNameInternal(name);
};
//------------------------------------------
rbT.getTemplateApplyVars = function(html,vars){
	if (!rbT.isInitialized()){
		return "";
	}

	if ( typeof html === 'undefined' || typeof vars === 'undefined' ){
		rbT.sendErrorToRBServer("improper access of interface getTemplateApplyVars");
		return "";
	}

	return rbT.getTemplateApplyVarsInternal(html,vars);
};
//------------------------------------------
rbT.isTemplateGoodToApply = function(html){
	if (!rbT.isInitialized()){
		return false;
	}
	if ( typeof html === 'undefined' ){
		rbT.sendErrorToRBServer("improper access of interface isTemplateGoodToApply");
		return "";
	}
	return rbT.isTemplateGoodToApplyInternal(html);
};

//------------------------------------------
rbT.applyHtmltoPage = function(html){
	if (!rbT.isInitialized()){
		return "";
	}
	if ( typeof html === 'undefined' ){
		rbT.sendErrorToRBServer("improper access of interface applyHtmltoPage");
		return "";
	}
	return rbT.applyHtmltoPageInternal(html);
};


//-----------------------------------------
rbT.enableClickHandling = function(){
	rbT.enableClickHandlingInternal ();
}


//----------------------------------------------------------------

rbT.enableTimeOutHadnling =function(templateName,timerValue){

   if (!rbT.isInitialized()){
		return "";
	}
	if ( typeof templateName === 'undefined' ){
		rbT.sendErrorToRBServer("improper access of interface enableTimeOutHadnling");
		return "";
	}

	rbT.enableTimeOutHadnlingInternal(templateName,timerValue);
}

//---------------------------------------------------------------

rbT.invokeActionScript = function(action,actionParams)
{

	if ( typeof actionParams === 'undefined' ){
		rbT.sendErrorToRBServer("Invalid params in rule Json");
		return "";
	}

	else{
          rbT.invokeActionScriptInternal(action,actionParams); 
	}

	
}

