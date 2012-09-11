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
      @app.actor.create(name: "John Doe", id: "johndoe@us.com")
    end
  end
end
