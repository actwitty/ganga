require 'spec_helper'

describe ErrsController do
  #login_account

  before(:each) do
    @account = FactoryGirl.create(:account)
    @account.confirm!
    sign_in  @account

    @app = FactoryGirl.create(:app, account_id: @account._id)
    @actor = FactoryGirl.create(:actor, account_id: @account._id, app_id: @app._id)
    request.env['HTTP_ACCEPT'] = "application/json"
  end
  
  describe "create error" do
    
    it "should not create error with invalid actor" do
      post 'create', { 
                      app_id: @app._id,
                      actor_id: 232,
                      properties: { 
                              :name => "Javascript failed",
                        :reason => { err: "dont know", code: 402}
                                }
                    }
      puts JSON.parse(response.body).inspect
      response.status.should eq(422)
      Err.count.should eq(0)
    end
    
    it "should not create error with invalid app" do
      # account in this test case is not mapped to app
      post 'create', { 
                      app_id: 123232,
                      actor_id: @actor._id,
                      properties: { 
                              :name => "Javascript failed",
                        :reason => { err: "dont know", code: 402}
                                }
                    }
      puts JSON.parse(response.body).inspect
      response.status.should eq(422)
      Err.count.should eq(0)
    end

    it "should create error" do
      # account in this test case is not mapped to app
      post 'create', { 
                      properties: { 
                                    :name => "Javascript failed",
                                    :reason => { err: "dont know", code: 402}
                                }
                    }
      puts JSON.parse(response.body).inspect
      response.status.should eq(200)
      Err.count.should eq(1)
    end
  end  
end
