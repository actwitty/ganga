trigger_fish.rbT.rbTemplBottombarGenericNormalHTML='<div id="rbBottombarGenericNormalBaseContainer">    <!-- -->    <link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/actwitty_ganga/css/common_styles.css">    <style>      .rbBbGenDyn{        position: fixed;        bottom: 0px;        left: 0px;           z-index: {{1}};            background: {{2}} !important;        border-top: 1px solid #333 !important;        border-bottom: 1px solid #333 !important;      }      .rbBbGenDyn .barDyn{        width: {{3}}px;        height: {{4}}px;        vertical-align: middle;        position: relative;      }      .rbBbGenDyn .rbDynText       {         color:{{5}};         font-size: {{6}}px;         font-family: {{7}};         font-weight:{{8}};         white-space: nowrap;         overflow:hidden;       }              .rbBbGenDyn .rbDynLeftText{        position: absolute;        left:20px;         width:40%;        top: 10px;        text-align: center;        margin-right: 20px;       }              .rbBbGenDyn .rbDynRightText{        position: absolute;        right: 20px;         top: 10px;            width:40%;         text-align: center;           margin-left: 20px;       }       .rbBbGenDyn .rbBtnDyn {                padding: 12px 15px 12px;          text-shadow: none !important;          border-right: 1px solid #333;          border-left: 1px solid #333;          -webkit-transition: background 1s ease;          -moz-transition: background 1s ease;          -o-transition: background 1s ease;          transition: background 1s ease;                      position: absolute;                width:100px;          left: 42%;          top: 0;          margin-right: 20px;                              background-color: {{9}} !important;          color: {{10}} !important; !important;          font-size: {{11}}px; !important;             white-space: nowrap;            overflow: hidden;           text-overflow: ellipsis;       }       .rbBbGenDyn .rbBtnDyn:hover {          background-color: {{12}} !important;          color: {{13}} !important;          -webkit-transition: background 1s ease;          -moz-transition: background 1s ease;          -o-transition: background 1s ease;          transition: background 1s ease;       }       .rbBbGenDyn .rbInfoBtnDyn{        position: absolute;        top: 5px;        right: -130px;        display: inline-block;       }    </style>    <div  class="rbBaseStyle rbBbGenDyn" >      <div class="rbBarWidth barDyn">        <p id="rbBottombarGenericNormalLeftClick" class="rbTextLeft rbDynLeftText rbDynText" >          {{14}}        </p>          <div id="rbBottombarGenericNormalRoiMiddlebutton" class ="rbClickable rbBtn rbBtnDyn"               link="{{15}}">           {{16}}         </div>              <p id="rbBottombarGenericNormalRightClick" class="rbTextRight rbDynRightText rbDynText" >                     {{17}}          </p>        <div class="rbInfoBtnDyn">          <div class="rb-btn-group" >            <button id="rbBottombarGenericNormalRoiHelp" class="rb-info-btn rb-info-btn-small rbClickable" link="http://www.rulebot.com">              ?            </button>            <button id="rbBottombarGenericNormalCloseClick" class="rb-info-btn rb-info-btn-small rbClickable" >              X            </button>                      </div>        </div>        </div>    </div></div>'
