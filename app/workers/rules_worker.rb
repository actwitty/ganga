class RulesWorker
  include Sidekiq::Worker  
  sidekiq_options retry: false
  
  def perform(params)
    Rails.logger.info("Rule Worker Perform")

    ret = {:return => nil, :error => nil}

    case params["method"]
    when "create"
      ret = RulesWorker.create(params)
    when "read"
      ret = RulesWorker.read(params)
    when "delete"
      ret = RulesWorker.delete(params)
    when "update"
      ret = RulesWorker.update(params)
    else
      raise "Method does not exist"
    end       

    raise ret[:error] if !ret[:error].blank?

    ret
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => nil, :error => ret[:error]}
  end  

  # INPUT - Check RulesController#create
  # OUTPUT - Check RulesController#create [sync mode]
  def self.create(params)
    Rails.logger.info("Enter Rule Create")
    
    ret = Rule.add!(params) 
    
    raise ret[:error] if !ret[:error].blank?
      
    {:return => {rule_id: ret[:return]}, :error => nil}
  rescue => e
    {:return => nil, :error => ret[:error]}
  end

  # INPUT - Check RulesController#delete
  # OUTPUT - Check RulesController#delete [sync mode]
  def self.delete(params)
    Rails.logger.info("Enter Rule Delete")
    
    ret = Rule.delete(params)
    
    raise ret[:error] if !ret[:error].blank?

    {:return => {status: ret[:return]}, :error => nil } 
   rescue => e
    {:return => nil, :error => ret[:error]}
  end

  # INPUT - Check RulesController#update
  # OUTPUT - Check RulesController#update [sync mode]
  def self.update(params)
    Rails.logger.info("Enter Rule Update")

    ret = Rule.update(params)

    raise ret[:error] if !ret[:error].blank?

    {:return => {status: ret[:return]}, :error => nil }
  rescue => e
    {:return => nil, :error => ret[:error]}
  end

  # INPUT - Check RulesController#read
  # OUTPUT - Check RulesController#read [sync mode]
  def self.read(params)
    Rails.logger.info("Enter Rule Read")

    ret = Rule.read(params) 
    
    raise ret[:error] if !ret[:error].blank?
      
    {:return => {rules: ret[:return]}, :error => nil}
  rescue => e
    {:return => nil, :error => ret[:error]}
  end
end