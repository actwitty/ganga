## Enables Rich logging in each file - Alok

class ActiveSupport::BufferedLogger
  def formatter=(formatter)
    @log.formatter = formatter
  end
end

class Formatter
  SEVERITY_TO_TAG_MAP     = {'DEBUG'=>'meh', 'INFO'=>'fyi', 'WARN'=>'hmm', 'ERROR'=>'wtf', 'FATAL'=>'omg', 'UNKNOWN'=>'???'}
  SEVERITY_TO_COLOR_MAP   = {'DEBUG'=>'36', 'INFO'=>'32', 'WARN'=>'33', 'ERROR'=>'31', 'FATAL'=>'31', 'UNKNOWN'=>'37'}

  USE_HUMOROUS_SEVERITIES = false
  
  METHOD = true
  LINE = true
  FILE = true
  PATH_BREAKUP = true

  HIGHLIGHT_FOLDER = true
  HIGHLIGHT_INTERNAL_LOGS = true

  COLOR = { 
            :default => "34m", #Blue Foreground
            :models => "41m" , #Red Backgroud
            :controllers => "42m" , #Green Background
            :lib => "43m", #Brown Background
            :internal => "45m" #Magenta Background
          }  


  ONLY_APP_LOGS  = false 

  SEVERITY_VALUE = {"INFO" => 1, "DEBUG" => 2, "WARN" => 3, "ERROR" => 4, "FATAL" => 5, "UNKNOWN" => 6}
  SEVERITY_LEVEL = "INFO"

  #TODO => Folder level filter
  FOLDER_VALUE = {"app" => 1, "lib" => 2, "models" => 3, "controllers" => 4, "internal" => 5}
  FOLDER_LEVEL = "internal"


  def beautify_filename(str)
    filename = ""
    array = str.split(':')
    
    filename += "\033[0m[\033[#{COLOR[:default]}#{array[0]}\033[0m] " if FILE
    filename += "\033[0m[\033[#{COLOR[:default]}Line:#{array[1]}\033[0m] " if LINE
    filename += "\033[0m[\033[#{COLOR[:default]}#{array[2].split(' ')[1].capitalize.gsub!(/\'|\`/,'')}\033[0m] " if METHOD
    
    filename
  end

  def beautify_caller
    kaller = ""
    regex = /(\/ruby\/|activerecord|active_support|__DELEGATION__|\/\.rvm|\/vendor\/|script\/rails|\/config\/initializers)/i
    c = caller.detect{|line| line !~ regex}

    unless c.blank?
      c.gsub! Rails.root.to_s, '' 
      
      array = c.split('/')
      array.each do |folder|
        #skip app folder
        next if folder == "app"
        
        if folder =~ /:/
          kaller += beautify_filename(folder)      
        else
          if HIGHLIGHT_FOLDER and !COLOR[folder.to_sym].blank?
            color = COLOR[folder.to_sym]
          else
            color = COLOR[:default]
          end
          kaller += "\033[0m[\033[#{color}#{folder.capitalize}\033[0m] " if !folder.blank? and PATH_BREAKUP
        end

      end
      # file is in rails root
      kaller = beautify_filename(c) if array.blank?  
    end
    kaller
  end


  def call(severity, time, progname, msg)
    
    return "" if SEVERITY_VALUE[severity] < SEVERITY_VALUE[SEVERITY_LEVEL]

    if USE_HUMOROUS_SEVERITIES
      formatted_severity = sprintf("%-3s","#{SEVERITY_TO_TAG_MAP[severity]}")
    else
      formatted_severity = sprintf("%-5s","#{severity}")
    end

    formatted_time = time.strftime("%Y-%m-%d %H:%M:%S.") << time.usec.to_s[0..2].rjust(3)
    color = SEVERITY_TO_COLOR_MAP[severity]

    kaller = beautify_caller
    
    if kaller.blank?
      return ""  if ONLY_APP_LOGS
      kaller = "\033[0m[\033[#{COLOR[:internal]}__Internal__\033[0m] " if HIGHLIGHT_INTERNAL_LOGS
    end
    
    "\033[0;37m#{formatted_time}\033[0m [\033[#{color}m#{formatted_severity}\033[0m] #{kaller}\033[0m#{msg.strip} (pid:#{$$})\n"
  end

end

Rails.logger.formatter = Formatter.new
