var rbTServerResponse = {
  
  /** 
  *  Handle default success callback if not mentioned explicitly
  *   
  *  @return void
  */ 
  defaultSuccessCallback : function()
  {
    // FIXME : what to do?
  },
  /** 
  *  Handle default error callback if not mentioned explicitly
  *   
  *  @return void
  */ 
  defaultErrorCallback : function()
  {
    // FIXME : what to do?
  },


  /**
  * Set actor identification based on server response
  * @param {object} respData Actor identification details
  * @return void
  */
  setActor : function(respData)
  { 
    try {
      if (respData) {
        rbTCookie.setCookie("actor_id", respData);

      } else {
        // throw exception
      }
    } catch(e) {
      // FIXME what to do?
    }
  },


  /**
  * Set actor identification based on server response
  * @param {object} respData Actor identification details
  * @return void
  */
  setUserProperty : function(respData)
  {
    // FIXME : check for which property to set
    try {
      if (respData) {
        rbTCookie.setCookie("actor_property", respData);
      } else {
        // throw exception
      }
    } catch(e) {
      // FIXME what to do?
    }
  }, 

  /**
  * Set actor identification based on server response
  * @param {object} respData Actor identification details
  * @return void
  */
  setSystemProperty : function(respData)
  {
    // FIXME : check for which property to set
    try {
      if (respData) {
        rbTCookie.setCookie("system_property", respData);
      } else {
        // throw exception
      }
    } catch(e) {
      // FIXME what to do?
    }
  }, 



  /**
  * Handle event response from server
  * @param {object} respData Actor identification details
  * @return void
  */
  handleEvent : function(respData)
  {
    try {
      if(respData && respData.actor) {
        rbTCookie.setCookie("actor", respData.actor);
      }
      // FIXME : trigger rule
    } catch(e) {
      // FIXME what to do?
    }
  },

  
  /**
  * Set Rules response from server
  * @param {object} respData in the form of rules
  * @return void
  */
  setRules : function(respData)
  {
    try {
      if(respData) {
        rbTRules.setRulesTable(respData);
      }
    } catch(e) {
      // FIXME what to do?
    }
  },


};