system("cd Utils;ruby combine.rb")

files = ["./Utils/rbt.js",
		 "./action_script/templSingle.js"
		]

OUTPUT_FILE = "/home/sammy/actwitty/ganga/public/rbt_merge.js"

rbt_file = File.new(OUTPUT_FILE,"w")

current_time_stamp = Time.new.to_s

file_str = "\n\n\n/***********************[["+ current_time_stamp +"]]*********************************/ \n\n\n" 

files.each { |x| 
	file_str = file_str + 
	           "\n\n\n/****************************[["+ x +"]]*************************************/ \n\n\n" + 
	           File.read(x)
}

rbt_file.write(file_str)


rbt_file.close