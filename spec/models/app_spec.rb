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
      puts a.events.inspect
    end
  end
end
