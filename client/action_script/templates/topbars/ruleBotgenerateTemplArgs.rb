#!/usr/bin/ruby

templLibStr = "rbT.templateLib = {\n"
tempArgsStr = "rbT.templateArgs = {\n"
templFinalStr = ""
templPropName = ""



Dir.glob('*.html').each  do|fileName|

	origin= File.basename(fileName,File.extname(fileName))

	destFileName = origin + ".js"


  tempStrLibClientJs = "rbT.".concat(origin).concat("HTML").concat("='")

  str = ""
   
  File.open(fileName) do|file|
		
		file.each {|line| str = str.concat(line)}
	end


  strfinalforJs = str.delete("\n")

  regTest = /\=\%\%[\w.\:\/\s\#\@\-\']*\%\%/ 

  regForSingleQuote = /'/

  strfinalforJs= strfinalforJs.gsub(regTest, "") 

  strfinalforJs = strfinalforJs.gsub(regForSingleQuote, "\\\\\'") 

  strfinalforJs = strfinalforJs.concat("'")

  tempStrLibClientJs = tempStrLibClientJs + strfinalforJs

  File.open(destFileName, 'w') do |f2|  

  f2.puts tempStrLibClientJs

  end  

   reg = /\{\{[\w.\=\%\:\/\s\#\@\-\']*\}\}/
   
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
    
    regVar = /[a-z A-Z]*/
    
    defaults = ""
    
    rtest = m[index].scan(regTest)
    

    m[index]= m[index].gsub(regTest, "") 
    
    if rtest[0] 
      
      defaults =  rtest[0].delete("%")
      defaults =  defaults.delete("=")
      defaults = defaults.gsub(regForSingleQuote, "\\\\\'") 


    end


    varString = m[index].scan(regVar)
    


   if index!= (m.length-1)
       m[index] = "\t \t \t \t \t \t " +  '{'+'key:' +"'" + m[index] + "'" + ','+ 'value:'+"'#{defaults}'}"+","+"\n" 
    
    elsif  index == (m.length-1)
      m[index] = "\t \t \t \t \t \t " + '{' + 'key:'+ "'" + m[index] + "'" + ','+ 'value:'+"'#{defaults}'}"+ ","+"\n" 

    end  

    end 
    m= m.to_s

    m = "[\n" + m + "\t \t \t \t \t ],\n"
    
    m = "\t \t  "+ templPropName + ":" + m

    tempArgsStr = tempArgsStr + m

    templLibStr = templLibStr+ "\t \t  "+ templPropName + ":" + "'#{origin}HTML'" + ",\n"

end	

templLibStr = templLibStr.chop.chop  + "\n \n \t \t \t }; \n\n\n\n "

tempArgsStr = tempArgsStr.chop.chop + "\n \t\ \t \t \t }; \n "


templFinalStr = templLibStr + tempArgsStr

File.open('../../templates.js' , "w") do|f|
    
 f.puts   templFinalStr 

end





