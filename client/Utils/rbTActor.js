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

 /**
 * Actor specific stuffings to be manager.
 * @return {Object} series of managing functions for actors.
 */
var rbTActor = function() {

  var __id = "";
  var __prop = {};
  var __state = false;
  var __eventRQ = [];

  return {

      /**
      * Fetch data from cookie for an actor.
      * @return void
      */
      retFromCookie : function()
      {
      	rbTAPP.log("Trying to retrieve data for actor from cookie");

        if (rbTStore.get(rbTStore.defaultKeys.actorID)) {
          rbTAPP.log("Got actor id in storage - setting actor id now!!");
          this.setID(rbTStore.get(rbTStore.defaultKeys.actorID));
          if (rbTStore.get(rbTStore.defaultKeys.actorProp)) {
            rbTAPP.log("Got Actor data in storage - enabling actor now!!");  
            this.setProperties(rbTStore.get(rbTStore.defaultKeys.actorProp)); 
            this.enable();
          } else {
            this.requestActorDetails({"id": this.getID()}); 
          }
        } else {
          rbTAPP.log("HAVE TO CREATE DUMMY ACTOR!!");
          this.createDummyActor();
        }

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
        if(!__state) {
          __state = true;
          this.flushEvRQ();
        }
      },  
      /** 
      *  Set Actor ID
      *  @param {string} id 
      *  @return void
      */
      setID : function(id)
      {
        rbTStore.set(rbTStore.defaultKeys.actorID, id);
        __id = id;
      },

      /**
      * Set actor properties as well as set it in cookie.
      * @param {object} prop Actor properties.
      */
      setProperties : function(prop)
      {
        __prop = prop;
        rbTStore.set(rbTStore.defaultKeys.actorProp, prop);
        this.enable();
      },

      /**
      * Check if property, desired to be set for an actor, already exist.
      * @return {boolean}
      */
      propExist : function(prop)
      {
        var diff = {};
        diff = rbTUtils.diff(prop,__prop, diff);
        return diff;
      },

      /**
      * Create a dummy actor when rbt is initialized.
      * 
      */
      createDummyActor : function()
      {
        rbTAPP.log({"message":"Creating dummy actor"});
        if (!__id || !__prop) {
          var obj = {"url"         : rbTServerChannel.url.createActor,
                     "actor_create": true, 
                     "type"        : "POST",
                     "cb"          : { success: rbTServerResponse.setActorID,
                                       error  : rbTServerResponse.defaultError
                                     }
                    };
          rbTServerChannel.makeServerRequest(obj);
        }
      },

      /**
      * Request server for actor details if needed.
      *
      */
      requestActorDetails : function(data)
      {
        var oldActorId = rbTStore.get(rbTStore.defaultKeys.actorID);
        var actorProp = rbTStore.get(rbTStore.defaultKeys.actorProp);
        if (!oldActorId || (oldActorId !== data.id) || !actorProp) {
          rbTStore.set(rbTStore.defaultKeys.actorID, JSON.stringify(data.id));
          this.setID(data.id);
          rbTServerChannel.actorDetails();
        }
      },

      bufferEvRQ : function(obj)
      {
        __eventRQ.push(obj);
      },

      flushEvRQ : function()
      {
        if (!__eventRQ.length)
          return;
        for (var req in __eventRQ) {
          var r = __eventRQ[req];
          rbTServerChannel.makeServerRequest(r);
        }
        __eventRQ = [];
      }
  };

}();
