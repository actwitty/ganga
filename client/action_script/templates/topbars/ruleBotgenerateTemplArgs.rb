#!/usr/bin/ruby

#All TemplType // Will be removed in next version to make it scalable 
templLibStrTopbar = "'topbar' :{ \n "
templLibStrBottombar = "'bottombar' :{ \n "
templLibStrSupport = "'support' :{ \n "
templLibStrModal = "'modal' :{ \n "
templLibStrFeedback = "'feedback' :{ \n "

typetopbar = 'topbar'
typebottombar = 'bottombar' 
typemodal = 'modal'
typesupport = 'support'
typefeedback = 'feedback' 




templLibStr = "trigger_fish.rbT.templateLib = {\n"

templNameStr = "trigger_fish.rbT.templateName = {\n"

tempArgsStr = "trigger_fish.rbT.templateArgs = {\n"

templFinalStr = ""

templPropName = ""

templPosBasedOnFile = ""



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

  regforMainKey = /\{\{[\w.\=\%\:\/\s\#\@\-\'\{\}]*\}\}/
  regforMainKeySubJs = /\{\{[^\d][\w.\=\%\:\/\s\#\@\-\'\{\}]*\}\}/


  
  strfinalforJsWoNewLineforArgs = strfinalforJsWoNewLine
  strfinalforJsWoNewLine = strfinalforJsWoNewLine.gsub(regforTemplTitle, "") 
  strfinalforJsWoNewLine = strfinalforJsWoNewLine.gsub(regforTemplTimer, "") 


  regForSingleQuote = /'/


  strfinalforJs= strfinalforJsWoNewLine.gsub(regTest, "") 

  strfinalforJs = strfinalforJs.gsub(regForSingleQuote, "\\\\\'") 

  strfinalforJs = strfinalforJs.concat("'")

  tempStrLibClientJs = tempStrLibClientJs + strfinalforJs

  counterReplace = 1

  tempStrLibClientJs.gsub(regforMainKey) do |digits|
  
   replacer = "{{"+ "#{counterReplace}"+"}}"

   tempStrLibClientJs=tempStrLibClientJs.sub(regforMainKeySubJs,"{{"+"#{counterReplace}"+"}}")

   counterReplace = counterReplace + 1

  end  


  File.open(destFileName, 'w') do |f2|  

  f2.puts tempStrLibClientJs

  end  

   reg = /\{\{[\w.\=\%\:\/\s\#\@\-\']*\}\}/

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
   tempLibStr = ""



   tempMatch = origin.scan(reg2)

   tempOrg = origin.match(reg2)

   length = tempMatch.length

   templength = length-1
   
   templPosBasedOnFile = tempMatch[1]

   templPosBasedOnFile=templPosBasedOnFile.downcase

  
   tempMatch.length.times  do|index|  
     
   #for templ LIb Hash


    if index>0 and index==2 and index!=templength
        tempLibStr = "'"+ tempLibStr + tempMatch[index]+"." 

    elsif index == 2 and index==templength  
      tempLibStr = "'" + tempMatch[index] + "'"
    
    elsif index>2 and index!=templength
      tempLibStr = tempLibStr + tempMatch[index] + "."

    elsif index>2 and index==templength
      tempLibStr = tempLibStr + tempMatch[index] + "'" 
    end

  
  # for templ Args and TemplName Prop


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

  templLibPropName = tempLibStr.downcase 


  propCounter = 1


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
       m[index] = "\n \t \t \t \t \t \t " + "'" + "#{propCounter}" + "'"+ " : " + "{" +"\n\t \t \t \t \t \t\t\t\t" + 'key :' + "'" + m[index] + "'" + "," + "\n\t \t \t \t \t \t\t\t\t" + 'value :' +"'#{defaults}'" + "\n\t \t \t \t \t \t " + " }," 
    propCounter = propCounter + 1
    elsif  index == (m.length-1)
      
      m[index] = "\n \t \t \t \t \t \t " + "'" + "#{propCounter}"+ "'"+" :" + "{" +"\n\t \t \t \t \t \t\t\t\t" + 'key :' + "'" + m[index] + "'" + "," + "\n\t \t \t \t \t \t\t\t\t" + 'value :' +"'#{defaults}'" + "\n\t \t \t \t \t \t " + " }"
      propCounter = propCounter + 1




    end  

    end 

  if !m[0]  and tempMatch[0]

   

  end 
   
    m= m.to_s

    m = "{\n" + m + "\n\t \t \t \t \t },\n"
    
    m = "\t \t  "+ templPropName + ":" + m

   
    
    templNameStr = templNameStr+ "\t \t\t\t" + templPropName + ":" + "'#{defaultTemplName}'" + ",\n"
    

    tempArgsStr = tempArgsStr + m


 

  #making templLib hash ...will be modiled in next version to make it scalable
    if templPosBasedOnFile == typetopbar
     templLibStrTopbar = templLibStrTopbar + "\t\t\t\t"+ templLibPropName + ":" + "'#{origin}HTML'" + ",\n"
 
    elsif templPosBasedOnFile == typebottombar

      templLibStrBottombar = templLibStrBottombar + "\t\t\t\t"+ templLibPropName + ":" + "'#{origin}HTML'" + ",\n"


    elsif templPosBasedOnFile == typemodal

      templLibStrModal= templLibStrModal + "\t\t\t\t"+ templLibPropName + ":" + "'#{origin}HTML'" + ",\n"

    elsif templPosBasedOnFile == typesupport

      templLibStrSupport= templLibStrSupport + "\t\t\t\t"+ templLibPropName + ":" + "'#{origin}HTML'" + ",\n"


    elsif templPosBasedOnFile == typefeedback

       templLibStrFeedback = templLibStrFeedback + "\t\t\t\t"+ templLibPropName + ":" + "'#{origin}HTML'" + ",\n"
      
      
     end  

    

    
   # templLibStr = templLibStr+ "\t \t  "+ templPropName + ":" + "'#{origin}HTML'" + ",\n"
 end  



#this part will be modified in next version to make it scalable
 
 templLibStrTopbar = templLibStrTopbar.chop.chop  + "\n \n \t \t \t }, \n\n\n\n "
 
 templLibStrBottombar = templLibStrBottombar.chop.chop  + "\n \n \t \t \t }, \n\n\n\n "

 templLibStrModal = templLibStrModal.chop.chop  + "\n \n \t \t \t }, \n\n\n\n "

 templLibStrSupport = templLibStrSupport.chop.chop  + "\n \n \t \t \t }, \n\n\n\n "

 templLibStrFeedback = templLibStrFeedback.chop.chop  + "\n \n \t \t \t },\n"

 templLibStr= templLibStr+templLibStrTopbar+templLibStrBottombar+templLibStrModal+templLibStrSupport+templLibStrFeedback



templLibStr = templLibStr.chop.chop + "\n \n \t \t \t }; \n\n\n\n "

templNameStr = templNameStr.chop.chop + "\n \t\ \t \t \t }; \n\n\n\n "

tempArgsStr = tempArgsStr.chop.chop + "\n \t\ \t \t \t }; \n "



templFinalStr = templLibStr + templNameStr + tempArgsStr

File.open('../../templates.js' , "w") do|f|
    
 f.puts   templFinalStr 

end




