#!/usr/bin/ruby

templLibStr = "trigger_fish.rbT.templateLib = {\n"

templNameStr = "trigger_fish.rbT.templateName = {\n"

tempArgsStr = "trigger_fish.rbT.templateArgs = {\n"

templFinalStr = ""

templPropName = ""



Dir.glob('*.html').each  do|fileName|

	origin= File.basename(fileName,File.extname(fileName))

	destFileName = origin + ".js"
  
  defaultTemplName = ""
  defaultTemplTimer = ""

  tempStrLibClientJs = "trigger_fish.rbT.".concat(origin).concat("HTML").concat("='")

  str = ""
   
  File.open(fileName) do|file|
		
		file.each {|line| str = str.concat(line)}
	end


  strfinalforJsWoNewLine = str.delete("\n")

  regTest = /\{\{[\w.\=\%\:\/\s\#\@\-\']*\}\}/ 

  regforTemplTitle = /\{\{Title[\w.\=\%\:\/\s\#\@\-\'\{\}]*\}\}/

  regforTemplTimer = /\{\{Timer[\w.\=\%\:\/\s\#\@\-\'\{\}]*\}\}/

  regForRuntimeValwithArgs = /\{\{[\w.\=\%\:\/\s\#\@\-\']*\{\{[\w.\=\%\:\/\s\#\@\-\']*\}\}\}\}/
  
  strfinalforJsWoNewLineforArgs = strfinalforJsWoNewLine
  strfinalforJsWoNewLine = strfinalforJsWoNewLine.gsub(regforTemplTitle, "") 
  strfinalforJsWoNewLine = strfinalforJsWoNewLine.gsub(regforTemplTimer, "") 


  regForSingleQuote = /'/


  strfinalforJs= strfinalforJsWoNewLine.gsub(regTest, "") 

  strfinalforJs = strfinalforJs.gsub(regForSingleQuote, "\\\\\'") 

  strfinalforJs = strfinalforJs.concat("'")

  tempStrLibClientJs = tempStrLibClientJs + strfinalforJs

  File.open(destFileName, 'w') do |f2|  

  f2.puts tempStrLibClientJs

  end  

   reg = /\{\{[\w.\=\%\:\/\s\#\@\-\']*\}\}/

   regforMainKey = /\{\{[\w.\=\%\:\/\s\#\@\-\'\{\}]*\}\}/
   regForRuntimeval = /\{\{\%\%[\w.\=\%\:\/\s\#\@\-\']*\%\%\}\}/
   
  

    
   templNameMatchTitle = ""

   templNameMatchTimer = ""

   templNameMatchTitle = strfinalforJsWoNewLineforArgs.scan(regforTemplTitle)
   templNameMatchTimer = strfinalforJsWoNewLineforArgs.scan(regforTemplTimer)



   if templNameMatchTitle[0]

     tempTitleVal = ""
     tempTitleVal = templNameMatchTitle[0].scan(regTest)
     if tempTitleVal[0]
     tempTitleVal[0] = tempTitleVal[0].delete("{{")
      tempTitleVal[0] = tempTitleVal[0].delete("}}")
      tempTitleVal[0] = tempTitleVal[0].delete("=")

      defaultTemplName = tempTitleVal[0]

     end 
  end 


  if templNameMatchTimer[0]
     tempTimerVal = ""
     tempTimerVal = templNameMatchTimer[0].scan(regTest)
     if tempTimerVal[0]
      tempTimerVal[0] = tempTimerVal[0].delete("{{")
      tempTimerVal[0] = tempTimerVal[0].delete("}}")
      tempTimerVal[0] = tempTimerVal[0].delete("=")

      defaultTemplTimer = tempTimerVal[0]
     end 
  end 


strfinalforJsWoNewLineforArgs = strfinalforJsWoNewLineforArgs.gsub(regforTemplTitle, "") 
strfinalforJsWoNewLineforArgs = strfinalforJsWoNewLineforArgs.gsub(regforTemplTimer, "") 

m = strfinalforJsWoNewLineforArgs.scan(regforMainKey)

  
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
    
    defaults = ""
 
    tempDefaultMatch = ""
    tempCheckForRunTimeVal = ""
    
    tempCheckForRunTimeVal = m[index].scan(regForRuntimeval)
    

    if tempCheckForRunTimeVal[0]
      
      tempVal = ""
      tempVal = m[index].scan(regForRuntimeValwithArgs)
      
      if tempVal[0]
         defaults = tempVal[0]
         
         defaults = defaults[3..-3]

         defaults = defaults.delete("%")

       
         defaults = defaults.gsub(regForSingleQuote, "\\\\\'") 

         m[index]= m[index].gsub(regForRuntimeValwithArgs, "") 


      end   


    else  


    tempDefaultMatch = m[index].scan(regTest)

    if tempDefaultMatch[0]
      defaults = tempDefaultMatch[0]
      defaults = defaults[3..-3]
      defaults = defaults.gsub(regForSingleQuote, "\\\\\'") 

    end 

   
   m[index]= m[index].gsub(regTest, "") 

  end



   m[index] = m[index].delete("{{")
   m[index]=  m[index].delete("}}")

    
  if index!= (m.length-1)
       m[index] = "\t \t \t \t \t \t " +"'" + m[index] + "'" + ":"+ "'#{defaults}'"+","+"\n" 
    
    elsif  index == (m.length-1)
      m[index] = "\t \t \t \t \t \t "+ "'" + m[index] + "'" + ":"+"'#{defaults}'"+",\n" 
      m[index+1] = "\t \t \t \t \t \t " + "'" + "rb.t.nr.durationOfDisplay" + "'" + ":"+"'#{defaultTemplTimer}'"+"\n" 


    end  

    end 

   if !m[0]  and tempMatch[0]

    m[0] ="\t \t \t \t \t \t " + "'" + "rb.t.nr.durationOfDisplay" + "'" + ":"+"'#{defaultTemplTimer}'"+"\n"

  end 
   
    m= m.to_s

    m = "{\n" + m + "\t \t \t \t \t },\n"
    
    m = "\t \t  "+ templPropName + ":" + m

   
    
    templNameStr = templNameStr+ "\t \t\t\t" + templPropName + ":" + "'#{defaultTemplName}'" + ",\n"
    

    tempArgsStr = tempArgsStr + m

    templLibStr = templLibStr+ "\t \t  "+ templPropName + ":" + "'#{origin}HTML'" + ",\n"

end	



templLibStr = templLibStr.chop.chop  + "\n \n \t \t \t }; \n\n\n\n "

templNameStr = templNameStr.chop.chop + "\n \t\ \t \t \t }; \n\n\n\n "

tempArgsStr = tempArgsStr.chop.chop + "\n \t\ \t \t \t }; \n "



templFinalStr = templLibStr + templNameStr + tempArgsStr

File.open('../../templates.js' , "w") do|f|
    
 f.puts   templFinalStr 

end





