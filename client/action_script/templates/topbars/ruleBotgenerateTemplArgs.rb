#!/usr/bin/ruby

templLibStrSubArrs = Array.new(1)

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
          
          # TEMPL LIB HASH
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
        
        found = 0
        arrayLen = 0

        tempHashProp = "'"+templPosBasedOnFile+"'" 

        templLibStrSubArrs.length.times do |i|
          
          if templLibStrSubArrs[i] == nil
            templLibStrSubArrs[i]=templPosBasedOnFile
            templLibStrSubArrs[i] = "'"+ templLibStrSubArrs[i]+"':{ \n"
            found = 1
            break

          end

          match = ""

          match = templLibStrSubArrs[i].match(/\'[\w]*\'/)
         # puts match 
          #puts tempHashProp
          if match
               if match[0] == tempHashProp
                 found = 1
                 break
              end
          end  
        end  
        

        if found == 0
          templLibStrSubArrs.push(templPosBasedOnFile) 
          arrayLen =templLibStrSubArrs.length
          templLibStrSubArrs[arrayLen-1] = "'"+ templLibStrSubArrs[arrayLen-1]+"':{ \n"
        end  
            
        tempArgsStr = tempArgsStr + m

###################################################################
         templLibStrSubArrs.length.times do |i|
                  match = ""
                  match = templLibStrSubArrs[i].match(/\'[\w]*\'/)
                 # puts match 
                  #puts tempHashProp
                  if match
                       if match[0] == tempHashProp
                         templLibStrSubArrs[i] = templLibStrSubArrs[i] + "\t\t\t\t"+ templLibPropName + ":" + "'#{origin}HTML'" + ",\n"
                         break
                       end
                  end  
          end  

###################################################################

end  


 templLibStrSubArrs.length.times do |i|
   templLibStrSubArrs[i] = templLibStrSubArrs[i].chop.chop  + "\n \n \t \t \t },\n"
 end 
 
 templen=templLibStrSubArrs.length
 templLibStrSubArrs[templen-1] = templLibStrSubArrs[templen-1]

 templLibStrSubArrs.length.times do |i|
   templLibStr = templLibStr + "\t\t"+templLibStrSubArrs[i]
 end 

templLibStr = templLibStr.chop.chop + "\n \n }; \n\n\n\n "

 templNameStr = templNameStr.chop.chop + "\n \t\ \t \t \t }; \n\n\n\n "

tempArgsStr = tempArgsStr.chop.chop + "\n \t\ \t \t \t }; \n "

templFinalStr = templLibStr + templNameStr + tempArgsStr

File.open('../../templates.js' , "w") do|f|
    
 f.puts   templFinalStr 

end




