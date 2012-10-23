require 'spec_helper'

describe EventsController do
  
  login_account

  before(:each) do
    @account = FactoryGirl.create(:account)
    @app = FactoryGirl.create(:app, account_id: @account._id)
    @actor = FactoryGirl.create(:actor, account_id: @account._id, app_id: @app._id)
  end
  
  describe "create event" do
    it "should not create event with invalid actor" do
      get 'create', { 
                      account_id: @account._id,
                      app_id: @app._id,
                      actor_id: 232,
                      name: 'sign_up',
                      properties: { :email => "john.doe@example.com",
                                    :customer => {:address => {:city => {:geo =>{:lat => 23, :long => 34}, :name => "bangalore"}, :place => ["hello"]}}
                          }
                    }
      puts JSON.parse(response.body).inspect
      response.status.should eq(422)
      Event.count.should eq(0)
    end
    
    it "should not create event with invalid app" do
      # account in this test case is not mapped to app
      get 'create', { app_id: @app._id,
                      actor_id: @actor._id,
                      name: 'sign_up',
                      properties: { :email => "john.doe@example.com",
                                    :customer => {:address => {:city => {:geo =>{:lat => 23, :long => 34}, :name => "bangalore"}, :place => ["hello"]}}
                          }
                    }
      puts JSON.parse(response.body).inspect
      response.status.should eq(422)
      Event.count.should eq(0)
    end

    it "should create event" do
      # account in this test case is not mapped to app
      get 'create', { 
                      account_id: @account._id,
                      app_id: @app._id,
                      actor_id: @actor._id,
                      name: 'sign_up',
                      properties: { :email => "john.doe@example.com",
                                    :customer => {:address => {:city => {:geo =>{:lat => 23, :long => 34}, :name => "bangalore"}, :place => ["hello"]}}
                          }
                    }
      puts JSON.parse(response.body).inspect
      response.status.should eq(200)
      Event.count.should eq(1)
    end
  end
end
