class Event
  include Mongoid::Document

  embedded_in 	  :actor

  def self.create_event(params)
  	Rails.logger.info("[Model] [Event] [create_event] Entering #{params.inspect}")  	
  	
  	obj = Event.create!(params)

  	Rails.logger.info("[Model] [Event] [create_event] Leaving")
  	return obj

  rescue => e
  	Rails.logger.error("[Model] [Event] [create_event] Error => #{e.message}")
  	nil
  end

end
