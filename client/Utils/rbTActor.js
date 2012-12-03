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
  var __eventRQ = [];

  return {

      /**
      * Fetch data from cookie for an actor.
      * @return void
      */
      retFromCookie : function()
      {
      	trigger_fish.rbTDebug.log("retrieveing data for actor from cookie");
        if (trigger_fish.rbTStore.get(trigger_fish.rbTStore.defaultKeys.actorProp)) {
          this.setProperties(trigger_fish.rbTStore.get(trigger_fish.rbTStore.defaultKeys.actorProp)); 
          this.enable();
        }
        if (trigger_fish.rbTStore.get(trigger_fish.rbTStore.defaultKeys.actorID)) {
          this.setID(trigger_fish.rbTStore.get(trigger_fish.rbTStore.defaultKeys.actorID));
        } else {
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
        __state = true;
        this.flushEvRQ();
      },  
      /** 
      *  Set Actor ID
      *  @param {string} id 
      *  @return void
      */
      setID : function(id)
      {
        trigger_fish.rbTStore.set(trigger_fish.rbTStore.defaultKeys.actorID, id);
        __id = id;
      },

      /**
      * Set actor properties as well as set it in cookie.
      * @param {object} prop Actor properties.
      */
      setProperties : function(prop)
      {
        __prop = prop;
        trigger_fish.rbTStore.set(trigger_fish.rbTStore.defaultKeys.actorProp, prop);
        this.enable();
      },

      /**
      * Check if property, desired to be set for an actor, already exist.
      * @return {boolean}
      */
      propExist : function(prop)
      {
        /*
        Object.prototype.isPartOf = function(o) {
          function dataType(obj)
          {
            return Object.prototype.toString.call(obj).split("]")[0].split(" ")[1];
          }
          for(var k in this) {
            if (!o[k]) return false;
            if (dataType(o[k]) === "Array" && o[k][o[k].length-1] !== this[k]) return false;
            if (dataType(this[k]) === "Object" && dataType(o[k]) === "Object") {
              return this[k].isPartOf(o[k]);
            }
          }
          return true;
        }
        var exist = prop.isPartOf(__prop);
        */
        var diff = {};
        diff = trigger_fish.rbTUtils.differ(prop,__prop, diff);
        return diff;
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
                     "cb"       : { success: trigger_fish.rbTServerResponse.setActorID,
                                    error  : trigger_fish.rbTServerResponse.defaultError
                                  }
                    };
          trigger_fish.rbTServerChannel.makeRequest(obj);
        }
      },

      /**
      * Request server for actor details if needed.
      *
      */
      requestActorDetails : function(data)
      {
        var oldActorId = trigger_fish.rbTStore.get(trigger_fish.rbTStore.defaultKeys.actorID);
        var actorProp = trigger_fish.rbTStore.get(trigger_fish.rbTStore.defaultKeys.actorProp);
        if (!oldActorId || (oldActorId !== data.id) || !actorProp) {
          trigger_fish.rbTStore.set(trigger_fish.rbTStore.defaultKeys.actorID, JSON.stringify(data.id));
          this.setID(data.id);
          trigger_fish.rbTServerChannel.actorDetails();
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
          trigger_fish.rbTServerChannel.makeServerRequest(r);
        }
        __eventRQ = [];
      }
  };

}();
