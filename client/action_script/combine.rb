#!/usr/bin/ruby
system("cd templates/html;./ruleBotgenerateTemplArgs.rb;")
system("ruby combineForClientJs.rb")
system("ruby combineForConfigFile.rb")


