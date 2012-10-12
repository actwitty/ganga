require 'spec_helper'

describe AppsController do
  login_account

  before(:each) do
    @account = FactoryGirl.create(:account)
    @wrong_app = FactoryGirl.create(:app)
  end

  describe "create app" do
    it "should check attributes before creating app" do
      post 'create', { description: { }}

      puts JSON.parse(response.body).inspect
      response.status.should eq(422)
    end

    it "should create app" do
      post 'create', {description: { :email => "john.doe@example.com", 
                                      :customer => {:address => {:city => "Bangalore"}},
                                      :domain => "http://example.com"
                                    }
                    }
      puts JSON.parse(response.body).inspect
      response.status.should eq(200)
    end
  end  

  describe "Delete App" do
    before(:each) do
      post 'create', {  description: { :email => "john.doe@example.com", 
                                      :customer => {:address => {:city => "Bangalore"}},
                                      :domain => "http://example.com"
                                    }
                     }
      @app = JSON.parse(response.body)
      response.status.should eq(200)
    end
    it "should not delete wrong app" do
      post 'delete', {app_id: @wrong_app._id}
      App.count.should eq(2)
    end

    it "should delete app" do
      post 'delete', {app_id: @app["id"]}
      App.count.should eq(1)
    end
  end  

  describe "Update App" do
    before(:each) do
      post 'create', {  description: { :email => "john.doe@example.com", 
                                      :customer => {:address => {:city => "Bangalore"}},
                                      :domain => "http://example.com"
                                    }
                     }
      @app = JSON.parse(response.body)
      response.status.should eq(200)
    end
    it "should check arguments while app update" do
      post 'update', {:app_id => @app["id"],:description => { }}
      response.status.should eq(422)
    end

    it "should check for valid app in update" do
      post 'update', {:app_id => "232323234234",:description => {email: "bon.doe@example.com",address: {city: "Bangalore"} }}
      response.status.should eq(422)
    end

    it "should update app" do
      post 'update', {:app_id => @app["id"],:description => {email: "bon.doe@example.com",address: {city: "Bangalore"} }}

      response.status.should eq(200)

      hash = JSON.parse(response.body)
      puts hash.inspect

      hash["description"]["email"].should eq("bon.doe@example.com") 
      hash["description"]["customer"]["address"]["city"].should eq("Bangalore") 
    end
  end

  describe "App Read" do
    before(:each) do
      post 'create', {  description: { :email => "john.doe@example.com", 
                                      :customer => {:address => {:city => "Bangalore"}},
                                      :domain => "http://example.com"
                                    }
                     }
      @app = JSON.parse(response.body)
      response.status.should eq(200)

      @actor = FactoryGirl.create(:actor, app_id: @app["id"], account_id: @app["account_id"])

      Actor.set(account_id: @actor.account_id, app_id: @actor.app_id, actor_id: @actor._id, 
        properties: { profile: { 
                                  :email => "john.doe@example.com",
                                  :customer => {:address => {:city => "Bangalore"}}
                               }, 
                      system: {browser: "chrome", os: "linux"}
                    }
                )
    end
    
    it "should check arguments while app read" do
      get 'read', { events: false } 
      response.status.should eq(422)
    end

    it "should check for valid app in update" do
      get 'read', {app_id: "232323234234",events: false}
      response.status.should eq(422)
    end

    it "should read the app detail" do

      Event.add!( account_id: @app["account_id"], app_id: @app["id"], actor_id: @actor._id, name: "sign_in",
              properties: { :email => "john.doe@example.com", :customer => {:address => {:city => "Bangalore"}}})

      Event.add!( account_id: @app["account_id"], app_id: @app["id"], actor_id: @actor._id, name: "sign_in",
        properties: { :email => "mon.doe@example.com", :customer => {:address => {:city => "Pune"}}})

      Event.add!( account_id: @app["account_id"], app_id: @app["id"], actor_id: @actor._id, name: "sign_in",
        properties: { :email => "tom.doe@example.com", :customer => {:address => {:city => "Bangalore"}}})

      get 'read', {app_id: @app["id"],events: true}

      puts JSON.parse(response.body).inspect
      response.status.should eq(200)
    end
  end
end
