require 'pusher'
require 'em-http-request'

module PubSub
  class PusherSvc
    
    def self.init
      Pusher.app_id = AppConstants.pusher_app_id
      Pusher.key = AppConstants.pusher_key
      Pusher.secret = AppConstants.pusher_secret
      Pusher.url = "http://#{Pusher.key}:#{Pusher.secret}@api.pusherapp.com/apps/#{Pusher.app_id}"
    end

    def self.publish(params)
      Rails.logger.info("Enter Pusher Publish")
      Pusher.trigger([params[:channel]], params[:event], params[:data])
    rescue => e 
      Rails.logger.error("**** ERROR **** #{e.message}")
    end
  end
end