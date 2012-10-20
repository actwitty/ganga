#!/usr/bin/ruby

templLibStr = "rbT.templateLib = {\n"
tempArgsStr = "rbT.templateArgs = {\n"
templFinalStr = ""
templPropName = ""

Dir.glob('*.html').each  do|fileName|

	origin= File.basename(fileName,File.extname(fileName))

	destFileName = origin + ".js"

    str = "rbT.".concat(origin).concat("HTML").concat("='")
   
  File.open(fileName) do|file|
		
		file.each {|line| str = str.concat(line)}
	end

	str = str.concat("'")

  str = str.delete("\n")

  File.open(destFileName, 'w') do |f2|  

  f2.puts str

  end  

   reg = /\{\{[\w.]*\}\}/
   
   m = str.scan(reg)
  
   reg2 = /[A-Z][a-z]*/

   tempStr = ""

   tempMatch = origin.scan(reg2)
   
   length = tempMatch.length

   templength = length-1

   tempMatch.length.times  do|index|  
     
    if index>0 and index==1 and index!=templength
        tempStr = "'"+ tempStr + tempMatch[index]+"." 

    elsif index == 1 and index==templength  
      tempStr = "'" + tempMatch[index] + "'"
    
    elsif index>1 and index!=templength
      tempStr = tempStr + tempMatch[index] + "."

    elsif index>1 and index==templength
      tempStr = tempStr + tempMatch[index] + "'" 
    end

  end  

  templPropName = tempStr.downcase 

    m.length.times do |index|  
    m[index] = m[index].delete("{{")
    m[index]=  m[index].delete("}}")
    
    if index!= (m.length-1)
       m[index] = "\t \t \t \t \t \t " + "'" + m[index] + "'" + ","+ "\n" 
    
    elsif  index == (m.length-1)
      m[index] = "\t \t \t \t \t \t " + "'" + m[index] + "'" + "\n" 

    end  

    end 
    m= m.to_s

    m = "[\n" + m + "\t \t \t \t \t ],\n"
    
    m = "\t \t  "+ templPropName + ":" + m
    tempArgsStr = tempArgsStr + m

    templLibStr = templLibStr+ "\t \t  "+ templPropName + ":" + "rbT."+ origin + "HTML"+",\n"

end	

templLibStr = templLibStr.chop.chop  + "\n \n \t \t \t }; \n\n\n\n "

tempArgsStr = tempArgsStr.chop.chop + "\n \t\ \t \t \t }; \n "


templFinalStr = templLibStr + tempArgsStr

File.open('../../templates.js' , "w") do|f|
    
 f.puts   templFinalStr 

end





