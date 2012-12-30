class EventsWorker
  include Sidekiq::Worker
  sidekiq_options retry: false
  
  def perform(params)
    Rails.logger.info("Events Worker Perform")

    ret = {:return => nil, :error => nil}

    case params["method"]
    when "create"
      ret = EventsWorker.create(params)  
    else
      raise "Method does not exists"
    end       

    raise ret[:error] if !ret[:error].blank?

    ret
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    {:return => nil, :error => ret[:error]}
  end

  # INPUT - Check EventsController#create
  # OUTPUT - Check EventsController#create [sync mode]
  def self.create(params)
    Rails.logger.info("Enter Events Create")
    
    ret = Event.add!(params) 
    
    raise ret[:error] if !ret[:error].blank?
      
    {:return => ret[:return].format_event, :error => nil}
  rescue => e
    {:return => nil, :error => ret[:error]}
  end
end