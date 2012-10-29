var rbJSON = {

  "rb" : {},
  "header" : "rbJSON.rb",
  "state" : [],

  /**
  * Get Type of the object
  * @params {object} a Object.
  * @return {string} data type of the object.
  */
  getType : function (a)
  {
    return Object.prototype.toString.call(a).split("]")[0].split(" ")[1]
  },


  /**
  * Get the current path of the json typify parse.
  *
  * @return {string} Path of object keys.
  */
  currentPath : function()
  {
    var rState = rbJSON.state;
    var st = rbJSON.header;
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


  /**
  * Create new JSON typify object
  * @param {string} type Type of an object to be created.
  */
  createNewObj : function(type)
  {
    var st = rbJSON.currentPath();
    if (!eval(st)) {
      if (type === "Array")
          eval(st+"=[];");
      else 
          eval(st+"={};");
    }
  },

  /**
  * Add typified key,value pair to an object.
  * @param {string} key Object key.
  * @param {object} value Object value.
  * @param {string} type Object type.
  */
  addValueToObj : function(key, value, type)
  {
    if (type === "Array" || type === "Object")
      var extKey = rbJSON.currentPath() + ((type === "Array") ? "["+key+"]" : "." + key);
    else
      var extKey = rbJSON.currentPath() + "." + key;

    var type = typeof(value);
    var str = extKey+'={type:"'+type+'",value:"'+value+'"};';
    eval(str);
  },

  /**
  * Extend JSON object to get it typified with {type:"data-type",value:"data-value"}
  * @param {object} obj Object to be typified.
  *
  */
  extend : function(obj)
  { 
    for (var key in obj)
    {
      if (obj.hasOwnProperty(key)) {
          var type = rbJSON.getType(obj[key]); 
          if (type === "Object" || type === "Array" ) {
            rbJSON.state.push({"type":type,"key":key});
            rbJSON.createNewObj(type);
            rbJSON.extend(obj[key]);
          } else {
            var pType = (rbJSON.state.length) ? rbJSON.state[rbJSON.state.length-1].type : "";
            rbJSON.addValueToObj(key,obj[key], pType);
          }
      }
    }
    rbJSON.state.pop();
    return;
  },


  /**
  * Main function to start typifying object. 
  * @param {object} obj  Object to be typified.
  * 
  * @return {object} Typified Object.
  */
  typify : function(obj)
  {
    rbJSON.rb = {};
    rbJSON.state = [];
    rbJSON.extend(obj);
    return rbJSON.rb;
  }

};