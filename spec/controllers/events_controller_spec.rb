require 'spec_helper'

describe EventsController do
  
  #login_account

  before(:each) do
    @account = FactoryGirl.create(:account)
    @account.confirm!
    sign_in  @account

    @app = FactoryGirl.create(:app, account_id: @account._id)
    @actor = FactoryGirl.create(:actor, account_id: @account._id, app_id: @app._id)
    request.env['HTTP_ACCEPT'] = "application/json"
    Event.create_indexes
  end
  
  describe "create event" do
    it "should not create event with invalid actor" do
      post 'create', { 
                      app_id: @app._id,
                      actor_id: 232,
                      name: 'sign_up',
                      properties: { :email => "john.doe@example.com",
                                    :customer => {:address => {:city => {:geo =>{:lat => 23, :long => 34}, :name => "bangalore"}, :place => ["hello"]}}
                          }
                    }
      puts JSON.parse(response.body).inspect
      #response.status.should eq(422)
      Event.count.should eq(0)
    end
    
    it "should not create event with invalid app" do
      # account in this test case is not mapped to app
      post 'create', { 
                      app_id: 123232,
                      actor_id: @actor._id,
                      name: 'sign_up',
                      properties: { :email => "john.doe@example.com",
                                    :customer => {:address => {:city => {:geo =>{:lat => 23, :long => 34}, :name => "bangalore"}, :place => ["hello"]}}
                          }
                    }
      puts JSON.parse(response.body).inspect
      #response.status.should eq(422)
      Event.count.should eq(0)
    end

    it "should create event" do
      # account in this test case is not mapped to app
      post 'create', { 
                      app_id: @app._id,
                      actor_id: @actor._id,
                      name: 'sign_up',
                      properties: { :email => "john.doe@example.com",
                                    :customer => {:address => {:city => {:geo =>{:lat => 23, :long => 34}, :name => "bangalore"}, :place => ["hello"]}},
                                    "l" => "lucknow", "$c" => "india", "$scr" => "200x300"
                          }
                    }
      puts JSON.parse(response.body).inspect
      
      response.status.should eq(200)
      
      Event.count.should eq(1)

      post 'create', { 
                      app_id: @app._id,
                      actor_id: @actor._id,
                      name: 'sign_up',
                      properties: { 
                                    :email => "tom.doe@example.com",
                                    :customer => {:address => {:city =>  "bangalore"}, :place => ["hello"]},
                                    "l" => "bangalore", "$c" => 23, "$scr" => "200x300"
                                  }
                    }

      post 'create', { 
                      app_id: @app._id,
                      actor_id: @actor._id,
                      name: 'sign_up',
                      properties: { 
                                    :email => "tom.doe@example.com",
                                    :customer => {:address => {:city =>  "bangalore"}, :place => ["hello"]},
                                    "l" => "bangalore", "$c" => 23, "$scr" => "200x300"
                                  }
                    }
      Event.count.should eq(3)

      #Event.all.each {|e| puts e.inspect}
      a = Event.elem_match("properties" => {"k" => "l", "v" =>"bangalore"}).explain
      puts a.inspect
    end
  end
end
