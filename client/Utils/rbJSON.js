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

//rbJSON = {
var rbJSON = {

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