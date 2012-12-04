#!/usr/bin/ruby

####### Dir.glob('*.html') is the Entry Point #############


$templLibStrSubArrs = Array.new(1)


$templLibStr = "trigger_fish.rbT.templateLib = {\n"

$templNameStr = "trigger_fish.rbT.templateName = {\n"

$tempArgsStr = "trigger_fish.rbT.templateArgs = {\n"

$templFinalStr = ""

$templPropName = ""

$templPosBasedOnFile = ""


#function to make like generic.normal
def rbMakeTemplLibPropStr(tempMatch)
    
  templength =tempMatch.length-1
  tempStr = ""
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

  return tempStr
end

#function to make like topbar.generic.normal
def rbMakeTemplPropStr(tempMatch)

  templength =tempMatch.length-1
  tempLibStr = ""

  tempMatch.length.times  do|index|  
      if index>0 and index==2 and index!=templength
        tempLibStr = "'"+ tempLibStr + tempMatch[index]+"." 

      elsif index == 2 and index==templength  
        tempLibStr = "'" + tempMatch[index] + "'"
                  
      elsif index>2 and index!=templength
        tempLibStr = tempLibStr + tempMatch[index] + "."

      elsif index>2 and index==templength
        tempLibStr = tempLibStr + tempMatch[index] + "'" 
      end
  end 
  
  return tempLibStr
  
end



#function for writing the final string to file
def rbWriteStringToFile(fileName,finalstr)  
    #writing final string to js file
    File.open(fileName, 'w') do |f2|  

      f2.puts finalstr
    end  
end  

#function to extract the Base filename from filename with the extension
def rbExtractBaseNameOfFile(filename)
  origin= File.basename(filename,File.extname(filename))
  return origin
end  

#function to make the js file 
def rbMakeJsFileName(filename)
  origin = rbExtractBaseNameOfFile(filename)
  destFileName = origin + ".js"
  return destFileName
end 


# function for replacing templ args by 1,2,3 ..
def rbReplaceTemplArgsByNumericVals(tempStrLibClientJs)
  counterReplace = 1
  tempStrLibClientJs.gsub(/\{\{[\w.\=\%\:\/\s\#\@\-\']*\}\}/) do |digits|
      
    replacer = "{{"+ "#{counterReplace}"+"}}"

    tempStrLibClientJs=tempStrLibClientJs.sub(/\{\{[^\d][\w.\=\%\:\/\s\#\@\-\'\{\}]*\}\}/,"{{"+"#{counterReplace}"+"}}")
    counterReplace = counterReplace + 1

  end

  return tempStrLibClientJs  
end  

# fuunction to extract templ name
def rbExtractTemplName(templNameMatchTitle)
  tempTitleVal = ""
  tempTitleVal = templNameMatchTitle[0].scan(/\{\{[\w.\=\%\:\/\s\#\@\-\']*\}\}/)
  if tempTitleVal[0]
    tempTitleVal[0] = tempTitleVal[0].delete("{{")
    tempTitleVal[0] = tempTitleVal[0].delete("}}")
    tempTitleVal[0] = tempTitleVal[0].delete("=")
    defaultTemplName = tempTitleVal[0]
  end 
end  


#function for make Key Value pairs for emach templ variables
def rbMakeHashForKeyValuePair(templArgs)
    
    propCounter = 1

     templArgs.length.times do |index| 
            
                defaults = ""
                tempDefaultMatch = ""
                tempCheckForRunTimeVal = ""             
                tempDefaultMatch = templArgs[index].scan(/\{\{[\w.\=\%\:\/\s\#\@\-\']*\}\}/)

                if tempDefaultMatch[0]
                    defaults = tempDefaultMatch[0]
                    defaults = defaults[3..-3]
                    defaults = defaults.gsub(/'/, "\\\\\'") 

                end 

                templArgs[index]= templArgs[index].gsub(/\{\{[\w.\=\%\:\/\s\#\@\-\']*\}\}/, "") 

                

               templArgs[index] = templArgs[index].delete("{{")
               templArgs[index]=  templArgs[index].delete("}}")

                if index!= (templArgs.length-1)
                  templArgs[index] = "\n \t \t \t \t \t \t " + "'" + "#{propCounter}" + "'"+ " : " + "{" +"\n\t \t \t \t \t \t\t\t\t" + 'key :' + "'" + templArgs[index] + "'" + "," + "\n\t \t \t \t \t \t\t\t\t" + 'value :' +"'#{defaults}'" + "\n\t \t \t \t \t \t " + " }," 
                  propCounter = propCounter + 1
                elsif  index == (templArgs.length-1)
                    
                  templArgs[index] = "\n \t \t \t \t \t \t " + "'" + "#{propCounter}"+ "'"+" :" + "{" +"\n\t \t \t \t \t \t\t\t\t" + 'key :' + "'" + templArgs[index] + "'" + "," + "\n\t \t \t \t \t \t\t\t\t" + 'value :' +"'#{defaults}'" + "\n\t \t \t \t \t \t " + " }"
                  propCounter = propCounter + 1
                end  

        end

       templArgs= templArgs.to_s

       templArgs = "{\n" + templArgs + "\n\t \t \t \t \t },\n"
            
       templArgs = "\t \t  "+ $templPropName + ":" + templArgs
        
       return templArgs 
end 

# function to make Templ LIB Hash

def rbMakeTemlLibHash(origin,templLibPropName) 
    found = 0
            arrayLen = 0

            tempHashProp = "'"+$templPosBasedOnFile+"'" 

            $templLibStrSubArrs.length.times do |i|
              
              if $templLibStrSubArrs[i] == nil
                $templLibStrSubArrs[i]=$templPosBasedOnFile
                $templLibStrSubArrs[i] = "'"+ $templLibStrSubArrs[i]+"':{ \n"
                found = 1
                break

              end

              match = ""

              match = $templLibStrSubArrs[i].match(/\'[\w]*\'/)
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
              $templLibStrSubArrs.push($templPosBasedOnFile) 
              arrayLen =$templLibStrSubArrs.length
              $templLibStrSubArrs[arrayLen-1] = "'"+ $templLibStrSubArrs[arrayLen-1]+"':{ \n"
            end  
                

    ###################################################################
             $templLibStrSubArrs.length.times do |i|
                      match = ""
                      match = $templLibStrSubArrs[i].match(/\'[\w]*\'/)
                     # puts match 
                      #puts tempHashProp
                      if match
                           if match[0] == tempHashProp
                             $templLibStrSubArrs[i] = $templLibStrSubArrs[i] + "\t\t\t\t"+ templLibPropName + ":" + "'#{origin}HTML'" + ",\n"
                             break
                           end
                      end  
              end  

    ###################################################################
end  


#MAIN Evtry point of this Script

Dir.glob('*.html').each  do|fileName|

      # to make the js file name from HTML file 
      destFileName = rbMakeJsFileName(fileName)
      
      defaultTemplName = ""
      defaultTemplTimer = ""


      origin = rbExtractBaseNameOfFile(fileName)
      
      # to make Templ global Variable
      tempStrLibClientJs = "trigger_fish.rbT.".concat(origin).concat("HTML").concat("='")

      str = ""
      
      # to collect all the lines from HTMl in a string 
      File.open(fileName) do|file|
        
        file.each {|line| str = str.concat(line)}
      end

      # deleting the the new lines 
      strfinalforJsWoNewLine = str.delete("\n")

      strfinalforJsWoNewLineforArgs = strfinalforJsWoNewLine
      
      strfinalforJsWoNewLine = strfinalforJsWoNewLine.gsub(/\{\{Title[\w.\=\%\:\/\s\#\@\-\'\{\}]*\}\}/, "") 
      
      strfinalforJsWoNewLine = strfinalforJsWoNewLine.gsub(/\{\{Timer[\w.\=\%\:\/\s\#\@\-\'\{\}]*\}\}/, "") 



      strfinalforJs= strfinalforJsWoNewLine.gsub(/\{\{[\w.\=\%\:\/\s\#\@\-\']*\}\}/, "") 

      strfinalforJs = strfinalforJsWoNewLine.gsub(/'/, "\\\\\'") 
      
      # putting string @end of the string for JS file
      strfinalforJs = strfinalforJs.concat("'")

      tempStrLibClientJs = tempStrLibClientJs + strfinalforJs


      #loop for making templs fill in args  to 1,2,3 ....
      tempStrLibClientJs = rbReplaceTemplArgsByNumericVals(tempStrLibClientJs)
    
      # calling function to write the final string from HTML file to Js file
      rbWriteStringToFile(destFileName,tempStrLibClientJs)


################ code for config file #############################

       templNameMatchTitle = ""

       templNameMatchTimer = ""

       templNameMatchTitle = strfinalforJsWoNewLineforArgs.scan(/\{\{Title[\w.\=\%\:\/\s\#\@\-\'\{\}]*\}\}/)
       
       ### ++++++++ For TEMPL NAME
       #extract the Templ Name/Title from String
       if templNameMatchTitle[0]
         
         defaultTemplName =rbExtractTemplName(templNameMatchTitle)


       end 
      ### ---------- For TEMPL NAME

        # find for [templ][topbar][generic][normal] from HTML file
        tempMatch = origin.scan(/[A-Z][a-z]*/)
        # To extract the position like Topbar , Bottombar , Modal

        $templPosBasedOnFile = tempMatch[1]
        $templPosBasedOnFile=$templPosBasedOnFile.downcase

        # to extract generic.fblike' format
        tempLibStr = rbMakeTemplPropStr(tempMatch)
        
        # to extract 'bottombar.generic.fblike'
        tempStr = rbMakeTemplLibPropStr(tempMatch)

        
        #'generic.fblike'
        templLibPropName = tempLibStr.downcase 

        #like 'bottombar.generic.fblike' format
        $templPropName = tempStr.downcase 

        $templNameStr = $templNameStr+ "\t \t\t\t" + $templPropName + ":" + "'#{defaultTemplName}'" + ",\n"
        
        # make Key Value Pair
        # +++++++++++++++ FOR KEY VALUE PAIR
        # extracting the matchs {{}} , from the String , put in the array 
        strfinalforJsWoNewLineforArgs = strfinalforJsWoNewLineforArgs.gsub(/\{\{Title[\w.\=\%\:\/\s\#\@\-\'\{\}]*\}\}/, "") 
        templArgs = strfinalforJsWoNewLineforArgs.scan(/\{\{[\w.\=\%\:\/\s\#\@\-\'\{\}]*\}\}/)


        tempStr = ""
        tempLibStr = ""
        templArgs = rbMakeHashForKeyValuePair(templArgs)
        
        $tempArgsStr = $tempArgsStr + templArgs

         # ---------- FOR KEY VALUE PAIR


        # To MAKE TEMPL LIB HASH

        rbMakeTemlLibHash(origin,templLibPropName) 
        
end  

###### ++++++++TEMPL LIB  Final String ############

$templLibStrSubArrs.length.times do |i|
  $templLibStrSubArrs[i] = $templLibStrSubArrs[i].chop.chop  + "\n \n \t \t \t },\n"
end 

$templLibStrSubArrs.length.times do |i|
  $templLibStr = $templLibStr + "\t\t"+$templLibStrSubArrs[i]
end 

$templLibStr = $templLibStr.chop.chop + "\n \n }; \n\n\n\n "

###### --------- TEMPL LIB  Final String ############

###### TEMPL Name  Final String ############
$templNameStr = $templNameStr.chop.chop + "\n \t\ \t \t \t }; \n\n\n\n "

###### TEMPL Args  Final String ############

$tempArgsStr = $tempArgsStr.chop.chop + "\n \t\ \t \t \t }; \n "

######  Final String to Make Config File ############

$templFinalStr = $templLibStr + $templNameStr + $tempArgsStr

File.open('../../templates.js' , "w") do|f|
    
 f.puts   $templFinalStr 

end
