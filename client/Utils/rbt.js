


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

var version = "1.0.1";

/**
* Main app specific holder managing all id's and initialization of plugins.
* @return {Object} series of managing functions for application.
*/
var rbTAPP = function() {
  var configs = {
                 "status"   : false,
                 "transVar" : {}
                };
  var _p = "RulebotClient-"; 

  return { 

      /** 
      *  Do following tasks on initialization of the app
      *  Get app details
      *  @return void
      */
      initialize : function()
      {
        rbTAPP.log("Initializing RBT APP");
        rbTServerChannel.appDetails();
      },

      /**
      *
      */ 
      releasePreInitCalls : function(w)
      {
        var l = w.rb.q;
        w.rb = new RBT();
        if (l.length) {
          for (var c in l) { var o = l[c]; rb[o.t](o.a,o.b,o.c); }    
        }
      },

      /**
      *
      */
      actOnJQInit : function()
      {
        this.enablePlugins();
        rbTActor.retFromCookie();
        this.releasePreInitCalls(window);
        rbTUtils.invokeEasyJquery("rbTUtils.keepEasyJQVars");
      },

      /**
      * Enable plugins related to cors/storage. 
      * Additional responsibilty of invoking Easy Jquery
      */
      enablePlugins : function()
      {
        enableCORS(jQuery);
        initJStorage();
      },

      /**
      * Check status of RBT APP
      *
      * @param {function} callback Callback function if rbTAPP is alive.
      * @param {object} args Arguments with which callback will be called.
      * @return void   
      */
      isAlive :  function()
      {
        return configs.status;
      },  

      /**
      *
      */
      setrbTAlive : function()
      {
        configs.status = true;
        rbTServerChannel.flushReqQueue();
      },

      /**
      * Set RBT APP Status to true to signal app is alive
      */
      wakeUp : function()
      {
        rbTAPP.log("Initializing RBT APP");
        this.initialize();
      },

      /** 
      *  Set App Id
      *  @param {string} id
      *  @return void
      */
      setAppID: function(id)
      {
        configs.appID = id;
      },

      /** 
      *  Set Account ID
      *  @param {string} id 
      *  @return void
      */
      setAccountID : function(id)
      {
        configs.accountID = id;
      },

      /** 
      *  Set Session ID
      *  @param {string} id 
      *  @return void
      */
      setSessionID : function(id)
      {
        configs.sessionID = id;
      },

      /**
      *
      */   
      setTransVar : function(event,data)
      {
        configs.transVar.event = data;
      },

      /**
      *
      */
      setAppDetail : function(data)
      {
        configs.appData = data;
      },

      /** 
      *  Get App ID
      *  @return {string} id 
      */
      getAppID : function()
      {
        return configs.appID;
      },

      /** 
      *  Get Account ID
      *  @return {string} id 
      */  
      getAccountID : function()
      {
        return configs.accountID;
      },   

      /** 
      *  Get Session ID
      *  @return {string} id 
      */  
      getSessionID : function()
      {
        return configs.sessionID;
      },

      /**
      *
      */
      getTransVar : function(event)
      {
        return configs.transVar.event;
      },

      /**
      *
      */
      getAppDetail : function()
      {
        return configs.appData;
      },

      /** 
      *  report error to rbT server
      *  @param {object} params Error log message 
      *  @return void
      */ 
      reportError : function(params)
      {
        params.scope = params.scope || _p + "==ERROR=="; 
        rbTDebug.error(params);
        if (params.server) {
          rbTServerChannel.reportError(params);
        }
      },
      
      /** 
      *  log
      *  @param {object} params Error log message 
      *  @return void
      */
      log : function(params)
      {
        if (typeof(params) === "string") {
          params = _p + params;
        } else if(params && params.message) {
          params.scope = params.scope || _p; 
          rbTAPP.log(_p + params.message);
        }
        rbTDebug.log(params)
        //console.log(params);
      },
  };    
}();



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
 //initJStorage = function() {   
 var initJStorage = function() {   
    var
        /* jStorage version */
        JSTORAGE_VERSION = "0.3.0";

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
         *   jStorage.set("key", xmlNode);        // IS OK
         *   jStorage.set("key", {xml: xmlNode}); // NOT OK
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
            return jStorage.get(key);
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
                return jStorage.deleteKey(key);
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
            jStorage.flush();
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

            jStorage.set(e.propertyName, storage[e.propertyName]);
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

    //jStorage = {
    jStorage = {
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
//enableCORS = function($) {
var enableCORS = function($) {
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
//var rbTDebug=(function(){var i=this,b=Array.prototype.slice,d=i.console,h={},f,g,m=9,c=["error","warn","info","debug","log"],l="assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "),j=l.length,a=[];while(--j>=0){(function(n){h[n]=function(){m!==0&&d&&d[n]&&d[n].apply(d,arguments)}})(l[j])}j=c.length;while(--j>=0){(function(n,o){h[o]=function(){var q=b.call(arguments),p=[o].concat(q);a.push(p);e(p);if(!d||!k(n)){return}d.firebug?d[o].apply(i,q):d[o]?d[o](q):d.log(q)}})(j,c[j])}function e(n){if(f&&(g||!d||!d.log)){f.apply(i,n)}}h.setLevel=function(n){m=typeof n==="number"?n:9};function k(n){return m>0?m>n:c.length+m<=n}h.setCallback=function(){var o=b.call(arguments),n=a.length,p=n;f=o.shift()||null;g=typeof o[0]==="boolean"?o.shift():false;p-=typeof o[0]==="number"?o.shift():n;while(p<n){e(a[p++])}};return h})();
(function(a){"use strict";var b={};b.VERSION="0.9.2";var c;var d={};var e=function(a,b){return function(){return b.apply(a,arguments)}};var f=function(){var a=arguments,b=a[0],c,d;for(d=1;d<a.length;d++){for(c in a[d]){if(!(c in b)&&a[d].hasOwnProperty(c)){b[c]=a[d][c]}}}return b};var g=function(a,b){return{value:a,name:b}};b.DEBUG=g(1,"DEBUG");b.INFO=g(2,"INFO");b.WARN=g(4,"WARN");b.ERROR=g(8,"ERROR");b.OFF=g(99,"OFF");var h=function(a){this.context=a;this.setLevel(a.filterLevel);this.log=this.info};h.prototype={setLevel:function(a){if(a&&"value"in a){this.context.filterLevel=a}},enabledFor:function(a){var b=this.context.filterLevel;return a.value>=b.value},debug:function(){this.invoke(b.DEBUG,arguments)},info:function(){this.invoke(b.INFO,arguments)},warn:function(){this.invoke(b.WARN,arguments)},error:function(){this.invoke(b.ERROR,arguments)},invoke:function(a,b){if(c&&this.enabledFor(a)){c(b,f({level:a},this.context))}}};var i=new h({filterLevel:b.OFF});(function(){var a=b;a.enabledFor=e(i,i.enabledFor);a.debug=e(i,i.debug);a.info=e(i,i.info);a.warn=e(i,i.warn);a.error=e(i,i.error);a.log=a.info})();b.setHandler=function(a){c=a};b.setLevel=function(a){i.setLevel(a);for(var b in d){if(d.hasOwnProperty(b)){d[b].setLevel(a)}}};b.get=function(a){return d[a]||(d[a]=new h(f({name:a},i.context)))};b.useDefaults=function(c){if(!("console"in a)){return}b.setLevel(c||b.DEBUG);b.setHandler(function(c,d){var e=a.console;var f=e.log;if(d.name){c[0]="["+d.name+"] "+c[0]}if(d.level===b.WARN&&e.warn){f=e.warn}else if(d.level===b.ERROR&&e.error){f=e.error}f.apply(e,c)})};if(typeof define==="function"&&define.amd){define(b)}else if(typeof module!=="undefined"&&module.exports){module.exports=b}else{a["Logger"]=b}})(window);
var rbTDebug = Logger;


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

/**
* Rule manager for application.
* @return {Object} series of managing functions for rules.
*/
var rbTRules = function ()
{
  var __ruleTable   = {},
      __permissions = {
                      'String': [ 'eql', 'swh','ewh','cns','rgx','set' ],
                      'Date'  : [ 'gtn','ltn','eql','dag','drg','set' ],  
                      'Number': [ 'gtn','ltn','eql','btn','set'] 
                     };

  return {
    /**
    * Set rules table for business
    * @return void
    */
    setRulesTable : function(rules)
    {
      "use strict";
      if (rbTUtils.type(rules) !== "Array")
        return;
      var ruleCount = rules.length;
      var _this = this;
      var conditions = [];
      try {
          for (var i = 0 ; i < ruleCount ; ++i) {
            if (!__ruleTable[rules[i].event]) {
              __ruleTable[rules[i].event] = [];
            }
            conditions = [];
            for (var rule in rules[i].conditions) {
              rules[i].conditions[rule].event = rules[i].event; // FIXME ::
              conditions.push(rules[i].conditions[rule]);
            }
            __ruleTable[rules[i].event].push({ "name"        : rules[i].name,
                                              "action"      : rules[i].action,
                                              "action_param": rules[i].action_param,
                                              "conditions"  : conditions
                                            });                                                  

          }
      } catch (e) {
        rbTAPP.reportError({"exception" : e.message,
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
      // Client will not execute any rules if there is no schema set. 
      var appData = rbTAPP.getAppDetail();
      var _this=this;
      if (!appData.app.schema) {
        rbTDebug.log({"message":"There is no schema set for app, cannot execute rules"});
        return;
      }
      try {
            var rules = __ruleTable[event];
            for (var ev in rules) {
              if (rules.hasOwnProperty(ev)) {
                var conditionCount = rules[ev].conditions.length;
                var isRuleValid = true;
                for(var i = 0; i < conditionCount ; i++) {
                  if (!_this.evalRule(rules[ev].conditions[i])) {
                    isRuleValid = false;
                    break;
                  }
                } 
                if (isRuleValid) {
                  rbTAPP.log({"message":"++ALL CONDITIONS PASSED++","rule":rules[ev]});
                  _this.invokeAction(rules[ev]);
                } else {
                  rbTAPP.log({"message":"**ALL CONDITIONS FAILED**","rule":rules[ev]});
                }
              }  
            }
            
      } catch (e) {
        rbTAPP.reportError({"exception"  : e.message,
                            "message"    : "rule execution on event failed" , 
                            "event_name" : event,
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
        var lastEvent = rbTStore.get("lastevent");
        if (lastEvent) {
          this.executeRulesOnEvent(lastEvent);
        } else {
          throw "no last event found"
        }
      } catch(e) {
        rbTDebug.log("no last event found");
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
        rbT.invokeActionScript(rule.action);
      } catch(e) {
        rbTAPP.reportError({"exception" : e.message,
                            "message": "action could not be invoked" , 
                            "event" : event
                           });
      }
    },

    /**
    * Check the data type of object
    * @param {string} rule propertry
    * @return {string} datatype of the object.
    */  
    getDataType : function(event,ruleProp,scope,json)
    {
      // FIXME :: WE NEED TO CHANGE THIS TO GET IT FROM SCHEMA
      return json.type || undefined;
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
      var validProp = true;

      function findprop(obj,path) {
        var args=path.split('.'), l=args.length;
        for (var i=0;i<l;i++) {
          if (!obj.hasOwnProperty(args[i]) )
              return undefined;
          obj=obj[ args[i] ];
        }
        return obj; 
      }

      try {
        if (ruleJson.scope === "a") {
          value = findprop(rbTActor.getProperties(),p).slice(-1)[0];
        } else if (ruleJson.scope === "s") {
          value = findprop(rbTSystemVar.getProperty(),p);
        } else if (ruleJson.scope === "e") {
          value = findprop(rbTAPP.getTransVar(ruleJson.event),p);
        }
      } catch (e) {
        validProp = false;
      } 

      if (!validProp || !value) {
        rbTAPP.log({"message":"Not a valid property to evaluate rule on"});
        return false;
      }
      
      var type = this.getDataType(ruleJson.event, ruleJson.property, ruleJson.scope, ruleJson);
      if (!type)
          return value;

      return this.valueDataType(ruleJson.property, value, type);

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
          rbTAPP.reportError({"exception" : e.message,
                              "message":"data type conversion on rule value failed" , 
                              "property" : property,
                              "value" : value
                             });
      }
    },

    /**
    * Check the validity of the rule based on permitted operations on data type
    * @param {object} ruleJson. Type of condition.
    * @return boolean validity
    */
    isValidRule : function(ruleJson )
    {
      if (!ruleJson.property) return false;
      if (ruleJson.type === "set") return true;

      var propVal = this.evalProperty(ruleJson);
      if (!propVal) return false;

      var propDT = this.getDataType(ruleJson.event, ruleJson.property, ruleJson.scope, ruleJson);
         
      var v1DT = rbTUtils.type(ruleJson.value1);
      if (ruleJson.value2)
        var v2DT = rbTUtils.type(ruleJson.value2);
      var v2DT = v2DT || v1DT;

      if (!__permissions[propDT] || 
          __permissions[propDT].indexOf(ruleJson.operation) < 0) {
        return false;
      }
      
      if (propDT === "String" && (v1DT!==propDT || v2DT!==propDT)) {
        return false;
      } else if (propDT === "Number" && 
                (parseFloat(ruleJson.value1) === "NaN" || 
                  (ruleJson.value2 && parseFloat(ruleJson.value2) === "NaN"))) {
        return false;
      } else if (propDT === "Date") {
        var v1Date = new Date(ruleJson.value2);
        if (ruleJson.value2) {
          var v2Date = new Date(ruleJson.value2);
        }
        v2Date = v2Date || v1Date;
        if (v1Date.toString() === "Invalid Date" || v2Date.toString() === "Invalid Date") return false;
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
      var ruleJson = (rbTUtils.type(rule) === "Object") ? rule : JSON.parse(rule);
      try {
        
        rbTAPP.log({"message":"for rule condition","rule":ruleJson}); 
        var res = false;

        if (!this.isValidRule(ruleJson) || !this.rule.hasOwnProperty(ruleJson.operation))
            return res;

        var propDT = this.getDataType(ruleJson.event, ruleJson.property, ruleJson.scope, ruleJson),
            p = this.evalProperty(ruleJson),
            a = this.valueDataType(ruleJson.property, ruleJson.value1, propDT),
            b = this.valueDataType(ruleJson.property, ruleJson.value2, propDT);

        res = this.rule[ruleJson.operation](p,a,b);
        
        return (ruleJson.negation === "true") ? !res : res;

      } catch (e) {
        rbTAPP.reportError({"exception" : e.message,
                                         "message"   :"rule evaluation on"+ ruleJson.operation +" failed" , 
                                         "rule"      : ruleJson,
                                        });
        return false;
      }
    },

    /**
     * Hold all rule functions 
     */
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
        return (p < v);
      },
          
      /**
      * Rule to check for greater than
      * @param {object} p Rule property
      * @param {object} v Rule value
      * @return {boolean} Validity based on rule    */ 
      gtn : function(p,v)
      {
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
        var oneDay = 24*60*60*1000,fD = new Date(p),sD = new Date();
        var diffDays = Math.round( Math.abs((fD.getTime() - sD.getTime())/(oneDay)) );
        return (diffDays === rbTRules.valueDataType(diffDays, v))?true:false;
      },

      /**
      * Rule to check for date range condition
      * @param {object} p Rule property
      * @param {object} v Rule value
      * @return {boolean} Validity based on rule
      */
      drg : function(p,v1,v2)
      {
        return ( (p>=rbTRules.valueDataType(p,v1)) && 
                 (p<=rbTRules.valueDataType(p,v2)) )
                  ? true : false;  
      },

      /**
      * Rule to check for set to condition
      * @param {object} p Rule property
      * @return {boolean} Validity based on rule
      */
      set : function(p)
      {
        return (p?true:false);
      }
    }
  };
}();


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

/**
 * Server responses manager for the application.
 */
var rbTServerResponse = {  

  /** 
  *  Handle default success callback if not mentioned explicitly
  *   
  *  @return void
  */ 
  defaultSuccessCallback : function(respData)
  {
    // FIXME : what to do?
    rbTAPP.log({"message": "Success callback : default server response","data":respData});
  },
  /** 
  *  Handle default error callback if not mentioned explicitly
  *   
  *  @return void
  */ 
  defaultErrorCallback : function(respData)
  {
    // FIXME : what to do?
    rbTAPP.log({"message": "Error callback : default server response","data":respData});
  },


  /**
  * Set actor identification based on server response
  * @param {object} respData Actor identification details
  * @return void
  */
  setActorID : function(respData)
  { 
    "use strict";
    rbTAPP.log({"message": "Setting actor ID with server resp","data":respData});
    try {
      if (respData && respData.id) {
        rbTActor.setID(respData.id);
        rbTActor.requestActorDetails(respData);
      } else {
        throw new Error("there is no server resp data");
      }
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
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
    rbTAPP.log({"message": "Setting actor detail property with server resp","data":respData});

    // FIXME : check for which property to set
    try {
      if (respData && respData.actor.description.profile) {
        rbTActor.setProperties(respData.actor.description.profile);
        rbTActor.enable();
      } else {
        throw new Error("there is no data for setting actor property");
      }
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
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
    rbTAPP.log({"message": "Handling event with server resp","data":respData});
    try {
      if(respData && respData.actor) {
        rbTStore.set(rbTStore.defaultKeys.actor, respData.actor);
      } else {
        throw "there is no data";
      }
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
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
    rbTAPP.log({"message": "Setting rules with server resp","data":respData});

    try {
      if(respData) {
        rbTRules.setRulesTable(respData);
      } else {
        throw "there is no data";
      }
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
                          "message"   : "setting rules failed",
                          "data"      : respData
                        });
    }
  },


  /**
  * Set App Specific configs
  * Once we get the App deatails, do the following
  * 1). Set App details
  * 2). Set rules table
  * 3). Set system vars
  * 4). Retrieve stored actor data.
  * 5). Make rbt app alive for calls.
  * @param {object} respData Data in response to server.
  *
  */
  setAppDetail : function(respData)
  {
    rbTAPP.log({"message": "Setting app details with server resp","data":respData});
    rbTAPP.setAppDetail(respData);
    rbTRules.setRulesTable(respData.app.rules || {});
    rbTSystemVar.init(respData);
    //rbTActor.retFromCookie();
    rbTAPP.setrbTAlive();
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

/**
* Server request interaction manager for the application.
*/
var rbTServerChannel = {
  
  rbt_url : (document.location.hostname==="localhost" || document.location.hostname==="127.0.1.1") ? 
            "http://localhost:3000/" : "http://rulebot.com/",

  
  /* All server url routes to be mapped here */
  url : {
    "appDetails"  : "app/read",
    "fireEvent"   : "event/create",
    "identify"    : "actor/identify",
    "readActor"   : "actor/read",
    "createActor" : "actor/create",
    "setActor"    : "actor/set",
    "conversion"  : "conversion/create",
    "reportError" : "err/create",
  },

  // Server request queue
  queue : [],
  actorRQ: [],

  /* Default options for server request */
  defaultOptions : {
    "success_callback" : rbTServerResponse.defaultSuccessCallback,
    "error_callback"   : rbTServerResponse.defaultErrorCallback
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
    var qLen = this.queue.length;
    
    if (!qLen) return;

    for (var i = 0 ; i < qLen ; ++i) {
      var r = this.queue[i];
      if (r.event && !rbTActor.isReady()) {
        rbTActor.bufferEvRQ(r);
      } else {
        this.makeServerRequest(r);
      }
    }
    this.queue = [];
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
      k["app_id"] = rbTAPP.getAppID() || "";
      k["actor_id"] = rbTActor.getID() || "";
    } else if (obj.app_read) {
      k["id"] = rbTAPP.getAppID() || "";
    } else if(obj.actor_create) {
      k["app_id"] = rbTAPP.getAppID() || "";
    } else if (obj.set_actor) {
      k["properties"] = {"profile":obj.params ? obj.params:{}};
      k["id"] = rbTActor.getID() || "";
      k["app_id"] = rbTAPP.getAppID() || "";
    } else if(obj.set_actor_prop) {
      k["id"] = rbTActor.getID() || "";
      k["app_id"] = rbTAPP.getAppID() || "";
    } else if(obj.identify) {
      k["uid"] = obj.params;
      k["id"] = rbTActor.getID() || "";
      k["app_id"] = rbTAPP.getAppID() || "";
    } else if(obj.err || obj.conversion) {
      k["app_id"] = rbTAPP.getAppID() || "";
      k["actor_id"] = rbTActor.getID() || "";
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

    function resetEventVar(e)
    {
      rbTAPP.setTransVar(e,{});
    }

    rbTAPP.log("Making rulebot server call for " + obj.url);
    try {
      var reqServerData = this.extendRequestData(obj);
      var callback = this.extendCallbacks(obj.cb);
      if (obj.async && obj.async === "noasync") var asyncSt = false;
      else var asyncSt = true;
      var __this = obj;
      var url = (obj.event) ? rbTServerChannel.url.fireEvent : obj.url;
      __this.requestData = reqServerData;
      jQuery.ajax({
            url: getURL.call(this,obj.type,url),
            type: __this.type || 'GET',
            async: asyncSt,
            contentType : getContentType(obj.type),
            data: reqServerData,
            crossDomain:true,
            cache:true,
            xhrField : { withCredentials:true},
            beforeSend: function() {
                if (__this.event) {
                  rbTStore.set("lastevent", __this.event);
                  rbTAPP.setTransVar(__this.event,__this.params);
                }
            },
            success: function ( respData ) {
                if (typeof respData === "string") respData = JSON.parse(respData);
                rbTAPP.log({"message":"server response success " + __this.url,"data":respData});

                if (__this.event) {
                  rbTStore.deleteKey("lastevent");
                  rbTRules.executeRulesOnEvent(__this.event);
                  if (respData && respData.actor) { 
                    callback.success(respData, __this);
                  }
                  resetEventVar(__this.event);
                } else {
                  respData.url = __this.url;
                  if (__this.set_actor) respData.actor = respData;
                  callback.success(respData, __this);
                }
            },
            error:function(XMLHttpRequest,textStatus, errorThrown){ 
                rbTAPP.log({"message":"server response error " + __this.url,"data_closure":__this,"textStatus":textStatus});
                if (__this.event) {
                  resetEventVar(__this.event); 
                } else if (__this.identify && XMLHttpRequest.responseText.indexOf("is already in use")) {
                  rbTAPP.log("Actor is already in use ::" + __this.requestData.uid);
                  rbTServerChannel.actorDetails();
                }
                callback.error();
            }
      });
    } catch(e) {
      rbTAPP.reportError({ "exception": e.message,
                          "message"   : "SERVER REQUEST FAILED" , 
                          "obj"       : JSON.stringify(__this),
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
    if (!rbTAPP.isAlive()) {
      if (obj.url) {
        obj.async = obj.async || "async";
      }
      this.queueReq(obj); 
      return; 
    } else {
      this.flushReqQueue();
    }
    try {
      rbTServerChannel.makeServerRequest(obj);
    } catch (e) {
      rbTAPP.reportError({"exception" : e.message,
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
  appDetails : function()
  {
    "use strict";
    this.makeServerRequest({"url"      : this.url.appDetails,
                            "app_read" : true,
                            "cb"       : { success: rbTServerResponse.setAppDetail,
                                           error  : rbTServerResponse.defaultError
                                         }
                           });  
  }, 

  /**
  * Request server to app details
  * FIXME : IF THERE IS ANYTHING MISSING
  * @return void
  */
  actorDetails : function()
  {
    this.makeRequest({"url"           : this.url.readActor, 
                      "set_actor_prop": true,
                      "cb"            : { success: rbTServerResponse.setActorProperty,
                                          error  : rbTServerResponse.defaultError
                                        }
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
    this.makeRequest({"url"        : this.url.conversion, 
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
    this.makeRequest({"url":this.url.reportError,
                      "params":params,
                      "type":"POST",
                      "err":true, 
                      "cb":callback
                     });
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


/**
 * Manager for all systems specific variables.
 */
var rbTSystemVar = {

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
      var sysVarInCookie = rbTStore.get(rbTStore.defaultKeys.systemProp);
      
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
    rbTAPP.log({"message":"System variables desired from dashboard","variables":systemVarsDesired});
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
    'browser'         : 'String'
    'browser_version' : 'String'
    'operatingsystem' : 'String'
    'referrer[host]'  : 'String'
    'referrer[path]'  : 'String'
    'referrer[name]'  : 'String'
    'device[type]'    : 'String'
    'device[name]'    : 'String'
    'screen[height]'  : 'Number'
    'screen[width]'   : 'Number'
    'viewport[height]': 'Number'
    'viewport[width]' : 'Number'
    'search[engine]'  : 'String'
    'search[query]'   : 'String'
    'country'         : 'String'
    'language'        : 'String'
    'plugins'         : 'Array'
    'timezone'        : 'String'
    'day_light_saving': 'Boolean'
  */
  getProperty : function(propertyTypes)
  {
    return this.properties;
  },

  setPropertyInCookie : function(property)
  {
    rbTStore.set(rbTStore.defaultKeys.systemProp, JSON.stringify(property));
  },

  setEJProp : function(json)
  {
    this.setProperty("country",json.Country); 
    this.setProperty("city",json.CityName); 
    this.setProperty("timezone",json.LocalTimeZone); 
  },

  setSessionJSProp : function(json)
  {
    rbTAPP.log({"message":"System Properties got through Session JS","data":json});
    this.setProperty("browser",json.browser.browser);
    this.setProperty("browser_version",json.browser.version);
    this.setProperty("operatingsystem",json.browser.os);
    this.setProperty("referrer",json.current_session.referrer_info);
    this.setProperty("search",json.current_session.search);
    this.setProperty("device",json.device.type);
    this.setProperty("screen",json.device.screen);
    this.setProperty("viewport",json.device.viewport);
    this.setProperty("plugins",json.plugins);
    this.setProperty("language",json.locale.lang);
    this.setProperty("day_light_saving",json.time.observes_dst);
  },

};


  


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
      rbTSystemVar.setSessionJSProp(sessionJSProp);
    })();
    rbTSystemVar.setEJProp(rbTUtils.easyJQVars());
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
      device.is_tablet = !!nav.userAgent.match(/(Nexus|iPad|SCH-I800|xoom|kindle)/i);
      device.is_phone = !device.is_tablet && !!nav.userAgent.match(/(iPhone|iPod|blackberry|android 0.5|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i);
      device.is_mobile = device.is_tablet || device.is_phone;
      if (device.is_mobile) {
        var name = nav.userAgent.match(/(iPhone|iPod|blackberry|android 0.5|Android|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii|SCH-I800|xoom|kindle)/ig);
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
      var session = rbTStore.get(cookie);
      if (session == null){
        session = {
          visits: 1,
          start: new Date().getTime(), last_visit: new Date().getTime(),
          url: win.location.href, path: win.location.pathname,
          referrer: doc.referrer, referrer_info: rbTUtils.parseURL(doc.referrer),
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
      rbTStore.set(cookie, session);
      return session;
    },

  };
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


/**
 * Manager for all utilities function for the application.
 */ 
var rbTUtils = {

  eJQ : {},

  /**
  *
  */
  keepEasyJQVars : function(data)
  {
    this.eJQ = data;
    rbTStore.set("easy_jquery",data);
    rbTAPP.initialize(); 
  },

  /**
  *
  */
  easyJQVars : function()
  {
    return this.eJQ;
  },  

  /**
  *
  */
  invokeEasyJquery : function(fname, is_full)
  {
    var full_version = "";
    var easyJQData = rbTStore.get("easy_jquery");
    
    if (!easyJQData) {
      rbTAPP.log("Could not found easyJQData in cache, fetching it now!!!");
      jQuery.getScript("https://api.easyjquery.com/ips/?callback=" + fname + full_version);
    } else{
      rbTAPP.log("Found easyJQData in cache, setting it now!!!");
      this.keepEasyJQVars(easyJQData);
    }
  },


  /** Initialize jquery if needed be
   *  @return void
   */
  includeJQIfNeeded : function() 
  {
    function includeJQ()
    { 
      this.embedScript("https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js",
                        this.bindCB(rbTAPP,rbTAPP.actOnJQInit)
                      );
    }

    if (typeof jQuery != 'undefined') {
        /* jQuery is already loaded... verify minimum version number of 1.6 and reload newer if needed */
        if (/1\.(0|1|2|3|4|5|6)\.(0|1)/.test(jQuery.fn.jquery) 
            || /^1.1/.test(jQuery.fn.jquery) 
            || /^1.2/.test(jQuery.fn.jquery)
            || /^1.3/.test(jQuery.fn.jquery)) {
            includeJQ.call(this);
        } else {
          rbTAPP.actOnJQInit();
        }
    } else {
        includeJQ.call(this);
    }
  },

  /**
  *
  */
  bindCB : function(scope, fn) 
  {
    return function () {
        fn.apply(scope, arguments);
    };
  },
  
  /**
  * 
  */
  type : function(obj)
  {
    return Object.prototype.toString.call(obj).split("]")[0].split(" ")[1];
  },

  /**
  * Check if object is empty. Find it recursively not only on keys but also on values.
  * @param {object} o The object for which emptiness has to be checked.
  * @return {boolean} 
  */
  isEmpty : function(o) 
  {
    if (!o) return true;
    if (this.type(o) === "String" || this.type(o) === "Array") {
      return o.length === 0;
    } else if (this.type(o) === "Number") { return false;}
    for(var i in o) {
      if (this.type(o[i]) === "Object") {
        return this.isEmpty(o[i]);
      } else if (this.type(o[i]) === "String" || this.type(o[i]) === "Array") {
        if (o[i].length) { return false;}
      } else if (this.type(o[i]) === "Number") { return false;}
    }
    return true;
  },

  /**
  * Specially curated to get difference from Rulebot server response.
  * @param {object} first. The object for which difference has to be find out.
  * @param {object} second. The object against which difference has to be find out.
  * @param {object} r. The resultant object in which differential data will be stored.
  * @return {object|undefined} If differential object, else undefined.
  */ 
  diff : function(first,second,r)
  {
    var i = 0;
    for (i in first) {
      if (this.type(second[i]) === "Undefined")  {
        r[i] = first[i];  
      } else if (this.type(first[i]) === "Object" && this.type(second[i]) === "Object") {
        r[i] = diff(first[i], second[i], {});
        if (!result[i]) delete result[i];
      } else if ( this.type(second[i]) === "Array" && first[i] !== second[i][second[i].length-1]) {
        r[i] = first[i];
      }
    }
    return this.isEmpty(r) ? undefined : r;
  },

  /**
  *
  */ 
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
            rbTAPP.log("Script "+ url +"loaded successfully");
            if (callback) {
              if (params)
                callback(params);
              else callback();
            }
        }
      }
  },
};


/****************************[[rbTStore.js]]*************************************/ 


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
 * Data storage manager for the application.
 */
var rbTStore = {  


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
    var value = jStorage.get(this.qualifiedName(key));
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
      jStorage.set(this.qualifiedName(key), 
                                keyValue, 
                                {TTL: this.defaultTTL});
    } catch(e) {
      rbTAPP.reportError({"exception" : e.message,
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
        jStorage.deleteKey(this.qualifiedName(key));                  
    } catch (e) {
      rbTAPP.reportError({"exception" : e.message,
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
      var keys = jStorage.index();
      for (var i = 0; i < keys.length; i++) {   
          var key =  keys[i]
          if ((key.match("^"+this.namePrefix))) {
            jStorage.deleteKey(key);
          }
      }
    } catch(e) {
      // FIXME what to do?
      rbTAPP.reportError({"exception" : e.message,
                          "message"   : "key flush all failed",
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


/**
* Rule bot specific functions to be available for business.
*/






var RBT = function()
{
  var _appId = rbTAPP.getAppID();
  var _accountID = rbTAPP.getAccountID();
  var _status = rbTAPP.isAlive();
  var _state = true;

  /** 
  * Send event to RBT server 
  * 
  * @param {string} event
  * @param {object} [params]
  * @return void
  */
  var _sendEvent = function(event, params)
  {
    "use strict";
    if (!this.isEnabled())
      return;  
    if (!event || typeof(event) != "string" || event === "" ) {
      return;
    } 
    var obj = {"event" : event, 
               "params": params,
               "type"  : "POST",
               "cb"    : { success: rbTServerResponse.handleEvent,
                           error  : rbTServerResponse.defaultError
                         }
              };
    rbTServerChannel.makeRequest(obj);
  };

  /** 
  * Req RBT server to identify actor based on params
  * 
  * @param {object} params Option based on which actor will be identified
  * @return void
  */
  var _identify = function(params)
  {
    "use strict";
    if (!this.isEnabled())
      return;
    var obj = {"url"     : rbTServerChannel.url.identify, 
               "params"  : params,
               "identify": true,
               "type"    : "POST",
               "cb"      : { success: rbTServerResponse.setActorID,
                             error  : rbTServerResponse.defaultError
                           }
              };
    rbTServerChannel.makeRequest(obj);
  };

  /** 
  * Req RBT server to set current actor property
  * 
  * @param {object} params Option based on which actor property will be set
  * @return void
  */
  var _setUser = function(params)
  {
    "use strict";
    var diff = {};
    if (!this.isEnabled()) return;
    diff = rbTActor.propExist(params);
    if (!diff) return;  
    var obj = {"url"      : rbTServerChannel.url.setActor, 
               "params"   : diff,
               "set_actor": true,
               "type"     : "POST",
               "cb"       : { success: rbTServerResponse.setActorProperty,
                              error  : rbTServerResponse.defaultError
                            }
               };
    rbTServerChannel.makeRequest(obj);
  };

  return {
    /** 
    * Tell whether RBT app is alive
    * 
    * @return {boolean} status
    */
    isAlive : function()
    {
      _status = rbTAPP.isAlive();
      return _status;
    },

    /**
    * Enable rulebot api's
    */
    enable : function()
    { 
      _state = true;
    },

    /**
    * Disable rulebot api's
    */
    disable : function()
    {
      _state = false;
    },

    /**
    *
    */
    logger : function(cmd)
    {
      rbTDebug.setLevel(rbTDebug.INFO);
    },

    /**
    * Tell the status of rulebot.
    * @param {boolean} state.
    */
    isEnabled : function()
    {
      return _state;
    },

    /**
    * Set easy jquery callback data coming from global Callback of EasyJquery
    * @param {Object} data. EasyJQuery data
    */
    setSysVars : function(data)
    {
      rbTUtils.keepEasyJQVars(data);
    },


    /** 
    * ALIAS
    * 
    * @param {object} params Option based on which system property will be set
    * @return void
    */
    alias : function()
    {
      if (!this.isEnabled())
        return;
    },

    /**
    * Exposed api to track events
    * @param {String} ev Event to ve tracked
    * @param {Object} prop Property attached to the event.
    * @return {Boolean} status of the api call. 
    */
    track : function(ev, prop)
    {
      if (!ev || !prop) return false;

      if (ev === "set") {
        _setUser.call(this,prop);
      } else {
        _sendEvent.call(this,ev, prop)
      }

      return true;
    },

    /**
    * Exposed api to track user
    * @param {String} id The id on which user needs to be identified.
    * @return {Boolean} status of the api call.
    */
    identify : function(id)
    {
      _identify.call(this,id);
      return true;
    },

  };
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
(function StartRBTApp(appid,accid,ver){
  rbTAPP.log("Initializing RBT APP with AppID = " + appid + " Account ID = " + accid);
  try {
    if (!appid || !accid || appid == "" || accid == "") {
      throw new Error("App-id, Account-ID are not mentioned")
    } else {
      // if everything seems fine, then set app/acc id and initialize rbTAPP.
      rbTDebug.useDefaults();
      rbTAPP.setAppID(appid);
      rbTAPP.setAccountID(accid);
      rbTUtils.includeJQIfNeeded();
    }
  } catch (e) {
    rbTAPP.reportError({"exception": e.message, 
                                     "message"  : "App init/exec failed",
                                     "appid"    : appid || "",
                                     "accid"    : accid || ""
                                    });
  }
})(_rbTK.appID, _rbTK.accountID, _rbTK.version);

