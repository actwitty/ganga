require 'active_support/core_ext/hash/indifferent_access'

class EventsWorker
  include Sidekiq::Worker
  sidekiq_options retry: false
  
  def perform(params)
    puts("Event Worker Perform #{params.class}")

    ret = nil

    case params["method"]
    when "create"
      puts "creating"
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