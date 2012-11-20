require 'spec_helper'
require 'json'

describe AppsController do
  #login_account

  before(:each) do
    @account = FactoryGirl.create(:account)
    @account.confirm!
    sign_in  @account

    @wrong_app = FactoryGirl.create(:app)
    
    request.env['HTTP_ACCEPT'] = "application/json"
  end

  describe "create app" do
    it "should check attributes before creating app" do
      post 'create', { account_id: @account._id, description: { }}

      puts JSON.parse(response.body).inspect
      response.status.should eq(422)
    end

    it "should check presence of nested attributes before creating app" do
      post 'create', { account_id: @account._id, description: { "phone" => 23131 }}

      puts JSON.parse(response.body).inspect
      response.status.should eq(422)
    end

    it "should create app" do
      post 'create', {account_id: @account._id, description: { :email => "john.doe@example.com",
                                                               :customer => {:address => {:city => "Bangalore"}},
                                                               :domain => "http://example.com",
                                                               :name => "alok 1"

                                                               }
                      }
      puts JSON.parse(response.body).inspect
      response.status.should eq(200)
    end

    it "should check apps with same name while creating app" do
      post 'create', {account_id: @account._id, description: { :email => "john.doe@example.com",
                                                               :customer => {:address => {:city => "Bangalore"}},
                                                               :domain => "http://example.com",
                                                               :name => "alok 1"
                     }                                       }

      puts JSON.parse(response.body).inspect
      response.status.should eq(200)

      post 'create', {account_id: @account._id, description: { :email => "john.doe@example.com",
                                                               :name => "alok 1"
                                                             }
                     }                                        
      puts JSON.parse(response.body).inspect
      response.status.should eq(422)
    end
  end

  describe "Delete App" do
    before(:each) do
      post 'create', {  account_id: @account._id, description: { :email => "john.doe@example.com",
                                                                 :customer => {:address => {:city => "Bangalore"}},
                                                                 :domain => "http://example.com",
                                                                 :name => "alok 1"
                                                                 }
                        }

      @app = JSON.parse(response.body)
      response.status.should eq(200)
    end


    it "should delete app" do
      post 'delete', {account_id: @account._id, id: @app["id"]}
      App.count.should eq(1)
    end

    it "should not delete wrong app" do
      post 'delete', {account_id: @account._id, id: @wrong_app._id}
      App.count.should eq(2)
    end
  end

  describe "Update App" do
    before(:each) do
      post 'create', { account_id: @account._id, description: { :email => "john.doe@example.com",
                                                                :customer => {:address => {:city => "Bangalore"}},
                                                                :domain => "http://example.com",
                                                                :name => "alok 1"
                                                                }
                       }
      @app = JSON.parse(response.body)
      puts @app.inspect
      response.status.should eq(200)
    end

    it "should check arguments while app update" do
      post 'update', {account_id: @account._id, :id => @app["id"],:description => { }}
      response.status.should eq(422)
    end

    it "should check for valid app in update" do
      post 'update', {account_id: @account._id, :id => "232323234234",:description => {email: "bon.doe@example.com",address: {city: "Bangalore"} }}
      response.status.should eq(422)
    end

    it "should update app" do
      post 'update', {account_id: @account._id, :id => @app["id"],:description => { email: "bon.doe@example.com",address: {city: "Bangalore"}, 
                                                                                    super_actor_id: 2323232, token: "fsdfsdfsdf", 
                                                                                    domain: "http://www.actwitty.com" }}

      response.status.should eq(200)

      hash = JSON.parse(response.body)
      puts hash.inspect

      hash["description"]["email"].should eq("bon.doe@example.com")
      hash["description"]["customer"]["address"]["city"].should eq("Bangalore")
      hash["description"]["domain"].should eq("http://www.actwitty.com")
    end
  end

  describe "App Read" do
    before(:each) do
      post 'create', { account_id: @account._id, description: { :email => "john.doe@example.com",
                                                                :customer => {:address => {:city => "Bangalore"}},
                                                                :domain => "http://example.com",
                                                                :name => "alok 1"
                                                                }
                       }
      @app = JSON.parse(response.body)
      response.status.should eq(200)

      @actor = FactoryGirl.create(:actor, app_id: @app["id"], account_id: @app["account_id"])

      Actor.set(account_id: @actor.account_id, app_id: @actor.app_id, id: @actor._id,
                properties: { profile: {
                                :email => "john.doe@example.com",
                                :customer => {:address => {:city => "Bangalore"}}
                              },
                              system: {browser: "chrome", os: "linux"}
                              }
                )

      Actor.set(account_id: @actor.account_id, app_id: @actor.app_id, id: @actor._id,
                properties: { 
                              system: {browser: "chrome", os: 23}
                            }
                )
    end

    it "should check arguments while app read" do
      get 'read', { account_id: @account._id, events: false }
      response.status.should eq(422)
    end

    it "should check for valid app in update" do
      get 'read', {account_id: @account._id, id: "232323234234",events: false}
      response.status.should eq(422)
    end

    it "should read the app detail" do
      
      Event.add!( account_id: @app["account_id"], app_id: @app["id"], actor_id: @actor._id, name: "sign_in",
                  properties: { :email => "john.doe@example.com", :customer => {:address => {:city => "Bangalore"}}})

      Event.add!( account_id: @app["account_id"], app_id: @app["id"], actor_id: @actor._id, name: "sign_up",
                  properties: { :email => "mon.doe@example.com", :customer => {:address => {:city => "Pune"}}})

      Event.add!( account_id: @app["account_id"], app_id: @app["id"], actor_id: @actor._id, name: "sign_in",
                  properties: { :email => 23, :customer => {:address => {:city => "Bangalore"}}})

      Err.add!( account_id: @app["account_id"], app_id: @app["id"], actor_id: @actor._id,
                properties: { :name => "Something failed",:reason => { err: "I know", code: 402}})

      Err.add!( account_id: @app["account_id"], app_id: @app["id"], actor_id: @actor._id,
                properties: { :name => "Javascript failed",:reason => { err: "dont know", code: 402}})

      Conversion.add!( account_id: @app["account_id"], app_id: @app["id"], actor_id: @actor._id,
                       properties: { :button => "clicked",:times => {:time => ["20/12/2011", "19/11/2012"], :count => 30}})

      Conversion.add!( account_id: @app["account_id"], app_id: @app["id"], actor_id: @actor._id,
                       properties: { :button => "hovered",:times => {:time => ["20/12/2011", "19/11/2012"], :count => 30}})

      puts @account._id
      get 'read', {account_id: @account._id, id: @app["id"],events: true, actors: true, conversions: true, errors: true}

      puts JSON.parse(response.body).inspect
      response.status.should eq(200)
    end
  end
end
