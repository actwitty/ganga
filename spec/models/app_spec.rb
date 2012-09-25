require 'spec_helper'

describe App do
  describe "App Creation" do

    before(:each)	do
      @app = FactoryGirl.create(:app)
    end

    it "should create app" do
      @app.should_not be_blank
    end

    it "should create schema for events" do
      a = @app.actors.create( 
                          name: "John Doe", 
                          uid:   "johndoe@us.com",
                          event: {  name: "sign_in", 
                                    props: { 
                                      name: "Roger Federer", 
                                      address: { 
                                        country: "Switzerland"
                                      }
                                    }
                                 }
                        )
      puts a.inspect
      # puts a.events.inspect
      a.should_not be_blank
    end
  end

  describe "App Query" do
    it "should show apps" do
      @app1 = FactoryGirl.create(:app)
      
      @app1.properties.create(name: "alok", data: {name: "I am property 1", customer: {sku: 23, address: {city: "bangalore"}}})
      @app1.properties.create(name: "alok1", data: {name: "I am property 2", customer: {sku: 24, address: {city: "delhi"}}})
      
      @app2 = FactoryGirl.create(:app)

      a = App.where("description.name" => {"$regex" => /App Name/i}).first
      a.should_not be_blank
    end
    
  end
end
