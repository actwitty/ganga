trigger_fish.rbT.rbTemplBottombarGenericTwittershareHTML='<div  id="rbBottombarGenericTwittershareBaseContainer" >  <!-- -->  <link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/actwitty_ganga/css/common_styles.css">  <style>        .rbBmTwShareDyn{      position: fixed;      bottom: 0px;      left: 0px;         z-index: {{1}};          background: {{2}} !important;          border-bottom: 1px solid #18496A !important;    }    .rbBmTwShareDyn .barDyn{      width: {{3}}px;      height: {{4}}px;      vertical-align: middle;      position: relative;    }    .rbBmTwShareDyn .rbDynText     {       color:{{5}};       font-size: {{6}}px;       font-family: {{7}};       font-weight:{{8}};       white-space: nowrap;       overflow:hidden;     }          .rbBmTwShareDyn .rbDynLeftText{      position: absolute;      left:20px;       width:40%;      top: 10px;      text-align: center;      margin-right: 20px;     }          .rbBmTwShareDyn .rbDynRightText{      position: absolute;      right: 20px;       top: 10px;          width:40%;       text-align: center;         margin-left: 20px;     }     .rbBmTwShareDyn .rbBtnDyn {                          position: absolute;              width:100px;        left: 42%;        top: 0px;        overflow: hidden;        margin-right: 20px;                           }         .rbBmTwShareDyn .rbInfoBtnDyn{      position: absolute;      top: 5px;      right: -130px;      display: inline-block;     }  </style>  <div class="rbBaseStyle rbBmTwShareDyn" >    <div class=\'rbIframeContent\'><!--<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>    <a href="https://twitter.com/share?text={{9}}" class="twitter-share-button" data-count="none" data-lang="en" data-size="large">Tweet this</a>--></div>    <div class="rbBarWidth barDyn">      <p  class="rbTextLeft rbDynLeftText rbDynText" >        {{10}}      </p>      <iframe class ="rbBtn rbIframe rbBtnDyn" >       </iframe>          <p  class="rbTextRight rbDynRightText rbDynText" >                   {{11}}        </p>      <div class="rbInfoBtnDyn">        <div class="rb-btn-group" >          <button id="rbBottombarGenericTwittershareRoiHelp" class="rb-info-btn rb-info-btn-small rbClickable" link="http://www.rulebot.com">            ?          </button>          <button id="rbBottombarGenericTwittershareCloseClick" class="rb-info-btn rb-info-btn-small rbClickable" >            X          </button>                    </div>      </div>      </div>    <script>            var base = document.getElementById(\'rbBottombarGenericTwittershareBaseContainer\');        if( base !== undefined){          var inner = base.getElementsByClassName(\'rbIframeContent\');              var iframe = base.getElementsByClassName(\'rbIframe\');          if( inner !== undefined && iframe !== undefined  ){            var ifrm = iframe[0];            ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;            if(ifrm !== undefined){              ifrm.document.open();              ifrm.document.write(inner[0].firstChild.nodeValue);              ifrm.document.close();                }          }        }    </script>  </div></div>         '
