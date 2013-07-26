class ConversionsWorker
  include Sidekiq::Worker
  sidekiq_options retry: false
  
  def perform(params)
    Rails.logger.info("Conversions Worker Perform")

    ret = {:return => nil, :error => nil}

    case params["action"]
    when "create"
      ret = ConversionsWorker.create(params)  
    when "read"
      ret = ConversionsWorker.read(params)
    else
      raise "Method does not exists"
    end       

    raise ret[:error] if !ret[:error].blank?

    ret
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => nil, :error => ret[:error]}
  end

  # INPUT - Check ConversionsController#create
  # OUTPUT - Check ConversionsController#create [sync mode]
  def self.create(params)
    Rails.logger.info("Enter Conversions Create")
    
    ret =Conversion.add!(params) 
    
    raise ret[:error] if !ret[:error].blank?
      
    {:return => ret[:return].format_conversion, :error => nil}
  rescue => e
    {:return => nil, :error => ret[:error]}
  end

  # INPUT - Check ConversionsController#read
  # OUTPUT - Check ConversionsController#read [sync mode]
  def self.read(params)
    Rails.logger.info("Enter Conversions Read")
    
    ret =Conversion.read(params) 
    
    raise ret[:error] if !ret[:error].blank?
      
    {:return => ret[:return], :error => nil}
  rescue => e
    {:return => nil, :error => ret[:error]}
  end
end