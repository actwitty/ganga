require "fiber"
require 'em-http-request'

# NOTE - Pure EM based Http requests
module CHttp
  class Async
    Thread.abort_on_exception=true

    # NOTES - Post Request - Asynchronous
    # INPUT - {
    #           :url => "http://gmai.com", 
    #           :params => {...}, 
    #           :method => "post", 
    #           :handle => "12333"
    #           :cb => "my_callback"  # [MANDATORY] STRING
    #         } [MANDATORY] HASH
    # OUTPUT - true or false(on error). Response Object is captured in callback
    def self.post(params)
      Rails.logger.info("Entering Async post request")

      raise "lib.chttp.callback_not_present" if params[:cb].blank?
      array = [params]
      multi(array, params[:cb], true)
    rescue => e
      Rails.logger.error("**** ERROR **** #{e.message}")
      false
    end

    # NOTES - Get Request - Asynchronous
    # INPUT - {
    #           :url => "http://gmai.com", 
    #           :params => {...}, 
    #           :method => "get", 
    #           :handle => "12333"
    #           :cb => "my_callback"  # [MANDATORY] STRING
    #         } [MANDATORY] HASH
    # OUTPUT - true or false(on error). Response Object is captured in callback
    def self.get(params)
      Rails.logger.info("Entering Async get request")

      raise "lib.chttp.callback_not_present" if params[:cb].blank?
      array = [params]
      multi(array, params[:cb], true)
    rescue => e
      Rails.logger.error("**** ERROR **** #{e.message}")
      false
    end

    # NOTES - Multi Request - Asynchronous 
    #
    # INPUT - sites => [{:url => "http://gmai.com", :params => {}, :method => "get", :handle => "12333"}, ...] # [MANDATORY] ARRAY
    #         cb => "my_callback"  # [MANDATORY] STRING
    #         
    # OUTPUT - true or false(on error). Array of Response Object is captured in callback
    def self.multi(sites, cb, single = false)
      Rails.logger.info("Entering Async Multi request => EM Thread = #{Thread.current}, Fiber = #{Fiber.current}")

      raise "lib.chttp.callback_not_present" if cb.blank?

      http = nil   

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
          Rails.logger.info("Callback => EM Thread = #{Thread.current}, Fiber = #{Fiber.current}")
          array << {:handle => k, :response => v.response, :header => v.response_header,:request => v.req }
        end
        multi.responses[:errback].each do |k,v|
          Rails.logger.info("ErrBack => EM Thread = #{Thread.current}, Fiber = #{Fiber.current}")
          array << {:handle => k, :response => v.response, :header => v.response_header,:request => v.req }
        end
        
        # single is set by get or post method to get single response
        # and not array of responsess
        if single
          array[0].blank? ? array = [] : array = array[0]
        end
        send(cb,array)
      }
      true
    rescue => e
      Rails.logger.error("**** ERROR **** #{e.message}")
      false
    end
  end
end