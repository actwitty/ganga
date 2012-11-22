/**
 * See (http://jquery.com/).
 * @name jQuery
 * @class 
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */
 
/**
 * See (http://jquery.com/)
 * @name fn
 * @class 
 * See the jQuery Library  (http://jquery.com/) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf jQuery
 */
/** Start Rule Bot APP 
* @param {string} appid App ID for rulebot account
* @param {string} accid Account ID for rulebot account
* 
* @return void
*
*/
(function StartRBTApp(appid,accid){
  trigger_fish.rbTAPP.log("Initializing RBT APP with AppID = " + appid + " Account ID = " + accid);
  function releasePreInitCalls(w)
  {
    if (w.rb && w.rb.q.length) {
      var l = w.rb.q;
      w.rb = new RBT();
      for (var c in l) {
        var o = l[c];
        rb[o.t](o.a,o.b,o.c);
      }    
    }
  }
  try {
    if (!appid || !accid || appid == "" || accid == "") {
      throw new Error("App-id, Account-ID are not mentioned")
    } else {
      // if everything seems fine, then set app/acc id and initialize rbTAPP.
      trigger_fish.rbTAPP.setAppID(appid);
      trigger_fish.rbTAPP.setAccountID(accid);
      trigger_fish.rbTUtils.includeJQIfNeeded();
      releasePreInitCalls(window);
    }
  } catch (e) {
    trigger_fish.rbTAPP.reportError({"exception": e.message, 
                                     "message"  : "App init/exec failed",
                                     "appid"    : appid || "",
                                     "accid"    : accid || ""
                                    });
  }
})(_rbTK[0][1], _rbTK[1][1]);

