files = [ "include.js",
           "templatesArgsForDashBoard.js",
	      "./templates/js/rbTemplBottombarGenericFblike.js", 
	      "./templates/js/rbTemplBottombarGenericTwitterfollow.js",
	      "./templates/js/rbTemplBottombarGenericNormal.js",
	      "./templates/js/rbTemplBottombarGenericTwittershare.js",
	      "./templates/js/rbTemplTopbarGenericFblike.js", 
          "./templates/js/rbTemplTopbarGenericTwitterfollow.js",
          "./templates/js/rbTemplTopbarGenericNormal.js",
          "./templates/js/rbTemplTopbarGenericTwittershare.js",
          "./templates/js/rbTemplSupportOlarkNormal.js",
          "./templates/js/rbTemplFeedbackUservoiceNormal.js",
          "./templates/js/rbTemplModalGenericNormal.js",

          "helpers.js",
          "externals.js",
          "event_handler.js",
          "main.js",
          "interfaces.js"





		]

OUTPUT_FILE = "templSingleForDashBoard.js"

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