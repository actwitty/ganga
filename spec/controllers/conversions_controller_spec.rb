require 'spec_helper'

describe ConversionsController do
  #login_account

  before(:each) do
    @account = FactoryGirl.create(:account)
    @account.confirm!
    sign_in  @account

    @app = FactoryGirl.create(:app, account_id: @account._id)
    @actor = FactoryGirl.create(:actor, account_id: @account._id, app_id: @app._id)
    request.env['HTTP_ACCEPT'] = "application/json"
  end
  
  describe "create conversion" do
    it "should not create conversion with invalid actor" do
      post 'create', { 
                      app_id: @app._id,
                      actor_id: 232,
                      properties: { :button => "clicked",
                                    :times => {:time => ["20/12/2011", "19/11/2012"], :count => 30}
                          }
                    }
      puts JSON.parse(response.body).inspect
      response.status.should eq(422)
      Conversion.count.should eq(0)
    end
    
    it "should not create conversion with invalid app" do
      # account in this test case is not mapped to app
      post 'create', { 
                      app_id: 123232,
                      actor_id: @actor._id,
                      properties: { :button => "clicked",
                                    :times => {:time => ["20/12/2011", "19/11/2012"], :count => 30}
                          }
                    }
      puts JSON.parse(response.body).inspect
      response.status.should eq(422)
      Conversion.count.should eq(0)
    end

    it "should create conversion" do
      # account in this test case is not mapped to app
      post 'create', { 
                      app_id: @app._id,
                      actor_id: @actor._id,
                      properties: { :button => "clicked",
                                    :times => {:time => ["20/12/2011", "19/11/2012"], :count => 30}
                          }
                    }
      puts JSON.parse(response.body).inspect
      response.status.should eq(200)
      Conversion.count.should eq(1)
    end
  end
end
