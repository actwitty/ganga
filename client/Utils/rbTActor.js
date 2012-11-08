var rbTActor = function() {

  var __id = "";
  var __prop = {};

  return {

      /**
      *
      *
      */
      retFromCookie : function()
      {
      	rbTDebug.log("retrieveing data for actor from cookie");
        if (rbTCookie.getCookie(rbTCookie.defaultCookies.actorProp))
          this.setProperties(rbTCookie.getCookie(rbTCookie.defaultCookies.actorProp)); 
        if (rbTCookie.getCookie(rbTCookie.defaultCookies.actorID))
          this.setID(rbTCookie.getCookie(rbTCookie.defaultCookies.actorID));
      },

      /** 
      *  Get Actor ID
      *  @return {string} id 
      */  
      getID : function()
      {
        return __id;
        //return rbTCookie.getCookie(rbTCookie.defaultCookies.actorID); 
      },
      
      /**
      *
      *
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
        rbTCookie.setCookie(rbTCookie.defaultCookies.actorID, id);
        __id = id;
      },

      /**
      *
      *
      */
      setProperties : function(prop)
      {
        __prop = prop;
        rbTCookie.setCookie(rbTCookie.defaultCookies.actorProp, JSON.stringify(prop));
      },

      /**
      *
      *
      */
      propExist : function(prop)
      {
        var a = JSON.stringify(__prop).replace(/(^{)|(}$)/g, "");
        var b = JSON.stringify(prop).replace(/(^{)|(}$)/g, "");
        rbTDebug.log({"stored" : a , "passed" : b, "message":"actor prop existence"});
        return (a.indexOf(b) >= 0) ? true : false;
      }

  };

}();
