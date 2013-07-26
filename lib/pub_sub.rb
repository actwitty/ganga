require 'pub_sub/pusher_svc'
module PubSub
  def self.init
    PusherSvc.init
  end

  def self.publish(params)
    Rails.logger.info("Enter Publish")
    PusherSvc.publish(params)
  rescue => e 
    Rails.logger.error("**** ERROR **** #{e.message}")
  end
end