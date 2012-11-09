trigger_fish.rbTActor = function() {

  var __id = "";
  var __prop = {};

  return {

      /**
      * Fetch data from cookie for an actor.
      * @return void
      */
      retFromCookie : function()
      {
      	trigger_fish.rbTDebug.log("retrieveing data for actor from cookie");
        if (trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorProp))
          this.setProperties(trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorProp)); 
        if (trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorID))
          this.setID(trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorID));
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
      }

  };

}();
