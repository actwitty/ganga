require "fiber"
require 'em-http-request'

# NOTE - Pure EM + Fiber based Http requests. Makes it synchronous
module CHttp
  class Fbr
    Thread.abort_on_exception=true

    # NOTES - Wrapper to synchronize
    # INPUT - ruby Block  
    # OUTPUT - 
    def self.sync
      EM.next_tick {
        Fiber.new {
          yield
          Rails.logger.flush
        }.resume
      }
    end

    # NOTES - Post Request - Synchronous with Fiber yield
    # INPUT - {:url => "http://gmai.com", :params => {}, :method => "post", :handle => "12333" } # [MANDATORY] HASH
    # OUTPUT - response object
    def self.post(params)
      Rails.logger.info("Entering Fbr post request")

      params[:method] = "post"
      array = [params]
      multi(array,true)
    rescue => e
      Rails.logger.error("**** ERROR **** #{e.message}")
      nil
    end

    # NOTES - Get Request - Synchronous with Fiber yield
    # INPUT - {:url => "http://gmai.com", :params => {}, :method => "get", :handle => "12333" } # [MANDATORY] HASH
    # OUTPUT - response object
    def self.get(params)
      Rails.logger.info("Entering Fbr get request")

      params[:method] = "get"
      array = [params]
      multi(array,true)
    rescue => e
      Rails.logger.error("**** ERROR **** #{e.message}")
      nil
    end

    # NOTES - Multi Request - Synchronous with Fiber yield
    # INPUT -sites => [
    #                   {:url => "http://gmai.com", :params => {}, :method => "get", :handle => "12333"}, 
    #                   ...
    #                 ] # [MANDATORY] ARRAY
    # OUTPUT - Array of response objects
    def self.multi(sites, single = false)
      Rails.logger.info("Entering Fbr Multi request => EM Thread = #{Thread.current}, Fiber = #{Fiber.current}")
      http = nil
    
      f = Fiber.current

      multi = EM::MultiRequest.new

      sites.each do |h|
        Rails.logger.info("url => #{h[:url]} ,params => #{h[:params]}")

        h[:params] = {} if h[:params].blank?

        if h[:method] == "post"
          params = nil
        
          if h[:params].class != Hash
            params = {:body => h[:params]}
          else
            if h[:params][:body].blank?
              params = {:body => h[:params]}
            else
              params = h[:params]
            end
          end
          multi.add(h[:handle], EventMachine::HttpRequest.new(h[:url]).post(params))
        else
          multi.add(h[:handle], EventMachine::HttpRequest.new(h[:url]).get(h[:params]))
        end
      end

      array = []
      multi.callback{
        multi.responses[:callback].each do |k,v|
          Rails.logger.info("Callback")
          array << {:handle => k, :response => v.response, :header => v.response_header,:request => v.req }
        end
        multi.responses[:errback].each do |k,v|
          Rails.logger.info("ErrBack #{v.inspect}")
          array << {:handle => k, :response => v.response, :header => v.response_header,:request => v.req }
        end

        # single is set by get or post method to get single response
        # and not array of responsess
        if single
          array[0].blank? ? array = [] : array = array[0]
        end
        f.resume(array)
      }

      Fiber.yield
    rescue => e
      Rails.logger.error("**** ERROR **** #{e.message}")
      []
    end
  end
end