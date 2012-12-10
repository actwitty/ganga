


/****************************[[include.js]]*************************************/ 


if(!trigger_fish)
var trigger_fish = {};

trigger_fish.rbT = { inited: false};


/****************************[[templatesLibForClient.js]]*************************************/ 


trigger_fish.rbT.templateLib = {
		'modal':{ 
				'generic.normal':'rbTemplModalGenericNormalHTML'
 
 	 	 	 },
		'feedback':{ 
				'uservoice.normal':'rbTemplFeedbackUservoiceNormalHTML'
 
 	 	 	 },
		'bottombar':{ 
				'generic.fblike':'rbTemplBottombarGenericFblikeHTML',
				'generic.twittershare':'rbTemplBottombarGenericTwittershareHTML',
				'generic.twitterfollow':'rbTemplBottombarGenericTwitterfollowHTML',
				'generic.normal':'rbTemplBottombarGenericNormalHTML'
 
 	 	 	 },
		'topbar':{ 
				'generic.normal':'rbTemplTopbarGenericNormalHTML',
				'generic.fblike':'rbTemplTopbarGenericFblikeHTML',
				'generic.twitterfollow':'rbTemplTopbarGenericTwitterfollowHTML',
				'generic.twittershare':'rbTemplTopbarGenericTwittershareHTML'
 
 	 	 	 },
		'support':{ 
				'olark.normal':'rbTemplSupportOlarkNormalHTML'
 
 	 	 	 }
 
 }; 



 



/****************************[[./templates/js/rbTemplBottombarGenericFblike.js]]*************************************/ 


trigger_fish.rbT.rbTemplBottombarGenericFblikeHTML='<div id="rbBottombarGenericFblikeBaseContainer">    <!-- -->    <link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/actwitty_ganga/css/common_styles.css">    <style>      .rbTbFbLikeBtmDyn{        position: fixed;        bottom: 0px;        left: 0px;           z-index: {{1}};            color: white;        font-size: {{2}}px;        font-family:\'{{3}}\';        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.5);            border: 1px solid {{4}};        background-color: {{5}};          }      .rbTbFbLikeBtmDyn .barDyn{        width: {{6}}px;        height: {{7}}px;        vertical-align: middle;        position: relative;      }      .rbTbFbLikeBtmDyn .rbDynText{        white-space: nowrap;        overflow:hidden;       }              .rbTbFbLikeBtmDyn .rbDynLeftText{        position: absolute;        left:20px;         width:80%;        top: 10px;        text-align: center;        margin-right: 20px;       }        .rbTbFbLikeBtmDyn .rbTbFbLikeRight{        position: absolute;        right:0px;         width:200px;            text-align: center;        margin: 0px;        padding: 0px;        overflow: hidden;        border: 0px;                }       .rbTbFbLikeBtmDyn .rbInfoBtnDyn{        position: absolute;        top: 5px;        right: -130px;        display: inline-block;        overflow: hidden;        }          </style>    <div  class="rbBaseStyle rbTbFbLikeBtmDyn" >      <div class=\'rbIframeContent\'><!--<div id="fb-root"></div>          <script>            (function(d, s, id) {            var js, fjs = d.getElementsByTagName(s)[0];            if (d.getElementById(id)) return;            js = d.createElement(s); js.id = id;            js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";            fjs.parentNode.insertBefore(js, fjs);            }(document, "script", "facebook-jssdk"));          </script>          <div class="fb-like"               data-href="{{8}}"               data-send="true"               data-layout="button_count"               data-width="250px"               data-show-faces="false"               data-font="arial">          </div>--></div>      <div class="rbBarWidth barDyn">        <p id="rbBottombarGenericFblikeLeftClick" class="rbTextLeft rbDynLeftText rbDynText" >          {{9}}        </p>                  <iframe class="rbIframe rbTbFbLikeRight">        </iframe>                <div class="rbInfoBtnDyn">          <div class="rb-btn-group" >            <button id="rbBottombarGenericFblikeRoiHelp" class="rb-info-btn rb-info-btn-small rbClickable" link="http://www.rulebot.com">              ?            </button>            <button id="rbBottombarGenericFblikeCloseClick" class="rb-info-btn rb-info-btn-small rbClickable" >              X            </button>                      </div>        </div>        </div>      <script>        var frameClass=\'rbIframeContent\';        var base = document.getElementById(\'rbBottombarGenericFblikeBaseContainer\');        if( base !== undefined){          var inner = base.getElementsByClassName(\'rbIframeContent\');              var iframe = base.getElementsByClassName(\'rbIframe\');          if( inner !== undefined && iframe !== undefined  ){            var ifrm = iframe[0];            ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;            if(ifrm !== undefined){              ifrm.document.open();              ifrm.document.write(inner[0].firstChild.nodeValue);              ifrm.document.close();                }          }        }      </script>    </div></div>'



/****************************[[./templates/js/rbTemplBottombarGenericTwitterfollow.js]]*************************************/ 


trigger_fish.rbT.rbTemplBottombarGenericTwitterfollowHTML='<div  id="rbBottombarGenericTwitterfollowBaseContainer" >  <!-- -->  <link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/actwitty_ganga/css/common_styles.css">  <style>        .rbBmTwFollowDyn{      position: fixed;      bottom: 0px;      left: 0px;         z-index: {{1}};          background: {{2}} !important;          border-bottom: 1px solid #18496A !important;    }    .rbBmTwFollowDyn .barDyn{      width: {{3}}px;      height: {{4}}px;      vertical-align: middle;      position: relative;    }    .rbBmTwFollowDyn .rbDynText     {       color:{{5}};       font-size: {{6}}px;       font-family: {{7}};       font-weight:{{8}};       white-space: nowrap;       overflow:hidden;     }          .rbBmTwFollowDyn .rbDynLeftText{      position: absolute;      left:20px;       width:40%;      top: 10px;      text-align: center;      margin-right: 20px;     }          .rbBmTwFollowDyn .rbDynRightText{      position: absolute;      right: 20px;       top: 10px;          width:30%;       text-align: center;         margin-left: 20px;     }     .rbBmTwFollowDyn .rbBtnDyn {                          position: absolute;              width:180px;        left: 42%;        top: 0px;        overflow: hidden;        margin-right: 20px;         border: 0px;                          }         .rbBmTwFollowDyn .rbInfoBtnDyn{      position: absolute;      top: 5px;      right: -130px;      display: inline-block;     }  </style>  <div class="rbBaseStyle rbBmTwFollowDyn" >    <div class=\'rbIframeContent\'><!--<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>    <a  data-show-count="false" data-button = "blue" class="twitter-follow-button" href="https://twitter.com/{{9}}" data-size="large">Follow {{10}} </a>--></div>    <div class="rbBarWidth barDyn">    <div class="rbBarWidth barDyn">      <p  class="rbTextLeft rbDynLeftText rbDynText" >        {{11}}      </p>      <iframe class ="rbBtn rbIframe rbBtnDyn" >       </iframe>          <p  class="rbTextRight rbDynRightText rbDynText" >                   {{12}}        </p>      <div class="rbInfoBtnDyn">        <div class="rb-btn-group" >          <button id="rbBottombarGenericTwitterfollowRoiHelp" class="rb-info-btn rb-info-btn-small rbClickable" link="http://www.rulebot.com">            ?          </button>          <button id="rbBottombarGenericTwitterfollowCloseClick" class="rb-info-btn rb-info-btn-small rbClickable" >            X          </button>                    </div>      </div>      </div>    <script>          var base = document.getElementById(\'rbBottombarGenericTwitterfollowBaseContainer\');      if( base !== undefined){        var inner = base.getElementsByClassName(\'rbIframeContent\');            var iframe = base.getElementsByClassName(\'rbIframe\');        if( inner !== undefined && iframe !== undefined  ){          var ifrm = iframe[0];          ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;          if(ifrm !== undefined){            ifrm.document.open();            ifrm.document.write(inner[0].firstChild.nodeValue);            ifrm.document.close();              }        }      }    </script>  </div></div>'



/****************************[[./templates/js/rbTemplBottombarGenericNormal.js]]*************************************/ 


trigger_fish.rbT.rbTemplBottombarGenericNormalHTML='<div id="rbBottombarGenericNormalBaseContainer">    <!-- -->    <link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/actwitty_ganga/css/common_styles.css">    <style>      .rbBbGenDyn{        position: fixed;        bottom: 0px;        left: 0px;           z-index: {{1}};            background: {{2}} !important;        border-top: 1px solid #333 !important;        border-bottom: 1px solid #333 !important;      }      .rbBbGenDyn .barDyn{        width: {{3}}px;        height: {{4}}px;        vertical-align: middle;        position: relative;      }      .rbBbGenDyn .rbDynText       {         color:{{5}};         font-size: {{6}}px;         font-family: {{7}};         font-weight:{{8}};         white-space: nowrap;         overflow:hidden;       }              .rbBbGenDyn .rbDynLeftText{        position: absolute;        left:20px;         width:40%;        top: 10px;        text-align: center;        margin-right: 20px;       }              .rbBbGenDyn .rbDynRightText{        position: absolute;        right: 20px;         top: 10px;            width:40%;         text-align: center;           margin-left: 20px;       }       .rbBbGenDyn .rbBtnDyn {                padding: 12px 15px 12px;          text-shadow: none !important;          border-right: 1px solid #333;          border-left: 1px solid #333;          -webkit-transition: background 1s ease;          -moz-transition: background 1s ease;          -o-transition: background 1s ease;          transition: background 1s ease;                      position: absolute;                width:100px;          left: 42%;          top: 0;          margin-right: 20px;                              background-color: {{9}} !important;          color: {{10}} !important; !important;          font-size: {{11}}px; !important;             white-space: nowrap;            overflow: hidden;           text-overflow: ellipsis;       }       .rbBbGenDyn .rbBtnDyn:hover {          background-color: {{12}} !important;          color: {{13}} !important;          -webkit-transition: background 1s ease;          -moz-transition: background 1s ease;          -o-transition: background 1s ease;          transition: background 1s ease;       }       .rbBbGenDyn .rbInfoBtnDyn{        position: absolute;        top: 5px;        right: -130px;        display: inline-block;       }    </style>    <div  class="rbBaseStyle rbBbGenDyn" >      <div class="rbBarWidth barDyn">        <p id="rbBottombarGenericNormalLeftClick" class="rbTextLeft rbDynLeftText rbDynText" >          {{14}}        </p>          <div id="rbBottombarGenericNormalRoiMiddlebutton" class ="rbClickable rbBtn rbBtnDyn"               link="{{15}}">           {{16}}         </div>              <p id="rbBottombarGenericNormalRightClick" class="rbTextRight rbDynRightText rbDynText" >                     {{17}}          </p>        <div class="rbInfoBtnDyn">          <div class="rb-btn-group" >            <button id="rbBottombarGenericNormalRoiHelp" class="rb-info-btn rb-info-btn-small rbClickable" link="http://www.rulebot.com">              ?            </button>            <button id="rbBottombarGenericNormalCloseClick" class="rb-info-btn rb-info-btn-small rbClickable" >              X            </button>                      </div>        </div>        </div>    </div></div>'



/****************************[[./templates/js/rbTemplBottombarGenericTwittershare.js]]*************************************/ 


trigger_fish.rbT.rbTemplBottombarGenericTwittershareHTML='<div  id="rbBottombarGenericTwittershareBaseContainer" >  <!-- -->  <link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/actwitty_ganga/css/common_styles.css">  <style>        .rbBmTwShareDyn{      position: fixed;      bottom: 0px;      left: 0px;         z-index: {{1}};          background: {{2}} !important;          border-bottom: 1px solid #18496A !important;    }    .rbBmTwShareDyn .barDyn{      width: {{3}}px;      height: {{4}}px;      vertical-align: middle;      position: relative;    }    .rbBmTwShareDyn .rbDynText     {       color:{{5}};       font-size: {{6}}px;       font-family: {{7}};       font-weight:{{8}};       white-space: nowrap;       overflow:hidden;     }          .rbBmTwShareDyn .rbDynLeftText{      position: absolute;      left:20px;       width:40%;      top: 10px;      text-align: center;      margin-right: 20px;     }          .rbBmTwShareDyn .rbDynRightText{      position: absolute;      right: 20px;       top: 10px;          width:40%;       text-align: center;         margin-left: 20px;     }     .rbBmTwShareDyn .rbBtnDyn {                          position: absolute;              width:100px;        left: 42%;        top: 0px;        overflow: hidden;        margin-right: 20px;         border: 0px;                           }         .rbBmTwShareDyn .rbInfoBtnDyn{      position: absolute;      top: 5px;      right: -130px;      display: inline-block;     }  </style>  <div class="rbBaseStyle rbBmTwShareDyn" >    <div class=\'rbIframeContent\'><!--<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>    <a href="https://twitter.com/share?text={{9}}" class="twitter-share-button" data-count="none" data-lang="en" data-size="large">Tweet this</a>--></div>    <div class="rbBarWidth barDyn">      <p  class="rbTextLeft rbDynLeftText rbDynText" >        {{10}}      </p>      <iframe class ="rbBtn rbIframe rbBtnDyn" >       </iframe>          <p  class="rbTextRight rbDynRightText rbDynText" >                   {{11}}        </p>      <div class="rbInfoBtnDyn">        <div class="rb-btn-group" >          <button id="rbBottombarGenericTwittershareRoiHelp" class="rb-info-btn rb-info-btn-small rbClickable" link="http://www.rulebot.com">            ?          </button>          <button id="rbBottombarGenericTwittershareCloseClick" class="rb-info-btn rb-info-btn-small rbClickable" >            X          </button>                    </div>      </div>      </div>    <script>            var base = document.getElementById(\'rbBottombarGenericTwittershareBaseContainer\');        if( base !== undefined){          var inner = base.getElementsByClassName(\'rbIframeContent\');              var iframe = base.getElementsByClassName(\'rbIframe\');          if( inner !== undefined && iframe !== undefined  ){            var ifrm = iframe[0];            ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;            if(ifrm !== undefined){              ifrm.document.open();              ifrm.document.write(inner[0].firstChild.nodeValue);              ifrm.document.close();                }          }        }    </script>  </div></div>         '



/****************************[[./templates/js/rbTemplTopbarGenericFblike.js]]*************************************/ 


trigger_fish.rbT.rbTemplTopbarGenericFblikeHTML='<div  id="rbTopbarGenericFblikeBaseContainer">  <!-- -->  <link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/actwitty_ganga/css/common_styles.css">  <style>    .rbTbFbLikeDyn{      position: fixed;      top: 0px;      left: 0px;         z-index: {{1}};          color: white;      font-size: {{2}}px;      font-family:\'{{3}}\';      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.5);          border: 1px solid {{4}};      background-color: {{5}};        }    .rbTbFbLikeDyn .barDyn{      width: {{6}}px;      height: {{7}}px;      vertical-align: middle;      position: relative;    }    .rbTbFbLikeDyn .rbDynText{      white-space: nowrap;      overflow:hidden;     }          .rbTbFbLikeDyn .rbDynLeftText{      position: absolute;      left:20px;       width:80%;      top: 10px;      text-align: center;      margin-right: 20px;     }      .rbTbFbLikeDyn .rbTbFbLikeRight{      position: absolute;      right:0px;       width:200px;          text-align: center;      margin: 0px;      padding: 0px;      overflow: hidden;      border: 0px;            }     .rbTbFbLikeDyn .rbInfoBtnDyn{      position: absolute;      top: 5px;      right: -130px;      display: inline-block;      overflow: hidden;      }      </style>  <div class="rbBaseStyle rbTbFbLikeDyn" >    <div class=\'rbIframeContent\'><!--<div id="fb-root"></div>        <script>          (function(d, s, id) {          var js, fjs = d.getElementsByTagName(s)[0];          if (d.getElementById(id)) return;          js = d.createElement(s); js.id = id;          js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";          fjs.parentNode.insertBefore(js, fjs);          }(document, "script", "facebook-jssdk"));        </script>        <div class="fb-like"             data-href="{{8}}"             data-send="true"             data-layout="button_count"             data-width="250px"             data-show-faces="false"             data-font="arial">        </div>--></div>    <div class="rbBarWidth barDyn">      <p id="rbBottombarGenericFblikeLeftClick" class="rbTextLeft rbDynLeftText rbDynText" >        {{9}}      </p>              <iframe class="rbIframe rbTbFbLikeRight">      </iframe>            <div class="rbInfoBtnDyn">        <div class="rb-btn-group" >          <button id="rbTopbarGenericFblikeRoiHelp" class="rb-info-btn rb-info-btn-small rbClickable" link="http://www.rulebot.com">            ?          </button>          <button id="rbTopbarGenericFblikeCloseClick" class="rb-info-btn rb-info-btn-small rbClickable" >            X          </button>                    </div>      </div>      </div>    <script>      var frameClass=\'rbIframeContent\';      var base = document.getElementById(\'rbTopbarGenericFblikeBaseContainer\');      if( base !== undefined){        var inner = base.getElementsByClassName(\'rbIframeContent\');            var iframe = base.getElementsByClassName(\'rbIframe\');        if( inner !== undefined && iframe !== undefined  ){          var ifrm = iframe[0];          ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;          if(ifrm !== undefined){            ifrm.document.open();            ifrm.document.write(inner[0].firstChild.nodeValue);            ifrm.document.close();              }        }      }    </script>  </div></div>'



/****************************[[./templates/js/rbTemplTopbarGenericTwitterfollow.js]]*************************************/ 


trigger_fish.rbT.rbTemplTopbarGenericTwitterfollowHTML=' <div id="rbTopbarGenericTwitterfollowBaseContainer">    <!-- -->    <link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/actwitty_ganga/css/common_styles.css">    <style>            .rbTpTwFollowDyn{        position: fixed;        top: 0px;        left: 0px;           z-index: {{1}};            background: {{2}} !important;            border-bottom: 1px solid #18496A !important;      }      .rbTpTwFollowDyn .barDyn{        width: {{3}}px;        height: {{4}}px;        vertical-align: middle;        position: relative;      }      .rbTpTwFollowDyn .rbDynText       {         color:{{5}};         font-size: {{6}}px;         font-family: {{7}};         font-weight:{{8}};         white-space: nowrap;         overflow:hidden;       }              .rbTpTwFollowDyn .rbDynLeftText{        position: absolute;        left:20px;         width:40%;        top: 10px;        text-align: center;        margin-right: 20px;       }              .rbTpTwFollowDyn .rbDynRightText{        position: absolute;        right: 20px;         top: 10px;            width:30%;         text-align: center;           margin-left: 20px;       }       .rbTpTwFollowDyn .rbBtnDyn {                              position: absolute;                width:180px;          left: 42%;          top: 0px;          margin-right: 20px;               overflow: hidden;            border: 0px;                       }             .rbTpTwFollowDyn .rbInfoBtnDyn{        position: absolute;        top: 5px;        right: -130px;        display: inline-block;       }    </style>    <div  class="rbBaseStyle rbTpTwFollowDyn" >      <div class=\'rbIframeContent\'><!--<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>      <a  data-show-count="false" data-button = "blue" class="twitter-follow-button" href="https://twitter.com/{{9}}" data-size="large">Follow {{10}} </a>--></div>      <div class="rbBarWidth barDyn">        <p  class="rbTextLeft rbDynLeftText rbDynText" >          {{11}}        </p>        <iframe class ="rbBtn rbIframe rbBtnDyn" >         </iframe>              <p  class="rbTextRight rbDynRightText rbDynText" >                     {{12}}          </p>        <div class="rbInfoBtnDyn">          <div class="rb-btn-group" >            <button id="rbTopbarGenericTwitterfollowRoiHelp" class="rb-info-btn rb-info-btn-small rbClickable" link="http://www.rulebot.com">              ?            </button>            <button id="rbTopbarGenericTwitterfollowCloseClick" class="rb-info-btn rb-info-btn-small rbClickable" >              X            </button>                      </div>        </div>        </div>      <script>            var base = document.getElementById(\'rbTopbarGenericTwitterfollowBaseContainer\');        if( base !== undefined){          var inner = base.getElementsByClassName(\'rbIframeContent\');              var iframe = base.getElementsByClassName(\'rbIframe\');          if( inner !== undefined && iframe !== undefined  ){            var ifrm = iframe[0];            ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;            if(ifrm !== undefined){              ifrm.document.open();              ifrm.document.write(inner[0].firstChild.nodeValue);              ifrm.document.close();                }          }        }      </script>    </div>    </div>'



/****************************[[./templates/js/rbTemplTopbarGenericNormal.js]]*************************************/ 


trigger_fish.rbT.rbTemplTopbarGenericNormalHTML='<div id="rbTopbarGenericNormalBaseContainer">  <!-- -->  <link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/actwitty_ganga/css/common_styles.css">  <style>        .rbTpGenDyn{      position: fixed;      top: 0px;      left: 0px;         z-index: {{1}};          background: {{2}} !important;      border-top: 1px solid #CC412A !important;      border-bottom: 1px solid #CC412A !important;    }    .rbTpGenDyn .barDyn{      width: {{3}}px;      height: {{4}}px;      vertical-align: middle;      position: relative;    }    .rbTpGenDyn .rbDynText     {       color:{{5}};       font-size: {{6}}px;       font-family: {{7}};       font-weight:{{8}};       white-space: nowrap;       overflow:hidden;     }          .rbTpGenDyn .rbDynLeftText{      position: absolute;      left:20px;       width:40%;      top: 10px;      text-align: center;      margin-right: 20px;     }          .rbTpGenDyn .rbDynRightText{      position: absolute;      right: 20px;       top: 10px;          width:40%;       text-align: center;         margin-left: 20px;     }     .rbTpGenDyn .rbBtnDyn {          padding: 5px;          text-shadow: none !important;        border: 1px solid #BBB;        border: 1px solid #BBB;        border-color: #E6E6E6 #E6E6E6 #BFBFBF;        border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);        -webkit-border-radius: 4px;        -moz-border-radius: 4px;        border-radius: 4px;        -webkit-transition: background 1s ease;        -moz-transition: background 1s ease;        -o-transition: background 1s ease;        transition: background 1s ease;                    position: absolute;              width:100px;        left: 42%;        top:7%;        height:20px;        margin-right: 20px;                            background-color: {{9}} !important;        color: {{10}} !important; !important;        font-size: {{11}}px;         text-align: center;          white-space: nowrap;          overflow: hidden;         text-overflow: ellipsis;     }     .rbTpGenDyn .rbBtnDyn:hover {        background-color: {{12}} !important;        color: {{13}} !important;        -webkit-transition: background 1s ease;        -moz-transition: background 1s ease;        -o-transition: background 1s ease;        transition: background 1s ease;     }     .rbTpGenDyn .rbInfoBtnDyn{      position: absolute;      top: 5px;      right: -130px;      display: inline-block;     }  </style>  <div class="rbBaseStyle rbTpGenDyn" >    <div class="rbBarWidth barDyn">      <p id="rbTopbarGenericNormalLeftClick" class="rbTextLeft rbDynLeftText rbDynText" >        {{14}}      </p>        <div id="rbTopbarGenericNormalRoiMiddlebutton" class ="rbClickable rbBtn rbBtnDyn"             link="{{15}}">         {{16}}       </div>          <p id="rbTopbarGenericNormalRightClick" class="rbTextRight rbDynRightText rbDynText" >                   {{17}}        </p>      <div class="rbInfoBtnDyn">        <div class="rb-btn-group" >          <button id="rbTopbarGenericNormalRoiHelp" class="rb-info-btn rb-info-btn-small rbClickable" link="http://www.rulebot.com">            ?          </button>          <button id="rbTopbarGenericNormalCloseClick" class="rb-info-btn rb-info-btn-small rbClickable" >            X          </button>                    </div>      </div>      </div>  </div></div>'



/****************************[[./templates/js/rbTemplTopbarGenericTwittershare.js]]*************************************/ 


trigger_fish.rbT.rbTemplTopbarGenericTwittershareHTML='<div id="rbTopbarGenericTwittershareBaseContainer">  <!-- -->  <link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/actwitty_ganga/css/common_styles.css">  <style>        .rbTpTwShareDyn{      position: fixed;      top: 0px;      left: 0px;         z-index: {{1}};          background: {{2}} !important;          border-bottom: 1px solid #18496A !important;    }    .rbTpTwShareDyn .barDyn{      width: {{3}}px;      height: {{4}}px;      vertical-align: middle;      position: relative;    }    .rbTpTwShareDyn .rbDynText     {       color:{{5}};       font-size: {{6}}px;       font-family: {{7}};       font-weight:{{8}};       white-space: nowrap;       overflow:hidden;     }          .rbTpTwShareDyn .rbDynLeftText{      position: absolute;      left:20px;       width:40%;      top: 10px;      text-align: center;      margin-right: 20px;     }          .rbTpTwShareDyn .rbDynRightText{      position: absolute;      right: 20px;       top: 10px;          width:40%;       text-align: center;         margin-left: 20px;     }     .rbTpTwShareDyn .rbBtnDyn {                          position: absolute;              width:100px;        left: 42%;        top: 0px;        overflow: hidden;        margin-right: 20px;          border: 0px;                          }         .rbTpTwShareDyn .rbInfoBtnDyn{      position: absolute;      top: 5px;      right: -130px;      display: inline-block;     }  </style>  <div class="rbBaseStyle rbTpTwShareDyn" >    <div class=\'rbIframeContent\'><!--<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>    <a href="https://twitter.com/share?text={{9}}" class="twitter-share-button" data-count="none" data-lang="en" data-size="large">Tweet this</a>--></div>    <div class="rbBarWidth barDyn">      <p  class="rbTextLeft rbDynLeftText rbDynText" >        {{10}}      </p>      <iframe class ="rbBtn rbIframe rbBtnDyn" >       </iframe>          <p  class="rbTextRight rbDynRightText rbDynText" >                   {{11}}        </p>      <div class="rbInfoBtnDyn">        <div class="rb-btn-group" >          <button id="rbTopbarGenericTwittershareRoiHelp" class="rb-info-btn rb-info-btn-small rbClickable" link="http://www.rulebot.com">            ?          </button>          <button id="rbTopbarGenericTwittershareCloseClick" class="rb-info-btn rb-info-btn-small rbClickable" >            X          </button>                    </div>      </div>      </div>    <script>            var base = document.getElementById(\'rbTopbarGenericTwittershareBaseContainer\');        if( base !== undefined){          var inner = base.getElementsByClassName(\'rbIframeContent\');              var iframe = base.getElementsByClassName(\'rbIframe\');          if( inner !== undefined && iframe !== undefined  ){            var ifrm = iframe[0];            ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;            if(ifrm !== undefined){              ifrm.document.open();              ifrm.document.write(inner[0].firstChild.nodeValue);              ifrm.document.close();                }          }        }    </script>  </div></div>         '



/****************************[[./templates/js/rbTemplSupportOlarkNormal.js]]*************************************/ 


trigger_fish.rbT.rbTemplSupportOlarkNormalHTML='<div id="rbChatGenericNormalBaseContainer">	<!-- -->	<script data-cfasync="false" type=\'text/javascript\'>	window.olark||(function(c){var f=window,d=document,l=f.location.protocol=="https:"?"https:":"http:",z=c.name,r="load";var nt=function(){f[z]=function(){(a.s=a.s||[]).push(arguments)};var a=f[z]._={},q=c.methods.length;while(q--){(function(n){f[z][n]=function(){f[z]("call",n,arguments)}})(c.methods[q])}a.l=c.loader;a.i=nt;a.p={0:+new Date};a.P=function(u){a.p[u]=new Date-a.p[0]};function s(){a.P(r);f[z](r)}f.addEventListener?f.addEventListener(r,s,false):f.attachEvent("on"+r,s);var ld=function(){function p(hd){hd="head";return["<",hd,"></",hd,"><",i,\' onl\' + \'oad="var d=\',g,";d.getElementsByTagName(\'head\')[0].",j,"(d.",h,"(\'script\')).",k,"=\'",l,"//",a.l,"\'",\'"\',"></",i,">"].join("")}var i="body",m=d[i];if(!m){return setTimeout(ld,100)}a.P(1);var j="appendChild",h="createElement",k="src",n=d[h]("div"),v=n[j](d[h](z)),b=d[h]("iframe"),g="document",e="domain",o;n.style.display="none";m.insertBefore(n,m.firstChild).id=z;b.frameBorder="0";b.id=z+"-loader";if(/MSIE[ ]+6/.test(navigator.userAgent)){b.src="javascript:false"}b.allowTransparency="true";v[j](b);try{b.contentWindow[g].open()}catch(w){c[e]=d[e];o="javascript:var d="+g+".open();d.domain=\'"+d.domain+"\';";b[k]=o+"void(0);"}try{var t=b.contentWindow[g];t.write(p());t.close()}catch(x){b[k]=o+\'d.write("\'+p().replace(/"/g,String.fromCharCode(92)+\'"\')+\'");d.close();\'}a.P(2)};ld()};nt()})({loader: "static.olark.com/jsclient/loader0.js",name:"olark",methods:["configure","extend","declare","identify"]});	olark.identify({{1}});	olark.configure(\'box.width\', 200);	olark.configure(\'box.height\', 100);	</script></div>'



/****************************[[./templates/js/rbTemplFeedbackUservoiceNormal.js]]*************************************/ 


trigger_fish.rbT.rbTemplFeedbackUservoiceNormalHTML='<div id="rbUservoiceGenericNormalBaseContainer">		<!-- -->	<script>	  var uvOptions = {};	  (function() {	    var uv = document.createElement(\'script\'); uv.type = \'text/javascript\'; uv.async = true;	    uv.src = (\'https:\' == document.location.protocol ? \'https://\' : \'http://\') + \'widget.uservoice.com/QteXP0WAzCiaFH1O2obGg.js\';	    var s = document.getElementsByTagName(\'script\')[0]; s.parentNode.insertBefore(uv, s);	   })();	</script></div>'



/****************************[[./templates/js/rbTemplModalGenericNormal.js]]*************************************/ 


trigger_fish.rbT.rbTemplModalGenericNormalHTML='<!-- --><style>#rbModalGenericNormalTranblockContainer {      visibility: visible;     position: fixed;      left: 0px;      top: 0px;       width:100%;       height:100%;        z-index:{{1}};  opacity:0.6;  filter:alpha(opacity=60);  background-color:black; }#rbModalGenericNormalBaseContainer{      visibility: visible;     position: fixed;      left: 0px;      top: 0px;       width:100%;       height:100%;  z-index:{{2}}; }#rbModalGenericNormalSubsubContainer{      width:500px;   height: 400px;  background-color:{{3}};    border:8px solid rgba(0, 0, 0, .7);;  position: absolute;     top: 50% ;  left: 50% ;  margin-top: -220px ;   margin-left: -250px;  padding : 15px;  -webkit-border-radius: 5px;  -moz-border-radius: 5px;  border-radius: 5px;  }.rbModalContainer{      width: 500px;   height: 400px;    border:1px solid #a3a3a3;     position: fixed;  -webkit-border-radius: 5px;  -moz-border-radius: 5px;  border-radius: 5px;    }.rbModalCover{  position: absolute;  top: 0px;  left: 0px;  width: 500px;   height: 400px;    padding: 0px;  display: block;  background: #ffffff url(\'{{4}}\') no-repeat right top;             filter:alpha(opacity=60);  background-size:500px 400px;  background-repeat:no-repeat;  opacity:0.6;  -webkit-border-top-left-radius: 5px;  -webkit-border-top-right-radius: 5px;  -moz-border-radius-topleft: 5px;  -moz-border-radius-topright: 5px;  border-top-left-radius: 5px;  border-top-right-radius: 5px;  z-index: -1;  }.rbModalHead{  background-color:{{5}};      width: 100%;  height: 50px;      position: relative;  display: block;  -webkit-border-top-left-radius: 5px;  -webkit-border-top-right-radius: 5px;  -moz-border-radius-topleft: 5px;  -moz-border-radius-topright: 5px;  border-top-left-radius: 5px;  border-top-right-radius: 5px;  z-index: 1;   }  .rbModalHead .rbModalClose{    position: absolute;    top: 4px;    right: 4px;    display: inline-block;    font-size: 14px;    font-weight: normal;    color: white;    cursor: pointer;    z-index: 1;  }  .rbModalClose:hover{    color: #aaa;  }.rbModalHeader{  top:0;  left:0;  position: absolute;    white-space: nowrap;    overflow: hidden;   text-overflow: ellipsis;  color:{{6}};  width:80%;   height:30px;  font-size:{{7}}px;  font-family:{{8}};   overflow:hidden;  border-top-left-radius:5px;  border-top-right-radius:5px;  padding:5px;  padding-top: 10px;  text-shadow:1px 1px {{9}};}.rbOffer{  margin-top: 10px;  width: 100%;  height: 200px;  display: block;    z-index: 1;}.rbModalOffer{  overflow: hidden;   text-overflow: ellipsis;  font-size: {{10}}px;    line-height: {{11}}px;    color:{{12}};   background: rgba(255,255,255,0.1) }.rbModalButton{  bottom: 2%;  right: 2%;  position:absolute;  width: 160px;  height: 30px;  text-align: center;    border:4px solid {{13}};  background-color: {{14}};    color:{{15}};  font-size: {{16}}px;  border-radius:5px;  padding: 5px;    font-weight: normal;  display: block;  float: right;  margin-right: 10px;  cursor:pointer;}</style><div id="rbModalGenericNormalTranblockContainer"></div> <div id="rbModalGenericNormalBaseContainer">   <div id="rbModalGenericNormalSubContainer">      <div id="rbModalGenericNormalSubsubContainer">                  <div class="rbModalContainer" >          <div class="rbModalCover"></div>            <div class="rbModalHead">              <div class="rbModalHeader">                 {{17}}              </div>              <div id="rbModalGenericNormalCloseClick" class="rbModalClose  rbClickable" >                X              </div>                        </div>            <div class="rbOffer">              <p class="rbModalOffer">                 {{18}}              </p>            </div>                     <div  class="rbModalButton">               <div  id="rbModalGenericNormalRoiClickbutton" class="rbClickable" link= "{{19}}" class="rbClickable" >                {{20}}                             </div>             </div>                 </div></div>  </div></div>'



/****************************[[helpers.js]]*************************************/ 


"use strict";

// Templ Sys , Actor and Event Varibales

trigger_fish.rbT.currentSystemVar ={};// {'browser':{'name':'Chrome','version':'1.2','name2':{'myname':'Amartya'}}};
trigger_fish.rbT.currentActorVar = {};
trigger_fish.rbT.currentEventVar = {};


//templ related timers

trigger_fish.rbT.templTimers= {
 'templ.displaytimer':'false',
 'templ.templduration':'100'

};

//Array of Global HTML
trigger_fish.rbT.globalHTMLQ = new Array(10);

//HTML for Appending to the page
trigger_fish.rbT.htmlGlobalStruct ={

 'trigger_fish.rbT.html' : 'undefined' ,
 'trigger_fish.rbT.type' : 'undefined' ,
 'trigger_fish.rbT.roiServerMsg' : 'undefined',   
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
    'trigger_fish.rbT.custom.displayLock' :'false',
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

// find the Blank Index in Global HTML Q
trigger_fish.rbT.findEmptyIndexInGlobalHTMLQ = function()
{
   var i = 0;
   for(i=0;i<trigger_fish.rbT.globalHTMLQ.length;i++)
   {
      if(trigger_fish.rbT.globalHTMLQ[i] == undefined)
       {
          break;
       } 
   }

   return i;
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
      if(trigger_fish.rbT.globalDelayQ[j] === undefined)
      {
        foundActionIndex =true; 
        break;
       }  

    }
 
    if(foundActionIndex === true && foundTimerIndex === false)
     {
        trigger_fish.rbT.globalDelayQTimeVal.push('undefined');
        i = i+1;
     } 

     else if(foundActionIndex === false && foundTimerIndex === true)
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

   if(pos === 'topbar') 
   {
     trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.topbar.displayLock'] = value; 
   }

   else if(pos === 'bottombar') 
   {
     trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.bottombar.displayLock'] = value; 
   }

   else if(pos === 'modal') 
   {
     trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.modal.displayLock'] = value; 
   }

   else if(pos === 'chat') 
   {
     trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.chat.displayLock'] = value; 
   }

  else if(pos === 'feedback') 
   {
     trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.feedback.displayLock'] = value; 
   }

   else if(pos == 'custom')
   {
      trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.custom.displayLock'] = value; 
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

                           trigger_fish.rbT.currentSystemVar = trigger_fish.rbTSystemVar.getProperty();
                           trigger_fish.rbT.currentActorVar = trigger_fish.rbTActor.getProperties();
                           trigger_fish.rbT.currentEventVar = trigger_fish.rbTAPP.getTransVar();

                             
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
     

      if(pos === 'topbar' && trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.topbar.displayLock'] 
        == true ) 
       {
         ret= true;
          
       }
      else if(pos === 'bottombar' && trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.bottombar.displayLock'] 
        == true ) 
       {
         ret= true;
        }
      else if(pos === 'modal' && trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.modal.displayLock'] 
        == true )
      {
         //TODO
      }

     else if(pos === 'chat' && trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.chat.displayLock'] 
        == true )
      {
         ret= true;
      }

      else if(pos === 'custom' && trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.custom.displayLock'] 
        == true )
      {
         ret= true;
      }


      else if(pos === 'feedback' && trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.feedback.displayLock'])
      {
         ret= true;

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
     
  console.log(string);
  trigger_fish.rbTAPP.log({"message": string,"log":true});

  trigger_fish.rbTAPP.reportError({"message":string,"server":true});

  //console.log(string);

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
     if ( idMatch[3] === 'Close')
     {
        trigger_fish.rbT.eventHandler.closeTempl(idMatch);
     }
  
    else if ( idMatch[3] === 'Roi' )
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


     else if(tempMatch[0] === 'modal')
     {

         var id = "rb" + trigger_fish.rbT.makeFirstLetterCapital(tempMatch[0])+trigger_fish.rbT.makeFirstLetterCapital(tempMatch[2])+trigger_fish.rbT.makeFirstLetterCapital(tempMatch[4])+"BaseContainer";
         var transId = "rb" + trigger_fish.rbT.makeFirstLetterCapital(tempMatch[0])+trigger_fish.rbT.makeFirstLetterCapital(tempMatch[2])+trigger_fish.rbT.makeFirstLetterCapital(tempMatch[4])+"TranblockContainer";
         var transBase = document.getElementById(transId);
         if(transBase != undefined)
         transBase.parentNode.removeChild(transBase);
     } 
     
       
        
        trigger_fish.rbT.setTemplatesDisplayLockFlags(tempMatch[0],false);
        
        var Base = document.getElementById(id);

         if( typeof Base === undefined)
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
      if(idMatch[0] === 'Topbar' || idMatch[0] === 'Bottombar' )

     {   

         var id= "rb" + idMatch[0]+idMatch[1]+idMatch[2]+"BaseContainer";


     }

     else if(idMatch[0] === 'Modal')
     {

         var id = "rb" + idMatch[0]+idMatch[1]+idMatch[2]+"BaseContainer";
         var transId = "rb" + idMatch[0]+idMatch[1]+idMatch[2]+"TranblockContainer";
         var transBase = document.getElementById(transId);
         transBase.parentNode.removeChild(transBase);
     } 


      var base = document.getElementById(id);

      
      if(base)
      {
         base.parentNode.removeChild(base);

         trigger_fish.rbT.setTemplatesDisplayLockFlags(trigger_fish.rbT.makeFirstLetterSmall(idMatch[0]),false);
         
      }else{
            trigger_fish.rbT.sendErrorToRBServer("Not able to find template Base for Normal X Delete ");

      }


  },

//******************************************************************************************************
  
  roiFromTemplClick:function(idMatch,evt){
    
    var link = evt.target.getAttribute('link');            
    window.open(link, '_blank');
    
    params={};

   params.button = "";
    
    for(var i=0 ; i<idMatch.length ; i++)
    {  
           params.button = params.button + idMatch[i]

    }

    params.button = params.button + " " +"Clicked"
    
// INTEGRATION_ENABLE     

         
        // trigger_fish.rbTServerChannel.conversion(params,trigger_fish.rbT.eventHandler.roiCallBackfromServerResponse);
        //TODO


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

trigger_fish.rbT.getTemplateHTMLByNameInternal = function(type,api){
	
    

            	var html = trigger_fish.rbT[trigger_fish.rbT.templateLib[type][api]];
                
                if(html != undefined)  
                {     
                     return html;
                }     
                else
                {
                	 trigger_fish.rbT.sendErrorToRBServer("Unsupported Templ");
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

trigger_fish.rbT.applyHtmltoPageInternal = function(html,type){

  var isPosOccupied = trigger_fish.rbT.isTemplPosOccupied(type);
   
   if(isPosOccupied)
   {
      trigger_fish.rbT.sendErrorToRBServer("+++Postion Occupied by Another Template");
   }else{
	
      if(html.length){

    	 jQuery('body').append(html);
    	// document.body.innerHTML = document.body.innerHTML+html;
    	}else{

             trigger_fish.rbT.sendErrorToRBServer("Bad variable array error for template");
    	 			 return "";
    	 }
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

//***************************************************************************************
trigger_fish.rbT.applyHtmlToPage= function(){
   
    var html = trigger_fish.rbT.htmlGlobalStruct['trigger_fish.rbT.html'];
    var type = trigger_fish.rbT.htmlGlobalStruct['trigger_fish.rbT.type']; 
    var servermsg = trigger_fish.rbT.htmlGlobalStruct['trigger_fish.rbT.roiServerMsg']; 

    if (trigger_fish.rbT.isTemplateGoodToApply(html)){
        trigger_fish.rbT.applyHtmltoPage(html);
        trigger_fish.rbT.enableClickHandling();
        // trigger_fish.rbT.enableTimeOutHadnling(templateName,trigger_fish.rbT.templTimers['templ.templduration']*1000);

        params.display = servermsg + " " +"Display " + "Success";

        //trigger_fish.rbTServerChannel.conversion(params,trigger_fish.rbT.eventHandler.roiCallBackfromServerResponse);
    }
};

//*************************************************************************************

trigger_fish.rbT.invokeActionScriptInternal=function(action){

/*

      //TODO get the OS version here based on that action display

*/
    try 
    {
        if(1) // Check for Service Type Enhancement
         {   
         
              params= {};  
              
              trigger_fish.rbT.init();

              if(action.hasOwnProperty('timers'))
               { 
                  if (action.timers.hasOwnProperty('delay'))
                  {
                      delayVal = action.timers.delay;
                  }
                  else
                  {
                     delayVal = 0 ;
                  } 
               }
               else
               {
                    delayVal = 0 ;
               } 

              if(delayVal==0)  //check for delay value to display templates
                {
                    
                    var actionParams = action.params;
                     
                    var type=action.desc.type; 

                    var api = action.desc.api;

                    var servermsg = type + "."+api;

                    var custom = undefined;

                    var isPosOccupied = trigger_fish.rbT.isTemplPosOccupied(type);

                    if(isPosOccupied)
                    {

                        trigger_fish.rbT.sendErrorToRBServer("----Postion Occupied by Another Template");
                    }
                    else
                    {
                            if(type != 'custom' && api != 'html')
                        
                            {
                              var html = trigger_fish.rbT.getTemplateHTMLByName(type,api);
                         
                            }
                            else{

                              var html = undefined;    
                            }
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

                      //   for (var key in actionParams) {             
                      //     if(actionParams.hasOwnProperty(key)){  
                         //     if( 'Zindex' == actionParams[key] ) {               
                          //      actionParams[key] =  trigger_fish.rbT.findZIndex()+5;
                         //     }
                         //  }              
                        // } 

                        if(type != 'custom' && api != 'html'){
                           html = trigger_fish.rbT.getTemplateApplyVars(html, actionParams);
                       

                        }else
                        {
                           html = actionParams.html;
                        }
                        
                        if (trigger_fish.rbT.isTemplateGoodToApply(html)){
                          trigger_fish.rbT.applyHtmltoPage(html,type);
                          trigger_fish.rbT.enableClickHandling();
                         // trigger_fish.rbT.enableTimeOutHadnling(templateName,trigger_fish.rbT.templTimers['templ.templduration']*1000);
                           
                           trigger_fish.rbT.setTemplatesDisplayLockFlags(type,true);

                           params.display = servermsg + " " +"Display " + "Success";

                           //trigger_fish.rbTServerChannel.conversion(params,trigger_fish.rbT.eventHandler.roiCallBackfromServerResponse);
                        }
                    }
              }else{

                        trigger_fish.rbT.handlingOfDelayForTemplDisplay(action);

              }   
          }else{

             // Report to Server for If Service Type Wrong

          }

      }catch(e){

                trigger_fish.rbT.sendErrorToRBServer(e.message);

      }    

    };   


/****************************[[interfaces.js]]*************************************/ 


"use strict";
trigger_fish.rbT.isInitialized = function(){
	return trigger_fish.rbT.inited;
};
//------------------------------------------
trigger_fish.rbT.getTemplateHTMLByName = function(type,api){

	if (!trigger_fish.rbT.isInitialized()){
		return "";
	}
	
	if ( typeof name === undefined ){
		trigger_fish.rbT.sendErrorToRBServer("improper access of interface getTemplateHTMLByName");
		return "";
	}
	return trigger_fish.rbT.getTemplateHTMLByNameInternal(type,api);
};
//------------------------------------------
trigger_fish.rbT.getTemplateApplyVars = function(html,vars){
	if (!trigger_fish.rbT.isInitialized()){
		return "";
	}

	if ( typeof html === undefined || typeof vars === undefined ){
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
	if ( typeof html === undefined ){
		trigger_fish.rbT.sendErrorToRBServer("improper access of interface isTemplateGoodToApply");
		return "";
	}
	return trigger_fish.rbT.isTemplateGoodToApplyInternal(html);
};

//------------------------------------------
trigger_fish.rbT.applyHtmltoPage = function(html,type){
	if (!trigger_fish.rbT.isInitialized()){
		return "";
	}
	if ( typeof html === undefined ){
		trigger_fish.rbT.sendErrorToRBServer("improper access of interface applyHtmltoPage");
		return "";
	}
	return trigger_fish.rbT.applyHtmltoPageInternal(html,type);
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
	if ( typeof templateName === undefined ){
		trigger_fish.rbT.sendErrorToRBServer("improper access of interface enableTimeOutHadnling");
		return "";
	}

	trigger_fish.rbT.enableTimeOutHadnlingInternal(templateName,timerValue);
}

//---------------------------------------------------------------

trigger_fish.rbT.invokeActionScript = function(action)
{

	if ( typeof action === undefined ){
		trigger_fish.rbT.sendErrorToRBServer("Invalid params in rule Json");
		return "";
	}

	else{
          trigger_fish.rbT.invokeActionScriptInternal(action); 
	}

	
}

