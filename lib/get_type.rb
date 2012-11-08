require 'time'
module GetType

  def self.to_something(val)
    return val  if val.class == Array

    bool = if_boolean(val)
    return bool unless bool.nil?  

    #does not start with any digit then its string
    return val if val =~ /^\D+/
    
    type = (Integer(val) rescue Float(val) rescue nil)
    
    if type.nil? 
    
      #does not have atleast 2 special character (<space> -  /  :  .  \) in between letters and digits and NOT starting with digit
      return val if val !~ /^\d+[\s\-\/\.\:\\]{1}\w+[\s\-\/\.\:\\]{1}\w+/
    
      type = (DateTime.parse(val)  rescue nil)
      type.nil? ? val : type
    end
    type
  rescue => e
    Rails.logger.error("**** ERROR **** => #{e.message}")
    val    
  end

  def self.if_boolean(str)
    return true if str =~ /^true$/i
    return false if str =~ /^false$/i
    nil
  end


  def self.type_map(type)
    case type
      when  "Fixnum", "Float"
        return "Number"
      when "FalseClass", "TrueClass"
        return "Boolean"
      when "DateTime"
        return "Date"
      when "Bignum"
        return "String"
    end
    type
  end

  def self.get_type(val)
    type = to_something(val)
    return type_map(type.class.to_s )
  end
end

if __FILE__ == $0
  ["12012343434343434333343343", "343434", "123.22564566", "12:21:22", "10/10/2009", "testgjrg regjerjrp rpjrjrp", "false", "TRue","2012-11-03T06:57:17.277Z",["2423", 45, "LOK",  ], "alok@gmail.com", "http//google.com/12213", "test12213", "12213test"].each  do |str|
    something =  GetType.get_type(str)
    p [str, something]
  end
end