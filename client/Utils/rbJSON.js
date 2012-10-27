var rbJSON = {

  "rb" : {},
	"header" : "rb",
	"state" : [],

	getType : function (a)
  {
    return Object.prototype.toString.call(a).split("]")[0].split(" ")[1]
  },


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

  function addValueToObj(key, value, type)
	{
  	var extKey = getCurrentPath() + (type === "Array") ? "["+key+"]" : "." + key;;
    var type = typeof(value);
    var str = extKey+'={type:"'+type+'",value:"'+value+'"};';
    eval(str);
  },

	extend : function(obj)
	{	
		for (var key in obj)
    {
      if (obj.hasOwnProperty(key)) {
          var type = rbJSON.getType(obj[key]); 
          if (type === "Object" || type === "Array" ) {
            rbJSON.state.push({"type":type,"key":key});
            rbJSON.createNewObj(type);
            rbJSON.mirror(obj[key]);
          } else {
            rbJSON.addValueToObj(key,obj[key], type);
          }
      }
    }
    rbJSON.state.pop();
    return;
	},

  typify : function(obj)
  {
  	rbJSON.rb = {};
  	rbJSON.state = [];
  	rbJSON.extend(obj);
  	return rbJSON.rb;
  }

};