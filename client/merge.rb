system("cd Utils;ruby combine.rb")

files = ["./Utils/rbt.js",
		 "./action_script/templSingleForClient.js"
		]

OUTPUT_FILE = "/home/sammy/actwitty/ganga/public/rbt_merge.js"

rbt_file = File.new(OUTPUT_FILE,"w")

current_time_stamp = Time.new.to_s



easy_jq_str = "function EasyjQuery_Cache_IP(fname,json) { rb.setSysVars(json); }\n"

scope_start_str = "(function() {\n"
scope_end_str = "\n})();"



file_str = "\n\n\n/***********************[["+ current_time_stamp +"]]*********************************/ \n\n\n" 


file_str = file_str + easy_jq_str +scope_start_str


files.each { |x| 
	file_str = file_str + 
	           "\n\n\n/****************************[["+ x +"]]*************************************/ \n\n\n" + 
	           File.read(x)
}

file_str = file_str + scope_end_str

rbt_file.write(file_str)

rbt_file.close