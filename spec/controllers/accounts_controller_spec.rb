require 'spec_helper'

describe AccountsController do
  login_account

  before(:each) do
    @account = FactoryGirl.create(:account)

    @app = FactoryGirl.create(:app, account_id: @account._id)
    @actor = FactoryGirl.create(:actor, app_id: @app._id,  account_id: @account._id)

    Actor.set(account_id: @actor.account_id, app_id: @actor.app_id, actor_id: @actor._id, 
        properties: { profile: { 
                                  :email => "john.doe@example.com",
                                  :customer => {:address => {:city => "Bangalore"}}
                               }, 
                      system: {browser: "chrome", os: "linux"}
                    }
                )
    @actor.reload
    request.env['HTTP_ACCEPT'] = "application/json"
  end

  describe "Account Read" do

    it "should read the app detail" do

      Event.add!( account_id: @account._id, app_id: @app._id, actor_id: @actor._id, name: "sign_in",
      properties: { :email => "john.doe@example.com", :customer => {:address => {:city => "Bangalore"}}})

      Event.add!( account_id: @account._id, app_id: @app._id, actor_id: @actor._id,  name: "sign_in",
      properties: { :email => "mon.doe@example.com", :customer => {:address => {:city => "Pune"}}})

      Event.add!( account_id: @account._id, app_id: @app._id, actor_id: @actor._id, name: "sign_in",
      properties: { :email => "tom.doe@example.com", :customer => {:address => {:city => "Bangalore"}}})

      get 'read', {account_id: @account._id, events: true, actors: true}

      h = JSON.parse(response.body)
      puts h.inspect
      h["events"].size.should eq(3)
      response.status.should eq(200)
      puts Event.count
    end
  end

  describe "List Apps" do
    it "should list all the apps" do
      get 'list_apps', {account_id: @account._id}
      response.status.should eq(200)
      puts JSON.parse(response.body).inspect
    end
  end
end
