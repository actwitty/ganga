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
//trigger_fish.rbTKey = {
trigger_fish.rbTStore = {  

  namePrefix : "RBT__",
  defaultTTL:24 * 60 * 60 * 1000,  // in hours

  // Just harcode names for some of the default keys which we will be using
  defaultKeys : {
    "actorID"    : "actor_id",
    "systemProp" : "system_prop",
    "actorProp"  : "actor_prop"
  },

  /** Get RBT key string name.
   *  @param {string} key
   *  @return string
   */
  qualifiedName : function(key)
  {
    return this.namePrefix + key;
  },

  /** Get key string.
   *  @param {String} key
   *  @return string
   */
  get : function(key)
  {
    var value = trigger_fish.jStorage.get(this.qualifiedName(key));
    return (value?value:undefined);
  },

  /** Check key existence
   *  @param {string} key
   *  @return boolean
   */
  doesKeyExist : function(key)
  {
    return (this.get(key)?true:false);
  }, 

  /** Set key with options passed as key:value pair.
   * 
   * @param {string} key
   * @param {string} keyValue
   * @param {this.defaultTTL} [options] set options
   * @return string
   */
  set : function(key, keyValue, options)
  {
    "use strict";
    try {
      trigger_fish.jStorage.set(this.qualifiedName(key), 
                                keyValue, 
                                {TTL: this.defaultTTL});
    } catch(e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "key set failed",
                          "name"      : key,
                          "value"     : keyValue,
                          "options"   : options,
                          "log"       : true 
                         });
    }
  },

  /** Delete a key
   *
   * @param {string} key
   * @return void
   */
  deleteKey :  function(key, options)
  {
    "use strict";
    try {
        trigger_fish.jStorage.deleteKey(this.qualifiedName(key));                  
    } catch (e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "key delete failed",
                          "name"      : key,
                          "log"       : true 
                         });
    }
  },


  /** Flush all key
   *
   *  @return void
   */
  flushAllKey: function() 
  {
    "use strict";
    try {
      var keys = trigger_fish.jStorage.index();
      for (var i = 0; i < keys.length; i++) {   
          var key =  keys[i]
          if ((key.match("^"+this.namePrefix))) {
            trigger_fish.jStorage.deleteKey(key);
          }
      }
    } catch(e) {
      // FIXME what to do?
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "key flush all failed",
                          "log"       : true 
                         });
    }
  }

};