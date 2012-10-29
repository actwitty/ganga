files = ["rbTAPP.js", 
	     "rbTClientDebugger.js",
	     #"rbTIncludeScript.js",
	     "rbTRules.js",
	     "rbTServerResponse.js",
	     "rbTServerReq.js",
	     "rbTSystemVar.js",
	     "rbTUtils.js",
	     "rbTCookieHandler.js",
	     "rbTBusiness.js",
	     "rbJSON.js",
	     "rbTInitApp.js"
		]

#OUTPUT_FILE = "/home/sammy/actwitty/ganga/public/rbt.js"

OUTPUT_FILE = "rbt.js"

rbt_file = File.new(OUTPUT_FILE,"w")

file_str = ""

files.each { |x| 
	file_str = file_str + 
	           "\n\n\n/****************************[["+ x +"]]*************************************/ \n\n\n" + 
	           File.read(x)
}

rbt_file.write(file_str)


rbt_file.close