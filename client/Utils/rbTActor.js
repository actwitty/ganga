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
trigger_fish.rbTActor = function() {

  var __id = "";
  var __prop = {};
  var __state = false;

  return {

      /**
      * Fetch data from cookie for an actor.
      * @return void
      */
      retFromCookie : function()
      {
      	trigger_fish.rbTDebug.log("retrieveing data for actor from cookie");
        if (trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorProp)) {
          this.setProperties(trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorProp)); 
          this.enable();
        }
        if (trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorID))
          this.setID(trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorID));
      },

      isReady : function()
      {
        return __state;
      },

      /** 
      *  Get Actor ID
      *  @return {string} id 
      */  
      getID : function()
      {
        return __id;
      },
      
      /**
      * Get actor properties.
      * @return {object} Actor properties object. => see actor_controller/read
      */
      getProperties : function()
      {
        return __prop;
      },


      enable : function()
      {
        __state = true;
        // FIXME :: CHECK FOR RIGHT LOCATION OF THIS
        trigger_fish.rbTServerChannel.flushReqWaitingForActor();
      },  
      /** 
      *  Set Actor ID
      *  @param {string} id 
      *  @return void
      */
      setID : function(id)
      {
        trigger_fish.rbTCookie.setCookie(trigger_fish.rbTCookie.defaultCookies.actorID, id);
        __id = id;
      },

      /**
      * Set actor properties as well as set it in cookie.
      * @param {object} prop Actor properties.
      */
      setProperties : function(prop)
      {
        __prop = prop;
        trigger_fish.rbTCookie.setCookie(trigger_fish.rbTCookie.defaultCookies.actorProp, JSON.stringify(prop));
        this.enable();
      },

      /**
      * Check if property, desired to be set for an actor, already exist.
      * @return {boolean}
      */
      propExist : function(prop)
      {
        var a = JSON.stringify(__prop).replace(/(^{)|(}$)/g, "");
        var b = JSON.stringify(prop).replace(/(^{)|(}$)/g, "");
        trigger_fish.rbTDebug.log({"stored" : a , "passed" : b, "message":"actor prop existence"});
        return (a.indexOf(b) >= 0) ? true : false;
      },

      /**
      * Create a dummy actor when rbt is initialized.
      * 
      */
      createDummyActor : function()
      {
        if (!__id || !__prop) {
          var obj = {"url"      : trigger_fish.rbTServerChannel.url.createActor,
                     "app_read" : true, 
                     "cb"       : { success: trigger_fish.rbTServerResponse.setAppDetail,
                                    error  : trigger_fish.rbTServerResponse.defaultError
                                  }
                  };
          trigger_fish.rbTServerChannel.makeServerRequest(obj);
        }
      },

      /**
      * Request server for actor details if needed.
      *
      */
      requestActorDetails : function(data)
      {
        var oldActorId = trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorID);
        var actorProp = trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorProp);
        if (!oldActorId || (oldActorId !== data.id) || !actorProp) {
          trigger_fish.rbTCookie.setCookie(trigger_fish.rbTCookie.defaultCookies.actorID, JSON.stringify(data.id));
          this.setID(data.id);
          trigger_fish.rbTServerChannel.actorDetails();
        }
      }

  };

}();
