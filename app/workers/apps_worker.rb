class AppsWorker
  include Sidekiq::Worker  
  sidekiq_options retry: false
  
  def perform(params)
    Rails.logger.info("App Worker Perform")

    ret = {:return => nil, :error => nil}

    case params["action"]
    when "create"
      ret = AppsWorker.create(params)
    when "read"
      ret = AppsWorker.read(params)
    when "delete"
      ret = AppsWorker.delete(params)
    when "update"
      ret = AppsWorker.update(params)
    when "add_sample_event"
      ret = AppsWorker.add_sample_event(params)
    when "delete_sample_event"
      ret = AppsWorker.delete_sample_event(params)
    else
      raise "Method does not exist"
    end       

    raise ret[:error] if !ret[:error].blank?

    ret
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => nil, :error => ret[:error]}
  end  

  # INPUT - Check AppsController#create
  # OUTPUT - Check AppsController#create [sync mode]
  def self.create(params)
    Rails.logger.info("Enter App Create")
    
    ret = App.add!(params) 
    
    raise ret[:error] if !ret[:error].blank?
      
    {:return => ret[:return].format_app, :error => nil}
  rescue => e
    {:return => nil, :error => ret[:error]}
  end

  # INPUT - Check AppsController#delete
  # OUTPUT - Check AppsController#delete [sync mode]
  def self.delete(params)
    Rails.logger.info("Enter App Delete")
    
    App.where(account_id: params["account_id"] , _id: params["id"]).destroy
    
    {:return => {status: true}, :error => nil}  
   rescue => e
    {:return => nil, :error => ret[:error]}
  end

  # INPUT - Check AppsController#update
  # OUTPUT - Check AppsController#update [sync mode]
  def self.update(params)
    Rails.logger.info("Enter App Update")

    ret = App.update(params)

    raise ret[:error] if !ret[:error].blank?
     
    {:return => ret[:return].format_app, :error => nil }
  rescue => e
    {:return => nil, :error => ret[:error]}
  end

  # INPUT - Check AppsController#read
  # OUTPUT - Check AppsController#read [sync mode]
  def self.read(params)
    Rails.logger.info("Enter App Read")
    
    ret = App.read(params)
    
    raise ret[:error] if !ret[:error].blank?    

    hash = ret[:return].format_app
    
    # delete rules and sample events while serving origin request
    if params["request_type"] == AppConstants.request_type_origin
      hash.delete(:rules) 
      hash.delete(:sample_events) 
    end

    {:return => hash, :error => nil}
  rescue => e
    {:return => nil, :error => ret[:error]}
  end

  # INPUT - Check AppsController#add_sample_event
  # OUTPUT - Check AppsController#add_sample_event [sync mode]
  def self.add_sample_event(params)
    Rails.logger.info("Enter App Sample Event")

    ret = App.add_sample_event(params)

    raise ret[:error] if !ret[:error].blank?
     
    {:return => ret[:return], :error => nil }
  rescue => e
    {:return => nil, :error => ret[:error]}
  end

  # INPUT - Check AppsController#delete_sample_event
  # OUTPUT - Check AppsController#delete_sample_event [sync mode]
  def self.delete_sample_event(params)
    Rails.logger.info("Enter Delete Sample Event")

    ret = App.delete_sample_event(params)

    raise ret[:error] if !ret[:error].blank?
     
    {:return => ret[:return], :error => nil }
  rescue => e
    {:return => nil, :error => ret[:error]}
  end
end