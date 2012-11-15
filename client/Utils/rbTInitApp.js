/** Start Rule Bot APP 
* @param {string} appid App ID for rulebot account
* @param {string} accid Account ID for rulebot account
* 
* @return void
*
*/
(function StartRBTApp(appid,accid){
  alert("Initializing RBT APP with AppID = " + appid + " Account ID = " + accid);
  try {
    if (!appid || !accid || appid == "" || accid == "") {
      throw new Error("App-id, Account-ID are not mentioned")
    } else {
      // if everything seems fine, then set app/acc id and initialize rbTAPP.
      trigger_fish.rbTAPP.setAppID(appid);
      trigger_fish.rbTAPP.setAccountID(accid);
      trigger_fish.rbTUtils.includeJQIfNeeded();
      window.rb = new RBT();
    }
  } catch (e) {
    trigger_fish.rbTAPP.reportError({"exception": e.message, 
                                     "message"  : "App init/exec failed",
                                     "appid"    : appid || "",
                                     "accid"    : accid || ""
                                    });
  }
})(_rbTK[0][1], _rbTK[1][1]);



function testGanga()
{
  //rb.sendEvent("sample_event",{"a":101});
  rb.identify("83.samarth@gmail.com");
  //rb.identify({"uid":"83.samarth@gmail.com"});
  //rb.setActor({"name":"samarth","age":"29"});

  rb.sendEvent("sample_event",{"name":"samarth"});


  console.log("ENDING TESTING SEQUENCE");
}

testGanga();

