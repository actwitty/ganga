class ErrsWorker
  include Sidekiq::Worker
  sidekiq_options retry: false
  
  def perform(params)
    Rails.logger.info("Errs Worker Perform")

    ret = {:return => nil, :error => nil}

    case params["method"]
    when "create"
      ret = ErrsWorker.create(params)  
    else
      raise "Method does not exists"
    end       

    raise ret[:error] if !ret[:error].blank?

    ret
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => nil, :error => ret[:error]}
  end

  # INPUT - Check ErrsController#create
  # OUTPUT - Check ErrsController#create [sync mode]
  def self.create(params)
    Rails.logger.info("Enter Errs Create")
    
    ret = Err.add!(params) 
    
    raise ret[:error] if !ret[:error].blank?
      
    {:return => ret[:return].format_err, :error => nil}
  rescue => e
    {:return => nil, :error => ret[:error]}
  end
end