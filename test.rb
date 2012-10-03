color = "345m"
folder = "folder"
kaller =  "\033[0m[\033[41mModels\033[0m]\033[0m[\033[34maccount.rb\033[0m]\033[0m[\033[34mLine:102\033[0m]\033[0m[\033[34m"
kaller.gsub!(/\\033\[d+m/,"")
puts kaller

require 'colorize'

a = "hello".blue
b = "dumb".red + " " + a
str = "I am now blue.".green +  "I am now red.".red + "I am a super coder".yellow + "#{b.green}"
puts str
