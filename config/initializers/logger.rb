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


  ONLY_APP_LOGS  = true 
  TEST_LOG_TO_CONSOLE = true

  SEVERITY_VALUE = {"INFO" => 1, "DEBUG" => 2, "WARN" => 3, "ERROR" => 4, "FATAL" => 5, "UNKNOWN" => 6}
  SEVERITY_LEVEL = "INFO"

  #TODO => Folder level filter
  FOLDER_VALUE = {"app" => 1, "lib" => 2, "models" => 3, "controllers" => 4, "internal" => 5}
  FOLDER_LEVEL = "internal"

  def format_string( str, color)
    # In test env we want to put the logs in consle
    if Rails.env == "test" and TEST_LOG_TO_CONSOLE
      return  "[#{str}] "
    else
      return  "\033[#{color}[\033[#{color}#{str}\033[0m] " 
    end
  end

  def beautify_filename(str)
    filename = ""
    array = str.split(':')
    
    filename += format_string(array[0], COLOR[:default])  if FILE
    filename += format_string("Line: #{array[1]}", COLOR[:default])  if LINE
    filename += format_string(array[2].split(' ')[1].capitalize.gsub!(/\'|\`/,''), COLOR[:default]) if METHOD
    
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
          if !folder.blank? and PATH_BREAKUP
            kaller += format_string(folder.capitalize, color)
          end
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
      kaller = format_string("__Internal__", COLOR[:internal]) if HIGHLIGHT_INTERNAL_LOGS
    end
    
    fmt = "\033[0;37m#{formatted_time}\033[0m [\033[#{color}m#{formatted_severity}\033[0m] #{kaller}\033[0m#{msg.strip} (pid:#{$$})\n"

    # dump the output on console for test env
    if Rails.env == "test" and TEST_LOG_TO_CONSOLE
      puts "#{formatted_time} [#{formatted_severity}] #{kaller} #{msg.strip} (pid:#{$$})\n\n"
    end

    fmt 
  end

end

Rails.logger.formatter = Formatter.new
