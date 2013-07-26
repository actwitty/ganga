class AccountsWorker
  include Sidekiq::Worker  
  sidekiq_options retry: false
  
  def perform(params)
    Rails.logger.info("Account Worker Perform")

    ret = {:return => nil, :error => nil}

    case params["action"]
    when "read"
      ret = AccountsWorker.read(params)
    when "list_apps"
      ret = AccountsWorker.list_apps(params)
    else
      raise "Method does not exist"
    end       

    raise ret[:error] if !ret[:error].blank?

    ret
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => nil, :error => ret[:error]}
  end  

  # INPUT - Check AccountsController#read
  # OUTPUT - Check AccountsController#read [sync mode]
  def self.read(params)
    Rails.logger.info("Enter Account Read")

    ret = Account.read(params) 
    
    raise ret[:error] if !ret[:error].blank?
    
    {:return => ret[:return], :error => nil}
  rescue => e
    {:return => nil, :error => ret[:error]}
  end

  # INPUT - Check AccountsController#list_apps
  # OUTPUT - Check AccountsController#list_apps [sync mode]
  def self.list_apps(params)
    Rails.logger.info("Enter Account List Apps")

    hash = { apps: []}
   
    App.where(account_id: params["id"]).all.each do |attr|
      hash[:apps] << attr.format_app  
    end 
      
    {:return => hash, :error => nil}
  rescue => e
    {:return => nil, :error => ret[:error]}
  end
end