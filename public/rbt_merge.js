


/***********************[[2012-11-20 11:33:10 +0530]]*********************************/ 





/****************************[[./Utils/rbt.js]]*************************************/ 





/****************************[[rbTAPP.js]]*************************************/ 


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

var trigger_fish = {};

trigger_fish.rbTAPP = {
    /* Main configs will be holded here */
    configs : {
      "status" : false
    },
    
    /** 
    *  Do following tasks on initialization of the app
    *  1). include jQuery if need be
    *  2). create session.
    *  3). fetch configs.
    *  4). check status of last event, if pending, execute it.
    *  5). fetch system properties if cache miss
    *  6). Allow Business to make calls
    *  
    *  @return void
    */
    initialize : function()
    {
      "use strict";
      trigger_fish.initJStorage();
      trigger_fish.enableCORS(jQuery);
      // 1). includin jquery if need be
      //rbTUtils.includeJQIfNeeded();

      // 2). Create session Deferred till further discussion
      //rbTAPP.createSession();

      // 3). Get rulebot app details
      //rbTRules.init();
      this.getAppData();

      trigger_fish.rbTActor.retFromCookie();

      // 4). Initialize system variables  
      //rbTSystemVar.init();

      // 5). FIXME : Check status of last event, if pending, execute it.
      //rbTRules.executeLastPendingEvent();

      //rbTServerChannel.flushReqQueue();

    },

    /**
    * Check status of RBT APP
    *
    * @param {function} callback Callback function if rbTAPP is alive.
    * @param {object} args Arguments with which callback will be called.
    * @return void   
    */
    isrbTAlive :  function()
    {
       return this.configs.status;
    },  

    /**
    * Set RBT APP Status to true to signal app is alive
    */
    wake_RBT_APP : function()
    {
      trigger_fish.rbTDebug.log("Initializing RBT APP");
      trigger_fish.rbTAPP.initialize();
    },

    /** 
    *  Set App Id
    *  @param {string} id
    *  @return void
    */
    setAppID: function(id)
    {
      this.configs.appID = id;
    },

    /** 
    *  Set Account ID
    *  @param {string} id 
    *  @return void
    */
    setAccountID : function(id)
    {
      this.configs.accountID = id;
    },

    /** 
    *  Set Session ID
    *  @param {string} id 
    *  @return void
    */
    setSessionID : function(id)
    {
      this.configs.sessionID = id;
    },

    /**
    *
    *
    */   
    setTransVar : function(data)
    {
      this.configs.transVar = data;
    },

    /**
    *
    */
    setAppDetail : function(data)
    {
      this.configs.appData = data;
    },

    /** 
    *  Get App ID
    *  @return {string} id 
    */
    getAppID : function()
    {
      return this.configs.appID
    },

    /** 
    *  Get Account ID
    *  @return {string} id 
    */  
    getAccountID : function()
    {
      return this.configs.accountID;
    },   

    /** 
    *  Get Session ID
    *  @return {string} id 
    */  
    getSessionID : function()
    {
      return this.configs.sessionID;
    },

    /**
    *
    */
    getTransVar : function()
    {
      return this.configs.transVar;
    },

    /**
    *
    */
    getAppDetail : function()
    {
      return this.configs.appData;
    },

    /** 
    *  Get Application configs
    *  @return {rbTAPP.configs} 
    */ 
    getConfigs : function()
    {
      "use strict";
      var cnf = {"app_id"  : this.configs.appID,
                 "account_id" : this.configs.accountID  
                }; 
      
       var actor_id = trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorID);
       if (actor_id)  {
        cnf["actor_id"] = actor_id;
       }
      return cnf;
    },  

    /** 
    *  Get Application based configs
    *  FIXME : THIS NEEDS TO BE DISCUSSED AS WE ARE PLANNING TO HAVE A PROXY IN BETWEEN
    *  @return {string} TBD 
    */
    getAppData : function()
    {
      trigger_fish.rbTServerChannel.makeServerRequest({"url"      : trigger_fish.rbTServerChannel.url.appDetails,
                                                       "app_read" : true, 
                                                       "cb"       : { success: trigger_fish.rbTServerResponse.setAppDetail,
                                                                      error  : trigger_fish.rbTServerResponse.defaultError
                                                                    }
                                                      });
    },  

    /** 
    *  report error to rbT server
    *  @param {object} params Error log message 
    *  @return void
    */ 
    reportError : function(params)
    {
      try {
          trigger_fish.rbTDebug.error(params);
          if (params.server) 
            trigger_fish.rbTServerChannel.reportError(params);
      } catch(e) {
        // FIXME what to do?
      }
    },
    
    /** 
    *  log
    *  @param {object} params Error log message 
    *  @return void
    */
    log : function(params)
    {
      if(params && params.message)
        trigger_fish.rbTDebug.log(params.message);
      trigger_fish.rbTDebug.log(params)
    },

};



/****************************[[rbTStorage.js]]*************************************/ 


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
/*
 * ----------------------------- JSTORAGE -------------------------------------
 * Simple local storage wrapper to save data on the browser side, supporting
 * all major browsers - IE6+, Firefox2+, Safari4+, Chrome4+ and Opera 10.5+
 *
 * Copyright (c) 2010 - 2012 Andris Reinman, andris.reinman@gmail.com
 * Project homepage: www.jstorage.info
 *
 * Licensed under MIT-style license:
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

 //(function(){
 trigger_fish.initJStorage = function() {   
    var
        /* jStorage version */
        JSTORAGE_VERSION = "0.3.0",

        /* detect a dollar object or create one if not found */
        $ = window.jQuery || window.$ || (window.$ = {}),

        /* check for a JSON handling support */
        JSON = {
            parse:
                window.JSON && (window.JSON.parse || window.JSON.decode) ||
                String.prototype.evalJSON && function(str){return String(str).evalJSON();} ||
                $.parseJSON ||
                $.evalJSON,
            stringify:
                Object.toJSON ||
                window.JSON && (window.JSON.stringify || window.JSON.encode) ||
                $.toJSON
        };

    // Break if no JSON support was found
    if(!JSON.parse || !JSON.stringify){
        throw new Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
    }

    var
        /* This is the object, that holds the cached values */
        _storage = {},

        /* Actual browser storage (localStorage or globalStorage['domain']) */
        _storage_service = {jStorage:"{}"},

        /* DOM element for older IE versions, holds userData behavior */
        _storage_elm = null,

        /* How much space does the storage take */
        _storage_size = 0,

        /* which backend is currently used */
        _backend = false,

        /* onchange observers */
        _observers = {},

        /* timeout to wait after onchange event */
        _observer_timeout = false,

        /* last update time */
        _observer_update = 0,

        /* pubsub observers */
        _pubsub_observers = {},

        /* skip published items older than current timestamp */
        _pubsub_last = +new Date(), 

        /* Next check for TTL */
        _ttl_timeout,

        /* crc32 table */
        _crc32Table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 "+
             "0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 "+
             "6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 "+
             "FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 "+
             "A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 "+
             "32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 "+
             "56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 "+
             "C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 "+
             "E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 "+
             "6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 "+
             "12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE "+
             "A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 "+
             "DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 "+
             "5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 "+
             "2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF "+
             "04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 "+
             "7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 "+
             "FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 "+
             "A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C "+
             "36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 "+
             "5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 "+
             "C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 "+
             "EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D "+
             "7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 "+
             "18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 "+
             "A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A "+
             "D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A "+
             "53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 "+
             "2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D",

        /**
         * XML encoding and decoding as XML nodes can't be JSON'ized
         * XML nodes are encoded and decoded if the node is the value to be saved
         * but not if it's as a property of another object
         * Eg. -
         *   $.jStorage.set("key", xmlNode);        // IS OK
         *   $.jStorage.set("key", {xml: xmlNode}); // NOT OK
         */
        _XMLService = {

            /**
             * Validates a XML node to be XML
             * based on jQuery.isXML function
             */
            isXML: function(elm){
                var documentElement = (elm ? elm.ownerDocument || elm : 0).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            },

            /**
             * Encodes a XML node to string
             * based on http://www.mercurytide.co.uk/news/article/issues-when-working-ajax/
             */
            encode: function(xmlNode) {
                if(!this.isXML(xmlNode)){
                    return false;
                }
                try{ // Mozilla, Webkit, Opera
                    return new XMLSerializer().serializeToString(xmlNode);
                }catch(E1) {
                    try {  // IE
                        return xmlNode.xml;
                    }catch(E2){}
                }
                return false;
            },

            /**
             * Decodes a XML node from string
             * loosely based on http://outwestmedia.com/jquery-plugins/xmldom/
             */
            decode: function(xmlString){
                var dom_parser = ("DOMParser" in window && (new DOMParser()).parseFromString) ||
                        (window.ActiveXObject && function(_xmlString) {
                    var xml_doc = new ActiveXObject('Microsoft.XMLDOM');
                    xml_doc.async = 'false';
                    xml_doc.loadXML(_xmlString);
                    return xml_doc;
                }),
                resultXML;
                if(!dom_parser){
                    return false;
                }
                resultXML = dom_parser.call("DOMParser" in window && (new DOMParser()) || window, xmlString, 'text/xml');
                return this.isXML(resultXML)?resultXML:false;
            }
        },

        _localStoragePolyfillSetKey = function(){};


    ////////////////////////// PRIVATE METHODS ////////////////////////

    /**
     * Initialization function. Detects if the browser supports DOM Storage
     * or userData behavior and behaves accordingly.
     */
    function _init(){
        /* Check if browser supports localStorage */
        var localStorageReallyWorks = false;
        if("localStorage" in window){
            try {
                window.localStorage.setItem('_tmptest', 'tmpval');
                localStorageReallyWorks = true;
                window.localStorage.removeItem('_tmptest');
            } catch(BogusQuotaExceededErrorOnIos5) {
                // Thanks be to iOS5 Private Browsing mode which throws
                // QUOTA_EXCEEDED_ERRROR DOM Exception 22.
            }
        }

        if(localStorageReallyWorks){
            try {
                if(window.localStorage) {
                    _storage_service = window.localStorage;
                    _backend = "localStorage";
                    _observer_update = _storage_service.jStorage_update;
                }
            } catch(E3) {/* Firefox fails when touching localStorage and cookies are disabled */}
        }
        /* Check if browser supports globalStorage */
        else if("globalStorage" in window){
            try {
                if(window.globalStorage) {
                    _storage_service = window.globalStorage[window.location.hostname];
                    _backend = "globalStorage";
                    _observer_update = _storage_service.jStorage_update;
                }
            } catch(E4) {/* Firefox fails when touching localStorage and cookies are disabled */}
        }
        /* Check if browser supports userData behavior */
        else {
            _storage_elm = document.createElement('link');
            if(_storage_elm.addBehavior){

                /* Use a DOM element to act as userData storage */
                _storage_elm.style.behavior = 'url(#default#userData)';

                /* userData element needs to be inserted into the DOM! */
                document.getElementsByTagName('head')[0].appendChild(_storage_elm);

                try{
                    _storage_elm.load("jStorage");
                }catch(E){
                    // try to reset cache
                    _storage_elm.setAttribute("jStorage", "{}");
                    _storage_elm.save("jStorage");
                    _storage_elm.load("jStorage");
                }

                var data = "{}";
                try{
                    data = _storage_elm.getAttribute("jStorage");
                }catch(E5){}

                try{
                    _observer_update = _storage_elm.getAttribute("jStorage_update");
                }catch(E6){}

                _storage_service.jStorage = data;
                _backend = "userDataBehavior";
            }else{
                _storage_elm = null;
                return;
            }
        }

        // Load data from storage
        _load_storage();

        // remove dead keys
        _handleTTL();

        // create localStorage and sessionStorage polyfills if needed
        _createPolyfillStorage("local");
        _createPolyfillStorage("session");

        // start listening for changes
        _setupObserver();

        // initialize publish-subscribe service
        _handlePubSub();

        // handle cached navigation
        if("addEventListener" in window){
            window.addEventListener("pageshow", function(event){
                if(event.persisted){
                    _storageObserver();
                }
            }, false);
        }
    }

    /**
     * Create a polyfill for localStorage (type="local") or sessionStorage (type="session")
     *
     * @param {String} type Either "local" or "session"
     * @param {Boolean} forceCreate If set to true, recreate the polyfill (needed with flush)
     */
    function _createPolyfillStorage(type, forceCreate){
        var _skipSave = false,
            _length = 0,
            i, 
            storage,
            storage_source = {};

            var rand = Math.random();

        if(!forceCreate && typeof window[type+"Storage"] != "undefined"){
            return;
        }

        // Use globalStorage for localStorage if available
        if(type == "local" && window.globalStorage){
            localStorage = window.globalStorage[window.location.hostname];
            return;
        }

        // only IE6/7 from this point on 
        if(_backend != "userDataBehavior"){
            return;
        }

        // Remove existing storage element if available
        if(forceCreate && window[type+"Storage"] && window[type+"Storage"].parentNode){
            window[type+"Storage"].parentNode.removeChild(window[type+"Storage"]);
        }

        storage = document.createElement("button");
        document.getElementsByTagName('head')[0].appendChild(storage);

        if(type == "local"){
            storage_source = _storage;
        }else if(type == "session"){
            _sessionStoragePolyfillUpdate();
        }

        for(i in storage_source){

            if(storage_source.hasOwnProperty(i) && i != "__jstorage_meta" && i != "length" && typeof storage_source[i] != "undefined"){
                if(!(i in storage)){
                    _length++;
                }
                storage[i] = storage_source[i];
            }
        }
        
        // Polyfill API

        /**
         * Indicates how many keys are stored in the storage
         */
        storage.length = _length;

        /**
         * Returns the key of the nth stored value
         * 
         * @param {Number} n Index position
         * @return {String} Key name of the nth stored value
         */
        storage.key = function(n){
            var count = 0, i;
            _sessionStoragePolyfillUpdate();
            for(i in storage_source){
                if(storage_source.hasOwnProperty(i) && i != "__jstorage_meta" && i!="length" && typeof storage_source[i] != "undefined"){
                    if(count == n){
                        return i;
                    }
                    count++;
                }
            }
        }

        /**
         * Returns the current value associated with the given key
         *
         * @param {String} key key name
         * @return {Mixed} Stored value
         */
        storage.getItem = function(key){
            _sessionStoragePolyfillUpdate();
            if(type == "session"){
                return storage_source[key];
            }
            return $.jStorage.get(key);
        }

        /**
         * Sets or updates value for a give key
         *
         * @param {String} key Key name to be updated
         * @param {String} value String value to be stored 
         */
        storage.setItem = function(key, value){
            if(typeof value == "undefined"){
                return;
            }
            storage[key] = (value || "").toString();
        }

        /**
         * Removes key from the storage
         *
         * @param {String} key Key name to be removed
         */
        storage.removeItem = function(key){
            if(type == "local"){
                return $.jStorage.deleteKey(key);
            }

            storage[key] = undefined;
            
            _skipSave = true;
            if(key in storage){
                storage.removeAttribute(key);
            }
            _skipSave = false;
        }

        /**
         * Clear storage
         */
        storage.clear = function(){
            if(type == "session"){
                window.name = "";
                _createPolyfillStorage("session", true);
                return;
            }
            $.jStorage.flush();
        }

        if(type == "local"){

            _localStoragePolyfillSetKey = function(key, value){
                if(key == "length"){
                    return;
                }
                _skipSave = true;
                if(typeof value == "undefined"){
                    if(key in storage){
                        _length--;
                        storage.removeAttribute(key);
                    }
                }else{
                    if(!(key in storage)){
                        _length++;
                    }
                    storage[key] = (value || "").toString();
                }
                storage.length = _length;
                _skipSave = false;
            }
        }

        function _sessionStoragePolyfillUpdate(){
                if(type != "session"){
                    return;
                }
                try{
                    storage_source = JSON.parse(window.name || "{}");
                }catch(E){
                    storage_source = {};
                }
            }

        function _sessionStoragePolyfillSave(){
            if(type != "session"){
                return;
            }
            window.name = JSON.stringify(storage_source);
        };

        storage.attachEvent("onpropertychange", function(e){
            if(e.propertyName == "length"){
                return;
            }

            if(_skipSave || e.propertyName == "length"){
                return;
            }

            if(type == "local"){
                if(!(e.propertyName in storage_source) && typeof storage[e.propertyName] != "undefined"){
                    _length ++;
                }
            }else if(type == "session"){
                _sessionStoragePolyfillUpdate();
                if(typeof storage[e.propertyName] != "undefined" && !(e.propertyName in storage_source)){
                    storage_source[e.propertyName] = storage[e.propertyName];
                    _length++;
                }else if(typeof storage[e.propertyName] == "undefined" && e.propertyName in storage_source){
                    delete storage_source[e.propertyName];
                    _length--;
                }else{
                    storage_source[e.propertyName] = storage[e.propertyName];
                }

                _sessionStoragePolyfillSave();
                storage.length = _length;
                return;
            }

            $.jStorage.set(e.propertyName, storage[e.propertyName]);
            storage.length = _length;
        });

        window[type+"Storage"] = storage;
    }

    /**
     * Reload data from storage when needed
     */
    function _reloadData(){
        var data = "{}";

        if(_backend == "userDataBehavior"){
            _storage_elm.load("jStorage");

            try{
                data = _storage_elm.getAttribute("jStorage");
            }catch(E5){}

            try{
                _observer_update = _storage_elm.getAttribute("jStorage_update");
            }catch(E6){}

            _storage_service.jStorage = data;
        }

        _load_storage();

        // remove dead keys
        _handleTTL();

        _handlePubSub();
    }

    /**
     * Sets up a storage change observer
     */
    function _setupObserver(){
        if(_backend == "localStorage" || _backend == "globalStorage"){
            if("addEventListener" in window){
                window.addEventListener("storage", _storageObserver, false);
            }else{
                document.attachEvent("onstorage", _storageObserver);
            }
        }else if(_backend == "userDataBehavior"){
            setInterval(_storageObserver, 1000);
        }
    }

    /**
     * Fired on any kind of data change, needs to check if anything has
     * really been changed
     */
    function _storageObserver(){
        var updateTime;
        // cumulate change notifications with timeout
        clearTimeout(_observer_timeout);
        _observer_timeout = setTimeout(function(){

            if(_backend == "localStorage" || _backend == "globalStorage"){
                updateTime = _storage_service.jStorage_update;
            }else if(_backend == "userDataBehavior"){
                _storage_elm.load("jStorage");
                try{
                    updateTime = _storage_elm.getAttribute("jStorage_update");
                }catch(E5){}
            }

            if(updateTime && updateTime != _observer_update){
                _observer_update = updateTime;
                _checkUpdatedKeys();
            }

        }, 25);
    }

    /**
     * Reloads the data and checks if any keys are changed
     */
    function _checkUpdatedKeys(){
        var oldCrc32List = JSON.parse(JSON.stringify(_storage.__jstorage_meta.CRC32)),
            newCrc32List;

        _reloadData();
        newCrc32List = JSON.parse(JSON.stringify(_storage.__jstorage_meta.CRC32));

        var key,
            updated = [],
            removed = [];

        for(key in oldCrc32List){
            if(oldCrc32List.hasOwnProperty(key)){
                if(!newCrc32List[key]){
                    removed.push(key);
                    continue;
                }
                if(oldCrc32List[key] != newCrc32List[key]){
                    updated.push(key);
                }
            }
        }

        for(key in newCrc32List){
            if(newCrc32List.hasOwnProperty(key)){
                if(!oldCrc32List[key]){
                    updated.push(key);
                }
            }
        }

        _fireObservers(updated, "updated");
        _fireObservers(removed, "deleted");
    }

    /**
     * Fires observers for updated keys
     *
     * @param {Array|String} keys Array of key names or a key
     * @param {String} action What happened with the value (updated, deleted, flushed)
     */
    function _fireObservers(keys, action){
        keys = [].concat(keys || []);
        if(action == "flushed"){
            keys = [];
            for(var key in _observers){
                if(_observers.hasOwnProperty(key)){
                    keys.push(key);
                }
            }
            action = "deleted";
        }
        for(var i=0, len = keys.length; i<len; i++){
            if(_observers[keys[i]]){
                for(var j=0, jlen = _observers[keys[i]].length; j<jlen; j++){
                    _observers[keys[i]][j](keys[i], action);
                }
            }
        }
    }

    /**
     * Publishes key change to listeners
     */
    function _publishChange(){
        var updateTime = (+new Date()).toString();

        if(_backend == "localStorage" || _backend == "globalStorage"){
            _storage_service.jStorage_update = updateTime;
        }else if(_backend == "userDataBehavior"){
            _storage_elm.setAttribute("jStorage_update", updateTime);
            _storage_elm.save("jStorage");
        }

        _storageObserver();
    }

    /**
     * Loads the data from the storage based on the supported mechanism
     */
    function _load_storage(){
        /* if jStorage string is retrieved, then decode it */
        if(_storage_service.jStorage){
            try{
                _storage = JSON.parse(String(_storage_service.jStorage));
            }catch(E6){_storage_service.jStorage = "{}";}
        }else{
            _storage_service.jStorage = "{}";
        }
        _storage_size = _storage_service.jStorage?String(_storage_service.jStorage).length:0;

        if(!_storage.__jstorage_meta){
            _storage.__jstorage_meta = {};
        }
        if(!_storage.__jstorage_meta.CRC32){
            _storage.__jstorage_meta.CRC32 = {};
        }
    }

    /**
     * This functions provides the "save" mechanism to store the jStorage object
     */
    function _save(){
        _dropOldEvents(); // remove expired events
        try{
            _storage_service.jStorage = JSON.stringify(_storage);
            // If userData is used as the storage engine, additional
            if(_storage_elm) {
                _storage_elm.setAttribute("jStorage",_storage_service.jStorage);
                _storage_elm.save("jStorage");
            }
            _storage_size = _storage_service.jStorage?String(_storage_service.jStorage).length:0;
        }catch(E7){/* probably cache is full, nothing is saved this way*/}
    }

    /**
     * Function checks if a key is set and is string or numberic
     *
     * @param {String} key Key name
     */
    function _checkKey(key){
        if(!key || (typeof key != "string" && typeof key != "number")){
            throw new TypeError('Key name must be string or numeric');
        }
        if(key == "__jstorage_meta"){
            throw new TypeError('Reserved key name');
        }
        return true;
    }

    /**
     * Removes expired keys
     */
    function _handleTTL(){
        var curtime, i, TTL, CRC32, nextExpire = Infinity, changed = false, deleted = [];

        clearTimeout(_ttl_timeout);

        if(!_storage.__jstorage_meta || typeof _storage.__jstorage_meta.TTL != "object"){
            // nothing to do here
            return;
        }

        curtime = +new Date();
        TTL = _storage.__jstorage_meta.TTL;

        CRC32 = _storage.__jstorage_meta.CRC32;
        for(i in TTL){
            if(TTL.hasOwnProperty(i)){
                if(TTL[i] <= curtime){
                    delete TTL[i];
                    delete CRC32[i];
                    delete _storage[i];
                    changed = true;
                    deleted.push(i);
                }else if(TTL[i] < nextExpire){
                    nextExpire = TTL[i];
                }
            }
        }

        // set next check
        if(nextExpire != Infinity){
            _ttl_timeout = setTimeout(_handleTTL, nextExpire - curtime);
        }

        // save changes
        if(changed){
            _save();
            _publishChange();
            _fireObservers(deleted, "deleted");
        }
    }

    /**
     * Checks if there's any events on hold to be fired to listeners
     */
    function _handlePubSub(){
        if(!_storage.__jstorage_meta.PubSub){
            return;
        }
        var pubelm,
            _pubsubCurrent = _pubsub_last;

        for(var i=len=_storage.__jstorage_meta.PubSub.length-1; i>=0; i--){
            pubelm = _storage.__jstorage_meta.PubSub[i];
            if(pubelm[0] > _pubsub_last){
                _pubsubCurrent = pubelm[0];
                _fireSubscribers(pubelm[1], pubelm[2]);
            }
        }

        _pubsub_last = _pubsubCurrent;
    }

    /**
     * Fires all subscriber listeners for a pubsub channel
     *
     * @param {String} channel Channel name
     * @param {Mixed} payload Payload data to deliver
     */
    function _fireSubscribers(channel, payload){
        if(_pubsub_observers[channel]){
            for(var i=0, len = _pubsub_observers[channel].length; i<len; i++){
                // send immutable data that can't be modified by listeners
                _pubsub_observers[channel][i](channel, JSON.parse(JSON.stringify(payload)));
            }
        }
    }

    /**
     * Remove old events from the publish stream (at least 2sec old)
     */
    function _dropOldEvents(){
        if(!_storage.__jstorage_meta.PubSub){
            return;
        }

        var retire = +new Date() - 2000;

        for(var i=0, len = _storage.__jstorage_meta.PubSub.length; i<len; i++){
            if(_storage.__jstorage_meta.PubSub[i][0] <= retire){
                // deleteCount is needed for IE6
                _storage.__jstorage_meta.PubSub.splice(i, _storage.__jstorage_meta.PubSub.length - i);
                break;
            }
        }

        if(!_storage.__jstorage_meta.PubSub.length){
            delete _storage.__jstorage_meta.PubSub;
        }

    }

    /**
     * Publish payload to a channel
     *
     * @param {String} channel Channel name
     * @param {Mixed} payload Payload to send to the subscribers
     */
    function _publish(channel, payload){
        if(!_storage.__jstorage_meta){
            _storage.__jstorage_meta = {};
        }
        if(!_storage.__jstorage_meta.PubSub){
            _storage.__jstorage_meta.PubSub = [];
        }
        
        _storage.__jstorage_meta.PubSub.unshift([+new Date, channel, payload]);

        _save();
        _publishChange();
    }

    /**
     * CRC32 calculation based on http://noteslog.com/post/crc32-for-javascript/
     *
     * @param {String} str String to be hashed
     * @param {Number} [crc] Last crc value in case of streams
     */
    function _crc32(str, crc){
        crc = crc || 0;

        var n = 0, //a number between 0 and 255
            x = 0; //an hex number
 
        crc = crc ^ (-1);
        for(var i = 0, len = str.length; i < len; i++){
            n = (crc ^ str.charCodeAt(i)) & 0xFF;
            x = "0x" + _crc32Table.substr(n * 9, 8);
            crc = (crc >>> 8)^x;
        }
        return crc^(-1);
    }

    ////////////////////////// PUBLIC INTERFACE /////////////////////////

    $.jStorage = {
        /* Version number */
        version: JSTORAGE_VERSION,

        /**
         * Sets a key's value.
         *
         * @param {String} key Key to set. If this value is not set or not
         *              a string an exception is raised.
         * @param {Mixed} value Value to set. This can be any value that is JSON
         *              compatible (Numbers, Strings, Objects etc.).
         * @param {Object} [options] - possible options to use
         * @param {Number} [options.TTL] - optional TTL value
         * @return {Mixed} the used value
         */
        set: function(key, value, options){
            _checkKey(key);

            options = options || {};

            // undefined values are deleted automatically
            if(typeof value == "undefined"){
                this.deleteKey(key);
                return value;
            }

            if(_XMLService.isXML(value)){
                value = {_is_xml:true,xml:_XMLService.encode(value)};
            }else if(typeof value == "function"){
                return undefined; // functions can't be saved!
            }else if(value && typeof value == "object"){
                // clone the object before saving to _storage tree
                value = JSON.parse(JSON.stringify(value));
            }

            _storage[key] = value;

            _storage.__jstorage_meta.CRC32[key] = _crc32(JSON.stringify(value));

            this.setTTL(key, options.TTL || 0); // also handles saving and _publishChange

            _localStoragePolyfillSetKey(key, value);

            _fireObservers(key, "updated");
            return value;
        },

        /**
         * Looks up a key in cache
         *
         * @param {String} key - Key to look up.
         * @param {mixed} def - Default value to return, if key didn't exist.
         * @return {Mixed} the key value, default value or null
         */
        get: function(key, def){
            _checkKey(key);
            if(key in _storage){
                if(_storage[key] && typeof _storage[key] == "object" &&
                        _storage[key]._is_xml &&
                            _storage[key]._is_xml){
                    return _XMLService.decode(_storage[key].xml);
                }else{
                    return _storage[key];
                }
            }
            return typeof(def) == 'undefined' ? null : def;
        },

        /**
         * Deletes a key from cache.
         *
         * @param {String} key - Key to delete.
         * @return {Boolean} true if key existed or false if it didn't
         */
        deleteKey: function(key){
            _checkKey(key);
            if(key in _storage){
                delete _storage[key];
                // remove from TTL list
                if(typeof _storage.__jstorage_meta.TTL == "object" &&
                  key in _storage.__jstorage_meta.TTL){
                    delete _storage.__jstorage_meta.TTL[key];
                }

                delete _storage.__jstorage_meta.CRC32[key];
                _localStoragePolyfillSetKey(key, undefined);

                _save();
                _publishChange();
                _fireObservers(key, "deleted");
                return true;
            }
            return false;
        },

        /**
         * Sets a TTL for a key, or remove it if ttl value is 0 or below
         *
         * @param {String} key - key to set the TTL for
         * @param {Number} ttl - TTL timeout in milliseconds
         * @return {Boolean} true if key existed or false if it didn't
         */
        setTTL: function(key, ttl){
            var curtime = +new Date();
            _checkKey(key);
            ttl = Number(ttl) || 0;
            if(key in _storage){

                if(!_storage.__jstorage_meta.TTL){
                    _storage.__jstorage_meta.TTL = {};
                }

                // Set TTL value for the key
                if(ttl>0){
                    _storage.__jstorage_meta.TTL[key] = curtime + ttl;
                }else{
                    delete _storage.__jstorage_meta.TTL[key];
                }

                _save();

                _handleTTL();

                _publishChange();
                return true;
            }
            return false;
        },

        /**
         * Gets remaining TTL (in milliseconds) for a key or 0 when no TTL has been set
         *
         * @param {String} key Key to check
         * @return {Number} Remaining TTL in milliseconds
         */
        getTTL: function(key){
            var curtime = +new Date(), ttl;
            _checkKey(key);
            if(key in _storage && _storage.__jstorage_meta.TTL && _storage.__jstorage_meta.TTL[key]){
                ttl = _storage.__jstorage_meta.TTL[key] - curtime;
                return ttl || 0;
            }
            return 0;
        },

        /**
         * Deletes everything in cache.
         *
         * @return {Boolean} Always true
         */
        flush: function(){
            _storage = {__jstorage_meta:{CRC32:{}}};
            _createPolyfillStorage("local", true);
            _save();
            _publishChange();
            _fireObservers(null, "flushed");
            return true;
        },

        /**
         * Returns a read-only copy of _storage
         *
         * @return {Object} Read-only copy of _storage
        */
        storageObj: function(){
            function F() {}
            F.prototype = _storage;
            return new F();
        },

        /**
         * Returns an index of all used keys as an array
         * ['key1', 'key2',..'keyN']
         *
         * @return {Array} Used keys
        */
        index: function(){
            var index = [], i;
            for(i in _storage){
                if(_storage.hasOwnProperty(i) && i != "__jstorage_meta"){
                    index.push(i);
                }
            }
            return index;
        },

        /**
         * How much space in bytes does the storage take?
         *
         * @return {Number} Storage size in chars (not the same as in bytes,
         *                  since some chars may take several bytes)
         */
        storageSize: function(){
            return _storage_size;
        },

        /**
         * Which backend is currently in use?
         *
         * @return {String} Backend name
         */
        currentBackend: function(){
            return _backend;
        },

        /**
         * Test if storage is available
         *
         * @return {Boolean} True if storage can be used
         */
        storageAvailable: function(){
            return !!_backend;
        },

        /**
         * Register change listeners
         *
         * @param {String} key Key name
         * @param {Function} callback Function to run when the key changes
         */
        listenKeyChange: function(key, callback){
            _checkKey(key);
            if(!_observers[key]){
                _observers[key] = [];
            }
            _observers[key].push(callback);
        },

        /**
         * Remove change listeners
         *
         * @param {String} key Key name to unregister listeners against
         * @param {Function} [callback] If set, unregister the callback, if not - unregister all
         */
        stopListening: function(key, callback){
            _checkKey(key);

            if(!_observers[key]){
                return;
            }

            if(!callback){
                delete _observers[key];
                return;
            }

            for(var i = _observers[key].length - 1; i>=0; i--){
                if(_observers[key][i] == callback){
                    _observers[key].splice(i,1);
                }
            }
        },

        /**
         * Subscribe to a Publish/Subscribe event stream
         *
         * @param {String} channel Channel name
         * @param {Function} callback Function to run when the something is published to the channel
         */
        subscribe: function(channel, callback){
            channel = (channel || "").toString();
            if(!channel){
                throw new TypeError('Channel not defined');
            }
            if(!_pubsub_observers[channel]){
                _pubsub_observers[channel] = [];
            }
            _pubsub_observers[channel].push(callback);
        },

        /**
         * Publish data to an event stream
         *
         * @param {String} channel Channel name
         * @param {Mixed} payload Payload to deliver
         */
        publish: function(channel, payload){
            channel = (channel || "").toString();
            if(!channel){
                throw new TypeError('Channel not defined');
            }

            _publish(channel, payload);
        },

        /**
         * Reloads the data from browser storage
         */
        reInit: function(){
            _reloadData();
        }
    };

    // Initialize jStorage
    _init();

//})();
};


/****************************[[rbTCORS.js]]*************************************/ 


/*
 * Copyright (C) 2011 Ovea <dev@ovea.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * https://gist.github.com/1114981
 *
 * By default, support transferring session cookie with XDomainRequest for IE. The cookie value is by default 'jsessionid'
 *
 * You can change the session cookie value like this, before including this script:
 *
 * window.XDR_SESSION_COOKIE_NAME = 'ID';
 *
 * Or if you want to disable cookie session support:
 *
 * window.XDR_SESSION_COOKIE_NAME = null;
 *
 * If you need to convert other cookies as headers:
 *
 * window.XDR_COOKIE_HEADERS = ['PHP_SESSION'];
 *
 * To DEBUG:
 *
 * window.XDR_DEBUG = true;
 *
 * To pass some headers:
 *
 * window.XDR_HEADERS = ['Content-Type', 'Accept']
 *
 */
//(function ($) {
trigger_fish.enableCORS = function($) {
    var _this;
    if (!('__jquery_xdomain__' in $)
        && $.browser.msie // must be IE
        && 'XDomainRequest' in window // and support XDomainRequest (IE8+)
        && !('XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest()) // and must not support CORS (IE10+)
        && document.location.href.indexOf("file:///") == -1) { // and must not be local

        $['__jquery_xdomain__'] = $.support.cors = true;

        var urlMatcher = /^(((([^:\/#\?]+:)?(?:\/\/((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?]+)(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,
            oldxhr = $.ajaxSettings.xhr,
            sessionCookie = 'XDR_SESSION_COOKIE_NAME' in window ? window['XDR_SESSION_COOKIE_NAME'] : "jsessionid",
            cookies = 'XDR_COOKIE_HEADERS' in window ? window['XDR_COOKIE_HEADERS'] : [],
            headers = 'XDR_HEADERS' in window ? window['XDR_HEADERS'] : ['Content-Type'],
            ReadyState = {UNSENT:0, OPENED:1, LOADING:3, DONE:4},
            debug = window['XDR_DEBUG'] && 'console' in window,
            XDomainRequestAdapter,
            domain,
            reqId = 0;

        function forEachCookie(names, fn) {
            if (typeof names == 'string') {
                names = [names];
            }
            var i, cookie;
            for (i = 0; i < names.length; i++) {
                cookie = new RegExp('(?:^|; )' + names[i] + '=([^;]*)', 'i').exec(document.cookie);
                cookie = cookie && cookie[1];
                if (cookie) {
                    fn.call(null, names[i], cookie);
                }
            }
        }

        function parseResponse(str) {
            // str === [data][header]~status~hlen~
            // min: ~0~0~
            if (str.length >= 5) {
                // return[0] = status
                // return[1] = data
                // return[2] = header
                var sub = str.substring(str.length <= 20 ? 0 : str.length - 20),
                    i = sub.length - 1,
                    end, hl, st;
                if (sub.charAt(i) === '~') {
                    for (end = i--; i >= 0 && sub.charAt(i) !== '~'; i--);
                    hl = parseInt(sub.substring(i + 1, end));
                    if (!isNaN(hl) && hl >= 0 && i >= 2 && sub.charAt(i) === '~') {
                        for (end = i--; i >= 0 && sub.charAt(i) !== '~'; i--);
                        st = parseInt(sub.substring(i + 1, end));
                        if (!isNaN(st) && i >= 0 && sub.charAt(i) === '~') {
                            end = str.length - hl - sub.length + i;
                            return [st, str.substring(0, end), str.substr(end, hl)];
                        }
                    }
                }
            }
            return [200, str, ''];
        }

        function parseUrl(url) {
            if (typeof(url) === "object") {
                return url;
            }
            var matches = urlMatcher.exec(url);
            return matches ? {
                href:matches[0] || "",
                hrefNoHash:matches[1] || "",
                hrefNoSearch:matches[2] || "",
                domain:matches[3] || "",
                protocol:matches[4] || "",
                authority:matches[5] || "",
                username:matches[7] || "",
                password:matches[8] || "",
                host:matches[9] || "",
                hostname:matches[10] || "",
                port:matches[11] || "",
                pathname:matches[12] || "",
                directory:matches[13] || "",
                filename:matches[14] || "",
                search:matches[15] || "",
                hash:matches[16] || ""
            } : {};
        }

        function parseCookies(header) {
            if (header.length == 0) {
                return [];
            }
            var cooks = [], i = 0, start = 0, end, dom;
            do {
                end = header.indexOf(',', start);
                cooks[i] = (cooks[i] || '') + header.substring(start, end == -1 ? header.length : end);
                start = end + 1;
                if (cooks[i].indexOf('Expires=') == -1 || cooks[i].indexOf(',') != -1) {
                    i++;
                } else {
                    cooks[i] += ',';
                }
            } while (end > 0);
            for (i = 0; i < cooks.length; i++) {
                dom = cooks[i].indexOf('Domain=');
                if (dom != -1) {
                    cooks[i] = cooks[i].substring(0, dom) + cooks[i].substring(cooks[i].indexOf(';', dom) + 1);
                }
            }
            return cooks;
        }

        domain = parseUrl(document.location.href).domain;
        XDomainRequestAdapter = function () {
            var self = this,
                _xdr = new XDomainRequest(),
                _mime,
                _reqHeaders = [],
                _method,
                _url,
                _id = reqId++,
                _setState = function (state) {
                    self.readyState = state;
                    if (typeof self.onreadystatechange === 'function') {
                        self.onreadystatechange.call(self);
                    }
                },
                _done = function (state, code) {
                    if (!self.responseText) {
                        self.responseText = '';
                    }
                    if (debug) {
                        console.log('[XDR-' + _id + '] request end with state ' + state + ' and code ' + code + ' and data length ' + self.responseText.length);
                    }
                    self.status = code;
                    if (!self.responseType) {
                        _mime = _mime || _xdr.contentType;
                        if (_mime.match(/\/json/)) {
                            self.responseType = 'json';
                            self.response = self.responseText;
                        } else if (_mime.match(/\/xml/)) {
                            self.responseType = 'document';
                            var $error, dom = new ActiveXObject('Microsoft.XMLDOM');
                            dom.async = false;
                            dom.loadXML(self.responseText);
                            self.responseXML = self.response = dom;
                            if ($(dom).children('error').length != 0) {
                                $error = $(dom).find('error');
                                self.status = parseInt($error.attr('response_code'));
                            }
                        } else {
                            self.responseType = 'text';
                            self.response = self.responseText;
                        }
                    }
                    _setState(state);
                    // clean memory
                    _xdr = null;
                    _reqHeaders = null;
                    _url = null;
                };
            _xdr.onprogress = function () {
                _setState(ReadyState.LOADING);
            };
            _xdr.ontimeout = function () {
                _done(ReadyState.DONE, 408);
            };
            _xdr.onerror = function () {
                _done(ReadyState.DONE, 500);
            };
            _xdr.onload = function () {
                // check if we are using a filter which modify the response
                var cooks, i, resp = parseResponse(_xdr.responseText || '');
                if (debug) {
                    console.log('[XDR-' + reqId + '] parsing cookies for header ' + resp[2]);
                }
                cooks = parseCookies(resp[2]);
                self.responseText = resp[1] || '';
                if (debug) {
                    console.log('[XDR-' + _id + '] raw data:\n' + _xdr.responseText + '\n parsed response: status=' + resp[0] + ', header=' + resp[2] + ', data=\n' + resp[1]);
                }
                for (i = 0; i < cooks.length; i++) {
                    if (debug) {
                        console.log('[XDR-' + _id + '] installing cookie ' + cooks[i]);
                    }
                    document.cookie = cooks[i] + ";Domain=" + document.domain;
                }
                _done(ReadyState.DONE, resp[0]);

                if(typeof(_this.success) === "function"){
                    _this.success(resp[1]);
                }
                resp = null;
            };
            this.readyState = ReadyState.UNSENT;
            this.status = 0;
            this.statusText = '';
            this.responseType = '';
            this.timeout = 0;
            this.withCredentials = false;
            this.overrideMimeType = function (mime) {
                _mime = mime;
            };
            this.abort = function () {
                _xdr.abort();
            };
            this.setRequestHeader = function (k, v) {
                if ($.inArray(k, headers) >= 0) {
                    _reqHeaders.push({k:k, v:v});
                }
            };
            this.open = function (m, u) {
                _url = u;
                _method = m;
                _setState(ReadyState.OPENED);
            };
            this.send = function (data) {
                _xdr.timeout = this.timeout;
                if (sessionCookie || cookies || _reqHeaders.length) {
                    var h, addParam = function (name, value) {
                        var q = _url.indexOf('?');
                        _url += (q == -1 ? '?' : '&') + name + '=' + encodeURIComponent(value);
                        if (debug) {
                            console.log('[XDR-' + _id + '] added parameter ' + name + "=" + value + " => " + _url);
                        }
                    };
                    for (h = 0; h < _reqHeaders.length; h++) {
                        addParam(_reqHeaders[h].k, _reqHeaders[h].v);
                    }
                    forEachCookie(sessionCookie, function (name, value) {
                        var q = _url.indexOf('?');
                        if (q == -1) {
                            _url += ';' + name + '=' + value;
                        } else {
                            _url = _url.substring(0, q) + ';' + name + '=' + value + _url.substring(q);
                        }
                        if (debug) {
                            console.log('[XDR-' + _id + '] added cookie ' + _url);
                        }
                    });
                    forEachCookie(cookies, addParam);
                    addParam('_xdr', '' + _id);
                }
                if (debug) {
                    console.log('[XDR-' + _id + '] opening ' + _url);
                }
                _xdr.open(_method, _url);
                if (debug) {
                    console.log('[XDR-' + _id + '] send, timeout=' + _xdr.timeout);
                }
                _xdr.send(data);
            };
            this.getAllResponseHeaders = function () {
                return '';
            };
            this.getResponseHeader = function () {
                return null;
            }
        };

        $.ajaxSettings.xhr = function () {
            var target = parseUrl(this.url).domain;
            _this = this;
            if (target === "" || target === domain) {
                return oldxhr.call($.ajaxSettings);
            } else {
                try {
                    return new XDomainRequestAdapter();
                } catch (e) {
                }
            }
        };

    }
};
//})(jQuery);


/****************************[[rbTActor.js]]*************************************/ 


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
      }

  };

}();



/****************************[[rbTClientDebugger.js]]*************************************/ 


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
/*
 * JavaScript Debug - v0.4 - 6/22/2010
 * http://benalman.com/projects/javascript-debug-console-log/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 * 
 * With lots of help from Paul Irish!
 * http://paulirish.com/
 */
trigger_fish.rbTDebug=(function(){var i=this,b=Array.prototype.slice,d=i.console,h={},f,g,m=9,c=["error","warn","info","debug","log"],l="assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "),j=l.length,a=[];while(--j>=0){(function(n){h[n]=function(){m!==0&&d&&d[n]&&d[n].apply(d,arguments)}})(l[j])}j=c.length;while(--j>=0){(function(n,o){h[o]=function(){var q=b.call(arguments),p=[o].concat(q);a.push(p);e(p);if(!d||!k(n)){return}d.firebug?d[o].apply(i,q):d[o]?d[o](q):d.log(q)}})(j,c[j])}function e(n){if(f&&(g||!d||!d.log)){f.apply(i,n)}}h.setLevel=function(n){m=typeof n==="number"?n:9};function k(n){return m>0?m>n:c.length+m<=n}h.setCallback=function(){var o=b.call(arguments),n=a.length,p=n;f=o.shift()||null;g=typeof o[0]==="boolean"?o.shift():false;p-=typeof o[0]==="number"?o.shift():n;while(p<n){e(a[p++])}};return h})();


/****************************[[rbTRules.js]]*************************************/ 


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
var TEST_RBT_RULE_JSON = {
                            "customer":{
                                        "name" :["samarth"],
                                        "email":["gmail.com"],
                                        "val1":[123],
                                        "val2":[321],
                                        "swh":["actwitty"],
                                        "ewh":["actwitty"],
                                        "cns":["actwitty"],
                                        "drg":["3/3/2011"],
                                        "dag":["11/7/2012"],
                                        "rgx":["deosamarth"],
                                        "set":["abc"],
                                       }
                         };

trigger_fish.rbTRules = {

  ruleTable : {},

  operations : { 
                  'gtn': 'greater than',
                  'ltn': 'lesser than',
                  'eql': 'equal to',
                  'swh': 'starts with',
                  'ewh': 'ends with',
                  'cns': 'contains',
                  'btn': 'between',
                  'rgx': 'regex',
                  'dag': 'days ago',
                  'drg': 'date range',
                  'set': 'set'
  },
  "permissions" : {
          'String': [ 'eql', 'swh','ewh','cns','rgx','set' ],
          'Date': [ 'gtn','ltn','eql','dag','drg','set' ],  
          'Number': [ 'gtn','ltn','eql','btn','set'] 
  },

  /**
  * Set rules table for business
  * @return void
  */
  setRulesTable : function(rules)
  {
    "use strict";
    //rules = this.sample_json;
    var ruleString = "";


    function ruleConnect(rule)
    {
      if (rule.connect) {
        if (rule.connect === "and")
          return "&& ";
        else if (rule.connect === "or")
          return " || ";
        else 
          return " ";
      } else 
        return " ";
    }
    function ruleParams(rule,event)
    {
      //return "('"+JSON.stringify(rule)+",'"+event+"')";
      rule.event = event;
      return "('"+JSON.stringify(rule)+"')";
    }

    try {
        jQuery.each(rules, function(index, ruleList) {
          if (!trigger_fish.rbTRules.ruleTable[ruleList.event])
            trigger_fish.rbTRules.ruleTable[ruleList.event] = [];
          ruleString = " ";
          for (var rule in ruleList.conditions) {
            ruleString = ruleString + "trigger_fish.rbTRules.evalRule" + 
                         ruleParams(ruleList.conditions[rule],ruleList.event) + 
                         ruleConnect(ruleList.conditions[rule]);
          }
          trigger_fish.rbTRules.ruleTable[ruleList.event].push({ "name"         : ruleList.name,
                                                                 "ruleString"   : ruleString,
                                                                 "action"       : ruleList.action,
                                                                 "action_param" : ruleList.action_param
                                                               });                                                  

        });
    } catch (e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                                       "message"   : "rule table setting failed",
                                       "rules"     : rules
                                      });
    }

  },

  /**
  * Execute rules table for particular events
  * @param {string} event The event for which we need to check rules.
  * @return void
  */
  executeRulesOnEvent : function(event)
  {
    function prepareFunctionCode(ruleString) 
    {
      $("#rulestring").append('<h3>'+ruleString+'</h3>');
      return 'if (' + ruleString + ') { return true; } else { return false;}';
    }
    
    // Client will not execute any rules if there is no schema set. 
    var appData = trigger_fish.rbTAPP.getAppDetail();
    if (!appData.app.schema) {
      trigger_fish.rbTDebug.log({"message":"There is no schema set for app, cannot execute rules"});
      return;
    }
    try {
          var that=this;
          jQuery.each(this.ruleTable[event], function(index, rule) {
            var functionCode = prepareFunctionCode(rule.ruleString);
            var isRuleValid = new Function(functionCode)();
            if (isRuleValid) {
              $("#result").append("RULES PASSED");
              that.invokeAction(rule);
            } else {
              $("#result").append("RULES FAILED");
            }  
          });
          
    } catch (e) {
      if (this.ruleTable[event])
        var ruleStr = this.ruleTable[event].ruleString || "--";
      else
        var ruleStr = "Rule string cannot be formed!";  
        trigger_fish.rbTAPP.reportError({"exception"  : e.message,
                          "message"    : "rule execution on event failed" , 
                          "event_name" : event,
                          "rule_string": ruleStr
                         });
    } 
  },
  

  

  /**
  * FIXME : check if this needs to be invoked in getRulesTable's server response
  * Evaluate property value to a suitable sys or user property
  * 
  * @return {string} status Status of the event execution (no-pending, executed, error)
  */
  executeLastPendingEvent : function()
  {
    "use strict";
    try {
      var lastEvent = trigger_fish.rbTCookie.getCookie("lastevent");
      if (lastEvent) {
        this.executeRulesOnEvent(lastEvent);
      } else {
        throw "no last event found"
      }
    } catch(e) {
      trigger_fish.rbTDebug.log("no last event found");
    }
  },

  
  /**
  * Invoke the action on rule.
  * @param {object} rule The rule for which we need to invoke action
  * @return void
  */
  invokeAction : function(rule)
  {
    try {
      // Hand over action to templating engine for processing event action.
      //rbTTemplates.invoke(this.ruleTable[event].action, this.ruleTable[event].action_param);
      //rbT.invokeActionScript(this.ruleTable[event].action, this.ruleTable[event].action_param);
      trigger_fish.rbT.invokeActionScript(rule.action);
    } catch(e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message": "action could not be invoked" , 
                          "event" : event
                         });
    }
  },
 
  /**
  * Check the negate status
  * @param {string} negation status
  * @return boolean !negate status
  */
  isNegate :  function(x)
  {
    return (x === "true") ? true : false; 
  },

  /**
  * Check the data type of object
  * @param {string} rule propertry
  * @return {string} datatype of the object.
  */  
  getDataType : function(event,ruleProp,scope,json)
  {
    return json.type || undefined;
    /* 
    // FIXME :: WE NEED TO CHANGE THIS TO GET IT FROM SCHEMA
    //return Object.prototype.toString.call(a).split("]")[0].split(" ")[1];
    var appSchema = trigger_fish.rbTAPP.getAppDetail().app.schema;

    if (scope === "e") {
      return appSchema.events[event][ruleProp];
    } else if (scope === "s") {
      return appSchema.system[ruleProp];
    } else if (scope === "a") {
      return appSchema.profile[ruleProp];
    }
    */

  },

  /**
  * FIXME : enable this with new json format (based on scope property)
  * Evaluate property value to a suitable sys or user property
  * @param {string} ruleProperty For which we need to evaluate data type
  * @param {string} type Datatype of the property
  * @param {string} scope Scope of the property, to which we need to look for.
  * @return {object} or {boolean}
  */
  //evalProperty : function(ruleProperty, type, scope)
  evalProperty : function(ruleJson)
  {
    if (!ruleJson.property)
      return "";
 
    var p = ruleJson.property.replace(/]/g,"").replace(/\[/g,".");
    var value = null;

    var validProp = 1;
    try {
      if (ruleJson.scope === "a") {
        var actorProp = trigger_fish.rbTActor.getProperties();
        value = eval("actorProp."+p+".slice(-1)[0]");
      } else if (ruleJson.scope === "s") {
        var systemVars = trigger_fish.rbTSystemVar.getProperty();
        value = eval("systemVars."+p);
      } else if (ruleJson.scope === "e") {
        var transVar = trigger_fish.rbTAPP.getTransVar(); 
        value = eval("transVar."+p); 
      }
    } catch (e) {
      validProp = 0;
    } 

    if (!validProp || !value) {
      trigger_fish.rbTAPP.log({"message":"Not a valid property to evaluate rule on"});
      return false;
    }
    
    var type = this.getDataType(ruleJson.event, ruleJson.property, ruleJson.scope, ruleJson);
    if (!type)
        return value;
    if (type === "String")
        return value.toString(); 
    else if (type === "Date")
        return new Date(value);
    else if (type === "Number")
        return parseFloat(value);
    
  },

  /**
  *   Execute rules table for particular events
  *   @param {string} property The property for which we need to operate upon
  *   @param {string} value The value for which we need to operate upon
  *   @return {object} value Converted value based on property data type
  */
  valueDataType : function(property, value, dataType)
  {
    "use strict";
    // We are expecting only 3 types i.e string or number or date
    // ******FIXME : WE NEED TO GET THE DATA TYPES FROM APP SCHEMA********
    if (!value || !property)
      return undefined;
    var dt = dataType;
    try {
        if (dt === "String") {
          return value.toString();
        } else if(dt === "Number") {
          return parseFloat(value);
        } else if(dt === "Date") {
          return new Date(value);
        }
    } catch (e) {
        // FIXME :: something wrong with type conversion
        trigger_fish.rbTAPP.reportError({"exception" : e.message,
                            "message":"data type conversion on rule value failed" , 
                            "property" : property,
                            "value" : value
                           });
    }
  },

  /**
  * Check the validity of the rule based on permitted operations on data type
  * @param {string} dt DataType of rule applying.
  * @param {string} s Scope of rule applying.
  * @param {string} t Type of rule applying.
  * @param {string} a Rule property
  * @param {string} b Rule value 1
  * @param {string} [c] Rule value 2
  * @return boolean validity
  */
  //isValidRule : function(dt,s,t,a,b,c)
  isValidRule : function(ruleJson )
  {
    if (!ruleJson.property) 
      return false;
    if (ruleJson.type ==="set") 
      return true;
    //var propVal = this.evalProperty(ruleJson.property,ruleJson.type,ruleJson.scope);
    var propVal = this.evalProperty(ruleJson);
    if (!propVal)
      return false;
    var propDT = this.getDataType(ruleJson.event, ruleJson.property, ruleJson.scope, ruleJson);
       

    var v1DT = Object.prototype.toString.call(ruleJson.value1).split("]")[0].split(" ")[1];
    if (ruleJson.value2)
      var v2DT = Object.prototype.toString.call(ruleJson.value2).split("]")[0].split(" ")[1];

    var v2DT = v2DT || v1DT;

    if (!this.permissions[propDT] || this.permissions[propDT].indexOf(ruleJson.operation) < 0)
      return false;
    
    if (propDT === "String" && (v1DT!==propDT || v2DT!==propDT)) {
      return false;
    } else if (propDT === "Number" && (parseFloat(ruleJson.value1) === "NaN" || (ruleJson.value2 && parseFloat(ruleJson.value2) === "NaN"))) {
      return false;
    } else if (propDT === "Date") {
      var v1Date = new Date(ruleJson.value2);
      if (ruleJson.value2)
        var v2Date = new Date(ruleJson.value2);
      v2Date = v2Date || v1Date;
      if (v1Date.toString() === "Invalid Date" || v2Date.toString() === "Invalid Date")
        return false;
    }
    
    return true; 
  },
 
  /**
  * Function to evaluate rule.
  * @param {object} rule The rule json which needs to be executed.
  *
  * @return {boolean} result That outcome of rule evaluation.
  */
  evalRule : function(rule)
  {
    var ruleJson = JSON.parse(rule);
    try {
      var v1   = ruleJson.value1,
          v2   = ruleJson.value2,
          neg  = ruleJson.negation,
          op   = ruleJson.operation,
          type = ruleJson.type,
          prop = ruleJson.property,
          scope= ruleJson.scope,
          event= ruleJson.event;
      //if (!trigger_fish.rbTRules.isValidRule(type,scope,op,prop,v1,v2))
      //   return false;
      if (!trigger_fish.rbTRules.isValidRule(ruleJson))
          return false;
      var res = false;
      var propDT = this.getDataType(ruleJson.event, ruleJson.property, ruleJson.scope, ruleJson);
      var p = trigger_fish.rbTRules.evalProperty(ruleJson),
          a = trigger_fish.rbTRules.valueDataType(ruleJson.property, ruleJson.value1, propDT),
          b = trigger_fish.rbTRules.valueDataType(ruleJson.property, ruleJson.value2, propDT);
      switch(op) {
      case "ltn":
          res = this.rule.ltn(p,a);
          break;
      case "gtn":
          res = this.rule.gtn(p,a);
          break;
      case "eql":
          res = this.rule.eql(p,a);
          break;
      case "cns":
          res = this.rule.cns(p,a);
          break;
      case "swh":
          res = this.rule.swh(p,a);
          break;
      case "ewh":
          res = this.rule.ewh(p,a);
          break;
      case "btn":
          res = this.rule.btn(p,a,b);
          break;
      case "rgx":
          res = this.rule.rgx(p,a);
          break;
      case "drg":
          res = this.rule.drg(p,a,b);
          break;
      case "dag":
          res = this.rule.dag(p,a);
          break;
      case "set":
          res = this.rule.set(p,a);
          break;
      }
      return (ruleJson.negation === "true") ? !res : res;
    } catch (e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                                       "message"   :"rule evaluation on"+ ruleJson.operation +" failed" , 
                                       "rule"      : ruleJson,
                                      });
    }
  },

  /* RULE FUNCTIONS */
  rule : 
  {
    /**
    * Rule to check for less than
    * @param {object} p Rule property
    * @param {object} v Rule value
    * @return {boolean} Validity based on rule
    */ 
    ltn : function(p,v)
    {
      $("#applyingrules").append("<h3>less than</h3>");
      return (p < v);
    },
        
    /**
    * Rule to check for greater than
    * @param {object} p Rule property
    * @param {object} v Rule value
    * @return {boolean} Validity based on rule    */ 
    gtn : function(p,v)
    {
      "use strict";
      $("#applyingrules").append("<h3>greater than</h3>");
      return (p > v);
    },

    /**
    * Rule to check for equal to
    * @param {object} p Rule property
    * @param {object} v Rule value
    * @return {boolean} Validity based on rule
    */ 
    eql : function(p,v)
    {
      "use strict";
      $("#applyingrules").append("<h3>equal to</h3>");
      return (p === v);
    },

    /**
    * Rule to check for contains
    * @param {object} p Rule property
    * @param {object} v Rule value
    * @return {boolean} Validity based on rule
    */ 
    cns: function(p,v)
    {
      "use strict";
      $("#applyingrules").append("<h3>contains</h3>");
      return ((p.indexOf(v) >= 0)?true:false);
    },

    /**
    * Rule to check for starts with condition
    * @param {object} p Rule property
    * @param {object} v Rule value
    * @return {boolean} Validity based on rule
    */ 
    swh : function(p,v)
    {
      "use strict";
      $("#applyingrules").append("<h3>starts with</h3>");
      return ((p.match("^"+v))?true:false);  
    },

    /**
    * Rule to check for ends with condition
    * @param {object} p Rule property
    * @param {object} v Rule value
    * @return {boolean} Validity based on rule
    */ 
    ewh : function(p,v)
    {
      "use strict";
      $("#applyingrules").append("<h3>ends with</h3>");
      return (p.match(v+"$")?true:false);
    },

    /**
    * Rule to check for in between range
    * @param {object} p Rule property
    * @param {object} v1 Rule value1
    * @param {object} v2 Rule value2
    * @return {boolean} Validity based on rule
    */ 
    btn : function(p,v1,v2)
    {
      "use strict";
      $("#applyingrules").append("<h3>between</h3>");
      return ((p>=v1)&&(p<=v2))?true:false;
    },

    /**
    * Rule to check for regex condition
    * @param {object} p Rule property
    * @param {object} v Rule value
    * @return {boolean} Validity based on rule
    */ 
    rgx : function(p,v)
    {
      "use strict";
      $("#applyingrules").append("<h3>regex</h3>");
      var regexp = new RegExp(v,'gi'); 
      var res = regexp.test(p);
      return res;
    },

    /**
    * Rule to check for days ago condition
    * @param {object} p Rule property
    * @param {object} v Rule value
    * @return {boolean} Validity based on rule
    */
    dag : function(p,v)
    {
      "use strict";
      $("#applyingrules").append("<h3>days ago</h3>");
      var oneDay = 24*60*60*1000,fD = new Date(p),sD = new Date();
      var diffDays = Math.round( Math.abs((fD.getTime() - sD.getTime())/(oneDay)) );
      return (diffDays === trigger_fish.rbTRules.valueDataType(diffDays, v))?true:false;
    },

    /**
    * Rule to check for date range condition
    * @param {object} p Rule property
    * @param {object} v Rule value
    * @return {boolean} Validity based on rule
    */
    drg : function(p,v1,v2)
    {
      "use strict";
      $("#applyingrules").append("<h3>days between</h3>");
      return ( (p>=trigger_fish.rbTRules.valueDataType(p,v1)) && 
               (p<=trigger_fish.rbTRules.valueDataType(p,v2)) )
                ? true : false;  
    },

    /**
    * Rule to check for set to condition
    * @param {object} p Rule property
    * @return {boolean} Validity based on rule
    */
    set : function(p)
    {
      "use strict";
      $("#applyingrules").append("<h3>set prop</h3>");
      return (p?true:false);
    }

  }
};


/****************************[[rbTServerResponse.js]]*************************************/ 



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
trigger_fish.rbTServerResponse = {

  /** 
  *  Handle default success callback if not mentioned explicitly
  *   
  *  @return void
  */ 
  defaultSuccessCallback : function(respData)
  {
    // FIXME : what to do?
    trigger_fish.rbTAPP.log({"message": "Success callback : default server response","data":respData});
  },
  /** 
  *  Handle default error callback if not mentioned explicitly
  *   
  *  @return void
  */ 
  defaultErrorCallback : function(respData)
  {
    // FIXME : what to do?
    trigger_fish.rbTAPP.log({"message": "Error callback : default server response","data":respData});
  },


  /**
  * Set actor identification based on server response
  * @param {object} respData Actor identification details
  * @return void
  */
  setActorID : function(respData)
  { 
    "use strict";
    trigger_fish.rbTAPP.log({"message": "Setting actor ID with server resp","data":respData});
    try {
      if (respData && respData.actor_id) {
        // FIXME :: Flush and reset all cookies if there is a change in actor.
        // WAITING AS THERE ARE SOME CHANGES IN BACKEND.
        var oldActorId = trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.actorID);
        if (!oldActorId || (oldActorId !== respData.actor_id)) {
          trigger_fish.rbTCookie.setCookie(trigger_fish.rbTCookie.defaultCookies.actorID, JSON.stringify(respData.actor_id));
          trigger_fish.rbTActor.setID(respData.actor_id);
          trigger_fish.rbTServerChannel.makeRequest({"url"           : trigger_fish.rbTServerChannel.url.readActor, 
                                                     "set_actor_prop": true,
                                                     "cb"            : { success: trigger_fish.rbTServerResponse.setActorProperty,
                                                                         error  : trigger_fish.rbTServerResponse.defaultError
                                                                       }
                                                    });
        }
      } else {
        throw new Error("there is no server resp data");
      }
    } catch(e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "setting actor failed",
                          "data"      : respData
                        });
    }
  },


  /**
  * Set actor identification based on server response
  * @param {object} respData Actor identification details
  * @return void
  */
  setActorProperty : function(respData)
  {
    "use strict";
    trigger_fish.rbTAPP.log({"message": "Setting actor detail property with server resp","data":respData});

    // FIXME : check for which property to set
    try {
      if (respData && respData.description.profile) {
        trigger_fish.rbTActor.setProperties(respData.description.profile);
      } else {
        throw new Error("there is no data for setting actor property");
      }
    } catch(e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                                       "message"   : "setting user property failed",
                                       "data"      : respData
                                      });
    }
  }, 

  

  /**
  * Handle event response from server
  * @param {object} respData Actor identification details
  * @return void
  */
  handleEvent : function(respData)
  {
    "use strict";
    trigger_fish.rbTAPP.log({"message": "Handling event with server resp","data":respData});
    try {
      if(respData && respData.actor) {
        trigger_fish.rbTCookie.setCookie(trigger_fish.rbTCookie.defaultCookies.actor, respData.actor);
      } else {
        throw "there is no data";
      }
    } catch(e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "handling event failed",
                          "data"      : respData
                        });
    }
  },

  /**
  * Set Rules response from server
  * @param {object} respData in the form of rules
  * @return void
  */
  setRules : function(respData)
  {
    "use strict";
    trigger_fish.rbTAPP.log({"message": "Setting rules with server resp","data":respData});

    try {
      if(respData) {
        trigger_fish.rbTRules.setRulesTable(respData);
      } else {
        throw "there is no data";
      }
    } catch(e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "setting rules failed",
                          "data"      : respData
                        });
    }
  },


  /**
  * Set App Specific configs
  * @param {object} respData Data in response to server.
  */
  setAppDetail : function(respData)
  {
    trigger_fish.rbTAPP.log({"message": "Setting app details with server resp","data":respData});
    trigger_fish.rbTAPP.setAppDetail(respData);
    var sample_rule_json = [
        {
          id: '1010101010',
          name  : "sample_name", 
          event : "sample_event",
          action: "topbar.generic.normal",
          action_param :
                  {
                    'rb.t.cr.textColor ':'#333',
                    'rb.t.nr.textFontsize':'15',
                    'rb.t.ft.textFontfamily':'Arial',
                    'rb.t.sg.textFontWeight':'bold',
                    'rb.f.nr.baseZindex':'100',
                    'rb.t.nr.baseWidth':'100',
                    'rb.t.nr.baseHeight':'40',
                    'rb.t.cr.baseBgColor':'#DCDCDC',
                    'rb.t.an.baseTextalign':'center',
                    'rb.t.sg.textLeft':'Hello Hello Hello Hello',
                    'rb.t.nr.btnFontSize':'14',
                    'rb.t.cr.btnBgColor':'#548AC7',
                    'rb.t.cr.btnColor':'white',
                    'rb.t.ul.btnLink':'http://www.google.com',
                    'rb.t.sg.btnLable':'Click',
                    'rb.t.sg.textRight':'Hello Hello',
                    'rb.t.nr.durationOfDisplay':'100'
                  },
          conditions : [
                // event based condition
                { 
                  property: "customer[email]",
                  type : "String",
                  negation: 'false',
                  operation: 'eql',
                  value1: 'gmail.com',
                  scope: "a",
                },
              ]
        },
        {
          id: '1010101010',
          name  : "sample_name", 
          event : "sample_event",
          action: "topbar.generic.normal",
          action_param :
                  [
                     {key:'rb.t.cr.textColor ',value:'#333'},
                     {key:'rb.t.nr.textFontsize',value:'15'},
                     {key:'rb.t.ft.textFontfamily',value:'Arial'},
                     {key:'rb.f.nr.baseZindex',value:'100'},
                     {key:'rb.t.nr.baseWidth',value:'100'},
                     {key:'rb.t.nr.baseHeight',value:'40'},
                     {key:'rb.t.cr.baseBgColor',value:'#DCDCDC'},
                     {key:'rb.t.an.baseTextalign',value:'center'},
                     {key:'rb.t.sg.textLeft',value:'Hello Hello Hello Hello'},
                     {key:'rb.t.nr.btnFontSize',value:'14'},
                     {key:'rb.t.cr.btnBgColor',value:'#548AC7'},
                     {key:'rb.t.cr.btnColor',value:'white'},
                     {key:'rb.t.ul.btnLink',value:'http://www.google.com'},
                     {key:'rb.t.sg.btnLable',value:'Click'},
                     {key:'rb.t.sg.textRight',value:'Hello Hello'},
                     {key:'rb.t.ul.helpLink',value:'http://www.rulebot.com'},
                  ],
          conditions : [
                // event based condition
                { 
                  property: "customer[name]",
                  type : "String",
                  negation: 'false',
                  operation: 'eql',
                  value1: 'samarth',
                  scope: "a",
                },
              ]
        },
    ];
    
    //trigger_fish.rbTRules.setRulesTable(sample_rule_json);
    trigger_fish.rbTRules.setRulesTable(respData.app.rules || {});
    trigger_fish.rbTSystemVar.init(respData);

    trigger_fish.rbTAPP.configs.status = true;
  }

};


/****************************[[rbTServerReq.js]]*************************************/ 


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
trigger_fish.rbTServerChannel = {
  
  rbt_url : "http://localhost:3000/",

  
  /* All server url routes to be mapped here */
  url : {
    "appDetails"        : "app/read",
    "fireEvent"         : "event/create",
    "identify"          : "actor/identify",
    "readActor"         : "actor/read",
    "createActor"       : "actor/create",
    "setActor"          : "actor/set",
    "conversion"        : "conversion/create",
    "reportError"       : "err/create",
  },

  // Server request queue
  queue : [],
  actorRQ: [],

  /* Default options for server request */
  defaultOptions : {
    "success_callback" : trigger_fish.rbTServerResponse.defaultSuccessCallback,
    "error_callback"   : trigger_fish.rbTServerResponse.defaultErrorCallback
  },

  /**
  *
  */
  serverUrl : function(type, url)
  {
    var u = this.rbt_url + url + (type === "POST" ? "" : ".json"); 
    return u;
  }, 

  /**
  * Queue server requests.
  * @param {object} obj Object to be queued.
  * @return void
  */
  queueReq : function(obj)
  {
    this.queue.push(obj);
  },

  /**
  * Flush request queue by initiating server requests for queued requests.
  *
  * @return void
  */
  flushReqQueue : function()
  {
    if (!this.queue.length)
      return;
    for (var req in this.queue) {
      var r = this.queue[req];
      if (r.event && !trigger_fish.rbTActor.isReady()) {
        this.waitForActor(r);
      } else {
        this.makeServerRequest(r);
      }
    }
    this.queue = [];
  },


  /**
  *
  *
  */
  /* <<<<<<<<<<<<<<<<<<<<< FIXME :: COAELECE THIS >>>>>>>>>>>> */
  waitForActor : function(obj)
  {
    this.actorRQ.push(obj);
  },

  flushReqWaitingForActor : function()
  {
    if (!this.actorRQ.length)
      return;
    for (var req in this.actorRQ) {
      var r = this.actorRQ[req];
      this.makeServerRequest(r);
    }
    this.actorRQ = [];
  },

  /**
  * Check for App status, if alive , flush all req queue and clear interval.
  *
  */
  reqQFlushInterval : function()
  {
    if (this.queue.length > 1)
      return;
    var interval = setInterval(function() {
      if (trigger_fish.rbTAPP.isrbTAlive()) {
        clearInterval(interval);
        trigger_fish.rbTServerChannel.flushReqQueue();
      }
    }, 2000);
  },


  /** 
  *  Set Request data for all server interactions
  *  @param {object} obj . The data which needs to be padded with request parameters
  *  @return {object} extReqData . Object padded with request params.
  */ 
  extendRequestData : function(obj) 
  {
    if (!obj)
      return {};
    var k = {};
    // FIXME :: **THERE SEEMS TO BE A BIT OF REPEATATION. HANDLE THIS ONCE DECIDED **
    if (obj.event) {
      k = {};
      k["properties"] = obj.params ? obj.params:{};
      k["name"] = obj.event;  
      k["app_id"] = trigger_fish.rbTAPP.getAppID() || "";
      k["actor_id"] = trigger_fish.rbTActor.getID() || "";
    } else if (obj.app_read) {
      k["id"] = trigger_fish.rbTAPP.getAppID() || "";
    } else if (obj.set_actor) {
      k["properties"] = {"profile":obj.params ? obj.params:{}};
      k["id"] = trigger_fish.rbTActor.getID() || "";
      k["app_id"] = trigger_fish.rbTAPP.getAppID() || "";
    } else if(obj.set_actor_prop) {
      k["id"] = trigger_fish.rbTActor.getID() || "";
      k["app_id"] = trigger_fish.rbTAPP.getAppID() || "";
    } else if(obj.identify) {
      k["uid"] = obj.params;
      k["id"] = trigger_fish.rbTActor.getID() || "";
      k["app_id"] = trigger_fish.rbTAPP.getAppID() || "";
    } else if(obj.err || obj.conversion) {
      k["app_id"] = trigger_fish.rbTAPP.getAppID() || "";
      k["actor_id"] = trigger_fish.rbTActor.getID() || "";
      k["properties"] = obj.params ? obj.params:{};
    }

    return k;
  },
  /**
  * Make XMLHttpRequest to Server
  * @param {object} obj Data format which needs to be send.
  * @return void
  */
  makeServerRequest : function(obj)
  {
    "use strict";

    function getContentType(type)
    {
      return type === "POST" ? 'application/x-www-form-urlencoded' : "application/json";
    }

    function getURL(type, url)
    {
      return this.rbt_url + url + (type === "POST" ? "" : ".json"); 
    }

    var that = obj;
    try {
      var reqServerData = this.extendRequestData(obj);
      var callback = this.extendCallbacks(obj.cb);
      if (obj.async && obj.async === "noasync")
        var asyncSt = false;
      else 
        var asyncSt = true;
      var that = obj;
      var url = (obj.event) ? trigger_fish.rbTServerChannel.url.fireEvent : obj.url;
      jQuery.ajax({
            url: getURL.call(this,obj.type,url),
            type: that.type || 'GET',
            async: asyncSt,
            //dataType: 'json',
            contentType : getContentType(obj.type),
            data: reqServerData,
            crossDomain:true,
            timeout : 10000,
            xhrField : { withCredentials:true},
            beforeSend: function() {
                if (that.event) {
                  trigger_fish.rbTCookie.setCookie("lastevent", that.event);
                  trigger_fish.rbTAPP.setTransVar(that.params);
                }
            },
            success: function ( respData ) {
                trigger_fish.rbTAPP.log({"message":"server response success","data":respData});
                if (that.event) {
                  trigger_fish.rbTCookie.deleteCookie("lastevent");
                  trigger_fish.rbTRules.executeRulesOnEvent(that.event);
                  if (respData && respData.actor) { 
                    trigger_fish.rbTServerResponse.setActor(respData.actor);
                    callback.success(respData);
                  }
                  trigger_fish.rbTAPP.setTransVar({});
                } else {
                  respData.url = that.url;
                  callback.success(respData);
                }
            },
            error:function(XMLHttpRequest,textStatus, errorThrown){ 
                trigger_fish.rbTAPP.log({"message":"server response error","data_closure":that,"textStatus":textStatus});
                // FIXME :: ADDED ONLY TO TEST CLIENT SIDE
                if (that.event) {
                  trigger_fish.rbTRules.executeRulesOnEvent(that.event);
                  trigger_fish.rbTAPP.setTransVar({}); 
                }
                callback.error();
                
            }
      });
    } catch(e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   :"SERVER REQUEST FAILED" , 
                          "obj"       : JSON.stringify(that),
                          "log"       : "error" 
                         }); 
    }
  },




  /**
  * Prepare Server request, queue req's if needed be.
  * @param {object} obj Data format which needs to be send.
  */  
  makeRequest : function(obj)
  {
    var that = obj;
    if (!obj)
      return;
    if (!trigger_fish.rbTAPP.isrbTAlive()) {
      if (obj.url)
        obj.async = obj.async || "async";
      this.queueReq(obj);  
      this.reqQFlushInterval();
      return;
    } else {
      this.flushReqQueue();
    }
    try {
      trigger_fish.rbTServerChannel.makeServerRequest(obj);
    } catch (e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "server request params are not valid" , 
                          "url"       : that.url,
                          "log"       : true,
                          "server"    : true
                         });
    }

  },

  /** 
  *  Request server to app details
  *  FIXME : IF THERE IS ANYTHING MISSING
  *  @return void
  */  
  appDetails : function(params, callback)
  {
    "use strict";
    var cb = this.extendCallbacks(callback);
    this.makeServerRequest({"url": this.url.details,
                      "params"     : params,
                      "cb"         : cb
                     });  
  }, 

  /** 
  *  Send conversion to server
  *  @param {object} params 
  *  @return void
  */      
  conversion : function(params, callback)
  {
    "use strict";
    var cb = this.extendCallbacks(callback);
    this.makeRequest({"url"        : rbTServerChannel.url.conversion, 
                      "params"     : params,
                      "conversion" : true,
                      "type"       : "POST",
                      "cb"         : cb
                     });
  }, 

  /** 
  *  Send error report to server
  *  @param {object} params Error log message 
  *  @return void
  */ 
  reportError : function(params)
  {
    "use strict";
    var callback = this.extendCallbacks(callback);
    this.makeRequest({"url":this.url.reportError,"params":params,"type":"POST","err":true, "cb":callback});
  },

  /** 
  *  Extend callback if not mentioned explicitly
  *   
  *  @return void
  */  
  extendCallbacks : function(callback)
  {
    "use strict";
    callback.success = callback.success || this.defaultOptions.success_callback;
    callback.error   = callback.error || this.defaultOptions.error_callback;
    return callback;
  }

};


/****************************[[rbTSystemVar.js]]*************************************/ 


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
/* Rule Bot scope to handle systems variables */
trigger_fish.rbTSystemVar = {

  // All properties will be set here
  properties : {},

  /** Initialize system variable script
   *  @return void
   */
  init : function(respData)
  {
    "use strict";
    function isSystemVarDirty()
    {
      var sysVarInCookie = trigger_fish.rbTCookie.getCookie(trigger_fish.rbTCookie.defaultCookies.systemProp);
      
      if (!sysVarInCookie) {
        return true; 
      } else {
        var currentSysVar = this.getProperty();
        return (sysVarInCookie === currentSysVar) ? false : true;
      }
    }

    // session.js specific calls
    if (typeof(window.exports) === 'undefined'){
      session_fetch(window, document, navigator);
    } else {
      window.exports.session = session_fetch;
    }

    if (isSystemVarDirty.call(this)) {
      // Put current sys var in cookie and send it to server 
      // for update only if we have cookie miss 
      var systemVars = this.getProperty();
      this.setPropertyInCookie(systemVars);
      var schema = respData.app.schema;
      this.notifyServerOfChange(schema?schema.system:undefined);
    }
  },

  /**
  *
  *
  */
  notifyServerOfChange : function(systemVarsDesired)
  {
    trigger_fish.rbTAPP.log({"message":"System variables desired from dashboard","variables":systemVarsDesired});
  },

  /** Set system variable property
   *  @param {string} type
   *  @param {object} value
   *  @return void
   */
  setProperty : function(type, value)
  {
    this.properties[type] = value;
  },


  /** Get system variable property
    'browser' : 'String'
    'browser_version' : 'String'
    'operatingsystem' : 'String'
    'referrer[host]' : 'String'
    'referrer[path]' : 'String'
    'referrer[name]' : 'String'
    'device[type]' : 'String'
    'device[name]' : 'String'
    'screen[height]' : 'Number'
    'screen[width]' :  'Number'
    'viewport[height]' : 'Number'
    'viewport[width]' : 'Number'
    'country' : 'String'
    'language' : 'String'
    'plugins' : 'Array'
    'timezone' : 'String'
    'day_light_saving' : 'Boolean'
  */
  getProperty : function(propertyTypes)
  {
    return this.properties;
  },

  setPropertyInCookie : function(property)
  {
    trigger_fish.rbTCookie.setCookie(trigger_fish.rbTCookie.defaultCookies.systemProp, JSON.stringify(property));
  },

  setEJProp : function(json)
  {
     this.setProperty("country",json.Country); 
     this.setProperty("timezone",json.LocalTimeZone); 
  },

  setSessionJSProp : function(json)
  {
    trigger_fish.rbTAPP.log({"message":"System Properties got through Session JS","data":json});
    this.setProperty("browser",json.browser.browser);
    this.setProperty("browser_version",json.browser.version);
    this.setProperty("operatingsystem",json.browser.os);
    this.setProperty("referrer",json.current_session.referrer_info);
    this.setProperty("device",json.device.type);
    this.setProperty("screen",json.device.screen);
    this.setProperty("viewport",json.device.viewport);
    this.setProperty("plugins",json.plugins);
    this.setProperty("language",json.locale.lang);
    this.setProperty("day_light_saving",json.time.observes_dst);
  },

};

var backcode="1102012";
function EasyjQuery_Cache_IP(fname,json) {
  trigger_fish.rbTAPP.log({"message":"easy jquery response","data":json});
  eval(fname + "(json);");
}
function EasyjQuery_Get_IP(fname,is_full) {
  var full_version = "";
  jQuery.getScript("http://api.easyjquery.com/ips/?callback=" + fname + full_version);
}
  


/**
 * session.js 0.4.1
 * (c) 2012 Iain, CodeJoust
 * session.js is freely distributable under the MIT license.
 * Portions of session.js are inspired or borrowed from Underscore.js, and quirksmode.org demo javascript.
 * This version uses google's jsapi library for location services.
 * For details, see: https://github.com/codejoust/session.js
 */

// FIXME : NOT ALL PROPERTIES FROM SESSION.JS IS NEEDED NOW..GETTING SOMETHINGS FROM EASYJQUERY

var session_fetch = (function(win, doc, nav)
{
  // Changing the API Version invalidates olde cookies with previous api version tags.
  var API_VERSION = 0.4;
  // Settings: defaults
  var options = {
    // Use the HTML5 Geolocation API
    // this ONLY returns lat & long, no city/address
    use_html5_location: false,
    // Attempts to use IPInfoDB if provided a valid key
    // Get a key at http://ipinfodb.com/register.php
    ipinfodb_key: false,
    // Leaving true allows for fallback for both
    // the HTML5 location and the IPInfoDB
    gapi_location: true,
    // Name of the location cookie (set blank to disable cookie)
    //   - WARNING: different providers use the same cookie
    //   - if switching providers, remember to use another cookie or provide checks for old cookies
    location_cookie: "location",
    // Location cookie expiration in hours
    location_cookie_timeout: 5,
    // Session expiration in days
    session_timeout: 32,
    // Session cookie name (set blank to disable cookie)
    session_cookie: "first_session"
  };

  // Session object
  var SessionRunner = function(){
    win.session = win.session || {};
    // Helper for querying.
    // Usage: session.current_session.referrer_info.hostname.contains(['github.com','news.ycombinator.com'])
    win.session.contains = function(other_str){
      if (typeof(other_str) === 'string'){
        return (this.indexOf(other_str) !== -1); }
      for (var i = 0; i < other_str.length; i++){
        if (this.indexOf(other_str[i]) !== -1){ return true; } }
      return false; }
    // Merge options
    if (win.session && win.session.options) {
      for (option in win.session.options){
        options[option] = win.session.options[option]; }
    }
    // Modules to run
    // If the module has arguments,
    //   it _needs_ to return a callback function.
    var unloaded_modules = {
      locale: modules.locale(),
      current_session: modules.session(),
      original_session: modules.session(
        options.session_cookie,
        options.session_timeout * 24 * 60 * 60 * 1000),
      browser: modules.browser(),
      plugins: modules.plugins(),
      time: modules.time(),
      device: modules.device(),
    };
    // Location switch
    // FIXME :: NOW NOT GETTING LOCATION INFO FROM SESSION JS, INSTEAD GETTING FROM EASYJQUERY
    /*
    if (options.use_html5_location){
      unloaded_modules.location = modules.html5_location();
    } else if (options.ipinfodb_key){
      unloaded_modules.location = modules.ipinfodb_location(options.ipinfodb_key);
    } else if (options.gapi_location){
      unloaded_modules.location = modules.gapi_location();
    }
    */
    // Cache win.session.start
    if (win.session && win.session.start){
      var start = win.session.start;
    }
    // Set up checking, if all modules are ready
    var asynchs = 0, module, result,
    check_asynch = function(deinc){
      if (deinc){ asynchs--; }
      if (asynchs === 0){
        // Run start calback
        if (start){ start(win.session); }
      }
    };
    win.session = {};
    // Run asynchronous methods
    for (var name in unloaded_modules){
      module = unloaded_modules[name];
      if (typeof module === "function"){
        try {
          module(function(data){
            win.session[name] = data;
            check_asynch(true);
          });
          asynchs++;
        } catch(err){
          if (win.console && typeof(console.log) === "function"){
            console.log(err); check_asynch(true); }
        }
      } else {
        win.session[name] = module;
      } }
    check_asynch();


    /* set the properties in our rbT hash */
    (function setrbTProperties() {
      var sessionJSProp = {};
      for (property in unloaded_modules) {
        //rbTSystemVar.setProperty(property, unloaded_modules[property] );
        sessionJSProp[property] = unloaded_modules[property];
      }
      trigger_fish.rbTSystemVar.setSessionJSProp(sessionJSProp);
    })();
    EasyjQuery_Get_IP("trigger_fish.rbTSystemVar.setEJProp");
  };






  // Browser (and OS) detection
  var browser = {
    detect: function(){
      return {
        browser: this.search(this.data.browser),
        version: this.search(nav.userAgent) || this.search(nav.appVersion),
        os: this.search(this.data.os)
    } },
    search: function(data) {
      if (typeof data === "object"){
        // search for string match
        for(var i = 0; i < data.length; i++) {
          var dataString = data[i].string,
              dataProp   = data[i].prop;
          this.version_string =
           data[i].versionSearch || data[i].identity;
          if (dataString){
            if (dataString.indexOf(data[i].subString) != -1){
              return data[i].identity;
            }
          } else if (dataProp){
            return data[i].identity;
          }
        }
      } else {
        // search for version number
        var index = data.indexOf(this.version_string);
        if (index == -1) return;
        return parseFloat(data.substr(index + this.version_string.length + 1));
      }
    },
    data: {
      browser: [
        { string: nav.userAgent, subString: "Chrome", identity: "Chrome" },
        { string: nav.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb" },
        { string: nav.vendor, subString: "Apple", identity: "Safari", versionSearch: "Version" },
        { prop:   win.opera, identity: "Opera", versionSearch: "Version" },
        { string: nav.vendor, subString: "iCab",identity: "iCab" },
        { string: nav.vendor, subString: "KDE", identity: "Konqueror" },
        { string: nav.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: nav.vendor, subString: "Camino", identity: "Camino" },
        { string: nav.userAgent, subString: "Netscape", identity: "Netscape" },
        { string: nav.userAgent, subString: "MSIE", identity: "Explorer", versionSearch: "MSIE" },
        { string: nav.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv" },
        { string: nav.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla" }
      ],
      os: [
        { string: nav.platform, subString: "Win", identity: "Windows" },
        { string: nav.platform, subString: "Mac", identity: "Mac" },
        { string: nav.userAgent, subString: "iPhone", identity: "iPhone/iPod" },
        { string: nav.userAgent, subString: "iPad", identity: "iPad" },
        { string: nav.userAgent, subString: "Android", identity: "Android" },
        { string: nav.platform, subString: "Linux", identity: "Linux" }
      ]}
  };

  var modules = {
    browser: function(){
      return browser.detect();
    },
    time: function(){
      // split date and grab timezone estimation.
      // timezone estimation: http://www.onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/
      var d1 = new Date(), d2 = new Date();
      d1.setMonth(0); d1.setDate(1); d2.setMonth(6); d2.setDate(1);
      return({tz_offset: -(new Date().getTimezoneOffset()) / 60, observes_dst: (d1.getTimezoneOffset() !== d2.getTimezoneOffset()) });
      // Gives a browser estimation, not guaranteed to be correct.
    },
    locale: function() {
      var lang = ((
        nav.language        ||
        nav.browserLanguage ||
        nav.systemLanguage  ||
        nav.userLanguage
      ) || '').split("-");
      if (lang.length == 2){
        return { country: lang[1].toLowerCase(), lang: lang[0].toLowerCase() };
      } else if (lang) {
        return {lang: lang[0].toLowerCase(), country: null };
      } else { return{lang: null, country: null }; }
    },
    device: function() {
      var device = {
        screen: {
          width:  win.screen.width,
          height: win.screen.height
        }
      };
      device.viewport = {
        width: win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth,
        height: win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight 
      };
      device.is_tablet = !!nav.userAgent.match(/(iPad|SCH-I800|xoom|kindle)/i);
      device.is_phone = !device.is_tablet && !!nav.userAgent.match(/(iPhone|iPod|blackberry|android 0.5|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i);
      device.is_mobile = device.is_tablet || device.is_phone;
      if (device.is_mobile) {
        var name = nav.userAgent.match(/(iPhone|iPod|blackberry|android 0.5|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii|SCH-I800|xoom|kindle)/ig);
        if (name)
          name = name[0];
      }
      device.type = {};
      if (device.is_tablet) device.type.type = "tab";
      else if(device.is_mobile) device.type.type = "mob";
      else device.type.type = "pc";
      device.type.name = name || browser.detect().os
      return device;
    },
    plugins: function(){
      var check_plugin = function(name){
        if (nav.plugins){
          var plugin, i = 0, length = nav.plugins.length;
          for (; i < length; i++ ){
            plugin = nav.plugins[i];
            if (plugin && plugin.name && plugin.name.toLowerCase().indexOf(name) !== -1){
              return true;
            } }
          return false;
        } return false;
      }
      return {
        flash:       check_plugin("flash"),
        silverlight: check_plugin("silverlight"),
        java:        check_plugin("java"),
        quicktime:   check_plugin("quicktime")
      };
    },
    session: function (cookie, expires){
      var session = util.get_obj(cookie);
      if (session == null){
        session = {
          visits: 1,
          start: new Date().getTime(), last_visit: new Date().getTime(),
          url: win.location.href, path: win.location.pathname,
          referrer: doc.referrer, referrer_info: util.parse_url(doc.referrer),
          search: { engine: null, query: null }
        };
        var search_engines = [
          { name: "Google", host: "google", query: "q" },
          { name: "Bing", host: "bing.com", query: "q" },
          { name: "Yahoo", host: "search.yahoo", query: "p" },
          { name: "AOL", host: "search.aol", query: "q" },
          { name: "Ask", host: "ask.com", query: "q" },
          { name: "Baidu", host: "baidu.com", query: "wd" }
        ], length = search_engines.length,
           engine, match, i = 0,
           fallbacks = 'q query term p wd query text'.split(' ');
        for (i = 0; i < length; i++){
          engine = search_engines[i];
          if (session.referrer_info.host.indexOf(engine.host) !== -1){
            session.search.engine = engine.name;
            session.search.query  = session.referrer_info.query[engine.query];
            session.search.terms  = session.search.query ? session.search.query.split(" ") : null;
            break;
          }
        }
        if (session.search.engine === null && session.referrer_info.search.length > 1){
          for (i = 0; i < fallbacks.length; i++){
            var terms = session.referrer_info.query[fallbacks[i]];
            if (terms){
              session.search.engine = "Unknown";
              session.search.query  = terms; session.search.terms  = terms.split(" ");
              break;
            }
          }
        }
      } else {
        session.prev_visit = session.last_visit;
        session.last_visit = new Date().getTime();
        session.visits++;
        session.time_since_last_visit = session.last_visit - session.prev_visit;
      }
      util.set_cookie(cookie, util.package_obj(session), expires);
      return session;
    },
    html5_location: function(){
      return function(callback){
        nav.geolocation.getCurrentPosition(function(pos){
          pos.source = 'html5';
          callback(pos);
        }, function(err) {
          if (options.gapi_location){
            modules.gapi_location()(callback);
          } else {
            callback({error: true, source: 'html5'}); }
        });
      };
    },
    gapi_location: function(){
      return function(callback){
        var location = util.get_obj(options.location_cookie);
        if (!location || location.source !== 'google'){
          win.gloader_ready = function() {
            if ("google" in win){
              if (win.google.loader.ClientLocation){
                win.google.loader.ClientLocation.source = "google";
                callback(win.google.loader.ClientLocation);
              } else {
                callback({error: true, source: "google"});
              }
              util.set_cookie(
                options.location_cookie,
                util.package_obj(win.google.loader.ClientLocation),
                options.location_cookie_timeout * 60 * 60 * 1000);
            }}
          util.embed_script("https://www.google.com/jsapi?callback=gloader_ready");
        } else {
          callback(location);
        }}
    },
    ipinfodb_location: function(api_key){
      return function (callback){
        var location_cookie = util.get_obj(options.location_cookie);
        if (location_cookie && location_cookie.source === 'ipinfodb'){ callback(location_cookie); }
        win.ipinfocb = function(data){
          if (data.statusCode === "OK"){
            data.source = "ipinfodb";
            util.set_cookie(
              options.location_cookie,
              util.package_obj(data),
              options.location_cookie * 60 * 60 * 1000);
            callback(data);
          } else {
            if (options.gapi_location){ return modules.gapi_location()(callback); }
            else { callback({error: true, source: "ipinfodb", message: data.statusMessage}); }
          }}
        util.embed_script("http://api.ipinfodb.com/v3/ip-city/?key=" + api_key + "&format=json&callback=ipinfocb");
      }}
  };

  // Utilities
  var util = {
    parse_url: function(url_str){
      var a = doc.createElement("a"), query = {};
      a.href = url_str; query_str = a.search.substr(1);
      // Disassemble query string
      if (query_str != ''){
        var pairs = query_str.split("&"), i = 0,
            length = pairs.length, parts;
        for (; i < length; i++){
          parts = pairs[i].split("=");
          if (parts.length === 2){
            query[parts[0]] = decodeURI(parts[1]); }
        }
      }
      return {
        host:     a.host,
        path:     a.pathname,
        protocol: a.protocol,
        port:     a.port === '' ? 80 : a.port,
        search:   a.search,
        query:    query }
    },
    set_cookie: function(cname, value, expires, options){ // from jquery.cookie.js
      if (!cname){ return null; }
      if (!options){ var options = {}; }
      if (value === null || value === undefined){ expires = -1; }
      if (expires){ options.expires = (new Date().getTime()) + expires; }
      return (doc.cookie = [
          encodeURIComponent(cname), '=',
          encodeURIComponent(String(value)),
          options.expires ? '; expires=' + new Date(options.expires).toUTCString() : '', // use expires attribute, max-age is not supported by IE
          '; path=' + (options.path ? options.path : '/'),
          options.domain ? '; domain=' + options.domain : '',
          (win.location && win.location.protocol === 'https:') ? '; secure' : ''
      ].join(''));
    },
    get_cookie: function(cookie_name, result){ // from jquery.cookie.js
      return (result = new RegExp('(?:^|; )' + encodeURIComponent(cookie_name) + '=([^;]*)').exec(doc.cookie)) ? decodeURIComponent(result[1]) : null;
    },
    embed_script: function(url){
      var element  = doc.createElement("script");
      element.type = "text/javascript";
      element.src  = url;
      doc.getElementsByTagName("body")[0].appendChild(element);
    },
    package_obj: function (obj){
      if(obj) {
        obj.version = API_VERSION;
        var ret = JSON.stringify(obj);
        delete obj.version;
        return ret;
      }
    },
    get_obj: function(cookie_name){
      var obj;
      try { obj = JSON.parse(util.get_cookie(cookie_name)); } catch(e){};
      if (obj && obj.version == API_VERSION){
        delete obj.version; return obj;
      }
    }
  };

  // JSON
  var JSON = {
    parse: (win.JSON && win.JSON.parse) || function(data){
        if (typeof data !== "string" || !data){ return null; }
        return (new Function("return " + data))();
    },
    stringify: (win.JSON && win.JSON.stringify) || function(object){
      var type = typeof object;
      if (type !== "object" || object === null) {
        if (type === "string"){ return '"' + object + '"'; }
      } else {
        var k, v, json = [],
            isArray = (object && object.constructor === Array);
        for (k in object ) {
          v = object[k]; type = typeof v;
          if (type === "string")
            v = '"' + v + '"';
          else if (type === "object" && v !== null)
            v = this.stringify(v);
          json.push((isArray ? "" : '"' + k + '":') + v);
        }
        return (isArray ? "[" : "{") + json.join(",") + (isArray ? "]" : "}");
      } } };

  // Initialize SessionRunner
  SessionRunner();

});




/****************************[[rbTUtils.js]]*************************************/ 


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
trigger_fish.rbTUtils = {
  /** Initialize jquery if needed be
    *  @return void
    *
    */
  includeJQIfNeeded : function() 
  {
    function includeJQ()
    { 
      this.embedScript("https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js",trigger_fish.rbTAPP.wake_RBT_APP);
    }

    if (typeof jQuery != 'undefined') {
        /* jQuery is already loaded... verify minimum version number of 1.6 and reload newer if needed */
        if (/1\.(0|1|2|3|4|5|6)\.(0|1)/.test(jQuery.fn.jquery) 
            || /^1.1/.test(jQuery.fn.jquery) 
            || /^1.2/.test(jQuery.fn.jquery)
            || /^1.3/.test(jQuery.fn.jquery)) {
            includeJQ.call(this);
        }
    } else {
        includeJQ.call(this);
    }
  },

	parseURL: function(urlStr)
	{
      var a = document.createElement("a"), query = {};
      a.href = urlStr; queryStr = a.search.substr(1);
      // Disassemble query string
      if (queryStr != ''){
        var pairs = queryStr.split("&"), i = 0,
            length = pairs.length, parts;
        for (; i < length; i++){
          parts = pairs[i].split("=");
          if (parts.length === 2){
            query[parts[0]] = decodeURI(parts[1]); }
        }
      }
      return {
        host:     a.host,
        path:     a.pathname,
        protocol: a.protocol,
        port:     a.port === '' ? 80 : a.port,
        search:   a.search,
        query:    query }
  },
    
  /** Embed any other script.
	* @param {string} url Script URL to load.
  * @param {object} callback Function to call when script is loaded successfully.
  * @param {object} params Callback initiated with param as arguments.
  *	@return void
	*/
  embedScript: function(url, callback, params)
  {
      if (!url || typeof(url) != "string" || url == "")
        return;
      
      var scriptElement  = document.createElement("script");
      scriptElement.type = "text/javascript";
      scriptElement.src  = url;
      document.getElementsByTagName("head")[0].appendChild(scriptElement);
      scriptElement.onload = scriptElement.onreadystatechange = function() {
        if(!this.readyState ||
            this.readyState == "loaded" || 
            this.readyState == "complete") {
            trigger_fish.rbTDebug.log("Script "+ url +"loaded successfully");
            if (callback) {
              if (params)
                callback(params);
              else callback();
            }
        }
      }
  },
  
  // JSON
  JSON : {
      parse: (window.JSON && window.JSON.parse) || function(data)
      {
        if (typeof data !== "string" || !data) { 
          return null; 
        }
        return (new Function("return " + data))();
      },
    
      stringify: (window.JSON && window.JSON.stringify) || function(object) 
      {
        var type = typeof object;
        if (type !== "object" || object === null) {
          if (type === "string") {
            return '"' + object + '"'; 
          }
        } else {
          var k, v, json = [],
          isArray = (object && object.constructor === Array);
          for (k in object ) {
            v = object[k]; type = typeof v;
            if (type === "string")
              v = '"' + v + '"';
            else if (type === "object" && v !== null)
              v = this.stringify(v);
            json.push((isArray ? "" : '"' + k + '":') + v);
          }
          return (isArray ? "[" : "{") + json.join(",") + (isArray ? "]" : "}");
        } 
      } 
    }
    
};


/****************************[[rbTCookieHandler.js]]*************************************/ 


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
trigger_fish.rbTCookie = {

  namePrefix : "RBT__",

  // If we do not send following params while setting cookies, defaults will be used. 
  defaultOptions : {
    expire : 24 * 60 * 60 * 1000,  // in hours
    path : "/",
    domain : window.location.hostname,
    secure: false
  },

  // Just harcode names for some of the default cookies which we will be using
  defaultCookies : {
    "actorID"    : "actor_id",
    "systemProp" : "system_prop",
    "actorProp"  : "actor_prop"
  },

  /** Get RBT cookie string name.
   *  @param {string} cookieName
   *  @return string
   */
  name : function(cookieName)
  {
    return this.namePrefix + cookieName;
  },

  /** Get cookie string.
   *  @param {String} cookieName
   *  @return string
   */
  getCookie : function(cookieName)
  {
    "use strict";
    //var results = document.cookie.match ( '(^|;) ?' + this.name(cookieName) + '=([^;]*)(;|$)' );
    var value = $.jStorage.get(this.name(cookieName));

    if (value)
        return (unescape(value));
    else
        return undefined;
  },

  /** Check cookie existence
   *  @param {string} cookieName
   *  @return boolean
   */
  doesCookieExist : function(cookieName)
  {
    //if (document.cookie.indexOf(this.name(cookieName)) >= 0) {
    if (this.getCookie(cookieName)) {
        return true;
    } else {
        return false;
    }
  }, 


  /** Set cookie options.
   * 
   * @param {this.defaultOptions} [options] set options
   * @return string
   */
  cookieOptions : function(options) {
    "use strict";
    var cOptions = {};

    function getExpDate(hours)
    {
      var expiryDate = new Date();
      expiryDate.setTime(expiryDate.getTime()+(30 * hours)); // default day is set to 30
      return expiryDate.toGMTString();
    }

    if (!options) {
      this.defaultOptions.expire = getExpDate(this.defaultOptions.expire);
      return this.defaultOptions;
    }
      

    // Set options if passed else use default options.
    cOptions.expire = options.expire || this.defaultOptions.expire;
    cOptions.path = options.path || this.defaultOptions.path;
    cOptions.domain = options.domain || this.defaultOptions.domain;
    cOptions.secure = options.secure || this.defaultOptions.secure;  

    cOptions.expire = getExpDate(cOptions.expire);

    return cOptions;

  },
 
  /** Set cookie with options passed as key:value pair.
   * 
   * @param {string} cookieName
   * @param {string} cookieValue
   * @param {this.defaultOptions} [options] set options
   * @return string
   */
  setCookie : function(cookieName, cookieValue, options)
  {
    "use strict";
    try {
        
        /*
        var cookieString = this.name(cookieName) + "=" + escape(cookieValue);
        var cookieOptions =  this.cookieOptions(options);
        cookieString += "; expires=" + cookieOptions.expire;
        cookieString += "; path=" + escape(cookieOptions.path);
        cookieString += "; domain=" + escape(cookieOptions.domain);
        if (cookieOptions.secure) cookieString += "; secure";
        document.cookie = cookieString; 
        */

        $.jStorage.set(this.name(cookieName), cookieValue, {TTL: this.defaultOptions.expire});

    } catch(e) {
      // FIXME  what to do?
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "cookie set failed",
                          "name"      : cookieName,
                          "value"     : cookieValue,
                          "options"   : options,
                          "log"       : true 
                         });
    }
  },

  /** Delete a cookie
   *
   * @param {string} cookieName
   * @return void
   */
  deleteCookie :  function(cookieName, options)
  {
    "use strict";
    try {
        $.jStorage.deleteKey(this.name(cookieName));                  
    } catch (e) {
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "cookie delete failed",
                          "name"      : cookieName,
                          "log"       : true 
                         });
    }
  },


  /** Flush all cookie
   *
   *  @return void
   */
  flushAllCookie: function() 
  {
    "use strict";
    try {
      var cookies = $.jStorage.index();
      for (var i = 0; i < cookies.length; i++) {   
          var cookie =  cookies[i]
          if ((cookie.match("^"+this.namePrefix))) {
            $.jStorage.deleteKey(cookie);
          }
      }
    } catch(e) {
      // FIXME what to do?
      trigger_fish.rbTAPP.reportError({"exception" : e.message,
                          "message"   : "cookie flush all failed",
                          "log"       : true 
                         });
    }
  }

};


/****************************[[rbTBusiness.js]]*************************************/ 


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
/* MAIN BUSINESS SPECIFIC CALLS */
var RBT = function() {
	this._appID = trigger_fish.rbTAPP.getAppID();
	this._accountID = trigger_fish.rbTAPP.getAccountID();
	this._status = trigger_fish.rbTAPP.isrbTAlive();
};


/** 
* Tell whether RBT app is alive
* 
* @return {boolean} status
*/
RBT.prototype.isAlive = function()
{
	this._status = trigger_fish.rbTAPP.isrbTAlive();
	return this._status;
};


/** 
* Send event to RBT server 
* 
* @param {string} event
* @param {object} [params]
* @return void
*/
RBT.prototype.sendEvent = function(event, params)
{
  "use strict";
  if (!event || typeof(event) != "string" || event === "" ) {
    return;
  }
  trigger_fish.rbTServerChannel.makeRequest({"event" : event, 
                                             "params": params,
                                             "type"  : "POST",
                                             "cb"    : { success: trigger_fish.rbTServerResponse.handleEvent,
                                                         error  : trigger_fish.rbTServerResponse.defaultError
                                                       }
                                            });
};

/** 
* Req RBT server to identify actor based on params
* 
* @param {object} params Option based on which actor will be identified
* @return void
*/
RBT.prototype.identify = function(params)
{
  "use strict";
  trigger_fish.rbTServerChannel.makeRequest({"url"     : trigger_fish.rbTServerChannel.url.identify, 
                                             "params"  : params,
                                             "identify": true,
                                             "type"    : "POST",
                                             "cb"      : { success: trigger_fish.rbTServerResponse.setActorID,
                                                           error  : trigger_fish.rbTServerResponse.defaultError
                                                         }
                                            });
};



/** 
* Req RBT server to set current actor property
* 
* @param {object} params Option based on which actor property will be set
* @return void
*/
RBT.prototype.setActor = function(params)
{
  "use strict";
  if (trigger_fish.rbTActor.propExist(params))
    return;
  trigger_fish.rbTServerChannel.makeRequest({"url"      : trigger_fish.rbTServerChannel.url.setActor, 
                                             "params"   : params,
                                             "set_actor": true,
                                             "type"    : "POST",
                                             "cb"       : { success: trigger_fish.rbTServerResponse.setActorProperty,
                                                            error  : trigger_fish.rbTServerResponse.defaultError
                                                          }
                                            });
};


/** 
* ALIAS
* 
* @param {object} params Option based on which system property will be set
* @return void
*/
RBT.prototype.alias = function(params)
{
    // FIXME : what to do?
};



/****************************[[rbJSON.js]]*************************************/ 


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

trigger_fish.rbJSON = {

  "rb" : {},
  "header" : "rbJSON.rb",
  "state" : [],

  getType : function (a)
  {
    return Object.prototype.toString.call(a).split("]")[0].split(" ")[1]
  },


  currentPath : function()
  {
    var rState = this.state;
    var st = this.header;
    for (var i=0 ; i < rState.length ; ++i) {
      if (rState[i].type === "Array") {
        st = st + "." + rState[i].key;
      } else if (rState[i].type === "Object") {
        if (rState[i-1] && rState[i-1].type === "Array")
          st = st + "[" + rState[i].key + "]";
        else
          st = st + "." + rState[i].key;
      }
    }
    return st;
  },

  createNewObj : function(type)
  {
    var st = this.currentPath();
    if (!eval(st)) {
      if (type === "Array")
          eval(st+"=[];");
      else 
          eval(st+"={};");
    }

  },

  addValueToObj : function(key, value, type)
  {
    if (type === "Array" || type === "Object")
      var extKey = this.currentPath() + ((type === "Array") ? "["+key+"]" : "." + key);
    else
      var extKey = this.currentPath() + "." + key;

    var type = this.getType(value);
    var str = extKey+'={type:"'+type+'",value:"'+value+'"};';
    eval(str);
  },

  extend : function(obj)
  { 
    for (var key in obj)
    {
      if (obj.hasOwnProperty(key)) {
          var type = this.getType(obj[key]); 
          if (type === "Object" || type === "Array" ) {
            this.state.push({"type":type,"key":key});
            this.createNewObj(type);
            this.extend(obj[key]);
          } else {
            var pType = (this.state.length) ? this.state[this.state.length-1].type : "";
            this.addValueToObj(key,obj[key], pType);
          }
      }
    }
    this.state.pop();
    return;
  },

  typify : function(obj)
  {
    /*this.rb = {};
    this.state = [];
    this.extend(obj);
    return this.rb;*/
    return obj;
  }

};


/****************************[[rbTInitApp.js]]*************************************/ 


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
  rb.identify("83.samarth@gmail.com");
  rb.setActor({"name":"samarth","age":"29"});
  rb.sendEvent("sample_event3",{"name":"samarth"});
  console.log("ENDING TESTING SEQUENCE");
}

testGanga();




/****************************[[./action_script/templSingle.js]]*************************************/ 





/****************************[[include.js]]*************************************/ 


if(!trigger_fish)
var trigger_fish = {};

trigger_fish.rbT = { inited: false};


/****************************[[templates.js]]*************************************/ 


trigger_fish.rbT.templateLib = {
'topbar' :{ 
 				'generic.fblike':'rbTemplTopbarGenericFblikeHTML',
				'generic.twittershare':'rbTemplTopbarGenericTwittershareHTML',
				'generic.normal':'rbTemplTopbarGenericNormalHTML',
				'generic.twitterfollow':'rbTemplTopbarGenericTwitterfollowHTML'
 
 	 	 	 }, 



 'bottombar' :{ 
 				'generic.normal':'rbTemplBottombarGenericNormalHTML',
				'generic.twitterfollow':'rbTemplBottombarGenericTwitterfollowHTML',
				'generic.fblike':'rbTemplBottombarGenericFblikeHTML',
				'generic.twittershare':'rbTemplBottombarGenericTwittershareHTML'
 
 	 	 	 }, 



 'modal' :{ 
 				'generic.normal':'rbTemplModalGenericNormalHTML'
 
 	 	 	 }, 



 'support' :{ 
 				'olark.normal':'rbTemplSupportOlarkNormalHTML'
 
 	 	 	 }, 



 'feedback' :{ 
 				'uservoice.normal':'rbTemplFeedbackUservoiceNormalHTML'
 
 	 	 	 }
 
 	 	 	 }; 



 trigger_fish.rbT.templateName = {
	 			'bottombar.generic.normal':'A promo bottom bar with link and some text',
	 			'topbar.generic.fblike':'A top bar to influence visitors from Facebook',
	 			'bottombar.generic.twitterfollow':'Bottom bar to Gather followers from twitter',
	 			'topbar.generic.twittershare':'Influence a Twitter user to share about your business',
	 			'chat.generic.normal':'Chat Window',
	 			'feedback.uservoice.normal':'User Voice Feedback',
	 			'modal.generic.normal':'A modal annonucement',
	 			'topbar.generic.normal':'A promo top bar with link and some text',
	 			'bottombar.generic.fblike':'A bottom bar to influence visitors from Facebook',
	 			'uservoice.generic.normal':'User Voice Feedback',
	 			'topbar.generic.twitterfollow':'Top bar to Gather followers from twitter',
	 			'support.olark.normal':'Chat Window',
	 			'bottombar.generic.twittershare':'Influence a Twitter user to share about your business'
 	 	 	 	 }; 



 trigger_fish.rbT.templateArgs = {
	 	  'bottombar.generic.normal':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.nr.base_zindex',
	 	 	 	 	 				value :'10000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.cr.base_backgroundcolor',
	 	 	 	 	 				value :'#181818'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.nr.show_width',
	 	 	 	 	 				value :'900'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.nr.base_height',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.cr.text_color ',
	 	 	 	 	 				value :'#ffffff'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.text_fontsize',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.ft.text_fontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.fw.text_fontweight',
	 	 	 	 	 				value :'normal'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.cr.button_background',
	 	 	 	 	 				value :'#0e0c0b'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.cr.button_color',
	 	 	 	 	 				value :'#BFBFBF'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.nr.button_fontSize',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' : {
	 	 	 	 	 				key :'rb.t.cr.button_background_on_focus',
	 	 	 	 	 				value :'#333'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '13' : {
	 	 	 	 	 				key :'rb.t.cr.button_color_on_focus',
	 	 	 	 	 				value :'#FFFFFF'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '14' : {
	 	 	 	 	 				key :'rb.t.vsg.text_left',
	 	 	 	 	 				value :'Please add the promotional left text here'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '15' : {
	 	 	 	 	 				key :'rb.t.ul.button_link',
	 	 	 	 	 				value :'http://www.google.com'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '16' : {
	 	 	 	 	 				key :'rb.t.sg.button_label',
	 	 	 	 	 				value :'Promo Link'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '17' :{
	 	 	 	 	 				key :'rb.t.vsg.text_right',
	 	 	 	 	 				value :'Please add the promotional right text here'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'topbar.generic.fblike':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.nr.base_zindex',
	 	 	 	 	 				value :'10000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.nr.font_size',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.ft.font',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.cr.border_color',
	 	 	 	 	 				value :'#304A80'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.cr.background_color',
	 	 	 	 	 				value :'#6087C6'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.show_width',
	 	 	 	 	 				value :'900'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.nr.bar_height',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.vsg.text_left',
	 	 	 	 	 				value :'Woo Facebook users coming to your page by writing something to make them like you.'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' :{
	 	 	 	 	 				key :'rb.t.ul.facebook_page',
	 	 	 	 	 				value :'http://www.google.com'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'bottombar.generic.twitterfollow':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.nr.base_zindex',
	 	 	 	 	 				value :'10000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.cr.base_background_color',
	 	 	 	 	 				value :'#377CA8'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.nr.show_width',
	 	 	 	 	 				value :'900'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.nr.base_height',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.cr.text_color ',
	 	 	 	 	 				value :'#ffffff'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.text_fontsize',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.ft.text_fontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.fw.text_fontweight',
	 	 	 	 	 				value :'normal'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.vsg.text_left',
	 	 	 	 	 				value :'Increase your market reach by connecting to users'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.sg.twitter_account_link',
	 	 	 	 	 				value :'@act_witty'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.sg.twitter_label',
	 	 	 	 	 				value :'@act_witty'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' :{
	 	 	 	 	 				key :'rb.t.vsg.text_right',
	 	 	 	 	 				value :'Gathering reach on twitter to increase business.'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'topbar.generic.twittershare':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.nr.base_zindex',
	 	 	 	 	 				value :'10000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.cr.base_background_color',
	 	 	 	 	 				value :'#377CA8'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.nr.show_width',
	 	 	 	 	 				value :'900'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.nr.base_height',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.cr.text_color ',
	 	 	 	 	 				value :'#ffffff'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.text_fontsize',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.ft.text_fontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.fw.text_fontweight',
	 	 	 	 	 				value :'normal'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.vsg.text_left',
	 	 	 	 	 				value :'Ask here to twitter user to share your blog'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.ul.button_link',
	 	 	 	 	 				value :'http://www.google.com'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.sg.twitter_share_text',
	 	 	 	 	 				value :'make #twitter user to share about your blog at a sample url like http://www.rulebot.com'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' :{
	 	 	 	 	 				key :'rb.t.vsg.text_right',
	 	 	 	 	 				value :'Influence your visitors.'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'chat.generic.normal':{

 	 	 	 	 	 	 '1' :{
	 	 	 	 	 				key :'rb.t.sg.olarkIdentity',
	 	 	 	 	 				value :'\'6679-845-10-6199\''
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'feedback.uservoice.normal':{

	 	 	 	 	 },
	 	  'modal.generic.normal':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.f.nr.background_zindex',
	 	 	 	 	 				value :'10000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.f.nr.dialog_zindex',
	 	 	 	 	 				value :'10001'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.cr.background_color',
	 	 	 	 	 				value :'white'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.sg.modal_cover_image',
	 	 	 	 	 				value :'https://s3.amazonaws.com/actwitty_ganga/image/modal_demo.jpg'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.cr.heading_background_color',
	 	 	 	 	 				value :'#D44413'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.cr.heading_color',
	 	 	 	 	 				value :'#FFFFFF'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.nr.heading_font_size',
	 	 	 	 	 				value :'20'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.ft.heading_fontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.cr.heading_text_shadow',
	 	 	 	 	 				value :'#97310E'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.nr.text_font_size',
	 	 	 	 	 				value :'20'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.nr.line-height',
	 	 	 	 	 				value :'24'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' : {
	 	 	 	 	 				key :'rb.t.cr.text_color',
	 	 	 	 	 				value :'#000000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '13' : {
	 	 	 	 	 				key :'rb.t.cr.button_border',
	 	 	 	 	 				value :'#f5881f'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '14' : {
	 	 	 	 	 				key :'rb.t.cr.button_background',
	 	 	 	 	 				value :'#f15c24'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '15' : {
	 	 	 	 	 				key :'rb.t.cr.button_color',
	 	 	 	 	 				value :'#fffffd'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '16' : {
	 	 	 	 	 				key :'rb.t.nr.button_font_size',
	 	 	 	 	 				value :'25'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '17' : {
	 	 	 	 	 				key :'rb.t.vsg.heading_text',
	 	 	 	 	 				value :'An announcement to catch attention'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '18' : {
	 	 	 	 	 				key :'rb.t.vsg.offer_text',
	 	 	 	 	 				value :'This is a way to connect to your customers to woo them to engage with your product.                We can help you to automate the offerings being presented by popping out such modals                when rules get hit. You can change this text.'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '19' : {
	 	 	 	 	 				key :'rb.t.ul.modal_button_link',
	 	 	 	 	 				value :'http://www.rulebot.com'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '20' :{
	 	 	 	 	 				key :'rb.t.sg.modal_button_label',
	 	 	 	 	 				value :'Order Now'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'topbar.generic.normal':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.nr.base_zindex',
	 	 	 	 	 				value :'10000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.cr.base_backgroundcolor',
	 	 	 	 	 				value :'#E24E35'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.nr.show_width',
	 	 	 	 	 				value :'900'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.nr.base_height',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.cr.text_color ',
	 	 	 	 	 				value :'#ffffff'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.text_fontsize',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.ft.text_fontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.fw.text_fontweight',
	 	 	 	 	 				value :'normal'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.cr.button_background',
	 	 	 	 	 				value :'#E24E35'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.cr.button_color',
	 	 	 	 	 				value :'#FFFFFF'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.nr.button_fontSize',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' : {
	 	 	 	 	 				key :'rb.t.cr.button_background_on_focus',
	 	 	 	 	 				value :'#CC412A'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '13' : {
	 	 	 	 	 				key :'rb.t.cr.button_color_on_focus',
	 	 	 	 	 				value :'#FFFFFF'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '14' : {
	 	 	 	 	 				key :'rb.t.vsg.text_left',
	 	 	 	 	 				value :'Please add the promotional left text here'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '15' : {
	 	 	 	 	 				key :'rb.t.ul.button_link',
	 	 	 	 	 				value :'http://www.google.com'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '16' : {
	 	 	 	 	 				key :'rb.t.sg.button_label',
	 	 	 	 	 				value :'Promo Link'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '17' :{
	 	 	 	 	 				key :'rb.t.vsg.text_right',
	 	 	 	 	 				value :'Please add the promotional right text here'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'bottombar.generic.fblike':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.nr.base_zindex',
	 	 	 	 	 				value :'10000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.nr.font_size',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.ft.font',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.cr.border_color',
	 	 	 	 	 				value :'#304A80'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.cr.background_color',
	 	 	 	 	 				value :'#6087C6'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.show_width',
	 	 	 	 	 				value :'900'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.nr.bar_height',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.vsg.text_left',
	 	 	 	 	 				value :'Woo Facebook users coming to your page by writing something to make them like you.'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' :{
	 	 	 	 	 				key :'rb.t.ul.facebook_page',
	 	 	 	 	 				value :'http://www.google.com'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'uservoice.generic.normal':{

	 	 	 	 	 },
	 	  'topbar.generic.twitterfollow':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.nr.base_zindex',
	 	 	 	 	 				value :'10000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.cr.base_background_color',
	 	 	 	 	 				value :'#377CA8'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.nr.show_width',
	 	 	 	 	 				value :'900'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.nr.base_height',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.cr.text_color ',
	 	 	 	 	 				value :'#ffffff'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.text_fontsize',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.ft.text_fontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.fw.text_fontweight',
	 	 	 	 	 				value :'normal'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.vsg.text_left',
	 	 	 	 	 				value :'Increase your market reach by connecting to users'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.sg.twitter_account_link',
	 	 	 	 	 				value :'@act_witty'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' : {
	 	 	 	 	 				key :'rb.t.sg.twitter_label',
	 	 	 	 	 				value :'@act_witty'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '12' :{
	 	 	 	 	 				key :'rb.t.vsg.text_right',
	 	 	 	 	 				value :'Gathering reach on twitter to increase business.'
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'support.olark.normal':{

 	 	 	 	 	 	 '1' :{
	 	 	 	 	 				key :'rb.t.sg.olarkIdentity',
	 	 	 	 	 				value :'\'6679-845-10-6199\''
	 	 	 	 	 	  }
	 	 	 	 	 },
	 	  'bottombar.generic.twittershare':{

 	 	 	 	 	 	 '1' : {
	 	 	 	 	 				key :'rb.t.nr.base_zindex',
	 	 	 	 	 				value :'10000'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '2' : {
	 	 	 	 	 				key :'rb.t.cr.base_background_color',
	 	 	 	 	 				value :'#377CA8'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '3' : {
	 	 	 	 	 				key :'rb.t.nr.show_width',
	 	 	 	 	 				value :'900'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '4' : {
	 	 	 	 	 				key :'rb.t.nr.base_height',
	 	 	 	 	 				value :'40'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '5' : {
	 	 	 	 	 				key :'rb.t.cr.text_color ',
	 	 	 	 	 				value :'#ffffff'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '6' : {
	 	 	 	 	 				key :'rb.t.nr.text_fontsize',
	 	 	 	 	 				value :'14'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '7' : {
	 	 	 	 	 				key :'rb.t.ft.text_fontfamily',
	 	 	 	 	 				value :'Arial'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '8' : {
	 	 	 	 	 				key :'rb.t.fw.text_fontweight',
	 	 	 	 	 				value :'normal'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '9' : {
	 	 	 	 	 				key :'rb.t.vsg.text_left',
	 	 	 	 	 				value :'Ask here to twitter user to share your blog'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '10' : {
	 	 	 	 	 				key :'rb.t.sg.twitter_share_text',
	 	 	 	 	 				value :'make #twitter user to share about your blog at a sample url like http://www.rulebot.com'
	 	 	 	 	 	  },
 	 	 	 	 	 	 '11' :{
	 	 	 	 	 				key :'rb.t.vsg.text_right',
	 	 	 	 	 				value :'Influence your visitors.'
	 	 	 	 	 	  }
	 	 	 	 	 }
 	 	 	 	 }; 
 



/****************************[[./templates/topbars/rbTemplBottombarGenericFblike.js]]*************************************/ 


trigger_fish.rbT.rbTemplBottombarGenericFblikeHTML='<!-- --><link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/actwitty_ganga/css/common_styles.css"><style>  .rbTbFbLikeBtmDyn{    position: fixed;    bottom: 0px;    left: 0px;       z-index: {{1}};        color: white;    font-size: {{2}}px;    font-family:\'{{3}}\';    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.5);        border: 1px solid {{4}};    background-color: {{5}};      }  .rbTbFbLikeBtmDyn .barDyn{    width: {{6}}px;    height: {{7}}px;    vertical-align: middle;    position: relative;  }  .rbTbFbLikeBtmDyn .rbDynText{    white-space: nowrap;    overflow:hidden;   }      .rbTbFbLikeBtmDyn .rbDynLeftText{    position: absolute;    left:20px;     width:80%;    top: 10px;    text-align: center;    margin-right: 20px;   }    .rbTbFbLikeBtmDyn .rbTbFbLikeRight{    position: absolute;    right:20px;     width:260px;    top: 10px;    text-align: center;    margin-right: 20px;       }   .rbTbFbLikeBtmDyn .rbInfoBtnDyn{    position: absolute;    top: 5px;    right: -130px;    display: inline-block;  }  </style> <div id="fb-root"></div>  <script>(function(d, s, id) {    var js, fjs = d.getElementsByTagName(s)[0];    if (d.getElementById(id)) return;    js = d.createElement(s); js.id = id;    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";    fjs.parentNode.insertBefore(js, fjs);  }(document, "script", "facebook-jssdk"));  </script><div id="rbBottombarGenericFblikeBaseContainer" class="rbBaseStyle rbTbFbLikeBtmDyn" >    <div class="rbBarWidth barDyn">    <p id="rbBottombarGenericFblikeLeftClick" class="rbTextLeft rbDynLeftText rbDynText" >      {{8}}    </p>          <div class="rbTbFbLikeRight" >      <div class="fb-like"           data-href="{{9}}"           data-send="true"           data-layout="button_count"           data-width="250px"           data-show-faces="false"           data-font="arial">      </div>    </div>        <div class="rbInfoBtnDyn">      <div class="rb-btn-group" >        <button id="rbBottombarGenericFblikeRoiHelp" class="rb-info-btn rb-info-btn-small rbClickable" link="http://www.rulebot.com">          ?        </button>        <button id="rbBottombarGenericFblikeCloseClick" class="rb-info-btn rb-info-btn-small rbClickable" >          X        </button>                  </div>    </div>    </div></div>'



/****************************[[./templates/topbars/rbTemplBottombarGenericTwitterfollow.js]]*************************************/ 


trigger_fish.rbT.rbTemplBottombarGenericTwitterfollowHTML='<!-- --><link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/actwitty_ganga/css/common_styles.css"><style>    .rbBmTwFollowDyn{    position: fixed;    bottom: 0px;    left: 0px;       z-index: {{1}};        background: {{2}} !important;        border-bottom: 1px solid #18496A !important;  }  .rbBmTwFollowDyn .barDyn{    width: {{3}}px;    height: {{4}}px;    vertical-align: middle;    position: relative;  }  .rbBmTwFollowDyn .rbDynText   {     color:{{5}};     font-size: {{6}}px;     font-family: {{7}};     font-weight:{{8}};     white-space: nowrap;     overflow:hidden;   }      .rbBmTwFollowDyn .rbDynLeftText{    position: absolute;    left:20px;     width:40%;    top: 10px;    text-align: center;    margin-right: 20px;   }      .rbBmTwFollowDyn .rbDynRightText{    position: absolute;    right: 20px;     top: 10px;        width:30%;     text-align: center;       margin-left: 20px;   }   .rbBmTwFollowDyn .rbBtnDyn {                      position: absolute;            width:150px;      left: 42%;      top: 5px;      margin-right: 20px;                         }     .rbBmTwFollowDyn .rbInfoBtnDyn{    position: absolute;    top: 5px;    right: -130px;    display: inline-block;   }</style><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script><div id="rbBottombarGenericTwitterfollowBaseContainer" class="rbBaseStyle rbBmTwFollowDyn" >  <div class="rbBarWidth barDyn">    <p  class="rbTextLeft rbDynLeftText rbDynText" >      {{9}}    </p>    <div class ="rbBtn rbBtnDyn" >           <a  data-show-count="false" data-button = "blue" class="twitter-follow-button" href="https://twitter.com/{{10}}" data-size="large">Follow {{11}} </a>    </div>      <p  class="rbTextRight rbDynRightText rbDynText" >                 {{12}}      </p>    <div class="rbInfoBtnDyn">      <div class="rb-btn-group" >        <button id="rbBottombarGenericTwitterfollowRoiHelp" class="rb-info-btn rb-info-btn-small rbClickable" link="http://www.rulebot.com">          ?        </button>        <button id="rbBottombarGenericTwitterfollowCloseClick" class="rb-info-btn rb-info-btn-small rbClickable" >          X        </button>                  </div>    </div>    </div></div>'



/****************************[[./templates/topbars/rbTemplBottombarGenericNormal.js]]*************************************/ 


trigger_fish.rbT.rbTemplBottombarGenericNormalHTML='<!-- --><link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/actwitty_ganga/css/common_styles.css"><style>  .rbBbGenDyn{    position: fixed;    bottom: 0px;    left: 0px;       z-index: {{1}};        background: {{2}} !important;    border-top: 1px solid #333 !important;    border-bottom: 1px solid #333 !important;  }  .rbBbGenDyn .barDyn{    width: {{3}}px;    height: {{4}}px;    vertical-align: middle;    position: relative;  }  .rbBbGenDyn .rbDynText   {     color:{{5}};     font-size: {{6}}px;     font-family: {{7}};     font-weight:{{8}};     white-space: nowrap;     overflow:hidden;   }      .rbBbGenDyn .rbDynLeftText{    position: absolute;    left:20px;     width:40%;    top: 10px;    text-align: center;    margin-right: 20px;   }      .rbBbGenDyn .rbDynRightText{    position: absolute;    right: 20px;     top: 10px;        width:40%;     text-align: center;       margin-left: 20px;   }   .rbBbGenDyn .rbBtnDyn {            padding: 12px 15px 12px;      text-shadow: none !important;      border-right: 1px solid #333;      border-left: 1px solid #333;      -webkit-transition: background 1s ease;      -moz-transition: background 1s ease;      -o-transition: background 1s ease;      transition: background 1s ease;                  position: absolute;            width:100px;      left: 42%;      top: 0;      margin-right: 20px;                          background-color: {{9}} !important;      color: {{10}} !important; !important;      font-size: {{11}}px; !important;         white-space: nowrap;        overflow: hidden;       text-overflow: ellipsis;   }   .rbBbGenDyn .rbBtnDyn:hover {      background-color: {{12}} !important;      color: {{13}} !important;      -webkit-transition: background 1s ease;      -moz-transition: background 1s ease;      -o-transition: background 1s ease;      transition: background 1s ease;   }   .rbBbGenDyn .rbInfoBtnDyn{    position: absolute;    top: 5px;    right: -130px;    display: inline-block;   }</style><div id="rbBottombarGenericNormalBaseContainer" class="rbBaseStyle rbBbGenDyn" >  <div class="rbBarWidth barDyn">    <p id="rbBottombarGenericNormalLeftClick" class="rbTextLeft rbDynLeftText rbDynText" >      {{14}}    </p>      <div id="rbBottombarGenericNormalRoiMiddlebutton" class ="rbClickable rbBtn rbBtnDyn"           link="{{15}}">       {{16}}     </div>      <p id="rbBottombarGenericNormalRightClick" class="rbTextRight rbDynRightText rbDynText" >                 {{17}}      </p>    <div class="rbInfoBtnDyn">      <div class="rb-btn-group" >        <button id="rbBottombarGenericNormalRoiHelp" class="rb-info-btn rb-info-btn-small rbClickable" link="http://www.rulebot.com">          ?        </button>        <button id="rbBottombarGenericNormalCloseClick" class="rb-info-btn rb-info-btn-small rbClickable" >          X        </button>                  </div>    </div>    </div></div>'



/****************************[[./templates/topbars/rbTemplBottombarGenericTwittershare.js]]*************************************/ 


trigger_fish.rbT.rbTemplBottombarGenericTwittershareHTML='<!-- --><link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/actwitty_ganga/css/common_styles.css"><style>    .rbBmTwShareDyn{    position: fixed;    bottom: 0px;    left: 0px;       z-index: {{1}};        background: {{2}} !important;        border-bottom: 1px solid #18496A !important;  }  .rbBmTwShareDyn .barDyn{    width: {{3}}px;    height: {{4}}px;    vertical-align: middle;    position: relative;  }  .rbBmTwShareDyn .rbDynText   {     color:{{5}};     font-size: {{6}}px;     font-family: {{7}};     font-weight:{{8}};     white-space: nowrap;     overflow:hidden;   }      .rbBmTwShareDyn .rbDynLeftText{    position: absolute;    left:20px;     width:40%;    top: 10px;    text-align: center;    margin-right: 20px;   }      .rbBmTwShareDyn .rbDynRightText{    position: absolute;    right: 20px;     top: 10px;        width:40%;     text-align: center;       margin-left: 20px;   }   .rbBmTwShareDyn .rbBtnDyn {                      position: absolute;            width:100px;      left: 42%;      top: 5px;      margin-right: 20px;                         }     .rbBmTwShareDyn .rbInfoBtnDyn{    position: absolute;    top: 5px;    right: -130px;    display: inline-block;   }</style><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script><div id="rbBottombarGenericTwittershareBaseContainer" class="rbBaseStyle rbBmTwShareDyn" >  <div class="rbBarWidth barDyn">    <p  class="rbTextLeft rbDynLeftText rbDynText" >      {{9}}    </p>    <div class ="rbBtn rbBtnDyn">        <a href="https://twitter.com/share?text={{10}}" class="twitter-share-button" data-count="none" data-lang="en" data-size="large">Tweet this</a>    </div>      <p  class="rbTextRight rbDynRightText rbDynText" >                 {{11}}      </p>    <div class="rbInfoBtnDyn">      <div class="rb-btn-group" >        <button id="rbBottombarGenericTwittershareRoiHelp" class="rb-info-btn rb-info-btn-small rbClickable" link="http://www.rulebot.com">          ?        </button>        <button id="rbBottombarGenericTwittershareCloseClick" class="rb-info-btn rb-info-btn-small rbClickable" >          X        </button>                  </div>    </div>    </div></div>         '



/****************************[[./templates/topbars/rbTemplTopbarGenericFblike.js]]*************************************/ 


trigger_fish.rbT.rbTemplTopbarGenericFblikeHTML='<!-- --><link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/actwitty_ganga/css/common_styles.css"><style>  .rbTbFbLikeDyn{    position: fixed;    top: 0px;    left: 0px;       z-index: {{1}};        color: white;    font-size: {{2}}px;    font-family:\'{{3}}\';    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.5);        border: 1px solid {{4}};    background-color: {{5}};      }  .rbTbFbLikeDyn .barDyn{    width: {{6}}px;    height: {{7}}px;    vertical-align: middle;    position: relative;  }  .rbTbFbLikeDyn .rbDynText{    white-space: nowrap;    overflow:hidden;   }      .rbTbFbLikeDyn .rbDynLeftText{    position: absolute;    left:20px;     width:80%;    top: 10px;    text-align: center;    margin-right: 20px;   }    .rbTbFbLikeDyn .rbTbFbLikeRight{    position: absolute;    right:20px;     width:260px;    top: 10px;    text-align: center;    margin-right: 20px;       }   .rbTbFbLikeDyn .rbInfoBtnDyn{    position: absolute;    top: 5px;    right: -130px;    display: inline-block;  }  </style> <div id="fb-root"></div>  <script>(function(d, s, id) {    var js, fjs = d.getElementsByTagName(s)[0];    if (d.getElementById(id)) return;    js = d.createElement(s); js.id = id;    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";    fjs.parentNode.insertBefore(js, fjs);  }(document, "script", "facebook-jssdk"));  </script><div id="rbTopbarGenericFblikeBaseContainer" class="rbBaseStyle rbTbFbLikeDyn" >    <div class="rbBarWidth barDyn">    <p id="rbTopbarGenericFblikeLeftClick" class="rbTextLeft rbDynLeftText rbDynText" >      {{8}}    </p>          <div class="rbTbFbLikeRight" >      <div class="fb-like"           data-href="{{9}}"           data-send="true"           data-layout="button_count"           data-width="250px"           data-show-faces="false"           data-font="arial">      </div>    </div>        <div class="rbInfoBtnDyn">      <div class="rb-btn-group" >        <button id="rbTopbarGenericFblikeRoiHelp" class="rb-info-btn rb-info-btn-small rbClickable" link="http://www.rulebot.com">          ?        </button>        <button id="rbTopbarGenericFblikeCloseClick" class="rb-info-btn rb-info-btn-small rbClickable" >          X        </button>                  </div>    </div>    </div></div>'



/****************************[[./templates/topbars/rbTemplTopbarGenericTwitterfollow.js]]*************************************/ 


trigger_fish.rbT.rbTemplTopbarGenericTwitterfollowHTML='<!-- --><link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/actwitty_ganga/css/common_styles.css"><style>    .rbTpTwFollowDyn{    position: fixed;    top: 0px;    left: 0px;       z-index: {{1}};        background: {{2}} !important;        border-bottom: 1px solid #18496A !important;  }  .rbTpTwFollowDyn .barDyn{    width: {{3}}px;    height: {{4}}px;    vertical-align: middle;    position: relative;  }  .rbTpTwFollowDyn .rbDynText   {     color:{{5}};     font-size: {{6}}px;     font-family: {{7}};     font-weight:{{8}};     white-space: nowrap;     overflow:hidden;   }      .rbTpTwFollowDyn .rbDynLeftText{    position: absolute;    left:20px;     width:40%;    top: 10px;    text-align: center;    margin-right: 20px;   }      .rbTpTwFollowDyn .rbDynRightText{    position: absolute;    right: 20px;     top: 10px;        width:30%;     text-align: center;       margin-left: 20px;   }   .rbTpTwFollowDyn .rbBtnDyn {                      position: absolute;            width:150px;      left: 42%;      top: 5px;      margin-right: 20px;                         }     .rbTpTwFollowDyn .rbInfoBtnDyn{    position: absolute;    top: 5px;    right: -130px;    display: inline-block;   }</style><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script><div id="rbTopbarGenericTwitterfollowBaseContainer" class="rbBaseStyle rbTpTwFollowDyn" >  <div class="rbBarWidth barDyn">    <p  class="rbTextLeft rbDynLeftText rbDynText" >      {{9}}    </p>    <div class ="rbBtn rbBtnDyn" >           <a  data-show-count="false" data-button = "blue" class="twitter-follow-button" href="https://twitter.com/{{10}}" data-size="large">Follow {{11}} </a>    </div>      <p  class="rbTextRight rbDynRightText rbDynText" >                 {{12}}      </p>    <div class="rbInfoBtnDyn">      <div class="rb-btn-group" >        <button id="rbTopbarGenericTwitterfollowRoiHelp" class="rb-info-btn rb-info-btn-small rbClickable" link="http://www.rulebot.com">          ?        </button>        <button id="rbTopbarGenericTwitterfollowCloseClick" class="rb-info-btn rb-info-btn-small rbClickable" >          X        </button>                  </div>    </div>    </div></div>'



/****************************[[./templates/topbars/rbTemplTopbarGenericNormal.js]]*************************************/ 


trigger_fish.rbT.rbTemplTopbarGenericNormalHTML='<!-- --><link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/actwitty_ganga/css/common_styles.css"><style>    .rbTpGenDyn{    position: fixed;    top: 0px;    left: 0px;       z-index: {{1}};        background: {{2}} !important;    border-top: 1px solid #CC412A !important;    border-bottom: 1px solid #CC412A !important;  }  .rbTpGenDyn .barDyn{    width: {{3}}px;    height: {{4}}px;    vertical-align: middle;    position: relative;  }  .rbTpGenDyn .rbDynText   {     color:{{5}};     font-size: {{6}}px;     font-family: {{7}};     font-weight:{{8}};     white-space: nowrap;     overflow:hidden;   }      .rbTpGenDyn .rbDynLeftText{    position: absolute;    left:20px;     width:40%;    top: 10px;    text-align: center;    margin-right: 20px;   }      .rbTpGenDyn .rbDynRightText{    position: absolute;    right: 20px;     top: 10px;        width:40%;     text-align: center;       margin-left: 20px;   }   .rbTpGenDyn .rbBtnDyn {            padding: 12px 15px 12px;      text-shadow: none !important;      border-right: 1px solid #CC412A;      border-left: 1px solid #E75F48;      -webkit-transition: background 1s ease;      -moz-transition: background 1s ease;      -o-transition: background 1s ease;      transition: background 1s ease;                  position: absolute;            width:100px;      left: 42%;      top: 0;      margin-right: 20px;                          background-color: {{9}} !important;      color: {{10}} !important; !important;      font-size: {{11}}px; !important;         white-space: nowrap;        overflow: hidden;       text-overflow: ellipsis;   }   .rbTpGenDyn .rbBtnDyn:hover {      background-color: {{12}} !important;      color: {{13}} !important;      -webkit-transition: background 1s ease;      -moz-transition: background 1s ease;      -o-transition: background 1s ease;      transition: background 1s ease;   }   .rbTpGenDyn .rbInfoBtnDyn{    position: absolute;    top: 5px;    right: -130px;    display: inline-block;   }</style><div id="rbTopbarGenericNormalBaseContainer" class="rbBaseStyle rbTpGenDyn" >  <div class="rbBarWidth barDyn">    <p id="rbTopbarGenericNormalLeftClick" class="rbTextLeft rbDynLeftText rbDynText" >      {{14}}    </p>      <div id="rbTopbarGenericNormalRoiMiddlebutton" class ="rbClickable rbBtn rbBtnDyn"           link="{{15}}">       {{16}}     </div>      <p id="rbTopbarGenericNormalRightClick" class="rbTextRight rbDynRightText rbDynText" >                 {{17}}      </p>    <div class="rbInfoBtnDyn">      <div class="rb-btn-group" >        <button id="rbTopbarGenericNormalRoiHelp" class="rb-info-btn rb-info-btn-small rbClickable" link="http://www.rulebot.com">          ?        </button>        <button id="rbTopbarGenericNormalCloseClick" class="rb-info-btn rb-info-btn-small rbClickable" >          X        </button>                  </div>    </div>    </div></div>'



/****************************[[./templates/topbars/rbTemplTopbarGenericTwittershare.js]]*************************************/ 


trigger_fish.rbT.rbTemplTopbarGenericTwittershareHTML='<!-- --><link rel="stylesheet" type="text/css" href="https://s3.amazonaws.com/actwitty_ganga/css/common_styles.css"><style>    .rbTpTwShareDyn{    position: fixed;    top: 0px;    left: 0px;       z-index: {{1}};        background: {{2}} !important;        border-bottom: 1px solid #18496A !important;  }  .rbTpTwShareDyn .barDyn{    width: {{3}}px;    height: {{4}}px;    vertical-align: middle;    position: relative;  }  .rbTpTwShareDyn .rbDynText   {     color:{{5}};     font-size: {{6}}px;     font-family: {{7}};     font-weight:{{8}};     white-space: nowrap;     overflow:hidden;   }      .rbTpTwShareDyn .rbDynLeftText{    position: absolute;    left:20px;     width:40%;    top: 10px;    text-align: center;    margin-right: 20px;   }      .rbTpTwShareDyn .rbDynRightText{    position: absolute;    right: 20px;     top: 10px;        width:40%;     text-align: center;       margin-left: 20px;   }   .rbTpTwShareDyn .rbBtnDyn {                      position: absolute;            width:100px;      left: 42%;      top: 5px;      margin-right: 20px;                         }     .rbTpTwShareDyn .rbInfoBtnDyn{    position: absolute;    top: 5px;    right: -130px;    display: inline-block;   }</style><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script><div id="rbTopbarGenericTwittershareBaseContainer" class="rbBaseStyle rbTpTwShareDyn" >  <div class="rbBarWidth barDyn">    <p  class="rbTextLeft rbDynLeftText rbDynText" >      {{9}}    </p>    <div class ="rbBtn rbBtnDyn"           link="{{10}}">        <a href="https://twitter.com/share?text={{11}}" class="twitter-share-button" data-count="none" data-lang="en" data-size="large">Tweet this</a>    </div>      <p  class="rbTextRight rbDynRightText rbDynText" >                 {{12}}      </p>    <div class="rbInfoBtnDyn">      <div class="rb-btn-group" >        <button id="rbTopbarGenericTwittershareRoiHelp" class="rb-info-btn rb-info-btn-small rbClickable" link="http://www.rulebot.com">          ?        </button>        <button id="rbTopbarGenericTwittershareCloseClick" class="rb-info-btn rb-info-btn-small rbClickable" >          X        </button>                  </div>    </div>    </div></div>         '



/****************************[[./templates/topbars/rbTemplSupportOlarkNormal.js]]*************************************/ 


trigger_fish.rbT.rbTemplSupportOlarkNormalHTML='<!-- --><div id="rbChatGenericNormalBaseContainer"><script data-cfasync="false" type=\'text/javascript\'>window.olark||(function(c){var f=window,d=document,l=f.location.protocol=="https:"?"https:":"http:",z=c.name,r="load";var nt=function(){f[z]=function(){(a.s=a.s||[]).push(arguments)};var a=f[z]._={},q=c.methods.length;while(q--){(function(n){f[z][n]=function(){f[z]("call",n,arguments)}})(c.methods[q])}a.l=c.loader;a.i=nt;a.p={0:+new Date};a.P=function(u){a.p[u]=new Date-a.p[0]};function s(){a.P(r);f[z](r)}f.addEventListener?f.addEventListener(r,s,false):f.attachEvent("on"+r,s);var ld=function(){function p(hd){hd="head";return["<",hd,"></",hd,"><",i,\' onl\' + \'oad="var d=\',g,";d.getElementsByTagName(\'head\')[0].",j,"(d.",h,"(\'script\')).",k,"=\'",l,"//",a.l,"\'",\'"\',"></",i,">"].join("")}var i="body",m=d[i];if(!m){return setTimeout(ld,100)}a.P(1);var j="appendChild",h="createElement",k="src",n=d[h]("div"),v=n[j](d[h](z)),b=d[h]("iframe"),g="document",e="domain",o;n.style.display="none";m.insertBefore(n,m.firstChild).id=z;b.frameBorder="0";b.id=z+"-loader";if(/MSIE[ ]+6/.test(navigator.userAgent)){b.src="javascript:false"}b.allowTransparency="true";v[j](b);try{b.contentWindow[g].open()}catch(w){c[e]=d[e];o="javascript:var d="+g+".open();d.domain=\'"+d.domain+"\';";b[k]=o+"void(0);"}try{var t=b.contentWindow[g];t.write(p());t.close()}catch(x){b[k]=o+\'d.write("\'+p().replace(/"/g,String.fromCharCode(92)+\'"\')+\'");d.close();\'}a.P(2)};ld()};nt()})({loader: "static.olark.com/jsclient/loader0.js",name:"olark",methods:["configure","extend","declare","identify"]});olark.identify({{1}});olark.configure(\'box.width\', 200);olark.configure(\'box.height\', 100);</script></div>'



/****************************[[./templates/topbars/rbTemplModalGenericNormal.js]]*************************************/ 


trigger_fish.rbT.rbTemplModalGenericNormalHTML='<!-- --><style>#rbModalGenericNormalTranblockContainer {      visibility: visible;     position: fixed;      left: 0px;      top: 0px;       width:100%;       height:100%;        z-index:{{1}};  opacity:0.6;  filter:alpha(opacity=60);  background-color:black; }#rbModalGenericNormalBaseContainer{      visibility: visible;     position: fixed;      left: 0px;      top: 0px;       width:100%;       height:100%;  z-index:{{2}}; }#rbModalGenericNormalSubsubContainer{      width:500px;   height: 400px;  background-color:{{3}};    border:8px solid rgba(0, 0, 0, .7);;     position: fixed;  top : 25%;  left : 30%;  padding : 15px;  -webkit-border-radius: 5px;  -moz-border-radius: 5px;  border-radius: 5px;  }.rbModalContainer{      width: 500px;   height: 400px;    border:1px solid #a3a3a3;     position: fixed;  -webkit-border-radius: 5px;  -moz-border-radius: 5px;  border-radius: 5px;    }.rbModalCover{  position: absolute;  top: 0px;  left: 0px;  width: 500px;   height: 400px;    padding: 0px;  display: block;  background: #ffffff url(\'{{4}}\') no-repeat right top;             filter:alpha(opacity=60);  opacity:0.6;  -webkit-border-top-left-radius: 5px;  -webkit-border-top-right-radius: 5px;  -moz-border-radius-topleft: 5px;  -moz-border-radius-topright: 5px;  border-top-left-radius: 5px;  border-top-right-radius: 5px;  z-index: -1;  }.rbModalHead{  background-color:{{5}};      width: 100%;  height: 50px;      position: relative;  display: block;  -webkit-border-top-left-radius: 5px;  -webkit-border-top-right-radius: 5px;  -moz-border-radius-topleft: 5px;  -moz-border-radius-topright: 5px;  border-top-left-radius: 5px;  border-top-right-radius: 5px;  z-index: 1;   }  .rbModalHead .rbModalClose{    position: absolute;    top: 4px;    right: 4px;    display: inline-block;    font-size: 14px;    font-weight: normal;    color: white;    cursor: pointer;    z-index: 1;  }  .rbModalClose:hover{    color: #aaa;  }.rbModalHeader{  top:0;  left:0;  position: absolute;    white-space: nowrap;    overflow: hidden;   text-overflow: ellipsis;  color:{{6}};  width:80%;   height:30px;  font-size:{{7}}px;  font-family:{{8}};   overflow:hidden;  border-top-left-radius:5px;  border-top-right-radius:5px;  padding:5px;  padding-top: 10px;  text-shadow:1px 1px {{9}};}.rbOffer{  margin-top: 10px;  width: 100%;  height: 200px;  display: block;    z-index: 1;}.rbModalOffer{  overflow: hidden;   text-overflow: ellipsis;  font-size: {{10}}px;    line-height: {{11}}px;    color:{{12}};   background: rgba(255,255,255,0.1) }.rbModalButton{  bottom: 2%;  right: 2%;  position:absolute;  width: 160px;  height: 30px;  text-align: center;    border:4px solid {{13}};  background-color: {{14}};    color:{{15}};  font-size: {{16}}px;  border-radius:5px;  padding: 5px;    font-weight: normal;  display: block;  float: right;  margin-right: 10px;  cursor:pointer;}</style><div id="rbModalGenericNormalTranblockContainer"></div> <div id="rbModalGenericNormalBaseContainer">   <div id="rbModalGenericNormalSubContainer">      <div id="rbModalGenericNormalSubsubContainer">                  <div class="rbModalContainer" >          <div class="rbModalCover"></div>            <div class="rbModalHead">              <div class="rbModalHeader">                 {{17}}              </div>              <div id="rbModalGenericNormalCloseClick" class="rbModalClose  rbClickable" >                X              </div>                        </div>            <div class="rbOffer">              <p class="rbModalOffer">                 {{18}}              </p>            </div>                     <div  class="rbModalButton">               <div  id="rbModalGenericNormalRoiClickbutton" class="rbClickable" link= "{{19}}" class="rbClickable" >                {{20}}                             </div>             </div>                 </div></div>  </div></div>'



/****************************[[./templates/topbars/rbTemplFeedbackUservoiceNormal.js]]*************************************/ 


trigger_fish.rbT.rbTemplFeedbackUservoiceNormalHTML='<!-- --><div id="rbUservoiceGenericNormalBaseContainer">	<script>  var uvOptions = {};  (function() {    var uv = document.createElement(\'script\'); uv.type = \'text/javascript\'; uv.async = true;    uv.src = (\'https:\' == document.location.protocol ? \'https://\' : \'http://\') + \'widget.uservoice.com/QteXP0WAzCiaFH1O2obGg.js\';    var s = document.getElementsByTagName(\'script\')[0]; s.parentNode.insertBefore(uv, s);   })();</script></div>'



/****************************[[helpers.js]]*************************************/ 


"use strict";

// Templ Sys , Actor and Event Varibales

trigger_fish.rbT.currentSystemVar = {} //{'browser':{'name':'Chrome','version':'1.2','name2':{'myname':'Amartya'}}};
trigger_fish.rbT.currentActorVar = {};
trigger_fish.rbT.currentEventVar = {};


//templ related timers

trigger_fish.rbT.templTimers= {
 'templ.displaytimer':'false',
 'templ.templduration':'100'

};

// display lock for templ positions

trigger_fish.rbT.templatesDisplayLockFlags = {

    'trigger_fish.rbT.topbar.displayLock':'false',
    'trigger_fish.rbT.bottombar.displayLock':'false',
    'trigger_fish.rbT.modal.displayLock' :'false',
    'trigger_fish.rbT.chat.displayLock' :'false',
    'trigger_fish.rbT.uservoice.displayLock' :'false',


};

//function fir set the display lock for templ postions

trigger_fish.rbT.setTemplatesDisplayLockFlags=function(pos,value)
{

   if(pos == 'topbar') 
   {
     trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.topbar.displayLock'] = value; 
   }

   else if(pos == 'bottombar') 
   {
     trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.bottombar.displayLock'] = value; 
   }

   else if(pos == 'modal') 
   {
     trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.modal.displayLock'] = value; 
   }

   else if(pos == 'chat') 
   {
     trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.chat.displayLock'] = value; 
   }

  else if(pos == 'feedback') 
   {
     trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.feedback.displayLock'] = value; 
   }

}



//************************************************
//function returns the string making capital letter the first letter

trigger_fish.rbT.makeFirstLetterCapital=function(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
};


////************************************************
//function returns the string making capital letter the first letter

trigger_fish.rbT.makeFirstLetterSmall=function(string)
{
    return string.charAt(0).toLowerCase() + string.slice(1);
};


//********************************************************


//*************************************************

//from template name extract the disply position for the template

trigger_fish.rbT.extractDisplayPositionFromTemplName = function(templName){

    var tempReg = /[a-z]*/g;
    var tempMatch = tempReg.exec(templName);
    return tempMatch;

};


//**********************************************************************************

// fill the run time variable in in templ args from sys,actor and event varibale

trigger_fish.rbT.fillTheRuntimeValueForTemplArgs = function(tempMatch,actionparmaskey)
{

      try{
             

// if e. event hash
// if s. system hash
// if a. actor variable


                           // fetch system variable here 
                           // fetch actor variable here
                            // fetch event variable here

// INTEGRATION_ENABLE                            
/*
                           trigger_fish.rbT.currentSystemVar = trigger_fish.rbTSystemVar.getProperty();
                           trigger_fish.rbT.currentActorVar = trigger_fish.rbTActor.getProperties();
                           trigger_fish.rbT.currentEventVar = trigger_fish.rbTAPP.getTransVar();
*/                           

                             
                           for(var i=0 ; i<tempMatch.length ; i++)
                           {

                              var objNested = {};
                               
                               
                               var tempMatchForscope = ""

                               tempMatch[i]=tempMatch[i].replace("{{","");
                               tempMatch[i]=tempMatch[i].replace("}}","");


                               tempMatchForscope = tempMatch[i].match(/[\w]*/g);

                               if(tempMatchForscope[0])
                               
                               {
                                   var k =0;

                                

                                    if(tempMatchForscope[0] == "s")
                                    {
                                       objNested = trigger_fish.rbT.currentSystemVar; 
   
                                       for(k=2;k<=tempMatchForscope.length-2;k++)
                                       {
                                         if(k%2 === 0)
                                          {
                                             var objNested = objNested[tempMatchForscope[k]] 

                                          } 
                                       }
                                   }

                                  else if(tempMatchForscope[0] == "e")
                                    {
                                       objNested =trigger_fish.rbT.currentEventVar; 
   
                                       for(k=2;k<=tempMatchForscope.length-2;k++)
                                       {
                                         if(k%2 === 0)
                                          {
                                             var objNested = objNested[tempMatchForscope[k]] 

                                          } 
                                       }
                                   }

                                  else if(tempMatchForscope[0] == "a")
                                    {
                                       objNested =trigger_fish.rbT.currentActorVar ; 
   
                                       for(k=2;k<=tempMatchForscope.length-2;k++)
                                       {
                                         if(k%2 === 0)
                                          {
                                             var objNested = objNested[tempMatchForscope[k]] 

                                          } 
                                       }
                                   }

                                 
                          }  

                               tempMatch[i] = '{{'+ tempMatch[i] + '}}';

                               actionparmaskey = actionparmaskey.replace(tempMatch[i],objNested);

                               return actionparmaskey;


                         }         
              
         }catch(e){

                trigger_fish.rbT.sendErrorToRBServer(e.message);

         }

};


//******************************************************************
//check for the if templ position is occupied
trigger_fish.rbT.isTemplPosOccupied = function(pos){
   
   var ret = false;
 

   if(pos == 'topbar' && trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.topbar.displayLock'] 
    == true ) 
   {
     ret= true;
      
   }
   else if(pos == 'bottombar' && trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.bottombar.displayLock'] 
    == true ) 
   {
     ret= true;
    }
  else if(pos == 'modal' && trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.modal.displayLock'] 
    == true )
  {
     //TODO
  }

 else if(pos == 'chat' && trigger_fish.rbT.templatesDisplayLockFlags['trigger_fish.rbT.chat.displayLock'] 
    == true )
  {
     ret= true;
  }


  else if(pos == 'feedback')
  {
     //TODO
  }


 return ret;
};


//**************************************************************

//function for find hightest Z index
trigger_fish.rbT.findZIndex = function(){

  var elements = document.getElementsByTagName("*");
  var highest_index = 0;

  for (var i = 0; i < elements.length - 1; i++) 
  {
    if (parseInt(elements[i].style.zIndex) > highest_index)
    { 
       highest_index = parseInt(elements[i].style.zIndex);
    }
  }

  highest_index = highest_index +1;


  return highest_index ;

};

trigger_fish.rbT.getBrowserVersion = function(){
  //TODO: Modernzer
};


trigger_fish.rbT.getPlatform = function(){
 //TODO: Modernzer

};


trigger_fish.rbT.sendEventToRBServer = function(){


};

trigger_fish.rbT.sendErrorToRBServer = function(string){

// INTEGRATION_ENABLE     
/*

 trigger_fish.rbTAPP.reportError({"message":string,"server":true});


*/

 // INTEGRATION_ENABLE   

  /* trigger_fish.rbTAPP.log({"message": string,"data":respData});
 */
  console.log(string);
};





/****************************[[externals.js]]*************************************/ 



trigger_fish.rbT.facebook = {
	setContext: function(context){
		//
        //  trigger_fish.rbT.facebook.likePage
		//  trigger_fish.rbT.facebook.appID

	},
	getHTML: {
		likeBtn: function(){

		},
		shareBtn: function(){

		},
		
	}


}

trigger_fish.rbT.twitter = {


};




/****************************[[event_handler.js]]*************************************/ 


"use strict";

trigger_fish.rbT.eventHandler = {
	
 //**************************************************************************************** 
	init: function(){

		var eles = document.getElementsByClassName('rbClickable');
        
        for(var i = 0; i<eles.length; i++){

			eles[i].onclick= trigger_fish.rbT.eventHandler.clickListner;

		}
 },

//************************************************************************************************8

//this function for the capturing the event from the clicks
	clickListner : function(evt){
        

		var id = evt.target.id;


		var ele = document.getElementById(id);

    var idMatch = id.match(/[A-Z][a-z]*/g);

 

   if (idMatch[3])
   {
     if ( idMatch[3] == 'Close')
     {
        trigger_fish.rbT.eventHandler.closeTempl(idMatch);
     }
  
    else if ( idMatch[3] == 'Roi' )
    {
         trigger_fish.rbT.eventHandler.roiFromTemplClick(idMatch,evt);

    }

  }
  else{
          trigger_fish.rbT.sendErrorToRBServer(" Close or ROI Click is Not valid ");

  }

       evt.preventDefault();

	
  },
	
//*****************************************************************************************************	
 clickHandles: {

   //TODO
	
	},

//*******************************************************************************************************

  timeOutHandler : function (tempalteName , timerValue)
	{


       trigger_fish.rbT.templTimers['templ.displaytimer'] = setInterval(function(){trigger_fish.rbT.eventHandler.timerDeleteTempl
       (tempalteName)},timerValue); 
       
  },

//******************************************************************************************************
  timerDeleteTempl:function(tempalteName)
  {

       var tempMatch = tempalteName.match(/[a-z]*/g);

 
       
      if(tempMatch[0] != 'modal' )
       { 
           id = "rb" + trigger_fish.rbT.makeFirstLetterCapital(tempMatch[0])+trigger_fish.rbT.makeFirstLetterCapital(tempMatch[2])+trigger_fish.rbT.makeFirstLetterCapital(tempMatch[4])+"BaseContainer";
       }     


     else if(tempMatch[0] == 'modal')
     {

         var id = "rb" + trigger_fish.rbT.makeFirstLetterCapital(tempMatch[0])+trigger_fish.rbT.makeFirstLetterCapital(tempMatch[2])+trigger_fish.rbT.makeFirstLetterCapital(tempMatch[4])+"BaseContainer";
         var transId = "rb" + trigger_fish.rbT.makeFirstLetterCapital(tempMatch[0])+trigger_fish.rbT.makeFirstLetterCapital(tempMatch[2])+trigger_fish.rbT.makeFirstLetterCapital(tempMatch[4])+"TranblockContainer";
         var transBase = document.getElementById(transId);
         if(transBase != 'undefined')
         transBase.parentNode.removeChild(transBase);
     } 
     
       
        
        trigger_fish.rbT.setTemplatesDisplayLockFlags(tempMatch[0],false);
        
        var Base = document.getElementById(id);

         if( typeof Base === 'undefined')
         {
         	  trigger_fish.rbT.sendErrorToRBServer("Not able to find template Base for timeout Delete ");

         }

         else
         {
            Base.parentNode.removeChild(Base);
            clearInterval(trigger_fish.rbT.templTimers['templ.displaytimer']);

         }	


  },

  //***********************************************************************************************************

   closeTempl:function(idMatch){

      if(trigger_fish.rbT.templTimers['templ.displaytimer'])
      {
          clearInterval(trigger_fish.rbT.templTimers['templ.displaytimer']);

      }
      if(idMatch[0] == 'Topbar' || idMatch[0] == 'Bottombar' )

     {   

         var id= "rb" + idMatch[0]+idMatch[1]+idMatch[2]+"BaseContainer";


     }

     else if(idMatch[0] == 'Modal')
     {

         var id = "rb" + idMatch[0]+idMatch[1]+idMatch[2]+"BaseContainer";
         var transId = "rb" + idMatch[0]+idMatch[1]+idMatch[2]+"TranblockContainer";
         var transBase = document.getElementById(transId);
         transBase.parentNode.removeChild(transBase);
     } 


      var base = document.getElementById(id);

      
      if(base)
      {
         base.parentNode.removeChild(base);

         trigger_fish.rbT.setTemplatesDisplayLockFlags(trigger_fish.rbT.makeFirstLetterSmall(idMatch[0]),false);
         
      }else{
            trigger_fish.rbT.sendErrorToRBServer("Not able to find template Base for Normal X Delete ");

      }


  },

//******************************************************************************************************
  
  roiFromTemplClick:function(idMatch,evt){
    
    var link = evt.target.getAttribute('link');            
    window.open(link, '_blank');
    
    params={};

   params.button = "";
    
    for(var i=0 ; i<idMatch.length ; i++)
    {  
           params.button = params.button + idMatch[i]

    }

    params.button = params.button + " " +"Clicked"
    
// INTEGRATION_ENABLE     

/*
         //trigger_fish.rbTServerChannel.conversion(params,trigger_fish.rbT.eventHandler.roiCallBackfromServerResponse);
        //TODO

*/

  },  

//*********************************************************************************************************

  roiCallBackfromServerResponse:function(params){

  
  //TODO handle the server response with Data

  },  
 
 
};


/****************************[[main.js]]*************************************/ 


/* Main code */
/* The global Rulebot scope */
"use strict";



//************************************************************************************

trigger_fish.rbT.init = function(){
	trigger_fish.rbT.keyPrefix = "{{";
	trigger_fish.rbT.keySuffix = "}}";
	trigger_fish.rbT.inited = true;

};






//******************************************************************************************

trigger_fish.rbT.getTemplateHTMLByNameInternal = function(type,api){
	
    

            	var html = trigger_fish.rbT[trigger_fish.rbT.templateLib[type][api]];
                
                if(html != undefined)  
                {     
                     return html;
                }     
                else
                {
                	 trigger_fish.rbT.sendErrorToRBServer("Unsupported Templ");
                	 return "";
                } 
	
	
};
//*******************************************************************************************

trigger_fish.rbT.getTemplateApplyVarsInternal = function(html,vars){
	//TODO: check instanceOf
	if(html.length){
		for (var key in vars) {
		
		if(vars.hasOwnProperty(key))
		{	
			var value = vars[key] ; 
			
			if( key != 'rb.t.nr.templDuration')
            {
			  var tempVarToBeReplaced = key;			  
              var replaceKey = trigger_fish.rbT.keyPrefix + tempVarToBeReplaced + trigger_fish.rbT.keySuffix;

			  html = html.replace(replaceKey, value);

			} 
		}	
	  }
		return html;	
	}else{
	 trigger_fish.rbT.sendErrorToRBServer("Bad variable array error for template");
	 return "";
	}

};
//***************************************************************************************

trigger_fish.rbT.isTemplateGoodToApplyInternal = function(html){

	nMatched = ""
	var nMatched = html.match(/(\{\{[\w.]*\}\})/g)
	

	if (nMatched != null){
		trigger_fish.rbT.sendErrorToRBServer("Not all variables in templates were replaced");
		return false;
	}

	return true;
};

//**************************************************************************************

trigger_fish.rbT.applyHtmltoPageInternal = function(html){

	if(html.length){


	 jQuery('body').append(html);

	// document.body.innerHTML = document.body.innerHTML+html;

	}else{

         trigger_fish.rbT.sendErrorToRBServer("Bad variable array error for template");
	 			 return "";
	 }
};

//***********************************************************************************
trigger_fish.rbT.enableClickHandlingInternal = function(){
	trigger_fish.rbT.eventHandler.init();
};

//***************************************************************************************
trigger_fish.rbT.enableTimeOutHadnlingInternal= function(templateName,timerValue){
   
    trigger_fish.rbT.eventHandler.timeOutHandler(templateName,timerValue);
};

//*************************************************************************************
trigger_fish.rbT.invokeActionScriptInternal=function(action){

/*

      //TODO get the OS version here based on that action display

*/

if(1) // Check for Service Type Enhancement
 {   
 
      params= {};  
      
      trigger_fish.rbT.init();
      
      var actionParams = action.params;
       
      var type=action.desc.type; 
      var api = action.desc.api;
      var servermsg = type + "."+api;
      
      var isPosOccupied = trigger_fish.rbT.isTemplPosOccupied(type);

      if(isPosOccupied)
      {

          trigger_fish.rbT.sendErrorToRBServer("Postion Occupied by Another Template");
      }
      else
      {
          var html = trigger_fish.rbT.getTemplateHTMLByName(type,api);

          
              for (var key in actionParams)
                 {
                  if(actionParams.hasOwnProperty(key))
                  {
                     var keyVal = key;
                       var value = actionParams[key];
                       var tempMatch = ""
                       var tempMatch = value.match(/\{\{[\w.\=\%\:\/\s\#\@\-\']*\}\}/g);
                      
                       if(tempMatch)
                       {
                       	  var tempActionKeyRetVal =""
                       	  tempActionKeyRetVal=trigger_fish.rbT.fillTheRuntimeValueForTemplArgs(tempMatch,actionParams[key]);
                          

                          if(tempActionKeyRetVal != undefined)
                          {	
                             actionParams[key] = tempActionKeyRetVal;
                          }   
                       }
                   }

                 }      

        //   for (var key in actionParams) {             
        //     if(actionParams.hasOwnProperty(key)){	
			     //     if( 'Zindex' == actionParams[key] ) {               
				    //      actionParams[key] =  trigger_fish.rbT.findZIndex()+5;
			     //     }
			     //  }              
		      // } 

		



          html = trigger_fish.rbT.getTemplateApplyVars(html, actionParams);
          

         if (trigger_fish.rbT.isTemplateGoodToApply(html)){
            trigger_fish.rbT.applyHtmltoPage(html);
            trigger_fish.rbT.enableClickHandling();
           // trigger_fish.rbT.enableTimeOutHadnling(templateName,trigger_fish.rbT.templTimers['templ.templduration']*1000);
		    trigger_fish.rbT.setTemplatesDisplayLockFlags(type,true);

             params.display = servermsg + " " +"Display " + "Success";

// INTEGRATION_ENABLE     
    
// Report Server Display of Templ Successfull
/*
         //trigger_fish.rbTServerChannel.conversion(params,trigger_fish.rbT.eventHandler.roiCallBackfromServerResponse);

*/

         }
      }	
  }else{

  	 // Report to Server for If Service Type Wrong

  }    

};	 


/****************************[[interfaces.js]]*************************************/ 


"use strict";
trigger_fish.rbT.isInitialized = function(){
	return trigger_fish.rbT.inited;
};
//------------------------------------------
trigger_fish.rbT.getTemplateHTMLByName = function(type,api){

	if (!trigger_fish.rbT.isInitialized()){
		return "";
	}
	
	if ( typeof name === 'undefined' ){
		trigger_fish.rbT.sendErrorToRBServer("improper access of interface getTemplateHTMLByName");
		return "";
	}
	return trigger_fish.rbT.getTemplateHTMLByNameInternal(type,api);
};
//------------------------------------------
trigger_fish.rbT.getTemplateApplyVars = function(html,vars){
	if (!trigger_fish.rbT.isInitialized()){
		return "";
	}

	if ( typeof html === 'undefined' || typeof vars === 'undefined' ){
		trigger_fish.rbT.sendErrorToRBServer("improper access of interface getTemplateApplyVars");
		return "";
	}

	return trigger_fish.rbT.getTemplateApplyVarsInternal(html,vars);
};
//------------------------------------------
trigger_fish.rbT.isTemplateGoodToApply = function(html){
	if (!trigger_fish.rbT.isInitialized()){
		return false;
	}
	if ( typeof html === 'undefined' ){
		trigger_fish.rbT.sendErrorToRBServer("improper access of interface isTemplateGoodToApply");
		return "";
	}
	return trigger_fish.rbT.isTemplateGoodToApplyInternal(html);
};

//------------------------------------------
trigger_fish.rbT.applyHtmltoPage = function(html){
	if (!trigger_fish.rbT.isInitialized()){
		return "";
	}
	if ( typeof html === 'undefined' ){
		trigger_fish.rbT.sendErrorToRBServer("improper access of interface applyHtmltoPage");
		return "";
	}
	return trigger_fish.rbT.applyHtmltoPageInternal(html);
};


//-----------------------------------------
trigger_fish.rbT.enableClickHandling = function(){
	trigger_fish.rbT.enableClickHandlingInternal ();
}


//----------------------------------------------------------------

trigger_fish.rbT.enableTimeOutHadnling =function(templateName,timerValue){

   if (!trigger_fish.rbT.isInitialized()){
		return "";
	}
	if ( typeof templateName === 'undefined' ){
		trigger_fish.rbT.sendErrorToRBServer("improper access of interface enableTimeOutHadnling");
		return "";
	}

	trigger_fish.rbT.enableTimeOutHadnlingInternal(templateName,timerValue);
}

//---------------------------------------------------------------

trigger_fish.rbT.invokeActionScript = function(action)
{

	if ( typeof action === 'undefined' ){
		trigger_fish.rbT.sendErrorToRBServer("Invalid params in rule Json");
		return "";
	}

	else{
          trigger_fish.rbT.invokeActionScriptInternal(action); 
	}

	
}

