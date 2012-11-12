#!/usr/bin/ruby

files = [ "include.js",
           "templates.js",
	      "./templates/topbars/rbTemplBottombarGenericFblike.js", 
	      "./templates/topbars/rbTemplBottombarGenericTwitterfollow.js",
	      "./templates/topbars/rbTemplBottombarGenericNormal.js",
	      "./templates/topbars/rbTemplBottombarGenericTwittershare.js",
	      "./templates/topbars/rbTemplTopbarGenericFblike.js", 
          "./templates/topbars/rbTemplTopbarGenericTwitterfollow.js",
          "./templates/topbars/rbTemplTopbarGenericNormal.js",
          "./templates/topbars/rbTemplTopbarGenericTwittershare.js",
          "./templates/topbars/rbTemplChatGenericNormal.js",
          "./templates/topbars/rbTemplModalGenericNormal.js",
          "./templates/topbars/rbTemplUservoiceGenericNormal.js",

          "helpers.js",
          "externals.js",
          "event_handler.js",
          "main.js",
          "interfaces.js"





		]

OUTPUT_FILE = "templSingle.js"

#OUTPUT_FILE = "trigger_fish.rbT.js"

rbt_file = File.new(OUTPUT_FILE,"w")

file_str = ""

files.each { |x| 
	file_str = file_str + 
	           "\n\n\n/****************************[["+ x +"]]*************************************/ \n\n\n" + 
	           File.read(x)
}

rbt_file.write(file_str)


rbt_file.close