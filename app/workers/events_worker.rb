class EventsWorker
  include Sidekiq::Worker
  sidekiq_options retry: false
  
  def perform(params)
    Rails.logger.info("Event Worker Perform #{params.class}")

    ret = nil

    case params["method"]
    when "create"
      ret = Event.add!(params)
    else

    end       
    raise ret[:error] if !ret[:error].blank?
    true
  rescue => e
    Rails.logger.error("**** ERROR **** #{er(e)}")
    false
  end
end