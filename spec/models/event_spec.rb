require 'spec_helper'
require 'factory_girl'

describe Event do
  
  describe "create event" do
  	it "should create evnet" do
  		actor = FactoryGirl.create(:actor)
  	  	e = Event.create_event(name: "alok", customer: {id: 123, address: {city: "bangalore"}})
  	  	e.should_not be_blank
  	end  	
  end
end
