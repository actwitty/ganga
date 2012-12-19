require 'spec_helper'
require 'capybara/json'
require "svc"
require "em-synchrony"
require "net/http"
require "em-synchrony/em-http"
#request object is not available in request spec

describe "svcs" do
  before(:each) do

  end
  describe "Full Contact" do
  	it "should access full contact person api" do
      puts Svc.execute(name: "full_contact", type: "action", method: "search_by_email", params: {"email" => "aloksrivastava78@gmail.com"})
  		#Svc::FullContact::Actions.search_by_email("email" => "aloksrivastava78@gmail.com")
  	end
  end 

  describe "Mongoid" do
    it "should do all mongoid call in FIber" do
      f =  Fiber.current
      f1 = nil
      EM.synchrony do
        TCPSocket = EventMachine::Synchrony::TCPSocket

        resp = Net::HTTP.get("github.com", "/index.html")
        
        Actor.create!(account_id: "sdfsdfsdfsd", app_id: "sfsssss")
        
        puts resp

        multi = EventMachine::Synchrony::Multi.new
        multi.add :a, EventMachine::HttpRequest.new("http://www.postrank.com").aget
        multi.add :b, EventMachine::HttpRequest.new("http://www.postrank.com").apost
        res = multi.perform

        p "Look ma, no callbacks, and parallel HTTP requests!"
        p res

        EM.stop
      end

      puts Fiber.current
      puts "hello"
    end
  end
end