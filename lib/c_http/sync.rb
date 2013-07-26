require "faraday"

# NOTE - Pure EM + Fiber based Http requests. Makes it synchronous
module CHttp
  class Sync
    # NOTES - Post Request - Synchronous 
    # INPUT - {:url => "http://gmai.com", :params => {}, :method => "post", :handle => "12333" } # [MANDATORY] HASH        
    def self.post(params)
      Rails.logger.info("Entering Sync post request")

      conn = Faraday.new do |faraday|
        faraday.response :logger
        faraday.adapter :net_http
      end

      response = conn.post params[:url] do |req|
        req.params = params[:params] unless params[:params].blank?
      end
    rescue => e
      Rails.logger.error("**** ERROR **** #{e.message}")
      nil
    end

    # NOTES - Get Request - Synchronous
    # INPUT - {:url => "http://gmail.com", :params => {} } # [MANDATORY] HASH
    def self.get(params)
      Rails.logger.info("Entering Sync get request")

      conn = Faraday.new do |faraday|
        faraday.response :logger
        faraday.adapter :net_http
      end

      response = conn.get params[:url] do |req|
        req.params = params[:params] unless params[:params].blank?
      end
    rescue => e
      Rails.logger.error("**** ERROR **** #{e.message}")
      nil
    end  
  end
end